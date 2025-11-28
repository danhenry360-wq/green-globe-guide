import { useState, useMemo, useEffect } from "react";
import { 
  Search, X, ArrowLeft, 
  Mountain, Sun, Wheat, Building2, ChevronRight, Map 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StateCard from "@/components/StateCard"; 
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   CONFIGURATION & DATA
----------------------------------------------------- */

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
   SUB-COMPONENTS
----------------------------------------------------- */

const RegionIndex = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {REGIONS.map((region) => (
        <motion.div
          key={region.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            // Matches World Guide Styling exactly:
            "group relative rounded-2xl border border-border", // Adaptive border
            "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5", // Subtle green tint
            "p-6 shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
          )}
          onClick={() => onSelect(region.id)}
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Icon Color matched to World Guide (Green-400) */}
            <region.icon className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-foreground">{region.name}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {region.count}
          </p>

          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
        </motion.div>
      ))}
    </div>
  );
};

const StateIndex = ({ states, onBack }: { states: typeof USA_STATE_DATA; onBack: () => void }) => (
  <>
    <div className="mb-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Regions
      </Button>
    </div>

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
          <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
            <Map className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No states found in this region.</p>
        </div>
      )}
    </motion.div>
  </>
);

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const USAGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegionID, setActiveRegionID] = useState<string | null>(null);

  // --- FILTER LOGIC ---
  const displayData = useMemo(() => {
    const data = USA_STATE_DATA || [];
    const query = searchTerm.trim().toLowerCase();

    if (query.length > 0) {
      return data.filter(state => 
        state.name && state.name.toLowerCase().includes(query)
      );
    }

    if (activeRegionID) {
      return data.filter(state => STATE_TO_REGION[state.name] === activeRegionID);
    }

    return []; 
  }, [searchTerm, activeRegionID]);

  const pageTitle = useMemo(() => {
    if (searchTerm) return "Search Results";
    if (activeRegionID) return REGIONS.find(r => r.id === activeRegionID)?.name || activeRegionID;
    return "USA Cannabis Guide";
  }, [searchTerm, activeRegionID]);

  const pageSubtitle = useMemo(() => {
    if (searchTerm) return `Found ${displayData.length} states`;
    if (activeRegionID) return "Browse states in this region";
    return "Select a region to explore regulations";
  }, [searchTerm, activeRegionID, displayData.length]);

  return (
    // UPDATED: Uses semantic background/text classes for Light/Dark compatibility
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* --- HEADER --- */}
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title matches World Guide font size and weight */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {pageSubtitle}
            </p>
          </motion.div>

          {/* --- STICKY SEARCH BAR (Matches World Guide) --- */}
          <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-border/50 sm:rounded-xl sm:border">
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search states (e.g. California)..."
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-border/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-muted-foreground"
                type="text"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* --- CONTENT SWITCHER --- */}
          <AnimatePresence mode="wait">
            
            {/* Case 1: Search Results */}
            {searchTerm ? (
              <motion.div 
                key="search-results"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="w-full"
              >
                 <div className="flex items-center justify-between mb-6 px-1">
                    <h2 className="text-xl font-semibold text-green-500">Found {displayData.length} States</h2>
                    <Button variant="ghost" size="sm" onClick={() => setSearchTerm("")} className="text-muted-foreground hover:text-foreground">
                      Clear
                    </Button>
                 </div>

                 {displayData.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {displayData.map((state) => (
                        <StateCard key={state.slug} state={state} />
                      ))}
                    </div>
                 ) : (
                    <div className="text-center py-24">
                      <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                        <Search className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">No results</h3>
                      <p className="text-muted-foreground">We couldn't find "{searchTerm}" in the database.</p>
                    </div>
                 )}
              </motion.div>

            /* Case 2: Region Detail */
            ) : activeRegionID ? (
              <motion.div 
                key="state-list" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <StateIndex 
                  states={displayData} 
                  onBack={() => setActiveRegionID(null)} 
                />
              </motion.div>

            /* Case 3: Region Selection (Default) */
            ) : (
              <motion.div 
                key="region-grid" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
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
