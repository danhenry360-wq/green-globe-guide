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
  Wine, Grape, Sun, Bike,
  Utensils
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

const PalisadeGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Palisade%')
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
        <title>Palisade Cannabis & Wine Guide | Colorado Wine Country</title>
        <meta name="description" content="Explore Palisade, Colorado. The intersection of vineyards, orchards, and cannabis. The perfect destination for a Weed & Wine tour." />
        <link rel="canonical" href="https://budquest.guide/palisade" />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Palisade</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0">
            <img src="/dest-california.jpg" alt="Palisade Vineyards" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Wine className="w-4 h-4 mr-2" /> Wine & Weed Country
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Palisade
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Famous for peaches and Pinot Noir, now emerging as a cannabis destination. Rent a bike and tour the orchards with a buzz.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Pairing Guide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 border-accent/20 border">
                <Grape className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Red Wine & Indicas</h3>
                <p className="text-sm text-muted-foreground">Local Cabernet Franc pairs beautifully with a heavy berry Indica. Relaxing body highs match the tannins.</p>
              </Card>
              <Card className="p-6 bg-card/50 border-accent/20 border">
                <Wine className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">White Wine & Sativas</h3>
                <p className="text-sm text-muted-foreground">A crisp Palisade Riesling goes perfectly with a citrusy Lemon Haze. Energetic and bright.</p>
              </Card>
               <Card className="p-6 bg-card/50 border-accent/20 border">
                <Utensils className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Peaches & Edibles</h3>
                <p className="text-sm text-muted-foreground">The world-famous Palisade Peach is the ultimate cure for cottonmouth. Try peach-flavored gummies for the meta experience.</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
           <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">The Fruit & Wine Byway</h2>
                  <p className="text-muted-foreground mb-4">
                    This 25-mile loop winds through orchards and vineyards. The best way to see it is by electric bike. 
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-accent font-bold mb-1 flex items-center gap-2"><Bike className="w-4 h-4"/> Cannabis Tip</p>
                    <p className="text-sm text-muted-foreground">Biking under the influence is still a DUI in Colorado. Consume lightly and responsibly. Enjoy the breeze and the scents of the orchards.</p>
                  </div>
                </div>
                <div className="flex-1 h-64 bg-card/50 rounded-lg flex items-center justify-center">
                  <Sun className="w-20 h-20 text-orange-300" />
                </div>
              </div>
           </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-10">Dispensaries</h2>
             <div className="grid md:grid-cols-3 gap-6">
               {dispensaries.length > 0 ? dispensaries.map((d) => (
                 <Link key={d.id} to={`/dispensary/${d.slug}`}>
                   <Card className="p-4 hover:border-accent transition-all">
                     <h3 className="font-bold mb-2">{d.name}</h3>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-gold fill-gold" /> {d.rating}
                     </div>
                   </Card>
                 </Link>
               )) : <div className="col-span-3 text-center text-muted-foreground">Check Grand Junction listings for nearby options.</div>}
             </div>
          </div>
        </section>

        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 text-center max-w-xl">
             <h2 className="text-2xl font-bold mb-4">Get the Western Slope Guide</h2>
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

export default PalisadeGuide;
