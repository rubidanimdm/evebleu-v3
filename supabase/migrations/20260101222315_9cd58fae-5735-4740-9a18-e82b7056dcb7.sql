-- Secure the user_bookings view by revoking anonymous access
-- The view already uses security_invoker=true which inherits RLS from bookings table

-- Revoke access from anonymous users (unauthenticated)
REVOKE SELECT ON public.user_bookings FROM anon;

-- Add comment documenting the security model
COMMENT ON VIEW public.user_bookings IS 'Secure view that hides admin_notes and commission_amount from regular users. Uses security_invoker=true to inherit RLS policies from the underlying bookings table. Only authenticated users can access this view, and RLS ensures users only see their own bookings unless they are admins.';