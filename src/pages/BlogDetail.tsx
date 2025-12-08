import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Shield,
  Users,
  MapPin,
  Building2,
  AlertCircle,
  Scale,
  Plane,
  TrendingUp,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { BLOG_POSTS } from "./Blog";

const iconMap: Record<string, any> = {
  Shield,
  Users,
  MapPin,
  Building2,
  AlertCircle,
  Scale,
  Plane,
  TrendingUp
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch from database first
  const { data: dbPost, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Fetch related dispensaries
  const { data: relatedDispensaries } = useQuery({
    queryKey: ["blog-dispensaries", dbPost?.related_dispensary_ids],
    queryFn: async () => {
      if (!dbPost?.related_dispensary_ids || dbPost.related_dispensary_ids.length === 0) return [];
      
      const { data, error } = await supabase
        .from("dispensaries")
        .select("*")
        .in("id", dbPost.related_dispensary_ids);
      
      if (error) throw error;
      return data;
    },
    enabled: !!dbPost?.related_dispensary_ids && dbPost.related_dispensary_ids.length > 0,
  });

  // Fetch related hotels
  const { data: relatedHotels } = useQuery({
    queryKey: ["blog-hotels", dbPost?.related_hotel_ids],
    queryFn: async () => {
      if (!dbPost?.related_hotel_ids || dbPost.related_hotel_ids.length === 0) return [];
      
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .in("id", dbPost.related_hotel_ids);
      
      if (error) throw error;
      return data;
    },
    enabled: !!dbPost?.related_hotel_ids && dbPost.related_hotel_ids.length > 0,
  });

  // Check static posts as fallback
  const staticPost = BLOG_POSTS.find(p => p.id === slug);

  // Determine which post to display
  const post = dbPost ? {
    title: dbPost.title,
    subtitle: dbPost.subtitle || "",
    excerpt: dbPost.excerpt,
    date: new Date(dbPost.published_at || dbPost.created_at).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    }),
    readTime: dbPost.read_time,
    author: dbPost.author_name,
    avatar: dbPost.author_avatar,
    category: dbPost.category,
    tags: dbPost.tags,
    image: dbPost.image_url,
    content: typeof dbPost.content === 'object' ? dbPost.content : { introduction: "", disclaimer: "", sections: [], safetyTips: [] }
  } : staticPost;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Redirect to external page if this is an external blog post
  useEffect(() => {
    if (staticPost && staticPost.isExternalPage && staticPost.externalUrl) {
      navigate(staticPost.externalUrl, { replace: true });
    }
  }, [staticPost, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/blog")} variant="outline">
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "accent": return "border-accent/20 bg-accent/5";
      case "warning": return "border-amber-500/20 bg-amber-500/5";
      case "gold": return "border-gold/20 bg-gold/5";
      default: return "border-border/50 bg-gradient-card";
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | BudQuest Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <article className="pt-24 pb-12">
          {/* Back Button */}
          <div className="container mx-auto max-w-4xl px-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto max-w-5xl px-4 mb-8"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="container mx-auto max-w-4xl px-4 mb-8"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {post.category}
              </Badge>
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.subtitle}
              </p>
            )}

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{post.avatar}</span>
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="container mx-auto max-w-4xl px-4"
          >
            {/* Introduction */}
            {post.content && typeof post.content === 'object' && !Array.isArray(post.content) && 'introduction' in post.content && post.content.introduction && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {post.content.introduction as string}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            {post.content && typeof post.content === 'object' && !Array.isArray(post.content) && 'disclaimer' in post.content && post.content.disclaimer && (
              <Card className="p-6 mb-8 border-amber-500/20 bg-amber-500/5">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-500 mb-2">Important Disclaimer</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.content.disclaimer as string}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Content Sections */}
            {post.content && typeof post.content === 'object' && !Array.isArray(post.content) && 'sections' in post.content && Array.isArray(post.content.sections) && post.content.sections.length > 0 && (
              <div className="space-y-6 mb-12">
                {(post.content.sections as any[]).map((section: any, idx: number) => {
                  const Icon = iconMap[section.icon] || Shield;
                  return (
                    <Card
                      key={idx}
                      className={`p-6 ${getVariantClasses(section.variant || "default")}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-background/50 flex-shrink-0">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-3 text-foreground">
                            {section.title}
                          </h3>
                          <div
                            className="prose prose-sm max-w-none text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Safety Tips */}
            {post.content && typeof post.content === 'object' && !Array.isArray(post.content) && 'safetyTips' in post.content && Array.isArray(post.content.safetyTips) && post.content.safetyTips.length > 0 && (
              <Card className="p-6 border-accent/20 bg-accent/5">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <h3 className="text-xl font-semibold text-foreground">Safety & Travel Tips</h3>
                </div>
                <ul className="space-y-3">
                  {(post.content.safetyTips as string[]).map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-accent text-lg flex-shrink-0">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>

          {/* Affiliate Link CTA */}
          {dbPost?.affiliate_link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="container mx-auto max-w-4xl px-4 mt-8"
            >
              <Card className="p-6 bg-gradient-to-br from-gold/10 via-card to-accent/5 border-gold/20 text-center">
                <h3 className="text-xl font-bold mb-3">Ready to Book Your Trip?</h3>
                <p className="text-muted-foreground mb-4">
                  Get the best deals on accommodations and experiences
                </p>
                <a 
                  href={dbPost.affiliate_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={async () => {
                    try {
                      await supabase.functions.invoke('track-affiliate-click', {
                        body: { blog_post_id: dbPost.id }
                      });
                    } catch (error) {
                      console.error('Error tracking click:', error);
                    }
                  }}
                >
                  <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
                    {dbPost.affiliate_link_text || "Book Now"}
                  </Button>
                </a>
              </Card>
            </motion.div>
          )}

          {/* Related Dispensaries */}
          {relatedDispensaries && relatedDispensaries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="container mx-auto max-w-4xl px-4 mt-8"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-accent" />
                Featured Dispensaries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedDispensaries.map((disp) => (
                  <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                    <Card className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/30 transition-all group">
                      <div className="flex gap-4 p-4">
                        {disp.image && (
                          <img
                            src={disp.image}
                            alt={disp.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                            {disp.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {disp.city}, {disp.state}
                          </p>
                          {disp.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-gold">★</span>
                              <span>{disp.rating}</span>
                              {disp.review_count && (
                                <span className="text-muted-foreground">({disp.review_count})</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Hotels */}
          {relatedHotels && relatedHotels.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="container mx-auto max-w-4xl px-4 mt-8"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-accent" />
                420-Friendly Rentals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedHotels.map((hotel) => (
                  <Link key={hotel.id} to={`/hotels/${hotel.slug}`}>
                    <Card className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/30 transition-all group">
                      <div className="flex gap-4 p-4">
                        {hotel.images && hotel.images.length > 0 && (
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                            {hotel.name}
                          </h4>
                          {hotel.rating && (
                            <div className="flex items-center gap-1 text-sm mb-2">
                              <span className="text-gold">★</span>
                              <span>{hotel.rating}</span>
                            </div>
                          )}
                          {hotel.is_verified && (
                            <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Posts CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="container mx-auto max-w-4xl px-4 mt-12"
          >
            <Card className="p-8 bg-gradient-to-br from-accent/10 via-card to-gold/5 border-accent/20 text-center">
              <h3 className="text-2xl font-bold mb-4">Explore More Cannabis Travel Guides</h3>
              <p className="text-muted-foreground mb-6">
                Discover legal cannabis destinations, dispensaries, and 420-friendly hotels worldwide.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    All Articles
                  </Button>
                </Link>
                <Link to="/usa">
                  <Button className="gap-2">
                    USA Guide
                  </Button>
                </Link>
                <Link to="/world">
                  <Button className="gap-2">
                    World Guide
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
