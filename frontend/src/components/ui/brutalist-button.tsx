import { cn } from '@/lib/utils';

interface BrutalistButtonProps {
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;
}

export function BrutalistButton({
  title = 'Microsoft',
  subtitle = 'Get it from',
  href = '#',
  className,
}: BrutalistButtonProps) {
  return (
    <>
      <style>{`
        @keyframes brutalist-slide { 0% { left: -100%; } 100% { left: 100%; } }
        .brutalist-btn { display: flex; align-items: center; width: 169px; height: 60px; background: #000; color: #fff; text-decoration: none; font-family: Arial, sans-serif; font-weight: bold; border: 3px solid #fff; outline: 3px solid #000; box-shadow: 6px 6px 0 #00a4ef; transition: all 0.1s ease-out; padding: 0 15px; box-sizing: border-box; position: relative; overflow: hidden; }
        .brutalist-btn::before { content: ""; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent); z-index: 1; opacity: 0; }
        .brutalist-btn:hover::before { opacity: 1; animation: brutalist-slide 2s infinite; }
        .brutalist-btn:hover { transform: translate(-4px,-4px); box-shadow: 10px 10px 0 #000; }
        .brutalist-btn:active { transform: translate(4px,4px); box-shadow: 0 0 0 #00a4ef; background: #fff; color: #000; border-color: #000; }
        .brutalist-btn:hover .brutalist-logo { transform: rotate(-10deg) scale(1.1); }
        .brutalist-btn:active .brutalist-logo { transform: rotate(10deg) scale(0.9); }
        .brutalist-btn:hover .brutalist-text { transform: skew(-5deg); }
        .brutalist-btn:active .brutalist-text { transform: skew(5deg); }
      `}</style>
      <a href={href} className={cn('brutalist-btn', className)}>
        <div
          className="brutalist-logo mr-2 grid shrink-0 grid-cols-2 gap-px"
          style={{ width: 26, height: 26, transition: 'transform 0.2s ease-out', position: 'relative', zIndex: 1 }}
        >
          <div style={{ background: '#f25022' }} />
          <div style={{ background: '#7fba00' }} />
          <div style={{ background: '#00a4ef' }} />
          <div style={{ background: '#ffb900' }} />
        </div>
        <div className="brutalist-text relative z-[1] flex flex-col leading-tight" style={{ transition: 'transform 0.2s ease-out' }}>
          <span className="text-[11px] uppercase">{subtitle}</span>
          <span className="text-base uppercase">{title}</span>
        </div>
      </a>
    </>
  );
}
