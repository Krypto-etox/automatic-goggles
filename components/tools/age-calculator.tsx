'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { calculateAge } from '@/lib/calculations/date';
import { format } from 'date-fns';

function todayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [today, setToday] = useState(todayStr());

  const result = useMemo(() => {
    if (!dob) return null;
    return calculateAge(new Date(dob), new Date(today || todayStr()));
  }, [dob, today]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="dob" className="mb-2 block">
            Date of birth
          </Label>
          <Input
            id="dob"
            type="date"
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="today" className="mb-2 block">
            Age at date
          </Label>
          <Input
            id="today"
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          {result ? (
            <>
              <div className="grid grid-cols-3 gap-4 text-center">
                <Stat value={result.years} label="Years" big />
                <Stat value={result.months} label="Months" big />
                <Stat value={result.days} label="Days" big />
              </div>
              <div className="mt-6 space-y-2 text-sm text-muted">
                <Row label="Total months" value={result.years * 12 + result.months} />
                <Row label="Total weeks" value={result.totalWeeks.toLocaleString('en-IN')} />
                <Row label="Total days" value={result.totalDays.toLocaleString('en-IN')} />
                <Row
                  label="Next birthday in"
                  value={`${result.nextBirthdayDays} days`}
                />
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-muted">
              Enter your date of birth to see your exact age.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  value,
  label,
  big,
}: {
  value: number;
  label: string;
  big?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-mono font-bold tabular-nums text-primary ${
          big ? 'text-4xl' : 'text-2xl'
        }`}
      >
        {value}
      </p>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-1.5">
      <span>{label}</span>
      <span className="font-mono tabular-nums text-foreground">{value}</span>
    </div>
  );
}
