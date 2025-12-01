import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destinations, template, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log(`Generating ${destinations.length} blog posts for template: ${template}`);

    const systemPrompt = `You are a professional cannabis travel content writer. Generate detailed, accurate blog posts about cannabis laws and travel in specific destinations. 

CRITICAL RULES:
- All legal information must be accurate and current (2025)
- Include specific possession limits, age requirements, and consumption rules
- Mention real dispensaries or hotels when known
- Write in an engaging, informative tone
- Each section should be 2-3 sentences
- Focus on practical travel advice for cannabis tourists`;

    const templatePrompts = {
      'city-guide': (dest: any) => `Write a comprehensive cannabis travel guide for ${dest.name}, ${dest.state || dest.country}.

Include these exact sections:
1. Legal Status - Current cannabis laws (recreational/medical/illegal)
2. Age & Purchase - Age requirements and where to buy
3. Possession Limits - How much you can legally possess
4. Where to Consume - Public vs private consumption rules
5. Dispensary Info - Types of dispensaries and what to expect
6. Airport & Transport - TSA rules and local transport guidelines
7. Safety Tips - Important safety and legal precautions
8. Best Neighborhoods - Top areas for cannabis tourists
9. Local Etiquette - Cultural norms and dos/don'ts

Make it specific to ${dest.name} with real details.`,

      'state-guide': (dest: any) => `Write a comprehensive state-level cannabis guide for ${dest.name}.

Include these sections:
1. Overview - Current legal status and recent changes
2. Where to Buy - Types of dispensaries across the state
3. Possession Limits - State-wide possession rules
4. Consumption Laws - Where you can and cannot consume
5. Airport Rules - Flying in/out with cannabis
6. Driving Laws - DUI laws and cannabis in vehicles
7. Top Cities - Best cities for cannabis tourism
8. Tourist Tips - Important info for out-of-state visitors

Focus on state-wide regulations and top destinations.`,

      'comparison': (dest: any) => `Write a comparison guide: "${dest.name}".

Compare the two destinations on:
1. Legal Status - How laws differ between locations
2. Access - Ease of finding dispensaries/products
3. Quality - Product quality and variety
4. Prices - Cost comparison for typical products
5. Tourism - Cannabis tourism infrastructure
6. Culture - Local cannabis culture differences
7. Safety - Legal risks and safety considerations
8. Verdict - Which destination is better for what type of traveler

Be objective and include specific examples.`,

      'airport-guide': (dest: any) => `Write an airport cannabis guide for ${dest.name} Airport (${dest.code}).

Include:
1. TSA Rules - Federal vs state law conflicts
2. Departure Rules - Can you fly out with cannabis?
3. Arrival Rules - Bringing cannabis into this location
4. Local Laws - State/country laws at this airport
5. Consequences - What happens if caught
6. Alternatives - How to consume before/after flight
7. Nearby Dispensaries - Closest dispensaries to airport
8. Travel Tips - Best practices for cannabis travelers

Focus on practical, legal information.`
    };

    const results = [];

    for (const destination of destinations) {
      const promptTemplate = templatePrompts[template as keyof typeof templatePrompts];
      const userPrompt = promptTemplate(destination);

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          tools: [{
            type: "function",
            function: {
              name: "create_blog_post",
              description: "Structure the blog post content with sections",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "SEO-optimized title" },
                  subtitle: { type: "string", description: "Engaging subtitle" },
                  excerpt: { type: "string", description: "2-3 sentence summary" },
                  introduction: { type: "string", description: "Opening paragraph" },
                  sections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        heading: { type: "string" },
                        content: { type: "string" },
                        icon: { type: "string", enum: ["Scale", "ShoppingBag", "Home", "AlertCircle", "Plane", "Shield", "MapPin", "Users"] }
                      },
                      required: ["heading", "content", "icon"]
                    }
                  },
                  safetyTips: {
                    type: "array",
                    items: { type: "string" }
                  },
                  tags: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["title", "subtitle", "excerpt", "introduction", "sections", "safetyTips", "tags"]
              }
            }
          }],
          tool_choice: { type: "function", function: { name: "create_blog_post" } }
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.error('Rate limit exceeded');
          results.push({ 
            destination: destination.name, 
            error: 'Rate limit exceeded. Please wait and try again.' 
          });
          continue;
        }
        if (response.status === 402) {
          console.error('Payment required');
          results.push({ 
            destination: destination.name, 
            error: 'AI credits depleted. Please add credits to continue.' 
          });
          continue;
        }
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        results.push({ 
          destination: destination.name, 
          error: `AI generation failed: ${response.status}` 
        });
        continue;
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      
      if (!toolCall) {
        console.error('No tool call in response for', destination.name);
        results.push({ 
          destination: destination.name, 
          error: 'Invalid AI response format' 
        });
        continue;
      }

      const blogContent = JSON.parse(toolCall.function.arguments);
      
      // Generate slug from title
      const slug = blogContent.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      results.push({
        destination: destination.name,
        success: true,
        data: {
          title: blogContent.title,
          slug,
          subtitle: blogContent.subtitle,
          excerpt: blogContent.excerpt,
          content: {
            introduction: blogContent.introduction,
            disclaimer: "This information is for educational purposes only. Always verify current local laws before traveling. Cannabis remains illegal under federal law in the United States.",
            sections: blogContent.sections,
            safetyTips: blogContent.safetyTips
          },
          category,
          tags: blogContent.tags,
          image_url: destination.imageUrl || '/blog-placeholder.jpg'
        }
      });

      console.log(`Generated post for ${destination.name}`);
    }

    return new Response(
      JSON.stringify({ results }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-bulk-blog:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
