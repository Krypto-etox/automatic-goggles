# Deployment & DevOps

## Hosting
Vercel (as specified). Connect GitHub repo → auto-deploy on push to `main`
(production) and preview deployments on PRs/branches.

## Runtime Considerations
- Default all pages/components to Edge-compatible where possible for speed.
- **Force Node.js runtime** (not Edge) for API routes using: `sharp`,
  `cheerio`, `docxtemplater`/`pizzip`, or any native/heavier Node
  dependency — set `export const runtime = 'nodejs'` in those route files.
- Keep Edge runtime for simple fetch-based routes (e.g., basic proxy calls)
  where no Node-only dependency is used.

## Environment Variables
- `.env.example` committed with placeholders for anything added later
  (e.g., analytics IDs, future API keys). No secrets required for v1
  feature set.
- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap, OG image
  generation — set per environment (preview vs. production) in Vercel
  dashboard.

## Vercel Configuration Notes
- Function timeout: default (10s Hobby / 60s Pro) is fine for link checker
  (concurrency-limited) and PDF/doc generation. If broken-link-checker needs
  to check many links on a large page, cap max links checked (e.g., 50) to
  stay within timeout — surface "showing first 50 links" in UI.
- File size limits: enforce client-side max upload sizes (e.g., 25-50MB for
  images/audio, warn before processing) since heavy client-side WASM
  processing on huge files can crash mobile browsers — this isn't a Vercel
  limit but a UX/stability one.
- `vercel.json` only needed if custom headers/redirects required (e.g.,
  cache-control for static assets, security headers like
  `X-Frame-Options`, `Content-Security-Policy` baseline).

## CI Checks (GitHub Actions, runs on every PR)
1. `pnpm lint`
2. `pnpm typecheck` (`tsc --noEmit`)
3. `pnpm test` (Vitest unit tests for `/lib/calculations`)
4. `pnpm build` (catches build-time errors before merge)

## Monitoring & Analytics
- Vercel Analytics (Web Vitals, per-route) — enabled by default on Vercel
  projects, zero extra setup.
- Plausible or GA4 for traffic/tool-usage tracking (privacy-friendly
  Plausible preferred, aligns with "privacy-first" brand principle).
- Optional: Sentry for error tracking once traffic scales — not required
  for MVP, but wrap key try/catch blocks (file processing, API routes)
  cleanly now so Sentry can be dropped in later without refactoring.

## Backup/Rollback
- Vercel's instant rollback to previous deployment covers this — no extra
  infra needed given no database in v1.

## Domain & SSL
- Custom domain added via Vercel dashboard, automatic SSL — standard, no
  special config needed.
