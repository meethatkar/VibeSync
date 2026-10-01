import React, { useState, useRef } from "react";
import { CloudUpload, FileAudio, Check, AlertTriangle, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

const moods = ["Radiant Joy", "Deep Focus", "Melancholic Drift", "Hyper Workout", "Midnight Chill"];

const UploadModal = ({ isOpen, onClose }) => {
  const [selectedMood, setSelectedMood] = useState("Radiant Joy");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-[#151821] border-[#2a2d36] text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
        <DialogHeader className="mb-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <CloudUpload size={16} />
            Audio Upload
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Upload <span className="text-primary">Audio Track</span></DialogTitle>
          <DialogDescription className="text-gray-400 mt-1 text-sm sm:text-base">
            Add your audio file for mood analysis
          </DialogDescription>
        </DialogHeader>

        {/* Drag and Drop Area */}
        <div 
          className={`relative w-full min-w-0 border-2 border-dashed rounded-xl p-8 my-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
            dragActive ? "border-primary bg-primary/10" : "border-[#2a2d36] hover:border-gray-500 bg-[#1a1c23]"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".mp3,.wav,.flac,.aac"
            onChange={handleChange}
          />

          {!file ? (
            <>
              <div className="w-14 h-14 rounded-full bg-[#1e2330] border border-[#2a2d36] flex items-center justify-center shadow-lg shadow-black/40 mb-4 relative overflow-hidden group hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors"></div>
                <CloudUpload className="text-primary relative z-10" size={28} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">
                Drag and drop your audio file here, or <span className="text-primary underline hover:text-primary/80 transition-colors">browse files</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Supported formats: MP3, WAV, FLAC, AAC</p>
              
              <div className="flex items-center gap-2 bg-[#2a2d36]/50 border border-yellow-900/30 text-yellow-500/80 px-4 py-2 rounded-lg text-xs font-semibold">
                <AlertTriangle size={14} />
                Maximum upload size: 10 MB per track
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full min-w-0 px-4 overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary shrink-0">
                <FileAudio size={28} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate block w-full max-w-full text-center" title={file.name}>{file.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              <Button variant="outline" size="sm" onClick={handleRemoveFile} className="border-[#2a2d36] text-gray-300 hover:text-white hover:bg-[#2a2d36]">
                Remove File
              </Button>
            </div>
          )}
        </div>

        {/* Target Mood */}
        <div className="mb-6">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Target Mood</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(mood => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "secondary"}
                onClick={() => setSelectedMood(mood)}
                className={`rounded-full text-xs sm:text-sm font-semibold transition-all h-8 sm:h-9 ${
                  selectedMood === mood 
                    ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_rgba(0,242,254,0.4)]" 
                    : "bg-[#2a2d36]/60 text-gray-300 hover:text-white hover:bg-[#3a3d46]"
                }`}
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mb-8">
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsTermsAccepted(!isTermsAccepted)}
            className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border shrink-0 transition-colors p-0 hover:bg-transparent ${
              isTermsAccepted ? "bg-primary hover:bg-primary/90 border-primary text-black" : "border-gray-500 bg-transparent text-transparent hover:text-transparent"
            }`}
          >
            <Check size={14} className={isTermsAccepted ? "opacity-100" : "opacity-0"} strokeWidth={3} />
          </Button>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            I confirm I own the rights or have permission to upload this audio for analysis, and accept the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex flex-row items-center justify-end gap-3 sm:gap-4 mt-2">
          <Button variant="ghost" onClick={() => onClose(false)} className="text-gray-300 hover:text-white hover:bg-white/5 font-semibold text-sm sm:text-base px-4 sm:px-6">
            Cancel
          </Button>
          <Button 
            disabled={!file || !isTermsAccepted}
            className="gap-2 font-bold bg-primary text-black px-4 sm:px-6 hover:bg-primary shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] disabled:opacity-50 disabled:shadow-none text-sm sm:text-base h-10"
          >
            <UploadCloud size={18} className="hidden sm:block mr-1" />
            Upload & Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
