
---

# FILE: `docs/03-TOOL-CATALOG.md`

```markdown
# Tool Catalog — Full Specs

Each tool below lists: **Category | Route slug | Processing | Core
Logic/Formula | Key Libraries | Priority (build phase)**

Priority legend: P0 = MVP/launch, P1 = fast-follow, P2 = later (heavier tech).

---

## A. Finance & Tax (India)

### 1. Old vs New Tax Regime Calculator
- Slug: `/tools/finance/old-vs-new-tax-regime-calculator`
- Processing: Client-side, pure function
- Logic: Compute tax under both regimes from `tax-slabs.ts` (year-keyed slab
  arrays), apply standard deduction, 80C/80D/HRA only in old regime, apply
  87A rebate thresholds, add 4% health & education cess. Show side-by-side
  comparison + "you save ₹X under [regime]".
- Priority: **P0**

### 2. HRA Exemption Calculator
- Slug: `/tools/finance/hra-exemption-calculator`
- Logic: `exemption = min(HRA received, rent paid - 10% of basic, 50%|40% of
  basic depending on metro/non-metro)`. Metro list hardcoded (Delhi, Mumbai,
  Kolkata, Chennai).
- Priority: **P0**

### 3. EPF/PPF/NPS Maturity Calculator
- Logic:
  - PPF: annuity-due compound formula, current rate from `pf-nps-rates.ts`
    (quarterly-declared, flag for manual update).
  - EPF: monthly compounding on employee(12%) + employer(3.67% EPF +
    8.33% EPS split) contributions on basic+DA.
  - NPS: user-input assumed CAGR (default suggestion, not guaranteed),
    project corpus, split 40% mandatory annuity / 60% lumpsum at retirement.
- Priority: **P0** (3 tabs, one tool)

### 4. Gratuity Calculator
- Logic: Covered under Payment of Gratuity Act:
  `(15 × last drawn salary × years of service) / 26`, capped at ₹20,00,000.
  Not covered: `/30` instead of `/26`. Round service years per act rules
  (>6 months rounds up).
- Priority: **P0**

### 5. In-hand Salary / CTC Breakup Calculator
- Logic: Break CTC into Basic (typically 40-50%), HRA, Special Allowance,
  Employer PF, Gratuity provision. Deduct Employee PF, Professional Tax
  (state-wise table in `professional-tax.ts`), Income Tax (reuse tax-regime
  calc function). Output monthly in-hand.
- Priority: **P0**

### 6. GST Calculator + Invoice Generator
- Logic: Exclusive: `gst = amount × rate/100`. Inclusive:
  `gst = amount - amount×(100/(100+rate))`. CGST+SGST split (rate/2 each) for
  intra-state, IGST for inter-state. Invoice generator: form → jsPDF template
  with company/client details, line items, tax breakup.
- Libraries: `jsPDF`, `jspdf-autotable`
- Priority: **P1**

### 7. SIP/Lumpsum Mutual Fund Return Calculator
- Logic: SIP FV = `P × [((1+i)^n - 1)/i] × (1+i)` (i = monthly rate).
  Lumpsum FV = `P × (1+r)^n`. Show invested vs. estimated returns, chart
  (recharts) year-by-year growth.
- Priority: **P0**

### 8. Home Loan EMI + Prepayment Impact Calculator
- Logic: `EMI = [P×r×(1+r)^n]/[(1+r)^n-1]`. Generate full amortization table.
  Prepayment: recompute remaining schedule after lump-sum reduces principal,
  show interest saved + tenure reduced.
- Priority: **P0**

### 9. Capital Gains Tax Calculator (stocks/property)
- Logic: Equity — STCG (<12mo) flat rate, LTCG (>12mo) with exemption
  threshold (values in `capital-gains-rules.ts`, update per Budget). Property
  — STCG (<24mo) added to slab income; LTCG (>24mo) offer both indexation
  (CII table) and non-indexation calculation per current rules, let user
  compare.
- Priority: **P1**

---

## B. Converters & File Utilities

### 10. HEIC/WebP/AVIF ↔ JPG/PNG Converter
- Processing: Client-side. `heic2any` for HEIC decode, Canvas API for
  format re-encoding (WebP/AVIF/JPG/PNG all Canvas-supported natively in
  modern browsers via `canvas.toBlob(type)`).
- Priority: **P1**

### 11. PDF ↔ Word/Excel Converter
- Processing: Hybrid. Word→PDF: `mammoth` (docx→HTML) then print-to-PDF via
  browser or `jsPDF` from HTML. PDF→Word: extract text/layout via
  `pdfjs-dist`, reconstruct as docx via `docxtemplater`. Note: full fidelity
  conversion is hard — set expectation as "text extraction + basic
  reformatting," not pixel-perfect. Consider server-side fallback (Node
  function) for complex files.
- Priority: **P2** (technically hardest, ship with clear scope limits)

### 12. Image Compressor (bulk, client-side)
- Library: `browser-image-compression`. Bulk upload, per-file before/after
  size, ZIP download (`jszip`) for bulk results.
- Priority: **P0**

### 13. Background Remover
- Library: `@imgly/background-removal` (client-side ONNX model — not an LLM,
  runs fully offline in-browser via WASM).
- Priority: **P2** (large model download, needs good loading UX)

### 14. CSV ↔ JSON ↔ XML Converter
- Libraries: `papaparse` (CSV), native `JSON`, `fast-xml-parser` (XML).
  Textarea/file input both ways, live preview, download output.
- Priority: **P0**

### 15. Audio Format Converter (MP3/WAV/OGG)
- Library: `@ffmpeg/ffmpeg` (ffmpeg.wasm), lazy-loaded, progress bar.
- Priority: **P2**

### 16. Video Compressor / GIF Maker
- Library: `@ffmpeg/ffmpeg`. GIF maker: video→frames→gif via ffmpeg palette
  filters. Warn about browser memory limits for large files.
- Priority: **P2**

---

## C. Text & Writing Utilities

### 17. Character/Word Counter (per platform)
- Logic: Pure JS string length/word count, static per-platform limits object
  (Twitter/X 280, Meta description ~155-160, YouTube title 100, etc.) in
  `/lib/constants/platform-limits.ts`. Live countdown/over-limit indicator.
- Priority: **P0**

### 18. Case Converter
- Logic: Regex-based transforms (camelCase, snake_case, kebab-case,
  Title Case, PascalCase, CONSTANT_CASE, Sentence case).
- Priority: **P0**

### 19. Duplicate Line/Word Remover
- Logic: Split by line/word, dedupe with `Set`, preserve or sort order
  (user toggle), case-sensitive toggle.
- Priority: **P0**

### 20. Text Diff Checker
- Library: `diff` (npm), render inline/side-by-side diff view.
- Priority: **P0**

### 21. Lorem Ipsum / Placeholder Text Generator
- Logic: Templated word/sentence/paragraph bank, user picks count + format
  (words/sentences/paragraphs), option for "corporate jargon" or "hipster
  ipsum" variants for fun/differentiation.
- Priority: **P0**

### 22. Readability Score Checker (Flesch-Kincaid)
- Logic: Standard formula:
  `206.835 - 1.015×(words/sentences) - 84.6×(syllables/words)`. Syllable
  counting via a well-known heuristic algorithm (vowel-group counting with
  exceptions). Show grade level + readability label.
- Priority: **P1**

---

## D. Date, Time & Calculators

### 23. Age Calculator
- Library: `date-fns` (`differenceInYears`, `differenceInMonths`, etc.),
  exact years/months/days + fun facts (total days lived, next birthday
  countdown).
- Priority: **P0**

### 24. Pregnancy Due Date Calculator
- Logic: Naegele's rule — `LMP + 280 days` (40 weeks). Also support
  conception-date-based and IVF transfer-date-based calculation modes.
  Show trimester breakdown.
- Priority: **P0**

### 25. Retirement Countdown Calculator
- Logic: Date math from DOB + retirement age (default 60, editable) →
  countdown in years/months/days + optional corpus-needed estimate (links
  to SIP calculator).
- Priority: **P0**

### 26. Time Zone Converter / Meeting Planner
- Library: `luxon` (better IANA timezone handling than moment). Multi-city
  picker, visual timeline showing overlap of working hours.
- Priority: **P1**

### 27. Warranty/Subscription Expiry Tracker
- Logic: Date math + `localStorage` persistence (no DB needed v1). Add
  item → set expiry → list sorted by soonest-expiring, color-coded (red
  <7 days, amber <30 days). Optional: browser notification API for reminders.
- Priority: **P1**

---

## E. QR, Codes & Generators

### 28. UPI Payment QR Code Generator
- Logic: Build UPI deep link per spec:
  `upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=INR&tn=<note>`, encode via
  `qrcode` library.
- Priority: **P0**

### 29. WiFi QR Code Generator
- Logic: WiFi QR spec string:
  `WIFI:T:<WPA|WEP|nopass>;S:<ssid>;P:<password>;H:<true|false>;;`
- Priority: **P0**

### 30. vCard QR Generator
- Logic: Build vCard 3.0 format string (`BEGIN:VCARD...END:VCARD`), encode
  as QR. Also offer direct `.vcf` file download.
- Priority: **P0**

### 31. Random Name Generator
- Logic: Curated public-domain-safe JSON datasets (baby names by
  origin/gender, business name word-combination lists) + randomization/
  combination logic. Store datasets in `/lib/constants/names/`.
- Priority: **P1**

### 32. Password/Passphrase Generator
- Logic: `crypto.getRandomValues()` for true randomness (not `Math.random`),
  configurable length/character sets, passphrase mode (word-list based,
  Diceware-style), strength meter via `zxcvbn-ts`.
- Priority: **P0**

---

## F. Documents & Legal (India)

### 33. Rent Agreement Generator
- Logic: Form inputs (landlord/tenant details, property, rent, duration,
  terms) → fill a state-specific template (start with Maharashtra/
  Karnataka/Delhi common formats) → generate via `docxtemplater` (docx) or
  `jsPDF` (PDF). **Clear disclaimer**: not legally verified, consult a
  lawyer, stamp duty/registration varies by state.
- Priority: **P1**

### 34. Salary Slip / Offer Letter Generator
- Logic: Form → company/employee details, earnings/deductions breakdown →
  templated PDF via `jsPDF` + `jspdf-autotable`. Offer letter: templated
  text merge → PDF.
- Priority: **P1**

### 35. Resignation/Notice Period Calculator + Letter Generator
- Logic: Date math (last working day = today + notice period, factor
  weekends/holidays optionally) + templated resignation letter generator
  (form → merge → downloadable text/PDF).
- Priority: **P1**

---

## G. SEO/Webmaster Utilities

### 36. Robots.txt / Sitemap Validator
- Logic: Parse pasted/fetched robots.txt against spec rules (User-agent,
  Disallow/Allow, Sitemap directives), flag common mistakes. Sitemap:
  validate XML structure against sitemap protocol schema.
- Processing: Client-side parsing; fetching a live URL needs the server
  proxy route (CORS) — same pattern as #38.
- Priority: **P1**

### 37. Meta Tag Preview Tool
- Logic: User pastes tags or a URL. If URL: server route fetches HTML
  (CORS-safe), parses `<title>`, `og:*`, `twitter:*` tags via a lightweight
  HTML parser (`cheerio` in the API route). Render pixel-accurate Google
  SERP / Facebook / Twitter card previews.
- Priority: **P1**

### 38. Broken Link Checker (single page)
- Logic: User submits a page URL → server API route (`app/api/check-link`)
  fetches the page, extracts `<a>` hrefs (`cheerio`), issues HEAD/GET
  requests to each (with concurrency limit + timeout), returns status
  table (200/301/404/timeout). Must run server-side (Node runtime, not
  Edge, for `cheerio` + outbound fetch flexibility).
- Priority: **P1**

---

## Build Order Summary
- **Phase P0 (MVP, ~16 tools)**: All pure client-side, formula/JS-only tools
  with zero heavy dependencies — finance calculators (#1-5,7,8), text tools
  (#17-21), date tools (#23-25), generators (#28-30,32), CSV/JSON converter
  (#14), image compressor (#12).
- **Phase P1 (~13 tools)**: GST invoice, capital gains, timezone planner,
  warranty tracker, random name gen, readability checker, documents/legal
  generators, SEO tools (need light server routes).
- **Phase P2 (~6 tools)**: Heavy WASM/ML tools — PDF↔Word, HEIC/format
  converter, background remover, audio converter, video compressor/GIF.
