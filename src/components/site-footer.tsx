import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="page-shell flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-base font-medium text-foreground">
            {siteConfig.name}
          </p>
          <p>{`${siteConfig.location} — building useful software.`}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.github}>GitHub</a>
          <Link href={siteConfig.resumeHref}>Resume</Link>
          <Link href="/feed.xml">RSS</Link>
          <Link href="/admin">Editor</Link>
        </div>
      </div>
    </footer>
  );
}
