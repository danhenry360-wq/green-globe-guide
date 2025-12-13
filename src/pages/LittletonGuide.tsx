import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Store, AlertCircle } from "lucide-react";

// (Interfaces omitted)
interface Dispensary { id: string; name: string; slug: string; city: string; state: string; rating: number | null; image: string | null; images: string[] | null; is_recreational: boolean | null; is_medical: boolean | null; address: string; }

const LittletonGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Littleton city often bans rec, but shops exist in "Littleton" addresses (unincorporated) or nearby Englewood/Sheridan
      const { data } = await supabase.from('dispensaries').select('*').eq('state', 'Colorado').or('city.ilike.%Littleton%,city.ilike.%Englewood%,city.ilike.%Sheridan%').limit(4);
      if (data) setDispensaries(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet><title>Littleton Cannabis Guide 2025 | BudQuest</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-16 container mx-auto px-4 text-center">
          <Badge className="mb-4">Historic Charm</Badge>
          <h1 className="text-4xl font-bold mb-4">Littleton Cannabis Guide</h1>
          <p className="text-muted-foreground">Historic Main Street, Hudson Gardens, and where to find legal cannabis nearby.</p>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <Card className="p-6 bg-amber-500/10 border-amber-500/30 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="text-amber-500 w-6 h-6 shrink-0" />
              <div>
                <h3 className="font-bold text-amber-500">Local Law Alert</h3>
                <p className="text-sm">The City of Littleton prohibits recreational dispensaries. However, many shops are located just across the border in Englewood, Sheridan, or unincorporated Jefferson County (often still having "Littleton" mailing addresses).</p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mb-6">Nearby Options</h2>
          <div className="grid md:grid-cols-4 gap-6">
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
export default LittletonGuide;
