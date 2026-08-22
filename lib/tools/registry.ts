import type { ToolDef, ToolStatus } from './types';

/**
 * Single source of truth for every tool. Drives navigation, sitemap,
 * OG images, related tools, JSON-LD and the dynamic tool route.
 *
 * A tool only "exists" on the site if it is registered here.
 */
const TOOLS: ToolDef[] = [
  // ---------------------------------------------------------------- finance
  {
    slug: 'old-vs-new-tax-regime-calculator',
    name: 'Old vs New Tax Regime Calculator',
    description:
      'Compare your income tax under the old and new regimes and see which saves you more for FY 2024-25 (AY 2025-26).',
    explanation: [
      'India currently offers two income tax regimes. The new regime (default from FY 2023-24) has lower slab rates but removes most deductions such as Section 80C, 80D and HRA. The old regime keeps higher slab rates but allows these exemptions and deductions.',
      'This calculator applies the standard deduction for salaried taxpayers, the Section 87A rebate (up to ₹12,500 rebate on income up to ₹7 lakh under the new regime and up to ₹5 lakh under the old regime), and the 4% health and education cess on the computed tax.',
      'Because each taxpayer’s deductions differ, the only reliable way to choose is to compare both regimes on your own numbers. Slab rates are stored centrally and can be updated each Budget without touching the UI.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: [
      'old vs new tax regime calculator',
      'income tax calculator India 2024-25',
      'new regime vs old regime tax',
    ],
    titleValueProp: 'Compare Old vs New Regime for FY 2024-25',
    componentKey: 'tax-regime',
    status: 'live',
    relatedSlugs: [
      'hra-exemption-calculator',
      'in-hand-salary-calculator',
      'gratuity-calculator',
    ],
    privacyNote:
      'All calculations run in your browser — your salary and deduction details never leave your device.',
    faqs: [
      {
        question: 'Which tax regime is better?',
        answer:
          'There is no universal answer. The new regime favours taxpayers with few deductions, while the old regime is usually better for those claiming large 80C, 80D and HRA deductions. Compare both on this page using your own figures.',
      },
      {
        question: 'Are the FY 2024-25 slab rates used here?',
        answer:
          'Yes. This calculator uses the tax slabs announced for FY 2024-25 (AY 2025-26). The rates are centralised in the config so they can be updated annually.',
      },
      {
        question: 'Is the standard deduction available in both regimes?',
        answer:
          'Yes. Salaried taxpayers and pensioners can claim the ₹50,000 standard deduction under both the old and new regimes.',
      },
      {
        question: 'What is the Section 87A rebate?',
        answer:
          'Section 87A provides a rebate that reduces tax payable to zero for taxable income up to ₹7 lakh under the new regime and up to ₹5 lakh under the old regime, subject to limits.',
      },
      {
        question: 'Is this calculator accurate for filing my return?',
        answer:
          'It is an estimate based on the published slab rates. Always cross-verify with the official Income Tax Department calculator or a chartered accountant before filing.',
      },
    ],
  },
  {
    slug: 'hra-exemption-calculator',
    name: 'HRA Exemption Calculator',
    description:
      'Find out how much of your House Rent Allowance is tax-free under Section 10(13A).',
    explanation: [
      'The House Rent Allowance (HRA) exemption under Section 10(13A) is the least of three amounts: the actual HRA received; rent paid minus 10% of basic salary; and 50% of basic salary (40% for non-metro cities).',
      'For the 50%/40% rule, the metro cities are Delhi, Mumbai, Kolkata and Chennai. If you live in any other city, 40% applies. The exemption is only available if you actually pay rent and are not living in your own house.',
      'The remaining portion of HRA is added to your taxable salary. Claiming HRA correctly can meaningfully reduce your tax, especially in high-rent cities.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['HRA exemption calculator', 'house rent allowance India', '10(13A)'],
    titleValueProp: 'Calculate Tax-Free HRA under Section 10(13A)',
    componentKey: 'hra',
    status: 'live',
    relatedSlugs: [
      'old-vs-new-tax-regime-calculator',
      'in-hand-salary-calculator',
    ],
    faqs: [
      {
        question: 'How is HRA exemption calculated?',
        answer:
          'It is the minimum of: actual HRA received, rent paid minus 10% of basic salary, and 50% (metro) or 40% (non-metro) of basic salary.',
      },
      {
        question: 'Which cities count as metro for HRA?',
        answer:
          'Delhi, Mumbai, Kolkata and Chennai are treated as metro cities, where the 50% of basic limit applies. All other cities use 40%.',
      },
      {
        question: 'Can I claim HRA if I live in my own house?',
        answer:
          'No. HRA exemption requires you to actually pay rent for accommodation you occupy.',
      },
      {
        question: 'Do I need rent receipts to claim HRA?',
        answer:
          'Yes, employers usually ask for rent receipts or a rent agreement, especially for higher rent amounts. Keep them for your records.',
      },
    ],
  },
  {
    slug: 'epf-ppf-nps-calculator',
    name: 'EPF/PPF/NPS Calculator',
    description:
      'Estimate maturity for EPF, PPF and NPS retirement contributions.',
    explanation: [
      'This tool combines the three most common Indian retirement savings schemes. PPF uses an annuity-due compounding formula on yearly contributions, with the current rate (7.1%) flagged for manual updates each quarter. EPF compounds monthly on the employee 12% contribution and the employer split (3.67% EPF + 8.33% EPS) on basic plus DA. NPS projects a corpus at an assumed CAGR and splits it into a 40% mandatory annuity and 60% tax-free lumpsum at retirement.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['EPF calculator', 'PPF calculator', 'NPS calculator', 'retirement'],
    titleValueProp: 'Estimate EPF, PPF & NPS Maturity',
    componentKey: 'epf-ppf-nps',
    status: 'coming-soon',
    relatedSlugs: [
      'sip-calculator',
      'retirement-countdown-calculator',
      'gratuity-calculator',
    ],
    faqs: [
      {
        question: 'What is the current PPF interest rate?',
        answer:
          'The PPF rate is reviewed quarterly. The default shown is the most recent declared rate; verify against the latest finance ministry notification.',
      },
      {
        question: 'Is the NPS 40% annuity mandatory?',
        answer:
          'Yes, at least 40% of the NPS corpus must be used to buy an annuity; the remaining 60% can be withdrawn as a tax-free lumpsum.',
      },
    ],
  },
  {
    slug: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    description:
      'Calculate your gratuity eligibility under the Payment of Gratuity Act, 1972.',
    explanation: [
      'Gratuity is a retirement benefit paid by an employer for long service. For employees covered by the Payment of Gratuity Act, the formula is (15 × last drawn salary × years of service) ÷ 26, where salary is basic plus DA. The maximum tax-free gratuity is ₹20,00,000.',
      'For employees not covered by the Act, 30 is used in place of 26. Service of 6 months or more in the final year rounds up to a full year. You become eligible after completing 5 continuous years of service (with exceptions for death or disablement).',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['gratuity calculator', 'gratuity formula', 'Payment of Gratuity Act'],
    titleValueProp: 'Calculate Your Gratuity in Seconds',
    componentKey: 'gratuity',
    status: 'live',
    relatedSlugs: ['in-hand-salary-calculator', 'epf-ppf-nps-calculator'],
    faqs: [
      {
        question: 'When am I eligible for gratuity?',
        answer:
          'After 5 continuous years of service with an employer covered by the Payment of Gratuity Act, with exceptions for death or disablement.',
      },
      {
        question: 'What is the gratuity formula?',
        answer:
          'For covered employees: (15 × last drawn salary × years of service) ÷ 26. For non-covered employees, 30 is used instead of 26.',
      },
      {
        question: 'Is gratuity taxable?',
        answer:
          'Gratuity up to ₹20,00,000 is tax-free for eligible employees under current rules.',
      },
    ],
  },
  {
    slug: 'in-hand-salary-calculator',
    name: 'In-Hand Salary / CTC Calculator',
    description:
      'Break up your CTC into take-home pay after PF, professional tax and income tax.',
    explanation: [
      'Cost to Company (CTC) includes components you never take home: employer PF, gratuity provisions, and bonuses. This calculator splits CTC into basic (typically 40-50%), HRA, special allowance, employer PF and gratuity, then deducts employee PF (12% of basic), state professional tax and income tax using the shared tax-regime logic to give your monthly in-hand salary.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['in-hand salary calculator', 'take home salary', 'CTC breakup'],
    titleValueProp: 'See Your Monthly Take-Home from CTC',
    componentKey: 'in-hand-salary',
    status: 'live',
    relatedSlugs: [
      'old-vs-new-tax-regime-calculator',
      'hra-exemption-calculator',
      'gratuity-calculator',
    ],
    faqs: [
      {
        question: 'Why is my take-home less than CTC?',
        answer:
          'CTC includes employer contributions such as employer PF and gratuity, plus variable components. These are deducted before you receive your in-hand salary.',
      },
      {
        question: 'What is deducted from gross salary?',
        answer:
          'Employee PF (12% of basic), professional tax (state-dependent) and income tax based on your chosen regime.',
      },
    ],
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator & Invoice Generator',
    description:
      'Calculate CGST, SGST and IGST and generate a professional GST invoice PDF.',
    explanation: [
      'GST is computed either exclusive (tax added on top) or inclusive (tax already in the price). For intra-state supplies the tax splits equally into CGST and SGST; for inter-state supplies it is charged entirely as IGST. This tool also generates a downloadable PDF invoice with line items and tax breakup.',
    ],
    category: 'finance',
    priority: 'P1',
    keywords: ['GST calculator', 'CGST SGST IGST', 'GST invoice generator'],
    titleValueProp: 'Calculate GST & Generate Invoices',
    componentKey: 'gst',
    status: 'coming-soon',
    relatedSlugs: ['csv-json-xml-converter'],
    faqs: [
      {
        question: 'What is the difference between CGST, SGST and IGST?',
        answer:
          'CGST and SGST are charged on intra-state sales and split between centre and state; IGST is charged on inter-state sales.',
      },
    ],
  },
  {
    slug: 'sip-calculator',
    name: 'SIP & Lumpsum Calculator',
    description:
      'Estimate mutual fund returns for monthly SIPs and one-time lumpsum investments.',
    explanation: [
      'A Systematic Investment Plan (SIP) compounds a fixed monthly contribution. The future value is P × [((1+i)^n − 1)/i] × (1+i), where i is the monthly rate and n the number of months. A lumpsum grows as P × (1+r)^n. The chart shows invested amount versus estimated wealth year by year. Returns are illustrative — mutual funds are subject to market risks.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['SIP calculator', 'lumpsum calculator', 'mutual fund returns'],
    titleValueProp: 'Estimate SIP & Lumpsum Returns',
    componentKey: 'sip',
    status: 'live',
    relatedSlugs: ['epf-ppf-nps-calculator', 'retirement-countdown-calculator'],
    faqs: [
      {
        question: 'What rate of return should I assume?',
        answer:
          'Equity mutual funds have historically returned 10-12% CAGR over long periods, but this is not guaranteed. Use a conservative estimate for planning.',
      },
      {
        question: 'Does the SIP formula account for inflation?',
        answer:
          'No. The result is a nominal future value. To get the real value, discount it by the expected inflation rate.',
      },
      {
        question: 'Are these returns guaranteed?',
        answer:
          'No. Mutual fund returns vary with markets. This is a planning estimate, not a promise.',
      },
    ],
  },
  {
    slug: 'emi-calculator',
    name: 'Home Loan EMI Calculator',
    description:
      'Calculate EMI, total interest and amortisation schedule, plus the impact of prepayments.',
    explanation: [
      'The equated monthly instalment uses the formula EMI = [P×r×(1+r)^n] / [(1+r)^n − 1], where P is principal, r the monthly interest rate and n the number of months. This calculator generates the full amortisation table splitting each EMI into interest and principal. A prepayment lumpsum reduces outstanding principal, which you can apply to either shorten the tenure (default) or lower the EMI, showing interest saved and tenure reduced.',
    ],
    category: 'finance',
    priority: 'P0',
    keywords: ['home loan EMI calculator', 'mortgage calculator India', 'prepayment'],
    titleValueProp: 'Calculate EMI & Prepayment Impact',
    componentKey: 'emi',
    status: 'live',
    relatedSlugs: ['sip-calculator', 'in-hand-salary-calculator'],
    privacyNote:
      'Your loan numbers stay in your browser — nothing is sent to a server.',
    faqs: [
      {
        question: 'How is EMI calculated?',
        answer:
          'EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is principal, r is the monthly interest rate and n is the number of months.',
      },
      {
        question: 'Does a prepayment reduce EMI or tenure?',
        answer:
          'You can choose. Reducing tenure saves the most interest; reducing EMI lowers your monthly outgo. The default shown reduces tenure.',
      },
      {
        question: 'Are there prepayment charges?',
        answer:
          'For floating-rate home loans, RBI rules prohibit prepayment penalties, but check with your lender for fixed-rate loans.',
      },
    ],
  },
  {
    slug: 'capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator',
    description:
      'Compute short- and long-term capital gains tax on shares and property.',
    explanation: [
      'Equity gains are short-term if held under 12 months (taxed at 15%) and long-term above that (10% above the ₹1 lakh exemption, without indexation). Property gains are short-term under 24 months (added to income) and long-term above, taxed at 20% with cost-inflation-index benefit. The calculator holds these thresholds and CII values centrally for annual updates.',
    ],
    category: 'finance',
    priority: 'P1',
    keywords: ['capital gains tax calculator', 'LTCG', 'STCG', 'CII indexation'],
    titleValueProp: 'Calculate Capital Gains on Shares & Property',
    componentKey: 'capital-gains',
    status: 'coming-soon',
    relatedSlugs: ['old-vs-new-tax-regime-calculator'],
    faqs: [
      {
        question: 'What is the LTCG exemption on equity?',
        answer:
          'Long-term capital gains on listed equity up to ₹1 lakh per financial year are exempt; gains above are taxed at 10%.',
      },
    ],
  },

  // ----------------------------------------------------------- converters
  {
    slug: 'image-format-converter',
    name: 'HEIC/WebP/AVIF to JPG/PNG Converter',
    description:
      'Convert HEIC, WebP and AVIF images to JPG or PNG — entirely on your device.',
    explanation: [
      'This tool decodes HEIC files in your browser and re-encodes WebP, AVIF, JPG and PNG via the Canvas API. No image is uploaded, so conversion is private and unlimited. Modern browsers support WebP and AVIF encoding natively; HEIC support uses a small WebAssembly decoder.',
    ],
    category: 'converters',
    priority: 'P1',
    keywords: ['heic to jpg', 'webp to png', 'avif converter', 'image converter'],
    titleValueProp: 'Convert HEIC/WebP/AVIF Privately in Browser',
    componentKey: 'image-format-converter',
    status: 'coming-soon',
    relatedSlugs: ['image-compressor'],
    privacyNote:
      'Your images are converted entirely in your browser and never uploaded.',
    faqs: [
      {
        question: 'Are my images uploaded?',
        answer:
          'No. All conversion happens locally in your browser using Canvas and WebAssembly.',
      },
    ],
  },
  {
    slug: 'pdf-word-converter',
    name: 'PDF ↔ Word/Excel Converter',
    description:
      'Extract text and tables from PDFs into editable Word documents, and vice versa.',
    explanation: [
      'PDF to Word conversion extracts text and basic layout using pdf.js and reconstructs a DOCX. Because perfect fidelity is technically very difficult, results focus on text extraction and clean reformatting rather than pixel-perfect copies. Complex files may use an optional server-side fallback.',
    ],
    category: 'converters',
    priority: 'P2',
    keywords: ['pdf to word', 'word to pdf', 'pdf to excel'],
    titleValueProp: 'Convert PDF to Word and Back',
    componentKey: 'pdf-word-converter',
    status: 'coming-soon',
    relatedSlugs: ['csv-json-xml-converter'],
    faqs: [
      {
        question: 'Will formatting be preserved perfectly?',
        answer:
          'PDF was not designed for editing, so conversion is best-effort text and layout extraction rather than an exact replica.',
      },
    ],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    description:
      'Compress JPG, PNG and WebP images in bulk without losing quality, and download as ZIP.',
    explanation: [
      'The image compressor uses a browser-based encoder to reduce file size while keeping visible quality high. You can set a target quality or maximum size, see per-file before/after sizes, and download all results as a ZIP. Because processing happens locally, there is no upload limit and your photos remain private.',
    ],
    category: 'converters',
    priority: 'P0',
    keywords: ['image compressor', 'compress jpeg', 'reduce image size online'],
    titleValueProp: 'Compress Images in Bulk, Privately',
    componentKey: 'image-compressor',
    status: 'coming-soon',
    relatedSlugs: ['image-format-converter'],
    privacyNote:
      'Compression runs locally in your browser — your photos never leave your device.',
    faqs: [
      {
        question: 'Will compression reduce image quality?',
        answer:
          'Some size reduction always involves lossy compression for JPEG/WebP, but the default settings keep quality loss nearly invisible. PNG compression is lossless.',
      },
      {
        question: 'Is there a file size limit?',
        answer:
          'There is no server limit because files never upload, but extremely large images may strain mobile browser memory.',
      },
    ],
  },
  {
    slug: 'background-remover',
    name: 'Background Remover',
    description:
      'Remove image backgrounds automatically using an on-device AI model.',
    explanation: [
      'This tool runs an ONNX segmentation model directly in your browser via WebAssembly — it is not an LLM and no image is sent to a server. The first run downloads the model, after which it works offline. A one-colour background and clear subject give the best cutout.',
    ],
    category: 'converters',
    priority: 'P2',
    keywords: ['background remover', 'remove background from image', 'transparent png'],
    titleValueProp: 'Remove Image Backgrounds for Free',
    componentKey: 'background-remover',
    status: 'coming-soon',
    relatedSlugs: ['image-format-converter', 'image-compressor'],
    privacyNote: 'Your images are processed locally — they are never uploaded.',
    faqs: [
      {
        question: 'Does this use a cloud AI service?',
        answer:
          'No. The segmentation model downloads and runs entirely in your browser via WebAssembly.',
      },
    ],
  },
  {
    slug: 'csv-json-xml-converter',
    name: 'CSV ↔ JSON ↔ XML Converter',
    description:
      'Convert between CSV, JSON and XML with a live preview and download — no upload.',
    explanation: [
      'Paste text or upload a file in any of CSV, JSON or XML and convert to another format instantly. CSV parsing handles quoted fields and custom delimiters; XML is parsed and generated following standard rules. The live preview lets you verify structure before downloading, and all processing is local.',
    ],
    category: 'converters',
    priority: 'P0',
    keywords: ['csv to json', 'json to csv', 'xml to json', 'converter'],
    titleValueProp: 'Convert CSV, JSON & XML Instantly',
    componentKey: 'csv-json-xml',
    status: 'live',
    relatedSlugs: ['text-diff-checker', 'case-converter'],
    privacyNote:
      'Your data is parsed in your browser — files are never uploaded.',
    faqs: [
      {
        question: 'Can I convert large files?',
        answer:
          'Yes, processing is local, but extremely large files may slow the browser. The live preview shows the first portion for quick verification.',
      },
      {
        question: 'Are CSV headers preserved?',
        answer:
          'Yes. The first row is treated as a header and used as JSON object keys by default.',
      },
    ],
  },
  {
    slug: 'audio-converter',
    name: 'Audio Format Converter',
    description:
      'Convert audio between MP3, WAV, OGG and more using ffmpeg.wasm in your browser.',
    explanation: [
      'Audio conversion runs on ffmpeg compiled to WebAssembly, so files never leave your device. The heavy library is lazy-loaded only on this page. Very large files may hit browser memory limits.',
    ],
    category: 'converters',
    priority: 'P2',
    keywords: ['audio converter', 'mp3 to wav', 'ogg converter online'],
    titleValueProp: 'Convert Audio Formats Privately',
    componentKey: 'audio-converter',
    status: 'coming-soon',
    relatedSlugs: ['video-compressor'],
    privacyNote: 'Audio is converted locally in your browser via WebAssembly.',
    faqs: [
      {
        question: 'What formats are supported?',
        answer:
          'Common formats including MP3, WAV, OGG, M4A and FLAC, depending on the ffmpeg.wasm build.',
      },
    ],
  },
  {
    slug: 'video-compressor',
    name: 'Video Compressor & GIF Maker',
    description:
      'Compress videos and turn clips into animated GIFs entirely in your browser.',
    explanation: [
      'Video processing uses ffmpeg.wasm, loaded only on this page. The GIF maker extracts frames and builds an optimised palette. Large videos can exhaust mobile browser memory, so start with short clips.',
    ],
    category: 'converters',
    priority: 'P2',
    keywords: ['video compressor', 'video to gif', 'compress mp4 online'],
    titleValueProp: 'Compress Video & Make GIFs',
    componentKey: 'video-compressor',
    status: 'coming-soon',
    relatedSlugs: ['audio-converter'],
    privacyNote: 'Video is processed locally in your browser.',
    faqs: [
      {
        question: 'Is there a size limit?',
        answer:
          'There is no server limit, but browsers cap memory. Keep clips short on mobile.',
      },
    ],
  },

  // ----------------------------------------------------------------- text
  {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    description:
      'Count words, characters, sentences and paragraphs with platform-specific limits.',
    explanation: [
      'The counter updates live as you type and reports words, characters (with and without spaces), sentences and paragraphs. It also shows progress against common platform limits — Twitter/X (280), a Google meta description (~155-160), a YouTube title (100) and more — with a colour-coded countdown when you go over.',
    ],
    category: 'text',
    priority: 'P0',
    keywords: ['word counter', 'character counter', 'letter count online'],
    titleValueProp: 'Count Words & Characters Live',
    componentKey: 'word-counter',
    status: 'live',
    relatedSlugs: ['case-converter', 'duplicate-line-remover', 'readability-checker'],
    faqs: [
      {
        question: 'How are words counted?',
        answer:
          'Text is split on whitespace and punctuation boundaries. A hyphenated word counts as one word.',
      },
      {
        question: 'Does it count spaces?',
        answer:
          'Both characters-with-spaces and characters-without-spaces are shown, matching most other counters.',
      },
      {
        question: 'Which platform limits are included?',
        answer:
          'Twitter/X, Instagram caption, YouTube title and description, and SEO meta title and description.',
      },
    ],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description:
      'Convert text between camelCase, snake_case, kebab-case, Title Case, UPPER and more.',
    explanation: [
      'Transform any text into the case you need: UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE. Useful for developers normalising identifiers and writers reformatting headings. The result can be copied in one click.',
    ],
    category: 'text',
    priority: 'P0',
    keywords: ['case converter', 'camelcase converter', 'title case generator'],
    titleValueProp: 'Convert Text Case in One Click',
    componentKey: 'case-converter',
    status: 'live',
    relatedSlugs: ['word-counter', 'duplicate-line-remover'],
    faqs: [
      {
        question: 'What cases are supported?',
        answer:
          'Upper, lower, title, sentence, camel, Pascal, snake, kebab, constant and alternating case.',
      },
      {
        question: 'Does it handle acronyms?',
        answer:
          'The converter treats words generically; review proper nouns and acronyms after conversion.',
      },
    ],
  },
  {
    slug: 'duplicate-line-remover',
    name: 'Duplicate Line Remover',
    description:
      'Remove duplicate lines or words, with options to keep order, sort and ignore case.',
    explanation: [
      'Paste a list and instantly remove duplicate lines (or words), with toggles to preserve the original order, sort the output, remove empty lines, and match case-sensitively or ignore case. Handy for cleaning mailing lists, keyword lists and spreadsheets.',
    ],
    category: 'text',
    priority: 'P0',
    keywords: ['duplicate line remover', 'dedupe list', 'remove duplicates online'],
    titleValueProp: 'Remove Duplicate Lines Instantly',
    componentKey: 'duplicate-line-remover',
    status: 'live',
    relatedSlugs: ['case-converter', 'word-counter'],
    faqs: [
      {
        question: 'Can I keep the original order?',
        answer:
          'Yes. Toggle "Keep order" to remove duplicates while preserving first-seen order.',
      },
      {
        question: 'Does it ignore case?',
        answer:
          'Case sensitivity is optional; enable "Ignore case" to treat "Apple" and "apple" as duplicates.',
      },
    ],
  },
  {
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    description:
      'Compare two texts side by side and highlight added, removed and changed lines.',
    explanation: [
      'Paste two versions of text to see exactly what changed. The diff view highlights additions in green and deletions in red, with both side-by-side and inline layouts. It uses a proven longest-common-subsequence algorithm to align changes line by line, making it useful for comparing documents, config files and code.',
    ],
    category: 'text',
    priority: 'P0',
    keywords: ['text diff checker', 'compare text online', 'diff tool'],
    titleValueProp: 'Compare Two Texts & See Differences',
    componentKey: 'text-diff',
    status: 'live',
    relatedSlugs: ['case-converter', 'duplicate-line-remover'],
    faqs: [
      {
        question: 'Can I compare code?',
        answer:
          'Yes. The diff aligns lines and highlights changes, which works for plain text, config and code alike.',
      },
      {
        question: 'Is there a character-level view?',
        answer:
          'The default is line-level diff with inline change highlighting, which is easiest to read for most content.',
      },
    ],
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description:
      'Generate placeholder text by words, sentences or paragraphs, with fun variants.',
    explanation: [
      'Generate as much placeholder text as you need by paragraph, sentence or word count. Choose between classic Latin, plain-English corporate jargon, or a playful "hipster ipsum" variant for mockups and designs. Output is copied or downloaded instantly.',
    ],
    category: 'text',
    priority: 'P0',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text'],
    titleValueProp: 'Generate Placeholder Text',
    componentKey: 'lorem-ipsum',
    status: 'live',
    relatedSlugs: ['word-counter', 'case-converter'],
    faqs: [
      {
        question: 'What variants are available?',
        answer:
          'Classic lorem ipsum, corporate jargon and hipster ipsum styles, in paragraphs, sentences or words.',
      },
    ],
  },
  {
    slug: 'readability-checker',
    name: 'Readability Score Checker',
    description:
      'Check Flesch-Kincaid readability, grade level and reading time for any text.',
    explanation: [
      'The Flesch Reading Ease score is 206.835 − 1.015×(words/sentences) − 84.6×(syllables/words), with higher scores meaning easier reading. The tool also maps a score to a US grade level, counts sentences, words and syllables, and estimates reading time — helpful for writers targeting a clear, accessible style.',
    ],
    category: 'text',
    priority: 'P1',
    keywords: ['readability checker', 'Flesch-Kincaid', 'reading grade level'],
    titleValueProp: 'Check Flesch-Kincaid Readability',
    componentKey: 'readability-checker',
    status: 'coming-soon',
    relatedSlugs: ['word-counter', 'lorem-ipsum-generator'],
    faqs: [
      {
        question: 'How is the Flesch score calculated?',
        answer:
          'It uses words per sentence and syllables per word in the standard Flesch Reading Ease formula.',
      },
    ],
  },

  // ----------------------------------------------------------------- date
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description:
      'Calculate exact age in years, months and days, with fun lived-life stats.',
    explanation: [
      'Enter your date of birth to see your exact age down to the day, total months and weeks lived, total days, hours and minutes, and a countdown to your next birthday. It uses calendar-aware date math so leap years and month lengths are handled correctly.',
    ],
    category: 'date',
    priority: 'P0',
    keywords: ['age calculator', 'calculate my age', 'age in days'],
    titleValueProp: 'Calculate Exact Age in Years, Months & Days',
    componentKey: 'age-calculator',
    status: 'live',
    relatedSlugs: ['pregnancy-due-date-calculator', 'retirement-countdown-calculator'],
    faqs: [
      {
        question: 'Does it account for leap years?',
        answer:
          'Yes. Date arithmetic is calendar-aware, so leap days and varying month lengths are correct.',
      },
      {
        question: 'What stats are shown?',
        answer:
          'Exact age, total months, weeks, days, hours and minutes lived, plus a countdown to your next birthday.',
      },
    ],
  },
  {
    slug: 'pregnancy-due-date-calculator',
    name: 'Pregnancy Due Date Calculator',
    description:
      'Estimate your due date from LMP, conception date or IVF transfer, with trimester dates.',
    explanation: [
      'The default calculation uses Naegele’s rule: add 280 days (40 weeks) to the first day of your last menstrual period. You can instead calculate from a known conception date (266 days) or an IVF transfer date (adjusted for embryo age). The tool shows the start and end of each trimester and an estimated current week.',
    ],
    category: 'date',
    priority: 'P0',
    keywords: ['pregnancy due date calculator', 'Naegele rule', 'due date from LMP'],
    titleValueProp: 'Estimate Your Pregnancy Due Date',
    componentKey: 'pregnancy-due-date',
    status: 'live',
    relatedSlugs: ['age-calculator'],
    faqs: [
      {
        question: 'How accurate is the due date?',
        answer:
          'Naegele’s rule gives a standard estimate; only about 5% of babies arrive on the exact due date. An early ultrasound is the most accurate dating method.',
      },
      {
        question: 'What is Naegele’s rule?',
        answer:
          'It estimates the due date as 280 days (40 weeks) from the first day of the last menstrual period.',
      },
    ],
  },
  {
    slug: 'retirement-countdown-calculator',
    name: 'Retirement Countdown Calculator',
    description:
      'See how long until you retire and an estimate of the corpus you may need.',
    explanation: [
      'Enter your date of birth and desired retirement age (default 60) to see a live countdown in years, months and days. The optional corpus estimate projects how much you might need to maintain your lifestyle, accounting for years in retirement and inflation, and links to the SIP calculator to plan for it.',
    ],
    category: 'date',
    priority: 'P0',
    keywords: ['retirement countdown', 'retirement calculator', 'retirement planning India'],
    titleValueProp: 'Count Down to Retirement & Plan Corpus',
    componentKey: 'retirement-countdown',
    status: 'live',
    relatedSlugs: ['sip-calculator', 'epf-ppf-nps-calculator', 'age-calculator'],
    faqs: [
      {
        question: 'What retirement age is used?',
        answer:
          'It defaults to 60, which you can change to match your own plans.',
      },
      {
        question: 'Is the corpus estimate accurate?',
        answer:
          'It is a rough planning estimate based on your inputs and assumed inflation and returns, not personalised financial advice.',
      },
    ],
  },
  {
    slug: 'timezone-converter',
    name: 'Time Zone Converter & Meeting Planner',
    description:
      'Compare times across cities and find overlapping working hours for meetings.',
    explanation: [
      'Pick multiple cities to see their current times side by side and a visual timeline showing where working hours overlap. It uses IANA timezones so daylight-saving transitions are handled automatically.',
    ],
    category: 'date',
    priority: 'P1',
    keywords: ['timezone converter', 'meeting planner', 'world clock meeting'],
    titleValueProp: 'Plan Meetings Across Time Zones',
    componentKey: 'timezone-converter',
    status: 'coming-soon',
    relatedSlugs: ['retirement-countdown-calculator'],
    faqs: [
      {
        question: 'Does it handle daylight saving?',
        answer:
          'Yes, IANA timezones are used so DST changes apply automatically.',
      },
    ],
  },
  {
    slug: 'warranty-tracker',
    name: 'Warranty & Subscription Tracker',
    description:
      'Track warranties and subscriptions with expiry reminders saved on your device.',
    explanation: [
      'Add items with purchase dates and warranty/subscription durations. The tracker sorts them by soonest-expiring and colour-codes entries (red under 7 days, amber under 30 days). Data is stored locally in your browser with localStorage — no account or database needed — and optional browser notifications can remind you before expiry.',
    ],
    category: 'date',
    priority: 'P1',
    keywords: ['warranty tracker', 'subscription expiry reminder', 'AMC tracker'],
    titleValueProp: 'Track Warranties & Subscriptions',
    componentKey: 'warranty-tracker',
    status: 'coming-soon',
    relatedSlugs: ['age-calculator'],
    privacyNote:
      'Your items are saved only in this browser via localStorage.',
    faqs: [
      {
        question: 'Where is my data stored?',
        answer:
          'Locally in your browser using localStorage. Nothing is sent to a server.',
      },
    ],
  },

  // ------------------------------------------------------------------- qr
  {
    slug: 'upi-qr-generator',
    name: 'UPI QR Code Generator',
    description:
      'Create a UPI payment QR code for any UPI ID or merchant — instantly and privately.',
    explanation: [
      'Enter a UPI ID (VPA), payee name and optional amount and note to generate a UPI deep link (upi://pay) encoded as a QR code. Any UPI app such as GPay, PhonePe or Paytm can scan it to prefill the payment. The QR is generated as an image you can download as PNG or SVG.',
    ],
    category: 'qr',
    priority: 'P0',
    keywords: ['UPI QR code generator', 'UPI payment QR', 'GPay PhonePe QR'],
    titleValueProp: 'Generate UPI Payment QR Codes',
    componentKey: 'upi-qr',
    status: 'live',
    relatedSlugs: ['wifi-qr-generator', 'vcard-qr-generator'],
    privacyNote: 'The QR is generated locally — your UPI ID never leaves your browser.',
    faqs: [
      {
        question: 'Which UPI apps can scan it?',
        answer:
          'Any UPI-compatible app including Google Pay, PhonePe, Paytm and BHIM.',
      },
      {
        question: 'Can I set a fixed amount?',
        answer:
          'Yes. Provide an amount and the payment app will prefill it, though the payer can still edit it in most apps.',
      },
    ],
  },
  {
    slug: 'wifi-qr-generator',
    name: 'WiFi QR Code Generator',
    description:
      'Make a QR code that connects guests to your WiFi without typing the password.',
    explanation: [
      'Enter your WiFi SSID, password and encryption type (WPA/WPA2, WEP or none) to generate a standard WiFi QR string. Scanning it with a phone camera joins the network automatically, so guests do not have to type a long password. The generated image can be downloaded and printed.',
    ],
    category: 'qr',
    priority: 'P0',
    keywords: ['WiFi QR code generator', 'QR for WiFi password', 'guest wifi qr'],
    titleValueProp: 'Share WiFi with a QR Code',
    componentKey: 'wifi-qr',
    status: 'live',
    relatedSlugs: ['upi-qr-generator', 'vcard-qr-generator'],
    privacyNote:
      'Your WiFi credentials are encoded locally in your browser and never uploaded.',
    faqs: [
      {
        question: 'Does it work on iPhone and Android?',
        answer:
          'Yes. Both iOS and Android cameras can scan WiFi QR codes to join the network directly.',
      },
      {
        question: 'Is my password sent anywhere?',
        answer:
          'No. The QR is generated entirely in your browser and only contains the standard WiFi string.',
      },
    ],
  },
  {
    slug: 'vcard-qr-generator',
    name: 'vCard QR Code Generator',
    description:
      'Create a vCard QR code that saves contact details straight to a phone.',
    explanation: [
      'Fill in name, phone, email, organisation and address to generate a vCard 3.0 QR code. Scanning it offers to add the contact directly, and you can also download the .vcf file for sharing. Useful for business cards and event badges.',
    ],
    category: 'qr',
    priority: 'P0',
    keywords: ['vCard QR generator', 'contact QR code', 'digital business card QR'],
    titleValueProp: 'Create vCard Contact QR Codes',
    componentKey: 'vcard-qr',
    status: 'live',
    relatedSlugs: ['upi-qr-generator', 'wifi-qr-generator'],
    faqs: [
      {
        question: 'What details can I include?',
        answer:
          'Name, phone, email, organisation, job title, website and address, following the vCard 3.0 format.',
      },
      {
        question: 'Can I download the contact file?',
        answer:
          'Yes, in addition to the QR you can download a .vcf file.',
      },
    ],
  },
  {
    slug: 'random-name-generator',
    name: 'Random Name Generator',
    description:
      'Generate random names by origin and gender, plus business name ideas.',
    explanation: [
      'Generate random given and family names filtered by origin and gender, or combine curated word lists to brainstorm business and brand names. The datasets are public-domain safe and stored locally.',
    ],
    category: 'qr',
    priority: 'P1',
    keywords: ['random name generator', 'business name generator', 'character names'],
    titleValueProp: 'Generate Random & Business Names',
    componentKey: 'random-name',
    status: 'coming-soon',
    relatedSlugs: ['password-generator'],
    faqs: [
      {
        question: 'Can I use generated business names commercially?',
        answer:
          'The word lists are public-domain safe, but always check for existing trademarks before using a name commercially.',
      },
    ],
  },
  {
    slug: 'password-generator',
    name: 'Password & Passphrase Generator',
    description:
      'Create strong, random passwords or memorable passphrases, with a strength meter.',
    explanation: [
      'Generate cryptographically strong passwords using window.crypto.getRandomValues (not Math.random). Configure length and character sets, or switch to a Diceware-style passphrase made of random words. A strength meter estimates how hard the password is to crack.',
    ],
    category: 'qr',
    priority: 'P0',
    keywords: ['password generator', 'strong password', 'passphrase generator'],
    titleValueProp: 'Generate Strong Passwords Locally',
    componentKey: 'password-generator',
    status: 'live',
    relatedSlugs: ['random-name-generator'],
    privacyNote:
      'Passwords are generated locally in your browser and are never transmitted.',
    faqs: [
      {
        question: 'Are the passwords truly random?',
        answer:
          'Yes, they use the Web Crypto API (crypto.getRandomValues), which is cryptographically secure, unlike Math.random.',
      },
      {
        question: 'What is a passphrase?',
        answer:
          'A passphrase joins several random words, making it long and memorable while still strong.',
      },
    ],
  },

  // ------------------------------------------------------------- documents
  {
    slug: 'rent-agreement-generator',
    name: 'Rent Agreement Generator',
    description:
      'Draft a residential rent agreement from a template and download as PDF or DOCX.',
    explanation: [
      'Fill in landlord and tenant details, property address, rent, deposit and duration to generate a standard residential rent agreement for common formats. This is a starting template only — stamp duty and registration requirements vary by state, so consult a lawyer before executing it.',
    ],
    category: 'documents',
    priority: 'P1',
    keywords: ['rent agreement generator', 'lease agreement India', 'rental contract'],
    titleValueProp: 'Draft a Rent Agreement Online',
    componentKey: 'rent-agreement',
    status: 'coming-soon',
    relatedSlugs: ['salary-slip-generator', 'resignation-letter-generator'],
    faqs: [
      {
        question: 'Is this agreement legally valid?',
        answer:
          'This produces a template for reference. Stamp duty and registration vary by state — consult a lawyer before signing.',
      },
    ],
  },
  {
    slug: 'salary-slip-generator',
    name: 'Salary Slip & Offer Letter Generator',
    description:
      'Generate a monthly salary slip or job offer letter as a downloadable PDF.',
    explanation: [
      'Enter company and employee details with earnings and deductions to produce a formatted salary slip PDF, or fill in offer details to generate an offer letter. PDFs are generated locally using jsPDF and auto-table.',
    ],
    category: 'documents',
    priority: 'P1',
    keywords: ['salary slip generator', 'payslip PDF', 'offer letter generator'],
    titleValueProp: 'Generate Salary Slips & Offer Letters',
    componentKey: 'salary-slip',
    status: 'coming-soon',
    relatedSlugs: ['rent-agreement-generator', 'in-hand-salary-calculator'],
    faqs: [
      {
        question: 'Is the generated document valid for official use?',
        answer:
          'It provides a standard format; ensure it matches your company’s statutory fields before official use.',
      },
    ],
  },
  {
    slug: 'resignation-letter-generator',
    name: 'Resignation Calculator & Letter Generator',
    description:
      'Calculate your last working day and generate a professional resignation letter.',
    explanation: [
      'Add your notice period to the start date (optionally skipping weekends and holidays) to find your last working day, then fill in your details to generate a clean resignation letter you can download as text or PDF.',
    ],
    category: 'documents',
    priority: 'P1',
    keywords: ['resignation letter', 'last working day calculator', 'notice period'],
    titleValueProp: 'Calculate Notice & Write a Resignation Letter',
    componentKey: 'resignation-letter',
    status: 'coming-soon',
    relatedSlugs: ['rent-agreement-generator', 'salary-slip-generator'],
    faqs: [
      {
        question: 'Does it account for weekends?',
        answer:
          'You can choose whether the notice period counts calendar days or working days (skipping weekends).',
      },
    ],
  },

  // ------------------------------------------------------------------- seo
  {
    slug: 'robots-sitemap-validator',
    name: 'Robots.txt & Sitemap Validator',
    description:
      'Validate robots.txt rules and XML sitemaps against the protocol specs.',
    explanation: [
      'Paste a robots.txt or a sitemap URL (fetched through a server proxy to avoid CORS) to check syntax, flag common mistakes and confirm required directives. The sitemap validator checks XML structure against the sitemap protocol.',
    ],
    category: 'seo',
    priority: 'P1',
    keywords: ['robots.txt validator', 'sitemap validator', 'seo tools'],
    titleValueProp: 'Validate robots.txt & Sitemaps',
    componentKey: 'robots-sitemap-validator',
    status: 'coming-soon',
    relatedSlugs: ['meta-tag-preview', 'broken-link-checker'],
    faqs: [
      {
        question: 'Does it fetch my live file?',
        answer:
          'Yes, URL fetching goes through a server-side proxy to avoid browser CORS restrictions.',
      },
    ],
  },
  {
    slug: 'meta-tag-preview',
    name: 'Meta Tag Preview Tool',
    description:
      'Preview how your page looks on Google, Facebook and Twitter from its meta tags.',
    explanation: [
      'Paste raw meta tags or a URL (fetched server-side) to render pixel-aware previews of a Google search result, Facebook share and Twitter/X card. It flags missing or too-long titles and descriptions.',
    ],
    category: 'seo',
    priority: 'P1',
    keywords: ['meta tag preview', 'google SERP preview', 'open graph checker'],
    titleValueProp: 'Preview Meta Tags on Google & Social',
    componentKey: 'meta-tag-preview',
    status: 'coming-soon',
    relatedSlugs: ['robots-sitemap-validator', 'broken-link-checker'],
    faqs: [
      {
        question: 'What is an ideal meta description length?',
        answer:
          'Around 150-160 characters to avoid truncation in Google results.',
      },
    ],
  },
  {
    slug: 'broken-link-checker',
    name: 'Broken Link Checker',
    description:
      'Check a single page for broken outbound links and get a status report.',
    explanation: [
      'Submit a page URL. A server route fetches the HTML, extracts all anchor links and checks each with a concurrency limit and timeout, returning a table of HTTP statuses (200, 301, 404, timeout). To stay within function timeouts the check is capped at the first 50 links per page.',
    ],
    category: 'seo',
    priority: 'P1',
    keywords: ['broken link checker', 'dead link checker', 'seo audit'],
    titleValueProp: 'Find Broken Links on a Page',
    componentKey: 'broken-link-checker',
    status: 'coming-soon',
    relatedSlugs: ['robots-sitemap-validator', 'meta-tag-preview'],
    faqs: [
      {
        question: 'How many links does it check?',
        answer:
          'It checks the first 50 links per page to stay within server timeouts, and notes this in the UI.',
      },
      {
        question: 'Why does it run server-side?',
        answer:
          'Checking links requires outbound HTTP requests across domains, which browsers block via CORS.',
      },
    ],
  },
];

// ---- Derived lookups -------------------------------------------------------

export const TOOLS_REGISTRY: ToolDef[] = TOOLS;

export const TOOL_BY_SLUG: Record<string, ToolDef> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
);

export function getToolBySlug(slug: string): ToolDef | undefined {
  return TOOL_BY_SLUG[slug];
}

export function getToolsByCategory(categoryId: string): ToolDef[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function getLiveTools(): ToolDef[] {
  return TOOLS.filter((t) => t.status === 'live');
}

export function getRelatedTools(slug: string): ToolDef[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolDef => Boolean(t));
}

/** P0 MVP order (used for homepage "popular" list and build sequencing). */
export const POPULAR_SLUGS: string[] = [
  'old-vs-new-tax-regime-calculator',
  'emi-calculator',
  'sip-calculator',
  'word-counter',
  'upi-qr-generator',
  'password-generator',
  'age-calculator',
  'csv-json-xml-converter',
];

export function getPopularTools(): ToolDef[] {
  return POPULAR_SLUGS.map((s) => getToolBySlug(s)).filter(
    (t): t is ToolDef => Boolean(t),
  );
}

export const TOOL_STATS = {
  total: TOOLS.length,
  live: TOOLS.filter((t) => t.status === 'live').length,
  comingSoon: TOOLS.filter((t) => t.status === 'coming-soon').length,
};

export type { ToolDef, ToolStatus };
