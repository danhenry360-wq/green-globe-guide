// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, ExternalLink, Search, Building, Globe, Leaf, Info, Star } from "lucide-react";
import { HotelCard } from "@/components/HotelCard";
import { Hotel, CountryHotels } from "@/types/data";
import { HOTEL_DATA } from "@/data/hotel_data";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
   DATA – scalable by country / state / city
----------------------------------------------------- */
// Use imported data and types
const DATA: CountryHotels[] = HOTEL_DATA;

/* --------------------  HELPERS  -------------------- */


/* --------------------  COMPONENT  -------------------- */
const HOTELS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420-Friendly Hotels",
  description: "A collection of verified 420-friendly hotels worldwide.",
  mainEntity: DATA.map(country => ({
    "@type": "Place",
    name: country.country,
    address: {
      "@type": "PostalAddress",
      addressCountry: country.country,
    },
    hasMap: `https://greenglobe.com/hotels/${country.slug}`,
  }))
};

const Hotels = () => {
  const [query, setQuery] = useState("");

  // Clean state names by removing country in parentheses
  const cleanData = useMemo(() => {
    return DATA.map(country => ({
      ...country,
      states: country.states.map(state => ({
        ...state,
        // Remove country from state name (e.g., "Toronto (Canada)" becomes "Toronto")
        stateName: state.stateName.replace(/\s*\(.*\)$/, ''),
        hotels: state.hotels.map(hotel => ({
          ...hotel,
          // Also clean the hotel's state field if it exists
          state: hotel.state ? hotel.state.replace(/\s*\(.*\)$/, '') : hotel.state,
        }))
      }))
    }));
  }, []);

  // live filter (country, state, city, hotel name)
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    const allHotels = cleanData.flatMap(country => 
      country.states.flatMap(state => 
        state.hotels.map(hotel => ({
          ...hotel,
          country: country.country,
          stateName: state.stateName,
          countryFlag: country.flagPath,
        }))
      )
    );

    if (!q) return allHotels;

    return allHotels.filter(h => 
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      (h.state && h.state.toLowerCase().includes(q)) ||
      h.country.toLowerCase().includes(q) ||
      h.stateName.toLowerCase().includes(q)
    );
  }, [query, cleanData]);

  // Group filtered hotels by Country -> State -> City for hierarchical display
  const hierarchicalHotels = useMemo(() => {
    const countries: Record<string, { country: string, flag: string, states: Record<string, { state: string, cities: Record<string, (Hotel & { country: string, stateName: string, countryFlag: string })[]> }> }> = {};

    filteredData.forEach(hotel => {
      // 1. Group by Country
      if (!countries[hotel.country]) {
        countries[hotel.country] = {
          country: hotel.country,
          flag: hotel.countryFlag,
          states: {},
        };
      }

      // 2. Group by State
      const country = countries[hotel.country];
      if (!country.states[hotel.stateName]) {
        country.states[hotel.stateName] = {
          state: hotel.stateName,
          cities: {},
        };
      }

      // 3. Group by City (for simplicity, we'll just use city name as key)
      const stateGroup = country.states[hotel.stateName];
      if (!stateGroup.cities[hotel.city]) {
        stateGroup.cities[hotel.city] = [];
      }

      stateGroup.cities[hotel.city].push(hotel);
    });

    // Convert to array for rendering
    return Object.values(countries).map(country => ({
      ...country,
      states: Object.values(country.states).map(state => ({
        ...state,
        cities: Object.entries(state.cities).map(([city, hotels]) => ({
          city,
          hotels,
        })),
      })),
    }));
  }, [filteredData]);

  return (
    <>
      <head>
        <title>BudQuest Verified 420-Friendly Hotels | BudQuest</title>
        <meta name="description" content="Book BudQuest-verified 420-friendly hotels by country and state. Cannabis policies checked, star-rated, premium stays." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, BudQuest, USA, Canada, Netherlands, marijuana accommodation" />
        <link rel="canonical" href="https://greenglobe.com/hotels" />

        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels | BudQuest" />
        <meta property="og:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <script type="application/ld+json">{JSON.stringify(HOTELS_STRUCTURED_DATA)}</script>
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels | BudQuest" />
        <meta name="twitter:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta name="twitter:image" content="https://greenglobe.com/og-hotels.jpg" />
      </head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* HERO */}
            <section className="max-w-3xl mx-auto mb-12 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">BudQuest Verified Hotels</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Browse by country or state. Policies checked, premium experience.</p>
            </section>

            {/* STICKY SEARCH */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-border p-3 mb-10 max-w-xl mx-auto shadow-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="Search hotels, cities, states, countries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border-none focus:outline-none focus:ring-2 focus:ring-accent text-white"
                  aria-label="Search hotels"
                />
              </div>
            </div>

            {/* RESULTS */}
            <AnimatePresence mode="wait">
              {filteredData.length === 0 && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground py-10"
                >
                  <Building className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <p className="text-lg">No verified 420-friendly hotels match your search query.</p>
                  <p className="text-sm mt-1">Try a different city or country.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HIERARCHICAL LIST GROUPED BY COUNTRY -> STATE -> CITY */}
            <div className="space-y-10">
              {hierarchicalHotels.map((countryGroup) => (
                <Collapsible key={countryGroup.country} className="border border-border rounded-xl shadow-lg bg-card/50">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 md:p-6 hover:bg-card transition-colors rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <img src={countryGroup.flag} alt={countryGroup.country} className="h-6 w-8 rounded border border-border shadow-md" />
                      <h2 className="text-xl md:text-2xl font-bold text-white">{countryGroup.country}</h2>
                    </div>
                    <ChevronDown className="w-5 h-5 text-accent ui-open:rotate-180 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 md:p-6 border-t border-border/50 space-y-6">
                    {countryGroup.states.map((stateGroup) => (
                      <Collapsible key={stateGroup.state} className="border border-border rounded-lg bg-background/50">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-background transition-colors rounded-t-lg">
                          <h3 className="text-lg font-semibold text-accent">{stateGroup.state}</h3>
                          <ChevronDown className="w-4 h-4 text-accent ui-open:rotate-180 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-3 border-t border-border/50 space-y-4">
                          {stateGroup.cities.map((cityGroup) => (
                            <div key={cityGroup.city} className="space-y-3">
                              <h4 className="text-base font-bold text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gold" />
                                {cityGroup.city}
                                <Badge className="bg-gold/10 text-gold border border-gold/30 text-xs">{cityGroup.hotels.length} Hotels</Badge>
                              </h4>
                              <div className="grid grid-cols-1 gap-4">
                                <AnimatePresence>
                                  {cityGroup.hotels.map((hotel) => (
                                    <HotelCard 
                                      key={hotel.id} 
                                      hotel={hotel} 
                                    />
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* RED DISCLAIMER – FIXED: No dropdown, just static text */}
            <section className="mt-12">
              <Card className="p-4 bg-card/50 border-border-red border-red-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">Legal Disclaimer</span>
                </div>
                <p className="text-xs text-red-400">
                  BudQuest is an informational resource only. We do not provide legal advice. Always confirm current local laws and hotel policies before booking or consuming cannabis. International transport remains illegal.
                </p>
              </Card>
            </section>

            {/* INTERNAL LINKS FOR CRAWLERS */}
            <nav className="mt-10 text-center text-sm text-muted-foreground">
              Explore more:{" "}
              <Link to="/usa" className="text-accent hover:underline">
                USA Guide
              </Link>{" "}
              •{" "}
              <Link to="/world" className="text-accent hover:underline">
                World Guide
              </Link>
            </nav>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
