export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      components: {
        Row: {
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
          fts: unknown | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          code: string;
          usage_code: string;
          category_id: string;
          framework?: string;
          preview_type?: string;
          preview_image_url?: string | null;
          tags?: string[];
          author_name?: string;
          author_avatar_url?: string | null;
          likes_count?: number;
          views_count?: number;
          is_featured?: boolean;
          fts?: unknown | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          code?: string;
          usage_code?: string;
          category_id?: string;
          framework?: string;
          preview_type?: string;
          preview_image_url?: string | null;
          tags?: string[];
          author_name?: string;
          author_avatar_url?: string | null;
          likes_count?: number;
          views_count?: number;
          is_featured?: boolean;
          fts?: unknown | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'components_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      search_components: {
        Args: { search_query: string };
        Returns: Database['public']['Tables']['components']['Row'][];
      };
      increment_view_count: {
        Args: { component_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
