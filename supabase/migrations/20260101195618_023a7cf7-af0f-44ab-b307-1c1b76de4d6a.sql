-- Create storage bucket for catalog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('catalog-images', 'catalog-images', true);

-- Storage policies for catalog images
CREATE POLICY "Anyone can view catalog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog-images');

CREATE POLICY "Admins can upload catalog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'catalog-images' 
  AND public.is_admin_user(auth.uid())
);

CREATE POLICY "Admins can update catalog images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'catalog-images' 
  AND public.is_admin_user(auth.uid())
);

CREATE POLICY "Admins can delete catalog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'catalog-images' 
  AND public.is_admin_user(auth.uid())
);

-- Create catalog_items table
CREATE TABLE public.catalog_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('DINING', 'TRANSPORT', 'HOTEL', 'FLIGHT', 'CLUB', 'EXPERIENCE')),
  title TEXT NOT NULL,
  image_url TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'AED',
  pricing_unit TEXT NOT NULL DEFAULT 'per day',
  short_description TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

-- Anyone can view active items
CREATE POLICY "Anyone can view active catalog items"
ON public.catalog_items FOR SELECT
USING (is_active = true);

-- Admins can view all items (including inactive)
CREATE POLICY "Admins can view all catalog items"
ON public.catalog_items FOR SELECT
USING (public.is_admin_user(auth.uid()));

-- Admins can manage catalog items
CREATE POLICY "Admins can insert catalog items"
ON public.catalog_items FOR INSERT
WITH CHECK (public.is_admin_user(auth.uid()));

CREATE POLICY "Admins can update catalog items"
ON public.catalog_items FOR UPDATE
USING (public.is_admin_user(auth.uid()));

CREATE POLICY "Admins can delete catalog items"
ON public.catalog_items FOR DELETE
USING (public.is_admin_user(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_catalog_items_updated_at
BEFORE UPDATE ON public.catalog_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Create index for category filtering
CREATE INDEX idx_catalog_items_category ON public.catalog_items(category);
CREATE INDEX idx_catalog_items_sort ON public.catalog_items(category, sort_order);