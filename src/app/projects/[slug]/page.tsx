import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignSystemKnowledgePlatformCase } from "@/components/design-system-knowledge-platform-case";
import { Markdown } from "@/components/markdown";
import { getPublishedBySlug } from "@/lib/content";
import { flagshipProjectSlug } from "@/lib/flagship-project";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedBySlug("project", slug);
  if (!project) return {};

  const title = project.seo_title ?? project.title;
  const description = project.seo_description ?? project.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublishedBySlug("project", slug);
  if (!project) notFound();

  if (slug === flagshipProjectSlug) {
    return <DesignSystemKnowledgePlatformCase />;
  }

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
