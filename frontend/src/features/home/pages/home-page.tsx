import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Blocks,
  Table2,
  Navigation,
  FormInput,
  Layout,
  FileText,
  MessageSquare,
  Code2,
} from 'lucide-react';
import { useComponentStore } from '@/stores/component-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LivePreview } from '@/features/explore/components/live-preview';

const categoryIcons: Record<string, React.ElementType> = {
  'ui-components': Blocks,
  'data-display': Table2,
  navigation: Navigation,
  forms: FormInput,
  layouts: Layout,
  'page-templates': FileText,
  feedback: MessageSquare,
};

/* Helper: fill rows by cycling items */
function fillRow(items: { slug: string }[], count: number) {
  if (items.length === 0) return [];
  return Array.from({ length: count }, (_, i) => items[i % items.length]);
}

export function HomePage() {
  const { categories, components, fetchCategories, fetchComponents } =
    useComponentStore();

  useEffect(() => {
    fetchCategories();
    fetchComponents(null, 'featured');
  }, [fetchCategories, fetchComponents]);

  const featured = components.filter((c) => c.is_featured);
  const row1 = fillRow(featured, 10);
  const row2 = fillRow(
    featured.length > 3 ? featured.slice(3) : featured,
    10
  );
  const row3 = fillRow(
    featured.length > 6 ? featured.slice(6) : featured,
    10
  );

  return (
    <div className="bg-gray-950">
      {/* ─── Hero ─────────────────────────────────── */}
      <section className="px-4 pb-10 pt-20 text-center">
        <Badge variant="success" className="mb-4">
          {components.length}개 컴포넌트 수록
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          SaaS UI 컴포넌트를
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            복사해서 바로 사용하세요
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          React + Tailwind CSS로 만든 프로덕션 수준의 UI 컴포넌트 라이브러리.
          코드를 복사해서 프로젝트에 바로 붙여넣기.
        </p>

        {/* Mobile CTA */}
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            컴포넌트 탐색 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Mobile Featured Grid (md 미만) ───────── */}
      {featured.length > 0 && (
        <section className="px-4 pb-12 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((comp) => (
              <Link key={comp.id} to={`/components/${comp.slug}`}>
                <article className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
                  <div className="h-32 overflow-hidden">
                    <LivePreview slug={comp.slug} mode="compact" forceDark />
                  </div>
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-medium text-white">
                      {comp.name}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Showcase (md 이상) ───────────────────── */}
      <section className="relative hidden overflow-hidden pb-6 md:block">
        {/* Row 1 */}
        <div className="flex gap-5 px-6">
          {row1.map((comp, i) => (
            <ShowcaseCard key={`r1-${i}`} slug={comp.slug} />
          ))}
        </div>

        {/* Row 2 — offset */}
        <div className="mt-5 flex gap-5 pr-40">
          {row2.map((comp, i) => (
            <ShowcaseCard key={`r2-${i}`} slug={comp.slug} />
          ))}
        </div>

        {/* Row 3 */}
        <div className="mt-5 flex gap-5 px-6">
          {row3.map((comp, i) => (
            <ShowcaseCard key={`r3-${i}`} slug={comp.slug} />
          ))}
        </div>

        {/* Gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-20 h-[400px] bg-gradient-to-b from-transparent to-gray-950" />

        {/* CTA */}
        <div className="relative z-[21] mt-4 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 text-base font-semibold text-white hover:bg-indigo-700"
          >
            모든 컴포넌트 탐색 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Categories ───────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            카테고리별 탐색
          </h2>
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
                        <h3 className="font-semibold text-gray-900">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {cat.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────── */}
      <footer className="border-t border-gray-800 bg-gray-950 px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
          <p>SaaS UI Component Library — React + Tailwind CSS</p>
          <p className="mt-1">코드를 복사해서 자유롭게 사용하세요.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Showcase Card ──────────────────────────────── */
function ShowcaseCard({ slug }: { slug: string }) {
  return (
    <article className="w-[274px] shrink-0 overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
      <div className="group relative h-[230px] overflow-hidden">
        <LivePreview slug={slug} mode="compact" forceDark />

        {/* Hover overlay — Get code */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            to={`/components/${slug}`}
            className="flex items-center gap-1.5 rounded bg-gray-800/80 px-2 py-1 text-sm font-semibold text-white hover:bg-gray-700"
          >
            <Code2 className="h-4 w-4" /> Get code
          </Link>
        </div>
      </div>
    </article>
  );
}
