-- ============================================================
-- Power2Go.Energy – Milestone 1: Auth, Profiles, Addresses
-- Run this SQL in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. PROFILES TABLE
-- Connected to Supabase Auth via id = auth.users.id
-- Never stores passwords – Supabase Auth handles all credential management.
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null default '',
  email      text not null default '',
  phone      text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. ADDRESSES TABLE
-- Each row belongs to exactly one user via user_id.
create table public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  label       text not null default '',
  street      text not null default '',
  city        text not null default '',
  state       text not null default '',
  postal_code text not null default '',
  country     text not null default 'Pakistan',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. INDEXES
create index idx_addresses_user_id on public.addresses(user_id);

-- 4. UPDATED_AT TRIGGER FUNCTION
-- Automatically sets updated_at on row modification.
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_addresses_updated_at
  before update on public.addresses
  for each row execute function public.handle_updated_at();

-- 5. AUTO-CREATE PROFILE ON SIGNUP
-- When a new Auth user is created, a corresponding profile row is inserted
-- with data from the user's raw_user_meta_data (set during signup).
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. ROW LEVEL SECURITY (RLS)
-- Users can only access their own profile and addresses.
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;

-- Profiles: select/update own profile only
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Addresses: full CRUD on own addresses only
create policy "Users can view own addresses"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "Users can insert own addresses"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own addresses"
  on public.addresses for update
  using (auth.uid() = user_id);

create policy "Users can delete own addresses"
  on public.addresses for delete
  using (auth.uid() = user_id);
