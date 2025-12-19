import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star, MapPin, CheckCircle, Clock,
  Loader2, Globe, ChevronLeft, ChevronRight,
  Info, Sparkles, DollarSign, Gem
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { DispensaryMap } from "@/components/DispensaryMap";

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_range: string | null;
  website: string | null;
  images: string[] | null;
  // Merged/Fallback fields
  city: string;
  state: string;
  address: string;
  price: number | null;
  duration: string | null;
  rating: number | null;
  review_count: number | null;
  image: string | null;
  highlights: string[] | null;
  latitude: number | null;
  longitude: number | null;
}

const MOCK_TOUR_METADATA: Record<string, Partial<Tour>> = {
  'beyond-light-show-meditation': {
    rating: 4.8,
    review_count: 366,
    duration: '1 hour',
    price: 25.00,
    highlights: [
      '3D Mapped Light Show',
      'Guided Meditation',
      'Retro Arcade Lounge',
      'World-Famous Art',
      'Art Gallery & Movie Theater'
    ],
    address: '400 S Logan St, Denver, CO 80209',
    latitude: 39.7089,
    longitude: -104.9823
  }
};

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
          .select('id, name, slug, description, price_range, website, images, rating, review_count, duration, highlights, latitude, longitude, address, city, state, image')
          .eq('slug', slug)
          .maybeSingle();

        if (!error && data) {
          const d = data as any;
          const mock = MOCK_TOUR_METADATA[slug] || {};
          setTour({
            ...d,
            city: d.city || mock.city || 'Denver',
            state: d.state || mock.state || 'Colorado',
            address: d.address || mock.address || '',
            latitude: d.latitude || mock.latitude || 0,
            longitude: d.longitude || mock.longitude || 0,
            rating: d.rating || mock.rating || 0,
            review_count: d.review_count || mock.review_count || 0,
            duration: d.duration || mock.duration || '',
            price: d.price || mock.price || 0,
            highlights: d.highlights || mock.highlights || [],
            image: d.image || d.images?.[0] || null
          } as any);
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
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />);
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

  const allImages = tour.images?.filter(img => img) || (tour.image ? [tour.image] : []);
  const hasMultipleImages = allImages.length > 1;

  return (
    <>
      <Helmet>
        <title>{tour.name} | Cannabis Tour & Experience Denver - BudQuest</title>
        <meta name="description" content={`Experience ${tour.name} in ${tour.city}, ${tour.state}. View details, highlights, pricing, and book your tour.`} />
        <link rel="canonical" href={`https://budquest.guide/tours/${slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-4 leading-tight">
                {tour.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{tour.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">{renderRating(tour.rating || 0)}</div>
                  <span className="font-bold text-yellow-400">{tour.rating || 0}</span>
                  <span className="text-sm">({tour.review_count || 0} reviews)</span>
                </div>
                <Badge className="bg-accent/20 text-accent border border-accent/40 font-semibold px-2 py-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  BudQuest Verified Tour
                </Badge>
              </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Gallery & About */}
              <div className="lg:col-span-2 space-y-8">
                {/* Visual Gallery */}
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-accent/20">
                  <div className="relative aspect-video">
                    <img
                      src={allImages[currentImageIndex]}
                      alt={`${tour.name} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                  </div>

                  {hasMultipleImages && (
                    <div className="p-4 flex gap-2 overflow-x-auto">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-20 h-14 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${idx === currentImageIndex ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        >
                          <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </Card>

                {/* About Section */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-accent" /> About the Experience
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {tour.description}
                  </p>
                </Card>

                {/* Highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-accent" /> Experience Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Right Column: Booking Info & Map */}
              <div className="space-y-8">
                {/* Booking Card */}
                <Card className="p-6 border-accent/30 bg-accent/5 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Booking Details</h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-5 h-5 text-accent" />
                        <span>Price</span>
                      </div>
                      <span className="text-xl font-bold">${tour.price || '0.00'}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-accent" />
                        <span>Duration</span>
                      </div>
                      <span className="font-semibold">{tour.duration || 'N/A'}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Gem className="w-5 h-5 text-gold" />
                        <span>Experience Type</span>
                      </div>
                      <span className="font-semibold">Boutique</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {tour.website && (
                      <a
                        href={tour.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition shadow-lg shadow-accent/20"
                      >
                        <Globe className="w-5 h-5" />
                        Book This Experience
                      </a>
                    )}
                    <FavoriteButton
                      entityId={tour.id}
                      type="rental"
                      className="w-full h-14 rounded-xl"
                      variant="outline"
                    />
                  </div>

                  {/* Location Preview */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" /> Location
                    </h4>
                    <DispensaryMap
                      latitude={tour.latitude}
                      longitude={tour.longitude}
                      name={tour.name}
                      address={tour.address}
                      className="h-48 rounded-lg"
                    />
                  </div>
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

export default TourDetail;
