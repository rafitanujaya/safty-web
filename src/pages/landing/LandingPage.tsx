import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhySafeGuardXSection } from './components/WhySafeGuardXSection';
import { DashboardPreviewSection } from './components/DashboardPreviewSection';
import { ThreatExamplesSection } from './components/ThreatExamplesSection';
import { CTASection } from './components/CTASection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ThreatExamplesSection />
      <WhySafeGuardXSection />
      <DashboardPreviewSection />
      <CTASection />
    </div>
  );
}
