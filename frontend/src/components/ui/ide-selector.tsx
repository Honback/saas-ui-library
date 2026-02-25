import { useState } from 'react';
import { cn } from '@/lib/utils';

interface IdeSelectorOption {
  value: string;
  label: string;
  color: string;
}

interface IdeSelectorProps {
  options?: IdeSelectorOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const defaultOptions: IdeSelectorOption[] = [
  { value: 'intellij', label: 'IntelliJ IDE', color: '#000000' },
  { value: 'vscode', label: 'VS Code', color: '#1f9cf1' },
  { value: 'sublime', label: 'Sublime Text', color: '#ff9801' },
];

export function IdeSelector({
  options = defaultOptions,
  value,
  onChange,
  className,
}: IdeSelectorProps) {
  const [internalValue, setInternalValue] = useState(options[0]?.value ?? '');
  const selected = value !== undefined ? value : internalValue;
  const selectedIdx = options.findIndex((o) => o.value === selected);
  const selectedColor = options[selectedIdx]?.color ?? '#000';

  const handleSelect = (v: string) => {
    onChange ? onChange(v) : setInternalValue(v);
  };

  const itemHeight = 300 / options.length;

  return (
    <div
      className={cn(
        'relative flex h-[300px] w-[140px] flex-col items-center justify-between overflow-hidden rounded-[10px] border border-gray-200 bg-white p-2.5',
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleSelect(opt.value)}
          className={cn(
            'z-[1] flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-sm font-semibold transition-colors duration-150',
            selected === opt.value ? 'text-white' : 'text-gray-900'
          )}
          style={{ height: `${itemHeight}px` }}
        >
          <div
            className="h-6 w-6 rounded"
            style={{ backgroundColor: opt.color }}
          />
          {opt.label}
        </button>
      ))}

      {/* Sliding highlight */}
      <span
        className="absolute inset-x-1.5 rounded-[10px] transition-transform duration-150 ease-out"
        style={{
          height: `${itemHeight - 12}px`,
          backgroundColor: selectedColor,
          transform: `translateY(${selectedIdx * itemHeight - (300 - itemHeight) / 2 + 6}px)`,
        }}
      />
    </div>
  );
}
