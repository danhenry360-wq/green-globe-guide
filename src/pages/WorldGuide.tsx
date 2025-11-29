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
  AlertTriangle, // Added for high risk areas
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
  // Added "Mixed" for Federal nations like USA/Australia
  legalStatus: "Recreational" | "Medical" | "Decriminalized" | "Illegal" | "Mixed"; 
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
   FULL WORLD DATA (AUDITED & CORRECTED)
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
        tourist: "Gov stores only; ID required (19+ mostly)",
        description:
          "First G7 nation to legalise recreational cannabis nationwide. Very safe.",
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
                atGlance: ["Legal age 21 (Strict)", "Gov SQDC outlets only", "No home grow"],
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
        legalStatus: "Mixed", // Corrected from Medical
        possession: "Varies wildly by state",
        airport: "Federal prohibition (TSA)",
        tourist: "Legal in 24 states (e.g., CA, NY, CO). Illegal in others.",
        description:
          "Federally illegal, but 24 states allow recreational use. Crossing state lines with it is a federal crime.",
        image: "/dest-1.jpg",
        regions: [
          {
            slug: "california",
            name: "California (Legal)",
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
            name: "Colorado (Legal)",
            cities: [
              {
                slug: "denver",
                name: "Denver",
                atGlance: ["Birthplace of rec", "Social lounges", "No national-park use"],
              },
            ],
          },
          {
            slug: "new-york",
            name: "New York (Legal)",
            cities: [
              {
                slug: "nyc",
                name: "New York City",
                atGlance: ["Public smoking allowed where tobacco is", "Dispensaries growing", "Smell everywhere"],
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
          "Supreme Court ruled prohibition unconstitutional, but retail market is not fully regulated yet. Caution advised.",
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
        ],
      },
    ],
  },
  {
    slug: "central-america",
    name: "Central America",
    icon: Sun,
    countries: [
      {
        slug: "costa-rica",
        name: "Costa Rica",
        legalStatus: "Illegal",
        possession: "Decriminalized for personal use",
        airport: "Zero tolerance",
        tourist: "Discreet personal use generally ignored",
        description: "Personal consumption in private is not penalized, but selling is illegal. Medical pending regulation.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "san-jose-region",
            name: "San José Region",
            cities: [{ slug: "san-jose", name: "San José", atGlance: ["Urban capital", "Discreet use", "Traffic heavy"] }],
          },
        ]
      },
      {
        slug: "panama",
        name: "Panama",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Strict laws; medical only",
        description: "Medical cannabis legalized in 2021; recreational remains illegal.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "panama-province",
            name: "Panama Province",
            cities: [{ slug: "panama-city", name: "Panama City", atGlance: ["Canal views", "Medical access only", "Modern skyline"] }],
          }
        ]
      },
      {
        slug: "belize",
        name: "Belize",
        legalStatus: "Decriminalized",
        possession: "Up to 10g private possession",
        airport: "Zero tolerance",
        tourist: "Private use tolerated; public use illegal",
        description: "Possession of small amounts decriminalized on private property.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "belize-district",
            name: "Belize District",
            cities: [{ slug: "belize-city", name: "Belize City", atGlance: ["Caution advised", "Private use only", "Island gateway"] }],
          }
        ]
      },
      {
        slug: "el-salvador",
        name: "El Salvador",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; very strict",
        description: "Zero tolerance policy enforced. Do not bring.",
        image: "/dest-1.jpg",
        regions: [{ slug: "san-salvador-region", name: "San Salvador Region", cities: [{ slug: "san-salvador", name: "San Salvador", atGlance: ["Capital", "Zero tolerance", "Bitcoin hub"] }] }]
      },
    ]
  },
  {
    slug: "europe",
    name: "Europe",
    icon: Mountain,
    countries: [
      {
        slug: "netherlands",
        name: "Netherlands",
        legalStatus: "Decriminalized",
        possession: "5 g tolerated",
        airport: "Do not transport",
        tourist: "Coffee-shop weed is potent—start small",
        description: "Sale tolerated in coffee shops; production technically illegal (tolerance policy).",
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [{ slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] }, { slug: "haarlem", name: "Haarlem", atGlance: ["Quieter than AMS", "Good quality", "Easy day-trip"] }],
          },
          {
            slug: "south-holland",
            name: "South Holland",
            cities: [{ slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops", "Higher quality", "Residency checks"] }],
          },
        ],
      },
      {
        slug: "germany",
        name: "Germany",
        legalStatus: "Recreational",
        possession: "25 g public / 50 g home",
        airport: "Domestic OK within limit",
        tourist: "Cannot buy comfortably yet (Clubs are members only)",
        description: "Legalised April 2024. Possession is legal, but buying as a tourist is difficult (no commercial shops yet).",
        image: "/dest-1.jpg",
        regions: [
          {
            slug: "berlin-region",
            name: "Berlin Region",
            cities: [{ slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Parks often tolerated"] }],
          },
          {
            slug: "bavaria",
            name: "Bavaria",
            cities: [{ slug: "munich", name: "Munich", atGlance: ["Strict enforcement", "Beer gardens = no weed", "Police stricter here"] }],
          },
        ],
      },
      {
        slug: "spain",
        name: "Spain",
        legalStatus: "Decriminalized",
        possession: "Private areas OK",
        airport: "Do not transport",
        tourist: "Join private cannabis club",
        description: "Personal cultivation & private consumption legal; public use fined. Social Clubs exist.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "catalonia",
            name: "Catalonia",
            cities: [{ slug: "barcelona", name: "Barcelona", atGlance: ["200+ private clubs", "Need referral", "Beach boardwalk ban"] }],
          },
          {
            slug: "madrid-region",
            name: "Madrid Region",
            cities: [{ slug: "madrid", name: "Madrid", atGlance: ["Capital clubs", "Tourist-friendly", "No public use"] }],
          },
        ],
      },
      {
        slug: "italy",
        name: "Italy",
        legalStatus: "Decriminalized",
        possession: "Small home grow tolerated",
        airport: "Zero tolerance",
        tourist: "'Cannabis Light' (low THC) legal; real weed illegal",
        description: "Light fines for personal use; medical cannabis available via pharmacy. 'CBD weed' sold openly.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "lazio",
            name: "Lazio",
            cities: [{ slug: "rome", name: "Rome", atGlance: ["Historic centre ban", "CBD Shops common", "Discreet only"] }],
          },
          {
            slug: "lombardy",
            name: "Lombardy",
            cities: [{ slug: "milan", name: "Milan", atGlance: ["Fashion capital", "Club scene", "Private lounges"] }],
          },
        ],
      },
      {
        slug: "portugal",
        name: "Portugal",
        legalStatus: "Decriminalized",
        possession: "25 g civil fine (no jail)",
        airport: "Do not transport",
        tourist: "Not legal to buy, but decriminalized",
        description: "All drugs decriminalised 2001. You won't go to jail, but selling/buying is not legal.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "lisbon-region",
            name: "Lisbon Region",
            cities: [{ slug: "lisbon", name: "Lisbon", atGlance: ["Street dealers usually sell fake weed", "Police relaxed", "Trams, don’t drive"] }],
          },
        ],
      },
      {
        slug: "malta",
        name: "Malta",
        legalStatus: "Recreational",
        possession: "7 g home / 3.5 g public",
        airport: "Do not transport",
        tourist: "Cannabis Associations for residents only",
        description: "Legalised 2021, but no commercial shops for tourists. Invite only.",
        image: "/dest-5.jpg",
        regions: [{ slug: "malta-island", name: "Malta Island", cities: [{ slug: "valletta", name: "Valletta", atGlance: ["Fortress capital", "Associations members-only", "Beach relax"] }] }],
      },
      {
        slug: "uk",
        name: "United Kingdom",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Illegal. Medical requires specialist.",
        description: "Medical cannabis legal 2018 (Private clinics). Recreational use prohibited and fined.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "england",
            name: "England",
            cities: [{ slug: "london", name: "London", atGlance: ["Police caution often", "Smell common but illegal", "No public use"] }],
          },
        ],
      },
      {
        slug: "france",
        name: "France",
        legalStatus: "Illegal", // Corrected from Medical
        possession: "Fines / Police custody",
        airport: "Zero tolerance",
        tourist: "Strict. CBD is legal, THC is not.",
        description: "Has some of the strictest laws in Western Europe. Medical pilot exists but very limited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "ile-de-france",
            name: "Île-de-France",
            cities: [{ slug: "paris", name: "Paris", atGlance: ["Romantic capital", "CBD shops everywhere", "No public use"] }],
          },
        ],
      },
      {
        slug: "russia",
        name: "Russia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance - High Risk",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal. Foreigners have been imprisoned for small amounts (e.g. vape carts).",
        image: "/dest-4.jpg",
        regions: [{ slug: "moscow-region", name: "Moscow Region", cities: [{ slug: "moscow", name: "Moscow", atGlance: ["Red Square", "Illegal", "Severe penalties"] }] }],
      },
    ],
  },
  {
    slug: "asia",
    name: "Asia",
    icon: Mountain,
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        legalStatus: "Decriminalized", // Keeping as Decrim/Medical due to flux
        possession: "Legal to buy (for now)",
        airport: "Zero tolerance",
        tourist: "Dispensaries everywhere, but laws tightening",
        description:
          "Currently dispensaries are open, but government is moving to restrict to medical use only. Check latest news.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "bangkok-region",
            name: "Bangkok Region",
            cities: [{ slug: "bangkok", name: "Bangkok", atGlance: ["Thousands of shops", "No smoking in public", "ID required"] }],
          },
          {
            slug: "phuket-region",
            name: "Phuket Region",
            cities: [{ slug: "phuket", name: "Phuket", atGlance: ["Tourist hub", "Dispensaries common", "Respect locals"] }],
          },
        ],
      },
      {
        slug: "singapore",
        name: "Singapore",
        legalStatus: "Illegal", // Corrected from Medical
        possession: "Criminal offence - EXTREME",
        airport: "Drug tests on arrival possible",
        tourist: "DEATH PENALTY RISK. Do not bring.",
        description: "Cannabis illegal; severe penalties including death for trafficking. Zero tolerance.",
        image: "/dest-4.jpg",
        regions: [{ slug: "singapore-island", name: "Singapore Island", cities: [{ slug: "singapore", name: "Singapore", atGlance: ["Garden city", "Illegal", "Death-penalty risk"] }] }],
      },
      {
        slug: "indonesia",
        name: "Indonesia",
        legalStatus: "Illegal", // Corrected from Medical
        possession: "Prison / Death Penalty",
        airport: "Strict Customs",
        tourist: "Bali is NOT safe for weed.",
        description: "Very strict drug laws. Tourists are regularly jailed for possession. Do not risk it.",
        image: "/dest-6.jpg",
        regions: [{ slug: "bali-region", name: "Bali Region", cities: [{ slug: "denpasar", name: "Denpasar", atGlance: ["Island hub", "Illegal", "Police entrapment common"] }] }],
      },
      {
        slug: "malaysia",
        name: "Malaysia",
        legalStatus: "Illegal", // Corrected from Medical
        possession: "Severe penalties",
        airport: "Zero tolerance",
        tourist: "Death penalty for trafficking. Illegal.",
        description: "Medical cannabis discussions are ongoing, but strictly illegal for tourists.",
        image: "/dest-5.jpg",
        regions: [{ slug: "kuala-lumpur-region", name: "Kuala Lumpur Region", cities: [{ slug: "kuala-lumpur", name: "Kuala Lumpur", atGlance: ["Petronas towers", "Illegal", "Death-penalty caution"] }] }],
      },
      {
        slug: "japan",
        name: "Japan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; zero tolerance",
        description: "Cannabis illegal; possession criminalised. Social stigma is high.",
        image: "/dest-4.jpg",
        regions: [{ slug: "tokyo-region", name: "Tokyo Region", cities: [{ slug: "tokyo", name: "Tokyo", atGlance: ["Neon capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "uae",
        name: "United Arab Emirates",
        legalStatus: "Illegal", // Corrected from Medical
        possession: "Prison / Deportation",
        airport: "Sensitive detection technology",
        tourist: "CBD Oil is illegal. Trace amounts = Jail.",
        description: "Zero tolerance. Even if you have a prescription from home, do not bring it.",
        image: "/dest-6.jpg",
        regions: [{ slug: "dubai-region", name: "Dubai Region", cities: [{ slug: "dubai", name: "Dubai", atGlance: ["Futuristic city", "Strictly Illegal", "Zero-tolerance airport"] }] }],
      },
       {
        slug: "china",
        name: "China",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised. Random drug tests in bars possible.",
        image: "/dest-6.jpg",
        regions: [{ slug: "beijing-region", name: "Beijing Region", cities: [{ slug: "beijing", name: "Beijing", atGlance: ["Forbidden City", "Illegal", "Severe penalties"] }] }],
      },
    ],
  },
  {
    slug: "south-america",
    name: "South America",
    icon: Palmtree,
    countries: [
      {
        slug: "uruguay",
        name: "Uruguay",
        legalStatus: "Recreational",
        possession: "40 g monthly (residents)",
        airport: "Transport prohibited",
        tourist: "Tourists cannot purchase legally—residents only",
        description: "World’s first full legalisation; pharmacy sales & clubs for residents. Tourists often gifted.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "montevideo-region",
            name: "Montevideo Region",
            cities: [{ slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] }],
          },
        ],
      },
      {
        slug: "colombia",
        name: "Colombia",
        legalStatus: "Decriminalized",
        possession: "Up to 22g personal use",
        airport: "Zero tolerance",
        tourist: "Medical legal; personal use tolerated",
        description: "Medical cannabis export hub. Personal possession decriminalized, but buying on street is risky.",
        image: "/dest-5.jpg",
        regions: [{ slug: "medellin-region", name: "Medellín Region", cities: [{ slug: "medellin", name: "Medellín", atGlance: ["City of eternal spring", "Medical tourism", "Innovative"] }] }],
      },
      {
        slug: "brazil",
        name: "Brazil",
        legalStatus: "Decriminalized", // Updated 2024
        possession: "Small amounts (up to 40g)",
        airport: "Zero tolerance",
        tourist: "Still risky; police discretion varies",
        description: "Supreme court decriminalized personal possession in 2024, but sale is illegal.",
        image: "/dest-4.jpg",
        regions: [{ slug: "rio-de-janeiro-region", name: "Rio de Janeiro Region", cities: [{ slug: "rio-de-janeiro", name: "Rio de Janeiro", atGlance: ["Carnival capital", "Beach use common but risky", "Christ statue"] }] }],
      },
    ],
  },
  {
    slug: "caribbean",
    name: "Caribbean",
    icon: Waves,
    countries: [
      {
        slug: "jamaica",
        name: "Jamaica",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Do not transport",
        tourist: "Herb houses exist; Rastafarian rights",
        description: "Decriminalised 2015. Tourists can buy permits. 'Ganja' is culturally ingrained.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "kingston-region",
            name: "Kingston Region",
            cities: [{ slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] }],
          },
          {
            slug: "negril-region",
            name: "Negril Region",
            cities: [{ slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Easy access"] }],
          },
        ],
      },
    ],
  },
  {
    slug: "africa",
    name: "Africa",
    icon: MapPin,
    countries: [
      {
        slug: "south-africa",
        name: "South Africa",
        legalStatus: "Decriminalized",
        possession: "Private use & grow OK",
        airport: "Transport prohibited",
        tourist: "Private homes only—no shops",
        description:
          "Private use & cultivation legal by court order. Buying/Selling is still illegal.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "western-cape",
            name: "Western Cape",
            cities: [{ slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] }],
          },
        ],
      },
      {
        slug: "morocco",
        name: "Morocco",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Kif is common in Rif, but illegal",
        description: "World's largest hash producer, but technically illegal. Police tolerate in North, strict in cities.",
        image: "/dest-5.jpg",
        regions: [{ slug: "marrakech-region", name: "Marrakech Region", cities: [{ slug: "marrakech", name: "Marrakech", atGlance: ["Red city", "Illegal", "Discreet only"] }] }],
      },
    ],
  },
  {
    slug: "oceania",
    name: "Oceania",
    icon: Waves,
    countries: [
      {
        slug: "australia",
        name: "Australia",
        legalStatus: "Mixed", // Corrected from Medical
        possession: "Varies (ACT decriminalized)",
        airport: "Zero tolerance",
        tourist: "Medical very strict; recreational illegal mostly",
        description:
          "Medical cannabis legal nationwide (prescription). Recreational illegal, except ACT (Canberra) where possession is legal.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "sydney-region",
            name: "Sydney Region",
            cities: [{ slug: "sydney", name: "Sydney", atGlance: ["Harbour capital", "Medical only", "Police dogs in stations"] }],
          },
          {
            slug: "canberra-region",
            name: "ACT (Canberra)",
            cities: [{ slug: "canberra", name: "Canberra", atGlance: ["Personal use legal", "Grow legal", "Buying illegal"] }],
          },
        ],
      },
      {
        slug: "new-zealand",
        name: "New Zealand",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; referendum failed",
        description:
          "Medical cannabis legal; recreational use prohibited. Referendum failed narrowly.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "auckland-region",
            name: "Auckland Region",
            cities: [{ slug: "auckland", name: "Auckland", atGlance: ["City of sails", "Medical only", "Volcanic"] }],
          },
        ],
      },
    ],
  },
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
    case "Mixed":
      return "bg-purple-500/90 text-white";
    case "Illegal":
    default:
      return "bg-red-500/90 text-white";
  }
};

