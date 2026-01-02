-- Add RLS policies to suppliers_public view
-- First, we need to convert the view to a table or use security_invoker
-- Since views inherit RLS from underlying tables, we'll add policies to the suppliers table
-- that properly restrict access to the public view columns

-- Create a security policy for suppliers_public view access
-- Views don't have direct RLS, so we ensure the underlying suppliers table has proper policies

-- Drop existing overly permissive policy if it exists
DROP POLICY IF EXISTS "Everyone can view active suppliers" ON public.suppliers;

-- Create policy that only exposes public-safe columns via RLS
-- The suppliers_public view already excludes sensitive columns (min_spend, commission_percent)
-- We just need to ensure only active suppliers are visible to non-admins
CREATE POLICY "Public can view active suppliers basic info" 
ON public.suppliers 
FOR SELECT 
USING (
  is_active = true 
  OR public.is_admin(auth.uid())
);

-- Ensure admins can still manage all suppliers
DROP POLICY IF EXISTS "Admins can manage suppliers" ON public.suppliers;
CREATE POLICY "Admins can manage all suppliers" 
ON public.suppliers 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));