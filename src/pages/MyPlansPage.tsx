import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/supabase';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: string;
  booking_number: string;
  booking_date: string;
  booking_time: string | null;
  party_size: number;
  special_requests: string | null;
  total_amount: number | null;
  status: string;
  created_at: string;
  supplier: {
    name: string;
    category: string;
    location: string | null;
  } | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/30',
  confirmed: 'bg-success/10 text-success border-success/30',
  completed: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function MyPlansPage() {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookings() {
      if (!profile?.id) return;

      const { data } = await supabase
        .from('bookings')
        .select(`
          *,
          supplier:suppliers(name, category, location)
        `)
        .eq('user_id', profile.id)
        .order('booking_date', { ascending: false });

      setBookings((data as unknown as Booking[]) || []);
      setLoading(false);
    }
    fetchBookings();
  }, [profile?.id]);

  const upcomingBookings = bookings.filter(b => 
    b.status !== 'completed' && b.status !== 'cancelled' && 
    new Date(b.booking_date) >= new Date()
  );
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled' || 
    new Date(b.booking_date) < new Date()
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-foreground">My Plans</h1>
          <p className="text-sm text-muted-foreground">Your upcoming experiences</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading your plans...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't made any bookings yet.
            </p>
            <Button onClick={() => navigate('/')}>
              Start Planning with Concierge
            </Button>
          </div>
        ) : (
          <>
            {upcomingBookings.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
                <div className="space-y-3">
                  {upcomingBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}

            {pastBookings.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Past</h2>
                <div className="space-y-3">
                  {pastBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">
            {booking.supplier?.name || 'Unknown Venue'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {booking.booking_number}
          </p>
        </div>
        <Badge className={statusColors[booking.status]}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {format(new Date(booking.booking_date), 'MMM d, yyyy')}
        </div>
        {booking.booking_time && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {booking.booking_time}
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          {booking.party_size} {booking.party_size === 1 ? 'guest' : 'guests'}
        </div>
        {booking.supplier?.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {booking.supplier.location}
          </div>
        )}
      </div>

      {booking.total_amount && (
        <div className="text-sm font-medium text-foreground">
          Total: ${booking.total_amount.toLocaleString()}
        </div>
      )}

      {booking.special_requests && (
        <p className="text-sm text-muted-foreground border-t border-border pt-2">
          {booking.special_requests}
        </p>
      )}
    </Card>
  );
}
