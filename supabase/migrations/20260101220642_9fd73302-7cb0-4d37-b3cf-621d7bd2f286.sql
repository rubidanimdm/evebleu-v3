-- Create a secure view for user bookings that excludes admin-only fields
-- This prevents regular users from seeing admin_notes and commission_amount

CREATE OR REPLACE VIEW public.user_bookings AS
SELECT 
  id,
  user_id,
  supplier_id,
  booking_number,
  booking_date,
  booking_time,
  party_size,
  special_requests,
  status,
  total_amount,
  conversation_id,
  created_at,
  updated_at
  -- Explicitly EXCLUDED: admin_notes, commission_amount
FROM public.bookings;

-- Enable RLS on the view
ALTER VIEW public.user_bookings SET (security_invoker = true);

-- Grant access to the view
GRANT SELECT ON public.user_bookings TO authenticated;
GRANT SELECT ON public.user_bookings TO anon;