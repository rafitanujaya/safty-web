import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
  Company: ['About Us', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Support', 'Community', 'Status'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
};

export function CTASection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <>
      {/* CTA */}
      <section ref={ref} className="bg-white py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            'relative rounded-3xl bg-[#0967F7] overflow-hidden px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            {/* Glow */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/8 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/8 pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-200" />
                <span className="text-blue-200 text-sm font-semibold">Start protecting today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Start Your Journey<br />with Safty Today
              </h2>
              <p className="text-blue-100 text-lg font-medium leading-relaxed">
                Join 10,000+ users browsing smarter. Free forever, easy setup, no credit card.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 shrink-0">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#0967F7] font-bold text-base hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-lg whitespace-nowrap"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold text-base hover:bg-white/15 transition-all whitespace-nowrap border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* Top: logo + links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#0967F7] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900 tracking-tight">Safty</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">AI-powered browser security for everyone.</p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{col}</p>
                <ul className="space-y-2.5">
                  {links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-500 hover:text-[#0967F7] transition-colors font-medium">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
