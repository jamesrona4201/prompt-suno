'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Sparkles, Copy, Check, Clock, Radio, Music2, Filter } from 'lucide-react';
import { ActiveTrack } from './BottomAudioPlayer';

interface ExploreTracksViewProps {
  onPlayTrack: (track: ActiveTrack) => void;
  currentPlayingTitle?: string;
  isPlaying?: boolean;
}

export function ExploreTracksView({ onPlayTrack, currentPlayingTitle, isPlaying }: ExploreTracksViewProps) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedTrackForModal, setSelectedTrackForModal] = useState<ActiveTrack | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tracks: (ActiveTrack & { id: string; image: string; plays: string; tags: string[] })[] = [
    {
      id: '1',
      title: 'Echoes of Horizon',
      genre: 'Cinematic Synth Rock',
      bpm: 128,
      duration: '3:42',
      key: 'Dm',
      image: '/images/track_sunset.jpg',
      plays: '42.8k',
      tags: ['Cinematic', '80s Rock', 'Vocals', 'Epic'],
      prompt: 'Cinematic 80s synth rock ballad, soaring electric guitars, atmospheric reverb pads, driving tom fills, passionate female vocal lead, 128 BPM, emotional and triumphant climax.'
    },
    {
      id: '2',
      title: 'Neon Solitude',
      genre: 'Cyberpunk Darksynth',
      bpm: 105,
      duration: '4:15',
      key: 'Am',
      image: '/images/hero_producer.jpg',
      plays: '38.2k',
      tags: ['Cyberpunk', 'Analog Synth', 'Moody', 'Bassline'],
      prompt: 'Cyberpunk darksynth, heavy distorted analog bassline, rain ambience in background, retro futuristic synthesizer arpeggio, brooding vocal chops, 105 BPM, blade runner aesthetic.'
    },
    {
      id: '3',
      title: 'Alpine Reverie',
      genre: 'Neo-Soul Ambient Lo-Fi',
      bpm: 88,
      duration: '2:56',
      key: 'F#m',
      image: '/images/community_hiker.jpg',
      plays: '29.5k',
      tags: ['Lo-Fi', 'Warm Vinyl', 'Acoustic', 'Chill'],
      prompt: 'Warm neo-soul lo-fi hip hop, Rhodes electric piano with vinyl flutter, gentle upright bass, acoustic brush drums, nostalgic vocal humming, 88 BPM, sunset mountain lake vibes.'
    },
    {
      id: '4',
      title: 'Subatomic Pulse',
      genre: 'Melodic Techno',
      bpm: 132,
      duration: '5:10',
      key: 'Em',
      image: '/images/hero_producer.jpg',
      plays: '51.4k',
      tags: ['Techno', 'Peak Time', 'Modular', 'Hypnotic'],
      prompt: 'Hypnotic melodic techno, rolling bassline, modular synth blips, 4/4 punchy kick drum, rising white noise sweeps, tension and release club drop, 132 BPM.'
    }
  ];

  const filteredTracks = selectedGenre === 'All'
    ? tracks
    : tracks.filter(t => t.tags.includes(selectedGenre) || t.genre.includes(selectedGenre));

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#00d2ff]">
            <span>FEATURED GENERATIONS</span>
            <span className="text-neutral-600">•</span>
            <span>v6.4 HIGH FIDELITY</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Explore AI Tracks
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Listen to flagship tracks produced with Suno v6.4 models. Inspect the exact prompt recipes, BPM constraints, and stems architecture.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#0c101d] p-1.5 rounded-xl border border-white/10">
          {['All', 'Cinematic', 'Cyberpunk', 'Lo-Fi', 'Techno'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedGenre(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-all ${
                selectedGenre === cat
                  ? 'bg-[#c8ff00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTracks.map((track, idx) => {
          const isThisPlaying = isPlaying && currentPlayingTitle === track.title;

          return (
            <div
              key={track.id}
              className="group rounded-2xl bg-[#0c101d] border border-white/10 hover:border-white/25 p-5 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div className="flex gap-4">
                {/* Artwork Thumbnail */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => onPlayTrack(track)}
                    aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#c8ff00] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Track Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/30">
                      {track.key}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {track.bpm} BPM
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {track.duration}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white truncate group-hover:text-[#c8ff00] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mb-2 truncate">
                    {track.genre}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-300 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prompt Block Quote */}
              <div className="mt-4 p-3 rounded-xl bg-[#070912] border border-white/5 text-xs font-mono text-neutral-300 flex items-start justify-between gap-3">
                <p className="line-clamp-2 italic text-neutral-300">
                  &quot;{track.prompt}&quot;
                </p>
                <button
                  onClick={() => handleCopyPrompt(track.prompt || '', idx)}
                  aria-label="Copy prompt recipe"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors shrink-0"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Footer row */}
              <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-white/5">
                <span className="font-mono text-neutral-500 text-[11px]">
                  {track.plays} plays
                </span>

                <button
                  onClick={() => setSelectedTrackForModal(track)}
                  className="inline-flex items-center gap-1 text-[#c8ff00] font-heading font-semibold hover:underline text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect Metadata</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Modal */}
      {selectedTrackForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0d1222] border border-white/15 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-heading font-bold text-lg text-white">
                Track Manifest: {selectedTrackForModal.title}
              </h3>
              <button
                onClick={() => setSelectedTrackForModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-[#080c16] p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Genre:</span>
                  <span className="text-white">{selectedTrackForModal.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tempo & Key:</span>
                  <span className="text-[#00d2ff]">{selectedTrackForModal.bpm} BPM • {selectedTrackForModal.key}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Audio Codec:</span>
                  <span className="text-emerald-400">Suno Neural 48kHz Stereo</span>
                </div>
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1.5">
                  RAW MODEL PROMPT:
                </label>
                <div className="bg-[#080c16] p-3 rounded-xl border border-white/5 text-neutral-200 leading-relaxed">
                  {selectedTrackForModal.prompt}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedTrackForModal.prompt || '');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors"
              >
                Copy Prompt
              </button>
              <button
                onClick={() => {
                  onPlayTrack(selectedTrackForModal);
                  setSelectedTrackForModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#c8ff00] text-black text-xs font-heading font-bold uppercase transition-transform transform hover:scale-105"
              >
                Play Track Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
