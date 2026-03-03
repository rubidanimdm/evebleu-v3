import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/supabase';

export function useAdminRole() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Record<string, { view: boolean; edit: boolean }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      setIsOwner(false);
      setAdminRole(null);
      setPermissions({});
      setLoading(false);
      return;
    }

    async function checkRole() {
      try {
        // Check user_roles table
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user!.id);

        const roleSet = new Set(roles?.map(r => r.role) || []);
        const owner = roleSet.has('owner');
        const manager = roleSet.has('manager');
        const staff = roleSet.has('staff');
        const admin = owner || manager || staff;

        setIsOwner(owner);
        setIsAdmin(admin);
        setAdminRole(owner ? 'owner' : manager ? 'manager' : staff ? 'staff' : null);

        // If staff, fetch per-screen permissions
        if (staff && !owner && !manager) {
          const { data: perms } = await supabase
            .from('staff_permissions')
            .select('screen_key, can_view, can_edit')
            .eq('user_id', user!.id);

          const permMap: Record<string, { view: boolean; edit: boolean }> = {};
          perms?.forEach(p => {
            permMap[p.screen_key] = { view: p.can_view, edit: p.can_edit };
          });
          setPermissions(permMap);
        } else if (admin) {
          // Owners and managers have full access
          setPermissions({});
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
      } finally {
        setLoading(false);
      }
    }

    checkRole();
  }, [user, authLoading]);

  function hasAccess(screenKey: string): boolean {
    if (isOwner || adminRole === 'manager') return true;
    if (adminRole === 'staff') {
      return permissions[screenKey]?.view ?? false;
    }
    return false;
  }

  function canEdit(screenKey: string): boolean {
    if (isOwner || adminRole === 'manager') return true;
    if (adminRole === 'staff') {
      return permissions[screenKey]?.edit ?? false;
    }
    return false;
  }

  return { isAdmin, isOwner, adminRole, loading, hasAccess, canEdit, permissions };
}
