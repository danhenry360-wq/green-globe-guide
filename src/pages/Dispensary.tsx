// src/pages/Dispensary.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Search, Store, Info, Filter, X } from "lucide-react";
import { DispensaryCard } from "@/components/DispensaryCard";
import { Dispensary, CountryDispensaries } from "@/types/data";
import { DISPENSARY_DATA } from "@/data/dispensary_data";
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const generateStructuredData = (dispensaryCount: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified Dispensaries | Find Legal Cannabis Stores Worldwide",
  description: "Discover and locate BudQuest-verified dispensaries across USA, Canada, Netherlands, and worldwide. Verified locations, ratings, and reviews.",
  url: "https://budquest.com/dispensary",
  mainEntity: {
    "@type": "ItemList",
    name: "Verified Dispensaries Collection",
    description: `Browse ${dispensaryCount} verified dispensaries by country, state, and city`,
    numberOfItems: dispensaryCount,
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
// NOTE: Using HOTEL_DATA as a placeholder for now. This will need to be replaced with actual dispensary data.
// Assuming the structure is similar for now to avoid breaking the template logic.
const DATA: CountryDispensaries[] = DISPENSARY_DATA; 

type FilterType = 'all' | 'recreational' | 'medical' | 'delivery' | 'atm' | 'parking';
type SortType = 'rating' | 'distance-low' | 'name';

const Dispensary = () => {
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
        stateName: state.stateName, // No need to replace state name here, it's clean in the new data
        cities: state.cities.map(city => ({
          ...city,
          dispensaries: city.dispensaries.map(dispensary => ({
            ...dispensary,
            // Ensure all boolean flags are present
            isRecreational: dispensary.isRecreational,
            isMedical: dispensary.isMedical,
            hasDelivery: dispensary.hasDelivery,
            hasATM: dispensary.hasATM,
            hasParking: dispensary.hasParking,
          }))
        }))
      }))
    }));
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    let allDispensaries = processedData.flatMap(country => 
      country.states.flatMap(state => 
        state.cities.flatMap(city => 
          city.dispensaries.map(dispensary => ({
            ...dispensary,
            country: country.country,
            stateName: state.stateName,
            countryFlag: country.flagPath,
          }))
        )
      )
    );

    if (q) {
      allDispensaries = allDispensaries.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.stateName.toLowerCase().includes(q) ||
        d.policyHighlights?.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== 'all') {
      allDispensaries = allDispensaries.filter(dispensary => {
        switch (activeFilter) {
          case 'recreational': return dispensary.isRecreational;
          case 'medical': return dispensary.isMedical;
          case 'delivery': return dispensary.hasDelivery;
          case 'atm': return dispensary.hasATM;
          case 'parking': return dispensary.hasParking;
          default: return true;
        }
      });
    }

    return [...allDispensaries].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'distance-low': return a.price - b.price; // Placeholder for distance
        default: return 0;
      }
    });
  }, [query, processedData, activeFilter, sortBy]);

  // Group data for display
  const groupedDispensaries = useMemo(() => {
    const groups: { country: string; flag: string; states: { state: string; cities: { city: string; dispensaries: Dispensary[] }[] }[] }[] = [];

    filteredData.forEach(dispensary => {
      let countryGroup = groups.find(g => g.country === dispensary.country);
      if (!countryGroup) {
        countryGroup = { country: dispensary.country, flag: dispensary.countryFlag, states: [] };
        groups.push(countryGroup);
      }

      let stateGroup = countryGroup.states.find(s => s.state === dispensary.stateName);
      if (!stateGroup) {
        stateGroup = { state: dispensary.stateName, cities: [] };
        countryGroup.states.push(stateGroup);
      }

      let cityGroup = stateGroup.cities.find(c => c.city === dispensary.city);
      if (!cityGroup) {
        cityGroup = { city: dispensary.city, dispensaries: [] };
        stateGroup.cities.push(cityGroup);
      }

      cityGroup.dispensaries.push(dispensary);
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
    { value: 'all' as FilterType, label: 'All Dispensaries', count: filteredData.length },
    { value: 'recreational' as FilterType, label: 'Recreational', count: filteredData.filter(d => d.isRecreational).length },
    { value: 'medical' as FilterType, label: 'Medical', count: filteredData.filter(d => d.isMedical).length },
    { value: 'delivery' as FilterType, label: 'Delivery', count: filteredData.filter(d => d.hasDelivery).length },
    { value: 'atm' as FilterType, label: 'ATM on Site', count: filteredData.filter(d => d.hasATM).length },
    { value: 'parking' as FilterType, label: 'Parking', count: filteredData.filter(d => d.hasParking).length },
  ];

  const sortOptions = [
    { value: 'rating' as SortType, label: 'Highest Rated' },
    { value: 'distance-low' as SortType, label: 'Distance: Nearest' },
    { value: 'price-low' as SortType, label: 'Price: Low to High' },
    { value: 'price-high' as SortType, label: 'Price: High to Low' },
    { value: 'name' as SortType, label: 'Alphabetical' },
  ];

  const hasActiveFilters = query || activeFilter !== 'all';

  return (
    <>
      <Helmet>
        <title>BudQuest Verified Dispensaries | Find Legal Cannabis Stores</title>
        <meta name="description" content="Discover BudQuest-verified dispensaries worldwide. Browse legal cannabis stores by country, state, and city. Verified locations, ratings, and reviews." />
        <meta name="keywords" content="dispensaries, cannabis stores, BudQuest verified, marijuana dispensary, weed store, cannabis travel, USA dispensaries, Canada dispensaries, Netherlands dispensaries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://budquest.com/dispensary" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BudQuest Verified Dispensaries | Cannabis Travel Guide" />
        <meta property="og:description" content="Browse and locate verified dispensaries across USA, Canada, Netherlands, and worldwide." />
        <meta property="og:url" content="https://budquest.com/dispensary" />
        <meta property="og:site_name" content="BudQuest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified Dispensaries" />
        <meta name="twitter:description" content="Find legal cannabis stores worldwide with BudQuest verification." />
        <script type="application/ld+json">{JSON.stringify(generateStructuredData(filteredData.length))}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                Verified Dispensaries
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-3">
                Find legal cannabis stores worldwide
              </p>
                <p className="text-sm sm:text-base text-muted-foreground/80">
                {filteredData.length} verified dispensaries • Verified locations • Premium selection
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                <Store className="inline w-3 h-3 mr-1 text-accent" />
                *Currently showing Los Angeles area dispensaries.
              </p>
            </section>

            {/* SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-6 mb-10 max-w-4xl mx-auto shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <label htmlFor="dispensary-search" className="sr-only">Search dispensaries</label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    id="dispensary-search"
                    type="text"
                    placeholder="Search dispensaries, cities, states..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base sm:text-lg placeholder:text-muted-foreground/60 transition-all duration-200"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-white transition-colors"
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
                  Found <span className="text-accent font-bold text-lg">{filteredData.length}</span> dispensaries
                  {query && ` matching "${query}"`}
                </p>
              </div>
            )}

            {/* RESULTS */}
            {filteredData.length === 0 ? (
              <div className="text-center py-16">
                <Store className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-muted-foreground/40" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">No dispensaries found</h2>
                <p className="text-muted-foreground text-base mb-2">No verified dispensaries match your search.</p>
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
                {groupedDispensaries.map((countryGroup, idx) => (
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
                                  cityTotal + city.dispensaries.length, 0
                                ), 0
                              )} dispensaries
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
                                      {cityGroup.dispensaries.length}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-1 gap-3">
                                    {cityGroup.dispensaries.map((dispensary) => (
                                      <DispensaryCard 
                                        key={dispensary.id} 
                                        dispensary={dispensary} 
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
                      BudQuest is an informational resource only. We do not provide legal advice. Always verify current local laws and confirm dispensary regulations before visiting or purchasing cannabis. Users are responsible for ensuring compliance with applicable laws.
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

export default Dispensary;
