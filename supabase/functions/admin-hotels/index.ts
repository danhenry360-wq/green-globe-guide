import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AdminHotelsPayload = {
  action?: "create" | "update" | "delete";
  data?: Record<string, unknown>;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
      console.error("Missing environment variables", {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
        hasAnonKey: !!supabaseAnonKey,
      });
      return json({ error: "Server misconfigured" }, 500);
    }

    // Create client with user's auth token to verify they're an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Authorization required" }, 401);
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      console.error("Auth error:", userError);
      return json({ error: "Unauthorized" }, 401);
    }

    // Check if user is admin
    const { data: isAdmin, error: roleError } = await userClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      console.error("Role check failed:", roleError, { userId: user.id, isAdmin });
      return json({ error: "Admin access required" }, 403);
    }

    // Create service client to bypass RLS for actual operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    let payload: AdminHotelsPayload = {};
    try {
      payload = (await req.json()) as AdminHotelsPayload;
    } catch (e) {
      console.error("Invalid JSON body:", e);
      return json({ error: "Invalid JSON body" }, 400);
    }

    const action = payload?.action;
    const data = payload?.data;

    console.log("Admin hotels request", {
      userId: user.id,
      action,
      hasData: !!data,
    });

    if (!action) {
      return json({ error: "Action required" }, 400);
    }

    if (!data || typeof data !== "object") {
      return json({ error: "Data required" }, 400);
    }

    let result: unknown;

    switch (action) {
      case "create": {
        console.log("Creating hotel", { keys: Object.keys(data) });
        const { error } = await serviceClient.from("hotels").insert([data]);
        if (error) {
          console.error("Create error:", error);
          throw error;
        }
        result = { success: true, message: "Hotel created successfully" };
        break;
      }

      case "update": {
        const { id, ...updates } = data as { id?: string } & Record<string, unknown>;
        if (!id) return json({ error: "Hotel id required" }, 400);

        console.log("Updating hotel", { id, keys: Object.keys(updates) });
        const { error } = await serviceClient.from("hotels").update(updates).eq("id", id);
        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        result = { success: true, message: "Hotel updated successfully" };
        break;
      }

      case "delete": {
        const id = (data as any)?.id as string | undefined;
        if (!id) return json({ error: "Hotel id required" }, 400);

        console.log("Deleting hotel", { id });
        const { error } = await serviceClient.from("hotels").delete().eq("id", id);
        if (error) {
          console.error("Delete error:", error);
          throw error;
        }
        result = { success: true, message: "Hotel deleted successfully" };
        break;
      }

      default:
        return json({ error: "Invalid action" }, 400);
    }

    return json(result);
  } catch (error) {
    console.error("Error in admin-hotels function:", error);

    const err = error as any;
    const errorMessage = err?.message || "Unknown error";
    const code = err?.code as string | undefined;

    // Prefer returning actionable client errors for common PostgREST/Postgres cases.
    let status = 500;
    if (code) status = code === "23505" ? 409 : 400;

    const friendly =
      code === "23505"
        ? "A hotel with this slug already exists. Please choose a different name/slug."
        : undefined;

    return json(
      {
        error: friendly ?? errorMessage,
        code,
        details: err?.details,
        hint: err?.hint,
      },
      status,
    );
  }
});
