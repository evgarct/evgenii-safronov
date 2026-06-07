import { ContentList } from "@/components/content-list";
import { listPublished } from "@/lib/content";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await listPublished("project");
  return (
    <div className="page-shell py-16 sm:py-24">
      <p className="eyebrow">Selected work</p>
      <div className="mt-5 mb-16 grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
        <h1 className="text-6xl font-semibold tracking-[-0.06em] sm:text-8xl">
          Projects.
        </h1>
        <p className="max-w-md text-lg leading-7 text-muted-foreground">
          Product experiments and systems shaped around clarity, useful
          constraints, and durable implementation.
        </p>
      </div>
      <ContentList items={projects} basePath="/projects" />
    </div>
  );
}
