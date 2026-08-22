/**
 * Central site configuration. Rename brand in one place.
 */
export const siteConfig = {
  name: 'ToolNest',
  tagline: 'Every tool. One nest.',
  description:
    'A fast, privacy-first collection of free online calculators, converters, and text utilities — including Indian tax & finance tools, file converters, QR generators, and SEO tools.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
