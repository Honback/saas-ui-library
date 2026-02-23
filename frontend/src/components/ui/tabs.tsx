import { ReactNode, HTMLAttributes, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onChange: () => {},
});

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

function Tabs({ value, onChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn('flex border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

function Tab({ value, disabled, className, children, ...props }: TabProps) {
  const { value: selectedValue, onChange } = useContext(TabsContext);
  const isActive = value === selectedValue;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => onChange(value)}
      className={cn(
        '-mb-px px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'border-b-2 border-primary-600 text-primary-600'
          : 'text-gray-500 hover:text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { value: selectedValue } = useContext(TabsContext);
  if (value !== selectedValue) return null;

  return (
    <div role="tabpanel" className={cn('py-4', className)} {...props}>
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanel };
