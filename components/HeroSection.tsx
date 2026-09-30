'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Play, Pause, Activity, Zap } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenCreate: () => void;
}

export function HeroSection({ onExplore, onOpenCreate }: HeroSectionProps) {
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [masterEngineActive, setMasterEngineActive] = useState(true);

  const toggleSynth = () => {
    if (isPlayingSynth) {
      soundEngine.stop();
      setIsPlayingSynth(false);
    } else {
      soundEngine.startSynthLoop(128, 'Dm');
      setIsPlayingSynth(true);
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      
      {/* Outer Curved Hero Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0d111e] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        
        {/* Glowing atmospheric backdrop gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#080a12] via-[#0d1326]/60 to-[#221038]/40 pointer-events-none z-10" />
        
        {/* Subtle radial light blooms */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/15 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Hero Image Container */}
        <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px]">
          <Image
            src="/images/hero_producer.jpg"
            alt="AI Music Producer at DJ console with glowing neon headphones"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center opacity-65 scale-[1.02] filter contrast-110 saturate-125"
          />

          {/* Vignette gradients to blend seamlessly with dark text overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a12] via-[#080a12]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#080a12]/50 to-[#080a12]/90 z-10" />
          
          {/* Subtle studio watermark branding on upper right in image */}
          <div className="absolute top-6 right-6 z-20 hidden md:flex flex-col items-end opacity-40">
            <span className="font-heading font-black text-2xl tracking-widest text-[#00d2ff]/80">
              PROMPTSUNO
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-300">
              MUSIC INTELLIGENCE STUDIO
            </span>
          </div>

          {/* Handwritten-style badge: "YOUR NEXT TRACK STARTS HERE" */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20 select-none">
            <div className="relative inline-block rotate-[-4deg]">
              <span className="font-heading font-bold text-sm sm:text-base tracking-wide text-[#c8ff00] drop-shadow-[0_0_12px_rgba(200,255,0,0.8)]">
                YOUR NEXT TRACK STARTS HERE
              </span>
              {/* Hand-drawn neon arrow curving toward console */}
              <svg
                className="w-10 h-8 sm:w-14 sm:h-10 text-[#c8ff00] mt-0.5 ml-8 drop-shadow-[0_0_8px_rgba(200,255,0,0.8)]"
                viewBox="0 0 50 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5,5 Q20,28 42,22" />
                <path d="M34,16 L43,23 L35,28" />
              </svg>
            </div>
          </div>

          {/* Floating Left HUD Widget: "AI Master Engine 48kHz" */}
          <div className="absolute left-4 sm:left-10 top-1/2 sm:top-[58%] -translate-y-1/2 z-20">
            <button
              onClick={() => {
                setMasterEngineActive(!masterEngineActive);
                soundEngine.playChime();
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border backdrop-blur-md transition-all text-left group shadow-lg ${
                masterEngineActive
                  ? 'bg-[#0f1424]/85 border-white/15 hover:border-[#ec4899]/50 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                  : 'bg-[#0a0d16]/75 border-white/5 opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#ec4899]/20 border border-[#ec4899]/50 flex items-center justify-center text-[#ec4899] shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-pink-300 transition-colors">
                  AI Master Engine 48kHz
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 tracking-wider">
                  LATENCY: <span className="text-emerald-400">0.12ms</span> • ZERO NOISE
                </span>
              </div>
            </button>
          </div>

          {/* Floating Right HUD Widget: "SYNTHESIS LIVE" */}
          <div className="absolute right-4 sm:right-10 top-1/2 sm:top-[58%] -translate-y-1/2 z-20">
            <button
              onClick={toggleSynth}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0f1424]/85 hover:bg-[#141a2e] border border-white/15 hover:border-[#00d2ff]/50 backdrop-blur-md transition-all text-left shadow-lg group shadow-[0_0_20px_rgba(0,210,255,0.15)]"
            >
              {/* Colorful animated frequency analyzer bars */}
              <div className="flex items-end gap-1 h-6 w-8 justify-center">
                <span className={`w-1 bg-[#00d2ff] rounded-t-sm ${isPlayingSynth ? 'animate-eq-1' : 'h-3'}`} />
                <span className={`w-1 bg-[#ec4899] rounded-t-sm ${isPlayingSynth ? 'animate-eq-2' : 'h-5'}`} />
                <span className={`w-1 bg-[#facc15] rounded-t-sm ${isPlayingSynth ? 'animate-eq-3' : 'h-4'}`} />
                <span className={`w-1 bg-[#10b981] rounded-t-sm ${isPlayingSynth ? 'animate-eq-4' : 'h-2'}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[11px] sm:text-xs text-white uppercase tracking-wider">
                  SYNTHESIS
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#00d2ff] tracking-widest font-semibold flex items-center gap-1">
                  {isPlayingSynth ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      PLAYING
                    </>
                  ) : (
                    'LIVE'
                  )}
                </span>
              </div>
            </button>
          </div>

          {/* Big Center Headline: "Music Made Simple. Powered by AI." */}
          <div className="absolute inset-x-4 sm:inset-x-12 bottom-6 sm:bottom-8 z-20 text-center flex flex-col items-center">
            
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white drop-shadow-md mb-1">
              Music Made Simple.
            </h1>

            <div className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight drop-shadow-md mb-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-[#c8ff00] drop-shadow-[0_0_25px_rgba(200,255,0,0.6)]">
                Powered
              </span>
              <span className="text-white">by</span>
              <span className="text-[#00d2ff] drop-shadow-[0_0_25px_rgba(0,210,255,0.6)]">
                AI.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Subtext and Primary CTA Section below the image frame */}
      <div className="mt-8 text-center max-w-2xl mx-auto flex flex-col items-center px-4">
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          <strong className="text-white font-medium">sunov6.wiki</strong> gives you the tools, prompts and inspiration to create, explore and share music — without the technical headaches. Just you, your ideas and the power of AI.
        </p>

        {/* Primary CTA: "EXPLORE NOW →" in glowing neon yellow pill button */}
        <div className="mt-6">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#c8ff00] hover:bg-[#d4ff32] text-black font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(200,255,0,0.5)] active:scale-95"
          >
            <span className="text-base">⚗️</span>
            <span>EXPLORE NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </section>
  );
}
