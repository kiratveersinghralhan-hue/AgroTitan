-- v75 Supabase migration: public seller profiles + product image storage metadata
alter table public.profiles
  add column if not exists public_name text,
  add column if not exists phone text,
  add column if not exists district text,
  add column if not exists bio text,
  add column if not exists is_public_seller boolean default false,
  add column if not exists avatar_url text;
alter table public.seller_leads
  add column if not exists image_paths jsonb default '[]'::jsonb,
  add column if not exists public_slug text,
  add column if not exists is_public boolean default false;
create unique index if not exists idx_seller_leads_public_slug on public.seller_leads(public_slug) where public_slug is not null;
create index if not exists idx_profiles_public_seller on public.profiles(is_public_seller);
create index if not exists idx_seller_leads_is_public on public.seller_leads(is_public);
drop policy if exists "profiles_public_seller_select" on public.profiles;
create policy "profiles_public_seller_select" on public.profiles for select to anon, authenticated using (is_public_seller = true);
drop policy if exists "profiles_update_own_extended" on public.profiles;
create policy "profiles_update_own_extended" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "seller_public_select_approved" on public.seller_leads;
create policy "seller_public_select_approved" on public.seller_leads for select to anon, authenticated using (is_public = true and listing_stage = 'approved');
drop policy if exists "seller_owner_select_own" on public.seller_leads;
create policy "seller_owner_select_own" on public.seller_leads for select to authenticated using (user_id = auth.uid() or user_email = auth.email());
drop policy if exists "seller_owner_update_pending" on public.seller_leads;
create policy "seller_owner_update_pending" on public.seller_leads for update to authenticated using (user_id = auth.uid() or user_email = auth.email()) with check (user_id = auth.uid() or user_email = auth.email());
