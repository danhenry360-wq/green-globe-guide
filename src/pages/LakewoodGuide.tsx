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
  Music, Mountain, TreePine, Camera,
  AlertTriangle, Ban, Mail
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
  amenities?: unknown;
}

const LakewoodGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: dispData } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('state', 'Colorado')
          .ilike('city', '%Lakewood%')
          .order('rating', { ascending: false })
          .limit(4);

        if (dispData) setDispensaries(dispData);

        const { data: rentalData } = await supabase
          .from('hotels')
          .select('*')
          .eq('is_420_friendly', true)
          .ilike('address', '%Lakewood%')
          .order('rating', { ascending: false })
          .limit(4);

        if (rentalData) setRentals(rentalData);
      } catch (error) {
        console.error("Error fetching Lakewood data:", error);
      } finally {
        setLoading(false);
      }
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
        .insert({ email, source_page: 'lakewood-guide' });

      if (error) {
        if (error.code === '23505') {
          toast.success("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Lakewood Guide sent! Check your inbox.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }

    setEmail("");
    setSubmitting(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/dest-2.jpg";
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
    "name": "Lakewood Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Lakewood, Colorado including dispensaries, 420-friendly hotels, Red Rocks, and marijuana laws.",
    "url": "https://budquest.guide/lakewood",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Lakewood",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lakewood",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "45-65°F",
      highlights: [
        "Perfect hiking weather at Bear Creek",
        "Red Rocks concert season begins",
        "Mountain wildflowers blooming",
        "Lower tourist crowds"
      ],
      tip: "Great time for outdoor activities and dispensary deals. Watch for afternoon rain."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "70-90°F",
      highlights: [
        "Red Rocks Amphitheatre peak season",
        "Dinosaur Ridge exploration",
        "Bear Creek Lake Park activities",
        "Outdoor dispensary events"
      ],
      tip: "Book accommodations early for Red Rocks shows. Afternoon thunderstorms common."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: [
        "Golden aspens in the foothills",
        "Harvest season dispensary specials",
        "Perfect hiking temperatures",
        "Cider Mill season"
      ],
      tip: "October offers crispy weather, fall colors, and fresh cannabis harvests."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "25-45°F",
      highlights: [
        "Quick access to ski resorts",
        "Holiday light displays",
        "Cozy indoor activities",
        "Winter dispensary deals"
      ],
      tip: "Great base for affordable ski trips. Less crowded than Denver."
    }
  ];

  const attractions = [
    {
      name: "Red Rocks Amphitheatre",
      icon: Music,
      description: "World-famous outdoor concert venue with stunning natural red rock formations.",
      cannabisTip: "Concerts are 🔥 with cannabis but public consumption is illegal. Consume before arrival.",
      address: "18300 W Alameda Pkwy"
    },
    {
      name: "Bear Creek Lake Park",
      icon: TreePine,
      description: "875-acre park with lake, trails, and mountain views perfect for outdoor adventures.",
      cannabisTip: "No consumption in the park (it's city property). Enjoy before your hike.",
      address: "15600 W Morrison Rd"
    },
    {
      name: "Dinosaur Ridge",
      icon: Mountain,
      description: "Famous fossil site where you can see real dinosaur tracks and bones in the rocks.",
      cannabisTip: "Great post-session adventure. Just don't touch the fossils!",
      address: "16831 W Alameda Pkwy"
    },
    {
      name: "Colorado Mills Mall",
      icon: Building2,
      description: "Outlet shopping center with entertainment, dining, and movie theater.",
      cannabisTip: "Stock up on snacks after a dispensary visit. No consumption on property.",
      address: "14500 W Colfax Ave"
    },
    {
      name: "Crown Hill Park",
      icon: TreePine,
      description: "Scenic park with lake, trails, and stunning Denver skyline views.",
      cannabisTip: "Beautiful sunset spot. Consume responsibly at your accommodation before visiting.",
      address: "2500 W 26th Ave"
    },
    {
      name: "Casa Bonita",
      icon: Camera,
      description: "Iconic Mexican restaurant with cliff divers, caves, and arcade. A Colorado institution.",
      cannabisTip: "Perfect munchie destination! The experience is wild sober or enhanced.",
      address: "6715 W Colfax Ave"
    }
  ];

  const neighborhoods = [
    {
      name: "Belmar",
      desc: "Walkable urban center with shops, restaurants, and entertainment venues.",
      safety: "very-safe",
      walkable: true
    },
    {
      name: "Green Mountain",
      desc: "Residential area with quick access to hiking and mountain views.",
      safety: "safe",
      walkable: false
    },
    {
      name: "West Colfax",
      desc: "Diverse corridor with dispensaries, restaurants, and local character.",
      safety: "safe",
      walkable: true
    },
    {
      name: "Union Square",
      desc: "Newer development with modern amenities and easy highway access.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "The Mile High City", distance: "15 min" },
    { name: "Golden", slug: "/golden", desc: "Coors & Trails", distance: "10 min" },
    { name: "Colorado Hub", slug: "/usa/colorado", desc: "Full State Guide", distance: "" },
  ];

  return (
    <>
      <Helmet>
        <title>Lakewood Cannabis Travel Guide 2025 | Red Rocks, Dispensaries & 420 Stays | BudQuest</title>
        <meta name="description" content="Plan your Lakewood cannabis trip. Find dispensaries near Red Rocks, 420-friendly rentals, and explore Bear Creek and Dinosaur Ridge." />
        <meta name="keywords" content="Lakewood cannabis, Lakewood dispensaries, Red Rocks 420, 420-friendly rentals Lakewood, Colorado weed laws 2025" />
        <link rel="canonical" href="https://budquest.guide/lakewood" />

        <meta property="og:title" content="Lakewood Cannabis Travel Guide 2025" />
        <meta property="og:description" content="Your complete guide to cannabis in Lakewood: Red Rocks, Dispensaries, and 420 Rentals." />
        <meta property="og:url" content="https://budquest.guide/lakewood" />
        <meta property="og:image" content="https://budquest.guide/og-logo.jpg" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Lakewood</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <img
              src="/dest-2.jpg"
              alt="Lakewood Colorado Mountains"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent/20">
                <Music className="w-4 h-4 mr-2" />
                Gateway to Red Rocks
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Lakewood Cannabis Guide
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Denver's western neighbor with Red Rocks Amphitheatre, mountain trails, and quality dispensaries. Experience cannabis with iconic Colorado scenery.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
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
                { icon: Store, label: "Dispensaries", value: "10+" },
                { icon: Shield, label: "Possession Limit", value: "2 oz" },
                { icon: MapPin, label: "From Denver", value: "15 min" },
                { icon: Music, label: "Red Rocks", value: "5 min" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-card/50 rounded-lg border border-border/30 hover:border-accent/30 transition-colors"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Lakewood Cannabis Laws 🌿
                </span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-card/50 border-accent/30">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Recreational Legal
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" /> What's Allowed
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            Adults 21+ with valid ID
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            Possess up to 2 oz flower
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            Private property consumption
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            Purchase from licensed dispensaries
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Ban className="w-5 h-5 text-red-500" /> What's Prohibited
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            Public consumption (parks, sidewalks)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            Red Rocks venue (federal-adjacent)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            Driving under influence (DUI)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            Crossing state lines
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-900/10 border-red-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <h3 className="font-semibold text-foreground">Red Rocks Warning</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      While Red Rocks is in Lakewood, it's operated by Denver and has strict no-cannabis policies. Security checks bags and consumption is prohibited.
                    </p>
                    <Link to="/colorado/federal-land-warning" className="text-accent hover:underline text-sm flex items-center gap-1">
                      Federal Land Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Best Time to Visit 📅
              </span>
            </h2>

            <Tabs defaultValue="summer" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-background/50">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="flex items-center gap-2">
                    <season.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{season.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <Card className="bg-card/50 border-border/30">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                          <p className="text-muted-foreground">{season.months} • {season.temp}</p>
                        </div>
                        <season.icon className="w-12 h-12 text-accent mt-2 md:mt-0" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="space-y-2">
                          {season.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-accent">💡 Pro Tip:</strong> {season.tip}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Lakewood Dispensaries 🌿
                </span>
              </h2>
              <Link to="/dispensary" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-card/30 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dispensaries.map((dispensary) => (
                  <Link key={dispensary.id} to={`/dispensary/${dispensary.slug}`}>
                    <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-all overflow-hidden group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={dispensary.images?.[0] || dispensary.image || "/dest-2.jpg"}
                          alt={dispensary.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {dispensary.is_recreational && (
                            <Badge className="bg-green-500/80 text-white text-xs">REC</Badge>
                          )}
                          {dispensary.is_medical && (
                            <Badge className="bg-blue-500/80 text-white text-xs">MED</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{dispensary.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{dispensary.city}, {dispensary.state}</p>
                        {dispensary.rating && (
                          <div className="flex items-center gap-1">
                            {renderRating(dispensary.rating)}
                            <span className="text-sm text-muted-foreground ml-1">({dispensary.rating})</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground mb-2">No Lakewood Dispensaries Yet</h3>
                <p className="text-muted-foreground mb-4">Check out nearby Denver for great options.</p>
                <Button asChild variant="outline">
                  <Link to="/denver">Explore Denver Dispensaries</Link>
                </Button>
              </Card>
            )}
          </div>
        </section>

        {/* Rentals Section */}
        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Stays 🏨
                </span>
              </h2>
              <Link to="/hotels" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-card/30 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-all overflow-hidden group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={rental.images?.[0] || "/dest-2.jpg"}
                          alt={rental.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                        />
                        <Badge className="absolute top-2 right-2 bg-accent/80 text-accent-foreground">420 Friendly</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{rental.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{rental.address || "Lakewood, CO"}</p>
                        {rental.rating && (
                          <div className="flex items-center gap-1">
                            {renderRating(rental.rating)}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground mb-2">No Lakewood Rentals Yet</h3>
                <p className="text-muted-foreground mb-4">Check out nearby Denver for 420-friendly stays.</p>
                <Button asChild variant="outline">
                  <Link to="/hotels">Browse All 420 Rentals</Link>
                </Button>
              </Card>
            )}
          </div>
        </section>

        {/* Attractions */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Things to Do 🎸
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <Card key={attraction.name} className="bg-card/50 border-border/30 hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <attraction.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground">{attraction.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{attraction.description}</p>
                    <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-accent">🌿 Cannabis Tip:</strong> {attraction.cannabisTip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Neighborhoods to Explore 🏘️
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((hood) => (
                <Card key={hood.name} className="bg-card/50 border-border/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground text-lg">{hood.name}</h3>
                      <div className="flex gap-2">
                        {hood.walkable && (
                          <Badge variant="outline" className="text-xs">🚶 Walkable</Badge>
                        )}
                        <Badge className={`text-xs ${hood.safety === 'very-safe' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {hood.safety === 'very-safe' ? '✓ Very Safe' : '✓ Safe'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{hood.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Around */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Getting Around 🚗
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 border-border/30">
                <CardContent className="p-6 text-center">
                  <Car className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold text-foreground mb-2">By Car</h3>
                  <p className="text-muted-foreground text-sm">Best way to explore. 15 min to Denver, 5 min to Red Rocks. Never drive impaired.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/30">
                <CardContent className="p-6 text-center">
                  <Bus className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold text-foreground mb-2">RTD Light Rail</h3>
                  <p className="text-muted-foreground text-sm">W Line connects Lakewood to downtown Denver. Great for avoiding parking.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/30">
                <CardContent className="p-6 text-center">
                  <Bike className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold text-foreground mb-2">Bike & Trail</h3>
                  <p className="text-muted-foreground text-sm">Bear Creek Trail connects to Denver. Great for scenic rides.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-gold/5">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Get the Lakewood Insider Guide
              </span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Red Rocks show tips, dispensary deals, and local secrets delivered to your inbox.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-card/50 border-border/30"
                required
              />
              <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90">
                {submitting ? "Sending..." : "Get Free Guide"}
              </Button>
            </form>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Explore Nearby 🗺️
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <Link key={guide.name} to={guide.slug}>
                  <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{guide.desc}</p>
                      {guide.distance && (
                        <Badge variant="outline" className="text-xs">{guide.distance} away</Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Important Links */}
        <section className="py-12 bg-card/30 border-t border-border/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/colorado/consumption-guide" className="text-accent hover:underline flex items-center gap-1">
                <Cannabis className="w-4 h-4" /> Consumption Guide
              </Link>
              <Link to="/colorado/federal-land-warning" className="text-accent hover:underline flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Federal Land Warning
              </Link>
              <Link to="/colorado/altitude-guide" className="text-accent hover:underline flex items-center gap-1">
                <Mountain className="w-4 h-4" /> Altitude Guide
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LakewoodGuide;
