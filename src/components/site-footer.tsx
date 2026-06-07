import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="page-shell flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-foreground">Evgenii Safronov</p>
          <p>Prague · Building useful software.</p>
        </div>
        <div className="flex gap-5">
          <a href="https://github.com/evgarct">GitHub</a>
          <Link href="/feed.xml">RSS</Link>
          <Link href="/admin">Editor</Link>
        </div>
      </div>
    </footer>
  );
}
