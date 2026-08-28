import React from "react";
import SongPreviewCard from "./SongPreviewCard";

const UpcomingSongPreview = ({ upcomingSong, onPlayNext }) => {
  return <SongPreviewCard song={upcomingSong} onPlay={onPlayNext} type="upcoming" />;
};

export default React.memo(UpcomingSongPreview);
