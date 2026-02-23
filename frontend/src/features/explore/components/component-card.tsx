import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { ComponentPreview } from './component-preview';
import type { ComponentItem } from '@/types/component';

interface ComponentCardProps {
  component: ComponentItem;
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link to={`/components/${component.slug}`}>
      <Card className="group h-full transition-all hover:shadow-md">
        {/* Static image preview */}
        <ComponentPreview slug={component.slug} className="h-40" />

        <CardContent className="pt-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
            {component.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{component.description}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                name={component.author_name}
                src={component.author_avatar_url || undefined}
                size="sm"
              />
              <span className="text-xs text-gray-500">{component.author_name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {component.likes_count}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {component.views_count}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {component.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
