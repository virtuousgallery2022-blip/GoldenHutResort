create extension if not exists pgcrypto;

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 30),
  email text,
  arrival_date date,
  nights text,
  guests text,
  trip_type text,
  message text check (message is null or char_length(message) <= 2000),
  ip_hash text not null check (char_length(ip_hash) = 64),
  user_agent text
);

create index if not exists contact_inquiries_ip_created_idx
  on public.contact_inquiries (ip_hash, created_at desc);

alter table public.contact_inquiries enable row level security;

revoke all on table public.contact_inquiries from public;
revoke all on table public.contact_inquiries from anon, authenticated;
grant select, insert on table public.contact_inquiries to service_role;

comment on table public.contact_inquiries is 'Private contact submissions. Inserts are performed only by the server-side Netlify Function using the Supabase service role key.';
