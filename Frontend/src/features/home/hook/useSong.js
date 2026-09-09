import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSongByMoodApi } from "../service/song.api";
import { formatTime } from "../home.utils";

export const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used within a HomeProvider");
  }

  const {
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
  } = context;

  const getSongByMood = async (mood) => {
    if (!mood || loading) return;
    setloading(true);
    try {
      const res = await getSongByMoodApi(mood);
      const songObj = res?.data?.song || res?.data;
      if (songObj) {
        setCurrentSong(songObj);
        return songObj;
      }
    } catch (err) {
      console.log("Err in Get song by Mood: ", err);
      seterror(err);
    } finally {
      setloading(false);
    }
  };


  return {
    getSongByMood,
    currentSong,
    setCurrentSong,
    isPlaying,
    currentTime,
    duration,
    formattedCurrentTime: formatTime(currentTime),
    formattedDuration: formatTime(duration),
    togglePlayPause,
    skipForward,
    skipBackward,
    seekTo,
    loading,
    error,
  };
};


