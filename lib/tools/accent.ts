import type { CategoryId } from './types';

/**
 * Static class strings so Tailwind's JIT can see them and include them
 * in the build (dynamic `text-${color}` strings are not detected).
 */
export const ACCENT_CLASSES: Record<
  CategoryId,
  { text: string; bg: string; bgSoft: string; border: string; ring: string }
> = {
  finance: {
    text: 'text-finance',
    bg: 'bg-finance',
    bgSoft: 'bg-finance/10',
    border: 'border-finance',
    ring: 'ring-finance',
  },
  converters: {
    text: 'text-converters',
    bg: 'bg-converters',
    bgSoft: 'bg-converters/10',
    border: 'border-converters',
    ring: 'ring-converters',
  },
  text: {
    text: 'text-text',
    bg: 'bg-text',
    bgSoft: 'bg-text/10',
    border: 'border-text',
    ring: 'ring-text',
  },
  date: {
    text: 'text-date',
    bg: 'bg-date',
    bgSoft: 'bg-date/10',
    border: 'border-date',
    ring: 'ring-date',
  },
  qr: {
    text: 'text-qr',
    bg: 'bg-qr',
    bgSoft: 'bg-qr/10',
    border: 'border-qr',
    ring: 'ring-qr',
  },
  documents: {
    text: 'text-documents',
    bg: 'bg-documents',
    bgSoft: 'bg-documents/10',
    border: 'border-documents',
    ring: 'ring-documents',
  },
  seo: {
    text: 'text-seo',
    bg: 'bg-seo',
    bgSoft: 'bg-seo/10',
    border: 'border-seo',
    ring: 'ring-seo',
  },
};

export function accentFor(category: CategoryId) {
  return ACCENT_CLASSES[category];
}
