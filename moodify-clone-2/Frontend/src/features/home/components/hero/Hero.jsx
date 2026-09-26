import React, { useRef, useState, useEffect } from "react";
import { useEmotion } from "../../../expression/hooks/useEmotion";
import HeroLeftContent from "./HeroLeftContent";
import ScannerCard from "./ScannerCard";

const Hero = ({ onEmotionChange, currentSongName }) => {
  const videoRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState(null);

  const { emotion, isDetecting, startDetection, stopDetection } =
    useEmotion(videoRef);

  useEffect(() => {
    // Prevent firing for the default hook string
    if (onEmotionChange && emotion && !emotion.startsWith("Click on")) {
      onEmotionChange(emotion);
    }
  }, [emotion, onEmotionChange]);

  const handleLaunchScan = async () => {
    if (isCameraReady) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraReady(true);
      startDetection();
    } catch (error) {
      console.error("Camera Error:", error);
      alert(
        "Could not access camera. Please grant permissions in your browser.",
      );
    }
  };

  const handleStopScan = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraReady(false);
    if (stopDetection) stopDetection();
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Format emotion for display
  const displayEmotion = emotion.startsWith("Click on")
    ? "Waiting for scan..."
    : emotion;

  return (
    <section className="w-full max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10 relative">
      <HeroLeftContent 
        isCameraReady={isCameraReady}
        onLaunchScan={handleLaunchScan}
        onStopScan={handleStopScan}
      />
      
      <ScannerCard 
        isCameraReady={isCameraReady}
        videoRef={videoRef}
        isDetecting={isDetecting}
        displayEmotion={displayEmotion}
        currentSongName={currentSongName}
      />
    </section>
  );
};

export default Hero;
