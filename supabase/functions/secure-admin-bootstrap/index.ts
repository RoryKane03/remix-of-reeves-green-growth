
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { securityKey, userAgent, timestamp } = await req.json().catch(() => ({}));

    // Require JWT (auth)
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.log('[SECURITY] Unauthorized bootstrap attempt:', { authError, timestamp });
      return new Response(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Security logging
    console.log('[SECURITY] Admin bootstrap attempt:', {
      userId: user.id,
      email: user.email,
      userAgent,
      timestamp,
      hasSecurityKey: !!securityKey
    });

    // Strictly require ADMIN_BOOTSTRAP_KEY to be set; no fallback allowed
    const expectedKey = Deno.env.get('ADMIN_BOOTSTRAP_KEY');
    if (!expectedKey) {
      console.error('[SECURITY] Missing ADMIN_BOOTSTRAP_KEY secret - refusing bootstrap');
      // Also log to audit logs for visibility
      await supabase.from('audit_logs').insert({
        event: 'admin_bootstrap_error_missing_secret',
        entity: 'user_roles',
        actor_user_id: user.id,
        details: { email: user.email, userAgent, timestamp }
      });
      return new Response(
        JSON.stringify({ success: false, message: 'Server configuration error: ADMIN_BOOTSTRAP_KEY is not set' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    if (securityKey !== expectedKey) {
      console.log('[SECURITY] Invalid security key provided:', { userId: user.id, timestamp });
      await supabase.from('audit_logs').insert({
        event: 'admin_bootstrap_invalid_key',
        entity: 'user_roles',
        actor_user_id: user.id,
        details: { email: user.email, userAgent, timestamp }
      });
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid security key' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (existingAdmin && existingAdmin.length > 0) {
      console.log('[SECURITY] Admin bootstrap blocked - admin exists:', { userId: user.id, timestamp });
      return new Response(
        JSON.stringify({ success: false, message: 'Admin user already exists' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: user.id, role: 'admin' });

    if (roleError) {
      console.error('[SECURITY] Failed to create admin role:', { error: roleError, userId: user.id });
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to create admin role' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Log successful admin creation
    console.log('[SECURITY] Admin role created successfully:', {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString()
    });

    // Log to audit table
    await supabase.from('audit_logs').insert({
      event: 'admin_bootstrap_success',
      entity: 'user_roles',
      entity_id: user.id,
      actor_user_id: user.id,
      details: {
        email: user.email,
        userAgent,
        bootstrapTimestamp: timestamp
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Admin access granted' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[SECURITY] Admin bootstrap error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
