'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  CATEGORIES,
  CATEGORY_BY_ID,
} from '@/lib/tools/categories';
import { TOOLS_REGISTRY } from '@/lib/tools/registry';
import { accentFor } from '@/lib/tools/accent';
import { cn } from '@/lib/utils';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS_REGISTRY.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q)),
    ).slice(0, 8);
  }, [query]);

  function go(slug: string, category: string) {
    const cat = CATEGORY_BY_ID[category as keyof typeof CATEGORY_BY_ID];
    router.push(`/tools/${cat?.slug}/${slug}`);
    setOpen(false);
    setQuery('');
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex h-9 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-muted transition-colors hover:bg-accent/50 md:w-64"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search tools…</span>
        <kbd className="hidden rounded border bg-surface px-1.5 py-0.5 text-[10px] md:inline">
          /
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border bg-popover shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-4">
          <Search className="size-4 text-muted" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 35+ free tools…"
            className="h-12 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query && results.length === 0 ? (
            <p className="p-4 text-sm text-muted">No tools match “{query}”.</p>
          ) : null}
          {!query ? (
            <div className="space-y-1 p-2">
              <p className="px-2 pb-1 text-xs uppercase tracking-wide text-muted">
                Categories
              </p>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    router.push(`/tools/${c.slug}`);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                >
                  <c.icon className={cn('size-4', accentFor(c.id).text)} />
                  {c.name}
                </button>
              ))}
            </div>
          ) : (
            results.map((t) => {
              const cat = CATEGORY_BY_ID[t.category];
              return (
                <button
                  key={t.slug}
                  onClick={() => go(t.slug, t.category)}
                  className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left hover:bg-accent"
                >
                  <cat.icon className={cn('mt-0.5 size-4', accentFor(t.category).text)} />
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted">
                      {t.description}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
