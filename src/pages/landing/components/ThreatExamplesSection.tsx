import React from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { cn } from '../../../utils/cn';

const testimonials = [
  {
    name: 'Rina Kusuma',
    role: 'Software Engineer',
    avatar: 'RK',
    color: 'bg-blue-500',
    quote: 'Safty caught a phishing page that looked identical to my bank\'s login. Genuinely saved my account.',
  },
  {
    name: 'Budi Santoso',
    role: 'Freelance Designer',
    avatar: 'BS',
    color: 'bg-indigo-500',
    quote: 'I download a lot of client files. Knowing every file gets scanned before opening gives me real peace of mind.',
  },
  {
    name: 'Alicia Chen',
    role: 'Marketing Manager',
    avatar: 'AC',
    color: 'bg-purple-500',
    quote: 'The image forensic feature exposed a fake payment screenshot in a client deal. Would have lost thousands.',
  },
  {
    name: 'Dimas Pratama',
    role: 'Security Researcher',
    avatar: 'DP',
    color: 'bg-cyan-500',
    quote: 'As someone who studies threats professionally, I\'m impressed by the detection accuracy. Sub-50ms is real.',
  },
];

export function ThreatExamplesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} id="threats" className="bg-[#F3F6FC] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={cn(
          'text-center mb-14 max-w-2xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What users say about<br />
            <span className="text-[#0967F7]">Safty</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium">Trusted by thousands of users who browse smarter and safer every day.</p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn(
                'rounded-3xl bg-white border border-slate-100 p-7 flex flex-col gap-5 hover:shadow-md transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : '0ms' }}
            >
              {/* Quote */}
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0', t.color)}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
