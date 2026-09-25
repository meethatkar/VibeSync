import React, { useState, useRef, useEffect } from "react";
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon } from "./Icons";
import "../styles/MusicPlayer.scss";

const MusicPlayer = ({ song, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percent = clickPosition / progressBar.offsetWidth;
    audioRef.current.currentTime = percent * audioRef.current.duration;
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

  if (!song) {
    return (
      <div className="music-player-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <p>No song selected</p>
      </div>
    );
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player-container">
      <img src={song.posterUrl} alt={song.title} className="song-poster" />
      
      <div className="song-details">
        <h2 className="song-title" title={song.title}>{song.title}</h2>
        <p className="song-artist" title={song.artist}>{song.artist}</p>
        <div className="song-meta">
          <span className="mood-badge">{song.mood} Mood</span>
          <span>{song.plays} Plays</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg" onClick={handleProgressClick}>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="time-details">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || song.songDuration)}</span>
        </div>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={onPrev} disabled={!onPrev}>
          <SkipBackIcon />
        </button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </button>
        <button className="control-btn" onClick={onNext} disabled={!onNext}>
          <SkipForwardIcon />
        </button>
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
