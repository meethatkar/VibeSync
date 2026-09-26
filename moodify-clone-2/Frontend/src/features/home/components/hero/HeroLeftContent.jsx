import React from "react";
import { Video, ShieldCheck, Pause } from "lucide-react";
import { Button } from "../../../../components/ui/button";

const HeroLeftContent = ({ isCameraReady, onLaunchScan, onStopScan }) => {
  return (
    <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl">
      <h3 className="text-primary font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase">
        Real-Time Bio-Acoustic Tuning
      </h3>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
        Music Synced To Your <br />
        <span className="bg-gradient-to-r from-primary via-[#00d2ff] to-secondary bg-clip-text text-transparent">
          Emotion
        </span>
      </h1>

      <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
        VibePulse decodes micro-expressions and autonomic mood markers via
        your camera feed to instantly harmonize sonic frequencies with your
        emotional state.
      </p>

      <div className="flex flex-col gap-4 mt-4">
        <Button
          onClick={isCameraReady ? onStopScan : onLaunchScan}
          className={`w-fit gap-2 font-semibold px-8 py-7 text-lg rounded-full transition-all group ${
            isCameraReady
              ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              : "bg-primary text-neutral-900 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:bg-primary"
          }`}
        >
          {isCameraReady ? (
            <>
              <Pause className="w-5 h-5 fill-red-500 text-red-500" />
              Pause Syncing
            </>
          ) : (
            <>
              <Video className="w-5 h-5 fill-neutral-900" />
              Launch Bio-Scan
              <span className="group-hover:translate-x-1 transition-transform ml-1">
                →
              </span>
            </>
          )}
        </Button>

        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>
            100% Client-Side. No video frames ever leave your browser.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroLeftContent;
