import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, compact = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border-2 border-black",
          compact ? "p-5" : "p-6 sm:p-7",
          "hover:shadow-brutal-lg hover:-translate-y-0.5 hover:-translate-x-0.5 transition-none",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
