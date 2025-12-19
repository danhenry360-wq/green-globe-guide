import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Star, MapPin, Clock, Loader2,
  ChevronRight, Sparkles, Search, Filter, X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
  rating: number;
  review_count: number;
  image: string | null;
  duration: string | null;
  price_value: number; // Numeric price for filtering
}

const MOCK_TOUR_METADATA: Record<string, Partial<Tour>> = {
  'beyond-light-show-meditation': {
    rating: 4.8,
    review_count: 366,
    duration: '1 hour',
    price_range: '$25.00',
    price_value: 25
  }
};

const ITEMS_PER_PAGE = 9;

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([200]); // Max price
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("recommended");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('name', { ascending: true });

      if (data) {
        const enhancedTours = data.map(tour => {
          const t = tour as any;
          const mock = MOCK_TOUR_METADATA[t.slug] || {};
          // Helper to parse price string like "$25.00" to number 25
          const parsePrice = (p: string | null) => {
            if (!p) return 0;
            return parseFloat(p.replace(/[^0-9.]/g, '')) || 0;
          };

          const priceStr = t.price_range || mock.price_range || '$0';

          return {
            ...t,
            city: t.city || 'Denver',
            state: t.state || 'Colorado',
            // Priority: DB -> Mock -> Default
            rating: t.rating || mock.rating || 0,
            review_count: t.review_count || mock.review_count || 0,
            duration: t.duration || mock.duration || 'N/A',
            image: t.image || t.images?.[0] || null,
            price_range: priceStr,
            price_value: parsePrice(priceStr)
          };
        });

        setTours(enhancedTours);
      } else {
        setTours([]);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);

  // Filter Logic
  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      const matchSearch = tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.city.toLowerCase().includes(search.toLowerCase());
      const matchCity = selectedCity === 'all' || tour.city === selectedCity;
      const matchPrice = tour.price_value <= priceRange[0];
      // Simple string match for duration for now
      const matchDuration = selectedDuration === 'all' || tour.duration?.includes(selectedDuration);

      return matchSearch && matchCity && matchPrice && matchDuration;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price_value - b.price_value;
      if (sortOrder === 'price-high') return b.price_value - a.price_value;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return 0; // recommended/default
    });
  }, [tours, search, selectedCity, priceRange, selectedDuration, sortOrder]);

  const uniqueCities = useMemo(() => Array.from(new Set(tours.map(t => t.city))).sort(), [tours]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentTours = filteredTours.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block text-muted-foreground">City</label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="bg-card/50 border-white/10">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {uniqueCities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-4 block text-muted-foreground flex justify-between">
          <span>Max Price</span>
          <span className="text-accent font-bold">${priceRange[0]}</span>
        </label>
        <Slider
          value={priceRange}
          max={200}
          step={5}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block text-muted-foreground">Duration</label>
        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="bg-card/50 border-white/10">
            <SelectValue placeholder="Any Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Duration</SelectItem>
            <SelectItem value="1 hour">~1 Hour</SelectItem>
            <SelectItem value="2 hours">~2 Hours</SelectItem>
            <SelectItem value="3 hours">~3 Hours</SelectItem>
            <SelectItem value="4 hours">4+ Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block text-muted-foreground">Sort By</label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="bg-card/50 border-white/10">
            <SelectValue placeholder="Recommended" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full border-accent/20 text-accent hover:bg-accent hover:text-white"
        onClick={() => {
          setSearch("");
          setSelectedCity("all");
          setPriceRange([200]);
          setSelectedDuration("all");
          setSortOrder("recommended");
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Cannabis Tours & Experiences 2025 | BudQuest</title>
        <meta name="description" content="Discover guided cannabis tours and unique 420-friendly experiences around the world. Farm visits, cooking classes, and more." />
        <link rel="canonical" href="https://budquest.guide/tours" />
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <header className="max-w-4xl mx-auto mb-12 text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/40 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              Curated Experiences
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent leading-tight">
              Cannabis Tours & Experiences
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elevate your journey with our hand-picked selection of guided tours,
              meditation sessions, and immersive cannabis culture experiences.
            </p>
          </header>

          {/* Mobile Search Bar – Compact Design */}
          <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-white/10 shadow-md mb-8">
            <div className="px-4 py-4">
              <div className="flex gap-3 items-stretch">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/80 border border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
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

                {/* Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-white/10 text-sm px-4 h-12 rounded-xl hover:bg-accent/10"
                    >
                      <Filter className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] bg-background border-r border-white/10">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-left">Filters</SheetTitle>
                    </SheetHeader>
                    <FilterControls />
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as string)}
                  className="px-4 py-3 rounded-xl bg-card/80 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 h-12 w-12"
                >
                  <option value="recommended" className="bg-card">
                    Recommended
                  </option>
                  <option value="rating" className="bg-card">
                    Highest Rated
                  </option>
                  <option value="price-low" className="bg-card">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-card">
                    Price: High to Low
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block mb-8">
            <div className="max-w-7xl mx-auto flex gap-4 sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-4 px-4 rounded-xl border border-white/10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tours, cities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card/50 border border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block space-y-8 sticky top-36 h-fit p-6 bg-card/30 rounded-2xl border border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" /> Filter Experiences
              </h3>
              <FilterControls />
            </aside>

            {/* Tours Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-accent" />
                  <p className="text-muted-foreground font-medium">Curating the best experiences for you...</p>
                </div>
              ) : currentTours.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTours.map((tour) => (
                      <Link key={tour.id} to={`/tours/${tour.slug}`} className="group">
                        <Card className="h-full overflow-hidden border-accent/20 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
                          <div className="relative aspect-[16/9]">
                            <img
                              src={tour.image || ''}
                              alt={tour.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                              {tour.price_range}
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-xs text-accent font-bold mb-3 uppercase tracking-widest">
                              <MapPin className="w-3 h-3" />
                              {tour.city}, {tour.state}
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                              {tour.name}
                            </h3>

                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex">{renderRating(tour.rating)}</div>
                              <span className="text-sm font-bold text-yellow-500">{tour.rating}</span>
                              <span className="text-xs text-muted-foreground">({tour.review_count})</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {tour.duration}
                              </div>
                              <div className="flex items-center gap-1 text-sm font-bold text-accent group-hover:translate-x-1 transition-transform">
                                Details
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-white/10"
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-accent text-white" : "border-white/10"}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="border-white/10"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-accent/20">
                  <Sparkles className="w-12 h-12 text-accent/20 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground mb-4">
                    No tours match your filters.
                  </p>
                  <Button onClick={() => {
                    setSearch("");
                    setSelectedCity("all");
                    setPriceRange([200]);
                    setSelectedDuration("all");
                  }} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tours;
