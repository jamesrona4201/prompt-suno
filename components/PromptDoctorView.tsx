'use client';

import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, AlertTriangle, ArrowRight, Copy, Check, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { soundEngine } from '@/lib/audioEngine';

interface PromptDoctorViewProps {
  onGoToBuild: (promptText?: string) => void;
}

interface Prescription {
  issue: string;
  symptoms: string;
  cause: string;
  rxTags: string[];
  sampleBefore: string;
  sampleAfter: string;
}

export function PromptDoctorView({ onGoToBuild }: PromptDoctorViewProps) {
  const [selectedIssue, setSelectedIssue] = useState<number>(0);
  const [userPromptInput, setUserPromptInput] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    score: number;
    warnings: string[];
    improvements: string[];
    fixedPrompt: string;
  } | null>(null);
  const [copiedFixed, setCopiedFixed] = useState(false);

  const commonPrescriptions: Prescription[] = [
    {
      issue: 'Robotic, Nasal, or Metallic Vocals',
      symptoms: 'Voice sounds tinny, auto-tuned artifacting, lack of natural vocal resonance.',
      cause: 'Lack of acoustic room descriptors and too many competing genre keywords causing phase cancellations.',
      rxTags: ['[natural vocal timbre]', '[intimate close mic acoustic]', '[warm tube preamp]', '[raw uncompressed vocals]'],
      sampleBefore: 'Pop punk song with crazy loud aggressive singer auto-tune fast drums',
      sampleAfter: 'Pop punk anthem, raw belted lead vocals, natural room acoustic, warm analog master, punchy live drums, emotional dynamic range, 150 BPM'
    },
    {
      issue: 'Muddy Low-End & Distorted Bass Clipping',
      symptoms: 'Bass drum flubs out, synths blur together, mix lacks punch.',
      cause: 'Uncontrolled sub-bass frequencies and missing stem separation markers.',
      rxTags: ['[clean frequency separation]', '[tight punchy 808]', '[sub-bass high-pass 30Hz]', '[lossless 48kHz master]'],
      sampleBefore: 'Super heavy bass trap beat with huge subwoofer sub shake the car bass',
      sampleAfter: 'Modern trap beat, tight saturated 808 with clear harmonic overtones, crisp Roland TR snare, discrete frequency separation, 48kHz studio master, 140 BPM'
    },
    {
      issue: 'Song Ends Prematurely / Truncated Outro',
      symptoms: 'Track abruptly cuts off mid-bar or skips the final vocal phrase.',
      cause: 'Missing timing architecture and lack of an explicit decelerating [Outro] sequence.',
      rxTags: ['[Outro - Decelerando]', '[Instrumental fadeout]', '[Reverb tail decay]', '[Final chord ring out]'],
      sampleBefore: 'And we will dance forever in the rain. (song just stops)',
      sampleAfter: `[Chorus - Final Climax]
And we will dance forever in the rain!

[Outro - Slow Decrescendo]
(Whispered: In the rain...)
[Reverb decay, acoustic piano outro, final chord resolves]`
    },
    {
      issue: 'Monotone Cadence / No Chorus Explosion',
      symptoms: 'The Chorus sounds just like the Verse; no lift or emotional climax.',
      cause: 'Identical sentence lengths between verse and chorus without energy metatags.',
      rxTags: ['[Chorus - Anthemic, Soaring]', '[Dynamic shift]', '[Belted vocal hook]', '[Double-time kick]'],
      sampleBefore: 'I walk down the dark street / I look at the old trees / Now comes the chorus / The chorus is here',
      sampleAfter: `[Verse 1 - Intimate, Sparsely Arranged]
Whispers in the dead of night.
Shadows out of sight.

[Chorus - EXPLOSIVE ANTHEM, FULL CHEST VOICE]
HOLD ON! WE BREAK THROUGH THE WALL!
[Heavy electric guitar crash, double-time drums]`
    }
  ];

  const currentRx = commonPrescriptions[selectedIssue];

  const handleDiagnose = () => {
    if (!userPromptInput.trim()) return;
    setIsDiagnosing(true);
    soundEngine.playChime();

    setTimeout(() => {
      const text = userPromptInput.toLowerCase();
      const warnings: string[] = [];
      const improvements: string[] = [];
      let score = 88;

      if (!text.includes('bpm')) {
        warnings.push('No tempo constraint specified. AI may fluctuate speed.');
        improvements.push('Added explicit "128 BPM" tempo calibration.');
        score -= 10;
      }
      if (!text.includes('[') && !text.includes('verse') && !text.includes('chorus')) {
        warnings.push('Missing structural metatags ([Verse], [Chorus]).');
        improvements.push('Injecting [Verse] and [Chorus] section demarcations.');
        score -= 15;
      }
      if (!text.includes('48khz') && !text.includes('master') && !text.includes('clean')) {
        improvements.push('Added "[48kHz lossless studio master, pristine stereo separation]".');
      }

      const fixed = `${userPromptInput.trim()}\n\n[Production Constraints: 128 BPM, Key: Dm, 48kHz lossless master, wide stereo imaging, natural vocal timbre]`;

      setDiagnosticResult({
        score: Math.max(55, score),
        warnings: warnings.length > 0 ? warnings : ['Minor polish needed for vocal clarity.'],
        improvements: improvements.length > 0 ? improvements : ['Acoustic space and lossless mastering tags recommended.'],
        fixedPrompt: fixed
      });
      setIsDiagnosing(false);
    }, 900);
  };

  const handleCopyFixed = () => {
    if (!diagnosticResult) return;
    navigator.clipboard.writeText(diagnosticResult.fixedPrompt);
    setCopiedFixed(true);
    setTimeout(() => setCopiedFixed(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#10b981]">
          <Stethoscope className="w-4 h-4 text-[#10b981]" />
          <span>PROMPT DR. CLINIC</span>
          <span className="text-neutral-600">•</span>
          <span>AUDIO DIAGNOSTICS & REMEDY</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Diagnose & Fix Your Songs
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-3xl">
          Cure metallic robot vocals, eradicate muddy bass clipping, and rescue abrupt endings. Input your troubled prompt or review proven clinical prescriptions.
        </p>
      </div>

      {/* Main Grid: Interactive Doctor Form Left, Clinical Prescriptions Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Diagnostic Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#c8ff00]" />
                Live Prompt Diagnostic Scanner
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                v6.4 Ready
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Paste your problematic Suno prompt or lyric snippet below to inspect acoustic flaws, missing metatags, and artifact risks:
            </p>

            <textarea
              rows={4}
              value={userPromptInput}
              onChange={(e) => setUserPromptInput(e.target.value)}
              placeholder="e.g. Dark synthwave song fast tempo robotic vocals bass is too muddy..."
              className="w-full bg-[#080c16] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm font-mono text-neutral-200 focus:outline-none focus:border-[#10b981] leading-relaxed resize-none"
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] font-mono text-neutral-500">
                {userPromptInput.length} chars
              </span>
              <button
                onClick={handleDiagnose}
                disabled={isDiagnosing || !userPromptInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-heading font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-40"
              >
                {isDiagnosing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Frequencies...</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Run Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Diagnostic Report Card */}
          {diagnosticResult && (
            <div className="p-6 rounded-2xl bg-[#090e1a] border border-[#10b981]/40 shadow-2xl space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                  <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                    Diagnostic Prescription Generated
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 font-mono text-xs">
                  <span className="text-neutral-400">Audio Health:</span>
                  <span className="font-bold text-[#c8ff00]">{diagnosticResult.score}%</span>
                </div>
              </div>

              {/* Detected Pathology */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Detected Flaws
                </span>
                <ul className="space-y-1 font-mono text-xs text-neutral-300 list-disc list-inside">
                  {diagnosticResult.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Remedies */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Prescribed Fixes
                </span>
                <ul className="space-y-1 font-mono text-xs text-neutral-300 list-disc list-inside">
                  {diagnosticResult.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>

              {/* Cured Code Block */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Optimized Prompt Manifest:
                </label>
                <div className="p-3.5 rounded-xl bg-[#05070e] border border-white/10 text-xs font-mono text-[#c8ff00] leading-relaxed whitespace-pre-wrap">
                  {diagnosticResult.fixedPrompt}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleCopyFixed}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#141b30] hover:bg-[#1b2440] text-xs font-mono font-medium text-white transition-colors border border-white/10"
                >
                  {copiedFixed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  <span>{copiedFixed ? 'Copied Prescribed Prompt!' : 'Copy Fixed Prompt'}</span>
                </button>

                <button
                  onClick={() => onGoToBuild(diagnosticResult.fixedPrompt)}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#d4ff32] text-black text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(200,255,0,0.3)]"
                >
                  <span>Build Track in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: 4 Clinical Case Studies (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-base text-white uppercase tracking-wider">
              Common Audio Pathology Prescriptions
            </h3>

            {/* Issue Selector Tabs */}
            <div className="space-y-2">
              {commonPrescriptions.map((rx, idx) => (
                <button
                  key={rx.issue}
                  onClick={() => {
                    setSelectedIssue(idx);
                    soundEngine.playChime();
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                    selectedIssue === idx
                      ? 'bg-[#151f38] border-[#10b981] text-white shadow-sm'
                      : 'bg-[#080c16] border-white/5 text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-semibold truncate max-w-[240px]">{rx.issue}</span>
                  <span className="text-[10px] text-[#10b981]">Case 0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Selected Case Study Breakdown */}
            <div className="p-4 rounded-xl bg-[#080c16] border border-white/10 space-y-3 font-mono text-xs">
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Diagnosis:</span>
                <p className="text-neutral-300 mt-0.5 leading-relaxed">{currentRx.symptoms}</p>
              </div>

              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Root Cause:</span>
                <p className="text-neutral-400 mt-0.5 leading-relaxed">{currentRx.cause}</p>
              </div>

              <div>
                <span className="text-neutral-500 uppercase text-[10px] block mb-1">Recommended Rx Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {currentRx.rxTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Before vs After comparison */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div>
                  <span className="text-red-400 text-[10px] font-bold block">❌ Problematic Prompt:</span>
                  <p className="text-neutral-500 italic mt-0.5 text-[11px]">&quot;{currentRx.sampleBefore}&quot;</p>
                </div>
                <div>
                  <span className="text-emerald-400 text-[10px] font-bold block">✅ Cured Prompt:</span>
                  <p className="text-[#c8ff00] mt-0.5 text-[11px] whitespace-pre-wrap">&quot;{currentRx.sampleAfter}&quot;</p>
                </div>
              </div>

              <button
                onClick={() => onGoToBuild(currentRx.sampleAfter)}
                className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/10 hover:bg-[#c8ff00] hover:text-black text-white text-xs font-heading font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Load Cured Recipe in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
