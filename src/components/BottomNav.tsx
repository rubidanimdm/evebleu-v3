import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { MessageSquare, Compass, Calendar, Headphones, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: MessageSquare, label: 'Concierge', path: '/concierge' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Calendar, label: 'My Plans', path: '/my-plans' },
  { icon: Headphones, label: 'Support', path: '/support' },
];

const adminItems = [
  { icon: Settings, label: 'Admin', path: '/admin' },
];

export function BottomNav() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out' });
    navigate('/');
  };

  const isAdmin = profile?.role === 'manager' || profile?.role === 'staff';
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-primary/10 z-50">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-2xl mx-auto flex items-center justify-around py-2">
        {allItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col gap-1 h-auto py-2.5 px-3 min-w-[56px] rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Button>
          );
        })}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex flex-col gap-1 h-auto py-2.5 px-3 min-w-[56px] text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Exit</span>
        </Button>
      </div>
    </nav>
  );
}
