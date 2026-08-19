# Product Vision

## What This Is
A single, fast, ad-light utility website hosting 35 independent micro-tools across
Finance (India), File Conversion, Text Processing, Date/Time, QR/Generators,
Documents, and SEO/Webmaster utilities.

Positioning: "The only calculator/converter site you need to bookmark" —
competing with fragmented single-purpose sites (like a mini TinyWow / ClearTax
calculators / iLovePDF hybrid), but faster, cleaner, privacy-first (client-side
processing wherever possible), and with zero login friction.

## Target Users
1. Indian salaried professionals / freelancers (tax & finance tools) — highest
   monetization + SEO value (high CPC keywords).
2. General web users needing quick file conversions (global audience).
3. Writers/students/marketers (text utilities).
4. Developers/webmasters (SEO tools) — lower volume, high brand credibility.

## Core Product Principles
1. **Zero friction** — no signup, no paywall for core function. Open tool → get
   result in <10 seconds.
2. **Privacy-first** — file/image/audio/video tools process in-browser
   (WASM/Canvas/JS) wherever technically feasible. State this explicitly on
   every file tool ("Your files never leave your device").
3. **One tool = one URL** — every tool has its own indexable route, own
   metadata, own FAQ — SEO is a first-class citizen, not an afterthought.
4. **Consistent shell, unique tool** — every tool page shares the same layout,
   header, footer, breadcrumb, "related tools", and disclaimer patterns, so the
   product feels like one team built it, not 35 disconnected scripts.
5. **Accuracy & trust** — all financial formulas cite the source rule
   (e.g., "as per Income Tax Slabs FY 2024-25") and carry a disclaimer.
   Financial data is centralized in versioned config files, not hardcoded
   inline, so it can be updated annually without touching UI code.
6. **Fast by default** — heavy libraries (ffmpeg.wasm, onnxruntime-web) are
   lazy-loaded only on the pages that need them. Homepage stays lightweight.

## Non-Goals (v1)
- No user accounts / login (except optional localStorage-based "saved
  history" for a few tools like warranty tracker).
- No LLM/AI API dependency anywhere.
- No payment/subscription system in Phase 1 (architecture should not block
  adding it later).

## Monetization (future-ready, not blocking v1 build)
- Google AdSense-ready ad slots (defined in layout, empty/hidden until
  approved).
- Optional "Pro" tier later (batch processing, no ads, saved history) — DB
  schema should not need a rewrite to support this later (see Architecture doc).

## Success Metrics
- Organic search traffic per tool page (primary channel).
- Tool completion rate (did user get output, not bounce).
- Core Web Vitals (LCP < 2.5s, CLS < 0.1) on every tool page — since Google
  ranks utility tools partly on UX.
