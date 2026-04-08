-- v71 secure RLS + role system for Supabase
-- Run this in Supabase SQL editor.

-- 1) Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user','admin'))
);

-- 2) Auto-create profile when a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3) Lead tables
create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  source text,
  name text,
  phone text,
  requirement text,
  channel text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.seller_leads (
  id uuid primary key default gen_random_uuid(),
  source text,
  name text,
  phone text,
  brand text,
  model text,
  year text,
  hours text,
  location text,
  price text,
  notes text,
  channel text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.callback_requests (
  id uuid primary key default gen_random_uuid(),
  source text,
  name text,
  phone text,
  requirement text,
  status text default 'new',
  created_at timestamptz default now()
);

-- 4) Enable RLS
alter table public.profiles enable row level security;
alter table public.contact_leads enable row level security;
alter table public.seller_leads enable row level security;
alter table public.callback_requests enable row level security;

-- 5) Drop old policies if re-running
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_admin_select_all" on public.profiles;

drop policy if exists "contact_insert_public" on public.contact_leads;
drop policy if exists "contact_admin_select" on public.contact_leads;
drop policy if exists "contact_admin_update" on public.contact_leads;
drop policy if exists "contact_admin_delete" on public.contact_leads;

drop policy if exists "seller_insert_public" on public.seller_leads;
drop policy if exists "seller_admin_select" on public.seller_leads;
drop policy if exists "seller_admin_update" on public.seller_leads;
drop policy if exists "seller_admin_delete" on public.seller_leads;

drop policy if exists "callback_insert_public" on public.callback_requests;
drop policy if exists "callback_admin_select" on public.callback_requests;
drop policy if exists "callback_admin_update" on public.callback_requests;
drop policy if exists "callback_admin_delete" on public.callback_requests;

-- 6) Profiles policies
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_admin_select_all"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- 7) Public insert, admin-only read/update/delete
create policy "contact_insert_public"
on public.contact_leads
for insert
to anon, authenticated
with check (true);

create policy "contact_admin_select"
on public.contact_leads
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "contact_admin_update"
on public.contact_leads
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "contact_admin_delete"
on public.contact_leads
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "seller_insert_public"
on public.seller_leads
for insert
to anon, authenticated
with check (true);

create policy "seller_admin_select"
on public.seller_leads
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "seller_admin_update"
on public.seller_leads
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "seller_admin_delete"
on public.seller_leads
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "callback_insert_public"
on public.callback_requests
for insert
to anon, authenticated
with check (true);

create policy "callback_admin_select"
on public.callback_requests
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "callback_admin_update"
on public.callback_requests
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "callback_admin_delete"
on public.callback_requests
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- 8) Promote your admin user manually after signup/login:
-- replace THE_ADMIN_USER_UUID with your real auth user id
-- update public.profiles set role = 'admin' where id = 'THE_ADMIN_USER_UUID';

-- Helpful check:
-- select id, email, role from public.profiles order by email;
