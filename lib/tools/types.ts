import type { LucideIcon } from 'lucide-react';

export type CategoryId =
  | 'finance'
  | 'converters'
  | 'text'
  | 'date'
  | 'qr'
  | 'documents'
  | 'seo';

export type Priority = 'P0' | 'P1' | 'P2';

export type ToolStatus = 'live' | 'coming-soon';

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolDef {
  /** URL slug, e.g. "emi-calculator" */
  slug: string;
  /** Display name, matches common search phrasing. */
  name: string;
  /** One-line description (also used for SEO/cards). */
  description: string;
  /** Long-form "What it is / how it works" content, 150-300 words. */
  explanation: string[];
  category: CategoryId;
  priority: Priority;
  /** Keywords for search + SEO. */
  keywords: string[];
  /** 4-6 Q&As, reused for the UI accordion and FAQPage JSON-LD. */
  faqs: FAQ[];
  /** Slugs of related tools (must exist in registry). */
  relatedSlugs: string[];
  /** Whether the tool performs local/private processing (shows privacy note). */
  privacyNote?: string;
  /** Short value prop used in the page <title>, e.g. "Calculate Home Loan EMI Instantly". */
  titleValueProp: string;
  status: ToolStatus;
  /** Component key that maps to the actual implementation in TOOL_COMPONENTS. */
  componentKey: string;
}

export interface CategoryDef {
  id: CategoryId;
  name: string;
  slug: string;
  /** Short SEO description for the hub page. */
  description: string;
  icon: LucideIcon;
  /** Tailwind text/bg accent token name (see tailwind.config). */
  accent: string;
}
