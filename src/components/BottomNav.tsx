import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { MessageSquare, Compass, Calendar, Headphones, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: MessageSquare, label: 'Concierge', path: '/' },
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
    navigate('/auth');
  };

  const isAdmin = profile?.role === 'manager' || profile?.role === 'staff';
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border/50 z-50">
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
                "flex flex-col gap-1 h-auto py-2 px-3 min-w-[56px] transition-luxury",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Button>
          );
        })}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex flex-col gap-1 h-auto py-2 px-3 min-w-[56px] text-muted-foreground hover:text-foreground transition-luxury"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Exit</span>
        </Button>
      </div>
    </nav>
  );
}
