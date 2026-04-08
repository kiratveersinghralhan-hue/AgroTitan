# v71 Supabase Auth + secure RLS role system

## What this version adds
- Admin login page
- Admin dashboard requires login
- Admin dashboard checks `profiles.role = 'admin'`
- SQL for secure RLS in `SUPABASE_RLS.sql`

## Setup steps

### 1. Keep your `backend-config.js` filled with:
- Supabase project URL
- anon key

### 2. In Supabase Auth
Create the admin user from:
- Authentication > Users
or sign up through your login flow.

### 3. Run `SUPABASE_RLS.sql`
This creates:
- `profiles`
- trigger to auto-create a profile on signup
- RLS policies for:
  - `profiles`
  - `contact_leads`
  - `seller_leads`
  - `callback_requests`

### 4. Promote your admin user
After your user exists, run:
```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

### 5. Test
- Open `admin-login.html`
- login with the admin user
- open `admin-dashboard.html`
- non-admin users should be blocked

## Security model
- Public users can submit leads
- Only authenticated admins can read/update/delete leads
- Users can read/update only their own profile
- Admins can read all profiles

## Next best step
- protect admin links in UI
- add session-aware header state
- add password reset flow
