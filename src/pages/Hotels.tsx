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

  // Enhanced search and filtering
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
    { value: 'all', label: 'All', icon: <Building className="w-3 h-3" />, count: filteredData.length },
    { value: 'premium', label: 'Premium', icon: <Sparkles className="w-3 h-3" />, count: filteredData.filter(h => h.isPremium).length },
    { value: 'budget', label: 'Budget', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.isBudget).length },
    { value: 'smoking', label: 'Smoking', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.hasSmoking).length },
    { value: 'vaping', label: 'Vaping', icon: <Cloud className="w-3 h-3" />, count: filteredData.filter(h => h.hasVaping).length },
    { value: 'edibles', label: 'Edibles', icon: <CheckCircle className="w-3 h-3" />, count: filteredData.filter(h => h.hasEdibles).length },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'rating', label: 'Rating' },
    { value: 'price-low', label: 'Price: Low' },
    { value: 'price-high', label: 'Price: High' },
    { value: 'name', label: 'Name' },
  ];

  const hasActiveFilters = query || activeFilter !== 'all';

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

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* CLEAN HERO SECTION */}
            <section className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">BudQuest Verified Hotels</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Browse by country or state. Policies checked, premium experience.</p>
            </section>

            {/* ENHANCED BUT CLEAN SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-border p-3 mb-8 max-w-4xl mx-auto shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                {/* SEARCH INPUT */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    placeholder="Search hotels, cities, states, countries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border-none focus:outline-none focus:ring-1 focus:ring-accent text-white text-sm"
                    aria-label="Search hotels"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* FILTER CONTROLS - Better mobile layout */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="gap-1 border-border text-xs sm:text-sm"
                  >
                    <Filter className="w-3 h-3" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-2 py-2 rounded-lg bg-card border border-border text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent min-w-20"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FILTER CHIPS - Appear below search bar */}
              <AnimatePresence>
                {(isFilterOpen || hasActiveFilters) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 pt-3 border-t border-border/50">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                            activeFilter === filter.value
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-card/70 text-muted-foreground hover:text-white border border-border'
                          }`}
                        >
                          {filter.icon}
                          {filter.label}
                          <span className={`px-1 rounded text-xs ${
                            activeFilter === filter.value 
                              ? 'bg-accent-foreground/20' 
                              : 'bg-muted'
                          }`}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                      
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
                        >
                          <X className="w-3 h-3" />
                          Clear
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RESULTS COUNT */}
            {hasActiveFilters && (
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Found <span className="text-accent font-semibold">{filteredData.length}</span> hotels
                  {query && ` for "${query}"`}
                </p>
              </div>
            )}

            {/* RESULTS */}
            <AnimatePresence mode="wait">
              {filteredData.length === 0 && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground py-8"
                >
                  <Building className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <p className="text-base">No verified 420-friendly hotels match your search.</p>
                  <p className="text-xs mt-1">Try a different city or country.</p>
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearFilters} 
                      variant="outline" 
                      size="sm"
                      className="mt-3 gap-2"
                    >
                      <X className="w-3 h-3" />
                      Clear Search & Filters
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CLEAN HIERARCHICAL LIST - Back to original mobile-friendly layout */}
            <div className="space-y-6">
              {hierarchicalHotels.map((countryGroup) => (
                <Collapsible 
                  key={countryGroup.country} 
                  className="border border-border rounded-xl bg-card/50"
                  open={expandedCountries.has(countryGroup.country)}
                  onOpenChange={() => toggleCountry(countryGroup.country)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 md:p-5 hover:bg-card transition-colors rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <img src={countryGroup.flag} alt={countryGroup.country} className="h-5 w-7 rounded border border-border shadow-sm" />
                      <div className="text-left">
                        <h2 className="text-lg md:text-xl font-bold text-white">{countryGroup.country}</h2>
                        <p className="text-xs text-muted-foreground">
                          {countryGroup.states.reduce((total, state) => 
                            total + state.cities.reduce((cityTotal, city) => 
                              cityTotal + city.hotels.length, 0
                            ), 0
                          )} hotels
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-accent ui-open:rotate-180 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t border-border/50 space-y-4">
                    {countryGroup.states.map((stateGroup) => (
                      <Collapsible key={stateGroup.state} className="rounded-lg bg-background/30">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-background transition-colors rounded-t-lg">
                          <h3 className="text-base font-semibold text-accent">{stateGroup.state}</h3>
                          <ChevronDown className="w-3 h-3 text-accent ui-open:rotate-180 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-3 border-t border-border/50 space-y-3">
                          {stateGroup.cities.map((cityGroup) => (
                            <div key={cityGroup.city} className="space-y-2">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gold" />
                                {cityGroup.city}
                                <Badge className="bg-gold/10 text-gold border border-gold/30 text-xs">
                                  {cityGroup.hotels.length}
                                </Badge>
                              </h4>
                              <div className="grid grid-cols-1 gap-3">
                                <AnimatePresence>
                                  {cityGroup.hotels.map((hotel) => (
                                    <HotelCard 
                                      key={hotel.id} 
                                      hotel={hotel} 
                                    />
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* CLEAN DISCLAIMER */}
            <section className="mt-8">
              <Card className="p-4 bg-card/50 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">Legal Disclaimer</span>
                </div>
                <p className="text-xs text-red-400/90">
                  BudQuest is an informational resource only. We do not provide legal advice. Always confirm current local laws and hotel policies before booking or consuming cannabis. International transport remains illegal.
                </p>
              </Card>
            </section>

            {/* CLEAN INTERNAL LINKS */}
            <nav className="mt-8 text-center text-sm text-muted-foreground">
              Explore more:{" "}
              <Link to="/usa" className="text-accent hover:underline">
                USA Guide
              </Link>{" "}
              •{" "}
              <Link to="/world" className="text-accent hover:underline">
                World Guide
              </Link>
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
