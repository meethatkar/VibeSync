import React from "react";
import { Activity } from "lucide-react";

const ScannerCard = ({
  isCameraReady,
  videoRef,
  isDetecting,
  displayEmotion,
  currentSongName,
}) => {
  return (
    <div className="flex-1 w-full max-w-2xl relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl opacity-50 rounded-[2rem]"></div>

      <div className="relative bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 sm:p-6 shadow-2xl flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isCameraReady ? "bg-primary animate-pulse shadow-[0_0_10px_rgba(0,242,254,0.8)]" : "bg-gray-500"}`}
            ></div>
            <span className="text-gray-300 text-sm font-medium">
              Sensor Viewport
            </span>
          </div>
          <div
            className={`border text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase ${isCameraReady ? "border-primary/50 text-primary bg-primary/10" : "border-gray-500/50 text-gray-400 bg-gray-500/10"}`}
          >
            {isCameraReady ? "Facial Resonance Active" : "Standby Mode"}
          </div>
        </div>

        {/* Image/Video Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
          {!isCameraReady && (
            <img
              src="/hero_scan_target.png"
              alt="Scan Target"
              className="w-full h-full object-cover opacity-80"
            />
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 ${isCameraReady ? "block" : "hidden"}`}
          />

          {/* UI Overlays on Image */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs text-primary font-medium tracking-wide">
            Target: Face #01
          </div>

          {/* Corner Bracket Overlays */}
          <div
            className={`absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg transition-colors ${isCameraReady ? "border-primary" : "border-primary/60"}`}
          ></div>
          <div
            className={`absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg transition-colors ${isCameraReady ? "border-primary" : "border-primary/60"}`}
          ></div>
          <div
            className={`absolute bottom-16 left-8 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg transition-colors ${isCameraReady ? "border-primary" : "border-primary/60"}`}
          ></div>
          <div
            className={`absolute bottom-16 right-8 w-6 h-6 border-b-2 border-r-2 rounded-br-lg transition-colors ${isCameraReady ? "border-primary" : "border-primary/60"}`}
          ></div>

          {/* Bottom Info Bar Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${isDetecting ? "bg-primary/20" : "bg-gray-500/20"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${isDetecting ? "bg-primary animate-pulse" : "bg-gray-500"}`}
                ></div>
              </div>
              <span className="text-primary text-xs font-semibold capitalize">
                Mood Detected: {displayEmotion}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer - Acoustic Match */}
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/80 to-purple-600/80 flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Acoustic Match
              </span>
              <span className="text-white font-semibold line-clamp-1">
                {currentSongName || "Chill Euphoria Mix"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerCard;
