'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { diffLines } from 'diff';
import { cn } from '@/lib/utils';

export function TextDiffChecker() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const diff = useMemo(() => diffLines(left, right), [left, right]);
  const added = diff.filter((p) => p.added).length;
  const removed = diff.filter((p) => p.removed).length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="left" className="mb-2 block">
            Original text
          </Label>
          <Textarea
            id="left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="min-h-[260px] font-mono text-sm"
          />
        </div>
        <div>
          <Label htmlFor="right" className="mb-2 block">
            Changed text
          </Label>
          <Textarea
            id="right"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="min-h-[260px] font-mono text-sm"
          />
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="mb-2 flex gap-4 text-xs">
          <span className="text-success">+ {added} added</span>
          <span className="text-destructive">− {removed} removed</span>
        </div>
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono text-sm">
          {diff.map((part, i) => (
            <span
              key={i}
              className={cn(
                part.added && 'bg-success/15 text-success',
                part.removed && 'bg-destructive/15 text-destructive line-through',
              )}
            >
              {part.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
