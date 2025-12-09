import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, Cannabis, Leaf, DollarSign, Car, CreditCard, AlertTriangle,
  ArrowRight, ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  rating: number | null;
  image: string | null;
  description: string | null;
  status: string | null;
}

const BlogAspenDispensaries = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispensaries = async () => {
      const { data, error } = await supabase
        .from('dispensaries')
        .select('*')
        .ilike('city', '%Aspen%')
        .order('rating', { ascending: false });
      
      console.log('Aspen dispensaries fetch:', { data, error });
      if (error) console.error('Aspen dispensaries error:', error);
      if (data) setDispensaries(data);
      setLoading(false);
    };
    fetchDispensaries();
  }, []);

  const productTypes = [
    {
      type: "Flower",
      description: "Aspen dispensaries offer a curated selection of high-end, premium flower, often sourced from small, craft Colorado growers.",
      priceRange: "$40-80/eighth",
      best: "Premium quality, unique strains, high-altitude grows"
    },
    {
      type: "Concentrates",
      description: "Expect a focus on solventless extracts like live rosin, catering to the high-end consumer market.",
      priceRange: "$35-100/gram",
      best: "Live rosin, solventless extracts, high purity"
    },
    {
      type: "Edibles",
      description: "Artisan edibles and luxury chocolates are common, with a focus on precise dosing and high-quality ingredients.",
      priceRange: "$20-50",
      best: "Luxury brands, precise dosing, gourmet options"
    },
    {
      type: "Vaporizers",
      description: "A wide selection of disposable and reusable vape pens, perfect for discreet consumption on the go.",
      priceRange: "$40-80",
      best: "Discreet, convenient, high-end hardware"
    },
  ];

  const shoppingTips = [
    {
      title: "Expect Premium Pricing",
      content: "Aspen is a luxury market. Dispensary prices will generally be higher than in Denver or Boulder due to the location and clientele."
    },
    {
      title: "Check Hours",
      content: "Aspen's dispensaries often have shorter operating hours than those in larger cities. Plan your visit accordingly."
    },
    {
      title: "Ask About Delivery",
      content: "Some high-end dispensaries offer delivery services to local hotels and residences. Inquire about this convenience."
    },
    {
      title: "Dress Code",
      content: "While not strictly enforced, Aspen dispensaries tend to have a more upscale, boutique feel. Dress is generally more refined."
    },
    {
      title: "Plan for Consumption",
      content: "Public consumption is strictly prohibited. Ensure your accommodation is 420-friendly before purchasing."
    },
    {
      title: "Combine with Activities",
      content: "Many dispensaries are located near the downtown core, making it easy to combine a visit with shopping or dining."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best Cannabis Dispensaries in Aspen: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Aspen's top cannabis dispensaries. Find premium flower, concentrates, and edibles for your luxury Colorado mountain getaway." />
        <meta name="keywords" content="Aspen dispensaries, cannabis Aspen, weed shops Aspen, luxury cannabis Colorado, Aspen 420" />
        <link rel="canonical" href="https://budquest.com/blog/cannabis-dispensaries-aspen" />
        <meta property="og:title" content="Best Cannabis Dispensaries in Aspen: Complete Guide 2025" />
        <meta property="og:description" content="Find the best dispensaries in Aspen, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Cannabis Dispensaries in Aspen: Complete Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-08"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Image */}
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img 
            src="/blog-aspen-dispensaries.jpg" 
            alt="Premium cannabis dispensary in Aspen, Colorado mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </section>

        {/* Hero Content */}
        <section className="relative py-8 overflow-hidden -mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/blog" className="hover:text-accent">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent">Aspen Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">City Guide</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 8, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 10 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Cannabis Dispensaries in Aspen:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Your guide to the best high-end cannabis shops in the luxury mountain town of Aspen, Colorado.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">BudQuest</p>
                  <p className="text-xs text-muted-foreground">Cannabis Travel Experts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl prose prose-invert">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Aspen, Colorado, is synonymous with luxury, world-class skiing, and high-end experiences. Its cannabis scene is no exception. Unlike the high-volume shops of Denver, Aspen's dispensaries offer a more curated, boutique experience, focusing on premium products and personalized service.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide will help you navigate the best dispensaries in Aspen, from those offering exclusive strains to those known for their high-end edibles and concentrates. We'll also cover essential shopping tips and local consumption laws to ensure your mountain getaway is seamless and enjoyable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Remember that while cannabis is legal for adults 21+ in Colorado, public consumption is illegal. Always plan to consume in a private, 420-friendly space.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Dispensaries from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top-Rated Aspen Dispensaries</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : dispensaries.length > 0 ? (
                <div className="space-y-6">
                  {dispensaries.map((dispensary, index) => (
                    <motion.div
                      key={dispensary.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-card/60 border-accent/20 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-video md:aspect-auto">
                            <img
                              src={dispensary.image || '/dest-aspen.jpg'}
                              alt={dispensary.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-lg font-bold text-accent">#{index + 1}</span>
                                  <Link to={`/dispensary/${dispensary.slug}`} className="hover:text-accent transition-colors">
                                    <h3 className="text-xl font-bold text-foreground hover:text-accent">{dispensary.name}</h3>
                                  </Link>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {dispensary.address?.split(',')[0]}
                                </p>
                              </div>
                              {dispensary.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-gold text-gold" />
                                  <span className="text-foreground font-semibold">{dispensary.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            {dispensary.description && (
                              <p className="text-muted-foreground mb-4 line-clamp-3">{dispensary.description}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Recreational
                              </span>
                              <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Premium Selection</span>
                              <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Downtown Location</span>
                            </div>

                            <div className="flex justify-end">
                              <Link to={`/dispensary/${dispensary.slug}`}>
                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg text-sm">
                                  View Details <ArrowRight className="h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-card/40 rounded-lg border border-accent/20">
                  <p className="text-muted-foreground mb-2">No Aspen dispensaries found in the directory yet.</p>
                  <p className="text-sm text-muted-foreground">Check back soon as we update our listings!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Products in Aspen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productTypes.map((product) => (
                  <Card key={product.type} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{product.type}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-accent">
                        <DollarSign className="h-4 w-4" /> Price Range: {product.priceRange}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Leaf className="h-4 w-4" /> Best For: {product.best}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Tips */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Essential Aspen Dispensary Shopping Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shoppingTips.map((tip, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <Cannabis className="h-5 w-5 text-accent" /> {tip.title}
                    </h3>
                    <p className="text-muted-foreground">{tip.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Colorado Cannabis Laws & Regulations</h2>
              
              <div className="space-y-4">
                <Card className="bg-card/60 border-accent/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Age Requirements</h3>
                      <p className="text-muted-foreground">Adults 21 and older with valid government-issued ID may purchase recreational cannabis. Valid forms include driver's license, passport, or state ID.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/60 border-accent/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Purchase & Possession Limits</h3>
                      <p className="text-muted-foreground">Non-residents may purchase up to 1 ounce (28g) of flower, 8 grams of concentrate, or 800mg of edibles per transaction. Colorado residents may purchase up to 2 ounces.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/60 border-amber-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Where Consumption Is Prohibited</h3>
                      <p className="text-muted-foreground mb-3">Public consumption is illegal throughout Colorado. This includes:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                        <li>Streets, sidewalks, and public parks</li>
                        <li>Ski slopes and lift areas (federal land)</li>
                        <li>National forests and federal property</li>
                        <li>Vehicles (even as a passenger)</li>
                        <li>Most hotel rooms and common areas</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/60 border-red-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Penalties & Enforcement</h3>
                      <p className="text-muted-foreground">Public consumption fines range from $100–$999. DUI laws apply to cannabis—impaired driving is strictly enforced. Transporting cannabis across state lines is a federal offense.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-accent/10 to-gold/5 border-accent/30 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Safe Consumption Options</h3>
                      <p className="text-muted-foreground">Consume legally at private residences (with permission), verified 420-friendly accommodations, or licensed consumption lounges. Book 420-friendly rentals through BudQuest for a worry-free experience.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Plan Your Complete Aspen Cannabis Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive Aspen cannabis travel guide with 420-friendly hotels, attractions, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/aspen" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                  >
                    Aspen Travel Guide <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/hotels" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                  >
                    View 420-Friendly Rentals <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/aspen" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Aspen Cannabis Travel Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">Complete guide to the luxury mountain town</p>
                  </Card>
                </Link>
                <Link to="/usa/colorado" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Cannabis Hub</h4>
                    <p className="text-sm text-muted-foreground mt-1">Explore all of Colorado's cannabis scene</p>
                  </Card>
                </Link>
                <Link to="/boulder" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Boulder Travel Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">Dispensaries and rentals near the Flatirons</p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogAspenDispensaries;
