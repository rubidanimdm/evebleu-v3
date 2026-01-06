-- Create audit_logs table for tracking admin actions
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only owners and admins can view audit logs
CREATE POLICY "Owners and admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('owner', 'manager')
  )
);

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Create service_availability table for calendar management
CREATE TABLE public.service_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_item_id uuid NOT NULL REFERENCES public.catalog_items(id) ON DELETE CASCADE,
  date date NOT NULL,
  is_available boolean NOT NULL DEFAULT true,
  capacity integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(catalog_item_id, date)
);

-- Enable RLS on service_availability
ALTER TABLE public.service_availability ENABLE ROW LEVEL SECURITY;

-- Admins can manage availability
CREATE POLICY "Admins can manage service availability"
ON public.service_availability FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Authenticated users can view availability
CREATE POLICY "Users can view availability"
ON public.service_availability FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Service role full access
CREATE POLICY "Service role full access service_availability"
ON public.service_availability FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create pricing_rules table for seasonal/dynamic pricing
CREATE TABLE public.pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_item_id uuid NOT NULL REFERENCES public.catalog_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  rule_type text NOT NULL CHECK (rule_type IN ('seasonal', 'day_of_week', 'early_bird', 'last_minute', 'volume')),
  start_date date,
  end_date date,
  days_of_week integer[],
  price_modifier_type text NOT NULL CHECK (price_modifier_type IN ('percentage', 'fixed')),
  price_modifier_value numeric NOT NULL,
  min_advance_days integer,
  max_advance_days integer,
  min_quantity integer,
  priority integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on pricing_rules
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

-- Admins can manage pricing rules
CREATE POLICY "Admins can manage pricing rules"
ON public.pricing_rules FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Users can view active pricing rules
CREATE POLICY "Users can view active pricing rules"
ON public.pricing_rules FOR SELECT
USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role full access pricing_rules"
ON public.pricing_rules FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create service_media table for image management
CREATE TABLE public.service_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_item_id uuid NOT NULL REFERENCES public.catalog_items(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt_text text,
  is_primary boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on service_media
ALTER TABLE public.service_media ENABLE ROW LEVEL SECURITY;

-- Admins can manage media
CREATE POLICY "Admins can manage service media"
ON public.service_media FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Everyone can view media
CREATE POLICY "Everyone can view service media"
ON public.service_media FOR SELECT
USING (true);

-- Service role full access
CREATE POLICY "Service role full access service_media"
ON public.service_media FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add new columns to catalog_items for enhanced functionality
ALTER TABLE public.catalog_items 
ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES public.suppliers(id),
ADD COLUMN IF NOT EXISTS min_people integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_people integer,
ADD COLUMN IF NOT EXISTS duration_minutes integer,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS cancellation_policy text,
ADD COLUMN IF NOT EXISTS deposit_percent numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS operating_hours jsonb;

-- Add VIP flag and internal notes to profiles_public
ALTER TABLE public.profiles_public
ADD COLUMN IF NOT EXISTS is_vip boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Create function to check if user is owner
CREATE OR REPLACE FUNCTION public.is_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'owner')
$$;

-- Update is_admin function to include owner role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'manager') 
      OR public.has_role(_user_id, 'staff')
      OR public.has_role(_user_id, 'owner')
$$;

-- Create trigger for updated_at on new tables
CREATE TRIGGER update_service_availability_updated_at
BEFORE UPDATE ON public.service_availability
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_pricing_rules_updated_at
BEFORE UPDATE ON public.pricing_rules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();