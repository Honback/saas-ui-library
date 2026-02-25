import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeartLikeButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function HeartLikeButton({ checked, onChange, className }: HeartLikeButtonProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const toggle = () => {
    const next = !isChecked;
    onChange ? onChange(next) : setInternalChecked(next);
  };

  return (
    <>
      <style>{`
        @keyframes heart-squish { 50% { transform: scaleY(0.6); } 100% { transform: scaleY(1); } }
        @keyframes heart-circle { from { width: 0; height: 0; opacity: 0; } 90% { width: 35px; height: 35px; opacity: 1; } to { opacity: 0; } }
        @keyframes heart-particles { from { transform: scale(0); } 40% { opacity: 1; } to { transform: scale(0.8); opacity: 0; } }
      `}</style>
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={toggle}
        className={cn('relative inline-flex cursor-pointer items-center justify-center', className)}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            transformOrigin: 'top',
            animation: isChecked ? 'heart-squish 0.3s forwards' : undefined,
          }}
        >
          {/* Particle burst */}
          {isChecked && (
            <div
              className="pointer-events-none absolute"
              style={{
                width: 10, height: 10, borderRadius: '50%',
                boxShadow: '0 30px 0 -4px #fc3636, 30px 0 0 -4px #fc3636, 0 -30px 0 -4px #fc3636, -30px 0 0 -4px #fc3636, -22px 22px 0 -4px #fc3636, -22px -22px 0 -4px #fc3636, 22px -22px 0 -4px #fc3636, 22px 22px 0 -4px #fc3636',
                animation: 'heart-particles 0.3s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s forwards',
                transform: 'scale(0)',
              }}
            />
          )}
          {/* Circle ring */}
          {isChecked && (
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                border: '1px solid #fc3636',
                animation: 'heart-circle 0.3s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s forwards',
              }}
            />
          )}
          <svg
            viewBox="0 0 16 16"
            className="h-8 w-8 transition-colors duration-200"
            style={{ fill: isChecked ? '#fc3636' : '#4d4d4d' }}
          >
            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" fillRule="evenodd" />
          </svg>
        </div>
      </button>
    </>
  );
}
