import React from 'react';
import { Shield, Eye, FileWarning, MousePointerClick, Globe, Layers } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const features = [
    {
      icon: Eye,
      title: 'Phishing Website Detection',
      desc: 'Identifies and blocks fake login pages impersonating banks, social media, and email providers in real-time.',
      color: 'bg-red-50 text-red-600 border-red-100',
      hoverColor: 'group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500',
    },
    {
      icon: MousePointerClick,
      title: 'Fake Form Prevention',
      desc: 'Detects credential harvesting forms and suspicious input fields designed to steal your passwords and sensitive data.',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      hoverColor: 'group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500',
    },
    {
      icon: FileWarning,
      title: 'Disguised File Blocking',
      desc: 'Intercepts malicious downloads disguised as PDFs, invoices, or images before they can execute on your system.',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      hoverColor: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500',
    },
    {
      icon: Globe,
      title: 'Malicious Redirect Shield',
      desc: 'Monitors and blocks suspicious redirects and scam links that attempt to move you to dangerous destinations.',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      hoverColor: 'group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-500',
    },
    {
      icon: Shield,
      title: 'DOM Manipulation Guard',
      desc: 'Watches for hidden scripts that inject malicious content, modify page behavior, or overlay fake UI elements.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      hoverColor: 'group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500',
    },
    {
      icon: Layers,
      title: 'Image Fraud Analysis',
      desc: 'Detects manipulated images such as fake payment receipts, doctored screenshots, and fraudulent proof of transfer.',
      color: 'bg-slate-100 text-slate-600 border-slate-200',
      hoverColor: 'group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-700',
    }
  ];

  return (
    <section ref={ref} id="features" className="max-w-[1600px] mx-auto w-full relative mb-250">
      <div className='absolute -top-20 left-0 right-0 rounded-t-4xl bg-white z-10 py-38 md:py-36 px-6 md:px-12 lg:px-20'>
        <div className={cn(
          'text-center mb-20 max-w-3xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
            <Shield className="w-3.5 h-3.5" />
            What We Protect Against
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            6 Layers of <br className="hidden md:block" />Browser Protection
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Safty is a browser extension that acts as your personal security guard, actively monitoring every web interaction for threats.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={cn(
                'group flex flex-col p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-default',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              )}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : '0ms' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7 border transition-all duration-500 ${f.color} ${f.hoverColor}`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{f.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium flex-1 text-[15px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
