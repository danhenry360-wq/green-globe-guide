// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, ExternalLink, Search, Building, Globe, Leaf, Info, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
   DATA – scalable by country / state / city
----------------------------------------------------- */
interface Hotel {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: number;
  policies: string;
  website: string;
  flag: string;
  priceRange?: string;
}

interface StateHotels {
  state: string;
  slug: string;
  flag: string;
  hotels: Hotel[];
}

interface CountryData {
  country: string;
  slug: string;
  flag: string;
  states: StateHotels[]; // for USA we list states; for others we can drop hotels directly
}

const DATA: CountryData[] = [
  // USA – notable cannabis states
  {
    country: "USA",
    slug: "usa",
    flag: "https://flagcdn.com/w40/us.png",
    states: [
      {
        state: "California",
        slug: "california",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 11,
            name: "Leaf & Rest Boutique",
            city: "Los Angeles",
            state: "CA",
            rating: 4.7,
            policies: "Complimentary smoking lounge. 24-hour room service.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$$",
          },
          {
            id: 12,
            name: "Pacific Retreat",
            city: "San Francisco",
            state: "CA",
            rating: 4.8,
            policies: "Rooftop lounge for guests. Wellness packages available.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$$",
          },
        ],
      },
      {
        state: "Colorado",
        slug: "colorado",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 13,
            name: "Green Valley Resort",
            city: "Denver",
            state: "CO",
            rating: 4.8,
            policies: "Cannabis consumption allowed in designated areas. Pet-friendly rooms available.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$",
          },
        ],
      },
      {
        state: "Oregon",
        slug: "oregon",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 14,
            name: "Mountain High Lodge",
            city: "Portland",
            state: "OR",
            rating: 4.9,
            policies: "Private balconies perfect for consumption. Eco-friendly amenities.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$",
          },
        ],
      },
      {
        state: "Washington",
        slug: "washington",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 15,
            name: "Urban Chill Hotel",
            city: "Seattle",
            state: "WA",
            rating: 4.6,
            policies: "420-friendly suites with premium ventilation systems.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$$",
          },
        ],
      },
      {
        state: "Arizona",
        slug: "arizona",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 16,
            name: "Desert Oasis Inn",
            city: "Phoenix",
            state: "AZ",
            rating: 4.5,
            policies: "Poolside relaxation zones. Cannabis concierge service.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$",
          },
        ],
      },
      {
        state: "Nevada",
        slug: "nevada",
        flag: "https://flagcdn.com/w40/us.png",
        hotels: [
          {
            id: 17,
            name: "Sin City Suites",
            city: "Las Vegas",
            state: "NV",
            rating: 4.7,
            policies: "Private balconies, 24-hour concierge, cannabis welcome kit.",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$$",
          },
        ],
      },
    ],
  },
  {
      country: "Canada",
      slug: "canada",
      flag: "https://flagcdn.com/w40/ca.png",
      states: [
        {
          state: "Canada",
          slug: "canada",
          flag: "https://flagcdn.com/w40/ca.png",
          hotels: [
            {
              id: 21,
              name: "Maple Leaf Lodge",
              city: "Toronto",
              state: "ON",
              rating: 4.8,
              policies: "Designated consumption lounges. Government-licensed retailer on-site.",
              website: "https://example.com",
              flag: "https://flagcdn.com/w40/ca.png",
              priceRange: "$$",
            },
            {
              id: 22,
              name: "Rocky Mountain Retreat",
              city: "Vancouver",
              state: "BC",
              rating: 4.9,
              policies: "Balcony-friendly, pet-friendly, edible welcome kit.",
              website: "https://example.com",
              flag: "https://flagcdn.com/w40/ca.png",
              priceRange: "$$$",
            },
          ],
        },
      ],
    },
    {
      country: "Netherlands",
      slug: "netherlands",
      flag: "https://flagcdn.com/w40/nl.png",
      states: [
        {
          state: "Netherlands",
          slug: "netherlands",
          flag: "https://flagcdn.com/w40/nl.png",
          hotels: [
            {
              id: 31,
              name: "Canal View Cannabis Hotel",
              city: "Amsterdam",
              state: "NH",
              rating: 4.7,
              policies: "Coffee-shop partners, no tobacco inside, canal-view rooms.",
              website: "https://example.com",
              flag: "https://flagcdn.com/w40/nl.png",
              priceRange: "$$$",
            },
          ],
        },
      ],
    },
  ];

/* --------------------  HELPERS  -------------------- */
const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
      />
    ))}
    <span className="text-xs text-muted-foreground ml-1">{value.toFixed(1)}</span>
  </div>
);

// New component for the Hotel Card
const HotelCard = ({ hotel, country, state }: { hotel: Hotel, country: string, state: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
    <Card className="p-4 bg-card/70 border-border/50 hover:border-accent transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Section: Name, Location, Rating, Price */}
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg flex items-center gap-2">
            {hotel.name}
            <Badge className="bg-green-600 text-white text-xs flex items-center gap-1 h-5 px-2">
              <Leaf className="w-3 h-3" />
              Verified
            </Badge>
          </h4>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {hotel.city}, {hotel.state} ({country})
          </p>
          <div className="flex items-center mt-2">
            <StarRating value={hotel.rating} />
            {hotel.priceRange && <span className="text-sm text-accent font-semibold ml-4">{hotel.priceRange}</span>}
          </div>
        </div>

        {/* Right Section: View Deal Button */}
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-accent hover:bg-accent/90 transition-colors px-4 py-2 rounded-lg shrink-0 mt-2 sm:mt-0"
        >
          View Deal <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Policy Section */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs font-medium text-gray-400 mb-1">420-Friendly Policy Highlights:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {hotel.policies}
        </p>
      </div>
    </Card>
  </motion.div>
);

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
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [openState, setOpenState] = useState<string | null>(null);

  // live filter (country, state, city, hotel name)
  const filteredData = useMemo(() => {
    const q = query.toLowerCase().trim();
    
    const allHotels = DATA.flatMap(country => 
      country.states.flatMap(state => 
        state.hotels.map(hotel => ({
          ...hotel,
          country: country.country,
          stateName: state.state,
          countryFlag: country.flag,
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
  }, [filteredData]);

  // mobile helpers
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

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
                          country={hotel.country} 
                          state={hotel.stateName} 
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
