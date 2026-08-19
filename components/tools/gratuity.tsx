'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  calculateGratuity,
  GRATUITY_CAP,
} from '@/lib/calculations/gratuity';
import { formatINR } from '@/lib/utils';

export function GratuityCalculator() {
  const [salary, setSalary] = useState('60000');
  const [years, setYears] = useState('10');
  const [covered, setCovered] = useState(true);

  const result = useMemo(
    () =>
      calculateGratuity({
        lastDrawnSalary: Number(salary) || 0,
        yearsOfService: Number(years) || 0,
        coveredByAct: covered,
      }),
    [salary, years, covered],
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 p-6">
          <Field
            label="Last drawn salary (basic + DA, monthly, ₹)"
            htmlFor="sal"
          >
            <CurrencyInput
              id="sal"
              value={salary}
              onChange={(e) => setSalary(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <div>
            <Label htmlFor="yrs" className="mb-2 block">
              Years of service
            </Label>
            <Input
              id="yrs"
              type="number"
              min={0}
              step={0.5}
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted">
              Rounded to {result.roundedYears} year
              {result.roundedYears === 1 ? '' : 's'} (6+ months rounds up)
            </p>
          </div>
          <label className="flex items-center justify-between rounded-lg border p-3 text-sm">
            <span>Covered under Payment of Gratuity Act</span>
            <Switch checked={covered} onCheckedChange={setCovered} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          {!result.eligible ? (
            <div className="py-8 text-center text-muted">
              You become eligible after 5 continuous years of service.
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">Estimated gratuity</p>
              <p className="my-2 font-mono text-4xl font-bold text-primary">
                {formatINR(result.gratuity)}
              </p>
              <p className="text-xs text-muted">
                Formula: (15 × ₹{Number(salary).toLocaleString('en-IN')} ×{' '}
                {result.roundedYears}) ÷ {result.divisor}
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <Row
                  label="Tax-free (up to cap)"
                  value={formatINR(result.taxFree)}
                />
                <Row label="Taxable portion" value={formatINR(result.taxable)} />
                <p className="pt-2 text-xs text-muted">
                  The tax-free cap under the Act is{' '}
                  {formatINR(GRATUITY_CAP)}.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}
