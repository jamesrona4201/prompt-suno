'use client';

import React, { useState } from 'react';
import { Share2, Download, Copy, Check, Sparkles, Music2, ExternalLink, HardDrive } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

export function ShareStudioView() {
  const [downloadingStem, setDownloadingStem] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const stemsList = [
    { name: 'Vocals (Isolated Acapella)', size: '24.5 MB', format: 'WAV 48kHz 24-bit', color: '#ec4899' },
    { name: 'Drums & Percussion', size: '31.2 MB', format: 'WAV 48kHz 24-bit', color: '#00d2ff' },
    { name: 'Bass Sub-Frequency', size: '18.4 MB', format: 'WAV 48kHz 24-bit', color: '#facc15' },
    { name: 'Synths & Guitars (Harmonics)', size: '42.1 MB', format: 'WAV 48kHz 24-bit', color: '#a855f7' },
    { name: 'Full Master Mixdown', size: '54.8 MB', format: 'FLAC Lossless', color: '#c8ff00' },
  ];

  const handleDownload = (stemName: string) => {
    setDownloadingStem(stemName);
    soundEngine.playChime();
    setTimeout(() => {
      setDownloadingStem(null);
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://sunov6.wiki/track/echoes-of-horizon?stems=48khz');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#facc15]">
          <span>STEMS EXPORT & COMMUNITY</span>
          <span className="text-neutral-600">•</span>
          <span>DISTRIBUTION</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Create & Share Your Sound
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
          Export uncompressed 48kHz lossless stems, share interactive music players, and collaborate with the global AI music producer community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stems Downloader (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#c8ff00]" />
                <h2 className="font-heading font-bold text-lg text-white">
                  Export Lossless 48kHz Stems
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Phase-Aligned
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {stemsList.map((stem) => (
                <div
                  key={stem.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#080c16] border border-white/5 hover:border-white/20 transition-all gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: stem.color }}
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    />
                    <div>
                      <span className="font-bold text-white block text-sm">
                        {stem.name}
                      </span>
                      <span className="text-neutral-400 text-[11px]">
                        {stem.format} • {stem.size}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(stem.name)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#c8ff00] hover:text-black text-white text-xs font-heading font-semibold transition-all shrink-0"
                  >
                    {downloadingStem === stem.name ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Packaging...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => handleDownload('All Stems ZIP')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c8ff00] hover:bg-[#d4ff32] text-black font-heading font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(200,255,0,0.3)] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download All Stems Bundle (.ZIP)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Social & Embed Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-5">
            <h3 className="font-heading font-bold text-lg text-white">
              Interactive Audio Share Card
            </h3>
            
            {/* Mock Player Card Preview */}
            <div className="p-4 rounded-xl bg-[#070a14] border border-[#00d2ff]/30 shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-[#ec4899] to-[#00d2ff] flex items-center justify-center shadow-md">
                  <Music2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    Echoes of Horizon
                  </h4>
                  <p className="text-xs text-[#00d2ff] font-mono">
                    PromptSUNO v6.4 • 128 BPM
                  </p>
                </div>
              </div>

              {/* Simulated mini waveform */}
              <div className="flex items-end gap-1 h-8 w-full py-1">
                {[40, 60, 90, 75, 40, 20, 80, 100, 65, 30, 70, 85, 45, 95, 60, 40, 20, 50, 70, 90, 80, 60].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-[#c8ff00] rounded-t-sm"
                  />
                ))}
              </div>

              <div className="text-[10px] font-mono text-neutral-400 flex justify-between">
                <span>Lossless 48kHz Codec</span>
                <span>sunov6.wiki</span>
              </div>
            </div>

            {/* Link Copy */}
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-300">
                Shareable Track Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://sunov6.wiki/track/echoes-of-horizon?stems=48khz"
                  className="flex-1 bg-[#080c16] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg bg-[#c8ff00] text-black text-xs font-heading font-bold uppercase hover:bg-[#d4ff32] transition-colors shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Broadcast message */}
            <div className="p-3 rounded-lg bg-[#141d33] border border-white/5 text-[11px] font-mono text-neutral-300">
              💡 When you share, other producers can remix your prompt, view isolated stems, or build variations directly in the Prompt Studio.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
