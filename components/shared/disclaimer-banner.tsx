import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface DisclaimerBannerProps {
  variant?: 'financial' | 'legal' | 'privacy' | 'general';
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const DEFAULTS = {
  financial: {
    title: 'Estimate only',
    body: 'This calculator is an estimate based on the published rates and rules. Always cross-verify with the official Income Tax Department calculator or a qualified chartered accountant before making financial or filing decisions.',
    icon: AlertTriangle,
    variant: 'warning' as const,
  },
  legal: {
    title: 'Not legal advice',
    body: 'This document is a template for reference only and is not legally verified. Stamp duty, registration and enforceability vary by state and circumstances — consult a qualified lawyer before executing.',
    icon: AlertTriangle,
    variant: 'warning' as const,
  },
  privacy: {
    title: 'Stays on your device',
    body: 'Everything you enter is processed locally in your browser. Your files and data are never uploaded to a server.',
    icon: ShieldCheck,
    variant: 'info' as const,
  },
  general: {
    title: 'Note',
    body: 'Results are estimates for guidance and may not reflect your exact situation.',
    icon: Info,
    variant: 'info' as const,
  },
};

export function DisclaimerBanner({
  variant = 'general',
  title,
  children,
  className,
}: DisclaimerBannerProps) {
  const cfg = DEFAULTS[variant];
  const Icon = cfg.icon;
  return (
    <Alert variant={cfg.variant} className={cn('mt-6', className)}>
      <Icon />
      <AlertTitle>{title ?? cfg.title}</AlertTitle>
      <AlertDescription>{children ?? cfg.body}</AlertDescription>
    </Alert>
  );
}
