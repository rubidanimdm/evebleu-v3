-- Make catalog-images bucket private and update storage policy to require authentication
UPDATE storage.buckets SET public = false WHERE id = 'catalog-images';

-- Drop existing permissive policy
DROP POLICY IF EXISTS "Anyone can view catalog images" ON storage.objects;

-- Create policy requiring authentication
CREATE POLICY "Authenticated users can view catalog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog-images' AND auth.role() = 'authenticated');