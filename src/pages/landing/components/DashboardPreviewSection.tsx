import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function DashboardPreviewSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} id="dashboard" className="bg-white py-28 md:py-36 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">

      {/* Full-width single card with embedded mockup */}
      <div className={cn(
        'relative max-w-5xl mx-auto rounded-3xl bg-slate-950 overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-[0.97]'
      )}>

        {/* Top content area inside the card */}
        <div className="px-8 md:px-14 pt-12 md:pt-16 pb-0 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Dashboard</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Your Command Center
              </h2>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-blue-50 transition-all shrink-0">
              Try Live Demo →
            </Link>
          </div>
        </div>

        {/* Embedded dashboard mockup — bottom section */}
        <div className="px-4 md:px-8 pb-0">
          <div className="w-full bg-[#0a0f1c] border-t border-x border-white/10 rounded-t-2xl overflow-hidden">

            {/* Browser chrome */}
            <div className="flex items-center px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="flex gap-2 mr-6">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="flex-1 max-w-xs mx-auto">
                <div className="bg-white/[0.04] rounded-lg px-3 py-1 text-[11px] text-slate-500 font-mono text-center border border-white/[0.04]">
                  safty.app/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Scanned', val: '14,250', c: 'border-blue-500/20' },
                  { label: 'Suspicious', val: '124', c: 'border-amber-500/20' },
                  { label: 'Safe', val: '14,101', c: 'border-emerald-500/20' },
                  { label: 'Alerts', val: '18', c: 'border-red-500/20' },
                ].map((card, i) => (
                  <div key={i} className={`bg-white/[0.03] border ${card.c} rounded-xl p-3`}>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">{card.label}</div>
                    <div className="text-xl font-bold text-white">{card.val}</div>
                  </div>
                ))}
              </div>

              {/* Chart simulation */}
              <div className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.05] relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
                      <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,120 L0,80 Q50,40 100,60 T200,30 T300,70 T400,20 L400,120 Z" fill="url(#previewGrad)" />
                  <path d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
