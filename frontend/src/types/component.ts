export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  code: string;
  usage_code: string;
  category_id: string;
  framework: string;
  preview_type: string;
  preview_image_url: string | null;
  tags: string[];
  author_name: string;
  author_avatar_url: string | null;
  likes_count: number;
  views_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export type SortOption = 'featured' | 'newest' | 'popular';

export interface ComponentFilters {
  category: string | null;
  search: string;
  sort: SortOption;
}
