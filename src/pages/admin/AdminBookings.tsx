import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Search, ClipboardList, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  booking_time: string | null;
  party_size: number;
  status: string;
  created_at: string;
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
    const matchesSearch = booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage all bookings</p>
      </div>

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
          </div>
        </CardContent>
      </Card>

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
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.booking_number}</TableCell>
                    <TableCell>{booking.user?.full_name || '-'}</TableCell>
                    <TableCell>{booking.supplier?.name || '-'}</TableCell>
                    <TableCell>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>${booking.financial?.total_amount?.toLocaleString() || '0'}</TableCell>
                    <TableCell>
                      <Select value={booking.status} onValueChange={(v) => updateStatus(booking.id, v)}>
                        <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/admin/customers/${booking.user?.full_name}`}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                    </TableCell>
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
