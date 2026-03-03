-- Update RLS: owners can also manage roles (currently only managers)
DROP POLICY IF EXISTS "Only managers can manage roles" ON public.user_roles;
CREATE POLICY "Owners and managers can manage roles"
ON public.user_roles FOR ALL
USING (public.is_manager(auth.uid()) OR public.is_owner(auth.uid()))
WITH CHECK (public.is_manager(auth.uid()) OR public.is_owner(auth.uid()));

-- Seed owner roles (conditional — skips if users don't exist yet)
INSERT INTO public.user_roles (user_id, role)
SELECT au.id, 'owner'::app_role
FROM auth.users au
WHERE au.email IN ('rubi4u@gmail.com', 'dekeld4u@gmail.com')
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur WHERE ur.user_id = au.id AND ur.role = 'owner'
  );
