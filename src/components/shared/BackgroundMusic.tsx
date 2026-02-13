import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

// Helper to get or create the single audio instance
const getAudioInstance = (): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  if (!(window as any).bgAudioInstance) {
    const audio = new Audio('/audio/song.m4a');
    audio.loop = true;
    (window as any).bgAudioInstance = audio;
  }
  return (window as any).bgAudioInstance;
};

export const BackgroundMusic = ({ isPlaying }: BackgroundMusicProps) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const audio = getAudioInstance();
    if (!audio) return;

    if (isPlaying && !isMuted) {
      // Only play if not already playing to avoid overlapping logs/logic
      if (audio.paused) {
        audio.play().catch(err => console.log("Audio play blocked:", err));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted]);

  useEffect(() => {
    const audio = getAudioInstance();
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-music-controls">
      <div 
        className="music-fab-container"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <AnimatePresence>
          {showSlider && (
            <motion.div 
              className="volume-slider-wrapper"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <div className="song-info">
                <span className="song-title">i think they call this love</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          className={`music-fab ${isMuted || !isPlaying ? 'muted' : ''}`} 
          onClick={toggleMute}
        >
          {isMuted || !isPlaying ? '🔇' : '🎵'}
        </button>
      </div>
    </div>
  );
};
