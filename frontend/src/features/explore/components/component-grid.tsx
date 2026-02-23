import { Inbox } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { ComponentCard } from './component-card';
import type { ComponentItem } from '@/types/component';

interface ComponentGridProps {
  components: ComponentItem[];
  isLoading: boolean;
}

export function ComponentGrid({ components, isLoading }: ComponentGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Inbox className="h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">컴포넌트를 찾을 수 없습니다</h3>
        <p className="mt-1 text-sm text-gray-500">
          다른 검색어나 카테고리를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}
