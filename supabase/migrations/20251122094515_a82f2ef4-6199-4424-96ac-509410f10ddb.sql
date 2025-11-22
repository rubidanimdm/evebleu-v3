-- Fix security warnings by setting search_path on functions
ALTER FUNCTION generate_ticket_number() SET search_path = public;
ALTER FUNCTION set_ticket_number() SET search_path = public;
ALTER FUNCTION update_updated_at() SET search_path = public;