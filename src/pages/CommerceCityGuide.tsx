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
  Cannabis, Shield, 
  ArrowRight, Bed, Store, ChevronRight,
  Building2, Clock, Car,
  Snowflake, Sun, Leaf, Flower2,
  TreePine, Mountain, ShoppingBag,
  AlertTriangle, Ban, Mail, Warehouse
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

const CommerceCityGuide = () => {
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
        .ilike('city', '%Commerce City%')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Commerce City%')
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
        .insert({ email, source_page: 'commerce-city-guide' });
      
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
    "name": "Commerce City Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis in Commerce City, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and travel tips near Denver International Airport.",
    "url": "https://budquest.guide/commerce-city",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Commerce City",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Commerce City",
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
        "Pleasant weather for outdoor activities",
        "Spring dispensary promotions",
        "Easy DIA access for arrivals",
        "Lower hotel rates than summer"
      ],
      tip: "Great time to visit with mild weather and fewer crowds."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "70-90°F",
      highlights: [
        "Dick's Sporting Goods Park events",
        "Outdoor recreation at parks",
        "Quick access to downtown Denver",
        "Extended daylight hours"
      ],
      tip: "Stay near DIA for convenience and savings on Denver lodging."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: [
        "Beautiful Colorado autumn",
        "Harvest dispensary deals",
        "Soccer season at DSGP",
        "Less crowded attractions"
      ],
      tip: "September offers the best weather for outdoor activities."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Easy airport hotel access",
        "Indoor cannabis activities",
        "Quick ski trip access via I-70",
        "Winter dispensary specials"
      ],
      tip: "Perfect for airport layovers or budget Denver metro stays."
    }
  ];

  const attractions = [
    {
      name: "Dick's Sporting Goods Park",
      icon: Building2,
      description: "Home of the Colorado Rapids MLS team with concerts and events.",
      cannabisTip: "Consume beforehand at your rental. No cannabis allowed inside the stadium.",
      address: "6000 Victory Way"
    },
    {
      name: "Rocky Mountain Arsenal Wildlife Refuge",
      icon: TreePine,
      description: "15,000-acre urban wildlife refuge with bison, deer, and eagles.",
      cannabisTip: "FEDERAL LAND - Do NOT bring cannabis. Enjoy nature sober or consume before entering.",
      address: "6550 Gateway Rd"
    },
    {
      name: "Prairie Gateway Open Space",
      icon: Mountain,
      description: "Trails and natural areas perfect for hiking and biking.",
      cannabisTip: "Consume at your rental first, then enjoy the trails. No public consumption.",
      address: "E 104th Ave"
    },
    {
      name: "The Outlets at Sparks",
      icon: ShoppingBag,
      description: "Outlet shopping center with major brands and dining options.",
      cannabisTip: "Great for munchies runs and retail therapy after your session.",
      address: "14697 Delaware St"
    }
  ];

  const neighborhoods = [
    { 
      name: "Near DIA", 
      desc: "Hotels and services close to Denver International Airport. Perfect for travelers.",
      safety: "safe",
      walkable: false
    },
    { 
      name: "Central Commerce City", 
      desc: "Main commercial area with shops, restaurants, and local amenities.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Reunion", 
      desc: "Newer master-planned community with parks and family amenities.",
      safety: "very-safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "Downtown Denver", distance: "20 min" },
    { name: "Aurora", slug: "/aurora", desc: "Eastern metro", distance: "15 min" },
    { name: "Northglenn", slug: "/northglenn", desc: "Northern suburb", distance: "10 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Commerce City Cannabis Travel Guide 2025 | Dispensaries & 420 Hotels | BudQuest</title>
        <meta name="description" content="Plan your Commerce City, Colorado cannabis trip. Find dispensaries near DIA, 420-friendly hotels, and easy Denver access. Perfect for airport travelers." />
        <meta name="keywords" content="Commerce City cannabis, Commerce City dispensaries, 420-friendly hotels DIA, Commerce City marijuana laws 2025, Denver airport cannabis, Commerce City weed" />
        <link rel="canonical" href="https://budquest.guide/commerce-city" />
        
        <meta property="og:title" content="Commerce City Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Cannabis guide for Commerce City, CO near Denver International Airport." />
        <meta property="og:url" content="https://budquest.guide/commerce-city" />
        <meta property="og:type" content="article" />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Commerce City" />
        
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
            <li className="text-foreground font-medium">Commerce City</li>
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
                Near Denver International Airport
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Commerce City Cannabis Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Minutes from DIA with quality dispensaries and affordable stays. The perfect stopover for cannabis travelers arriving in Colorado.
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
                { icon: Store, label: "Dispensaries", value: "3+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Car, label: "To Denver", value: "20 min" },
                { icon: Clock, label: "To DIA", value: "10 min" },
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
                  Commerce City Cannabis Laws 🌿
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
                          Cannabis on federal land (Wildlife Refuge!)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 inline mr-2 text-red-400" />
                      <span className="text-red-400 font-medium">Warning:</span> Rocky Mountain Arsenal is FEDERAL LAND. Do NOT bring cannabis there - federal penalties apply!
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
                  Commerce City Dispensaries 🏪
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quality cannabis shops near Denver International Airport with convenient access.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dispensaries.map((dispensary, index) => (
                  <motion.div
                    key={dispensary.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/dispensary/${dispensary.slug}`}>
                      <Card className="h-full overflow-hidden hover:border-accent/50 transition-all group">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={dispensary.images?.[0] || dispensary.image || "/placeholder.svg"}
                            alt={dispensary.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                          <div className="absolute top-2 left-2 flex gap-2">
                            {dispensary.is_recreational && (
                              <Badge className="bg-green-500/90 text-white text-xs">REC</Badge>
                            )}
                            {dispensary.is_medical && (
                              <Badge className="bg-blue-500/90 text-white text-xs">MED</Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors line-clamp-1">
                            {dispensary.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {dispensary.address}
                          </p>
                          {dispensary.rating && (
                            <div className="flex items-center gap-1">
                              {renderRating(dispensary.rating)}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({dispensary.rating})
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-accent/30 max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <Warehouse className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-semibold mb-2">Dispensaries Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're adding Commerce City dispensaries to our directory. Check nearby Denver or Aurora for options.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/denver">Denver Dispensaries</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/aurora">Aurora Dispensaries</Link>
                    </Button>
                  </div>
                </CardContent>
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

        {/* Best Time to Visit */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Best Time to Visit 📅
              </span>
            </h2>

            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-8">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="text-xs sm:text-sm">
                    <season.icon className="w-4 h-4 mr-1 hidden sm:inline" />
                    {season.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <Card className="bg-card/50 border-accent/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <season.icon className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{season.name}</h3>
                          <p className="text-muted-foreground">{season.months} • {season.temp}</p>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {season.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <p className="text-sm"><span className="text-accent font-medium">Pro tip:</span> {season.tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Things to Do */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Things to Do in Commerce City 🎯
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg shrink-0">
                          <attraction.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{attraction.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{attraction.description}</p>
                          <p className="text-xs text-accent">🌿 {attraction.cannabisTip}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Get the Commerce City Cannabis Guide 📬
              </span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Exclusive tips, dispensary deals, and local recommendations delivered to your inbox.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90">
                <Mail className="w-4 h-4 mr-2" />
                {submitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Nearby City Guides 🗺️
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedGuides.map((guide) => (
                <Link key={guide.name} to={guide.slug}>
                  <Card className="hover:border-accent/50 transition-all group">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold group-hover:text-accent transition-colors">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground">{guide.desc}</p>
                      <Badge variant="outline" className="mt-2">{guide.distance}</Badge>
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

export default CommerceCityGuide;
