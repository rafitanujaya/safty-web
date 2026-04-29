import React from 'react';
import { Shield, Eye, FileWarning, MousePointerClick, Globe, Layers, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

const features = [
  {
    icon: Eye,
    title: 'Phishing Detection',
    desc: 'Identifies fake login pages impersonating banks, social media, and email providers in real-time.',
    tag: 'Real-time',
    featured: true,   // big card, blue bg
  },
  {
    icon: MousePointerClick,
    title: 'Fake Form Prevention',
    desc: 'Detects credential harvesting forms designed to steal your passwords.',
    tag: 'Instant block',
    featured: false,
  },
  {
    icon: FileWarning,
    title: 'Disguised File Blocking',
    desc: 'Intercepts malicious downloads disguised as PDFs or invoices before execution.',
    tag: 'Zero-day ready',
    featured: false,
  },
  {
    icon: Globe,
    title: 'Malicious Redirect Shield',
    desc: 'Blocks suspicious redirects and scam links that route you to dangerous destinations.',
    tag: 'Always on',
    featured: false,
  },
  {
    icon: Shield,
    title: 'DOM Manipulation Guard',
    desc: 'Watches for hidden scripts that inject malicious content or overlay fake UI elements.',
    tag: 'AI-powered',
    featured: false,
  },
  {
    icon: Layers,
    title: 'Image Fraud Analysis',
    desc: 'Detects manipulated images — fake receipts, doctored screenshots, and fraudulent proof of transfer.',
    tag: 'Forensic',
    featured: false,
  },
];

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} id="features" className="bg-[#F3F6FC] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={cn(
          'mb-14 max-w-2xl transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0967F7]/10 text-[#0967F7] text-xs font-bold tracking-widest uppercase mb-5">
            <Shield className="w-3 h-3" /> Protection Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            6 layers of browser<br />protection
          </h2>
          <p className="text-slate-500 text-lg mt-4 font-medium leading-relaxed">
            Safty acts as your personal security guard, actively monitoring every web interaction.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Featured big card — col 1-2, row 1 */}
          <div
            className={cn(
              'md:col-span-2 relative rounded-3xl p-8 bg-[#0967F7] text-white overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '0ms' : '0' }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/6 pointer-events-none" />
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 rounded-2xl bg-white/15">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 tracking-wider uppercase">Real-time</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Phishing Detection</h3>
              <p className="text-blue-100 text-[15px] leading-relaxed max-w-sm">
                Identifies fake login pages impersonating banks, social media, and email providers in real-time — before you even notice.
              </p>
            </div>
          </div>

          {/* Card 2 — right, row 1 */}
          {[features[1]].map((f, i) => (
            <div
              key={i}
              className={cn(
                'rounded-3xl p-6 bg-white border border-slate-100 flex flex-col justify-between min-h-[220px] transition-all duration-500 hover:-translate-y-1 hover:shadow-md group',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isVisible ? '100ms' : '0' }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                  <f.icon className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100 tracking-wider uppercase">{f.tag}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}

          {/* Cards 3-5 — 3 columns row 2 */}
          {features.slice(2, 5).map((f, i) => {
            const iconColors = ['bg-blue-50 border-blue-100 text-blue-600', 'bg-cyan-50 border-cyan-100 text-cyan-600', 'bg-emerald-50 border-emerald-100 text-emerald-600'];
            return (
              <div
                key={i}
                className={cn(
                  'rounded-3xl p-6 bg-white border border-slate-100 flex flex-col justify-between min-h-[180px] transition-all duration-500 hover:-translate-y-1 hover:shadow-md',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: isVisible ? `${(i + 2) * 100}ms` : '0' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={cn('p-3 rounded-2xl border', iconColors[i])}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100 tracking-wider uppercase">{f.tag}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}

          {/* Last card — image fraud, spans 2 cols navy */}
          <div
            className={cn(
              'md:col-span-1 rounded-3xl p-6 bg-[#082051] text-white flex flex-col justify-between min-h-[180px] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '500ms' : '0' }}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="p-3 rounded-2xl bg-white/10">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/15 text-blue-200 tracking-wider uppercase">Forensic</span>
            </div>
            <div>
              <h3 className="text-base font-bold mb-1.5">Image Fraud Analysis</h3>
              <p className="text-blue-200 text-sm leading-relaxed">Detects manipulated images — fake receipts, doctored screenshots, and fraudulent proof.</p>
            </div>
          </div>

          {/* CTA inline card */}
          <div
            className={cn(
              'md:col-span-2 rounded-3xl p-6 bg-gradient-to-r from-[#0967F7]/6 to-[#5969AB]/6 border border-[#0967F7]/10 flex items-center gap-6 transition-all duration-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isVisible ? '550ms' : '0' }}
          >
            <div>
              <p className="font-bold text-slate-800 text-base mb-0.5">Comprehensive protection, zero effort</p>
              <p className="text-slate-400 text-sm">All 6 layers active the moment you install the extension.</p>
            </div>
            <a href="#product" className="ml-auto shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0967F7] text-white text-sm font-semibold hover:bg-[#0967F7]/90 transition-all whitespace-nowrap">
              See how it works <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
