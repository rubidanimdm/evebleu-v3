import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserPlus } from 'lucide-react';

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  profile?: { full_name: string } | null;
}

export default function AdminRoles() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    try {
      const { data: rolesData } = await supabase.from('user_roles').select('*').order('created_at', { ascending: false });
      
      if (rolesData && rolesData.length > 0) {
        // Fetch profiles separately since there's no direct FK relation
        const userIds = rolesData.map(r => r.user_id);
        const { data: profilesData } = await supabase
          .from('profiles_public')
          .select('id, full_name')
          .in('id', userIds);
        
        const profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        
        const rolesWithProfiles = rolesData.map(role => ({
          ...role,
          profile: profileMap.get(role.user_id) || null
        }));
        
        setRoles(rolesWithProfiles);
      } else {
        setRoles([]);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user access levels</p>
        </div>
        <Button className="gap-2"><UserPlus className="h-4 w-4" />Add Role</Button>
      </div>

      <Card className="border-border/50">
        <CardHeader><CardTitle>Role Definitions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Badge>owner</Badge>
            <span className="text-sm text-muted-foreground">Full access to all features and settings</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Badge variant="secondary">manager</Badge>
            <span className="text-sm text-muted-foreground">Full operational access, can manage all data</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Badge variant="outline">staff</Badge>
            <span className="text-sm text-muted-foreground">Limited access, can view and update bookings</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
          ) : roles.length === 0 ? (
            <div className="text-center py-12"><Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" /><p className="text-muted-foreground">No roles assigned yet</p></div>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Assigned</TableHead></TableRow></TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.profile?.full_name || role.user_id}</TableCell>
                    <TableCell><Badge>{role.role}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{new Date(role.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
