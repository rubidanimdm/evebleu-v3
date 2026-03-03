import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, ShieldCheck, Crown, Plus, X, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface UserSummary {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  roles: string[];
  created_at: string;
  last_seen: string;
}

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: typeof Crown }> = {
  owner: { label: 'Super Admin', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: Crown },
  manager: { label: 'Manager', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: ShieldCheck },
  staff: { label: 'Staff', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Shield },
  resident: { label: 'Resident', color: 'bg-muted text-muted-foreground border-border', icon: Shield },
};

export function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Create user dialog
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ email: '', password: '', full_name: '', phone: '', initial_role: '' });
  const [isCreating, setIsCreating] = useState(false);

  // Manage roles dialog
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [addingRole, setAddingRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admin-users', {
        body: { action: 'list' },
      });

      if (error) {
        console.error('Error loading users:', error);
        toast({ title: 'Error loading users', variant: 'destructive' });
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({ title: 'Error loading users', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createForm.email || !createForm.password || !createForm.full_name) {
      toast({ title: 'Email, password, and full name are required', variant: 'destructive' });
      return;
    }
    if (createForm.password.length < 8) {
      toast({ title: 'Password must be at least 8 characters', variant: 'destructive' });
      return;
    }

    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admin-users', {
        body: {
          action: 'create',
          email: createForm.email,
          password: createForm.password,
          full_name: createForm.full_name,
          phone: createForm.phone || undefined,
          initial_role: createForm.initial_role || undefined,
        },
      });

      if (error || data?.error) {
        toast({ title: data?.error || 'Failed to create user', variant: 'destructive' });
        return;
      }

      toast({ title: 'User created successfully' });
      setIsCreateOpen(false);
      setCreateForm({ email: '', password: '', full_name: '', phone: '', initial_role: '' });
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({ title: 'Failed to create user', variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAssignRole = async (userId: string, role: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-admin-users', {
        body: { action: 'assign_role', user_id: userId, role },
      });

      if (error || data?.error) {
        toast({ title: data?.error || 'Failed to assign role', variant: 'destructive' });
        return;
      }

      toast({ title: `Role "${ROLE_CONFIG[role]?.label || role}" assigned` });
      loadUsers();
      // Update selected user in dialog
      setSelectedUser(prev => prev ? { ...prev, roles: [...prev.roles, role] } : null);
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({ title: 'Failed to assign role', variant: 'destructive' });
    }
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-admin-users', {
        body: { action: 'remove_role', user_id: userId, role },
      });

      if (error || data?.error) {
        toast({ title: data?.error || 'Failed to remove role', variant: 'destructive' });
        return;
      }

      toast({ title: `Role "${ROLE_CONFIG[role]?.label || role}" removed` });
      loadUsers();
      // Update selected user in dialog
      setSelectedUser(prev => prev ? { ...prev, roles: prev.roles.filter(r => r !== role) } : null);
    } catch (error) {
      console.error('Error removing role:', error);
      toast({ title: 'Failed to remove role', variant: 'destructive' });
    }
  };

  const filteredUsers = users
    .filter((u) => {
      const matchesSearch =
        u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.roles.includes(roleFilter);
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      // Sort: owners first, then managers, then staff, then resident, then no role
      const roleOrder = (roles: string[]) => {
        if (roles.includes('owner')) return 0;
        if (roles.includes('manager')) return 1;
        if (roles.includes('staff')) return 2;
        if (roles.includes('resident')) return 3;
        return 4;
      };
      return roleOrder(a.roles) - roleOrder(b.roles);
    });

  const ownerCount = users.filter(u => u.roles.includes('owner')).length;
  const managerCount = users.filter(u => u.roles.includes('manager')).length;
  const staffCount = users.filter(u => u.roles.includes('staff')).length;

  const RoleBadge = ({ role }: { role: string }) => {
    const config = ROLE_CONFIG[role] || { label: role, color: 'bg-muted text-muted-foreground border-border', icon: Shield };
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} border gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold text-primary">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Super Admins</p>
            <p className="text-2xl font-bold text-amber-500">{ownerCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Managers</p>
            <p className="text-2xl font-bold text-yellow-500">{managerCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Staff</p>
            <p className="text-2xl font-bold text-blue-500">{staffCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Add User */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-primary/20"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 bg-background/50 border-primary/20">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="owner">Super Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="resident">Resident</SelectItem>
          </SelectContent>
        </Select>

        {/* Add User Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-primary/10">
            <DialogHeader>
              <DialogTitle className="text-primary">Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email *</Label>
                <Input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Password *</Label>
                <Input
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Full Name *</Label>
                <Input
                  value={createForm.full_name}
                  onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
                  className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone</Label>
                <Input
                  value={createForm.phone}
                  onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                  className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Initial Role</Label>
                <Select value={createForm.initial_role} onValueChange={(v) => setCreateForm({ ...createForm, initial_role: v })}>
                  <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/50 rounded-lg">
                    <SelectValue placeholder="No role (resident by default)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="resident">Resident</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateUser}
                disabled={isCreating}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
              >
                {isCreating ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <Card className="bg-card/50 border-primary/10">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No users found</p>
          ) : (
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id} className="hover:bg-primary/5">
                      <TableCell>
                        <div>
                          <p className="font-medium">{u.full_name || 'No name'}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {u.roles.length > 0 ? (
                            u.roles.map((role) => <RoleBadge key={role} role={role} />)
                          ) : (
                            <span className="text-sm text-muted-foreground">No roles</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(u.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {u.last_seen ? format(new Date(u.last_seen), 'MMM d, yyyy') : '—'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 text-primary hover:bg-primary/10 rounded-lg"
                          onClick={() => {
                            setSelectedUser(u);
                            setIsManageOpen(true);
                            setAddingRole('');
                          }}
                        >
                          Manage Roles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Manage Roles Dialog */}
      <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
        <DialogContent className="bg-card border-primary/10">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Manage Roles — {selectedUser?.full_name || selectedUser?.email}
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 pt-4">
              {/* Current Roles */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Current Roles</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.roles.length === 0 && (
                    <span className="text-sm text-muted-foreground">No roles assigned</span>
                  )}
                  {selectedUser.roles.map((role) => (
                    <div key={role} className="flex items-center gap-1">
                      <RoleBadge role={role} />
                      {role !== 'owner' && (
                        <button
                          onClick={() => handleRemoveRole(selectedUser.id, role)}
                          className="ml-0.5 p-0.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Role */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Add Role</Label>
                <div className="flex gap-2">
                  <Select value={addingRole} onValueChange={setAddingRole}>
                    <SelectTrigger className="flex-1 bg-background/50 border-primary/20 rounded-lg">
                      <SelectValue placeholder="Select a role to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {['manager', 'staff', 'resident']
                        .filter((r) => !selectedUser.roles.includes(r))
                        .map((r) => (
                          <SelectItem key={r} value={r}>
                            {ROLE_CONFIG[r]?.label || r}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    disabled={!addingRole}
                    onClick={() => {
                      if (addingRole) {
                        handleAssignRole(selectedUser.id, addingRole);
                        setAddingRole('');
                      }
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
