import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders, handleCorsPreflightStrict } from "../_shared/cors.ts";

interface UserSummary {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  roles: string[];
  created_at: string;
  last_seen: string;
}

Deno.serve(async (req) => {
  // Strict CORS - production origins only
  const corsResponse = handleCorsPreflightStrict(req);
  if (corsResponse) return corsResponse;

  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));
  const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: jsonHeaders }
      );
    }

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
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: jsonHeaders }
      );
    }

    // Service role client for admin operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get caller's roles
    const { data: callerRoles } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    const callerRoleNames = (callerRoles || []).map(r => r.role);
    const isOwner = callerRoleNames.includes('owner');
    const isManager = callerRoleNames.includes('manager');
    const isStaff = callerRoleNames.includes('staff');

    if (!isOwner && !isManager && !isStaff) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: jsonHeaders }
      );
    }

    // Parse request body
    const body = await req.json();
    const { action } = body;

    // ── LIST ──
    if (action === 'list') {
      const { data: { users: authUsers }, error: listError } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
      if (listError) throw listError;

      // Fetch all roles
      const { data: allRoles } = await adminClient
        .from('user_roles')
        .select('user_id, role');

      // Fetch public profiles
      const { data: publicProfiles } = await adminClient
        .from('profiles_public')
        .select('id, full_name, last_seen');

      // Fetch private profiles
      const { data: privateProfiles } = await adminClient
        .from('profiles_private')
        .select('id, email, phone');

      // Build lookup maps
      const rolesMap = new Map<string, string[]>();
      for (const r of allRoles || []) {
        const existing = rolesMap.get(r.user_id) || [];
        existing.push(r.role);
        rolesMap.set(r.user_id, existing);
      }

      const publicMap = new Map((publicProfiles || []).map(p => [p.id, p]));
      const privateMap = new Map((privateProfiles || []).map(p => [p.id, p]));

      const users: UserSummary[] = (authUsers || []).map(au => {
        const pub = publicMap.get(au.id);
        const priv = privateMap.get(au.id);
        return {
          id: au.id,
          email: priv?.email || au.email || '',
          full_name: pub?.full_name || au.user_metadata?.full_name || '',
          phone: priv?.phone || au.phone || '',
          roles: rolesMap.get(au.id) || [],
          created_at: au.created_at,
          last_seen: pub?.last_seen || au.last_sign_in_at || au.created_at,
        };
      });

      return new Response(
        JSON.stringify({ users }),
        { headers: jsonHeaders }
      );
    }

    // ── CREATE ──
    if (action === 'create') {
      if (!isOwner && !isManager) {
        return new Response(
          JSON.stringify({ error: 'Only owners and managers can create users' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      const { email, password, full_name, phone, initial_role } = body;

      if (!email || !password || !full_name) {
        return new Response(
          JSON.stringify({ error: 'Email, password, and full name are required' }),
          { status: 400, headers: jsonHeaders }
        );
      }

      if (password.length < 8) {
        return new Response(
          JSON.stringify({ error: 'Password must be at least 8 characters' }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Create user via admin API
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, phone: phone || null },
      });

      if (createError) {
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Assign initial role if provided (owner role cannot be assigned via UI)
      if (initial_role && initial_role !== 'owner') {
        // Permission check: managers can only assign staff/resident
        if (isManager && !isOwner && !['staff', 'resident'].includes(initial_role)) {
          return new Response(
            JSON.stringify({ error: 'Managers can only assign staff or resident roles' }),
            { status: 403, headers: jsonHeaders }
          );
        }

        await adminClient
          .from('user_roles')
          .insert({ user_id: newUser.user!.id, role: initial_role });
      }

      // Log to audit_logs
      await adminClient.from('audit_logs').insert({
        user_id: user.id,
        action: 'create_user',
        entity_type: 'user',
        entity_id: newUser.user!.id,
        new_data: { email, full_name, initial_role: initial_role || null },
      });

      return new Response(
        JSON.stringify({ user: newUser.user }),
        { headers: jsonHeaders }
      );
    }

    // ── ASSIGN ROLE ──
    if (action === 'assign_role') {
      if (!isOwner && !isManager) {
        return new Response(
          JSON.stringify({ error: 'Only owners and managers can assign roles' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      const { user_id: targetUserId, role } = body;

      if (!targetUserId || !role) {
        return new Response(
          JSON.stringify({ error: 'user_id and role are required' }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Owner role cannot be assigned via UI
      if (role === 'owner') {
        return new Response(
          JSON.stringify({ error: 'Owner role can only be assigned via database migration' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      // Managers can only assign staff/resident
      if (isManager && !isOwner && !['staff', 'resident'].includes(role)) {
        return new Response(
          JSON.stringify({ error: 'Managers can only assign staff or resident roles' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      // Check if role already exists
      const { data: existing } = await adminClient
        .from('user_roles')
        .select('id')
        .eq('user_id', targetUserId)
        .eq('role', role)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ error: 'User already has this role' }),
          { status: 400, headers: jsonHeaders }
        );
      }

      const { error: insertError } = await adminClient
        .from('user_roles')
        .insert({ user_id: targetUserId, role });

      if (insertError) {
        return new Response(
          JSON.stringify({ error: insertError.message }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Log to audit_logs
      await adminClient.from('audit_logs').insert({
        user_id: user.id,
        action: 'assign_role',
        entity_type: 'user_role',
        entity_id: targetUserId,
        new_data: { role },
      });

      return new Response(
        JSON.stringify({ success: true }),
        { headers: jsonHeaders }
      );
    }

    // ── REMOVE ROLE ──
    if (action === 'remove_role') {
      if (!isOwner && !isManager) {
        return new Response(
          JSON.stringify({ error: 'Only owners and managers can remove roles' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      const { user_id: targetUserId, role } = body;

      if (!targetUserId || !role) {
        return new Response(
          JSON.stringify({ error: 'user_id and role are required' }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Cannot remove owner role via UI
      if (role === 'owner') {
        return new Response(
          JSON.stringify({ error: 'Owner role cannot be removed via the UI' }),
          { status: 403, headers: jsonHeaders }
        );
      }

      // Cannot remove your own last admin role
      if (targetUserId === user.id) {
        const { data: ownRoles } = await adminClient
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        const adminRoles = (ownRoles || []).filter(r => ['owner', 'manager', 'staff'].includes(r.role));
        if (adminRoles.length <= 1 && adminRoles.some(r => r.role === role)) {
          return new Response(
            JSON.stringify({ error: 'Cannot remove your own last admin role' }),
            { status: 400, headers: jsonHeaders }
          );
        }
      }

      const { error: deleteError } = await adminClient
        .from('user_roles')
        .delete()
        .eq('user_id', targetUserId)
        .eq('role', role);

      if (deleteError) {
        return new Response(
          JSON.stringify({ error: deleteError.message }),
          { status: 400, headers: jsonHeaders }
        );
      }

      // Log to audit_logs
      await adminClient.from('audit_logs').insert({
        user_id: user.id,
        action: 'remove_role',
        entity_type: 'user_role',
        entity_id: targetUserId,
        old_data: { role },
      });

      return new Response(
        JSON.stringify({ success: true }),
        { headers: jsonHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: jsonHeaders }
    );
  } catch (error) {
    console.error('Error in manage-admin-users:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
