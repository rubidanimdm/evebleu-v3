-- Create the is_admin_user function first
CREATE OR REPLACE FUNCTION public.is_admin_user(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role IN ('manager', 'staff')
  )
$$;

-- Add admin viewing policy 
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin_user(auth.uid()));

-- CRITICAL: Fix the handle_new_user function to prevent privilege escalation
-- All new signups MUST be 'resident' - admins can promote later
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, email, role, building_name, apartment_unit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    NEW.email,
    'resident'::user_role,  -- SECURITY: Always force resident role on signup
    COALESCE(NEW.raw_user_meta_data->>'building_name', 'LUXE Member'),
    NEW.raw_user_meta_data->>'apartment_unit'
  );
  RETURN NEW;
END;
$$;