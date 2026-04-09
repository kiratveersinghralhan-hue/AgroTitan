-- v74 migration for seller listing edit + image upload + approval workflow
alter table public.seller_leads
  add column if not exists user_email text,
  add column if not exists user_id uuid,
  add column if not exists image_urls jsonb default '[]'::jsonb,
  add column if not exists listing_stage text default 'pending',
  add column if not exists admin_notes text;
create index if not exists idx_seller_leads_user_email on public.seller_leads(user_email);
create index if not exists idx_seller_leads_user_id on public.seller_leads(user_id);
create index if not exists idx_seller_leads_listing_stage on public.seller_leads(listing_stage);
