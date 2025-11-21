// src/pages/WorldGuide.tsx  (search + mobile + continent groups)
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info, Globe, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* --------------  DATA  -------------- */
interface City { slug: string; name: string; atGlance: string[] }
interface Country {
  slug: string; name: string; region: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string; airport: string; tourist: string;
  description: string; cities: City[]; image: string;
}

const COUNTRIES: Country[] = [
  // === NORTH AMERICA ===
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    legalStatus: "Recreational",
    possession: "30 g public / unlimited home",
    airport: "30 g domestic only",
    tourist: "Gov stores only; ID required",
    description: "First G7 nation to legalise recreational cannabis nationwide.",
    cities: [
      { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
      { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
      { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
    ],
    image: "/dest-4.jpg",
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "North America",
    legalStatus: "Decriminalized",
    possession: "Small amounts tolerated",
    airport: "Zero tolerance",
    tourist: "Private use low priority; avoid public",
    description: "Supreme Court ruled prohibition unconstitutional; possession is administrative.",
    cities: [
      { slug: "mexico-city", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Great street food"] },
      { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Enjoy beaches"] },
      { slug: "guadalajara", name: "Guadalajara", atGlance: ["Tech hub, younger crowd", "More relaxed than coast", "Check Airbnb rules"] },
    ],
    image: "/dest-4.jpg",
  },

  // === EUROPE ===
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
    legalStatus: "Decriminalized",
    possession: "5 g tolerated",
    airport: "Do not transport",
    tourist: "Coffee-shop weed is potent—start small",
    description: "Sale tolerated under strict conditions; production remains illegal.",
    cities: [
      { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
      { slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops, less touristy", "Higher quality", "Residency checks"] },
      { slug: "the-hague", name: "The Hague", atGlance: ["Conservative feel", "Membership clubs", "Stiffer fines"] },
    ],
    image: "/dest-3.jpg",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    legalStatus: "Recreational",
    possession: "25 g public / 50 g home",
    airport: "Domestic OK within limit",
    tourist: "Join social club for access",
    description: "Legalised April 2024; cannabis social clubs launching nationwide.",
    cities: [
      { slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
      { slug: "hamburg", name: "Hamburg", atGlance: ["St. Pauli most open", "Harbour lounges discreet", "Use trams, don’t drive"] },
      { slug: "munich", name: "Munich", atGlance: ["Conservative but OK", "English widely spoken", "Beer gardens = no weed"] },
    ],
    image: "/dest-1.jpg",
  },

  // === SOUTH AMERICA ===
  {
    slug: "uruguay",
    name: "Uruguay",
    region: "South America",
    legalStatus: "Recreational",
    possession: "40 g monthly (residents)",
    airport: "Transport prohibited",
    tourist: "Tourists cannot purchase—locals only",
    description: "World’s first full legalisation; pharmacy sales & clubs for residents.",
    cities: [
      { slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] },
      { slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale = enforcement", "Private circles", "Enjoy beaches"] },
      { slug: "colonia", name: "Colonia", atGlance: ["Historic small town", "Use noticeable", "Day-trip to Buenos Aires"] },
    ],
    image: "/dest-5.jpg",
  },

  // === ASIA ===
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    legalStatus: "Medical",
    possession: "Prescription required",
    airport: "Strictly prohibited",
    tourist: "Medical clinics need Thai doctor letter",
    description: "Decriminalised 2022, medical-only 2024. Recreational use illegal.",
    cities: [
      { slug: "bangkok", name: "Bangkok", atGlance: ["Med clinics w/ script", "Cafés closed", "Discreet only"] },
      { slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach parties = no weed", "Consider weed-free holiday"] },
      { slug: "chiang-mai", name: "Chiang Mai", atGlance: ["Conservative north", "Traditional meds", "Docs essential"] },
    ],
    image: "/dest-6.jpg",
  },

  // === AFRICA ===
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Africa",
    legalStatus: "Decriminalized",
    possession: "Private use & grow OK",
    airport: "Transport prohibited",
    tourist: "Private homes only—enjoy safari & wine",
    description: "Private use & cultivation legal; public use prohibited, no commercial sales.",
    cities: [
      { slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] },
      { slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city, low profile", "Security tight", "Safari hub"] },
      { slug: "durban", name: "Durban", atGlance: ["Beach rules strict", "Indian Ocean vibes", "Respect traditional areas"] },
    ],
    image: "/dest-5.jpg",
  },

  // === CARIBBEAN ===
  {
    slug: "jamaica",
    name: "Jamaica",
    region: "Caribbean",
    legalStatus: "Decriminalized",
    possession: "Small amounts tolerated",
    airport: "Do not transport",
    tourist: "Enjoy reggae & beaches; herb is secondary",
    description: "Decriminalised 2015; medical & Rasta sacramental use legal. Public use frowned upon.",
    cities: [
      { slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] },
      { slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] },
      { slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Small-town friendly"] },
    ],
    image: "/dest-6.jpg",
  },
];

/* --------------  HELPERS  -------------- */
const getStatusColor = (status: string) => {
  switch (status) {
    case "Recreational":
      return "bg-green-500/90 text-white";
    case "Medical":
      return "bg-blue-500/90 text-white";
    case "Decriminalized":
      return "bg-amber-500/90 text-white";
    default:
      return "bg-red-500/90 text-white";
  }
};

/* --------------  COMPONENT  -------------- */
const WorldGuide = () => {
  const [query, setQuery] = useState("");

  // filter countries + re-group by continent
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.cities.some((city) => city.name.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, c) => {
      acc[c.region] = acc[c.region] || [];
      acc[c.region].push(c);
      return acc;
    }, {} as Record<string, Country[]>);
  }, [filtered]);

  const continents = Object.keys(grouped);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO + SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Cannabis Laws</h1>
            <p className="text-xl text-muted-foreground mb-6">Filter by country, city or continent</p>

            {/* SEARCH BAR – mobile friendly */}
            <div className="relative w-full max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries, cities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </motion.div>

          {/* MAP PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 max-w-6xl mx-auto"
          >
            <div className="aspect-video relative rounded-2xl border border-white/10 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <p className="text-muted-foreground">Interactive world map coming soon</p>
            </div>
          </motion.div>

          {/* RESULTS */}
          {continents.length === 0 && (
            <div className="text-center text-muted-foreground">No countries match your search.</div>
          )}

          {continents.map((cont) => (
            <section key={cont} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="h-1 w-10 rounded bg-accent" />
                {cont}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[cont].map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                      {/* image + badge */}
                      <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/10">
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className={`absolute top-3 right-3 ${getStatusColor(c.legalStatus)} border-none`}>
                          {c.legalStatus}
                        </Badge>
                      </div>

                      <div className="p-5 flex flex-col gap-4 flex-1">
                        {/* header */}
                        <div>
                          <h3 className="text-xl font-bold mb-1">{c.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {c.region}
                          </p>
                        </div>

                        {/* quick facts */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold">Possession</p>
                              <p className="text-muted-foreground">{c.possession}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Plane className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold">Airport</p>
                              <p className="text-muted-foreground">{c.airport}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold">Tourist tip</p>
                              <p className="text-muted-foreground">{c.tourist}</p>
                            </div>
                          </div>
                        </div>

                        {/* description */}
                        <p className="text-sm text-muted-foreground">{c.description}</p>

                        {/* collapsible city list – mobile friendly */}
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-between text-accent">
                              <span className="font-medium">Popular cities</span>
                              <ChevronDown className="w-4 h-4 ui-open:rotate-180 transition-transform" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <AnimatePresence>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-3"
                              >
                                {c.cities.map((city) => (
                                  <Card
                                    key={city.slug}
                                    className="p-4 bg-card/50 border-border/40 hover:border-accent/50 transition-colors"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <Link
                                          to={`/world/${c.slug}/${city.slug}`}
                                          className="font-semibold text-foreground hover:text-accent"
                                        >
                                          {city.name}
                                        </Link>
                                        <ul className="text-xs text-muted-foreground list-disc ml-4 mt-1 space-y-0.5">
                                          {city.atGlance.map((g, i) => (
                                            <li key={i}>{g}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <Link
                                        to={`/world/${c.slug}/${city.slug}`}
                                        className="text-xs text-accent hover:underline shrink-0 ml-3"
                                      >
                                        Guide →
                                      </Link>
                                    </div>
                                  </Card>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}

          {/* bottom spacer */}
          <div className="h-20" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;
