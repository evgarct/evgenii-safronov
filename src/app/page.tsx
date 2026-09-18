import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ContentList } from "@/components/content-list";
import { Button } from "@/components/ui/button";
import { listPublished } from "@/lib/content";

export default async function Home() {
  const [articles, projects] = await Promise.all([
    listPublished("article"),
    listPublished("project"),
  ]);

  return (
    <>
      <section className="page-shell min-h-[calc(100svh-4rem)] py-12 sm:py-20">
        <div className="grid min-h-[65svh] content-between gap-16">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Staff Product Designer · Design Systems</p>
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              50.0755° N / 14.4378° E — Prague
            </p>
          </div>
          <div>
            <h1 className="font-heading max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)] font-medium leading-[0.92] tracking-tight">
              Evgenii Safronov
              <span className="text-primary">.</span>
            </h1>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_1.2fr] sm:items-end">
              <ArrowDownRight className="hidden size-12 text-muted-foreground sm:block" />
              <div className="max-w-xl">
                <p className="text-xl leading-8 tracking-tight text-foreground/80 sm:text-2xl">
                  I build the design systems, tokens, and AI-native workflows
                  that let teams ship trustworthy interfaces faster —
                  hands-on in Figma and in code, without losing craft.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/projects">
                      Selected work <ArrowUpRight />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about">About me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-4">
        <div className="grid gap-8 rounded-2xl border bg-card/40 p-8 sm:grid-cols-[0.8fr_1.2fr] sm:p-12">
          <p className="eyebrow">Working thesis</p>
          <p className="font-heading max-w-4xl text-2xl leading-snug tracking-tight text-foreground sm:text-4xl">
            The best design systems make hard systems legible — to people
            and to the AI tools now building on top of them.
          </p>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="font-heading mt-3 text-4xl font-medium tracking-tight">Projects</h2>
          </div>
          <Link href="/projects" className="editorial-link text-sm">
            View all
          </Link>
        </div>
        <ContentList items={projects.slice(0, 3)} basePath="/projects" />
      </section>

      <section className="page-shell pb-24 sm:pb-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Field notes</p>
            <h2 className="font-heading mt-3 text-4xl font-medium tracking-tight">Writing</h2>
          </div>
          <Link href="/blog" className="editorial-link text-sm">
            Browse archive
          </Link>
        </div>
        <ContentList items={articles.slice(0, 3)} basePath="/blog" />
      </section>
    </>
  );
}
