'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  generateLorem,
  type LoremUnit,
  type LoremVariant,
} from '@/lib/calculations/text';
import { CopyButton } from '@/components/shared/copy-button';

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>('paragraphs');
  const [variant, setVariant] = useState<LoremVariant>('latin');
  const [output, setOutput] = useState(() =>
    generateLorem(3, 'paragraphs', 'latin'),
  );

  function regenerate() {
    setOutput(generateLorem(count, unit, variant));
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <Label className="mb-2 block">Count</Label>
          <Input
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <div>
          <Label className="mb-2 block">Unit</Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as LoremUnit)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block">Style</Label>
          <Select
            value={variant}
            onValueChange={(v) => setVariant(v as LoremVariant)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latin">Classic Latin</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="hipster">Hipster</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={regenerate} className="w-full">
            Generate
          </Button>
        </div>
      </div>
      <div className="relative">
        <Textarea
          readOnly
          value={output}
          className="min-h-[220px] bg-surface/50 text-sm leading-relaxed"
        />
        <div className="absolute right-3 top-3">
          <CopyButton value={output} />
        </div>
      </div>
    </div>
  );
}
