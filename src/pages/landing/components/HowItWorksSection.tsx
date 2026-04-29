import React from 'react';
import { Download, Scan, ShieldCheck, Bell } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

const steps = [
  { num: '01', icon: Download, title: 'Install', desc: 'Add Safty to your browser in one click — Chrome, Firefox, or Edge.', color: 'bg-[#0967F7]/10 text-[#0967F7]', numColor: 'text-[#0967F7]' },
  { num: '02', icon: Scan, title: 'Scan', desc: 'Every page is analyzed in real-time as you browse, automatically.', color: 'bg-cyan-50 text-cyan-600', numColor: 'text-cyan-500' },
  { num: '03', icon: ShieldCheck, title: 'Neutralize', desc: 'Malicious content is blocked before it reaches you — in under 50ms.', color: 'bg-emerald-50 text-emerald-600', numColor: 'text-emerald-500' },
  { num: '04', icon: Bell, title: 'Report', desc: 'Get a clear security dashboard with detailed reports and threat history.', color: 'bg-amber-50 text-amber-600', numColor: 'text-amber-500' },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} id="product" className="bg-white py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={cn(
          'text-center mb-16 max-w-2xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0967F7]/10 text-[#0967F7] text-xs font-bold tracking-widest uppercase mb-5">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Four steps. Two minutes.<br />Total protection.
          </h2>
          <p className="text-slate-400 text-lg font-medium">No configuration required. Just install and browse safely.</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                'relative rounded-3xl bg-white border border-slate-100 p-6 flex flex-col gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
            >
              {/* Step number */}
              <span className={cn('absolute top-5 right-5 text-3xl font-black opacity-10', step.numColor)}>
                {step.num}
              </span>

              {/* Icon */}
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center', step.color)}>
                <step.icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector dot */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
