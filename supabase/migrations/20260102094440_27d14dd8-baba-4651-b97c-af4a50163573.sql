-- Fix profiles table security - restrict users to their own profile only
-- The legacy profiles table contains PII and needs proper access control

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add policy for users to view their own profile only
CREATE POLICY "Users can view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Add policy for users to update their own profile only
CREATE POLICY "Users can update own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Add policy for managers to view all profiles (for admin features)
CREATE POLICY "Managers can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_manager(auth.uid()));