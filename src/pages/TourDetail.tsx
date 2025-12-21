import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, MapPin, CheckCircle, Clock, Loader2, Globe,
  ChevronLeft, ChevronRight, Sparkles, DollarSign, ExternalLink
} from "lucide-react";
import { DispensaryMap } from "@/components/DispensaryMap";
import { TourReviewsSection } from "@/components/TourReviewsSection";

import { FavoriteButton } from "@/components/FavoriteButton";
import { SocialShareButtons } from "@/components/SocialShareButtons";

// Mock tour images for fallback
const MOCK_TOUR_IMAGES: Record<string, string[]> = {
  'beyond-light-show-meditation': [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800',
    'https://images.unsplash.com/photo-1516738901601-1e9d7da29111?w=1200&h=800',
    'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=800',
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=800',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800'
  ]
};

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_range: string | null;
  website: string | null;
  images: string[] | null;
  address: string | null;
  duration: string | null;
  highlights: string[] | null;
  booking_url: string | null;
  rating: number | null;
  review_count: number | null;
  is_420_friendly: boolean | null;
  is_verified: boolean | null;
  latitude: number | null;
  longitude: number | null;
  city_id: string | null;
}

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);

      if (slug) {
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (!error && data) {
          setTour(data);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }

      setLoading(false);
    };

    fetchTour();
  }, [slug]);

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

  if (notFound || !tour) {
    return <Navigate to="/404" replace />;
  }

  const mockImages = slug ? MOCK_TOUR_IMAGES[slug] : null;
  // Prioritize DB images if they exist, otherwise fallback to mock, then default
  const allImages = (tour.images && tour.images.length > 0)
    ? tour.images
    : (mockImages && mockImages.length > 0 ? mockImages : ['/tours/beyond-light-show-denver.jpg']);
  const hasMultipleImages = allImages.length > 1;

  // Placeholder for image uploader, if needed for admin or user contributions
  // <TourImageUploader tourId={tour.id} onImageUpload={(newImageUrl) => setTour(prev => prev ? { ...prev, images: [...(prev.images || []), newImageUrl] } : prev)} />

  return (
    <>
      <Helmet>
        <title>{tour.name} | Cannabis Tour - BudQuest</title>
        <meta name="description" content={tour.description || `Experience ${tour.name} - a unique cannabis-friendly tour experience.`} />
        <meta name="keywords" content={`${tour.name}, cannabis tour, 420 experience, BudQuest`} />
        <link rel="canonical" href={`https://budquest.guide/tours/${slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Hero Header */}
            <header className="mb-5 sm:mb-8">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                {tour.name}
              </h1>

              {tour.address && (
                <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{tour.address}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                {tour.rating && (
                  <>
                    <div className="flex gap-0.5">{renderRating(tour.rating)}</div>
                    <span className="text-base sm:text-lg font-bold text-yellow-400">{tour.rating}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">({tour.review_count || 0} reviews)</span>
                  </>
                )}
                {tour.is_420_friendly && (
                  <Badge className="bg-accent/20 text-accent border border-accent/40 text-[10px] sm:text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    420 Friendly
                  </Badge>
                )}
                {tour.is_verified && (
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] sm:text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3 sm:mb-4">
                {tour.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{tour.duration}</span>
                  </div>
                )}
                {tour.price_range && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span>{tour.price_range}</span>
                  </div>
                )}
              </div>

              {/* Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  {tour.booking_url && (
                    <Button asChild className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                      <a href={tour.booking_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Book Now
                      </a>
                    </Button>
                  )}
                  <FavoriteButton entityId={tour.id} type="tour" />
                </div>

                <SocialShareButtons
                  url={`https://budquest.guide/tours/${slug}`}
                  title={tour.name}
                  description={tour.description || `Experience ${tour.name} - a unique cannabis-friendly tour.`}
                />
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">

              {/* Location Card - Sidebar on desktop */}
              <div className="lg:col-span-1 lg:order-last">
                <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  <CardHeader className="p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm sm:text-lg font-bold text-accent">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <DispensaryMap
                      latitude={tour.latitude}
                      longitude={tour.longitude}
                      address={tour.address || ''}
                      name={tour.name}
                      className="h-40 sm:h-48 lg:h-56"
                    />
                    {tour.address && (
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-2">
                        {tour.address}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Image Gallery & Description */}
                <Card className="overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                  {/* Image Gallery */}
                  <div className="relative">
                    <img
                      src={allImages[currentImageIndex]}
                      alt={`${tour.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/tours/beyond-light-show-denver.jpg";
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
                        {allImages.slice(0, 5).map((img, idx) => (
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
                                target.src = "/tours/beyond-light-show-denver.jpg";
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-3 sm:p-5">
                    <h2 className="text-base sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">About This Tour</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {tour.description || 'Experience a unique cannabis-friendly tour that combines education, entertainment, and memorable moments.'}
                    </p>
                  </CardContent>
                </Card>

                {/* Highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                  <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
                    <CardHeader className="p-3 sm:p-4 pb-2">
                      <CardTitle className="text-sm sm:text-lg font-bold text-accent flex items-center gap-2">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                        Tour Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <ul className="space-y-2">
                        {tour.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Reviews Section */}
                <TourReviewsSection tourId={tour.id} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TourDetail;
