import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    console.log('Received conversion webhook:', payload);

    // Extract data from webhook payload
    // This is a generic format - adapt to specific platform webhooks
    const {
      blog_post_id,
      booking_id,
      booking_amount,
      commission_amount,
      commission_rate,
      platform = 'unknown',
      customer_email,
      status = 'pending',
      click_id = null,
    } = payload;

    if (!blog_post_id) {
      console.error('Missing required field: blog_post_id');
      return new Response(
        JSON.stringify({ error: 'blog_post_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store conversion
    const { data, error } = await supabase.from('affiliate_conversions').insert({
      blog_post_id,
      click_id,
      booking_id,
      booking_amount,
      commission_amount,
      commission_rate,
      platform,
      customer_email,
      status,
      webhook_data: payload,
    }).select().single();

    if (error) {
      console.error('Error storing conversion:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to store conversion' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Conversion tracked successfully:', data.id);

    return new Response(
      JSON.stringify({ success: true, conversion_id: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in track-affiliate-conversion:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
