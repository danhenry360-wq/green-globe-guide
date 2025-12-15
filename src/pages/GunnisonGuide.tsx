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
  Music, Mountain, Waves, Fish,
  AlertTriangle, Ban, Mail, Download, 
  GraduationCap
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

const GunnisonGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Gunnison Dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Gunnison%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch Gunnison 420 Friendly Rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Gunnison%')
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
        .insert({ email, source_page: 'gunnison-guide' });
      
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
    "name": "Gunnison Colorado Cannabis Travel Guide 2025",
    "description": "The complete guide to cannabis in Gunnison, CO. Explore the Black Canyon, Blue Mesa Reservoir, and 420-friendly spots in this college town.",
    "url": "https://budquest.guide/usa/colorado/gunnison",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Gunnison",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gunnison",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cannabis legal in the Black Canyon of the Gunnison?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Black Canyon is a National Park (Federal Land). Possession and consumption are federal crimes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I consume on Blue Mesa Reservoir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Blue Mesa is part of the Curecanti National Recreation Area, which is managed by the National Park Service. Federal laws apply."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "75-85°F",
      highlights: [
        "Boating on Blue Mesa Reservoir",
        "Mountain Biking at Hartman Rocks",
        "Cattlemen's Days Rodeo",
        "Hiking the Black Canyon"
      ],
      tip: "Gunnison is high desert. The sun is intense. High-THC strains + dehydration = bad time. Drink water constantly."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Oct",
      icon: Leaf,
      temp: "45-70°F",
      highlights: [
        "Kokanee Salmon Run",
        "Cottonwoods turning Gold along the river",
        "Hunting Season (Wear Orange!)",
        "Quiet trails"
      ],
      tip: "Hunters flock here in October. If you're hiking and consuming in the woods, wear bright orange for safety."
    },
    {
      id: "winter",
      name: "Winter",
      months: "Nov - March",
      icon: Snowflake,
      temp: "-10-30°F",
      highlights: [
        "Ice Fishing on Blue Mesa",
        "Crested Butte Skiing (30 min drive)",
        "Nordic Skiing",
        "Cheaper lodging than the resort towns"
      ],
      tip: "Gunnison is one of the coldest cities in the USA. Vapes battery life dies instantly. Keep them in an inside pocket."
    },
    {
      id: "spring",
      name: "Spring",
      months: "April - May",
      icon: Flower2,
      temp: "30-60°F",
      highlights: [
        "Original Growler Bike Race",
        "Fishing the Gunnison River",
        "Graduation at Western Colorado Univ",
        "Whitewater runoff"
      ],
      tip: "Spring is windy and dusty. Edibles are often preferred over smoking outdoors during wind storms."
    }
  ];

  const attractions = [
    {
      name: "Black Canyon of the Gunnison",
      icon: Mountain,
      description: "A steep, dramatic canyon unlike any other. 2,000 ft drop to the river.",
      cannabisTip: "Federal Land. Do not bring cannabis into the park. Consume before you go; the views are mind-bending enough.",
      address: "Hwy 347"
    },
    {
      name: "Hartman Rocks",
      icon: Bike,
      description: "8,000 acres of BLM land featuring unique rock formations and trails.",
      cannabisTip: "BLM land is generally more lenient than National Parks for dispersed camping, but follow 'Leave No Trace' strictly.",
      address: "Gold Basin Rd"
    },
    {
      name: "Blue Mesa Reservoir",
      icon: Waves,
      description: "Colorado's largest body of water. Fishing, boating, and camping.",
      cannabisTip: "Curecanti NRA is federal jurisdiction. Be very careful. Consumption on a boat is a BUI (Boating Under Influence).",
      address: "Hwy 50 West"
    },
    {
      name: "Western Colorado University",
      icon: GraduationCap,
      description: "The heart of the town. Beautiful campus with a mountaineering vibe.",
      cannabisTip: "Campus is a drug-free zone (federal funding rules). Stick to off-campus housing or dispensaries.",
      address: "East Gunnison"
    },
    {
      name: "Gunnison River",
      icon: Fish,
      description: "Gold Medal trout waters running right through town.",
      cannabisTip: "Fishing while elevated is a Colorado tradition. Just watch your footing on the slippery river rocks.",
      address: "Various Access Points"
    },
    {
      name: "Pioneer Museum",
      icon: Building2,
      description: "Massive outdoor museum with historic trains, cars, and buildings.",
      cannabisTip: "Great place to wander around for an hour after a mild edible. The history of the West comes alive.",
      address: "So. Adams St"
    }
  ];

  const transportOptions = [
    {
      name: "RTA Bus",
      icon: Bus,
      description: "Free bus service connecting Gunnison to Crested Butte and Mt. CB.",
      tip: "The 'drunk bus' (or 'high bus') is the safest way to get to the ski area without driving."
    },
    {
      name: "Gunnison-Crested Butte Airport",
      icon: Plane,
      description: "GUC airport is right in town. Flights from Denver, Houston, Dallas.",
      tip: "Airport is federal property. Dispose of all cannabis before entering the terminal."
    },
    {
      name: "Biking",
      icon: Bike,
      description: "Town is flat and very bikeable. Hartman Rocks requires a mountain bike.",
      tip: "Watch for icy patches in winter. Fat biking is popular here."
    },
    {
      name: "Car",
      icon: Car,
      description: "Essential for Blue Mesa or Black Canyon trips.",
      tip: "Watch for deer and elk on Hwy 50. They are everywhere."
    }
  ];

  const neighborhoods = [
    { 
      name: "Downtown Gunnison", 
      desc: "Main Street. Shops, restaurants, and bars. Very walkable.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Western Campus", 
      desc: "Student area. Lively but subject to stricter campus rules.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Dos Rios", 
      desc: "Golf course community near the river. Quiet and residential.",
      safety: "safe",
      walkable: false
    },
    { 
      name: "Ohio City / Pitkin", 
      desc: "Remote mountain towns nearby. Very 420-friendly for privacy.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Crested Butte", slug: "/crested-butte", desc: "The ski town (30 min)", distance: "28 miles" },
    { name: "Montrose", slug: "/montrose", desc: "Shopping hub", distance: "1 hour" },
    { name: "Salida", slug: "/salida", desc: "Over Monarch Pass", distance: "1 hour" },
  ];

  return (
    <>
      <Helmet>
        <title>Gunnison Cannabis Travel Guide 2025 | BudQuest</title>
        <meta name="description" content="Visit Gunnison, CO. The gateway to the Black Canyon and Crested Butte. Affordable lodging, top dispensaries, and outdoor adventure." />
        <link rel="canonical" href="https://budquest.guide/usa/colorado/gunnison" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Gunnison</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-2.jpg" 
              alt="Gunnison Colorado" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-4 h-4 mr-2" />
                Basecamp of the West Elk
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Gunnison Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                The authentic Colorado mountain town. Home to Western Colorado University, the Black Canyon, and a chill local cannabis scene.
              </p>

              <div className="flex justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <a href="#dispensaries">Find Dispensaries</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Cannabis, label: "Age", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "4+" },
                { icon: Mountain, label: "Elevation", value: "7,703'" },
                { icon: Plane, label: "Airport", value: "GUC" },
              ].map((stat) => (
                <Card key={stat.label} className="bg-card/50 border-border/30 text-center p-4">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seasons */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">High Desert Seasons</h2>
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
                    <p className="text-sm bg-accent/10 p-3 rounded text-accent"><strong>Local Tip:</strong> {s.tip}</p>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Attractions */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Things to Do</h2>
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

        {/* Legal Warning */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
             <Card className="p-6 bg-red-900/10 border-red-900/30">
                <div className="flex items-start gap-4">
                   <AlertTriangle className="w-10 h-10 text-red-500 shrink-0" />
                   <div>
                      <h3 className="text-xl font-bold text-red-500 mb-2">Federal Land Warning</h3>
                      <p className="text-muted-foreground">
                        Gunnison is surrounded by the <strong>Black Canyon National Park</strong> and <strong>Curecanti National Recreation Area (Blue Mesa)</strong>. 
                        These are FEDERAL lands. Possession of cannabis is a federal crime here, punishable by fines or jail time. 
                        Keep your stash in town or on private property.
                      </p>
                   </div>
                </div>
             </Card>
          </div>
        </section>

        {/* Dispensaries */}
        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Gunnison Dispensaries</h2>
            {loading ? <div className="text-center">Loading...</div> : (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.length > 0 ? dispensaries.map((d) => (
                  <Link key={d.id} to={`/dispensary/${d.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all">
                      <div className="aspect-video relative">
                        <img src={d.image || "/dest-colorado-ski.jpg"} alt={d.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{d.name}</h3>
                        <div className="flex gap-1 text-sm text-muted-foreground"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating}</div>
                      </div>
                    </Card>
                  </Link>
                )) : <p className="col-span-3 text-center text-muted-foreground">No dispensaries found in database for Gunnison.</p>}
              </div>
            )}
          </div>
        </section>

        {/* Email */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Get the Gunnison Guide</h2>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 justify-center">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="max-w-xs" />
              <Button type="submit" disabled={submitting}>Subscribe</Button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default GunnisonGuide;
