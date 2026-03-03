
-- Fix: Allow admins (including owners) to view all roles, and users to view their own
-- Drop the restrictive manager-only policy
DROP POLICY IF EXISTS "Only managers can manage roles" ON public.user_roles;

-- Create separate policies for different operations
CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Make the user's own role viewable (change to PERMISSIVE)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
