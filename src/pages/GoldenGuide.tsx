import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  AlertTriangle, Ban, Mail, Download, 
  Compass
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

const GoldenGuide = () => {
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
        .ilike('city', '%Golden%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Golden%')
        .order('rating', { ascending: false })
        .limit(3);
      
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
        .insert({ email, source_page: 'golden-guide' });
      
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
    "name": "Golden Colorado Cannabis Travel Guide 2025",
    "description": "The ultimate guide to visiting Golden, Colorado for cannabis lovers. Features Red Rocks proximity, Clear Creek tubing, and 420-friendly stays.",
    "url": "https://budquest.guide/golden",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Golden",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Golden",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    }
  };

  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "45-65°F",
      highlights: [
        "First Red Rocks shows of the season",
        "Hiking North Table Mountain while green",
        "Clear Creek starts flowing (too cold to tube)",
        "Less crowds at Coors Brewery"
      ],
      tip: "Spring weather is volatile. A sunny hike can turn into a snowstorm. Dress in layers."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "75-90°F",
      highlights: [
        "Tubing Clear Creek (do NOT mix with heavy edibles)",
        "Peak Red Rocks concert season",
        "Golden Farmers Market",
        "Buffalo Bill Days festival"
      ],
      tip: "The creek water is fast. If you're consuming, stick to the shore. Safety first."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "50-70°F",
      highlights: [
        "Golden Fine Arts Festival",
        "Stunning cottonwood colors along the creek",
        "Perfect climbing weather in Clear Creek Canyon",
        "Cozy brewery patios"
      ],
      tip: "The best time for hiking. The trails are dry and the heat is gone. Perfect for a sativa-fueled trek."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "25-45°F",
      highlights: [
        "Candlelight Walk (December)",
        "Close proximity to Loveland Ski Area",
        "Cozy museums and western history",
        "UllrGrass Music & Beer Festival"
      ],
      tip: "Golden stays warmer than the high mountains, but ice is common on trails. Bring spikes."
    }
  ];

  const attractions = [
    {
      name: "Red Rocks Amphitheatre",
      icon: Music,
      description: "Just 10 minutes away. The world's greatest outdoor venue.",
      cannabisTip: "Golden is the best place to stay for Red Rocks shows. Remember: Federal land = strict rules.",
      address: "Morrison (Bordering Golden)"
    },
    {
      name: "Clear Creek Trail",
      icon: TreePine,
      description: "Scenic paved trail running right through downtown.",
      cannabisTip: "A vape pen and a walk along the creek is the quintessential Golden experience. Respect families nearby.",
      address: "Downtown Golden"
    },
    {
      name: "Coors Brewery",
      icon: Beer,
      description: "The world's largest single-site brewery. Free tours available.",
      cannabisTip: "The 'Hops & Crops' tour. Experience the contrast between the old guard (beer) and the new guard (weed).",
      address: "13th & Ford"
    },
    {
      name: "Lookout Mountain",
      icon: Mountain,
      description: "Famous drive with sweeping views of Denver and the plains.",
      cannabisTip: "The sunset views here are mind-bending. Great spot for photography, bad spot for driving high.",
      address: "Lookout Mountain Rd"
    },
    {
      name: "Colorado School of Mines Geology Museum",
      icon: Camera,
      description: "Incredible collection of rocks, gems, and meteorites.",
      cannabisTip: "Staring at fluorescent glowing rocks while elevated? Yes, please. Highly recommended.",
      address: "1310 Maple St"
    },
    {
      name: "North Table Mountain",
      icon: MapPinned,
      description: "The iconic mesa overlooking the town. Steep hike, great rewards.",
      cannabisTip: "Bring water. Cottonmouth on a steep incline is no joke. The top is flat and perfect for meditation.",
      address: "N Table Mountain Park"
    }
  ];

  const transportOptions = [
    {
      name: "W Line (Light Rail)",
      icon: Bus,
      description: "Connects Golden (JeffCo Govt Center) directly to Union Station Denver.",
      tip: "The cheapest and safest way to get to Denver dispensaries without driving."
    },
    {
      name: "FlexRide",
      icon: Car,
      description: "Local on-demand bus service serving the Golden area.",
      tip: "Good for getting from the Light Rail station to downtown Golden."
    },
    {
      name: "Biking",
      icon: Bike,
      description: "Golden is incredibly bike-friendly with trails connecting to Denver.",
      tip: "The ride from Denver to Golden on the Clear Creek trail is legendary."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown Golden is compact and very walkable.",
      tip: "Park once in the parking garages (often free) and walk everywhere."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Golden CO Cannabis Travel Guide 2025 | BudQuest</title>
        <meta name="description" content="Visit Golden, Colorado. The gateway to the Rockies and the best basecamp for Red Rocks. Find dispensaries, hotels, and travel tips." />
        <link rel="canonical" href="https://budquest.guide/golden" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Golden</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado-ski.jpg" alt="Golden Colorado Table Mountain" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-4 h-4 mr-2" /> Gateway to the Rockies
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Golden Cannabis Guide
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where the West lives. Home to Coors, the School of Mines, and the perfect 420-friendly basecamp for Red Rocks concerts.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90"><a href="#dispensaries">Find Dispensaries</a></Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Music, label: "Red Rocks", value: "10 Min" },
              { icon: Store, label: "Dispensaries", value: "5+" },
              { icon: Beer, label: "Breweries", value: "10+" },
              { icon: Plane, label: "From DIA", value: "45 Min" },
            ].map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/30 text-center p-4">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Seasons */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
             <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Best Time to Visit</h2>
            </div>
            <Tabs defaultValue="summer" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50">
                {seasons.map((s) => (
                  <TabsTrigger key={s.id} value={s.id}>{s.name}</TabsTrigger>
                ))}
              </TabsList>
              {seasons.map((s) => (
                <TabsContent key={s.id} value={s.id}>
                  <Card className="p-6 bg-card/50 border-border/30">
                    <div className="flex items-center gap-4 mb-4">
                      <s.icon className="w-8 h-8 text-accent" />
                      <div><h3 className="text-xl font-bold">{s.name}</h3><p className="text-muted-foreground">{s.months}</p></div>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2 mb-4">
                      {s.highlights.map((h, i) => <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> {h}</li>)}
                    </ul>
                    <p className="text-sm bg-accent/10 p-3 rounded text-accent"><strong>Tip:</strong> {s.tip}</p>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Attractions */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Golden Highlights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {attractions.map((a) => (
                <Card key={a.name} className="p-6 bg-card/50 border-border/30 hover:border-accent/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded bg-accent/10"><a.icon className="w-6 h-6 text-accent" /></div>
                    <h3 className="font-bold">{a.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{a.description}</p>
                  <div className="p-3 bg-background rounded border border-border/30">
                    <p className="text-xs text-accent font-bold mb-1">Stoner Strategy:</p>
                    <p className="text-xs text-muted-foreground">{a.cannabisTip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dispensaries */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Golden Dispensaries</h2>
            {loading ? <div className="text-center">Loading...</div> : (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.length > 0 ? dispensaries.map((d) => (
                  <Link key={d.id} to={`/dispensary/${d.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all">
                      <div className="aspect-video relative">
                        <img src={d.image || "/dispensaries/native-roots-denver.png"} alt={d.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{d.name}</h3>
                        <div className="flex gap-1 text-sm text-muted-foreground"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating}</div>
                      </div>
                    </Card>
                  </Link>
                )) : <p className="col-span-3 text-center text-muted-foreground">No dispensaries found in database for Golden.</p>}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Get the Golden Guide</h2>
            <p className="text-muted-foreground mb-8">Download our free map of 420-friendly spots near Red Rocks.</p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 justify-center">
              <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="max-w-xs" />
              <Button type="submit" disabled={submitting} className="bg-accent">{submitting ? "Sending..." : "Download"}</Button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default GoldenGuide;
