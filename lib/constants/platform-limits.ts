export const PLATFORM_LIMITS: {
  name: string;
  limit: number;
  type: 'chars' | 'words';
  note?: string;
}[] = [
  { name: 'Twitter / X post', limit: 280, type: 'chars' },
  { name: 'Meta description', limit: 160, type: 'chars' },
  { name: 'SEO title tag', limit: 60, type: 'chars' },
  { name: 'YouTube title', limit: 100, type: 'chars' },
  { name: 'Instagram caption', limit: 2200, type: 'chars' },
  { name: 'SMS segment', limit: 160, type: 'chars' },
];
