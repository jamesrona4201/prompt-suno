'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Stethoscope, Home, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThumbActionBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasActivePlayer?: boolean;
}

export function ThumbActionBar({ activeTab, setActiveTab, hasActivePlayer }: ThumbActionBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const actions = [
    {
      id: 'learn',
      label: 'LEARN',
      icon: BookOpen,
      sublabel: 'Guides',
      activeColor: 'text-[#00d2ff]',
      activeBg: 'bg-[#00d2ff]/15 border-[#00d2ff]/40 shadow-[0_0_12px_rgba(0,210,255,0.3)]',
    },
    {
      id: 'build',
      label: 'BUILD',
      icon: Sparkles,
      sublabel: 'Prompt Tool',
      activeColor: 'text-[#c8ff00]',
      activeBg: 'bg-[#c8ff00]/15 border-[#c8ff00]/40 shadow-[0_0_12px_rgba(200,255,0,0.3)]',
    },
    {
      id: 'fix',
      label: 'FIX',
      icon: Stethoscope,
      sublabel: 'Prompt Dr.',
      activeColor: 'text-[#10b981]',
      activeBg: 'bg-[#10b981]/15 border-[#10b981]/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    },
  ];

  const currentAction = actions.find((a) => a.id === activeTab) || {
    id: 'home',
    label: 'HOME',
    icon: Home,
    sublabel: 'Overview',
    activeColor: 'text-white',
    activeBg: 'bg-white/10 border-white/20',
  };

  const CurrentIcon = currentAction.icon;

  return (
    <aside
      aria-label="Mobile thumb navigation bar"
      style={{
        bottom: hasActivePlayer ? '80px' : '16px',
      }}
      className="fixed z-40 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 transition-all duration-300 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-lg mx-auto flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Minimized State: Sleek, non-intrusive floating pill */
            <motion.div
              key="minimized"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-[#0a0d18]/95 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:border-[#c8ff00]/40 transition-colors"
            >
              {/* Active mode indicator */}
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-xs font-mono text-neutral-300 focus:outline-none"
                aria-label={`Current mode is ${currentAction.label}. Click to expand thumb action bar.`}
              >
                <CurrentIcon className={`w-4 h-4 ${currentAction.activeColor}`} />
                <span className="font-heading font-black tracking-wider uppercase text-white">
                  {currentAction.label}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono hidden xs:inline">• Docked</span>
              </button>

              {/* Expand Toggle Button */}
              <button
                onClick={() => setIsExpanded(true)}
                aria-expanded={false}
                aria-label="Expand thumb action bar"
                title="Expand action bar"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#161d33] hover:bg-[#c8ff00] text-neutral-300 hover:text-black transition-all text-xs font-heading font-bold uppercase min-h-[38px] group"
              >
                <span>Expand</span>
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          ) : (
            /* Expanded State: Full thumb-zone bar with Home, LEARN, BUILD, FIX, and Minimize button */
            <motion.nav
              key="expanded"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Quick actions"
              className="w-full flex items-center justify-between sm:justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#0a0d18]/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            >
              {/* Home quick icon */}
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Go to Home"
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 min-w-[42px] min-h-[42px] ${
                  activeTab === 'home'
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="w-4 h-4" />
              </button>

              {/* 3 Primary Action Buttons: LEARN, BUILD, FIX */}
              {actions.map((act) => {
                const Icon = act.icon;
                const isActive = activeTab === act.id;

                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      setActiveTab(act.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    aria-label={`Open ${act.label} mode`}
                    className={`flex-1 sm:flex-initial sm:px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 border text-center min-h-[44px] ${
                      isActive
                        ? `${act.activeBg} ${act.activeColor}`
                        : 'bg-transparent border-transparent text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? act.activeColor : 'text-neutral-400'}`} />
                    <span className="font-heading font-black text-xs sm:text-sm tracking-wider uppercase leading-none">
                      {act.label}
                    </span>
                  </button>
                );
              })}

              {/* Minimize Toggle Button */}
              <button
                onClick={() => setIsExpanded(false)}
                aria-expanded={true}
                aria-label="Minimize thumb action bar to floating dock"
                title="Minimize bar"
                className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center shrink-0 min-w-[38px] min-h-[44px]"
              >
                <ChevronDown className="w-4 h-4" />
                <span className="sr-only">Minimize</span>
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
