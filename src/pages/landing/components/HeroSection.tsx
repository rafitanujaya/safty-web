import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import blackhole from '../../../assets/solar.jpg'


export function HeroSection() {
  return (
    <section className="relative w-full h-[120vh] selection:bg-blue-500/30 selection:text-blue-200 flex flex-col justify-between" style={{
      backgroundImage: `url(${blackhole})`,
      backgroundSize: 'cover',
      backgroundPosition: "0% 190%",
      backgroundRepeat: "repeat",

    }}>
      <LandingNavbar />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center pt-32 md:pt-40 lg:pt-48 mt-25">

        <h1 className="animate-slide-up text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          AI-Powered <br />
          Threat Neutralization
        </h1>

        <p className="animate-slide-up-delay-1 text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Eliminate phishing, block malicious scripts, and secure your browsing context natively in milliseconds.
        </p>
      </div>


    </section>
  );
}
