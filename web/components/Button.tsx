import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center transition-none font-bold tracking-[0.08em] uppercase uppercase';
    
    const variants = {
      primary: 'bg-black text-white border-2 border-black px-6 py-3 hover:shadow-brutal-md hover:-translate-y-0.5 hover:-translate-x-0.5 focus:outline-2 focus:outline-black focus:outline-offset-2 active:shadow-none active:translate-y-0 active:translate-x-0 disabled:opacity-40 disabled:grayscale',
      secondary: 'bg-white text-black border-2 border-black px-6 py-3 hover:shadow-brutal-md hover:-translate-y-0.5 hover:-translate-x-0.5 focus:outline-2 focus:outline-black focus:outline-offset-2 active:shadow-none active:translate-y-0 active:translate-x-0 disabled:opacity-40 disabled:grayscale',
      outline: 'bg-transparent text-black border-2 border-dashed border-black px-6 py-3 hover:shadow-brutal-md hover:-translate-y-0.5 hover:-translate-x-0.5 focus:outline-2 focus:outline-black focus:outline-offset-2 active:shadow-none active:translate-y-0 active:translate-x-0 disabled:opacity-40 disabled:grayscale',
      ghost: 'bg-transparent text-black border-none py-2.5 px-0 hover:underline focus:outline-2 focus:outline-black focus:outline-offset-2 active:shadow-none disabled:opacity-40 disabled:grayscale'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
