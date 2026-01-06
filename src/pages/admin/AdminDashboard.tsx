import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  Package, 
  ClipboardList, 
  Users, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalSuppliers: number;
  activeSuppliers: number;
  totalServices: number;
  activeServices: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalCustomers: number;
  vipCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface RecentBooking {
  id: string;
  booking_number: string;
  booking_date: string;
  status: string;
  supplier_name?: string;
  customer_name?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // Fetch suppliers count
      const { data: suppliers } = await supabase
        .from('suppliers')
        .select('id, is_active');
      
      // Fetch catalog items count
      const { data: catalog } = await supabase
        .from('catalog_items')
        .select('id, is_active');
      
      // Fetch customers count
      const { data: customers } = await supabase
        .from('profiles_public')
        .select('id, is_vip, role')
        .eq('role', 'resident');

      // Fetch bookings via edge function
      const { data: sessionData } = await supabase.auth.getSession();
      let bookings: any[] = [];
      
      if (sessionData?.session?.access_token) {
        const response = await supabase.functions.invoke('get-admin-bookings', {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        });
        bookings = response.data?.bookings || [];
      }

      // Calculate stats
      const totalRevenue = bookings
        .filter((b: any) => b.status === 'completed')
        .reduce((sum: number, b: any) => sum + (b.financial?.total_amount || 0), 0);

      const currentMonth = new Date().getMonth();
      const monthlyRevenue = bookings
        .filter((b: any) => {
          const bookingMonth = new Date(b.booking_date).getMonth();
          return b.status === 'completed' && bookingMonth === currentMonth;
        })
        .reduce((sum: number, b: any) => sum + (b.financial?.total_amount || 0), 0);

      setStats({
        totalSuppliers: suppliers?.length || 0,
        activeSuppliers: suppliers?.filter(s => s.is_active).length || 0,
        totalServices: catalog?.length || 0,
        activeServices: catalog?.filter(c => c.is_active).length || 0,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
        confirmedBookings: bookings.filter((b: any) => b.status === 'confirmed').length,
        totalCustomers: customers?.length || 0,
        vipCustomers: customers?.filter(c => c.is_vip).length || 0,
        totalRevenue,
        monthlyRevenue,
      });

      // Set recent bookings
      setRecentBookings(
        bookings.slice(0, 5).map((b: any) => ({
          id: b.id,
          booking_number: b.booking_number,
          booking_date: b.booking_date,
          status: b.status,
          supplier_name: b.supplier?.name,
          customer_name: b.user?.full_name,
        }))
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue.toLocaleString() || 0}`,
      subtitle: `$${stats?.monthlyRevenue.toLocaleString() || 0} this month`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Bookings',
      value: stats?.totalBookings || 0,
      subtitle: `${stats?.pendingBookings || 0} pending`,
      icon: ClipboardList,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Active Services',
      value: stats?.activeServices || 0,
      subtitle: `${stats?.totalServices || 0} total`,
      icon: Package,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Suppliers',
      value: stats?.activeSuppliers || 0,
      subtitle: `${stats?.totalSuppliers || 0} total`,
      icon: Building2,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Customers',
      value: stats?.totalCustomers || 0,
      subtitle: `${stats?.vipCustomers || 0} VIP`,
      icon: Users,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/suppliers">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Building2 className="h-4 w-4" />
                Add New Supplier
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/admin/catalog">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Package className="h-4 w-4" />
                Add New Service
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/admin/availability">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Calendar className="h-4 w-4" />
                Manage Availability
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/admin/bookings">
              <Button variant="outline" className="w-full justify-start gap-3">
                <ClipboardList className="h-4 w-4" />
                View All Bookings
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Bookings
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{booking.booking_number}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {booking.customer_name} • {booking.supplier_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'default'
                            : booking.status === 'pending'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {booking.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(booking.booking_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {(stats?.pendingBookings || 0) > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Pending Bookings Require Attention</p>
              <p className="text-sm text-muted-foreground">
                You have {stats?.pendingBookings} booking(s) waiting for confirmation.
              </p>
            </div>
            <Link to="/admin/bookings">
              <Button size="sm">Review Now</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
