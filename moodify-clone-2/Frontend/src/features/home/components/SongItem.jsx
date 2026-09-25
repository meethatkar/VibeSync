import React from "react";
import "../styles/SongItem.scss";

const formatDuration = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SongItem = ({ song, isActive, onClick }) => {
  return (
    <div className={`song-item ${isActive ? 'active' : ''}`} onClick={() => onClick(song)}>
      <img src={song.posterUrl} alt={song.title} className="song-item-img" />
      <div className="song-item-details">
        <h3 className="song-item-title" title={song.title}>{song.title}</h3>
        <p className="song-item-artist" title={song.artist}>{song.artist}</p>
      </div>
      <div className="song-item-duration">
        {formatDuration(song.songDuration)}
      </div>
    </div>
  );
};

export default SongItem;
