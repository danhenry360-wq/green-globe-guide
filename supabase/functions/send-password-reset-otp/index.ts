import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
}

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate OTP and expiration (15 minutes)
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user exists
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    const userExists = userData?.users?.some(user => user.email === email);
    
    if (!userExists) {
      // Don't reveal if user exists or not for security
      // Still return success to prevent email enumeration
      console.log(`Password reset requested for non-existent email: ${email}`);
      return new Response(
        JSON.stringify({ success: true, message: "If an account exists, a reset code will be sent" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Invalidate any existing OTPs for this email (password reset type)
    await supabase
      .from("otp_codes")
      .update({ used: true })
      .eq("email", email)
      .eq("used", false);

    // Store OTP in database with type indicator
    const { error: insertError } = await supabase
      .from("otp_codes")
      .insert({
        email,
        code: otp,
        expires_at: expiresAt,
        used: false,
      });

    if (insertError) {
      console.error("Error storing OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to generate reset code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email with OTP
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #22c55e; font-size: 28px; margin: 0; text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);">🌿 BudQuest</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #1a1a1a, #0d0d0d); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px; padding: 32px; text-align: center;">
              <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px;">Password Reset Code</h2>
              <p style="color: #a3a3a3; font-size: 16px; margin: 0 0 24px; line-height: 1.5;">
                Use this code to reset your password. It expires in 15 minutes.
              </p>
              
              <div style="background: rgba(34, 197, 94, 0.1); border: 2px dashed rgba(34, 197, 94, 0.5); border-radius: 12px; padding: 24px; margin: 24px 0;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #22c55e; font-family: monospace;">${otp}</span>
              </div>
              
              <p style="color: #737373; font-size: 14px; margin: 24px 0 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #525252; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} BudQuest. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "BudQuest <noreply@resend.dev>",
      to: [email],
      subject: "🔐 Your BudQuest Password Reset Code",
      html: emailHtml,
    });

    if (emailError) {
      console.error("Error sending email:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send reset code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Password reset OTP sent to: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Reset code sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-password-reset-otp:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
