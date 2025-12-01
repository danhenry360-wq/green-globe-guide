import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const resend = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotifyReviewRequest {
  reviewId: string;
  status: 'approved' | 'rejected';
  userEmail: string;
  userName: string;
  propertyName: string;
  propertyType: 'dispensary' | 'rental';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewId, status, userEmail, userName, propertyName, propertyType }: NotifyReviewRequest = await req.json();

    console.log('Sending review status notification:', { reviewId, status, userEmail, propertyName });

    // Determine email content based on status
    const subject = status === 'approved' 
      ? '✅ Your Review Has Been Approved!' 
      : 'Your Review Status Update';

    const statusColor = status === 'approved' ? '#22c55e' : '#ef4444';
    const statusText = status === 'approved' ? 'Approved' : 'Rejected';
    const statusIcon = status === 'approved' ? '✅' : '❌';

    const messageBody = status === 'approved'
      ? `Great news! Your review for ${propertyName} has been approved and is now live on BudQuest. Thank you for contributing to our community!`
      : `Thank you for submitting your review for ${propertyName}. After careful consideration, we were unable to approve this review at this time. This may be due to content guidelines or other factors. You're welcome to submit a new review.`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Review Status Update</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);">
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #ffffff 0%, #22c55e 50%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        BudQuest
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Status Badge -->
                  <tr>
                    <td style="padding: 20px 40px; text-align: center;">
                      <div style="display: inline-block; padding: 12px 24px; background-color: ${statusColor}20; border: 1px solid ${statusColor}40; border-radius: 8px; color: ${statusColor}; font-weight: 600; font-size: 18px;">
                        ${statusIcon} Review ${statusText}
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 0 40px 20px;">
                      <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5; color: #e5e5e5;">
                        Hi ${userName || 'there'},
                      </p>
                      <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5; color: #e5e5e5;">
                        ${messageBody}
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Property Info -->
                  <tr>
                    <td style="padding: 0 40px 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0f0f; border: 1px solid #333; border-radius: 8px; padding: 20px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px; font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px;">
                              ${propertyType === 'dispensary' ? 'Dispensary' : '420 Rental'}
                            </p>
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #22c55e;">
                              ${propertyName}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- CTA Button -->
                  ${status === 'approved' ? `
                  <tr>
                    <td style="padding: 0 40px 40px; text-align: center;">
                      <a href="https://budquest.guide/profile" style="display: inline-block; padding: 14px 32px; background-color: #22c55e; color: #0a0a0a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        View Your Reviews
                      </a>
                    </td>
                  </tr>
                  ` : ''}
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; border-top: 1px solid #333; text-align: center;">
                      <p style="margin: 0 0 8px; font-size: 14px; color: #9ca3af;">
                        Thank you for being part of the BudQuest community!
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #6b7280;">
                        <a href="https://budquest.guide" style="color: #22c55e; text-decoration: none;">Visit BudQuest</a> • 
                        <a href="https://budquest.guide/about" style="color: #22c55e; text-decoration: none;">About Us</a> • 
                        <a href="https://budquest.guide/contact" style="color: #22c55e; text-decoration: none;">Contact</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resend}`,
      },
      body: JSON.stringify({
        from: "BudQuest <noreply@budquest.guide>",
        to: [userEmail],
        subject: subject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-review-status function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);