import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ChevronDown, MapPin, Plane, Users, Info, Search, Globe,
  Zap, X, Filter, Check, Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  bgColor: string;
  iconColor: string;
}

/* ============================================
   DATA – CONTINENT-ORGANIZED
============================================ */
const WORLD_GUIDE: Continent[] = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    description: "Progressive cannabis policies with recreational and medical options",
    countriesCount: 3,
    bgColor: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
    countries: [
      {
        slug: "canada",
        name: "Canada",
        legalStatus: "Recreational",
        possession: "30 g public / unlimited home",
        airport: "30 g domestic only",
        tourist: "Gov stores only; ID required",
        description: "First G7 nation to fully legalize recreational cannabis nationwide.",
        flag: "🇨🇦",
        image: "/dest-4.jpg",
        cities: [
          { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
          { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
          { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
        ],
      },
      {
        slug: "usa",
        name: "United States",
        legalStatus: "Recreational",
        possession: "Varies by state (CA: 28.5g)",
        airport: "Federal prohibition—do not transport",
        tourist: "24+ states legal; check local laws",
        description: "Patchwork of state laws; California, Colorado, and New York lead legalization.",
        flag: "🇺🇸",
        image: "/dest-1.jpg",
        cities: [
          { slug: "los-angeles", name: "Los Angeles, California", atGlance: ["500+ dispensaries", "Delivery available", "Tourist-friendly"] },
          { slug: "denver", name: "Denver, Colorado", atGlance: ["Pioneer state", "Recreational since 2014", "Mountain culture"] },
          { slug: "new-york", name: "New York City", atGlance: ["Recently legalized", "Delivery booming", "Check local zones"] },
        ],
      },
      {
        slug: "mexico",
        name: "Mexico",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Zero tolerance",
        tourist: "Private use low priority; avoid public",
        description: "Supreme Court ruled prohibition unconstitutional; private use is administrative.",
        flag: "🇲🇽",
        image: "/dest-4.jpg",
        cities: [
          { slug: "mexico-city", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Vibrant culture"] },
          { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Beautiful beaches"] },
          { slug: "guadalajara", name: "Guadalajara", atGlance: ["Tech hub", "Younger crowd", "Check Airbnb rules"] },
        ],
      },
    ],
  },
  {
    id: "south-america",
    name: "South America",
    emoji: "🌎",
    description: "Leading legalization in Uruguay; progressive cities across the continent",
    countriesCount: 2,
    bgColor: "from-lime-500/10 to-lime-400/5",
    iconColor: "text-lime-500",
    countries: [
      {
        slug: "uruguay",
        name: "Uruguay",
        legalStatus: "Recreational",
        possession: "40 g monthly (residents only)",
        airport: "Transport prohibited",
        tourist: "Tourists cannot purchase—locals only",
        description: "World's first full legalization; pharmacy sales and clubs for residents.",
        flag: "🇺🇾",
        image: "/dest-5.jpg",
        cities: [
          { slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] },
          { slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale resort town", "Private circles", "Beautiful beaches"] },
          { slug: "colonia", name: "Colonia del Sacramento", atGlance: ["Historic small town", "Relaxed vibe", "Day-trip to Buenos Aires"] },
        ],
      },
      {
        slug: "colombia",
        name: "Colombia",
        legalStatus: "Medical",
        possession: "Medical only with prescription",
        airport: "Strictly prohibited",
        tourist: "Medical clinics available",
        description: "Medical legalization since 2015; world's largest cannabis exporter.",
        flag: "🇨🇴",
        image: "/dest-4.jpg",
        cities: [
          { slug: "bogota", name: "Bogotá", atGlance: ["Capital city", "Medical clinics", "Cool mountain air"] },
          { slug: "medellin", name: "Medellín", atGlance: ["City of innovation", "Spring-like weather", "Transformed culture"] },
          { slug: "cartagena", name: "Cartagena", atGlance: ["Caribbean coast", "Historic charm", "Tourist hub"] },
        ],
      },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    emoji: "🇪🇺",
    description: "Diverse cannabis policies; from decriminalized to fully legal",
    countriesCount: 4,
    bgColor: "from-purple-500/10 to-purple-400/5",
    iconColor: "text-purple-500",
    countries: [
      {
        slug: "netherlands",
        name: "Netherlands",
        legalStatus: "Decriminalized",
        possession: "5 g tolerated",
        airport: "Do not transport",
        tourist: "Coffee-shop weed is potent—start small",
        description: "Sale tolerated under strict conditions; production remains illegal.",
        flag: "🇳🇱",
        image: "/dest-3.jpg",
        cities: [
          { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
          { slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops, less touristy", "Higher quality", "Residency checks"] },
          { slug: "the-hague", name: "The Hague", atGlance: ["Conservative feel", "Membership clubs", "Stiffer fines"] },
        ],
      },
      {
        slug: "germany",
        name: "Germany",
        legalStatus: "Recreational",
        possession: "25 g public / 50 g home",
        airport: "Domestic OK within limit",
        tourist: "Join social club for access",
        description: "Legalized April 2024; cannabis social clubs launching nationwide.",
        flag: "🇩🇪",
        image: "/dest-1.jpg",
        cities: [
          { slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
          { slug: "hamburg", name: "Hamburg", atGlance: ["St. Pauli most open", "Harbour lounges", "Use trams, not cars"] },
          { slug: "munich", name: "Munich", atGlance: ["Conservative but OK", "English widely spoken", "Beer gardens = no weed"] },
        ],
      },
      {
        slug: "spain",
        name: "Spain",
        legalStatus: "Decriminalized",
        possession: "Personal use tolerated",
        airport: "Do not transport",
        tourist: "Private clubs for tourists",
        description: "Private use and personal cultivation legal; sale remains illegal.",
        flag: "🇪🇸",
        image: "/dest-2.jpg",
        cities: [
          { slug: "barcelona", name: "Barcelona", atGlance: ["Cannabis clubs abundant", "Beach city vibes", "Membership clubs"] },
          { slug: "madrid", name: "Madrid", atGlance: ["Capital hub", "Active community", "City exploration"] },
          { slug: "valencia", name: "Valencia", atGlance: ["Coastal charm", "Relaxed atmosphere", "Paella & culture"] },
        ],
      },
      {
        slug: "portugal",
        name: "Portugal",
        legalStatus: "Decriminalized",
        possession: "Personal use decriminalized",
        airport: "Do not transport",
        tourist: "Private use only",
        description: "Decriminalized since 2001; cannabis treated as public health issue.",
        flag: "🇵🇹",
        image: "/dest-3.jpg",
        cities: [
          { slug: "lisbon", name: "Lisbon", atGlance: ["Capital vibrancy", "Coastal beauty", "Laid-back culture"] },
          { slug: "porto", name: "Porto", atGlance: ["Wine country", "Riverside charm", "Local community"] },
          { slug: "algarve", name: "Algarve", atGlance: ["Beach destination", "Tourist-friendly", "Warm climate"] },
        ],
      },
    ],
  },
  {
    id: "asia",
    name: "Asia",
    emoji: "🌏",
    description: "Limited legalization; medical options emerging in select countries",
    countriesCount: 2,
    bgColor: "from-rose-500/10 to-rose-400/5",
    iconColor: "text-rose-500",
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        legalStatus: "Medical",
        possession: "Prescription required",
        airport: "Strictly prohibited",
        tourist: "Medical clinics need Thai doctor letter",
        description: "Decriminalized 2022, medical-only 2024. Recreational use illegal.",
        flag: "🇹🇭",
        image: "/dest-6.jpg",
        cities: [
          { slug: "bangkok", name: "Bangkok", atGlance: ["Med clinics with script", "Bustling capital", "Discreet only"] },
          { slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach paradise", "Consider weed-free holiday"] },
          { slug: "chiang-mai", name: "Chiang Mai", atGlance: ["Conservative north", "Traditional meds", "Docs essential"] },
        ],
      },
      {
        slug: "south-korea",
        name: "South Korea",
        legalStatus: "Medical",
        possession: "Medical only with prescription",
        airport: "Strictly prohibited",
        tourist: "Hospitals and authorized clinics",
        description: "Medical-only legalization; recreational use illegal with harsh penalties.",
        flag: "🇰🇷",
        image: "/dest-5.jpg",
        cities: [
          { slug: "seoul", name: "Seoul", atGlance: ["Capital city", "Tech-forward", "Strict enforcement"] },
          { slug: "busan", name: "Busan", atGlance: ["Coastal port", "Relaxed vibe", "Beautiful beaches"] },
          { slug: "incheon", name: "Incheon", atGlance: ["Gateway city", "Modern infrastructure", "Medical access"] },
        ],
      },
    ],
  },
  {
    id: "africa",
    name: "Africa",
    emoji: "🌍",
    description: "Emerging legalization; South Africa leads the continent",
    countriesCount: 1,
    bgColor: "from-orange-500/10 to-orange-400/5",
    iconColor: "text-orange-500",
    countries: [
      {
        slug: "south-africa",
        name: "South Africa",
        legalStatus: "Decriminalized",
        possession: "Private use & grow OK",
        airport: "Transport prohibited",
        tourist: "Private homes only—enjoy safari & wine",
        description: "Private use & cultivation legal; public use prohibited, no commercial sales.",
        flag: "🇿🇦",
        image: "/dest-5.jpg",
        cities: [
          { slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] },
          { slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city", "Security-conscious", "Safari hub"] },
          { slug: "durban", name: "Durban", atGlance: ["Beach city", "Indian Ocean vibes", "Respect traditional areas"] },
        ],
      },
    ],
  },
  {
    id: "caribbean",
    name: "Caribbean",
    emoji: "🏝️",
    description: "Island culture with relaxed cannabis attitudes",
    countriesCount: 2,
    bgColor: "from-cyan-500/10 to-cyan-400/5",
    iconColor: "text-cyan-500",
    countries: [
      {
        slug: "jamaica",
        name: "Jamaica",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Do not transport",
        tourist: "Enjoy reggae & beaches; herb is secondary",
        description: "Decriminalized 2015; medical & Rasta sacramental use legal.",
        flag: "🇯🇲",
        image: "/dest-6.jpg",
        cities: [
          { slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] },
          { slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] },
          { slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Small-town friendly"] },
        ],
      },
      {
        slug: "barbados",
        name: "Barbados",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Do not transport",
        tourist: "Private use accepted",
        description: "Decriminalized small amounts; island community culture.",
        flag: "🇧🇧",
        image: "/dest-4.jpg",
        cities: [
          { slug: "bridgetown", name: "Bridgetown", atGlance: ["Capital city", "Harbor charm", "Local vibe"] },
          { slug: "carlisle-bay", name: "Carlisle Bay", atGlance: ["Beach resort area", "Water activities", "Tourist hotspot"] },
          { slug: "bathsheba", name: "Bathsheba", atGlance: ["Atlantic coast", "Rugged beauty", "Local community"] },
        ],
      },
    ],
  },
  {
    id: "oceania",
    name: "Oceania",
    emoji: "🇦🇺",
    description: "Australia and New Zealand leading with medical legalization",
    countriesCount: 2,
    bgColor: "from-teal-500/10 to-teal-400/5",
    iconColor: "text-teal-500",
    countries: [
      {
        slug: "australia",
        name: "Australia",
        legalStatus: "Medical",
        possession: "Medical only with prescription",
        airport: "Strictly prohibited",
        tourist: "Medical clinics available",
        description: "Medical legalization federally; ACT decriminalized; states vary.",
        flag: "🇦🇺",
        image: "/dest-2.jpg",
        cities: [
          { slug: "sydney", name: "Sydney", atGlance: ["Major city", "Medical access", "Beautiful harbor"] },
          { slug: "melbourne", name: "Melbourne", atGlance: ["Cultural hub", "Progressive city", "Coffee culture"] },
          { slug: "canberra", name: "Canberra", atGlance: ["Capital decriminalized", "Political hub", "More relaxed"] },
        ],
      },
      {
        slug: "new-zealand",
        name: "New Zealand",
        legalStatus: "Medical",
        possession: "Medical only",
        airport: "Strictly prohibited",
        tourist: "Medical prescriptions accepted",
        description: "Medical legalization; recreational referendums narrowly failed.",
        flag: "🇳🇿",
        image: "/dest-3.jpg",
        cities: [
          { slug: "auckland", name: "Auckland", atGlance: ["Largest city", "Medical access", "Vibrant culture"] },
          { slug: "wellington", name: "Wellington", atGlance: ["Capital city", "Progressive politics", "Creative scene"] },
          { slug: "christchurch", name: "Christchurch", atGlance: ["South Island", "Outdoor adventure", "Rebuild spirit"] },
        ],
      },
    ],
  },
];

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
      return "🔴";
  }
};

/* ============================================
   COUNTRY CARD COMPONENT (Enhanced)
============================================ */
interface CountryCardProps {
  country: Country;
  delay: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, delay }) => {
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="h-full flex flex-col bg-card border-border/40 hover:border-accent/50 hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Country Header with Image */}
        <div className="relative h-36 sm:h-44 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Globe className="w-28 h-28 sm:w-36 sm:h-36" />
          </div>
          
          {/* Image with loading state */}
          <img
            src={country.image}
            alt={country.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-70 group-hover:opacity-90 group-hover:scale-105' : 'opacity-0'
            }`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/50 to-transparent" />
          
          {/* Flag Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <div className="bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border/50">
              <span className="text-2xl sm:text-3xl">{country.flag}</span>
            </div>
          </div>
          
          {/* Status Badge - Top Right */}
          <div className="absolute top-3 right-3">
            <Badge className={`${getStatusColor(country.legalStatus)} text-xs shadow-lg`}>
              {getStatusIcon(country.legalStatus)} {country.legalStatus}
            </Badge>
          </div>
        </div>

        {/* Country Info */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
              {country.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {country.description}
            </p>
          </div>

          {/* Quick Info Grid - Enhanced */}
          <div className="space-y-2">
            <InfoRow icon={Users} label="Possession" value={country.possession} />
            <InfoRow icon={Plane} label="Airport" value={country.airport} />
            <InfoRow icon={Info} label="Traveler Tip" value={country.tourist} />
          </div>

          {/* Cities Collapsible */}
          <Collapsible open={open} onOpenChange={setOpen} className="mt-auto">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-accent hover:text-accent/80 hover:bg-accent/10 px-3 h-10 rounded-lg font-medium transition-all"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Popular Cities ({country.cities.length})</span>
                </span>
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-300"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 space-y-2"
              >
                {country.cities.map((city, idx) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="p-3 bg-muted/30 border-border/40 hover:border-accent/50 hover:bg-muted/50 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground mb-1">{city.name}</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {city.atGlance.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-accent mt-0.5">•</span>
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          onClick={() => alert(`Opening guide for ${city.name}`)}
                          className="text-xs text-accent hover:text-accent/80 font-medium shrink-0 whitespace-nowrap flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-md hover:bg-accent/20 transition-all"
                        >
                          Guide →
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>
    </motion.div>
  );
};

/* Info Row Component */
const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-2 bg-muted/40 hover:bg-muted/60 p-2.5 rounded-lg transition-colors group">
    <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
    <div className="min-w-0 flex-1">
      <p className="font-semibold text-foreground text-xs mb-0.5">{label}</p>
      <p className="text-muted-foreground text-xs leading-relaxed break-words">{value}</p>
    </div>
  </div>
);

/* ============================================
   CONTINENT SECTION (Enhanced)
============================================ */
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      {/* Continent Header - Enhanced for mobile */}
      <button
        onClick={onToggle}
        className={`w-full mb-4 sm:mb-6 bg-gradient-to-r ${continent.bgColor} hover:from-accent/15 hover:to-accent/8 border-2 border-accent/20 hover:border-accent/40 rounded-2xl p-4 sm:p-6 transition-all duration-300 group active:scale-[0.98]`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="text-left flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Globe className={`w-7 h-7 sm:w-10 sm:h-10 ${continent.iconColor} group-hover:rotate-12 transition-transform duration-300 shrink-0`} />
              <h2 className="text-xl sm:text-3xl font-bold text-foreground truncate">{continent.name}</h2>
            </div>
            <p className="text-xs sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
              {continent.description}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-foreground/80">
              <Zap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${continent.iconColor}`} />
              <span className="font-medium">{filteredCountries.length} countries</span>
            </div>
          </div>
          <div className="shrink-0">
            <ChevronDown
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${continent.iconColor} ${
                isOpen ? 'rotate-180' : 'group-hover:translate-y-1'
              }`}
            />
          </div>
        </div>
      </button>

      {/* Countries Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pl-0 sm:pl-4 border-l-0 sm:border-l-2 ${borderColorClass}/20`}
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

/* ============================================
   MAIN COMPONENT
============================================ */
const WorldGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openContinents, setOpenContinents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    return WORLD_GUIDE.map((continent) => ({
      ...continent,
      countries: continent.countries.filter((country) => {
        // Status filter
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(country.legalStatus);
        
        // Search filter
        const matchesSearch = !q || 
          country.name.toLowerCase().includes(q) ||
          country.description.toLowerCase().includes(q) ||
          country.cities.some((city) => city.name.toLowerCase().includes(q));
        
        return matchesStatus && matchesSearch;
      }),
    })).filter((c) => c.countries.length > 0);
  }, [searchQuery, selectedStatuses]);

  const toggleContinent = (id: string) => {
    setOpenContinents((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSearchQuery("");
  };

  const totalCountries = useMemo(() => {
    return filteredData.reduce((acc, continent) => acc + continent.countries.length, 0);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg">Cannabis World Guide</span>
          </div>
          <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8 sm:mb-10 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent">
              Global Cannabis Guide
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              Explore cannabis laws by continent, country, and city worldwide
            </p>
            <p className="text-sm text-muted-foreground/80">
              {totalCountries} countries • {filteredData.length} continents
            </p>
          </motion.div>

          {/* STICKY SEARCH & FILTER BAR */}
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md -mx-4 px-4 py-3 sm:py-4 mb-6 sm:mb-8 border-b border-border/40">
            <div className="max-w-2xl mx-auto space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search countries or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-muted border-2 border-border/40 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                    showFilters || selectedStatuses.length > 0
                      ? "bg-accent/10 border-accent/50 text-accent"
                      : "bg-muted border-border/40 hover:border-accent/30"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  {selectedStatuses.length > 0 && (
                    <Badge className="bg-accent text-white text-xs px-1.5 py-0 h-5">
                      {selectedStatuses.length}
                    </Badge>
                  )}
                </button>

                {/* Quick Filter Chips */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 flex-wrap"
                    >
                      {["Recreational", "Medical", "Decriminalized"].map((status) => (
                        <button
                          key={status}
                          onClick={() => toggleStatus(status)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedStatuses.includes(status)
                              ? `${getStatusColor(status)} shadow-md`
                              : "bg-muted hover:bg-muted/80 text-foreground border border-border/40"
                          }`}
                        >
                          {selectedStatuses.includes(status) && <Check className="w-3 h-3" />}
                          <span>{status}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Clear Filters */}
                {(selectedStatuses.length > 0 || searchQuery) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearFilters}
                    className="ml-auto text-xs text-accent hover:text-accent/80 font-medium px-3 py-2 hover:bg-accent/10 rounded-lg transition-all"
                  >
                    Clear All
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* CONTINENTS SECTIONS */}
          <div className="space-y-8 sm:space-y-10">
            {filteredData.map((continent) => (
              <ContinentSection
                key={continent.id}
                continent={continent}
                isOpen={openContinents.includes(continent.id)}
                onToggle={() => toggleContinent(continent.id)}
                filteredCountries={continent.countries}
              />
            ))}
          </div>

          {/* NO RESULTS */}
          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Globe className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Expand All Button */}
          {filteredData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <Button
                onClick={() => {
                  if (openContinents.length === filteredData.length) {
                    setOpenContinents([]);
                  } else {
                    setOpenContinents(filteredData.map((c) => c.id));
                  }
                }}
                variant="outline"
                className="border-2"
              >
                {openContinents.length === filteredData.length ? "Collapse All" : "Expand All"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Cannabis World Guide. Always check local laws before traveling.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WorldGuide;
