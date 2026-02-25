import { cn } from '@/lib/utils';

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export function FeatureCard({
  number,
  title,
  description,
  icon,
  accentColor = 'bg-indigo-700',
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[300px] overflow-hidden rounded-tl-[4rem] border-2 border-white bg-gray-100 text-center',
        className
      )}
    >
      {/* Accent strip */}
      <div
        className={cn(
          'absolute right-0 top-8 h-[30px] w-[120px]',
          accentColor
        )}
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
      />

      {/* Body */}
      <div className="mx-auto max-w-[25ch] px-6 py-8">
        {icon && <div className="mx-auto text-gray-700">{icon}</div>}
        <p className="mt-6 text-xl font-extrabold text-gray-900">{title}</p>
        <p className="mt-3 text-sm text-gray-700">{description}</p>
      </div>

      {/* Ribbon */}
      <div
        className={cn(
          'relative left-[-5%] mt-6 grid w-[110%] place-items-center rounded-b-2xl py-3',
          accentColor
        )}
      >
        {/* Number badge */}
        <div className="-mt-10 flex h-[84px] w-[84px] items-center justify-center rounded-full border-[8px] border-indigo-700 bg-white text-2xl font-black">
          {number}
        </div>
      </div>
    </div>
  );
}
