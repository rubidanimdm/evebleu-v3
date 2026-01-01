import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/BottomNav';
import { LargePageHeader } from '@/components/LuxuryElements';
import { ArrowLeft, Calendar, CreditCard, MessageSquare, StickyNote, User, TrendingUp, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, subDays, subMonths } from 'date-fns';

interface CustomerProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  language: string;
  city: string;
  created_at: string;
  last_seen: string;
  budget_style: string;
}

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  status: string;
  total_amount: number;
  supplier_id: string;
}

interface Note {
  id: string;
  content: string;
  created_at: string;
  admin_id: string;
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile: adminProfile } = useAuth();
  const { toast } = useToast();

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Spend calculations
  const [lifetimeSpend, setLifetimeSpend] = useState(0);
  const [last30DaysSpend, setLast30DaysSpend] = useState(0);
  const [last12MonthsSpend, setLast12MonthsSpend] = useState(0);

  useEffect(() => {
    if (id) loadCustomerData();
  }, [id]);

  const loadCustomerData = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      // Fetch customer profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;
      setCustomer(profileData as CustomerProfile);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });

      setBookings(bookingsData || []);

      // Calculate spend metrics
      const confirmedBookings = (bookingsData || []).filter(b => b.status === 'confirmed');
      const lifetime = confirmedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
      setLifetimeSpend(lifetime);

      const now = new Date();
      const thirtyDaysAgo = subDays(now, 30);
      const twelveMonthsAgo = subMonths(now, 12);

      const last30 = confirmedBookings
        .filter(b => new Date(b.booking_date) >= thirtyDaysAgo)
        .reduce((sum, b) => sum + (b.total_amount || 0), 0);
      setLast30DaysSpend(last30);

      const last12 = confirmedBookings
        .filter(b => new Date(b.booking_date) >= twelveMonthsAgo)
        .reduce((sum, b) => sum + (b.total_amount || 0), 0);
      setLast12MonthsSpend(last12);

      // Fetch admin notes
      const { data: notesData } = await supabase
        .from('customer_notes')
        .select('*')
        .eq('customer_id', id)
        .order('created_at', { ascending: false });

      setNotes(notesData || []);
    } catch (error) {
      console.error('Error loading customer:', error);
      toast({ title: 'Error loading customer data', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !id || !user) return;
    setIsSavingNote(true);

    try {
      const { data, error } = await supabase
        .from('customer_notes')
        .insert({
          customer_id: id,
          admin_id: user.id,
          content: newNote.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      setNotes([data, ...notes]);
      setNewNote('');
      toast({ title: 'Note added' });
    } catch (error) {
      toast({ title: 'Failed to add note', variant: 'destructive' });
    } finally {
      setIsSavingNote(false);
    }
  };

  const avgOrderValue = bookings.length > 0 ? lifetimeSpend / bookings.filter(b => b.status === 'confirmed').length : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading customer...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <LargePageHeader 
        title={customer.full_name} 
        subtitle={customer.email}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin
        </Button>

        {/* Spend Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-primary/10">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Lifetime Spend</p>
              <p className="text-xl font-bold text-primary">AED {lifetimeSpend.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/10">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Last 30 Days</p>
              <p className="text-xl font-bold text-primary">AED {last30DaysSpend.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/10">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Last 12 Months</p>
              <p className="text-xl font-bold text-primary">AED {last12MonthsSpend.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/10">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Avg Order</p>
              <p className="text-xl font-bold text-primary">AED {Math.round(avgOrderValue).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="bg-card/50 border border-primary/10">
            <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Info
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <StickyNote className="w-4 h-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info">
            <Card className="bg-card/50 border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{customer.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{customer.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{customer.language || 'English'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{customer.city || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Style</p>
                    <p className="font-medium capitalize">{customer.budget_style || 'Premium'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{format(new Date(customer.created_at), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Seen</p>
                    <p className="font-medium">{format(new Date(customer.last_seen), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="bg-card/50 border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Booking History ({bookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No bookings yet</p>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking #</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium text-primary">{booking.booking_number}</TableCell>
                            <TableCell>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                booking.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">AED {(booking.total_amount || 0).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card className="bg-card/50 border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Admin Notes</CardTitle>
                <CardDescription>Internal notes about this customer (not visible to customer)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Note */}
                <div className="flex gap-2">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this customer..."
                    className="bg-background/50 border-primary/20 min-h-[80px]"
                  />
                </div>
                <Button 
                  onClick={handleAddNote} 
                  disabled={!newNote.trim() || isSavingNote}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSavingNote ? 'Saving...' : 'Add Note'}
                </Button>

                {/* Notes List */}
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 pt-4">
                    {notes.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No notes yet</p>
                    ) : (
                      notes.map((note) => (
                        <div key={note.id} className="p-4 rounded-xl border border-primary/10 bg-card/30">
                          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
