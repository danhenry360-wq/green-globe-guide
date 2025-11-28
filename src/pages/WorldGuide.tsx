import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.5.0";

// DEBUG: Check what environment variables are available
console.log("Environment check - RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));
console.log("All env vars:", Array.from(Deno.env.keys()));

// Use HARDCODED key only - ignore environment variables completely
const API_KEY = "re_FK68xe9X_62wcDi4sgpcPECZDkSgvDsH1";

// Validate the API key format
if (!API_KEY || !API_KEY.startsWith("re_") || API_KEY.length < 10) {
  throw new Error(`Invalid Resend API key format: ${API_KEY}`);
}

console.log("Using Resend API key:", API_KEY.substring(0, 10) + "...");

// Initialize Resend with the validated key
const resend = new Resend(API_KEY);
const supabaseUrl = Deno.env.get("SUPABASE_URL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeGuideRequest {
  email: string;
  destination: string;
}

const getDestinationContent = (destination: string) => {
  const destinations: Record<string, { title: string; emoji: string; highlights: string[] }> = {
    california: {
      title: "California",
      emoji: "🌴",
      highlights: [
        "Legal for recreational and medicinal use",
        "Licensed dispensaries in major cities",
        "Beach-side consumption lounges available"
      ]
    },
    colorado: {
      title: "Colorado",
      emoji: "🏔️",
      highlights: [
        "Pioneer of legal cannabis in the US",
        "Mountain retreat cannabis experiences",
        "Educational cannabis tours available"
      ]
    },
    netherlands: {
      title: "Netherlands",
      emoji: "🌷",
      highlights: [
        "Famous Amsterdam coffee shops",
        "Unique cannabis culture and history",
        "Bicycle-friendly cannabis tourism"
      ]
    }
  };

  return destinations[destination.toLowerCase()] || {
    title: "Your Destination",
    emoji: "🌿",
    highlights: [
      "Comprehensive cannabis travel information",
      "Safety guidelines and local laws",
      "Best practices for responsible consumption"
    ]
  };
};

const createEmailHTML = (email: string, destination: string) => {
  const destInfo = getDestinationContent(destination);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Free Cannabis Travel Guide</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                🌿 BudQuest
              </h1>
              <p style="margin: 10px 0 0; color: #f0fdf4; font-size: 16px;">
                Your Cannabis Travel Companion
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">
                Welcome to BudQuest! ${destInfo.emoji}
              </h2>
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for joining our community! We're excited to help you navigate cannabis-friendly travel in <strong>${destInfo.title}</strong>.
              </p>
              <p style="margin: 0 0 30px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Your <strong>free Cannabis Travel Safety Guide</strong> is attached to this email and ready for download!
              </p>
            </td>
          </tr>

          <!-- Key Highlights -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #065f46; font-size: 18px; font-weight: 600;">
                  What You'll Discover:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #047857;">
                  ${destInfo.highlights.map(highlight => 
                    `<li style="margin-bottom: 10px; line-height: 1.5;">${highlight}</li>`
                  ).join('')}
                </ul>
              </div>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px;">
                📎 Your guide is attached to this email
              </p>
              <a href="${supabaseUrl}/storage/v1/object/public/guides/cannabis-travel-guide.pdf" 
                 style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
                📥 Download Your Guide
              </a>
            </td>
          </tr>

          <!-- Safety Reminder -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>⚠️ Important Reminder:</strong> Cannabis laws vary by location. Always research local regulations and consume responsibly. This guide is for informational purposes only.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
                Questions? We're here to help!
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px;">
                Visit <a href="https://budquest.com" style="color: #10b981; text-decoration: none;">budquest.com</a> for more resources
              </p>
              <div style="margin: 20px 0 0;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  © 2025 BudQuest. Safe travels! 🌿
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`Received ${req.method} request to send-welcome-guide`);

  try {
    const contentType = req.headers.get('content-type') || '';
    let email: string;
    let destination: string;

    // Parse request body
    if (req.body && contentType.includes('application/json')) {
      const body: WelcomeGuideRequest = await req.json();
      email = body.email;
      destination = body.destination;
      console.log('Processing welcome guide for:', { email, destination });
    } else {
      console.error('Invalid content type:', contentType);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request', 
          details: 'Send JSON data with email and destination fields'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    if (!email || !destination) {
      console.error('Missing required fields:', { email: !!email, destination: !!destination });
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          required: ['email', 'destination']
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending welcome guide to ${email} for ${destination}`);

    // Generate HTML email content
    const htmlContent = createEmailHTML(email, destination);

    // PDF URL from Supabase Storage
    const pdfUrl = `${supabaseUrl}/storage/v1/object/public/guides/cannabis-travel-guide.pdf`;

    // Send email with PDF attachment using Resend
    const emailResponse = await resend.emails.send({
      from: "BudQuest <onboarding@resend.dev>",
      to: [email],
      subject: "🌿 Your Free Cannabis Travel Safety Guide is Here!",
      html: htmlContent,
      attachments: [
        {
          filename: "BudQuest-Cannabis-Travel-Guide.pdf",
          path: pdfUrl
        }
      ]
    });

    // PROPERLY CHECK FOR RESEND ERRORS
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email failed: ${emailResponse.error.message} (Code: ${emailResponse.error.statusCode})`);
    }

    console.log("Welcome guide email sent successfully:", emailResponse.data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Welcome guide sent to ${email}`,
        data: emailResponse.data
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-welcome-guide function:", error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send welcome guide',
        message: error.message,
        details: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
