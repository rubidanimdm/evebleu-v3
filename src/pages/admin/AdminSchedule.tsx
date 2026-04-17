import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string | null;
  guest_name: string;
  booking_type: string;
  details: any;
  status: string;
  user_id: string | null;
}

const TYPE_COLORS: Record<string, string> = {
  hotel: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  flight: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  dining: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  experience: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  yacht: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  transport: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
};

const STATUS_DOT: Record<string, string> = {
  confirmed: 'bg-green-500',
  pending: 'bg-yellow-500',
  cancelled: 'bg-red-500',
};

const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 8:00 to 22:00

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function getWeekDates(date: Date): Date[] {
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function parseHour(timeStr: string | null): number | null {
  if (!timeStr) return null;
  const match = timeStr.match(/^(\d{1,2})/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export default function AdminSchedule() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'day' | 'week'>('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [customerFilter, setCustomerFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, [currentDate, view]);

  async function fetchBookings() {
    try {
      let startDate: string;
      let endDate: string;

      if (view === 'day') {
        startDate = formatDate(currentDate);
        endDate = startDate;
      } else {
        const weekDates = getWeekDates(currentDate);
        startDate = formatDate(weekDates[0]);
        endDate = formatDate(weekDates[6]);
      }

      const { data, error } = await (supabase as any)
        .from('bookings_public')
        .select('id, booking_date, booking_time, guest_name, booking_type, details, status, user_id')
        .gte('booking_date', startDate)
        .lte('booking_date', endDate)
        .order('booking_time', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({ title: 'Error loading schedule', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const customerNames = useMemo(() => {
    const names = new Set(bookings.map((b) => b.guest_name));
    return Array.from(names).sort();
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (customerFilter === 'all') return bookings;
    return bookings.filter((b) => b.guest_name === customerFilter);
  }, [bookings, customerFilter]);

  function navigateDate(delta: number) {
    const next = new Date(currentDate);
    if (view === 'day') {
      next.setDate(next.getDate() + delta);
    } else {
      next.setDate(next.getDate() + delta * 7);
    }
    setCurrentDate(next);
  }

  function goToday() {
    setCurrentDate(new Date());
  }

  function getTypeColor(type: string) {
    return TYPE_COLORS[type] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }

  function getStatusDot(status: string) {
    return STATUS_DOT[status] || 'bg-gray-400';
  }

  function BookingCard({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
    return (
      <button
        onClick={() => setSelectedBooking(booking)}
        className={`w-full text-left rounded-lg border p-2 hover:bg-muted/50 transition-colors ${getTypeColor(booking.booking_type)}`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusDot(booking.status)}`} />
          <span className="text-sm font-medium truncate">{booking.guest_name}</span>
        </div>
        {!compact && booking.booking_time && (
          <p className="text-xs opacity-70 mt-0.5 ml-4">{booking.booking_time}</p>
        )}
        <Badge variant="outline" className={`mt-1 text-[10px] ${getTypeColor(booking.booking_type)}`}>
          {booking.booking_type}
        </Badge>
      </button>
    );
  }

  function DayView() {
    const dayBookings = filteredBookings.filter(
      (b) => b.booking_date === formatDate(currentDate)
    );

    return (
      <div className="space-y-0">
        {HOURS.map((hour) => {
          const hourBookings = dayBookings.filter((b) => {
            const h = parseHour(b.booking_time);
            return h === hour;
          });
          const unscheduled = hour === 8
            ? dayBookings.filter((b) => parseHour(b.booking_time) === null)
            : [];

          return (
            <div key={hour} className="flex border-b border-border/30 min-h-[60px]">
              <div className="w-20 shrink-0 py-2 pr-3 text-right text-sm text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 py-1 px-2 flex flex-wrap gap-2">
                {hour === 8 && unscheduled.map((b) => (
                  <div key={b.id} className="w-full sm:w-auto">
                    <BookingCard booking={b} />
                  </div>
                ))}
                {hourBookings.map((b) => (
                  <div key={b.id} className="w-full sm:w-auto">
                    <BookingCard booking={b} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function WeekView() {
    const weekDates = getWeekDates(currentDate);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="grid grid-cols-7 gap-px bg-border/30 rounded-lg overflow-hidden">
        {/* Header row */}
        {weekDates.map((date, i) => {
          const isToday = formatDate(date) === formatDate(new Date());
          return (
            <div
              key={i}
              className={`p-2 text-center text-sm font-medium bg-card ${isToday ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div>{dayNames[i]}</div>
              <div className={`text-lg ${isToday ? 'text-primary font-bold' : ''}`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}

        {/* Booking cells */}
        {weekDates.map((date, i) => {
          const dayBookings = filteredBookings.filter(
            (b) => b.booking_date === formatDate(date)
          );
          return (
            <div key={`cell-${i}`} className="bg-card p-1 min-h-[120px] space-y-1">
              {dayBookings.map((b) => (
                <BookingCard key={b.id} booking={b} compact />
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  const dateLabel = view === 'day'
    ? currentDate.toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : (() => {
        const week = getWeekDates(currentDate);
        return `${week[0].toLocaleDateString('en-AE', { month: 'short', day: 'numeric' })} - ${week[6].toLocaleDateString('en-AE', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">{dateLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={view === 'day' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>

          {/* Date Navigation */}
          <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customer Filter */}
      {customerNames.length > 0 && (
        <Select value={customerFilter} onValueChange={setCustomerFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Filter by customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            {customerNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Calendar Content */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No bookings for this period</p>
            </div>
          ) : view === 'day' ? (
            <DayView />
          ) : (
            <WeekView />
          )}
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${getStatusDot(selectedBooking.status)}`} />
                <span className="font-medium capitalize">{selectedBooking.status}</span>
                <Badge variant="outline" className={getTypeColor(selectedBooking.booking_type)}>
                  {selectedBooking.booking_type}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guest</span>
                  <span className="font-medium">{selectedBooking.guest_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{new Date(selectedBooking.booking_date).toLocaleDateString('en-AE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                {selectedBooking.booking_time && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedBooking.booking_time}</span>
                  </div>
                )}
                {selectedBooking.details && (
                  <div className="pt-2 border-t border-border/50">
                    <span className="text-muted-foreground block mb-1">Details</span>
                    <pre className="text-xs bg-muted/50 rounded p-2 whitespace-pre-wrap">
                      {typeof selectedBooking.details === 'string'
                        ? selectedBooking.details
                        : JSON.stringify(selectedBooking.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
