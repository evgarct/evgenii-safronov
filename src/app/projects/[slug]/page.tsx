import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getPublishedBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublishedBySlug("project", slug);
  if (!project) notFound();

  return (
    <article className="page-shell py-16 sm:py-24">
      <header className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="eyebrow">Selected work</p>
        <div>
          <h1 className="text-6xl font-semibold tracking-[-0.06em] sm:text-8xl">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">
            {project.summary}
          </p>
        </div>
      </header>
      <div className="mt-16 grid min-h-72 place-items-center border-y bg-foreground p-8 text-background">
        <p className="max-w-2xl text-center text-3xl font-medium tracking-tight sm:text-5xl">
          {project.title}
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-3xl">
        <Markdown>{project.body_markdown}</Markdown>
      </div>
    </article>
  );
}
