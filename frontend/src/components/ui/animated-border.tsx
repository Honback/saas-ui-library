import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBorderProps extends HTMLAttributes<HTMLDivElement> {
  borderColor?: string;
  borderWidth?: number;
  duration?: number;
  children: ReactNode;
}

const AnimatedBorder = forwardRef<HTMLDivElement, AnimatedBorderProps>(
  (
    {
      className,
      borderColor = 'from-purple-500 via-pink-500 to-blue-500',
      borderWidth = 2,
      duration = 3,
      children,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn('relative rounded-2xl p-[2px]', className)} {...props}>
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-75',
          borderColor
        )}
        style={{
          padding: borderWidth,
          animation: `spin ${duration}s linear infinite`,
        }}
      />
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-r blur-md opacity-30',
          borderColor
        )}
      />
      <div className="relative rounded-[14px] bg-white p-6">{children}</div>
    </div>
  )
);

AnimatedBorder.displayName = 'AnimatedBorder';
export { AnimatedBorder };
