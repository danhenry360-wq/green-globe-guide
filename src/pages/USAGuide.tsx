import { useState, useMemo } from "react";
import { 
  Search, X, ArrowLeft, 
  Map, Mountain, Sun, Wheat, Building2, ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StateCard from "@/components/StateCard"; // Ensure this component exists
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

// --- 1. DEFINE REGIONS WITH ICONS ---
// This gives the "WorldGuide" feel by creating category cards
const REGION_CONFIG = [
  {
    id: 'West',
    name: 'The West',
    description: '13 States • Pacific & Mountains',
    icon: Mountain,
    color: 'text-green-400',
    bg: 'from-green-400/10'
  },
  {
    id: 'Midwest',
    name: 'The Midwest',
    description: '12 States • Great Lakes & Plains',
    icon: Wheat,
    color: 'text-yellow-400',
    bg: 'from-yellow-400/10'
  },
  {
    id: 'South',
    name: 'The South',
    description: '16 States + DC • Southern Hospitality',
    icon: Sun,
    color: 'text-orange-400',
    bg: 'from-orange-400/10'
  },
  {
    id: 'Northeast',
    name: 'Northeast',
    description: '9 States • New England & Mid-Atlantic',
    icon: Building2,
    color: 'text-blue-400',
    bg: 'from-blue-400/10'
  }
];

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
  // Local state to handle drill-down (simulating routing)
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Filter Logic
  const filteredStates = useMemo(() => {
    let data = USA_STATE_DATA;

    // 1. If Searching: Search globally (ignore region selection)
    if (searchTerm) {
      return data.filter(state => 
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. If Region Selected: Filter by region
    if (activeRegion) {
      return data.filter(state => STATE_REGIONS[state.name] === activeRegion);
    }

    return []; // No search, no region = show nothing (show region cards instead)
  }, [searchTerm, activeRegion]);

  const isSearchActive = searchTerm.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* --- HEADER & BREADCRUMBS --- */}
          <div className="mb-6">
            {activeRegion && !isSearchActive ? (
              <Button 
                variant="ghost" 
                onClick={() => setActiveRegion(null)}
                className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Regions
              </Button>
            ) : (
              <div className="h-10" /> /* Spacer to keep layout jump-free */
            )}

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-2"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {isSearchActive ? "Search Results" : activeRegion ? activeRegion : "USA Cannabis Guide"}
              </h1>
              <p className="text-muted-foreground text-lg">
                {isSearchActive 
                  ? `Found ${filteredStates.length} state${filteredStates.length !== 1 ? 's' : ''}`
                  : activeRegion 
                    ? `Explore cannabis laws in ${activeRegion}`
                    : "Select a region to explore regulations"}
              </p>
            </motion.div>
          </div>

          {/* --- STICKY SEARCH BAR --- */}
          <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-6 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search states (e.g. California, Texas)..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="min-h-[50vh]">
            
            {/* VIEW 1: REGION CARDS (Default) */}
            {!isSearchActive && !activeRegion && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REGION_CONFIG.map((region) => (
                  <motion.div
                    key={region.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveRegion(region.id)}
                    className={cn(
                      "group relative rounded-2xl border border-white/10 p-6 shadow-lg cursor-pointer overflow-hidden",
                      "bg-gradient-to-br via-transparent to-transparent",
                      region.bg // Dynamic background color
                    )}
                  >
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="p-3 rounded-full bg-background/20 backdrop-blur-sm border border-white/10">
                        <region.icon className={cn("w-8 h-8", region.color)} />
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-1">{region.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {region.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* VIEW 2: STATE LIST (Drill-down OR Search Results) */}
            {(activeRegion || isSearchActive) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {filteredStates.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredStates.map(state => (
                      <StateCard key={state.slug} state={state} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No states found</h3>
                    <p className="text-muted-foreground">Try adjusting your search query.</p>
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
