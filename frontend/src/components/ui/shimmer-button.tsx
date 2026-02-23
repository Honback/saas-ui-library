import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  shimmerColor?: string;
  background?: string;
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className,
      size = 'md',
      shimmerColor = 'rgba(255,255,255,0.2)',
      background = 'bg-gray-900',
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        background,
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
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={
          {
            '--shimmer-color': shimmerColor,
          } as React.CSSProperties
        }
      />
    </button>
  )
);

ShimmerButton.displayName = 'ShimmerButton';
export { ShimmerButton };
