import {
  Calculator,
  Files,
  Type,
  CalendarClock,
  QrCode,
  FileText,
  Search,
} from 'lucide-react';
import type { CategoryDef } from './types';

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'finance',
    name: 'Finance & Tax',
    slug: 'finance',
    description:
      'Indian income tax, EMI, SIP, gratuity, HRA and salary calculators — accurate and up to date.',
    icon: Calculator,
    accent: 'finance',
  },
  {
    id: 'converters',
    name: 'Converters & Files',
    slug: 'converters',
    description:
      'Convert and compress images, CSV/JSON/XML and other files privately in your browser.',
    icon: Files,
    accent: 'converters',
  },
  {
    id: 'text',
    name: 'Text & Writing',
    slug: 'text',
    description:
      'Word counters, case converters, diff checkers, lorem ipsum and readability tools.',
    icon: Type,
    accent: 'text',
  },
  {
    id: 'date',
    name: 'Date & Time',
    slug: 'date',
    description:
      'Age, due date, retirement countdown and timezone planning calculators.',
    icon: CalendarClock,
    accent: 'date',
  },
  {
    id: 'qr',
    name: 'QR & Generators',
    slug: 'qr',
    description:
      'Generate UPI, WiFi and vCard QR codes, passwords and random names instantly.',
    icon: QrCode,
    accent: 'qr',
  },
  {
    id: 'documents',
    name: 'Documents & Legal',
    slug: 'documents',
    description:
      'Create rent agreements, salary slips, offer and resignation letters from templates.',
    icon: FileText,
    accent: 'documents',
  },
  {
    id: 'seo',
    name: 'SEO & Webmaster',
    slug: 'seo',
    description:
      'Validate robots.txt and sitemaps, preview meta tags and check broken links.',
    icon: Search,
    accent: 'seo',
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<(typeof CATEGORIES)[number]['id'], CategoryDef>;

export function getCategory(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id || c.slug === id);
}
