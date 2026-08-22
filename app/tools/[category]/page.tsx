import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolCard } from '@/components/shared/tool-card';
import { CATEGORIES, getCategory } from '@/lib/tools/categories';
import { getToolsByCategory } from '@/lib/tools/registry';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: `${category.name} Tools`,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();
  const tools = getToolsByCategory(category.id);
  const Icon = category.icon;

  return (
    <div className="container max-w-6xl py-10 md:py-14">
      <header className="mb-8">
        <span className="mb-3 inline-flex size-11 items-center justify-center rounded-lg bg-surface">
          <Icon className="size-5" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">
          {category.description}
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </div>
  );
}
