'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { countText } from '@/lib/calculations/text';
import { PLATFORM_LIMITS } from '@/lib/constants/platform-limits';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/shared/copy-button';

export function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => countText(text), [text]);

  const metrics = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'No spaces', value: stats.charactersNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    {
      label: 'Reading time',
      value: `${Math.max(1, Math.round(stats.readingTimeMinutes))} min`,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          className="min-h-[280px] font-mono text-sm"
        />
        <div className="mt-3 flex justify-end">
          <CopyButton value={text} label="Copy text" />
        </div>
      </div>
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 p-5">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-mono text-2xl font-semibold tabular-nums">
                  {m.value}
                </p>
                <p className="text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-5">
            <p className="text-sm font-semibold">Platform limits</p>
            {PLATFORM_LIMITS.map((p) => {
              const over = p.type === 'chars' && stats.characters > p.limit;
              const near =
                p.type === 'chars' &&
                stats.characters > p.limit * 0.9 &&
                !over;
              return (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{p.name}</span>
                    <span
                      className={cn(
                        'tabular-nums',
                        over
                          ? 'font-semibold text-destructive'
                          : near
                            ? 'font-semibold text-warning'
                            : 'text-muted',
                      )}
                    >
                      {p.type === 'chars'
                        ? `${stats.characters}/${p.limit}`
                        : `${stats.words}/${p.limit}`}
                    </span>
                  </div>
                  {p.type === 'chars' ? (
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          over ? 'bg-destructive' : 'bg-primary',
                        )}
                        style={{
                          width: `${Math.min(100, (stats.characters / p.limit) * 100)}%`,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