/* ---------- sub-components ---------- */
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
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Global Cannabis Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Pick a continent to start
          </p>
        </motion.div>

        <div className="sticky top-24 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
          <div className="relative">
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
                {c.countries.length} countries listed
              </p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

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
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {continent.name}
          </h1>
          <p className="text-lg text-muted-foreground">Choose a country</p>
        </motion.div>

        <div className="sticky top-24 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
          <div className="relative">
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
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {c.description}
                </p>
                {c.legalStatus === "Illegal" && (
                   <div className="flex items-center gap-1 text-red-400 text-xs font-bold mb-3">
                     <AlertTriangle className="w-3 h-3"/> High Risk
                   </div>
                )}
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
          className="mb-10"
        >
          <div className="flex flex-col gap-2">
             <h1 className="text-4xl md:text-5xl font-bold">{country.name}</h1>
             <div className="flex gap-2 items-center">
                <Badge className={`${statusColor(country.legalStatus)} text-sm px-3 py-1`}>
                    {country.legalStatus}
                </Badge>
                {country.legalStatus === "Illegal" && (
                    <Badge variant="destructive" className="animate-pulse">Severe Penalties</Badge>
                )}
             </div>
          </div>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{country.description}</p>
        </motion.div>

        <div className="sticky top-24 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
          <div className="relative">
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
              className="h-20 text-lg justify-center whitespace-normal text-center"
            >
              {r.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

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
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{region.name}</h1>
          <p className="text-lg text-muted-foreground">Choose a city</p>
        </motion.div>

        <div className="sticky top-24 z-10 bg-background/80 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
          <div className="relative">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h1 className="text-3xl font-bold">{city.name}</h1>
              <Badge className={`${statusColor(country.legalStatus)} border-none w-fit`}>
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

            <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                 <h3 className="font-semibold mb-1 flex items-center gap-2">
                    {country.legalStatus === "Illegal" ? <AlertTriangle className="w-4 h-4 text-red-500"/> : <Info className="w-4 h-4"/>}
                    Local Context
                 </h3>
                 <p className="text-muted-foreground">{country.description}</p>
            </div>

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
        if (cSlug
