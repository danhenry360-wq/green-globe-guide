/* eslint-disable react-refresh/only-export-components */
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown, MapPin, Plane, Users, Info, Search, Globe,
  ArrowRight, Zap, Building2, Landmark, Mountain, Sun, Waves, Compass,
  ChevronRight, ArrowLeft, Palmtree,
} from "lucide-react";

// Helper to map string icon names to Lucide components
const IconMap: { [key: string]: React.ElementType } = {
  MapPin,
  Landmark,
  Mountain,
  Sun,
  Waves,
  Compass,
  Globe,
  Palmtree,
};
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo, useState } from "react";

/* ----------------------------------------------------
   4-LEVEL DATA MODEL
----------------------------------------------------- */
interface City {
  slug: string;
  name: string;
  atGlance: string[];
}
interface Region {
  slug: string;
  name: string;
  cities: City[];
}
interface Country {
  slug: string;
  name: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized" | "Illegal";
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  image: string;
  regions: Region[];
  flag: string; // Added flag
}
interface Continent {
  slug: string;
  name: string;
  icon: string; // Use string for icon name
  description: string;
  countriesCount: number;
  countries: Country[];
}

/* ----------------------------------------------------
   FULL WORLD DATA
----------------------------------------------------- */
const WORLD: Continent[] = [
  {
    slug: "north-america",
    name: "North America",
    icon: "MapPin",
    description: "Progressive cannabis policies with recreational and medical options",
    countriesCount: 3,
    countries: [
      {
        slug: "canada",
        name: "Canada",
        legalStatus: "Recreational",
        possession: "30 g public / unlimited home",
        airport: "30 g domestic only",
        tourist: "Gov stores only; ID required",
        description:
          "First G7 nation to legalise recreational cannabis nationwide.",
        image: "/dest-4.jpg",
        flag: "🇨🇦", // Added flag
        regions: [
          {
            slug: "ontario",
            name: "Ontario",
            cities: [
              {
                slug: "toronto",
                name: "Toronto",
                atGlance: [
                  "200+ legal stores",
                  "Hotels may ban smoking",
                  "Designated lounges exist",
                ],
              },
              {
                slug: "ottawa",
                name: "Ottawa",
                atGlance: ["Capital city", "Gov outlets", "Bilingual service"],
              },
            ],
          },
          {
            slug: "british-columbia",
            name: "British Columbia",
            cities: [
              {
                slug: "vancouver",
                name: "Vancouver",
                atGlance: [
                  "Culture widely accepted",
                  "Some stores have lounges",
                  "Parks = no smoking",
                ],
              },
              {
                slug: "victoria",
                name: "Victoria",
                atGlance: ["Island capital", "Relaxed vibe", "Ocean views"],
              },
            ],
          },
          {
            slug: "quebec",
            name: "Quebec",
            cities: [
              {
                slug: "montreal",
                name: "Montreal",
                atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"],
              },
              {
                slug: "quebec-city",
                name: "Quebec City",
                atGlance: ["Historic core", "Fewer stores", "European charm"],
              },
            ],
          },
        ],
      },
      {
        slug: "united-states",
        name: "United States",
        legalStatus: "Medical",
        possession: "Varies by state",
        airport: "Federal prohibition",
        tourist: "Check state laws; no interstate transport",
        description:
          "Federal illegal, but 38 states allow medical use; 24 allow recreational.",
        image: "/dest-1.jpg",
        flag: "🇺🇸", // Added flag
        regions: [
          {
            slug: "california",
            name: "California",
            cities: [
              {
                slug: "los-angeles",
                name: "Los Angeles",
                atGlance: ["Thousands of stores", "Delivery legal", "No public use"],
              },
              {
                slug: "san-francisco",
                name: "San Francisco",
                atGlance: [" lounges allowed", "Golden Gate parks ban", "Bring ID"],
              },
            ],
          },
          {
            slug: "colorado",
            name: "Colorado",
            cities: [
              {
                slug: "denver",
                name: "Denver",
                atGlance: ["Birthplace of rec", "Social lounges", "No national-park use"],
              },
              {
                slug: "boulder",
                name: "Boulder",
                atGlance: ["College town", "Mountain views", "Strict public ban"],
              },
            ],
          },
        ],
      },
      {
        slug: "mexico",
        name: "Mexico",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Zero tolerance",
        tourist: "Private use low priority; avoid public",
        description:
          "Supreme Court ruled prohibition unconstitutional; possession is administrative.",
        image: "/dest-4.jpg",
        flag: "🇲🇽", // Added flag
        regions: [
          {
            slug: "cdmx",
            name: "Mexico City",
            cities: [
              {
                slug: "mexico-city",
                name: "Mexico City",
                atGlance: [
                  "Capital vibe relaxed",
                  "Private use tolerated",
                  "Great street food",
                ],
              },
            ],
          },
          {
            slug: "quintana-roo",
            name: "Quintana Roo",
            cities: [
              {
                slug: "cancun",
                name: "Cancun",
                atGlance: [
                  "Resort security tight",
                  "Pool areas ban smoking",
                  "Enjoy beaches",
                ],
              },
              {
                slug: "tulum",
                name: "Tulum",
                atGlance: ["Boho-chic", "Beach clubs", "Discreet only"],
              },
            ],
          },
          {
            slug: "jalisco",
            name: "Jalisco",
            cities: [
              {
                slug: "guadalajara",
                name: "Guadalajara",
                atGlance: [
                  "Tech hub, younger crowd",
                  "More relaxed than coast",
                  "Check Airbnb rules",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "south-america",
    name: "South America",
    icon: "Palmtree", // Changed from MapPin to Palmtree
    description: "Leading legalization in Uruguay; progressive cities across the continent",
    countriesCount: 2,
    countries: [
      {
        slug: "uruguay",
        name: "Uruguay",
        legalStatus: "Recreational",
        possession: "40 g monthly (residents only)",
        airport: "Transport prohibited",
        tourist: "Tourists cannot purchase—locals only",
        description: "World's first full legalization; pharmacy sales and clubs for residents.",
        flag: "🇺🇾", // Added flag
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "montevideo",
            name: "Montevideo",
            cities: [
              {
                slug: "montevideo",
                name: "Montevideo",
                atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"],
              },
            ],
          },
          {
            slug: "punta-del-este",
            name: "Punta del Este",
            cities: [
              {
                slug: "punta-del-este",
                name: "Punta del Este",
                atGlance: ["Upscale resort town", "Private circles", "Beautiful beaches"],
              },
            ],
          },
          {
            slug: "colonia",
            name: "Colonia del Sacramento",
            cities: [
              {
                slug: "colonia",
                name: "Colonia del Sacramento",
                atGlance: ["Historic small town", "Relaxed vibe", "Day-trip to Buenos Aires"],
              },
            ],
          },
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
        flag: "🇨🇴", // Added flag
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "bogota",
            name: "Bogotá",
            cities: [
              {
                slug: "bogota",
                name: "Bogotá",
                atGlance: ["Capital city", "Medical clinics", "Cool mountain air"],
              },
            ],
          },
          {
            slug: "medellin",
            name: "Medellín",
            cities: [
              {
                slug: "medellin",
                name: "Medellín",
                atGlance: ["City of innovation", "Spring-like weather", "Transformed culture"],
              },
            ],
          },
          {
            slug: "cartagena",
            name: "Cartagena",
            cities: [
              {
                slug: "cartagena",
                name: "Cartagena",
                atGlance: ["Caribbean coast", "Historic charm", "Tourist hub"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    icon: "Landmark",
    description: "Diverse cannabis policies; from decriminalized to fully legal",
    countriesCount: 6, // Updated count
    countries: [
      {
        slug: "netherlands",
        name: "Netherlands",
        legalStatus: "Decriminalized",
        possession: "5 g tolerated",
        airport: "Do not transport",
        tourist: "Coffeeshops in most cities",
        description: "Famous for coffeeshops; technically illegal but tolerated.",
        flag: "🇳🇱", // Added flag
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [
              {
                slug: "amsterdam",
                name: "Amsterdam",
                atGlance: ["150+ coffeeshops", "Canal-side smoking", "Edibles common"],
              },
            ],
          },
        ],
      },
      {
        slug: "spain",
        name: "Spain",
        legalStatus: "Decriminalized",
        possession: "Private use OK",
        airport: "Do not transport",
        tourist: "Private clubs for members",
        description: "Private cannabis clubs are legal for members.",
        flag: "🇪🇸", // Added flag
        image: "/dest-2.jpg",
        regions: [
          {
            slug: "catalonia",
            name: "Catalonia",
            cities: [
              {
                slug: "barcelona",
                name: "Barcelona",
                atGlance: ["Hundreds of clubs", "Membership required", "Beach vibes"],
              },
            ],
          },
        ],
      },
      {
        slug: "portugal",
        name: "Portugal",
        legalStatus: "Decriminalized",
        possession: "Small amounts for personal use",
        airport: "Do not transport",
        tourist: "Focus on other attractions",
        description: "Decriminalized all drugs in 2001; health-focused approach.",
        flag: "🇵🇹", // Added flag
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "lisbon",
            name: "Lisbon",
            cities: [
              {
                slug: "lisbon",
                name: "Lisbon",
                atGlance: ["Capital vibrancy", "Coastal beauty", "Laid-back culture"],
              },
            ],
          },
        ],
      },
      {
        slug: "denmark",
        name: "Denmark",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; bike tours over smoke",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        flag: "🇩🇰", // Added flag
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "copenhagen-region",
            name: "Copenhagen Region",
            cities: [
              {
                slug: "copenhagen",
                name: "Copenhagen",
                atGlance: ["Bike capital", "Christiania enclave", "Medical only"],
              },
            ],
          },
        ],
      },
      {
        slug: "finland",
        name: "Finland",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; saunas over smoke",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        flag: "🇫🇮", // Added flag
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "helsinki-region",
            name: "Helsinki Region",
            cities: [
              {
                slug: "helsinki",
                name: "Helsinki",
                atGlance: ["Design capital", "Medical only", "Sauna culture"],
              },
            ],
          },
        ],
      },
      {
        slug: "norway",
        name: "Norway",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; fjords over flower",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        flag: "🇳🇴", // Added flag
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "oslo-region",
            name: "Oslo Region",
            cities: [
              {
                slug: "oslo",
                name: "Oslo",
                atGlance: ["Capital city", "Medical only", "Viking history"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "asia",
    name: "Asia",
    icon: "Mountain",
    description: "Limited legalization; medical options emerging in select countries",
    countriesCount: 2,
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        legalStatus: "Medical",
        possession: "Prescription required",
        airport: "Strictly prohibited",
        tourist: "Medical clinics need Thai doctor letter",
        description: "Decriminalized 2022, medical-only 2024. Recreational use illegal.",
        flag: "🇹🇭", // Added flag
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "bangkok",
            name: "Bangkok",
            cities: [
              {
                slug: "bangkok",
                name: "Bangkok",
                atGlance: ["Med clinics with script", "Bustling capital", "Discreet only"],
              },
            ],
          },
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
        flag: "🇰🇷", // Added flag
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "seoul",
            name: "Seoul",
            cities: [
              {
                slug: "seoul",
                name: "Seoul",
                atGlance: ["Capital city", "Tech-forward", "Strict enforcement"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "africa",
    name: "Africa",
    icon: "Sun",
    description: "Emerging legalization; South Africa leads the continent",
    countriesCount: 1,
    countries: [
      {
        slug: "south-africa",
        name: "South Africa",
        legalStatus: "Decriminalized",
        possession: "Private use & grow OK",
        airport: "Transport prohibited",
        tourist: "Private homes only—enjoy safari & wine",
        description: "Private use & cultivation legal; public use prohibited, no commercial sales.",
        flag: "🇿🇦", // Added flag
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "cape-town",
            name: "Cape Town",
            cities: [
              {
                slug: "cape-town",
                name: "Cape Town",
                atGlance: ["Private homes only", "Wine over weed", "Stunning nature"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "caribbean",
    name: "Caribbean",
    icon: "Waves",
    description: "Island culture with relaxed cannabis attitudes",
    countriesCount: 2,
    countries: [
      {
        slug: "jamaica",
        name: "Jamaica",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Do not transport",
        tourist: "Enjoy reggae & beaches; herb is secondary",
        description: "Decriminalized 2015; medical & Rasta sacramental use legal.",
        flag: "🇯🇲", // Added flag
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "kingston",
            name: "Kingston",
            cities: [
              {
                slug: "kingston",
                name: "Kingston",
                atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"],
              },
            ],
          },
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
        flag: "🇧🇧", // Added flag
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "bridgetown",
            name: "Bridgetown",
            cities: [
              {
                slug: "bridgetown",
                name: "Bridgetown",
                atGlance: ["Capital city", "Harbor charm", "Local vibe"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "oceania",
    name: "Oceania",
    icon: "Compass",
    description: "Australia and New Zealand leading with medical legalization",
    countriesCount: 2,
    countries: [
      {
        slug: "australia",
        name: "Australia",
        legalStatus: "Medical",
        possession: "Medical only with prescription",
        airport: "Strictly prohibited",
        tourist: "Medical clinics available",
        description: "Medical legalization federally; ACT decriminalized; states vary.",
        flag: "🇦🇺", // Added flag
        image: "/dest-2.jpg",
        regions: [
          {
            slug: "sydney",
            name: "Sydney",
            cities: [
              {
                slug: "sydney",
                name: "Sydney",
                atGlance: ["Major city", "Medical access", "Beautiful harbor"],
              },
            ],
          },
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
        flag: "🇳🇿", // Added flag
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "auckland",
            name: "Auckland",
            cities: [
              {
                slug: "auckland",
                name: "Auckland",
                atGlance: ["Capital city", "Medical access", "Coastal views"],
              },
            ],
          },
        ],
      },
    ],
  },
];

/* ----------------------------------------------------
   HELPER COMPONENTS
----------------------------------------------------- */

// Continent Card Component
const ContinentCard: React.FC<{ continent: Continent }> = ({ continent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = IconMap[continent.icon] || Globe;

  return (
    <Card className="mb-4 overflow-hidden shadow-lg dark:shadow-xl">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <IconComponent className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {continent.name}
          </h2>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {continent.countriesCount} Countries
          </Badge>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {continent.description}
              </p>
              <div className="space-y-2">
                {continent.countries.map((country) => (
                  <CountryLink key={country.slug} country={country} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

// Country Link Component
const CountryLink: React.FC<{ country: Country }> = ({ country }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: Country["legalStatus"]) => {
    switch (status) {
      case "Recreational":
        return "bg-green-500 hover:bg-green-600";
      case "Medical":
        return "bg-blue-500 hover:bg-blue-600";
      case "Decriminalized":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Illegal":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
        "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
      )}
      onClick={() => navigate(`/world-guide/${country.slug}`)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{country.flag}</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {country.name}
        </span>
      </div>
      <Badge
        className={cn(
          "text-white font-semibold text-xs px-2 py-1",
          getStatusColor(country.legalStatus)
        )}
      >
        {country.legalStatus}
      </Badge>
    </div>
  );
};

/* ----------------------------------------------------
   DETAIL PAGE COMPONENTS
----------------------------------------------------- */

// Country Detail Page Component
const CountryDetail: React.FC = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const navigate = useNavigate();

  const country = useMemo(() => {
    for (const continent of WORLD) {
      const foundCountry = continent.countries.find(
        (c) => c.slug === countrySlug
      );
      if (foundCountry) return foundCountry;
    }
    return null;
  }, [countrySlug]);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Card className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-500">Country Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              The requested country guide could not be located.
            </p>
            <Button onClick={() => navigate("/world-guide")} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to World Guide
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: Country["legalStatus"]) => {
    switch (status) {
      case "Recreational":
        return "bg-green-500 text-white";
      case "Medical":
        return "bg-blue-500 text-white";
      case "Decriminalized":
        return "bg-yellow-500 text-gray-900";
      case "Illegal":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: Country["legalStatus"]) => {
    switch (status) {
      case "Recreational":
        return <Zap className="w-5 h-5 mr-2" />;
      case "Medical":
        return <Building2 className="w-5 h-5 mr-2" />;
      case "Decriminalized":
        return <Info className="w-5 h-5 mr-2" />;
      case "Illegal":
        return <Plane className="w-5 h-5 mr-2" />;
      default:
        return <Globe className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/world-guide")}
            className="mb-6 text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to World Guide
          </Button>

          {/* Header Section */}
          <Card className="p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center">
                <span className="text-4xl mr-3">{country.flag}</span>
                {country.name}
              </h1>
              <Badge
                className={cn(
                  "text-sm font-semibold px-3 py-1.5 flex items-center",
                  getStatusColor(country.legalStatus)
                )}
              >
                {getStatusIcon(country.legalStatus)}
                {country.legalStatus}
              </Badge>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {country.description}
            </p>
          </Card>

          {/* Key Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <InfoCard
              title="Possession Limit"
              value={country.possession}
              icon={Users}
            />
            <InfoCard
              title="Airport Policy"
              value={country.airport}
              icon={Plane}
            />
            <InfoCard
              title="Tourist Access"
              value={country.tourist}
              icon={Search}
            />
          </div>

          {/* Regions Section */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
            Regional Guides
          </h2>
          <div className="space-y-4">
            {country.regions.map((region) => (
              <RegionCard key={region.slug} region={region} countrySlug={country.slug} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Info Card Component for Country Detail
const InfoCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
}> = ({ title, value, icon: Icon }) => (
  <Card className="p-4 flex flex-col space-y-2">
    <div className="flex items-center space-x-2 text-primary dark:text-primary-light">
      <Icon className="w-5 h-5" />
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </h3>
    </div>
    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
  </Card>
);

// Region Card Component for Country Detail
const RegionCard: React.FC<{ region: Region; countrySlug: string }> = ({
  region,
  countrySlug,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden shadow-md dark:shadow-lg">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {region.name}
        </h4>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {region.cities.map((city) => (
                <CityLink
                  key={city.slug}
                  city={city}
                  countrySlug={countrySlug}
                  regionSlug={region.slug}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

// City Link Component for Region Card
const CityLink: React.FC<{
  city: City;
  countrySlug: string;
  regionSlug: string;
}> = ({ city, countrySlug, regionSlug }) => {
  return (
    <Link
      to={`/world-guide/${countrySlug}/${regionSlug}/${city.slug}`}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800"
    >
      <div className="flex items-center space-x-2">
        <ChevronRight className="w-4 h-4 text-primary dark:text-primary-light" />
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {city.name}
        </span>
      </div>
      <div className="mt-2 sm:mt-0 flex flex-wrap gap-1">
        {city.atGlance.map((glance, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {glance}
          </Badge>
        ))}
      </div>
    </Link>
  );
};

// City Detail Page Component
const CityDetail: React.FC = () => {
  const { countrySlug, regionSlug, citySlug } = useParams<{
    countrySlug: string;
    regionSlug: string;
    citySlug: string;
  }>();
  const navigate = useNavigate();

  const city = useMemo(() => {
    for (const continent of WORLD) {
      const country = continent.countries.find((c) => c.slug === countrySlug);
      if (country) {
        const region = country.regions.find((r) => r.slug === regionSlug);
        if (region) {
          return region.cities.find((c) => c.slug === citySlug);
        }
      }
    }
    return null;
  }, [countrySlug, regionSlug, citySlug]);

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Card className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-500">City Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              The requested city guide could not be located.
            </p>
            <Button onClick={() => navigate("/world-guide")} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to World Guide
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(`/world-guide/${countrySlug}`)}
            className="mb-6 text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {countrySlug} Guide
          </Button>

          {/* Header Section */}
          <Card className="p-6 sm:p-8 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              {city.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Regional Guide for {regionSlug}
            </p>
          </Card>

          {/* At a Glance Section */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.atGlance.map((item, index) => (
              <Card key={index} className="p-4 flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary dark:text-primary-light flex-shrink-0" />
                <p className="text-gray-800 dark:text-gray-200">{item}</p>
              </Card>
            ))}
          </div>

          {/* Placeholder for more content */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
            Detailed City Information
          </h2>
          <Card className="p-6 text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              This section will contain detailed information about the city's cannabis culture,
              best dispensaries (if applicable), local laws, and recommended activities.
            </p>
            <p>
              **Coming Soon:** Comprehensive guides, user reviews, and interactive maps.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* ----------------------------------------------------
   MAIN WORLD GUIDE PAGE
----------------------------------------------------- */

// Main World Guide Component
const WorldGuide: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            The BudQuest World Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Explore cannabis laws, culture, and travel tips by continent and country.
          </p>

          <div className="space-y-6">
            {WORLD.map((continent) => (
              <ContinentCard key={continent.slug} continent={continent} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Router Component to handle WorldGuide and its sub-routes
const WorldGuideRouter: React.FC = () => {
  const { countrySlug, regionSlug, citySlug } = useParams<{
    countrySlug: string;
    regionSlug: string;
    citySlug: string;
  }>();

  if (countrySlug && regionSlug && citySlug) {
    return <CityDetail />;
  }

  if (countrySlug) {
    return <CountryDetail />;
  }

  return <WorldGuide />;
};

export default WorldGuideRouter;
