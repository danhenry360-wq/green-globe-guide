/* eslint-disable react-refresh/only-export-components */
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
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
  countries: Country[];
}

/* ----------------------------------------------------
   STATIC DATA – already nested
----------------------------------------------------- */
const WORLD: Continent[] = [
  {
    slug: "north-america",
    name: "North America",
    countries: [
      {
        slug: "canada",
        name: "Canada",
        legalStatus: "Recreational",
        possession: "30 g public / unlimited home",
        airport: "30 g domestic only",
        tourist: "Gov stores only; ID required",
        description: "First G7 nation to legalise recreational cannabis nationwide.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "ontario",
            name: "Ontario",
            cities: [
              { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
              { slug: "ottawa", name: "Ottawa", atGlance: ["Capital city", "Gov outlets", "Bilingual service"] },
            ],
          },
          {
            slug: "british-columbia",
            name: "British Columbia",
            cities: [
              { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
              { slug: "victoria", name: "Victoria", atGlance: ["Island capital", "Relaxed vibe", "Ocean views"] },
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
        description: "Supreme Court ruled prohibition unconstitutional; possession is administrative.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "cdmx",
            name: "Mexico City",
            cities: [
              { slug: "mexico-city", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Great street food"] },
            ],
          },
          {
            slug: "quintana-roo",
            name: "Quintana Roo",
            cities: [
              { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Enjoy beaches"] },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    countries: [
      {
        slug: "netherlands",
        name: "Netherlands",
        legalStatus: "Decriminalized",
        possession: "5 g tolerated",
        airport: "Do not transport",
        tourist: "Coffee-shop weed is potent—start small",
        description: "Sale tolerated under strict conditions; production remains illegal.",
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [
              { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
              { slug: "haarlem", name: "Haarlem", atGlance: ["Quieter than AMS", "Good quality", "Easy day-trip"] },
            ],
          },
        ],
      },
      {
        slug: "germany",
        name: "Germany",
        legalStatus: "Recreational",
        possession: "25 g public / 50 g home",
        airport: "Domestic OK within limit",
        tourist: "Join social club for access",
        description: "Legalised April 2024; cannabis social clubs launching nationwide.",
        image: "/dest-1.jpg",
        regions: [
          {
            slug: "berlin-region",
            name: "Berlin Region",
            cities: [
              { slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
            ],
          },
        ],
      },
    ],
  },
  /* add more continents here */
];

/* ----------------------------------------------------
   HELPERS
----------------------------------------------------- */
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

/* ----------------------------------------------------
   SUB-COMPONENTS
----------------------------------------------------- */
const ContinentPicker = ({ onPick }: { onPick: (c: Continent) => void }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return WORLD;
    return WORLD.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto max-w-5xl px-4 pt-24 pb-20">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Global Cannabis Guide</h1>
        <p className="text-lg text-muted-foreground">Pick a continent to start</p>
      </div>

      <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search continents…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Button key={c.slug} onClick={() => onPick(c)} variant="outline" className="h-24 text-lg justify-center">
            {c.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

const CountryPicker = ({ continent, onPick }: { continent: Continent; onPick: (c: Country) => void }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return continent.countries;
    return continent.countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  }, [q, continent]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto max-w-5xl px-4 pt-24 pb-20">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold">{continent.name} / Countries</h1>
      </div>

      <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search countries…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <Card key={c.slug} className="overflow-hidden hover:shadow-xl transition-shadow">
            <img src={c.image} alt={c.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{c.name}</h3>
                <Badge className={`${getStatusColor(c.legalStatus)} border-none`}>{c.legalStatus}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
              <Button onClick={() => onPick(c)} className="w-full">
                View Regions
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

const RegionPicker = ({ country, onPick }: { country: Country; onPick: (r: Region) => void }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return country.regions;
    return country.regions.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  }, [q, country]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto max-w-5xl px-4 pt-24 pb-20">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold">{country.name} / Regions</h1>
      </div>

      <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search regions…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <Button key={r.slug} onClick={() => onPick(r)} variant="outline" className="h-20 text-lg justify-center">
            {r.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

const CityDetail = ({ city, region, country }: { city: City; region: Region; country: Country }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto max-w-4xl px-4 pt-24 pb-20">
    <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
      <ArrowLeft className="w-4 h-4 mr-2" /> Back
    </Button>

    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{city.name}</h1>
        <Badge className={`${getStatusColor(country.legalStatus)} border-none`}>{country.legalStatus}</Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {region.name}, {country.name}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Possession</p>
            <p className="text-muted-foreground">{country.possession}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Plane className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Airport</p>
            <p className="text-muted-foreground">{country.airport}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
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
);

/* ----------------------------------------------------
   MAIN COMPONENT – routes controller
----------------------------------------------------- */
const WorldGuide = () => {
  const { continent: cSlug, country: coSlug, region: rSlug, city: ciSlug } = useParams();
  const nav = useNavigate();

  /* ---------- find nodes ---------- */
  const continent = useMemo(() => WORLD.find((c) => c.slug === cSlug), [cSlug]);
  const country = useMemo(() => continent?.countries.find((c) => c.slug === coSlug), [continent, coSlug]);
  const region = useMemo(() => country?.regions.find((r) => r.slug === rSlug), [country, rSlug]);
  const city = useMemo(() => region?.cities.find((c) => c.slug === ciSlug), [region, ciSlug]);

  /* ---------- render chain ---------- */
  if (ciSlug && city && region && country) return <CityDetail city={city} region={region} country={country} />;
  if (rSlug && region && country) return <RegionPicker country={country} onPick={(r) => nav(`/world/${cSlug}/${coSlug}/${r.slug}`)} />;
  if (coSlug && country) return <CountryPicker continent={continent!} onPick={(c) => nav(`/world/${cSlug}/${c.slug}`)} />;
  if (cSlug && continent) return <CountryPicker continent={continent} onPick={(c) => nav(`/world/${cSlug}/${c.slug}`)} />;
  return <ContinentPicker onPick={(c) => nav(`/world/${c.slug}`)} />;
};

export default WorldGuide;
