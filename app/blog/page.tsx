import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides & Blog',
  description:
    'Practical guides on Indian tax, investing, file conversion and getting the most out of ToolNest.',
};

export default function BlogPage() {
  return (
    <div className="container max-w-3xl py-16 text-center">
      <h1 className="text-3xl font-bold">Guides &amp; Blog</h1>
      <p className="mt-3 text-muted">
        Long-form guides are coming soon. In the meantime, explore the{' '}
        <a href="/tools" className="text-primary underline">
          tools
        </a>
        .
      </p>
    </div>
  );
}
