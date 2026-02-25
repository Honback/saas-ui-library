import { cn } from '@/lib/utils';

interface HoverExpandCardProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  accentColor?: string;
  className?: string;
  href?: string;
}

export function HoverExpandCard({
  title,
  subtitle,
  highlight,
  accentColor = 'bg-amber-400',
  className,
  href = '#',
}: HoverExpandCardProps) {
  return (
    <div className={cn('overflow-hidden rounded-3xl', className)}>
      <a
        href={href}
        className="group relative block bg-gray-900 p-8 no-underline transition-colors"
      >
        {/* Expanding circle */}
        <div
          className={cn(
            'absolute -right-[75px] -top-[75px] h-[130px] w-[100px] rounded-full transition-transform duration-500 group-hover:scale-[10]',
            accentColor
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          <p className="mb-8 min-h-[57px] overflow-hidden text-xl font-bold text-white transition-colors duration-500 group-hover:text-gray-900">
            {title}
          </p>
          <div className="text-lg text-white">
            {subtitle && <span>{subtitle} </span>}
            {highlight && (
              <span className="font-bold text-yellow-400 transition-colors duration-500 group-hover:text-gray-900">
                {highlight}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
