// src/pages/Dispensary.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, ExternalLink, Search, Building, Globe, Leaf, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DISPENSARY_DATA, CountryData, StateDispensaries, Dispensary } from "@/lib/dispensary_data";

const DATA: CountryData[] = DISPENSARY_DATA;

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
const DISPENSARY_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified Dispensaries",
  description: "A collection of verified dispensaries worldwide.",
  mainEntity: DATA.map(country => ({
    "@type": "Place",
    name: country.country,
    address: {
      "@type": "PostalAddress",
      addressCountry: country.country,
    },
    hasMap: `https://greenglobe.com/dispensary/${country.slug}`,
  }))
};

const Dispensary = () => {
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
          dispensaries: s.dispensaries.filter(
            (h) =>
              h.name.toLowerCase().includes(q) || h.specialty.toLowerCase().includes(q) ||
              h.city.toLowerCase().includes(q) ||
              h.state.toLowerCase().includes(q) ||
              c.country.toLowerCase().includes(q) ||
              s.state.toLowerCase().includes(q)
          ),
        }))
        .filter((s) => s.dispensaries.length > 0),
    })).filter((c) => c.states.length > 0);
  }, [query]);

  // mobile helpers
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <>
      <head>
        <title>BudQuest Verified Dispensaries | Green Globe</title>
        <meta name="description" content="Find BudQuest-verified dispensaries by country and state. Verified products, great service, and legal compliance." />
        <meta name="keywords" content="dispensaries, 420 shops, cannabis stores, BudQuest verified, Green Globe, USA, Canada, Netherlands, marijuana" />
        <link rel="canonical" href="https://greenglobe.com/dispensary" />

        <meta property="og:title" content="BudQuest Verified Dispensaries | Green Globe" />
        <meta property="og:description" content="Find verified dispensaries worldwide. Verified products, great service, and legal compliance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/dispensary" />
        <script type="application/ld+json">{JSON.stringify(DISPENSARY_STRUCTURED_DATA)}</script>
        <meta property="og:image" content="https://greenglobe.com/og-dispensary.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified Dispensaries | Green Globe" />
        <meta name="twitter:description" content="Find verified dispensaries worldwide. Verified products, great service, and legal compliance." />
        <meta name="twitter:image" content="https://greenglobe.com/og-dispensary.jpg" />


      </head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* HERO */}
            <section className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">BudQuest Verified Dispensaries</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Browse by country or state. Policies checked, premium experience.</p>
            </section>

            {/* STICKY SEARCH */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3 mb-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search dispensaries, cities, states, countries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Search dispensaries"
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
                      <button className="flex items-center justify-between w-full px-4 py-4 text-left hover:bg-card/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <img src={country.flag} alt={country.country} className="h-6 w-8 rounded border border-border" />
                          <span className="font-bold text-lg text-white">{country.country}</span>
                          <Badge variant="secondary" className="hidden sm:inline-flex">{country.states.reduce((sum, s) => sum + s.dispensaries.length, 0)} dispensaries</Badge>
                        </div>
                        <ChevronDown className={`w-6 h-6 text-accent transition-transform ${openCountry === country.slug ? "rotate-180" : ""}`} />
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-4 border-t border-border/50">
                        {country.states.map((state) => (
                          <Collapsible
                            key={state.slug}
                            open={openState === state.slug}
                            onOpenChange={() => setOpenState(openState === state.slug ? null : state.slug)}
                          >
                            <CollapsibleTrigger asChild>
                              <button className="flex items-center justify-between w-full py-3 text-left border-b border-border/30 last:border-b-0">
                                <span className="text-base font-medium text-white">{state.state}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">{state.dispensaries.length} dispensaries</Badge>
                                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openState === state.slug ? "rotate-180" : ""}`} />
                                </div>
                              </button>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <div className="grid grid-cols-1 gap-3 pt-2">
                                {state.dispensaries.map((dispensary) => (
                                  <Card key={dispensary.id} className="p-4 bg-card/70 border-border/50 hover:border-accent transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                      <div className="flex-1">
                                        <h4 className="font-bold text-white text-base flex items-center gap-2">
                                          {dispensary.name}
                                          <Badge className="bg-green-600 text-white text-xs flex items-center gap-1 h-5 px-2">
                                            <Leaf className="w-3 h-3" />
                                            Verified
                                          </Badge>
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          <MapPin className="w-3 h-3 inline mr-1" />
                                          {dispensary.city}, {dispensary.state}
                                        </p>
                                        <div className="flex items-center mt-1">
                                          <StarRating value={dispensary.rating} />
                                          <Badge variant="outline" className="text-xs ml-3">{dispensary.specialty}</Badge>
                                          {dispensary.priceRange && <span className="text-xs text-muted-foreground ml-3">{dispensary.priceRange}</span>}
                                        </div>
                                      </div>
                                      <a
                                        href={dispensary.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-foreground shrink-0 mt-2 sm:mt-0"
                                      >
                                        View Website <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">
                                      **Specialty:** {dispensary.specialty}
                                    </p>
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

export default Dispensary;
