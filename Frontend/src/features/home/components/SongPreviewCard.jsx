import React from "react";
import { ChevronLeft, ChevronRight, Play, SkipBack } from "lucide-react";
import Button from "../../../../shared/components/ui/Button";

/**
 * Reusable Song Preview Card component
 * Handles both "upcoming" (right arrow) and "previous" (left arrow) track cards.
 */
const SongPreviewCard = ({ song, onPlay, type = "upcoming" }) => {
  if (!song) return null;

  const isUpcoming = type === "upcoming";
  const label = isUpcoming ? "UPCOMING SONG" : "PREVIOUS SONG";

  return (
    <div
      className={`music-preview-card ${isUpcoming ? "upcoming-song-card" : "previous-song-card"}`}
      onClick={onPlay}
      title={`Click to play ${isUpcoming ? "upcoming" : "previous"} song`}
    >
      <div className="preview-header">
        {!isUpcoming && <ChevronLeft size={14} />}
        <span className="preview-label">{label}</span>
        {isUpcoming && <ChevronRight size={14} />}
      </div>

      <div className="preview-body">
        <img
          src={
            song.posterImg ||
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
          }
          alt={song.title}
          className="preview-img"
        />
        <div className="preview-info">
          <h4 className="preview-title">{song.title}</h4>
          <p className="preview-artist">{song.artist}</p>
        </div>
        <Button
          variant="ghost"
          className="preview-play-btn"
          aria-label={`Play ${label}`}
          title={`Play ${label}`}
        >
          {isUpcoming ? (
            <Play size={14} fill="currentColor" />
          ) : (
            <SkipBack size={14} fill="currentColor" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SongPreviewCard);
