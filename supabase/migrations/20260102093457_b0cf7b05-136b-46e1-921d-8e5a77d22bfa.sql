-- Fix PUBLIC_SUPPLIER_DATA: Restrict suppliers access to authenticated users only
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can view active suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Public can view active suppliers basic info" ON public.suppliers;

-- Create new policy: Only authenticated users can view active suppliers
CREATE POLICY "Authenticated users can view active suppliers"
ON public.suppliers
FOR SELECT
TO authenticated
USING (is_active = true OR public.is_admin(auth.uid()));

-- Fix PUBLIC_CATALOG_PRICING: Restrict catalog_items access to authenticated users only
-- First enable RLS if not already enabled
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

-- Drop any existing public policies
DROP POLICY IF EXISTS "Anyone can view active catalog items" ON public.catalog_items;
DROP POLICY IF EXISTS "Public can view active catalog items" ON public.catalog_items;

-- Create policy: Only authenticated users can view active catalog items
CREATE POLICY "Authenticated users can view active catalog items"
ON public.catalog_items
FOR SELECT
TO authenticated
USING (is_active = true);

-- Create policy: Admins can manage all catalog items
CREATE POLICY "Admins can manage catalog items"
ON public.catalog_items
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Service role full access for edge functions
CREATE POLICY "Service role full access catalog_items"
ON public.catalog_items
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');