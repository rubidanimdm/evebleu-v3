-- Clean up remaining old permissive policies on suppliers
DROP POLICY IF EXISTS "Anyone can view active suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Public can view active suppliers basic info" ON public.suppliers;

-- Clean up remaining old permissive policies on catalog_items  
DROP POLICY IF EXISTS "Anyone can view active catalog items" ON public.catalog_items;

-- Also clean up duplicate admin policies on catalog_items
DROP POLICY IF EXISTS "Admins can delete catalog items" ON public.catalog_items;
DROP POLICY IF EXISTS "Admins can insert catalog items" ON public.catalog_items;
DROP POLICY IF EXISTS "Admins can update catalog items" ON public.catalog_items;
DROP POLICY IF EXISTS "Admins can view all catalog items" ON public.catalog_items;