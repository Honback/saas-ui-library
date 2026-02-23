import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  blur?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = 'md', border = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl bg-white/60 dark:bg-gray-900/60',
        {
          'backdrop-blur-sm': blur === 'sm',
          'backdrop-blur-md': blur === 'md',
          'backdrop-blur-lg': blur === 'lg',
        },
        border && 'border border-white/20 shadow-lg shadow-black/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassCard.displayName = 'GlassCard';
export { GlassCard };
