'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, Sliders, Volume2 } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExperimental: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenExperimental }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'learn', label: 'LEARN' },
    { id: 'build', label: 'BUILD' },
    { id: 'fix', label: 'FIX' },
    { id: 'explore', label: 'EXPLORE' },
    { id: 'share', label: 'SHARE' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080a12]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Audio Wave Icon inside rounded square */}
            <div className="w-9 h-9 rounded-lg bg-[#141a2e] border border-white/10 flex items-center justify-center p-1.5 shadow-inner group-hover:border-[#c8ff00]/40 transition-colors">
              <div className="flex items-end gap-0.5 h-full w-full justify-center">
                <span className="w-1 bg-[#c8ff00] h-3/5 rounded-full animate-eq-1" />
                <span className="w-1 bg-[#a855f7] h-4/5 rounded-full animate-eq-2" />
                <span className="w-1 bg-[#00d2ff] h-full rounded-full animate-eq-3" />
                <span className="w-1 bg-[#facc15] h-2/5 rounded-full animate-eq-4" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white">Prompt</span>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#facc15]">SUNO</span>
                <span className="text-sm font-semibold text-neutral-400">.com</span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-neutral-400 -mt-0.5">
                Music Intelligence For Everyone
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative py-2 text-xs lg:text-sm font-bold tracking-wider uppercase transition-colors"
                >
                  <span className={isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8ff00] shadow-[0_0_8px_#c8ff00]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Experimental Badge Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenExperimental}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141a2e]/90 hover:bg-[#1a233d] border border-white/10 hover:border-[#c8ff00]/50 text-neutral-200 transition-all text-xs font-semibold shadow-sm group"
            >
              <span className="text-neutral-400 group-hover:text-[#c8ff00] transition-colors">⚗️</span>
              <span className="tracking-wider uppercase text-[11px] font-bold">EXPERIMENTAL</span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#141a2e] text-neutral-300 hover:text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#0d111e]/95 px-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-[#141a2e] text-[#c8ff00] border border-[#c8ff00]/30'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
