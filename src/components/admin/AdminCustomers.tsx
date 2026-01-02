import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, ChevronRight, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CustomerSummary {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  last_seen: string;
  total_paid: number;
  booking_count: number;
}

export function AdminCustomers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'spend' | 'recent'>('recent');
  const [spendFilter, setSpendFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      // Use secure edge function instead of direct table access
      const { data, error } = await supabase.functions.invoke('get-admin-customers');

      if (error) {
        console.error('Error loading customers:', error);
        toast({ title: 'Error loading customers', variant: 'destructive' });
        return;
      }

      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast({ title: 'Error loading customers', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers
    .filter((c) => {
      const matchesSearch = 
        c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery);
      
      let matchesSpend = true;
      if (spendFilter === 'high') matchesSpend = c.total_paid >= 10000;
      else if (spendFilter === 'medium') matchesSpend = c.total_paid >= 1000 && c.total_paid < 10000;
      else if (spendFilter === 'low') matchesSpend = c.total_paid < 1000;

      return matchesSearch && matchesSpend;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.full_name.localeCompare(b.full_name);
      if (sortBy === 'spend') return b.total_paid - a.total_paid;
      return new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime();
    });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Joined', 'Last Active', 'Total Paid (AED)', 'Bookings'];
    const rows = filteredCustomers.map(c => [
      c.full_name,
      c.email,
      c.phone,
      format(new Date(c.created_at), 'yyyy-MM-dd'),
      format(new Date(c.last_seen), 'yyyy-MM-dd'),
      c.total_paid.toString(),
      c.booking_count.toString(),
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const totalLifetimeSpend = customers.reduce((sum, c) => sum + c.total_paid, 0);
  const totalBookings = customers.reduce((sum, c) => sum + c.booking_count, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold text-primary">{customers.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Lifetime Revenue</p>
            <p className="text-2xl font-bold text-primary">AED {totalLifetimeSpend.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold text-primary">{totalBookings}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-bold text-primary">
              AED {totalBookings > 0 ? Math.round(totalLifetimeSpend / totalBookings).toLocaleString() : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-primary/20"
          />
        </div>
        <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
          <SelectTrigger className="w-40 bg-background/50 border-primary/20">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="spend">Highest Spend</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
        <Select value={spendFilter} onValueChange={(v: any) => setSpendFilter(v)}>
          <SelectTrigger className="w-40 bg-background/50 border-primary/20">
            <SelectValue placeholder="Spend filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Spend</SelectItem>
            <SelectItem value="high">High (10k+)</SelectItem>
            <SelectItem value="medium">Medium (1k-10k)</SelectItem>
            <SelectItem value="low">Low (&lt;1k)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={exportCSV} variant="outline" className="border-primary/20">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Customer Table */}
      <Card className="bg-card/50 border-primary/10">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading customers...</p>
          ) : filteredCustomers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No customers found</p>
          ) : (
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Total Paid</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow 
                      key={customer.id} 
                      className="cursor-pointer hover:bg-primary/5"
                      onClick={() => navigate(`/admin/customers/${customer.id}`)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.full_name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(customer.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(customer.last_seen), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        AED {customer.total_paid.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {customer.booking_count}
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
