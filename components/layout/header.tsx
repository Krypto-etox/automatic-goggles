import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchCommand } from './search-dialog';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/tools/categories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Logo />
        <nav className="mx-4 hidden items-center gap-1 lg:flex">
          {CATEGORIES.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={`/tools/${c.slug}`}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-accent hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-accent hover:text-foreground">
                More
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {CATEGORIES.slice(5).map((c) => (
                <DropdownMenuItem key={c.id} asChild>
                  <Link href={`/tools/${c.slug}`}>{c.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="ml-auto flex flex-1 items-center justify-end gap-2 md:flex-none">
          <div className="hidden md:block md:w-64">
            <SearchCommand />
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {CATEGORIES.map((c) => (
                <DropdownMenuItem key={c.id} asChild>
                  <Link href={`/tools/${c.slug}`}>{c.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
