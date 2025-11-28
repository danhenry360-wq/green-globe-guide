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
          {
            slug: "new-york",
            name: "New York",
            cities: [
              {
                slug: "nyc",
                name: "New York City",
                atGlance: ["Legal consumption where tobacco is allowed", "Dispensaries growing", "Public use visible"],
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
        ],
      },
      {
        slug: "costa-rica",
        name: "Costa Rica",
        legalStatus: "Illegal",
        possession: "Decriminalized for personal use",
        airport: "Zero tolerance",
        tourist: "Discreet personal use generally ignored",
        description: "Personal consumption in private is not penalized, but selling is illegal.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "san-jose-region",
            name: "San José Region",
            cities: [
              { slug: "san-jose", name: "San José", atGlance: ["Urban capital", "Discreet use", "Traffic heavy"] },
            ],
          },
          {
            slug: "guanacaste",
            name: "Guanacaste",
            cities: [
              { slug: "tamarindo", name: "Tamarindo", atGlance: ["Surf town", "Relaxed vibe", "Beach sunsets"] },
            ],
          }
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
            cities: [
              { slug: "panama-city", name: "Panama City", atGlance: ["Canal views", "Modern skyline", "Medical access only"] },
            ],
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
        description: "Possession of small amounts decriminalized, but consumption must be on private property.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "belize-district",
            name: "Belize District",
            cities: [
              { slug: "belize-city", name: "Belize City", atGlance: ["Gateway to islands", "Caution advised", "Private use only"] },
              { slug: "san-pedro", name: "San Pedro", atGlance: ["Ambergris Caye", "Relaxed island", "Golf carts"] },
            ],
          }
        ]
      },
    ],
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
        description:
          "Sale tolerated under strict conditions; production remains illegal.",
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [
              {
                slug: "amsterdam",
                name: "Amsterdam",
                atGlance: [
                  "150+ coffee shops",
                  "No tobacco inside",
                  "Avoid street dealers",
                ],
              },
            ],
          },
          {
            slug: "south-holland",
            name: "South Holland",
            cities: [
              {
                slug: "rotterdam",
                name: "Rotterdam",
                atGlance: [
                  "30 shops, less touristy",
                  "Higher quality",
                  "Residency checks possible",
                ],
              },
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
        description:
          "Legalised April 2024; cannabis social clubs launching nationwide.",
        image: "/dest-1.jpg",
        regions: [
          {
            slug: "berlin-region",
            name: "Berlin Region",
            cities: [
              {
                slug: "berlin",
                name: "Berlin",
                atGlance: [
                  "Club culture capital",
                  "No smoking near kids",
                  "Low-THC starters",
                ],
              },
            ],
          },
          {
            slug: "bavaria",
            name: "Bavaria",
            cities: [
              {
                slug: "munich",
                name: "Munich",
                atGlance: [
                  "Conservative but OK",
                  "English widely spoken",
                  "Beer gardens = no weed",
                ],
              },
            ],
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
        description:
          "Personal cultivation & private consumption legal; public use fined.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "catalonia",
            name: "Catalonia",
            cities: [
              {
                slug: "barcelona",
                name: "Barcelona",
                atGlance: ["200+ private clubs", "Need referral", "Beach boardwalk ban"],
              },
            ],
          },
          {
            slug: "madrid-region",
            name: "Madrid Region",
            cities: [
              {
                slug: "madrid",
                name: "Madrid",
                atGlance: ["Capital clubs", "Tourist-friendly", "No public use"],
              },
            ],
          },
        ],
      },
      {
        slug: "italy",
        name: "Italy",
        legalStatus: "Decriminalized",
        possession: "Small home grow tolerated",
        airport: "Zero tolerance",
        tourist: "Medical only with local script",
        description:
          "Light fines for personal use; medical cannabis available via pharmacy.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "lazio",
            name: "Lazio",
            cities: [
              {
                slug: "rome",
                name: "Rome",
                atGlance: ["Historic centre ban", "Medical pharmacies", "Discreet only"],
              },
            ],
          },
          {
            slug: "lombardy",
            name: "Lombardy",
            cities: [
              {
                slug: "milan",
                name: "Milan",
                atGlance: ["Fashion capital", "Club scene", "Private lounges"],
              },
            ],
          },
        ],
      },
      {
        slug: "portugal",
        name: "Portugal",
        legalStatus: "Decriminalized",
        possession: "25 g civil fine",
        airport: "Do not transport",
        tourist: "Enjoy wine & coast; herb secondary",
        description:
          "All drugs decriminalised 2001; cannabis social clubs emerging.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "lisbon-region",
            name: "Lisbon Region",
            cities: [
              {
                slug: "lisbon",
                name: "Lisbon",
                atGlance: ["Hilly capital", "Social clubs", "Trams, don’t drive"],
              },
            ],
          },
          {
            slug: "porto-region",
            name: "Porto Region",
            cities: [
              {
                slug: "porto",
                name: "Porto",
                atGlance: ["Wine city", "River views", "Low-profile use"],
              },
            ],
          },
        ],
      },
      {
        slug: "switzerland",
        name: "Switzerland",
        legalStatus: "Decriminalized",
        possession: "10 g civil fine",
        airport: "Do not transport",
        tourist: "Low-THC hemp shops legal",
        description:
          "Medical cannabis legal; low-THC products sold openly.",
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "zurich-region",
            name: "Zurich Region",
            cities: [
              {
                slug: "zurich",
                name: "Zurich",
                atGlance: ["Banking hub", "Hemp stores", "No public use"],
              },
            ],
          },
        ],
      },
      {
        slug: "czech-republic",
        name: "Czech Republic",
        legalStatus: "Decriminalized",
        possession: "15 g civil fine",
        airport: "Do not transport",
        tourist: "Great beer; herb secondary",
        description:
          "Medical cannabis legal; personal use decriminalised.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "prague-region",
            name: "Prague Region",
            cities: [
              {
                slug: "prague",
                name: "Prague",
                atGlance: ["Medieval centre", "Beer over bud", "Discreet only"],
              },
            ],
          },
        ],
      },
      {
        slug: "malta",
        name: "Malta",
        legalStatus: "Recreational",
        possession: "7 g home / 3.5 g public",
        airport: "Do not transport",
        tourist: "EU’s first legal country; small island",
        description:
          "Legalised 2021; cannabis associations for residents.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "malta-island",
            name: "Malta Island",
            cities: [
              {
                slug: "valletta",
                name: "Valletta",
                atGlance: ["Fortress capital", "Associations members-only", "Beach relax"],
              },
            ],
          },
        ],
      },
      {
        slug: "luxembourg",
        name: "Luxembourg",
        legalStatus: "Recreational",
        possession: "3 g home grow",
        airport: "Do not transport",
        tourist: "Residents only; tourists cannot buy",
        description:
          "Legal home cultivation & possession; sales still illegal.",
        image: "/dest-3.jpg",
        regions: [
          {
            slug: "luxembourg-region",
            name: "Luxembourg Region",
            cities: [
              {
                slug: "luxembourg-city",
                name: "Luxembourg City",
                atGlance: ["Banking centre", "Home grow only", "Beautiful old town"],
              },
            ],
          },
        ],
      },
      {
        slug: "uk",
        name: "United Kingdom",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only via specialist doctor",
        description:
          "Medical cannabis legal 2018; recreational use prohibited.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "england",
            name: "England",
            cities: [
              {
                slug: "london",
                name: "London",
                atGlance: ["Capital clinics", "Private scripts", "No public use"],
              },
              {
                slug: "manchester",
                name: "Manchester",
                atGlance: ["Northern hub", "Music scene", "Medical only"],
              },
            ],
          },
          {
            slug: "scotland",
            name: "Scotland",
            cities: [
              {
                slug: "edinburgh",
                name: "Edinburgh",
                atGlance: ["Castle views", "Medical only", "Festival city"],
              },
            ],
          },
        ],
      },
      {
        slug: "france",
        name: "France",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Enjoy wine; cannabis strictly medical",
        description:
          "Medical cannabis trials; recreational use illegal.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "ile-de-france",
            name: "Île-de-France",
            cities: [
              {
                slug: "paris",
                name: "Paris",
                atGlance: ["Romantic capital", "Medical only", "No public use"],
              },
            ],
          },
        ],
      },
      {
        slug: "russia",
        name: "Russia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "moscow-region",
            name: "Moscow Region",
            cities: [
              {
                slug: "moscow",
                name: "Moscow",
                atGlance: ["Red Square", "Illegal", "Severe penalties"],
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
    icon: Palmtree,
    countries: [
      {
        slug: "uruguay",
        name: "Uruguay",
        legalStatus: "Recreational",
        possession: "40 g monthly (residents)",
        airport: "Transport prohibited",
        tourist: "Tourists cannot purchase—locals only",
        description:
          "World’s first full legalisation; pharmacy sales & clubs for residents.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "montevideo-region",
            name: "Montevideo Region",
            cities: [
              {
                slug: "montevideo",
                name: "Montevideo",
                atGlance: [
                  "Gov registration needed",
                  "Quiet culture",
                  "Mate & beach vibes",
                ],
              },
            ],
          },
          {
            slug: "punta-del-este-region",
            name: "Punta del Este Region",
            cities: [
              {
                slug: "punta-del-este",
                name: "Punta del Este",
                atGlance: [
                  "Upscale = enforcement",
                  "Private circles",
                  "Enjoy beaches",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "argentina",
        name: "Argentina",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; tango & wine",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "buenos-aires-region",
            name: "Buenos Aires Region",
            cities: [
              {
                slug: "buenos-aires",
                name: "Buenos Aires",
                atGlance: ["Tango capital", "Medical only", "Steak & wine"],
              },
            ],
          },
        ],
      },
      {
        slug: "chile",
        name: "Chile",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Atacama desert",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "santiago-region",
            name: "Santiago Region",
            cities: [
              {
                slug: "santiago",
                name: "Santiago",
                atGlance: ["Mountain capital", "Medical only", "Smoggy"],
              },
            ],
          },
        ],
      },
      {
        slug: "colombia",
        name: "Colombia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; coffee culture",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "bogota-region",
            name: "Bogotá Region",
            cities: [
              {
                slug: "bogota",
                name: "Bogotá",
                atGlance: ["Mountain capital", "Medical only", "Cool climate"],
              },
            ],
          },
          {
            slug: "medellin-region",
            name: "Medellín Region",
            cities: [
              {
                slug: "medellin",
                name: "Medellín",
                atGlance: ["City of eternal spring", "Medical only", "Innovative"],
              },
            ],
          },
        ],
      },
      {
        slug: "brazil",
        name: "Brazil",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; carnival & beaches",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "rio-de-janeiro-region",
            name: "Rio de Janeiro Region",
            cities: [
              {
                slug: "rio-de-janeiro",
                name: "Rio de Janeiro",
                atGlance: ["Carnival capital", "Medical only", "Christ statue"],
              },
            ],
          },
          {
            slug: "sao-paulo-region",
            name: "São Paulo Region",
            cities: [
              {
                slug: "sao-paulo",
                name: "São Paulo",
                atGlance: ["Mega-city", "Medical only", "Street art"],
              },
            ],
          },
        ],
      },
      {
        slug: "peru",
        name: "Peru",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Machu Picchu",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "lima-region",
            name: "Lima Region",
            cities: [
              {
                slug: "lima",
                name: "Lima",
                atGlance: ["Coastal capital", "Medical only", "Great food"],
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
    icon: Waves,
    countries: [
      {
        slug: "jamaica",
        name: "Jamaica",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Do not transport",
        tourist: "Enjoy reggae & beaches; herb is secondary",
        description:
          "Decriminalised 2015; medical & Rasta sacramental use legal. Public use frowned upon.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "kingston-region",
            name: "Kingston Region",
            cities: [
              {
                slug: "kingston",
                name: "Kingston",
                atGlance: [
                  "Reggae birthplace",
                  "Cultural herb tours",
                  "Downtown discretion",
                ],
              },
            ],
          },
          {
            slug: "montego-bay-region",
            name: "Montego Bay Region",
            cities: [
              {
                slug: "montego-bay",
                name: "Montego Bay",
                atGlance: [
                  "Resort security high",
                  "Balconies OK",
                  "Tourist police visible",
                ],
              },
            ],
          },
          {
            slug: "negril-region",
            name: "Negril Region",
            cities: [
              {
                slug: "negril",
                name: "Negril",
                atGlance: [
                  "Seven-mile beach",
                  "Sunset cliffs",
                  "Small-town friendly",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "barbados",
        name: "Barbados",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; rum & beaches",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "bridgetown-region",
            name: "Bridgetown Region",
            cities: [
              {
                slug: "bridgetown",
                name: "Bridgetown",
                atGlance: ["Rum capital", "Medical only", "Crop-Over festival"],
              },
            ],
          },
        ],
      },
      {
        slug: "trinidad-tobago",
        name: "Trinidad & Tobago",
        legalStatus: "Decriminalized",
        possession: "30 g civil fine",
        airport: "Zero tolerance",
        tourist: "Enjoy carnival; small fines",
        description:
          "Decriminalised 2019; medical cannabis legal.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "port-of-spain-region",
            name: "Port of Spain Region",
            cities: [
              {
                slug: "port-of-spain",
                name: "Port of Spain",
                atGlance: ["Carnival capital", "Small fines", "Medical clinics"],
              },
            ],
          },
        ],
      },
      {
        slug: "bahamas",
        name: "Bahamas",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; island paradise",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "nassau-region",
            name: "Nassau Region",
            cities: [
              {
                slug: "nassau",
                name: "Nassau",
                atGlance: ["Island capital", "Illegal", "Paradise beaches"],
              },
            ],
          },
        ],
      },
      {
        slug: "cuba",
        name: "Cuba",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; socialist island",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "havana-region",
            name: "Havana Region",
            cities: [
              {
                slug: "havana",
                name: "Havana",
                atGlance: ["Vintage cars", "Illegal", "Salsa & cigars"],
              },
            ],
          },
        ],
      },
      {
        slug: "dominican-republic",
        name: "Dominican Republic",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; resort island",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "santo-domingo-region",
            name: "Santo Domingo Region",
            cities: [
              {
                slug: "santo-domingo",
                name: "Santo Domingo",
                atGlance: ["Colonial capital", "Illegal", "Resort beaches"],
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
    icon: Mountain,
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; tropical beaches",
        description:
          "Medical cannabis legal; recreational use prohibited. Laws are tightening.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "bangkok-region",
            name: "Bangkok Region",
            cities: [
              {
                slug: "bangkok",
                name: "Bangkok",
                atGlance: [
                  "Med clinics w/ script",
                  "Cafés closed",
                  "Discreet only",
                ],
              },
            ],
          },
          {
            slug: "phuket-region",
            name: "Phuket Region",
            cities: [
              {
                slug: "phuket",
                name: "Phuket",
                atGlance: [
                  "Tourist enforcement high",
                  "Beach parties = no weed",
                  "Consider weed-free holiday",
                ],
              },
            ],
          },
          {
            slug: "chiang-mai-region",
            name: "Chiang Mai Region",
            cities: [
              {
                slug: "chiang-mai",
                name: "Chiang Mai",
                atGlance: [
                  "Conservative north",
                  "Traditional meds",
                  "Docs essential",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "singapore",
        name: "Singapore",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; death-penalty risk",
        description:
          "Cannabis illegal; severe penalties including death.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "singapore-island",
            name: "Singapore Island",
            cities: [
              {
                slug: "singapore",
                name: "Singapore",
                atGlance: ["Garden city", "Illegal", "Death-penalty risk"],
              },
            ],
          },
        ],
      },
      {
        slug: "malaysia",
        name: "Malaysia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; death-penalty caution",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "kuala-lumpur-region",
            name: "Kuala Lumpur Region",
            cities: [
              {
                slug: "kuala-lumpur",
                name: "Kuala Lumpur",
                atGlance: ["Petronas towers", "Medical only", "Death-penalty caution"],
              },
            ],
          },
        ],
      },
      {
        slug: "indonesia",
        name: "Indonesia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; death-penalty caution",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "jakarta-region",
            name: "Jakarta Region",
            cities: [
              {
                slug: "jakarta",
                name: "Jakarta",
                atGlance: ["Mega-capital", "Medical only", "Death-penalty caution"],
              },
            ],
          },
          {
            slug: "bali-region",
            name: "Bali Region",
            cities: [
              {
                slug: "denpasar",
                name: "Denpasar",
                atGlance: ["Island hub", "Medical only", "Death-penalty caution"],
              },
            ],
          },
        ],
      },
      {
        slug: "philippines",
        name: "Philippines",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; death-penalty caution",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "manila-region",
            name: "Manila Region",
            cities: [
              {
                slug: "manila",
                name: "Manila",
                atGlance: ["Mega-city", "Medical only", "Death-penalty caution"],
              },
            ],
          },
        ],
      },
      {
        slug: "vietnam",
        name: "Vietnam",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "hanoi-region",
            name: "Hanoi Region",
            cities: [
              {
                slug: "hanoi",
                name: "Hanoi",
                atGlance: ["Old quarter", "Illegal", "Severe penalties"],
              },
            ],
          },
          {
            slug: "ho-chi-minh-region",
            name: "Ho Chi Minh Region",
            cities: [
              {
                slug: "ho-chi-minh-city",
                name: "Ho Chi Minh City",
                atGlance: ["Motorbike chaos", "Illegal", "Severe penalties"],
              },
            ],
          },
        ],
      },
      {
        slug: "china",
        name: "China",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "beijing-region",
            name: "Beijing Region",
            cities: [
              {
                slug: "beijing",
                name: "Beijing",
                atGlance: ["Forbidden City", "Illegal", "Severe penalties"],
              },
            ],
          },
          {
            slug: "shanghai-region",
            name: "Shanghai Region",
            cities: [
              {
                slug: "shanghai",
                name: "Shanghai",
                atGlance: ["Skyline hub", "Illegal", "Severe penalties"],
              },
            ],
          },
        ],
      },
      {
        slug: "japan",
        name: "Japan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; zero tolerance",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "tokyo-region",
            name: "Tokyo Region",
            cities: [
              {
                slug: "tokyo",
                name: "Tokyo",
                atGlance: ["Neon capital", "Illegal", "Severe penalties"],
              },
            ],
          },
        ],
      },
      {
        slug: "south-korea",
        name: "South Korea",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; K-culture",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "seoul-region",
            name: "Seoul Region",
            cities: [
              {
                slug: "seoul",
                name: "Seoul",
                atGlance: ["K-pop capital", "Medical only", "No public use"],
              },
            ],
          },
        ],
      },
      {
        slug: "india",
        name: "India",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; bhang lassi tolerated in areas",
        description:
          "Medical cannabis legal; bhang tolerated in some states.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "delhi-region",
            name: "Delhi Region",
            cities: [
              {
                slug: "delhi",
                name: "Delhi",
                atGlance: ["Capital chaos", "Medical only", "Bhang lassi"],
              },
            ],
          },
          {
            slug: "goa-region",
            name: "Goa Region",
            cities: [
              {
                slug: "panaji",
                name: "Panaji",
                atGlance: ["Beach parties", "Tolerated bhang", "Medical only"],
              },
            ],
          },
        ],
      },
      {
        slug: "israel",
        name: "Israel",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; high-tech research",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "tel-aviv-region",
            name: "Tel Aviv Region",
            cities: [
              {
                slug: "tel-aviv",
                name: "Tel Aviv",
                atGlance: ["Start-up beach", "Medical only", "Mediterranean vibes"],
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
    icon: MapPin,
    countries: [
      {
        slug: "south-africa",
        name: "South Africa",
        legalStatus: "Decriminalized",
        possession: "Private use & grow OK",
        airport: "Transport prohibited",
        tourist: "Private homes only—enjoy safari & wine",
        description:
          "Private use & cultivation legal; public use prohibited, no commercial sales.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "western-cape",
            name: "Western Cape",
            cities: [
              {
                slug: "cape-town",
                name: "Cape Town",
                atGlance: [
                  "Private homes only",
                  "Wine over weed",
                  "Stunning nature",
                ],
              },
            ],
          },
          {
            slug: "gauteng",
            name: "Gauteng",
            cities: [
              {
                slug: "johannesburg",
                name: "Johannesburg",
                atGlance: [
                  "Business city, low profile",
                  "Security tight",
                  "Safari hub",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "morocco",
        name: "Morocco",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; hash heartland",
        description:
          "Cannabis illegal; Rif Mountains tolerated for local farmers only.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "marrakech-region",
            name: "Marrakech Region",
            cities: [
              {
                slug: "marrakech",
                name: "Marrakech",
                atGlance: ["Red city", "Illegal", "Discreet only"],
              },
            ],
          },
        ],
      },
      {
        slug: "lesotho",
        name: "Lesotho",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; mountain kingdom",
        description:
          "First African nation to legalise medical cannabis; exports allowed.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "maseru-region",
            name: "Maseru Region",
            cities: [
              {
                slug: "maseru",
                name: "Maseru",
                atGlance: ["Mountain capital", "Medical only", "Highest pub"],
              },
            ],
          },
        ],
      },
      {
        slug: "kenya",
        name: "Kenya",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; safari over smoke",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "nairobi-region",
            name: "Nairobi Region",
            cities: [
              {
                slug: "nairobi",
                name: "Nairobi",
                atGlance: ["Safari capital", "Illegal", "Severe penalties"],
              },
            ],
          },
        ],
      },
      {
        slug: "egypt",
        name: "Egypt",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description:
          "Cannabis illegal; possession criminalised.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "cairo-region",
            name: "Cairo Region",
            cities: [
              {
                slug: "cairo",
                name: "Cairo",
                atGlance: ["Pyramid views", "Illegal", "Severe penalties"],
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
    icon: Waves,
    countries: [
      {
        slug: "australia",
        name: "Australia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; surf & outback",
        description:
          "Medical cannabis legal; recreational use prohibited (ACT has specific decriminalisation rules).",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "sydney-region",
            name: "Sydney Region",
            cities: [
              {
                slug: "sydney",
                name: "Sydney",
                atGlance: ["Harbour capital", "Medical only", "Opera House"],
              },
            ],
          },
          {
            slug: "melbourne-region",
            name: "Melbourne Region",
            cities: [
              {
                slug: "melbourne",
                name: "Melbourne",
                atGlance: ["Cultural capital", "Medical only", "Coffee culture"],
              },
            ],
          },
          {
            slug: "brisbane-region",
            name: "Brisbane Region",
            cities: [
              {
                slug: "brisbane",
                name: "Brisbane",
                atGlance: ["River city", "Medical only", "Sunshine State"],
              },
            ],
          },
          {
            slug: "perth-region",
            name: "Perth Region",
            cities: [
              {
                slug: "perth",
                name: "Perth",
                atGlance: ["Isolated capital", "Medical only", "Sunset coast"],
              },
            ],
          },
          {
            slug: "adelaide-region",
            name: "Adelaide Region",
            cities: [
              {
                slug: "adelaide",
                name: "Adelaide",
                atGlance: ["Festival city", "Medical only", "Wine region"],
              },
            ],
          },
        ],
      },
      {
        slug: "new-zealand",
        name: "New Zealand",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Middle-earth",
        description:
          "Medical cannabis legal; recreational use prohibited. Referendum failed narrowly.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "auckland-region",
            name: "Auckland Region",
            cities: [
              {
                slug: "auckland",
                name: "Auckland",
                atGlance: ["City of sails", "Medical only", "Volcanic"],
              },
            ],
          },
          {
            slug: "wellington-region",
            name: "Wellington Region",
            cities: [
              {
                slug: "wellington",
                name: "Wellington",
                atGlance: ["Windy capital", "Medical only", "Café culture"],
              },
            ],
          },
          {
            slug: "christchurch-region",
            name: "Christchurch Region",
            cities: [
              {
                slug: "christchurch",
                name: "Christchurch",
                atGlance: ["Garden city", "Medical only", "Quake rebuilt"],
              },
            ],
          },
        ],
      },
      {
        slug: "fiji",
        name: "Fiji",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; coral islands",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-6.jpg",
        regions: [
          {
            slug: "suva-region",
            name: "Suva Region",
            cities: [
              {
                slug: "suva",
                name: "Suva",
                atGlance: ["Coral capital", "Medical only", "Island vibes"],
              },
            ],
          },
        ],
      },
      {
        slug: "papua-new-guinea",
        name: "Papua New Guinea",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; jungle nation",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "port-moresby-region",
            name: "Port Moresby Region",
            cities: [
              {
                slug: "port-moresby",
                name: "Port Moresby",
                atGlance: ["Jungle capital", "Medical only", "High crime"],
              },
            ],
          },
        ],
      },
      {
        slug: "samoa",
        name: "Samoa",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Polynesian culture",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "apia-region",
            name: "Apia Region",
            cities: [
              {
                slug: "apia",
                name: "Apia",
                atGlance: ["Polynesian capital", "Medical only", "Island vibes"],
              },
            ],
          },
        ],
      },
      {
        slug: "tonga",
        name: "Tonga",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; kingdom island",
        description:
          "Medical cannabis legal; recreational use prohibited.",
        image: "/dest-4.jpg",
        regions: [
          {
            slug: "nukualofa-region",
            name: "Nukuʻalofa Region",
            cities: [
              {
                slug: "nukualofa",
                name: "Nukuʻalofa",
                atGlance: ["Kingdom capital", "Medical only", "Polynesian"],
              },
            ],
          },
        ],
      },
      {
        slug: "hawaii",
        name: "Hawaii (USA)",
        legalStatus: "Recreational",
        possession: "1 oz public / 10 oz home",
        airport: "Inter-island transport OK",
        tourist: "Dispensaries on O‘ahu, Maui, Big Island; bring ID",
        description:
          "Recreational cannabis legal since 2020; home grow allowed.",
        image: "/dest-5.jpg",
        regions: [
          {
            slug: "oahu",
            name: "O‘ahu",
            cities: [
              {
                slug: "honolulu",
                name: "Honolulu",
                atGlance: ["Waikīkī stores", "No beach smoking", "Bring ID"],
              },
            ],
          },
          {
            slug: "maui",
            name: "Maui",
            cities: [
              {
                slug: "kahului",
                name: "Kahului",
                atGlance: ["Dispensary hub", "Resort ban", "Road to Hana"],
              },
            ],
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{country.name}</h1>
          <p className="text-lg text-muted-foreground">Choose a region</p>
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
              className="h-20 text-lg justify-center"
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
