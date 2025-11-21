// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* ----------------------------------------------------
   DATA – same shape you already use
----------------------------------------------------- */
interface City {
  slug: string;
  name: string;
  atGlance: string[];
}

interface Country {
  slug: string;
  name: string;
  region: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  cities: City[];
  image: string;
}

import { COUNTRIES } from "../data/world_data";

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

  // live filter (name, region, city)
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO + STICKY SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Cannabis Laws</h1>
            <p className="text-xl text-muted-foreground mb-6">Search countries or cities</p>

            {/* sticky search – mobile friendly */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3">
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
          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground">No countries match your search.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
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

                    {/* quick facts row – mobile wraps gracefully */}
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

                    {/* collapsible city list – big tap target */}
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
