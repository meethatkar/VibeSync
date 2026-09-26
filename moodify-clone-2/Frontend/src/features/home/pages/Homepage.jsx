import React, { useCallback, useRef, useState, useEffect } from "react";
import Camera from "../../expression/components/Camera";
import { useSong } from "../hooks/useSong";
import MusicPlayer from "../components/MusicPlayer";
import SongList from "../components/SongList";
import GradientWaves from "../components/GradientWaves";
import Hero from "../components/hero/Hero";
import "../styles/Homepage.scss";

const HomePage = () => {
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const lastFetchedMoodRef = useRef("");
  const fetchingMoodRef = useRef(false);

  const { fetchSongByMood, songs } = useSong();

  const handleEmotionChange = useCallback(
    async (detectedEmotion) => {
      if (!detectedEmotion || detectedEmotion.startsWith("Click on")) return;

      setCurrentEmotion(detectedEmotion);
      // Prevent duplicate API requests for the same mood or while an API call is in-flight
      if (
        lastFetchedMoodRef.current === detectedEmotion ||
        fetchingMoodRef.current
      ) {
        return;
      }

      lastFetchedMoodRef.current = detectedEmotion;
      fetchingMoodRef.current = true;
      try {
        console.log("CALLED with mood:", detectedEmotion);

        await fetchSongByMood(detectedEmotion);
        setCurrentSongIndex(0); // Reset to first song when mood changes
      } catch (err) {
        console.error("Error fetching song by mood:", err);
      } finally {
        fetchingMoodRef.current = false;
      }
    },
    [fetchSongByMood],
  );

  const handleNextSong = () => {
    if (songs && currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prev) => prev + 1);
    }
  };

  const handlePrevSong = () => {
    if (songs && currentSongIndex > 0) {
      setCurrentSongIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="homepage-container" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1.0}
          opacity={1.0}
          mouseInteraction={true}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.05}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Hero
          onEmotionChange={handleEmotionChange}
          currentSongName={
            songs?.[currentSongIndex]?.title || songs?.[currentSongIndex]?.name
          }
        />

        <div className="dashboard-layout">
          {/* Left Section: Empty or could be used for something else now, hiding for now */}
          <div className="dashboard-section hidden lg:block">
            {/* Camera is now in Hero section */}
          </div>

          {/* Middle Section: Music Player */}
          <div className="dashboard-section">
            <MusicPlayer
              song={songs?.[currentSongIndex]}
              onNext={
                songs && currentSongIndex < songs.length - 1
                  ? handleNextSong
                  : null
              }
              onPrev={songs && currentSongIndex > 0 ? handlePrevSong : null}
            />
          </div>

          {/* Right Section: Playlist */}
          <div className="dashboard-section">
            <SongList
              songs={songs}
              currentSongIndex={currentSongIndex}
              onSelectSong={setCurrentSongIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
