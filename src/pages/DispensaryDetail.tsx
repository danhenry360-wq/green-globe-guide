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
import { DispensaryMap } from "@/components/DispensaryMap";
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

  // Function to generate star icons
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-muted-foreground" />);
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

        <main className="pt-20 pb-16 px-3 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Header Section - Mobile Optimized */}
            <header className="mb-6">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-3 leading-tight">{dbDispensary.name}</h1>
              
              <div className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{dbDispensary.address}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex">{renderRating(dbDispensary.rating || 0)}</div>
                <span className="text-lg sm:text-xl font-bold text-yellow-400">{dbDispensary.rating || 0}</span>
                <span className="text-sm sm:text-base text-muted-foreground">({dbDispensary.review_count || 0} Reviews)</span>
                {dbDispensary.status && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold">
                    {dbDispensary.status}
                  </Badge>
                )}
              </div>
              
              {dbDispensary.hours && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{dbDispensary.hours}</span>
                </div>
              )}
              
              {/* Order Now Button - Full width on mobile */}
              {dbDispensary.website && (
                <a
                  href={dbDispensary.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30"
                >
                  <Globe className="w-5 h-5" />
                  Order Now
                </a>
              )}
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column: Image and Description */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <Card className="overflow-hidden rounded-xl shadow-xl bg-card/70 backdrop-blur-sm border-accent/30">
                  <img 
                    src={dbDispensary.image ? `${dbDispensary.image}${dbDispensary.image.includes('?') ? '&' : '?'}v=${Date.now()}` : '/dest-california.jpg'} 
                    alt={dbDispensary.name} 
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = "/dest-california.jpg";
                    }}
                  />
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">About {dbDispensary.name}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{dbDispensary.description}</p>
                    {dbDispensary.policy_highlights && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-xs sm:text-sm text-foreground font-medium">{dbDispensary.policy_highlights}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vital Information */}
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-lg sm:text-2xl font-bold text-accent flex items-center gap-2">
                      <Info className="w-5 h-5 sm:w-6 sm:h-6" /> Vital Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${dbDispensary.is_recreational ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Recreational: {dbDispensary.is_recreational ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${dbDispensary.is_medical ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Medical: {dbDispensary.is_medical ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${dbDispensary.has_delivery ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Delivery: {dbDispensary.has_delivery ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${dbDispensary.has_atm ? 'text-green-500' : 'text-red-500'}`} />
                      <span>ATM: {dbDispensary.has_atm ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${dbDispensary.has_parking ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Parking: {dbDispensary.has_parking ? 'Yes' : 'No'}</span>
                    </div>
                    {dbDispensary.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <a href={dbDispensary.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline truncate">
                          Website
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Reviews Section - Only for database dispensaries */}
                {isDbDispensary && (
                  <ReviewsSection dispensaryId={dbDispensary.id} />
                )}

                {/* Static Reviews Placeholder - For non-database dispensaries */}
                {!isDbDispensary && (
                  <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
                        <Star className="w-6 h-6" /> User Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Reviews are available for verified dispensaries. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column: Map/Sidebar - Shown first on mobile */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-first lg:order-last">
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl font-bold text-accent">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <DispensaryMap
                      latitude={dbDispensary.latitude}
                      longitude={dbDispensary.longitude}
                      dispensaryName={dbDispensary.name}
                      address={dbDispensary.address}
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
                      {dbDispensary.address}
                    </p>
                  </CardContent>
                </Card>
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
