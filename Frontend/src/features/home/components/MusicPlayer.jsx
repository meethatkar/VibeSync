import React from "react";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import SongInfo from "./SongInfo";
import Timeline from "./Timeline";
import PlayerControls from "./PlayerControls";
import SongPreviewCard from "./SongPreviewCard";
import "../style/musicPlayer.scss";

/**
 * Layer 4: Presentation Container
 * MusicPlayer orchestrates presentation components and connects with useMusicPlayer hook.
 */
const MusicPlayer = () => {
  const {
    currentSong,
    upcomingSong,
    previousSong,
    isPlaying,
    currentTime,
    duration,
    formattedCurrentTime,
    formattedDuration,
    formattedRemainingTime,
    progressPercent,
    repeatMode,
    togglePlay,
    playNext,
    playPrev,
    toggleRepeat,
    seekTo,
  } = useMusicPlayer();

  return (
    <div className="music-player-wrapper">
      {/* Main Music Player Card */}
      <div className="music-player">
        <div className="music-player__top-bar">
          <SongInfo currentSong={currentSong} isPlaying={isPlaying} />
          <PlayerControls
            isPlaying={isPlaying}
            repeatMode={repeatMode}
            onTogglePlay={togglePlay}
            onNext={playNext}
            onPrev={playPrev}
            onToggleRepeat={toggleRepeat}
          />
        </div>

        <Timeline
          currentTime={currentTime}
          duration={duration}
          formattedCurrentTime={formattedCurrentTime}
          formattedDuration={formattedDuration}
          formattedRemainingTime={formattedRemainingTime}
          progressPercent={progressPercent}
          onSeek={seekTo}
        />
      </div>

      {/* Floating Bottom Left & Bottom Right Song Previews */}
      <div className="previews-container">
        <SongPreviewCard song={previousSong} onPlay={playPrev} type="previous" />
        <SongPreviewCard song={upcomingSong} onPlay={playNext} type="upcoming" />
      </div>
    </div>
  );
};

export default MusicPlayer;
