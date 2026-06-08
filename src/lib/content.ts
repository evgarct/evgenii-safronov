import { demoContent } from "@/lib/demo-content";
import { databaseConfigured, getSql } from "@/lib/db";
import { flagshipProject, flagshipProjectSlug, mergeFlagshipProject } from "@/lib/flagship-project";
import type {
  ContentInput,
  ContentItem,
  ContentKind,
  ContentStatus,
} from "@/lib/content-types";

export async function listPublished(kind?: ContentKind) {
  if (!databaseConfigured) {
    const items = demoContent
      .filter((item) => item.status === "published" && (!kind || item.kind === kind))
      .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));
    return !kind || kind === "project" ? mergeFlagshipProject(items) : items;
  }

  const sql = getSql();
  const rows = kind
    ? await sql`
        select * from content
        where status = 'published' and kind = ${kind}
        order by published_at desc
      `
    : await sql`
        select * from content
        where status = 'published'
        order by published_at desc
      `;
  const items = rows as ContentItem[];
  return !kind || kind === "project" ? mergeFlagshipProject(items) : items;
}

export async function getPublishedBySlug(kind: ContentKind, slug: string) {
  if (kind === "project" && slug === flagshipProjectSlug) {
    return flagshipProject;
  }

  if (!databaseConfigured) {
    return (
      demoContent.find(
        (item) =>
          item.kind === kind &&
          item.slug === slug &&
          item.status === "published",
      ) ?? null
    );
  }

  const sql = getSql();
  const rows = await sql`
    select * from content
    where kind = ${kind} and slug = ${slug} and status = 'published'
    limit 1
  `;
  return (rows[0] as ContentItem | undefined) ?? null;
}

export async function listAllContent(status?: ContentStatus) {
  if (!databaseConfigured) {
    return status ? demoContent.filter((item) => item.status === status) : demoContent;
  }

  const sql = getSql();
  const rows = status
    ? await sql`
        select * from content
        where status = ${status}
        order by updated_at desc
      `
    : await sql`select * from content order by updated_at desc`;
  return rows as ContentItem[];
}

export async function getContentById(id: string) {
  const sql = getSql();
  const rows = await sql`select * from content where id = ${id} limit 1`;
  const item = rows[0] as ContentItem | undefined;
  if (!item) throw new Error("Content not found");
  return item;
}

export async function createContent(input: ContentInput) {
  const sql = getSql();
  const rows = await sql`
    insert into content (
      kind, slug, title, summary, body_markdown, status, seo_title,
      seo_description, cover_image_url, featured
    )
    values (
      ${input.kind}, ${input.slug}, ${input.title}, ${input.summary},
      ${input.body_markdown}, 'draft', ${input.seo_title ?? null},
      ${input.seo_description ?? null}, ${input.cover_image_url ?? null},
      ${input.featured ?? false}
    )
    returning *
  `;
  return rows[0] as ContentItem;
}

export async function updateContent(
  id: string,
  patch: Partial<ContentInput>,
  source: string,
) {
  const current = await getContentById(id);
  const next = { ...current, ...patch };
  const sql = getSql();
  const [, updated] = await sql.transaction([
    sql`select set_config('app.revision_source', ${source}, true)`,
    sql`
      update content
      set
        kind = ${next.kind},
        slug = ${next.slug},
        title = ${next.title},
        summary = ${next.summary},
        body_markdown = ${next.body_markdown},
        seo_title = ${next.seo_title},
        seo_description = ${next.seo_description},
        cover_image_url = ${next.cover_image_url},
        featured = ${next.featured},
        updated_at = now()
      where id = ${id}
      returning *
    `,
  ]);
  return updated[0] as ContentItem;
}

export async function setContentStatus(
  id: string,
  status: ContentStatus,
  source: string,
) {
  const publishedAt = status === "published" ? new Date().toISOString() : null;
  const sql = getSql();
  const [, updated] = await sql.transaction([
    sql`select set_config('app.revision_source', ${source}, true)`,
    sql`
      update content
      set status = ${status}, published_at = ${publishedAt}, updated_at = now()
      where id = ${id}
      returning *
    `,
  ]);
  return updated[0] as ContentItem;
}
