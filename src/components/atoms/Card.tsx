import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl transition-all duration-300',
        hoverable && 'hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)] hover:border-blue-100/50',
        className
      )}
      {...props}
    >
      {/* Subtle top inner glow for physical edge feel */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
