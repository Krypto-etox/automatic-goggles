import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="container max-w-3xl py-12 md:py-16">
      <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold">
        {children}
      </div>
    </article>
  );
}
