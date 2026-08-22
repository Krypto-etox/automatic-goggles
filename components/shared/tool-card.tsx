import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ToolDef } from '@/lib/tools/types';
import { CATEGORY_BY_ID } from '@/lib/tools/categories';
import { accentFor } from '@/lib/tools/accent';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ToolCard({
  tool,
  showCategory = false,
}: {
  tool: ToolDef;
  showCategory?: boolean;
}) {
  const category = CATEGORY_BY_ID[tool.category];
  const accent = accentFor(tool.category);
  const Icon = category!.icon;
  const isLive = tool.status === 'live';
  return (
    <Link
      href={`/tools/${category!.slug}/${tool.slug}`}
      className={cn('group block focus:outline-none', !isLive && 'pointer-events-none')}
      aria-disabled={!isLive}
    >
      <Card
        className={cn(
          'relative h-full p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md',
          'group-focus-visible:ring-2 group-focus-visible:ring-ring',
          !isLive && 'opacity-70',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-lg',
              accent.bgSoft,
            )}
          >
            <Icon className={cn('size-5', accent.text)} />
          </span>
          {!isLive ? (
            <Badge variant="secondary">Soon</Badge>
          ) : showCategory ? (
            <Badge variant="outline" className="text-muted">
              {category!.name}
            </Badge>
          ) : (
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </div>
        <h3 className="mb-1 font-semibold leading-snug">{tool.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{tool.description}</p>
      </Card>
    </Link>
  );
}
