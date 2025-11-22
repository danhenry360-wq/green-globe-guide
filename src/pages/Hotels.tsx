// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, ExternalLink, Search, Building, Globe, Leaf, Info, Star, Filter, X, Sparkles, Shield, CheckCircle } from "lucide-react";
import { HotelCard } from "@/components/HotelCard";
import { Hotel, CountryHotels } from "@/types/data";
import { HOTEL_DATA } from "@/data/hotel_data";
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/* ----------------------------------------------------
   DATA – scalable by country / state / city
----------------------------------------------------- */
const DATA: CountryHotels[] = HOTEL_DATA;

/* --------------------  COMPONENT  -------------------- */
const HOTELS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420-Friendly Hotels",
  description: "A collection of verified 420-friendly hotels worldwide.",
  mainEntity: DATA.map(country => ({
    "@type": "Place",
    name: country.country,
    address: {
      "@type": "PostalAddress",
      addressCountry: country.country,
    },
    hasMap: `https://greenglobe.com/hotels/${country.slug}`,
  }))
};

// Enhanced filter types
type FilterType = 'all' | 'premium' | 'budget' | 'smoking' | 'vaping' | 'edibles';
type SortType = 'name' | 'rating' | 'price-low' | 'price-high';

const Hotels = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('rating');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Enhanced data cleaning with memoization
  const cleanData = useMemo(() => {
    return DATA.map(country => ({
      ...country,
      states: country.states.map(state => ({
        ...state,
        stateName: state.stateName.replace(/\s*\(.*\)$/, ''),
        hotels: state.hotels.map(hotel => ({
          ...hotel,
          state: hotel.state ? hotel.state.replace(/\s*\(.*\)$/, '') : hotel.state,
          // Add computed fields for enhanced filtering
          isBudget: hotel.price < 100,
          hasSmoking: hotel.policyHighlights?.toLowerCase().includes('smoking') || 
                     hotel.policyHighlights?.toLowerCase().includes('balcony') ||
                     hotel.policyHighlights?.toLowerCase().includes('consumption'),
          hasVaping: hotel.policyHighlights?.toLowerCase().includes('vaping') ||
                    hotel.policyHighlights?.toLowerCase().includes('consumption'),
          hasEdibles: hotel.policyHighlights?.toLowerCase().includes('edible') ||
                     hotel.policyHighlights?.toLowerCase().includes('welcome kit'),
        }))
      }))
    }));
  }, []);

  // Enhanced search and filtering with debounce simulation
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    let allHotels = cleanData.flatMap(country => 
      country.states.flatMap(state => 
        state.hotels.map(hotel => ({
          ...hotel,
          country: country.country,
          stateName: state.stateName,
          countryFlag: country.flagPath,
          countrySlug: country.slug,
        }))
      )
    );

    // Apply search filter
    if (q) {
      allHotels = allHotels.filter(h => 
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        (h.state && h.state.toLowerCase().includes(q)) ||
        h.country.toLowerCase().includes(q) ||
        h.stateName.toLowerCase().includes(q) ||
        h.policyHighlights?.toLowerCase().includes(q)
      );
    }

    // Apply category filters
    if (activeFilter !== 'all') {
      allHotels = allHotels.filter(hotel => {
        switch (activeFilter) {
          case 'premium': return hotel.isPremium;
          case 'budget': return hotel.isBudget;
          case 'smoking': return hotel.hasSmoking;
          case 'vaping': return hotel.hasVaping;
          case 'edibles': return hotel.hasEdibles;
          default: return true;
        }
      });
    }

    // Apply sorting
    allHotels.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return 0;
      }
    });

    return allHotels;
  }, [query, cleanData, activeFilter, sortBy]);

  // Enhanced hierarchical grouping with auto-expand on search
  const hierarchicalHotels = useMemo(() => {
    const countries: Record<string, { 
      country: string, 
      flag: string, 
      slug: string,
      states: Record<string, { 
        state: string, 
        cities: Record<string, (Hotel & { 
          country: string, 
          stateName: string, 
          countryFlag: string,
          countrySlug: string,
          isBudget?: boolean,
          hasSmoking?: boolean,
          hasVaping?: boolean,
          hasEdibles?: boolean 
        })[]> 
      }> 
    }> = {};

    filteredData.forEach(hotel => {
      if (!countries[hotel.country]) {
        countries[hotel.country] = {
          country: hotel.country,
          flag: hotel.countryFlag,
          slug: hotel.countrySlug,
          states: {},
        };
      }

      const country = countries[hotel.country];
      if (!country.states[hotel.stateName]) {
        country.states[hotel.stateName] = {
          state: hotel.stateName,
          cities: {},
        };
      }

      const stateGroup = country.states[hotel.stateName];
      if (!stateGroup.cities[hotel.city]) {
        stateGroup.cities[hotel.city] = [];
      }

      stateGroup.cities[hotel.city].push(hotel);
    });

    // Auto-expand countries with results when searching
    if (query) {
      const newExpanded = new Set(expandedCountries);
      Object.keys(countries).forEach(country => newExpanded.add(country));
      setExpandedCountries(newExpanded);
    }

    return Object.values(countries).map(country => ({
      ...country,
      states: Object.values(country.states).map(state => ({
        ...state,
        cities: Object.entries(state.cities).map(([city, hotels]) => ({
          city,
          hotels,
        })),
      })),
    }));
  }, [filteredData, query, expandedCountries]);

  // Enhanced interaction handlers
  const toggleCountry = useCallback((country: string) => {
    setExpandedCountries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(country)) {
        newSet.delete(country);
      } else {
        newSet.add(country);
      }
      return newSet;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilter('all');
    setSortBy('rating');
    setIsFilterOpen(false);
  }, []);

  const filterOptions: { value: FilterType; label: string; icon: React.ReactNode; count: number }[] = [
    { value: 'all', label: 'All Hotels', icon: <Building className="w-3 h-3" />, count: filteredData.length },
    { value: 'premium', label: 'Premium', icon: <Sparkles className="w-3 h-3" />, count: filteredData.filter(h => h.isPremium).length },
    { value: 'budget', label: 'Budget', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.isBudget).length },
    { value: 'smoking', label: 'Smoking', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.hasSmoking).length },
    { value: 'vaping', label: 'Vaping', icon: <Cloud className="w-3 h-3" />, count: filteredData.filter(h => h.hasVaping).length },
    { value: 'edibles', label: 'Edibles', icon: <CheckCircle className="w-3 h-3" />, count: filteredData.filter(h => h.hasEdibles).length },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Alphabetical' },
  ];

  return (
    <>
      <head>
        <title>BudQuest Verified 420-Friendly Hotels | BudQuest</title>
        <meta name="description" content="Book BudQuest-verified 420-friendly hotels by country and state. Cannabis policies checked, star-rated, premium stays." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, BudQuest, USA, Canada, Netherlands, marijuana accommodation" />
        <link rel="canonical" href="https://greenglobe.com/hotels" />

        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels | BudQuest" />
        <meta property="og:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <script type="application/ld+json">{JSON.stringify(HOTELS_STRUCTURED_DATA)}</script>
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels | BudQuest" />
        <meta name="twitter:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta name="twitter:image" content="https://greenglobe.com/og-hotels.jpg" />
      </head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* ENHANCED HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Verified & Secure
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                  BudQuest Verified Hotels
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Discover premium 420-friendly accommodations worldwide. Every hotel personally verified for cannabis policies and quality standards.
                </p>
              </motion.div>
            </section>

            {/* ENHANCED SEARCH AND FILTERS SECTION */}
            <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 p-4 mb-8 max-w-4xl mx-auto shadow-2xl shadow-black/20">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* SEARCH INPUT */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    placeholder="Search hotels, cities, amenities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-white placeholder:text-muted-foreground/70"
                    aria-label="Search hotels"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* FILTER BUTTONS */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="gap-2 border-border/50 hover:border-accent/50"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-3 py-2 rounded-xl bg-card/50 border border-border/50 text-white text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* EXPANDED FILTER OPTIONS */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeFilter === filter.value
                              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/25'
                              : 'bg-card/50 text-muted-foreground hover:text-white hover:bg-card border border-border/30'
                          }`}
                        >
                          {filter.icon}
                          {filter.label}
                          <Badge variant="secondary" className={`ml-1 text-xs ${
                            activeFilter === filter.value 
                              ? 'bg-accent-foreground/20 text-accent-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {filter.count}
                          </Badge>
                        </button>
                      ))}
                      
                      {(query || activeFilter !== 'all') && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
                        >
                          <X className="w-3 h-3" />
                          Clear All
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ENHANCED RESULTS SECTION */}
            <AnimatePresence mode="wait">
              {filteredData.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-card/50 flex items-center justify-center">
                    <Building className="w-10 h-10 text-accent/70" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No hotels found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {query || activeFilter !== 'all' 
                      ? "Try adjusting your search terms or filters to find more options."
                      : "We're constantly adding new verified hotels. Check back soon!"
                    }
                  </p>
                  {(query || activeFilter !== 'all') && (
                    <Button onClick={clearFilters} variant="outline" className="gap-2">
                      <X className="w-4 h-4" />
                      Clear Search & Filters
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* QUICK STATS */}
                  <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {filteredData.length}
                      </Badge>
                      <span>Verified Hotels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {new Set(filteredData.map(h => h.country)).size}
                      </Badge>
                      <span>Countries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {new Set(filteredData.map(h => h.city)).size}
                      </Badge>
                      <span>Cities</span>
                    </div>
                  </div>

                  {/* ENHANCED HOTELS LIST */}
                  <div className="space-y-8">
                    {hierarchicalHotels.map((countryGroup) => (
                      <motion.div
                        key={countryGroup.country}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/30 shadow-xl shadow-black/10"
                      >
                        <Collapsible
                          open={expandedCountries.has(countryGroup.country)}
                          onOpenChange={() => toggleCountry(countryGroup.country)}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-6 hover:bg-card/30 transition-all duration-200 rounded-2xl group">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img 
                                  src={countryGroup.flag} 
                                  alt={countryGroup.country} 
                                  className="h-8 w-12 rounded-lg border-2 border-border shadow-lg"
                                />
                                <div className="absolute -inset-1 bg-accent/20 rounded-lg blur-sm group-hover:bg-accent/30 transition-colors" />
                              </div>
                              <div className="text-left">
                                <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                  {countryGroup.country}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {countryGroup.states.length} regions • {' '}
                                  {countryGroup.states.reduce((total, state) => 
                                    total + state.cities.reduce((cityTotal, city) => 
                                      cityTotal + city.hotels.length, 0
                                    ), 0
                                  )} verified hotels
                                </p>
                              </div>
                            </div>
                            <ChevronDown className="w-5 h-5 text-accent group-hover:scale-110 ui-open:rotate-180 transition-transform duration-200" />
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent className="overflow-hidden">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="p-6 pt-4 space-y-6"
                            >
                              {countryGroup.states.map((stateGroup) => (
                                <Collapsible key={stateGroup.state}>
                                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-background/30 rounded-xl transition-colors group">
                                    <h3 className="text-lg font-semibold text-accent group-hover:text-accent/80">
                                      {stateGroup.state}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline" className="bg-background/50">
                                        {stateGroup.cities.length} cities
                                      </Badge>
                                      <ChevronDown className="w-4 h-4 text-accent ui-open:rotate-180 transition-transform" />
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="px-4 pb-4 space-y-4">
                                    {stateGroup.cities.map((cityGroup) => (
                                      <motion.div
                                        key={cityGroup.city}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-3"
                                      >
                                        <h4 className="text-base font-bold text-white flex items-center gap-3 px-2">
                                          <MapPin className="w-4 h-4 text-gold" />
                                          {cityGroup.city}
                                          <Badge className="bg-gold/15 text-gold border-gold/30">
                                            {cityGroup.hotels.length} {cityGroup.hotels.length === 1 ? 'Hotel' : 'Hotels'}
                                          </Badge>
                                        </h4>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                          <AnimatePresence>
                                            {cityGroup.hotels.map((hotel, index) => (
                                              <motion.div
                                                key={hotel.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                              >
                                                <HotelCard 
                                                  hotel={hotel} 
                                                />
                                              </motion.div>
                                            ))}
                                          </AnimatePresence>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </motion.div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ENHANCED DISCLAIMER */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Card className="p-6 bg-gradient-to-r from-red-950/30 to-orange-950/20 border-red-500/20 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-red-400 mb-2">Legal Disclaimer & Safety Notice</h3>
                    <p className="text-xs text-red-400/90 leading-relaxed">
                      BudQuest serves as an informational resource only and does not constitute legal advice. Cannabis laws vary by jurisdiction and change frequently. 
                      Always verify current local regulations and individual hotel policies before booking or consuming. International transportation of cannabis remains illegal. 
                      Consume responsibly and be aware of local consumption laws.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.section>

            {/* ENHANCED NAVIGATION */}
            <nav className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Explore more cannabis-friendly destinations</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/usa" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border/30 hover:border-accent/50 hover:bg-card transition-all duration-200 text-white text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  USA Guide
                </Link>
                <Link 
                  to="/world" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border/30 hover:border-accent/50 hover:bg-card transition-all duration-200 text-white text-sm font-medium"
                >
                  <Globe className="w-4 h-4" />
                  World Guide
                </Link>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border/30 hover:border-accent/50 hover:bg-card transition-all duration-200 text-white text-sm font-medium"
                >
                  <Leaf className="w-4 h-4" />
                  Travel Tips
                </Link>
              </div>
            </nav>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

// Cloud icon component for vaping filter
const Cloud = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
  </svg>
);

export default Hotels;
