'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  calculateDueDate,
  type DueDateMode,
} from '@/lib/calculations/date';
import { format } from 'date-fns';

export function PregnancyDueDateCalculator() {
  const [date, setDate] = useState('');
  const [mode, setMode] = useState<DueDateMode>('lmp');

  const result = useMemo(() => {
    if (!date) return null;
    return calculateDueDate(new Date(date), mode);
  }, [date, mode]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="mode" className="mb-2 block">
            Calculate from
          </Label>
          <Select value={mode} onValueChange={(v) => setMode(v as DueDateMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lmp">First day of last period (LMP)</SelectItem>
              <SelectItem value="conception">Conception date</SelectItem>
              <SelectItem value="ivf5">IVF 5-day transfer</SelectItem>
              <SelectItem value="ivf3">IVF 3-day transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date" className="mb-2 block">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          {result ? (
            <>
              <p className="text-sm text-muted">Estimated due date</p>
              <p className="mt-1 font-mono text-3xl font-bold text-primary">
                {format(result.dueDate, 'd MMMM yyyy')}
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <Row label="Current week" value={`Week ${result.currentWeek}`} />
                <Row label="Trimester" value={`Trimester ${result.trimester}`} />
                <Row
                  label="First trimester ends"
                  value={format(result.firstTrimesterEnd, 'd MMM yyyy')}
                />
                <Row
                  label="Second trimester ends"
                  value={format(result.secondTrimesterEnd, 'd MMM yyyy')}
                />
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-muted">
              Enter a date to calculate your due date.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-1.5 text-muted">
      <span>{label}</span>
      <span className="font-mono text-foreground">{value}</span>
    </div>
  );
}
