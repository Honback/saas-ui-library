import {
  ReactNode,
  HTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
});

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children, className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useContext(DropdownContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      {children}
    </button>
  );
}

const DropdownMenu = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useContext(DropdownContext);
    if (!open) return null;
    return (
      <div
        ref={ref}
        className={cn(
          'absolute right-0 z-10 mt-2 min-w-[12rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

function DropdownItem({ className, disabled, ...props }: DropdownItemProps) {
  const { setOpen } = useContext(DropdownContext);
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

export { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem };
