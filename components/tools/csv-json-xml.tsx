'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  convertData,
  type ConvertFormat,
} from '@/lib/calculations/converters';
import { CopyButton } from '@/components/shared/copy-button';
import { DownloadButton } from '@/components/shared/download-button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const SAMPLE: Record<ConvertFormat, string> = {
  csv: 'name,age,city\nAlice,30,Mumbai\nBob,25,Pune',
  json: '[\n  {\n    "name": "Alice",\n    "age": 30,\n    "city": "Mumbai"\n  }\n]',
  xml: '<?xml version="1.0"?>\n<root>\n  <item>\n    <name>Alice</name>\n    <age>30</age>\n  </item>\n</root>',
};

const EXT: Record<ConvertFormat, string> = {
  csv: 'csv',
  json: 'json',
  xml: 'xml',
};

export function CsvJsonXmlConverter() {
  const [input, setInput] = useState(SAMPLE.csv);
  const [from, setFrom] = useState<ConvertFormat | 'auto'>('auto');
  const [to, setTo] = useState<ConvertFormat>('json');

  const result = useMemo(
    () => convertData(input, from, to),
    [input, from, to],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border p-4">
        <div className="space-y-1">
          <Label className="text-xs">From</Label>
          <Select
            value={from}
            onValueChange={(v) => setFrom(v as ConvertFormat | 'auto')}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="pb-2 text-muted">→</span>
        <div className="space-y-1">
          <Label className="text-xs">To</Label>
          <Select value={to} onValueChange={(v) => setTo(v as ConvertFormat)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput(SAMPLE[to === 'xml' ? 'xml' : to === 'json' ? 'json' : 'csv'])}
          >
            Load sample
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setInput('')}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="in" className="mb-2 block text-xs uppercase tracking-wide text-muted">
            Input {from === 'auto' && result.detected ? `(detected: ${result.detected.toUpperCase()})` : ''}
          </Label>
          <Textarea
            id="in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wide text-muted">
              Output
            </Label>
            <div className="flex gap-2">
              <CopyButton value={result.output} />
              <DownloadButton
                content={result.output}
                filename={`converted.${EXT[to]}`}
                mime={
                  to === 'json'
                    ? 'application/json'
                    : to === 'xml'
                      ? 'application/xml'
                      : 'text/csv'
                }
                size="sm"
                label="Download"
              />
            </div>
          </div>
          {result.error ? (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{result.error}</AlertDescription>
            </Alert>
          ) : (
            <Textarea
              readOnly
              value={result.output}
              className="min-h-[320px] bg-surface/50 font-mono text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
