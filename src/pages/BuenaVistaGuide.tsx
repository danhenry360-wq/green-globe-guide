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
  Sun, Mountain, Waves, 
  Tent, ThermometerSun
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

const BuenaVistaGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Buena Vista%')
        .limit(3);
      if (data) setDispensaries(data);
    };
    fetchData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to BV updates!");
    setEmail("");
  };

  return (
    <>
      <Helmet>
        <title>Buena Vista Cannabis Guide | Hot Springs & Highs</title>
        <meta name="description" content="Guide to Buena Vista, CO. Pair world-class hot springs and whitewater rafting with local dispensaries in the Banana Belt." />
        <link rel="canonical" href="https://budquest.guide/buena-vista" />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Buena Vista</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0">
            <img src="/dest-colorado-ski.jpg" alt="Collegiate Peaks" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Sun className="w-4 h-4 mr-2" /> The Banana Belt
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Buena Vista
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Whitewater rafting, 14,000ft peaks, and natural hot springs. The ultimate summer playground for the cannabis traveler.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">The BV Experience</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-card/50 hover:border-accent transition-colors">
                <Waves className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Arkansas River</h3>
                <p className="text-sm text-muted-foreground">The rafting capital of the US. From mild floats to Class V rapids.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> Don't get high before Class V rapids. Stick to the float trips.</div>
              </Card>
              <Card className="p-6 bg-card/50 hover:border-accent transition-colors">
                <ThermometerSun className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Mt. Princeton Hot Springs</h3>
                <p className="text-sm text-muted-foreground">Soak in natural creekside pools right in the river.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> An edible + hot springs = ultimate muscle relaxation. Hydrate!</div>
              </Card>
               <Card className="p-6 bg-card/50 hover:border-accent transition-colors">
                <Mountain className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Collegiate Peaks</h3>
                <p className="text-sm text-muted-foreground">The highest concentration of 14ers in the state.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> Oxygen is thin up there. Effects are multiplied.</div>
              </Card>
               <Card className="p-6 bg-card/50 hover:border-accent transition-colors">
                <Tent className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Dispersed Camping</h3>
                <p className="text-sm text-muted-foreground">Miles of BLM land where camping is free.</p>
                <div className="mt-4 text-xs text-accent"><strong>Tip:</strong> Legal to consume on private camping gear, but be discreet on federal land.</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-10">Local Dispensaries</h2>
             <div className="grid md:grid-cols-3 gap-6">
               {dispensaries.map((d) => (
                 <Link key={d.id} to={`/dispensary/${d.slug}`}>
                   <Card className="p-4 hover:bg-accent/5 transition-colors">
                     <div className="aspect-video bg-muted rounded mb-2 overflow-hidden">
                        <img src={d.image || "/dest-colorado-ski.jpg"} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-bold">{d.name}</h3>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-gold text-gold" /> {d.rating || "4.5"}
                     </div>
                   </Card>
                 </Link>
               ))}
             </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-xl">
             <h2 className="text-2xl font-bold mb-4">Join the Adventure List</h2>
             <p className="mb-6 text-muted-foreground">Get weekly updates on river conditions and dispensary deals.</p>
             <form onSubmit={handleEmailSubmit} className="flex gap-2">
               <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <Button type="submit">Join</Button>
             </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BuenaVistaGuide;
