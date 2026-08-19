import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-semibold', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Boxes className="size-5" />
      </span>
      {showText ? <span className="text-lg tracking-tight">{siteConfig.name}</span> : null}
    </Link>
  );
}
