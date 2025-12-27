import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Star, DollarSign, CheckCircle2, AlertTriangle,
  Bed, Home, Wifi, Mountain, ThermometerSnowflake, ExternalLink,
  Store, ArrowRight, Info, Ban, AlertCircle, ChevronRight, Leaf
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Rental {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  rating: number | null;
  images: string[] | null;
  website: string | null;
  policies: string | null;
  price_range: string | null;
  amenities: any;
}

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  address: string;
  rating: number;
  image: string | null;
}

const BlogAspenStays = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch 420-friendly stays in Aspen
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Aspen%')
        .order('rating', { ascending: false });

      if (rentalData) setRentals(rentalData);

      // Fetch Aspen dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .ilike('city', '%Aspen%')
        .order('rating', { ascending: false });

      if (dispData) setDispensaries(dispData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const aspenSituation = [
    { factor: "Elevation", detail: "7,908 ft (cannabis hits harder)" },
    { factor: "Vibe", detail: "Ultra-luxury, celebrity playground, world-class skiing" },
    { factor: "Average hotel price", detail: "$400-1,500+/night in season" },
    { factor: "Dispensaries", detail: "4 in town" },
    { factor: "420-friendly hotels", detail: "Very limited—mostly outdoor smoking only" },
    { factor: "Best strategy", detail: "Private rental with outdoor space or balcony hotel" },
    { factor: "Ski slopes", detail: "NO consumption (federal land)" }
  ];

  const consumptionRules = [
    { location: "Your 420-friendly rental (private property)", status: "legal", icon: CheckCircle2 },
    { location: "Hotel balcony (if discreet, vape only)", status: "tolerated", icon: AlertCircle },
    { location: "Private outdoor areas", status: "legal", icon: CheckCircle2 }
  ];

  const bannedLocations = [
    { location: "Ski slopes", reason: "Federal land—completely illegal" },
    { location: "Gondola/lifts", reason: "Federal jurisdiction" },
    { location: "Downtown Aspen streets", reason: "Public consumption illegal" },
    { location: "Hotel rooms (most)", reason: "Policy violation, fines" },
    { location: "Restaurants/bars", reason: "Private business, not allowed" },
    { location: "National Forest areas", reason: "Federal land" }
  ];

  const altitudeImpact = [
    { factor: "Aspen elevation", impact: "7,908 ft" },
    { factor: "Ski summit elevation", impact: "11,000-12,500 ft" },
    { factor: "Cannabis effect", impact: "20-40% stronger than sea level" },
    { factor: "Dehydration", impact: "Intensifies effects" },
    { factor: "Alcohol + cannabis + altitude", impact: "Dangerous combo" }
  ];

  const nearbyAlternatives = [
    { location: "Glenwood Springs", distance: "40 min", why: "420 LOFT (explicitly 420-friendly), hot springs", price: "$150-300/night" },
    { location: "Carbondale", distance: "30 min", why: "More affordable rentals, artsy vibe", price: "$150-250/night" },
    { location: "Basalt", distance: "20 min", why: "Quiet, local feel", price: "$150-300/night" },
    { location: "Snowmass", distance: "10 min", why: "Ski-in/ski-out options", price: "$300-600/night" }
  ];

  const comparison = [
    { factor: "Vibe", aspen: "Ultra-luxury", breckenridge: "Tourist-friendly", telluride: "Remote, chill" },
    { factor: "420-friendly stays", aspen: "Very limited", breckenridge: "Limited (no hotel smoking rooms)", telluride: "Limited" },
    { factor: "Dispensaries", aspen: "4", breckenridge: "5+", telluride: "3" },
    { factor: "Prices", aspen: "$$$$", breckenridge: "$$", telluride: "$$" },
    { factor: "Best for", aspen: "Luxury seekers", breckenridge: "Accessible ski trip", telluride: "Off-grid experience" }
  ];

  const tips = [
    "Book private rentals — More freedom than hotels",
    "Bring a vape pen — Discreet, less smell",
    "Stock up on arrival — Aspen dispensary prices are high",
    "Don't ski high — Federal land + dangerous",
    "Consume at rental only — Public consumption heavily enforced",
    "Respect the altitude — Go slow, hydrate",
    "Budget extra — Everything in Aspen costs more"
  ];

  const products = [
    { product: "Vape pen", why: "Discreet for hotel balconies" },
    { product: "Pre-rolls", why: "Easy après-ski sessions" },
    { product: "Low-dose edibles (5mg)", why: "Evening relaxation, no smoke" },
    { product: "High-quality flower", why: "Treat yourself, it's Aspen" }
  ];

  return (
    <>
      <Helmet>
        <title>Best 420-Friendly Stays in Aspen (2025): Luxury Ski Town Cannabis Lodging | BudQuest</title>
        <meta name="description" content="Find 420-friendly hotels and rentals in Aspen, Colorado. Complete guide to cannabis lodging in America's most luxurious ski town with dispensary locations and consumption tips." />
        <meta name="keywords" content="420 friendly hotels aspen, cannabis friendly lodging aspen, weed friendly rentals aspen colorado, marijuana friendly aspen hotels, where to stay aspen cannabis, smoke friendly aspen" />
        <link rel="canonical" href="https://budquest.guide/blog/best-420-friendly-stays-aspen" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Best 420-Friendly Stays in Aspen (2025): Luxury Ski Town Cannabis Lodging" />
        <meta property="og:description" content="Your complete guide to 420-friendly hotels and rentals in Aspen. Find cannabis-welcoming luxury lodging near world-class skiing." />
        <meta property="og:url" content="https://budquest.guide/blog/best-420-friendly-stays-aspen" />
        <meta property="og:image" content="https://budquest.guide/blog-aspen-stays.jpg" />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are there 420-friendly hotels in Aspen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "420-friendly hotels in Aspen are very limited. Most high-end hotels are smoke-free. Your best options are private vacation rentals with outdoor space, hotels with balconies (outdoor use only, be discreet), or the budget-friendly St. Moritz Lodge which is cannabis-tolerant."
                }
              },
              {
                "@type": "Question",
                "name": "Can you smoke weed at Aspen ski resorts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, absolutely not. Aspen ski mountains (Aspen Mountain, Aspen Highlands, Buttermilk, Snowmass) are on federal land where cannabis is 100% illegal. Penalties include up to 6 months jail and $5,000 fine."
                }
              },
              {
                "@type": "Question",
                "name": "How many dispensaries are in Aspen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There are 4 dispensaries in Aspen. Prices are typically 20-40% higher than Denver due to Aspen's luxury market."
                }
              },
              {
                "@type": "Question",
                "name": "Where can you consume cannabis in Aspen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can legally consume cannabis at your private 420-friendly rental property or private outdoor areas. Hotel balconies are tolerated if you're discreet and use vape pens. Public consumption, ski slopes, and federal land are strictly prohibited."
                }
              },
              {
                "@type": "Question",
                "name": "Does altitude affect cannabis in Aspen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, significantly. At Aspen's 7,908 ft elevation (ski summits reach 11,000-12,500 ft), cannabis effects are 20-40% stronger than at sea level. Start with half your normal dose and stay hydrated."
                }
              },
              {
                "@type": "Question",
                "name": "What's the cheapest 420-friendly stay in Aspen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "St. Moritz Lodge is the most budget-friendly option in Aspen, offering both hostel-style and private rooms. It's cannabis-tolerant with outdoor areas. For even cheaper options, consider staying in Glenwood Springs (40 min away) where the 420 LOFT is explicitly cannabis-friendly."
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
            <li className="text-foreground">Best 420-Friendly Stays in Aspen (2025)</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-3 h-3 mr-1" /> Luxury Ski Town Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best 420-Friendly Stays in Aspen (2025)
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Luxury Ski Town Cannabis Lodging Guide
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
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
                        Aspen is Colorado's premier luxury ski destination—but 420-friendly lodging is limited and expensive.
                        No hotels officially allow indoor smoking. Your best options are <strong>private rentals with outdoor space</strong>,
                        hotels with balconies (be discreet), or the budget-friendly <strong>St. Moritz Lodge</strong>.
                        Here's how to find cannabis-welcoming stays in America's most glamorous mountain town.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Aspen Situation */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">The Aspen Situation</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                The reality: Aspen is expensive and exclusive. Most high-end hotels are smoke-free. But cannabis is legal in Colorado,
                and with the right approach, you can enjoy both luxury and elevation.
              </p>

              <div className="grid gap-4 mb-8">
                {aspenSituation.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-border/40">
                      <CardContent className="p-4 flex justify-between items-center">
                        <span className="font-semibold text-foreground">{item.factor}</span>
                        <span className="text-muted-foreground text-right">{item.detail}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 420-Friendly Stays */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/30">
                <Leaf className="w-3 h-3 mr-1" /> Cannabis-Friendly Lodging
              </Badge>
              <h2 className="text-3xl font-bold mb-4">420-Friendly Stays in Aspen</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Verified cannabis-welcoming accommodations in Aspen and nearby areas.
              </p>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="border-border/40">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : rentals.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {rentals.map((rental, index) => (
                    <motion.div
                      key={rental.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/hotels/${rental.slug}`}>
                        <Card className="border-border/40 hover:border-accent/50 transition-all">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              {rental.images && rental.images[0] && (
                                <div className="md:w-64 h-48 rounded-lg overflow-hidden shrink-0">
                                  <img
                                    src={rental.images[0]}
                                    alt={rental.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                                  {rental.name}
                                </h3>

                                <div className="space-y-2 mb-4">
                                  {rental.address && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <MapPin className="w-4 h-4" />
                                      <span>{rental.address}</span>
                                    </div>
                                  )}
                                  {rental.rating && (
                                    <div className="flex items-center gap-2">
                                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                      <span className="font-semibold">{rental.rating}</span>
                                    </div>
                                  )}
                                  {rental.price_range && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <DollarSign className="w-4 h-4" />
                                      <span>{rental.price_range}</span>
                                    </div>
                                  )}
                                </div>

                                <Badge className="bg-green-500/10 text-green-600 border-green-500/30 mb-4">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> 420-Friendly
                                </Badge>

                                {rental.policies && (
                                  <p className="text-sm text-muted-foreground mb-4">
                                    🌿 {rental.policies}
                                  </p>
                                )}

                                <Button variant="outline" className="group">
                                  View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                <Card className="border-border/40 bg-card/50 mb-8">
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No explicitly 420-friendly stays found in our Aspen database yet. Check out our alternative options below or browse nearby cities.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Button asChild variant="outline">
                        <Link to="/hotels">Browse All 420-Friendly Stays</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/glenwood-springs">Glenwood Springs (40 min away)</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Budget Option */}
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-blue-500/10 text-blue-600 border-blue-500/30">Budget-Friendly</Badge>
                  <h3 className="text-2xl font-bold mb-4">St. Moritz Lodge</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>Aspen, Colorado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span>$$ (cheapest in Aspen)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>420-tolerant, outdoor areas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-accent" />
                      <span>Hostel-style + private rooms</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Why:</strong> Only affordable option in Aspen, cannabis-tolerant<br/>
                    <strong>Best for:</strong> Budget travelers, solo visitors
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nearby Alternatives */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Nearby Alternatives</h2>
              <p className="text-muted-foreground mb-8">
                If Aspen prices are too steep, these nearby towns offer more affordable 420-friendly options:
              </p>

              <div className="grid gap-4 mb-6">
                {nearbyAlternatives.map((alt, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <h3 className="font-bold text-lg">{alt.location}</h3>
                          <p className="text-sm text-muted-foreground">{alt.distance} from Aspen</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-muted-foreground">{alt.why}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-accent/10 text-accent border-accent/30">{alt.price}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <p className="text-sm flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span><strong>Pro tip:</strong> Stay in Glenwood Springs at the 420 LOFT, enjoy the hot springs, and day-trip to Aspen for skiing.</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Where to Stock Up */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Where to Stock Up</h2>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <Card key={i} className="border-border/40">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : dispensaries.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {dispensaries.map((disp, index) => (
                    <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                      <Card className="border-border/40 hover:border-accent/50 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2">{disp.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" /> {disp.address}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {disp.rating}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-accent" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="border-border/40 mb-6">
                  <CardContent className="p-6 text-center">
                    <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No Aspen dispensaries in database. Check out our full dispensary directory.</p>
                  </CardContent>
                </Card>
              )}

              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <p className="text-sm flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span><strong>Aspen dispensary prices:</strong> Expect 20-40% higher than Denver. It's Aspen—everything costs more.</span>
                  </p>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Button asChild>
                  <Link to="/aspen">View Full Aspen Cannabis Guide →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Consumption Rules */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Where You CAN Consume */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Where You CAN Consume
                  </h2>
                  <div className="space-y-3">
                    {consumptionRules.map((rule, index) => (
                      <Card key={index} className={`border-border/40 ${rule.status === 'legal' ? 'bg-green-500/5' : 'bg-yellow-500/5'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <rule.icon className={`w-5 h-5 shrink-0 mt-0.5 ${rule.status === 'legal' ? 'text-green-500' : 'text-yellow-500'}`} />
                            <div>
                              <p className="font-medium">{rule.location}</p>
                              <Badge className={`mt-2 ${rule.status === 'legal' ? 'bg-green-500/10 text-green-600 border-green-500/30' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'}`}>
                                {rule.status === 'legal' ? 'Legal' : 'Tolerated'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Where You CANNOT Consume */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Ban className="w-6 h-6 text-red-500" />
                    Where You CANNOT Consume
                  </h2>
                  <div className="space-y-3">
                    {bannedLocations.map((item, index) => (
                      <Card key={index} className="border-border/40 bg-red-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Ban className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">{item.location}</p>
                              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="border-red-500/30 bg-red-500/5 mt-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Critical Warning</h3>
                      <p className="text-sm text-muted-foreground">
                        Aspen ski mountains (Aspen Mountain, Aspen Highlands, Buttermilk, Snowmass) are on <strong>federal land</strong>.
                        Cannabis is 100% illegal. Penalties: up to 6 months jail, $5,000 fine.
                      </p>
                      <Button asChild variant="outline" size="sm" className="mt-4">
                        <Link to="/colorado/federal-land-warning">Learn More →</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Altitude Warning */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ThermometerSnowflake className="w-8 h-8 text-accent" />
                Altitude Warning
              </h2>

              <div className="grid gap-4 mb-8">
                {altitudeImpact.map((item, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-4 flex justify-between items-center">
                      <span className="font-semibold">{item.factor}</span>
                      <span className="text-muted-foreground">{item.impact}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Strategy:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Cut your normal dose in half</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Hydrate constantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Don't consume before skiing (impairment + federal land)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Wait until you're back at your rental</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="mt-6">
                    <Link to="/colorado/altitude-guide">Full Altitude Guide →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Smart Aspen Trip */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">The Smart Aspen Cannabis Trip</h2>

              <div className="space-y-4 mb-8">
                <Card className="border-border/40">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Badge className="mb-2">Morning</Badge>
                        <p className="font-semibold">Ski the slopes</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Cannabis Strategy:</strong> Sober—federal land, need reflexes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Badge className="mb-2">Après-ski</Badge>
                        <p className="font-semibold">Return to rental</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Cannabis Strategy:</strong> Session at your 420-friendly stay
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Badge className="mb-2">Evening</Badge>
                        <p className="font-semibold">Dinner in town</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Cannabis Strategy:</strong> Consume at rental first, enjoy buzzed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Badge className="mb-2">Night</Badge>
                        <p className="font-semibold">Hot tub, stargazing</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Cannabis Strategy:</strong> Full session, relaxation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-500/30 bg-red-500/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Ban className="w-5 h-5 text-red-500" /> Don't
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Consume on the mountain</li>
                      <li>• Consume in public</li>
                      <li>• Consume before skiing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30 bg-green-500/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Do
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Ski sober</li>
                      <li>• Enjoy cannabis at your private rental</li>
                      <li>• Session après-ski</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Aspen vs. Other Ski Towns</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left font-bold">Factor</th>
                      <th className="p-4 text-left font-bold">Aspen</th>
                      <th className="p-4 text-left font-bold">Breckenridge</th>
                      <th className="p-4 text-left font-bold">Telluride</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <tr key={index} className="border-b border-border/40">
                        <td className="p-4 font-semibold">{row.factor}</td>
                        <td className="p-4 text-muted-foreground">{row.aspen}</td>
                        <td className="p-4 text-muted-foreground">{row.breckenridge}</td>
                        <td className="p-4 text-muted-foreground">{row.telluride}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-4 flex-wrap">
                <Button asChild variant="outline">
                  <Link to="/blog/best-420-friendly-stays-breckenridge">Breckenridge Guide →</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/telluride">Telluride Guide →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Tips for 420 Travelers in Aspen</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
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
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What to Buy at Aspen Dispensaries</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {products.map((item, index) => (
                  <Card key={index} className="border-border/40">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{item.product}</h3>
                      <p className="text-sm text-muted-foreground">{item.why}</p>
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
                  <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Aspen Cannabis Trip?</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Aspen isn't the easiest Colorado ski town for 420-friendly lodging—but with a private rental,
                    the right dispensary run, and smart timing around the slopes, you can experience world-class skiing
                    and legal cannabis in America's most glamorous mountain town.
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button asChild size="lg">
                      <Link to="/aspen">Aspen Cannabis Guide →</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/hotels">Browse 420-Friendly Stays</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Links */}
              <div className="mt-12 grid md:grid-cols-3 gap-4">
                <Link to="/aspen">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Aspen Cannabis Guide</h3>
                      <p className="text-sm text-muted-foreground">Complete Aspen guide</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/dispensary">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Aspen Dispensaries</h3>
                      <p className="text-sm text-muted-foreground">Find the best shops</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/colorado/federal-land-warning">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Federal Land Warning</h3>
                      <p className="text-sm text-muted-foreground">Know the law</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/colorado/altitude-guide">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Altitude + Cannabis Guide</h3>
                      <p className="text-sm text-muted-foreground">Stay safe at elevation</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/blog/best-420-friendly-stays-breckenridge">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Breckenridge 420 Stays</h3>
                      <p className="text-sm text-muted-foreground">Alternative ski town</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/glenwood-springs">
                  <Card className="border-border/40 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Glenwood Springs</h3>
                      <p className="text-sm text-muted-foreground">Budget-friendly nearby</p>
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

export default BlogAspenStays;
