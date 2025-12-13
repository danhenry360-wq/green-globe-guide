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
  Home, Cannabis, Shield, 
  ArrowRight, Bed, Store, ChevronRight,
  Building2, Clock, Car,
  Snowflake, Sun, Leaf, Flower2,
  TreePine, Mountain, ShoppingBag,
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

const ThorntonGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Thornton%')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Thornton%')
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
        .insert({ email, source_page: 'thornton-guide' });
      
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
        stars.push(<Star key={i} className="h-4 h-4 text-muted-foreground/30" />);
      }
    }
    return stars;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Thornton Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis in Thornton, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and travel tips for Denver's northern suburb.",
    "url": "https://budquest.guide/thornton",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Thornton",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Thornton",
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
      temp: "40-65°F",
      highlights: [
        "Great weather for exploring local trails",
        "Spring dispensary sales",
        "Easy access to Denver events",
        "Lower accommodation prices"
      ],
      tip: "Perfect time for a budget-friendly Denver metro cannabis trip."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "70-90°F",
      highlights: [
        "Outdoor activities at local parks",
        "Community events and festivals",
        "Quick access to Rocky Mountain National Park",
        "Extended daylight hours"
      ],
      tip: "Stay in Thornton for lower prices while enjoying Denver's summer events."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: [
        "Beautiful fall colors nearby",
        "Harvest season dispensary deals",
        "Great hiking weather",
        "Less crowded than summer"
      ],
      tip: "October offers the best balance of weather and dispensary promotions."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Easy I-25 access to ski resorts",
        "Indoor cannabis activities",
        "Holiday shopping at Thornton Town Center",
        "Winter dispensary specials"
      ],
      tip: "Great base for ski trips with more affordable lodging than mountain towns."
    }
  ];

  const attractions = [
    {
      name: "Thornton Town Center",
      icon: ShoppingBag,
      description: "Major shopping destination with restaurants, entertainment, and retail stores.",
      cannabisTip: "Great for munchies runs after your session. Many dining options nearby.",
      address: "3971 E 120th Ave"
    },
    {
      name: "Carpenter Park",
      icon: TreePine,
      description: "Beautiful 62-acre park with trails, playgrounds, and open spaces.",
      cannabisTip: "Consume beforehand and enjoy a relaxing walk. No public consumption allowed.",
      address: "11000 Colorado Blvd"
    },
    {
      name: "Trail Winds Recreation Center",
      icon: Building2,
      description: "Modern recreation center with pools, gym, and fitness facilities.",
      cannabisTip: "Don't consume before swimming. Great for next-day recovery activities.",
      address: "1000 Thornton Pkwy"
    },
    {
      name: "Margaret W. Carpenter Recreation Center",
      icon: Mountain,
      description: "Large community center with indoor climbing wall and multiple pools.",
      cannabisTip: "Climbing wall is challenging - not recommended while impaired. Pools great for day-after recovery.",
      address: "11151 Colorado Blvd"
    }
  ];

  const neighborhoods = [
    { 
      name: "Original Thornton", 
      desc: "Historic core with established neighborhoods, local shops, and community feel.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "North Thornton", 
      desc: "Newer developments with shopping, restaurants, and easy highway access.",
      safety: "very-safe",
      walkable: false
    },
    { 
      name: "Eastlake", 
      desc: "Planned community with parks, trails, and family-friendly amenities.",
      safety: "very-safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "15 minutes to downtown", distance: "15 min" },
    { name: "Aurora", slug: "/aurora", desc: "Eastern metro cannabis", distance: "25 min" },
    { name: "Boulder", slug: "/boulder", desc: "Mountain town vibes", distance: "35 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Thornton Cannabis Travel Guide 2025 | Dispensaries & 420 Hotels | BudQuest</title>
        <meta name="description" content="Plan your Thornton, Colorado cannabis trip. Find dispensaries, 420-friendly hotels, and easy access to Denver. Perfect for budget-conscious cannabis travelers." />
        <meta name="keywords" content="Thornton cannabis, Thornton dispensaries, 420-friendly hotels Thornton, Thornton marijuana laws 2025, Denver suburbs cannabis, Thornton weed tourism" />
        <link rel="canonical" href="https://budquest.guide/thornton" />
        
        <meta property="og:title" content="Thornton Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Cannabis guide for Thornton, CO. Budget-friendly stays with easy Denver access." />
        <meta property="og:url" content="https://budquest.guide/thornton" />
        <meta property="og:type" content="article" />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Thornton" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
            <li className="text-foreground font-medium">Thornton</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <MapPin className="w-4 h-4 mr-2" />
                Denver's Northern Gateway
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Thornton Cannabis Travel Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Just 15 minutes from downtown Denver with quality dispensaries and affordable 420-friendly stays. The smart choice for budget-conscious cannabis travelers.
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
                { icon: Car, label: "To Denver", value: "15 min" },
                { icon: Clock, label: "To DIA", value: "25 min" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-card/50 rounded-lg border border-border/30"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Thornton Cannabis Laws 🌿
                </span>
              </h2>
              
              <Card className="bg-card/50 border-accent/30">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Recreational Legal
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Medical Legal
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-accent mb-3">✅ What's Allowed</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Adults 21+ can purchase & possess up to 1 oz
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Consume on private property with permission
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Purchase from licensed dispensaries
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-400 mb-3">❌ Not Allowed</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          Public consumption (parks, streets, bars)
                        </li>
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          Driving under the influence (5ng/mL THC limit)
                        </li>
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          Taking cannabis across state lines
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      📍 <span className="text-accent font-medium">Pro tip:</span> Thornton follows all Colorado state cannabis laws. Easy access to Denver means more dispensary options just a short drive away.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 Thornton Dispensaries
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quality cannabis shops in Denver's northern suburbs
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dispensaries.map((dispensary) => (
                  <Link key={dispensary.id} to={`/dispensary/${dispensary.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={dispensary.images?.[0] || dispensary.image || "/dest-2.jpg"}
                          alt={dispensary.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          {dispensary.is_recreational && (
                            <Badge className="bg-green-500/80 text-white text-xs">REC</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                          {dispensary.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {dispensary.rating && renderRating(dispensary.rating)}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Thornton, CO
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Dispensaries Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're adding Thornton dispensaries to our directory. Meanwhile, check nearby Denver!
                </p>
                <Button asChild variant="outline">
                  <Link to="/dispensary">Browse All Dispensaries</Link>
                </Button>
              </Card>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/dispensary">
                  View All Dispensaries <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 420 Rentals Section */}
        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🏨 420-Friendly Stays
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cannabis-welcoming accommodations in Thornton
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={rental.images?.[0] || "/dest-2.jpg"}
                          alt={rental.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-accent/80 text-accent-foreground text-xs">
                          420 Friendly
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                          {rental.name}
                        </h3>
                        {rental.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {renderRating(rental.rating)}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Thornton, CO
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rentals Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're adding 420-friendly stays in Thornton. Check Denver for more options!
                </p>
                <Button asChild variant="outline">
                  <Link to="/hotels">Browse All Rentals</Link>
                </Button>
              </Card>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/hotels">
                  View All Rentals <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🗓️ Best Time to Visit
              </span>
            </h2>

            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
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
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{season.name}</h3>
                          <p className="text-muted-foreground">{season.months}</p>
                        </div>
                        <Badge variant="outline">{season.temp}</Badge>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {season.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                        <p className="text-sm text-accent">💡 Pro Tip: {season.tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* What to Do */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🎯 Things to Do in Thornton
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-border/30 hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <attraction.icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold">{attraction.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
                      <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <p className="text-xs text-accent">🌿 {attraction.cannabisTip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Guides */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                📚 Essential Reading
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/colorado/consumption-guide">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <Home className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Consumption Guide</h3>
                    <p className="text-sm text-muted-foreground">How to consume safely in rentals</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/colorado/federal-land-warning">
                <Card className="h-full bg-card/50 border-red-500/30 hover:border-red-500/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors">Federal Land Warning</h3>
                    <p className="text-sm text-muted-foreground">Know before visiting National Parks</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/colorado/altitude-guide">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <Mountain className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Altitude Guide</h3>
                    <p className="text-sm text-muted-foreground">How elevation affects your high</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <Card className="bg-accent/5 border-accent/30">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Get Denver Metro Cannabis Tips</h2>
                <p className="text-muted-foreground mb-6">
                  Dispensary deals, new openings, and travel tips for the Denver area
                </p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50"
                    required
                  />
                  <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                    {submitting ? "..." : "Subscribe"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-12 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-semibold mb-6 text-center">Explore More Colorado</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.name} to={guide.slug}>
                  <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-accent">{guide.name}</h4>
                      <p className="text-xs text-muted-foreground">{guide.desc}</p>
                      <Badge variant="outline" className="mt-2 text-xs">{guide.distance}</Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ThorntonGuide;
