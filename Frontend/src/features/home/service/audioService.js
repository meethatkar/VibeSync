/**
 * Layer 1: Audio Service
 * HTML5 Audio Singleton Manager encapsulating native browser audio API.
 */
class AudioService {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "metadata";
    this.listeners = new Map();
  }

  loadTrack(url) {
    if (!url) return;
    if (this.audio.src !== url) {
      this.audio.src = url;
      this.audio.load();
    }
  }

  async play() {
    try {
      if (this.audio.src) {
        await this.audio.play();
      }
    } catch (error) {
      console.warn("Audio playback error / autoplay prevented:", error);
    }
  }

  pause() {
    this.audio.pause();
  }

  seek(seconds) {
    if (isNaN(seconds)) return;
    this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration || 0));
  }

  setVolume(volume) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  setLoop(isLoop) {
    this.audio.loop = isLoop;
  }

  getCurrentTime() {
    return this.audio.currentTime || 0;
  }

  getDuration() {
    return this.audio.duration || 0;
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    this.audio.addEventListener(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
      this.audio.removeEventListener(event, callback);
    }
  }

  cleanup() {
    this.audio.pause();
    this.audio.src = "";
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach((cb) => this.audio.removeEventListener(event, cb));
    });
    this.listeners.clear();
  }
}

export const audioService = new AudioService();
