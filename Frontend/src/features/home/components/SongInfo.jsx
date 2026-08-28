import React from "react";

const SongInfo = ({ currentSong, isPlaying }) => {
  const { title, artist, posterImg, album } = currentSong || {};

  return (
    <div className="music-player__song-info">
      <div className="song-artwork">
        <img
          src={posterImg || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"}
          alt={title || "Track Cover"}
          className="artwork-img"
        />
      </div>
      <div className="song-details">
        <h3 className="song-title" title={title}>
          {title || "No Track Playing"}
        </h3>
        <p className="song-artist" title={artist}>
          {artist || "Unknown Artist"} {album ? `• ${album}` : ""}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SongInfo);
