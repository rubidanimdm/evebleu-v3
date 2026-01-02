-- =====================================================
-- SECURE DATA ARCHITECTURE REFACTOR
-- Split sensitive data into service_role-only tables
-- =====================================================

-- 1. Create profiles_public (user-accessible non-sensitive data)
CREATE TABLE public.profiles_public (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  building_name TEXT NOT NULL DEFAULT 'LUXE Member',
  apartment_unit TEXT,
  role user_role NOT NULL DEFAULT 'resident',
  language TEXT DEFAULT 'en',
  city TEXT,
  dietary_preferences TEXT[],
  preferred_areas TEXT[],
  budget_style TEXT DEFAULT 'premium',
  favorite_cuisines TEXT[],
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Create profiles_private (service_role-only sensitive data)
CREATE TABLE public.profiles_private (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  invoice_email TEXT,
  special_notes TEXT,
  ai_memories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Create bookings_public (user-accessible booking data)
CREATE TABLE public.bookings_public (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id),
  booking_number TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  party_size INTEGER DEFAULT 1,
  special_requests TEXT,
  conversation_id UUID REFERENCES public.conversations(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create bookings_financial (service_role-only financial data)
CREATE TABLE public.bookings_financial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings_public(id) ON DELETE CASCADE,
  total_amount NUMERIC,
  commission_amount NUMERIC,
  payout_amount NUMERIC,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE public.profiles_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_private ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_financial ENABLE ROW LEVEL SECURITY;

-- PROFILES_PUBLIC: Users can access their own profile
CREATE POLICY "Users can view own public profile"
ON public.profiles_public FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own public profile"
ON public.profiles_public FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own public profile"
ON public.profiles_public FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Managers can view all public profiles"
ON public.profiles_public FOR SELECT
USING (is_manager(auth.uid()));

CREATE POLICY "Service role full access profiles_public"
ON public.profiles_public FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- PROFILES_PRIVATE: Service role ONLY (no user access)
CREATE POLICY "Service role only access profiles_private"
ON public.profiles_private FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- BOOKINGS_PUBLIC: Users can access their own bookings
CREATE POLICY "Users can view own bookings"
ON public.bookings_public FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
ON public.bookings_public FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
ON public.bookings_public FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Managers can view all bookings"
ON public.bookings_public FOR SELECT
USING (is_manager(auth.uid()));

CREATE POLICY "Managers can update all bookings"
ON public.bookings_public FOR UPDATE
USING (is_manager(auth.uid()));

CREATE POLICY "Service role full access bookings_public"
ON public.bookings_public FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- BOOKINGS_FINANCIAL: Service role ONLY (no user access)
CREATE POLICY "Service role only access bookings_financial"
ON public.bookings_financial FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- =====================================================
-- TRIGGERS for updated_at
-- =====================================================

CREATE TRIGGER update_profiles_public_updated_at
  BEFORE UPDATE ON public.profiles_public
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_profiles_private_updated_at
  BEFORE UPDATE ON public.profiles_private
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_bookings_public_updated_at
  BEFORE UPDATE ON public.bookings_public
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_bookings_financial_updated_at
  BEFORE UPDATE ON public.bookings_financial
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- UPDATE handle_new_user() to create split profiles
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert into public profile
  INSERT INTO public.profiles_public (id, full_name, building_name, apartment_unit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'building_name', 'LUXE Member'),
    NEW.raw_user_meta_data->>'apartment_unit'
  );
  
  -- Insert into private profile
  INSERT INTO public.profiles_private (id, email, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  
  -- Keep legacy profile for backward compatibility during migration
  INSERT INTO public.profiles (id, full_name, phone, email, role, building_name, apartment_unit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    NEW.email,
    'resident'::user_role,
    COALESCE(NEW.raw_user_meta_data->>'building_name', 'LUXE Member'),
    NEW.raw_user_meta_data->>'apartment_unit'
  );
  
  RETURN NEW;
END;
$$;

-- =====================================================
-- BOOKING NUMBER TRIGGER for new bookings table
-- =====================================================

CREATE OR REPLACE FUNCTION public.set_booking_number_public()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_booking_number_public_trigger
  BEFORE INSERT ON public.bookings_public
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_number_public();