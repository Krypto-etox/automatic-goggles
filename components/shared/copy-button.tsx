'use client';

import { Check, Copy } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  value: string;
  label?: string;
}

export function CopyButton({
  value,
  label = 'Copy',
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => copy(value)}
      className={cn(className)}
      aria-label={label}
      {...props}
    >
      {copied ? <Check /> : <Copy />}
      <span>{copied ? 'Copied!' : label}</span>
    </Button>
  );
}
