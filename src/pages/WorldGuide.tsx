import { useState, useMemo } from "react";
import { 
  Search, ArrowLeft, 
  Mountain, Sun, Wheat, Building2, ChevronRight, Map 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StateCard from "@/components/StateCard"; // Assumed existing component
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   CONFIGURATION & DATA MODELS
----------------------------------------------------- */

// 1. Region Definitions (Styled like WorldGuide Continents)
const REGIONS = [
  {
    id: 'West', 
    name: 'The West',
    description: 'Pacific Coast, Rockies & Desert',
    count: '13 states',
    icon: Mountain, 
  },
  {
    id: 'Midwest',
    name: 'The Midwest',
    description: 'Great Lakes & Great Plains',
    count: '12 states',
    icon: Wheat, 
  },
  {
    id: 'South',
    name: 'The South',
    description: 'Deep South, Texas & Florida',
    count: '17 jurisdictions',
    icon: Sun, 
  },
  {
    id: 'Northeast',
    name: 'The Northeast',
    description: 'New England & Mid-Atlantic',
    count: '9 states',
    icon: Building2, 
  }
];

// 2. State Mapping (Data Integrity)
const STATE_TO_REGION: Record<string, string> = {
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

/* ----------------------------------------------------
   SUB-COMPONENTS (Mirroring WorldGuide Architecture)
----------------------------------------------------- */

// VIEW A: The Region List (Landing Page)
const RegionIndex = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {REGIONS.map((region) => (
        <motion.div
          key={region.id}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "group relative rounded-2xl border border-white/10",
            "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
            "p-6 shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
          )}
          onClick={() => onSelect(region.id)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-background/50 border border-white/10 text-green-400">
              <region.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{region.name}</h3>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80">{region.description}</p>
            <p className="text-xs text-muted-foreground">{region.count}</p>
          </div>

          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
        </motion.div>
      ))}
    </div>
  );
};

// VIEW B: The State List (Filtered by Region)
const StateIndex = ({ 
  regionId, 
  states, 
  onBack 
}: { 
  regionId: string; 
  states: typeof USA_STATE_DATA; 
  onBack: () => void; 
}) => {
  const regionName = REGIONS.find(r => r.id === regionId)?.name || regionId;

  return (
    <>
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2 pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Regions
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {states.length > 0 ? (
          states.map((state) => (
            <StateCard key={state.slug} state={state} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Map className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No states found in this region.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

// VIEW C: Global Search Results
const SearchResults = ({ results, query, onClear }: { results: typeof USA_STATE_DATA; query: string; onClear: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Search Results</h2>
      <Button variant="ghost" size="sm" onClick={onClear} className="text-green-400 hover:text-green-300">
        Clear Search
      </Button>
    </div>

    {results.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((state) => (
          <StateCard key={state.slug} state={state} />
        ))}
      </div>
    ) : (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
          <Search className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No states found</h3>
        <p className="text-muted-foreground">We couldn't find "{query}" in the database.</p>
      </div>
    )}
  </motion.div>
);

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const USAGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegionID, setActiveRegionID] = useState<string | null>(null);

  // --- LOGIC: Filter Data based on View Mode ---
  const displayData = useMemo(() => {
    // Mode 1: Search
    if (searchTerm) {
      return USA_STATE_DATA.filter(state => 
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Mode 2: Region Drill-down
    if (activeRegionID) {
      return USA_STATE_DATA.filter(state => STATE_TO_REGION[state.name] === activeRegionID);
    }
    // Mode 3: Landing (Return empty, show cards instead)
    return [];
  }, [searchTerm, activeRegionID]);

  // Determine Title
  const pageTitle = useMemo(() => {
    if (searchTerm) return "Search Results";
    if (activeRegionID) return REGIONS.find(r => r.id === activeRegionID)?.name || "Region";
    return "USA Cannabis Guide";
  }, [searchTerm, activeRegionID]);

  const pageSubtitle = useMemo(() => {
    if (searchTerm) return `Found ${displayData.length} states`;
    if (activeRegionID) return "Browse states in this region";
    return "Select a region to explore regulations";
  }, [searchTerm, activeRegionID, displayData.length]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-green-500/30">
      <Navigation />
      
      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* --- HEADER SECTION --- */}
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {pageSubtitle}
            </p>
          </motion.div>

          {/* --- STICKY SEARCH BAR (Exact WorldGuide Style) --- */}
          <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search USA states..."
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-white" />
                </button>
              )}
            </div>
          </div>

          {/* --- MAIN CONTENT SWITCHER --- */}
          <AnimatePresence mode="wait">
            {searchTerm ? (
              <SearchResults 
                key="search" 
                results={displayData} 
                query={searchTerm} 
                onClear={() => setSearchTerm("")} 
              />
            ) : activeRegionID ? (
              <motion.div key="state-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <StateIndex 
                  regionId={activeRegionID} 
                  states={displayData} 
                  onBack={() => setActiveRegionID(null)} 
                />
              </motion.div>
            ) : (
              <motion.div key="region-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RegionIndex onSelect={setActiveRegionID} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
