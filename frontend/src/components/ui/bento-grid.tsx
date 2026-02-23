import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns = 3, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-4',
        {
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

BentoGrid.displayName = 'BentoGrid';

interface BentoItemProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  icon?: ReactNode;
  title?: string;
  description?: string;
  gradient?: string;
}

const BentoItem = forwardRef<HTMLDivElement, BentoItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, icon, title, description, gradient, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        {
          'md:col-span-2': colSpan === 2,
          'md:row-span-2': rowSpan === 2,
        },
        className
      )}
      {...props}
    >
      {gradient && (
        <div className={cn('absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]', gradient)} />
      )}
      <div className="relative z-10">
        {icon && <div className="mb-4">{icon}</div>}
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        {children}
      </div>
    </div>
  )
);

BentoItem.displayName = 'BentoItem';
export { BentoGrid, BentoItem };
