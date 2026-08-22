'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  convertCase,
  type CaseType,
} from '@/lib/calculations/text';
import { CopyButton } from '@/components/shared/copy-button';

const OPTIONS: { id: CaseType; label: string }[] = [
  { id: 'upper', label: 'UPPER CASE' },
  { id: 'lower', label: 'lower case' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' },
  { id: 'pascal', label: 'PascalCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' },
  { id: 'constant', label: 'CONSTANT_CASE' },
  { id: 'alternating', label: 'aLtErNaTiNg' },
];

export function CaseConverter() {
  const [input, setInput] = useState('');
  const [active, setActive] = useState<CaseType>('title');
  const output = useMemo(
    () => convertCase(input, active),
    [input, active],
  );

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text to convert…"
        className="min-h-[140px]"
      />
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((o) => (
          <Button
            key={o.id}
            type="button"
            size="sm"
            variant={active === o.id ? 'default' : 'outline'}
            onClick={() => setActive(o.id)}
          >
            {o.label}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Textarea
          readOnly
          value={output}
          className="min-h-[140px] bg-surface/50 font-mono"
        />
        <div className="absolute right-3 top-3">
          <CopyButton value={output} />
        </div>
      </div>
    </div>
  );
}
