'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { TopRibbon } from '@/components/TopRibbon';
import { HeroSection } from '@/components/HeroSection';
import { LearnSection } from '@/components/LearnSection';
import { CommunityBanner } from '@/components/CommunityBanner';
import { Footer } from '@/components/Footer';
import { PromptStudioView } from '@/components/PromptStudioView';
import { ExploreTracksView } from '@/components/ExploreTracksView';
import { LearnGuidesView } from '@/components/LearnGuidesView';
import { ShareStudioView } from '@/components/ShareStudioView';
import { PromptDoctorView } from '@/components/PromptDoctorView';
import { ThumbActionBar } from '@/components/ThumbActionBar';
import { ExperimentalModal } from '@/components/ExperimentalModal';
import { BottomAudioPlayer, ActiveTrack } from '@/components/BottomAudioPlayer';
import { soundEngine } from '@/lib/audioEngine';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isExperimentalOpen, setIsExperimentalOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [injectedPromptText, setInjectedPromptText] = useState<string | undefined>(undefined);

  // Sync URL hash for SEO, direct deep-linking and bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'learn', 'build', 'fix', 'explore', 'share'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Play/Pause
  const handlePlayTrack = (track: ActiveTrack) => {
    if (activeTrack?.title === track.title && isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
      soundEngine.startSynthLoop(track.bpm || 120, track.key || 'Dm');
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else if (activeTrack) {
      setIsPlaying(true);
      soundEngine.startSynthLoop(activeTrack.bpm || 120, activeTrack.key || 'Dm');
    } else {
      const defaultTrack: ActiveTrack = {
        title: 'Echoes of Horizon',
        genre: 'Cinematic Synth Rock',
        bpm: 128,
        duration: '3:42',
        key: 'Dm',
        prompt: 'Cinematic 80s synth rock ballad, soaring electric guitars, atmospheric reverb pads, driving tom fills, passionate female vocal lead, 128 BPM.'
      };
      setActiveTrack(defaultTrack);
      setIsPlaying(true);
      soundEngine.startSynthLoop(128, 'Dm');
    }
  };

  const handleClosePlayer = () => {
    soundEngine.stop();
    setIsPlaying(false);
    setActiveTrack(null);
  };

  const handleLearnAction = (actionId: 'learn' | 'build' | 'fix' | 'all') => {
    if (actionId === 'fix') {
      changeTab('fix');
    } else if (actionId === 'build') {
      changeTab('build');
    } else {
      changeTab('learn');
    }
  };

  return (
    <div className="min-h-screen bg-[#080a12] text-[#e1e1ee] flex flex-col font-sans selection:bg-[#c8ff00] selection:text-black relative">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        onOpenExperimental={() => setIsExperimentalOpen(true)}
      />

      {/* Status Ribbon with Mottos and Model Health */}
      <TopRibbon
        onOpenModelStatus={() => setIsExperimentalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-32">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section */}
            <HeroSection
              onExplore={() => changeTab('build')}
              onOpenCreate={() => changeTab('build')}
            />

            {/* 3 Primary Cards: LEARN, BUILD, FIX */}
            <LearnSection
              onSelectAction={handleLearnAction}
            />

            {/* Community & Creation Banner */}
            <CommunityBanner
              onGetStarted={() => changeTab('build')}
            />
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="animate-in fade-in duration-300">
            <LearnGuidesView
              onGoToStudio={() => changeTab('build')}
            />
          </div>
        )}

        {activeTab === 'build' && (
          <div className="animate-in fade-in duration-300">
            <PromptStudioView
              key={injectedPromptText || 'studio'}
              initialPromptText={injectedPromptText}
              onPlayGeneratedTrack={(track) => {
                setActiveTrack(track);
                setIsPlaying(true);
              }}
            />
          </div>
        )}

        {activeTab === 'fix' && (
          <div className="animate-in fade-in duration-300">
            <PromptDoctorView
              onGoToBuild={(curedPrompt) => {
                if (curedPrompt) {
                  setInjectedPromptText(curedPrompt);
                }
                changeTab('build');
              }}
            />
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="animate-in fade-in duration-300">
            <ExploreTracksView
              onPlayTrack={handlePlayTrack}
              currentPlayingTitle={activeTrack?.title}
              isPlaying={isPlaying}
            />
          </div>
        )}

        {activeTab === 'share' && (
          <div className="animate-in fade-in duration-300">
            <ShareStudioView />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={changeTab}
      />

      {/* Persistent Bottom Audio Player */}
      <BottomAudioPlayer
        track={activeTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onClose={handleClosePlayer}
        onViewPrompt={(track) => {
          changeTab('explore');
        }}
      />

      {/* Thumb-Zone Bottom Action Bar with 3 Primary Buttons: LEARN, BUILD, FIX */}
      <ThumbActionBar
        activeTab={activeTab}
        setActiveTab={changeTab}
        hasActivePlayer={Boolean(activeTrack)}
      />

      {/* Experimental Audio Lab Modal */}
      <ExperimentalModal
        isOpen={isExperimentalOpen}
        onClose={() => setIsExperimentalOpen(false)}
      />

    </div>
  );
}
