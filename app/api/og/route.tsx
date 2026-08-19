import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getToolBySlug } from '@/lib/tools/registry';
import { CATEGORY_BY_ID } from '@/lib/tools/categories';

export const runtime = 'edge';

const ACCENT_HEX: Record<string, string> = {
  finance: '#4F46E5',
  converters: '#0D9488',
  text: '#D97706',
  date: '#E11D48',
  qr: '#7C3AED',
  documents: '#475569',
  seo: '#0891B2',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('tool') ?? '';
  const tool = getToolBySlug(slug);
  const category = tool ? CATEGORY_BY_ID[tool.category] : undefined;
  const accent =
    (tool && ACCENT_HEX[tool.category]) ?? '#4F46E5';
  const title = tool?.name ?? 'ToolNest';
  const subtitle =
    tool?.description ??
    'Every tool. One nest. Free calculators, converters & utilities.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0B',
          color: '#F4F4F5',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            ◫
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>ToolNest</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {category ? (
            <div
              style={{
                display: 'flex',
                width: 'fit-content',
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: `${accent}22`,
                color: accent,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {category.name}
            </div>
          ) : null}
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, color: '#9CA3AF', maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#9CA3AF' }}>
          <span>toolnest.app</span>
          <span>Free · Private · No signup</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
