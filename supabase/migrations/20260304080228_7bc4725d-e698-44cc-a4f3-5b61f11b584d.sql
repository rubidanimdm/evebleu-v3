-- Allow anonymous users to view active catalog items
DROP POLICY IF EXISTS "Authenticated users can view active catalog items" ON public.catalog_items;
CREATE POLICY "Anyone can view active catalog items"
ON public.catalog_items
FOR SELECT
TO public
USING (is_active = true);

-- Allow anonymous users to view active suppliers
DROP POLICY IF EXISTS "Authenticated users can view active suppliers" ON public.suppliers;
CREATE POLICY "Anyone can view active suppliers"
ON public.suppliers
FOR SELECT
TO public
USING (is_active = true);
