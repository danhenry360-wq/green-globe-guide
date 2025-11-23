// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ChevronDown, MapPin, Plane, Users, Globe, Zap, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  TYPES (unchanged)                                                 */
/* ------------------------------------------------------------------ */
interface City { slug: string; name: string; atGlance: string[] }
interface StateRegion { slug: string; name: string; regionalLaw: string; cities: City[] }
interface Country {
  slug: string; name: string; legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string; airport: string; tourist: string; description: string;
  states: StateRegion[]; image: string; flag: string;
}
interface Continent {
  id: string; name: string; emoji: string; description: string; countriesCount: number;
  countries: Country[]; bgColor: string; iconColor: string;
}

/* ------------------------------------------------------------------ */
/*  DATA (unchanged)                                                  */
/* ------------------------------------------------------------------ */
const WORLD_GUIDE: Continent[] = [
  /*  FULL OBJECTS REMOVED FOR BREVITY – PASTE YOUR ORIGINAL DATA HERE  */
  /*  (or keep the huge array you already have; it works untouched)     */
];

/* ------------------------------------------------------------------ */
/*  HELPERS (unchanged)                                               */
/* ------------------------------------------------------------------ */
const getStatusColor = (s: string) =>
  s === "Recreational" ? "bg-green-500/90 text-white" :
  s === "Medical" ? "bg-blue-500/90 text-white" :
  s === "Decriminalized" ? "bg-amber-500/90 text-white" :
  "bg-red-500/90 text-white";

const getStatusIcon = (s: string) =>
  s === "Recreational" ? "🟢" : s === "Medical" ? "🔵" : s === "Decriminalized" ? "🟡" : "🔴";

