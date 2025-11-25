// src/pages/Dispensary.tsx
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
  Leaf,
  Info,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { DISPENSARY_DATA, CountryData } from "@/lib/dispensary_data";

// Define Dispensary type locally to avoid conflicts
interface DispensaryType {
  id: string;
  name: string;
  city: string;
  state: string;
  type?: string;
  specialty?: string;
  rating: number;
  website: string;
  priceRange?: string;
}

const DATA: CountryData[] = DISPENSARY_DATA;

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const generateStructuredData = (dispensaryCount: number) => ({
  "@context": "https://schema.org ",
  "@type": "CollectionPage",
  name: "BudQuest Verified Dispensaries | Find Cannabis Shops Worldwide",
  description:
    "Browse and discover BudQuest-verified dispensaries by country, state, and city. Policies checked, premium experience.",
  url: "https://budquest.com/dispensaries ",
  mainEntity: {
    "@type": "ItemList",
    name: "Verified Dispensaries Collection",
    numberOfItems: dispensaryCount,
  },
  publisher: {
    "@type": "Organization",
    name: "BudQuest",
  },
});

/* ============================================
   TYPES & CONSTANTS
============================================ */
type FilterType = "all" | "recreational" | "medical" | "both";
type SortType = "rating" | "name" | "price-low" | "price-high";
type SpecialtyFilter = "all" | "flower" | "edibles" | "concentrates" | "cartridges";

interface FilterState {
  country: string;
  state: string;
  type: FilterType;
  specialty: SpecialtyFilter;
  sort: SortType;
  search: string;
}

const ITEMS_PER_PAGE = 10;

/* ============================================
   HELPER COMPONENTS
============================================ */
const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg "
        viewBox="0 0 24 24"
        className={`w-4 h-4 ${
          i <= Math.round(value)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-600"
        }`}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
    <span className="text-xs text-muted-foreground ml-1 font-medium">
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
        Page{" "}
        <span className="font-bold text-accent">{currentPage}</span> of{" "}
        <span className="font-bold text-accent">{totalPages}</span>
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
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? "bg-accent text-white"
                      : "bg-card/50 text-muted-foreground hover:bg-card/80 hover:text-white border border-border/40"
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
            className="fixed md:static left-0 top-0 h-full md:h-auto z-50 w-80 md:w-64 bg-card/95 backdrop-blur-xl border-r md:border-r-0 border-border/50 overflow-y-auto md:overflow-visible"
          >
            <div className="p-6 space-y-6">
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-lg"
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
                  className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                    className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                  {(
                    ["all", "recreational", "medical", "both"] as FilterType[]
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => onFilterChange("type", type)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.type === type
                          ? "bg-accent text-white"
                          : "bg-background/80 text-muted-foreground hover:text-white hover:bg-background border border-border/40"
                      }`}
                    >
                      <span className="capitalize">
                        {type === "all" ? "All Types" : type}
                      </span>
                      <span className="text-xs bg-muted/50 px-2 py-1 rounded">
                        {filterCounts[type] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SPECIALTY FILTER */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  Specialty
                </label>
                <div className="space-y-2">
                  {(
                    [
                      "all",
                      "flower",
                      "edibles",
                      "concentrates",
                      "cartridges",
                    ] as SpecialtyFilter[]
                  ).map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => onFilterChange("specialty", specialty)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.specialty === specialty
                          ? "bg-accent text-white"
                          : "bg-background/80 text-muted-foreground hover:text-white hover:bg-background border border-border/40"
                      }`}
                    >
                      <span className="capitalize">
                        {specialty === "all" ? "All Products" : specialty}
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
                  className="w-full px-3 py-2 bg-background/80 border border-border/40 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="rating" className="bg-card">
                    Highest Rated
                  </option>
                  <option value="name" className="bg-card">
                    Alphabetical
                  </option>
                  <option value="price-low" className="bg-card">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-card">
                    Price: High to Low
                  </option>
                </select>
              </div>

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
   DISPENSARY CARD
