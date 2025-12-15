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
  Store, ChevronRight,
  Snowflake, Sun, Leaf, Flower2,
  Music, Mountain, Camera,
  Bike, Footprints, AlertTriangle
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

const CrestedButteGuide = () => {
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
        .ilike('city', '%Crested Butte%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Crested Butte%')
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
      const { error } = await supabase.from('newsletter_subscribers').insert({ email, source_page: 'cb-guide' });
      if (error && error.code !== '23505') throw error;
      toast.success("Guide sent!");
    } catch (err) {
      toast.error("Error subscribing.");
    }
    setEmail("");
    setSubmitting(false);
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "Nov - April",
      icon: Snowflake,
      temp: "10-30°F",
      highlights: ["Extreme Terrain Skiing", "Alley Loop Nordic Marathon", "Cozy Fireplace Sessions", "Apres-Ski on Elk Ave"],
      tip: "The terrain here is steep. Don't consume heavily before skiing the 'Extremes'. Safety first."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - Aug",
      icon: Sun,
      temp: "60-75°F",
      highlights: ["Wildflower Festival", "World Class Mountain Biking", "Hiking to Gothic", "Arts Festival"],
      tip: "Altitude warning! Town is at 8,900ft. THC hits way harder here. Drink 2x water."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Oct",
      icon: Leaf,
      temp: "40-60°F",
      highlights: ["Largest Aspen Grove (Kebler Pass)", "Vinotok Festival (Pagan harvest fest)", "Quiet Trails", "End of Season Sales"],
      tip: "Vinotok is a trippy experience. It pairs exceptionally well with a mellow hybrid."
    },
    {
      id: "spring",
      name: "Spring",
      months: "April - June",
      icon: Flower2,
      temp: "35-55°F",
      highlights: ["Flauschink (End of season party)", "Mud Season (Peace & Quiet)", "Whitewater runoff", "Cheap Lodging"],
      tip: "Many shops close in 'Mud Season' (May). Call dispensaries ahead to check hours."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Crested Butte Cannabis Guide | The Last Great Ski Town</title>
        <meta name="description" content="Explore Crested Butte's cannabis scene. Wildflowers, steep skiing, and a funky local vibe that embraces the culture." />
        <link rel="canonical" href="https://budquest.guide/crested-butte" />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Crested Butte</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado-ski.jpg" alt="Crested Butte Mountain" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Snowflake className="w-4 h-4 mr-2" /> The Last Great Ski Town
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Crested Butte Guide
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                A dead-end road leads to the funkiest town in the Rockies. Where costumes are mandatory and the cannabis culture runs deep.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Seasonal Vibes</h2>
            <Tabs defaultValue="winter" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 bg-card/50">
                {seasons.map((s) => <TabsTrigger key={s.id} value={s.id}>{s.name}</TabsTrigger>)}
              </TabsList>
              {seasons.map((s) => (
                <TabsContent key={s.id} value={s.id}>
                  <Card className="p-6 bg-card/50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <s.icon className="w-10 h-10 text-accent" />
                        <div><h3 className="text-xl font-bold">{s.name}</h3><p className="text-sm text-muted-foreground">{s.temp}</p></div>
                      </div>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 mb-4">
                      {s.highlights.map(h => <li key={h} className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent" /> {h}</li>)}
                    </ul>
                    <div className="bg-accent/10 p-3 rounded text-sm text-accent"><strong>Local Tip:</strong> {s.tip}</div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Must Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50">
                <Bike className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Trail 401</h3>
                <p className="text-sm text-muted-foreground mb-4">One of the most famous mountain bike trails in the world. High alpine views.</p>
                <p className="text-xs text-accent"><strong>Stoner Tip:</strong> The climb is brutal. Save the reward puff for the summit view.</p>
              </Card>
              <Card className="p-6 bg-card/50">
                <Store className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Elk Avenue</h3>
                <p className="text-sm text-muted-foreground mb-4">The historic main street lined with colorful Victorians, bars, and shops.</p>
                <p className="text-xs text-accent"><strong>Stoner Tip:</strong> Pizza at Secret Stash is mandatory after a session.</p>
              </Card>
              <Card className="p-6 bg-card/50">
                <Camera className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Kebler Pass</h3>
                <p className="text-sm text-muted-foreground mb-4">Home to one of the largest living organisms on earth (Aspen grove).</p>
                <p className="text-xs text-accent"><strong>Stoner Tip:</strong> In the fall, the colors are psychedelic naturally.</p>
              </Card>
            </div>
          </div>
        </section>

        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Dispensaries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {dispensaries.length > 0 ? dispensaries.map((d) => (
                <Link key={d.id} to={`/dispensary/${d.slug}`}>
                  <Card className="hover:border-accent transition-all p-4">
                    <h3 className="font-bold">{d.name}</h3>
                    <p className="text-sm text-muted-foreground">{d.address}</p>
                    <div className="flex justify-center mt-2"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating}</div>
                  </Card>
                </Link>
              )) : <div className="col-span-3">Loading or no dispensaries found...</div>}
            </div>
          </div>
        </section>

        <section className="py-20 bg-accent/5">
           <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Get the CB Guide</h2>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 justify-center">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" disabled={submitting}>Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CrestedButteGuide;
