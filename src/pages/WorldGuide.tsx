// src/pages/WorldGuide.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Plane, Users, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ----------------------------------------------------
   DATA – same shape you already use (slug, name, region …)
----------------------------------------------------- */
interface City {
  slug: string;
  name: string;
  atGlance: string[];          // 3-bullet quick info
}

interface Country {
  slug: string;
  name: string;
  region: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string;          // quick fact
  airport: string;             // airport rule
  tourist: string;             // 1-line tourist tip
  description: string;         // short paragraph
  cities: City[];
  image: string;
}

const COUNTRIES: Country[] = [
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    legalStatus: "Recreational",
    possession: "30 g in public, unlimited at home",
    airport: "30 g domestic flights only",
    tourist: "Buy only from government stores; ID required",
    description:
      "The first G7 country to legalise recreational cannabis nationwide. Each province sets retail and public-use rules.",
    cities: [
      {
        slug: "toronto",
        name: "Toronto",
        atGlance: ["Smoke only in private or designated areas", "Over 200 legal stores", "Hotels may ban smoking—check first"],
      },
      {
        slug: "vancouver",
        name: "Vancouver",
        atGlance: ["Cannabis culture widely accepted", "Consumption lounges attached to some stores", "Beautiful parks—no public smoking"],
      },
      {
        slug: "montreal",
        name: "Montreal",
        atGlance: ["Legal age 21 (highest in Canada)", "Government SQDC outlets only", "French helpful in smaller shops"],
      },
    ],
    image: "/dest-4.jpg",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
    legalStatus: "Decriminalized",
    possession: "5 g tolerated",
    airport: "Zero tolerance—do not transport",
    tourist: "Coffee-shop weed is potent—start small",
    description:
      "The famous coffee-shop model: sale is tolerated under strict conditions, but production remains illegal.",
    cities: [
      {
        slug: "amsterdam",
        name: "Amsterdam",
        atGlance: ["150+ coffee shops", "No tobacco mixing inside", "Avoid street dealers"],
      },
      {
        slug: "rotterdam",
        name: "Rotterdam",
        atGlance: ["30 shops, less touristy", "Generally higher quality", "Check residency rules"],
      },
      {
        slug: "the-hague",
        name: "The Hague",
        atGlance: ["More conservative atmosphere", "Membership clubs exist", "Stiffer public-use fines"],
      },
    ],
    image: "/dest-3.jpg",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    legalStatus: "Recreational",
    possession: "25 g in public, 50 g at home",
    airport: "Domestic flights OK within limit",
    tourist: "Join a social club for reliable access",
    description:
      "Europe’s largest economy legalised adult use in 2024; cannabis social clubs are rolling out nationwide.",
    cities: [
      {
        slug: "berlin",
        name: "Berlin",
        atGlance: ["Club culture is king", "No smoking near schools/playgrounds", "Start with low-THC strains"],
      },
      {
        slug: "hamburg",
        name: "Hamburg",
        atGlance: ["St. Pauli district most open", "Harbour venues discreet", "Trams after consuming = smart"],
      },
      {
        slug: "munich",
        name: "Munich",
        atGlance: ["Conservative but tolerant", "English widely spoken", "Beer gardens = no cannabis"],
      },
    ],
    image: "/dest-1.jpg",
  },
  {
    slug: "uruguay",
    name: "Uruguay",
    region: "South America",
    legalStatus: "Recreational",
    possession: "40 g per month (residents)",
    airport: "Transport prohibited",
    tourist: "Tourists cannot buy legally—bring locals",
    description:
      "First country in the world to fully legalise cannabis—pharmacy sales, home growing and clubs are legal (residents only).",
    cities: [
      {
        slug: "montevideo",
        name: "Montevideo",
        atGlance: ["Register with gov for legal purchase", "Quiet cannabis culture", "Great mate & beach vibes"],
      },
      {
        slug: "punta-del-este",
        name: "Punta del Este",
        atGlance: ["Upscale resort = extra enforcement", "Private circles only", "Enjoy beaches instead"],
      },
      {
        slug: "colonia",
        name: "Colonia",
        atGlance: ["Historic small town", "Any use very noticeable", "Cross to Buenos Aires for different scene"],
      },
    ],
    image: "/dest-5.jpg",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    legalStatus: "Medical",
    possession: "Medical prescription required",
    airport: "Strictly prohibited",
    tourist: "Medical clinics require Thai doctor letter",
    description:
      "Decriminalised in 2022 but rolled back to medical-only in 2024. Recreational use is effectively illegal again.",
    cities: [
      {
        slug: "bangkok",
        name: "Bangkok",
        atGlance: ["Medical clinics with prescription", "Former cannabis cafés closed", "Discreet use advised"],
      },
      {
        slug: "phuket",
        name: "Phuket",
        atGlance: ["Enhanced tourist-area enforcement", "Beach parties = no cannabis", "Consider cannabis-free holiday"],
      },
      {
        slug: "chiang-mai",
        name: "Chiang Mai",
        atGlance: ["Conservative northern culture", "Traditional medicine shops", "Medical documentation essential"],
      },
    ],
    image: "/dest-6.jpg",
  },
];

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
   PAGE
----------------------------------------------------- */
const WorldGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Cannabis Laws</h1>
            <p className="text-xl text-muted-foreground">
              Click a country card to open city guides, laws & traveller tips.
            </p>
          </motion.div>

          {/* MAP PLACEHOLDER – fixed aspect, swap in real map later */}
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

          {/* COUNTRY CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {COUNTRIES.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  {/* image + badge */}
                  <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/10">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(c.legalStatus)} border-none`}>
                      {c.legalStatus}
                    </Badge>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    {/* country header */}
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{c.name}</h3>
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

                    {/* collapsible city list – mobile friendly */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between text-accent"
                        >
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
