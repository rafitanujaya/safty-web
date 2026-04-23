import React, { useState, useEffect } from 'react';
import { Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
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
          ? 'max-w-4xl bg-[#060d1e] backdrop-blur-3xl border border-white/10 rounded-full px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'max-w-[1600px] bg-transparent px-6 md:px-10 py-5 md:py-6'
      )}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white group">
          <span className={cn(
            'font-bold tracking-[0.2em] uppercase transition-all',
            scrolled ? 'text-base' : 'text-lg'
          )}>SafeGuardX</span>
        </Link>

        {/* Center Links - Now visible even when notched */}
        <div className={cn(
          'hidden lg:flex items-center gap-1 rounded-full transition-all duration-300',
          scrolled
            ? 'px-0 py-0 bg-transparent border-transparent'
            : 'px-2 py-1.5 bg-white/5 border border-white/10 backdrop-blur-lg'
        )}>
          {['Product', 'Features', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={cn(
              "rounded-full font-medium transition-all duration-200",
              scrolled
                ? "px-4 py-2 text-sm text-slate-300 hover:text-white"
                : "px-5 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10"
            )}>
              {item}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className={cn(
            'hidden md:inline-flex font-medium text-slate-300 hover:text-white transition-colors',
            scrolled ? 'text-sm px-3' : 'text-sm px-4 py-2'
          )}>
            Log in
          </Link>
          <Link to="/dashboard" className={cn(
            'flex items-center gap-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]',
            scrolled ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm'
          )}>
            Launch App
          </Link>
        </div>

      </div>
    </nav>
  );
}
