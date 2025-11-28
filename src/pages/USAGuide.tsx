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

// --- CONFIGURATION: REGION CARDS ---
const REGION_CONFIG = [
  {
    id: 'West',
    name: 'The West',
    description: 'Pacific Coast & Rockies',
    count: '13 States',
    icon: Mountain,
    color: 'text-green-400',
    border: 'group-hover:border-green-500/50',
    bg: 'from-green-500/5 to-transparent'
  },
  {
    id: 'Midwest',
    name: 'The Midwest',
    description: 'Great Lakes & Plains',
    count: '12 States',
    icon: Wheat,
    color: 'text-yellow-400',
    border: 'group-hover:border-yellow-500/50',
    bg: 'from-yellow-500/5 to-transparent'
  },
  {
    id: 'South',
    name: 'The South',
    description: 'Deep South & Atlantic',
    count: '17 Jurisdictions',
    icon: Sun,
    color: 'text-orange-400',
    border: 'group-hover:border-orange-500/50',
    bg: 'from-orange-500/5 to-transparent'
  },
  {
    id: 'Northeast',
    name: 'Northeast',
    description: 'New England & Mid-Atlantic',
    count: '9 States',
    icon: Building2,
    color: 'text-blue-400',
    border: 'group-hover:border-blue-500/50',
    bg: 'from-blue-500/5 to-transparent'
  }
];

// --- CONFIGURATION: STATE MAPPING ---
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
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // --- FILTER LOGIC ---
  const filteredStates = useMemo(() => {
    let data = USA_STATE_DATA;

    // 1. Global Search Mode (Overrides Region)
    if (searchTerm) {
      return data.filter(state => 
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Region Drill-down Mode
    if (activeRegion) {
      return data.filter(state => STATE_REGIONS[state.name] === activeRegion);
    }

    return []; // Landing page state (shows regions instead)
  }, [searchTerm, activeRegion]);

  const isSearchActive = searchTerm.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navigation />
      
      <div className="pt-20 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* ===================================================
              MOBILE HEADER (Sticky Search)
          =================================================== */}
          <div className="md:hidden sticky top-16 z-30 -mx-4 px-4 pb-4 pt-2 bg-background/80 backdrop-blur-xl border-b border-border/40 mb-6 transition-all">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
            {/* Mobile Breadcrumb (Only shows when drilled down) */}
            {activeRegion && !isSearchActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2"
              >
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveRegion(null)}
                  className="pl-0 h-auto text-muted-foreground hover:text-foreground p-0 font-normal"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Regions
                </Button>
              </motion.div>
            )}
          </div>

          {/* ===================================================
              DESKTOP HEADER (Spacious & Centered)
          =================================================== */}
          <div className="hidden md:flex flex-col items-center mb-12 text-center">
            {/* Desktop Back Button */}
            <div className="h-8 mb-2 w-full max-w-4xl flex justify-start">
              {activeRegion && !isSearchActive && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveRegion(null)}
                    className="hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors p-0 h-auto font-normal text-lg"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Regions
                  </Button>
                </motion.div>
              )}
            </div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSearchActive ? "Search Results" : activeRegion ? activeRegion : "USA Cannabis Guide"}
            </motion.h1>
            
            {!activeRegion && !isSearchActive && (
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Navigate regulations across the 50 states. Select a region below or search directly.
              </motion.p>
            )}

            {/* Desktop Search Bar */}
            <div className="relative w-full max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search states (e.g. California, Texas)..."
                  className="w-full pl-14 pr-12 py-5 rounded-2xl bg-card/80 border border-white/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg placeholder:text-muted-foreground/50 transition-all backdrop-blur-md"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              MAIN CONTENT AREA
          =================================================== */}
          <div className="min-h-[40vh]">
            <AnimatePresence mode="wait">
              
              {/* VIEW 1: REGION CARDS (Landing Page) */}
              {!isSearchActive && !activeRegion && (
                <motion.div 
                  key="regions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {REGION_CONFIG.map((region) => (
                    <motion.div
                      key={region.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveRegion(region.id)}
                      className={cn(
                        "group relative rounded-3xl border border-white/10 p-6 md:p-8 shadow-lg cursor-pointer overflow-hidden flex flex-col justify-between h-48 md:h-80 transition-all duration-300",
                        "bg-gradient-to-b bg-card hover:shadow-2xl hover:shadow-primary/5",
                        region.border,
                        region.bg
                      )}
                    >
                      {/* Card Content */}
                      <div>
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                          <div className={cn("p-3 md:p-4 rounded-2xl bg-background/50 backdrop-blur-md border border-white/5", region.color)}>
                            <region.icon className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{region.name}</h3>
                        <p className="text-sm md:text-base text-muted-foreground font-medium">{region.description}</p>
                      </div>
                      
                      {/* Desktop Only Footer in Card */}
                      <div className="hidden md:flex mt-4 pt-4 border-t border-white/5 items-center justify-between">
                        <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/70 group-hover:text-primary transition-colors">
                          {region.count}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* VIEW 2: STATE LIST (Drill-down OR Search Results) */}
              {(activeRegion || isSearchActive) && (
                <motion.div 
                  key="states"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {filteredStates.length > 0 ? (
                    <>
                      {/* Mobile Header Title for Drilldown */}
                      <div className="md:hidden mb-4">
                        <h2 className="text-2xl font-bold">
                          {isSearchActive ? "Search Results" : activeRegion}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {filteredStates.length} states found
                        </p>
                      </div>

                      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredStates.map((state, i) => (
                          <motion.div
                            key={state.slug}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <StateCard state={state} />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20 md:py-32">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Map className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">No states found</h3>
                      <p className="text-muted-foreground text-base md:text-lg">
                        We couldn't find "{searchTerm}" in our database.
                      </p>
                      <Button 
                        variant="link" 
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-primary text-lg"
                      >
                        Clear search
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
