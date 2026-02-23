import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'sunset' | 'ocean' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const gradients = {
  purple: 'from-purple-600 via-violet-600 to-indigo-600',
  sunset: 'from-orange-500 via-pink-500 to-rose-500',
  ocean: 'from-cyan-500 via-blue-500 to-indigo-500',
  emerald: 'from-emerald-500 via-teal-500 to-cyan-500',
};

const glowColors = {
  purple: 'shadow-purple-500/25',
  sunset: 'shadow-pink-500/25',
  ocean: 'shadow-blue-500/25',
  emerald: 'shadow-emerald-500/25',
};

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = 'purple', size = 'md', glow = true, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        'bg-gradient-to-r',
        gradients[variant],
        glow && `shadow-lg hover:shadow-xl ${glowColors[variant]}`,
        {
          'h-8 px-4 text-sm': size === 'sm',
          'h-10 px-6 text-sm': size === 'md',
          'h-12 px-8 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </button>
  )
);

GradientButton.displayName = 'GradientButton';
export { GradientButton };
