import React from 'react';
import { Zap, Clock, Fingerprint, Wifi, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

const items = [
  { icon: Zap, title: 'Zero-Day Ready', desc: 'Behavioral analysis catches unknown threats that signature databases miss.' },
  { icon: Clock, title: 'Sub-50ms Response', desc: 'All scanning happens in-browser with no round-trip to external servers.' },
  { icon: Fingerprint, title: 'Privacy-First', desc: 'Your data never leaves your device. All scanning is done locally.' },
  { icon: Wifi, title: 'Works Offline', desc: 'Cached threat signatures keep you protected even without internet.' },
];

const checklist = [
  'No subscription required for core protection',
  'Career-focused threat intelligence updates',
  'Real-world detection scenarios',
  'Flexible — works on any website',
];

export function WhySaftySection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} id="why" className="bg-white py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: headline + checklist (eClaster-style) */}
          <div className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0967F7]/10 text-[#0967F7] text-xs font-bold tracking-widest uppercase mb-6">
              Why Safty
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              We protect users<br />and professionals<br />
              <span className="text-[#0967F7]">from real threats.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
              Not just another blocker. Safty combines behavioral AI, signature matching, and real-time analysis to stop threats before they happen.
            </p>

            <ul className="space-y-3">
              {checklist.map((c, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#0967F7] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-3xl bg-[#F3F6FC] border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-500 group',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : '0ms' }}
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-[#0967F7]/20 transition-all">
                  <item.icon className="w-5 h-5 text-[#0967F7]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#0967F7] transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
