// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Search, Building, Info, Filter, X, Sparkles, Leaf, CheckCircle } from "lucide-react";
import { HotelCard } from "@/components/HotelCard";
import { Hotel, CountryHotels } from "@/types/data";
import { HOTEL_DATA } from "@/data/hotel_data";
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const generateStructuredData = (hotelCount: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420-Friendly Hotels | Book Cannabis-Friendly Accommodations Worldwide",
  description: "Discover and book BudQuest-verified 420-friendly hotels across USA, Canada, Netherlands, and worldwide. Cannabis-verified policies, ratings, and reviews.",
  url: "https://budquest.com/hotels",
  mainEntity: {
    "@type": "ItemList",
    name: "420-Friendly Hotels Collection",
    description: `Browse ${hotelCount} verified cannabis-friendly hotels by country, state, and city`,
    numberOfItems: hotelCount,
  },
  publisher: {
    "@type": "Organization",
    name: "BudQuest",
    logo: "https://budquest.com/logo.png",
  },
});

/* ============================================
   DATA – scalable by country / state / city
============================================ */
const DATA: CountryHotels[] = HOTEL_DATA;

type FilterType = 'all' | 'premium' | 'budget' | 'smoking' | 'vaping' | 'edibles';
type SortType = 'rating' | 'price-low' | 'price-high' | 'name';

