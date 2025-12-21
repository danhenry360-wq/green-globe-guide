import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Calendar, Clock, Info, AlertTriangle, CheckCircle2,
  XCircle, Car, Bike, Mountain, Building, Leaf, ChevronRight,
  Mail, Sun, Snowflake, CloudRain, Trees, Star, ExternalLink,
  Bed, Compass
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ColoradoSpringsGuide = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispensaries, setDispensaries] = useState<any[]>([]);
  const [rentals, setRentals] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Colorado Springs dispensaries only
    const fetchDispensaries = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .or('city.ilike.%Colorado Springs%,city.eq.Colorado Springs')
        .order('rating', { ascending: false });
      if (data) setDispensaries(data);
    };

    // Fetch Colorado Springs and Manitou Springs rentals only
    const fetchRentals = async () => {
      const { data } = await supabase
        .from('hotels')
        .select('*')
        .or('address.ilike.%Colorado Springs%,address.ilike.%Manitou%')
        .order('rating', { ascending: false });
      if (data) setRentals(data);
    };

    fetchDispensaries();
    fetchRentals();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, source_page: 'colorado-springs-guide' });

      if (error) {
        if (error.code === '23505') {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome to BudQuest! Check your email for the guide.");
        setEmail("");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickFacts = [
    { icon: Mountain, label: "Elevation", value: "6,035 ft" },
    { icon: Calendar, label: "Best Time", value: "May - October" },
    { icon: Clock, label: "Airport Distance", value: "15 min (COS)" },
    { icon: Leaf, label: "Legal Status", value: "Recreational" },
    { icon: Building, label: "Dispensaries", value: "40+" },
  ];

  const attractions = [
    {
      name: "Garden of the Gods",
      description: "Stunning red rock formations with hiking trails and panoramic views of Pikes Peak.",
      tip: "Best enjoyed early morning - bring snacks (edibles work great) and stay for sunrise."
    },
    {
      name: "Pikes Peak",
      description: "America's Mountain at 14,115 feet with driving, hiking, and cog railway options.",
      tip: "The summit drive is unforgettable - consume responsibly before (not during) the journey."
    },
    {
      name: "Manitou Springs",
      description: "Charming historic town with natural mineral springs, art galleries, and eclectic shops.",
      tip: "Home to 420-friendly lodging options - perfect base for exploring the area."
    },
    {
      name: "Cheyenne Mountain Zoo",
      description: "America's only mountain zoo with giraffe feeding and stunning mountain backdrop.",
      tip: "Great daytime activity - save consumption for after your visit."
    },
    {
      name: "Old Colorado City",
      description: "Historic district with local boutiques, art galleries, and craft breweries.",
      tip: "Several dispensaries nearby - explore and enjoy the relaxed atmosphere."
    },
    {
      name: "Royal Gorge Bridge",
      description: "America's highest suspension bridge spanning 1,200 feet above the Arkansas River.",
      tip: "30-minute drive from Colorado Springs - incredible views best enjoyed clear-headed."
    },
  ];

  const seasons = {
    spring: {
      weather: "50-65°F, occasional snow",
      events: "Garden of the Gods opens for hiking season",
      why: "Fewer crowds, wildflowers blooming",
      availability: "All dispensaries open, peak selection"
    },
    summer: {
      weather: "75-85°F, afternoon thunderstorms",
      events: "Pikes Peak International Hill Climb, festivals",
      why: "Perfect hiking weather, all attractions open",
      availability: "Extended hours at many shops"
    },
    fall: {
      weather: "55-70°F, golden aspens",
      events: "Fall foliage drives, harvest festivals",
      why: "Stunning colors, comfortable temps, less crowded",
      availability: "Great deals, harvest season products"
    },
    winter: {
      weather: "35-50°F, occasional snow",
      events: "Holiday lights, skiing nearby",
      why: "Sunny 300 days/year, budget-friendly",
      availability: "Cozy indoor consumption, winter strains"
    },
  };

  return (
    <>
      <Helmet>
        <title>Colorado Springs 420 Guide 2025 | Best Weed Friendly Hotels & Stays | BudQuest</title>
        <meta name="description" content="Ultimate Colorado Springs 420 Guide for 2025. Find the best weed-friendly hotels, 420 airbnbs near Pikes Peak, and local consumption laws. Plan your high-altitude trip." />
        <meta name="keywords" content="420 friendly hotels colorado springs, weed friendly airbnb springs, colorado springs 420 guide, marijuana laws colorado springs, BudQuest" />
        <link rel="canonical" href="https://budquest.guide/colorado-springs" />
        <meta property="og:title" content="Colorado Springs Cannabis Travel Guide 2025" />
        <meta property="og:description" content="Your complete guide to cannabis travel in Colorado Springs - dispensaries, hotels, and attractions." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": "Colorado Springs Cannabis Travel Guide",
            "description": "Complete guide to cannabis travel in Colorado Springs, Colorado",
            "about": {
              "@type": "City",
              "name": "Colorado Springs",
              "containedInPlace": { "@type": "State", "name": "Colorado" }
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('/dest-colorado.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pt-8">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/colorado" className="hover:text-accent transition-colors">Colorado</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent">Colorado Springs</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Colorado Springs
                </span>
                <br />
                <span className="text-foreground/90">Cannabis Travel Guide 2025</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Gateway to Pikes Peak with world-class natural attractions, legal recreational cannabis, and stunning mountain scenery.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/hotels?search=Colorado Springs"><Bed className="w-5 h-5 mr-2" />Find 420 Hotels</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <Link to="/tours?city=Colorado Springs"><Compass className="w-5 h-5 mr-2" />Book Springs Tours</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-green-500/10 to-accent/5 border border-green-500/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Recreational Cannabis Legal</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Colorado Springs has full recreational cannabis legalization for adults 21+. Purchase up to 1 oz per transaction at licensed dispensaries. Note: El Paso County has fewer retail options than Denver, but quality shops are available.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">21+ Legal</span>
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">1 oz Limit</span>
                <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">Cash Preferred</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rentals */}
        {rentals.length > 0 && (
          <section className="py-12 border-t border-accent/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">420-Friendly Stays</h2>
                  <p className="text-muted-foreground">Cannabis-welcoming accommodations near Pikes Peak</p>
                </div>
                <Link to="/hotels?search=Colorado Springs" className="text-accent hover:underline text-sm">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="bg-card/60 border-accent/20 hover:border-accent/40 transition-all overflow-hidden group">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={rental.images?.[0] || '/dest-colorado.jpg'}
                          alt={rental.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{rental.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {rental.address?.split(',')[0]}
                        </p>
                        {rental.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-gold text-gold" />
                            <span className="text-sm text-foreground">{rental.rating}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Dispensaries */}
        {dispensaries.length > 0 && (
          <section className="py-12 border-t border-accent/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Top Dispensaries</h2>
                  <p className="text-muted-foreground">Licensed cannabis shops in Colorado Springs area</p>
                </div>
                <Link to="/dispensary" className="text-accent hover:underline text-sm">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dispensaries.map((disp) => (
                  <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                    <Card className="bg-card/60 border-accent/20 hover:border-accent/40 transition-all p-4 group">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{disp.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {disp.city}
                      </p>
                      {disp.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          <span className="text-sm text-foreground">{disp.rating}</span>
                        </div>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Best Time to Visit */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Time to Visit</h2>

            <Tabs defaultValue="summer" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-card/60">
                <TabsTrigger value="spring" className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4" />
                  <span className="hidden sm:inline">Spring</span>
                </TabsTrigger>
                <TabsTrigger value="summer" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">Summer</span>
                </TabsTrigger>
                <TabsTrigger value="fall" className="flex items-center gap-2">
                  <Trees className="h-4 w-4" />
                  <span className="hidden sm:inline">Fall</span>
                </TabsTrigger>
                <TabsTrigger value="winter" className="flex items-center gap-2">
                  <Snowflake className="h-4 w-4" />
                  <span className="hidden sm:inline">Winter</span>
                </TabsTrigger>
              </TabsList>

              {Object.entries(seasons).map(([season, data]) => (
                <TabsContent key={season} value={season}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-card/60 border-accent/20 p-4">
                      <h4 className="text-sm font-semibold text-accent mb-2">Weather</h4>
                      <p className="text-foreground">{data.weather}</p>
                    </Card>
                    <Card className="bg-card/60 border-accent/20 p-4">
                      <h4 className="text-sm font-semibold text-accent mb-2">Events</h4>
                      <p className="text-foreground">{data.events}</p>
                    </Card>
                    <Card className="bg-card/60 border-accent/20 p-4">
                      <h4 className="text-sm font-semibold text-accent mb-2">Why Visit</h4>
                      <p className="text-foreground">{data.why}</p>
                    </Card>
                    <Card className="bg-card/60 border-accent/20 p-4">
                      <h4 className="text-sm font-semibold text-accent mb-2">Cannabis</h4>
                      <p className="text-foreground">{data.availability}</p>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* What to Do */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">What to Do in Colorado Springs</h2>
            <p className="text-muted-foreground mb-8">Top attractions for cannabis travelers</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/60 border-accent/20 p-6 h-full">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{attraction.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{attraction.description}</p>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                      <p className="text-xs text-accent font-medium mb-1">Cannabis Tip</p>
                      <p className="text-xs text-muted-foreground">{attraction.tip}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consumption Rules */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Consumption Rules</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-500/5 border-green-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400">Where You CAN Consume</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Private residences (with owner permission)",
                    "420-friendly hotels and rentals",
                    "Private outdoor spaces",
                    "Licensed consumption lounges",
                    "Some private event venues"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-red-500/5 border-red-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-red-400">Where You CANNOT Consume</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Public parks and trails (Garden of the Gods)",
                    "Federal lands (including national forests)",
                    "Vehicles (even as passenger)",
                    "Most hotel rooms and balconies",
                    "Downtown public areas",
                    "Near schools or playgrounds"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="bg-amber-500/5 border-amber-500/20 p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-400 mb-1">Important Note</p>
                  <p className="text-sm text-muted-foreground">
                    El Paso County (Colorado Springs) has more conservative cannabis policies than Denver. Public consumption fines can reach $100-$999. Always consume in private, legal spaces.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Getting Around */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Getting Around Colorado Springs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card/60 border-accent/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Car className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Transportation</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• <strong>Rental Car:</strong> Best option - attractions are spread out</li>
                  <li>• <strong>Uber/Lyft:</strong> Available but limited compared to Denver</li>
                  <li>• <strong>Mountain Metro:</strong> Local bus system</li>
                  <li>• <strong>Airport:</strong> COS is 15 min from downtown</li>
                </ul>
              </Card>

              <Card className="bg-card/60 border-accent/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Neighborhoods</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• <strong>Manitou Springs:</strong> Most 420-friendly area, artsy vibe</li>
                  <li>• <strong>Old Colorado City:</strong> Historic district, dispensaries nearby</li>
                  <li>• <strong>Downtown:</strong> Hotels and dining, conservative</li>
                  <li>• <strong>Garden of the Gods:</strong> Scenic but no consumption</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-accent">Free Guide</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Get the Colorado Springs Cannabis Guide
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with insider tips, dispensary map, and Pikes Peak region guide
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card/60 border-accent/20 focus:border-accent"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap"
                >
                  {isSubmitting ? "Sending..." : "Get Free Guide"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Free • No spam • Unsubscribe anytime
              </p>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Explore More Colorado</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Denver", path: "/denver", desc: "Capital city" },
                { name: "Boulder", path: "/boulder", desc: "College town" },
                { name: "Aspen", path: "/aspen", desc: "Mountain resort" },
                { name: "Colorado Hub", path: "/colorado", desc: "Full state guide" },
              ].map((guide) => (
                <Link key={guide.path} to={guide.path}>
                  <Card className="bg-card/60 border-accent/20 hover:border-accent/40 transition-all p-4 text-center group">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{guide.name}</h3>
                    <p className="text-xs text-muted-foreground">{guide.desc}</p>
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

export default ColoradoSpringsGuide;
