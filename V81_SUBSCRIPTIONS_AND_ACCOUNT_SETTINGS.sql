-- v81 subscriptions, badges, and extended account settings

alter table public.profiles
  add column if not exists gender text,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists country text,
  add column if not exists profile_photo_url text,
  add column if not exists account_badge text default 'Member',
  add column if not exists subscription_plan text default 'free',
  add column if not exists subscription_status text default 'inactive',
  add column if not exists reward_points integer default 0,
  add column if not exists verified_seller boolean default false;

create table if not exists public.subscription_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  plan_code text,
  plan_name text,
  billing_cycle text default 'monthly',
  amount text,
  status text default 'new',
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  business_name text,
  notes text,
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.subscription_orders enable row level security;
alter table public.verification_requests enable row level security;

drop policy if exists "subscription_insert_public" on public.subscription_orders;
drop policy if exists "subscription_select_own_or_admin" on public.subscription_orders;
drop policy if exists "subscription_admin_update" on public.subscription_orders;
drop policy if exists "verification_insert_public" on public.verification_requests;
drop policy if exists "verification_select_own_or_admin" on public.verification_requests;
drop policy if exists "verification_admin_update" on public.verification_requests;

create policy "subscription_insert_public"
on public.subscription_orders
for insert
to anon, authenticated
with check (true);

create policy "subscription_select_own_or_admin"
on public.subscription_orders
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "subscription_admin_update"
on public.subscription_orders
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

create policy "verification_insert_public"
on public.verification_requests
for insert
to anon, authenticated
with check (true);

create policy "verification_select_own_or_admin"
on public.verification_requests
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "verification_admin_update"
on public.verification_requests
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

create index if not exists idx_subscription_orders_user_id on public.subscription_orders(user_id);
create index if not exists idx_verification_requests_user_id on public.verification_requests(user_id);
