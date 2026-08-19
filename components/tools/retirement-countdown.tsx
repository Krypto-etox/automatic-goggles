'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { calculateRetirement } from '@/lib/calculations/date';
import { formatINR } from '@/lib/utils';
import { format } from 'date-fns';

export function RetirementCountdown() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(60);
  const [expense, setExpense] = useState('');

  const result = useMemo(() => {
    if (!dob) return null;
    const monthly = Number(expense) || undefined;
    return calculateRetirement(new Date(dob), age, new Date(), monthly);
  }, [dob, age, expense]);

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
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="age" className="mb-2 block">
            Retirement age
          </Label>
          <Input
            id="age"
            type="number"
            min={40}
            max={80}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="expense" className="mb-2 block">
            Monthly expenses today (₹, optional)
          </Label>
          <Input
            id="expense"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 50000"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          {result ? (
            <>
              <p className="text-sm text-muted">Time until retirement</p>
              <div className="my-4 grid grid-cols-3 gap-2 text-center">
                <Stat value={result.years} label="Years" />
                <Stat value={result.months} label="Months" />
                <Stat value={result.days} label="Days" />
              </div>
              <div className="space-y-2 text-sm text-muted">
                <Row
                  label="Retirement date"
                  value={format(result.retirementDate, 'd MMM yyyy')}
                />
                <Row
                  label="Total days"
                  value={result.totalDays.toLocaleString('en-IN')}
                />
                {result.estimatedCorpus ? (
                  <Row
                    label="Est. corpus needed"
                    value={formatINR(result.estimatedCorpus)}
                  />
                ) : null}
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-muted">
              Enter your date of birth to start the countdown.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-mono text-3xl font-bold text-primary">{value}</p>
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
