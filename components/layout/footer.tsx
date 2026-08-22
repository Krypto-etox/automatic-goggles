import Link from 'next/link';
import { Logo } from './logo';
import { CATEGORIES } from '@/lib/tools/categories';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-surface/40">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{siteConfig.description}</p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All tools run in your browser wherever possible.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Categories</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/tools/${c.slug}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Tools</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/tools" className="text-muted hover:text-foreground">
                All tools
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="text-muted hover:text-foreground">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="/robots.txt" className="text-muted hover:text-foreground">
                Robots.txt
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-muted hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted hover:text-foreground">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-muted hover:text-foreground">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-muted md:flex-row">
          <p>
            Built with Next.js, TypeScript & Tailwind. No accounts, no paywalls.
          </p>
          <p>Not affiliated with any government body.</p>
        </div>
      </div>
    </footer>
  );
}
