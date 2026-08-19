'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn, formatINR } from '@/lib/utils';

/** Labelled field wrapper. */
export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

/** Currency input that displays ₹ and formats on blur. */
export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode'> & {
    symbol?: string;
  }
>(function CurrencyInput({ className, symbol = '₹', value, onBlur, ...props }, ref) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        {symbol}
      </span>
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={value}
        onBlur={onBlur}
        className={cn('pl-7 tabular-nums', className)}
        {...props}
      />
    </div>
  );
});

/** Percent input that shows a trailing %. */
export const PercentInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode'>
>(function PercentInput({ className, ...props }, ref) {
  return (
    <div className="relative">
      <Input
        ref={ref}
        type="number"
        inputMode="decimal"
        step="0.1"
        className={cn('pr-8 tabular-nums', className)}
        {...props}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
        %
      </span>
    </div>
  );
});

/** Read-only result value with big monospace formatting. */
export function ResultStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: 'success' | 'primary' | 'default';
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p
        className={cn(
          'font-mono text-2xl font-semibold tabular-nums',
          accent === 'success' && 'text-success',
          accent === 'primary' && 'text-primary',
        )}
      >
        {typeof value === 'number' ? formatINR(value) : value}
      </p>
    </div>
  );
}
