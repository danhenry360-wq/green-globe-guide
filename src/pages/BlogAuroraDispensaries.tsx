import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Star, Clock, Calendar, User, ChevronRight,
  CheckCircle2, Cannabis, Leaf, DollarSign, Car, CreditCard,
  ArrowRight, ExternalLink, AlertTriangle, Plane, Store,
  Info, Ban, ShoppingBag, CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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
  hours: string | null;
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
        .order('rating', { ascending: false });

      if (import.meta.env.DEV) console.log('Aurora dispensaries fetch:', { data, error });
      if (error && import.meta.env.DEV) console.error('Aurora dispensaries error:', error);
      if (data) setDispensaries(data);
      setLoading(false);
    };
    fetchDispensaries();
  }, []);

  const auroraFacts = [
    { factor: "Number of dispensaries", details: "200+ recreational" },
    { factor: "Medical dispensaries", details: "None — Aurora banned medical-only shops (Section 22.572 Municipal Code)" },
    { factor: "Distance to DIA", details: "15-25 min depending on location" },
    { factor: "Distance to downtown Denver", details: "15-20 min" },
    { factor: "Vibe", details: "Suburban, diverse, less touristy than Denver" },
    { factor: "Prices", details: "Often 10-20% cheaper than downtown Denver" },
    { factor: "Best for", details: "Airport travelers, locals, value seekers" }
  ];

  const airportTips = {
    arriving: [
      "Stock up on your way from DIA to your rental",
      "Order online for pickup to save time",
      "Keep receipt in case of questions"
    ],
    departing: [
      "Use up everything before heading to airport",
      "Don't bring ANY cannabis to airport—TSA is federal",
      "Allow extra time if you need to finish products"
    ]
  };

  const comparison = [
    { factor: "Number", aurora: "200+", denver: "186" },
    { factor: "Prices", aurora: "Often 10-20% cheaper", denver: "Tourist premiums downtown" },
    { factor: "Crowds", aurora: "Less crowded", denver: "Busier, especially weekends" },
    { factor: "Parking", aurora: "Easy (suburban lots)", denver: "Harder (street, paid lots)" },
    { factor: "Vibe", aurora: "Suburban, local", denver: "Urban, diverse" },
    { factor: "Distance to DIA", aurora: "Closer", denver: "Farther" },
    { factor: "Medical shops", aurora: "None", denver: "Available" },
    { factor: "Tourist experience", aurora: "Practical", denver: "More 'scene'" },
    { factor: "Best for", aurora: "Value, convenience", denver: "Variety, experiences" }
  ];

  const productTypes = [
    { product: "Flower (⅛ oz)", bestFor: "Classic experience", priceRange: "$20-50" },
    { product: "Pre-rolls", bestFor: "Convenience, no gear needed", priceRange: "$5-15 each" },
    { product: "Vape cartridge", bestFor: "Discreet, less smell", priceRange: "$25-60" },
    { product: "Edibles", bestFor: "Long-lasting, no smoke", priceRange: "$15-30" },
    { product: "Concentrates", bestFor: "Experienced users", priceRange: "$25-70/g" },
    { product: "Topicals", bestFor: "Pain relief, no high", priceRange: "$20-50" },
    { product: "Tinctures", bestFor: "Precise dosing", priceRange: "$30-60" }
  ];

  const shoppingTips = [
    "Check Weedmaps/Leafly for daily deals — Aurora dispensaries run competitive specials",
    "Bring cash — Most accept debit with PIN, but cash avoids fees",
    "Walk the Green Mile — Compare prices at multiple shops",
    "Ask about first-time discounts — Most offer 10-20% off first purchase",
    "Med card = discounts — Even at rec shops, usually 10% off",
    "Order online for pickup — Skip the line, guaranteed availability",
    "Check hours — Some close earlier than you'd expect",
    "Bring valid ID — Out-of-state IDs work fine, must be 21+",
    "Don't be afraid to ask questions — Budtenders are there to help",
    "Keep your receipt — Proof of legal purchase"
  ];

  const cannabisLaws = [
    { rule: "Legal status", details: "Recreational legal, 21+" },
    { rule: "Purchase limit", details: "1 oz flower / 8g concentrate / 800mg edibles per transaction" },
    { rule: "Out-of-state visitors", details: "Same limits, valid ID required" },
    { rule: "Medical cards", details: "Accepted for discounts at rec shops, no med-only stores" },
    { rule: "Consumption", details: "Private property only" },
    { rule: "Public consumption", details: "Illegal—fines enforced" },
    { rule: "Delivery", details: "Legal in Aurora" },
    { rule: "Hours", details: "Most open 8-9 AM, close 9-10 PM" }
  ];

  const legalConsumption = [
    { location: "Private residence (with owner permission)", status: "legal" },
    { location: "420-friendly rental", status: "legal" },
    { location: "Private backyard/patio", status: "legal" }
  ];

  const illegalConsumption = [
    { location: "Public streets, sidewalks", reason: "Public consumption law" },
    { location: "City parks", reason: "Public space" },
    { location: "Cherry Creek State Park", reason: "State park rules" },
    { location: "Hotel rooms (most)", reason: "Policy violation" },
    { location: "Rental cars", reason: "DUI risk, policy violation" },
    { location: "DIA / airport property", reason: "Federal jurisdiction" },
    { location: "Your car (even parked)", reason: "Open container / DUI laws" }
  ];

  const nearbyAttractions = [
    { attraction: "Cherry Creek State Park", distance: "10 min", notes: "Trails, reservoir—no consumption on site" },
    { attraction: "Stanley Marketplace", distance: "15 min", notes: "Food hall, local vendors" },
    { attraction: "Wings Over the Rockies Museum", distance: "10 min", notes: "Aviation history" },
    { attraction: "Denver Tech Center", distance: "10 min", notes: "Restaurants, entertainment" },
    { attraction: "Aurora Reservoir", distance: "15 min", notes: "Outdoor recreation" },
    { attraction: "Downtown Denver", distance: "20 min", notes: "Full urban experience" }
  ];

  // Filter for Green Mile dispensaries (Chambers Road)
  const greenMileDispensaries = dispensaries.filter(d =>
    d.address && d.address.toLowerCase().includes('chambers')
  );

  // Top dispensaries (first 12)
  const topDispensaries = dispensaries.slice(0, 12);

  return (
    <>
      <Helmet>
        <title>Best Dispensaries in Aurora, Colorado (2025): Denver's Eastern Cannabis Hub | BudQuest</title>
        <meta name="description" content="Find the best dispensaries in Aurora, CO. 200+ recreational shops, closest to Denver Airport (DIA), with better prices than downtown. Complete 2025 guide." />
        <meta name="keywords" content="dispensaries aurora colorado, aurora dispensaries, dispensary near denver airport, recreational dispensaries aurora, weed shops aurora co, cannabis aurora colorado, dispensary near DIA" />
        <link rel="canonical" href="https://budquest.guide/blog/best-dispensaries-aurora-colorado" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Best Dispensaries in Aurora, Colorado (2025): Denver's Eastern Cannabis Hub" />
        <meta property="og:description" content="200+ recreational dispensaries in Aurora, CO. Closest to Denver Airport with better prices than downtown Denver." />
        <meta property="og:url" content="https://budquest.guide/blog/best-dispensaries-aurora-colorado" />
        <meta property="og:image" content="https://budquest.guide/blog-aurora-dispensaries.jpg" />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many dispensaries are in Aurora, Colorado?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aurora has over 200 recreational dispensaries, making it the largest concentration in the Denver metro area. All are recreational-only as Aurora banned medical-only dispensaries."
                }
              },
              {
                "@type": "Question",
                "name": "Are there medical dispensaries in Aurora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, Aurora banned medical-only dispensaries under Section 22.572 of the Municipal Code. However, recreational dispensaries accept medical cards for discounts (typically 10% off)."
                }
              },
              {
                "@type": "Question",
                "name": "What dispensary is closest to Denver airport?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aurora has the closest dispensaries to Denver International Airport (DIA), located 15-25 minutes away. Popular options include dispensaries along Chambers Road and near the airport area. However, never bring cannabis to the airport—it's federal property."
                }
              },
              {
                "@type": "Question",
                "name": "Can tourists buy weed in Aurora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, tourists 21+ with valid ID can purchase cannabis in Aurora. Same limits apply: 1 oz flower, 8g concentrate, or 800mg edibles per transaction. Out-of-state IDs are accepted."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Green Mile in Aurora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Green Mile refers to South Chambers Road in Aurora, which has a high concentration of dispensaries within walking distance. You can park once and visit multiple shops to compare prices."
                }
              },
              {
                "@type": "Question",
                "name": "Is cannabis delivery legal in Aurora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, cannabis delivery is legal in Aurora for those 21+ with valid ID."
                }
              },
              {
                "@type": "Question",
                "name": "What are the purchase limits in Aurora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aurora follows Colorado state limits: 1 ounce of flower, 8 grams of concentrate, or 800mg of edibles per transaction. You can make multiple transactions but must leave the store between purchases."
                }
              },
              {
                "@type": "Question",
                "name": "Are Aurora dispensaries cheaper than Denver?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Aurora dispensaries are typically 10-20% cheaper than downtown Denver due to less tourist markup, lower rent, and competitive pricing among the 200+ shops."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Best Dispensaries in Aurora (2025)</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">
                <Store className="w-3 h-3 mr-1" /> 200+ Dispensaries
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best Dispensaries in Aurora, Colorado (2025)
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Denver's Eastern Cannabis Hub • Closest to DIA
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Updated Dec 2025</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> BudQuest Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="py-12 bg-accent/5 border-y border-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-accent/30 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/10 shrink-0">
                      <Info className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Quick Answer</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Aurora has <strong>200+ recreational dispensaries</strong>—the largest concentration in the Denver metro area.
                        It's the closest major dispensary hub to <strong>Denver International Airport (DIA)</strong>, making it perfect for travelers.
                        One quirk: Aurora banned medical-only dispensaries, so everything here is recreational. If you have a med card,
                        you can still use it for discounts at rec shops.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Aurora for Dispensaries */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Why Aurora for Dispensaries?</h2>

              <div className="grid gap-4 mb-8">
                {auroraFacts.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-border/40">
                      <CardContent className="p-4 flex justify-between items-center gap-4">
                        <span className="font-semibold text-foreground">{item.factor}</span>
                        <span className="text-muted-foreground text-right">{item.details}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Why shop in Aurora:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Less crowded than downtown Denver dispensaries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Better parking (suburban lots vs. street parking)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Competitive prices (less tourist markup)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>The "Green Mile" corridor for one-stop shopping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Closest options to DIA</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Dispensaries */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/30">
                <Cannabis className="w-3 h-3 mr-1" /> Top-Rated Shops
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Best Dispensaries in Aurora</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {dispensaries.length} dispensaries found in Aurora, sorted by rating.
              </p>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="border-border/40">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : topDispensaries.length > 0 ? (
                <div className="space-y-4">
                  {topDispensaries.map((disp, index) => (
                    <motion.div
                      key={disp.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/dispensary/${disp.slug}`}>
                        <Card className="border-border/40 hover:border-accent/50 transition-all">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              {disp.image && (
                                <div className="md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                  <img
                                    src={disp.image}
                                    alt={disp.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                                  {disp.name}
                                </h3>

                                <div className="flex items-center gap-4 mb-3 flex-wrap">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>{disp.address}</span>
                                  </div>
                                  {disp.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                      <span className="font-semibold">{disp.rating}</span>
                                    </div>
                                  )}
                                </div>

                                <Badge className="bg-green-500/10 text-green-600 border-green-500/30 mb-3">
                                  Recreational
                                </Badge>

                                {disp.description && (
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {disp.description}
                                  </p>
                                )}

                                <Button variant="ghost" size="sm" className="group p-0 h-auto">
                                  View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border-border/40 bg-card/50">
                  <CardContent className="p-8 text-center">
                    <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No Aurora dispensaries found in database. Check back soon or browse all Colorado dispensaries.
                    </p>
                    <Button asChild>
                      <Link to="/dispensary">Browse All Dispensaries</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {topDispensaries.length > 0 && dispensaries.length > 12 && (
                <div className="mt-8 text-center">
                  <Button asChild size="lg">
                    <Link to="/aurora">View All {dispensaries.length} Aurora Dispensaries →</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dispensaries Near DIA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/30">
                <Plane className="w-3 h-3 mr-1" /> Airport Proximity
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Dispensaries Near Denver Airport (DIA)</h2>
              <p className="text-muted-foreground mb-8">
                If you're flying in and want to stock up immediately, or using up before your flight home:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-accent" /> Arriving
                    </h3>
                    <ul className="space-y-2">
                      {airportTips.arriving.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-500/30 bg-red-500/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-red-500" /> Departing
                    </h3>
                    <ul className="space-y-2">
                      {airportTips.departing.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Ban className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Critical Warning</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>Denver International Airport is federal property.</strong> Cannabis is 100% illegal there.
                        Don't bring anything through security—even empty containers.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/colorado/federal-land-warning">Learn More →</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Green Mile */}
        {greenMileDispensaries.length > 0 && (
          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/30">
                  <MapPin className="w-3 h-3 mr-1" /> Chambers Road
                </Badge>
                <h2 className="text-3xl font-bold mb-4">The "Green Mile" — Chambers Road Corridor</h2>
                <p className="text-muted-foreground mb-8">
                  Aurora's South Chambers Road is nicknamed the "Green Mile" for its concentration of dispensaries.
                  Park once, walk between multiple shops, compare prices.
                </p>

                <div className="space-y-4 mb-6">
                  {greenMileDispensaries.map((disp, index) => (
                    <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                      <Card className="border-border/40 hover:border-accent/50 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-bold mb-1">{disp.name}</h3>
                              <p className="text-sm text-muted-foreground">{disp.address}</p>
                            </div>
                            {disp.rating && (
                              <div className="flex items-center gap-1 shrink-0">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="font-semibold">{disp.rating}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Why the Green Mile works:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>Multiple dispensaries within walking distance</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>Compare prices before buying</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>Different shops have different daily deals</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>One parking spot, multiple options</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Aurora Cannabis Laws */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Aurora Cannabis Laws</h2>

              <div className="grid gap-4 mb-8">
                {cannabisLaws.map((law, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-4 flex justify-between items-center gap-4">
                      <span className="font-semibold">{law.rule}</span>
                      <span className="text-muted-foreground text-right">{law.details}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consumption Rules */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Where to Consume in Aurora</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" /> Legal
                  </h3>
                  <div className="space-y-3">
                    {legalConsumption.map((item, index) => (
                      <Card key={index} className="border-border/40 bg-green-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Ban className="w-5 h-5 text-red-500" /> Illegal
                  </h3>
                  <div className="space-y-3">
                    {illegalConsumption.map((item, index) => (
                      <Card key={index} className="border-border/40 bg-red-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <Ban className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{item.location}</p>
                              <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <Button asChild variant="outline">
                <Link to="/blog/where-can-you-smoke-weed-in-colorado-2025">Full Consumption Guide →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Aurora vs Denver Comparison */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Aurora vs. Denver Dispensaries</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left font-bold">Factor</th>
                      <th className="p-4 text-left font-bold">Aurora</th>
                      <th className="p-4 text-left font-bold">Denver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <tr key={index} className="border-b border-border/40">
                        <td className="p-4 font-semibold">{row.factor}</td>
                        <td className="p-4 text-muted-foreground">{row.aurora}</td>
                        <td className="p-4 text-muted-foreground">{row.denver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/blog/cannabis-dispensaries-denver">Denver Dispensaries →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Tips */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Tips for Shopping in Aurora</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {shoppingTips.map((tip, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Buy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What to Buy</h2>

              <div className="grid gap-4">
                {productTypes.map((product, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-4 items-center">
                        <div>
                          <h3 className="font-bold text-lg">{product.product}</h3>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{product.bestFor}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-accent/10 text-accent border-accent/30">
                            {product.priceRange}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-accent/30 bg-accent/5 mt-6">
                <CardContent className="p-6">
                  <p className="text-sm">
                    <strong>For airport travelers:</strong> Stick to products you can finish during your trip. Don't buy more than you can consume.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Nearby Attractions</h2>
              <p className="text-muted-foreground mb-8">
                What to do after you stock up (consume at your rental first):
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {nearbyAttractions.map((item, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{item.attraction}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Car className="w-4 h-4" /> {item.distance}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{item.notes}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-accent/30 bg-gradient-to-br from-accent/10 via-card to-accent/5">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Shop in Aurora?</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Aurora is Denver's eastern cannabis hub—200+ dispensaries, competitive prices, and the closest major options
                    to the airport. Skip the downtown crowds, find better parking, and shop where the locals do.
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button asChild size="lg">
                      <Link to="/aurora">Aurora Cannabis Guide →</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/dispensary">Browse All Dispensaries</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Links */}
              <div className="mt-12 grid md:grid-cols-3 gap-4">
                <Link to="/aurora">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Aurora Cannabis Guide</h3>
                      <p className="text-sm text-muted-foreground">Complete city guide</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/hotels">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">420-Friendly Stays</h3>
                      <p className="text-sm text-muted-foreground">Find lodging</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/blog/cannabis-dispensaries-denver">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Denver Dispensaries</h3>
                      <p className="text-sm text-muted-foreground">Compare options</p>
                    </CardContent>
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

export default BlogAuroraDispensaries;
