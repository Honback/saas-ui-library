import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  className?: string;
}

function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
            <Icon className="h-5 w-5 text-primary-600" />
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {change && (
        <p
          className={cn('mt-2 text-sm font-medium', {
            'text-green-600': changeType === 'positive',
            'text-red-600': changeType === 'negative',
            'text-gray-500': changeType === 'neutral',
          })}
        >
          {change}
        </p>
      )}
    </div>
  );
}

export { StatsCard };
