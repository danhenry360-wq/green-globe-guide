import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MapPin, Star, ExternalLink, CheckCircle2, Cigarette, Wind, Cookie, DollarSign, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HOTEL_DATA } from "@/data/hotel_data";
import { Hotel } from "@/types/data";

const RentalDetail = () => {
  const { rentalSlug } = useParams<{ rentalSlug: string }>();
  const location = useLocation();
  
  // Try to get rental data from navigation state first, then search in static data
  const stateRental = location.state?.rentalData as Hotel | undefined;
  
  // Search in static data by creating slug from name
  const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const staticRental = HOTEL_DATA.flatMap(country => 
    country.states.flatMap(state => 
      state.hotels.map(hotel => ({
        ...hotel,
        countryName: country.country,
        stateName: state.stateName
      }))
    )
  ).find(hotel => createSlug(hotel.name) === rentalSlug);

  const rental = stateRental || staticRental;

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

  if (!rental) {
    return <Navigate to="/hotels" replace />;
  }

  const countryName = (rental as any).countryName || "USA";
  const stateName = (rental as any).stateName || rental.state;
  const affiliateLink = rental.affiliateLink || rental.website || "https://expedia.com/affiliate/w0G2SNm";
  const description = rental.description || `${rental.name} is a premium 420-friendly accommodation offering a welcoming environment for cannabis enthusiasts. Located in ${rental.city}, ${stateName}, this property provides a comfortable and judgment-free stay for travelers.`;
  const image = rental.image || "/dest-california.jpg";

  return (
    <>
      <Helmet>
        <title>{rental.name} - 420-Friendly Rental | BudQuest</title>
        <meta name="description" content={`Book ${rental.name} in ${rental.city}, ${stateName}. ${rental.policies}. Verified 420-friendly accommodation.`} />
        <meta property="og:title" content={`${rental.name} - 420-Friendly Rental`} />
        <meta property="og:description" content={`Verified 420-friendly rental in ${rental.city}. ${rental.policies}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://budquest.com/hotels/${rentalSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": rental.name,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": rental.city,
              "addressRegion": stateName,
              "addressCountry": countryName
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": rental.rating,
              "bestRating": 5
            },
            "priceRange": rental.priceRange
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
              {rental.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{rental.city}, {stateName}</span>
                {countryName !== "USA" && <span className="text-muted-foreground/60">• {countryName}</span>}
              </div>
              
              <div className="flex items-center gap-1">
                {renderRating(rental.rating)}
                <span className="ml-1 text-sm text-muted-foreground">({rental.rating})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                BudQuest Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30">
                <DollarSign className="h-3.5 w-3.5" />
                {rental.priceRange}
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
              {/* Image & Description Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={image}
                    alt={rental.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/dest-california.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    About {rental.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {description}
                  </p>
                  
                  {/* Policy Highlights */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
                    <h3 className="text-sm font-semibold text-accent mb-2">Policy Highlights</h3>
                    <p className="text-sm text-muted-foreground">{rental.policies}</p>
                  </div>
                </div>
              </div>

              {/* 420 Amenities Card */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-accent/20 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">420 Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${rental.hasSmoking !== false ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Cigarette className={`h-5 w-5 ${rental.hasSmoking !== false ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Smoking Allowed</p>
                      <p className={`text-xs ${rental.hasSmoking !== false ? 'text-green-400' : 'text-red-400'}`}>
                        {rental.hasSmoking !== false ? 'Yes - Designated Areas' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${rental.hasVaping !== false ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Wind className={`h-5 w-5 ${rental.hasVaping !== false ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Vaping Allowed</p>
                      <p className={`text-xs ${rental.hasVaping !== false ? 'text-green-400' : 'text-red-400'}`}>
                        {rental.hasVaping !== false ? 'Yes - In Room' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className={`p-2 rounded-full ${rental.hasEdibles !== false ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <Cookie className={`h-5 w-5 ${rental.hasEdibles !== false ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Edibles Friendly</p>
                      <p className={`text-xs ${rental.hasEdibles !== false ? 'text-green-400' : 'text-red-400'}`}>
                        {rental.hasEdibles !== false ? 'Yes - Welcome' : 'Not Permitted'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <div className="p-2 rounded-full bg-gold/20">
                      <DollarSign className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Price Range</p>
                      <p className="text-xs text-gold">{rental.priceRange}</p>
                    </div>
                  </div>
                </div>
              </div>
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
                      <p className="text-foreground font-medium">{rental.city}, {stateName}</p>
                      <p className="text-sm text-muted-foreground">{countryName}</p>
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
                      {renderRating(rental.rating)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="text-gold font-semibold">{rental.priceRange}</span>
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