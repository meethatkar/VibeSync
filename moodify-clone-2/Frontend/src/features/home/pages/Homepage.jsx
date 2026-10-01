import React, { useCallback, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import MusicPlayer from "../components/MusicPlayer";
import SongList from "../components/SongList";
import GradientWaves from "../components/GradientWaves";
import Hero from "../components/hero/Hero";
import MoodPlaylists from "../components/mood-playlists/MoodPlaylists";
import "../styles/Homepage.scss";

const HomePage = () => {
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

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

        <MoodPlaylists onMoodSelect={handleEmotionChange} />

        {/* Spacer for fixed music player to prevent hiding content */}
        <div className="h-16 sm:h-24 w-full flex-shrink-0 pointer-events-none"></div>

        {/* Playlist Popup */}
        <div
          className={`fixed z-[90] right-4 lg:right-12 bottom-[100px] w-80 lg:w-96 max-h-[60vh] overflow-y-auto bg-[#1a1c23]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl transition-all duration-300 transform ${
            isPlaylistOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <SongList
            songs={songs}
            currentSongIndex={currentSongIndex}
            onSelectSong={setCurrentSongIndex}
          />
        </div>

        {/* Fixed Bottom Player */}
        <MusicPlayer
          song={songs?.[currentSongIndex]}
          onNext={
            songs && currentSongIndex < songs.length - 1 ? handleNextSong : null
          }
          onPrev={songs && currentSongIndex > 0 ? handlePrevSong : null}
          onTogglePlaylist={() => setIsPlaylistOpen(!isPlaylistOpen)}
        />
      </div>
    </div>
  );
};

export default HomePage;
