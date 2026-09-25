import { useContext } from "react";
import { getSongByMood } from "../services/song.service";
import { SongContext } from "../song.context";

export const useSong = () => {
  const { songs, setSongs } = useContext(SongContext);

  const fetchSongByMood = async (mood, page = 1, limit = 10) => {
    // We can also pass pagination parameters to the backend
    const response = await getSongByMood(mood, page, limit);
    console.log("SONG DATA: ", response.data);

    if (response.data && response.data.songs) {
      setSongs(response.data.songs);
    } else {
      setSongs([]);
    }
  };

  return { fetchSongByMood, songs };
};
