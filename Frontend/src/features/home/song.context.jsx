import { createContext, useState, useRef, useEffect } from "react";

export const SongContext = createContext();

export const HomeProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const audioRef = useRef(new Audio());

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Sync currentSong with audio element
  useEffect(() => {
    if (!currentSong) return;

    const audioUrl = currentSong?.songUrl || currentSong?.song?.songUrl;
    if (audioUrl && audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio play error:", err);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (!audioRef.current.src) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const skipForward = (secs = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(
        audioRef.current.currentTime + secs,
        duration || audioRef.current.duration || 0
      );
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = (secs = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - secs, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const seekTo = (timeInSecs) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSecs;
      setCurrentTime(timeInSecs);
    }
  };

  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        currentTime,
        duration,
        togglePlayPause,
        skipForward,
        skipBackward,
        seekTo,
        loading,
        setloading,
        error,
        seterror,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};


