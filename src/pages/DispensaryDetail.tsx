import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { DISPENSARY_DATA } from "@/data/dispensary_data";
import { Dispensary } from "@/types/data";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Truck, CreditCard, Car, Info, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// Utility function to find dispensary by ID
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

// Utility function to find dispensary by slug (for URL matching)
const createSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const DispensaryDetail = () => {
  const { dispensarySlug } = useParams<{ dispensarySlug: string }>();
  const location = useLocation();
  const dispensaryId = location.state?.dispensaryId;

  let dispensary: Dispensary | undefined;

  if (dispensaryId) {
    dispensary = findDispensaryById(dispensaryId);
  } else if (dispensarySlug) {
    // Fallback search by slug if ID is not passed in state
    for (const countryGroup of DISPENSARY_DATA) {
      for (const stateGroup of countryGroup.states) {
        for (const cityGroup of stateGroup.cities) {
          dispensary = cityGroup.dispensaries.find(d => createSlug(d.name) === dispensarySlug);
          if (dispensary) break;
        }
        if (dispensary) break;
      }
      if (dispensary) break;
    }
  }

  if (!dispensary) {
    return <Navigate to="/404" replace />;
  }

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
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-500" />);
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>{dispensary.name} | Verified Dispensary - BudQuest</title>
        <meta name="description" content={`Full details, reviews, and vital information for ${dispensary.name} in ${dispensary.city}, ${dispensary.state}.`} />
        <meta name="keywords" content={`${dispensary.name}, ${dispensary.city} dispensary, ${dispensary.state} cannabis store, BudQuest verified`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Header Section */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{dispensary.name}</h1>
              <div className="flex items-center gap-3 text-lg text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{dispensary.address}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderRating(dispensary.rating)}</div>
                <span className="text-xl font-bold text-yellow-400">{dispensary.rating}</span>
                <span className="text-base text-muted-foreground">({dispensary.reviewCount} Reviews)</span>
                <Badge className="ml-4 bg-green-600 hover:bg-green-700 text-white text-sm font-bold">
                  {dispensary.status}
                </Badge>
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Image and Description */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden rounded-xl shadow-xl bg-card/70 backdrop-blur-sm border-accent/30">
                  <img 
                    src={dispensary.image} 
                    alt={dispensary.name} 
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = "/assets/placeholder-dispensary.jpg"; // Fallback image
                    }}
                  />
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3">About {dispensary.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{dispensary.description}</p>
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
                      <CheckCircle className={`w-5 h-5 ${dispensary.isRecreational ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Recreational: {dispensary.isRecreational ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${dispensary.isMedical ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Medical: {dispensary.isMedical ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className={`w-5 h-5 ${dispensary.hasDelivery ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Delivery: {dispensary.hasDelivery ? 'Available' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className={`w-5 h-5 ${dispensary.hasATM ? 'text-green-500' : 'text-red-500'}`} />
                      <span>ATM on Site: {dispensary.hasATM ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className={`w-5 h-5 ${dispensary.hasParking ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Parking: {dispensary.hasParking ? 'Available' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent" />
                      <a href={dispensary.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews Section (Placeholder for Phase 4/5) */}
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
                      <Star className="w-6 h-6" /> User Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This section will feature user-submitted reviews.
                    </p>
                    <Button variant="default" className="bg-accent hover:bg-accent/90">
                      Write a Review (Sign-up Required)
                    </Button>
                    {/* Placeholder for review list */}
                    <div className="mt-6 space-y-4">
                      <div className="border-b border-border/50 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">User123</span>
                          <div className="flex text-sm">{renderRating(5)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground">"Best selection in LA! Friendly staff and great prices. Highly recommend the delivery service."</p>
                      </div>
                      <div className="border-b border-border/50 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">CannaFanatic</span>
                          <div className="flex text-sm">{renderRating(4)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground">"Good experience overall. Parking was a bit tricky, but the product quality made up for it."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Map/Sidebar (Placeholder) */}
              <div className="lg:col-span-1 space-y-8">
                <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-accent">Location Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center text-muted-foreground">
                      [Interactive Map Placeholder]
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {dispensary.address}
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
