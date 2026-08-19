# Brand & Design System

## Brand Name (proposal — agent should scaffold with this, easily renameable)
**Kalkulo** or **ToolNest** or **Utilio** — pick one as placeholder:
👉 Default: **"ToolNest"** (tagline: "Every tool. One nest.")
Store brand name/tagline in a single `siteConfig` object (`/lib/config/site.ts`)
so renaming later touches one file, not the whole codebase.

## Visual Identity

### Aesthetic Direction
Clean, modern, "trustworthy fintech meets developer tool" — think
Linear × Vercel × Groww. Minimal chrome, generous whitespace, strong
typographic hierarchy, subtle motion (no gratuitous animation).

- **Mode**: Light mode default, full dark mode support (next-themes),
  toggle in header, persisted in localStorage.
- **Density**: Medium-compact — utility users want data fast, not marketing
  fluff, but calculators need breathing room for input clarity.

### Color System (Tailwind CSS variables — define in `globals.css`)
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#0A0A0B` | page bg |
| `--surface` | `#F7F8FA` | `#141416` | cards |
| `--border` | `#E5E7EB` | `#26272B` | dividers |
| `--foreground` | `#111827` | `#F4F4F5` | text |
| `--muted` | `#6B7280` | `#9CA3AF` | secondary text |
| `--primary` | `#4F46E5` (Indigo 600) | `#6366F1` | CTAs, links, active states |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | text on primary |
| `--success` | `#16A34A` | `#22C55E` | positive results (e.g., tax saved) |
| `--warning` | `#D97706` | `#F59E0B` | disclaimers |
| `--destructive` | `#DC2626` | `#EF4444` | errors |
| Category accent colors | see below | — | per-category tinting |

**Category accent colors** (used for icons/badges to visually group 35 tools):
- Finance & Tax → Indigo `#4F46E5`
- Converters & Files → Teal `#0D9488`
- Text & Writing → Amber `#D97706`
- Date & Time → Rose `#E11D48`
- QR & Generators → Violet `#7C3AED`
- Documents & Legal → Slate `#475569`
- SEO/Webmaster → Cyan `#0891B2`

### Typography
- Font: **Inter** (via `next/font/google`) for UI + body. **Geist Mono** or
  `JetBrains Mono` for numeric outputs (EMI amounts, code snippets, JSON) —
  monospace numerals reduce misreading of financial figures.
- Scale: `text-xs (12) / sm (14) / base (16) / lg (18) / xl (20) / 2xl (24) /
  3xl (30) / 4xl (36)` — Tailwind defaults, don't invent a custom scale.
- Headings: `font-semibold`, tight tracking. Body: `font-normal`, 1.6 line
  height for readability.

### Spacing & Layout
- Base unit: 4px (Tailwind default). Page max-width: `max-w-6xl` for content,
  `max-w-3xl` for single-column calculators/text tools.
- Consistent vertical rhythm: section spacing `py-12 md:py-16`.
- Border radius: `rounded-xl` (12px) for cards, `rounded-lg` for inputs/buttons.
- Shadows: subtle only — `shadow-sm` on cards, `shadow-md` on hover/modals.
  No heavy skeuomorphism.

### Component Library
Use **shadcn/ui** (built on Radix + Tailwind) as the base — gives accessible,
consistent primitives (Button, Input, Select, Slider, Tabs, Accordion, Dialog,
Toast, Card) without a heavy design-system build cost. Customize theme tokens
above via `tailwind.config.ts` + shadcn's `cn()` utility.

### Icons
`lucide-react` — consistent stroke-based icon set, matches shadcn aesthetic.

### Tone of Voice (microcopy)
- Direct, helpful, zero jargon-without-explanation. E.g., not "Compute HRA
  exemption" → "See how much of your HRA is tax-free."
- Every calculator result includes a one-line plain-English explanation, not
  just a number.
- Disclaimers are honest but not scary: "This is an estimate. Consult a CA
  for your actual filing." — styled as a small `Alert` component, not a
  giant warning block.

## Core Reusable UI Patterns (build these once, reuse across 35 tools)

1. **ToolPageLayout** — wraps every tool: breadcrumb → H1 + one-line
   description → tool interface card → "How it works" section → FAQ
   (accordion, also feeds JSON-LD) → related tools grid → disclaimer footer.
2. **ToolCard** — used on homepage/category pages: icon (category color),
   title, one-line description, "Popular" badge optional.
3. **CalculatorLayout** — two-column on desktop (inputs left, sticky results
   right), stacked on mobile (results appear below on submit/live-update).
4. **ResultSummaryCard** — big number + label + optional breakdown table +
   "Copy" / "Download PDF" / "Share" buttons.
5. **FileDropzone** — drag-drop + click-to-browse, shows privacy note
   ("Processed locally in your browser"), progress bar for WASM tasks.
6. **InputField variants** — `CurrencyInput` (₹ formatted, comma grouping),
   `PercentInput`, `NumberStepper`, `DatePickerField`.
7. **DisclaimerBanner** — reusable `Alert` for legal/financial disclaimers.
8. **AdSlot** — placeholder component (hidden/empty in dev), positioned
   between "How it works" and FAQ, and in category page sidebars.
9. **CopyToClipboardButton**, **DownloadButton** (generic, accepts blob/text).
10. **EmptyState / ErrorState** components for consistent failure UX.

## Accessibility
- All interactive components keyboard-navigable (shadcn/Radix gives this by
  default — don't break it with custom divs-as-buttons).
- Color contrast AA minimum on all text.
- Every icon-only button has `aria-label`.
