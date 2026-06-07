import type { ContentItem } from "@/lib/content-types";

const now = "2026-06-07T12:00:00.000Z";

export const demoContent: ContentItem[] = [
  {
    id: "7d536477-cbe4-4d13-a4a2-d6274cb55a11",
    kind: "article",
    slug: "software-that-explains-itself",
    title: "Software that explains itself",
    summary:
      "Notes on building products whose structure, copy, and behavior reduce the need for documentation.",
    body_markdown: `Good software does more than expose functionality. It gives people enough context to form the right mental model.

## Start with the next decision

Every screen should make the next useful decision obvious. That does not mean reducing an interface to a single button. It means establishing hierarchy: what changed, what matters, and what can be done now.

## Treat states as product language

Loading, empty, error, and success states are not implementation debris. They are where a system explains its boundaries. A precise empty state can replace a page of onboarding copy.

## Build the explanation into the system

The strongest documentation is often a well-named action, a useful default, or a preview that makes consequences visible before they are committed.`,
    status: "published",
    seo_title: "Software that explains itself",
    seo_description:
      "Product engineering notes on interfaces, mental models, and useful defaults.",
    cover_image_url: null,
    featured: true,
    published_at: "2026-05-24T09:00:00.000Z",
    created_at: now,
    updated_at: now,
  },
  {
    id: "9e0ef3d1-33ef-454e-b789-7d4112a325c7",
    kind: "project",
    slug: "moniq",
    title: "Moniq",
    summary:
      "An experimental product focused on calm monitoring, clear signals, and operational decisions.",
    body_markdown:
      "Moniq explores how monitoring tools can surface the few signals that deserve attention without turning every screen into a dashboard mosaic.",
    status: "published",
    seo_title: "Moniq — selected work",
    seo_description: "A monitoring product experiment by Evgenii Safronov.",
    cover_image_url: null,
    featured: true,
    published_at: "2026-04-10T09:00:00.000Z",
    created_at: now,
    updated_at: now,
  },
  {
    id: "4096ed62-2f7a-4878-a585-dbe79c5ab2dd",
    kind: "project",
    slug: "srs-ninja",
    title: "SRS Ninja",
    summary:
      "A focused learning system for turning repetition into durable knowledge.",
    body_markdown:
      "SRS Ninja is a practical study workflow shaped around spaced repetition, review discipline, and low-friction capture.",
    status: "published",
    seo_title: "SRS Ninja — selected work",
    seo_description: "A spaced repetition product by Evgenii Safronov.",
    cover_image_url: null,
    featured: false,
    published_at: "2026-03-18T09:00:00.000Z",
    created_at: now,
    updated_at: now,
  },
  {
    id: "86abdd1f-0607-4a8a-aa15-26544c34b8d3",
    kind: "article",
    slug: "mcp-as-an-editorial-interface",
    title: "MCP as an editorial interface",
    summary:
      "Why a small, explicit tool surface can be a better publishing interface for an AI-assisted personal site.",
    body_markdown:
      "A draft exploring typed editorial operations, revision history, and deliberate publishing gates.",
    status: "draft",
    seo_title: null,
    seo_description: null,
    cover_image_url: null,
    featured: false,
    published_at: null,
    created_at: now,
    updated_at: now,
  },
];
