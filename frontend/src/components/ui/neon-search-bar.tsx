import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal } from 'lucide-react';

interface NeonSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function NeonSearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  className,
}: NeonSearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const val = value !== undefined ? value : internalValue;

  const handleChange = (v: string) => {
    onChange ? onChange(v) : setInternalValue(v);
  };

  return (
    <>
      <style>{`
        @keyframes neon-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .neon-bar::before, .neon-bar::after { content: ""; position: absolute; width: 60%; height: 60%; pointer-events: none; transition: all 0.3s ease; }
        .neon-bar::before { top: 0; left: 0; background: linear-gradient(to right, rgba(255,100,220,1), transparent), linear-gradient(to bottom, rgba(255,100,220,1), transparent); background-size: 100% 2px, 2px 100%; background-repeat: no-repeat; border-top-left-radius: 8px; }
        .neon-bar::after { bottom: 0; right: 0; background: linear-gradient(to left, rgba(120,100,255,1), transparent), linear-gradient(to top, rgba(120,100,255,1), transparent); background-size: 100% 2px, 2px 100%; background-repeat: no-repeat; background-position: bottom right; border-bottom-right-radius: 8px; }
        .neon-bar.neon-focused::before, .neon-bar.neon-focused::after { width: 70%; height: 70%; }
        .neon-bar.neon-focused { box-shadow: 0 0 15px rgba(255,100,220,0.3), 0 0 15px rgba(120,100,255,0.3); }
      `}</style>
      <div className={cn('relative h-[120px] w-[400px]', className)}>
        {/* Glow orbs */}
        <div
          className="absolute -left-[30px] -top-[40px] h-[150px] w-[150px] rounded-full transition-transform duration-300 hover:translate-x-[5px] hover:translate-y-[5px]"
          style={{ background: 'radial-gradient(circle, rgba(227,63,183,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }}
        />
        <div
          className="absolute -bottom-[40px] -right-[30px] h-[150px] w-[150px] rounded-full transition-transform duration-300 hover:-translate-x-[5px] hover:-translate-y-[5px]"
          style={{ background: 'radial-gradient(circle, rgba(90,73,212,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }}
        />

        {/* Search bar */}
        <div
          className={cn(
            'neon-bar absolute left-1/2 top-1/2 flex h-[60px] w-[350px] -translate-x-1/2 -translate-y-1/2 items-center overflow-visible rounded-lg transition-all duration-300',
            focused && 'neon-focused'
          )}
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.23) 100%)' }}
        >
          <Search
            className="ml-5 h-5 w-5 text-white opacity-70"
            style={{ animation: 'neon-pulse 2s infinite' }}
          />
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="h-full flex-1 border-none bg-transparent px-5 text-lg text-white outline-none placeholder:text-white/50"
          />
          <button className="absolute right-[10px] flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(120,100,255,0.2) 0%, rgba(120,100,255,0.1) 100%)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <SlidersHorizontal className="h-5 w-5 text-white opacity-70" />
          </button>
        </div>
      </div>
    </>
  );
}
