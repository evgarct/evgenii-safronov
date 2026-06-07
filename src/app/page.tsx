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
        <div className="grid min-h-[70svh] content-between gap-16">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Independent product engineer</p>
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              50.0755° N / 14.4378° E
            </p>
          </div>
          <div>
            <h1 className="max-w-6xl text-[clamp(3.7rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Evgenii
              <br />
              <span className="text-primary">Safronov.</span>
            </h1>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_1.2fr] sm:items-end">
              <ArrowDownRight className="hidden size-12 text-muted-foreground sm:block" />
              <div className="max-w-xl">
                <p className="text-xl leading-8 tracking-tight text-foreground/80 sm:text-2xl">
                  I turn ambiguous product problems into clear interfaces,
                  reliable systems, and software people can understand.
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

      <section className="border-y bg-foreground text-background">
        <div className="page-shell grid gap-12 py-20 sm:grid-cols-[0.8fr_1.2fr] sm:py-28">
          <p className="eyebrow !text-background/55">Working thesis</p>
          <p className="max-w-4xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">
            The best products make hard systems feel legible without hiding
            their real complexity.
          </p>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Projects</h2>
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
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Writing</h2>
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
