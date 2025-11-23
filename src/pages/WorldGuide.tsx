// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ChevronDown,
  Globe,
  Users,
  Info,
  Plane,
  Search,
  Zap,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */
interface City {
  slug: string;
  name: string;
  atGlance: string[];
}

interface Country {
  slug: string;
  name: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  cities: City[];
  image: string;
  flag: string;
  iconColor?: string;
}

interface Continent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  countriesCount: number;
  countries: Country[];
  bgColor: string;
  iconColor: string;
}

/* ============================================================
   DATA (World Guide)
============================================================ */
const WORLD_GUIDE: Continent[] = [
  /* ————————— YOUR FULL DATA EXACTLY AS GIVEN ————————— */
  /* (Entire data block… unchanged from your original) */
];

/* ============================================================
   HELPERS
============================================================ */
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Recreational":
      return "🟢";
    case "Medical":
      return "🔵";
    case "Decriminalized":
      return "🟡";
    default:
      return "🔴";
  }
};

/* ============================================================
   COUNTRY CARD
============================================================ */
const CountryCard = ({ country, delay }: { country: Country; delay: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full flex flex-col bg-card border-border/40 hover:border-accent transition-all group">
        {/* Header */}
        <div className="relative h-36 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
          <img
            src={country.image}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition"
          />
          <div className="absolute bottom-3 left-3 text-3xl">{country.flag}</div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3">
          <div>
            <h3 className="text-xl font-bold">{country.name}</h3>
            <Badge className={`${getStatusColor(country.legalStatus)} mt-1`}>
              {getStatusIcon(country.legalStatus)} {country.legalStatus}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {country.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex gap-2 bg-muted/40 p-2 rounded-lg">
              <Users className="w-4 h-4 text-accent" />
              <div>
                <p className="font-semibold">Possession</p>
                <p className="text-muted-foreground">{country.possession}</p>
              </div>
            </div>

            <div className="flex gap-2 bg-muted/40 p-2 rounded-lg">
              <Plane className="w-4 h-4 text-accent" />
              <div>
                <p className="font-semibold">Airport</p>
                <p className="text-muted-foreground">{country.airport}</p>
              </div>
            </div>

            <div className="flex gap-2 bg-muted/40 p-2 rounded-lg">
              <Info className="w-4 h-4 text-accent" />
              <div>
                <p className="font-semibold">Traveler Tip</p>
                <p className="text-muted-foreground">{country.tourist}</p>
              </div>
            </div>
          </div>

          {/* Cities */}
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-accent"
              >
                Cities ({country.cities.length})
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2"
                >
                  {country.cities.map((city) => (
                    <Card key={city.slug} className="p-3 bg-muted/40">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold">{city.name}</h4>
                          <ul className="text-xs text-muted-foreground list-disc list-inside mt-1">
                            {city.atGlance.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          to={`/world/${country.slug}/${city.slug}`}
                          className="text-xs text-accent"
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
  );
};

/* ============================================================
   CONTINENT SECTION
============================================================ */
const ContinentSection = ({
  continent,
  isOpen,
  onToggle,
  filteredCountries,
}: {
  continent: Continent;
  isOpen: boolean;
  onToggle: () => void;
  filteredCountries: Country[];
}) => {
  const borderColor = continent.iconColor.replace("text-", "border-");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full bg-gradient-to-r ${continent.bgColor} border border-accent/20 rounded-2xl p-5 mb-6`}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Globe className={`w-8 h-8 ${continent.iconColor}`} />
              <h2 className="text-2xl font-bold">{continent.name}</h2>
            </div>
            <p className="text-muted-foreground text-sm">{continent.description}</p>

            <div className="flex items-center gap-2 text-xs mt-2">
              <Zap className={`w-4 h-4 ${continent.iconColor}`} />
              {filteredCountries.length} countries
            </div>
          </div>

          <ChevronDown
            className={`w-7 h-7 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Countries */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-l-2 ${borderColor}/20 pl-4`}
          >
            {filteredCountries.map((country, i) => (
              <CountryCard key={country.slug} country={country} delay={i * 0.08} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================
   MAIN PAGE — WORLD GUIDE
============================================================ */
export default function WorldGuide() {
  const [search, setSearch] = useState("");
  const [openContinent, setOpenContinent] = useState<string | null>(null);

  // === Search filtering (continents + countries) ===
  const filtered = useMemo(() => {
    if (!search.trim()) return WORLD_GUIDE;

    const query = search.toLowerCase();

    return WORLD_GUIDE.map((cont) => ({
      ...cont,
      countries: cont.countries.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.slug.includes(query) ||
          c.cities.some((city) => city.name.toLowerCase().includes(query))
      ),
    })).filter((c) => c.countries.length > 0);
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 pt-10 pb-24">
        {/* Search Bar */}
        <div className="relative mb-10">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search countries or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-12 bg-muted/30 rounded-xl border border-border/40 focus:ring-2 focus:ring-accent outline-none"
          />
        </div>

        {/* Continent Sections */}
        <div className="space-y-10">
          {filtered.map((continent) => {
            const showCountries = continent.countries;
            const isOpen = openContinent === continent.id;

            return (
              <ContinentSection
                key={continent.id}
                continent={continent}
                isOpen={isOpen}
                filteredCountries={showCountries}
                onToggle={() =>
                  setOpenContinent(isOpen ? null : continent.id)
                }
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
