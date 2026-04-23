import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] border border-blue-400/30 hover:brightness-110',
  secondary: 'bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-md hover:shadow-lg hover:shadow-slate-900/20 border border-slate-700 hover:brightness-110',
  outline: 'bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm',
  ghost: 'text-slate-600 hover:bg-slate-100/80',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Subtle top glare effect for 3D feel */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-x-0 top-0 h-px bg-white/20 rounded-t-xl" />
      )}
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
