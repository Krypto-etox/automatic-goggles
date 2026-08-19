# Coding Standards

## General
- TypeScript strict mode (`"strict": true` in tsconfig). No `any` unless
  justified with a comment.
- Functional components only, no class components.
- Prefer named exports for components; default export only for Next.js
  page/layout files (framework requirement).
- File naming: `kebab-case.tsx` for files, `PascalCase` for component names,
  `camelCase` for functions/variables, `SCREAMING_SNAKE_CASE` for true
  constants.

## Component Structure Convention
Every tool page follows this composition, no exceptions (keeps 35 tools
feeling like one product):

```tsx
// app/tools/finance/emi-calculator/page.tsx
export const metadata = generateToolMetadata("emi-calculator"); // from registry

export default function Page() {
  return (
    <ToolPageLayout tool={getToolBySlug("emi-calculator")}>
      <EmiCalculatorClient />   {/* "use client" component with all interactivity */}
    </ToolPageLayout>
  );
}
