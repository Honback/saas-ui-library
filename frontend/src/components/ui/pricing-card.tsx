import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

interface PricingCardProps {
  price: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function PricingCard({
  price,
  title,
  description,
  icon,
  onAction,
  actionLabel = 'View',
  className,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        'w-full max-w-[300px] rounded-2xl bg-white p-2 text-gray-900',
        className
      )}
    >
      {/* Hero section */}
      <section className="rounded-xl bg-amber-50 p-6">
        <header className="flex items-center justify-between">
          <span className="text-sm font-bold">{price}</span>
          <button className="text-gray-500 transition-colors hover:text-gray-900">
            <Bookmark className="h-5 w-5" />
          </button>
        </header>
        <p className="mt-8 text-2xl font-semibold leading-tight">{title}</p>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">{title}</p>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>
        <button
          onClick={onAction}
          className="rounded-full bg-gray-900 px-5 py-2 text-sm text-white transition-colors hover:bg-gray-700"
        >
          {actionLabel}
        </button>
      </footer>
    </article>
  );
}
