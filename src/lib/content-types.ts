import { z } from "zod";

export const contentKinds = ["article", "project", "page"] as const;
export const contentStatuses = ["draft", "published", "archived"] as const;

export const contentInputSchema = z.object({
  kind: z.enum(contentKinds),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case slug"),
  title: z.string().min(3).max(160),
  summary: z.string().min(10).max(400),
  body_markdown: z.string().min(1),
  seo_title: z.string().max(70).nullable().optional(),
  seo_description: z.string().max(170).nullable().optional(),
  cover_image_url: z.string().url().nullable().optional(),
  featured: z.boolean().optional().default(false),
});

export const contentUpdateSchema = contentInputSchema.partial().extend({
  id: z.string().uuid(),
});

export type ContentKind = (typeof contentKinds)[number];
export type ContentStatus = (typeof contentStatuses)[number];
export type ContentInput = z.infer<typeof contentInputSchema>;

export type ContentItem = {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  summary: string;
  body_markdown: string;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  cover_image_url: string | null;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentRevision = {
  id: string;
  content_id: string;
  snapshot: ContentItem;
  source: string;
  created_at: string;
};
