import Camera from "@/features/expression/components/Camera";
import React, { useCallback, useRef, useState } from "react";
import { useSong } from "../hook/useSong";
import MediaPlayer from "../component/MediaPlayer";

const HomePage = () => {
  const [currentEmotion, setCurrentEmotion] = useState("");
  const { getSongByMood } = useSong();

  const getSongByMoodRef = useRef(getSongByMood);
  getSongByMoodRef.current = getSongByMood;

  const lastFetchedMoodRef = useRef("");
  const fetchingMoodRef = useRef(false);

  const handleEmotionChange = useCallback(async (detectedEmotion) => {
    if (!detectedEmotion || detectedEmotion.startsWith("Click on")) return;

    setCurrentEmotion(detectedEmotion);

    // Prevent duplicate API requests for the same mood or while an API call is in-flight
    if (lastFetchedMoodRef.current === detectedEmotion || fetchingMoodRef.current) {
      return;
    }

    lastFetchedMoodRef.current = detectedEmotion;
    fetchingMoodRef.current = true;
    try {
      await getSongByMoodRef.current(detectedEmotion);
    } catch (err) {
      console.error("Error fetching song by mood:", err);
    } finally {
      fetchingMoodRef.current = false;
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "1.5rem 1rem" }}>
      <Camera onEmotionChange={handleEmotionChange} />
      <MediaPlayer />
    </div>
  );
};

export default HomePage;


