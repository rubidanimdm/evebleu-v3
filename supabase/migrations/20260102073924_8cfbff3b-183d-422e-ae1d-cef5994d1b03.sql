-- Fix SECURITY DEFINER views - change to SECURITY INVOKER

-- Drop and recreate suppliers_public with SECURITY INVOKER
DROP VIEW IF EXISTS public.suppliers_public;

CREATE VIEW public.suppliers_public 
WITH (security_invoker = true)
AS
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

-- Drop and recreate user_bookings with SECURITY INVOKER
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
  bp.conversation_id,
  bp.created_at,
  bp.updated_at,
  bf.total_amount
FROM public.bookings_public bp
LEFT JOIN public.bookings_financial bf ON bp.id = bf.booking_id
WHERE bp.user_id = auth.uid();

-- Grant access to the view
GRANT SELECT ON public.user_bookings TO authenticated;