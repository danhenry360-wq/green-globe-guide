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
import Link from "next/link";

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

// Add popular cities data
const POPULAR_CITIES = [
  { name: "Los Angeles", state: "California", stateSlug: "california", slug: "los-angeles" },
  { name: "Denver", state: "Colorado", stateSlug: "colorado", slug: "denver" },
  { name: "Las Vegas", state: "Nevada", stateSlug: "nevada", slug: "las-vegas" },
  { name: "Portland", state: "Oregon", stateSlug: "oregon", slug: "portland" },
  { name: "Seattle", state: "Washington", stateSlug: "washington", slug: "seattle" },
  { name: "San Francisco", state: "California", stateSlug: "california", slug: "san-francisco" },
  { name: "Chicago", state: "Illinois", stateSlug: "illinois", slug: "chicago" },
  { name: "Boston", state: "Massachusetts", stateSlug: "massachusetts", slug: "boston" },
  { name: "Phoenix", state: "Arizona", stateSlug: "arizona", slug: "phoenix" },
  { name: "Miami", state: "Florida", stateSlug: "florida", slug: "miami" }
];

const USAGuide = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: '', region: '' });

  // Enhanced search to include cities
  const filteredStates = USA_STATE_DATA.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         state.cities?.some(city => 
                           city.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
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
          
          {/* Mobile: Search & Filter Toggle - OPTIMIZED */}
          <div className="md:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-sm py-4 border-b border-border/50 -mx-4 px-4">
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Search state or city..."
                className="flex-grow h-12 bg-card border-border text-foreground text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => window.scrollTo(0, 0)}
              />
              <Button 
                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                className="h-12 w-12 flex-shrink-0 bg-accent hover:bg-accent/90 active:bg-accent/80"
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-card/95 backdrop-blur-lg p-4 rounded-lg border border-border/50 mb-4"
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
                
                {/* Popular Cities Quick Access */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Popular Cities</h3>
                  <div className="space-y-2">
                    {POPULAR_CITIES.slice(0, 6).map(city => (
                      <Link 
                        key={`${city.stateSlug}-${city.slug}`}
                        href={`/state/${city.stateSlug}/${city.slug}`}
                        className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 p-2 rounded transition-colors active:bg-accent/70"
                      >
                        {city.name}, {city.state}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              {/* Popular Cities Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Popular Cannabis Destinations</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {POPULAR_CITIES.map(city => (
                    <Link 
                      key={`${city.stateSlug}-${city.slug}`}
                      href={`/state/${city.stateSlug}/${city.slug}`}
                      className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors text-center group active:bg-accent/70"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-accent text-sm md:text-base">
                        {city.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{city.state}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <Input
                placeholder="Search state or city name..."
                className="h-12 bg-card border-border text-foreground mb-6 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <h1 className="text-4xl font-bold mb-2 text-foreground">USA Cannabis Guide</h1>
              <p className="text-muted-foreground mb-6">
                {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'} found
                {searchTerm && " matching your search"}
              </p>
              <div className="grid gap-4">
                {filteredStates.map(state => (
                  <StateCard key={state.slug} state={state} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Accordion by Region - OPTIMIZED */}
          <div className="md:hidden pt-4">
            {/* Popular Cities for Mobile - HORIZONTAL SCROLL */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-foreground">Popular Cities</h2>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-3 hide-scrollbar">
                {POPULAR_CITIES.map(city => (
                  <Link 
                    key={`${city.stateSlug}-${city.slug}`}
                    href={`/state/${city.stateSlug}/${city.slug}`}
                    className="flex-shrink-0 w-32 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors text-center active:bg-accent/70"
                  >
                    <div className="font-medium text-sm leading-tight">{city.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{city.state}</div>
                  </Link>
                ))}
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-foreground">USA Cannabis Guide</h1>
            <p className="text-muted-foreground mb-6">
              {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'} found
              {searchTerm && " matching your search"}
            </p>
            
            <Accordion type="multiple" className="w-full space-y-4">
              {Object.entries(groupedByRegion).map(([region, states]) => (
                <AccordionItem 
                  key={region} 
                  value={region}
                  className="border border-border/50 rounded-lg bg-card/30 px-4 active:bg-card/50"
                >
                  <AccordionTrigger className="text-xl font-bold text-accent hover:no-underline py-4">
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
      
      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .hide-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
};

export default USAGuide;
