# Supabase setup for v69

This build is wired for Supabase, but you must paste your own project values.

## 1. Create or use your Supabase project
You need:
- Project URL
- anon public key

Paste them into `backend-config.js`.

## 2. Create these tables in Supabase SQL editor

```sql
create table if not exists contact_leads (
  id uuid primary key default gen_random_uuid(),
  source text,
  name text,
  phone text,
  requirement text,
  channel text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists seller_leads (
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

create table if not exists callback_requests (
  id uuid primary key default gen_random_uuid(),
  source text,
  name text,
  phone text,
  requirement text,
  status text default 'new',
  created_at timestamptz default now()
);
```

## 3. Enable Row Level Security carefully
For quick testing, you can create permissive policies first, then tighten later.

Example testing policy pattern:
```sql
alter table contact_leads enable row level security;
alter table seller_leads enable row level security;
alter table callback_requests enable row level security;
```

Then add insert/select/update/delete policies as needed.

## 4. Paste config in `backend-config.js`
Replace:
- `PASTE_SUPABASE_URL`
- `PASTE_SUPABASE_ANON_KEY`

## 5. Deploy
After valid credentials and tables are set, the site will use Supabase first and only fall back to local storage if Supabase fails.

## Important
This build does not yet include secure admin login.
Next best step:
- Supabase Auth
- protected admin routes
- admin-only policies
