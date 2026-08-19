import type { Metadata } from 'next';
import { ToolCard } from '@/components/shared/tool-card';
import { CATEGORIES } from '@/lib/tools/categories';
import { getToolsByCategory } from '@/lib/tools/registry';

export const metadata: Metadata = {
  title: 'All Tools',
  description:
    'Browse every free ToolNest utility: Indian finance & tax calculators, file converters, text tools, date calculators, QR generators, document generators and SEO tools.',
};

export default function AllToolsPage() {
  return (
    <div className="container max-w-6xl py-10 md:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          All tools
        </h1>
        <p className="mt-2 text-lg text-muted">
          {CATEGORIES.length} categories. Fast, private, and free.
        </p>
      </header>

      <div className="space-y-12">
        {CATEGORIES.map((c) => {
          const tools = getToolsByCategory(c.id);
          return (
            <section key={c.id}>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <c.icon className="size-5 text-muted" />
                {c.name}
                <span className="text-sm font-normal text-muted">
                  ({tools.length})
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((t) => (
                  <ToolCard key={t.slug} tool={t} showCategory={false} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
