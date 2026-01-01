-- Create suppliers table for luxury services
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('restaurant', 'nightlife', 'transport', 'yacht', 'event')),
  description TEXT,
  location TEXT,
  min_spend NUMERIC DEFAULT 0,
  price_range TEXT, -- e.g. "$$$", "$$$$"
  commission_percent NUMERIC DEFAULT 10,
  availability_notes TEXT,
  image_url TEXT,
  phone TEXT,
  whatsapp_link TEXT,
  is_active BOOLEAN DEFAULT true,
  tags TEXT[], -- e.g. ['romantic', 'group', 'vip']
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table (replacing tickets concept)
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_number TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id),
  booking_date DATE NOT NULL,
  booking_time TEXT,
  party_size INTEGER DEFAULT 1,
  special_requests TEXT,
  total_amount NUMERIC,
  commission_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table for AI conversations
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Suppliers: everyone can view active suppliers, admins can manage
CREATE POLICY "Anyone can view active suppliers" ON public.suppliers FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage suppliers" ON public.suppliers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('manager', 'staff'))
);

-- Bookings: users see their own, admins see all
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('manager', 'staff'))
);
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('manager', 'staff'))
);

-- Chat messages: users see their own
CREATE POLICY "Users can view their own chat" ON public.chat_messages FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create chat messages" ON public.chat_messages FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to generate booking number
CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(booking_number FROM 4) AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.bookings;
  
  RETURN 'LUX' || LPAD(next_number::TEXT, 5, '0');
END;
$$;

-- Trigger to auto-set booking number
CREATE OR REPLACE FUNCTION public.set_booking_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_booking_number_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_number();

-- Update timestamp trigger for new tables
CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON public.suppliers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();