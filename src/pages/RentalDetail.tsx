import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MapPin, Star, ExternalLink, CheckCircle2, Cigarette, Wind, Cookie, DollarSign, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { RentalReviewsSection } from "@/components/RentalReviewsSection";
import { HOTEL_DATA } from "@/data/hotel_data";
import { Hotel } from "@/types/data";
import { supabase } from "@/integrations/supabase/client";

interface DatabaseHotel {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  is_420_friendly: boolean | null;
  rating: number | null;
  policies: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  images: string[] | null;
  amenities?: any;
}

const RentalDetail = () => {
  const { slug: rentalSlug } = useParams<{ slug: string }>();
  const [dbHotel, setDbHotel] = useState<DatabaseHotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch hotel from database first
  useEffect(() => {
    const fetchHotel = async () => {
      if (!rentalSlug) return;
      
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('slug', rentalSlug)
        .maybeSingle();
      
      if (!error && data) {
        setDbHotel(data);
      }
      setIsLoading(false);
    };
    
    fetchHotel();
  }, [rentalSlug]);
  
  // Search in static data by creating slug from name
  const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const allStaticRentals = HOTEL_DATA.flatMap(country => 
    country.states.flatMap(state => 
      state.hotels.map(hotel => ({
        ...hotel,
        countryName: country.country,
        stateName: state.stateName
      }))
    )
  );
  
  // Try matching by URL slug first
  let rental = allStaticRentals.find(hotel => createSlug(hotel.name) === rentalSlug);
  
  // If database hotel exists but no static match by slug, try matching by name
  if (dbHotel && !rental) {
    rental = allStaticRentals.find(hotel => createSlug(hotel.name) === createSlug(dbHotel.name));
  }

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-gold text-gold" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-gold/50 text-gold" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-muted-foreground/30" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!rental && !dbHotel) {
    return <Navigate to="/hotels" replace />;
  }

  const countryName = rental ? (rental as any).countryName || "USA" : "USA";
  const stateName = rental ? (rental as any).stateName || rental.state : "CA";
  const affiliateLink = rental?.affiliateLink || rental?.website || "https://expedia.com/affiliate/w0G2SNm";
  const description = rental?.description || dbHotel?.policies || `${rental?.name || dbHotel?.name} is a premium 420-friendly accommodation offering a welcoming environment for cannabis enthusiasts.`;
  const images = dbHotel?.images || (rental?.image ? [rental.image] : ["/dest-california.jpg"]);
  const displayName = rental?.name || dbHotel?.name || "";
  const displayCity = rental?.city || "Sacramento";
  const displayRating = rental?.rating || dbHotel?.rating || 4.0;
  const displayPolicies = rental?.policies || dbHotel?.policies || "";
  const displayAddress = rental?.address || dbHotel?.address || "";
  
  // Get amenities from database or fall back to rental static data
  const amenities = {
    smoking: dbHotel?.amenities?.smoking ?? rental?.hasSmoking ?? true,
    vaping: dbHotel?.amenities?.vaping ?? rental?.hasVaping ?? true,
    edibles: dbHotel?.amenities?.edibles ?? rental?.hasEdibles ?? true,
    price_range: dbHotel?.amenities?.price_range || rental?.priceRange || "$$"
  };
  
  const displayPriceRange = amenities.price_range;

  return (
    <>
      <Helmet>
        <title>{displayName} - 420-Friendly Rental | BudQuest</title>
        <meta name="description" content={`Book ${displayName} in ${displayCity}, ${stateName}. ${displayPolicies}. Verified 420-friendly accommodation.`} />
        <meta property="og:title" content={`${displayName} - 420-Friendly Rental`} />
        <meta property="og:description" content={`Verified 420-friendly rental in ${displayCity}. ${displayPolicies}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://budquest.com/hotels/${rentalSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": displayName,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": displayCity,
              "addressRegion": stateName,
              "addressCountry": countryName
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": displayRating,
              "bestRating": 5
            },
            "priceRange": displayPriceRange
          })}
        </script>
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/hotels" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to 420 Rentals</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-4">
              {displayName}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{displayCity}, {stateName}</span>
                {countryName !== "USA" && <span className="text-muted-foreground/60">• {countryName}</span>}
              </div>
              
              <div className="flex items-center gap-1">
                {renderRating(displayRating)}
                <span className="ml-1 text-sm text-muted-foreground">({displayRating})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                BudQuest Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30">
                <DollarSign className="h-3.5 w-3.5" />
                {displayPriceRange}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                420-Friendly
              </span>
            </div>

            {/* Book Now CTA */}
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
            >
              Book Now
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Content Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 overflow-hidden">
                <div className="grid grid-cols-1 gap-1">
                  {images.map((img, idx) => (
                    <div key={idx} className="aspect-video w-full overflow-hidden">
                      <img
                        src={img}
                        alt={`${displayName} - Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/dest-california.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    About {displayName}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {description}
                  </p>
                  
                  {/* Address */}
                  {displayAddress && (
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-accent mt-1" />
                      <span className="text-sm text-muted-foreground">{displayAddress}</span>
                    </div>
                  )}
                  
                  {/* Policy Highlights */}
                  {displayPolicies && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
                      <h3 className="text-sm font-semibold text-accent mb-2">Policy Highlights</h3>
                      <p className="text-sm text-muted-foreground">{displayPolicies}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 420 Amenities Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">420 Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${amenities.smoking ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Cigarette className={`h-5 w-5 ${amenities.smoking ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Smoking Allowed</p>
                      <p className={`text-xs ${amenities.smoking ? 'text-green-400' : 'text-red-400'}`}>
                        {amenities.smoking ? 'Yes - Designated Areas' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${amenities.vaping ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Wind className={`h-5 w-5 ${amenities.vaping ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Vaping Allowed</p>
                      <p className={`text-xs ${amenities.vaping ? 'text-green-400' : 'text-red-400'}`}>
                        {amenities.vaping ? 'Yes - In Room' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${amenities.edibles ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Cookie className={`h-5 w-5 ${amenities.edibles ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Edibles Friendly</p>
                      <p className={`text-xs ${amenities.edibles ? 'text-green-400' : 'text-red-400'}`}>
                        {amenities.edibles ? 'Yes - Welcome' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className="p-2 rounded-full bg-gold/20">
                      <DollarSign className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Price Range</p>
                      <p className="text-xs text-gold">{amenities.price_range}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {dbHotel ? (
                <RentalReviewsSection rentalId={dbHotel.id} />
              ) : (
                <Card className="bg-card/70 backdrop-blur-sm border-accent/20 p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Guest Reviews</h2>
                  <div className="text-center py-8 px-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Reviews are not yet available for this rental. Check back soon!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This rental is pending verification in our database.
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-foreground font-medium">{displayCity}, {stateName}</p>
                      <p className="text-sm text-muted-foreground">{countryName}</p>
                      {displayAddress && (
                        <p className="text-sm text-muted-foreground mt-1">{displayAddress}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Book Your Stay</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      {renderRating(displayRating)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="text-gold font-semibold">{displayPriceRange}</span>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                    >
                      Book on Expedia
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Secure booking through Expedia
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">420-Friendly Property</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">BudQuest Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Secure Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default RentalDetail;
