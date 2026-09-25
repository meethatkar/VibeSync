import React from "react";
import SongItem from "./SongItem";
import "../styles/SongList.scss";

const SongList = ({ songs, currentSongIndex, onSelectSong }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="song-list-container">
        <h3 className="song-list-header">Playlist</h3>
        <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center" }}>No songs available</p>
      </div>
    );
  }

  return (
    <div className="song-list-container">
      <h3 className="song-list-header">Playlist ({songs.length})</h3>
      {songs.map((song, index) => (
        <SongItem 
          key={song._id || index}
          song={song}
          isActive={index === currentSongIndex}
          onClick={() => onSelectSong(index)}
        />
      ))}
    </div>
  );
};

export default SongList;