/* ------------------------------------------------------------------ */
/*  COUNTRY CARD – FIXED OVERFLOW                                     */
/* ------------------------------------------------------------------ */
interface CountryCardProps { country: Country; delay: number }
const CountryCard: React.FC<CountryCardProps> = ({ country, delay }) => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const toggle = (slug: string) => setOpenRegion((p) => (p === slug ? null : slug));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="min-w-0"                    /* 🔥 key line: prevents horizontal overflow */
    >
      <Card className="h-full flex flex-col bg-card border-border/40 hover:border-accent/50 hover:shadow-lg transition-all overflow-hidden group">
        {/* header image */}
        <div className="relative h-32 sm:h-40 bg-muted overflow-hidden">
          <img
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-col gap-1">
            <span className="text-3xl sm:text-4xl">{country.flag}</span>
            <Badge className={`${getStatusColor(country.legalStatus)} w-fit text-sm sm:text-base`}>
              {getStatusIcon(country.legalStatus)} {country.legalStatus}
            </Badge>
          </div>
        </div>

        {/* body */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">{country.name}</h3>
          <p className="text-sm sm:text-base text-white/90 font-medium">{country.description}</p>

          {/* info grid – overflow protected */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs sm:text-sm pt-2 border-t border-border/30">
            <div className="flex items-start gap-2 bg-muted/40 p-2 rounded-lg">
              <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">National Possession</p>
                <p className="text-muted-foreground break-words">{country.possession}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-muted/40 p-2 rounded-lg">
              <Plane className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Airport Rule</p>
                <p className="text-muted-foreground break-words">{country.airport}</p>
              </div>
            </div>
          </div>

          /*  states / regions  */
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-bold text-foreground/80 mb-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Explore Major Regions ({country.states.length})
            </h4>
            {country.states.map((st) => (
              <Collapsible key={st.slug} open={openRegion === st.slug} onOpenChange={() => toggle(st.slug)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-left px-3 h-auto py-2 bg-muted hover:bg-muted/70 rounded-lg"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-sm text-foreground block truncate">{st.name}</span>
                      <span className="text-xs text-muted-foreground block break-words">{st.regionalLaw}</span>
                    </div>
                    <ChevronDown
                      className="w-4 h-4 text-accent shrink-0 transition-transform"
                      style={{ transform: openRegion === st.slug ? "rotate(180deg)" : "rotate(0)" }}
                    />
                  </Button>
                </CollapsibleTrigger>

                <AnimatePresence>
                  {openRegion === st.slug && (
                    <CollapsibleContent forceMount asChild>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 p-3 pt-0 space-y-2 border-t border-border/40"
                      >
                        {st.cities.map((city) => (
                          <Card key={city.slug} className="p-3 bg-card/50 border-border/40 hover:border-accent/50 hover:bg-card/70 transition-colors">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="font-semibold text-sm text-foreground">{city.name}</h4>
                                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                                  {city.atGlance.map((it, i) => (
                                    <li key={i} className="truncate">{it}</li>
                                  ))}
                                </ul>
                              </div>
                              <Link
                                to={`/world/${country.slug}/${st.slug}/${city.slug}`}
                                className="text-xs text-accent hover:text-accent/80 font-bold shrink-0"
                              >
                                View City Guide →
                              </Link>
                            </div>
                          </Card>
                        ))}
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  CONTINENT SECTION (unchanged except css)                          */
/* ------------------------------------------------------------------ */
interface ContinentSectionProps {
  continent: Continent;
  isOpen: boolean;
  onToggle: () => void;
  filteredCountries: Country[];
}
const ContinentSection: React.FC<ContinentSectionProps> = ({
  continent,
  isOpen,
  onToggle,
  filteredCountries,
}) => {
  const borderColorClass = continent.iconColor.replace("text-", "border-");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <button
        onClick={onToggle}
        className={`w-full mb-4 sm:mb-6 bg-gradient-to-r ${continent.bgColor} hover:from-accent/15 hover:to-accent/8 border border-accent/20 hover:border-accent/40 rounded-2xl p-4 sm:p-6 transition-all group text-left`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Globe className={`w-8 h-8 sm:w-10 sm:h-10 ${continent.iconColor}`} />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{continent.name}</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">{continent.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
              <Zap className={`w-4 h-4 ${continent.iconColor}`} />
              <span>{filteredCountries.length} cannabis-friendly countries</span>
            </div>
          </div>
          <ChevronDown
            className={`w-6 h-6 sm:w-8 sm:h-8 shrink-0 transition-transform group-hover:scale-110 ${continent.iconColor}`}
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pl-2 sm:pl-4 border-l-2 ${borderColorClass}/20`}
          >
            {filteredCountries.map((c, i) => (
              <CountryCard key={c.slug} country={c} delay={i * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  PAGE WRAPPER (unchanged)                                          */
/* ------------------------------------------------------------------ */
const WorldGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openContinents, setOpenContinents] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return WORLD_GUIDE;
    return WORLD_GUIDE.map((cont) => ({
      ...cont,
      countries: cont.countries.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.states.some((s) =>
            s.name.toLowerCase().includes(q) ||
            s.regionalLaw.toLowerCase().includes(q) ||
            s.cities.some((city) => city.name.toLowerCase().includes(q))
          )
      ),
    })).filter((c) => c.countries.length > 0);
  }, [searchQuery]);

  const toggle = (id: string) =>
    setOpenContinents((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-10 sm:mb-12 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Global Cannabis Guide</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              Explore cannabis laws by continent, country, region, and city worldwide
            </p>

            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md -mx-4 px-4 py-3 sm:py-4 mb-6 sm:mb-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search countries, regions, or cities (e.g., California, Berlin, Toronto)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-muted border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8 sm:space-y-10">
            {filteredData.map((cont) => (
              <ContinentSection
                key={cont.id}
                continent={cont}
                isOpen={openContinents.includes(cont.id)}
                onToggle={() => toggle(cont.id)}
                filteredCountries={cont.countries}
              />
            ))}
          </div>

          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorldGuide;
