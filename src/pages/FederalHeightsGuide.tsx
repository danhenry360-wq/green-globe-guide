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
  TreePine, ShoppingBag,
  Ban, Mail, Warehouse
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

const FederalHeightsGuide = () => {
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
        .ilike('city', '%Federal Heights%')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Federal Heights%')
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
        .insert({ email, source_page: 'federal-heights-guide' });
      
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
    "name": "Federal Heights Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis in Federal Heights, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and travel tips for Denver's northern neighbor.",
    "url": "https://budquest.guide/federal-heights",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Federal Heights",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Federal Heights",
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
        "Pleasant weather for exploring",
        "Spring dispensary deals",
        "Easy Denver access",
        "Budget-friendly rates"
      ],
      tip: "Perfect time for a budget-conscious cannabis trip to the Denver area."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "70-90°F",
      highlights: [
        "Water World fun",
        "Outdoor dining options",
        "Quick downtown access",
        "Extended daylight"
      ],
      tip: "Stay in Federal Heights for affordable lodging while enjoying Denver attractions."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: [
        "Beautiful fall weather",
        "Harvest dispensary sales",
        "Less crowded",
        "Great hiking nearby"
      ],
      tip: "October offers excellent weather and dispensary promotions."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Indoor activities",
        "Cozy dispensary visits",
        "Easy ski trip access",
        "Winter specials"
      ],
      tip: "Great affordable base for ski trips with quick I-25 access."
    }
  ];

  const attractions = [
    {
      name: "Water World",
      icon: Building2,
      description: "One of America's largest water parks with 50+ attractions.",
      cannabisTip: "Consume beforehand at your rental. No cannabis at the park. Great munchie stands inside!",
      address: "8801 N Pecos St"
    },
    {
      name: "Hyland Hills Golf Course",
      icon: TreePine,
      description: "Public golf course with beautiful mountain views.",
      cannabisTip: "Skip the pre-round session - focus is key for golf. Save it for the 19th hole.",
      address: "9650 Sheridan Blvd"
    },
    {
      name: "Westminster City Park",
      icon: TreePine,
      description: "Nearby park with trails, playgrounds, and open spaces.",
      cannabisTip: "Consume at your rental first, then enjoy a relaxing walk. No public consumption.",
      address: "Westminster (nearby)"
    },
    {
      name: "Shops at Northfield Stapleton",
      icon: ShoppingBag,
      description: "Outdoor shopping center with restaurants, entertainment, and retail.",
      cannabisTip: "Great for munchies and shopping. Movie theater perfect for post-session entertainment.",
      address: "8340 Northfield Blvd (nearby)"
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "Downtown Denver", distance: "15 min" },
    { name: "Westminster", slug: "/westminster", desc: "Western neighbor", distance: "5 min" },
    { name: "Thornton", slug: "/thornton", desc: "Northern suburb", distance: "10 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Federal Heights Cannabis Travel Guide 2025 | Dispensaries & 420 Hotels | BudQuest</title>
        <meta name="description" content="Plan your Federal Heights, Colorado cannabis trip. Find dispensaries, 420-friendly hotels, and easy Denver access. Home to LivWell and Water World." />
        <meta name="keywords" content="Federal Heights cannabis, Federal Heights dispensaries, 420-friendly hotels Federal Heights, Federal Heights marijuana laws 2025, LivWell Federal Heights, Water World cannabis" />
        <link rel="canonical" href="https://budquest.guide/federal-heights" />
        
        <meta property="og:title" content="Federal Heights Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Cannabis guide for Federal Heights, CO. Home to LivWell dispensary and Water World." />
        <meta property="og:url" content="https://budquest.guide/federal-heights" />
        <meta property="og:type" content="article" />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Federal Heights" />
        
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
            <li className="text-foreground font-medium">Federal Heights</li>
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
                  Federal Heights Cannabis Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Home to LivWell dispensary and Water World. Affordable Denver metro cannabis destination with easy highway access.
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
                { icon: Store, label: "Dispensaries", value: "2+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Car, label: "To Denver", value: "15 min" },
                { icon: Clock, label: "To DIA", value: "30 min" },
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
                  Federal Heights Cannabis Laws 🌿
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
                          Public consumption (parks, streets, Water World)
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
                      📍 <span className="text-accent font-medium">Pro tip:</span> Federal Heights follows Colorado state cannabis laws. The city is known for LivWell, one of the state's most well-known dispensary chains.
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
                  Federal Heights Dispensaries 🏪
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quality dispensaries including LivWell's flagship Federal Heights location.
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
                  <h3 className="text-xl font-semibold mb-2">Check Our Featured Dispensary</h3>
                  <p className="text-muted-foreground mb-4">
                    LivWell Federal Heights is a top destination. Check nearby Denver for more options.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/dispensary/livwell-dispensary-federal-heights">LivWell Federal Heights</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/denver">Denver Dispensaries</Link>
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

            <Tabs defaultValue="summer" className="w-full">
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
                Things to Do in Federal Heights 🎯
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
                Get the Federal Heights Cannabis Guide 📬
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

export default FederalHeightsGuide;
