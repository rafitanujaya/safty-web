import React from 'react';
import { Zap, Clock, Fingerprint, Wifi } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function WhySafeGuardXSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const items = [
    { icon: Zap, title: 'Zero-Day Ready', desc: 'Behavioral analysis catches unknown threats.' },
    { icon: Clock, title: 'Sub-50ms', desc: 'In-browser, no round-trip to servers.' },
    { icon: Fingerprint, title: 'Privacy-First', desc: 'All scanning happens locally.' },
    { icon: Wifi, title: 'Works Offline', desc: 'Cached signatures, always protected.' },
  ];

  return (
    <section ref={ref} className="bg-slate-50 py-32 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">
      <div className="max-w-6xl mx-auto">

        {/* Asymmetric two-column: big text left, stacked items right */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* Left: ONE bold statement */}
          <div className={cn(
            'flex-1 lg:sticky lg:top-32 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Not just <br />another <br />blocker.
            </h2>
            <div className="w-16 h-1.5 bg-blue-500 rounded-full" />
          </div>

          {/* Right: Stacked vertical list — NOT a grid */}
          <div className="flex-1 flex flex-col gap-0">
            {items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'group flex items-start gap-6 py-10 border-b border-slate-200 last:border-0 transition-all duration-500 cursor-default',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                )}
                style={{ transitionDelay: isVisible ? `${200 + i * 120}ms` : '0ms' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 font-medium text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
