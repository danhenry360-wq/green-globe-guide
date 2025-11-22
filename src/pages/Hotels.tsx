// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Search, Building, Info, Filter, X, Store, Star, Users } from "lucide-react";
import { HotelCard } from "@/components/HotelCard";
import { Hotel, CountryHotels } from "@/types/data";
import { HOTEL_DATA } from "@/data/hotel_data";
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ============================================
   CANNABIS RETAILER TYPES
============================================ */
interface CannabisRetailer {
  id: string;
  businessName: string;
  legalName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  licenseNumber: string;
  licenseStatus: string;
  businessType: string;
  retailType: string;
  distance: string;
  rating: number;
  reviewCount: number;
  isPremium?: boolean;
  isBudget?: boolean;
  hasSmoking?: boolean;
  hasVaping?: boolean;
  hasEdibles?: boolean;
}

interface RetailerReview {
  id: string;
  retailerId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

/* ============================================
   CANNABIS RETAILER DATA
============================================ */
const CANNABIS_RETAILERS: CannabisRetailer[] = [
  {
    id: 'retailer-1',
    businessName: 'LA ORGANIC PHARMACY INC',
    legalName: 'La Organic Pharmacy Inc',
    address: '5728 Washington Blvd W',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90016',
    licenseNumber: 'C10-0000450-LIC',
    licenseStatus: 'Active',
    businessType: 'Commercial - Retailer',
    retailType: 'Adult-Use and Medicinal',
    distance: '1.5 miles away',
    rating: 4.2,
    reviewCount: 47,
    isPremium: true,
    hasSmoking: true,
    hasVaping: true,
    hasEdibles: true
  },
  {
    id: 'retailer-2',
    businessName: 'GREEN DOOR DISPENSARY',
    legalName: 'Green Door Collective',
    address: '123 Main Street',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90015',
    licenseNumber: 'C10-0000451-LIC',
    licenseStatus: 'Active',
    businessType: 'Commercial - Retailer',
    retailType: 'Adult-Use and Medicinal',
    distance: '2.1 miles away',
    rating: 4.5,
    reviewCount: 32,
    isPremium: false,
    isBudget: true,
    hasSmoking: true,
    hasVaping: true,
    hasEdibles: false
  },
  {
    id: 'retailer-3',
    businessName: 'MEDICAL CANNABIS CENTER',
    legalName: 'Medical Cannabis Center LLC',
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    licenseNumber: 'C10-0000452-LIC',
    licenseStatus: 'Active',
    businessType: 'Commercial - Retailer',
    retailType: 'Medicinal Only',
    distance: '0.8 miles away',
    rating: 4.8,
    reviewCount: 89,
    isPremium: true,
    hasSmoking: false,
    hasVaping: true,
    hasEdibles: true
  }
];

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const generateStructuredData = (hotelCount: number, retailerCount: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420-Friendly Hotels & Cannabis Retailers",
  description: "Discover and book BudQuest-verified 420-friendly hotels and licensed cannabis retailers across USA, Canada, Netherlands, and worldwide.",
  url: "https://budquest.com/hotels",
  mainEntity: {
    "@type": "ItemList",
    name: "420-Friendly Hotels & Retailers Collection",
    description: `Browse ${hotelCount} verified cannabis-friendly hotels and ${retailerCount} licensed retailers by location`,
    numberOfItems: hotelCount + retailerCount,
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
type ViewType = 'hotels' | 'retailers' | 'all';

const Hotels = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('hotels');
  const [retailerReviews, setRetailerReviews] = useState<RetailerReview[]>([]);
  const [newReview, setNewReview] = useState({
    retailerId: '',
    userName: '',
    rating: 5,
    comment: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Clean and prepare hotel data
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

  // Filter and sort hotel data
  const filteredHotels = useMemo(() => {
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

  // Filter and sort retailer data
  const filteredRetailers = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    let allRetailers = [...CANNABIS_RETAILERS];

    if (q) {
      allRetailers = allRetailers.filter(r => 
        r.businessName.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.legalName.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== 'all') {
      allRetailers = allRetailers.filter(retailer => {
        switch (activeFilter) {
          case 'premium': return retailer.isPremium;
          case 'budget': return retailer.isBudget;
          case 'smoking': return retailer.hasSmoking;
          case 'vaping': return retailer.hasVaping;
          case 'edibles': return retailer.hasEdibles;
          default: return true;
        }
      });
    }

    return [...allRetailers].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.businessName.localeCompare(b.businessName);
        case 'rating': return b.rating - a.rating;
        case 'price-low': return (a.isBudget ? 0 : 1) - (b.isBudget ? 0 : 1);
        case 'price-high': return (b.isBudget ? 0 : 1) - (a.isBudget ? 0 : 1);
        default: return 0;
      }
    });
  }, [query, activeFilter, sortBy]);

  // Combined data for "all" view
  const combinedData = useMemo(() => {
    return [...filteredHotels, ...filteredRetailers];
  }, [filteredHotels, filteredRetailers]);

  // Group hotels for display
  const groupedHotels = useMemo(() => {
    const groups: { country: string; flag: string; states: { state: string; cities: { city: string; hotels: typeof filteredHotels }[] }[] }[] = [];

    filteredHotels.forEach(hotel => {
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
  }, [filteredHotels]);

  // Group retailers by state and city
  const groupedRetailers = useMemo(() => {
    const groups: { state: string; cities: { city: string; retailers: CannabisRetailer[] }[] }[] = [];

    filteredRetailers.forEach(retailer => {
      let stateGroup = groups.find(g => g.state === retailer.state);
      if (!stateGroup) {
        stateGroup = { state: retailer.state, cities: [] };
        groups.push(stateGroup);
      }

      let cityGroup = stateGroup.cities.find(c => c.city === retailer.city);
      if (!cityGroup) {
        cityGroup = { city: retailer.city, retailers: [] };
        stateGroup.cities.push(cityGroup);
      }

      cityGroup.retailers.push(retailer);
    });

    return groups;
  }, [filteredRetailers]);

  // Filter handlers
  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilter('all');
    setSortBy('rating');
    setIsFilterOpen(false);
  }, []);

  // Review handlers
  const handleAddReview = (retailerId: string) => {
    if (newReview.userName && newReview.comment) {
      const review: RetailerReview = {
        id: Date.now().toString(),
        retailerId,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString()
      };
      
      setRetailerReviews([...retailerReviews, review]);
      setNewReview({ retailerId: '', userName: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${size === "lg" ? "text-lg" : "text-sm"} ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
        <span className={`ml-2 ${size === "lg" ? "text-sm" : "text-xs"} text-gray-400`}>
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  const filterOptions = [
    { value: 'all' as FilterType, label: 'All', count: activeView === 'hotels' ? filteredHotels.length : activeView === 'retailers' ? filteredRetailers.length : combinedData.length },
    { value: 'premium' as FilterType, label: 'Premium', count: activeView === 'hotels' ? filteredHotels.filter(h => h.isPremium).length : activeView === 'retailers' ? filteredRetailers.filter(r => r.isPremium).length : combinedData.filter(item => 'isPremium' in item && item.isPremium).length },
    { value: 'budget' as FilterType, label: 'Budget', count: activeView === 'hotels' ? filteredHotels.filter(h => h.isBudget).length : activeView === 'retailers' ? filteredRetailers.filter(r => r.isBudget).length : combinedData.filter(item => 'isBudget' in item && item.isBudget).length },
    { value: 'smoking' as FilterType, label: 'Smoking', count: activeView === 'hotels' ? filteredHotels.filter(h => h.hasSmoking).length : activeView === 'retailers' ? filteredRetailers.filter(r => r.hasSmoking).length : combinedData.filter(item => 'hasSmoking' in item && item.hasSmoking).length },
    { value: 'vaping' as FilterType, label: 'Vaping', count: activeView === 'hotels' ? filteredHotels.filter(h => h.hasVaping).length : activeView === 'retailers' ? filteredRetailers.filter(r => r.hasVaping).length : combinedData.filter(item => 'hasVaping' in item && item.hasVaping).length },
    { value: 'edibles' as FilterType, label: 'Edibles', count: activeView === 'hotels' ? filteredHotels.filter(h => h.hasEdibles).length : activeView === 'retailers' ? filteredRetailers.filter(r => r.hasEdibles).length : combinedData.filter(item => 'hasEdibles' in item && item.hasEdibles).length },
  ];

  const sortOptions = [
    { value: 'rating' as SortType, label: 'Highest Rated' },
    { value: 'price-low' as SortType, label: 'Price: Low to High' },
    { value: 'price-high' as SortType, label: 'Price: High to Low' },
    { value: 'name' as SortType, label: 'Alphabetical' },
  ];

  const hasActiveFilters = query || activeFilter !== 'all';

  const getDisplayCount = () => {
    switch (activeView) {
      case 'hotels': return filteredHotels.length;
      case 'retailers': return filteredRetailers.length;
      case 'all': return combinedData.length;
      default: return 0;
    }
  };

  return (
    <>
      <Helmet>
        <title>BudQuest Verified 420-Friendly Hotels & Cannabis Retailers | Complete Cannabis Travel Guide</title>
        <meta name="description" content="Discover BudQuest-verified 420-friendly hotels and licensed cannabis retailers worldwide. Browse cannabis-friendly accommodations and dispensaries by location." />
        <meta name="keywords" content="420 friendly hotels, cannabis retailers, licensed dispensaries, BudQuest verified, marijuana accommodation, weed friendly hotels, cannabis travel, USA hotels, Canada hotels, Netherlands hotels" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://budquest.com/hotels" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels & Cannabis Retailers" />
        <meta property="og:description" content="Browse and book verified 420-friendly hotels and licensed cannabis retailers across USA, Canada, Netherlands, and worldwide." />
        <meta property="og:url" content="https://budquest.com/hotels" />
        <meta property="og:site_name" content="BudQuest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels & Retailers" />
        <meta name="twitter:description" content="Book cannabis-friendly hotels and find licensed retailers worldwide with BudQuest verification." />
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(filteredHotels.length, filteredRetailers.length))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                Verified 420-Friendly Stays & Retailers
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-3">
                Discover cannabis-friendly accommodations and licensed retailers worldwide
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80">
                {filteredHotels.length} verified hotels • {filteredRetailers.length} licensed retailers • Policies checked
              </p>
            </section>

            {/* VIEW TOGGLE */}
            <div className="flex justify-center mb-8">
              <Tabs value={activeView} onValueChange={(value) => setActiveView(value as ViewType)} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border/30 rounded-2xl p-1">
                  <TabsTrigger 
                    value="hotels" 
                    className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all"
                  >
                    <Building className="w-4 h-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger 
                    value="retailers" 
                    className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all"
                  >
                    <Store className="w-4 h-4" />
                    Retailers
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all"
                  >
                    <Users className="w-4 h-4" />
                    All
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* SEARCH & FILTERS */}
            <div className="sticky top-20 z-10 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-6 mb-10 max-w-4xl mx-auto shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <label htmlFor="hotel-search" className="sr-only">Search {activeView}</label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    id="hotel-search"
                    type="text"
                    placeholder={`Search ${activeView === 'hotels' ? 'hotels' : activeView === 'retailers' ? 'retailers' : 'hotels and retailers'}, cities, states...`}
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
                  Found <span className="text-accent font-bold text-lg">{getDisplayCount()}</span> {activeView === 'hotels' ? 'hotels' : activeView === 'retailers' ? 'retailers' : 'results'}
                  {query && ` matching "${query}"`}
                </p>
              </div>
            )}

            {/* RESULTS */}
            {getDisplayCount() === 0 ? (
              <div className="text-center py-16">
                <Building className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-muted-foreground/40" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">No {activeView} found</h2>
                <p className="text-muted-foreground text-base mb-2">No verified {activeView === 'hotels' ? '420-friendly hotels' : activeView === 'retailers' ? 'licensed retailers' : 'results'} match your search.</p>
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
                {/* HOTELS VIEW */}
                {activeView === 'hotels' && groupedHotels.map((countryGroup, idx) => (
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

                {/* RETAILERS VIEW */}
                {activeView === 'retailers' && groupedRetailers.map((stateGroup, idx) => (
                  <motion.div
                    key={stateGroup.state}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Collapsible className="border border-border/50 rounded-2xl bg-card/40 backdrop-blur-sm overflow-hidden hover:border-border/70 transition-all">
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-5 sm:p-7 hover:bg-card/60 transition-colors group">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="h-7 w-10 rounded-lg bg-gradient-to-r from-green-600 to-green-400 border border-border/50 shadow-md flex items-center justify-center flex-shrink-0">
                            <Store className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors">{stateGroup.state}</h2>
                            <p className="text-sm text-muted-foreground">
                              {stateGroup.cities.reduce((total, city) => total + city.retailers.length, 0)} licensed retailers
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:scale-110 transition-transform flex-shrink-0 ui-open:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-5 sm:p-7 border-t border-border/30 space-y-4">
                        {stateGroup.cities.map((cityGroup) => (
                          <Collapsible key={cityGroup.city} className="rounded-xl bg-background/40 border border-border/30 overflow-hidden">
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-background/60 transition-colors group">
                              <h3 className="text-lg font-semibold text-accent group-hover:text-accent/80 transition-colors flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {cityGroup.city}
                              </h3>
                              <ChevronDown className="w-5 h-5 text-accent group-hover:scale-110 transition-transform ui-open:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 border-t border-border/30 space-y-4">
                              {cityGroup.retailers.map((retailer) => (
                                <Card key={retailer.id} className="p-4 bg-card/50 border border-border/30 hover:border-accent/30 transition-all">
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-bold text-white">{retailer.businessName}</h4>
                                    <StarRating rating={retailer.rating} />
                                  </div>
                                  
                                  <div className="space-y-2 mb-4">
                                    <p className="text-sm text-muted-foreground">{retailer.address}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {retailer.city}, {retailer.state} {retailer.zipCode}
                                    </p>
                                    <p className="text-green-400 text-sm">{retailer.distance}</p>
                                  </div>

                                  {/* License Info */}
                                  <div className="mb-4 p-3 bg-green-950/20 border border-green-500/30 rounded-lg">
                                    <div className="flex items-center mb-2">
                                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                      <span className="text-green-400 font-semibold text-sm">
                                        {retailer.licenseStatus}
                                      </span>
                                    </div>
                                    <p className="text-xs text-green-300">License: {retailer.licenseNumber}</p>
                                    <p className="text-xs text-green-300">{retailer.retailType}</p>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => {
                                        setNewReview(prev => ({ ...prev, retailerId: retailer.id }));
                                        setShowReviewForm(true);
                                      }}
                                      size="sm"
                                      className="flex-1 bg-accent hover:bg-accent/80 text-white"
                                    >
                                      <Star className="w-4 h-4 mr-1" />
                                      Review
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 border-border/50 hover:bg-accent/10"
                                    >
                                      Directions
                                    </Button>
                                  </div>

                                  {/* Recent Reviews */}
                                  {retailerReviews.filter(r => r.retailerId === retailer.id).length > 0 && (
                                    <div className="mt-4 border-t border-border/30 pt-4">
                                      <h5 className="font-semibold text-sm mb-2">Recent Reviews</h5>
                                      {retailerReviews
                                        .filter(r => r.retailerId === retailer.id)
                                        .slice(0, 2)
                                        .map((review) => (
                                          <div key={review.id} className="mb-3 last:mb-0 text-sm">
                                            <div className="flex justify-between items-center mb-1">
                                              <span className="font-semibold">{review.userName}</span>
                                              <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                  <span
                                                    key={star}
                                                    className={`text-xs ${
                                                      star <= review.rating ? "text-yellow-400" : "text-gray-400"
                                                    }`}
                                                  >
                                                    ★
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                            <p className="text-muted-foreground text-xs">{review.comment}</p>
                                            <span className="text-gray-500 text-xs">{review.date}</span>
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </Card>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                ))}

                {/* ALL VIEW - Combined Display */}
                {activeView === 'all' && (
                  <div className="space-y-6">
                    {/* Hotels Section */}
                    {groupedHotels.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Building className="w-6 h-6 text-accent" />
                          420-Friendly Hotels
                        </h2>
                        <div className="space-y-4">
                          {groupedHotels.slice(0, 2).map((countryGroup) => (
                            <Collapsible key={countryGroup.country} className="border border-border/50 rounded-2xl bg-card/40 backdrop-blur-sm overflow-hidden">
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-card/60 transition-colors group">
                                <div className="flex items-center gap-4">
                                  <img 
                                    src={countryGroup.flag} 
                                    alt=""
                                    className="h-6 w-9 rounded-lg border border-border/50"
                                  />
                                  <h3 className="text-lg font-bold text-white">{countryGroup.country}</h3>
                                </div>
                                <ChevronDown className="w-5 h-5 text-accent ui-open:rotate-180" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-5 border-t border-border/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {countryGroup.states.flatMap(state => 
                                    state.cities.flatMap(city => 
                                      city.hotels.slice(0, 2)
                                    )
                                  ).map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} compact />
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Retailers Section */}
                    {groupedRetailers.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Store className="w-6 h-6 text-accent" />
                          Licensed Cannabis Retailers
                        </h2>
                        <div className="space-y-4">
                          {groupedRetailers.slice(0, 2).map((stateGroup) => (
                            <Collapsible key={stateGroup.state} className="border border-border/50 rounded-2xl bg-card/40 backdrop-blur-sm overflow-hidden">
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-card/60 transition-colors group">
                                <div className="flex items-center gap-4">
                                  <div className="h-6 w-9 rounded-lg bg-gradient-to-r from-green-600 to-green-400 border border-border/50 flex items-center justify-center">
                                    <Store className="w-4 h-4 text-white" />
                                  </div>
                                  <h3 className="text-lg font-bold text-white">{stateGroup.state}</h3>
                                </div>
                                <ChevronDown className="w-5 h-5 text-accent ui-open:rotate-180" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-5 border-t border-border/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {stateGroup.cities.flatMap(city => 
                                    city.retailers.slice(0, 2)
                                  ).map((retailer) => (
                                    <Card key={retailer.id} className="p-4 bg-card/50 border border-border/30">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white text-sm">{retailer.businessName}</h4>
                                        <StarRating rating={retailer.rating} size="sm" />
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">{retailer.address}</p>
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-xs h-7">
                                          Review
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-xs h-7">
                                          Directions
                                        </Button>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* REVIEW FORM MODAL */}
            <AnimatePresence>
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-border/50"
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">Add Your Review</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Your Name</label>
                        <input
                          type="text"
                          value={newReview.userName}
                          onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview({...newReview, rating: star})}
                              className={`text-xl ${
                                star <= newReview.rating ? "text-yellow-400" : "text-gray-400"
                              } hover:text-yellow-300 transition-colors`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Review</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm h-24 resize-none"
                          placeholder="Share your experience..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button
                        onClick={() => handleAddReview(newReview.retailerId)}
                        className="flex-1 bg-accent hover:bg-accent/80 text-white"
                      >
                        Submit Review
                      </Button>
                      <Button
                        onClick={() => setShowReviewForm(false)}
                        variant="outline"
                        className="flex-1 border-border/50 hover:bg-accent/10 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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
                <span className="text-muted-foreground/40">•</span>
                <Link 
                  to="/retailers" 
                  className="text-accent hover:text-accent/80 font-semibold transition-colors text-sm sm:text-base px-3 py-2 rounded-lg hover:bg-accent/10"
                >
                  All Retailers
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
