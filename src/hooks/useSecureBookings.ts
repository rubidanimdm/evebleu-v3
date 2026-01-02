import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
  id: string;
  user_id: string;
  supplier_id: string;
  booking_number: string;
  booking_date: string;
  booking_time?: string;
  status: string;
  party_size: number;
  special_requests?: string;
  conversation_id?: string;
  created_at: string;
  updated_at: string;
  supplier?: {
    id: string;
    name: string;
    category: string;
    image_url?: string;
    location?: string;
  };
  financial?: {
    total_amount?: number;
    commission_amount?: number;
    payout_amount?: number;
    admin_notes?: string;
  };
}

export interface CreateBookingData {
  supplier_id: string;
  booking_date: string;
  booking_time?: string;
  party_size?: number;
  special_requests?: string;
  conversation_id?: string;
  total_amount?: number;
  commission_amount?: number;
}

export function useSecureBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBookings = useCallback(async (includeFinancials = false) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setBookings([]);
        return [];
      }

      const queryParams = includeFinancials ? '?include_financials=true' : '';
      
      const { data, error: fnError } = await supabase.functions.invoke(
        `get-user-bookings${queryParams}`
      );

      if (fnError) {
        console.error('Error fetching bookings:', fnError);
        setError('Failed to fetch bookings');
        return [];
      }

      setBookings(data.bookings || []);
      return data.bookings || [];
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (bookingData: CreateBookingData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Not authenticated',
          description: 'Please sign in to make a booking.',
          variant: 'destructive',
        });
        return null;
      }

      const { data, error: fnError } = await supabase.functions.invoke('create-booking', {
        body: bookingData,
      });

      if (fnError) {
        console.error('Error creating booking:', fnError);
        toast({
          title: 'Booking failed',
          description: 'Could not create your booking. Please try again.',
          variant: 'destructive',
        });
        return null;
      }

      // Refresh bookings list
      await fetchBookings();

      toast({
        title: 'Booking confirmed',
        description: `Your booking ${data.booking.booking_number} has been created.`,
      });

      return data.booking;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchBookings, toast]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    setBookings,
  };
}
