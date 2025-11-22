import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { BigButton } from '@/components/BigButton';
import { Button } from '@/components/ui/button';
import { FileText, ListTodo, Bell, CreditCard, Phone, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function ResidentHome() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
            <p className="text-muted-foreground">
              {profile?.building_name} • Unit {profile?.apartment_unit}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Actions */}
        <div className="space-y-3">
          <BigButton
            icon={FileText}
            label="Report an Issue"
            description="Report a problem in your building"
            onClick={() => navigate('/report-issue')}
          />
          
          <BigButton
            icon={ListTodo}
            label="Track My Issues"
            description="View status of your reports"
            onClick={() => navigate('/my-tickets')}
          />
          
          <BigButton
            icon={Bell}
            label="Building Notices"
            description="View announcements from management"
            onClick={() => navigate('/announcements')}
          />
          
          <BigButton
            icon={CreditCard}
            label="Payments & Invoices"
            description="View your payment history"
            onClick={() => navigate('/payments')}
          />
          
          <BigButton
            icon={Phone}
            label="Emergency Contacts"
            description="Quick access to important numbers"
            onClick={() => navigate('/contacts')}
          />
        </div>
      </div>
    </div>
  );
}
