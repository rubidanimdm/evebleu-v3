-- Add contact and social columns to catalog_items table
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS google_maps_url TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS logo_path TEXT;
