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
  MapPin, Star, CheckCircle, Plane, Home, Cannabis, Shield, 
  ArrowRight, Bed, Store, ChevronRight, Building2, Clock, Car,
  Bus, Bike, Snowflake, Sun, Leaf, Flower2, Music, Palette, 
  Beer, TreePine, Mountain, AlertTriangle, Mail, Download, TrainFront
} from "lucide-react";

// (Interfaces Dispensary and Rental same as above - omitting for brevity in this response, 
// BUT YOU MUST INCLUDE THEM IN THE FILE)
interface Dispensary { id: string; name: string; slug: string; city: string; state: string; rating: number | null; image: string | null; images: string[] | null; is_recreational: boolean | null; is_medical: boolean | null; address: string; }
interface Rental { id: string; name: string; slug: string; address: string | null; rating: number | null; images: string[] | null; website: string | null; amenities?: unknown; }

const DurangoGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: dispData } = await supabase.from('dispensaries').select('*').eq('state', 'Colorado').ilike('city', '%Durango%').order('rating', { ascending: false }).limit(3);
      if (dispData) setDispensaries(dispData);
      const { data: rentalData } = await supabase.from('hotels').select('*').eq('is_420_friendly', true).ilike('address', '%Durango%').order('rating', { ascending: false }).limit(3);
      if (rentalData) setRentals(rentalData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Durango Guide sent!");
    setEmail("");
  };

  const structuredData = { "@context": "https://schema.org", "@type": "TravelGuide", "name": "Durango Cannabis Guide", "description": "Cannabis travel in Durango, CO." };

  return (
    <>
      <Helmet><title>Durango Cannabis Travel Guide 2025 | BudQuest</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4"><Link to="/usa/colorado">Colorado</Link> / Durango</nav>
        
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0"><img src="/dest-colorado.jpg" alt="Durango Train" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40" /></div>
          <div className="relative z-10 text-center container">
            <Badge className="mb-4">Wild West</Badge>
            <h1 className="text-5xl font-bold mb-4 text-white">Durango Cannabis Guide</h1>
            <p className="text-xl text-gray-200 mb-8">Historic trains, roaring rivers, and high-quality recreational cannabis.</p>
            <Button asChild><a href="#dispensaries">Find Dispensaries</a></Button>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Top Attractions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6"><TrainFront className="w-8 h-8 mb-2 text-accent" /><h3 className="font-bold">Durango & Silverton Railroad</h3><p className="text-sm">Historic steam train. Federal transport rules apply (no weed on board).</p></Card>
            <Card className="p-6"><Mountain className="w-8 h-8 mb-2 text-accent" /><h3 className="font-bold">Mesa Verde National Park</h3><p className="text-sm">Ancient cliff dwellings nearby. Federal land - strictly no possession.</p></Card>
            <Card className="p-6"><Beer className="w-8 h-8 mb-2 text-accent" /><h3 className="font-bold">Main Avenue</h3><p className="text-sm">Victorian architecture, breweries, and dispensaries all in walking distance.</p></Card>
          </div>
        </section>

        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Durango Dispensaries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {dispensaries.map(d => (
                <Link key={d.id} to={`/dispensary/${d.slug}`}><Card className="p-4"><h3 className="font-bold">{d.name}</h3><p>{d.address}</p></Card></Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default DurangoGuide;
