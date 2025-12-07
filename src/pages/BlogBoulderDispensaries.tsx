import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, Cannabis, Leaf, DollarSign, Car, CreditCard,
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

const BlogBoulderDispensaries = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispensaries = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .or('city.ilike.%Boulder%,city.eq.Boulder')
        .order('rating', { ascending: false });
      
      if (data) setDispensaries(data);
      setLoading(false);
    };
    fetchDispensaries();
  }, []);

  const productTypes = [
    {
      type: "Flower",
      description: "Premium Boulder-grown cannabis buds. Many shops source from local craft cultivators.",
      priceRange: "$25-60/eighth",
      best: "Local organic grows, craft strains"
    },
    {
      type: "Concentrates",
      description: "Live resin, rosin, shatter, and more. Boulder is known for high-quality extracts.",
      priceRange: "$25-80/gram",
      best: "Solventless options, terpene-rich"
    },
    {
      type: "Edibles",
      description: "Gummies, chocolates, and artisan treats. Many local brands emphasize natural ingredients.",
      priceRange: "$15-40",
      best: "Organic ingredients, precise dosing"
    },
    {
      type: "Pre-Rolls",
      description: "Ready-to-smoke joints and infused pre-rolls for convenience.",
      priceRange: "$8-25",
      best: "Infused options, single-strain"
    },
  ];

  const shoppingTips = [
    {
      title: "Support Local Craft",
      content: "Boulder has many locally-owned dispensaries with unique strains. Ask about house-grown options."
    },
    {
      title: "Check for Outdoor Patios",
      content: "Some Boulder shops have consumption-friendly patios. Perfect for sampling your purchase."
    },
    {
      title: "Ask About Organic",
      content: "Boulder's health-conscious culture means many shops carry organic and sustainably-grown products."
    },
    {
      title: "Student Discounts",
      content: "With CU Boulder nearby, many dispensaries offer student discounts. Bring your student ID."
    },
    {
      title: "Plan for Parking",
      content: "Downtown Boulder has limited parking. Consider the Hill area or shops with dedicated lots."
    },
    {
      title: "Combine with Hiking",
      content: "Many shops are near trailheads. Stock up before heading to Chautauqua or the Flatirons."
    },
  ];

  const faqs = [
    { q: "Do I need a medical card in Boulder?", a: "No, recreational cannabis is legal for adults 21+. Medical cards offer higher possession limits and tax savings." },
    { q: "What ID do I need?", a: "Valid government-issued photo ID (driver's license, passport, or ID card) proving you're 21+." },
    { q: "Can I smoke on Pearl Street?", a: "No, public consumption is illegal. Use private property or designated consumption areas." },
    { q: "Are Boulder dispensaries cash only?", a: "Most accept debit cards but cash is preferred. ATMs available in shops." },
    { q: "Can I bring cannabis to CU Boulder campus?", a: "No, cannabis is prohibited on campus as it receives federal funding." },
    { q: "What's the purchase limit?", a: "Adults 21+ can buy up to 1 oz of flower or equivalent per transaction." },
    { q: "Do dispensaries deliver in Boulder?", a: "Yes, many Boulder dispensaries offer delivery within city limits." },
    { q: "Are there consumption lounges?", a: "Yes, Boulder has licensed social consumption spaces and some dispensaries have patios." },
  ];

  const neighborhoods = [
    {
      name: "The Hill",
      description: "Near CU Boulder with student-friendly prices and casual vibes. Walking distance to campus.",
      dispensaries: "Several budget-friendly options",
      vibe: "Young, energetic, casual"
    },
    {
      name: "Pearl Street",
      description: "Downtown Boulder's famous pedestrian mall. Premium shops with upscale selection.",
      dispensaries: "High-end boutiques",
      vibe: "Upscale, touristy, walkable"
    },
    {
      name: "North Boulder",
      description: "Near hiking trails and the Flatirons. Great for outdoor enthusiasts.",
      dispensaries: "Craft-focused shops",
      vibe: "Athletic, health-conscious"
    },
    {
      name: "East Boulder",
      description: "More industrial area with larger dispensaries and better parking.",
      dispensaries: "Larger selection, easier access",
      vibe: "Convenient, local-focused"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cannabis Dispensaries in Boulder: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Boulder's best cannabis dispensaries. Complete guide to top shops, craft products, shopping tips, and local laws. Plan your Boulder cannabis experience." />
        <meta name="keywords" content="Boulder dispensaries, cannabis Boulder, weed shops Boulder, marijuana Boulder Colorado, 420 Boulder" />
        <link rel="canonical" href="https://budquest.guide/blog/cannabis-dispensaries-boulder" />
        <meta property="og:title" content="Cannabis Dispensaries in Boulder: Complete Guide 2025" />
        <meta property="og:description" content="Complete guide to Boulder's best cannabis shops, craft products, and shopping tips." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cannabis Dispensaries in Boulder: Complete Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-04"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/blog" className="hover:text-accent">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent">Boulder Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Cannabis Guide</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 4, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 10 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Cannabis Dispensaries in Boulder:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Your complete guide to Boulder's craft cannabis scene, best dispensaries, and shopping tips
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

        {/* Quick Facts */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <Leaf className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-semibold text-green-400">Recreational Legal</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <User className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-sm font-semibold text-foreground">21+</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <DollarSign className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Limit</p>
                  <p className="text-sm font-semibold text-foreground">1 oz/visit</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <Clock className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="text-sm font-semibold text-foreground">8AM - 10PM</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <CreditCard className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <p className="text-sm font-semibold text-foreground">Cash & Debit</p>
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
                Boulder, Colorado—home to the Flatirons, CU Boulder, and one of America's most progressive cannabis scenes. This college town turned outdoor recreation mecca has embraced legal cannabis with the same enthusiasm it brings to climbing, cycling, and craft beer.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What sets Boulder apart is its focus on craft cannabis. Many dispensaries here prioritize organic growing methods, locally-sourced products, and the kind of quality-over-quantity approach that matches Boulder's health-conscious culture. You'll find boutique shops with carefully curated selections rather than warehouse-style dispensaries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a CU student, outdoor enthusiast, or cannabis tourist, this guide covers everything you need to navigate Boulder's dispensary scene—from the best shops to visit to insider tips for the perfect experience.
              </p>
            </div>
          </div>
        </section>

        {/* Dispensaries from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Boulder Cannabis Dispensaries</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : dispensaries.length > 0 ? (
                <div className="space-y-6">
                  {dispensaries.map((disp, index) => (
                    <motion.div
                      key={disp.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-card/60 border-accent/20 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-video md:aspect-auto">
                            <img
                              src={disp.image || '/dest-colorado.jpg'}
                              alt={disp.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-lg font-bold text-accent">#{index + 1}</span>
                                  <Link to={`/dispensary/${disp.slug}`} className="hover:text-accent transition-colors">
                                    <h3 className="text-xl font-bold text-foreground hover:text-accent">{disp.name}</h3>
                                  </Link>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {disp.city}
                                </p>
                              </div>
                              {disp.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-gold text-gold" />
                                  <span className="text-foreground font-semibold">{disp.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            {disp.description && (
                              <p className="text-muted-foreground mb-4 line-clamp-2">{disp.description}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {disp.status?.toLowerCase() === 'licensed' && (
                                <>
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Licensed
                                  </span>
                                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">BudQuest Verified</span>
                                </>
                              )}
                              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Recreational</span>
                            </div>
                            
                            <Link 
                              to={`/dispensary/${disp.slug}`}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
                            >
                              View Details
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No Boulder dispensaries found in database.</p>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Planning Your Boulder Trip?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our complete Boulder cannabis travel guide with 420-friendly hotels, attractions, and more.
                </p>
                <Link to="/boulder" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
                  Explore Boulder Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Products in Boulder</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productTypes.map((product) => (
                  <Card key={product.type} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{product.type}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price Range</span>
                        <span className="text-gold font-semibold">{product.priceRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Best For</span>
                        <span className="text-accent">{product.best}</span>
                      </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Boulder Cannabis Shopping Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingTips.map((tip, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-accent/20 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Neighborhoods for Cannabis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {neighborhoods.map((hood) => (
                  <Card key={hood.name} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{hood.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{hood.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dispensaries</span>
                        <span className="text-accent">{hood.dispensaries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vibe</span>
                        <span className="text-foreground">{hood.vibe}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card/60 border-accent/20 p-5">
                  <h3 className="font-semibold text-foreground mb-3">Boulder Guides</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/boulder" className="text-accent hover:underline">Complete Boulder Cannabis Guide</Link>
                    </li>
                    <li>
                      <Link to="/hotels" className="text-accent hover:underline">420-Friendly Hotels in Boulder</Link>
                    </li>
                  </ul>
                </Card>
                <Card className="bg-card/60 border-accent/20 p-5">
                  <h3 className="font-semibold text-foreground mb-3">Other Colorado Cities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/blog/cannabis-dispensaries-denver" className="text-accent hover:underline">Denver Dispensaries Guide</Link>
                    </li>
                    <li>
                      <Link to="/colorado-springs" className="text-accent hover:underline">Colorado Springs Guide</Link>
                    </li>
                    <li>
                      <Link to="/aspen" className="text-accent hover:underline">Aspen Cannabis Guide</Link>
                    </li>
                  </ul>
                </Card>
                <Card className="bg-card/60 border-accent/20 p-5">
                  <h3 className="font-semibold text-foreground mb-3">State Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/usa/colorado" className="text-accent hover:underline">Colorado Cannabis Laws</Link>
                    </li>
                    <li>
                      <Link to="/" className="text-accent hover:underline">Cannabis Travel Guide</Link>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl prose prose-invert">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Explore Boulder's Cannabis Scene?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Boulder offers a unique cannabis experience that reflects the city's character—health-conscious, quality-focused, and connected to the outdoors. Whether you're looking for craft flower to enjoy after a hike or premium concentrates from local extractors, Boulder's dispensaries deliver.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Remember to consume responsibly, respect local laws, and enjoy everything this mountain town has to offer. The combination of world-class outdoor recreation and legal cannabis makes Boulder one of the best cannabis tourism destinations in America.
              </p>
              <Link 
                to="/boulder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
              >
                Explore Complete Boulder Guide
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogBoulderDispensaries;
