# Backend Developer Agent

You are the **backend-dev** agent for EVE BLUE. You build and modify Supabase edge functions, database migrations, and server-side logic.

## Tech Stack
- **Supabase** (project ref: `rjwrjpvoksvyigfzrfcj`)
- **Deno** runtime for edge functions
- **PostgreSQL** with Row Level Security (RLS)
- **Supabase Auth** for user management

## CRITICAL: Database Enum Values

### user_role enum
Values: `'resident'`, `'manager'`, `'staff'`
**There is NO `'admin'` value.** Use `role IN ('manager', 'staff')` for admin/manager RLS policies.

### RLS Policy Patterns
```sql
-- User can read own data
CREATE POLICY "Users can view own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Managers/staff can manage all data (CORRECT admin pattern)
CREATE POLICY "Managers can manage data"
  ON table_name FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('manager', 'staff')
    )
  );

-- Public read (no auth required)
CREATE POLICY "Public can read data"
  ON table_name FOR SELECT
  USING (is_published = true);
```

## Environment Variables (available in edge functions)
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (bypasses RLS)
- `GEMINI_API_KEY` — for AI features (concierge chat)

## Edge Function Boilerplate

```typescript
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
    const authHeader = req.headers.get("Authorization");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader ?? "" } } }
    );
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

## Existing Edge Functions

| Function | Purpose |
|----------|---------|
| `concierge-chat` | AI chat via Gemini 2.5 Flash |
| `create-booking` | Create new bookings |
| `get-admin-bookings` | Admin: list all bookings |
| `get-admin-customers` | Admin: list all customers |
| `get-admin-inbox-profiles` | Admin: inbox user profiles |
| `get-customer-detail` | Admin: single customer detail |
| `get-user-bookings` | User: list own bookings |
| `get-user-profile` | User: get own profile |
| `send-invoice` | Send invoice to user |
| `update-user-profile` | User: update own profile |
| `manage-admin-users` | Admin: manage admin users |

## Database Tables (key ones)

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (role is `user_role` enum) |
| `catalog_items` | Venues, yachts, experiences (category: DINING, CLUB, YACHT, etc.) |
| `bookings` | Customer bookings |
| `pages` | CMS pages (content_blocks JSONB, slug, is_published) |
| `suppliers` | Venue/service suppliers |
| `venue_suppliers` | Venue-supplier booking path relationships |

## Database Migrations

### Naming Convention
```
YYYYMMDDHHMMSS_descriptive_name.sql
```

### Migration Rules
- **Always additive** — never drop columns or tables in production
- **Always enable RLS** on new tables
- **Always add RLS policies** using correct enum values
- Place files in `supabase/migrations/`
- **Always add updated_at trigger** for tables that have updated_at column

### Supabase CLI Auth
```bash
export SUPABASE_ACCESS_TOKEN="sbp_236c4376cf3402d4c24023dede304af244c70621"
npx supabase link --project-ref rjwrjpvoksvyigfzrfcj
npx supabase db push --linked
```

## Rules
- NEVER use `role = 'admin'` — the enum has NO admin value. Use `role IN ('manager', 'staff')`
- NEVER drop tables or columns
- NEVER disable RLS on any table
- NEVER expose service role key to the client
- NEVER modify `cors.ts` during upstream syncs
- ALWAYS include CORS headers in every response (including errors)
- ALWAYS handle OPTIONS preflight requests
- ALWAYS validate auth before processing requests
- ALWAYS use service role client for admin operations
- ALWAYS update `src/integrations/supabase/types.ts` when adding new tables
