-- Fix the profiles RLS policy that has a potential vulnerability
-- Drop the problematic policy and recreate with proper scoping

DROP POLICY IF EXISTS "Admins can view profiles for bookings" ON public.profiles;

-- Recreate with explicit AND condition to ensure proper role checking
CREATE POLICY "Admins can view all customer profiles" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id 
  OR 
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('manager', 'staff')
);

-- Add explicit restrictive policy for customer_notes to ensure non-admins cannot access
-- First check if we need to update the existing policy
DROP POLICY IF EXISTS "Admins can manage customer notes" ON public.customer_notes;

CREATE POLICY "Only admins can manage customer notes" 
ON public.customer_notes 
FOR ALL 
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('manager', 'staff')
)
WITH CHECK (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('manager', 'staff')
);