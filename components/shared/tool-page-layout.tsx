import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import type { ToolDef } from '@/lib/tools/types';
import { CATEGORY_BY_ID } from '@/lib/tools/categories';
import { getRelatedTools } from '@/lib/tools/registry';
import { accentFor } from '@/lib/tools/accent';
import { ToolCard } from './tool-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AdSlot } from './ad-slot';
import { DisclaimerBanner } from './disclaimer-banner';
import { PrivacyBadge } from './privacy-badge';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ToolPageLayoutProps {
  tool: ToolDef;
  children?: React.ReactNode;
  /** Override disclaimer variant, e.g. "legal" for document generators. */
  disclaimerVariant?: 'financial' | 'legal' | 'privacy' | 'general';
}

export function ToolPageLayout({
  tool,
  children,
  disclaimerVariant,
}: ToolPageLayoutProps) {
  const category = CATEGORY_BY_ID[tool.category];
  const accent = accentFor(tool.category);
  const Icon = category!.icon;
  const related = getRelatedTools(tool.slug);
  const isLive = tool.status === 'live';

  return (
    <div className="container max-w-6xl py-8 md:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-sm text-muted"
      >
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/tools/${category!.slug}`} className="hover:text-foreground">
          {category!.name}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      {/* Header */}
      <header className="mb-8 max-w-3xl">
        <div className="mb-3 flex items-center gap-3">
          <span
            className={cn(
              'flex size-11 items-center justify-center rounded-lg',
              accent.bgSoft,
            )}
          >
            <Icon className={cn('size-5', accent.text)} />
          </span>
          <Badge variant="outline" className="text-muted">
            {category!.name}
          </Badge>
          {!isLive ? (
            <Badge variant="secondary" className="gap-1">
              <Clock className="size-3" /> Coming soon
            </Badge>
          ) : null}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-lg text-muted">{tool.description}</p>
        {tool.privacyNote ? (
          <div className="mt-4">
            <PrivacyBadge note={tool.privacyNote} />
          </div>
        ) : null}
      </header>

      {/* Tool interface */}
      {isLive ? (
        children
      ) : (
        <div className="rounded-xl border border-dashed bg-surface/40 p-10 text-center">
          <p className="text-muted">
            This tool is in development. Check back soon — or try one of the
            live tools below.
          </p>
        </div>
      )}

      <AdSlot className="my-10" />

      {/* How it works */}
      <section className="prose prose-slate max-w-none dark:prose-invert">
        <h2 className="text-2xl font-semibold">
          What is {tool.name.toLowerCase()} and how does it work?
        </h2>
        {tool.explanation.map((para, i) => (
          <p key={i} className="text-muted leading-relaxed">
            {para}
          </p>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {tool.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <DisclaimerBanner
        variant={
          disclaimerVariant ??
          (tool.category === 'finance'
            ? 'financial'
            : tool.category === 'documents'
              ? 'legal'
              : tool.privacyNote
                ? 'privacy'
                : 'general')
        }
      />

      {/* Related */}
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Related tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
