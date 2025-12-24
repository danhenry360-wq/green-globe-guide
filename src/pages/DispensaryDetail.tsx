import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Truck, CreditCard, Car, Info, Globe, Clock, Loader2, FileText, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";
import { DispensaryMap } from "@/components/DispensaryMap";
import { FavoriteButton } from "@/components/FavoriteButton";

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
  images: string[] | null;
  website: string | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
  license_number: string | null;
}

const DispensaryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const dispensaryId = location.state?.dispensaryId;

  const [dbDispensary, setDbDispensary] = useState<DbDispensary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch from database only
  useEffect(() => {
    const fetchDispensary = async () => {
      setLoading(true);

      if (slug) {
        const { data, error } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('slug', slug)
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
  }, [slug]);

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

  /* ============================================
     SEO & SCHEMA GENERATION (NEW)
  ============================================ */
  const currentYear = 2025; // Explicitly targeting 2025 for freshness
  
  // JSON-LD Schema for Local Business (Rich Snippets)
  const dispensarySchema = {
    "@context": "https://schema.org",
    "@type": "CannabisShop", // Specific Google type
    "name": dbDispensary.name,
    "image": dbDispensary.image || dbDispensary.images?.[0] || "https://budquest.guide/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": dbDispensary.address,
      "addressLocality": dbDispensary.city,
      "addressRegion": dbDispensary.state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": dbDispensary.latitude,
      "longitude": dbDispensary.longitude
    },
    "url": dbDispensary.website,
    "priceRange": "$$",
    "aggregateRating": dbDispensary.rating ? {
      "@type": "AggregateRating",
      "ratingValue": dbDispensary.rating,
      "reviewCount": dbDispensary.review_count || 1
    } : undefined
  };

  return (
    <>
      <Helmet>
        {/* OPTIMIZED: Title includes high-intent keywords: Menu, Hours, Reviews, 2025 */}
        <title>{`${dbDispensary.name}: Menu, Hours & Reviews (${currentYear}) | BudQuest`}</title>
        
        {/* OPTIMIZED: Description is enticing and mentions ordering/directions */}
        <meta name="description" content={`Visiting ${dbDispensary.name} in ${dbDispensary.city}? View the ${currentYear} menu, prices, daily hours, and verified reviews. Order online or get directions today.`} />
        
        {/* OPTIMIZED: Keywords target specific brand searches */}
        <meta name="keywords" content={`${dbDispensary.name} menu, ${dbDispensary.name} prices, ${dbDispensary.name} hours, ${dbDispensary.city} dispensary, buy weed ${dbDispensary.city}`} />
        
        <link rel="canonical" href={`https://budquest.guide/dispensary/${slug}`} />
        
        {/* Schema Markup for Google Maps/Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify(dispensarySchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Hero Header - Mobile First */}
            <header className="mb-5 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2 sm:mb-3">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent leading-tight">
                  {dbDispensary.name}
                </h1>
                {/* Visual Freshness Badge */}
                <Badge variant="outline" className="w-fit text-[10px] h-5 border-accent/30 text-accent flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {currentYear} Verified
                </Badge>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{dbDispensary.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="flex gap-0.5">{renderRating(dbDispensary.rating || 0)}</div>
                <span className="text-base sm:text-lg font-bold text-yellow-400">{dbDispensary.rating || 0}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">({dbDispensary.review_count || 0} reviews)</span>
                {dbDispensary.status?.toLowerCase().includes('licensed') && (
                  <>
                    <Badge className="bg-accent/20 text-accent border border-accent/40 text-[10px] sm:text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      BudQuest Verified
                    </Badge>
                    <Badge className="bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5">
                      Licensed
                    </Badge>
                  </>
                )}
                {dbDispensary.status === 'Open' && (
                  <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] sm:text-xs font-semibold px-2 py-0.5">
                    Open
                  </Badge>
                )}
              </div>

              {dbDispensary.hours && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span>{dbDispensary.hours}</span>
                </div>
              )}

              {/* Actions Row */}
              <div className="flex items-center gap-3">
                {/* Order Now Button - Always full width on mobile */}
                {dbDispensary.website && (
                  <a
                    href={dbDispensary.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base font-bold rounded-lg sm:rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 text-center"
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                    Visit Website / Menu
                  </a>
                )}

                {/* Favorite Button */}
                {isDbDispensary && (
                  <FavoriteButton
                    entityId={dbDispensary.id}
                    type="dispensary"
                    variant="outline"
                    className="h-[42px] sm:h-[48px] px-4 rounded-lg sm:rounded-xl border-accent/30 text-accent hover:bg-accent/10"
                  />
                )}
              </div>
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
                    <DispensaryMap
                      latitude={dbDispensary.latitude}
                      longitude={dbDispensary.longitude}
                      address={dbDispensary.address}
                      name={dbDispensary.name}
                      className="h-40 sm:h-48 lg:h-56"
                    />
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-2">
                      {dbDispensary.address}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Dispensary Image Gallery & Description */}
                <Card className="overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  {/* Image Gallery */}
                  {(() => {
                    const allImages = dbDispensary.images?.filter(img => img) || (dbDispensary.image ? [dbDispensary.image] : ['/dest-california.jpg']);
                    const hasMultipleImages = allImages.length > 1;

                    return (
                      <div className="relative">
                        <img
                          src={`${allImages[currentImageIndex]}${allImages[currentImageIndex].includes('?') ? '&' : '?'}v=${Date.now()}`}
                          alt={`${dbDispensary.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-40 sm:h-56 lg:h-72 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/dest-california.jpg";
                          }}
                        />

                        {/* Navigation Arrows */}
                        {hasMultipleImages && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">
                              {currentImageIndex + 1} / {allImages.length}
                            </div>
                          </>
                        )}

                        {/* Thumbnail Strip */}
                        {hasMultipleImages && (
                          <div className="absolute bottom-2 left-2 flex gap-1.5">
                            {allImages.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-accent' : 'border-white/30 hover:border-white/60'
                                  }`}
                              >
                                <img
                                  src={img}
                                  alt={`Thumbnail ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "/dest-california.jpg";
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

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

                    {/* License Number */}
                    {dbDispensary.license_number && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">License Number:</span>
                          <span className="font-mono text-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {dbDispensary.license_number}
                          </span>
                        </div>
                      </div>
                    )}
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
