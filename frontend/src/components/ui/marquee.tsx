import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const speedMap = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export function Marquee({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={cn(
        'group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 gap-4',
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{
            animation: `marquee ${speedMap[speed]} linear infinite`,
            animationDirection,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
