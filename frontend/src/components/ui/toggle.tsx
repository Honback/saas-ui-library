import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

function Toggle({ checked, onChange, label, size = 'md', disabled, className }: ToggleProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          checked ? 'bg-primary-600' : 'bg-gray-200',
          {
            'h-5 w-9': size === 'sm',
            'h-6 w-11': size === 'md',
          }
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform',
            {
              'h-4 w-4 mt-0.5 ml-0.5': size === 'sm',
              'h-5 w-5 mt-0.5 ml-0.5': size === 'md',
            },
            {
              'translate-x-4': checked && size === 'sm',
              'translate-x-5': checked && size === 'md',
              'translate-x-0': !checked,
            }
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    </label>
  );
}

export { Toggle };
