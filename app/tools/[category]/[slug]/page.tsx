import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPageLayout } from '@/components/shared/tool-page-layout';
import { TOOLS_REGISTRY, getToolBySlug } from '@/lib/tools/registry';
import { CATEGORIES } from '@/lib/tools/categories';
import { siteConfig } from '@/lib/config/site';
import { JsonLd } from '@/components/shared/json-ld';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  softwareApplicationJsonLd,
} from '@/lib/seo/json-ld';
import { ToolClient } from '@/components/tools/tool-client';

interface PageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return TOOLS_REGISTRY.map((t) => {
    const cat = CATEGORIES.find((c) => c.id === t.category)!;
    return { category: cat.slug, slug: t.slug };
  });
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  const category = CATEGORIES.find((c) => c.id === tool.category)!;
  const url = `/tools/${category.slug}/${tool.slug}`;
  const title = `${tool.name} – ${tool.titleValueProp}`;
  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: tool.description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();
  const category = CATEGORIES.find((c) => c.id === tool.category)!;

  return (
    <>
      <ToolPageLayout tool={tool}>
        <ToolClient componentKey={tool.componentKey} />
      </ToolPageLayout>
      <JsonLd data={softwareApplicationJsonLd(tool)} />
      <JsonLd data={faqPageJsonLd(tool)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: category.name, url: `/tools/${category.slug}` },
          { name: tool.name, url: `/tools/${category.slug}/${tool.slug}` },
        ])}
      />
      <meta name="application-name" content={siteConfig.name} />
    </>
  );
}
