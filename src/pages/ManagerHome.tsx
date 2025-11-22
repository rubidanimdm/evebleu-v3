import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BigButton } from '@/components/BigButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock, CheckCircle, Bell, Users, Phone, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function ManagerHome() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({ open: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from('tickets')
      .select('status');

    if (data) {
      const open = data.filter(t => t.status === 'open').length;
      const inProgress = data.filter(t => t.status === 'in_progress').length;
      const completed = data.filter(t => t.status === 'done').length;
      setStats({ open, inProgress, completed });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out successfully' });
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pt-4">
          <div>
            <h1 className="text-2xl font-bold">Hi {profile?.full_name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Here's today's work</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-destructive">{stats.open}</div>
                <div className="text-sm text-muted-foreground">Open</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{stats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="space-y-3">
          <BigButton
            icon={AlertCircle}
            label="New Issues"
            description={`${stats.open} open tickets`}
            onClick={() => navigate('/manager/tickets?status=open')}
            variant="destructive"
          />
          
          <BigButton
            icon={Clock}
            label="In Progress"
            description={`${stats.inProgress} active tickets`}
            onClick={() => navigate('/manager/tickets?status=in_progress')}
          />
          
          <BigButton
            icon={CheckCircle}
            label="Completed"
            description={`${stats.completed} resolved tickets`}
            onClick={() => navigate('/manager/tickets?status=done')}
          />
          
          <BigButton
            icon={Bell}
            label="Create Notice"
            description="Post announcement to residents"
            onClick={() => navigate('/manager/create-announcement')}
          />
          
          <BigButton
            icon={Users}
            label="All Residents"
            description="View and manage residents"
            onClick={() => navigate('/manager/residents')}
          />
          
          <BigButton
            icon={Phone}
            label="Emergency Contacts"
            description="Manage contact directory"
            onClick={() => navigate('/contacts')}
          />
        </div>
      </div>
    </div>
  );
}
