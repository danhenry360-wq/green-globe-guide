import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LawUpdate {
  type: 'state' | 'country';
  name: string;
  status?: 'legal' | 'medical' | 'decriminalized' | 'illegal';
  possession_limits?: string;
  purchase_limits?: string;
  consumption_notes?: string;
  penalties?: string;
  airport_rules?: string;
  tourist_notes?: string;
  where_to_consume?: string;
  driving_rules?: string;
  source_url?: string;
}

interface SyncRequest {
  secret: string;
  laws: LawUpdate[];
}

interface ChangeLog {
  type: 'state' | 'country';
  name: string;
  field: string;
  old_value: string | null;
  new_value: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get('CANNABIS_SYNC_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('CANNABIS_SYNC_WEBHOOK_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Webhook secret not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: SyncRequest = await req.json();
    
    // Validate webhook secret
    if (body.secret !== webhookSecret) {
      console.error('Invalid webhook secret provided');
      return new Response(
        JSON.stringify({ error: 'Invalid webhook secret' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.laws || !Array.isArray(body.laws)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: laws array required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${body.laws.length} law updates`);

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const changes: ChangeLog[] = [];
    let updated = 0;
    let unchanged = 0;
    let errors: string[] = [];

    for (const law of body.laws) {
      try {
        if (law.type === 'state') {
          // Fetch current state data
          const { data: currentState, error: fetchError } = await supabase
            .from('states')
            .select('*')
            .ilike('name', law.name)
            .single();

          if (fetchError) {
            console.log(`State not found: ${law.name}`);
            errors.push(`State not found: ${law.name}`);
            continue;
          }

          // Compare and build update object
          const updates: Record<string, any> = {};
          const stateFields = ['status', 'possession_limits', 'tourist_notes', 'where_to_consume', 'driving_rules', 'airport_rules'];
          
          for (const field of stateFields) {
            const newValue = law[field as keyof LawUpdate];
            const currentValue = currentState[field];
            
            if (newValue !== undefined && newValue !== currentValue) {
              updates[field] = newValue;
              changes.push({
                type: 'state',
                name: law.name,
                field,
                old_value: currentValue,
                new_value: newValue as string
              });
            }
          }

          if (Object.keys(updates).length > 0) {
            updates.last_updated = new Date().toISOString();
            
            const { error: updateError } = await supabase
              .from('states')
              .update(updates)
              .eq('id', currentState.id);

            if (updateError) {
              console.error(`Error updating state ${law.name}:`, updateError);
              errors.push(`Failed to update state ${law.name}: ${updateError.message}`);
            } else {
              console.log(`Updated state: ${law.name} - ${Object.keys(updates).join(', ')}`);
              updated++;
            }
          } else {
            unchanged++;
          }

        } else if (law.type === 'country') {
          // Fetch current country data
          const { data: currentCountry, error: fetchError } = await supabase
            .from('countries')
            .select('*')
            .ilike('name', law.name)
            .single();

          if (fetchError) {
            console.log(`Country not found: ${law.name}`);
            errors.push(`Country not found: ${law.name}`);
            continue;
          }

          // Compare and build update object
          const updates: Record<string, any> = {};
          const countryFields = ['status', 'possession_limits', 'purchase_limits', 'consumption_notes', 'penalties', 'airport_rules', 'source_url'];
          
          for (const field of countryFields) {
            const newValue = law[field as keyof LawUpdate];
            const currentValue = currentCountry[field];
            
            if (newValue !== undefined && newValue !== currentValue) {
              updates[field] = newValue;
              changes.push({
                type: 'country',
                name: law.name,
                field,
                old_value: currentValue,
                new_value: newValue as string
              });
            }
          }

          if (Object.keys(updates).length > 0) {
            updates.last_updated = new Date().toISOString();
            
            const { error: updateError } = await supabase
              .from('countries')
              .update(updates)
              .eq('id', currentCountry.id);

            if (updateError) {
              console.error(`Error updating country ${law.name}:`, updateError);
              errors.push(`Failed to update country ${law.name}: ${updateError.message}`);
            } else {
              console.log(`Updated country: ${law.name} - ${Object.keys(updates).join(', ')}`);
              updated++;
            }
          } else {
            unchanged++;
          }
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error(`Error processing ${law.type} ${law.name}:`, err);
        errors.push(`Error processing ${law.type} ${law.name}: ${errorMessage}`);
      }
    }

    const summary = {
      success: true,
      updated,
      unchanged,
      total: body.laws.length,
      changes,
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('Sync complete:', JSON.stringify(summary));

    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in sync-cannabis-laws:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
