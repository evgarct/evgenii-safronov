import { demoContent } from "@/lib/demo-content";
import type {
  ContentInput,
  ContentItem,
  ContentKind,
  ContentStatus,
} from "@/lib/content-types";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

export async function listPublished(kind?: ContentKind) {
  if (!supabaseConfigured) {
    return demoContent
      .filter((item) => item.status === "published" && (!kind || item.kind === kind))
      .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("content")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (kind) query = query.eq("kind", kind);
  const { data, error } = await query;
  if (error) throw error;
  return data as ContentItem[];
}

export async function getPublishedBySlug(kind: ContentKind, slug: string) {
  if (!supabaseConfigured) {
    return (
      demoContent.find(
        (item) =>
          item.kind === kind &&
          item.slug === slug &&
          item.status === "published",
      ) ?? null
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("kind", kind)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data as ContentItem | null;
}

export async function listAllContent(status?: ContentStatus) {
  if (!supabaseConfigured || !process.env.SUPABASE_SECRET_KEY) {
    return status ? demoContent.filter((item) => item.status === status) : demoContent;
  }

  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from("content")
    .select("*")
    .order("updated_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data as ContentItem[];
}

export async function getContentById(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as ContentItem;
}

export async function createContent(input: ContentInput) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content")
    .insert({ ...input, status: "draft" })
    .select()
    .single();
  if (error) throw error;
  return data as ContentItem;
}

export async function updateContent(
  id: string,
  patch: Partial<ContentInput>,
  source: string,
) {
  const supabase = createSupabaseAdminClient();
  const current = await getContentById(id);
  const { error: revisionError } = await supabase.from("content_revisions").insert({
    content_id: id,
    snapshot: current,
    source,
  });
  if (revisionError) throw revisionError;

  const { data, error } = await supabase
    .from("content")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ContentItem;
}

export async function setContentStatus(
  id: string,
  status: ContentStatus,
  source: string,
) {
  const publishedAt = status === "published" ? new Date().toISOString() : null;
  const supabase = createSupabaseAdminClient();
  const current = await getContentById(id);
  const { error: revisionError } = await supabase.from("content_revisions").insert({
    content_id: id,
    snapshot: current,
    source,
  });
  if (revisionError) throw revisionError;

  const { data, error } = await supabase
    .from("content")
    .update({
      status,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ContentItem;
}
