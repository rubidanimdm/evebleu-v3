import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: caller } } = await anonClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Check caller is owner or manager
    const { data: callerRoles } = await anonClient.from("user_roles").select("role").eq("user_id", caller.id);
    const callerRoleSet = new Set(callerRoles?.map(r => r.role) || []);
    if (!callerRoleSet.has("owner") && !callerRoleSet.has("manager")) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const body = await req.json();
    const { action } = body;

    if (action === "create_staff") {
      const { email, password, full_name, role, permissions } = body;

      // Create user
      const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, building_name: "EVE BLUE Staff" },
      });

      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const userId = userData.user!.id;

      // Assign role
      await adminClient.from("user_roles").insert({ user_id: userId, role: role || "staff" });

      // If staff with specific permissions, insert them
      if (permissions && Array.isArray(permissions)) {
        const permRows = permissions.map((p: any) => ({
          user_id: userId,
          screen_key: p.screen_key,
          can_view: p.can_view ?? true,
          can_edit: p.can_edit ?? false,
        }));
        await adminClient.from("staff_permissions").insert(permRows);
      }

      return new Response(JSON.stringify({ success: true, user_id: userId }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update_permissions") {
      const { user_id, permissions } = body;

      // Delete existing permissions
      await adminClient.from("staff_permissions").delete().eq("user_id", user_id);

      // Insert new permissions
      if (permissions && Array.isArray(permissions) && permissions.length > 0) {
        const permRows = permissions.map((p: any) => ({
          user_id,
          screen_key: p.screen_key,
          can_view: p.can_view ?? true,
          can_edit: p.can_edit ?? false,
        }));
        await adminClient.from("staff_permissions").insert(permRows);
      }

      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "update_role") {
      const { user_id, new_role } = body;
      
      // Delete old roles
      await adminClient.from("user_roles").delete().eq("user_id", user_id);
      // Insert new role
      await adminClient.from("user_roles").insert({ user_id, role: new_role });

      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "delete_staff") {
      const { user_id } = body;
      
      // Don't allow deleting owners
      const { data: targetRoles } = await adminClient.from("user_roles").select("role").eq("user_id", user_id);
      if (targetRoles?.some(r => r.role === "owner")) {
        return new Response(JSON.stringify({ error: "Cannot delete owner" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Remove permissions and role
      await adminClient.from("staff_permissions").delete().eq("user_id", user_id);
      await adminClient.from("user_roles").delete().eq("user_id", user_id);

      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "list_staff") {
      // Get all users with admin roles
      const { data: allRoles } = await adminClient.from("user_roles").select("*").order("created_at");
      const userIds = [...new Set(allRoles?.map(r => r.user_id) || [])];

      if (userIds.length === 0) {
        return new Response(JSON.stringify({ staff: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Get profiles
      const { data: profiles } = await adminClient.from("profiles_public").select("id, full_name").in("id", userIds);
      const { data: privProfiles } = await adminClient.from("profiles_private").select("id, email").in("id", userIds);

      // Get permissions for staff
      const { data: allPerms } = await adminClient.from("staff_permissions").select("*").in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      const privMap = new Map(privProfiles?.map(p => [p.id, p]) || []);
      const permsByUser = new Map<string, any[]>();
      allPerms?.forEach(p => {
        if (!permsByUser.has(p.user_id)) permsByUser.set(p.user_id, []);
        permsByUser.get(p.user_id)!.push(p);
      });

      // Group roles by user
      const userRolesMap = new Map<string, string[]>();
      allRoles?.forEach(r => {
        if (!userRolesMap.has(r.user_id)) userRolesMap.set(r.user_id, []);
        userRolesMap.get(r.user_id)!.push(r.role);
      });

      const staff = userIds.map(uid => ({
        user_id: uid,
        full_name: profileMap.get(uid)?.full_name || "Unknown",
        email: privMap.get(uid)?.email || "",
        roles: userRolesMap.get(uid) || [],
        permissions: permsByUser.get(uid) || [],
      }));

      return new Response(JSON.stringify({ staff }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
