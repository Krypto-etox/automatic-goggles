import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PrivacyBadge({
  note = 'Processed locally in your browser — your data never leaves your device.',
  className,
}: {
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success',
        className,
      )}
    >
      <ShieldCheck className="size-3.5" />
      <span>{note}</span>
    </div>
  );
}