const Hotels = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Clean and prepare data - simplified to avoid complex transformations
  const processedData = useMemo(() => {
    return DATA.map(country => ({
      ...country,
      states: country.states.map(state => ({
        ...state,
        stateName: state.stateName.replace(/\s*\(.*\)$/, ''),
        hotels: state.hotels.map(hotel => ({
          ...hotel,
          state: hotel.state ? hotel.state.replace(/\s*\(.*\)$/, '') : hotel.state,
          isBudget: hotel.price < 100,
          hasSmoking: hotel.policyHighlights?.toLowerCase().includes('smoking') || 
                     hotel.policyHighlights?.toLowerCase().includes('balcony') ||
                     hotel.policyHighlights?.toLowerCase().includes('consumption') || false,
          hasVaping: hotel.policyHighlights?.toLowerCase().includes('vaping') ||
                    hotel.policyHighlights?.toLowerCase().includes('consumption') || false,
          hasEdibles: hotel.policyHighlights?.toLowerCase().includes('edible') ||
                     hotel.policyHighlights?.toLowerCase().includes('welcome kit') || false,
        }))
      }))
    }));
  }, []);

  // Filter and sort data - simplified logic
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    let allHotels = processedData.flatMap(country => 
      country.states.flatMap(state => 
        state.hotels.map(hotel => ({
          ...hotel,
          country: country.country,
          stateName: state.stateName,
          countryFlag: country.flagPath,
        }))
      )
    );

    if (q) {
      allHotels = allHotels.filter(h => 
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.stateName.toLowerCase().includes(q) ||
        h.policyHighlights?.toLowerCase().includes(q)
      );
    }

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

    return [...allHotels].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return 0;
      }
    });
  }, [query, processedData, activeFilter, sortBy]);

  // Group data for display
  const groupedHotels = useMemo(() => {
    const groups: { country: string; flag: string; states: { state: string; cities: { city: string; hotels: typeof filteredData }[] }[] }[] = [];

    filteredData.forEach(hotel => {
      let countryGroup = groups.find(g => g.country === hotel.country);
      if (!countryGroup) {
        countryGroup = { country: hotel.country, flag: hotel.countryFlag, states: [] };
        groups.push(countryGroup);
      }

      let stateGroup = countryGroup.states.find(s => s.state === hotel.stateName);
      if (!stateGroup) {
        stateGroup = { state: hotel.stateName, cities: [] };
        countryGroup.states.push(stateGroup);
      }

      let cityGroup = stateGroup.cities.find(c => c.city === hotel.city);
      if (!cityGroup) {
        cityGroup = { city: hotel.city, hotels: [] };
        stateGroup.cities.push(cityGroup);
      }

      cityGroup.hotels.push(hotel);
    });

    return groups;
  }, [filteredData]);

  // Filter handlers
  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilter('all');
    setSortBy('rating');
    setIsFilterOpen(false);
  }, []);

  const filterOptions = [
    { value: 'all' as FilterType, label: 'All Hotels', icon: <Building className="w-3 h-3" />, count: filteredData.length },
    { value: 'premium' as FilterType, label: 'Premium Stays', icon: <Sparkles className="w-3 h-3" />, count: filteredData.filter(h => h.isPremium).length },
    { value: 'budget' as FilterType, label: 'Budget Friendly', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.isBudget).length },
    { value: 'smoking' as FilterType, label: 'Smoking Allowed', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.hasSmoking).length },
    { value: 'vaping' as FilterType, label: 'Vaping Available', icon: <CloudIcon className="w-3 h-3" />, count: filteredData.filter(h => h.hasVaping).length },
    { value: 'edibles' as FilterType, label: 'Edibles Welcome', icon: <CheckCircle className="w-3 h-3" />, count: filteredData.filter(h => h.hasEdibles).length },
  ];

  const sortOptions = [
    { value: 'rating' as SortType, label: 'Highest Rated' },
    { value: 'price-low' as SortType, label: 'Price: Low to High' },
    { value: 'price-high' as SortType, label: 'Price: High to Low' },
    { value: 'name' as SortType, label: 'Alphabetical' },
  ];

  const hasActiveFilters = query || activeFilter !== 'all';

  return (
    <>
      <Helmet>
        <title>BudQuest Verified 420-Friendly Hotels | Book Cannabis-Friendly Stays</title>
        <meta name="description" content="Discover BudQuest-verified 420-friendly hotels worldwide. Browse cannabis-friendly accommodations by country, state, and city. Policies checked, ratings verified." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, marijuana accommodation, weed friendly hotels, cannabis travel, USA hotels, Canada hotels, Netherlands hotels" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://budquest.com/hotels" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels | Cannabis Travel Guide" />
        <meta property="og:description" content="Browse and book verified 420-friendly hotels across USA, Canada, Netherlands, and worldwide." />
        <meta property="og:url" content="https://budquest.com/hotels" />
        <meta property="og:site_name" content="BudQuest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels" />
        <meta name="twitter:description" content="Book cannabis-friendly hotels worldwide with BudQuest verification." />
        <script type="application/ld+json">{JSON.stringify(generateStructuredData(filteredData.length))}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION - SEO OPTIMIZED */}
            <section className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
                BudQuest Verified 420-Friendly Hotels
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                Browse premium and budget cannabis-friendly hotels by country and state
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/80">
                Policies verified • Premium experience • Worldwide locations
              </p>
            </section>

            {/* SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-border p-4 sm:p-5 mb-8 max-w-4xl mx-auto shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <label htmlFor="hotel-search" className="sr-only">Search hotels</label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" aria-hidden="true" />
                  <input
                    id="hotel-search"
                    type="text"
                    placeholder="Search hotels, cities, states, countries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg bg-card border-none focus:outline-none focus:ring-1 focus:ring-accent text-white text-sm sm:text-base"
                    aria-label="Search hotels, cities, states, or countries"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="gap-1 border-border text-xs sm:text-sm px-3 sm:px-4"
                    aria-label="Toggle filters"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-card border border-border text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent min-w-20"
                    aria-label="Sort hotels"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FILTER CHIPS */}
              <AnimatePresence>
                {(isFilterOpen || hasActiveFilters) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                            activeFilter === filter.value
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-card/70 text-muted-foreground hover:text-white border border-border'
                          }`}
                          aria-pressed={activeFilter === filter.value}
                        >
                          {filter.icon}
                          {filter.label}
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
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
                          className="flex items-center gap-1 px-3 py-2 rounded-md text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
                          aria-label="Clear all filters"
                        >
                          <X className="w-4 h-4" />
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
              <div className="text-center mb-8">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Found <span className="text-accent font-bold">{filteredData.length}</span> verified hotels
                  {query && ` matching "${query}"`}
                </p>
              </div>
            )}

            {/* RESULTS */}
            {filteredData.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Building className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-accent opacity-50" />
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">No hotels found</h2>
                <p className="text-sm sm:text-base">No verified 420-friendly hotels match your search criteria.</p>
                <p className="text-xs sm:text-sm mt-2">Try searching a different city or country.</p>
                {hasActiveFilters && (
                  <Button 
                    onClick={clearFilters} 
                    variant="outline" 
                    size="sm"
                    className="mt-4 gap-2 text-sm sm:text-base px-4 py-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {groupedHotels.map((countryGroup) => (
                  <Collapsible key={countryGroup.country} className="border border-border rounded-xl bg-card/50 overflow-hidden">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-6 hover:bg-card transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <img 
                          src={countryGroup.flag} 
                          alt={`${countryGroup.country} flag`}
                          loading="lazy"
                          className="h-5 w-7 sm:h-6 sm:w-8 rounded border border-border shadow-sm flex-shrink-0" 
                        />
                        <div className="text-left min-w-0">
                          <h2 className="text-lg sm:text-2xl font-bold text-white">{countryGroup.country}</h2>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {countryGroup.states.reduce((total, state) => 
                              total + state.cities.reduce((cityTotal, city) => 
                                cityTotal + city.hotels.length, 0
                              ), 0
                            )} verified hotels
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-accent ui-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 sm:p-6 border-t border-border/50 space-y-4">
                      {countryGroup.states.map((stateGroup) => (
                        <Collapsible key={stateGroup.state} className="rounded-lg bg-background/30 overflow-hidden">
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 hover:bg-background transition-colors">
                            <h3 className="text-base sm:text-lg font-semibold text-accent">{stateGroup.state}</h3>
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-accent ui-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-3 sm:p-4 border-t border-border/50 space-y-4">
                            {stateGroup.cities.map((cityGroup) => (
                              <div key={cityGroup.city} className="space-y-3">
                                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 flex-wrap">
                                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" aria-hidden="true" />
                                  <span>{cityGroup.city}</span>
                                  <Badge className="bg-gold/10 text-gold border border-gold/30 text-xs font-semibold">
                                    {cityGroup.hotels.length}
                                  </Badge>
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                  {cityGroup.hotels.map((hotel) => (
                                    <HotelCard 
                                      key={hotel.id} 
                                      hotel={hotel} 
                                    />
                                  ))}
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
            )}

            {/* DISCLAIMER */}
            <section className="mt-12" aria-label="Legal information">
              <Card className="p-4 sm:p-6 bg-card/50 border-border">
                <div className="flex items-start gap-3 mb-3">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <h3 className="text-sm sm:text-base font-semibold text-red-400">Legal Disclaimer</h3>
                </div>
                <p className="text-xs sm:text-sm text-red-400/90 leading-relaxed">
                  BudQuest is an informational resource only. We do not provide legal advice. Always verify current local laws and confirm hotel policies before booking or consuming cannabis. International transport of cannabis remains illegal. Users are responsible for ensuring compliance with applicable laws.
                </p>
              </Card>
            </section>

            {/* INTERNAL LINKS */}
            <nav className="mt-10 text-center" aria-label="Related pages">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                Explore more cannabis travel resources:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link 
                  to="/usa" 
                  className="text-accent hover:text-accent/80 font-medium transition-colors text-xs sm:text-sm"
                >
                  USA Cannabis Guide
                </Link>
                <span className="text-muted-foreground text-xs sm:text-sm">•</span>
                <Link 
                  to="/world" 
                  className="text-accent hover:text-accent/80 font-medium transition-colors text-xs sm:text-sm"
                >
                  World Cannabis Guide
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

// Simple Cloud icon component
const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
  </svg>
);

export default Hotels;
