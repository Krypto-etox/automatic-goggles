import { cn } from '@/lib/utils';

interface AdSlotProps {
  className?: string;
  label?: string;
  /** Reserved ad dimensions for layout stability (CLS). */
  minHeight?: number;
}

/**
 * Placeholder ad slot. Hidden / inert until an ad network is configured,
 * but reserves layout space to avoid layout shift (CLS < 0.1 target).
 */
export function AdSlot({
  className,
  label = 'Advertisement',
  minHeight = 90,
}: AdSlotProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 text-xs uppercase tracking-widest text-muted',
        process.env.NODE_ENV === 'production' ? 'hidden' : '',
        className,
      )}
      style={{ minHeight }}
      aria-hidden="true"
      data-ad-slot
    >
      {label}
    </div>
  );
}
