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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Star, ChevronRight,
  Pyramid, AlertTriangle, Sunset, 
  Map
} from "lucide-react";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number | null;
  image: string | null;
}

const CortezGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Cortez%')
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

  return (
    <>
      <Helmet>
        <title>Cortez CO Cannabis Guide | Mesa Verde & Ancient Ruins</title>
        <meta name="description" content="Guide to Cortez, Colorado. The gateway to Mesa Verde. Find dispensaries near the Four Corners and tips for ancient cannabis history." />
        <link rel="canonical" href="https://budquest.guide/cortez" />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Cortez</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0">
            <img src="/dest-2.jpg" alt="Southwest Colorado" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Pyramid className="w-4 h-4 mr-2" /> Ancient Southwest
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Cortez
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                The archaeological center of America. Dispensaries here serve the Four Corners region and visitors to Mesa Verde.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-red-900/10 border-y border-red-900/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
               <div className="p-3 bg-red-500/20 rounded-full shrink-0">
                 <AlertTriangle className="w-8 h-8 text-red-500" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold mb-2 text-red-500">Mesa Verde Warning</h2>
                 <p className="text-muted-foreground">
                   Mesa Verde is a <strong>National Park (Federal Land)</strong>. Possession and consumption of cannabis inside the park is a federal crime. 
                   Buy your supplies in Cortez, consume in town or at private lodging, but DO NOT bring it into the park.
                 </p>
               </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Things to Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50">
                <Pyramid className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Canyons of the Ancients</h3>
                <p className="text-sm text-muted-foreground">Vast outdoor museum with thousands of archaeological sites.</p>
                <div className="mt-4 text-xs text-accent"><strong>Vibe:</strong> Deeply spiritual and quiet. A reflective indica strain fits the mood perfectly.</div>
              </Card>
              <Card className="p-6 bg-card/50">
                <Sunset className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Four Corners Monument</h3>
                <p className="text-sm text-muted-foreground">Stand in 4 states at once. (Navajo Nation land - strict laws apply).</p>
                <div className="mt-4 text-xs text-accent"><strong>Warning:</strong> Tribal laws regarding cannabis can be stricter than state laws.</div>
              </Card>
              <Card className="p-6 bg-card/50">
                <Map className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">Phil's World</h3>
                <p className="text-sm text-muted-foreground">Famous mountain bike trail system known for the "Rib Cage" section.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> Flow state heaven.</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-10">Cortez Dispensaries</h2>
             <div className="grid md:grid-cols-3 gap-6">
               {dispensaries.length > 0 ? dispensaries.map((d) => (
                 <Link key={d.id} to={`/dispensary/${d.slug}`}>
                   <Card className="p-4 hover:border-accent transition-all">
                     <h3 className="font-bold mb-2">{d.name}</h3>
                     <p className="text-xs text-muted-foreground mb-2">{d.city}</p>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-gold fill-gold" /> {d.rating}
                     </div>
                   </Card>
                 </Link>
               )) : <div className="col-span-3 text-center">Loading dispensaries...</div>}
             </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-xl">
             <h2 className="text-2xl font-bold mb-4">Get the Southwest Guide</h2>
             <form onSubmit={handleEmailSubmit} className="flex gap-2">
               <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <Button type="submit">Subscribe</Button>
             </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CortezGuide;
