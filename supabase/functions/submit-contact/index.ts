import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, category, message }: ContactSubmission = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !category || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate message length
    if (message.length < 20 || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 20 and 1000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Initialize Supabase client with service role for inserting
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Insert contact submission into database
    const { data: submission, error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name,
        email,
        subject,
        category,
        message,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Contact submission saved:", submission.id);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Send email notification to admin
    try {
      const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #22c55e;">🌿 New Contact Form</h1>
            </td>
          </tr>
          <tr>
            <td style="background: #1a1a1a; border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2); padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #71717a;">
                <strong style="color: #22c55e;">From:</strong> ${name} (${email})
              </p>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #71717a;">
                <strong style="color: #22c55e;">Category:</strong> ${category}
              </p>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #71717a;">
                <strong style="color: #22c55e;">Subject:</strong> ${subject}
              </p>
              <div style="background: #0a0a0a; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #ffffff; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
              <hr style="border: none; border-top: 1px solid rgba(34, 197, 94, 0.2); margin: 20px 0;">
              <p style="margin: 0; font-size: 12px; color: #52525b;">
                Submission ID: ${submission.id}<br>
                Received: ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      const adminEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BudQuest Contact <noreply@budquest.guide>",
          to: ["admin@budquest.guide"],
          subject: `New Contact Form: ${category} - ${subject}`,
          html: adminEmailHtml,
        }),
      });

      if (adminEmailResponse.ok) {
        console.log("Admin notification email sent");
      } else {
        console.error("Failed to send admin email (non-critical)");
      }
    } catch (emailError) {
      console.error("Failed to send admin email (non-critical):", emailError);
    }

    // Send confirmation email to user
    try {
      const userEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 480px; width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #22c55e;">🌿 BudQuest</h1>
            </td>
          </tr>
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; border: 1px solid rgba(34, 197, 94, 0.2); padding: 40px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #ffffff; text-align: center;">
                Thank you for contacting us!
              </h2>
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #a1a1aa; text-align: center;">
                Hi ${name}, we've received your message and will get back to you within 24 hours.
              </p>
              <div style="background: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #71717a;">
                  <strong style="color: #22c55e;">Subject:</strong> ${subject}
                </p>
                <p style="margin: 0; font-size: 14px; color: #71717a;">
                  <strong style="color: #22c55e;">Category:</strong> ${category}
                </p>
              </div>
              <p style="margin: 0; font-size: 13px; color: #52525b; text-align: center;">
                If you have urgent questions, email us at support@budquest.com
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #22c55e;">
                Happy travels! 🌿
              </p>
              <p style="margin: 0; font-size: 12px; color: #52525b;">
                The BudQuest Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      const userEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BudQuest <noreply@budquest.guide>",
          to: [email],
          subject: "We received your message - BudQuest",
          html: userEmailHtml,
        }),
      });

      if (userEmailResponse.ok) {
        console.log("Confirmation email sent to user");
      } else {
        console.error("Failed to send confirmation email (non-critical)");
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email (non-critical):", emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);