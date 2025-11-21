// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

/* ----------------------------------------------------
   TYPES
----------------------------------------------------- */
type LegalStatus = "Recreational" | "Medical" | "Decriminalized";

interface City {
  slug: string;
  name: string;
  atGlance: string[];
}

interface Country {
  slug: string;
  name: string;
  region: string;
  legalStatus: LegalStatus;
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  cities: City[];
  image: string;
}

/* ----------------------------------------------------
   DATA (unchanged – kept for compatibility)
----------------------------------------------------- */
const COUNTRIES: Country[] = [
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

/* ----------------------------------------------------
   UTILS
---------------------------------------------------- */
const getStatusColor = (status: LegalStatus) => {
  const map: Record<LegalStatus, string> = {
    Recreational: "bg-green-500/90 text-white",
    Medical: "bg-blue-500/90 text-white",
    Decriminalized: "bg-amber-500/90 text-white",
  };
  return map[status] ?? "bg-red-500/90 text-white";
};

/* ----------------------------------------------------
   NEW: SCALABLE STORE & SEARCH
---------------------------------------------------- */
type NodeType = "continent" | "country" | "city";
interface TreeNode {
  id: string;
  type: NodeType;
  name: string;
  slug?: string;
  countrySlug?: string; // for city
  children?: TreeNode[];
}

const useGlobalTree = () => {
  return useMemo(() => {
    const continents = new Map<string, TreeNode>();
    COUNTRIES.forEach((c) => {
      if (!continents.has(c.region))
        continents.set(c.region, { id: c.region, type: "continent", name: c.region, children: [] });
      const countryNode: TreeNode = {
        id: c.slug,
        type: "country",
        name: c.name,
        slug: c.slug,
        children: [],
      };
      continents.get(c.region)!.children!.push(countryNode);
      c.cities.forEach((city) => {
        countryNode.children!.push({
          id: `${c.slug}-${city.slug}`,
          type: "city",
          name: city.name,
          slug: city.slug,
          countrySlug: c.slug,
        });
      });
    });
    return Array.from(continents.values());
  }, []);
};

const useSearchNodes = (q: string) => {
  const tree = useGlobalTree();
  return useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return [];
    const res: (TreeNode & { breadcrumb: string[] })[] = [];
    const walk = (n: TreeNode, breadcrumb: string[]) => {
      const next = [...breadcrumb, n.name];
      if (n.type !== "continent" && n.name.toLowerCase().includes(query))
        res.push({ ...n, breadcrumb });
      n.children?.forEach((c) => walk(c, next));
    };
    tree.forEach((t) => walk(t, []));
    return res;
  }, [q, tree]);
};

/* ----------------------------------------------------
   UI: ACCORDION (MOBILE) & MEGA MENU (DESKTOP)
---------------------------------------------------- */
const AccordionMobile = ({ node }: { node: TreeNode }) => {
  const [open, setOpen] = useState(false);
  const has = node.children && node.children.length > 0;
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between h-auto py-2 px-3">
          <span className="text-sm font-medium">{node.name}</span>
          {has && <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-4 pt-2 space-y-2">
          {node.children?.map((c) =>
            c.type === "city" ? (
              <Link
                key={c.id}
                to={`/world/${c.countrySlug}/${c.slug}`}
                className="block text-sm text-accent hover:underline"
              >
                {c.name}
              </Link>
            ) : (
              <AccordionMobile key={c.id} node={c} />
            )
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

/* ----------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */
const WorldGuide = () => {
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const tree = useGlobalTree();
  const searchRes = useSearchNodes(query);

  // close menu on resize
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMobileMenu(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // filtered countries for cards (legacy)
  const filteredCards = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.cities.some((city) => city.name.toLowerCase().includes(q))
    );
  }, [query]);

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
            <p className="text-xl text-muted-foreground mb-6">Search countries or cities</p>

            {/* sticky search bar with dropdown */}
            <div className="sticky top-20 z-20 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries, cities..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* scalable dropdown */}
              <AnimatePresence>
                {query && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 max-h-72 overflow-y-auto p-3 bg-card rounded-lg border border-border"
                  >
                    {searchRes.length === 0 && (
                      <p className="text-sm text-muted-foreground">No results</p>
                    )}
                    {searchRes.map((n) => (
                      <Link
                        key={n.id}
                        to={n.type === "city" ? `/world/${n.countrySlug}/${n.slug}` : `/world/${n.slug}`}
                        className="block px-2 py-1.5 text-sm hover:bg-accent/10 rounded"
                        onClick={() => setQuery("")}
                      >
                        <span className="text-muted-foreground text-xs">{n.breadcrumb.join(" → ")}</span>
                        <span className="ml-2 text-foreground">{n.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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

          {/* NAVIGATION: MOBILE ACCORDION / DESKTOP MEGA */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-xl font-bold">Browse by region</h2>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenu((v) => !v)}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* mobile accordion */}
          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden space-y-3 overflow-hidden"
              >
                {tree.map((con) => (
                  <Card key={con.id} className="p-3">
                    <AccordionMobile node={con} />
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* desktop mega menu */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tree.map((con) => (
              <Card key={con.id} className="p-4">
                <h3 className="font-bold mb-3">{con.name}</h3>
                <div className="space-y-3">
                  {con.children?.map((cou) => (
                    <div key={cou.id}>
                      <Link to={`/world/${cou.slug}`} className="font-medium text-sm hover:text-accent">
                        {cou.name}
                      </Link>
                      <div className="ml-2 mt-1 space-y-1">
                        {cou.children?.slice(0, 5).map((city) => (
                          <Link
                            key={city.id}
                            to={`/world/${city.countrySlug}/${city.slug}`}
                            className="block text-xs text-muted-foreground hover:text-accent"
                          >
                            {city.name}
                          </Link>
                        ))}
                        {cou.children && cou.children.length > 5 && (
                          <Link
                            to={`/world/${cou.slug}`}
                            className="block text-xs text-accent hover:underline"
                          >
                            +{cou.children.length - 5} more
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* COUNTRY CARDS (kept for legacy compatibility) */}
          {filteredCards.length === 0 && (
            <div className="text-center text-muted-foreground mt-10">No countries match your search.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredCards.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col group">
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

                    {/* collapsible cities */}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorldGuide;
