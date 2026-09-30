'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CommunityBannerProps {
  onGetStarted: () => void;
}

export function CommunityBanner({ onGetStarted }: CommunityBannerProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cinematic Banner Frame */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0d111e] min-h-[380px] sm:min-h-[420px] flex items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        
        {/* Background Hiker Image */}
        <Image
          src="/images/community_hiker.jpg"
          alt="Music creator listening to soundscapes in the mountains with glowing headphones"
          fill
          referrerPolicy="no-referrer"
          className="object-cover object-left-center sm:object-center opacity-70 filter contrast-105"
        />

        {/* Ambient Gradient Masks to guarantee text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#080a12]/90 via-[#080a12]/60 to-transparent z-10 sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080a12]/95 via-[#080a12]/80 to-transparent z-10 hidden sm:block" />

        {/* Content Right-Aligned */}
        <div className="relative z-20 w-full sm:max-w-xl ml-auto px-6 sm:px-12 py-8 flex flex-col items-start sm:items-end text-left sm:text-right">
          
          {/* Eyebrow */}
          <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-widest text-[#facc15] mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
            COMMUNITY & CREATION
          </span>

          {/* Heading */}
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-none mb-1">
            Your Sound.
          </h2>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#facc15] tracking-tight leading-tight mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
            Your Story.
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-6 max-w-sm">
            No experience needed. Just curiosity. Start creating with <span className="text-white font-medium">sunov6.wiki</span> today.
          </p>

          {/* Yellow Pill CTA */}
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-[#c8ff00] hover:bg-[#d4ff32] text-black font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(200,255,0,0.5)] active:scale-95"
          >
            <span className="text-sm">⚗️</span>
            <span>GET STARTED</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

      </div>

    </section>
  );
}
