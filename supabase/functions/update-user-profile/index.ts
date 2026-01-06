import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCorsPreflightStrict } from "../_shared/cors.ts";

// Fields that belong to public profile
const PUBLIC_FIELDS = [
  "full_name", "building_name", "apartment_unit", "language", "city",
  "dietary_preferences", "preferred_areas", "budget_style", "favorite_cuisines"
];

// Fields that belong to private profile
const PRIVATE_FIELDS = ["email", "phone", "invoice_email", "special_notes"];

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

    // Parse request body
    const updates = await req.json();
    console.log("Updating profile for user:", user.id, "with:", Object.keys(updates));

    // Split updates into public and private
    const publicUpdates: Record<string, unknown> = {};
    const privateUpdates: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(updates)) {
      if (PUBLIC_FIELDS.includes(key)) {
        publicUpdates[key] = value;
      } else if (PRIVATE_FIELDS.includes(key)) {
        privateUpdates[key] = value;
      }
    }

    // Use service role to update data
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const errors: string[] = [];

    // Update public profile if there are changes
    if (Object.keys(publicUpdates).length > 0) {
      const { error } = await adminClient
        .from("profiles_public")
        .update(publicUpdates)
        .eq("id", user.id);
      
      if (error) {
        console.error("Error updating public profile:", error);
        errors.push("Failed to update public profile");
      }
    }

    // Update private profile if there are changes
    if (Object.keys(privateUpdates).length > 0) {
      const { error } = await adminClient
        .from("profiles_private")
        .update(privateUpdates)
        .eq("id", user.id);
      
      if (error) {
        console.error("Error updating private profile:", error);
        errors.push("Failed to update private profile");
      }
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: errors.join(", ") }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Profile updated successfully");

    return new Response(
      JSON.stringify({ success: true }),
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
