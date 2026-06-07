import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/lib/content-types";

export function ContentList({
  items,
  basePath,
}: {
  items: ContentItem[];
  basePath: "/blog" | "/projects";
}) {
  if (!items.length) {
    return (
      <div className="border-y py-12 text-muted-foreground">
        Nothing published here yet.
      </div>
    );
  }

  return (
    <div className="border-t">
      {items.map((item, index) => (
        <Link
          key={item.id}
          href={`${basePath}/${item.slug}`}
          className="group grid gap-3 border-b py-7 transition-colors hover:bg-muted/35 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:px-3"
        >
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="block text-xl font-medium tracking-tight sm:text-2xl">
              {item.title}
            </span>
            <span className="mt-2 block max-w-2xl text-sm leading-6 text-muted-foreground">
              {item.summary}
            </span>
          </span>
          <ArrowUpRight className="mt-1 size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
