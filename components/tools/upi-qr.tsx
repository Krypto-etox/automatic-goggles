'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field } from '@/components/shared/inputs';
import { buildUpiUri } from '@/lib/calculations/qr';
import { QrDisplay } from '@/components/qr-display';

export function UpiQrGenerator() {
  const [vpa, setVpa] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const uri = useMemo(
    () =>
      vpa
        ? buildUpiUri({
            pa: vpa,
            pn: name || 'Payee',
            am: amount || undefined,
            tn: note || undefined,
          })
        : '',
    [vpa, name, amount, note],
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="UPI ID / VPA" htmlFor="vpa" hint="e.g. yourname@okhdfcbank">
          <Input
            id="vpa"
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            placeholder="name@bank"
          />
        </Field>
        <Field label="Payee name" htmlFor="pn">
          <Input
            id="pn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your business or name"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Amount (₹, optional)" htmlFor="am">
            <Input
              id="am"
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </Field>
          <Field label="Note (optional)" htmlFor="tn">
            <Input
              id="tn"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Payment for…"
            />
          </Field>
        </div>
        <p className="text-xs text-muted">
          Scanning this QR opens any UPI app (GPay, PhonePe, Paytm, BHIM) with
          the details prefilled.
        </p>
      </div>
      <div>
        <QrDisplay value={uri} downloadName="upi-qr" />
      </div>
    </div>
  );
}
