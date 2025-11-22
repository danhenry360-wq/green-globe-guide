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
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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

  // Update document title and meta tags
  useEffect(() => {
    document.title = getPageTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', getMetaDescription);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://greenglobe.com/hotels');

    const structuredDataScript = document.createElement('script');
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.textContent = JSON.stringify(HOTELS_STRUCTURED_DATA);
    document.head.appendChild(structuredDataScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(BREADCRUMB_STRUCTURED_DATA);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(structuredDataScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, [getPageTitle, getMetaDescription]);

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
      {/* Inline SEO meta tags for initial load */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOTELS_STRUCTURED_DATA) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_STRUCTURED_DATA) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* LIQUID GLASS HERO SECTION */}
            <header className="max-w-4xl mx-auto mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                  {query ? `420-Friendly Hotels in ${query}` : 'Verified 420-Friendly Hotels Worldwide'}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  {getMetaDescription}
                </p>
                
                {/* Liquid Glass Stats */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1 backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    <Badge variant="secondary" className="bg-green-500/30 text-green-300 border-green-500/50">
                      {SEO_DATA.totalHotels}+
                    </Badge>
                    <span>Verified Hotels</span>
                  </div>
                  <div className="flex items-center gap-1 backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    <Badge variant="secondary" className="bg-purple-500/30 text-purple-300 border-purple-500/50">
                      {SEO_DATA.countries.length}+
                    </Badge>
                    <span>Countries</span>
                  </div>
                  <div className="flex items-center gap-1 backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    <Badge variant="secondary" className="bg-amber-500/30 text-amber-300 border-amber-500/50">
                      {SEO_DATA.cities.length}+
                    </Badge>
                    <span>Cities</span>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* LIQUID GLASS SEARCH & FILTERS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-20 z-10 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 mb-8 max-w-4xl mx-auto shadow-2xl shadow-purple-500/10"
            >
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                  <input
                    type="text"
                    placeholder="Search 420-friendly hotels, cities, states, countries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 text-white text-sm transition-all duration-300 placeholder-gray-400"
                    aria-label="Search 420-friendly hotels"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
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
                    className="gap-2 backdrop-blur-sm bg-white/5 border border-white/20 text-green-300 hover:bg-green-500/20 hover:text-green-200 hover:border-green-400 text-sm transition-all duration-300"
                    aria-label="Filter hotels"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-3 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 text-green-300 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
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

              {/* LIQUID GLASS FILTER CHIPS */}
              <AnimatePresence>
                {(isFilterOpen || hasActiveFilters) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/20">
                      {filterOptions.map((filter) => (
                        <motion.button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                            activeFilter === filter.value
                              ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white shadow-lg shadow-green-500/25'
                              : 'bg-white/5 text-gray-300 hover:text-green-300 hover:bg-white/10 border border-white/10'
                          }`}
                          aria-label={`Filter by ${filter.label}`}
                        >
                          {filter.icon}
                          {filter.label}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            activeFilter === filter.value 
                              ? 'bg-white/20 text-white' 
                              : 'bg-white/10 text-gray-400'
                          }`}>
                            {filter.count}
                          </span>
                        </motion.button>
                      ))}
                      
                      {hasActiveFilters && (
                        <motion.button
                          onClick={clearFilters}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
                          aria-label="Clear all filters"
                        >
                          <X className="w-4 h-4" />
                          Clear
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* LIQUID GLASS RESULTS COUNT */}
            {hasActiveFilters && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-6"
              >
                <p className="text-base text-gray-300 backdrop-blur-sm bg-white/5 rounded-full px-4 py-2 border border-white/10 inline-block">
                  Found <span className="text-green-400 font-semibold">{filteredData.length}</span> 420-friendly hotels
                  {query && ` in ${query}`}
                  {activeFilter !== 'all' && ` matching ${activeFilter} filter`}
                </p>
              </motion.div>
            )}

            {/* LIQUID GLASS RESULTS - MANUAL EXPANSION */}
            <section aria-label="420-friendly hotel listings">
              {filteredData.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-300 py-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10"
                  role="status" 
                  aria-live="polite"
                >
                  <Building className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h2 className="text-lg font-semibold mb-2">No 420-friendly hotels found</h2>
                  <p className="text-base mb-4">No verified cannabis-friendly accommodations match your search criteria.</p>
                  <p className="text-sm mb-4">Try a different city, country, or adjust your filters.</p>
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearFilters} 
                      variant="outline" 
                      size="sm"
                      className="mt-3 gap-2 backdrop-blur-sm bg-white/5 border border-white/20 text-green-300 hover:bg-green-500/20"
                    >
                      <X className="w-4 h-4" />
                      Clear Search & Filters
                    </Button>
                  )}
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {groupedHotels.map((countryGroup, index) => (
                    <motion.article 
                      key={countryGroup.country}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden"
                    >
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-6 hover:bg-white/10 transition-all duration-300 group">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img 
                                src={countryGroup.flag} 
                                alt={`Flag of ${countryGroup.country}`} 
                                className="h-8 w-12 rounded-lg border border-white/20 shadow-lg" 
                              />
                              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-lg blur-sm group-hover:from-green-500/30 group-hover:to-purple-500/30 transition-all" />
                            </div>
                            <div className="text-left">
                              <h2 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                                🌿 420-Friendly Hotels in {countryGroup.country}
                              </h2>
                              <p className="text-sm text-gray-400 group-hover:text-green-400/80 transition-colors">
                                {countryGroup.states.reduce((total, state) => 
                                  total + state.cities.reduce((cityTotal, city) => 
                                    cityTotal + city.hotels.length, 0
                                  ), 0
                                )} cannabis-friendly accommodations
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5 text-green-400 group-hover:scale-110 ui-open:rotate-180 transition-transform duration-300" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-6 border-t border-white/10 space-y-6">
                          {countryGroup.states.map((stateGroup) => (
                            <section key={stateGroup.state}>
                              <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/10 transition-all duration-300 rounded-xl group">
                                  <h3 className="text-lg font-semibold text-green-300 group-hover:text-green-200">
                                    🍃 {stateGroup.state} 420-Friendly Hotels
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="backdrop-blur-sm bg-white/5 text-green-300 border-white/20 text-sm">
                                      {stateGroup.cities.length} cities
                                    </Badge>
                                    <ChevronDown className="w-4 h-4 text-green-400 group-hover:scale-110 ui-open:rotate-180 transition-transform duration-300" />
                                  </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-4 space-y-4">
                                  {stateGroup.cities.map((cityGroup) => (
                                    <div key={cityGroup.city} className="space-y-3">
                                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-amber-400" />
                                        Cannabis-Friendly Hotels in {cityGroup.city}
                                        <Badge className="backdrop-blur-sm bg-amber-500/20 text-amber-300 border-amber-500/30 text-sm">
                                          {cityGroup.hotels.length} {cityGroup.hotels.length === 1 ? 'Hotel' : 'Hotels'}
                                        </Badge>
                                      </h4>
                                      <div className="grid grid-cols-1 gap-4" role="list" aria-label={`Hotels in ${cityGroup.city}`}>
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
                    </motion.article>
                  ))}
                </div>
              )}
            </section>

            {/* LIQUID GLASS INTERNAL LINKING */}
            <motion.nav 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              aria-label="Related cannabis travel guides" 
              className="mt-8"
            >
              <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/10">
                <h2 className="text-lg font-bold text-white mb-4">🌱 Explore More Cannabis Travel Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <Link 
                    to="/usa" 
                    className="p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-green-400/30 group"
                  >
                    <h3 className="font-semibold text-white mb-1">🇺🇸 USA Cannabis Guide</h3>
                    <p className="text-gray-400 text-sm group-hover:text-green-400/80 transition-colors">State-by-state guide to cannabis laws and 420-friendly accommodations</p>
                  </Link>
                  <Link 
                    to="/canada" 
                    className="p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-400/30 group"
                  >
                    <h3 className="font-semibold text-white mb-1">🇨🇦 Canada Cannabis Guide</h3>
                    <p className="text-gray-400 text-sm group-hover:text-purple-400/80 transition-colors">Complete guide to legal cannabis and 420-friendly stays in Canada</p>
                  </Link>
                  <Link 
                    to="/europe" 
                    className="p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-amber-400/30 group"
                  >
                    <h3 className="font-semibold text-white mb-1">🇪🇺 Europe Cannabis Guide</h3>
                    <p className="text-gray-400 text-sm group-hover:text-amber-400/80 transition-colors">Navigating cannabis laws and accommodations across Europe</p>
                  </Link>
                </div>
              </Card>
            </motion.nav>

            {/* LIQUID GLASS DISCLAIMER */}
            <motion.aside 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8" 
              aria-label="Legal disclaimer"
            >
              <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">🚨 Legal Disclaimer & Travel Advisory</span>
                </div>
                <p className="text-sm text-red-400/90">
                  BudQuest provides information about 420-friendly hotels and cannabis tourism for educational purposes only. 
                  We do not provide legal advice. Cannabis laws vary by jurisdiction and change frequently. 
                  Always verify current local regulations before traveling or consuming cannabis. 
                  International transportation of cannabis remains illegal. Consume responsibly and be aware of local laws.
                </p>
              </Card>
            </motion.aside>

            {/* LIQUID GLASS FOOTER LINKS */}
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <nav aria-label="Site navigation">
                <p className="text-base text-gray-400 mb-4">
                  Explore more cannabis travel resources:
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-base">
                  <Link to="/blog/cannabis-travel-tips" className="text-green-400 hover:text-green-300 hover:underline transition-colors backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    Cannabis Travel Tips
                  </Link>
                  <Link to="/guide/420-friendly-airbnb" className="text-green-400 hover:text-green-300 hover:underline transition-colors backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    420-Friendly Airbnb Guide
                  </Link>
                  <Link to="/resources/cannabis-laws" className="text-green-400 hover:text-green-300 hover:underline transition-colors backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    Cannabis Laws by Country
                  </Link>
                  <Link to="/contact" className="text-green-400 hover:text-green-300 hover:underline transition-colors backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    Submit a Hotel
                  </Link>
                </div>
              </nav>
            </motion.footer>
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
