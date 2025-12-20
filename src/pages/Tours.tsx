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
  images: string[] | null;
  image: string | null; // Single image column
  city: string;
  state: string;
  rating: number;
  review_count: number;
  duration: string | null;
  price_value: number;
  displayImage: string; // Calculated field
}

const DEFAULT_TOUR_IMAGE = "https://images.unsplash.com/photo-1550951298-5c7b95a66bfc?q=80&w=1000&auto=format&fit=crop";
const ITEMS_PER_PAGE = 9;

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & UI States
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([250]);
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('name', { ascending: true });

      if (data) {
        const enhancedTours = data.map((t: any) => {
          // Calculate the numeric price for the slider
          const price = parseFloat(t.price_range?.replace(/[^0-9.]/g, '') || '0');
          
          // IMAGE LOGIC: 
          // 1. Check singular 'image' column
          // 2. Check first index of 'images' array
          // 3. Use high-quality default
          const displayImg = t.image || (t.images && t.images.length > 0 ? t.images[0] : DEFAULT_TOUR_IMAGE);

          return {
            ...t,
            city: t.city || 'Denver',
            state: t.state || 'Colorado',
            rating: t.rating || 0,
            review_count: t.review_count || 0,
            duration: t.duration || 'Flexible',
            price_value: price,
            displayImage: displayImg
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
      const matchDuration = selectedDuration === 'all' || tour.duration?.includes(selectedDuration);

      return matchSearch && matchCity && matchPrice && matchDuration;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price_value - b.price_value;
      if (sortOrder === 'price-high') return b.price_value - a.price_value;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [tours, search, selectedCity, priceRange, selectedDuration, sortOrder]);

  const uniqueCities = useMemo(() => Array.from(new Set(tours.map(t => t.city))).sort(), [tours]);
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentTours = filteredTours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
    ));
  };

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-3 block text-muted-foreground">Location</label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="bg-card/50 border-white/10">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {uniqueCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-3 block text-muted-foreground flex justify-between">
          <span>Max Price</span>
          <span className="text-accent">${priceRange[0]}</span>
        </label>
        <Slider value={priceRange} max={250} step={5} onValueChange={setPriceRange} className="py-4" />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-3 block text-muted-foreground">Sort Results</label>
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

      <Button variant="outline" className="w-full border-white/10" onClick={() => {
        setSearch(""); setSelectedCity("all"); setPriceRange([250]); setSortOrder("recommended");
      }}>
        Reset All
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cannabis Tours & Experiences | BudQuest</title>
      </Helmet>
      <Navigation />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <header className="max-w-3xl mx-auto mb-12 text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/40 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" /> 2025 Curated Tours
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Cannabis Experiences</h1>
            <p className="text-lg text-muted-foreground">Discover the best 420-friendly tours and activities.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Desktop Filters */}
            <aside className="hidden lg:block space-y-8 sticky top-32 h-fit p-6 bg-card/30 rounded-2xl border border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2"><Filter className="w-4 h-4 text-accent" /> Filters</h3>
              <FilterControls />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Search & Filter Trigger */}
              <div className="flex gap-2 mb-8 lg:hidden">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    className="w-full bg-card/50 border border-white/10 p-2.5 pl-10 rounded-lg text-sm" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="border-white/10"><Filter className="w-4 h-4" /></Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                    <SheetHeader><SheetTitle>Filter Tours</SheetTitle></SheetHeader>
                    <div className="mt-6"><FilterControls /></div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Search Bar (Optional redundant) */}
              <div className="hidden lg:flex relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experiences, cities, or activities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/30 border border-white/10 focus:border-accent/50 outline-none transition-all"
                />
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-accent" /></div>
              ) : currentTours.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentTours.map((tour) => (
                      <Link key={tour.id} to={`/tours/${tour.slug}`} className="group">
                        <Card className="h-full overflow-hidden border-white/10 bg-card/40 backdrop-blur-sm hover:border-accent/40 transition-all duration-300">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={tour.displayImage}
                              alt={tour.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_TOUR_IMAGE; }}
                            />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                              {tour.price_range}
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                              <MapPin className="w-3 h-3" /> {tour.city}, {tour.state}
                            </div>
                            <h3 className="text-lg font-bold mb-3 leading-tight group-hover:text-accent transition-colors line-clamp-2 h-12">
                              {tour.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex">{renderStars(tour.rating)}</div>
                              <span className="text-xs text-muted-foreground">({tour.review_count})</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {tour.duration}</div>
                              <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "bg-accent" : ""}>
                          {i + 1}
                        </Button>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                  <p className="text-muted-foreground">No matching tours found.</p>
                  <Button variant="link" onClick={() => {setSearch(""); setPriceRange([250]); setSelectedCity("all");}} className="text-accent">Clear all filters</Button>
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
