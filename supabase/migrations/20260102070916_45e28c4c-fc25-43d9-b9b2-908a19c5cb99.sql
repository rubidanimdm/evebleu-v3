-- Add service_role policies for edge functions to access data

-- Profiles: Allow service_role full access
CREATE POLICY "Service role can access all profiles"
ON public.profiles
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Bookings: Allow service_role full access
CREATE POLICY "Service role can access all bookings"
ON public.bookings
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Payments: Allow service_role full access
CREATE POLICY "Service role can access all payments"
ON public.payments
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Conversations: Allow service_role full access
CREATE POLICY "Service role can access all conversations"
ON public.conversations
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Chat messages: Allow service_role full access
CREATE POLICY "Service role can access all chat_messages"
ON public.chat_messages
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');