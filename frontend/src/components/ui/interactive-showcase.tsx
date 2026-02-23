import { useState, useId } from 'react';
import { cn } from '@/lib/utils';

export interface ShowcaseSlide {
  number: string;
  lines: string[];
  image: string;
  accent?: 'orange' | 'rose' | 'amber' | 'blue' | 'emerald' | 'purple';
}

interface InteractiveShowcaseProps {
  slides?: ShowcaseSlide[];
  className?: string;
}

const accentMap = {
  orange: { text: 'text-orange-500', glow: 'rgba(249,115,22,0.1)' },
  rose: { text: 'text-rose-500', glow: 'rgba(244,63,94,0.1)' },
  amber: { text: 'text-amber-500', glow: 'rgba(245,158,11,0.1)' },
  blue: { text: 'text-blue-500', glow: 'rgba(59,130,246,0.1)' },
  emerald: { text: 'text-emerald-500', glow: 'rgba(16,185,129,0.1)' },
  purple: { text: 'text-purple-500', glow: 'rgba(168,85,247,0.1)' },
};

const defaultSlides: ShowcaseSlide[] = [
  {
    number: '01',
    lines: ['Gourmet', 'Burgers'],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    accent: 'orange',
  },
  {
    number: '02',
    lines: ['Fresh', 'Desserts'],
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=80',
    accent: 'rose',
  },
  {
    number: '03',
    lines: ['Artisan', 'Waffles'],
    image:
      'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1000&q=80',
    accent: 'amber',
  },
];

const clipShapes = ['burger', 'bento', 'grid'] as const;

export function InteractiveShowcase({
  slides = defaultSlides,
  className,
}: InteractiveShowcaseProps) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/:/g, '');
  const colors = accentMap[slides[active]?.accent ?? 'orange'];

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white p-8 transition-colors duration-500 dark:bg-[#050505] md:flex-row md:p-24',
        className
      )}
    >
      {/* Left — Navigation */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-14">
            {slides.map((slide, i) => {
              const isActive = active === i;
              const c = accentMap[slide.accent ?? 'orange'];
              return (
                <li
                  key={i}
                  className="group cursor-pointer"
                  onClick={() => setActive(i)}
                >
                  <div className="flex items-start gap-6">
                    <span
                      className={cn(
                        'mt-2 text-3xl font-bold transition-all duration-500',
                        isActive
                          ? cn(c.text, 'scale-110')
                          : 'text-zinc-400 dark:text-zinc-600'
                      )}
                    >
                      {slide.number}
                    </span>
                    <h2
                      className={cn(
                        'text-5xl font-black uppercase leading-[0.85] tracking-tighter transition-all duration-700 md:text-6xl',
                        isActive
                          ? 'translate-x-4 text-zinc-950 opacity-100 dark:text-white'
                          : 'translate-x-0 text-zinc-500 opacity-40'
                      )}
                      style={
                        !isActive
                          ? { WebkitTextStroke: '0px transparent' }
                          : undefined
                      }
                    >
                      {slide.lines.map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < slide.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </h2>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Right — SVG with clip-path masks */}
      <div className="relative mt-16 flex w-full items-center justify-center md:mt-0 md:w-1/2">
        {/* Glow */}
        <div
          className="absolute h-[120%] w-[120%] rounded-full blur-[120px] transition-all duration-1000"
          style={{ backgroundColor: colors.glow }}
        />

        <svg
          viewBox="0 0 500 500"
          className="z-10 h-auto w-full max-w-[500px] drop-shadow-xl dark:drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Burger silhouette */}
            <clipPath id={`${uid}-burger`}>
              <path d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>

            {/* Bento grid */}
            <clipPath id={`${uid}-bento`}>
              <rect x="20" y="20" width="200" height="280" rx="12" />
              <rect x="20" y="320" width="200" height="160" rx="12" />
              <rect x="240" y="20" width="240" height="140" rx="12" />
              <rect x="240" y="180" width="110" height="160" rx="12" />
              <rect x="370" y="180" width="110" height="160" rx="12" />
              <rect x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            {/* Pixel grid */}
            <clipPath id={`${uid}-grid`}>
              <rect x="20" y="20" width="140" height="140" rx="4" />
              <rect x="180" y="20" width="140" height="140" rx="4" />
              <rect x="340" y="20" width="140" height="140" rx="4" />
              <rect x="20" y="180" width="140" height="140" rx="4" />
              <rect x="180" y="180" width="140" height="140" rx="4" />
              <rect x="340" y="180" width="140" height="140" rx="4" />
              <rect x="20" y="340" width="140" height="140" rx="4" />
              <rect x="180" y="340" width="140" height="140" rx="4" />
              <rect x="340" y="340" width="140" height="140" rx="4" />
            </clipPath>
          </defs>

          {clipShapes.map((shape, i) => (
            <g
              key={shape}
              clipPath={`url(#${uid}-${shape})`}
              style={{
                opacity: active === i ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out',
              }}
            >
              <image
                href={slides[Math.min(i, slides.length - 1)].image}
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
