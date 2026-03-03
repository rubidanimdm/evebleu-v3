import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Shield, UserPlus, Settings2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const ADMIN_SCREENS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'suppliers', label: 'Suppliers' },
  { key: 'catalog', label: 'Services / Catalog' },
  { key: 'availability', label: 'Availability' },
  { key: 'pricing', label: 'Pricing Rules' },
  { key: 'media', label: 'Media Library' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'customers', label: 'Customers' },
  { key: 'settings', label: 'Settings' },
  { key: 'roles', label: 'Roles & Permissions' },
];

interface StaffMember {
  user_id: string;
  full_name: string;
  email: string;
  roles: string[];
  permissions: { screen_key: string; can_view: boolean; can_edit: boolean }[];
}

export default function AdminRoles() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isOwner, adminRole } = useAdminRole();

  // New staff form
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('staff');
  const [newPermissions, setNewPermissions] = useState<Record<string, { view: boolean; edit: boolean }>>(
    Object.fromEntries(ADMIN_SCREENS.map(s => [s.key, { view: false, edit: false }]))
  );

  useEffect(() => { fetchStaff(); }, []);

  async function fetchStaff() {
    try {
      const { data } = await supabase.functions.invoke('manage-staff', {
        body: { action: 'list_staff' },
      });
      setStaff(data?.staff || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddStaff() {
    if (!newEmail || !newName || !newPassword) {
      toast({ title: 'Missing fields', description: 'Fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const permissions = newRole === 'staff'
        ? ADMIN_SCREENS.filter(s => newPermissions[s.key]?.view).map(s => ({
            screen_key: s.key,
            can_view: true,
            can_edit: newPermissions[s.key]?.edit ?? false,
          }))
        : undefined;

      const { data, error } = await supabase.functions.invoke('manage-staff', {
        body: { action: 'create_staff', email: newEmail, password: newPassword, full_name: newName, role: newRole, permissions },
      });

      if (data?.error) throw new Error(data.error);

      toast({ title: 'Staff member added' });
      setAddOpen(false);
      resetForm();
      fetchStaff();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePermissions(userId: string, permissions: { screen_key: string; can_view: boolean; can_edit: boolean }[]) {
    setSaving(true);
    try {
      await supabase.functions.invoke('manage-staff', {
        body: { action: 'update_permissions', user_id: userId, permissions },
      });
      toast({ title: 'Permissions updated' });
      fetchStaff();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteStaff(userId: string, name: string) {
    if (!confirm(`Remove ${name} from staff?`)) return;
    try {
      const { data } = await supabase.functions.invoke('manage-staff', {
        body: { action: 'delete_staff', user_id: userId },
      });
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Staff member removed' });
      fetchStaff();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  function resetForm() {
    setNewEmail('');
    setNewName('');
    setNewPassword('');
    setNewRole('staff');
    setNewPermissions(Object.fromEntries(ADMIN_SCREENS.map(s => [s.key, { view: false, edit: false }])));
  }

  const canManage = isOwner || adminRole === 'manager';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team & Permissions</h1>
          <p className="text-muted-foreground">Manage staff access to admin screens</p>
        </div>
        {canManage && (
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><UserPlus className="h-4 w-4" />Add Staff</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Add New Staff Member</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Doe" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Password *</Label>
                    <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 chars" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={newRole} onValueChange={setNewRole}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff">Staff (limited)</SelectItem>
                        <SelectItem value="manager">Manager (full access)</SelectItem>
                        {isOwner && <SelectItem value="owner">Owner (full access)</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newRole === 'staff' && (
                  <Card>
                    <CardHeader className="py-3 px-4"><CardTitle className="text-sm">Screen Permissions</CardTitle></CardHeader>
                    <CardContent className="px-4 pb-4 space-y-2">
                      {ADMIN_SCREENS.map(screen => (
                        <div key={screen.key} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                          <span className="text-sm">{screen.label}</span>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1.5 text-xs">
                              <Switch
                                checked={newPermissions[screen.key]?.view}
                                onCheckedChange={v => setNewPermissions(p => ({ ...p, [screen.key]: { ...p[screen.key], view: v, edit: v ? p[screen.key].edit : false } }))}
                              />
                              View
                            </label>
                            <label className="flex items-center gap-1.5 text-xs">
                              <Switch
                                checked={newPermissions[screen.key]?.edit}
                                disabled={!newPermissions[screen.key]?.view}
                                onCheckedChange={v => setNewPermissions(p => ({ ...p, [screen.key]: { ...p[screen.key], edit: v } }))}
                              />
                              Edit
                            </label>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Button onClick={handleAddStaff} disabled={saving} className="w-full">
                  {saving ? 'Creating...' : 'Create Staff Member'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Role Legend */}
      <Card className="border-border/50">
        <CardHeader className="py-3"><CardTitle className="text-sm">Roles</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3 pt-0">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">owner</Badge>
            <span className="text-xs text-muted-foreground">Full access, can manage roles</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">manager</Badge>
            <span className="text-xs text-muted-foreground">Full operational access</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">staff</Badge>
            <span className="text-xs text-muted-foreground">Per-screen permissions</span>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No staff members yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map(member => {
                  const primaryRole = member.roles.includes('owner') ? 'owner' : member.roles.includes('manager') ? 'manager' : 'staff';
                  const isExpanded = expandedUser === member.user_id;

                  return (
                    <>
                      <TableRow key={member.user_id} className="cursor-pointer" onClick={() => setExpandedUser(isExpanded ? null : member.user_id)}>
                        <TableCell className="font-medium">{member.full_name}</TableCell>
                        <TableCell className="text-muted-foreground">{member.email}</TableCell>
                        <TableCell>
                          <Badge variant={primaryRole === 'owner' ? 'default' : primaryRole === 'manager' ? 'secondary' : 'outline'}
                            className={primaryRole === 'owner' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : ''}>
                            {primaryRole}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {primaryRole === 'staff' && canManage && (
                              <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setExpandedUser(isExpanded ? null : member.user_id); }}>
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                            )}
                            {canManage && primaryRole !== 'owner' && (
                              <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); handleDeleteStaff(member.user_id, member.full_name); }}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {isExpanded && primaryRole === 'staff' && canManage && (
                        <TableRow key={`${member.user_id}-perms`}>
                          <TableCell colSpan={4} className="bg-muted/30 p-4">
                            <StaffPermissionsEditor
                              member={member}
                              saving={saving}
                              onSave={(perms) => handleUpdatePermissions(member.user_id, perms)}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StaffPermissionsEditor({ member, saving, onSave }: {
  member: StaffMember;
  saving: boolean;
  onSave: (perms: { screen_key: string; can_view: boolean; can_edit: boolean }[]) => void;
}) {
  const [perms, setPerms] = useState<Record<string, { view: boolean; edit: boolean }>>(
    Object.fromEntries(ADMIN_SCREENS.map(s => {
      const existing = member.permissions.find(p => p.screen_key === s.key);
      return [s.key, { view: existing?.can_view ?? false, edit: existing?.can_edit ?? false }];
    }))
  );

  function handleSave() {
    const permArray = ADMIN_SCREENS
      .filter(s => perms[s.key]?.view)
      .map(s => ({ screen_key: s.key, can_view: true, can_edit: perms[s.key]?.edit ?? false }));
    onSave(permArray);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium flex items-center gap-2"><Settings2 className="h-4 w-4" /> Screen Permissions for {member.full_name}</p>
      <div className="grid gap-1.5">
        {ADMIN_SCREENS.map(screen => (
          <div key={screen.key} className="flex items-center justify-between py-1.5 px-2 rounded bg-background">
            <span className="text-sm">{screen.label}</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-xs">
                <Switch
                  checked={perms[screen.key]?.view}
                  onCheckedChange={v => setPerms(p => ({ ...p, [screen.key]: { view: v, edit: v ? p[screen.key].edit : false } }))}
                />
                View
              </label>
              <label className="flex items-center gap-1.5 text-xs">
                <Switch
                  checked={perms[screen.key]?.edit}
                  disabled={!perms[screen.key]?.view}
                  onCheckedChange={v => setPerms(p => ({ ...p, [screen.key]: { ...p[screen.key], edit: v } }))}
                />
                Edit
              </label>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleSave} disabled={saving} size="sm">
        {saving ? 'Saving...' : 'Save Permissions'}
      </Button>
    </div>
  );
}
