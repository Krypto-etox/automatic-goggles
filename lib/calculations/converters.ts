import Papa from 'papaparse';
import { XMLBuilder, XMLParser, XMLValidator } from 'fast-xml-parser';

export type ConvertFormat = 'csv' | 'json' | 'xml';

export interface ConversionResult {
  output: string;
  detected: ConvertFormat;
  error?: string;
}

function detectFormat(input: string): ConvertFormat {
  const trimmed = input.trim();
  if (trimmed.startsWith('<')) return 'xml';
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return 'json';
  }
  return 'csv';
}

export function convertData(
  input: string,
  from: ConvertFormat | 'auto',
  to: ConvertFormat,
): ConversionResult {
  const detected = from === 'auto' ? detectFormat(input) : from;
  try {
    let data: unknown;
    if (detected === 'json') {
      data = JSON.parse(input);
    } else if (detected === 'csv') {
      const parsed = Papa.parse(input.trim(), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
      });
      data = parsed.data;
    } else {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
      });
      data = parser.parse(input);
    }

    let output = '';
    if (to === 'json') {
      output = JSON.stringify(data, null, 2);
    } else if (to === 'csv') {
      const rows = Array.isArray(data) ? data : [data];
      output = Papa.unparse(rows as object[]);
    } else {
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        format: true,
        suppressEmptyNode: true,
      });
      const wrapped = Array.isArray(data) ? { root: { item: data } } : data;
      output = '<?xml version="1.0" encoding="UTF-8"?>\n' + builder.build(wrapped);
    }
    return { output, detected };
  } catch (err) {
    return {
      output: '',
      detected,
      error: err instanceof Error ? err.message : 'Conversion failed',
    };
  }
}

export function validateXml(input: string): { valid: boolean; error?: string } {
  const result = XMLValidator.validate(input);
  if (result === true) return { valid: true };
  return { valid: false, error: result.err.msg };
}

/** Parse a robots.txt into rules and sitemap entries. */
export function parseRobotsTxt(input: string) {
  const lines = input.split(/\r?\n/).map((l) => l.trim());
  const groups: { userAgent: string; rules: { type: string; path: string }[] }[] =
    [];
  const sitemaps: string[] = [];
  const errors: string[] = [];
  let current: { userAgent: string; rules: { type: string; path: string }[] } | null =
    null;
  for (const raw of lines) {
    const line = raw.split('#')[0]?.trim() ?? '';
    if (!line) continue;
    const match = line.match(/^([\w-]+):\s*(.*)$/i);
    if (!match) {
      errors.push(`Unrecognised directive: ${line}`);
      continue;
    }
    const directive = match[1]!.toLowerCase();
    const value = match[2]!.trim();
    if (directive === 'user-agent') {
      current = { userAgent: value, rules: [] };
      groups.push(current);
    } else if (directive === 'disallow' || directive === 'allow') {
      if (!current) {
        errors.push(`${directive} before any User-agent`);
        continue;
      }
      current.rules.push({ type: directive, path: value });
    } else if (directive === 'sitemap') {
      sitemaps.push(value);
    } else if (directive === 'crawl-delay') {
      if (!current) {
        errors.push('Crawl-delay before any User-agent');
        continue;
      }
      current.rules.push({ type: 'crawl-delay', path: value });
    } else {
      errors.push(`Unknown directive: ${directive}`);
    }
  }
  if (groups.length === 0)
    errors.push('No User-agent directives found — file allows everything.');
  return { groups, sitemaps, errors };
}

/** Validate a sitemap XML string structurally. */
export function validateSitemapXml(input: string) {
  const xmlCheck = validateXml(input);
  if (!xmlCheck.valid) return { valid: false, errors: [xmlCheck.error] };
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(input);
  const errors: string[] = [];
  const urlset = parsed.urlset?.url ?? parsed.sitemapindex?.sitemap;
  if (!urlset) {
    errors.push('Missing <urlset><url> or <sitemapindex><sitemap> structure.');
    return { valid: false, errors, urlCount: 0 };
  }
  const urls = Array.isArray(urlset) ? urlset : [urlset];
  const urlCount = urls.length;
  for (const [i, entry] of urls.entries()) {
    if (!entry.loc) errors.push(`Entry #${i + 1} is missing <loc>.`);
  }
  if (urlCount > 50000)
    errors.push('Sitemap exceeds 50,000 URL limit — split into multiple sitemaps.');
  return { valid: errors.length === 0, errors, urlCount };
}
