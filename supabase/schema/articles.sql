-- Run this in your Supabase SQL Editor to create the articles table
-- This migrates article storage from the local filesystem to Supabase

create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text default '',
  content text not null,
  date timestamptz not null,
  thumbnail text default '/icon.png',
  author text default 'Sivarama Krishna',
  type text default 'article',
  reading_time integer default 1,
  geo_region text default 'IN-AP',
  geo_placename text default 'Andhra Pradesh, India',
  geo_position text default '14.4673;78.8242',
  seo_keywords jsonb default '[]'::jsonb,
  sources jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.articles enable row level security;

-- Policies: allow public read access (for article pages)
create policy "Articles are publicly readable"
  on public.articles for select
  using (true);

-- Policies: allow authenticated admin inserts (for article creation)
create policy "Admins can insert articles"
  on public.articles for insert
  with check (true);

-- Policies: allow authenticated admin updates
create policy "Admins can update articles"
  on public.articles for update
  using (true);

-- Policies: allow authenticated admin deletes
create policy "Admins can delete articles"
  on public.articles for delete
  using (true);

-- Indexes for performance
create index if not exists articles_slug_idx on public.articles(slug);
create index if not exists articles_date_idx on public.articles(date desc);
create index if not exists articles_type_idx on public.articles(type);

-- Trigger to auto-update updated_at
create or replace function public.update_updated_at_column()
returns void as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_articles_updated_at
  before update on public.articles
  for each row
  execute function public.update_updated_at_column();
