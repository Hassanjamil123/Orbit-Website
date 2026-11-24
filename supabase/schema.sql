-- Orbit website storage. Run once in the Supabase SQL editor (or psql) for a new project.
-- Row-level security is enabled with NO policies: the public anon key can read or
-- write nothing. Only the server, using the service role key, can access these tables.

create table if not exists public.waitlist_signups (
  id               uuid primary key,
  email            text not null check (char_length(email) <= 254),
  created_at       timestamptz not null default now(),
  consent_version  text not null,
  consented_at     timestamptz not null,
  source           text not null default 'unknown',
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  referred_by      text,
  invite_status    text not null default 'waiting'
                   check (invite_status in ('waiting', 'invited', 'joined'))
);

create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));
create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at);

create table if not exists public.careers_interest (
  id               uuid primary key,
  name             text not null check (char_length(name) <= 120),
  email            text not null check (char_length(email) <= 254),
  role_area        text not null,
  availability     text not null,
  location         text not null default '',
  link             text not null default '',
  message          text not null check (char_length(message) <= 2000),
  created_at       timestamptz not null default now(),
  consent_version  text not null,
  consented_at     timestamptz not null,
  source           text not null default 'careers'
);

create unique index if not exists careers_interest_email_key
  on public.careers_interest (lower(email));

alter table public.waitlist_signups enable row level security;
alter table public.careers_interest enable row level security;

revoke all on public.waitlist_signups from anon, authenticated;
revoke all on public.careers_interest from anon, authenticated;
