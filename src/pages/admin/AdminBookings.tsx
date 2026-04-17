import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Search, ClipboardList, Eye, Download, CalendarDays, DollarSign, CheckCircle2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  booking_time: string | null;
  party_size: number;
  status: string;
  created_at: string;
  booking_type?: string | null;
  guest_name?: string | null;
  guest_email?: string | null;
  guest_phone?: string | null;
  details?: Record<string, any> | null;
  total_amount?: number | null;
  commission_amount?: number | null;
  admin_notes?: string | null;
  user?: { full_name: string; email: string } | null;
  supplier?: { name: string } | null;
  financial?: { total_amount: number | null } | null;
}

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.access_token) {
        const response = await supabase.functions.invoke('get-admin-bookings', {
          headers: { Authorization: `Bearer ${sessionData.session.access_token}` },
        });
        setBookings(response.data?.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = booking.booking_number.toLowerCase().includes(q) ||
      booking.user?.full_name?.toLowerCase().includes(q) ||
      booking.guest_name?.toLowerCase().includes(q) ||
      booking.booking_type?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesDateFrom = !dateFrom || booking.booking_date >= dateFrom;
    const matchesDateTo = !dateTo || booking.booking_date <= dateTo;
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const summary = useMemo(() => {
    const totalBookings = filteredBookings.length;
    const totalRevenue = filteredBookings.reduce((sum, b) => sum + (b.financial?.total_amount || 0), 0);
    const avgValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
    const confirmedCount = filteredBookings.filter((b) => b.status === 'confirmed').length;
    return { totalBookings, totalRevenue, avgValue, confirmedCount };
  }, [filteredBookings]);

  function exportCSV() {
    const headers = ['Booking #', 'Type', 'Customer', 'Service', 'Date', 'Amount', 'Status'];
    const rows = filteredBookings.map((b) => [
      b.booking_number,
      b.booking_type || 'general',
      b.user?.full_name || b.guest_name || '',
      b.supplier?.name || b.details?.hotel_name || b.details?.destination || '',
      b.booking_date,
      b.financial?.total_amount?.toString() || b.total_amount?.toString() || '0',
      b.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase.from('bookings_public').update({ status }).eq('id', id);
      if (error) throw error;
      toast({ title: `Booking ${status}` });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error updating booking', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage all bookings</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={exportCSV}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bookings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All statuses" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full sm:w-[160px]" placeholder="From" />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full sm:w-[160px]" placeholder="To" />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalBookings}</p>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${summary.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${summary.avgValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="text-xs text-muted-foreground">Average Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.confirmedCount}</p>
                <p className="text-xs text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12"><ClipboardList className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" /><p className="text-muted-foreground">No bookings found</p></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => {
                  const customerName = booking.user?.full_name || booking.guest_name || '-';
                  const serviceName = booking.supplier?.name || booking.details?.hotel_name || booking.details?.destination || '-';
                  const typeColors: Record<string, string> = {
                    hotel: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                    flight: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                    dining: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                    experience: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                    general: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
                  };
                  const bookingType = booking.booking_type || 'general';
                  const badgeClass = typeColors[bookingType] || typeColors.general;
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.booking_number}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] capitalize ${badgeClass}`}>
                          {bookingType}
                        </Badge>
                      </TableCell>
                      <TableCell>{customerName}</TableCell>
                      <TableCell>{serviceName}</TableCell>
                      <TableCell>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>${booking.financial?.total_amount?.toLocaleString() || booking.total_amount?.toLocaleString() || '0'}</TableCell>
                      <TableCell>
                        <Select value={booking.status} onValueChange={(v) => updateStatus(booking.id, v)}>
                          <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
                          <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/admin/customers/${customerName}`}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                      </TableCell>
                    </TableRow>
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
