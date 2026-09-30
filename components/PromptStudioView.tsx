'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Sliders, Play, Pause, RefreshCw, Volume2, VolumeX, Download, Layers } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

interface PromptStudioViewProps {
  initialPromptText?: string;
  onPlayGeneratedTrack: (track: {
    title: string;
    genre: string;
    bpm: number;
    duration: string;
    key: string;
    prompt: string;
  }) => void;
}

export function PromptStudioView({ initialPromptText, onPlayGeneratedTrack }: PromptStudioViewProps) {
  const [genre, setGenre] = useState('Cinematic Rock');
  const [mood, setMood] = useState('Hopeful & Emotional');
  const [bpm, setBpm] = useState(128);
  const [key, setKey] = useState('Dm');
  const [model, setModel] = useState('v6.4 Audio Model (48kHz Lossless)');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState(false);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);

  // Stems volume state
  const [stems, setStems] = useState({
    vocals: 80,
    drums: 90,
    bass: 85,
    synths: 75,
  });

  const [promptText, setPromptText] = useState(
    initialPromptText ||
    'Create a cinematic rock track with powerful driving drums, emotional soaring vocals, heavy bassline, and a hopeful anthemic tone with guitar swells and analog synthesizers.'
  );

  const [lyricsText, setLyricsText] = useState(
`[Verse 1]
Through the static and neon rain
We leave behind the quiet pain
Every frequency aligned tonight
Chasing the horizon's fading light

[Chorus]
We rise above the noise and code
Walking down this digital road
Singing to the stars above
Powered by sound, driven by love`
  );

  const genres = [
    'Cinematic Rock',
    'Synthwave 80s',
    'Cyberpunk Darksynth',
    'Neo-Soul Lo-Fi',
    'Melodic Techno',
    'Orchestral Hybrid',
    'Ethereal Ambient'
  ];

  const moods = [
    'Hopeful & Emotional',
    'Euphoric & Triumphant',
    'Melancholic & Dark',
    'High Octane & Aggressive',
    'Dreamy & Atmospheric'
  ];

  const keys = ['Dm', 'Am', 'Em', 'Gm', 'Cm', 'F#m', 'C Major', 'G Major'];

  const handleCopy = () => {
    const fullContent = `Prompt: ${promptText}\nStyle: ${genre}, ${mood}\nTempo: ${bpm} BPM\nKey: ${key}\nModel: ${model}\n\nLyrics:\n${lyricsText}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    soundEngine.playChime();
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAudio(true);
      setIsPlayingSynth(true);
      soundEngine.startSynthLoop(bpm, key);
      onPlayGeneratedTrack({
        title: `${genre} Odyssey`,
        genre: `${genre} • ${mood}`,
        bpm: bpm,
        duration: '3:20',
        key: key,
        prompt: promptText
      });
    }, 1500);
  };

  const toggleSynth = () => {
    if (isPlayingSynth) {
      soundEngine.stop();
      setIsPlayingSynth(false);
    } else {
      soundEngine.startSynthLoop(bpm, key);
      setIsPlayingSynth(true);
    }
  };

  const appendTag = (tag: string) => {
    setLyricsText((prev) => prev + `\n\n[${tag}]\n`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#a855f7]">
          <span>PROMPT STUDIO & DAW</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400">ENGINE v6.4 ACTIVE</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Master AI Prompt Sandbox
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-3xl">
          Craft high-precision musical prompts for Suno and Udio models with instant BPM calibration, key selection, lyric structure injection, and 4-track stem mixing.
        </p>
      </div>

      {/* Main Grid: Controls Left, Code/Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Tags (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Genre selector */}
          <div className="p-5 rounded-2xl bg-[#0e1322] border border-white/10">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-3">
              1. Select Style & Genre
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGenre(g);
                    setPromptText(`Create a ${g.toLowerCase()} track with crisp production, deep analog resonance, and ${mood.toLowerCase()} arrangement.`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    genre === g
                      ? 'bg-[#00d2ff] text-black font-semibold shadow-[0_0_12px_rgba(0,210,255,0.4)]'
                      : 'bg-[#151b2e] text-neutral-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mood & Atmosphere */}
          <div className="p-5 rounded-2xl bg-[#0e1322] border border-white/10">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-3">
              2. Mood & Emotional Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    mood === m
                      ? 'bg-[#a855f7] text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : 'bg-[#151b2e] text-neutral-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Tempo & Key parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#0e1322] border border-white/10">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-300">
                  Tempo (BPM)
                </span>
                <span className="text-xs font-mono font-bold text-[#c8ff00]">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min="60"
                max="180"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                aria-label="Tempo BPM slider"
                className="w-full h-1.5 bg-[#1a233b] rounded-lg appearance-none cursor-pointer accent-[#c8ff00]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                <span>60 Lo-Fi</span>
                <span>120 Disco</span>
                <span>180 D&B</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Harmonic Key
              </label>
              <select
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-[#151b2e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00d2ff]"
              >
                {keys.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prompt Description Editor */}
          <div className="p-5 rounded-2xl bg-[#0e1322] border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-300">
                Core Style Prompt
              </label>
              <span className="text-[10px] font-mono text-neutral-400">
                {promptText.length} / 400 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-[#080c16] border border-white/10 rounded-xl p-3 text-xs sm:text-sm font-mono text-neutral-200 focus:outline-none focus:border-[#c8ff00] leading-relaxed resize-none"
            />
          </div>

          {/* Lyrics and Song Structure */}
          <div className="p-5 rounded-2xl bg-[#0e1322] border border-white/10">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-300">
                Lyric Architecture & Metatags
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['Intro', 'Verse', 'Chorus', 'Drop', 'Guitar Solo', 'Outro'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => appendTag(tag)}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#c8ff00]/20 text-[10px] font-mono text-neutral-300 hover:text-[#c8ff00] border border-white/10 transition-colors"
                  >
                    + [{tag}]
                  </button>
                ))}
              </div>
            </div>
            <textarea
              rows={6}
              value={lyricsText}
              onChange={(e) => setLyricsText(e.target.value)}
              className="w-full bg-[#080c16] border border-white/10 rounded-xl p-3 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#a855f7] leading-relaxed resize-none"
            />
          </div>

        </div>

        {/* Right Column: Prompt Output, Generation, & Stems Mixer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Complete Prompt Terminal Card */}
          <div className="rounded-2xl bg-[#0c101d] border border-white/15 p-5 shadow-2xl relative overflow-hidden">
            
            {/* Terminal Window Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px] font-mono font-bold text-neutral-300">
                  PROMPT_MANIFEST.json
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c8ff00]/10 text-[#c8ff00] border border-[#c8ff00]/30">
                v6.4 Ready
              </span>
            </div>

            {/* Formatted Code Block */}
            <div className="bg-[#070912] p-4 rounded-xl border border-white/5 text-[11px] font-mono text-neutral-300 space-y-2 max-h-56 overflow-y-auto">
              <div>
                <span className="text-neutral-500">{"// Style definition"}</span>
                <p className="text-[#00d2ff]">{genre} • {mood}</p>
              </div>
              <div>
                <span className="text-neutral-500">{"// Telemetry constraints"}</span>
                <p className="text-[#facc15]">{bpm} BPM • Key: {key} • Lossless 48kHz</p>
              </div>
              <div>
                <span className="text-neutral-500">{"// Suno Prompt"}</span>
                <p className="text-white italic">&quot;{promptText}&quot;</p>
              </div>
            </div>

            {/* Actions: Copy & Generate */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#141b30] hover:bg-[#1a233e] border border-white/10 text-xs font-mono font-semibold text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Full Recipe</span>
                  </>
                )}
              </button>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#d4ff32] text-black text-xs font-heading font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(200,255,0,0.4)] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <span>⚗️ Render Audio</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Stems Audio Mixer Card */}
          <div className="rounded-2xl bg-[#0c101d] border border-white/15 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00d2ff]" />
                <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  4-Track Neural Stems
                </h3>
              </div>

              <button
                onClick={toggleSynth}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151c32] hover:bg-[#1d2745] border border-white/10 text-xs font-mono text-white transition-colors"
              >
                {isPlayingSynth ? (
                  <>
                    <Pause className="w-3 h-3 text-[#c8ff00]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#c8ff00]" />
                    <span>Play Stems</span>
                  </>
                )}
              </button>
            </div>

            {/* 4 Stems Sliders */}
            <div className="space-y-3.5 font-mono text-xs">
              
              {/* Vocals */}
              <div className="p-2.5 rounded-xl bg-[#080c16] border border-white/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#ec4899] font-semibold flex items-center gap-1">
                    🎤 Vocals (Isolated)
                  </span>
                  <span className="text-neutral-400">{stems.vocals}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stems.vocals}
                  onChange={(e) => setStems({ ...stems, vocals: parseInt(e.target.value) })}
                  aria-label="Vocals stem volume"
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-[#ec4899]"
                />
              </div>

              {/* Drums */}
              <div className="p-2.5 rounded-xl bg-[#080c16] border border-white/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#00d2ff] font-semibold flex items-center gap-1">
                    🥁 Drums & Percussion
                  </span>
                  <span className="text-neutral-400">{stems.drums}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stems.drums}
                  onChange={(e) => setStems({ ...stems, drums: parseInt(e.target.value) })}
                  aria-label="Drums stem volume"
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-[#00d2ff]"
                />
              </div>

              {/* Bass */}
              <div className="p-2.5 rounded-xl bg-[#080c16] border border-white/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#facc15] font-semibold flex items-center gap-1">
                    🎸 Bass Sub-Frequency
                  </span>
                  <span className="text-neutral-400">{stems.bass}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stems.bass}
                  onChange={(e) => setStems({ ...stems, bass: parseInt(e.target.value) })}
                  aria-label="Bass stem volume"
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-[#facc15]"
                />
              </div>

              {/* Synths / Instruments */}
              <div className="p-2.5 rounded-xl bg-[#080c16] border border-white/5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#a855f7] font-semibold flex items-center gap-1">
                    🎹 Synths & Guitars
                  </span>
                  <span className="text-neutral-400">{stems.synths}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stems.synths}
                  onChange={(e) => setStems({ ...stems, synths: parseInt(e.target.value) })}
                  aria-label="Synths stem volume"
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-[#a855f7]"
                />
              </div>

            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Phase: 0° Aligned</span>
              <span className="text-emerald-400">Zero Clipping</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
