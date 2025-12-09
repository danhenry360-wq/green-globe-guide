import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, ArrowLeft, X,
  Mountain, Sun, Wheat, Building2, ChevronRight, Map, Star, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import StateCard from "@/components/StateCard";
import { USA_STATE_DATA, USA_GUIDE_LAST_UPDATED } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   DATA CONFIGURATION
----------------------------------------------------- */

const REGIONS = [
  {
    id: 'West', 
    name: 'The West',
    // SEO Update: Mentioning "Hubs" (for CO) and general culture without promising dispensaries everywhere
    description: 'Pacific Coast Culture & Rockies Cannabis Hubs',
    count: '13 states',
    icon: Mountain, 
  },
  {
    id: 'Midwest',
    name: 'The Midwest',
    // SEO Update: Focus on "Markets" and "Regulations"
    description: 'Great Lakes & Emerging Legal Markets',
    count: '12 states',
    icon: Wheat, 
  },
  {
    id: 'South',
    name: 'The South',
    // SEO Update: Accurate reflection of the region (Medical/Strict/Illegal)
    description: 'Medical Programs & State Regulations',
    count: '17 jurisdictions',
    icon: Sun, 
  },
  {
    id: 'Northeast',
    name: 'The Northeast',
    // SEO Update: Focus on the rapid legalization here
    description: 'New England Adult-Use & Legalization',
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

// Search Results View - Shows matching states from any region
const SearchResults = ({ 
  query, 
  onClear 
}: { 
  query: string; 
  onClear: () => void;
}) => {
  const filteredStates = useMemo(() => {
    return USA_STATE_DATA.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
      <Button
        variant="ghost"
        onClick={onClear}
        className="mb-6 gap-2 pl-0 hover:bg-transparent"
        aria-label="Clear search results"
      >
        <X className="w-4 h-4" /> Clear search
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          Cannabis Search Results
        </h1>
        <p className="text-lg text-muted-foreground">
          {filteredStates.length} state{filteredStates.length !== 1 ? 's' : ''} found matching "{query}"
        </p>
      </motion.div>

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
            We couldn't find a state matching "{query}". Try searching for a specific state name to check its legal status.
          </p>
        </div>
      )}
    </div>
  );
};

// Region Index (Browse mode)
const RegionIndex = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        {/* SEO Update: H1 optimized for broad appeal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3">
          <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            USA Cannabis Law & Travel Guide
          </span>
        </h1>
        
        {/* SEO Update: Accurate for all states (legal/illegal) */}
        <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Explore the complete <strong>USA cannabis map</strong>. Check specific <strong>state laws</strong> and <strong>legalization status</strong> everywhere, or discover our detailed <strong>Travel Hubs</strong> for 420 friendly vacations.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          Regulations last verified: {new Date(USA_GUIDE_LAST_UPDATED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </motion.div>

      {/* Featured State Hub - COLORADO ONLY (Full Hub Status) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <Link to="/usa/colorado" aria-label="Visit Colorado Cannabis Travel Hub">
          <Card className="relative overflow-hidden rounded-2xl border-accent/30 bg-gradient-to-r from-accent/10 via-card to-accent/5 hover:border-accent/50 transition-all group">
            <div 
              className="absolute inset-0 bg-[url('/dest-2.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" 
              role="img"
              aria-label="Scenic Colorado mountains representing cannabis tourism"
            />
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Star className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">Featured Hub</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Recreational Legal</Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    Colorado Cannabis Travel Hub
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {/* SEO Update: Specific "Hub" keywords applied only here */}
                    Full guide to 4 cities, top-rated <strong>dispensaries</strong>, and <strong>420 friendly stays</strong> in the Rockies.
                  </p>
                </div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
                Explore Colorado
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
            role="button"
            aria-label={`Browse cannabis laws in ${region.name}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <region.icon className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold">{region.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground font-semibold">
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
  );
};

// State Index (Within a region)
const StateIndex = ({ regionId, onBack }: { regionId: string; onBack: () => void }) => {
  const region = REGIONS.find(r => r.id === regionId);
  
  const statesInRegion = useMemo(() => {
    return USA_STATE_DATA.filter(state => STATE_TO_REGION[state.name] === regionId);
  }, [regionId]);

  return (
    <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
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
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          {region?.name} Cannabis Guides
        </h1>
        {/* SEO Update: Broad text that covers both detailed hubs and basic law guides */}
        <p className="text-lg text-muted-foreground">
          Select a state to view <strong>legalization status</strong>, possession limits, and <strong>420 friendly options</strong> where available.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statesInRegion.map((state) => (
          <motion.div
            key={state.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StateCard state={state} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const USAGuide = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.length >= 2;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Fixed Search Bar - Always visible */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search states, laws, or hubs..."
              aria-label="Search for cannabis laws by state"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content based on search/navigation state */}
      {isSearching ? (
        <SearchResults 
          query={searchQuery} 
          onClear={() => setSearchQuery("")} 
        />
      ) : selectedRegion ? (
        <StateIndex 
          regionId={selectedRegion} 
          onBack={() => setSelectedRegion(null)} 
        />
      ) : (
        <RegionIndex onSelect={setSelectedRegion} />
      )}

      <Footer />
    </div>
  );
};

export default USAGuide;
