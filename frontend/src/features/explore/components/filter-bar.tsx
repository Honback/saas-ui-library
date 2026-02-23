import { cn } from '@/lib/utils';
import type { Category, SortOption } from '@/types/component';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string | null;
  sortBy: SortOption;
  onCategoryChange: (slug: string | null) => void;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
];

export function FilterBar({
  categories,
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            selectedCategory === null
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              selectedCategory === cat.slug
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">정렬:</span>
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={cn(
              'rounded-md px-3 py-1 text-sm font-medium transition-colors',
              sortBy === opt.value
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
