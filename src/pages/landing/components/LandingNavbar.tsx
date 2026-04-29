import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#product' },
  { label: 'Threats', href: '#threats' },
  { label: 'Why Us', href: '#why' },
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-out',
      scrolled ? 'top-4 px-4' : 'top-0 px-0'
    )}>
      <div className={cn(
        'mx-auto flex items-center justify-between transition-all duration-300 ease-out',
        scrolled
          ? 'max-w-5xl bg-white border border-slate-200 rounded-full px-6 py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
          : 'max-w-[1600px] bg-transparent px-6 md:px-10 py-5 md:py-6'
      )}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#0967F7] flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4"><path fillRule="evenodd" d="M10 1.5L3 5v5c0 4.418 3.134 8.548 7 9.5C13.866 18.548 17 14.418 17 10V5L10 1.5z" clipRule="evenodd" /></svg>
          </div>
          <span className={cn(
            'font-bold tracking-tight transition-all text-slate-900',
            scrolled ? 'text-base' : 'text-lg'
          )}>Safty</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-full font-medium transition-all duration-200 px-4 py-2 text-sm',
                scrolled
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={cn(
              'hidden md:inline-flex font-semibold transition-colors text-sm px-4 py-2',
              scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
            )}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className={cn(
              'flex items-center gap-2 rounded-full bg-[#0967F7] text-white font-semibold hover:bg-[#0967F7]/90 transition-all hover:scale-105 shadow-[0_2px_12px_rgba(9,103,247,0.25)]',
              scrolled ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm'
            )}
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}
