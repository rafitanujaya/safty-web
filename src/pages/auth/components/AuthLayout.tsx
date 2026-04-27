import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import blackhole from '../../../assets/solar.jpg';

interface AuthLayoutProps {
  headline: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

export function AuthLayout({ headline, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">

      {/* ── Left Panel: Visual ───────────────────────── */}
      <div
        className="hidden md:flex md:w-[40%] relative flex-col justify-between"
        style={{
          backgroundImage: `url(${blackhole})`,
          backgroundSize: 'cover',
          backgroundPosition: '0% 190%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

        {/* Top brand label */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/60">
              Safty
            </span>
            <div className="h-px flex-1 bg-white/15" />
          </div>
        </div>

        {/* Bottom headline */}
        <div className="relative z-10 p-10 pb-12">
          <h2 className="text-h2 font-bold text-white leading-[1.15] tracking-tight">
            {headline}
          </h2>
          <p className="text-h7 text-white/50 mt-5 leading-relaxed max-w-[300px]">
            {description}
          </p>
        </div>
      </div>

      {/* ── Right Panel: Form ───────────────────────── */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-8 md:px-16 relative min-h-screen">
        <div className="w-full max-w-[360px]">
          {children}
        </div>
      </div>
    </div>
  );
}
