import { useState } from "react";
import { Filter } from "lucide-react";
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

// Region mapping for US states
const STATE_REGIONS: Record<string, string> = {
  'Alabama': 'South', 'Alaska': 'West', 'Arizona': 'West', 'Arkansas': 'South',
  'California': 'West', 'Colorado': 'West', 'Connecticut': 'Northeast', 'Delaware': 'South',
  'Florida': 'South', 'Georgia': 'South', 'Hawaii': 'West', 'Idaho': 'West',
  'Illinois': 'Midwest', 'Indiana': 'Midwest', 'Iowa': 'Midwest', 'Kansas': 'Midwest',
  'Kentucky': 'South', 'Louisiana': 'South', 'Maine': 'Northeast', 'Maryland': 'South',
  'Massachusetts': 'Northeast', 'Michigan': 'Midwest', 'Minnesota': 'Midwest', 'Mississippi': 'South',
  'Missouri': 'Midwest', 'Montana': 'West', 'Nebraska': 'Midwest', 'Nevada': 'West',
  'New Hampshire': 'Northeast', 'New Jersey': 'Northeast', 'New Mexico': 'West', 'New York': 'Northeast',
  'North Carolina': 'South', 'North Dakota': 'Midwest', 'Ohio': 'Midwest', 'Oklahoma': 'South',
  'Oregon': 'West', 'Pennsylvania': 'Northeast', 'Rhode Island': 'Northeast', 'South Carolina': 'South',
  'South Dakota': 'Midwest', 'Tennessee': 'South', 'Texas': 'South', 'Utah': 'West',
  'Vermont': 'Northeast', 'Virginia': 'South', 'Washington': 'West', 'West Virginia': 'South',
  'Wisconsin': 'Midwest', 'Wyoming': 'West'
};

const USAGuide = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: '', region: '' });

  const filteredStates = USA_STATE_DATA.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || state.status === filters.status;
    const matchesRegion = !filters.region || STATE_REGIONS[state.name] === filters.region;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  // Group states by region for mobile accordion view
  const groupedByRegion = filteredStates.reduce((acc, state) => {
    const region = STATE_REGIONS[state.name] || 'Other';
    if (!acc[region]) acc[region] = [];
    acc[region].push(state);
    return acc;
  }, {} as Record<string, typeof USA_STATE_DATA>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          
          {/* Mobile: Search & Filter Toggle */}
          <div className="md:hidden sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-4 border-b border-border/50 -mx-4 px-4">
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Search state name..."
                className="flex-grow h-12 bg-card border-border text-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                className="h-12 w-12 flex-shrink-0 bg-accent hover:bg-accent/90"
                aria-expanded={isFilterOpen}
                aria-controls="mobile-filter-panel"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  id="mobile-filter-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card/50 p-4 rounded-lg border border-border/50 mb-4 overflow-hidden"
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">Filter States</h3>
                  <FilterStates onFilterChange={setFilters} currentFilters={filters} />
                  <div className="mt-6">
                    <MapLegend />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isFilterOpen && (
              <div className="w-full mt-4">
                <MapLegend />
              </div>
            )}
          </div>

          {/* Desktop: Side-by-Side Layout */}
          <div className="hidden md:flex md:space-x-8 pt-6">
            <div className="w-1/4 sticky top-20 h-fit">
              <div className="p-6 rounded-lg bg-card/50 border border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground">Filter States</h3>
                <FilterStates onFilterChange={setFilters} currentFilters={filters} />
                <div className="mt-6">
                  <MapLegend />
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <Input
                placeholder="Search state name..."
                className="h-12 bg-card border-border text-foreground mb-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <h1 className="text-4xl font-bold mb-2 text-foreground">USA Cannabis Guide</h1>
              <p className="text-muted-foreground mb-6">
                {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'} found
              </p>
              <div className="grid gap-4">
                {filteredStates.map(state => (
                  <StateCard key={state.slug} state={state} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Accordion by Region */}
          <div className="md:hidden pt-4">
            <h1 className="text-3xl font-bold mb-2 text-foreground">USA Cannabis Guide</h1>
            <p className="text-muted-foreground mb-6">
              {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'} found
            </p>
            
            <Accordion type="multiple" className="w-full space-y-4">
              {Object.entries(groupedByRegion).map(([region, states]) => (
                <AccordionItem 
                  key={region} 
                  value={region}
                  className="border border-border/50 rounded-lg bg-card/30 px-4"
                >
                  <AccordionTrigger className="text-xl font-bold text-accent hover:no-underline">
                    {region} ({states.length})
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2 pb-4">
                    {states.map(state => (
                      <StateCard key={state.slug} state={state} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
