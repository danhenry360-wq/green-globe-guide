// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info, Search, Globe, ArrowRight, Zap, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* ============================================
   TYPES
============================================ */
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
}

interface Continent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  countriesCount: number;
  countries: Country[];
}

/* ============================================
   HELPERS
============================================ */
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
      return "⚪";
  }
};

/* ============================================
   COUNTRY CARD COMPONENT
============================================ */
const CountryCard: React.FC<{ country: Country; delay: number }> = ({ country, delay }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:border-accent/50 transition-colors">
        {/* Header */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden group">
          <img src={country.image} alt={country.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(country.legalStatus)} border-none text-xs sm:text-sm`}>
            {getStatusIcon(country.legalStatus)} {country.legalStatus}
          </Badge>
          <div className="absolute top-3 left-3 text-3xl">{country.flag}</div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{country.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{country.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-start gap-2 bg-muted/40 p-2 rounded-lg">
              <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Possession</p>
                <p className="text-muted-foreground break-words">{country.possession}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-muted/40 p-2 rounded-lg">
              <Plane className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Airport</p>
                <p className="text-muted-foreground break-words">{country.airport}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-muted/40 p-2 rounded-lg">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Traveler Tip</p>
                <p className="text-muted-foreground break-words">{country.tourist}</p>
              </div>
            </div>
          </div>

          <Collapsible open={open} onOpenChange={setOpen} className="mt-auto">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-accent hover:text-accent/80 px-2 h-auto py-2"
              >
                <span className="font-medium text-sm">Popular Cities ({country.cities.length})</span>
                <ChevronDown
                  className="w-4 h-4 transition-transform"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AnimatePresence>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2"
                >
                  {country.cities.map((city) => (
                    <Card key={city.slug} className="p-3 bg-muted/30 border-border/40 hover:border-accent/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground">{city.name}</h4>
                          <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                            {city.atGlance.map((item, i) => (
                              <li key={i} className="truncate">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <Link to={`/world/${country.slug}/${city.slug}`} className="text-xs text-accent hover:text-accent/80 font-medium shrink-0 whitespace-nowrap">
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

/* ============================================
   CONTINENT SECTION
============================================ */
const ContinentSection: React.FC<{ continent: Continent; filteredCountries: Country[] }> = ({ continent, filteredCountries }) => {
  const [isOpen, setIsOpen] = useState(false); // collapsed by default

  return (
    <motion.div className="mb-6 sm:mb-8">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full mb-4 sm:mb-6 bg-gradient-to-r from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 border border-accent/20 hover:border-accent/40 rounded-2xl p-4 sm:p-6 transition-all group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-left flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">{continent.emoji}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{continent.name}</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">{continent.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-accent">
              <Zap className="w-4 h-4" />
              <span>{filteredCountries.length} cannabis-friendly countries</span>
            </div>
          </div>
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0 transition-transform group-hover:scale-110"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pl-2 sm:pl-4 border-l-2 border-accent/20"
          >
            {filteredCountries.map((country, i) => (
              <CountryCard key={country.slug} country={country} delay={i * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================
   MAIN COMPONENT
============================================ */
const WorldGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return WORLD_GUIDE;

    return WORLD_GUIDE.map((continent) => ({
      ...continent,
      countries: continent.countries.filter(
        (country) =>
          country.name.toLowerCase().includes(q) ||
          country.description.toLowerCase().includes(q) ||
          country.cities.some((city) => city.name.toLowerCase().includes(q))
      ),
    })).filter((c) => c.countries.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
        <div className="container mx-auto max-w-7xl">

          {/* HERO SECTION */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-10 sm:mb-12 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">BudQuest Global Cannabis Guide</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">Explore cannabis laws by continent, country, and city worldwide</p>

            {/* STICKY SEARCH BAR */}
            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md -mx-4 px-4 py-3 sm:py-4 mb-6 sm:mb-8">
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries or cities (e.g., Amsterdam, California)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
                  aria-label="Search cannabis-friendly destinations"
                />
              </div>
            </div>
          </motion.div>

          {/* NO RESULTS */}
          {filteredData.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 sm:py-16">
              <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-muted-foreground">No destinations match "{searchQuery}". Try searching for a country or city name.</p>
            </motion.div>
          )}

          {/* CONTINENTS */}
          <div className="space-y-6 sm:space-y-8">
            {filteredData.map((continent) => (
              <ContinentSection key={continent.id} continent={continent} filteredCountries={continent.countries} />
            ))}
          </div>

          {/* FOOTER CTA */}
          {filteredData.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border text-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Need more information?</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">Check our detailed travel guides and hotel recommendations</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/guides">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90">
                    <ArrowRight className="w-4 h-4 mr-2" /> Travel Guides
                  </Button>
                </Link>
                <Link to="/hotels">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Building2 className="w-4 h-4 mr-2" /> 420-Friendly Hotels
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;
