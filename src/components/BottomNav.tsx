import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Home, MessageSquare, Compass, Calendar, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquare, label: 'Concierge', path: '/concierge' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Calendar, label: 'Plans', path: '/my-plans' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const adminItems = [
  { icon: Settings, label: 'Admin', path: '/admin' },
];

export function BottomNav() {
  const { profile } = useAuth();
  const { isAdmin } = useAdminRole();
  const navigate = useNavigate();
  const location = useLocation();

  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/98 backdrop-blur-xl border-t border-primary/10 z-50 safe-area-pb">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="max-w-2xl mx-auto flex items-center justify-around py-3 px-2">
        {allItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1.5 py-2 px-4 min-w-[60px] rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary/80"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                isActive ? "bg-primary/15" : "bg-transparent"
              )}>
                <item.icon 
                  className={cn("w-5 h-5", isActive && "text-primary")} 
                  strokeWidth={isActive ? 2 : 1.5} 
                />
              </div>
              <span className={cn(
                "text-[11px] font-medium",
                isActive && "text-primary"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}