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
  Music, Mountain, Waves, Anchor,
  AlertTriangle, Ban, Mail, Download,
  Coffee
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

const FriscoGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Frisco is near Silverthorne/Breck. We search for Frisco specific first.
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .or('city.ilike.%Frisco%,city.ilike.%Silverthorne%')
        .order('rating', { ascending: false })
        .limit(3);

      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Frisco%')
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
    toast.success("Frisco guide sent!");
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
    "name": "Frisco Colorado Cannabis Travel Guide 2025",
    "description": "The Main Street of the Rockies. Your cannabis guide to Frisco, CO - the central hub for Breckenridge, Copper Mountain, and Keystone.",
    "url": "https://budquest.guide/frisco",
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "about": { "@type": "City", "name": "Frisco", "address": { "@type": "PostalAddress", "addressLocality": "Frisco", "addressRegion": "CO", "addressCountry": "US" } }
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "Nov - April",
      icon: Snowflake,
      temp: "10-35°F",
      highlights: ["Central access to 4 ski resorts", "Frisco Adventure Park (Tubing)", "Main Street Lights", "Nordic Center"],
      tip: "Frisco is the perfect basecamp. It's cheaper than Breck/Vail and only 15 mins away from everything."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "60-75°F",
      highlights: ["Lake Dillon Marina", "Concerts in the Park", "Hiking Mt. Royal", "Biking the Rec Path"],
      tip: "Renting a pontoon boat on Lake Dillon? Designate a sober captain. Lake patrol does check for BUI."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Oct",
      icon: Leaf,
      temp: "40-60°F",
      highlights: ["Fall Fest", "Aspen colors on Vail Pass", "Empty trails", "Dispensary deals"],
      tip: "The colors here pop earlier than Denver due to elevation (9,000ft). Late September is prime."
    },
    {
      id: "spring",
      name: "Spring",
      months: "April - May",
      icon: Flower2,
      temp: "30-50°F",
      highlights: ["Spring Skiing (A-Basin stays open late)", "Cycling the path", "Mud Season sales"],
      tip: "A quieter time to visit. Many restaurants close for a few weeks in May, so check ahead."
    }
  ];

  const attractions = [
    {
      name: "Frisco Bay Marina",
      icon: Anchor,
      description: "Rent kayaks, canoes, or pontoon boats on Lake Dillon.",
      cannabisTip: "Being on the water with a view of the Ten Mile Range is spiritual. Just don't operate the boat.",
      address: "Highway 9"
    },
    {
      name: "Historic Main Street",
      icon: Store,
      description: "Charming walkable downtown with shops, bars, and history.",
      cannabisTip: "Great for munchies. From bagels to BBQ, Main Street has it all. Very pedestrian friendly.",
      address: "Main St"
    },
    {
      name: "Frisco Adventure Park",
      icon: Mountain,
      description: "Tubing hill in winter, bike park in summer.",
      cannabisTip: "Snow tubing while giggly? highly recommended. It's safe, fun, and requires zero athletic ability.",
      address: "Recreation Way"
    },
    {
      name: "The Rec Path",
      icon: Bike,
      description: "Paved trail system connecting Frisco to Breck, Keystone, and Copper.",
      cannabisTip: "Rent an e-bike. The path to Copper Mountain through Ten Mile Canyon is spectacular.",
      address: "Throughout Town"
    },
    {
      name: "Outer Range Brewing",
      icon: Coffee,
      description: "Famous brewery known for IPAs and mountain vibes.",
      cannabisTip: "Hops and Cannabis are cousins. A cold IPA after a session is a classic Colorado pairing.",
      address: "Summit Blvd"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frisco CO Cannabis Guide 2025 | BudQuest</title>
        <meta name="description" content="Visit Frisco, Colorado. The 'Main Street of the Rockies'. The perfect 420-friendly basecamp for skiing Copper, Breck, and Keystone." />
        <link rel="canonical" href="https://budquest.guide/frisco" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Frisco</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado-ski.jpg" alt="Frisco Main Street" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-4 h-4 mr-2" /> Main Street of the Rockies
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Frisco Cannabis Guide
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                The strategic heart of Summit County. Stay here, ski everywhere. Easy access to Copper, Breck, Keystone, and the best dispensaries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, label: "Hotels", value: "20+" },
              { icon: Store, label: "Dispensaries", value: "Nearby" },
              { icon: Mountain, label: "Elevation", value: "9,097'" },
              { icon: Snowflake, label: "Resorts", value: "4" },
            ].map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/30 text-center p-4">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Seasons */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Year-Round Adventure</h2>
            <Tabs defaultValue="winter" className="w-full">
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
            <h2 className="text-3xl font-bold text-center mb-10">Frisco Highlights</h2>
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
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Dispensaries Near Frisco</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">Frisco is central to Silverthorne and Breckenridge, where most dispensaries are located.</p>
            {loading ? <div>Loading...</div> : (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.length > 0 ? dispensaries.map((d) => (
                  <Link key={d.id} to={`/dispensary/${d.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all">
                      <div className="aspect-video relative">
                        <img src={d.image || "/dest-colorado-ski.jpg"} alt={d.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{d.name}</h3>
                        <p className="text-xs text-muted-foreground">{d.city}</p>
                        <div className="flex justify-center gap-1 text-sm mt-1"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating}</div>
                      </div>
                    </Card>
                  </Link>
                )) : <p>No specific listings found. Check Silverthorne guide.</p>}
              </div>
            )}
          </div>
        </section>

        {/* Email */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Get the Summit County Guide</h2>
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

export default FriscoGuide;
