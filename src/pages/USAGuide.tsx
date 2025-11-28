import { useState, useMemo, useEffect } from "react"; // ✅ Fixed Import
import { Filter, Search, X, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterStates from "@/components/FilterStates";
import MapLegend from "@/components/MapLegend";
import StateCard from "@/components/StateCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// --- DATA INTEGRITY: Full Region Mapping ---
const STATE_REGIONS: Record<string, string> = {
  'Alabama': 'South', 'Alaska': 'West', 'Arizona': 'West', 'Arkansas': 'South',
  'California': 'West', 'Colorado': 'West', 'Connecticut': 'Northeast', 'Delaware': 'South',
  'District of Columbia': 'South', 'Florida': 'South', 'Georgia': 'South', 'Hawaii': 'West',
  'Idaho': 'West', 'Illinois': 'Midwest', 'Indiana': 'Midwest', 'Iowa': 'Midwest',
  'Kansas': 'Midwest', 'Kentucky': 'South', 'Louisiana': 'South', 'Maine': 'Northeast',
  'Maryland': 'South', 'Massachusetts': 'Northeast', 'Michigan': 'Midwest', 'Minnesota': 'Midwest',
  'Mississippi': 'South', 'Missouri': 'Midwest', 'Montana': 'West', 'Nebraska': 'Midwest',
  'Nevada': 'West', 'New Hampshire': 'Northeast', 'New Jersey': 'Northeast', 'New Mexico': 'West',
  'New York': 'Northeast', 'North Carolina': 'South', 'North Dakota': 'Midwest', 'Ohio': 'Midwest',
  'Oklahoma': 'South', 'Oregon': 'West', 'Pennsylvania': 'Northeast', 'Rhode Island': 'Northeast',
  'South Carolina': 'South', 'South Dakota': 'Midwest', 'Tennessee': 'South', 'Texas': 'South',
  'Utah': 'West', 'Vermont': 'Northeast', 'Virginia': 'South', 'Washington': 'West',
  'West Virginia': 'South', 'Wisconsin': 'Midwest', 'Wyoming': 'West'
};

const USAGuide = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: '', region: '' });

  // 1. Mobile Experience: Prevent body scroll when drawer is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFilterOpen]);

  // 2. Core Logic: Filter States (Unchanged)
  const filteredStates = useMemo(() => {
    return USA_STATE_DATA.filter(state => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || state.status === filters.status;
      const matchesRegion = !filters.region || STATE_REGIONS[state.name] === filters.region;
      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [searchTerm, filters]);

  // 3. Core Logic: Group by Region (Unchanged)
  const groupedByRegion = useMemo(() => {
    return filteredStates.reduce((acc, state) => {
      const region = STATE_REGIONS[state.name] || 'Other';
      if (!acc[region]) acc[region] = [];
      acc[region].push(state);
      return acc;
    }, {} as Record<string, typeof USA_STATE_DATA>);
  }, [filteredStates]);

  // Helper variables for UI state
  const isSearchActive = searchTerm.length > 0;
  const activeFilterCount = (filters.status ? 1 : 0) + (filters.region ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-20 md:pb-12">
        <div className="container mx-auto px-4">
          
          {/* ===================================================
              MOBILE VIEW: App-Like Sticky Header
          =================================================== */}
          <div className="md:hidden sticky top-16 z-30 -mx-4 px-4 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all duration-200">
            <div className="py-3 space-y-3">
              {/* Row 1: Search Bar + Filter Toggle */}
              <div className="flex gap-3 items-center">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Search states..."
                    className="pl-9 h-11 bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all rounded-xl text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-background/50 rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                
                <Button 
                  onClick={() => setIsFilterOpen(true)} 
                  variant={activeFilterCount > 0 ? "default" : "outline"}
                  className="h-11 w-11 px-0 flex-shrink-0 rounded-xl relative border-border/50 bg-background"
                  aria-label="Open filters"
                >
                  <Filter className="w-5 h-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Row 2: Active Filter Chips (Horizontal Scroll) */}
              {(filters.status || filters.region) && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                  {filters.status && (
                    <Badge variant="secondary" className="h-7 px-3 gap-1 rounded-lg flex-shrink-0 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, status: '' }))}>
                      {filters.status} <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {filters.region && (
                    <Badge variant="secondary" className="h-7 px-3 gap-1 rounded-lg flex-shrink-0 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, region: '' }))}>
                      {filters.region} <X className="h-3 w-3" />
                    </Badge>
                  )}
                  <button onClick={() => setFilters({ status: '', region: '' })} className="text-xs text-muted-foreground whitespace-nowrap px-2 font-medium">
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===================================================
              DESKTOP VIEW: Sidebar Layout (Original Logic)
          =================================================== */}
          <div className="hidden md:flex md:space-x-8 pt-6">
            <aside className="w-1/4 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
              <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-foreground">Filters</h3>
                  {(filters.status || filters.region) && (
                    <Button variant="ghost" size="sm" onClick={() => setFilters({ status: '', region: '' })} className="text-xs h-8 text-muted-foreground hover:text-red-500">
                      Reset
                    </Button>
                  )}
                </div>
                <FilterStates onFilterChange={setFilters} currentFilters={filters} />
                <div className="mt-8 pt-6 border-t border-border/50">
                  <MapLegend />
                </div>
              </div>
            </aside>
            
            <main className="md:w-3/4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-foreground">USA Cannabis Guide</h1>
                  <p className="text-muted-foreground">Find legal status and dispensaries near you.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Find a state..."
                    className="pl-9 h-11 bg-card border-border hover:border-primary/50 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {filteredStates.length > 0 ? (
                <div className="grid gap-4">
                  {filteredStates.map(state => (
                    <StateCard key={state.slug} state={state} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </main>
          </div>

          {/* ===================================================
              MOBILE CONTENT: Hybrid List Logic
          =================================================== */}
          <div className="md:hidden mt-4 min-h-[50vh]">
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-sm font-medium text-muted-foreground">
                Found {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'}
              </span>
            </div>

            {filteredStates.length === 0 ? (
              <EmptyState />
            ) : isSearchActive || (filters.status && !filters.region) ? (
              // CASE A: User is searching/filtering -> Show Flat List (Better UX)
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {filteredStates.map(state => (
                  <StateCard key={state.slug} state={state} />
                ))}
              </motion.div>
            ) : (
              // CASE B: User is just browsing -> Show Regions Accordion (Original UX)
              <Accordion type="multiple" className="w-full space-y-3">
                {Object.entries(groupedByRegion).map(([region, states]) => (
                  <AccordionItem 
                    key={region} 
                    value={region}
                    className="border-0 rounded-2xl bg-card shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 text-base font-semibold hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/30">
                      <div className="flex items-center gap-3">
                        <span className="text-foreground">{region}</span>
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-background/50 border-border/50">
                          {states.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 pt-0 bg-muted/10">
                      <div className="h-2" />
                      <div className="space-y-3">
                        {states.map(state => (
                          <StateCard key={state.slug} state={state} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

        </div>
      </div>

      {/* ===================================================
          MOBILE DRAWER: Bottom Sheet Filter
      =================================================== */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-[20px] shadow-2xl flex flex-col max-h-[85vh]"
            >
