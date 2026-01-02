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
    // Get customer ID from request body
    const { customerId } = await req.json();
    if (!customerId) {
      return new Response(
        JSON.stringify({ error: 'Customer ID required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

    // Fetch public profile
    const { data: publicProfile, error: publicError } = await adminClient
      .from('profiles_public')
      .select('*')
      .eq('id', customerId)
      .single();

    if (publicError || !publicProfile) {
      console.error('Customer not found:', publicError);
      return new Response(
        JSON.stringify({ error: 'Customer not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch private profile
    const { data: privateProfile } = await adminClient
      .from('profiles_private')
      .select('*')
      .eq('id', customerId)
      .single();

    // Combine profile data
    const customer = {
      id: publicProfile.id,
      full_name: publicProfile.full_name,
      email: privateProfile?.email || '',
      phone: privateProfile?.phone || '',
      language: publicProfile.language,
      city: publicProfile.city,
      created_at: publicProfile.created_at,
      last_seen: publicProfile.last_seen,
      budget_style: publicProfile.budget_style,
      dietary_preferences: publicProfile.dietary_preferences,
      favorite_cuisines: publicProfile.favorite_cuisines,
      preferred_areas: publicProfile.preferred_areas,
    };

    // Fetch bookings from bookings_public
    const { data: bookingsPublic } = await adminClient
      .from('bookings_public')
      .select('*')
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    // Fetch financial data for these bookings
    const bookingIds = bookingsPublic?.map(b => b.id) || [];
    let financialData: Record<string, any> = {};
    
    if (bookingIds.length > 0) {
      const { data: financial } = await adminClient
        .from('bookings_financial')
        .select('*')
        .in('booking_id', bookingIds);

      financial?.forEach(f => {
        financialData[f.booking_id] = f;
      });
    }

    // Combine booking data
    const bookings = (bookingsPublic || []).map(b => ({
      id: b.id,
      booking_number: b.booking_number,
      booking_date: b.booking_date,
      booking_time: b.booking_time,
      party_size: b.party_size,
      status: b.status,
      special_requests: b.special_requests,
      total_amount: financialData[b.id]?.total_amount || 0,
      commission_amount: financialData[b.id]?.commission_amount || 0,
      supplier_id: b.supplier_id,
    }));

    // Fetch customer notes
    const { data: notes } = await adminClient
      .from('customer_notes')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    console.log('Returning customer details for:', customerId);

    return new Response(
      JSON.stringify({ customer, bookings, notes: notes || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-customer-detail:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch customer details' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
