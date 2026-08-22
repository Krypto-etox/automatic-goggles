'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, CurrencyInput } from '@/components/shared/inputs';
import { Switch } from '@/components/ui/switch';
import { calculateHRA } from '@/lib/calculations/hra';
import { formatINR } from '@/lib/utils';

export function HraCalculator() {
  const [basic, setBasic] = useState('50000');
  const [hraReceived, setHraReceived] = useState('20000');
  const [rentPaid, setRentPaid] = useState('20000');
  const [metro, setMetro] = useState(true);

  const result = useMemo(
    () =>
      calculateHRA({
        basic: Number(basic) || 0,
        hraReceived: Number(hraReceived) || 0,
        rentPaid: Number(rentPaid) || 0,
        metro,
      }),
    [basic, hraReceived, rentPaid, metro],
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 p-6">
          <Field label="Basic salary (monthly, ₹)" htmlFor="basic">
            <CurrencyInput
              id="basic"
              value={basic}
              onChange={(e) => setBasic(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </Field>
          <Field label="HRA received (monthly, ₹)" htmlFor="hra">
            <CurrencyInput
              id="hra"
              value={hraReceived}
              onChange={(e) =>
                setHraReceived(e.target.value.replace(/[^0-9.]/g, ''))
              }
            />
          </Field>
          <Field label="Rent paid (monthly, ₹)" htmlFor="rent">
            <CurrencyInput
              id="rent"
              value={rentPaid}
              onChange={(e) =>
                setRentPaid(e.target.value.replace(/[^0-9.]/g, ''))
              }
            />
          </Field>
          <label className="flex items-center justify-between rounded-lg border p-3 text-sm">
            <span>I live in a metro (Delhi, Mumbai, Kolkata, Chennai)</span>
            <Switch checked={metro} onCheckedChange={setMetro} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted">HRA exemption (monthly)</p>
          <p className="my-2 font-mono text-4xl font-bold text-success">
            {formatINR(result.exemption)}
          </p>
          <p className="text-xs text-muted">
            ≈ {formatINR(result.exemption * 12)} per year
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <CmpRow label="Actual HRA received" value={formatINR(result.actualHra)} />
            <CmpRow
              label="Rent paid − 10% of basic"
              value={formatINR(result.rentOver10Percent)}
            />
            <CmpRow
              label={`${result.metroPercent * 100}% of basic`}
              value={formatINR(result.metroPercent * (Number(basic) || 0))}
            />
            <div className="flex justify-between border-t pt-2">
              <span className="text-muted">Taxable HRA</span>
              <span className="font-mono font-semibold text-destructive">
                {formatINR(result.taxableHra)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CmpRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted">
      <span>{label}</span>
      <span className="font-mono text-foreground">{value}</span>
    </div>
  );
}
