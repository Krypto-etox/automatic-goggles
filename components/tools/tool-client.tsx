'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

/**
 * Maps a tool's `componentKey` (from tools-registry.ts) to its actual
 * client implementation. Heavier tools use next/dynamic with a loading
 * state so their libraries stay out of the initial bundle.
 *
 * Tools marked "coming-soon" have no entry here; the layout handles that.
 */
function ToolFallback() {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border bg-surface/40 text-muted">
      <Loader2 className="mr-2 size-5 animate-spin" />
      Loading tool…
    </div>
  );
}

function tool<T>(loader: () => Promise<{ default: React.ComponentType<T> }>) {
  return dynamic(loader, { loading: ToolFallback, ssr: false });
}

const REGISTRY: Record<string, React.ComponentType> = {
  'word-counter': tool(() =>
    import('./word-counter').then((m) => ({ default: m.WordCounter })),
  ),
  'case-converter': tool(() =>
    import('./case-converter').then((m) => ({ default: m.CaseConverter })),
  ),
  'duplicate-line-remover': tool(() =>
    import('./duplicate-line-remover').then((m) => ({
      default: m.DuplicateLineRemover,
    })),
  ),
  'text-diff': tool(() =>
    import('./text-diff').then((m) => ({ default: m.TextDiffChecker })),
  ),
  'lorem-ipsum': tool(() =>
    import('./lorem-ipsum').then((m) => ({ default: m.LoremIpsumGenerator })),
  ),
  'age-calculator': tool(() =>
    import('./age-calculator').then((m) => ({ default: m.AgeCalculator })),
  ),
  'pregnancy-due-date': tool(() =>
    import('./pregnancy-due-date').then((m) => ({
      default: m.PregnancyDueDateCalculator,
    })),
  ),
  'retirement-countdown': tool(() =>
    import('./retirement-countdown').then((m) => ({
      default: m.RetirementCountdown,
    })),
  ),
  'upi-qr': tool(() =>
    import('./upi-qr').then((m) => ({ default: m.UpiQrGenerator })),
  ),
  'wifi-qr': tool(() =>
    import('./wifi-qr').then((m) => ({ default: m.WifiQrGenerator })),
  ),
  'vcard-qr': tool(() =>
    import('./vcard-qr').then((m) => ({ default: m.VcardQrGenerator })),
  ),
  'password-generator': tool(() =>
    import('./password-generator').then((m) => ({
      default: m.PasswordGenerator,
    })),
  ),
  'tax-regime': tool(() =>
    import('./tax-regime').then((m) => ({ default: m.TaxRegimeCalculator })),
  ),
  hra: tool(() => import('./hra').then((m) => ({ default: m.HraCalculator }))),
  gratuity: tool(() =>
    import('./gratuity').then((m) => ({ default: m.GratuityCalculator })),
  ),
  'in-hand-salary': tool(() =>
    import('./in-hand-salary').then((m) => ({
      default: m.InHandSalaryCalculator,
    })),
  ),
  emi: tool(() => import('./emi').then((m) => ({ default: m.EmiCalculator }))),
  sip: tool(() => import('./sip').then((m) => ({ default: m.SipCalculator }))),
  'csv-json-xml': tool(() =>
    import('./csv-json-xml').then((m) => ({ default: m.CsvJsonXmlConverter })),
  ),
  'epf-ppf-nps': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="epf-ppf-nps" />,
    })),
  ),
  gst: tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="gst" />,
    })),
  ),
  'capital-gains': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="capital-gains" />,
    })),
  ),
  'image-format-converter': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="image-format-converter" />,
    })),
  ),
  'pdf-word-converter': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="pdf-word-converter" />,
    })),
  ),
  'image-compressor': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="image-compressor" />,
    })),
  ),
  'background-remover': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="background-remover" />,
    })),
  ),
  'audio-converter': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="audio-converter" />,
    })),
  ),
  'video-compressor': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="video-compressor" />,
    })),
  ),
  'readability-checker': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="readability-checker" />,
    })),
  ),
  'timezone-converter': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="timezone-converter" />,
    })),
  ),
  'warranty-tracker': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="warranty-tracker" />,
    })),
  ),
  'random-name': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="random-name" />,
    })),
  ),
  'rent-agreement': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="rent-agreement" />,
    })),
  ),
  'salary-slip': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="salary-slip" />,
    })),
  ),
  'resignation-letter': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="resignation-letter" />,
    })),
  ),
  'robots-sitemap-validator': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="robots-sitemap-validator" />,
    })),
  ),
  'meta-tag-preview': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="meta-tag-preview" />,
    })),
  ),
  'broken-link-checker': tool(() =>
    import('./extended-tools').then((m) => ({
      default: () => <m.ExtendedTool kind="broken-link-checker" />,
    })),
  ),
};

export function ToolClient({ componentKey }: { componentKey: string }) {
  const Component = REGISTRY[componentKey];
  if (!Component) {
    return (
      <div className="rounded-xl border border-dashed bg-surface/40 p-10 text-center text-muted">
        This tool is in development.
      </div>
    );
  }
  return <Component />;
}
