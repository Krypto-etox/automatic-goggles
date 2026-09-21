/**
 * Central site configuration. Rename brand in one place.
 */
const productionSiteUrl = 'https://toolnest-tools.vercel.app';

function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = configuredSiteUrl || productionSiteUrl;

  try {
    const parsedUrl = new URL(candidate);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('Site URL must use HTTP or HTTPS');
    }

    return parsedUrl.toString().replace(/\/$/, '');
  } catch {
    return productionSiteUrl;
  }
}

export const siteConfig = {
  name: 'ToolNest',
  tagline: 'Every tool. One nest.',
  description:
    'A fast, privacy-first collection of free online calculators, converters, and text utilities — including Indian tax & finance tools, file converters, QR generators, and SEO tools.',
  url: getSiteUrl(),
  ogImage: '/og.png',
  author: 'ToolNest',
  keywords: [
    'online calculator',
    'income tax calculator India',
    'EMI calculator',
    'file converter',
    'text tools',
    'QR code generator',
    'free tools',
  ],
  links: {
    github: 'https://github.com/Krypto-etox/automatic-goggles',
  },
} as const;

export type SiteConfig = typeof siteConfig;
