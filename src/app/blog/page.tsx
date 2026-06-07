import { ContentList } from "@/components/content-list";
import { listPublished } from "@/lib/content";

export const metadata = { title: "Writing" };

export default async function BlogPage() {
  const articles = await listPublished("article");
  return (
    <div className="page-shell py-16 sm:py-24">
      <p className="eyebrow">Writing</p>
      <div className="mt-5 mb-16 grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
        <h1 className="text-6xl font-semibold tracking-[-0.06em] sm:text-8xl">
          Field notes.
        </h1>
        <p className="max-w-md text-lg leading-7 text-muted-foreground">
          Working ideas about product engineering, interfaces, systems, and
          building with AI.
        </p>
      </div>
      <ContentList items={articles} basePath="/blog" />
    </div>
  );
}
