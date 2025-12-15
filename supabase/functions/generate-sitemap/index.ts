import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
};

const DOMAIN = 'https://budquest.guide';

// All static routes with their priorities and change frequencies
const STATIC_ROUTES = [
  // Core pages
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/home', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  
  // Main directories
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/dispensary', priority: '0.9', changefreq: 'daily' },
  { path: '/hotels', priority: '0.9', changefreq: 'daily' },
  { path: '/tours', priority: '0.8', changefreq: 'weekly' },
  { path: '/world', priority: '0.9', changefreq: 'weekly' },
  { path: '/usa', priority: '0.9', changefreq: 'weekly' },
  
  // Colorado Hub & Special Guides
  { path: '/usa/colorado', priority: '0.9', changefreq: 'weekly' },
  { path: '/colorado/consumption-guide', priority: '0.8', changefreq: 'monthly' },
  { path: '/colorado/federal-land-warning', priority: '0.8', changefreq: 'monthly' },
  { path: '/colorado/altitude-guide', priority: '0.8', changefreq: 'monthly' },
  
  // Colorado City Guides
  { path: '/colorado/denver', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/boulder', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/aspen', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/colorado-springs', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/fort-collins', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/thornton', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/aurora', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/lakewood', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/longmont', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/pueblo', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/loveland', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/estes-park', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/greeley', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/castle-rock', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/broomfield', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/westminster', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/arvada', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/centennial', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/grand-junction', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/durango', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/fort-morgan', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/montrose', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/littleton', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/englewood', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/red-rocks', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/glenwood-springs', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/telluride', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/pagosa-springs', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/silverton', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/ouray', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/breckenridge', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/commerce-city', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/federal-heights', priority: '0.8', changefreq: 'weekly' },
  { path: '/colorado/northglenn', priority: '0.8', changefreq: 'weekly' },
  
  // Static Blog Posts
  { path: '/blog/denver-dispensaries', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/denver-rentals', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/boulder-dispensaries', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/boulder-rentals', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/aspen-dispensaries', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/aspen-rentals', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/colorado-springs-dispensaries', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/colorado-springs-rentals', priority: '0.7', changefreq: 'monthly' },
];

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating dynamic sitemap for budquest.guide');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all dispensaries
    const { data: dispensaries, error: dispError } = await supabase
      .from('dispensaries')
      .select('slug, created_at');
    
    if (dispError) {
      console.error('Error fetching dispensaries:', dispError);
    }
    console.log(`Found ${dispensaries?.length || 0} dispensaries`);

    // Fetch all hotels/rentals
    const { data: hotels, error: hotelError } = await supabase
      .from('hotels')
      .select('slug, created_at');
    
    if (hotelError) {
      console.error('Error fetching hotels:', hotelError);
    }
    console.log(`Found ${hotels?.length || 0} rentals`);

    // Fetch all published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, created_at, updated_at')
      .eq('status', 'published');
    
    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }
    console.log(`Found ${blogPosts?.length || 0} published blog posts`);

    const today = new Date().toISOString().split('T')[0];

    // Build XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    for (const route of STATIC_ROUTES) {
      xml += `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    }

    // Add dispensaries
    if (dispensaries) {
      for (const disp of dispensaries) {
        const lastmod = disp.created_at ? new Date(disp.created_at).toISOString().split('T')[0] : today;
        xml += `  <url>
    <loc>${DOMAIN}/dispensary/${disp.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    // Add hotels/rentals
    if (hotels) {
      for (const hotel of hotels) {
        const lastmod = hotel.created_at ? new Date(hotel.created_at).toISOString().split('T')[0] : today;
        xml += `  <url>
    <loc>${DOMAIN}/hotels/${hotel.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    // Add dynamic blog posts from database
    if (blogPosts) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at 
          ? new Date(post.updated_at).toISOString().split('T')[0] 
          : post.created_at 
            ? new Date(post.created_at).toISOString().split('T')[0] 
            : today;
        xml += `  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    const totalUrls = STATIC_ROUTES.length + (dispensaries?.length || 0) + (hotels?.length || 0) + (blogPosts?.length || 0);
    console.log(`Generated sitemap with ${totalUrls} URLs`);

    return new Response(xml, {
      headers: corsHeaders,
    });

  } catch (error: unknown) {
    console.error('Error generating sitemap:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Error generating sitemap: ${errorMessage}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
});
