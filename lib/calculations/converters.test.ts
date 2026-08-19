import { describe, it, expect } from 'vitest';
import {
  convertData,
  parseRobotsTxt,
  validateSitemapXml,
} from './converters';

describe('CSV/JSON/XML conversions', () => {
  it('converts CSV to JSON', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    const r = convertData(csv, 'auto', 'json');
    expect(r.detected).toBe('csv');
    const parsed = JSON.parse(r.output);
    expect(parsed[0]).toEqual({ name: 'Alice', age: '30' });
  });

  it('converts JSON to CSV', () => {
    const json = JSON.stringify([{ a: 1, b: 2 }]);
    const r = convertData(json, 'json', 'csv');
    expect(r.output).toContain('a,b');
    expect(r.output).toContain('1,2');
  });

  it('converts JSON to XML', () => {
    const r = convertData(JSON.stringify({ name: 'ToolNest' }), 'json', 'xml');
    expect(r.output).toContain('<name>ToolNest</name>');
  });
});

describe('robots.txt parser', () => {
  it('parses user-agents and disallow rules', () => {
    const result = parseRobotsTxt(
      'User-agent: *\nDisallow: /api/\nSitemap: https://example.com/sitemap.xml',
    );
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]!.userAgent).toBe('*');
    expect(result.groups[0]!.rules[0]).toEqual({
      type: 'disallow',
      path: '/api/',
    });
    expect(result.sitemaps).toContain('https://example.com/sitemap.xml');
  });
});

describe('sitemap validator', () => {
  it('validates a well-formed sitemap', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
</urlset>`;
    const result = validateSitemapXml(xml);
    expect(result.valid).toBe(true);
    expect(result.urlCount).toBe(1);
  });
});
