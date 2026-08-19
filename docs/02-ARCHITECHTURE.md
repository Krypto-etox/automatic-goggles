# Architecture

## Stack Decision
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG per tool page = SEO; Vercel-native |
| Language | TypeScript (strict mode) | catches formula/type bugs in finance tools |
| Styling | Tailwind CSS + shadcn/ui | fast, consistent, matches design system |
| State | React local state + `nuqs` (URL state) where shareable | most tools are single-session, no global store needed |
| Global state (rare) | Zustand | only for cross-component state like theme/unit prefs if context isn't enough |
| Forms | React Hook Form + Zod | validation for calculator inputs |
| Persistence (optional per-tool) | `localStorage` via small wrapper hook `useLocalStorage` | warranty tracker, saved history, no DB needed for v1 |
| Icons | lucide-react | see design doc |
| Dates | `date-fns` (+ `date-fns-tz`) | lightweight vs moment.js |
| PDF generation | `jsPDF` + `jspdf-autotable` | invoices, salary slips |
| PDF parsing | `pdf-lib` (edit/merge), `pdfjs-dist` (extract) | PDF↔Word support |
| DOCX generation | `docxtemplater` + `pizzip` | rent agreement, offer letters |
| DOCX/PDF text extraction | `mammoth` (docx→html) | Word conversions |
| CSV/XML | `papaparse`, `fast-xml-parser` | converters |
| Image compression | `browser-image-compression` | client-side |
| Image format conversion | `@squoosh/lib` or Canvas API + `heic2any` for HEIC | client-side |
| Background removal | `@imgly/background-removal` (client-side ONNX model, not an LLM) | runs fully in browser |
| Audio/video | `@ffmpeg/ffmpeg` (ffmpeg.wasm) | lazy-loaded only on those pages |
| QR codes | `qrcode` (generation), `jsQR` if scanning ever needed | |
| Password strength | `zxcvbn` (or lighter `zxcvbn-ts`) | |
| Diff checker | `diff` | |
| Deployment | Vercel | as specified |
| Analytics | Vercel Analytics + Plausible/GA4 | traffic-per-tool tracking |

## Rendering Strategy
- **Marketing/home/category pages**: Static Generation (SSG) — rebuilt on
  deploy, near-zero TTFB.
- **Tool pages**: SSG for the shell (metadata, FAQ, description = great for
  SEO/crawlers), tool interactivity is a client component (`"use client"`)
  hydrated on load.
- **API routes**: Only where client-side is impossible:
  - Broken Link Checker → needs server fetch to bypass CORS (`app/api/check-link/route.ts`, Edge runtime).
  - Meta Tag Preview → can be mostly client (fetch via server proxy for
    cross-origin HTML fetch) — same pattern as link checker.
  - Optional: server-side fallback for HEIC/PDF conversions if a client lib
    proves unreliable for large files (use Node.js serverless function with
    `sharp` — NOT Edge runtime, since `sharp` needs Node APIs). Keep this as
    an **opt-in fallback**, default path stays client-side.
- Avoid Incremental Static Regeneration unless a blog/content section is
  added later (see SEO doc) — most tool logic doesn't need data revalidation.

## Data & Config Layer (critical for finance tools)
All volatile facts (tax slabs, PF rates, GST rates, capital gains rules,
professional tax tables, timezone DB) live in **versioned, isolated config
files** — never inline in components:
