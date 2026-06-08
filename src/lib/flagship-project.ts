import type { ContentItem } from "@/lib/content-types";

export const flagshipProjectSlug = "design-system-knowledge-platform";

export const flagshipProject: ContentItem = {
  id: "e52f9296-7fe2-4cdb-954e-febf920c43e7",
  kind: "project",
  slug: flagshipProjectSlug,
  title: "Design System Knowledge Platform",
  summary:
    "How I transformed a design system from passive documentation into an active decision layer for AI agents, designers, and product teams.",
  body_markdown:
    "This flagship project uses a dedicated case-study layout instead of the generic Markdown renderer.",
  status: "published",
  seo_title: "Design System Knowledge Platform",
  seo_description:
    "A design systems and AI case study about machine-readable knowledge, token-aware MCP tools, agent-guided prototyping, and organizational adoption.",
  cover_image_url: null,
  featured: true,
  published_at: "2026-06-08T09:00:00.000Z",
  created_at: "2026-06-08T09:00:00.000Z",
  updated_at: "2026-06-08T09:00:00.000Z",
};

function publishedAtTimestamp(value: ContentItem["published_at"] | Date) {
  if (!value) return 0;
  const timestamp = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function mergeFlagshipProject(items: ContentItem[]) {
  return [
    flagshipProject,
    ...items.filter(
      (item) =>
        !(
          item.kind === flagshipProject.kind &&
          item.slug === flagshipProject.slug
        ),
    ),
  ].sort(
    (a, b) =>
      publishedAtTimestamp(b.published_at) -
      publishedAtTimestamp(a.published_at),
  );
}
