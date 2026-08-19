'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import {
  TAX_CONFIG,
} from '@/lib/config/india/tax-slabs';
import { compareRegimes } from '@/lib/calculations/tax';
import { formatINR, formatNumber } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaxRegimeCalculator() {
  const [income, setIncome] = useState('1500000');
  const [d80c, setD80c] = useState('150000');
  const [d80d, setD80d] = useState('25000');
  const [hra, setHra] = useState('0');
  const [other, setOther] = useState('0');

  const result = useMemo(
    () =>
      compareRegimes(Number(income) || 0, {
        section80c: Number(d80c) || 0,
        section80d: Number(d80d) || 0,
        hra: Number(hra) || 0,
        otherDeductions: Number(other) || 0,
      }),
    [income, d80c, d80d, hra, other],
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="new" className="w-full">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 p-6">
              <Field label="Annual gross income (₹)" htmlFor="inc">
                <CurrencyInput
                  id="inc"
                  value={income}
                  onChange={(e) => setIncome(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </Field>
              <p className="rounded-lg bg-surface p-3 text-xs text-muted">
                <strong className="text-foreground">Old regime only</strong> —
                deductions below are ignored under the new regime. Standard
                deduction (₹50,000 old / ₹75,000 new) is applied automatically.
              </p>
              <Field label="Section 80C investments (₹)" htmlFor="d80c">
                <CurrencyInput
                  id="d80c"
                  value={d80c}
                  onChange={(e) => setD80c(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </Field>
              <Field label="Section 80D health insurance (₹)" htmlFor="d80d">
                <CurrencyInput
                  id="d80d"
                  value={d80d}
                  onChange={(e) => setD80d(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </Field>
              <Field label="HRA exemption (₹)" htmlFor="hra">
                <CurrencyInput
                  id="hra"
                  value={hra}
                  onChange={(e) => setHra(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </Field>
              <Field label="Other deductions (₹)" htmlFor="other">
                <CurrencyInput
                  id="other"
                  value={other}
                  onChange={(e) => setOther(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">New Regime</TabsTrigger>
                <TabsTrigger value="old">Old Regime</TabsTrigger>
              </TabsList>
              <TabsContent value="new">
                <RegimeBreakdown
                  data={result.new}
                  savings={result.betterRegime === 'new' ? result.savings : 0}
                  best={result.betterRegime === 'new'}
                />
              </TabsContent>
              <TabsContent value="old">
                <RegimeBreakdown
                  data={result.old}
                  savings={result.betterRegime === 'old' ? result.savings : 0}
                  best={result.betterRegime === 'old'}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </Tabs>
      <p className="text-center text-sm text-muted">
        FY {TAX_CONFIG.fy} (AY {TAX_CONFIG.ay}) slabs · 4% health & education
        cess applied. You save{' '}
        <strong className="text-success">{formatINR(result.savings)}</strong>{' '}
        under the <strong>{result.betterRegime} regime</strong>.
      </p>
    </div>
  );
}

function RegimeBreakdown({
  data,
  savings,
  best,
}: {
  data: ReturnType<typeof compareRegimes>['new'];
  savings: number;
  best: boolean;
}) {
  return (
    <div className="mt-4 space-y-3">
      {best ? (
        <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
          <CheckCircle2 className="size-4" /> Better choice for your inputs —
          saves {formatINR(savings)}
        </div>
      ) : null}
      <Row label="Taxable income" value={formatINR(data.taxableIncome)} />
      <Row label="Tax before rebate" value={formatINR(data.taxBeforeRebate)} />
      <Row label="87A rebate" value={`− ${formatINR(data.rebate)}`} />
      <Row label="Health & education cess (4%)" value={formatINR(data.cess)} />
      <div className="flex items-center justify-between border-t pt-3">
        <span className="font-semibold">Total tax</span>
        <span className="font-mono text-2xl font-bold text-primary">
          {formatINR(data.totalTax)}
        </span>
      </div>
      <details className="text-xs text-muted">
        <summary className="cursor-pointer">Slab breakdown</summary>
        <div className="mt-2 space-y-1">
          {data.slabs.map((s, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {formatNumber(s.from)}–{s.to === null ? '∞' : formatNumber(s.to)}
                <span className="ml-1">@ {(s.rate * 100).toFixed(0)}%</span>
              </span>
              <span className="font-mono">{formatINR(s.tax)}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn('flex justify-between text-sm')}>
      <span className="text-muted">{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}
