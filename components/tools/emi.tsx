'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import { PercentInput } from '@/components/shared/inputs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  calculateEMI,
  applyPrepayment,
} from '@/lib/calculations/emi';
import { formatINR } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function EmiCalculator() {
  const [principal, setPrincipal] = useState('5000000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState(20);
  const [prepay, setPrepay] = useState('0');
  const [usePrepay, setUsePrepay] = useState(false);

  const base = useMemo(
    () =>
      calculateEMI({
        principal: Number(principal) || 0,
        annualRatePct: Number(rate) || 0,
        tenureMonths: years * 12,
      }),
    [principal, rate, years],
  );

  const withPrepay = useMemo(() => {
    if (!usePrepay || Number(prepay) <= 0) return null;
    return applyPrepayment({
      emiResult: base,
      prepaymentAmount: Number(prepay),
      afterMonth: 12,
      annualRatePct: Number(rate) || 0,
      mode: 'reduce-tenure',
    });
  }, [base, prepay, usePrepay, rate]);

  const months = years * 12;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-5 p-6 md:grid-cols-3">
          <Field label="Loan amount (₹)" htmlFor="p">
            <CurrencyInput
              id="p"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <Field label="Interest rate (annual)" htmlFor="r">
            <PercentInput
              id="r"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Field>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <Label>Tenure</Label>
              <span className="font-mono">{years} years</span>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={30}
              step={1}
              onValueChange={(v) => setYears(v[0]!)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Monthly EMI" value={formatINR(base.emi)} accent />
        <Stat label="Total interest" value={formatINR(base.totalInterest)} />
        <Stat label="Total payment" value={formatINR(base.totalPayment)} />
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Add a one-time prepayment (after 1 year)
            </span>
            <Switch checked={usePrepay} onCheckedChange={setUsePrepay} />
          </label>
          {usePrepay ? (
            <Field label="Prepayment amount (₹)" htmlFor="prepay">
              <CurrencyInput
                id="prepay"
                value={prepay}
                onChange={(e) => setPrepay(e.target.value.replace(/[^0-9.]/g, ''))}
              />
            </Field>
          ) : null}
          {withPrepay ? (
            <div className="grid gap-3 rounded-lg bg-success/10 p-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted">Interest saved</p>
                <p className="font-mono text-lg font-bold text-success">
                  {formatINR(withPrepay.interestSaved)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Tenure reduced by</p>
                <p className="font-mono text-lg font-bold text-success">
                  {withPrepay.tenureReducedMonths} months
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">New tenure</p>
                <p className="font-mono text-lg font-bold text-success">
                  {Math.floor(withPrepay.newTenureMonths / 12)}y{' '}
                  {withPrepay.newTenureMonths % 12}m
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-4">
            <h3 className="font-semibold">Amortization schedule</h3>
            <p className="text-xs text-muted">
              Showing first 12 of {months} months
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">EMI</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {base.schedule.slice(0, 12).map((row) => (
                <TableRow key={row.month} className="tabular-nums">
                  <TableCell>{row.month}</TableCell>
                  <TableCell className="text-right">{formatINR(row.emi)}</TableCell>
                  <TableCell className="text-right text-destructive">
                    {formatINR(row.interest)}
                  </TableCell>
                  <TableCell className="text-right text-success">
                    {formatINR(row.principal)}
                  </TableCell>
                  <TableCell className="text-right">{formatINR(row.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
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
