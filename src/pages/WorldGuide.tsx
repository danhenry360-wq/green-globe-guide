// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ChevronDown, MapPin, Plane, Users, Search, Globe, Zap
} from "lucide-react";
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

interface StateRegion {
  slug: string;
  name: string;
  regionalLaw: string;
  cities: City[];
}

interface Country {
  slug: string;
  name: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  states: StateRegion[];
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
        states: [
          { slug: "ontario", name: "Ontario", regionalLaw: "Legal age 19. Public smoking limited.", cities: [
            { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
          ]},
          { slug: "british-columbia", name: "British Columbia", regionalLaw: "Legal age 19. More relaxed public use rules.", cities: [
            { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
          ]},
          { slug: "quebec", name: "Quebec", regionalLaw: "Legal age 21. Stricter public use laws.", cities: [
            { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
          ]},
        ],
      },
      {
        slug: "usa",
        name: "United States",
        legalStatus: "Recreational",
        possession: "Varies by state",
        airport: "Federal prohibition—do not transport",
        tourist: "24+ states legal; check local laws",
        description: "Patchwork of state laws; Federal law prohibits transport and sale.",
        flag: "🇺🇸",
        image: "/dest-1.jpg",
        states: [
          { slug: "california", name: "California", regionalLaw: "Recreational since 2016. Possession: 28.5g.", cities: [
            { slug: "los-angeles", name: "Los Angeles", atGlance: ["500+ dispensaries", "Delivery available", "Tourist-friendly"] },
          ]},
          { slug: "colorado", name: "Colorado", regionalLaw: "Pioneer recreational state since 2012.", cities: [
            { slug: "denver", name: "Denver", atGlance: ["Pioneer state", "Recreational since 2014", "Mountain culture"] },
          ]},
          { slug: "new-york", name: "New York", regionalLaw: "Recreational since 2021.", cities: [
            { slug: "new-york-city", name: "New York City", atGlance: ["Recently legalized", "Delivery booming", "Check local zones"] },
          ]},
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
        states: [
          { slug: "federal-district", name: "Mexico City Region", regionalLaw: "Most progressive and tolerant area for private use.", cities: [
            { slug: "mexico-city", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Vibrant culture"] },
          ]},
          { slug: "quintana-roo", name: "Quintana Roo (Cancun)", regionalLaw: "Tourist zones have tighter security and enforcement.", cities: [
            { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Beautiful beaches"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "Laws apply nationwide.", cities: [
            { slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] },
            { slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale resort town", "Private circles", "Beautiful beaches"] },
          ]},
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
        states: [
          { slug: "national", name: "Medical Access", regionalLaw: "Medical access through authorized clinics.", cities: [
            { slug: "bogota", name: "Bogotá", atGlance: ["Capital city", "Medical clinics", "Cool mountain air"] },
            { slug: "medellin", name: "Medellín", atGlance: ["City of innovation", "Spring-like weather", "Transformed culture"] },
          ]},
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
        states: [
          { slug: "north-holland", name: "North Holland (Amsterdam)", regionalLaw: "Liberal coffee shop culture but strict public smoking rules.", cities: [
            { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
          ]},
          { slug: "south-holland", name: "South Holland (Rotterdam)", regionalLaw: "Stricter enforcement; residency checks common.", cities: [
            { slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops, less touristy", "Higher quality", "Residency checks"] },
          ]},
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
        states: [
          { slug: "berlin", name: "Berlin State", regionalLaw: "Very progressive, focus on social clubs and public safety.", cities: [
            { slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
          ]},
          { slug: "bavaria", name: "Bavaria (Munich)", regionalLaw: "Generally conservative region with stricter enforcement.", cities: [
            { slug: "munich", name: "Munich", atGlance: ["Conservative but OK", "English widely spoken", "Beer gardens = no weed"] },
          ]},
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
        states: [
          { slug: "catalonia", name: "Catalonia (Barcelona)", regionalLaw: "Home to the largest concentration of private cannabis clubs.", cities: [
            { slug: "barcelona", name: "Barcelona", atGlance: ["Cannabis clubs abundant", "Beach city vibes", "Membership clubs"] },
          ]},
          { slug: "madrid", name: "Community of Madrid", regionalLaw: "Capital hub with a large, active cannabis community.", cities: [
            { slug: "madrid", name: "Madrid", atGlance: ["Capital hub", "Active community", "City exploration"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "Decriminalization policy applies nationwide.", cities: [
            { slug: "lisbon", name: "Lisbon", atGlance: ["Capital vibrancy", "Coastal beauty", "Laid-back culture"] },
            { slug: "porto", name: "Porto", atGlance: ["Wine country", "Riverside charm", "Local community"] },
          ]},
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
        states: [
          { slug: "bangkok-central", name: "Bangkok & Central Region", regionalLaw: "Highest concentration of licensed medical facilities.", cities: [
            { slug: "bangkok", name: "Bangkok", atGlance: ["Med clinics with script", "Bustling capital", "Discreet only"] },
          ]},
          { slug: "south-islands", name: "Southern Islands (Phuket)", regionalLaw: "Tourist enforcement high; follow strict guidelines.", cities: [
            { slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach paradise", "Consider weed-free holiday"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "Extremely strict national laws; foreign use punishable.", cities: [
            { slug: "seoul", name: "Seoul", atGlance: ["Capital city", "Tech-forward", "Strict enforcement"] },
            { slug: "busan", name: "Busan", atGlance: ["Coastal port", "Relaxed vibe", "Beautiful beaches"] },
          ]},
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
        states: [
          { slug: "western-cape", name: "Western Cape (Cape Town)", regionalLaw: "More cannabis-aware culture, but public law is strict.", cities: [
            { slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] },
          ]},
          { slug: "gauteng", name: "Gauteng (Johannesburg)", regionalLaw: "Business hub; security-conscious areas require discretion.", cities: [
            { slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city", "Security-conscious", "Safari hub"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "The 'herb' is culturally accepted, but public consumption is illegal.", cities: [
            { slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] },
            { slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "General decriminalization for small amounts.", cities: [
            { slug: "bridgetown", name: "Bridgetown", atGlance: ["Capital city", "Harbor charm", "Local vibe"] },
            { slug: "carlisle-bay", name: "Carlisle Bay", atGlance: ["Beach resort area", "Water activities", "Tourist hotspot"] },
          ]},
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
        states: [
          { slug: "act", name: "ACT (Canberra)", regionalLaw: "Decriminalized personal possession and home grow.", cities: [
            { slug: "canberra", name: "Canberra", atGlance: ["Capital decriminalized", "Political hub", "More relaxed"] },
          ]},
          { slug: "new-south-wales", name: "New South Wales (Sydney)", regionalLaw: "Medical access through registered practitioners.", cities: [
            { slug: "sydney", name: "Sydney", atGlance: ["Major city", "Medical access", "Beautiful harbor"] },
          ]},
          { slug: "victoria", name: "Victoria (Melbourne)", regionalLaw: "Medical program is well-established; strict recreational laws.", cities: [
            { slug: "melbourne", name: "Melbourne", atGlance: ["Cultural hub", "Progressive city", "Coffee culture"] },
          ]},
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
        states: [
          { slug: "national", name: "National Overview", regionalLaw: "Strictly medical only; black market remains for recreational.", cities: [
            { slug: "auckland", name: "Auckland", atGlance: ["Largest city", "Medical access", "Vibrant culture"] },
            { slug: "wellington", name: "Wellington", atGlance: ["Capital city", "Progressive politics", "Creative scene"] },
          ]},
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
    COUNTRY CARD COMPONENT - MOBILE OPTIMIZED
============================================ */
interface CountryCardProps {
  country: Country;
  delay: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, delay }) => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const toggleRegion = (slug: string) => {
    setOpenRegion(openRegion === slug ? null : slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-full flex flex-col bg-card border border-border/40 rounded-lg hover:border-accent/50 hover:shadow-lg transition-all overflow-hidden group">
        {/* Header Image - Reduced height for mobile */}
        <div className="relative w-full h-20 sm:h-28 md:h-36 bg-muted overflow-hidden flex-shrink-0">
          <img
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Flag and Status - Bottom left corner */}
          <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl md:text-3xl leading-none">{country.flag}</span>
            <Badge className={`${getStatusColor(country.legalStatus)} text-xs px-2 py-0.5 whitespace-nowrap font-medium`}>
              {getStatusIcon(country.legalStatus)} {country.legalStatus}
            </Badge>
          </div>
        </div>

        {/* Content - Better spacing for mobile */}
        <div className="flex-1 p-2.5 sm:p-3 md:p-4 flex flex-col gap-2.5">
          {/* Country name - Controlled height */}
          <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2 leading-tight">{country.name}</h3>

          {/* Description - Limited lines */}
          <p className="text-xs sm:text-sm text-white/75 line-clamp-2 leading-snug">
            {country.description}
          </p>
          
          {/* Info Grid - Vertical stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs pt-1.5 border-t border-border/30">
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <Zap className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${continent.iconColor}`} />
              <span className="truncate">{filteredCountries.length} countries</span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 sm:w-8 sm:h-8 flex-shrink-0 transition-transform ${continent.iconColor}`}
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
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pl-2 sm:pl-4 border-l-2 ${borderColorClass}/20`}
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
  const [openContinents, setOpenContinents] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return WORLD_GUIDE;

    return WORLD_GUIDE.map((continent) => ({
      ...continent,
      countries: continent.countries.filter(
        (country) =>
          country.name.toLowerCase().includes(q) ||
          country.description.toLowerCase().includes(q) ||
          country.states.some(
            (state) => 
              state.name.toLowerCase().includes(q) ||
              state.regionalLaw.toLowerCase().includes(q) ||
              state.cities.some((city) => city.name.toLowerCase().includes(q))
          )
      ),
    })).filter((c) => c.countries.length > 0);
  }, [searchQuery]);

  const toggleContinent = (id: string) => {
    setOpenContinents((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-6 sm:mb-12 text-center"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
              Global Cannabis Guide
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              Explore cannabis laws by continent, country, region, and city
            </p>

            {/* Search Bar - Sticky */}
            <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-md -mx-3 sm:-mx-4 px-3 sm:px-4 py-2 sm:py-4 mb-4 sm:mb-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search countries, regions, cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-muted border border-border/40 rounded-lg sm:rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Continents Sections */}
          <div className="space-y-6 sm:space-y-10">
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

          {/* No Results */}
          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;-start gap-1.5 bg-muted/40 p-1.5 rounded">
              <Users className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs leading-tight">Possession</p>
                <p className="text-muted-foreground text-xs line-clamp-1 leading-tight">{country.possession}</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5 bg-muted/40 p-1.5 rounded">
              <Plane className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs leading-tight">Airport</p>
                <p className="text-muted-foreground text-xs line-clamp-1 leading-tight">{country.airport}</p>
              </div>
            </div>
          </div>

          {/* Regions Collapsible */}
          <div className="mt-2 space-y-1.5">
            <h4 className="text-xs font-bold text-foreground/80 flex items-center gap-1 leading-tight">
              <MapPin className="w-3 h-3 flex-shrink-0" /> Regions ({country.states.length})
            </h4>
            
            <div className="space-y-1.5 max-h-96 overflow-y-auto">
              {country.states.map((stateRegion) => (
                <Collapsible 
                  key={stateRegion.slug}
                  open={openRegion === stateRegion.slug} 
                  onOpenChange={() => toggleRegion(stateRegion.slug)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-left px-1.5 h-auto py-1.5 bg-muted hover:bg-muted/70 rounded text-xs"
                    >
                      <div className="flex flex-col items-start min-w-0 gap-0.5">
                        <span className="font-bold text-xs text-foreground truncate">{stateRegion.name}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{stateRegion.regionalLaw}</span>
                      </div>
                      <ChevronDown
                        className="w-3 h-3 text-accent flex-shrink-0 transition-transform"
                        style={{ transform: openRegion === stateRegion.slug ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <AnimatePresence>
                    {openRegion === stateRegion.slug && (
                      <CollapsibleContent asChild>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1.5 space-y-1.5 border-t border-border/30 pt-1.5"
                    >
                      {stateRegion.cities.map((city) => (
                        <Card
                          key={city.slug}
                          className="p-2 bg-card/50 border-border/40 hover:border-accent/50 hover:bg-card/70 transition-colors"
                        >
                          <div className="flex flex-col gap-1">
                            <div>
                              <h5 className="font-semibold text-xs text-foreground">{city.name}</h5>
                              <ul className="text-xs text-muted-foreground space-y-0.5 mt-0.5">
                                {city.atGlance.slice(0, 2).map((item, i) => (
                                  <li key={i} className="line-clamp-1">• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <Link
                              to={`/world/${country.slug}/${stateRegion.slug}/${city.slug}`}
                              className="text-xs text-accent hover:text-accent/80 font-bold self-start whitespace-nowrap mt-0.5"
                            >
                              View Guide →
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
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================
    CONTINENT SECTION COMPONENT
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <button
        onClick={onToggle}
        className={`w-full mb-4 sm:mb-6 bg-gradient-to-r ${continent.bgColor} hover:from-accent/15 hover:to-accent/8 border border-accent/20 hover:border-accent/40 rounded-lg sm:rounded-2xl p-3 sm:p-6 transition-all group`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <Globe className={`w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0 ${continent.iconColor}`} />
              <h2 className="text-lg sm:text-3xl font-bold text-foreground truncate">{continent.name}</h2>
            </div>
            <p className="text-xs sm:text-base text-muted-foreground line-clamp-1 sm:line-clamp-none">{continent.description}</p>
            <div className="flex items
