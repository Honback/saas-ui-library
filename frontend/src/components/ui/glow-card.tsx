import { cn } from '@/lib/utils';

interface GlowCardProps {
  title: string;
  heading: string;
  description: string;
  className?: string;
}

export function GlowCard({
  title,
  heading,
  description,
  className,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        'group relative w-full max-w-md rounded-3xl border border-white/5 bg-gray-950 p-4',
        className
      )}
    >
      {/* Glow line on hover */}
      <div className="pointer-events-none absolute -left-px top-[65%] h-px w-px opacity-0 shadow-[0_0_30px_mediumslateblue] transition-all duration-500 group-hover:top-[25%] group-hover:opacity-100">
        <div className="h-[70px] w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
      </div>

      {/* Inner content with dot pattern */}
      <div
        className="flex flex-col items-center justify-center overflow-hidden rounded-2xl px-10 py-10"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '1.1rem 1.1rem',
          backgroundPosition: '50% 50%',
        }}
      >
        {/* Subtitle with gradient underline */}
        <div className="text-center text-lg font-bold uppercase text-white">
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-extrabold text-transparent">
            {title}
          </span>
          <div className="mx-auto mt-1 h-[3px] w-1/4 bg-gradient-to-r from-violet-400 to-cyan-400" />
        </div>

        {/* Main heading */}
        <h2 className="mt-4 text-center text-3xl font-bold text-gray-50">
          {heading}
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </div>
  );
}
