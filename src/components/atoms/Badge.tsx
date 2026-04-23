import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]',
  warning: 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.1)]',
  danger: 'bg-red-500/10 text-red-600 border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.1)]',
  info: 'bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.1)]',
  default: 'bg-slate-500/10 text-slate-600 border border-slate-500/20 shadow-[0_0_8px_rgba(100,116,139,0.1)]',
};

export function Badge({ variant = 'default', children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
