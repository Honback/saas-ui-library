import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useComponentStore } from '@/stores/component-store';
import type { ComponentItem } from '@/types/component';

interface ComponentInfoProps {
  component: ComponentItem;
}

export function ComponentInfo({ component }: ComponentInfoProps) {
  const { toggleLike, isLiked } = useComponentStore();
  const liked = isLiked(component.id);

  return (
    <div className="space-y-6">
      {/* Title & description */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
        <p className="mt-2 text-lg text-gray-600">{component.description}</p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar
          name={component.author_name}
          src={component.author_avatar_url || undefined}
          size="md"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{component.author_name}</p>
          <p className="text-xs text-gray-500">
            {new Date(component.created_at).toLocaleDateString('ko-KR')}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>{component.views_count} views</span>
        </div>
        <button
          onClick={() => toggleLike(component.id)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            liked
              ? 'bg-red-50 text-red-500'
              : 'text-gray-500 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
          <span>{component.likes_count} likes</span>
        </button>
      </div>

      {/* Category badge */}
      {component.category && (
        <div>
          <span className="text-sm text-gray-500">카테고리: </span>
          <Link to={`/explore/${component.category.slug}`}>
            <Badge>{component.category.name}</Badge>
          </Link>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {component.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Framework */}
      <div className="text-sm text-gray-500">
        Framework: <span className="font-medium text-gray-700">{component.framework}</span>
      </div>
    </div>
  );
}