============================================ */
const DispensaryCard = ({
  dispensary,
}: {
  dispensary: DispensaryType & { country: string; state: string };
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <Card className="p-4 sm:p-6 bg-card/60 border-border/40 hover:border-accent/50 hover:bg-card/80 transition-all hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="text-lg sm:text-xl font-bold text-white break-words">
              {dispensary.name}
            </h4>
            <Badge className="bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-semibold gap-1 flex items-center px-2 py-1">
              <Leaf className="w-3 h-3" />
              Verified
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
            {dispensary.city}, {dispensary.state}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <StarRating value={dispensary.rating} />
            <Badge
              variant="outline"
              className="text-xs px-2 py-1 text-muted-foreground border-border/50"
            >
              {dispensary.specialty}
            </Badge>
            {dispensary.priceRange && (
              <span className="text-xs text-muted-foreground font-medium">
                {dispensary.priceRange}
              </span>
            )}
          </div>
        </div>

        <a
          href={dispensary.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg flex-shrink-0 self-start sm:self-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Visit</span>
        </a>
      </div>

      {/* TYPE & DESCRIPTION */}
      <div className="pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground/80">
          <span className="font-semibold text-muted-foreground">Type:</span>{" "}
          {dispensary.type}
        </p>
      </div>
    </Card>
  </motion.div>
);

/* ============================================
   MAIN DISPENSARY PAGE
============================================ */
const Dispensary = () => {
  const [filters, setFilters] = useState<FilterState>({
    country: "",
    state: "",
    type: "all",
    specialty: "all",
    sort: "rating",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Process and flatten data
  const processedData = useMemo(() => {
    return DATA.flatMap((country) =>
      country.states.flatMap((state) =>
        state.dispensaries.map((dispensary) => ({
          ...dispensary,
          country: country.country,
          countryFlag: country.flag,
          stateObj: state.state,
        }))
      )
    );
  }, []);

  // Get unique countries and states
  const countries = useMemo(
    () => Array.from(new Set(processedData.map((d) => d.country))).sort(),
    [processedData]
  );

  const states = useMemo(() => {
    if (!filters.country) return [];
    return Array.from(
      new Set(
        processedData
          .filter((d) => d.country === filters.country)
          .map((d) => d.stateObj)
      )
    ).sort();
  }, [processedData, filters.country]);

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...processedData];
    const q = filters.search.toLowerCase().trim();

    if (filters.country) {
      result = result.filter((d) => d.country === filters.country);
    }

    if (filters.state) {
      result = result.filter((d) => d.stateObj === filters.state);
    }

    if (filters.type !== "all") {
      result = result.filter(
        (d) => d.type?.toLowerCase().includes(filters.type)
      );
    }

    if (filters.specialty !== "all") {
      result = result.filter(
        (d) => d.specialty?.toLowerCase().includes(filters.specialty)
      );
    }

    if (q) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.stateObj.toLowerCase().includes(q) ||
          d.specialty?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return (a.priceRange?.charCodeAt(0) || 0) - (b.priceRange?.charCodeAt(0) || 0);
        case "price-high":
          return (b.priceRange?.charCodeAt(0) || 0) - (a.priceRange?.charCodeAt(0) || 0);
        default:
          return 0;
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
  const filterCounts = useMemo(() => {
    const count = (type: FilterType) =>
      processedData.filter((d) =>
        type === "all"
          ? true
          : d.type?.toLowerCase().includes(type)
      ).length;

    return {
      all: count("all"),
      recreational: count("recreational"),
      medical: count("medical"),
      both: count("both"),
    };
  }, [processedData]);

  // Handlers
  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setCurrentPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      country: "",
      state: "",
      type: "all",
      specialty: "all",
      sort: "rating",
      search: "",
    });
    setCurrentPage(1);
    setIsFilterOpen(false);
  }, []);

  const hasActiveFilters =
    filters.search ||
    filters.country ||
    filters.state ||
    filters.type !== "all" ||
    filters.specialty !== "all";

  return (
    <>
      <Helmet>
        <title>
          BudQuest Verified Dispensaries | Find Cannabis Shops Worldwide
        </title>
        <meta
          name="description"
          content="Browse BudQuest-verified dispensaries by country, state, and city. Policies checked, premium experience."
        />
        <meta
          name="keywords"
          content="dispensaries, 420 shops, cannabis stores, BudQuest verified, marijuana stores, weed shops, USA, Canada, Netherlands"
        />
        <link rel="canonical" href="https://budquest.com/dispensaries " />
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(filteredData.length))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* MOBILE SEARCH BAR – NOW STATIC AT TOP */}
        <div className="md:hidden sticky top-0 z-40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl border-b border-border/50 shadow-2xl">
          <div className="px-4 py-4">
            <div className="flex gap-3 items-stretch">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search dispensaries, cities, states..."
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange("search", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                />
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange("search", "")}
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
                className="gap-2 border-border/50 text-sm px-4 h-11 rounded-xl hover:bg-accent/10"
              >
                <Filter className="w-5 h-5" />
                Filters
              </Button>

              <select
                value={filters.sort}
                onChange={(e) =>
                  handleFilterChange("sort", e.target.value as SortType)
                }
                className="px-4 py-3 rounded-xl bg-card/80 border border-border/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 h-11"
              >
                <option value="rating" className="bg-card">
                  Highest Rated
                </option>
                <option value="name" className="bg-card">
                  Alphabetical
                </option>
                <option value="price-low" className="bg-card">
                  Price: Low to High
                </option>
                <option value="price-high" className="bg-card">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        <main className="pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className="max-w-4xl mx-auto mb-12 text-center pt-12 md:pt-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                BudQuest Verified Dispensaries
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-2">
                Browse verified cannabis dispensaries worldwide
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80">
                {processedData.length} verified dispensaries • Policies checked
                • Premium experience
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
                {/* SEARCH & SORT BAR - DESKTOP ONLY */}
                <div className="hidden md:block bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-6 mb-8 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search dispensaries, cities, states..."
                        value={filters.search}
                        onChange={(e) =>
                          handleFilterChange("search", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none text-white text-base placeholder:text-muted-foreground/60 transition-all"
                      />
                      {filters.search && (
                        <button
                          onClick={() => handleFilterChange("search", "")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground hover:text-white" />
                        </button>
                      )}
                    </div>

                    <select
                      value={filters.sort}
                      onChange={(e) =>
                        handleFilterChange("sort", e.target.value as SortType)
                      }
                      className="px-4 py-3 sm:py-4 rounded-xl bg-card/80 border border-border/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 h-11 sm:h-12"
                    >
                      <option value="rating" className="bg-card">
                        Highest Rated
                      </option>
                      <option value="name" className="bg-card">
                        Alphabetical
                      </option>
                      <option value="price-low" className="bg-card">
                        Price: Low to High
                      </option>
                      <option value="price-high" className="bg-card">
                        Price: High to Low
                      </option>
                    </select>
                  </div>

                  {/* ACTIVE FILTERS */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                      {filters.country && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.country}
                          <button
                            onClick={() => handleFilterChange("country", "")}
                            className="hover:opacity-70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.state && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.state}
                          <button
                            onClick={() => handleFilterChange("state", "")}
                            className="hover:opacity-70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.type !== "all" && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.type}
                          <button
                            onClick={() => handleFilterChange("type", "all")}
                            className="hover:opacity-70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.specialty !== "all" && (
                        <Badge className="bg-accent/15 text-accent border border-accent/40 gap-2 px-3 py-1 text-xs font-semibold">
                          {filters.specialty}
                          <button
                            onClick={() =>
                              handleFilterChange("specialty", "all")
                            }
                            className="hover:opacity-70"
                          >
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

                {/* RESULTS */}
                {filteredData.length === 0 ? (
                  <div className="text-center py-16">
                    <Building className="w-16 h-16 mx-auto mb-6 text-muted-foreground/40" />
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      No dispensaries found
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      Try adjusting your filters or search terms.
                    </p>
                    {hasActiveFilters && (
                      <Button
                        onClick={handleClearFilters}
                        variant="outline"
                        className="gap-2 border-border/50"
                      >
                        <X className="w-4 h-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="text-accent font-bold">
                          {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                        </span>{" "}
                        to{" "}
                        <span className="text-accent font-bold">
                          {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            filteredData.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="text-accent font-bold">
                          {filteredData.length}
                        </span>{" "}
                        dispensaries
                      </p>
                    </div>

                    {/* DISPENSARY CARDS GRID */}
                    <div className="space-y-4 mb-12">
                      <AnimatePresence mode="wait">
                        {paginatedData.map((dispensary) => (
                          <DispensaryCard
                            key={dispensary.id}
                            dispensary={dispensary}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* PAGINATION */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
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
                    <h3 className="text-lg font-bold text-red-300 mb-2">
                      Legal Disclaimer
                    </h3>
                    <p className="text-sm text-red-200/90 leading-relaxed">
                      BudQuest is an informational resource only. We do not
                      provide legal advice. Always verify current local laws and
                      confirm dispensary policies before purchasing cannabis.
                      International transport of cannabis remains illegal. Users
                      are responsible for ensuring compliance with applicable
                      laws.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* INTERNAL LINKS */}
            <nav className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/usa"
                  className="text-accent hover:text-accent/80 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  USA Guide
                </Link>
                <span className="text-muted-foreground/40">•</span>
                <Link
                  to="/hotels"
                  className="text-accent hover:text-accent/80 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  Hotels
                </Link>
                <span className="text-muted-foreground/40">•</span>
                <Link
                  to="/world"
                  className="text-accent hover:text-accent/80 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors"
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
