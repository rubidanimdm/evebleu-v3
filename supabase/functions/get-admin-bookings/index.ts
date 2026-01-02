import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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

    // Create Supabase clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
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

    // Verify user is a manager or staff
    const { data: userRole } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['manager', 'staff'])
      .single();

    if (!userRole) {
      console.error('User is not an admin:', user.id);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin role verified:', userRole.role);

    // Fetch bookings from bookings_public with suppliers
    const { data: bookingsPublic, error: bookingsError } = await adminClient
      .from('bookings_public')
      .select(`
        *,
        supplier:suppliers(name)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError);
      throw bookingsError;
    }

    // Get unique user IDs
    const userIds = [...new Set(bookingsPublic?.map(b => b.user_id) || [])];

    // Fetch public profiles for names
    const { data: publicProfiles } = await adminClient
      .from('profiles_public')
      .select('id, full_name')
      .in('id', userIds);

    // Fetch private profiles for email
    const { data: privateProfiles } = await adminClient
      .from('profiles_private')
      .select('id, email')
      .in('id', userIds);

    // Create profile maps
    const profileMap = new Map();
    publicProfiles?.forEach(p => {
      profileMap.set(p.id, { full_name: p.full_name });
    });
    privateProfiles?.forEach(p => {
      const existing = profileMap.get(p.id) || {};
      profileMap.set(p.id, { ...existing, email: p.email });
    });

    // Fetch financial data
    const bookingIds = bookingsPublic?.map(b => b.id) || [];
    const financialMap: Record<string, any> = {};
    
    if (bookingIds.length > 0) {
      const { data: financial } = await adminClient
        .from('bookings_financial')
        .select('*')
        .in('booking_id', bookingIds);

      financial?.forEach(f => {
        financialMap[f.booking_id] = f;
      });
    }

    // Combine all data
    const bookings = (bookingsPublic || []).map(b => ({
      id: b.id,
      booking_number: b.booking_number,
      booking_date: b.booking_date,
      booking_time: b.booking_time,
      party_size: b.party_size,
      status: b.status,
      special_requests: b.special_requests,
      created_at: b.created_at,
      total_amount: financialMap[b.id]?.total_amount || null,
      commission_amount: financialMap[b.id]?.commission_amount || null,
      admin_notes: financialMap[b.id]?.admin_notes || null,
      user: profileMap.get(b.user_id) || null,
      supplier: b.supplier,
    }));

    console.log('Returning', bookings.length, 'bookings');

    return new Response(
      JSON.stringify({ bookings }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-admin-bookings:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch bookings' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
