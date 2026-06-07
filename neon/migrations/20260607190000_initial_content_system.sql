create extension if not exists pgcrypto;

create type content_kind as enum ('article', 'project', 'page');
create type content_status as enum ('draft', 'published', 'archived');

create table content (
  id uuid primary key default gen_random_uuid(),
  kind content_kind not null,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 10 and 400),
  body_markdown text not null,
  status content_status not null default 'draft',
  seo_title text check (seo_title is null or char_length(seo_title) <= 70),
  seo_description text check (
    seo_description is null or char_length(seo_description) <= 170
  ),
  cover_image_url text,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, slug)
);

create index content_published_idx
  on content (kind, published_at desc)
  where status = 'published';

create table content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references content(id) on delete cascade,
  snapshot jsonb not null,
  source text not null check (
    source in ('mcp', 'admin', 'migration', 'database')
  ),
  created_at timestamptz not null default now()
);

create index content_revisions_content_id_idx
  on content_revisions (content_id, created_at desc);

create function preserve_content_revision()
returns trigger
language plpgsql
as $$
begin
  insert into content_revisions (content_id, snapshot, source)
  values (
    old.id,
    to_jsonb(old),
    coalesce(nullif(current_setting('app.revision_source', true), ''), 'database')
  );
  return new;
end;
$$;

create trigger content_revision_before_update
before update on content
for each row execute function preserve_content_revision();
