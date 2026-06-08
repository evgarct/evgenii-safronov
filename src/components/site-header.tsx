import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ThemeSelector } from "@/components/theme-selector";

const nav = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Writing", "/blog"],
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-[var(--navigation-background)]/88 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight">ES</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Product engineer
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-7">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="hidden text-[var(--navigation-foreground)] transition-colors hover:text-[var(--navigation-active)] sm:inline"
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:isafronovms@gmail.com"
            className="hidden items-center gap-1 font-medium sm:flex"
          >
            Contact <ArrowUpRight className="size-3.5" />
          </a>
          <ThemeSelector />
        </nav>
      </div>
    </header>
  );
}
