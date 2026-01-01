-- Step 7: Update payments RLS - managers only, not staff
DROP POLICY IF EXISTS "Managers can manage payments" ON public.payments;
DROP POLICY IF EXISTS "Managers can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

-- Users see only their own payments
CREATE POLICY "Users can view own payments"
ON public.payments FOR SELECT
USING (user_id = auth.uid());

-- Only managers can manage payments (staff cannot access financial data)
CREATE POLICY "Managers can manage payments"
ON public.payments FOR ALL
USING (public.is_manager(auth.uid()));

-- Step 8: Update customer_notes RLS - managers only
DROP POLICY IF EXISTS "Only admins can manage customer notes" ON public.customer_notes;

CREATE POLICY "Only managers can manage customer notes"
ON public.customer_notes FOR ALL
USING (public.is_manager(auth.uid()))
WITH CHECK (public.is_manager(auth.uid()));

-- Step 9: Update tickets RLS
DROP POLICY IF EXISTS "Managers can update tickets" ON public.tickets;
DROP POLICY IF EXISTS "Managers can view all tickets" ON public.tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON public.tickets;
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.tickets;

CREATE POLICY "Users can view own tickets"
ON public.tickets FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Users can create tickets"
ON public.tickets FOR INSERT
WITH CHECK (created_by = auth.uid());

-- Staff and managers can view all tickets
CREATE POLICY "Admins can view all tickets"
ON public.tickets FOR SELECT
USING (public.is_admin(auth.uid()));

-- Only managers can update tickets
CREATE POLICY "Managers can update tickets"
ON public.tickets FOR UPDATE
USING (public.is_manager(auth.uid()));