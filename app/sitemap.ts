import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';
import { CATEGORIES } from '@/lib/tools/categories';
import { TOOLS_REGISTRY } from '@/lib/tools/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/tools',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/tools/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((t) => {
    const cat = CATEGORIES.find((c) => c.id === t.category)!;
    return {
      url: `${base}/tools/${cat.slug}/${t.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: t.status === 'live' ? 0.9 : 0.3,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
