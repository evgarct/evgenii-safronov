import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getPublishedBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedBySlug("article", slug);
  if (!article) return {};
  return {
    title: article.seo_title ?? article.title,
    description: article.seo_description ?? article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedBySlug("article", slug);
  if (!article) notFound();

  return (
    <article className="page-shell py-16 sm:py-24">
      <header className="mx-auto max-w-4xl">
        <p className="eyebrow">
          Field note ·{" "}
          {article.published_at
            ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                new Date(article.published_at),
              )
            : ""}
        </p>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl">
          {article.title}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">
          {article.summary}
        </p>
      </header>
      <div className="mx-auto mt-16 max-w-3xl border-t pt-10">
        <Markdown>{article.body_markdown}</Markdown>
      </div>
    </article>
  );
}
