# Master Build Instructions for the Coding Agent

You are building a production-grade, multi-tool utility website in Next.js
(App Router + TypeScript), to be deployed on Vercel. Read and internalize
these documents, in this order, before writing any code:

1. `00-PRODUCT-VISION.md` — understand WHY and for WHOM.
2. `01-BRAND-DESIGN-SYSTEM.md` — visual/UX rules, non-negotiable consistency.
3. `02-ARCHITECTURE.md` — folder structure, stack, rendering strategy.
4. `03-TOOL-CATALOG.md` — exact specs/formulas for all 35 tools.
5. `04-CODING-STANDARDS.md` — how code must be written/organized/tested.
6. `05-SEO-CONTENT-STRATEGY.md` — SEO requirements per page (mandatory,
   not optional polish).
7. `06-DEPLOYMENT-DEVOPS.md` — deployment/runtime constraints.
8. `07-ROADMAP-PHASES.md` — the exact build order.

## Operating Rules
1. **Follow the roadmap phase order strictly.** Do not jump to Phase 3
   (ffmpeg/background removal) before Phase 0 foundation and Phase 1 MVP
   tools are complete and passing the checklist.
2. **Never hardcode a tool's UI from scratch.** Always compose from
   `ToolPageLayout` and shared components defined in the Architecture/Design
   docs. If a needed shared component doesn't exist yet, build it as a
   reusable component in `/components/shared`, not inline in the tool page.
3. **Never put calculation logic inside a React component.** All math/logic
   goes in `/lib/calculations/*.ts` as pure, typed, unit-tested functions.
4. **Every new tool must be registered in `tools-registry.ts`** the moment
   it's built — this drives navigation, sitemap, and related-tools
   automatically. A tool that isn't in the registry doesn't "exist" from
   the site's perspective, even if the page file exists.
5. **Every tool page must satisfy the full checklist** in
   `04-CODING-STANDARDS.md` before being considered complete — SEO
   metadata, JSON-LD, disclaimers, responsive/dark-mode check, tests for
   its calculation logic.
6. **Verify formulas against a real-world reference** before shipping any
   finance/tax calculator (e.g., cross-check EMI output against a known
   bank's published EMI calculator for the same inputs; cross-check tax
   calc against the official Income Tax Department calculator). Note the
   verification source in a code comment near the constants file.
7. **Keep bundle size discipline** — any tool using ffmpeg.wasm, ONNX
   models, or other heavy libraries MUST use `next/dynamic` with
   `ssr: false` and a loading state, scoped to only that tool's page.
8. **Ask for clarification, don't guess silently, on**: ambiguous state-wise
   professional tax tables, current-year tax slab numbers if uncertain, or
   any legal document template accuracy — flag with a `// TODO: VERIFY`
   comment and a visible UI disclaimer rather than presenting unverified
   numbers as fact.
9. **After each tool is completed**, run the full CI check locally
   (lint, typecheck, test, build) before moving to the next tool.
10. **Report progress** after each phase by listing: tools completed,
    tools remaining in current phase, any deviations made from these docs
    and why.

## First Actions (Phase 0 kickoff)
1. Scaffold the Next.js project per Architecture doc folder structure.
2. Implement the design system tokens and root layout.
3. Populate the full `tools-registry.ts` with all 35 tools (status:
   "coming-soon") so navigation/homepage/sitemap are structurally complete.
4. Build and test all shared components listed in Phase 0 of the Roadmap.
5. Confirm homepage renders all 35 tools (as "coming soon" cards) correctly
   before building a single tool's actual functionality.
6. Only then proceed to Phase 1, tool by tool, in the exact order listed in
   `07-ROADMAP-PHASES.md`.
