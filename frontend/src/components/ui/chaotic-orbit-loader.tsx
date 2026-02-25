import { cn } from '@/lib/utils';

interface ChaoticOrbitLoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ChaoticOrbitLoader({
  size = 40,
  color = '#6366f1',
  className,
}: ChaoticOrbitLoaderProps) {
  return (
    <>
      <style>{`
        @keyframes chaotic-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes chaotic-orbit {
          0% { transform: translate(50%) scale(0.74); opacity: 0.65; }
          25% { transform: translate(0%) scale(0.47); opacity: 0.3; }
          50% { transform: translate(-50%) scale(0.74); opacity: 0.65; }
          75% { transform: translate(0%) scale(1); opacity: 1; }
          100% { transform: translate(50%) scale(0.74); opacity: 0.65; }
        }
      `}</style>
      <div
        className={cn('relative flex items-center justify-center', className)}
        style={{
          width: size,
          height: size,
          animation: 'chaotic-rotate 2.5s infinite linear',
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: '60%', height: '60%',
            backgroundColor: color,
            animation: 'chaotic-orbit 1.5s linear infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '60%', height: '60%',
            backgroundColor: color,
            animation: 'chaotic-orbit 1.5s linear -0.75s infinite',
          }}
        />
      </div>
    </>
  );
}
