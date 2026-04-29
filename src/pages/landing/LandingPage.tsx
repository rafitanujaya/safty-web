import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ThreatExamplesSection } from './components/ThreatExamplesSection';
import { WhySaftySection } from './components/WhySaftySection';
import { CTASection } from './components/CTASection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ThreatExamplesSection />
      <WhySaftySection />
      <CTASection />
    </div>
  );
}
