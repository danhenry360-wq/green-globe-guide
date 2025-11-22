// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Search, Building, Info, Filter, X } from "lucide-react";
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

  // Clean and prepare data
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

  // Filter and sort data
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
    { value: 'all' as FilterType, label: 'All Hotels', count: filteredData.length },
    { value: 'premium' as FilterType, label: 'Premium', count: filteredData.filter(h => h.isPremium).length },
    { value: 'budget' as FilterType, label: 'Budget', count: filteredData.filter(h => h.isBudget).length },
    { value: 'smoking' as FilterType, label: 'Smoking', count: filteredData.filter(h => h.hasSmoking).length },
    { value: 'vaping' as FilterType, label: 'Vaping', count: filteredData.filter(h => h.hasVaping).length },
    { value: 'edibles' as FilterType, label: 'Edibles', count: filteredData.filter(h => h.hasEdibles).length },
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

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                Verified 420-Friendly Hotels
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-3">
                Discover cannabis-friendly accommodations worldwide
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80">
                {filteredData.length} verified hotels • Policies checked • Premium experience
              </p>
            </section>

            {/* SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-6 mb-10 max-w-4xl mx-auto shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <label htmlFor="hotel-search" className="sr-only">Search hotels</label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    id="hotel-search"
                    type="text"
                    placeholder="Search hotels, cities, states..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base sm:text-lg placeholder:text-muted-foreground/60 transition-all duration-200"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors p-1 hover:bg-accent/10 rounded-lg"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="gap-2 border-border/50 text-sm px-4 h-11 sm:h-12 rounded-xl hover:bg-accent/10 transition-all"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">Filters</span>
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/20 hover:border-border/60 transition-all h-11 sm:h-12"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-card">
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
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeFilter === filter.value
                              ? 'bg-accent text-white shadow-lg'
                              : 'bg-card/50 text-muted-foreground hover:text-white hover:bg-card/80 border border-border/40'
                          }`}
                          aria-pressed={activeFilter === filter.value}
                        >
                          {filter.label}
                          <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                            activeFilter === filter.value 
                              ? 'bg-white/20' 
                              : 'bg-muted'
                          }`}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                      
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-red-500/30 transition-all"
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
                <p className="text-base sm:text-lg text-muted-foreground">
                  Found <span className="text-accent font-bold text-lg">{filteredData.length}</span> hotels
                  {query && ` matching "${query}"`}
                </p>
              </div>
            )}

            {/* RESULTS */}
            {filteredData.length === 0 ? (
              <div className="text-center py-16">
                <Building className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-muted-foreground/40" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">No hotels found</h2>
                <p className="text-muted-foreground text-base mb-2">No verified 420-friendly hotels match your search.</p>
                <p className="text-muted-foreground/80 text-sm mb-6">Try searching a different city or country.</p>
                {hasActiveFilters && (
                  <Button 
                    onClick={clearFilters} 
                    variant="outline"
                    className="gap-2 border-border/50 hover:bg-accent/10"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {groupedHotels.map((countryGroup, idx) => (
                  <motion.div
                    key={countryGroup.country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Collapsible className="border border-border/50 rounded-2xl bg-card/40 backdrop-blur-sm overflow-hidden hover:border-border/70 transition-all">
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 sm:p-7 hover:bg-card/60 transition-colors group">
                        <div className="flex items-center gap-4 min-w-0">
                          <img 
                            src={countryGroup.flag} 
                            alt={`${countryGroup.country} flag`}
                            loading="lazy"
                            className="h-6 w-9 sm:h-7 sm:w-10 rounded-lg border border-border/50 shadow-md flex-shrink-0 object-cover" 
                          />
                          <div className="text-left min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors">{countryGroup.country}</h2>
                            <p className="text-sm text-muted-foreground">
                              {countryGroup.states.reduce((total, state) => 
                                total + state.cities.reduce((cityTotal, city) => 
                                  cityTotal + city.hotels.length, 0
                                ), 0
                              )} hotels
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:scale-110 transition-transform flex-shrink-0 ui-open:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-5 sm:p-7 border-t border-border/30 space-y-4">
                        {countryGroup.states.map((stateGroup) => (
                          <Collapsible key={stateGroup.state} className="rounded-xl bg-background/40 border border-border/30 overflow-hidden">
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-background/60 transition-colors group">
                              <h3 className="text-lg font-semibold text-accent group-hover:text-accent/80 transition-colors">{stateGroup.state}</h3>
                              <ChevronDown className="w-5 h-5 text-accent group-hover:scale-110 transition-transform ui-open:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 border-t border-border/30 space-y-5">
                              {stateGroup.cities.map((cityGroup) => (
                                <motion.div 
                                  key={cityGroup.city} 
                                  className="space-y-3"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                      <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                                      {cityGroup.city}
                                    </h4>
                                    <Badge className="bg-accent/15 text-accent border border-accent/40 text-xs font-semibold px-3 py-1">
                                      {cityGroup.hotels.length}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-1 gap-3">
                                    {cityGroup.hotels.map((hotel) => (
                                      <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel} 
                                      />
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                ))}
              </div>
            )}

            {/* DISCLAIMER */}
            <section className="mt-16" aria-label="Legal information">
              <Card className="p-6 sm:p-8 bg-gradient-to-r from-red-950/20 to-red-900/10 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-red-300 mb-3">Legal Disclaimer</h3>
                    <p className="text-sm sm:text-base text-red-200/90 leading-relaxed">
                      BudQuest is an informational resource only. We do not provide legal advice. Always verify current local laws and confirm hotel policies before booking or consuming cannabis. International transport of cannabis remains illegal. Users are responsible for ensuring compliance with applicable laws.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* INTERNAL LINKS */}
            <nav className="mt-12 text-center" aria-label="Related pages">
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">Explore more cannabis travel resources:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/usa" 
                  className="text-accent hover:text-accent/80 font-semibold transition-colors text-sm sm:text-base px-3 py-2 rounded-lg hover:bg-accent/10"
                >
                  USA Guide
                </Link>
                <span className="text-muted-foreground/40">•</span>
                <Link 
                  to="/world" 
                  className="text-accent hover:text-accent/80 font-semibold transition-colors text-sm sm:text-base px-3 py-2 rounded-lg hover:bg-accent/10"
                >
                  World Guide
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

export default Hotels;
