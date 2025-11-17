import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Star, ExternalLink } from "lucide-react";

const Hotels = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          cities (
            name,
            states (
              name
            )
          )
        `)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              420-Friendly Hotels & Accommodations
            </h1>
            <p className="text-xl text-muted-foreground">
              Find cannabis-friendly hotels where you can relax and enjoy your stay without worry.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading hotels...</div>
          ) : hotels && hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:border-accent/50 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{hotel.name}</h3>
                      {hotel.is_420_friendly && (
                        <Badge className="bg-accent text-accent-foreground">420 Friendly</Badge>
                      )}
                    </div>
                    
                    {hotel.cities && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {hotel.cities.name}, {hotel.cities.states?.name}
                      </p>
                    )}

                    {hotel.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-gold text-gold" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    )}

                    {hotel.policies && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {hotel.policies.slice(0, 100)}...
                      </p>
                    )}

                    {hotel.website && (
                      <a 
                        href={hotel.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                      >
                        Visit Website <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hotels found. Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
