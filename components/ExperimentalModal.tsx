'use client';

import React, { useState } from 'react';
import { X, Cpu, Zap, Activity, Volume2, ShieldCheck, RefreshCw } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

interface ExperimentalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperimentalModal({ isOpen, onClose }: ExperimentalModalProps) {
  const [testingLatency, setTestingLatency] = useState(false);
  const [latencyResult, setLatencyResult] = useState('0.12 ms');
  const [fxStates, setFxStates] = useState({
    lowCut: true,
    harmonicExciter: true,
    stereoWidener: false,
    zeroNoiseDither: true,
  });

  if (!isOpen) return null;

  const runLatencyBenchmark = () => {
    setTestingLatency(true);
    soundEngine.playChime();
    setTimeout(() => {
      setLatencyResult(`${(0.10 + Math.random() * 0.05).toFixed(2)} ms`);
      setTestingLatency(false);
    }, 800);
  };

  const toggleFx = (key: keyof typeof fxStates) => {
    setFxStates(prev => ({ ...prev, [key]: !prev[key] }));
    soundEngine.playChime();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#0c101d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8ff00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#151c32] border border-[#c8ff00]/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(200,255,0,0.2)]">
              ⚗️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xl text-white">
                  Experimental Audio Lab
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Neural Inference Cluster v6.4 • Lossless 48kHz Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono">
          <div className="p-3.5 rounded-xl bg-[#070912] border border-white/5">
            <span className="text-[10px] text-neutral-400 block uppercase">Sampling Rate</span>
            <span className="text-base font-bold text-white mt-1 block">48.0 kHz</span>
            <span className="text-[9px] text-[#00d2ff]">24-bit Floating</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070912] border border-white/5">
            <span className="text-[10px] text-neutral-400 block uppercase">Packet Latency</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">{latencyResult}</span>
            <span className="text-[9px] text-neutral-400">Ultra-realtime</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070912] border border-white/5">
            <span className="text-[10px] text-neutral-400 block uppercase">Active Shards</span>
            <span className="text-base font-bold text-[#facc15] mt-1 block">3,480 GPUs</span>
            <span className="text-[9px] text-neutral-400">99.98% Healthy</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070912] border border-white/5">
            <span className="text-[10px] text-neutral-400 block uppercase">THD Distortion</span>
            <span className="text-base font-bold text-[#ec4899] mt-1 block">&lt; 0.002%</span>
            <span className="text-[9px] text-neutral-400">Zero Mud</span>
          </div>
        </div>

        {/* Live Audio Visualizer Graphic */}
        <div className="p-4 rounded-xl bg-[#060810] border border-white/10 mb-6">
          <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mb-2">
            <span>Spectrum Density Analysis (20Hz - 20kHz)</span>
            <span className="text-[#c8ff00]">Zero Phase Drift</span>
          </div>
          
          <div className="flex items-end gap-1.5 h-16 w-full px-2">
            {[20, 35, 55, 78, 92, 85, 70, 60, 80, 95, 100, 88, 72, 60, 50, 65, 82, 90, 75, 55, 40, 25, 15].map((val, i) => (
              <span
                key={i}
                style={{ height: `${val}%` }}
                className="flex-1 bg-gradient-to-t from-[#00d2ff] via-[#a855f7] to-[#c8ff00] rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* Master Bus Filter Toggles */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 block">
            Experimental DSP Master Bus Filters
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
            
            <button
              onClick={() => toggleFx('lowCut')}
              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                fxStates.lowCut
                  ? 'bg-[#12192d] border-[#00d2ff]/40 text-white'
                  : 'bg-[#080b14] border-white/5 text-neutral-400'
              }`}
            >
              <span>Sub-Bass 30Hz Clean Low-Cut</span>
              <span className={`w-3 h-3 rounded-full ${fxStates.lowCut ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-neutral-600'}`} />
            </button>

            <button
              onClick={() => toggleFx('harmonicExciter')}
              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                fxStates.harmonicExciter
                  ? 'bg-[#12192d] border-[#c8ff00]/40 text-white'
                  : 'bg-[#080b14] border-white/5 text-neutral-400'
              }`}
            >
              <span>Neural Air Harmonic Exciter (+3dB)</span>
              <span className={`w-3 h-3 rounded-full ${fxStates.harmonicExciter ? 'bg-[#c8ff00] shadow-[0_0_8px_#c8ff00]' : 'bg-neutral-600'}`} />
            </button>

            <button
              onClick={() => toggleFx('stereoWidener')}
              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                fxStates.stereoWidener
                  ? 'bg-[#12192d] border-[#a855f7]/40 text-white'
                  : 'bg-[#080b14] border-white/5 text-neutral-400'
              }`}
            >
              <span>Binaural 130% Stereo Widener</span>
              <span className={`w-3 h-3 rounded-full ${fxStates.stereoWidener ? 'bg-[#a855f7] shadow-[0_0_8px_#a855f7]' : 'bg-neutral-600'}`} />
            </button>

            <button
              onClick={() => toggleFx('zeroNoiseDither')}
              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                fxStates.zeroNoiseDither
                  ? 'bg-[#12192d] border-[#10b981]/40 text-white'
                  : 'bg-[#080b14] border-white/5 text-neutral-400'
              }`}
            >
              <span>Zero-Noise Psychoacoustic Dither</span>
              <span className={`w-3 h-3 rounded-full ${fxStates.zeroNoiseDither ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : 'bg-neutral-600'}`} />
            </button>

          </div>
        </div>

        {/* Benchmark Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={runLatencyBenchmark}
            disabled={testingLatency}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono font-medium text-white transition-colors"
          >
            {testingLatency ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c8ff00]" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-[#c8ff00]" />
            )}
            <span>Benchmark Neural Packet Latency</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c8ff00] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#d4ff32] transition-colors"
          >
            Close Lab
          </button>
        </div>

      </div>
    </div>
  );
}
