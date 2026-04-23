import React from 'react';
import { AlertTriangle, Ban, FileWarning } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function ThreatExamplesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-[#060d1e] py-28 md:py-36 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full rounded-[2.5rem] my-8 overflow-hidden relative">

      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className={cn(
        'text-center mb-16 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Real Threats. Neutralized.
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Examples of attacks our engine has intercepted.
        </p>
      </div>

      {/* Bento-style layout — NOT uniform grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto relative z-10">

        {/* Large card — spans 3 columns */}
        <div
          className={cn(
            'md:col-span-3 p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:bg-white/[0.07]',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          )}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-red-500/15 text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-red-400/80 uppercase tracking-widest">Phishing · Critical</span>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Fake Login Page</h3>
            <p className="text-sm text-slate-500 font-mono">secure-login-paypal-verify.com</p>
          </div>
        </div>

        {/* Small card — spans 2 columns */}
        <div
          className={cn(
            'md:col-span-2 p-8 rounded-3xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:bg-white/[0.07]',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          )}
          style={{ transitionDelay: '250ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <FileWarning className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-400/80 uppercase tracking-widest">Download · High</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Trojan Disguised as PDF</h3>
            <p className="text-sm text-slate-500 font-mono">invoice-782.zip</p>
          </div>
        </div>

        {/* Small card — spans 2 columns */}
        <div
          className={cn(
            'md:col-span-2 p-8 rounded-3xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm flex flex-col justify-between min-h-[220px] transition-all duration-500 hover:bg-white/[0.07]',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <Ban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">Harvesting · Critical</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Card Skimmer Overlay</h3>
            <p className="text-sm text-slate-500 font-mono">bank-update.info</p>
          </div>
        </div>

        {/* Wide banner card — spans 3 columns */}
        <div
          className={cn(
            'md:col-span-3 p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-6 transition-all duration-500 hover:bg-emerald-500/15',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          )}
          style={{ transitionDelay: '550ms' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-400">All threats neutralized.</span>
            <span className="text-slate-500 ml-3 text-sm font-medium">Your browsing session is secure.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
