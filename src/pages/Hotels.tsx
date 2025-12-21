// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  MapPin,
  ExternalLink,
  Search,
  Building,
  Info,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  AlertTriangle,
} from "lucide-react";
import { Hotel, CountryHotels } from "@/types/data";
import { HOTEL_DATA } from "@/data/hotel_data";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const generateStructuredData = (rentalCount: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420 Rentals | Book Cannabis-Friendly Accommodations Worldwide",
  description: "Discover and book BudQuest-verified 420-friendly rentals across USA, Canada, Netherlands, and worldwide.",
  url: "https://budquest.guide/hotels",
  mainEntity: {
    "@type": "ItemList",
    name: "420-Friendly Rentals Collection",
    numberOfItems: rentalCount,
  },
  publisher: {
    "@type": "Organization",
    name: "BudQuest",
  },
});

/* ============================================
   TYPES
============================================ */
type FilterType = 'all' | 'premium' | 'budget' | 'smoking' | 'vaping' | 'edibles';
type SortType = 'rating' | 'price-low' | 'price-high' | 'name';

interface FilterState {
  country: string;
  state: string;
  type: FilterType;
  sort: SortType;
  search: string;
}

const ITEMS_PER_PAGE = 10;

/* ============================================
   HELPER COMPONENTS
============================================ */
const RentalCardSkeleton = () => (
  <Card className={cn(
    "p-3 sm:p-5 rounded-2xl border border-white/10",
    "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5"
  )}>
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-4 w-36 mb-3" />
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="pt-3 border-t border-white/10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    </div>
  </Card>
);

const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5 sm:gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i <= Math.round(value)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-600"
          }`}
      />
    ))}
    <span className="text-[10px] sm:text-xs text-muted-foreground ml-0.5 sm:ml-1 font-medium">
      {value.toFixed(1)}
    </span>
  </div>
);

/* ============================================
   PAGINATION COMPONENT
============================================ */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 px-4">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-bold text-green-400">{currentPage}</span> of{" "}
        <span className="font-bold text-green-400">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 hover:bg-green-400/10 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex gap-1">
          {visiblePages.map((page, idx) => {
            const isPrevEllipsis =
              idx > 0 && visiblePages[idx - 1] !== page - 1;
            const isNextEllipsis =
              idx < visiblePages.length - 1 &&
              visiblePages[idx + 1] !== page + 1;

            return (
              <div key={page}>
                {isPrevEllipsis && (
                  <span className="px-2 text-muted-foreground">...</span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === page
                    ? "bg-green-400 text-white"
                    : "bg-card/50 text-muted-foreground hover:bg-green-400/20 hover:text-white border border-white/10"
                    }`}
                >
                  {page}
                </button>
                {isNextEllipsis && (
                  <span className="px-2 text-muted-foreground">...</span>
                )}
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 hover:bg-green-400/10 disabled:opacity-50"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

