import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, Cannabis, Leaf, DollarSign, Car, CreditCard,
  ArrowRight, ExternalLink, AlertTriangle
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

const BlogColoradoSpringsDispensaries = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispensaries = async () => {
      const { data, error } = await supabase
        .from('dispensaries')
        .select('*')
        .ilike('city', '%Colorado Springs%')
        .order('rating', { ascending: false });
      
      console.log('Colorado Springs dispensaries fetch:', { data, error });
      if (error) console.error('Colorado Springs dispensaries error:', error);
      if (data) setDispensaries(data);
      setLoading(false);
    };
    fetchDispensaries();
  }, []);

  const productTypes = [
    {
      type: "Flower",
      description: "A wide variety of strains are available, from budget-friendly options to premium, high-potency flower.",
      priceRange: "$20-50/eighth",
      best: "Value flower, high-THC strains"
    },
    {
      type: "Concentrates",
      description: "Shatter, wax, live resin, and vape cartridges are popular, with many shops offering daily deals.",
      priceRange: "$15-60/gram",
      best: "Daily deals, wide selection of vapes"
    },
    {
      type: "Edibles",
      description: "Gummies, chocolates, and beverages are widely available, with a focus on consistent dosing and variety.",
      priceRange: "$10-30",
      best: "Variety of brands, low-dose options"
    },
    {
      type: "Pre-Rolls",
      description: "Convenient and affordable pre-rolls are a staple, perfect for quick consumption.",
      priceRange: "$5-15",
      best: "Affordable singles, multi-packs"
    },
  ];

  const shoppingTips = [
    {
      title: "Medical Only",
      content: "Crucially, Colorado Springs is **medical-only**. You must have a valid Colorado Medical Marijuana Card to purchase cannabis within the city limits."
    },
    {
      title: "Recreational Nearby",
      content: "For recreational users, the closest options are in Manitou Springs or Pueblo, which are a short drive away."
    },
    {
      title: "Check for Deals",
      content: "Many medical dispensaries offer excellent daily deals and loyalty programs for cardholders."
    },
    {
      title: "Bring Your Card",
      content: "Do not forget your physical Colorado Medical Marijuana Card and a valid ID. No exceptions."
    },
    {
      title: "Explore the South Side",
      content: "Many of the best medical dispensaries are located on the south side of the city, closer to Pueblo."
    },
    {
      title: "Combine with Sightseeing",
      content: "Plan your dispensary visit around local attractions like Garden of the Gods or Pikes Peak."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cannabis Dispensaries in Colorado Springs: Medical Guide 2025 | BudQuest</title>
        <meta name="description" content="Your essential guide to medical cannabis dispensaries in Colorado Springs. Find top shops, products, and important legal information for cardholders." />
        <meta name="keywords" content="Colorado Springs dispensaries, medical cannabis Colorado Springs, weed shops Colorado Springs, Colorado Springs 420" />
        <link rel="canonical" href="https://budquest.com/blog/cannabis-dispensaries-colorado-springs" />
        <meta property="og:title" content="Cannabis Dispensaries in Colorado Springs: Medical Guide 2025" />
        <meta property="og:description" content="Find the best medical dispensaries in Colorado Springs, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cannabis Dispensaries in Colorado Springs: Medical Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-08"
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
              <span className="text-accent">Colorado Springs Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Medical Only</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 8, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 10 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-red-500 bg-clip-text text-transparent">
                  Cannabis Dispensaries in Colorado Springs:
                </span>
                <br />
                <span className="text-foreground/90">Medical Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                A guide for medical cardholders to the best dispensaries and products in Colorado Springs.
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
                Colorado Springs is unique among Colorado's major cities: **recreational cannabis sales are prohibited**. The city only allows **medical marijuana dispensaries** to operate. This means you must have a valid Colorado Medical Marijuana Card to purchase cannabis within the city limits.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide is tailored for medical cardholders visiting or residing in Colorado Springs, highlighting the top-rated medical dispensaries, the types of products available, and essential shopping tips. For recreational users, we provide information on the closest legal recreational options nearby.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Always remember that public consumption is illegal. Even as a medical cardholder, you must consume cannabis in a private, 420-friendly space.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Dispensaries from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top-Rated Colorado Springs Medical Dispensaries</h2>
              
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
                              src={dispensary.image || '/dest-colorado-springs.jpg'}
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
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Medical Only
                              </span>
                              <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Cardholders Only</span>
                              <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">High-Potency Focus</span>
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
                  <p className="text-muted-foreground mb-2">No Colorado Springs dispensaries found in the directory yet.</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Products in Colorado Springs</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Essential Colorado Springs Dispensary Shopping Tips</h2>
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Colorado Springs Cannabis Laws & Etiquette</h2>
              <Card className="bg-card/60 border-red-500/20 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-red-500 mb-2">Important Legal Notice: Medical Only</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>**Sales Type:** Only **Medical Marijuana** is sold in Colorado Springs. Recreational sales are banned.</li>
                      <li>**Requirement:** You must present a valid Colorado Medical Marijuana Card and a government-issued ID to purchase.</li>
                      <li>**Public Consumption:** Public consumption is strictly illegal.</li>
                      <li>**Recreational Option:** Recreational users must travel to nearby cities like Manitou Springs or Pueblo.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Plan Your Colorado Springs Cannabis Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive Colorado Springs travel guide with 420-friendly hotels, attractions, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/colorado-springs" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                  >
                    Colorado Springs Travel Guide <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/blog/best-420-rentals-colorado-springs" 
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
                <Link to="/blog/cannabis-dispensaries-denver" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Denver Dispensaries</h4>
                    <p className="text-sm text-muted-foreground mt-1">Recreational options in the Mile High City</p>
                  </Card>
                </Link>
                <Link to="/usa/colorado" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Cannabis Hub</h4>
                    <p className="text-sm text-muted-foreground mt-1">Explore all of Colorado's cannabis scene</p>
                  </Card>
                </Link>
                <Link to="/colorado-springs" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Springs Travel Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">Attractions and travel tips</p>
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

export default BlogColoradoSpringsDispensaries;
