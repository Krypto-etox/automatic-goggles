'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { deduplicate } from '@/lib/calculations/text';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { CopyButton } from '@/components/shared/copy-button';

export function DuplicateLineRemover() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'lines' | 'words'>('lines');
  const [keepOrder, setKeepOrder] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOutput, setSortOutput] = useState(false);

  const output = useMemo(
    () =>
      deduplicate(input, {
        mode,
        keepOrder,
        ignoreCase,
        removeEmpty,
        sortOutput,
      }),
    [input, mode, keepOrder, ignoreCase, removeEmpty, sortOutput],
  );

  const beforeCount = mode === 'lines' ? input.split(/\r?\n/).length : input.split(/\s+/).filter(Boolean).length;
  const afterCount = mode === 'lines' ? output.split('\n').filter((l) => l !== '' || !removeEmpty).length : output.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-6 rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === 'lines' ? 'default' : 'outline'}
            onClick={() => setMode('lines')}
          >
            Lines
          </Button>
          <Button
            size="sm"
            variant={mode === 'words' ? 'default' : 'outline'}
            onClick={() => setMode('words')}
          >
            Words
          </Button>
        </div>
        <Toggle label="Keep order" checked={keepOrder} onChange={setKeepOrder} />
        <Toggle label="Ignore case" checked={ignoreCase} onChange={setIgnoreCase} />
        <Toggle label="Remove empty" checked={removeEmpty} onChange={setRemoveEmpty} />
        <Toggle label="Sort output" checked={sortOutput} onChange={setSortOutput} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Input ({beforeCount})</Label>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setInput('')}
              aria-label="Clear"
            >
              <Trash2 />
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'lines' ? 'Paste lines here…' : 'Paste words here…'}
            className="min-h-[280px] font-mono text-sm"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Output ({afterCount})</Label>
            <CopyButton value={output} />
          </div>
          <Textarea
            readOnly
            value={output}
            className="min-h-[280px] bg-surface/50 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}
