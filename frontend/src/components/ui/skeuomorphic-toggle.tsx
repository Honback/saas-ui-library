import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SkeuomorphicToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function SkeuomorphicToggle({
  checked,
  onChange,
  className,
}: SkeuomorphicToggleProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (onChange) {
      onChange(!isChecked);
    } else {
      setInternalChecked((v) => !v);
    }
  };

  const hoverTransform = hovered
    ? isChecked
      ? 'perspective(100px) rotateX(-5deg) rotateY(5deg)'
      : 'perspective(100px) rotateX(5deg) rotateY(-5deg)'
    : undefined;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-[60px] w-[120px] cursor-pointer items-center rounded-full bg-white',
        className
      )}
      style={{
        boxShadow:
          'inset 0 0 5px 4px rgba(255,255,255,1), inset 0 0 20px 1px rgba(0,0,0,0.488), 10px 20px 30px rgba(0,0,0,0.096), inset 0 0 0 3px rgba(0,0,0,0.3)',
        transform: hoverTransform,
        transition: 'transform 0.4s',
      }}
    >
      <div
        className="absolute h-10 w-10 rounded-full"
        style={{
          left: isChecked ? 70 : 10,
          backgroundImage: isChecked
            ? 'linear-gradient(315deg, #000000 0%, #414141 70%)'
            : 'linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%)',
          boxShadow:
            '0 2px 1px rgba(0,0,0,0.3), 10px 10px 10px rgba(0,0,0,0.3)',
          transition: '0.4s',
        }}
      />
    </button>
  );
}
