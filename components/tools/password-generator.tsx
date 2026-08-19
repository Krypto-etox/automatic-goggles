'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  generatePassword,
  generatePassphrase,
  estimateStrength,
} from '@/lib/calculations/password';
import { CopyButton } from '@/components/shared/copy-button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PasswordGenerator() {
  const [mode, setMode] = useState<'password' | 'passphrase'>('password');
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalize, setCapitalize] = useState(true);
  const [value, setValue] = useState('');

  function regenerate() {
    if (mode === 'password') {
      setValue(
        generatePassword({
          length,
          uppercase: upper,
          lowercase: lower,
          numbers,
          symbols,
          excludeAmbiguous: true,
        }),
      );
    } else {
      setValue(
        generatePassphrase({
          wordCount,
          separator,
          capitalize,
          includeNumber: true,
        }),
      );
    }
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    length,
    upper,
    lower,
    numbers,
    symbols,
    wordCount,
    separator,
    capitalize,
  ]);

  const strength = estimateStrength(value);
  const strengthColors = [
    'bg-destructive',
    'bg-destructive',
    'bg-warning',
    'bg-success',
    'bg-success',
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          readOnly
          value={value}
          className="h-14 pr-24 font-mono text-lg"
        />
        <div className="absolute right-2 top-2 flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={regenerate}
            aria-label="Regenerate"
          >
            <RefreshCw />
          </Button>
          <CopyButton value={value} label="" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted">Strength</span>
          <span className="font-medium">{strength.label}</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full bg-secondary',
                i <= strength.score && strengthColors[strength.score],
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={mode === 'password' ? 'default' : 'outline'}
          onClick={() => setMode('password')}
          className="flex-1"
        >
          Password
        </Button>
        <Button
          variant={mode === 'passphrase' ? 'default' : 'outline'}
          onClick={() => setMode('passphrase')}
          className="flex-1"
        >
          Passphrase
        </Button>
      </div>

      {mode === 'password' ? (
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <Label>Length</Label>
              <span className="font-mono">{length}</span>
            </div>
            <Slider
              value={[length]}
              min={6}
              max={64}
              step={1}
              onValueChange={(v) => setLength(v[0]!)}
            />
          </div>
          <Toggle label="Uppercase (A-Z)" checked={upper} onChange={setUpper} />
          <Toggle label="Lowercase (a-z)" checked={lower} onChange={setLower} />
          <Toggle label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
          <Toggle label="Symbols (!@#$)" checked={symbols} onChange={setSymbols} />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <Label>Words</Label>
              <span className="font-mono">{wordCount}</span>
            </div>
            <Slider
              value={[wordCount]}
              min={3}
              max={8}
              step={1}
              onValueChange={(v) => setWordCount(v[0]!)}
            />
          </div>
          <div>
            <Label htmlFor="sep" className="mb-1 block text-sm">
              Separator
            </Label>
            <Input
              id="sep"
              value={separator}
              maxLength={3}
              className="w-24"
              onChange={(e) => setSeparator(e.target.value || '-')}
            />
          </div>
          <Toggle
            label="Capitalize words"
            checked={capitalize}
            onChange={setCapitalize}
          />
        </div>
      )}
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
    <label className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
