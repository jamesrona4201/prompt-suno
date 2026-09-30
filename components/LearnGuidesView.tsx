'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, Music, Mic, FileText, ArrowRight } from 'lucide-react';

interface LearnGuidesViewProps {
  initialTopic?: string;
  onGoToStudio: () => void;
}

export function LearnGuidesView({ initialTopic = 'all', onGoToStudio }: LearnGuidesViewProps) {
  const [activeTab, setActiveTab] = useState<'lyrics' | 'prompts' | 'structure' | 'cheatsheet'>(
    initialTopic === 'lyrics' ? 'lyrics' : initialTopic === 'prompts' ? 'prompts' : 'lyrics'
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#00d2ff]">
          <span>KNOWLEDGE BASE & GUIDES</span>
          <span className="text-neutral-600">•</span>
          <span>sunov6.wiki</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Turn Ideas Into Music
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
          Complete blueprints to write hit lyrics, direct AI generation models, structure emotional drops, and export studio-ready audio.
        </p>
      </div>

      {/* Guide Category Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
        {[
          { id: 'lyrics', label: 'Write Better Lyrics', icon: Mic },
          { id: 'prompts', label: 'AI Prompt Directing', icon: Sparkles },
          { id: 'structure', label: 'Song Architecture & Tags', icon: Music },
          { id: 'cheatsheet', label: 'v6.4 Audio Model Cheat Sheet', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#c8ff00] text-black shadow-[0_0_15px_rgba(200,255,0,0.3)]'
                  : 'bg-[#0f1424] text-neutral-300 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'lyrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <span className="text-[#00d2ff]">01.</span> The Contrast Rule in Generative Lyrics
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Generative AI models like Suno v6.4 differentiate song sections primarily through <strong>line length</strong>, <strong>rhythm cadence</strong>, and <strong>metatags</strong>. If your Verse and Chorus have the same sentence structure, the AI will sing them with identical monotone energy.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#141a2e] border border-red-500/30">
                  <span className="text-red-400 font-bold block mb-2">❌ BAD: Flat Cadence</span>
                  <p className="text-neutral-400">
                    I wake up in the morning light<br/>
                    I see the sun is shining bright<br/>
                    I walk outside into the day<br/>
                    And everything will be okay
                  </p>
                  <span className="text-[10px] text-neutral-500 block mt-2">Identical 8-syllable rhyme scheme causes monotonous AI pitch.</span>
                </div>

                <div className="p-4 rounded-xl bg-[#141a2e] border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold block mb-2">✅ GOOD: Dynamic Metric</span>
                  <p className="text-neutral-200">
                    [Verse]<br/>
                    Shadows crawl along the floor.<br/>
                    Silence knocking at the heavy door.<br/>
                    [Chorus - Anthemic, Soaring]<br/>
                    WE LIGHT THE FIRE NOW!<br/>
                    No turning back.
                  </p>
                  <span className="text-[10px] text-neutral-500 block mt-2">Short punchy lines trigger energetic vocal shifts and dynamic drums.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <span className="text-[#a855f7]">02.</span> Vocal Expression Metatags
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                You can insert specific emotional markers inside parentheses or brackets right before lyric lines to direct the singer&apos;s vocal texture:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  { tag: '(Whispered)', desc: 'Intimate breathy close-mic' },
                  { tag: '(Belted vocals)', desc: 'Full chest voice power' },
                  { tag: '(Falsetto)', desc: 'High ethereal register' },
                  { tag: '(Vocal fry)', desc: 'Grungy rock undertone' },
                  { tag: '(Harmonized choir)', desc: 'Multi-voice stack' },
                  { tag: '(Spoken word)', desc: 'Rhythmic monologue' }
                ].map((item) => (
                  <div key={item.tag} className="p-3 rounded-lg bg-[#090d18] border border-white/5">
                    <span className="text-[#c8ff00] font-bold block">{item.tag}</span>
                    <span className="text-neutral-400 text-[11px]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right sidebar quick action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12192e] to-[#0a0d18] border border-[#c8ff00]/30 shadow-xl">
              <span className="text-[#c8ff00] font-mono text-xs font-bold uppercase tracking-wider block mb-2">
                Interactive Practice
              </span>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Try in Prompt Studio
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Put these lyric formulas to the test with our live prompt builder and 4-track stems visualizer.
              </p>
              <button
                onClick={onGoToStudio}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c8ff00] hover:bg-[#d4ff32] text-black font-heading font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02]"
              >
                <span>Open Prompt Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prompts' && (
        <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-white">
            The 4-Pillar AI Prompt Architecture
          </h2>
          <p className="text-sm text-neutral-300">
            Never write vague prompts like &quot;make a cool song&quot;. Instead, balance your prompt across the 4 foundational audio pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#141a2e] border border-[#00d2ff]/30">
              <h3 className="font-heading font-bold text-sm text-[#00d2ff] mb-1">
                Pillar 1: Genre & Era Heritage
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Specify sub-genres rather than broad terms. Say &quot;mid-80s dark synthwave with Oberheim synths&quot; instead of &quot;retro song&quot;.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141a2e] border border-[#a855f7]/30">
              <h3 className="font-heading font-bold text-sm text-[#a855f7] mb-1">
                Pillar 2: Acoustic Room & Production Vibe
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Describe space: &quot;Large arena reverb&quot;, &quot;intimate dry wooden studio acoustic&quot;, &quot;heavy sidechain compression pump&quot;.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141a2e] border border-[#facc15]/30">
              <h3 className="font-heading font-bold text-sm text-[#facc15] mb-1">
                Pillar 3: Lead Instrumentation
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Name specific instruments: &quot;Distorted Moog bass, Roland TR-808 snare, chiming Fender Stratocaster chords, analog cello&quot;.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141a2e] border border-[#10b981]/30">
              <h3 className="font-heading font-bold text-sm text-[#10b981] mb-1">
                Pillar 4: Emotional Trajectory & Climax
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Describe the arc: &quot;Slow brooding intro building to an explosive double-time guitar solo and triumphant resolution&quot;.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-white">
            Essential Song Structure Metatags
          </h2>
          <p className="text-sm text-neutral-300">
            Use these tags wrapped in brackets to command the neural sequencer when to transition sections:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {[
              { tag: '[Intro]', role: 'Builds atmospheric tension. Keep lyrics minimal or instrumental.' },
              { tag: '[Verse 1]', role: 'Establishes the narrative story, moderate tempo, clear vocals.' },
              { tag: '[Pre-Chorus]', role: 'Rhythmic acceleration, rising melodic line, anticipation.' },
              { tag: '[Chorus]', role: 'The peak hook, highest volume, thickest instrumental arrangement.' },
              { tag: '[Drop]', role: 'Electronic bass explosion with stripped vocals and heavy drum groove.' },
              { tag: '[Bridge]', role: 'Key change or emotional perspective shift before final climax.' },
              { tag: '[Guitar Solo]', role: 'Instrumental virtuosity break without vocal overlap.' },
              { tag: '[Outro]', role: 'Decelerating fadeout, repeating motif, reverb decay.' }
            ].map((s) => (
              <div key={s.tag} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#12172a] border border-white/5 gap-2">
                <span className="font-bold text-[#c8ff00] text-sm">{s.tag}</span>
                <span className="text-neutral-300">{s.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cheatsheet' && (
        <div className="p-6 rounded-2xl bg-[#0d1222] border border-white/10 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-white">
            v6.4 Audio Engine Specifications & Quality Flags
          </h2>
          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#090d18] border border-white/10 space-y-2">
              <span className="text-[#00d2ff] font-bold block">FIDELITY FLAGS</span>
              <p className="text-neutral-300">
                To guarantee 48kHz lossless rendering without metallic artifacts, append these tags to your prompt style field:
              </p>
              <div className="p-2.5 rounded bg-black/60 text-[#c8ff00] border border-white/5">
                [48kHz high resolution, pristine studio master, wide stereo imaging, clean vocal separation, zero mud, high dynamic range]
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090d18] border border-white/10 space-y-2">
              <span className="text-[#a855f7] font-bold block">VOCAL HARMONIES SHORTCUTS</span>
              <p className="text-neutral-300">
                For lush backing vocals:
              </p>
              <div className="p-2.5 rounded bg-black/60 text-white border border-white/5">
                (Backing vocals: &quot;Ooooh, hold on tight&quot;)<br/>
                (Call and response: &quot;Can you hear me?&quot; - &quot;I hear you now&quot;)
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
