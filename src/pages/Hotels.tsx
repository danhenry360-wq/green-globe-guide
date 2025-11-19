import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Star, ExternalLink } from "lucide-react";

const Hotels = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          cities (
            name,
            states (
              name
            )
          )
        `)
        .order("rating", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-14 px-4 md:px-6">
        <div className="container mx-auto">

          {/* HEADER */}
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              420-Friendly Stays & Accommodations
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Verified cannabis-friendly stays across top cities and states.
            </p>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading stays...</div>
          ) : hotels && hotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all rounded-xl"
                >
                  {/* IMAGE (IF NO IMAGE, USE ICON) */}
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-muted-foreground" />
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    
                    {/* HOTEL TITLE + BADGE */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold leading-tight line-clamp-1">
                        {hotel.name}
                      </h3>
                      {hotel.is_420_friendly && (
                        <Badge className="bg-accent text-accent-foreground whitespace-nowrap">
                          420 Friendly
                        </Badge>
                      )}
                    </div>

                    {/* CITY / STATE */}
                    {hotel.cities && (
                      <p className="text-sm text-muted-foreground">
                        {hotel.cities.name}, {hotel.cities.states?.name}
                      </p>
                    )}

                    {/* RATING */}
                    {hotel.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-gold text-gold" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    )}

                    {/* POLICIES PREVIEW */}
                    {hotel.policies && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {hotel.policies}
                      </p>
                    )}

                    {/* LINK */}
                    {hotel.website && (
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:opacity-80 mt-2"
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
              <p className="text-muted-foreground">
                No stays found. Check again soon.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
