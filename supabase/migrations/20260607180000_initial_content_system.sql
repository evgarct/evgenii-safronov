create extension if not exists pgcrypto;

create type public.content_kind as enum ('article', 'project', 'page');
create type public.content_status as enum ('draft', 'published', 'archived');

create table public.content (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 10 and 400),
  body_markdown text not null,
  status public.content_status not null default 'draft',
  seo_title text check (seo_title is null or char_length(seo_title) <= 70),
  seo_description text check (seo_description is null or char_length(seo_description) <= 170),
  cover_image_url text,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, slug)
);

create index content_published_idx
  on public.content (kind, published_at desc)
  where status = 'published';

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content(id) on delete cascade,
  snapshot jsonb not null,
  source text not null check (source in ('mcp', 'admin', 'migration')),
  created_at timestamptz not null default now()
);

create index content_revisions_content_id_idx
  on public.content_revisions (content_id, created_at desc);

alter table public.content enable row level security;
alter table public.content_revisions enable row level security;

grant select on public.content to anon, authenticated;
grant select, insert, update, delete on public.content to authenticated;
grant select, insert on public.content_revisions to authenticated;

create policy "Published content is public"
  on public.content for select
  to anon
  using (status = 'published');

create policy "Authenticated visitors can read published content"
  on public.content for select
  to authenticated
  using (
    status = 'published'
    or lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com'
  );

create policy "Owner can create content"
  on public.content for insert
  to authenticated
  with check (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com');

create policy "Owner can update content"
  on public.content for update
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com');

create policy "Owner can delete content"
  on public.content for delete
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com');

create policy "Owner can read revisions"
  on public.content_revisions for select
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com');

create policy "Owner can create revisions"
  on public.content_revisions for insert
  to authenticated
  with check (lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com');

insert into storage.buckets (id, name, public)
values ('content-assets', 'content-assets', true)
on conflict (id) do update set public = excluded.public;

create policy "Public can read editorial assets"
  on storage.objects for select
  to public
  using (bucket_id = 'content-assets');

create policy "Owner can upload editorial assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'content-assets'
    and lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com'
  );

create policy "Owner can update editorial assets"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'content-assets'
    and lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com'
  )
  with check (
    bucket_id = 'content-assets'
    and lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com'
  );

create policy "Owner can delete editorial assets"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'content-assets'
    and lower(auth.jwt() ->> 'email') = 'isafronovms@gmail.com'
  );
