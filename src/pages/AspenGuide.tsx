import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  MapPin, Star, CheckCircle,
  Plane, Home, Cannabis, Shield,
  ArrowRight, Bed, Store, ChevronRight,
  Building2, AlertCircle, Clock, Car,
  Bus, Bike, MapPinned, Snowflake, Sun, Leaf, Flower2,
  Music, Palette, Beer, TreePine, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, Sparkles,
  ExternalLink, Compass, Tent, Utensils
} from "lucide-react";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number | null;
  image: string | null;
  images: string[] | null;
  is_recreational: boolean | null;
  is_medical: boolean | null;
  address: string;
}

interface Rental {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  rating: number | null;
  images: string[] | null;
  website: string | null;
}

const AspenGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch only Aspen dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .ilike('city', '%Aspen%')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false })
        .limit(4);

      if (dispData) setDispensaries(dispData);

      // Fetch only Aspen rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Aspen%')
        .order('rating', { ascending: false })
        .limit(4);

      if (rentalData) setRentals(rentalData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, source_page: 'aspen-guide' });

      if (error) {
        if (error.code === '23505') {
          toast.success("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Guide sent! Check your inbox.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }

    setEmail("");
    setSubmitting(false);
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-gold text-gold" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-muted-foreground/30" />);
      }
    }
    return stars;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Aspen Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Aspen, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and luxury ski resort tips.",
    "url": "https://budquest.guide/aspen",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Aspen",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Aspen",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cannabis legal in Aspen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Aspen for adults 21 and older. You can possess up to 1 ounce and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I consume cannabis in Aspen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cannabis consumption is only legal on private property with owner's permission. Consumption is prohibited on ski slopes, in public areas, and most hotels."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Aspen from Denver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aspen is approximately 4 hours from Denver by car via I-70 and Highway 82. The Aspen/Pitkin County Airport (ASE) offers direct flights from Denver and other major cities."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Aspen unique for cannabis travelers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aspen combines world-class skiing with luxury cannabis experiences. High-end dispensaries, upscale 420-friendly accommodations, and stunning mountain scenery create an unparalleled cannabis travel destination."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "5-35°F",
      highlights: [
        "World-class skiing at 4 mountains",
        "Après-ski culture with cannabis twist",
        "Holiday festivities and events",
        "Best powder conditions"
      ],
      tip: "Peak season - book early. Many rentals have private hot tubs perfect for evening sessions."
    },
    {
      id: "spring",
      name: "Spring",
      months: "April - May",
      icon: Flower2,
      temp: "30-55°F",
      highlights: [
        "Spring skiing deals",
        "420 celebrations (April 20th)",
        "Fewer crowds",
        "Shoulder season pricing"
      ],
      tip: "April offers great skiing and 420 festivities. Mud season in May - best for deals."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "55-80°F",
      highlights: [
        "Perfect hiking weather",
        "Music festivals",
        "Mountain biking",
        "Outdoor dining"
      ],
      tip: "Summer is gorgeous with mild temps. Great for hiking and exploring dispensaries."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "30-60°F",
      highlights: [
        "Golden aspen leaves (peak late September)",
        "Fewer tourists",
        "Food & Wine Classic legacy events",
        "Perfect photography conditions"
      ],
      tip: "Late September offers stunning fall colors. Book in advance for leaf-peeping season."
    }
  ];

  const attractions = [
    {
      name: "Aspen Mountain (Ajax)",
      icon: Mountain,
      description: "Aspen's signature ski mountain with the famous Silver Queen Gondola. 3,267 vertical feet of expert terrain.",
      cannabisTip: "No consumption on slopes - serious offense. Enjoy at your lodging before or after skiing.",
      address: "601 E Dean St"
    },
    {
      name: "Maroon Bells",
      icon: Camera,
      description: "The most photographed peaks in Colorado. Stunning alpine scenery just 10 miles from downtown Aspen.",
      cannabisTip: "National Forest land - no cannabis allowed. Save it for private property afterward.",
      address: "Maroon Creek Rd"
    },
    {
      name: "Downtown Aspen",
      icon: Building2,
      description: "Luxury shopping, world-class dining, and Victorian architecture. The heart of Aspen's social scene.",
      cannabisTip: "No public consumption. Dispensaries located downtown. Shop responsibly.",
      address: "Downtown Aspen"
    },
    {
      name: "Aspen Highlands",
      icon: Mountain,
      description: "Advanced skiing with the famous Highland Bowl. Less crowded than Ajax with incredible views.",
      cannabisTip: "Same rules as all ski areas - consumption prohibited. Highland Bowl hike is intense - stay sober.",
      address: "199 Prospector Rd"
    },
    {
      name: "Rio Grande Trail",
      icon: TreePine,
      description: "42-mile paved trail from Aspen to Glenwood Springs. Perfect for biking and walking.",
      cannabisTip: "Public trail - no consumption allowed. Great for sober outdoor activities.",
      address: "Aspen to Glenwood Springs"
    },
    {
      name: "Wheeler Opera House",
      icon: Music,
      description: "Historic Victorian theater hosting concerts, comedy, and events since 1889.",
      cannabisTip: "No consumption inside. Enjoy beforehand at your lodging for enhanced entertainment.",
      address: "320 E Hyman Ave"
    }
  ];

  const transportOptions = [
    {
      name: "Aspen Airport (ASE)",
      icon: Plane,
      description: "Small airport with flights from Denver, LA, Dallas, and Chicago. Often expensive but convenient.",
      tip: "Book flights early - limited capacity causes high prices. Consider Denver + drive."
    },
    {
      name: "Denver Drive (4 hours)",
      icon: Car,
      description: "Scenic drive via I-70 and Highway 82 through Glenwood Canyon. Stunning mountain views.",
      tip: "Check Independence Pass closure (winter). Glenwood Canyon is spectacular year-round."
    },
    {
      name: "RFTA Bus",
      icon: Bus,
      description: "Free bus service throughout Aspen and to nearby Snowmass. Excellent coverage.",
      tip: "Use the free bus - parking is expensive and limited. Great for responsible consumption."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown Aspen is very walkable. Most shops, restaurants, and dispensaries within walking distance.",
      tip: "The town is compact - you can walk almost everywhere in the core area."
    }
  ];

  const neighborhoods = [
    {
      name: "Downtown/Core",
      desc: "Heart of Aspen with luxury hotels, restaurants, and dispensaries. Most walkable area.",
      safety: "very-safe",
      walkable: true
    },
    {
      name: "Aspen Mountain Base",
      desc: "Ski-in/ski-out lodging at the base of Ajax. Convenient for winter visitors.",
      safety: "very-safe",
      walkable: true
    },
    {
      name: "West End",
      desc: "Quiet residential area with historic homes. Walking distance to downtown.",
      safety: "very-safe",
      walkable: true
    },
    {
      name: "Aspen Highlands",
      desc: "Near Highlands ski area. More affordable lodging options.",
      safety: "very-safe",
      walkable: false
    },
    {
      name: "Snowmass Village",
      desc: "15 minutes away with its own ski area. More family-friendly, good dispensary access.",
      safety: "very-safe",
      walkable: true
    },
    {
      name: "Basalt/El Jebel",
      desc: "30 minutes downvalley. Most affordable area with dispensary access.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "Colorado's capital and cannabis hub", distance: "4 hours" },
    { name: "Boulder", slug: "/boulder", desc: "Outdoor paradise with craft cannabis", distance: "3.5 hours" },
    { name: "Colorado Hub", slug: "/usa/colorado", desc: "Complete Colorado guide", distance: "Overview" },
  ];

  return (
    <>
      <Helmet>
        <title>Aspen Cannabis Guide 2025: Luxury Stays & Ski Tips</title>
        <meta name="description" content="Elevate your Aspen ski trip! Best luxury dispensaries, 420-friendly lodges, and high-altitude consumption tips for Colorado's premier resort." />
        <meta name="keywords" content="Aspen cannabis, Aspen dispensaries, 420-friendly hotels Aspen, Aspen marijuana laws 2025, Aspen weed tourism, Colorado cannabis Aspen, ski and cannabis Aspen, Aspen 420 travel" />
        <link rel="canonical" href="https://budquest.guide/aspen" />

        <meta property="og:title" content="Aspen Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Your complete guide to cannabis in Aspen. Find dispensaries, 420-friendly stays, ski tips, and travel advice." />
        <meta property="og:url" content="https://budquest.guide/aspen" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-colorado.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aspen Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Complete Aspen cannabis guide with dispensaries, hotels, and ski resort tips." />

        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Aspen" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Aspen</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Luxury Cannabis Destination
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Aspen Cannabis Travel Guide 2025
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where world-class skiing meets premium cannabis culture. Aspen offers the ultimate luxury cannabis travel experience with high-end dispensaries, upscale accommodations, and stunning Rocky Mountain scenery.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Stays</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "5+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "7,908 ft" },
                { icon: Plane, label: "From Denver", value: "4 hrs" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/30 text-center p-4 hover:border-accent/50 transition-all hover:-translate-y-1">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-accent/10 via-card to-gold/5 border-accent/20">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/20">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Recreational Cannabis is Legal in Aspen</h2>
                      <p className="text-muted-foreground mb-4">
                        Adults 21+ can legally purchase and possess up to 1 ounce of cannabis in Aspen and throughout Colorado. Consumption is only permitted on private property with owner's consent. Public consumption carries fines and is strictly prohibited on ski slopes.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-accent/20 text-accent border-accent/30">Recreational Legal</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Medical Available</Badge>
                        <Badge className="bg-gold/20 text-gold border-gold/30">21+ Only</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Time to Visit Aspen
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each season offers a unique Aspen experience. Plan your cannabis trip around the activities you love.
              </p>
            </motion.div>

            <Tabs defaultValue="winter" className="w-full">
              <TabsList className="grid grid-cols-4 max-w-lg mx-auto mb-8 bg-card/50">
                {seasons.map(season => (
                  <TabsTrigger key={season.id} value={season.id} className="data-[state=active]:bg-accent/20">
                    <season.icon className="w-4 h-4 mr-2" />
                    {season.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {seasons.map(season => (
                <TabsContent key={season.id} value={season.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-accent/20">
                                <season.icon className="w-6 h-6 text-accent" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                                <p className="text-sm text-muted-foreground">{season.months} • {season.temp}</p>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              {season.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center">
                            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Cannabis className="w-5 h-5 text-accent" />
                                <span className="font-semibold text-foreground">Cannabis Traveler Tip</span>
                              </div>
                              <p className="text-muted-foreground">{season.tip}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Featured Dispensaries */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Aspen Dispensaries
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Premium cannabis experiences in the heart of the Rockies
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dispensaries.length > 0 ? dispensaries.map((dispensary, index) => (
                <motion.div
                  key={dispensary.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/dispensary/${dispensary.slug}`}>
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={dispensary.image || dispensary.images?.[0] || "/dispensaries/native-roots-denver.png"}
                          alt={`${dispensary.name} dispensary in Aspen`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1">
                          {dispensary.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{dispensary.city}, {dispensary.state}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="text-sm font-medium">{dispensary.rating || 'N/A'}</span>
                          </div>
                          <div className="flex gap-1">
                            {dispensary.is_recreational && <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">Rec</Badge>}
                            {dispensary.is_medical && <Badge variant="outline" className="text-xs text-blue-400 border-blue-400/30">Med</Badge>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No Aspen dispensaries listed yet. Check back soon!</p>
                  <Button asChild variant="outline" className="mt-4 border-accent/30">
                    <Link to="/dispensary">Browse All Dispensaries</Link>
                  </Button>
                </div>
              )}
            </div>

            {dispensaries.length > 0 && (
              <div className="text-center">
                <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <Link to="/dispensary">
                    View All Dispensaries
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Rentals */}
        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Stays in Aspen
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Luxury accommodations that welcome cannabis travelers
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {rentals.length > 0 ? rentals.map((rental, index) => (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/hotels/${rental.slug}`}>
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={rental.images?.[0] || "/rentals/420-loft-glenwood-springs.jpg"}
                          alt={`${rental.name} 420-friendly accommodation in Aspen`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1">
                          {rental.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">Aspen, Colorado</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          <span className="text-sm font-medium">{rental.rating || 'N/A'}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No Aspen rentals listed yet. Check back soon!</p>
                  <Button asChild variant="outline" className="mt-4 border-accent/30">
                    <Link to="/hotels">Browse All Rentals</Link>
                  </Button>
                </div>
              )}
            </div>

            {rentals.length > 0 && (
              <div className="text-center">
                <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <Link to="/hotels">
                    View All 420 Rentals
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* What to Do */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  What to Do in Aspen
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Top attractions and activities for cannabis travelers
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border/30 h-full hover:border-accent/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent/20">
                          <attraction.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{attraction.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{attraction.description}</p>
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Cannabis className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-accent">Cannabis Tip</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{attraction.cannabisTip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consumption Rules */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Aspen Consumption Rules
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Know before you go - critical rules for cannabis in Aspen
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-accent/10 border-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                    <h3 className="text-xl font-bold text-foreground">Where You CAN Consume</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Private Residences</span>
                        <p className="text-sm text-muted-foreground">With owner/landlord permission</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Bed className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">420-Friendly Lodging</span>
                        <p className="text-sm text-muted-foreground">Some rentals allow on private balconies/patios</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Private Vehicles (Parked)</span>
                        <p className="text-sm text-muted-foreground">On private property only - never while driving</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-destructive/10 border-destructive/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Ban className="w-8 h-8 text-destructive" />
                    <h3 className="text-xl font-bold text-foreground">Where You CANNOT Consume</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Mountain className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Ski Slopes & Lifts</span>
                        <p className="text-sm text-muted-foreground">Serious offense - can lose pass</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <TreePine className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Public Spaces & Trails</span>
                        <p className="text-sm text-muted-foreground">Parks, sidewalks, hiking trails prohibited</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Restaurants & Bars</span>
                        <p className="text-sm text-muted-foreground">All indoor public spaces prohibited</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="bg-gold/10 border-gold/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-gold flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">Penalties for Violations</h4>
                      <p className="text-muted-foreground">
                        Public consumption fines start at $100+ in Aspen. Consumption on ski slopes can result in loss of ski pass,
                        ejection from the mountain, and criminal charges. DUI laws apply to cannabis - never drive impaired.
                        Aspen police actively enforce consumption laws, especially in tourist areas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Getting Around */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Getting Around Aspen
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transportation options and neighborhood guide
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Transportation Options</h3>
                <div className="space-y-4">
                  {transportOptions.map((option, index) => (
                    <Card key={option.name} className="bg-card/50 border-border/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-accent/20">
                            <option.icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{option.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                            <p className="text-xs text-accent">{option.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Neighborhoods</h3>
                <div className="space-y-3">
                  {neighborhoods.map((hood, index) => (
                    <Card key={hood.name} className="bg-card/50 border-border/30">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-foreground">{hood.name}</h4>
                            <p className="text-sm text-muted-foreground">{hood.desc}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge
                              variant="outline"
                              className={hood.safety === 'very-safe' ? 'text-accent border-accent/30' : 'text-yellow-400 border-yellow-400/30'}
                            >
                              {hood.safety === 'very-safe' ? 'Very Safe' : 'Safe'}
                            </Badge>
                            {hood.walkable && (
                              <Badge variant="outline" className="text-blue-400 border-blue-400/30 text-xs">
                                Walkable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-card to-gold/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Free Download</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Get the Aspen Cannabis Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with insider tips, neighborhood guides, dispensary map, and ski resort cannabis etiquette
              </p>

              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-card/50 border-border/30"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {submitting ? "Sending..." : "Get Free Guide"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                Free • No spam • Unsubscribe anytime
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Explore More Colorado Guides
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedGuides.map((guide, index) => (
                <motion.div
                  key={guide.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={guide.slug}>
                    <Card className="bg-card/50 border-border/30 h-full hover:border-accent/50 transition-all group">
                      <CardContent className="p-6 text-center">
                        <MapPin className="w-8 h-8 mx-auto mb-3 text-accent" />
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                          {guide.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                        <span className="text-xs text-accent">{guide.distance}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AspenGuide;