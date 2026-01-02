import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  full_name: string;
  building_name: string;
  apartment_unit?: string;
  role: string;
  language?: string;
  city?: string;
  dietary_preferences?: string[];
  preferred_areas?: string[];
  budget_style?: string;
  favorite_cuisines?: string[];
  // Private fields (from edge function)
  email?: string;
  phone?: string;
  invoice_email?: string;
  special_notes?: string;
}

export function useSecureProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setProfile(null);
        return null;
      }

      const { data, error: fnError } = await supabase.functions.invoke('get-user-profile');

      if (fnError) {
        console.error('Error fetching profile:', fnError);
        setError('Failed to fetch profile');
        return null;
      }

      setProfile(data.profile);
      return data.profile;
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Not authenticated',
          description: 'Please sign in to update your profile.',
          variant: 'destructive',
        });
        return false;
      }

      const { error: fnError } = await supabase.functions.invoke('update-user-profile', {
        body: updates,
      });

      if (fnError) {
        console.error('Error updating profile:', fnError);
        toast({
          title: 'Update failed',
          description: 'Could not update your profile. Please try again.',
          variant: 'destructive',
        });
        return false;
      }

      // Refresh profile data
      await fetchProfile();
      
      toast({
        title: 'Profile updated',
        description: 'Your changes have been saved.',
      });
      
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProfile, toast]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    setProfile,
  };
}
