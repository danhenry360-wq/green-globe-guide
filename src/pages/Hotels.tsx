import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Star, ExternalLink, Globe, Building } from "lucide-react";

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

      <div className="pt-16 pb-10 px-4 md:px-6">
        <div className="container mx-auto">

          {/* HEADER - Reduced spacing */}
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              420-Friendly Stays & Accommodations
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Verified cannabis-friendly stays across top cities and states.
            </p>
          </div>

          {/* USA & WORLD GUIDE SECTION - Added */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* USA Guide Card */}
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-2 hover:border-accent/40">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">USA Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    State-by-state regulations & 420-friendly hotels
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>120+ Cities</span>
                    <span>•</span>
                    <span>50 States</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* World Guide Card */}
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-2 hover:border-accent/40">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">World Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Global cannabis-friendly travel destinations
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>300+ Destinations</span>
                    <span>•</span>
                    <span>94% Coverage</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* HOTELS GRID - Reduced spacing */}
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">Loading stays...</div>
          ) : hotels && hotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
            <div className="text-center py-10">
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
