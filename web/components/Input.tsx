import React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full border-2 border-black bg-white px-3 py-2 text-sm placeholder:text-gray-500",
          "focus:outline-none focus:shadow-brutal-md focus:-translate-y-0.5 focus:-translate-x-0.5",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40",
          "hover:border-black transition-none",
          error && "border-red-700 shadow-brutal-md shadow-red-700",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
