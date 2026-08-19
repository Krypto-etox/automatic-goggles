
---

# FILE: `docs/05-SEO-CONTENT-STRATEGY.md`

```markdown
# SEO & Content Strategy

SEO is a core architectural pillar, not an afterthought — utility sites
live/die on organic search.

## Per-Tool Page SEO Requirements (non-negotiable, every tool)
1. **Unique `<title>`** — pattern: `{Tool Name} – {Value Prop} | {Brand}`
   e.g., "EMI Calculator – Calculate Home Loan EMI Instantly | ToolNest"
2. **Meta description** — 150-160 chars, includes primary keyword + CTA.
3. **Canonical URL** set explicitly.
4. **Open Graph + Twitter Card** — dynamic OG image per tool via
   `app/api/og/route.tsx` (`@vercel/og`), showing tool icon + name + category
   color — generated at build/request time, not manually designed per tool.
5. **JSON-LD structured data**:
   - `SoftwareApplication` schema for every calculator/converter (helps rich
     results eligibility).
   - `FAQPage` schema generated from the tool's FAQ accordion content (stored
     alongside each tool's data — reuse the same FAQ array for UI + schema).
   - `BreadcrumbList` schema matching the visual breadcrumb.
6. **H1** matches primary keyword intent exactly (one H1 per page, matches
   or closely mirrors `<title>`).
7. **Content beyond the tool itself** — every tool page includes:
   - 150-300 word "What is [tool] and how does it work" section (real
     content, not filler — explain the formula/logic in plain English).
   - FAQ section (4-6 Q&As) targeting "People Also Ask" style queries.
   - "Related tools" internal links (3-6, pulled from `relatedSlugs` in
     registry) — critical for internal link equity distribution across 35
     pages.

## URL Structure
`/tools/{category}/{tool-slug}` — human-readable, keyword-rich, stable.
Never use query params or IDs for primary tool routing.

## Sitemap & Robots
- `app/sitemap.ts` auto-generates from `tools-registry.ts` + static pages —
  never manually maintained.
- `app/robots.ts` allows all, points to sitemap, disallows `/api/*`.

## Category Hub Pages
Each category (`/tools/finance`, `/tools/converters`, etc.) is itself an SEO
page — targets broader keywords ("income tax calculators India", "free file
converters online"), lists all tools in that category with descriptions,
and is a key internal linking hub.

## Content/Blog Layer (Phase 2, post-launch)
Add `/blog` or `/guides` for long-tail, non-tool-specific content that links
INTO tools (e.g., "How to Save Tax in India: Complete Guide" → links to Tax
Regime Calculator, HRA Calculator). This compounds SEO value of the tools
significantly. Not required for MVP but architecture (folder structure,
MDX support) should not block adding it later — reserve `/app/blog` route
group from day one even if empty.

## Technical SEO Baseline
- Core Web Vitals: enforce via performance budget in Architecture doc.
- Mobile-first indexing: test every tool at 375px before marking done.
- No render-blocking heavy JS on initial load (dynamic imports for
  ffmpeg.wasm, background-removal model, etc. — see Architecture doc).
- `next/image` for all raster images with proper `alt` text.
- Structured internal linking: Homepage → Category → Tool (max 3 clicks to
  any tool from homepage).

## Keyword Research Notes (guide agent's copywriting for descriptions/FAQ)
- Finance tools: target high-intent Indian queries ("HRA exemption
  calculator", "EMI calculator India", "old vs new tax regime calculator
  2024-25") — include the assessment year in content since these are
  seasonally re-searched every year (update content copy annually, not just
  the numbers).
- Converter tools: target format-specific global queries ("heic to jpg
  converter online free", "compress image without losing quality").
- Keep tool names matching exact common search phrasing — don't get clever
  with naming (e.g., call it "Word Counter" not "Text Metrics Analyzer").
