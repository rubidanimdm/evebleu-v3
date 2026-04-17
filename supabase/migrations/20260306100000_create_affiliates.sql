-- Affiliates table for partners (concierges, tour operators, promoters, hotel partners)
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  type TEXT NOT NULL DEFAULT 'concierge' CHECK (type IN ('concierge', 'tour_operator', 'promoter', 'hotel_partner')),
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  commission_rate NUMERIC(5,2) DEFAULT 0,
  commission_type TEXT NOT NULL DEFAULT 'percentage' CHECK (commission_type IN ('percentage', 'fixed')),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  total_earned NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- Staff/manager full CRUD
CREATE POLICY "Admin full access to affiliates"
  ON public.affiliates FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- Public can read active affiliates
CREATE POLICY "Public read active affiliates"
  ON public.affiliates FOR SELECT
  TO authenticated
  USING (is_active = true);
