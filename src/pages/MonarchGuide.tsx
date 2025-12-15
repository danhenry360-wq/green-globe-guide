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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MapPin, Star, CheckCircle, 
  Home, Cannabis, Shield, 
  ArrowRight, Store, ChevronRight,
  Mountain, AlertTriangle, Ban, Mail, 
  Snowflake, Bike, CloudSnow
} from "lucide-react";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  rating: number | null;
  image: string | null;
}

const MonarchGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Monarch has no dispensaries (Federal land). Fetch Salida/Poncha Springs instead.
    const fetchData = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .or('city.ilike.%Salida%,city.ilike.%Poncha%')
        .order('rating', { ascending: false })
        .limit(3);
      if (data) setDispensaries(data);
    };
    fetchData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed!");
    setEmail("");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Monarch Mountain Cannabis Guide 2025",
    "description": "Guide to Monarch Mountain and Monarch Pass. Real snow, Continental Divide views, and where to find cannabis nearby (Salida).",
    "url": "https://budquest.guide/usa/colorado/monarch",
    "publisher": { "@type": "Organization", "name": "BudQuest" },
    "about": { "@type": "Place", "name": "Monarch Mountain", "address": { "@type": "PostalAddress", "addressRegion": "CO" } }
  };

  return (
    <>
      <Helmet>
        <title>Monarch Mountain Cannabis Guide 2025 | BudQuest</title>
        <meta name="description" content="Explore Monarch Mountain. 100% natural snow, no lift lines. Find the nearest dispensaries in Salida and Poncha Springs." />
        <link rel="canonical" href="https://budquest.guide/usa/colorado/monarch" />
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
            <li className="text-foreground">Monarch</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado-ski.jpg" alt="Monarch Mountain Continental Divide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <CloudSnow className="w-4 h-4 mr-2" /> The Real Rockies
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Monarch Mountain
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                No fake snow. No lift lines. Just the Continental Divide and deep powder. (And cannabis in the valley below).
              </p>
            </motion.div>
          </div>
        </section>

        {/* Legal Alert - CRITICAL for Monarch */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
             <Card className="p-6 bg-red-900/10 border-red-900/30">
                <div className="flex items-start gap-4">
                   <AlertTriangle className="w-12 h-12 text-red-500 shrink-0" />
                   <div>
                      <h3 className="text-xl font-bold text-red-500 mb-2">US Forest Service Land</h3>
                      <p className="text-muted-foreground">
                        Monarch Mountain operates entirely on Federal Land. <strong>Possession of cannabis on the mountain is a federal crime.</strong> 
                        Ski patrol cooperates with federal authorities. Keep your stash at your hotel in Salida. 
                        Do not smoke on the lifts.
                      </p>
                   </div>
                </div>
             </Card>
          </div>
        </section>

        {/* Attractions */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">The Mountain Experience</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50">
                <Snowflake className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">The Ski Area</h3>
                <p className="text-sm text-muted-foreground">Independent, old-school skiing. 11,952ft summit.</p>
                <div className="mt-4 text-xs text-accent"><strong>Vibe:</strong> Local, rugged, unpretentious.</div>
              </Card>
              <Card className="p-6 bg-card/50">
                <Bike className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Monarch Crest Trail</h3>
                <p className="text-sm text-muted-foreground">IMBA Epic mountain bike trail. 30+ miles of high alpine riding.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> The altitude is punishing. Don't smoke before the climb.</div>
              </Card>
              <Card className="p-6 bg-card/50">
                <Mountain className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Continental Divide</h3>
                <p className="text-sm text-muted-foreground">Stand on the spine of the continent. Water flows both ways.</p>
                <div className="mt-4 text-xs text-accent"><strong>View:</strong> Psychedelic views without the substances.</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Nearby Dispensaries */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Nearest Supplies</h2>
            <p className="mb-8 text-muted-foreground">Since Monarch is federal land, you must buy in Salida or Poncha Springs (20 mins down the pass).</p>
            <div className="grid md:grid-cols-3 gap-6">
               {dispensaries.map((d) => (
                 <Link key={d.id} to={`/dispensary/${d.slug}`}>
                   <Card className="p-4 hover:border-accent transition-all">
                     <h3 className="font-bold">{d.name}</h3>
                     <p className="text-sm text-muted-foreground">{d.city}</p>
                     <div className="flex justify-center mt-2"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating}</div>
                   </Card>
                 </Link>
               ))}
            </div>
          </div>
        </section>

        {/* Email */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Get the Snow Report</h2>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 justify-center">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="max-w-xs" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MonarchGuide;
