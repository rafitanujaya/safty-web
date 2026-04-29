import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNavbar } from './LandingNavbar';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';

const AVATAR_COLORS = ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-cyan-400'];

export function HeroSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col overflow-hidden">
      <LandingNavbar />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(9,103,247,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(9,103,247,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#0967F7]/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#5969AB]/8 blur-[100px] pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-40 pb-20 max-w-5xl mx-auto w-full flex-1 justify-center">

        {/* Social proof badge */}
        <div className="flex items-center gap-3 mb-8 animate-slide-up">
          <div className="flex -space-x-2">
            {AVATAR_COLORS.map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${c} flex items-center justify-center text-[10px] text-white font-bold`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-slate-500 font-medium">
            <span className="text-slate-800 font-semibold">10k+</span> users protected worldwide
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-slide-up text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 max-w-4xl">
          Your Browser's{' '}
          <span className="text-[#0967F7]">AI Security</span>{' '}
          Layer
        </h1>

        <p className="animate-slide-up-delay-1 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Safty detects phishing, blocks malicious files, and neutralizes scams in real-time —
          before they can do any damage.
        </p>

        {/* Email CTA */}
        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#0967F7]/50 focus:ring-2 focus:ring-[#0967F7]/10 transition-all bg-white"
          />
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0967F7] text-white font-semibold text-sm hover:bg-[#0967F7]/90 hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(9,103,247,0.3)] whitespace-nowrap"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-slate-400">Free forever · No credit card · Chrome, Firefox &amp; Edge</p>

        {/* Trust badges row */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-slide-up-delay-2">
          {[
            { icon: ShieldCheck, label: 'SOC 2 Compliant' },
            { icon: Users, label: '10k+ Users' },
            { icon: ShieldCheck, label: '99.9% Detection Rate' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <b.icon className="w-4 h-4 text-[#0967F7]" />
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '98%', label: 'Phishing detection rate' },
            { value: '<50ms', label: 'Response time' },
            { value: '10k+', label: 'Active users' },
            { value: '5M+', label: 'Threats blocked' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
