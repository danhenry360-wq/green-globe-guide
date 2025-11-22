// ============================================
// 1. src/pages/HotelDetail.tsx
// ============================================
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { HOTEL_DATA } from "@/data/hotel_data";
import { ChevronLeft, MapPin, Star, Check, X, Phone, Globe } from "lucide-react";
import { motion } from "framer-motion";

const HotelDetail = () => {
  const { country: countrySlug, state: stateSlug, city: citySlug, hotelId } = useParams();
  const navigate = useNavigate();

  // Find hotel from data
  const hotel = HOTEL_DATA.flatMap(c => 
    c.states.flatMap(s => 
      s.hotels.filter(h => h.id === hotelId)
    )
  )[0];

  // Find country and state for breadcrumb
  const countryData = HOTEL_DATA.find(c => c.slug === countrySlug);
  const stateData = countryData?.states.find(s => s.slug === stateSlug);

  if (!hotel || !countryData || !stateData) {
    return (
      <>
        <Navigation />
        <main className="pt-24 pb-20 px-4 min-h-screen">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Hotel Not Found</h1>
            <p className="text-muted-foreground text-base sm:text-lg mb-6">The hotel you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/hotels")} className="gap-2 text-base px-6 py-3">
              <ChevronLeft className="w-5 h-5" />
              Back to Hotels
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description || `${hotel.name} - 420-friendly hotel in ${hotel.city}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.address || "",
      addressLocality: hotel.city,
      addressRegion: stateData.stateName,
      addressCountry: countryData.country,
    },
    telephone: hotel.phone || "",
    url: hotel.website || "",
    image: hotel.image || "",
    priceRange: `$${hotel.price}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: hotel.rating,
      ratingCount: hotel.reviews || 0,
    },
  };

  return (
    <>
      <Helmet>
        <title>{hotel.name} - 420-Friendly Hotel in {hotel.city} | BudQuest</title>
        <meta name="description" content={`${hotel.name} in ${hotel.city}, ${stateData.stateName}. Cannabis-friendly policies: ${hotel.policyHighlights || 'Verified 420-friendly'}. Rating: ${hotel.rating}/5. Price: $${hotel.price}/night`} />
        <meta name="keywords" content={`${hotel.name}, ${hotel.city} hotel, 420 friendly, cannabis hotel, ${stateData.stateName}`} />
        <link rel="canonical" href={`https://budquest.com/hotels/${countrySlug}/${stateSlug}/${citySlug}/${hotelId}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs sm:text-sm mb-6 text-muted-foreground overflow-x-auto pb-2"
            >
              <Link to="/hotels" className="hover:text-accent transition-colors whitespace-nowrap">Hotels</Link>
              <span>/</span>
              <Link to={`/hotels/${countrySlug}`} className="hover:text-accent transition-colors whitespace-nowrap">{countryData.country}</Link>
              <span>/</span>
              <Link to={`/hotels/${countrySlug}/${stateSlug}`} className="hover:text-accent transition-colors whitespace-nowrap">{stateData.stateName}</Link>
              <span>/</span>
              <span className="text-white whitespace-nowrap">{hotel.name}</span>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="gap-2 border-border/50 hover:bg-accent/10 text-sm sm:text-base px-4 py-2.5 h-auto"
              >
                <ChevronLeft className="w-5 h-5" />
                Go Back
              </Button>
            </motion.div>

            {/* Hotel Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-card/50 border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                {hotel.image && (
                  <div className="relative h-64 sm:h-96 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">{hotel.name}</h1>
                      <div className="flex items-center gap-4 flex-wrap text-sm sm:text-base mb-4">
                        <div className="flex items-center gap-2 text-accent">
                          <MapPin className="w-5 h-5 flex-shrink-0" />
                          <span>{hotel.city}, {stateData.stateName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Star className="w-5 h-5 fill-current flex-shrink-0" />
                          <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">({hotel.reviews || 0} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right bg-card/50 p-4 rounded-xl border border-border/50">
                      <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">${hotel.price}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">per night</div>
                    </div>
                  </div>

                  {hotel.policyHighlights && (
                    <Badge className="bg-accent/20 text-accent border border-accent/40 mb-6 text-xs sm:text-sm px-3 py-2">
                      {hotel.policyHighlights}
                    </Badge>
                  )}

                  {hotel.description && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {hotel.description}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Location & Contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="bg-card/40 border-border/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Location & Contact</h2>
                  <div className="space-y-5">
                    {hotel.address && (
                      <div className="flex gap-4">
                        <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1">Address</p>
                          <p className="text-sm sm:text-base text-white break-words">{hotel.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {hotel.phone && (
                      <div className="flex gap-4 pt-3 border-t border-border/30">
                        <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1">Phone</p>
                          <a href={`tel:${hotel.phone}`} className="text-sm sm:text-base text-white hover:text-accent transition-colors font-medium">
                            {hotel.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {hotel.website && (
                      <div className="flex gap-4 pt-3 border-t border-border/30">
                        <Globe className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1">Website</p>
                          <a 
                            href={hotel.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm sm:text-base text-accent hover:text-accent/80 transition-colors break-all font-medium"
                          >
                            Visit Website →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Policy & Amenities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="bg-card/40 border-border/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm h-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Cannabis Policy</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base mb-1">420-Friendly Verified</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">BudQuest verified cannabis-friendly accommodation</p>
                      </div>
                    </div>

                    {hotel.policyHighlights && (
                      <div className="flex items-start gap-4 pt-4 border-t border-border/30">
                        <Check className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-semibold text-sm sm:text-base mb-1">Policy Details</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{hotel.policyHighlights}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4 pt-4 border-t border-border/30">
                      <X className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base mb-1">Always Verify</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Confirm policies directly with the hotel before booking</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Card className="bg-card/40 border-border/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {hotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Booking Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 p-6 sm:p-8 rounded-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Book?</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                  Click the button below to visit the hotel's website and make your reservation. Always verify current policies before booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {hotel.website ? (
                    <a 
                      href={hotel.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all hover:scale-105 inline-flex items-center justify-center text-base"
                    >
                      Book Now →
                    </a>
                  ) : (
                    <button disabled className="px-6 sm:px-8 py-3 sm:py-4 bg-muted text-muted-foreground font-semibold rounded-xl cursor-not-allowed inline-flex items-center justify-center text-base">
                      Booking Info Not Available
                    </button>
                  )}
                  
                  <Link 
                    to="/hotels"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-card border border-border hover:border-accent text-white font-semibold rounded-xl hover:bg-card/80 transition-all inline-flex items-center justify-center text-base"
                  >
                    Back to Hotels
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Legal Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 sm:p-8 bg-red-950/10 border border-red-500/30 rounded-2xl"
            >
              <p className="text-xs sm:text-sm text-red-200/80 leading-relaxed">
                <strong className="text-red-300">Disclaimer:</strong> Always verify current cannabis laws and hotel policies directly before booking. International transport of cannabis remains illegal in most jurisdictions. BudQuest provides informational resources only and is not liable for any legal issues. Users must comply with all applicable local, state, and federal laws.
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HotelDetail;
