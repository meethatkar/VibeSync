import React from "react";
import Camera from "../../expression/components/Camera";
import MusicPlayer from "../components/MusicPlayer";

const HomePage = () => {
  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", minHeight: "100vh", backgroundColor: "#0b0f19" }}>
      <Camera />
      <MusicPlayer />
    </div>
  );
};

export default HomePage;
