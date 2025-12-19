import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, Star, ExternalLink, CheckCircle, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Tours = () => {
  const { data: tours, isLoading } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cannabis Tours & Experiences 2025 | BudQuest</title>
        <meta name="description" content="Discover guided cannabis tours and unique 420-friendly experiences around the world. Farm visits, cooking classes, and more." />
        <link rel="canonical" href="https://budquest.guide/tours" />
      </Helmet>
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              Cannabis Tours & Experiences
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover guided tours and unique cannabis experiences around the world.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tours && tours.length > 0 ? (
            <div className="space-y-8 max-w-4xl mx-auto">
              {tours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-2/5 relative">
                      <img
                        src={tour.images?.[0] || "/tours/beyond-light-show-denver.jpg"}
                        alt={tour.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {tour.is_420_friendly && (
                          <Badge className="bg-accent text-accent-foreground">
                            <Sparkles className="w-3 h-3 mr-1" />
                            420 Friendly
                          </Badge>
                        )}
                        {tour.is_verified && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="md:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h2 className="text-2xl font-bold text-foreground">{tour.name}</h2>
                          {tour.rating && (
                            <div className="flex items-center gap-1 text-gold">
                              <Star className="w-5 h-5 fill-current" />
                              <span className="font-semibold">{tour.rating}</span>
                              <span className="text-muted-foreground text-sm">
                                ({tour.review_count} reviews)
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          {tour.address && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {tour.address}
                            </div>
                          )}
                          {tour.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {tour.duration}
                            </div>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {tour.description}
                        </p>

                        {tour.highlights && tour.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tour.highlights.slice(0, 4).map((highlight, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {tour.highlights.length > 4 && (
                              <Badge variant="outline" className="text-xs text-muted-foreground">
                                +{tour.highlights.length - 4} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                        <div className="text-lg font-semibold text-accent">
                          {tour.price_range}
                        </div>
                        {tour.booking_url && (
                          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <a href={tour.booking_url} target="_blank" rel="noopener noreferrer">
                              Book Now
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Tours directory coming soon. Check back for curated experiences!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tours;
