import { useState, useMemo } from "react";
import { 
  Search, ArrowLeft, X,
  Mountain, Sun, Wheat, Building2, ChevronRight, Map 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import StateCard from "@/components/StateCard"; // Ensure you have this component
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   DATA CONFIGURATION
----------------------------------------------------- */

// 1. Region Definitions (Matches WorldGuide Continent style)
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

// 2. State Mapping (Data Integrity for Filtering)
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
   SUB-COMPONENTS (Replicating WorldGuide Structure)
----------------------------------------------------- */

// 1. Region Index (Equivalent to ContinentIndex)
const RegionIndex = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [q, setQ] = useState("");
  
  const filteredRegions = useMemo(() => 
    q ? REGIONS.filter(r => r.name.toLowerCase().includes(q.toLowerCase())) : REGIONS,
  [q]);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              USA Cannabis Guide
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Pick a region to start exploring
          </p>
        </motion.div>

        {/* Sticky Search Bar (Matches WorldGuide) */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search regions..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredRegions.map((region) => (
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
                <region.icon className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">{region.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {region.count}
              </p>
              <p className="text-sm font-medium mt-2 text-muted-foreground/80">
                {region.description}
              </p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

// 2. State Index (Equivalent to CountryIndex)
const StateIndex = ({ regionId, onBack }: { regionId: string; onBack: () => void }) => {
  const [q, setQ] = useState("");

  const region = REGIONS.find(r => r.id === regionId);
  
  const filteredStates = useMemo(() => {
    // First get states in this region
    const statesInRegion = USA_STATE_DATA.filter(state => STATE_TO_REGION[state.name] === regionId);
    
    // Then filter by search query
    return q 
      ? statesInRegion.filter(s => s.name.toLowerCase().includes(q.toLowerCase()))
      : statesInRegion;
  }, [q, regionId]);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 gap-2 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Regions
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {region?.name}
          </h1>
          <p className="text-lg text-muted-foreground">Choose a state</p>
        </motion.div>

        {/* Sticky Search Bar */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search states..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {filteredStates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStates.map((state) => (
              <motion.div
                key={state.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StateCard state={state} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Map className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No states found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const USAGuide = () => {
  // We only track selected region here. 
  // Search is handled locally in the sub-components (like WorldGuide).
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {selectedRegion ? (
        <StateIndex 
          regionId={selectedRegion} 
          onBack={() => setSelectedRegion(null)} 
        />
      ) : (
        <RegionIndex 
          onSelect={setSelectedRegion} 
        />
      )}

      <Footer />
    </div>
  );
};

export default USAGuide;
