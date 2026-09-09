import React from "react";
import { useSong } from "../hook/useSong";
import "../style/mediaPlayer.css";

const MediaPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    formattedCurrentTime,
    formattedDuration,
    togglePlayPause,
    skipForward,
    skipBackward,
    seekTo,
    loading,
  } = useSong();

  if (!currentSong) {
    return (
      <div className="media-player-card">
        <div className="no-song-state">
          <p>🎵 Detect an emotion or pick a mood to play music</p>
        </div>
      </div>
    );
  }

  const songName = currentSong?.name || "Untitled Track";
  const artistName = currentSong?.singer || "Unknown Artist";
  const posterUrl = currentSong?.posterUrl;
  const mood = currentSong?.mood;

  return (
    <div className="media-player-card">
      {/* Top / Header Section */}
      <div className="song-details-header">
        <div className="poster-container">
          {posterUrl ? (
            <img src={posterUrl} alt={songName} className="poster-img" />
          ) : (
            <div className="poster-placeholder">🎵</div>
          )}
        </div>

        <div className="song-info">
          <h3 className="song-title">{songName}</h3>
          <p className="song-artist">{artistName}</p>
          {mood && (
            <div className="mood-badge">
              <span>{mood}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline / Progress Section */}
      <div className="timeline-section">
        <div className="timeline-bar-container">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime || 0}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="timeline-slider"
          />
        </div>
        <div className="time-stamps">
          <span>{formattedCurrentTime}</span>
          <span>{formattedDuration}</span>
        </div>
      </div>

      {/* Main Playback Controls */}
      <div className="controls-section">
        {/* -10 seconds Rewind */}
        <button
          className="control-btn btn-skip"
          onClick={() => skipBackward(10)}
          disabled={!currentSong}
          title="Rewind 10s"
        >
          -10s
        </button>

        {/* Play / Pause Toggle */}
        <button
          className="control-btn btn-play-pause"
          onClick={togglePlayPause}
          disabled={!currentSong || loading}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* +10 seconds Forward */}
        <button
          className="control-btn btn-skip"
          onClick={() => skipForward(10)}
          disabled={!currentSong}
          title="Forward 10s"
        >
          +10s
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
