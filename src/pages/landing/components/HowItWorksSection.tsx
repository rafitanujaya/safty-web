import React from 'react';
import { Download, Scan, ShieldCheck, Bell, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const steps = [
    {
      num: '01',
      icon: Download,
      title: 'Install',
      accent: 'text-blue-500',
      desc: 'Add the extension to your browser in one click.',
    },
    {
      num: '02',
      icon: Scan,
      title: 'Scan',
      accent: 'text-cyan-500',
      desc: 'Every page is analyzed in real-time automatically.',
    },
    {
      num: '03',
      icon: ShieldCheck,
      title: 'Neutralize',
      accent: 'text-emerald-500',
      desc: 'Malicious content is blocked before it reaches you.',
    },
    {
      num: '04',
      icon: Bell,
      title: 'Report',
      accent: 'text-amber-500',
      desc: 'Get detailed reports on your security dashboard.',
    },
  ];

  return (
    <section ref={ref} id="product" className="bg-white py-32 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">

      {/* Horizontal pipeline */}
      <div className={cn(
        'flex flex-col items-center transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-center">
          How It Works
        </h2>
        <p className="text-slate-400 font-medium text-center mb-20 max-w-md">
          Four steps. Two minutes. Total protection.
        </p>

        {/* Pipeline Row */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={cn(
                  'flex flex-col items-center gap-3 max-w-[180px] transition-all duration-500',
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                )}
                style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
              >
                <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center group hover:border-slate-200 hover:scale-110 transition-all duration-300">
                  <step.icon className={cn('w-8 h-8', step.accent)} />
                </div>
                <span className="text-xs font-bold text-slate-300 tracking-widest">{step.num}</span>
                <span className="text-base font-bold text-slate-900">{step.title}</span>
                <p className="text-xs text-slate-400 text-center leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center h-20 mx-2 lg:mx-4 xl:mx-6">
                  <div className="w-10 lg:w-16 xl:w-24 h-[2px] bg-gradient-to-r from-slate-200 to-slate-100" />
                  <ArrowRight className="w-4 h-4 text-slate-200 -ml-1" />
                </div>
              )}
              {i < steps.length - 1 && (
                <div className="block md:hidden h-8 w-[2px] bg-slate-100 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
