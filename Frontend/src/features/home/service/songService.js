import { DEFAULT_PLAYLIST } from "../constants/song.constants";

export { DEFAULT_PLAYLIST };

export const songService = {
  getPlaylist: async () => {
    return DEFAULT_PLAYLIST;
  },
  
  getNextSong: (playlist, currentIndex, repeatMode = "off") => {
    if (!playlist || playlist.length === 0) return null;
    
    if (repeatMode === "one") {
      return playlist[currentIndex];
    }
    
    if (currentIndex < playlist.length - 1) {
      return playlist[currentIndex + 1];
    } else if (repeatMode === "all") {
      return playlist[0];
    }
    return null;
  },

  getPrevSong: (playlist, currentIndex, repeatMode = "off") => {
    if (!playlist || playlist.length === 0) return null;
    
    if (repeatMode === "one") {
      return playlist[currentIndex];
    }
    
    if (currentIndex > 0) {
      return playlist[currentIndex - 1];
    } else if (repeatMode === "all") {
      return playlist[playlist.length - 1];
    }
    return null;
  }
};
