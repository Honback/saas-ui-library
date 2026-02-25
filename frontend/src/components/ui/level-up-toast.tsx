import { cn } from '@/lib/utils';
import { Gamepad2 } from 'lucide-react';

interface LevelUpToastProps {
  title?: string;
  description?: string;
  level?: number;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function LevelUpToast({
  title = 'Well done!',
  description = 'New level reached.',
  level = 8,
  onAction,
  actionLabel = 'Next',
  className,
}: LevelUpToastProps) {
  return (
    <>
      <style>{`
        @keyframes toast-breathe { from { transform: scale(0.98); } to { transform: scale(1); } }
        .levelup-toast { animation: toast-breathe 0.6s linear alternate-reverse infinite; }
        .levelup-toast:hover .levelup-icon { transform: rotate(45deg); }
        .levelup-toast .levelup-action:hover { height: 100%; margin-right: 0; border-radius: 0 10px 10px 0; }
        .levelup-toast .levelup-action:active { background-color: #4dec48; }
      `}</style>
      <div
        className={cn(
          'levelup-toast flex h-[70px] w-[300px] items-center justify-between rounded-[10px] bg-white p-0.5 text-gray-900 transition-all duration-500',
          className
        )}
        style={{ boxShadow: '0px 42px 53px 13px rgba(0,0,0,0.1)' }}
      >
        <div className="levelup-icon flex h-full items-center px-2 transition-transform duration-500">
          <Gamepad2 className="h-10 w-10 text-indigo-500" />
        </div>
        <div className="flex flex-1 flex-col justify-start px-1">
          <span className="text-[0.95rem] font-bold leading-4 text-gray-700">{title}</span>
          <span className="mb-1 text-[13px]">{description}</span>
          <span className="flex w-max items-center rounded-[10px] bg-indigo-500/25 px-1 text-sm font-semibold text-indigo-500">
            <svg className="mr-1 h-4 w-4 rounded-md bg-indigo-500" viewBox="0 0 24 24" fill="none">
              <path d="M15 16l-2.8-2.8a.27.27 0 00-.39 0L9 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 11l-2.85-2.85a.21.21 0 00-.3 0L9 11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            lvl. {level}
          </span>
        </div>
        <div className="flex h-full items-center">
          <button
            onClick={onAction}
            className="levelup-action mr-1.5 h-10 rounded-[10px] bg-indigo-500 px-4 text-xs font-bold uppercase text-white shadow-md transition-all duration-500"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </>
  );
}
