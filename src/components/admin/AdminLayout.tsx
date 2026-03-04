import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Package,
  Calendar,
  DollarSign,
  Image,
  ClipboardList,
  Users,
  Settings,
  Shield,
  FileText,
  Menu,
  X,
  Search,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Venues', path: '/admin/venues', icon: MapPin },
  { name: 'Suppliers', path: '/admin/suppliers', icon: Building2 },
  { name: 'Services / Catalog', path: '/admin/catalog', icon: Package },
  { name: 'Availability', path: '/admin/availability', icon: Calendar },
  { name: 'Pricing Rules', path: '/admin/pricing', icon: DollarSign },
  { name: 'Media Library', path: '/admin/media', icon: Image },
  { name: 'Bookings', path: '/admin/bookings', icon: ClipboardList },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
  { name: 'Roles & Permissions', path: '/admin/roles', icon: Shield },
  { name: 'Pages', path: '/admin/pages', icon: FileText },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">L</span>
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-semibold text-foreground">LUXE Admin</h1>
              <p className="text-xs text-muted-foreground">Management Console</p>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {sidebarOpen && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-0 h-9"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="p-3 border-t border-border/50">
        <div className={cn(
          'flex items-center gap-3 p-2 rounded-lg bg-muted/50',
          !sidebarOpen && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-sm font-medium">
              {profile?.full_name?.[0]?.toUpperCase() || 'A'}
            </span>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">Owner</p>
            </div>
          )}
          {sidebarOpen && (
            <Button variant="ghost" size="icon" className="shrink-0" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-border/50 bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <SidebarContent />
        
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-[calc(theme(spacing.64)-1rem)] top-20 z-10 h-6 w-6 rounded-full border bg-background shadow-sm hidden lg:flex"
          style={{ left: sidebarOpen ? 'calc(16rem - 0.75rem)' : 'calc(5rem - 0.75rem)' }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', !sidebarOpen && 'rotate-180')} />
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border/50 bg-card/50 flex items-center px-4 gap-4 sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
