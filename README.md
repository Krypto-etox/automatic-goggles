# ToolNest — Every tool. One nest.

A fast, privacy-first collection of **38 free online utilities** — Indian
tax & finance calculators, file converters, text tools, date/time
calculators, QR/generators, document generators and SEO tools. Built with
Next.js 14 (App Router), TypeScript, Tailwind CSS and shadcn/ui.

> Most tools run entirely in your browser. No accounts, no paywalls, no
> file uploads for client-side tools.

## Tech stack

- **Framework:** Next.js 14 App Router (React 18, TypeScript strict mode)
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Charts:** Recharts
- **Forms/validation:** React Hook Form + Zod
- **Dates:** date-fns / Luxon
- **QR:** `qrcode`
- **Docs/exports:** jsPDF, docxtemplater (added per-tool)
- **Testing:** Vitest + Testing Library
- **Deploy:** Vercel

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm format` | Prettier write |

## Project structure

```
app/                    # App Router routes, layouts, sitemap/robots, OG image
  api/og/               # Dynamic Open Graph image (edge)
  tools/[category]/     # Category hub pages (SSG)
  tools/[category]/[slug]/  # Individual tool pages (SSG)
  (legal)/              # Privacy / Terms / Disclaimer
  blog/                 # Reserved content route group
components/
  ui/                   # shadcn/ui-style primitives
  shared/               # Reusable building blocks (ToolPageLayout, cards…)
  layout/               # Header, footer, search, logo
  tools/                # Per-tool client implementations
hooks/                  # useLocalStorage, useCopyToClipboard
lib/
  calculations/         # Pure, tested business logic (no React)
  config/               # Site config + versioned India tax/finance data
  constants/            # Platform limits, name datasets
  seo/                  # JSON-LD generators
  tools/                # Tool registry, categories, types, accent map
```

## Architecture highlights

- **One source of truth.** Every tool is registered in
  `lib/tools/registry.ts` with its name, description, FAQ, related tools,
  SEO keywords and status. The registry drives navigation, the sitemap,
  related tools, JSON-LD and the dynamic tool route.
- **Logic out of components.** All formulas live in
  `lib/calculations/*.ts` as pure, typed, unit-tested functions.
- **Versioned finance data.** Tax slabs, PF/PPF/NPS rates, professional
  tax tables and capital-gains rules live in `lib/config/india/` so they
  can be updated without touching UI.
- **Privacy first.** File/image/QR/text tools process locally. The only
  server routes exist to bypass CORS for SEO utilities.
- **Bundle discipline.** Heavy tool libraries are loaded via
  `next/dynamic` only on the page that needs them.

## Roadmap status

- **Phase 0 — Foundation:** ✅ scaffold, design system, shared components,
  registry (38 tools), sitemap/robots, SEO/JSON-LD, legal pages, OG image.
- **Phase 1 — P0 MVP tools:** ✅ 19 live tools (finance, text, date, QR,
  converters).
- **Phase 2 — P1:** GST, capital gains, EPF/PPF/NPS, timezone, warranty
  tracker, name generator, readability, document generators, SEO tools.
- **Phase 3 — P2:** HEIC/format converter, background removal, audio,
  video, PDF↔Word (WASM-heavy).

See `docs/` for the full product vision, design system, tool catalog,
coding standards and SEO strategy.

## License

MIT
