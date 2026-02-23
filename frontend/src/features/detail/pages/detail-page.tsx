import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useComponentStore } from '@/stores/component-store';
import { Spinner } from '@/components/ui/spinner';
import { ComponentInfo } from '../components/component-info';
import { CodeViewer } from '../components/code-viewer';
import { LivePreview } from '@/features/explore/components/live-preview';

export function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { currentComponent, isLoading, fetchComponentBySlug, incrementViewCount } =
    useComponentStore();

  useEffect(() => {
    if (slug) {
      fetchComponentBySlug(slug);
    }
  }, [slug, fetchComponentBySlug]);

  useEffect(() => {
    if (currentComponent) {
      incrementViewCount(currentComponent.id);
    }
  }, [currentComponent?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !currentComponent) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/explore"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        돌아가기
      </Link>

      {/* Live Preview — full width */}
      <div className="mb-8">
        <LivePreview slug={currentComponent.slug} mode="full" />
      </div>

      {/* Two-column layout: Info + Code */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ComponentInfo component={currentComponent} />
        </div>
        <div className="lg:col-span-3">
          <CodeViewer code={currentComponent.code} usageCode={currentComponent.usage_code} />
        </div>
      </div>
    </div>
  );
}
