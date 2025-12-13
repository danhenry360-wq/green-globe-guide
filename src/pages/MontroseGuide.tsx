import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Mountain, Store, MapPin } from "lucide-react";

// (Interfaces omitted)
interface Dispensary { id: string; name: string; slug: string; city: string; state: string; rating: number | null; image: string | null; images: string[] | null; is_recreational: boolean | null; is_medical: boolean | null; address: string; }

const MontroseGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('dispensaries').select('*').eq('state', 'Colorado').ilike('city', '%Montrose%').limit(3);
      if (data) setDispensaries(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet><title>Montrose Cannabis Guide 2025 | BudQuest</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-16 container mx-auto px-4 text-center">
          <Badge className="mb-4">Outdoor Hub</Badge>
          <h1 className="text-4xl font-bold mb-4">Montrose Cannabis Guide</h1>
          <p className="text-muted-foreground">The gateway to the Black Canyon and a convenient stop for cannabis on the Western Slope.</p>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
             <Card className="p-6">
                <Mountain className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-bold text-lg">Black Canyon of the Gunnison</h3>
                <p className="text-sm">National Park (Federal Land). Enjoy the views, but keep cannabis out of the park.</p>
             </Card>
             <Card className="p-6">
                <Store className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-bold text-lg">Dispensary Hub</h3>
                <p className="text-sm">Montrose serves as the retail hub for the surrounding rural areas. Great prices and selection.</p>
             </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6">Local Dispensaries</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dispensaries.map(d => (
              <Link key={d.id} to={`/dispensary/${d.slug}`}>
                <Card className="p-4"><h3 className="font-bold">{d.name}</h3><div className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3" /> {d.address}</div></Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default MontroseGuide;
