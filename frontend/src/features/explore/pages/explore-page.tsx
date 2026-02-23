import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useComponentStore } from '@/stores/component-store';
import { FilterBar } from '../components/filter-bar';
import { ComponentGrid } from '../components/component-grid';

export function ExplorePage() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const {
    categories,
    components,
    isLoading,
    selectedCategory,
    sortBy,
    fetchCategories,
    fetchComponents,
    searchComponents,
    setCategory,
    setSortBy,
  } = useComponentStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (searchQuery) {
      searchComponents(searchQuery);
    } else if (category) {
      setCategory(category);
    } else {
      fetchComponents(selectedCategory, sortBy);
    }
  }, [category, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchQuery
            ? `"${searchQuery}" 검색 결과`
            : category
              ? categories.find((c) => c.slug === category)?.name || '탐색'
              : '모든 컴포넌트'}
        </h1>
        <p className="mt-2 text-gray-600">
          {components.length}개의 컴포넌트
        </p>
      </div>

      {/* Filters */}
      {!searchQuery && (
        <div className="mb-8">
          <FilterBar
            categories={categories}
            selectedCategory={category || selectedCategory}
            sortBy={sortBy}
            onCategoryChange={(slug) => {
              setCategory(slug);
            }}
            onSortChange={setSortBy}
          />
        </div>
      )}

      {/* Grid */}
      <ComponentGrid components={components} isLoading={isLoading} />
    </div>
  );
}
