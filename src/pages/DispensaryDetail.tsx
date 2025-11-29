import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Truck, CreditCard, Car, Info, Globe, Clock, Loader2 } from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";
// Types for database dispensary
interface DbDispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  country: string | null;
  address: string;
  rating: number | null;
  review_count: number | null;
  status: string | null;
  is_recreational: boolean | null;
  is_medical: boolean | null;
  has_delivery: boolean | null;
  has_atm: boolean | null;
  has_parking: boolean | null;
  policy_highlights: string | null;
  description: string | null;
  image: string | null;
  website: string | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
}

const DispensaryDetail = () => {
  const { dispensarySlug } = useParams<{ dispensarySlug: string }>();
  const location = useLocation();
  const dispensaryId = location.state?.dispensaryId;

  const [dbDispensary, setDbDispensary] = useState<DbDispensary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch from database only
  useEffect(() => {
    const fetchDispensary = async () => {
      setLoading(true);
      
      if (dispensarySlug) {
        const { data, error } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('slug', dispensarySlug)
          .maybeSingle();
        
        if (!error && data) {
          setDbDispensary(data);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    fetchDispensary();
  }, [dispensarySlug]);

  // Function to generate star icons - mobile optimized
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (notFound || !dbDispensary) {
    return <Navigate to="/404" replace />;
  }

  // Check if this is a database dispensary (has UUID format)
  const isDbDispensary = dbDispensary.id.includes('-') && dbDispensary.id.length === 36;

  return (
    <>
      <Helmet>
        <title>{dbDispensary.name} | Verified Dispensary - BudQuest</title>
        <meta name="description" content={`Full details, reviews, and vital information for ${dbDispensary.name} in ${dbDispensary.city}, ${dbDispensary.state}.`} />
        <meta name="keywords" content={`${dbDispensary.name}, ${dbDispensary.city} dispensary, ${dbDispensary.state} cannabis store, BudQuest verified`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Hero Header - Mobile First */}
            <header className="mb-5 sm:mb-8">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                {dbDispensary.name}
              </h1>
              
              <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{dbDispensary.address}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="flex gap-0.5">{renderRating(dbDispensary.rating || 0)}</div>
                <span className="text-base sm:text-lg font-bold text-yellow-400">{dbDispensary.rating || 0}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">({dbDispensary.review_count || 0} reviews)</span>
                {dbDispensary.status && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5">
                    {dbDispensary.status}
                  </Badge>
                )}
              </div>
              
              {dbDispensary.hours && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span>{dbDispensary.hours}</span>
                </div>
              )}
              
              {/* Order Now Button - Always full width on mobile */}
              {dbDispensary.website && (
                <a
                  href={dbDispensary.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base font-bold rounded-lg sm:rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 text-center"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                  Order Now
                </a>
              )}
            </header>

            {/* Mobile-First Stacked Layout */}
            <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
              
              {/* Location Card - First on mobile */}
              <div className="lg:col-span-1 lg:order-last">
                <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  <CardHeader className="p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm sm:text-lg font-bold text-accent">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dbDispensary.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-40 sm:h-48 lg:h-56 rounded-md overflow-hidden bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-2" />
                        <span className="text-xs sm:text-sm text-muted-foreground">Click to open in Google Maps</span>
                      </div>
                    </a>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-2">
                      {dbDispensary.address}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Dispensary Image & Description */}
                <Card className="overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  <img 
                    src={dbDispensary.image ? `${dbDispensary.image}${dbDispensary.image.includes('?') ? '&' : '?'}v=${Date.now()}` : '/dest-california.jpg'} 
                    alt={dbDispensary.name} 
                    className="w-full h-40 sm:h-56 lg:h-72 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = "/dest-california.jpg";
                    }}
                  />
                  <CardContent className="p-3 sm:p-5">
                    <h2 className="text-base sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">About {dbDispensary.name}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{dbDispensary.description}</p>
                    {dbDispensary.policy_highlights && (
                      <div className="mt-2.5 sm:mt-4 p-2.5 sm:p-3 rounded-md sm:rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-[11px] sm:text-xs text-foreground font-medium">{dbDispensary.policy_highlights}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vital Information - Compact Grid for Mobile */}
                <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  <CardHeader className="p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm sm:text-lg font-bold text-accent flex items-center gap-1.5 sm:gap-2">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5" /> Vital Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${dbDispensary.is_recreational ? 'text-green-500' : 'text-red-500'}`} />
                        <span>Recreational: {dbDispensary.is_recreational ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${dbDispensary.is_medical ? 'text-green-500' : 'text-red-500'}`} />
                        <span>Medical: {dbDispensary.is_medical ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Truck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${dbDispensary.has_delivery ? 'text-green-500' : 'text-red-500'}`} />
                        <span>Delivery: {dbDispensary.has_delivery ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <CreditCard className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${dbDispensary.has_atm ? 'text-green-500' : 'text-red-500'}`} />
                        <span>ATM: {dbDispensary.has_atm ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Car className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${dbDispensary.has_parking ? 'text-green-500' : 'text-red-500'}`} />
                        <span>Parking: {dbDispensary.has_parking ? 'Yes' : 'No'}</span>
                      </div>
                      {dbDispensary.website && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                          <a href={dbDispensary.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline truncate">
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews Section */}
                {isDbDispensary && (
                  <ReviewsSection dispensaryId={dbDispensary.id} />
                )}

                {!isDbDispensary && (
                  <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm sm:text-lg font-bold text-accent flex items-center gap-1.5 sm:gap-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5" /> User Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Reviews are available for verified dispensaries. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DispensaryDetail;
