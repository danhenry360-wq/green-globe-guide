import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Store, Shield, Home, Cannabis, Wheat } from "lucide-react";

// (Interfaces omitted for brevity, ensure they are present)
interface Dispensary { id: string; name: string; slug: string; city: string; state: string; rating: number | null; image: string | null; images: string[] | null; is_recreational: boolean | null; is_medical: boolean | null; address: string; }

const FortMorganGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Crucial: Fort Morgan relies on Log Lane Village for dispensaries
      const { data: dispData } = await supabase.from('dispensaries').select('*').eq('state', 'Colorado').or('city.ilike.%Fort Morgan%,city.ilike.%Log Lane%').order('rating', { ascending: false }).limit(3);
      if (dispData) setDispensaries(dispData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet><title>Fort Morgan Cannabis Guide 2025 | Log Lane Village | BudQuest</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-16 container mx-auto px-4 text-center">
          <Badge className="mb-4">The Plains</Badge>
          <h1 className="text-4xl font-bold mb-4">Fort Morgan & Log Lane Village</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">While Fort Morgan itself has restrictions, the adjacent town of Log Lane Village is a major cannabis hub for the eastern plains.</p>
        </section>

        <section className="py-12 bg-card/30 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Store className="text-accent" /> Log Lane Village</h2>
              <p>Just across the river, this tiny town has a high density of recreational dispensaries serving travelers on I-76.</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Wheat className="text-accent" /> Local Vibe</h2>
              <p>Agricultural roots run deep here. Visit the Fort Morgan Museum or Jackson Lake State Park (State park rules apply: no consumption).</p>
            </Card>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Nearby Dispensaries</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dispensaries.map(d => (
              <Link key={d.id} to={`/dispensary/${d.slug}`}>
                <Card className="p-4 hover:border-accent">
                  <h3 className="font-bold">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.city}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default FortMorganGuide;
