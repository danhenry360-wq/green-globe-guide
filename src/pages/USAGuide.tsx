import { useState, useMemo } from "react";
import { 
  Search, X, ArrowLeft, 
  Map, Mountain, Sun, Wheat, Building2, ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StateCard from "@/components/StateCard"; 
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

// --- CONFIGURATION ---
const REGION_CONFIG = [
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

// --- STATE MAPPING ---
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegionID, setActiveRegionID] = useState<string | null>(null);

  // --- FILTER LOGIC (FIXED) ---
  const displayData = useMemo(() => {
    const data = USA_STATE_DATA || []; // Safety check for empty data
    const query = searchTerm.trim().toLowerCase();

    // 1. Global Search Mode
    if (query.length > 0) {
      return data.filter(state => 
        state.name && state.name.toLowerCase().includes(query)
      );
    }

    // 2. Region Drill-down Mode
    if (activeRegionID) {
      return data.filter(state => STATE_REGIONS[state.name] === activeRegionID);
    }

    // 3. Default (Landing Page)
    return []; 
  }, [searchTerm, activeRegionID]);

  const isSearchActive = searchTerm.trim().length > 0;
  
  // Get display name for header
  const activeRegionName = activeRegionID 
    ? REGION_CONFIG.find(r => r.id === activeRegionID)?.name 
    : null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navigation />
      
      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* ===================================================
              HEADER SECTION
          =================================================== */}
          <div className="flex flex-col items-center mb-8 md:mb-12 text-center">
            
            {/* Back Button */}
            <div className="h-8 mb-2 w-full flex justify-start">
              {activeRegionID && !isSearchActive && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveRegionID(null)}
                    className="hover:bg-white/5 text-gray-400 hover:text-white transition-colors p-0 h-auto font-medium text-base gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Regions
                  </Button>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                {isSearchActive ? "Search Results" : activeRegionName ? activeRegionName : "USA Cannabis Guide"}
              </h1>
              
              {!activeRegionID && !isSearchActive && (
                <p className="text-lg text-gray-400 max-w-xl mx-auto">
                  Select a region below to explore regulations, or search for a specific state.
                </p>
              )}
            </motion.div>
          </div>

          {/* ===================================================
              SEARCH BAR (Z-Index Fixed)
          =================================================== */}
          <div className="sticky top-20 z-50 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="relative max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all group-focus-within:border-green-500/50">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search states (e.g. New York)..."
                    className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-lg"
                    type="text"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white cursor-pointer z-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              CONTENT GRID
          =================================================== */}
          <div className="min-h-[40vh]">
            <AnimatePresence mode="wait">
              
              {/* VIEW 1: REGION CARDS (Landing) */}
              {!isSearchActive && !activeRegionID && (
                <motion.div 
                  key="regions"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {REGION_CONFIG.map((region) => (
                    <motion.div
                      key={region.id}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSearchTerm(""); // Clear search just in case
                        setActiveRegionID(region.id);
                      }}
                      className={cn(
                        "group relative p-6 rounded-2xl border border-white/10 cursor-pointer overflow-hidden transition-all duration-300",
                        "bg-white/5 flex items-center justify-between shadow-lg h-32"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                      <div className="flex items-center gap-5 z-10">
                        <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-green-400 shadow-inner">
                          <region.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {region.name}
                          </h3>
                          <p className="text-sm text-gray-400 font-medium mt-0.5">
                            {region.count}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors z-10" />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* VIEW 2: STATE LIST (Results) */}
              {(activeRegionID || isSearchActive) && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {displayData.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {displayData.map((state, i) => (
                        <motion.div
                          key={state.slug}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <StateCard state={state} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Map className="w-10 h-10 text-gray-500" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">No states found</h3>
                      <p className="text-gray-400 text-lg">
                        {isSearchActive 
                          ? `We couldn't find "${searchTerm}" in our database.`
                          : `No states found in ${activeRegionName}.`}
                      </p>
                      <Button 
                        variant="link" 
                        onClick={() => { setSearchTerm(""); setActiveRegionID(null); }}
                        className="mt-4 text-green-400 hover:text-green-300 text-lg"
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
