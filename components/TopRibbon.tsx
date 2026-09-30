'use client';

import React, { useState } from 'react';
import { Activity, Cpu, CheckCircle2, ChevronDown } from 'lucide-react';

interface TopRibbonProps {
  onOpenModelStatus?: () => void;
}

export function TopRibbon({ onOpenModelStatus }: TopRibbonProps) {
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);

  return (
    <div className="w-full bg-[#080a12] border-b border-white/5 py-2.5 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Ideology motto matching screenshot */}
        <div className="flex items-center gap-2 font-mono tracking-wider uppercase text-[11px] text-neutral-400">
          <span>IDEAS</span>
          <span className="text-neutral-600">•</span>
          <span>SOUNDS</span>
          <span className="text-neutral-600">•</span>
          <span>PEOPLE</span>
          <span className="text-neutral-600">•</span>
          <span className="text-[#facc15] font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
            A BRIGHTER TOMORROW
          </span>
        </div>

        {/* Right: Model Status indicator badge */}
        <div className="relative">
          <button
            onClick={() => setShowStatusTooltip(!showStatusTooltip)}
            onMouseEnter={() => setShowStatusTooltip(true)}
            onMouseLeave={() => setShowStatusTooltip(false)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111624] border border-white/10 hover:border-emerald-500/40 text-[11px] text-neutral-300 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#10b981] -ml-4" />
            <span className="font-mono text-neutral-200">v6.4 Audio Model</span>
            <span className="text-emerald-400 font-medium">Online</span>
            <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-white transition-transform" />
          </button>

          {/* Model Status Dropdown */}
          {showStatusTooltip && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-[#0e1424] border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
                <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00d2ff]" />
                  Neural Audio Cluster v6.4
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  99.98%
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-neutral-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Sample Rate:</span>
                  <span className="text-white font-medium">48kHz / 24-bit Lossless</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Inference Latency:</span>
                  <span className="text-emerald-400 font-medium">0.12 ms / token</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Active Workloads:</span>
                  <span className="text-[#00d2ff] font-medium">4,280 songs rendering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Stems Isolation:</span>
                  <span className="text-white font-medium">4-Track Phase Accurate</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
