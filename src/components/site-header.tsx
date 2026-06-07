import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const nav = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Writing", "/blog"],
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight">ES</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Product engineer
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm sm:gap-7">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:isafronovms@gmail.com"
            className="flex items-center gap-1 font-medium"
          >
            Contact <ArrowUpRight className="size-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
