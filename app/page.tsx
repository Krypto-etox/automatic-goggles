import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolCard } from '@/components/shared/tool-card';
import { CATEGORIES } from '@/lib/tools/categories';
import {
  getPopularTools,
  TOOLS_REGISTRY,
  TOOL_STATS,
} from '@/lib/tools/registry';
import { accentFor } from '@/lib/tools/accent';
import { siteConfig } from '@/lib/config/site';

export default function HomePage() {
  const popular = getPopularTools();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]"
        />
        <div className="container py-16 text-center md:py-24">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Sparkles className="size-3" />
            {TOOL_STATS.live} of {TOOL_STATS.total} tools live — more shipping
            weekly
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Every tool. One nest.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/tools">
                Browse all tools
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools/finance">Finance & Tax</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted">
            No signup · No paywall · Most tools run privately in your browser
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12 md:py-16">
        <h2 className="mb-6 text-2xl font-semibold">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const accent = accentFor(c.id);
            const count = TOOLS_REGISTRY.filter((t) => t.category === c.id)
              .length;
            return (
              <Link
                key={c.id}
                href={`/tools/${c.slug}`}
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${accent.bgSoft}`}
                >
                  <c.icon className={`size-5 ${accent.text}`} />
                </span>
                <span>
                  <span className="flex items-center gap-2 font-semibold">
                    {c.name}
                    <Badge variant="secondary" className="text-[10px]">
                      {count}
                    </Badge>
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {c.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="container pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Popular tools</h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </>
  );
}
