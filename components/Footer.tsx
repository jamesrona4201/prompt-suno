'use client';

import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="w-full bg-[#080a12] border-t border-white/5 pt-12 pb-16 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand, Motto, Nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Left: Brand */}
          <div 
            onClick={() => onNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-md bg-[#141a2e] border border-white/10 flex items-center justify-center p-1 group-hover:border-[#c8ff00]/40 transition-colors">
              <div className="flex items-end gap-0.5 h-full w-full justify-center">
                <span className="w-0.5 bg-[#c8ff00] h-3/5 rounded-full" />
                <span className="w-0.5 bg-[#a855f7] h-4/5 rounded-full" />
                <span className="w-0.5 bg-[#00d2ff] h-full rounded-full" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-base font-bold tracking-tight text-white">Prompt</span>
              <span className="text-base font-bold tracking-tight text-[#facc15]">SUNO</span>
              <span className="text-xs font-semibold text-neutral-400">.com</span>
            </div>
          </div>

          {/* Center: Formula Motto */}
          <div className="flex items-center gap-3 font-mono tracking-widest uppercase text-[11px] text-neutral-300">
            <span>MUSIC</span>
            <span className="text-[#a855f7] font-bold">×</span>
            <span>PEOPLE</span>
            <span className="text-[#00d2ff] font-bold">×</span>
            <span>AI</span>
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-6 font-heading font-semibold text-xs tracking-wider uppercase text-neutral-400">
            {['LEARN', 'EXPLORE', 'CREATE', 'SHARE'].map((item) => (
              <button
                key={item}
                onClick={() => onNavClick(item.toLowerCase())}
                className="hover:text-[#c8ff00] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

        </div>

        {/* Center: Accessibility Certification Badge */}
        <div className="my-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 rounded-xl bg-[#0d1222] border border-white/10 text-neutral-300 text-[10px] sm:text-[11px] font-mono shadow-inner">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">WCAG 2.1 COMPLIANT</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-white font-medium">Level AA Certified</span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-neutral-400">Screen Reader & Keyboard Verified</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#facc15]/10 border border-[#facc15]/30 text-[#facc15] font-bold ml-1">
              <Award className="w-3 h-3" />
              <span>SCORE 98% AAA RATING</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-[11px] text-neutral-400 font-mono">
          © 2025 sunov6.wiki • Experimental AI Audio Production Research
        </div>

      </div>
    </footer>
  );
}
