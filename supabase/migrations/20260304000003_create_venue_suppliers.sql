-- Create venue_suppliers junction table
CREATE TABLE IF NOT EXISTS venue_suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  catalog_item_id UUID REFERENCES catalog_items(id) ON DELETE CASCADE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  commission_split INTEGER DEFAULT 50,
  commission_type TEXT DEFAULT 'percentage' CHECK (commission_type IN ('percentage', 'fixed')),
  is_preferred BOOLEAN DEFAULT false,
  contact_name TEXT,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partial unique index: one preferred path per venue
CREATE UNIQUE INDEX IF NOT EXISTS idx_venue_suppliers_preferred
  ON venue_suppliers (catalog_item_id)
  WHERE is_preferred = true;

-- Enable RLS
ALTER TABLE venue_suppliers ENABLE ROW LEVEL SECURITY;

-- Admins can manage
CREATE POLICY "Admins can manage venue_suppliers"
  ON venue_suppliers
  FOR ALL
  USING (is_admin_current_user())
  WITH CHECK (is_admin_current_user());

-- Authenticated users can read
CREATE POLICY "Authenticated users can read venue_suppliers"
  ON venue_suppliers
  FOR SELECT
  TO authenticated
  USING (true);
