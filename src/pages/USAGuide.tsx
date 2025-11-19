// This assumes this is the top of your USA States listing page
import { Filter, Search } from "lucide-react";
// Import your existing FilterStates component (Screenshot 2025-11-19 225217.png)
import FilterStates from "@/components/FilterStates"; // Assuming this exists
import MapLegend from "@/components/MapLegend"; // Assuming this exists
import StateCard from "@/components/StateCard"; // Assuming this exists

const USAStatesPage = ({ states, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter/search the states list
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
    // Add logic for legal status and region filtering here
  );

  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* --- MOBILE: Search & Filter Toggle --- */}
        <div className="md:hidden sticky top-16 z-30 bg-black py-4 border-b border-gray-800">
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Search state name..."
              className="flex-grow h-12 bg-gray-900 border-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="h-12 w-12 flex-shrink-0 bg-accent hover:bg-accent/80"
              aria-expanded={isFilterOpen}
              aria-controls="mobile-filter-panel"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Mobile Filter Panel - Collapsible */}
          {isFilterOpen && (
            <motion.div 
              id="mobile-filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-950 p-4 rounded-lg border border-gray-800 mb-4 overflow-hidden"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Filter States</h3>
              {/* This is where your actual filter component would go */}
              <FilterStates onFilterChange={onFilterChange} /> 
              <div className="mt-6">
                <MapLegend />
              </div>
            </motion.div>
          )}

          {/* Always show the full legend if filters aren't open */}
          {!isFilterOpen && (
             <div className="w-full mt-4">
                 <MapLegend />
             </div>
          )}

        </div>

        {/* --- DESKTOP: Side-by-Side Filters (Hidden on Mobile) --- */}
        <div className="hidden md:flex md:space-x-8">
            <div className="w-1/4 sticky top-20 h-screen">
                <div className="p-4 rounded-lg bg-gray-950 border border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-white">Filter States</h3>
                    <FilterStates onFilterChange={onFilterChange} />
                    <div className="mt-6">
                        <MapLegend />
                    </div>
                </div>
            </div>
            
            {/* Desktop State List (3/4 width) */}
            <div className="md:w-3/4">
                <Input
                    placeholder="Search state name..."
                    className="h-12 bg-gray-900 border-gray-700 text-white mb-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h1 className="text-3xl font-bold mb-6 text-white">USA Cannabis Guide ({filteredStates.length} States)</h1>
                <div className="grid gap-6">
                    {filteredStates.map(state => (
                        <StateCard key={state.name} state={state} />
                    ))}
                </div>
            </div>
        </div>


        {/* --- MOBILE: State List (Full Width) --- */}
        <div className="md:hidden pt-4"> 
            <h1 className="text-2xl font-bold mb-4 text-white">USA Cannabis Guide ({filteredStates.length} States)</h1>
            <div className="grid gap-4">
                {filteredStates.map(state => (
                    <StateCard key={state.name} state={state} />
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
