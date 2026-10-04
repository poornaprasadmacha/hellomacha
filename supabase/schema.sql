create table if not exists public.article_comments (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null
    check (char_length(article_slug) between 1 and 120),
  display_name text not null
    check (char_length(btrim(display_name)) between 1 and 60),
  content text not null
    check (char_length(btrim(content)) between 1 and 2000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists article_comments_approved_by_slug_created_at
  on public.article_comments (article_slug, created_at desc)
  where status = 'approved';

alter table public.article_comments enable row level security;

revoke all on public.article_comments from anon, authenticated;
grant select on public.article_comments to anon, authenticated;
grant insert (article_slug, display_name, content)
  on public.article_comments to anon, authenticated;

drop policy if exists "Anyone can read approved article comments"
  on public.article_comments;
create policy "Anyone can read approved article comments"
  on public.article_comments
  for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "Anyone can submit pending article comments"
  on public.article_comments;
create policy "Anyone can submit pending article comments"
  on public.article_comments
  for insert
  to anon, authenticated
  with check (status = 'pending');
