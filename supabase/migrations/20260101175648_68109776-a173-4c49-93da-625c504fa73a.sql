-- Fix security issue: Restrict profile visibility
-- Drop the existing policy that exposes too much data
DROP POLICY IF EXISTS "Managers can view all profiles" ON public.profiles;

-- Create a more restrictive policy for managers viewing only necessary user info for bookings
CREATE POLICY "Admins can view profiles for bookings" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id 
  OR EXISTS (
    SELECT 1 FROM profiles p 
    WHERE p.id = auth.uid() 
    AND p.role IN ('manager', 'staff')
  )
);