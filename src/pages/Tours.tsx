import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useSearchParams } from "react-router-dom";
import {
  MapPin, Clock, Loader2,
  ChevronRight, Sparkles, Search, Filter, X,
  CheckCircle, ExternalLink, ChevronLeft, AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- HIGH QUALITY STATIC IMAGES ---
const STATIC_TOUR_IMAGES: Record<string, string> = {
  "beyond-light-show-meditation": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  "denver-grow-tour": "https://images.unsplash.com/photo-1591348122449-02525d7ba37a?auto=format&fit=crop&w=800&q=80",
  "cannabis-cooking-class": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  "dispensary-safari": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
  "bud-and-breakfast-experience": "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
  "default": "https://images.unsplash.com/photo-1550951298-5c7b95a66bfc?auto=format&fit=crop&w=800&q=80"
};

const ITEMS_PER_PAGE = 10;

type SortType = 'recommended' | 'rating' | 'price-low' | 'price-high';

/* ============================================
   HELPER COMPONENTS
 ============================================ */
const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5 sm:gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i <= Math.round(value)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-600"
          }`}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
    <span className="text-[10px] sm:text-xs text-muted-foreground ml-0.5 sm:ml-1 font-medium">
      {value.toFixed(1)}
    </span>
  </div>
);

const TourCard = ({ tour }: { tour: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <Link
      to={`/tours/${tour.slug}`}
      className="block"
    >
      <Card className={cn(
        "p-3 sm:p-5 rounded-2xl border border-white/10",
        "bg-gradient-to-br from-accent/10 via-transparent to-accent/5",
        "hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer group"
      )}>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
                <h4 className="text-base sm:text-lg font-bold text-white break-words group-hover:text-accent transition-colors leading-tight">
                  {tour.name}
                </h4>
                <div className="flex gap-1.5">
                  {tour.is_verified && (
                    <Badge className="bg-accent/20 text-accent border border-accent/40 text-[10px] sm:text-xs font-semibold gap-0.5 sm:gap-1 flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      BudQuest Verified
                    </Badge>
                  )}
                  {tour.is_420_friendly && (
                    <Badge className="bg-green-600/20 text-green-400 border border-green-600/40 text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1">
                      420 Friendly
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mb-2 sm:mb-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-accent" />
                {tour.city}, {tour.state}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <StarRating value={tour.rating || 0} />
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  ({tour.review_count || 0} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 text-accent border-accent/40">
                  <Clock className="w-3 h-3 mr-1" /> {tour.duration}
                </Badge>
                <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 text-yellow-400 border-yellow-500/40">
                  {tour.price_range}
                </Badge>
              </div>
            </div>

            <div className="flex-shrink-0 mt-2 sm:mt-0">
              <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm font-semibold rounded-lg transition-all group-hover:shadow-lg">
                View Details
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </div>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-white/10">
            <p className="text-[10px] sm:text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
              <span className="font-semibold text-muted-foreground">About:</span>{" "}
              {tour.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  </motion.div>
);

const Tours = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'all';

  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & UI States
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [priceRange, setPriceRange] = useState<number[]>([250]);
  const [sortOrder, setSortOrder] = useState<string>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('tours')
        .select('*')
        .order('name', { ascending: true });

      if (data) {
        const enhancedTours = data.map((t: any) => {
          const pricePart = t.price_range?.split('-')[0] || '0';
          const price = parseFloat(pricePart.replace(/[^0-9.]/g, '') || '0');

          return {
            ...t,
            city: t.city || t.address?.split(',')[0]?.trim() || 'Denver',
            state: t.state || 'Colorado',
            rating: t.rating || 4.5,
            review_count: t.review_count || 12,
            duration: t.duration || 'Flexible',
            price_value: price
          };
        });
        setTours(enhancedTours);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      const matchSearch = tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.city.toLowerCase().includes(search.toLowerCase());
      const matchCity = selectedCity === 'all' || tour.city === selectedCity;
      const matchPrice = tour.price_value <= priceRange[0];

      return matchSearch && matchCity && matchPrice;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price_value - b.price_value;
      if (sortOrder === 'price-high') return b.price_value - a.price_value;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [tours, search, selectedCity, priceRange, sortOrder]);

  const uniqueCities = useMemo(() => Array.from(new Set(tours.map(t => t.city))).sort(), [tours]);
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentTours = filteredTours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCity("all");
    setPriceRange([250]);
    setSortOrder("recommended");
    setCurrentPage(1);
  };

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-muted-foreground mb-3">Location</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-3 py-2 bg-background/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          <option value="all" className="bg-card">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city} className="bg-card">{city}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted-foreground mb-3 flex justify-between">
          <span>Max Price</span>
          <span className="text-accent">${priceRange[0]}</span>
        </label>
        <Slider value={priceRange} max={250} step={5} onValueChange={setPriceRange} className="py-2" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted-foreground mb-3">Sort By</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortType)}
          className="w-full px-3 py-2 bg-background/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          <option value="recommended" className="bg-card">Recommended</option>
          <option value="rating" className="bg-card">Highest Rated</option>
          <option value="price-low" className="bg-card">Price: Low to High</option>
          <option value="price-high" className="bg-card">Price: High to Low</option>
        </select>
      </div>

      <Button
        variant="outline"
        className="w-full border-white/10 hover:bg-accent/10 hover:text-accent transition-colors py-5 text-sm font-semibold rounded-xl"
        onClick={handleClearFilters}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cannabis Tours Denver & Colorado 2025 | Grow Facility Tours & 420 Experiences</title>
        <meta name="description" content="Book top-rated Denver cannabis tours and 420 experiences in 2025. BudQuest-verified weed tours, grow facility visits, cooking classes, and high-altitude adventures in Colorado." />
        <meta name="keywords" content="cannabis tours denver 2025, 420 tours colorado, marijuana experiences, weed tours denver, grow tour colorado, cannabis cooking class, BudQuest verified" />
        <link rel="canonical" href="https://budquest.guide/tours" />
        <meta property="og:title" content="Cannabis Tours Denver & Colorado 2025 | BudQuest Verified" />
        <meta property="og:description" content="Book top-rated Denver cannabis tours and 420 experiences. Grow facility visits, cooking classes, and high-altitude adventures." />
        <meta property="og:url" content="https://budquest.guide/tours" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://budquest.guide/og-social-share.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Cannabis Tours Denver & Colorado 2025",
            "description": "BudQuest-verified cannabis tours, grow facility visits, and 420 experiences in Denver and Colorado.",
            "url": "https://budquest.guide/tours",
            "mainEntity": {
              "@type": "ItemList",
              "name": "420 Tours Collection",
              "numberOfItems": tours.length
            },
            "publisher": {
              "@type": "Organization",
              "name": "BudQuest"
            }
          })}
        </script>
      </Helmet>
      <Navigation />

      {/* MOBILE HEADER / SEARCH */}
      <div className="md:hidden sticky top-16 z-40 bg-background border-b border-white/10 shadow-md mt-16">
        <div className="px-4 py-4">
          <div className="flex gap-3 items-stretch">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/80 border border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
              />
            </div>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-white/10 h-[52px] w-[52px] p-0 rounded-xl bg-card/80 hover:bg-accent/10">
                  <Filter className="w-5 h-5 text-accent" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl bg-card border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-accent">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterControls />
                  <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground py-6 rounded-xl font-bold" onClick={() => setIsFilterOpen(false)}>
                    Show Results
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <main className="pt-8 md:pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO SECTION */}
          <section className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              Verified 420 Tours
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-2">
              Premium cannabis experiences and grow facility tours
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground/80">
              {tours.length} verified experiences • Expert guides • Safe consumption
            </p>
          </section>

          <div className="flex flex-col md:flex-row gap-8">
            {/* SIDEBAR FILTERS (Desktop Only) */}
            <aside className="hidden md:block w-72 space-y-8 sticky top-32 h-fit p-6 bg-card/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-visible">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  Filters
                </h3>
                {(search || selectedCity !== 'all' || priceRange[0] !== 250) && (
                  <button onClick={handleClearFilters} className="text-xs text-accent hover:underline">Clear all</button>
                )}
              </div>
              <FilterControls />
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 min-w-0">
              {/* DESKTOP SEARCH & COUNT */}
              <div className={cn(
                "hidden md:block rounded-2xl border border-white/10 p-4 sm:p-6 mb-8 shadow-2xl",
                "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5"
              )}>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search experiences, cities..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-muted-foreground hover:text-white" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground font-medium">Sort:</span>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-[180px] bg-card/80 border border-white/10 rounded-xl h-11 sm:h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ACTIVE FILTERS PREVIEW */}
                {(search || selectedCity !== 'all' || priceRange[0] !== 250) && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                    {search && (
                      <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                        Search: {search}
                        <button onClick={() => setSearch("")} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                      </Badge>
                    )}
                    {selectedCity !== 'all' && (
                      <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                        {selectedCity}
                        <button onClick={() => setSelectedCity('all')} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                      </Badge>
                    )}
                    <button onClick={handleClearFilters} className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-950/20 transition-colors">
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-8 px-2 sm:px-0">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="text-accent font-bold">{currentTours.length}</span> of <span className="text-accent font-bold">{filteredTours.length}</span> experiences
                </p>
              </div>

              {/* RESULTS GRID */}
              <div className="space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-accent" />
                    <p className="text-muted-foreground animate-pulse">Finding the best experiences...</p>
                  </div>
                ) : filteredTours.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-card/20 rounded-3xl border border-dashed border-white/10">
                    <X className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No experiences found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <Button onClick={handleClearFilters} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl px-8">
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <AnimatePresence mode="popLayout">
                      {currentTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                      ))}
                    </AnimatePresence>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-12 pb-8">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-white/10 rounded-xl w-12 h-12"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-white/10 text-sm font-bold">
                          <span className="text-accent">{currentPage}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="text-muted-foreground">{totalPages}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-white/10 rounded-xl w-12 h-12"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* LEGAL DISCLAIMER */}
              <section className="mt-12 md:mt-16 px-0 mb-8">
                <div className="max-w-3xl mx-auto">
                  <Card className="relative overflow-hidden border-yellow-500/20 bg-yellow-500/5">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50" />

                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                      <div className="p-2 rounded-full bg-yellow-500/10 shrink-0">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-semibold text-yellow-500 leading-none mt-1">
                          Legal Disclaimer
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left">
                          BudQuest is an informational resource only. We do not provide legal advice. Always verify current local laws and confirm dispensary or tour policies before participating. Public consumption of cannabis is generally prohibited. International transport of cannabis remains illegal. Users are responsible for ensuring compliance with all applicable laws.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
