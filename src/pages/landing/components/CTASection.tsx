import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

export function CTASection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-slate-50 py-20 pb-16 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">

      {/* Minimal centered CTA */}
      <div className={cn(
        'flex flex-col items-center text-center max-w-2xl mx-auto transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}>
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Start protecting.
        </h2>

        <Link to="/register" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-6">
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="text-sm text-slate-400 font-medium">Free forever · Easy setup · Chrome, Firefox & Edge</p>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400 font-medium">
        <span className="text-slate-500 font-semibold mb-4 md:mb-0">Safty © {new Date().getFullYear()}</span>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Docs</a>
        </div>
      </div>
    </section>
  );
}
