'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import { PercentInput } from '@/components/shared/inputs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  calculateSIP,
  calculateLumpsum,
} from '@/lib/calculations/sip';
import { formatINR, formatINRCompact } from '@/lib/utils';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function SipCalculator() {
  return (
    <Tabs defaultValue="sip" className="w-full">
      <TabsList className="grid w-full max-w-sm grid-cols-2">
        <TabsTrigger value="sip">SIP</TabsTrigger>
        <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
      </TabsList>
      <TabsContent value="sip">
        <SipMode />
      </TabsContent>
      <TabsContent value="lumpsum">
        <LumpsumMode />
      </TabsContent>
    </Tabs>
  );
}

function SipMode() {
  const [monthly, setMonthly] = useState('10000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState(10);
  const result = useMemo(
    () =>
      calculateSIP({
        monthlyAmount: Number(monthly) || 0,
        annualReturnPct: Number(rate) || 0,
        years,
      }),
    [monthly, rate, years],
  );
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-5 p-6 md:grid-cols-3">
          <Field label="Monthly investment (₹)" htmlFor="sip-amt">
            <CurrencyInput
              id="sip-amt"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <Field label="Expected return rate (p.a.)" htmlFor="sip-rate">
            <PercentInput
              id="sip-rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Field>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Time period</span>
              <span className="font-mono">{years} years</span>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={40}
              step={1}
              onValueChange={(v) => setYears(v[0]!)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Invested" value={formatINR(result.invested)} />
        <Stat label="Est. returns" value={formatINR(result.estimatedReturns)} />
        <Stat label="Total value" value={formatINR(result.futureValue)} accent />
      </div>
      <Chart data={result.yearly} />
    </div>
  );
}

function LumpsumMode() {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState(10);
  const result = useMemo(
    () =>
      calculateLumpsum({
        amount: Number(amount) || 0,
        annualReturnPct: Number(rate) || 0,
        years,
      }),
    [amount, rate, years],
  );
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-5 p-6 md:grid-cols-3">
          <Field label="One-time investment (₹)" htmlFor="ls-amt">
            <CurrencyInput
              id="ls-amt"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <Field label="Expected return rate (p.a.)" htmlFor="ls-rate">
            <PercentInput
              id="ls-rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Field>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Time period</span>
              <span className="font-mono">{years} years</span>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={40}
              step={1}
              onValueChange={(v) => setYears(v[0]!)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Invested" value={formatINR(result.invested)} />
        <Stat label="Est. returns" value={formatINR(result.estimatedReturns)} />
        <Stat label="Total value" value={formatINR(result.futureValue)} accent />
      </div>
      <Chart data={result.yearly} />
    </div>
  );
}

function Chart({
  data,
}: {
  data: { year: number; invested: number; value: number }[];
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="invested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted))" fontSize={12} />
            <YAxis
              stroke="hsl(var(--muted))"
              fontSize={12}
              tickFormatter={(v) => formatINRCompact(Number(v))}
            />
            <Tooltip
              formatter={(v: number) => formatINR(v)}
              contentStyle={{
                background: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="#64748b"
              fill="url(#invested)"
              name="Invested"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="url(#value)"
              name="Total value"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p
          className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
            accent ? 'text-primary' : ''
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
