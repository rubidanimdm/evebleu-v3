CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_blocks JSONB NOT NULL DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  category TEXT,
  tags TEXT[],
  layout_template TEXT DEFAULT 'standard',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (is_published = true);

-- Managers/staff full CRUD
CREATE POLICY "Managers can manage pages" ON pages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('manager', 'staff'))
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_pages_updated_at();
