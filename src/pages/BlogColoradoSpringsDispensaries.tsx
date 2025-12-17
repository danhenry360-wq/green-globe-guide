import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Star, Clock, Calendar, User, ChevronRight,
  CheckCircle2, Cannabis, Leaf, DollarSign,
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
      title: "Valid ID Required",
      content: "Whether you are shopping recreationally (21+) or medically, you must present a valid government-issued ID or passport upon entry."
    },
    {
      title: "Cash & Debit",
      content: "Most dispensaries are cash-only, though many have ATMs on-site. Some accept debit cards with a processing fee."
    },
    {
      title: "Check for Deals",
      content: "Colorado Springs dispensaries are known for competitive pricing. Check for daily deals, early bird specials, and happy hours."
    },
    {
      title: "Know Your Limits",
      content: "Purchase limits apply for both flower and concentrates. Budtenders can help you stay within legal purchase limits per transaction."
    },
    {
      title: "Explore the Area",
      content: "Many top-rated shops are located near scenic areas. Plan your visit around a trip to Garden of the Gods or Pikes Peak."
    },
    {
      title: "Ask Questions",
      content: "Budtenders are experts. Don't hesitate to ask about terpene profiles, effects, and potency to find exactly what you need."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cannabis Dispensaries in Colorado Springs: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Your essential guide to cannabis dispensaries in Colorado Springs. Find top shops, products, and important information for recreational and medical users." />
        <meta name="keywords" content="Colorado Springs dispensaries, recreational weed Colorado Springs, medical cannabis, weed shops Colorado Springs" />
        <link rel="canonical" href="https://budquest.guide/blog/cannabis-dispensaries-colorado-springs" />
        <meta property="og:title" content="Cannabis Dispensaries in Colorado Springs: Complete Guide 2025" />
        <meta property="og:description" content="Find the best dispensaries in Colorado Springs, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cannabis Dispensaries in Colorado Springs: Complete Guide 2025",
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
            src="/blog-colorado-springs-dispensaries.jpg"
            alt="Cannabis dispensary in Colorado Springs with Pikes Peak view"
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
              <span className="text-accent">Colorado Springs Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Recreational & Medical</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 8, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 10 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                  Cannabis Dispensaries in Colorado Springs:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                A guide to the best dispensaries and high-quality cannabis products available in the Colorado Springs area.
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
                Colorado Springs is a premier destination for cannabis enthusiasts. The area offers a wide selection of top-tier dispensaries catering to both medical patients and recreational users. With its proximity to the mountains and a vibrant local culture, shopping for cannabis here is an experience in itself.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide highlights the top-rated dispensaries in the region, the types of products available, and essential shopping tips to ensure you have a smooth and enjoyable visit. Whether you are a local resident or a traveler passing through, finding quality green is easy in the Springs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Always remember to consume responsibly and check local regulations regarding consumption areas.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Dispensaries from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top-Rated Colorado Springs Dispensaries</h2>

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
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Open Now
                              </span>
                              <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Premium Quality</span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Popular Cannabis Products</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Dispensary Shopping Tips</h2>
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Colorado Springs Cannabis Laws & Regulations</h2>

              <Card className="bg-amber-500/10 border-amber-500/30 p-6 mb-4">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-500 mb-2">Important: Medical Only City</h3>
                    <p className="text-muted-foreground">Colorado Springs has banned recreational cannabis sales. Only medical marijuana dispensaries operate within city limits. Recreational users should purchase in neighboring Manitou Springs or travel to Denver.</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="bg-card/60 border-accent/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Medical Card Requirements</h3>
                      <p className="text-muted-foreground">A valid Colorado Medical Marijuana Card is required for dispensary purchases. Out-of-state medical cards are accepted at some dispensaries—call ahead to confirm.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/60 border-accent/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Possession Limits</h3>
                      <p className="text-muted-foreground">Adults 21+ may legally possess up to 2 ounces of cannabis in Colorado, regardless of where it was purchased. Medical patients may possess higher amounts as determined by their physician.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card/60 border-red-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Consumption Restrictions</h3>
                      <p className="text-muted-foreground">Public consumption is strictly illegal. This includes parks, streets, vehicles, and Garden of the Gods. Consume only in private residences or verified 420-friendly accommodations.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-accent/10 to-gold/5 border-accent/30 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Recreational Alternative</h3>
                      <p className="text-muted-foreground">Manitou Springs (10 minutes from downtown) has recreational dispensaries. Purchase there and return to enjoy in your 420-friendly Colorado Springs accommodation.</p>
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
                    <p className="text-sm text-muted-foreground mt-1">Options in the Mile High City</p>
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
