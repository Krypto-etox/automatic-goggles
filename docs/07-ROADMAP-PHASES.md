# Build Roadmap

## Phase 0 — Foundation (build once, before any tool)
1. Next.js + TS + Tailwind + shadcn/ui project scaffold.
2. Design system tokens wired into `tailwind.config.ts` + `globals.css`.
3. Root layout: header (logo, nav, search, theme toggle), footer
   (categories, legal links, disclaimer).
4. `tools-registry.ts` populated with ALL 35 tools (status: "coming-soon"
   initially) — this makes the homepage/nav "complete" on day one even
   before every tool is built, which is important for perceived polish.
5. Homepage: hero + search + category grid + popular tools.
6. Shared components: `ToolPageLayout`, `ToolCard`, `ResultSummaryCard`,
   `DisclaimerBanner`, `AdSlot` placeholder, `CurrencyInput`, `FileDropzone`.
7. `sitemap.ts`, `robots.ts`, `app/api/og/route.tsx` set up and tested with
   one dummy tool.
8. Vitest + ESLint + Prettier + Husky configured.

## Phase 1 — P0 Tools (MVP launch set, ~16 tools)
Build in this order (easiest formulas → builds confidence + reusable
patterns fastest):
1. Word/Character Counter
2. Case Converter
3. Duplicate Line Remover
4. Lorem Ipsum Generator
5. Password Generator
6. Age Calculator
7. Pregnancy Due Date Calculator
8. Retirement Countdown Calculator
9. UPI QR Generator
10. WiFi QR Generator
11. vCard QR Generator
12. HRA Exemption Calculator
13. Gratuity Calculator
14. Old vs New Tax Regime Calculator
15. In-hand Salary/CTC Calculator
16. EMI + Prepayment Calculator
17. SIP/Lumpsum Calculator
18. CSV↔JSON↔XML Converter
19. Image Compressor
20. Text Diff Checker

→ **Launch after this phase.** Submit sitemap to Google Search Console,
set up analytics goals per tool.

## Phase 2 — P1 Tools (~13 tools, fast-follow within weeks of launch)
GST Calculator+Invoice, Capital Gains Calculator, EPF/PPF/NPS Calculator,
Timezone Converter, Warranty Tracker, Random Name Generator, Readability
Checker, Rent Agreement Generator, Salary Slip/Offer Letter Generator,
Resignation Letter Generator, Robots.txt/Sitemap Validator, Meta Tag
Preview Tool, Broken Link Checker.

## Phase 3 — P2 Tools (~6 tools, heavier engineering)
HEIC/format converter, Background Remover, Audio Converter, Video
Compressor/GIF Maker, PDF↔Word/Excel Converter — tackle these once core
traffic/SEO is established, since they require more careful WASM/perf work.

## Phase 4 — Growth Layer (post all 35 tools)
- Blog/guides content section (SEO compounding).
- AdSense integration into pre-built `AdSlot` components.
- Optional lightweight auth (e.g., Clerk/NextAuth) + DB (Supabase) IF a
  "save your calculations" / "Pro" feature is validated as wanted —
  architecture in this doc set intentionally doesn't block this.

## Definition of "Done" for the whole project (v1)
- All 35 tools live, each passing the Coding Standards checklist.
- Sitemap includes all tool + category pages, submitted to GSC.
- Lighthouse score >90 on Performance/SEO/Accessibility/Best Practices for
  at least the homepage and 3 sample tool pages (finance, converter, text).
- Dark mode + mobile verified across all tools.
- Legal pages present: Privacy Policy, Terms, Disclaimer (especially
  important given financial/legal tool content).
