import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders, handleCorsPreflightStrict } from "../_shared/cors.ts";

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

Deno.serve(async (req) => {
  // Strict CORS - production origins only
  const corsResponse = handleCorsPreflightStrict(req);
  if (corsResponse) return corsResponse;
  
  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // User client to verify identity
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get current user
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      console.error('Failed to get user:', userError);
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User authenticated:', user.id);

    // Service role client for admin operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is a manager or staff using user_roles table
    const { data: userRole } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['owner', 'manager', 'staff'])
      .single();

    if (!userRole) {
      console.error('User is not an admin:', user.id);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin role verified:', userRole.role);

    // Fetch all profiles with resident role from profiles_public
    const { data: publicProfiles, error: profilesError } = await adminClient
      .from('profiles_public')
      .select('id, full_name, created_at, last_seen, role')
      .eq('role', 'resident');

    if (profilesError) {
      console.error('Error fetching public profiles:', profilesError);
      throw profilesError;
    }

    // Fetch private profiles for sensitive data
    const { data: privateProfiles, error: privateError } = await adminClient
      .from('profiles_private')
      .select('id, email, phone');

    if (privateError) {
      console.error('Error fetching private profiles:', privateError);
      throw privateError;
    }

    // Create a map for quick lookup
    const privateMap = new Map(privateProfiles?.map(p => [p.id, p]) || []);

    // Fetch booking counts and payment totals for each customer
    const customers: CustomerSummary[] = await Promise.all(
      (publicProfiles || []).map(async (profile) => {
        try {
          const privateData = privateMap.get(profile.id);

          // Get booking count from bookings_public
          const { count: bookingCount } = await adminClient
            .from('bookings_public')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', profile.id);

          // Get financial data from bookings_financial via bookings_public join
          const { data: bookingsPublic } = await adminClient
            .from('bookings_public')
            .select('id, status')
            .eq('user_id', profile.id)
            .eq('status', 'confirmed');

          let totalPaid = 0;
          if (bookingsPublic && bookingsPublic.length > 0) {
            const bookingIds = bookingsPublic.map(b => b.id);
            const { data: financial } = await adminClient
              .from('bookings_financial')
              .select('total_amount')
              .in('booking_id', bookingIds);

            totalPaid = financial?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0;
          }

          return {
            id: profile.id,
            full_name: profile.full_name,
            email: privateData?.email || '',
            phone: privateData?.phone || '',
            created_at: profile.created_at,
            last_seen: profile.last_seen || profile.created_at,
            total_paid: totalPaid,
            booking_count: bookingCount || 0,
          };
        } catch (err) {
          console.error('Error fetching data for customer', profile.id, err);
          const privateData = privateMap.get(profile.id);
          return {
            id: profile.id,
            full_name: profile.full_name,
            email: privateData?.email || '',
            phone: privateData?.phone || '',
            created_at: profile.created_at,
            last_seen: profile.last_seen || profile.created_at,
            total_paid: 0,
            booking_count: 0,
          };
        }
      })
    );

    console.log('Returning', customers.length, 'customers');

    return new Response(
      JSON.stringify({ customers }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-admin-customers:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch customers' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
