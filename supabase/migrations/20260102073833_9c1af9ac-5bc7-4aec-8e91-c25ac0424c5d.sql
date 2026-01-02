-- =====================================================
-- SECURITY FIX: Tighten all RLS policies
-- =====================================================

-- 1. Fix legacy profiles table: restrict to service_role only for reading sensitive data
-- Drop existing policies that expose data
DROP POLICY IF EXISTS "Users can view own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Managers can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;

-- Create strict policies: only service_role can access legacy profiles
CREATE POLICY "Service role only access profiles" 
ON public.profiles 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. Fix bookings table: remove user access to financial fields
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Staff can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Managers can manage all bookings" ON public.bookings;

-- Create service_role only access for bookings (contains financial data)
CREATE POLICY "Service role only access bookings" 
ON public.bookings 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 3. Fix payments table: ensure strict user isolation
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Managers can manage payments" ON public.payments;

-- Users can ONLY view their own payments
CREATE POLICY "Users can view own payments strict" 
ON public.payments 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Managers can manage all payments
CREATE POLICY "Managers can manage all payments" 
ON public.payments 
FOR ALL 
USING (is_manager(auth.uid()))
WITH CHECK (is_manager(auth.uid()));

-- 4. Fix bookings_public: ensure strict user isolation
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings_public;
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings_public;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings_public;

-- Recreate with strict auth.uid() checks
CREATE POLICY "Users can view own bookings only" 
ON public.bookings_public 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can create own bookings only" 
ON public.bookings_public 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update own bookings only" 
ON public.bookings_public 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 5. Fix profiles_public: ensure strict user isolation
DROP POLICY IF EXISTS "Users can view own public profile" ON public.profiles_public;
DROP POLICY IF EXISTS "Users can update own public profile" ON public.profiles_public;
DROP POLICY IF EXISTS "Users can insert own public profile" ON public.profiles_public;

-- Recreate with strict auth.uid() checks
CREATE POLICY "Users can view own public profile only" 
ON public.profiles_public 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can update own public profile only" 
ON public.profiles_public 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND auth.uid() = id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can insert own public profile only" 
ON public.profiles_public 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

-- 6. Fix chat_messages: add conversation ownership check
DROP POLICY IF EXISTS "Users can view their own chat" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create chat messages" ON public.chat_messages;

-- Users can only view messages in their own conversations
CREATE POLICY "Users can view own chat messages only" 
ON public.chat_messages 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND user_id = auth.uid()
  AND (
    conversation_id IS NULL 
    OR EXISTS (
      SELECT 1 FROM conversations c 
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  )
);

-- Users can only create messages in their own conversations
CREATE POLICY "Users can create own chat messages only" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id = auth.uid()
  AND (
    conversation_id IS NULL 
    OR EXISTS (
      SELECT 1 FROM conversations c 
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  )
);

-- 7. Fix tickets: ensure users only see their own
DROP POLICY IF EXISTS "Users can view own tickets" ON public.tickets;

CREATE POLICY "Users can view own tickets only" 
ON public.tickets 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- 8. Create secure view for suppliers that hides commission data
CREATE OR REPLACE VIEW public.suppliers_public AS
SELECT 
  id,
  name,
  category,
  description,
  image_url,
  location,
  price_range,
  availability_notes,
  phone,
  whatsapp_link,
  tags,
  is_active,
  created_at,
  updated_at
FROM public.suppliers
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.suppliers_public TO authenticated;
GRANT SELECT ON public.suppliers_public TO anon;

-- 9. Ensure user_bookings view has proper security (it's a view, inherits from bookings_public)
DROP VIEW IF EXISTS public.user_bookings;

CREATE OR REPLACE VIEW public.user_bookings AS
SELECT 
  bp.id,
  bp.user_id,
  bp.supplier_id,
  bp.booking_number,
  bp.booking_date,
  bp.booking_time,
  bp.party_size,
  bp.special_requests,
  bp.status,
  bp.conversation_id,
  bp.created_at,
  bp.updated_at,
  bf.total_amount
FROM public.bookings_public bp
LEFT JOIN public.bookings_financial bf ON bp.id = bf.booking_id
WHERE bp.user_id = auth.uid();

-- Enable RLS on the underlying tables (view inherits)
GRANT SELECT ON public.user_bookings TO authenticated;