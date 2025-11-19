import React, { useState, KeyboardEvent } from "react";
import { Filter, Search, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// --- Dummy UI Component Imports (to make code runnable) ---
// Assuming these are simple shadcn/ui components:
const Input = (props) => <input {...props} className={"p-2 border rounded " + props.className} />;
const Button = (props) => <button {...props} className={"p-2 rounded " + props.className}>{props.children}</button>;
const Card = (props) => <div {...props} className={"p-4 rounded-lg shadow-lg " + props.className}>{props.children}</div>;
const Badge = (props) => <span {...props} className={"inline-block px-3 py-1 text-xs font-semibold rounded-full " + props.className}>{props.children}</span>;

// --- Mock Data Structure (for runnable example) ---
interface StateData {
  name: string;
  status: 'Recreational' | 'Medical' | 'Decriminalized' | 'Illegal';
  region: 'West' | 'Midwest' | 'South' | 'Northeast';
  details: string;
}

const MOCK_STATES: StateData[] = [
  { name: "California", status: "Recreational", region: "West", details: "Adult-use is legal." },
  { name: "Colorado", status: "Recreational", region: "West", details: "First state to legalize." },
  { name: "New York", status: "Recreational", region: "Northeast", details: "Legal since 2021." },
  { name: "Florida", status: "Medical", region: "South", details: "Medical use available." },
  { name: "Texas", status: "Illegal", region: "South", details: "Strictly illegal." },
  { name: "Oregon", status: "Recreational", region: "West", details: "Legal for adult use." },
  { name: "Illinois", status: "Recreational", region: "Midwest", details: "Adult-use is legal." },
  { name: "Alabama", status: "Illegal", region: "South", details: "Illegal." },
  { name: "Hawaii", status: "Decriminalized", region: "West", details: "Decriminalized." },
];

// --- Mock Component Implementations ---

// 1. Mock MapLegend
const MapLegend = () => (
    <div className="p-3 bg-gray-900 rounded-lg text-white/90 text-sm">
        <h4 className="font-bold mb-2 text-white">Legal Status Legend:</h4>
        <div className="space-y-1">
            <div className="flex items-center"><Badge className="bg-green-500/90 w-4 h-4 mr-2" /> Recreational</div>
            <div className="flex items-center"><Badge className="bg-amber-700/90 w-4 h-4 mr-2" /> Medical</div>
            <div className="flex items-center"><Badge className="bg-amber-500/90 w-4 h-4 mr-2" /> Decriminalized</div>
            <div className="flex items-center"><Badge className="bg-red-700/90 w-4 h-4 mr-2" /> Illegal</div>
        </div>
    </div>
);

// 2. Mock StateCard
const StateCard = ({ state }) => {
    const colorMap = {
        'Recreational': 'bg-green-500/90',
        'Medical': 'bg-amber-700/90',
        'Decriminalized': 'bg-amber-500/90',
        'Illegal': 'bg-red-700/90',
    };
    const cardColor = colorMap[state.status] || 'bg-gray-700';

    return (
        <Card className="bg-gray-900 border border-gray-800 flex justify-between items-center hover:border-accent transition-colors cursor-pointer">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-1">{state.name}</h3>
                <p className="text-gray-400 text-sm">{state.details}</p>
            </div>
            <Badge className={`${cardColor} text-white text-xs px-3 py-1`}>
                {state.status}
            </Badge>
        </Card>
    );
};

// 3. Mock FilterStates
const FilterStates = ({ onFilterChange }) => {
    // This is a simplified mock. In a real app, this would handle state for legal status and region dropdowns/checkboxes.
    const handleFilter = (key, value) => {
        // Mock function to simulate filter changes
        console.log(`Filtering by ${key}: ${value}`);
        // In the real component, this would call onFilterChange({ ...currentFilters, [key]: value })
    };

    return (
        <div className="space-y-4">
            <select 
                onChange={(e) => handleFilter('status', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
                <option value="">Filter by Status</option>
                <option value="Recreational">Recreational</option>
                <option value="Medical">Medical</option>
                <option value="Decriminalized">Decriminalized</option>
                <option value="Illegal">Illegal</option>
            </select>
            <select 
                onChange={(e) => handleFilter('region', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
                <option value="">Filter by Region</option>
                <option value="West">West</option>
                <option value="Midwest">Midwest</option>
                <option value="South">South</option>
                <option value="Northeast">Northeast</option>
            </select>
            <Button 
                onClick={() => handleFilter('reset', true)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white"
            >
                Reset Filters
            </Button>
        </div>
    );
};

// --- Main USAStatesPage Component ---

const USAStatesPage = () => { // Removed props destructuring for simplicity
  // Use mock state data
  const states = MOCK_STATES; 
  // Dummy onFilterChange function for the mock component
  const onFilterChange = (filters) => { console.log("Filters changed:", filters); };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // In a full application, you would also track active filters here.

  // Simple search filtering logic
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
    // A real implementation would include the state filter logic here
  );

  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* --- MOBILE: Search & Filter Toggle (Sticky Header) --- */}
        <div className="md:hidden sticky top-0 z-30 bg-black py-4 border-b border-gray-800">
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Search state name..."
              className="flex-grow h-12 bg-gray-900 border-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="h-12 w-12 flex-shrink-0 bg-accent hover:bg-accent/80 text-white"
              aria-expanded={isFilterOpen}
              aria-controls="mobile-filter-panel"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Mobile Filter Panel - Collapsible */}
          {/* Using simple conditional rendering instead of framer-motion for full deployability */}
          {isFilterOpen && (
            <div 
              id="mobile-filter-panel"
              className="bg-gray-950 p-4 rounded-lg border border-gray-800 mb-4 overflow-hidden transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Filter States</h3>
              <FilterStates onFilterChange={onFilterChange} /> 
              <div className="mt-6">
                <MapLegend />
              </div>
            </div>
          )}

          {/* Always show the full legend if filters aren't open */}
          {/* This is a tradeoff: showing legend or filters. Let's make the legend always visible for context. */}
          {!isFilterOpen && (
             <div className="w-full mt-4">
                 <MapLegend />
             </div>
          )}

        </div>

        {/* --- DESKTOP: Side-by-Side Filters --- */}
        <div className="hidden md:flex md:space-x-8 pt-6">
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

export default USAStatesPage;
