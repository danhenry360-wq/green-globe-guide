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

  // live filter (country, state, city, hotel name)
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    const allHotels = DATA.flatMap(country => 
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
      h.state.toLowerCase().includes(q) ||
      h.country.toLowerCase().includes(q) ||
      h.stateName.toLowerCase().includes(q)
    );
  }, [query]);

  // Group filtered hotels by Country/State for display
  const groupedHotels = useMemo(() => {
    return filteredData.reduce((acc, hotel) => {
      const key = `${hotel.country} - ${hotel.stateName}`;
      if (!acc[key]) {
        acc[key] = {
          country: hotel.country,
          state: hotel.stateName,
          flag: hotel.countryFlag,
          hotels: [],
        };
      }
      acc[key].hotels.push(hotel);
      return acc;
    }, {} as Record<string, { country: string, state: string, flag: string, hotels: (Hotel & { country: string, stateName: string, countryFlag: string })[] }>);
  }, [filteredData]); // Changed dependency to filteredData to re-run when filter changes

  return (
    <>
      <head>
        <title>BudQuest Verified 420-Friendly Hotels | Green Globe</title>
        <meta name="description" content="Book BudQuest-verified 420-friendly hotels by country and state. Cannabis policies checked, star-rated, premium stays." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, Green Globe, USA, Canada, Netherlands, marijuana accommodation" />
        <link rel="canonical" href="https://greenglobe.com/hotels" />

        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels | Green Globe" />
        <meta property="og:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <script type="application/ld+json">{JSON.stringify(HOTELS_STRUCTURED_DATA)}</script>
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels | Green Globe" />
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

            {/* FLAT LIST GROUPED BY COUNTRY/STATE */}
            <div className="space-y-10">
              {Object.entries(groupedHotels).map(([key, group]) => (
                <motion.section
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  {/* Group Header */}
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-accent/50">
                    <img src={group.flag} alt={group.country} className="h-6 w-8 rounded border border-border shadow-md" />
                    <h2 className="text-2xl font-bold text-white">
                      {group.country}
                      {group.country !== group.state && <span className="text-xl font-normal text-gray-400"> / {group.state}</span>}
                    </h2>
                    <Badge className="bg-accent/10 text-accent border border-accent/30">{group.hotels.length} Hotels</Badge>
                  </div>

                  {/* Hotel Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {group.hotels.map((hotel) => (
                        <HotelCard 
                          key={hotel.id} 
                          hotel={hotel} 
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.section>
              ))}
            </div>

            {/* RED DISCLAIMER – visible on dark */}
            <section className="mt-12">
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Legal Disclaimer
                    </span>
                    <ChevronDown className="w-4 h-4 ui-open:rotate-180 transition-transform" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="p-4 bg-card/50 border-border mt-2">
                    <p className="text-xs text-red-400">
                      Green Globe is an informational resource only. We do not provide legal advice. Always confirm current local laws and hotel policies before booking or consuming cannabis. International transport remains illegal.
                    </p>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
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
