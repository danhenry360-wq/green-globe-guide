import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { DISPENSARY_DATA } from "@/data/dispensary_data";
import { Dispensary } from "@/types/data";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Truck, CreditCard, Car, Info, Globe, Clock, Loader2 } from "lucide-react";
import { ProductsSection } from "@/components/ProductsSection";
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
}

// Utility function to find dispensary by ID from static data
const findDispensaryById = (id: string): Dispensary | undefined => {
  for (const countryGroup of DISPENSARY_DATA) {
    for (const stateGroup of countryGroup.states) {
      for (const cityGroup of stateGroup.cities) {
        const dispensary = cityGroup.dispensaries.find(d => d.id === id);
        if (dispensary) return dispensary;
      }
    }
  }
  return undefined;
};

// Utility function to create slug
const createSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const DispensaryDetail = () => {
  const { dispensarySlug } = useParams<{ dispensarySlug: string }>();
  const location = useLocation();
  const dispensaryId = location.state?.dispensaryId;

  const [dbDispensary, setDbDispensary] = useState<DbDispensary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // First, try to fetch from database
  useEffect(() => {
    const fetchDispensary = async () => {
      setLoading(true);
      
      // Try to find by slug in database
      if (dispensarySlug) {
        const { data, error } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('slug', dispensarySlug)
          .maybeSingle();
        
        if (!error && data) {
          setDbDispensary(data);
          setLoading(false);
          return;
        }
      }
      
      // If not in database, check static data
      let staticDispensary: Dispensary | undefined;
      
      if (dispensaryId) {
        staticDispensary = findDispensaryById(dispensaryId);
      } else if (dispensarySlug) {
        for (const countryGroup of DISPENSARY_DATA) {
          for (const stateGroup of countryGroup.states) {
            for (const cityGroup of stateGroup.cities) {
              staticDispensary = cityGroup.dispensaries.find(d => createSlug(d.name) === dispensarySlug);
              if (staticDispensary) break;
            }
            if (staticDispensary) break;
          }
          if (staticDispensary) break;
        }
      }
      
      if (staticDispensary) {
        // Convert static to db format for consistent rendering
        setDbDispensary({
          id: staticDispensary.id,
          name: staticDispensary.name,
          slug: createSlug(staticDispensary.name),
          city: staticDispensary.city,
          state: staticDispensary.state,
          country: staticDispensary.country,
          address: staticDispensary.address,
          rating: staticDispensary.rating,
          review_count: staticDispensary.reviewCount,
          status: staticDispensary.status,
          is_recreational: staticDispensary.isRecreational,
          is_medical: staticDispensary.isMedical,
          has_delivery: staticDispensary.hasDelivery,
          has_atm: staticDispensary.hasATM,
          has_parking: staticDispensary.hasParking,
          policy_highlights: staticDispensary.policyHighlights,
          description: staticDispensary.description,
          image: staticDispensary.image,
          website: staticDispensary.website,
          hours: null,
        });
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    fetchDispensary();
  }, [dispensarySlug, dispensaryId]);

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

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Header Section */}
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2">{dbDispensary.name}</h1>
                  <div className="flex items-center gap-3 text-lg text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>{dbDispensary.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex">{renderRating(dbDispensary.rating || 0)}</div>
                    <span className="text-xl font-bold text-yellow-400">{dbDispensary.rating || 0}</span>
                    <span className="text-base text-muted-foreground">({dbDispensary.review_count || 0} Reviews)</span>
                    {dbDispensary.status && (
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold">
                        {dbDispensary.status}
                      </Badge>
                    )}
                  </div>
                  {dbDispensary.hours && (
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{dbDispensary.hours}</span>
                    </div>
                  )}
                </div>
                
                {/* View Deal Button */}
                {dbDispensary.website && (
                  <a
                    href={dbDispensary.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 flex-shrink-0"
                  >
                    <Globe className="w-5 h-5" />
                    Order Now
                  </a>
                )}
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Image and Description */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden rounded-xl shadow-xl bg-card/70 backdrop-blur-sm border-accent/30">
                  <img 
                    src={dbDispensary.image || '/dest-california.jpg'} 
                    alt={dbDispensary.name} 
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = "/dest-california.jpg";
                    }}
                  />
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-3">About {dbDispensary.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{dbDispensary.description}</p>
                    {dbDispensary.policy_highlights && (
                      <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm text-foreground font-medium">{dbDispensary.policy_highlights}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vital Information */}
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
                      <Info className="w-6 h-6" /> Vital Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${dbDispensary.is_recreational ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Recreational: {dbDispensary.is_recreational ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${dbDispensary.is_medical ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Medical: {dbDispensary.is_medical ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className={`w-5 h-5 ${dbDispensary.has_delivery ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Delivery: {dbDispensary.has_delivery ? 'Available' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className={`w-5 h-5 ${dbDispensary.has_atm ? 'text-green-500' : 'text-red-500'}`} />
                      <span>ATM on Site: {dbDispensary.has_atm ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className={`w-5 h-5 ${dbDispensary.has_parking ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Parking: {dbDispensary.has_parking ? 'Available' : 'No'}</span>
                    </div>
                    {dbDispensary.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-accent" />
                        <a href={dbDispensary.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Products Section - Only for database dispensaries */}
                {isDbDispensary && (
                  <ProductsSection dispensaryId={dbDispensary.id} />
                )}

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

              {/* Right Column: Map/Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-accent">Location Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                      [Interactive Map Placeholder]
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
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
