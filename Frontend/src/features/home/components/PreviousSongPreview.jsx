import React from "react";
import SongPreviewCard from "./SongPreviewCard";

const PreviousSongPreview = ({ previousSong, onPlayPrev }) => {
  return <SongPreviewCard song={previousSong} onPlay={onPlayPrev} type="previous" />;
};

export default React.memo(PreviousSongPreview);
