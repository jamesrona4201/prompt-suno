'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, X } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

export interface ActiveTrack {
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  key: string;
  prompt?: string;
}

interface BottomAudioPlayerProps {
  track: ActiveTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onViewPrompt?: (track: ActiveTrack) => void;
}

export function BottomAudioPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onClose,
  onViewPrompt,
}: BottomAudioPlayerProps) {
  const [progress, setProgress] = useState(24);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    soundEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      soundEngine.setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      soundEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#0c101d]/95 border-t border-white/10 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] px-4 sm:px-6 py-3 transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Track Information */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Animated Equalizer Icon */}
          <div className="w-10 h-10 rounded-lg bg-[#141b30] border border-white/10 flex items-center justify-center p-2 shadow-inner shrink-0">
            <div className="flex items-end gap-1 h-5 justify-center">
              <span className={`w-1 bg-[#c8ff00] rounded-t-sm ${isPlaying ? 'animate-eq-1' : 'h-2'}`} />
              <span className={`w-1 bg-[#a855f7] rounded-t-sm ${isPlaying ? 'animate-eq-2' : 'h-4'}`} />
              <span className={`w-1 bg-[#00d2ff] rounded-t-sm ${isPlaying ? 'animate-eq-3' : 'h-3'}`} />
              <span className={`w-1 bg-[#ec4899] rounded-t-sm ${isPlaying ? 'animate-eq-4' : 'h-1'}`} />
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-white truncate max-w-[180px] sm:max-w-xs">
                {track.title}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30 shrink-0">
                {track.key} • {track.bpm} BPM
              </span>
            </div>
            <span className="text-xs text-neutral-400 truncate">
              {track.genre}
            </span>
          </div>

          {/* Quick Prompt Button */}
          {onViewPrompt && (
            <button
              onClick={() => onViewPrompt(track)}
              className="ml-2 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors border border-white/10 shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#c8ff00]" />
              <span>Prompt</span>
            </button>
          )}
        </div>

        {/* Center: Playback Controls & Scrubber */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-[#c8ff00] hover:bg-[#d4ff32] text-black flex items-center justify-center transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(200,255,0,0.4)]"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Scrub bar */}
          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-neutral-400">
            <span>0:48</span>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                setProgress(clickPos * 100);
              }}
              className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#c8ff00] rounded-full transition-all"
              />
            </div>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Right: Volume & Close */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#c8ff00]"
          />

          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
