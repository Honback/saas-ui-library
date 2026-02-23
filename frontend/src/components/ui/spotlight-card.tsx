import { HTMLAttributes, forwardRef, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
}

const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, spotlightColor = 'rgba(120, 119, 198, 0.15)', children, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';
export { SpotlightCard };
