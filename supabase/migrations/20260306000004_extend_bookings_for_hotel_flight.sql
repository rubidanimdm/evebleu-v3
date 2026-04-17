-- =====================================================
-- EXTEND BOOKINGS FOR HOTEL & FLIGHT REQUESTS
-- Allow guest (non-logged-in) bookings without a supplier
-- =====================================================

-- 1. Make user_id nullable (guest bookings without login)
ALTER TABLE public.bookings_public ALTER COLUMN user_id DROP NOT NULL;

-- 2. Make supplier_id nullable (hotel/flight requests don't have a supplier)
ALTER TABLE public.bookings_public ALTER COLUMN supplier_id DROP NOT NULL;

-- 3. Add booking_type column
ALTER TABLE public.bookings_public
  ADD COLUMN IF NOT EXISTS booking_type TEXT DEFAULT 'general';

-- 4. Add guest contact columns
ALTER TABLE public.bookings_public
  ADD COLUMN IF NOT EXISTS guest_name TEXT,
  ADD COLUMN IF NOT EXISTS guest_email TEXT,
  ADD COLUMN IF NOT EXISTS guest_phone TEXT;

-- 5. Add details JSONB for hotel/flight specific data
ALTER TABLE public.bookings_public
  ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- 6. Policy for anonymous inserts (non-logged-in users can create bookings)
CREATE POLICY "Anyone can create guest bookings"
ON public.bookings_public
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- 7. Also allow authenticated users to create bookings without matching auth.uid()
--    (for cases where a logged-in user creates a booking and we set user_id server-side)
--    The existing policy requires auth.uid() = user_id, but we also need to allow
--    user_id = NULL for logged-in users creating guest-style bookings
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings_public;

CREATE POLICY "Users can create bookings"
ON public.bookings_public
FOR INSERT
TO authenticated
WITH CHECK (
  user_id IS NULL OR user_id = auth.uid()
);

-- 8. Update the user_bookings view to include new columns
DROP VIEW IF EXISTS public.user_bookings;

CREATE VIEW public.user_bookings
WITH (security_invoker = true)
AS
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
  bp.booking_type,
  bp.guest_name,
  bp.guest_email,
  bp.guest_phone,
  bp.details,
  bp.conversation_id,
  bp.created_at,
  bp.updated_at,
  bf.total_amount
FROM public.bookings_public bp
LEFT JOIN public.bookings_financial bf ON bp.id = bf.booking_id
WHERE bp.user_id = auth.uid();

GRANT SELECT ON public.user_bookings TO authenticated;
