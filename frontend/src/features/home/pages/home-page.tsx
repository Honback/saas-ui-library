import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Blocks, Table2, Navigation, FormInput, Layout, FileText, MessageSquare } from 'lucide-react';
import { useComponentStore } from '@/stores/component-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ComponentPreview } from '@/features/explore/components/component-preview';

const categoryIcons: Record<string, React.ElementType> = {
  'ui-components': Blocks,
  'data-display': Table2,
  navigation: Navigation,
  forms: FormInput,
  layouts: Layout,
  'page-templates': FileText,
  feedback: MessageSquare,
};

export function HomePage() {
  const { categories, components, fetchCategories, fetchComponents } = useComponentStore();

  useEffect(() => {
    fetchCategories();
    fetchComponents(null, 'featured');
  }, [fetchCategories, fetchComponents]);

  const featured = components.filter((c) => c.is_featured).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-4 py-20 text-center">
        <Badge variant="success" className="mb-4">
          {components.length}개 컴포넌트 수록
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          SaaS UI 컴포넌트를
          <br />
          <span className="text-primary-600">복사해서 바로 사용하세요</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          React + Tailwind CSS로 만든 프로덕션 수준의 UI 컴포넌트 라이브러리.
          코드를 복사해서 프로젝트에 바로 붙여넣기.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/explore">
            <Button size="lg">
              컴포넌트 탐색
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Components */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">인기 컴포넌트</h2>
              <p className="mt-1 text-gray-600">가장 많이 사용되는 컴포넌트들</p>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              전체 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((comp) => (
              <Link key={comp.id} to={`/components/${comp.slug}`}>
                <Card className="group h-full transition-shadow hover:shadow-md">
                  <ComponentPreview slug={comp.slug} className="h-32" />
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">{comp.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{comp.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      {comp.tags.slice(0, 2).map((tag) => (
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
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">카테고리별 탐색</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.slug] || Blocks;
              return (
                <Link key={cat.id} to={`/explore/${cat.slug}`}>
                  <Card className="group h-full transition-shadow hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
          <p>SaaS UI Component Library — React + Tailwind CSS</p>
          <p className="mt-1">코드를 복사해서 자유롭게 사용하세요.</p>
        </div>
      </footer>
    </div>
  );
}
