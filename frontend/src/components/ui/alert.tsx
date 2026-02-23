import { ReactNode } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantConfig = {
  info: {
    icon: Info,
    containerClass: 'border-blue-200 bg-blue-50 text-blue-800',
    iconClass: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    containerClass: 'border-green-200 bg-green-50 text-green-800',
    iconClass: 'text-green-500',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    iconClass: 'text-yellow-500',
  },
  error: {
    icon: XCircle,
    containerClass: 'border-red-200 bg-red-50 text-red-800',
    iconClass: 'text-red-500',
  },
};

function Alert({ variant = 'info', title, children, onClose, className }: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-lg border p-4',
        config.containerClass,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconClass)} />
      <div className="flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded-sm hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export { Alert };
