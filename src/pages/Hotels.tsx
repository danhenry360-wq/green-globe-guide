// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, ExternalLink, Search, Building, Globe, Leaf, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
    // OTHER COUNTRIES – same pattern, just drop hotels directly
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
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-4 h-4 ${i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
    <span className="text-xs text-muted-foreground ml-1">{value.toFixed(1)}</span>
  </div>
);

/* --------------------  COMPONENT  -------------------- */
const Hotels = () => {
  const [query, setQuery] = useState("");
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [openState, setOpenState] = useState<string | null>(null);

  // live filter (country, state, city, hotel name)
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return DATA;
    return DATA.map((c) => ({
      ...c,
      states: c.states
        .map((s) => ({
          ...s,
          hotels: s.hotels.filter(
            (h) =>
              h.name.toLowerCase().includes(q) ||
              h.city.toLowerCase().includes(q) ||
              h.state.toLowerCase().includes(q) ||
              c.country.toLowerCase().includes(q) ||
              s.state.toLowerCase().includes(q)
          ),
        }))
        .filter((s) => s.hotels.length > 0),
    })).filter((c) => c.states.length > 0);
  }, [query]);

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
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels | Green Globe" />
        <meta name="twitter:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta name="twitter:image" content="https://greenglobe.com/og-hotels.jpg" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* HERO */}
            <section className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">BudQuest Verified Hotels</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Browse by country or state. Policies checked, premium experience.</p>
            </section>

            {/* STATIC SEARCH */}
            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search hotels, cities, states, countries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Search hotels"
                />
              </div>
            </div>

            {/* RESULTS */}
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground">No hotels match your search.</div>
            )}

            {/* COUNTRY ACCORDION – mobile first */}
            <div className="space-y-6">
              {filtered.map((country) => (
                <Card key={country.slug} className="border border-border bg-card/50">
                  <Collapsible
                    open={openCountry === country.slug}
                    onOpenChange={() => setOpenCountry(openCountry === country.slug ? null : country.slug)}
                  >
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full px-4 py-3 text-left">
                        <div className="flex items-center gap-3">
                          <img src={country.flag} alt={country.country} className="h-6 w-8 rounded border border-border" />
                          <span className="font-semibold text-white">{country.country}</span>
                          <Badge variant="secondary">{country.states.reduce((sum, s) => sum + s.hotels.length, 0)} hotels</Badge>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openCountry === country.slug ? "rotate-180" : ""}`} />
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-4 border-t border-border">
                        {country.states.map((state) => (
                          <Collapsible
                            key={state.slug}
                            open={openState === state.slug}
                            onOpenChange={() => setOpenState(openState === state.slug ? null : state.slug)}
                          >
                            <CollapsibleTrigger asChild>
                              <button className="flex items-center justify-between w-full py-2 text-left">
                                <span className="text-sm text-white">{state.state}</span>
                                <Badge variant="outline">{state.hotels.length}</Badge>
                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openState === state.slug ? "rotate-180" : ""}`} />
                              </button>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <div className="grid grid-cols-1 gap-3 pt-2">
                                {state.hotels.map((hotel) => (
                                  <Card key={hotel.id} className="p-3 bg-card/70 border-border/50">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-white text-sm">{hotel.name}</h4>
                                        <p className="text-xs text-muted-foreground">
                                          {hotel.city}, {hotel.state}
                                        </p>
                                        <StarRating value={hotel.rating} />
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{hotel.policies}</p>
                                      </div>
                                      <Badge className="bg-green-600 text-white text-xs flex items-center gap-1">
                                        <Leaf className="w-3 h-3" />
                                        Verified
                                      </Badge>
                                    </div>
                                    <a
                                      href={hotel.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-foreground mt-2"
                                    >
                                      Visit <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </Card>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
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
