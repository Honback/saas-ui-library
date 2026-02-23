import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Category, ComponentItem, SortOption } from '@/types/component';

interface ComponentState {
  categories: Category[];
  components: ComponentItem[];
  currentComponent: ComponentItem | null;
  isLoading: boolean;
  selectedCategory: string | null;
  sortBy: SortOption;
  searchQuery: string;

  fetchCategories: () => Promise<void>;
  fetchComponents: (categorySlug?: string | null, sort?: SortOption) => Promise<void>;
  fetchComponentBySlug: (slug: string) => Promise<void>;
  searchComponents: (query: string) => Promise<void>;
  setCategory: (slug: string | null) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  incrementViewCount: (id: string) => Promise<void>;
}

export const useComponentStore = create<ComponentState>((set, get) => ({
  categories: [],
  components: [],
  currentComponent: null,
  isLoading: false,
  selectedCategory: null,
  sortBy: 'featured',
  searchQuery: '',

  fetchCategories: async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');
    if (data) set({ categories: data });
  },

  fetchComponents: async (categorySlug?: string | null, sort?: SortOption) => {
    set({ isLoading: true });
    const sortBy = sort ?? get().sortBy;

    let query = supabase
      .from('components')
      .select('*, category:categories(*)');

    if (categorySlug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    switch (sortBy) {
      case 'featured':
        query = query.order('is_featured', { ascending: false }).order('likes_count', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
        query = query.order('views_count', { ascending: false });
        break;
    }

    const { data } = await query;
    if (data) {
      const components = data.map((item) => ({
        ...item,
        category: Array.isArray(item.category) ? item.category[0] : item.category,
      })) as ComponentItem[];
      set({ components, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  fetchComponentBySlug: async (slug: string) => {
    set({ isLoading: true });
    const { data } = await supabase
      .from('components')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .single();

    if (data) {
      const component = {
        ...data,
        category: Array.isArray(data.category) ? data.category[0] : data.category,
      } as ComponentItem;
      set({ currentComponent: component, isLoading: false });
    } else {
      set({ currentComponent: null, isLoading: false });
    }
  },

  searchComponents: async (query: string) => {
    set({ isLoading: true, searchQuery: query });
    if (!query.trim()) {
      await get().fetchComponents(get().selectedCategory, get().sortBy);
      return;
    }

    const { data } = await supabase.rpc('search_components', {
      search_query: query,
    });

    if (data) {
      set({ components: data as ComponentItem[], isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  setCategory: (slug: string | null) => {
    set({ selectedCategory: slug });
    get().fetchComponents(slug, get().sortBy);
  },

  setSortBy: (sort: SortOption) => {
    set({ sortBy: sort });
    get().fetchComponents(get().selectedCategory, sort);
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  incrementViewCount: async (id: string) => {
    await supabase.rpc('increment_view_count', { component_id: id });
  },
}));