/* ============================================
   FILTER PANEL COMPONENT
============================================ */
const FilterPanel = ({
  filters,
  onFilterChange,
  countries,
  states,
  filterCounts,
  isOpen,
  onClose,
}: {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  countries: string[];
  states: string[];
  filterCounts: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const filterOptions = [
    { value: 'all' as FilterType, label: 'All Rentals' },
    { value: 'premium' as FilterType, label: 'Premium' },
    { value: 'budget' as FilterType, label: 'Budget' },
    { value: 'smoking' as FilterType, label: 'Smoking Allowed' },
    { value: 'vaping' as FilterType, label: 'Vaping Allowed' },
    { value: 'edibles' as FilterType, label: 'Edibles Friendly' },
  ];

  const sortOptions = [
    { value: 'rating' as SortType, label: 'Highest Rated' },
    { value: 'price-low' as SortType, label: 'Price: Low to High' },
    { value: 'price-high' as SortType, label: 'Price: High to Low' },
    { value: 'name' as SortType, label: 'Alphabetical' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:static left-0 top-0 h-full md:h-auto z-50 w-80 md:w-64 bg-card/95 backdrop-blur-xl border-r md:border-r-0 border-white/10 overflow-y-auto md:overflow-visible"
          >
            <div className="p-6 space-y-6">
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-2 hover:bg-green-400/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Filters</h3>
              </div>

              {/* COUNTRY FILTER */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => {
                    onFilterChange("country", e.target.value);
                    onFilterChange("state", "");
                  }}
                  className="w-full px-3 py-2 bg-background/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40"
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-card">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATE FILTER */}
              {filters.country && (
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-3">
                    State/Province
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) => onFilterChange("state", e.target.value)}
                    className="w-full px-3 py-2 bg-background/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40"
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state} className="bg-card">
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* TYPE FILTER */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  Type
                </label>
                <div className="space-y-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange("type", option.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${filters.type === option.value
                        ? "bg-green-400 text-white"
                        : "bg-background/80 text-muted-foreground hover:text-white hover:bg-green-400/20 border border-white/10"
                        }`}
                    >
                      {option.label}
                      <span className="text-xs bg-muted/50 px-2 py-1 rounded">
                        {filterCounts[option.value] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => onFilterChange("sort", e.target.value)}
                  className="w-full px-3 py-2 bg-background/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-card">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={onClose}
                className="w-full md:hidden bg-green-400 hover:bg-green-500 text-white rounded-xl font-semibold py-3"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ============================================
   RENTAL CARD COMPONENT
============================================ */
interface ProcessedRental {
  id: string;
  name: string;
  city: string;
  country: string;
  countryFlag: string;
  stateName: string;
  rating: number;
  priceRange: string;
  policies: string;
  website: string;
  isBudget: boolean;
  isPremium: boolean;
  hasSmoking: boolean;
  hasVaping: boolean;
  hasEdibles: boolean;
  isVerified: boolean;
}

// Helper function to create URL-friendly slugs
const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface ProcessedRentalWithSlug extends ProcessedRental {
  slug?: string;
}

const RentalCard = ({ rental }: { rental: ProcessedRentalWithSlug }) => {
  // Use database slug if available, otherwise generate from name
  const slug = rental.slug || createSlug(rental.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <Link to={`/hotels/${slug}`}>
        <Card className={cn(
          "p-3 sm:p-5 rounded-2xl border border-white/10",
          "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
          "hover:shadow-lg hover:shadow-green-400/20 transition-all group cursor-pointer"
        )}>
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Header with name and badges */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
                  <h4 className="text-base sm:text-lg font-bold text-white break-words group-hover:text-green-400 transition-colors leading-tight">
                    {rental.name}
                  </h4>
                  {rental.isVerified && (
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400/40 text-[10px] sm:text-xs font-semibold gap-0.5 sm:gap-1 flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      BudQuest Verified
                    </Badge>
                  )}
                </div>

                {/* Location */}
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mb-2 sm:mb-3">
                  <MapPin className="w-3 h-3 text-green-400 flex-shrink-0" />
                  <span className="truncate">{rental.city}, {rental.stateName} ({rental.country})</span>
                </p>

                {/* Rating and Price */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <StarRating value={rental.rating} />
                  {rental.priceRange && (
                    <span className="text-xs sm:text-sm text-green-400 font-semibold">
                      {rental.priceRange}
                    </span>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <button
                className="inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-green-400 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg shrink-0"
              >
                View Details
              </button>
            </div>

            {/* Policy Section */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-[10px] sm:text-xs font-medium text-green-400/80 mb-1">420-Friendly Policy Highlights:</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {rental.policies}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

/* ============================================
   MAIN 420 RENTALS PAGE
============================================ */
const Hotels = () => {
  // Fetch hotels from database
  const { data: dbHotels, isLoading: dbLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Fetch ONLY database hotels (no static data)
  const DATA: CountryHotels[] = useMemo(() => {
    if (!dbHotels || dbHotels.length === 0) return [];

    // Convert DB hotels to the format expected by the component
    const dbHotelsFormatted: (Hotel & { isVerified?: boolean; slug?: string; amenitiesData?: any })[] = dbHotels.map((hotel, index) => {
      const amenities = hotel.amenities as { smoking?: boolean; vaping?: boolean; edibles?: boolean; price_range?: string } | null;
      const priceRange = amenities?.price_range || '$$';
      const validPriceRange = ['$$', '$$$', '$$$$'].includes(priceRange) ? priceRange as '$$' | '$$$' | '$$$$' : '$$';
      return {
        id: 9000 + index,
        name: hotel.name,
        city: hotel.address?.split(',')[0]?.trim() || 'Unknown',
        state: hotel.address?.split(',')[1]?.trim() || 'Unknown',
        rating: Number(hotel.rating) || 4.5,
        policies: hotel.policies || '',
        website: hotel.website || '#',
        priceRange: validPriceRange,
        affiliateLink: hotel.website || '#',
        description: hotel.policies || '',
        hasSmoking: amenities?.smoking ?? false,
        hasVaping: amenities?.vaping ?? false,
        hasEdibles: amenities?.edibles ?? false,
        isVerified: hotel.is_verified ?? false,
        slug: hotel.slug,
        amenitiesData: amenities,
      };
    });

    // Group by country and state
    const hotelsByCountryState = dbHotelsFormatted.reduce((acc, hotel) => {
      const country = 'USA'; // Default for now
      const state = hotel.state;

      if (!acc[country]) acc[country] = {};
      if (!acc[country][state]) acc[country][state] = [];
      acc[country][state].push(hotel);

      return acc;
    }, {} as Record<string, Record<string, Hotel[]>>);

    // Convert to CountryHotels format
    const dbData: CountryHotels[] = Object.entries(hotelsByCountryState).map(([country, states]) => ({
      country,
      slug: country.toLowerCase(),
      flagPath: '/flags/usa.png',
      states: Object.entries(states).map(([stateName, hotels]) => ({
        stateName,
        slug: stateName.toLowerCase().replace(/\s+/g, '-'),
        hotels,
      })),
    }));

    // Return ONLY database hotels
    return dbData;
  }, [dbHotels]);

  const [filters, setFilters] = useState<FilterState>({
    country: '',
    state: '',
    type: 'all',
    sort: 'rating',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Process and flatten data
  const processedData = useMemo(() => {
    return DATA.flatMap(country =>
      country.states.flatMap(state =>
        state.hotels.map(hotel => {
          const hotelAny = hotel as any;
          return {
            id: String(hotel.id || `${country.country}-${state.stateName}-${hotel.name}`),
            name: hotel.name,
            city: hotel.city,
            country: country.country,
            countryFlag: country.flagPath,
            stateName: state.stateName.replace(/\s*\(.*\)$/, ''),
            rating: hotel.rating,
            priceRange: hotel.priceRange,
            policies: hotel.policies || '',
            website: hotel.website,
            slug: hotelAny.slug,
            isBudget: hotel.priceRange === '$$',
            isPremium: hotel.priceRange === '$$$$' || hotel.priceRange === '$$$',
            hasSmoking: hotelAny.hasSmoking ?? hotel.hasSmoking ?? false,
            hasVaping: hotelAny.hasVaping ?? hotel.hasVaping ?? false,
            hasEdibles: hotelAny.hasEdibles ?? hotel.hasEdibles ?? false,
            isVerified: hotelAny.isVerified ?? false,
          };
        })
      )
    );
  }, [DATA]);

  // Get unique countries and states
  const countries = useMemo(() =>
    Array.from(new Set(processedData.map(h => h.country))).sort(),
    [processedData]
  );

  const states = useMemo(() => {
    if (!filters.country) return [];
    return Array.from(
      new Set(
        processedData
          .filter(h => h.country === filters.country)
          .map(h => h.stateName)
      )
    ).sort();
  }, [processedData, filters.country]);

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...processedData];
    const q = filters.search.toLowerCase().trim();

    // Country filter
    if (filters.country) {
      result = result.filter(h => h.country === filters.country);
    }

    // State filter
    if (filters.state) {
      result = result.filter(h => h.stateName === filters.state);
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(h => {
        switch (filters.type) {
          case 'premium': return h.isPremium;
          case 'budget': return h.isBudget;
          case 'smoking': return h.hasSmoking;
          case 'vaping': return h.hasVaping;
          case 'edibles': return h.hasEdibles;
          default: return true;
        }
      });
    }

    // Search filter
    if (q) {
      result = result.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.stateName.toLowerCase().includes(q) ||
        h.policies?.toLowerCase().includes(q)
      );
    }

    // Sort
    const priceOrder: Record<string, number> = { '$$': 1, '$$$': 2, '$$$$': 3 };
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'price-low': return (priceOrder[a.priceRange] || 0) - (priceOrder[b.priceRange] || 0);
        case 'price-high': return (priceOrder[b.priceRange] || 0) - (priceOrder[a.priceRange] || 0);
        default: return 0;
      }
    });

    return result;
  }, [processedData, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Filter counts
  const filterCounts = useMemo(() => ({
    all: processedData.length,
    premium: processedData.filter(h => h.isPremium).length,
    budget: processedData.filter(h => h.isBudget).length,
    smoking: processedData.filter(h => h.hasSmoking).length,
    vaping: processedData.filter(h => h.hasVaping).length,
    edibles: processedData.filter(h => h.hasEdibles).length,
  }), [processedData]);

  // Handlers
  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      country: '',
      state: '',
      type: 'all',
      sort: 'rating',
      search: '',
    });
    setCurrentPage(1);
    setIsFilterOpen(false);
  }, []);

  const hasActiveFilters = filters.search || filters.country || filters.state || filters.type !== 'all';

  return (
    <>
      <Helmet>
        <title>BudQuest Verified 420 Rentals | Book Cannabis-Friendly Stays</title>
        <meta name="description" content="Discover BudQuest-verified 420-friendly rentals worldwide. Browse cannabis-friendly accommodations by country, state, and city." />
        <meta name="keywords" content="420 friendly rentals, cannabis hotels, BudQuest verified, marijuana accommodation, weed friendly hotels, 420 rentals" />
        <link rel="canonical" href="https://budquest.guide/hotels" />
        <script type="application/ld+json">{JSON.stringify(generateStructuredData(filteredData.length))}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Mobile Search Bar - Fixed */}
        <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-background/95 backdrop-blur-lg border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search rentals..."
                className="w-full pl-9 pr-4 py-2 bg-card/80 border border-white/10 rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-400/40"
              />
            </div>
            <Button
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
              size="icon"
              className="border-white/10 hover:bg-green-400/10 relative"
            >
              <Filter className="w-4 h-4" />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
              )}
            </Button>
          </div>
        </div>

        <main className="pt-32 md:pt-24 pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight bg-gradient-to-r from-foreground via-green-400 to-gold bg-clip-text text-transparent">
                Verified 420 Rentals
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-2">
                Discover cannabis-friendly accommodations worldwide
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/80">
                {processedData.length} verified rentals • Policies checked • Premium experience
              </p>
            </section>

            <div className="flex gap-6 md:gap-8">
              {/* FILTER PANEL - DESKTOP */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  countries={countries}
                  states={states}
                  filterCounts={filterCounts}
                  isOpen={true}
                  onClose={() => { }}
                />
              </div>

              {/* FILTER PANEL - MOBILE */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                countries={countries}
                states={states}
                filterCounts={filterCounts}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />

              {/* MAIN CONTENT */}
              <div className="flex-1 min-w-0">
                {/* DESKTOP SEARCH & COUNT */}
                <div className={cn(
                  "hidden md:block rounded-2xl border border-white/10 p-4 sm:p-6 mb-8 shadow-2xl",
                  "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5"
                )}>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search rentals by name, city, or policy..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-white/10 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                      />
                      {filters.search && (
                        <button
                          onClick={() => handleFilterChange("search", "")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-green-400/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground hover:text-white" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground font-medium">Sort:</span>
                      <select
                        value={filters.sort}
                        onChange={(e) => handleFilterChange("sort", e.target.value as SortType)}
                        className="px-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 h-11 sm:h-12"
                      >
                        <option value="rating" className="bg-card">Highest Rated</option>
                        <option value="price-low" className="bg-card">Price: Low to High</option>
                        <option value="price-high" className="bg-card">Price: High to Low</option>
                        <option value="name" className="bg-card">Alphabetical</option>
                      </select>
                    </div>
                  </div>

                  {/* ACTIVE FILTERS PREVIEW */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                      {filters.country && (
                        <Badge className="bg-green-400/15 text-green-400 border border-green-400/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.country}
                          <button onClick={() => handleFilterChange("country", "")} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                        </Badge>
                      )}
                      {filters.state && (
                        <Badge className="bg-green-400/15 text-green-400 border border-green-400/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.state}
                          <button onClick={() => handleFilterChange("state", "")} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                        </Badge>
                      )}
                      <button onClick={handleClearFilters} className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-950/20 transition-colors">
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-8 px-2 sm:px-0">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="text-green-400 font-bold">{filteredData.length}</span> rentals
                    {hasActiveFilters && " (filtered)"}
                  </p>
                </div>

                {/* RENTAL CARDS */}
                <div className="space-y-4">
                  {dbLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <RentalCardSkeleton key={i} />
                    ))
                  ) : paginatedData.length === 0 ? (
                    <Card className="p-8 text-center border-white/10 bg-card/50">
                      <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-semibold text-white mb-2">No rentals found</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button
                        onClick={handleClearFilters}
                        variant="outline"
                        className="border-green-400/40 text-green-400 hover:bg-green-400/10"
                      >
                        Clear all filters
                      </Button>
                    </Card>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {paginatedData.map((rental) => (
                        <RentalCard key={rental.id} rental={rental} />
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* PAGINATION */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />

                {/* LEGAL DISCLAIMER */}
                <section className="mt-12 md:mt-16 px-0 mb-8">
                  <div className="max-w-3xl mx-auto">
                    <Card className="relative overflow-hidden border-yellow-500/20 bg-yellow-500/5">
                      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50" />

                      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                        <div className="p-2 rounded-full bg-yellow-500/10 shrink-0">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-base sm:text-lg font-semibold text-yellow-500 leading-none mt-1">
                            Important Notice
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left">
                            Cannabis laws vary by location. Always verify local regulations before consuming.
                            BudQuest verifies rental policies but cannot guarantee legal compliance in all jurisdictions.
                            Use responsibly and respect property rules.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </section>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
