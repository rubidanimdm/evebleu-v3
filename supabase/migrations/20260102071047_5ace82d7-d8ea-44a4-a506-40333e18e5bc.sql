-- Add service_role policies to remaining tables

-- Announcements: Allow service_role full access
CREATE POLICY "Service role can access all announcements"
ON public.announcements
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Catalog items: Allow service_role full access
CREATE POLICY "Service role can access all catalog_items"
ON public.catalog_items
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Contacts: Allow service_role full access
CREATE POLICY "Service role can access all contacts"
ON public.contacts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Customer notes: Allow service_role full access
CREATE POLICY "Service role can access all customer_notes"
ON public.customer_notes
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Suppliers: Allow service_role full access
CREATE POLICY "Service role can access all suppliers"
ON public.suppliers
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Tickets: Allow service_role full access
CREATE POLICY "Service role can access all tickets"
ON public.tickets
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- User roles: Allow service_role full access
CREATE POLICY "Service role can access all user_roles"
ON public.user_roles
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');