'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Play, Pause, RefreshCw, Check, Sparkles, Stethoscope, Sliders } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

interface LearnSectionProps {
  onSelectAction: (actionId: 'learn' | 'build' | 'fix' | 'all') => void;
}

export function LearnSection({ onSelectAction }: LearnSectionProps) {
  const [sandboxGenerating, setSandboxGenerating] = useState(false);
  const [sandboxGenerated, setSandboxGenerated] = useState(false);
  const [rxTesting, setRxTesting] = useState(false);

  const handleSandboxGenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSandboxGenerating(true);
    soundEngine.playChime();
    setTimeout(() => {
      setSandboxGenerating(false);
      setSandboxGenerated(true);
      soundEngine.startSynthLoop(128, 'Dm');
    }, 1100);
  };

  const handleRxTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRxTesting(true);
    soundEngine.playChime();
    setTimeout(() => {
      setRxTesting(false);
    }, 800);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-neutral-500 font-mono text-sm tracking-widest">—</span>
            <span className="text-[#00d2ff] font-heading font-bold text-xs uppercase tracking-widest">
              LEARN • BUILD • FIX
            </span>
            <span className="text-neutral-500 font-mono text-sm tracking-widest">—</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Turn Ideas Into Music
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Step-by-step guides, visual prompts and real examples to help you create better music, faster.
          </p>
        </div>

        {/* View All Topics link */}
        <button
          onClick={() => onSelectAction('all')}
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 hover:text-[#c8ff00] transition-colors group shrink-0"
        >
          <span>VIEW ALL TOPICS</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Primary Cards Grid: LEARN, BUILD, FIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: LEARN */}
        <div 
          onClick={() => onSelectAction('learn')}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#0e1220] border border-white/10 hover:border-[#00d2ff]/50 p-6 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,210,255,0.18)] cursor-pointer"
        >
          <div>
            {/* Visual Top: Mini DAW / Sequencer blocks */}
            <div className="w-full h-40 rounded-xl bg-[#090c16] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden relative group-hover:border-[#00d2ff]/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                  PromptSuno DAW Guides
                </span>
                <span className="text-neutral-500">4/4 • 120BPM</span>
              </div>

              {/* Labeled DAW timeline block */}
              <div className="relative my-auto py-2">
                <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#142036] border border-[#00d2ff]/30 text-[11px] font-mono text-[#00d2ff] shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                  <span className="font-semibold">Verse • Chorus • Bridge</span>
                </div>
              </div>

              {/* Waveform graphic */}
              <div className="flex items-end gap-1 h-6 w-full opacity-65">
                {[12, 28, 45, 70, 90, 60, 40, 85, 100, 75, 55, 30, 65, 80, 50, 30, 20, 40, 60, 95, 80, 45, 25].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-[#00d2ff] rounded-t-sm"
                  />
                ))}
              </div>
            </div>

            {/* Category Tag */}
            <div className="mt-5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#00d2ff]">
                GUIDES & EXAMPLES
              </span>
            </div>

            {/* Card Title */}
            <h3 className="mt-1.5 font-heading font-bold text-xl text-white group-hover:text-[#00d2ff] transition-colors">
              Learn SUNO
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Learn SUNO with guides and examples. Master lyrical cadence, vocal styles, and song structure.
            </p>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500">
              4 Blueprints Available
            </span>
            <button
              aria-label="Learn SUNO with guides and examples"
              className="w-9 h-9 rounded-full bg-[#c8ff00] text-black flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#d4ff32] shadow-sm transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: BUILD */}
        <div 
          onClick={() => onSelectAction('build')}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#0e1220] border border-white/10 hover:border-[#c8ff00]/50 p-6 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(200,255,0,0.18)] cursor-pointer"
        >
          <div>
            {/* Visual Top: Prompt Sandbox UI */}
            <div className="w-full h-40 rounded-xl bg-[#090c16] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden relative group-hover:border-[#c8ff00]/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-[#c8ff00]" />
                  PROMPT SANDBOX
                </span>
                <span className="text-neutral-500 font-mono">v6.4 Lossless</span>
              </div>

              {/* Prompt box text */}
              <div className="bg-[#121626] rounded-md p-2.5 border border-white/5 my-1 text-[10px] text-neutral-300 font-mono leading-tight line-clamp-3">
                <span className="text-[#c8ff00] font-semibold">Prompt: </span>
                Create a cinematic rock track with powerful drums, emotional vocals, and a hopeful tone...
              </div>

              {/* Status and Generate Button */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <span className="text-[9px] font-mono text-neutral-400">128 BPM • Key: Dm</span>
                <button
                  onClick={handleSandboxGenerate}
                  className="px-2.5 py-1 rounded text-[10px] font-heading font-semibold bg-[#c8ff00] text-black hover:bg-[#d4ff32] transition-all flex items-center gap-1 shadow-sm"
                >
                  {sandboxGenerating ? (
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  ) : sandboxGenerated ? (
                    <>
                      <Check className="w-2.5 h-2.5" />
                      Generated
                    </>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            </div>

            {/* Category Tag */}
            <div className="mt-5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#c8ff00]">
                INTERACTIVE PROMPT TOOL
              </span>
            </div>

            {/* Card Title */}
            <h3 className="mt-1.5 font-heading font-bold text-xl text-white group-hover:text-[#c8ff00] transition-colors">
              Build Your Sound
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Build your sound with the interactive prompt tool. Craft genre recipes, BPM constraints, and stems.
            </p>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500">
              4-Track Stems DAW
            </span>
            <button
              aria-label="Build your sound with the interactive prompt tool"
              className="w-9 h-9 rounded-full bg-[#c8ff00] text-black flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#d4ff32] shadow-sm transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: FIX */}
        <div 
          onClick={() => onSelectAction('fix')}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#0e1220] border border-white/10 hover:border-[#10b981]/50 p-6 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)] cursor-pointer"
        >
          <div>
            {/* Visual Top: Prompt Dr. Clinic Terminal */}
            <div className="w-full h-40 rounded-xl bg-[#090c16] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden relative group-hover:border-[#10b981]/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Stethoscope className="w-3.5 h-3.5" />
                  PROMPT DR. CLINIC
                </span>
                <span className="text-[10px] font-mono text-[#10b981] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Health 98%
                </span>
              </div>

              {/* Diagnostic remedies list */}
              <div className="space-y-1.5 my-auto">
                <div className="flex items-center justify-between text-[10px] font-mono bg-[#0f1526] px-2 py-1 rounded border border-white/5">
                  <span className="text-neutral-300">Robotic Vocal Artifacts</span>
                  <span className="text-emerald-400">Fixed</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono bg-[#0f1526] px-2 py-1 rounded border border-white/5">
                  <span className="text-neutral-300">Low-End Mud & Clipping</span>
                  <span className="text-emerald-400">Cleaned</span>
                </div>
              </div>

              {/* Run Scan Button */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <span className="text-[9px] font-mono text-neutral-400">Phase & Timbre Check</span>
                <button
                  onClick={handleRxTest}
                  className="px-2.5 py-1 rounded text-[10px] font-heading font-semibold bg-[#10b981] text-black hover:bg-[#059669] transition-all flex items-center gap-1 shadow-sm"
                >
                  {rxTesting ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : 'Run Scan'}
                </button>
              </div>
            </div>

            {/* Category Tag */}
            <div className="mt-5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#10b981]">
                PROMPT DR.
              </span>
            </div>

            {/* Card Title */}
            <h3 className="mt-1.5 font-heading font-bold text-xl text-white group-hover:text-[#10b981] transition-colors">
              Diagnose & Fix Songs
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Diagnose and fix your songs with prompt dr. Identify robotic artifacts, muddy frequencies, and structure glitches.
            </p>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500">
              Instant Clinical Prescriptions
            </span>
            <button
              aria-label="Diagnose and fix your songs with prompt dr"
              className="w-9 h-9 rounded-full bg-[#c8ff00] text-black flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#d4ff32] shadow-sm transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
