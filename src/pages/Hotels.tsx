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
import { Helmet } from "react-helmet-async";

/* ----------------------------------------------------
   DATA – scalable by country / state / city
----------------------------------------------------- */
const DATA: CountryHotels[] = HOTEL_DATA;

// Generate SEO-friendly data
const generateSeoData = () => {
  const allHotels = DATA.flatMap(country => 
    country.states.flatMap(state => state.hotels)
  );
  
  const countries = DATA.map(country => country.country);
  const cities = [...new Set(allHotels.map(hotel => hotel.city))];
  const totalHotels = allHotels.length;
  
  return {
    allHotels,
    countries,
    cities,
    totalHotels
  };
};

const SEO_DATA = generateSeoData();

/* --------------------  COMPONENT  -------------------- */
// Enhanced structured data for better SEO
const HOTELS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "BudQuest Verified 420-Friendly Hotels Worldwide",
  "description": "Comprehensive directory of verified 420-friendly hotels, cannabis-friendly accommodations, and marijuana-friendly stays across multiple countries.",
  "numberOfItems": SEO_DATA.totalHotels,
  "itemListElement": SEO_DATA.allHotels.map((hotel, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Hotel",
      "name": hotel.name,
      "description": `420-friendly hotel in ${hotel.city} offering cannabis-friendly accommodations. ${hotel.policyHighlights || ''}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": hotel.city,
        "addressCountry": DATA.find(country => 
          country.states.some(state => 
            state.hotels.some(h => h.id === hotel.id)
          )
        )?.country
      },
      "starRating": {
        "@type": "Rating",
        "ratingValue": hotel.rating
      },
      "priceRange": `$${hotel.price}`,
      "amenityFeature": [
        "420-friendly",
        "Cannabis-friendly",
        ...(hotel.isPremium ? ["Premium accommodation"] : []),
        ...(hotel.policyHighlights?.includes('pet-friendly') ? ["Pet-friendly"] : [])
      ]
    }
  }))
};

// Breadcrumb structured data
const BREADCRUMB_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://greenglobe.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "420-Friendly Hotels",
      "item": "https://greenglobe.com/hotels"
    }
  ]
};

type FilterType = 'all' | 'premium' | 'budget' | 'smoking' | 'vaping' | 'edibles';
type SortType = 'rating' | 'price-low' | 'price-high' | 'name';

const Hotels = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Generate SEO meta description based on current state
  const getMetaDescription = useMemo(() => {
    if (query) {
      return `Find verified 420-friendly hotels in ${query}. Browse cannabis-friendly accommodations with verified policies, ratings, and prices.`;
    }
    return `Discover ${SEO_DATA.totalHotels}+ verified 420-friendly hotels across ${SEO_DATA.countries.length} countries. Browse cannabis-friendly accommodations with verified policies, ratings, and prices.`;
  }, [query]);

  // Generate page title based on current state
  const getPageTitle = useMemo(() => {
    if (query) {
      return `420-Friendly Hotels in ${query} | BudQuest Verified Cannabis Accommodations`;
    }
    if (activeFilter !== 'all') {
      const filterLabels = {
        premium: 'Premium',
        budget: 'Budget',
        smoking: 'Smoking-Friendly',
        vaping: 'Vaping-Friendly',
        edibles: 'Edibles-Friendly'
      };
      return `${filterLabels[activeFilter]} 420-Friendly Hotels | BudQuest Verified`;
    }
    return "420-Friendly Hotels Worldwide | BudQuest Verified Cannabis Accommodations";
  }, [query, activeFilter]);

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

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilter('all');
    setSortBy('rating');
    setIsFilterOpen(false);
  }, []);

  const filterOptions = [
    { value: 'all' as FilterType, label: 'All', icon: <Building className="w-3 h-3" />, count: filteredData.length },
    { value: 'premium' as FilterType, label: 'Premium', icon: <Sparkles className="w-3 h-3" />, count: filteredData.filter(h => h.isPremium).length },
    { value: 'budget' as FilterType, label: 'Budget', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.isBudget).length },
    { value: 'smoking' as FilterType, label: 'Smoking', icon: <Leaf className="w-3 h-3" />, count: filteredData.filter(h => h.hasSmoking).length },
    { value: 'vaping' as FilterType, label: 'Vaping', icon: <CloudIcon className="w-3 h-3" />, count: filteredData.filter(h => h.hasVaping).length },
    { value: 'edibles' as FilterType, label: 'Edibles', icon: <CheckCircle className="w-3 h-3" />, count: filteredData.filter(h => h.hasEdibles).length },
  ];

  const sortOptions = [
    { value: 'rating' as SortType, label: 'Rating' },
    { value: 'price-low' as SortType, label: 'Price: Low' },
    { value: 'price-high' as SortType, label: 'Price: High' },
    { value: 'name' as SortType, label: 'Name' },
  ];

  const hasActiveFilters = query || activeFilter !== 'all';

  return (
    <>
      <Helmet>
        <title>{getPageTitle}</title>
        <meta name="description" content={getMetaDescription} />
        <meta name="keywords" content={`420 friendly hotels, cannabis hotels, marijuana friendly accommodation, weed friendly stays, ${SEO_DATA.countries.join(', ')}, ${SEO_DATA.cities.slice(0, 10).join(', ')}, 420 travel, cannabis tourism`} />
        <link rel="canonical" href="https://greenglobe.com/hotels" />

        {/* Open Graph */}
        <meta property="og:title" content={getPageTitle} />
        <meta property="og:description" content={getMetaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta property="og:site_name" content="BudQuest" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle} />
        <meta name="twitter:description" content={getMetaDescription} />
        <meta name="twitter:image" content="https://greenglobe.com/og-hotels.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(HOTELS_STRUCTURED_DATA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(BREADCRUMB_STRUCTURED_DATA)}
        </script>

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="alternate" type="application/rss+xml" title="BudQuest Hotels RSS" href="https://greenglobe.com/hotels/rss.xml" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* SEO-Friendly HERO SECTION */}
            <header className="max-w-4xl mx-auto mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                {query ? `420-Friendly Hotels in ${query}` : 'Verified 420-Friendly Hotels Worldwide'}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {getMetaDescription}
              </p>
              
              {/* SEO Stats */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {SEO_DATA.totalHotels}+
                  </Badge>
                  <span>Verified Hotels</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    {SEO_DATA.countries.length}+
                  </Badge>
                  <span>Countries</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                    {SEO_DATA.cities.length}+
                  </Badge>
                  <span>Cities</span>
                </div>
              </div>
            </header>

            {/* SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-border p-3 mb-8 max-w-4xl mx-auto shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    placeholder="Search 420-friendly hotels, cities, states, countries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border-none focus:outline-none focus:ring-1 focus:ring-accent text-white text-sm"
                    aria-label="Search 420-friendly hotels"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="gap-1 border-border text-xs sm:text-sm"
                    aria-label="Filter hotels"
                  >
                    <Filter className="w-3 h-3" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-2 py-2 rounded-lg bg-card border border-border text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent min-w-20"
                    aria-label="Sort hotels by"
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
                          aria-label={`Filter by ${filter.label}`}
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
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20"
                          aria-label="Clear all filters"
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

            {/* SEO-Friendly RESULTS COUNT */}
            {hasActiveFilters && (
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Found <span className="text-accent font-semibold">{filteredData.length}</span> 420-friendly hotels
                  {query && ` in ${query}`}
                  {activeFilter !== 'all' && ` matching ${activeFilter} filter`}
                </p>
              </div>
            )}

            {/* SEO-Friendly RESULTS with semantic HTML */}
            <section aria-label="420-friendly hotel listings">
              {filteredData.length === 0 ? (
                <div className="text-center text-muted-foreground py-8" role="status" aria-live="polite">
                  <Building className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h2 className="text-lg font-semibold mb-2">No 420-friendly hotels found</h2>
                  <p className="text-base mb-4">No verified cannabis-friendly accommodations match your search criteria.</p>
                  <p className="text-xs mb-4">Try a different city, country, or adjust your filters.</p>
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
                </div>
              ) : (
                <div className="space-y-8">
                  {groupedHotels.map((countryGroup) => (
                    <article key={countryGroup.country} className="border border-border rounded-xl bg-card/50">
                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 md:p-5 hover:bg-card transition-colors rounded-t-xl">
                          <div className="flex items-center gap-3">
                            <img 
                              src={countryGroup.flag} 
                              alt={`Flag of ${countryGroup.country}`} 
                              className="h-5 w-7 rounded border border-border shadow-sm" 
                            />
                            <div className="text-left">
                              <h2 className="text-lg md:text-xl font-bold text-white">
                                420-Friendly Hotels in {countryGroup.country}
                              </h2>
                              <p className="text-xs text-muted-foreground">
                                {countryGroup.states.reduce((total, state) => 
                                  total + state.cities.reduce((cityTotal, city) => 
                                    cityTotal + city.hotels.length, 0
                                  ), 0
                                )} cannabis-friendly accommodations
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-accent ui-open:rotate-180 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t border-border/50 space-y-6">
                          {countryGroup.states.map((stateGroup) => (
                            <section key={stateGroup.state}>
                              <Collapsible defaultOpen>
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-background transition-colors rounded-lg">
                                  <h3 className="text-base font-semibold text-accent">
                                    {stateGroup.state} 420-Friendly Hotels
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-background/50 text-xs">
                                      {stateGroup.cities.length} cities
                                    </Badge>
                                    <ChevronDown className="w-3 h-3 text-accent ui-open:rotate-180 transition-transform" />
                                  </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-3 space-y-4">
                                  {stateGroup.cities.map((cityGroup) => (
                                    <div key={cityGroup.city} className="space-y-3">
                                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-gold" />
                                        Cannabis-Friendly Hotels in {cityGroup.city}
                                        <Badge className="bg-gold/10 text-gold border border-gold/30 text-xs">
                                          {cityGroup.hotels.length} {cityGroup.hotels.length === 1 ? 'Hotel' : 'Hotels'}
                                        </Badge>
                                      </h4>
                                      <div className="grid grid-cols-1 gap-3" role="list" aria-label={`Hotels in ${cityGroup.city}`}>
                                        {cityGroup.hotels.map((hotel) => (
                                          <div key={hotel.id} role="listitem">
                                            <HotelCard hotel={hotel} />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            </section>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* SEO-Focused Internal Linking */}
            <nav aria-label="Related cannabis travel guides" className="mt-8">
              <Card className="p-6 bg-card/30 border-border">
                <h2 className="text-lg font-bold text-white mb-4">Explore More Cannabis Travel Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <Link 
                    to="/usa" 
                    className="p-3 rounded-lg bg-background/50 hover:bg-background transition-colors border border-border"
                  >
                    <h3 className="font-semibold text-white mb-1">🇺🇸 USA Cannabis Guide</h3>
                    <p className="text-muted-foreground text-xs">State-by-state guide to cannabis laws and 420-friendly accommodations</p>
                  </Link>
                  <Link 
                    to="/canada" 
                    className="p-3 rounded-lg bg-background/50 hover:bg-background transition-colors border border-border"
                  >
                    <h3 className="font-semibold text-white mb-1">🇨🇦 Canada Cannabis Guide</h3>
                    <p className="text-muted-foreground text-xs">Complete guide to legal cannabis and 420-friendly stays in Canada</p>
                  </Link>
                  <Link 
                    to="/europe" 
                    className="p-3 rounded-lg bg-background/50 hover:bg-background transition-colors border border-border"
                  >
                    <h3 className="font-semibold text-white mb-1">🇪🇺 Europe Cannabis Guide</h3>
                    <p className="text-muted-foreground text-xs">Navigating cannabis laws and accommodations across Europe</p>
                  </Link>
                </div>
              </Card>
            </nav>

            {/* Enhanced DISCLAIMER with SEO context */}
            <aside className="mt-8" aria-label="Legal disclaimer">
              <Card className="p-4 bg-card/50 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">Legal Disclaimer & Travel Advisory</span>
                </div>
                <p className="text-xs text-red-400/90">
                  BudQuest provides information about 420-friendly hotels and cannabis tourism for educational purposes only. 
                  We do not provide legal advice. Cannabis laws vary by jurisdiction and change frequently. 
                  Always verify current local regulations before traveling or consuming cannabis. 
                  International transportation of cannabis remains illegal. Consume responsibly and be aware of local laws.
                </p>
              </Card>
            </aside>

            {/* SEO Footer Links */}
            <footer className="mt-8 text-center">
              <nav aria-label="Site navigation">
                <p className="text-sm text-muted-foreground mb-4">
                  Explore more cannabis travel resources:
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link to="/blog/cannabis-travel-tips" className="text-accent hover:underline">
                    Cannabis Travel Tips
                  </Link>
                  <Link to="/guide/420-friendly-airbnb" className="text-accent hover:underline">
                    420-Friendly Airbnb Guide
                  </Link>
                  <Link to="/resources/cannabis-laws" className="text-accent hover:underline">
                    Cannabis Laws by Country
                  </Link>
                  <Link to="/contact" className="text-accent hover:underline">
                    Submit a Hotel
                  </Link>
                </div>
              </nav>
            </footer>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

// Cloud icon component
const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
  </svg>
);

export default Hotels;
