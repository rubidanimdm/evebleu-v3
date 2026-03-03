import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders, handleCorsPreflightStrict } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  // Strict CORS - production origins only
  const corsResponse = handleCorsPreflightStrict(req);
  if (corsResponse) return corsResponse;
  
  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));

  try {
    // Get user IDs from request body
    const { userIds } = await req.json();
    if (!userIds || !Array.isArray(userIds)) {
      return new Response(
        JSON.stringify({ error: 'User IDs array required' }),
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

    // Fetch public profiles
    const { data: publicProfiles } = await adminClient
      .from('profiles_public')
      .select('id, full_name')
      .in('id', userIds);

    // Fetch private profiles for email
    const { data: privateProfiles } = await adminClient
      .from('profiles_private')
      .select('id, email')
      .in('id', userIds);

    // Create maps
    const publicMap = new Map(publicProfiles?.map(p => [p.id, p]) || []);
    const privateMap = new Map(privateProfiles?.map(p => [p.id, p]) || []);

    // Combine profile data
    const profiles = userIds.map(id => ({
      id,
      full_name: publicMap.get(id)?.full_name || 'Unknown',
      email: privateMap.get(id)?.email || '',
    }));

    console.log('Returning', profiles.length, 'profiles');

    return new Response(
      JSON.stringify({ profiles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-admin-inbox-profiles:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch profiles' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
