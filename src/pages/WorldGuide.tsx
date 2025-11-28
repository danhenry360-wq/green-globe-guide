/* eslint-disable react-refresh/only-export-components */
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Search,
  MapPin,
  Plane,
  Users,
  Info,
  ArrowLeft,
  Globe,
  Mountain,
  Palmtree,
  Waves,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
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
}
interface Continent {
  slug: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  countries: Country[];
}

/* ----------------------------------------------------
   FULL WORLD DATA 
----------------------------------------------------- */
const WORLD: Continent[] = [
  {
    slug: "north-america",
    name: "North America",
    icon: Globe,
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
        regions: [
          {
            slug: "ontario",
            name: "Ontario",
            cities: [
              {
                slug: "toronto",
                name: "Toronto",
                atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"],
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
                atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"],
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
                atGlance: ["Lounges allowed", "Golden Gate parks ban", "Bring ID"],
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
        regions: [
          {
            slug: "cdmx",
            name: "Mexico City",
            cities: [
              {
                slug: "mexico-city",
                name: "Mexico City",
                atGlance: ["Capital vibe relaxed", "Private use tolerated", "Great street food"],
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
                atGlance: ["Resort security tight", "Pool areas ban smoking", "Enjoy beaches"],
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
                atGlance: ["Tech hub", "Younger crowd", "Check Airbnb rules"],
              },
            ],
          },
        ],
      },
    ],
  },
  // ... (Keeping the rest of your data exactly as is for integrity)
  // To save space in this answer, I am assuming the huge WORLD array 
  // from your previous message continues here. 
  // If you copy-paste, ensure you keep the full WORLD array you provided.
];

/* ---------- helpers ---------- */
const statusColor = (s: string) => {
  switch (s) {
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

/* ---------- sub-components ---------- */

// 1. Continent Index with Sticky Search
const ContinentIndex = () => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      q
        ? WORLD.filter((c) =>
            c.name.toLowerCase().includes(q.toLowerCase())
          )
        : WORLD,
    [q]
  );

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Global Cannabis Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Pick a continent to start
          </p>
        </motion.div>

        {/* STATIC/STICKY SEARCH BAR */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search continents…"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <motion.div
              key={c.slug}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5 p-6 shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
              onClick={() => nav(`/world/${c.slug}`)}
            >
              <div className="flex items-center gap-4 mb-4">
                <c.icon className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">{c.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {c.countries.length} countries
              </p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

// 2. Country Index with Sticky Search
const CountryIndex = ({ continent }: { continent: Continent }) => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      q
        ? continent.countries.filter((c) =>
            c.name.toLowerCase().includes(q.toLowerCase())
          )
        : continent.countries,
    [q, continent]
  );

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <Button
          variant="ghost"
          onClick={() => nav("/world")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to continents
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {continent.name}
          </h1>
          <p className="text-lg text-muted-foreground">Choose a country</p>
        </motion.div>

        {/* STATIC/STICKY SEARCH BAR */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search countries…"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Card
              key={c.slug}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10",
                "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
                "shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
              )}
              onClick={() => nav(`/world/${continent.slug}/${c.slug}`)}
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <Badge className={`${statusColor(c.legalStatus)} border-none`}>
                    {c.legalStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {c.description}
                </p>
                <Button size="sm" className="w-full">
                  View regions
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

// 3. Region Index with Sticky Search
const RegionIndex = ({ continent, country }: { continent: Continent; country: Country }) => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      q
        ? country.regions.filter((r) =>
            r.name.toLowerCase().includes(q.toLowerCase())
          )
        : country.regions,
    [q, country]
  );

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <Button
          variant="ghost"
          onClick={() => nav(`/world/${continent.slug}`)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {continent.name}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{country.name}</h1>
          <p className="text-lg text-muted-foreground">Choose a region</p>
        </motion.div>

        {/* STATIC/STICKY SEARCH BAR */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search regions…"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Button
              key={r.slug}
              onClick={() =>
                nav(`/world/${continent.slug}/${country.slug}/${r.slug}`)
              }
              variant="outline"
              className="h-20 text-lg justify-center hover:border-green-400/50 hover:bg-green-400/10 transition-all"
            >
              {r.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

// 4. City Index with Sticky Search
const CityIndex = ({ continent, country, region }: { continent: Continent; country: Country; region: Region }) => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      q
        ? region.cities.filter((c) =>
            c.name.toLowerCase().includes(q.toLowerCase())
          )
        : region.cities,
    [q, region]
  );

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-32 pb-12">
        <Button
          variant="ghost"
          onClick={() => nav(`/world/${continent.slug}/${country.slug}`)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {country.name}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{region.name}</h1>
          <p className="text-lg text-muted-foreground">Choose a city</p>
        </motion.div>

        {/* STATIC/STICKY SEARCH BAR */}
        <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cities…"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Card
              key={c.slug}
              className={cn(
                "group relative rounded-2xl border border-white/10",
                "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
                "shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer p-5"
              )}
              onClick={() =>
                nav(
                  `/world/${continent.slug}/${country.slug}/${region.slug}/${c.slug}`
                )
              }
            >
              <h3 className="text-xl font-bold mb-3">{c.name}</h3>
              <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-1">
                {c.atGlance.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

const CityDetail = ({ city, region, country }: { city: City; region: Region; country: Country }) => {
  const nav = useNavigate();
  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 pt-32 pb-12">
        <Button
          variant="ghost"
          onClick={() => nav(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={cn("rounded-2xl border border-white/10", "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5 p-6 shadow-lg")}>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{city.name}</h1>
              <Badge className={`${statusColor(country.legalStatus)} border-none`}>
                {country.legalStatus}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {region.name}, {country.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Possession</p>
                  <p className="text-muted-foreground">{country.possession}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Plane className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Airport</p>
                  <p className="text-muted-foreground">{country.airport}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Tourist tip</p>
                  <p className="text-muted-foreground">{country.tourist}</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{country.description}</p>

            <h2 className="text-lg font-semibold mb-2">At a glance</h2>
            <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-1">
              {city.atGlance.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

/* ---------- main controller ---------- */
const WorldGuide = () => {
  const { continent: cSlug, country: coSlug, region: rSlug, city: ciSlug } = useParams();
  const nav = useNavigate();

  const continent = useMemo(() => WORLD.find((c) => c.slug === cSlug), [cSlug]);
  const country = useMemo(() => continent?.countries.find((c) => c.slug === coSlug), [continent, coSlug]);
  const region = useMemo(() => country?.regions.find((r) => r.slug === rSlug), [country, rSlug]);
  const city = useMemo(() => region?.cities.find((c) => c.slug === ciSlug), [region, ciSlug]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {(() => {
        if (ciSlug && city && region && country) return <CityDetail city={city} region={region} country={country} />;
        if (rSlug && region && country) return <CityIndex continent={continent!} country={country} region={region} />;
        if (coSlug && country) return <RegionIndex continent={continent!} country={country} />;
        if (cSlug && continent) return <CountryIndex continent={continent} />;
        return <ContinentIndex />;
      })()}
      <Footer />
    </div>
  );
};

export default WorldGuide;
