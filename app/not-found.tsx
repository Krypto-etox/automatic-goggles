import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex max-w-md flex-col items-center py-24 text-center">
      <p className="font-mono text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">
        That tool or page doesn’t exist — yet.
      </p>
      <Button asChild className="mt-6">
        <Link href="/tools">Browse all tools</Link>
      </Button>
    </div>
  );
}
