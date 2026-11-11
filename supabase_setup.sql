-- ==========================================================================
-- ImpactPulse | InAmigos Foundation
-- Central Cloud Database Setup (Supabase / PostgreSQL)
-- ==========================================================================
-- Instructions:
-- 1. Create a free project at https://supabase.com
-- 2. Open the SQL Editor in your Supabase dashboard
-- 3. Paste this entire script and click "RUN"
-- ==========================================================================

-- 1. VOLUNTEERS TABLE
create table if not exists public.volunteers (
  id text primary key,                     -- e.g. IAMG-VOL-8492
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  domain text not null,
  hours text default '4',
  motivation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast sorting by latest registrations first
create index if not exists idx_volunteers_created_at on public.volunteers (created_at desc);

-- 2. DONORS & PLEDGES TABLE
create table if not exists public.donations (
  id uuid default gen_random_uuid() primary key,
  receipt_no text not null,                -- e.g. IAMG-80G-481920
  donor_name text not null,
  donor_email text not null,
  donor_phone text,
  pan text,
  amount numeric not null check (amount > 0),
  frequency text default 'one-time',       -- 'one-time' or 'monthly'
  payment_method text default 'upi',       -- 'upi', 'card', 'netbanking'
  status text default 'pledged' check (status in ('pledged', 'verified')), -- Never marked verified without verification!
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast sorting by latest donations first
create index if not exists idx_donations_created_at on public.donations (created_at desc);

-- 3. ROW LEVEL SECURITY (RLS) CONFIGURATION
-- This ensures the public can SUBMIT registrations from any phone/device,
-- but personal details (phone, email, PAN) can ONLY be read by authenticated admins!

alter table public.volunteers enable row level security;
alter table public.donations enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow public registration insert" on public.volunteers;
drop policy if exists "Allow admin read volunteers" on public.volunteers;
drop policy if exists "Allow public donation insert" on public.donations;
drop policy if exists "Allow admin read donations" on public.donations;
drop policy if exists "Allow admin update donations" on public.donations;

-- PUBLIC POLICIES (Anyone on the internet can submit)
create policy "Allow public registration insert"
  on public.volunteers
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow public donation insert"
  on public.donations
  for insert
  to anon, authenticated
  with check (true);

-- ADMIN POLICIES (Only authenticated Admins can read or update data)
create policy "Allow admin read volunteers"
  on public.volunteers
  for select
  to authenticated
  using (true);

create policy "Allow admin read donations"
  on public.donations
  for select
  to authenticated
  using (true);

create policy "Allow admin update donations"
  on public.donations
  for update
  to authenticated
  using (true);

-- 4. REALTIME NOTIFICATIONS
-- Enable Realtime broadcasting so the Admin Dashboard updates automatically
-- when a new volunteer or donor registers from any device!
alter publication supabase_realtime add table public.volunteers;
alter publication supabase_realtime add table public.donations;

-- Success confirmation message
select 'ImpactPulse database schema, RLS policies, and Realtime channels initialized successfully!' as result;
