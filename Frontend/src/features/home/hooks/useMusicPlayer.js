import { useContext } from "react";
import { SongContext } from "../song.context";

/**
 * Format raw seconds into digital time string MM:SS
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null || seconds === undefined) {
    return "00:00";
  }
  const totalSecs = Math.floor(Math.max(0, seconds));
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  const formattedMins = String(mins).padStart(2, "0");
  const formattedSecs = String(secs).padStart(2, "0");
  return `${formattedMins}:${formattedSecs}`;
}

/**
 * Layer 3: Music Player Hook
 * Connects UI presentation components to Domain context state and formats calculations.
 */
export function useMusicPlayer() {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useMusicPlayer must be used within a SongContextProvider");
  }

  const {
    currentSong,
    upcomingSong,
    previousSong,
    isPlaying,
    currentTime,
    duration,
    repeatMode,
    volume,
    playlist,
    togglePlay,
    playNext,
    playPrev,
    playTrackById,
    toggleRepeat,
    seekTo,
    setVolumeLevel,
  } = context;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTimeSeconds = Math.max(0, duration - currentTime);
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);
  const formattedRemainingTime = `-${formatTime(remainingTimeSeconds)}`;

  return {
    currentSong,
    upcomingSong,
    previousSong,
    isPlaying,
    currentTime,
    duration,
    remainingTimeSeconds,
    formattedCurrentTime,
    formattedDuration,
    formattedRemainingTime,
    progressPercent,
    repeatMode,
    volume,
    playlist,
    togglePlay,
    playNext,
    playPrev,
    playTrackById,
    toggleRepeat,
    seekTo,
    setVolumeLevel,
  };
}
