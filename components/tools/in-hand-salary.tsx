'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { calculateInHand } from '@/lib/calculations/salary';
import { PT_STATES } from '@/lib/config/india/professional-tax';
import { formatINR } from '@/lib/utils';

export function InHandSalaryCalculator() {
  const [ctc, setCtc] = useState('1200000');
  const [basicPct, setBasicPct] = useState(40);
  const [state, setState] = useState('None');
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [rent, setRent] = useState('0');

  const result = useMemo(
    () =>
      calculateInHand({
        ctcAnnual: Number(ctc) || 0,
        basicPct: basicPct / 100,
        state,
        regime,
        monthlyRentPaid: Number(rent) || 0,
      }),
    [ctc, basicPct, state, regime, rent],
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 p-6">
          <Field label="Annual CTC (₹)" htmlFor="ctc">
            <CurrencyInput
              id="ctc"
              value={ctc}
              onChange={(e) => setCtc(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Basic salary</span>
              <span className="font-mono">{basicPct}% of CTC</span>
            </div>
            <Slider
              value={[basicPct]}
              min={30}
              max={50}
              step={1}
              onValueChange={(v) => setBasicPct(v[0]!)}
            />
          </div>
          <Field label="State (professional tax)" htmlFor="state">
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PT_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === 'None' ? 'No professional tax' : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Tax regime" htmlFor="regime">
            <Select
              value={regime}
              onValueChange={(v) => setRegime(v as 'new' | 'old')}
            >
              <SelectTrigger id="regime">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New regime</SelectItem>
                <SelectItem value="old">Old regime</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {regime === 'old' ? (
            <Field label="Monthly rent paid (₹, for HRA)" htmlFor="rent">
              <Input
                id="rent"
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
            </Field>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted">Estimated monthly in-hand</p>
          <p className="my-2 font-mono text-4xl font-bold text-success">
            {formatINR(result.monthlyInHand)}
          </p>
          <p className="text-xs text-muted">
            ≈ {formatINR(result.annualInHand)} per year
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <Heading>Earnings (annual)</Heading>
            <Row label="Basic" value={formatINR(result.basic)} />
            <Row label="HRA" value={formatINR(result.hra)} />
            <Row label="Special allowance" value={formatINR(result.specialAllowance)} />
            <Heading>Deductions (annual)</Heading>
            <Row label="Employee PF" value={formatINR(result.employeePf)} />
            <Row label="Professional tax" value={formatINR(result.professionalTaxAnnual)} />
            <Row label="Income tax" value={formatINR(result.incomeTaxAnnual)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted">
      <span>{label}</span>
      <span className="font-mono text-foreground tabular-nums">{value}</span>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}
