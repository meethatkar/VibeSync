import React, { createContext, useState, useEffect, useMemo } from "react";
import { DEFAULT_PLAYLIST, songService } from "./service/songService";
import { audioService } from "./service/audioService";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [playlist] = useState(DEFAULT_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_PLAYLIST[0]?.duration || 0);
  const [repeatMode, setRepeatMode] = useState("all"); // 'off' | 'all' | 'one'
  const [volume, setVolumeState] = useState(0.8);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const currentSong = useMemo(() => playlist[currentIndex] || DEFAULT_PLAYLIST[0], [playlist, currentIndex]);

  // Derived Next & Previous songs for bottom previews
  const upcomingSong = useMemo(() => {
    return songService.getNextSong(playlist, currentIndex, repeatMode);
  }, [playlist, currentIndex, repeatMode]);

  const previousSong = useMemo(() => {
    return songService.getPrevSong(playlist, currentIndex, repeatMode);
  }, [playlist, currentIndex, repeatMode]);

  // Sync Audio Instance when currentSong changes
  useEffect(() => {
    if (!currentSong?.songUrl) return;
    
    audioService.loadTrack(currentSong.songUrl);
    setCurrentTime(0);
    setDuration(currentSong.duration || 0);

    if (isPlaying) {
      audioService.play();
    }
  }, [currentSong]);

  // Listen to Audio events (timeupdate, loadedmetadata, ended)
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioService.getCurrentTime());
    };

    const handleLoadedMetadata = () => {
      const dur = audioService.getDuration();
      if (dur && !isNaN(dur)) {
        setDuration(dur);
      }
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        audioService.seek(0);
        audioService.play();
      } else {
        playNext();
      }
    };

    audioService.on("timeupdate", handleTimeUpdate);
    audioService.on("loadedmetadata", handleLoadedMetadata);
    audioService.on("ended", handleEnded);

    return () => {
      audioService.off("timeupdate", handleTimeUpdate);
      audioService.off("loadedmetadata", handleLoadedMetadata);
      audioService.off("ended", handleEnded);
    };
  }, [currentIndex, repeatMode, playlist]);

  // Audio Control Handlers
  const togglePlay = () => {
    if (isPlaying) {
      audioService.pause();
      setIsPlaying(false);
    } else {
      audioService.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    
    if (repeatMode === "one") {
      audioService.seek(0);
      audioService.play();
      setIsPlaying(true);
      return;
    }

    let nextIdx = currentIndex + 1;
    if (nextIdx >= playlist.length) {
      if (repeatMode === "all") {
        nextIdx = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setCurrentIndex(nextIdx);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (playlist.length === 0) return;

    // If played more than 3 seconds, restart current song first
    if (currentTime > 3) {
      audioService.seek(0);
      return;
    }

    let prevIdx = currentIndex - 1;
    if (prevIdx < 0) {
      if (repeatMode === "all") {
        prevIdx = playlist.length - 1;
      } else {
        prevIdx = 0;
      }
    }

    setCurrentIndex(prevIdx);
    setIsPlaying(true);
  };

  const playTrackById = (songId) => {
    const idx = playlist.findIndex((s) => s.id === songId);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setIsPlaying(true);
    }
  };

  const toggleRepeat = () => {
    const modes = ["off", "all", "one"];
    const nextModeIndex = (modes.indexOf(repeatMode) + 1) % modes.length;
    setRepeatMode(modes[nextModeIndex]);
  };

  const seekTo = (seconds) => {
    audioService.seek(seconds);
    setCurrentTime(seconds);
  };

  const setVolumeLevel = (val) => {
    setVolumeState(val);
    audioService.setVolume(val);
  };

  return (
    <SongContext.Provider
      value={{
        playlist,
        currentIndex,
        currentSong,
        song: currentSong, // Backward compatibility with existing song state
        setSong: (s) => playTrackById(s?.id),
        upcomingSong,
        previousSong,
        isPlaying,
        currentTime,
        duration,
        repeatMode,
        volume,
        loading,
        setloading,
        error,
        seterror,
        togglePlay,
        playNext,
        playPrev,
        playTrackById,
        toggleRepeat,
        seekTo,
        setVolumeLevel,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
