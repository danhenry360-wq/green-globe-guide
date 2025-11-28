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

// --- FULL REGION MAPPING ---
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

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFilterOpen]);

  // 1. Data Filtering Logic
  const filteredStates = useMemo(() => {
    return USA_STATE_DATA.filter(state => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || state.status === filters.status;
      const matchesRegion = !filters.region || STATE_REGIONS[state.name] === filters.region;
      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [searchTerm, filters]);

  // 2. Data Grouping Logic
  const groupedByRegion = useMemo(() => {
    return filteredStates.reduce((acc, state) => {
      const region = STATE_REGIONS[state.name] || 'Other';
      if (!acc[region]) acc[region] = [];
      acc[region].push(state);
      return acc;
    }, {} as Record<string, typeof USA_STATE_DATA>);
  }, [filteredStates]);

  const isSearchActive = searchTerm.length > 0;
  const activeFilterCount = (filters.status ? 1 : 0) + (filters.region ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-20 md:pb-12">
        <div className="container mx-auto px-4">
          
          {/* ===================================================
              MOBILE EXPERIENCE: App-Like Sticky Header
          =================================================== */}
          <div className="md:hidden sticky top-16 z-30 -mx-4 px-4 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all duration-200">
            <div className="py-3 space-y-3">
              {/* Search Row */}
              <div className="flex gap-3 items-center">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Search 50 states..."
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
                  aria-label="Filters"
                >
                  <Filter className="w-5 h-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Active Filter Chips (Horizontal Scroll) */}
              {(filters.status || filters.region) && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                  {filters.status && (
                    <Badge variant="secondary" className="h-7 px-3 gap-1 rounded-lg flex-shrink-0 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, status: '' }))}>
                      Status: {filters.status} <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {filters.region && (
                    <Badge variant="secondary" className="h-7 px-3 gap-1 rounded-lg flex-shrink-0 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, region: '' }))}>
                      Region: {filters.region} <X className="h-3 w-3" />
                    </Badge>
                  )}
                  <button onClick={() => setFilters({ status: '', region: '' })} className="text-xs text-muted-foreground whitespace-nowrap px-2">
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===================================================
              DESKTOP EXPERIENCE: Side-by-Side
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
              MOBILE CONTENT: Hybrid List
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
              // SEARCH/FILTER MODE: Flat list for speed
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
              // BROWSE MODE: Grouped Accordions
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
          MOBILE BOTTOM SHEET (Filter Drawer)
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
            
            {/* Slide-up Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-[20px] shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Drawer Handle */}
              <div className="flex justify-center pt-3 pb-1" onClick={() => setIsFilterOpen(false)}>
                <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-border/40">
                <h2 className="text-lg font-bold">Filter States</h2>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setIsFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 space-y-8 flex-1">
                <FilterStates onFilterChange={setFilters} currentFilters={filters} />
                
                <div className="pt-4 border-t border-border/40">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Legend</h4>
                  <MapLegend />
                </div>
              </div>

              {/* Sticky Footer Action */}
              <div className="p-4 border-t border-border/40 bg-background pb-8">
                <Button 
                  className="w-full h-12 text-base font-semibold rounded-xl" 
                  onClick={() => setIsFilterOpen(false)}
                >
                  Show {filteredStates.length} Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

// Helper: Improved Empty State
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
      <Map className="w-8 h-8 text-muted-foreground/50" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-1">No states found</h3>
    <p className="text-muted-foreground max-w-xs mx-auto">
      We couldn't find any states matching your criteria. Try clearing your filters.
    </p>
  </div>
);

export default USAGuide;
