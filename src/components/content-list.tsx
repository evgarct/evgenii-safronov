import Link from "next/link";
import { ArrowUpRight, FolderOpen, Newspaper } from "lucide-react";
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
      <div className="rounded-xl border py-12 text-center text-muted-foreground">
        Nothing published here yet.
      </div>
    );
  }

  const Icon = basePath === "/projects" ? FolderOpen : Newspaper;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`${basePath}/${item.slug}`}
          className="group flex items-start gap-4 rounded-xl border bg-card/40 p-4 transition-colors hover:border-primary/50 hover:bg-muted/40 sm:items-center sm:gap-5 sm:p-5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
            <Icon className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-medium tracking-tight sm:text-xl">
              {item.title}
            </span>
            <span className="mt-1 block max-w-2xl truncate text-sm leading-6 text-muted-foreground sm:whitespace-normal">
              {item.summary}
            </span>
          </span>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
