
-- Staff permissions: which admin screens each staff user can access
CREATE TABLE public.staff_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  screen_key text NOT NULL,
  can_view boolean NOT NULL DEFAULT true,
  can_edit boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, screen_key)
);

ALTER TABLE public.staff_permissions ENABLE ROW LEVEL SECURITY;

-- Owners/admins can manage staff permissions
CREATE POLICY "Admins can manage staff permissions"
  ON public.staff_permissions FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Service role full access
CREATE POLICY "Service role full access staff_permissions"
  ON public.staff_permissions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Users can view their own permissions
CREATE POLICY "Users can view own permissions"
  ON public.staff_permissions FOR SELECT
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_staff_permissions_updated_at
  BEFORE UPDATE ON public.staff_permissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
