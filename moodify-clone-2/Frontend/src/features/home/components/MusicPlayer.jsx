import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, ListMusic, AudioLines, Radio } from "lucide-react";
import { Button } from "../../../components/ui/button";
import "../styles/MusicPlayer.scss"; // Optional, can remove if all styles are inline/tailwind

const MusicPlayer = ({ song, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Auto-play when a new song is loaded
  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Auto-play failed:", err);
        setIsPlaying(false);
      });
    }
  }, [song]);

  const togglePlay = () => {
    if (!song || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percent = clickPosition / progressBar.offsetWidth;
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onNext) onNext();
  };

  if (!song) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4">
      {/* Container */}
      <div className="w-full max-w-[1900px] mx-auto bg-[#1a1c23]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden relative flex flex-col pt-[3px]">
        
        {/* Top Progress Bar */}
        <div 
          className="absolute top-0 left-0 w-full h-[3px] bg-gray-800 cursor-pointer group hover:h-[5px] transition-all z-10"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary via-[#00d2ff] to-[#ff00a0] relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Playhead indicator on hover could go here */}
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
          
          {/* Left: Song Info */}
          <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/50 shadow-md">
              <img src={song.posterUrl || "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=150&h=150"} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold truncate text-sm sm:text-base">{song.title}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase border border-primary/20 shrink-0">HI-RES</span>
              </div>
              <span className="text-gray-400 text-xs truncate mt-0.5">{song.artist || "Unknown Artist"} • {song.mood || "Standard"} Vibe</span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors ml-2 hidden sm:block">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Middle: Controls */}
          <div className="flex flex-col items-center justify-center w-1/3 gap-1">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors hidden sm:flex rounded-full h-8 w-8">
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors rounded-full h-8 w-8" onClick={onPrev} disabled={!onPrev}>
                <SkipBack className="w-5 h-5 fill-current" />
              </Button>
              
              <Button 
                variant="default"
                size="icon"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary text-neutral-900 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:scale-105 transition-transform shrink-0" 
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </Button>
              
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors rounded-full h-8 w-8" onClick={onNext} disabled={!onNext}>
                <SkipForward className="w-5 h-5 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors hidden sm:flex rounded-full h-8 w-8">
                <Repeat className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Time / Audio Waves */}
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400 font-medium">
              <AudioLines className={`w-3 h-3 sm:w-4 sm:h-4 text-primary ${isPlaying ? 'animate-pulse' : 'opacity-50'}`} />
              <span>{formatTime(currentTime)} / {formatTime(duration || song.songDuration || 0)}</span>
            </div>
          </div>

          {/* Right: Extras */}
          <div className="flex items-center justify-end gap-4 sm:gap-6 w-1/3">
            <div className="hidden lg:flex items-center gap-1.5 text-primary">
              <Radio className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Spatial On</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 lg:w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-white hover:accent-primary"
              />
            </div>
            
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
              <ListMusic className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.songUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
};

export default MusicPlayer;
