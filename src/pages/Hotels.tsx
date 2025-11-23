// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, MapPin, Search, Building, Info, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  description: "Discover and book BudQuest-verified 420-friendly hotels across USA, Canada, Netherlands, and worldwide.",
  url: "https://budquest.com/hotels",
  mainEntity: {
    "@type": "ItemList",
    name: "420-Friendly Hotels Collection",
    numberOfItems: hotelCount,
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

/* ============================================
   PAGINATION COMPONENT
============================================ */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => 
    p === 1 || 
    p === totalPages || 
    (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 px-4">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-bold text-accent">{currentPage}</span> of <span className="font-bold text-accent">{totalPages}</span>
      </p>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 hover:bg-accent/10 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex gap-1">
          {visiblePages.map((page, idx) => {
            const isPrevEllipsis = idx > 0 && visiblePages[idx - 1] !== page - 1;
            const isNextEllipsis = idx < visiblePages.length - 1 && visiblePages[idx + 1] !== page + 1;

            return (
              <div key={page}>
                {isPrevEllipsis && <span className="px-2 text-muted-foreground">...</span>}
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-accent text-white'
                      : 'bg-card/50 text-muted-foreground hover:bg-card/80 hover:text-white border border-border/40'
                  }`}
                >
                  {page}
                </button>
                {isNextEllipsis && <span className="px-2 text-muted-foreground">...</span>}
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 hover:bg-accent/10 disabled:opacity-50"
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
  onClose
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
    { value: 'all' as FilterType, label: 'All Hotels' },
    { value: 'premium' as FilterType, label: 'Premium' },
    { value: 'budget' as FilterType, label: 'Budget' },
    { value: 'smoking' as FilterType, label: 'Smoking' },
    { value: 'vaping' as FilterType, label: 'Vaping' },
    { value: 'edibles' as FilterType, label: 'Edibles' },
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
          {/* MOBILE BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
          
          {/* FILTER PANEL */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:static left-0 top-0 h-full md:h-auto z-50 w-80 md:w-64 bg-card/95 backdrop-blur-xl border-r md:border-r-0 border-border/50 overflow-y-auto md:overflow-visible"
          >
            <div className="p-6 space-y-6">
              {/* CLOSE BUTTON (MOBILE) */}
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Filters</h3>
              </div>

              {/* COUNTRY FILTER */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => {
                    onFilterChange('country', e.target.value);
                    onFilterChange('state', '');
                  }}
                  className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-card">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATE FILTER */}
              {filters.country && (
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-3">State/Province</label>
                  <select
                    value={filters.state}
                    onChange={(e) => onFilterChange('state', e.target.value)}
                    className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state} className="bg-card">
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* TYPE FILTER */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Type</label>
                <div className="space-y-2">
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange('type', option.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.type === option.value
                          ? 'bg-accent text-white'
                          : 'bg-background/80 text-muted-foreground hover:text-white hover:bg-background border border-border/40'
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
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => onFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-card">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* APPLY BUTTON (MOBILE) */}
              <Button
                onClick={onClose}
                className="w-full md:hidden bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold py-3"
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
   MAIN HOTELS PAGE
============================================ */
const Hotels = () => {
  const DATA: CountryHotels[] = HOTEL_DATA;
  const ITEMS_PER_PAGE = 12;

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
        state.hotels.map(hotel => ({
          ...hotel,
          country: country.country,
          countryFlag: country.flagPath,
          stateName: state.stateName.replace(/\s*\(.*\)$/, ''),
          isBudget: hotel.price < 100,
          hasSmoking: hotel.policyHighlights?.toLowerCase().includes('smoking') || 
                     hotel.policyHighlights?.toLowerCase().includes('balcony') || false,
          hasVaping: hotel.policyHighlights?.toLowerCase().includes('vaping') ||
                    hotel.policyHighlights?.toLowerCase().includes('consumption') || false,
          hasEdibles: hotel.policyHighlights?.toLowerCase().includes('edible') ||
                     hotel.policyHighlights?.toLowerCase().includes('welcome kit') || false,
        }))
      )
    );
  }, []);

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
        h.policyHighlights?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
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
        <title>BudQuest Verified 420-Friendly Hotels | Book Cannabis-Friendly Stays</title>
        <meta name="description" content="Discover BudQuest-verified 420-friendly hotels worldwide. Browse cannabis-friendly accommodations by country, state, and city." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, marijuana accommodation, weed friendly hotels" />
        <link rel="canonical" href="https://budquest.com/hotels" />
        <script type="application/ld+json">{JSON.stringify(generateStructuredData(filteredData.length))}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* FIXED SEARCH & SORT BAR - MOBILE */}
        <div className="fixed left-0 right-0 top-20 z-40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl border-b border-border/50 shadow-2xl md:hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search hotels, cities, states..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                />
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground hover:text-white" />
                  </button>
                )}
              </div>

              <Button
                onClick={() => setIsFilterOpen(true)}
                variant="outline"
                size="sm"
                className="gap-2 border-border/50 text-sm px-4 h-11 sm:h-12 rounded-xl hover:bg-accent/10"
              >
                <Filter className="w-5 h-5" />
                Filters
              </Button>

              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value as SortType)}
                className="px-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 h-11 sm:h-12"
              >
                <option value="rating" className="bg-card">Highest Rated</option>
                <option value="price-low" className="bg-card">Price: Low to High</option>
                <option value="price-high" className="bg-card">Price: High to Low</option>
                <option value="name" className="bg-card">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        <main className="pt-24 pb-20 px-4 sm:px-6 md:pt-24">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                Verified 420-Friendly Hotels
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-2">
                Discover cannabis-friendly accommodations worldwide
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80">
                {processedData.length} verified hotels • Policies checked • Premium experience
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
                  onClose={() => {}}
                />
              </div>

              {/* MAIN CONTENT */}
              <div className="flex-1 min-w-0">
                {/* SEARCH BAR - DESKTOP ONLY */}
                <div className="hidden md:block bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-6 mb-8 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search hotels, cities, states..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                      />
                      {filters.search && (
                        <button
                          onClick={() => handleFilterChange('search', '')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground hover:text-white" />
                        </button>
                      )}
                    </div>

                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value as SortType)}
                      className="px-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 h-11 sm:h-12"
                    >
                      <option value="rating" className="bg-card">Highest Rated</option>
                      <option value="price-low" className="bg-card">Price: Low to High</option>
                      <option value="price-high" className="bg-card">Price: High to Low</option>
                      <option value="name" className="bg-card">Alphabetical</option>
                    </select>
                  </div>

                  {/* ACTIVE FILTERS DISPLAY */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                      {filters.country && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.country}
                          <button onClick={() => handleFilterChange('country', '')} className="hover:opacity-70">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.state && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.state}
                          <button onClick={() => handleFilterChange('state', '')} className="hover:opacity-70">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.type !== 'all' && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.type}
                          <button onClick={() => handleFilterChange('type', 'all')} className="hover:opacity-70">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      <button
                        onClick={handleClearFilters}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-950/20 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                {/* MOBILE SPACING FOR FIXED BAR */}
                <div className="h-32 md:h-0" />

                {/* RESULTS */}
                {filteredData.length === 0 ? (
                  <div className="text-center py-16">
                    <Building className="w-16 h-16 mx-auto mb-6 text-muted-foreground/40" />
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">No hotels found</h2>
                    <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search terms.</p>
                    {hasActiveFilters && (
                      <Button onClick={handleClearFilters} variant="outline" className="gap-2 border-border/50">
                        <X className="w-4 h-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground">
                        Showing <span className="text-accent font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                        <span className="text-accent font-bold">
                          {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}
                        </span>{' '}
                        of <span className="text-accent font-bold">{filteredData.length}</span> hotels
                      </p>
                    </div>

                    {/* HOTEL CARDS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                      {paginatedData.map((hotel, idx) => (
                        <motion.div
                          key={hotel.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <HotelCard hotel={hotel} />
                        </motion.div>
                      ))}
                    </div>

                    {/* PAGINATION */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </>
                )}
              </div>
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

            {/* DISCLAIMER */}
            <section className="mt-20" aria-label="Legal information">
              <Card className="p-6 sm:p-8 bg-gradient-to-r from-red-950/20 to-red-900/10 border border-red-500/30 rounded-2xl">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-red-300 mb-2">Legal Disclaimer</h3>
                    <p className="text-sm text-red-200/90 leading-relaxed">
                      BudQuest is an informational resource only. Always verify current local laws and confirm hotel policies before booking.
                    </p>
                  </div>
                </div>
