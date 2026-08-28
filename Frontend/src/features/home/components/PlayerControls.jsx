import React from "react";
import {
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Play,
  Pause,
} from "lucide-react";
import Button from "../../../../shared/components/ui/Button";

const PlayerControls = ({
  isPlaying,
  repeatMode,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleRepeat,
}) => {
  const getRepeatTitle = () => {
    if (repeatMode === "off") return "Repeat: Off";
    if (repeatMode === "all") return "Repeat: Queue (All)";
    if (repeatMode === "one") return "Repeat: Single Track (One)";
    return "Repeat";
  };

  return (
    <div className="music-player__controls">
      {/* Loop / Repeat Button */}
      <Button
        variant="secondary"
        className={`control-btn repeat-btn ${repeatMode !== "off" ? "active" : ""}`}
        onClick={onToggleRepeat}
        title={getRepeatTitle()}
        aria-label={getRepeatTitle()}
      >
        {repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
      </Button>

      {/* Previous Button */}
      <Button
        variant="secondary"
        className="control-btn prev-btn"
        onClick={onPrev}
        title="Previous Song"
        aria-label="Previous Song"
      >
        <SkipBack size={18} fill="currentColor" />
      </Button>

      {/* Play / Pause Button */}
      <Button
        variant="primary"
        className={`control-btn play-pause-btn ${isPlaying ? "playing" : ""}`}
        onClick={onTogglePlay}
        title={isPlaying ? "Pause" : "Play"}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={22} fill="currentColor" />
        ) : (
          <Play size={22} fill="currentColor" className="play-icon" />
        )}
      </Button>

      {/* Next Button */}
      <Button
        variant="secondary"
        className="control-btn next-btn"
        onClick={onNext}
        title="Next Song"
        aria-label="Next Song"
      >
        <SkipForward size={18} fill="currentColor" />
      </Button>
    </div>
  );
};

export default React.memo(PlayerControls);
