-- Add enhanced columns to suppliers table
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS default_commission_split INTEGER DEFAULT 50;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS supplier_type TEXT DEFAULT 'direct_venue'
  CHECK (supplier_type IN ('direct_venue', 'concierge_intermediary', 'driver', 'tour_operator'));
