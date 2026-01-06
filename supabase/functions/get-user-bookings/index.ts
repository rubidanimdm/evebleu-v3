import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCorsPreflightStrict } from "../_shared/cors.ts";

serve(async (req) => {
  // Strict CORS - production origins only
  const corsResponse = handleCorsPreflightStrict(req);
  if (corsResponse) return corsResponse;
  
  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));

  try {
    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create user client to verify auth
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Fetching bookings for user:", user.id);

    // Parse query params
    const url = new URL(req.url);
    const includeFinancials = url.searchParams.get("include_financials") === "true";
    const bookingId = url.searchParams.get("booking_id");

    // Use service role to access data
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch public bookings with supplier info
    let bookingsQuery = adminClient
      .from("bookings_public")
      .select(`
        *,
        supplier:suppliers(id, name, category, image_url, location)
      `)
      .eq("user_id", user.id)
      .order("booking_date", { ascending: false });

    if (bookingId) {
      bookingsQuery = bookingsQuery.eq("id", bookingId);
    }

    const { data: bookings, error: bookingsError } = await bookingsQuery;

    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch bookings" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If financials requested, fetch them separately
    let result = bookings;
    
    if (includeFinancials && bookings && bookings.length > 0) {
      const bookingIds = bookings.map((b: { id: string }) => b.id);
      
      const { data: financials, error: financialsError } = await adminClient
        .from("bookings_financial")
        .select("*")
        .in("booking_id", bookingIds);

      if (financialsError) {
        console.error("Error fetching financials:", financialsError);
        // Continue without financials rather than failing
      } else if (financials) {
        // Merge financials into bookings
        const financialsMap = new Map(financials.map((f: { booking_id: string }) => [f.booking_id, f]));
        result = bookings.map((booking: { id: string }) => ({
          ...booking,
          financial: financialsMap.get(booking.id) || null,
        }));
      }
    }

    console.log("Fetched", result?.length || 0, "bookings");

    return new Response(
      JSON.stringify({ bookings: result }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
