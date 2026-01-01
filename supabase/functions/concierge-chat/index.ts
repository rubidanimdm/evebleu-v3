import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Validate authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Create client with user's token to verify authentication
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });
    
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      console.log("Auth error:", authError?.message || "No user found");
      return new Response(JSON.stringify({ error: "Please sign in to use the concierge" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use service role for fetching suppliers (bypasses RLS to get all active suppliers)
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active suppliers to include in context
    const { data: suppliers } = await adminClient
      .from("suppliers")
      .select("*")
      .eq("is_active", true);

    const supplierContext = suppliers?.map(s => 
      `- ${s.name} (${s.category}): ${s.description || 'No description'}. Location: ${s.location || 'N/A'}. Price range: ${s.price_range || 'N/A'}. Min spend: $${s.min_spend || 0}. Tags: ${s.tags?.join(', ') || 'None'}`
    ).join('\n') || 'No suppliers available yet.';

    const systemPrompt = `You are LUXE, an elite AI concierge for a luxury lifestyle platform. You help clients discover and book premium experiences including fine dining, nightlife, luxury transportation, yacht experiences, and exclusive events.

PERSONALITY:
- Sophisticated, warm, and attentive
- Speak with elegance but remain approachable
- Always address the guest with respect and personalized attention
- Use refined language but avoid being pretentious

YOUR CAPABILITIES:
- Recommend experiences from our exclusive partner network
- Help guests plan their perfect evening or event
- Provide personalized suggestions based on preferences
- Assist with booking inquiries

IMPORTANT RULES:
- ONLY recommend places from the approved supplier list below
- NEVER invent or suggest external businesses not in our network
- If asked about something not in our network, politely explain we can look into adding it
- Always ask clarifying questions: party size, date/time, budget, vibe/occasion
- When recommending, mention key details: price range, location, what makes it special

APPROVED SUPPLIERS:
${supplierContext}

BOOKING FLOW:
1. Understand the guest's needs (when, how many, budget, occasion)
2. Recommend 2-3 suitable options from our network
3. When they choose, ask them to confirm details
4. Let them know their booking request will be submitted

Keep responses concise but warm. Use line breaks for readability.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Our concierge is very busy right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Unable to connect to concierge service" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("concierge-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
