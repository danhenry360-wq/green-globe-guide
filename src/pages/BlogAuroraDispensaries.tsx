import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Star, Clock, Calendar, User, ChevronRight,
  CheckCircle2, Cannabis, Leaf, DollarSign, Car, CreditCard,
  ArrowRight, ExternalLink, AlertTriangle, Plane
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

const BlogAuroraDispensaries = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispensaries = async () => {
      const { data, error } = await supabase
        .from('dispensaries')
        .select('*')
        .ilike('city', '%Aurora%')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false});

      if (import.meta.env.DEV) console.log('Aurora dispensaries fetch:', { data, error });
      if (error && import.meta.env.DEV) console.error('Aurora dispensaries error:', error);
      if (data) setDispensaries(data);
      setLoading(false);
    };
    fetchDispensaries();
  }, []);

  const productTypes = [
    {
      type: "Flower",
      description: "Aurora has competitive flower prices with many shops offering daily deals and bulk discounts.",
      priceRange: "$20-50/eighth",
      best: "Daily deals, bulk discounts"
    },
    {
      type: "Concentrates",
      description: "Live resin, shatter, and wax at better prices than downtown Denver. Many shops carry local brands.",
      priceRange: "$25-70/gram",
      best: "Local brands, competitive pricing"
    },
    {
      type: "Edibles",
      description: "Gummies, chocolates, and beverages. Aurora shops often run BOGO deals on edibles.",
      priceRange: "$15-30",
      best: "BOGO deals, variety"
    },
    {
      type: "Pre-Rolls",
      description: "Convenient single joints and packs. Great for travelers who don't want to bring gear.",
      priceRange: "$5-15",
      best: "Convenience, no equipment needed"
    },
  ];

  const shoppingTips = [
    {
      title: "Check Daily Deals",
      content: "Aurora dispensaries compete heavily on price. Check Weedmaps/Leafly for today's specials before you go."
    },
    {
      title: "Walk the Green Mile",
      content: "South Chambers Road has multiple dispensaries within walking distance. Park once, compare prices at several shops."
    },
    {
      title: "First-Time Discounts",
      content: "Most Aurora dispensaries offer 10-20% off your first purchase. Don't be shy—ask at checkout."
    },
    {
      title: "Bring Cash",
      content: "Most shops accept debit with PIN, but cash avoids ATM fees. Many have on-site ATMs if needed."
    },
    {
      title: "Order Ahead",
      content: "Online ordering for pickup saves time and guarantees your products are in stock."
    },
    {
      title: "Medical Card = Savings",
      content: "Even at rec shops, showing a medical card usually gets you 10% off and higher purchase limits."
    },
  ];

  const faqs = [
    { q: "How many dispensaries are in Aurora?", a: "Aurora has 200+ recreational dispensaries—the largest concentration in the Denver metro area." },
    { q: "Are there medical dispensaries in Aurora?", a: "No, Aurora banned medical-only dispensaries. However, rec shops accept medical cards for discounts." },
    { q: "What dispensary is closest to Denver Airport?", a: "Aurora has the closest dispensaries to DIA, typically 15-25 minutes away. However, never bring cannabis to the airport—it's federal property." },
    { q: "Can tourists buy weed in Aurora?", a: "Yes, tourists 21+ with valid ID can purchase. Same limits as Colorado residents: 1 oz flower or equivalent per transaction." },
    { q: "What is the Green Mile?", a: "South Chambers Road in Aurora is nicknamed the 'Green Mile' for its high concentration of dispensaries within walking distance." },
    { q: "Are Aurora dispensaries cheaper than Denver?", a: "Yes, typically 10-20% cheaper due to less tourist markup and competitive pricing among 200+ shops." },
    { q: "What are purchase limits in Aurora?", a: "1 ounce of flower, 8 grams of concentrate, or 800mg of edibles per transaction. Same as state limits." },
    { q: "Is delivery available in Aurora?", a: "Yes, many Aurora dispensaries offer delivery within city limits for those 21+ with valid ID." },
  ];

  const neighborhoods = [
    {
      name: "The Green Mile (South Chambers Road)",
      description: "Aurora's famous dispensary corridor with the highest concentration of shops. Easy parking, multiple options.",
      dispensaries: "30+ shops within 2 miles",
      vibe: "Competitive pricing, local-focused"
    },
    {
      name: "Near DIA / Airport Area",
      description: "Closest dispensaries to Denver International Airport. Perfect for arriving or departing travelers.",
      dispensaries: "15+ shops",
      vibe: "Convenient, traveler-friendly"
    },
    {
      name: "Aurora Town Center",
      description: "Central Aurora with dispensaries near shopping and dining. Good for combining errands.",
      dispensaries: "20+ shops",
      vibe: "Suburban, family-friendly area"
    },
    {
      name: "East Aurora",
      description: "Newer developments with modern dispensaries and plenty of parking.",
      dispensaries: "10+ shops",
      vibe: "Modern, spacious, easy access"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best Dispensaries in Aurora, Colorado (2025): Denver's Eastern Cannabis Hub</title>
        <meta name="description" content="Find the best dispensaries in Aurora, CO. 200+ recreational shops, closest to Denver Airport, with competitive prices and easy parking." />
        <meta name="keywords" content="dispensaries aurora colorado, aurora dispensaries, weed shops aurora, marijuana aurora colorado, dispensary near denver airport" />
        <link rel="canonical" href="https://budquest.guide/blog/best-dispensaries-aurora-colorado" />
        <meta property="og:title" content="Best Dispensaries in Aurora, Colorado (2025)" />
        <meta property="og:description" content="200+ recreational dispensaries in Aurora, CO. Closest to Denver Airport with better prices than downtown Denver." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Dispensaries in Aurora, Colorado (2025): Denver's Eastern Cannabis Hub",
            "description": "Find the best dispensaries in Aurora, CO. 200+ recreational shops, closest to Denver Airport, with competitive prices and easy parking.",
            "image": "https://budquest.guide/blog-aurora-dispensaries.jpg",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "publisher": {
              "@type": "Organization",
              "name": "BudQuest",
              "logo": { "@type": "ImageObject", "url": "https://budquest.guide/logo.png" }
            },
            "datePublished": "2025-12-27",
            "dateModified": "2025-12-27"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://budquest.guide/blog" },
              { "@type": "ListItem", "position": 3, "name": "Aurora Dispensaries", "item": "https://budquest.guide/blog/best-dispensaries-aurora-colorado" }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many dispensaries are in Aurora?",
                "acceptedAnswer": { "@type": "Answer", "text": "Aurora has 200+ recreational dispensaries—the largest concentration in the Denver metro area." }
              },
              {
                "@type": "Question",
                "name": "Are there medical dispensaries in Aurora?",
                "acceptedAnswer": { "@type": "Answer", "text": "No, Aurora banned medical-only dispensaries. However, rec shops accept medical cards for discounts." }
              },
              {
                "@type": "Question",
                "name": "What dispensary is closest to Denver Airport?",
                "acceptedAnswer": { "@type": "Answer", "text": "Aurora has the closest dispensaries to DIA, typically 15-25 minutes away. However, never bring cannabis to the airport—it's federal property." }
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Image */}
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src="/blog-aurora-dispensaries.jpg"
            alt="Cannabis dispensaries in Aurora, Colorado near Denver Airport"
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
              <span className="text-accent">Aurora Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Cannabis Guide</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20">Current for 2025</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 27, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 8 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Dispensaries in Aurora, Colorado (2025):
                </span>
                <br />
                <span className="text-foreground/90">Denver's Eastern Cannabis Hub</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                200+ dispensaries, closest to Denver Airport (DIA), better prices than downtown
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">BudQuest Team</p>
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
                  <p className="text-sm font-semibold text-green-400">Recreational Only</p>
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
                  <Plane className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">To DIA</p>
                  <p className="text-sm font-semibold text-foreground">15-25 min</p>
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
                Aurora, Colorado—Denver's eastern neighbor and the undisputed king of dispensary density in the metro area. With 200+ recreational shops, Aurora has more dispensaries than Denver itself. This isn't a tourist destination; it's where locals shop for value.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What makes Aurora special? Location and price. It's the closest major dispensary hub to Denver International Airport (DIA), making it perfect for travelers arriving or departing. Prices run 10-20% cheaper than downtown Denver thanks to suburban rents and fierce competition. And with South Chambers Road's famous "Green Mile," you can park once and visit multiple shops.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                One quirk: Aurora banned medical-only dispensaries under Municipal Code Section 22.572, so everything here is recreational. If you have a medical card, you'll still get discounts at rec shops—typically 10% off plus higher purchase limits.
              </p>
            </div>
          </div>
        </section>

        {/* Dispensaries from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Aurora Cannabis Dispensaries</h2>

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
                <div className="text-center py-8 bg-card/40 rounded-lg border border-accent/20">
                  <p className="text-muted-foreground mb-2">No Aurora dispensaries found in the database.</p>
                  <p className="text-sm text-muted-foreground">Check back soon as we add more verified dispensaries!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Planning Your Aurora Trip?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our complete Aurora cannabis travel guide with 420-friendly hotels, nearby attractions, and DIA airport tips.
                </p>
                <Link to="/aurora" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
                  Explore Aurora Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Products in Aurora</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Aurora Cannabis Shopping Tips</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Age & Purchase Requirements</h3>
                      <p className="text-muted-foreground">Adults 21+ with valid government-issued ID may purchase recreational cannabis. Non-residents may purchase up to 1 ounce (28g) of flower, 8 grams of concentrate, or 800mg of edibles per transaction.</p>
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
                      <p className="text-muted-foreground mb-3">Public consumption is illegal throughout Colorado, including:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                        <li>Cherry Creek State Park and Aurora trails</li>
                        <li>Public streets, sidewalks, and parks</li>
                        <li>Denver International Airport (federal property)</li>
                        <li>Vehicles (driver or passenger)</li>
                        <li>Most hotel rooms without explicit permission</li>
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
                      <p className="text-muted-foreground">Public consumption fines range $100–$999. DUI laws apply—impaired driving is strictly enforced. Never bring cannabis to Denver Airport—it's federal property where possession is a federal crime.</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-accent/10 to-gold/5 border-accent/30 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Legal Consumption Options</h3>
                      <p className="text-muted-foreground">Consume legally at private residences (with owner permission), verified 420-friendly rentals, or licensed consumption lounges. Aurora allows cannabis delivery within city limits.</p>
                    </div>
                  </div>
                </Card>
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
                  <h3 className="font-semibold text-foreground mb-3">Aurora Guides</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/aurora" className="text-accent hover:underline">Complete Aurora Cannabis Guide</Link>
                    </li>
                    <li>
                      <Link to="/hotels" className="text-accent hover:underline">420-Friendly Hotels Near DIA</Link>
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
                      <Link to="/blog/cannabis-dispensaries-boulder" className="text-accent hover:underline">Boulder Dispensaries Guide</Link>
                    </li>
                    <li>
                      <Link to="/colorado-springs" className="text-accent hover:underline">Colorado Springs Guide</Link>
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Explore Aurora's Cannabis Scene?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Aurora offers the Denver metro's best combination of selection, price, and convenience. With 200+ dispensaries competing for your business, you'll find better deals than downtown Denver, easier parking, and the closest options to Denver International Airport.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Remember to consume responsibly, respect local laws, and never bring cannabis to the airport. Use it up before your flight or give leftovers to your Airbnb host—TSA is federal, and DIA is federal property where cannabis is 100% illegal.
              </p>
              <Link
                to="/aurora"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
              >
                Explore Complete Aurora Guide
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

export default BlogAuroraDispensaries;
