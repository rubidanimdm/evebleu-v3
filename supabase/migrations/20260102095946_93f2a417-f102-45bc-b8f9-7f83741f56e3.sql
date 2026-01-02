-- Security hardening for profiles and bookings tables
-- Adapted to work with existing app_role enum and helper functions

-- 1) Create is_admin() helper function (no-args version for convenience)
-- Uses SECURITY DEFINER to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin_current_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(auth.uid())
$$;

-- 2) PROFILES: Tighten RLS policies

-- First, drop existing policies that may be too permissive
DROP POLICY IF EXISTS "Users can view own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Managers can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can see their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;

-- User can SELECT own profile only
CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- User can INSERT only their own profile row
CREATE POLICY "profiles_insert_own"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- User can UPDATE only their own profile row
CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin/Manager can SELECT all profiles
CREATE POLICY "profiles_select_admin"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- 3) BOOKINGS: Tighten RLS policies

-- Drop existing policies
DROP POLICY IF EXISTS "Users can see their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Staff can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "bookings_select_own" ON public.bookings;
DROP POLICY IF EXISTS "bookings_insert_own" ON public.bookings;
DROP POLICY IF EXISTS "bookings_update_own" ON public.bookings;
DROP POLICY IF EXISTS "bookings_select_admin" ON public.bookings;

-- User can SELECT own bookings only
CREATE POLICY "bookings_select_own"
ON public.bookings
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- User can INSERT booking only for themselves
CREATE POLICY "bookings_insert_own"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- User can UPDATE only their own bookings
CREATE POLICY "bookings_update_own"
ON public.bookings
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin can SELECT all bookings
CREATE POLICY "bookings_select_admin"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));