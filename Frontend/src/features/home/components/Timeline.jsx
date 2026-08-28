import React, { useRef } from "react";

const Timeline = ({
  currentTime,
  duration,
  formattedCurrentTime,
  formattedDuration,
  formattedRemainingTime,
  progressPercent,
  onSeek,
}) => {
  const progressBarRef = useRef(null);

  const handleSeek = (e) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const targetPercent = Math.max(0, Math.min(1, clickX / width));
    onSeek(targetPercent * duration);
  };

  return (
    <div className="music-player__timeline">
      <div className="time-display start-time">
        <span>{formattedCurrentTime}</span>
      </div>

      <div
        className="progress-bar-wrapper"
        ref={progressBarRef}
        onClick={handleSeek}
        role="slider"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
        tabIndex={0}
      >
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="progress-scrubber-handle"></span>
          </div>
        </div>
      </div>

      <div className="time-display end-time">
        <span className="duration-total" title="Total Duration">
          {formattedDuration}
        </span>
      </div>
    </div>
  );
};

export default React.memo(Timeline);
