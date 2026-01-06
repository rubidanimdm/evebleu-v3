-- STRUCTURAL FIX: Add user-facing RLS policies to prevent recurring security findings
-- These policies allow proper access without relying solely on service_role

-- 1. Fix profiles_private: Allow users to SELECT and UPDATE their own private data
CREATE POLICY "Users can view their own private profile"
ON public.profiles_private
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own private profile"
ON public.profiles_private
FOR UPDATE
USING (auth.uid() = id);

-- 2. Fix bookings_financial: Allow managers to SELECT financial records
CREATE POLICY "Managers can view all financial records"
ON public.bookings_financial
FOR SELECT
USING (public.is_admin(auth.uid()));

-- 3. Add user access to their own booking financials
CREATE POLICY "Users can view their own booking financials"
ON public.bookings_financial
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings_public bp
    WHERE bp.id = booking_id AND bp.user_id = auth.uid()
  )
);