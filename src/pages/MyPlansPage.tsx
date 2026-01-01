import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/supabase';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { LargePageHeader, LuxuryCard, GoldParticles, GoldDivider } from '@/components/LuxuryElements';

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

const statusStyles: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
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
    <div className="min-h-screen bg-background pb-24 relative">
      <GoldParticles count={10} />
      
      <LargePageHeader 
        title="My Plans"
        subtitle="Your reservations, organized and controlled"
      />

      <main className="max-w-2xl mx-auto p-4 space-y-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="flex gap-1.5 justify-center">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">
              No bookings yet.
            </p>
            <Button 
              onClick={() => navigate('/concierge')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8"
            >
              Start with Concierge
            </Button>
          </div>
        ) : (
          <>
            {upcomingBookings.length > 0 && (
              <section>
                <h2 className="text-primary font-medium uppercase tracking-wider text-sm mb-4">Upcoming</h2>
                <div className="space-y-4">
                  {upcomingBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}

            {upcomingBookings.length > 0 && pastBookings.length > 0 && <GoldDivider />}

            {pastBookings.length > 0 && (
              <section>
                <h2 className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-4">Past</h2>
                <div className="space-y-4">
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
    <LuxuryCard className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-foreground text-lg">
            {booking.supplier?.name || 'Booking'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {booking.booking_number}
          </p>
        </div>
        <Badge className={`${statusStyles[booking.status]} border`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
          {format(new Date(booking.booking_date), 'MMM d, yyyy')}
        </div>
        {booking.booking_time && (
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
            {booking.booking_time}
          </div>
        )}
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Users className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
          {booking.party_size} {booking.party_size === 1 ? 'guest' : 'guests'}
        </div>
        {booking.supplier?.location && (
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
            {booking.supplier.location}
          </div>
        )}
      </div>

      {booking.total_amount && (
        <div className="text-sm text-foreground pt-3 border-t border-primary/10">
          Total: <span className="text-primary font-medium">${booking.total_amount.toLocaleString()}</span>
        </div>
      )}
    </LuxuryCard>
  );
}
