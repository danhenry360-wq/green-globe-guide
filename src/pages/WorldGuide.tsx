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
  AlertTriangle,
  Skull, 
  Siren,
  Gavel,
  ShieldAlert,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { getCountryImage } from "@/data/country_images";
import { getStatusBadgeClasses } from "@/lib/legal-status-colors";

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
   FULL WORLD DATA (AUDITED) 
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
        airport: "30 g domestic only (Illegal international)",
        tourist: "Gov stores only; ID required (18/19+)",
        description:
          "First G7 nation to legalise recreational cannabis nationwide. Strict driving laws apply.",
        image: getCountryImage("canada"),
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
          {
            slug: "quebec",
            name: "Quebec",
            cities: [
              { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
              { slug: "quebec-city", name: "Quebec City", atGlance: ["Historic core", "Fewer stores", "European charm"] },
            ],
          },
        ],
      },
      {
        slug: "united-states",
        name: "United States",
        legalStatus: "Mixed",
        possession: "Varies by state (Illegal Federally)",
        airport: "Federal prohibition (TSA) - Do not cross state lines",
        tourist: "Check state laws; interstate transport is a Federal Crime",
        description:
          "Federally illegal. ~24 states allow recreational use, but crossing state lines (even between two legal states) is a federal felony.",
        image: getCountryImage("united-states"),
        regions: [
          {
            slug: "california",
            name: "California",
            cities: [
              { slug: "los-angeles", name: "Los Angeles", atGlance: ["Thousands of stores", "Delivery legal", "No public use"] },
              { slug: "san-francisco", name: "San Francisco", atGlance: ["Lounges allowed", "Golden Gate parks ban", "Bring ID"] },
            ],
          },
          {
            slug: "colorado",
            name: "Colorado",
            cities: [
              { slug: "denver", name: "Denver", atGlance: ["Birthplace of rec", "Social lounges", "No national-park use"] },
              { slug: "boulder", name: "Boulder", atGlance: ["College town", "Mountain views", "Strict public ban"] },
            ],
          },
        ],
      },
      {
        slug: "mexico",
        name: "Mexico",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated (<5g)",
        airport: "Zero tolerance",
        tourist: "Technical tolerance, but police extortion is common.",
        description:
          "Supreme Court ruled prohibition unconstitutional, but regulations for sales are stalled. Police often target tourists for bribes.",
        image: getCountryImage("mexico"),
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
              { slug: "tulum", name: "Tulum", atGlance: ["Boho-chic", "Beach clubs", "Discreet only"] },
            ],
          },
          {
            slug: "jalisco",
            name: "Jalisco",
            cities: [
              { slug: "guadalajara", name: "Guadalajara", atGlance: ["Tech hub", "Younger crowd", "Check Airbnb rules"] },
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
        legalStatus: "Decriminalized",
        possession: "No specific amount defined (Police discretion)",
        airport: "Zero tolerance",
        tourist: "Personal consumption in private is tolerated. Police will confiscate public use.",
        description: "Article 58 of Law 8204 does not penalize personal consumption, but provides no defined amount. Selling is a serious crime.",
        image: getCountryImage("costa-rica"),
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
        possession: "Prison sentences for recreational use",
        airport: "Zero tolerance",
        tourist: "Strict laws. Recreational use is illegal.",
        description: "Medical cannabis legalized in 2021, but recreational use remains a crime with potential jail time.",
        image: getCountryImage("panama"),
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
        possession: "Up to 10g (Private property ONLY)",
        airport: "Zero tolerance",
        tourist: "Possession legal in private lodgings. Illegal in public.",
        description: "Misuse of Drugs Act (2017) decriminalized possession up to 10g. This applies only to private residences.",
        image: getCountryImage("belize"),
        regions: [
          {
            slug: "belize-district",
            name: "Belize District",
            cities: [{ slug: "belize-city", name: "Belize City", atGlance: ["High crime rate", "Private use only", "Island gateway"] }],
          }
        ]
      },
      {
        slug: "guatemala",
        name: "Guatemala",
        legalStatus: "Illegal",
        possession: "Prison sentences (4 months - 2 years)",
        airport: "Zero tolerance",
        tourist: "High risk. Penalties are harsh even for consumption.",
        description: "Under the Law Against Narcoactivity, possession for consumption carries mandatory prison time.",
        image: getCountryImage("guatemala"),
        regions: [{ slug: "guatemala-city-region", name: "Guatemala City Region", cities: [{ slug: "guatemala-city", name: "Guatemala City", atGlance: ["High altitude", "Strict laws", "Police checks"] }] }]
      },
      {
        slug: "el-salvador",
        name: "El Salvador",
        legalStatus: "Illegal",
        possession: "Arrest and indefinite detention",
        airport: "Zero tolerance",
        tourist: "WARNING: State of Exception. Risk of arbitrary arrest.",
        description: "Strict enforcement. Constitutional guarantees (due process) are suspended. Tourists caught with drugs face immediate indefinite detention.",
        image: getCountryImage("el-salvador"),
        regions: [{ slug: "san-salvador-region", name: "San Salvador Region", cities: [{ slug: "san-salvador", name: "San Salvador", atGlance: ["Heavy military presence", "Zero tolerance", "Avoid"] }] }]
      },
      {
        slug: "honduras",
        name: "Honduras",
        legalStatus: "Illegal",
        possession: "Prison sentences",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged. Strict drug laws.",
        description: "Cannabis is illegal for all purposes. Possession is considered a crime against public health.",
        image: getCountryImage("honduras"),
        regions: [{ slug: "roatan", name: "Roatán", cities: [{ slug: "roatan-city", name: "Roatán", atGlance: ["Cruise port", "Strict laws", "Police target tourists"] }] }]
      },
      {
        slug: "nicaragua",
        name: "Nicaragua",
        legalStatus: "Illegal",
        possession: "Prison sentences",
        airport: "Zero tolerance",
        tourist: "High caution. Political sensitivity and strict laws.",
        description: "Strictly illegal. Police force is highly centralized and penalties are severe.",
        image: getCountryImage("nicaragua"),
        regions: [{ slug: "managua-region", name: "Managua Region", cities: [{ slug: "managua", name: "Managua", atGlance: ["Capital", "Illegal", "Police presence"] }] }]
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
        airport: "Do not transport (Schengen rules)",
        tourist: "Coffee-shop weed is potent. Public use discouraged.",
        description: "Sale tolerated under strict conditions (gedoogbeleid); production remains illegal.",
        image: getCountryImage("netherlands"),
        regions: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [{ slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] }, { slug: "haarlem", name: "Haarlem", atGlance: ["Quieter than AMS", "Good quality", "Easy day-trip"] }],
          },
          {
            slug: "south-holland",
            name: "South Holland",
            cities: [{ slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops", "Higher quality", "Residency checks possible"] }, { slug: "the-hague", name: "The Hague", atGlance: ["Conservative feel", "Membership clubs", "Stiffer fines"] }],
          },
        ],
      },
      {
        slug: "germany",
        name: "Germany",
        legalStatus: "Recreational",
        possession: "25 g public / 50 g home",
        airport: "Domestic only (Risk)",
        tourist: "Possession legal, but BUYING is illegal for tourists.",
        description: "Legalised April 2024. 'Social Clubs' are for residents only. No commercial shops exist for tourists.",
        image: getCountryImage("germany"),
        regions: [
          {
            slug: "berlin-region",
            name: "Berlin Region",
            cities: [{ slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] }],
          },
          {
            slug: "hamburg-region",
            name: "Hamburg Region",
            cities: [{ slug: "hamburg", name: "Hamburg", atGlance: ["St. Pauli open", "Discreet lounges", "Use trams"] }],
          },
          {
            slug: "bavaria",
            name: "Bavaria",
            cities: [{ slug: "munich", name: "Munich", atGlance: ["Conservative enforcement", "Beer gardens = no weed", "English spoken"] }],
          },
        ],
      },
      {
        slug: "spain",
        name: "Spain",
        legalStatus: "Decriminalized",
        possession: "Private areas OK",
        airport: "Do not transport",
        tourist: "Join private cannabis club (Need referral)",
        description: "Personal cultivation & private consumption legal; public use fined. Clubs operate in legal grey area.",
        image: getCountryImage("spain"),
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
        possession: "Small home grow tolerated (Court Ruling)",
        airport: "Zero tolerance",
        tourist: "CBD ('Cannabis Light') legal; THC illegal.",
        description: "Recreational use is decriminalized (administrative fines). 'Cannabis Light' (low THC) is sold openly.",
        image: getCountryImage("italy"),
        regions: [
          {
            slug: "lazio",
            name: "Lazio",
            cities: [{ slug: "rome", name: "Rome", atGlance: ["Historic centre ban", "Medical pharmacies", "Discreet only"] }],
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
        possession: "25 g civil fine (Administrative)",
        airport: "Do not transport",
        tourist: "Decriminalized ≠ Legal. Police will confiscate.",
        description: "All drugs decriminalised 2001 (health issue). No legal shops for recreational cannabis.",
        image: getCountryImage("portugal"),
        regions: [
          {
            slug: "lisbon-region",
            name: "Lisbon Region",
            cities: [{ slug: "lisbon", name: "Lisbon", atGlance: ["Street dealers often fake", "Social clubs rare", "Trams, don’t drive"] }],
          },
          {
            slug: "porto-region",
            name: "Porto Region",
            cities: [{ slug: "porto", name: "Porto", atGlance: ["Wine city", "River views", "Low-profile use"] }],
          },
        ],
      },
      {
        slug: "switzerland",
        name: "Switzerland",
        legalStatus: "Decriminalized",
        possession: "10 g civil fine",
        airport: "Do not transport",
        tourist: "Low-THC (<1%) sold legally as tobacco substitute.",
        description: "High-THC cannabis trials in some cities (residents only). Low-THC cannabis is legal.",
        image: getCountryImage("switzerland"),
        regions: [
          {
            slug: "zurich-region",
            name: "Zurich Region",
            cities: [{ slug: "zurich", name: "Zurich", atGlance: ["Banking hub", "Hemp stores", "No public use"] }],
          },
          {
            slug: "geneva-region",
            name: "Geneva Region",
            cities: [{ slug: "geneva", name: "Geneva", atGlance: ["Diplomatic city", "Discreet only", "Lake views"] }],
          },
        ],
      },
      {
        slug: "austria",
        name: "Austria",
        legalStatus: "Decriminalized",
        possession: "Purchase seeds & hemp",
        airport: "Do not transport",
        tourist: "Enjoy Alps; herb secondary.",
        description: "Possession of small amounts decriminalised; hemp shops legal. High THC is illegal.",
        image: getCountryImage("austria"),
        regions: [{ slug: "vienna-region", name: "Vienna Region", cities: [{ slug: "vienna", name: "Vienna", atGlance: ["Coffee-house culture", "Hemp stores", "No public use"] }] }],
      },
      {
        slug: "czech-republic",
        name: "Czech Republic",
        legalStatus: "Decriminalized",
        possession: "15 g civil fine",
        airport: "Do not transport",
        tourist: "Tolerated but technically illegal to sell.",
        description: "Possession of <10g is an administrative offense. Medical cannabis is legal.",
        image: getCountryImage("czech-republic"),
        regions: [{ slug: "prague-region", name: "Prague Region", cities: [{ slug: "prague", name: "Prague", atGlance: ["Medieval centre", "Beer over bud", "Discreet only"] }] }],
      },
      {
        slug: "malta",
        name: "Malta",
        legalStatus: "Recreational",
        possession: "7 g home / 3.5 g public",
        airport: "Do not transport",
        tourist: "Associations are Residents Only.",
        description: "Legalised 2021. Tourists cannot legally buy cannabis. Public consumption is fined.",
        image: getCountryImage("malta"),
        regions: [{ slug: "malta-island", name: "Malta Island", cities: [{ slug: "valletta", name: "Valletta", atGlance: ["Fortress capital", "Associations members-only", "Beach relax"] }] }],
      },
      {
        slug: "luxembourg",
        name: "Luxembourg",
        legalStatus: "Recreational",
        possession: "3 g home grow (Private only)",
        airport: "Do not transport",
        tourist: "Residents only; tourists cannot buy.",
        description: "Legal home cultivation & possession for residents. Sales strictly illegal.",
        image: getCountryImage("luxembourg"),
        regions: [{ slug: "luxembourg-region", name: "Luxembourg Region", cities: [{ slug: "luxembourg-city", name: "Luxembourg City", atGlance: ["Banking centre", "Home grow only", "Beautiful old town"] }] }],
      },
      {
        slug: "belgium",
        name: "Belgium",
        legalStatus: "Decriminalized",
        possession: "3 g civil fine",
        airport: "Do not transport",
        tourist: "Enjoy waffles; herb secondary.",
        description: "Personal use (up to 3g) lowest prosecution priority for adults.",
        image: getCountryImage("belgium"),
        regions: [{ slug: "brussels-region", name: "Brussels Region", cities: [{ slug: "brussels", name: "Brussels", atGlance: ["EU capital", "Discreet only", "Chocolate & beer"] }] }],
      },
      {
        slug: "france",
        name: "France",
        legalStatus: "Illegal",
        possession: "Fines / Police custody",
        airport: "Zero tolerance",
        tourist: "Strictly illegal. CBD shops common but THC banned.",
        description: "Strict penalties. On-the-spot fines (€200) for use/possession.",
        image: getCountryImage("france"),
        regions: [
          {
            slug: "ile-de-france",
            name: "Île-de-France",
            cities: [{ slug: "paris", name: "Paris", atGlance: ["Romantic capital", "CBD shops only", "No public use"] }],
          },
          {
            slug: "provence",
            name: "Provence",
            cities: [{ slug: "marseille", name: "Marseille", atGlance: ["Port city", "Sun & sea", "Discreet only"] }],
          },
        ],
      },
      {
        slug: "uk",
        name: "United Kingdom",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only via specialist doctor (Private).",
        description: "Medical cannabis legal 2018 but restrictive. Recreational use is illegal (Class B drug).",
        image: getCountryImage("uk"),
        regions: [
          {
            slug: "england",
            name: "England",
            cities: [{ slug: "london", name: "London", atGlance: ["Capital clinics", "Private scripts", "No public use"] }, { slug: "manchester", name: "Manchester", atGlance: ["Northern hub", "Music scene", "Medical only"] }],
          },
          {
            slug: "scotland",
            name: "Scotland",
            cities: [{ slug: "edinburgh", name: "Edinburgh", atGlance: ["Castle views", "Medical only", "Festival city"] }],
          },
        ],
      },
      {
        slug: "ireland",
        name: "Ireland",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; recreational illegal.",
        description: "Medical cannabis pilot program exists. Recreational use strictly illegal.",
        image: getCountryImage("ireland"),
        regions: [{ slug: "dublin-region", name: "Dublin Region", cities: [{ slug: "dublin", name: "Dublin", atGlance: ["Pub culture", "Medical only", "Discreet only"] }] }],
      },
      {
        slug: "denmark",
        name: "Denmark",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Christiania 'Pusher Street' closed/enforced.",
        description: "Medical cannabis legal. Famous 'Pusher Street' in Christiania is recently facing heavy police crackdown.",
        image: getCountryImage("denmark"),
        regions: [{ slug: "copenhagen-region", name: "Copenhagen Region", cities: [{ slug: "copenhagen", name: "Copenhagen", atGlance: ["Bike capital", "Christiania enforcement", "Medical only"] }] }],
      },
      {
        slug: "finland",
        name: "Finland",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; saunas over smoke",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("finland"),
        regions: [{ slug: "helsinki-region", name: "Helsinki Region", cities: [{ slug: "helsinki", name: "Helsinki", atGlance: ["Design capital", "Medical only", "Sauna culture"] }] }],
      },
      {
        slug: "norway",
        name: "Norway",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; fjords over flower",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("norway"),
        regions: [{ slug: "oslo-region", name: "Oslo Region", cities: [{ slug: "oslo", name: "Oslo", atGlance: ["Fjord capital", "Medical only", "Outdoor life"] }] }],
      },
      {
        slug: "sweden",
        name: "Sweden",
        legalStatus: "Illegal",
        possession: "Strict Penalties",
        airport: "Zero tolerance",
        tourist: "Zero tolerance culture. Do not bring.",
        description: "Sweden has some of the strictest drug laws in Europe. Zero tolerance.",
        image: getCountryImage("sweden"),
        regions: [{ slug: "stockholm-region", name: "Stockholm Region", cities: [{ slug: "stockholm", name: "Stockholm", atGlance: ["Archipelago capital", "Strict laws", "Design hub"] }] }],
      },
      {
        slug: "iceland",
        name: "Iceland",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; enjoy glaciers",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("iceland"),
        regions: [{ slug: "reykjavik-region", name: "Reykjavik Region", cities: [{ slug: "reykjavik", name: "Reykjavik", atGlance: ["Northern lights", "Medical only", "Small-town vibe"] }] }],
      },
      {
        slug: "poland",
        name: "Poland",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; enjoy pierogi",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("poland"),
        regions: [{ slug: "warsaw-region", name: "Warsaw Region", cities: [{ slug: "warsaw", name: "Warsaw", atGlance: ["Rebuilt capital", "Medical only", "Vodka culture"] }] }, { slug: "krakow-region", name: "Kraków Region", cities: [{ slug: "krakow", name: "Kraków", atGlance: ["Medieval core", "Medical only", "Student vibe"] }] }],
      },
      {
        slug: "estonia",
        name: "Estonia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; digital society",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("estonia"),
        regions: [{ slug: "tallinn-region", name: "Tallinn Region", cities: [{ slug: "tallinn", name: "Tallinn", atGlance: ["Medieval old town", "Medical only", "Tech hub"] }] }],
      },
      {
        slug: "latvia",
        name: "Latvia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Art-Nouveau Riga",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("latvia"),
        regions: [{ slug: "riga-region", name: "Riga Region", cities: [{ slug: "riga", name: "Riga", atGlance: ["Art-Nouveau capital", "Medical only", "Baltic beaches"] }] }],
      },
      {
        slug: "lithuania",
        name: "Lithuania",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Baroque Vilnius",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("lithuania"),
        regions: [{ slug: "vilnius-region", name: "Vilnius Region", cities: [{ slug: "vilnius", name: "Vilnius", atGlance: ["Baroque old town", "Medical only", "Cheap beer"] }] }],
      },
      {
        slug: "slovenia",
        name: "Slovenia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Lake Bled beauty",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("slovenia"),
        regions: [{ slug: "ljubljana-region", name: "Ljubljana Region", cities: [{ slug: "ljubljana", name: "Ljubljana", atGlance: ["Dragon bridge", "Medical only", "Green capital"] }] }],
      },
      {
        slug: "slovakia",
        name: "Slovakia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Bratislava charm",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("slovakia"),
        regions: [{ slug: "bratislava-region", name: "Bratislava Region", cities: [{ slug: "bratislava", name: "Bratislava", atGlance: ["Danube capital", "Medical only", "Cheap beer"] }] }],
      },
      {
        slug: "hungary",
        name: "Hungary",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; thermal baths",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("hungary"),
        regions: [{ slug: "budapest-region", name: "Budapest Region", cities: [{ slug: "budapest", name: "Budapest", atGlance: ["Thermal baths", "Medical only", "Nightlife"] }] }],
      },
      {
        slug: "croatia",
        name: "Croatia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Adriatic coast",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("croatia"),
        regions: [{ slug: "zagreb-region", name: "Zagreb Region", cities: [{ slug: "zagreb", name: "Zagreb", atGlance: ["Capital cafes", "Medical only", "Cheap coffee"] }] }, { slug: "split-region", name: "Split Region", cities: [{ slug: "split", name: "Split", atGlance: ["Diocletian palace", "Medical only", "Coast relax"] }] }],
      },
      {
        slug: "serbia",
        name: "Serbia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Belgrade nightlife",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("serbia"),
        regions: [{ slug: "belgrade-region", name: "Belgrade Region", cities: [{ slug: "belgrade", name: "Belgrade", atGlance: ["Danube nightlife", "Medical only", "Cheap rakija"] }] }],
      },
      {
        slug: "bosnia",
        name: "Bosnia & Herzegovina",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Sarajevo history",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("bosnia"),
        regions: [{ slug: "sarajevo-region", name: "Sarajevo Region", cities: [{ slug: "sarajevo", name: "Sarajevo", atGlance: ["Ottoman old town", "Medical only", "Coffee culture"] }] }],
      },
      {
        slug: "montenegro",
        name: "Montenegro",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Bay of Kotor",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("montenegro"),
        regions: [{ slug: "podgorica-region", name: "Podgorica Region", cities: [{ slug: "podgorica", name: "Podgorica", atGlance: ["Small capital", "Medical only", "Mountain lakes"] }] }],
      },
      {
        slug: "north-macedonia",
        name: "North Macedonia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Lake Ohrid",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("north-macedonia"),
        regions: [{ slug: "skopje-region", name: "Skopje Region", cities: [{ slug: "skopje", name: "Skopje", atGlance: ["Balkan capital", "Medical only", "Cheap wine"] }] }],
      },
      {
        slug: "albania",
        name: "Albania",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Tirana buzz",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("albania"),
        regions: [{ slug: "tirana-region", name: "Tirana Region", cities: [{ slug: "tirana", name: "Tirana", atGlance: ["Colourful capital", "Medical only", "Cheap coffee"] }] }],
      },
      {
        slug: "greece",
        name: "Greece",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; enjoy islands",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("greece"),
        regions: [{ slug: "athens-region", name: "Athens Region", cities: [{ slug: "athens", name: "Athens", atGlance: ["Acropolis views", "Medical only", "Ancient history"] }] }, { slug: "thessaloniki-region", name: "Thessaloniki Region", cities: [{ slug: "thessaloniki", name: "Thessaloniki", atGlance: ["Northern port", "Medical only", "Student vibe"] }] }],
      },
      {
        slug: "bulgaria",
        name: "Bulgaria",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Black-Sea beaches",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("bulgaria"),
        regions: [{ slug: "sofia-region", name: "Sofia Region", cities: [{ slug: "sofia", name: "Sofia", atGlance: ["Mountain capital", "Medical only", "Cheap eats"] }] }],
      },
      {
        slug: "romania",
        name: "Romania",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Dracula castles",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("romania"),
        regions: [{ slug: "bucharest-region", name: "Bucharest Region", cities: [{ slug: "bucharest", name: "Bucharest", atGlance: ["Party capital", "Medical only", "Cheap beer"] }] }],
      },
      {
        slug: "moldova",
        name: "Moldova",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; wine country",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("moldova"),
        regions: [{ slug: "chisinau-region", name: "Chișinău Region", cities: [{ slug: "chisinau", name: "Chișinău", atGlance: ["Wine capital", "Medical only", "Cheap wine"] }] }],
      },
      {
        slug: "ukraine",
        name: "Ukraine",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; war-time caution",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("ukraine"),
        regions: [{ slug: "kyiv-region", name: "Kyiv Region", cities: [{ slug: "kyiv", name: "Kyiv", atGlance: ["Wartime capital", "Medical only", "Check travel advisories"] }] }],
      },
      {
        slug: "russia",
        name: "Russia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "WARNING: Severe penalties. Political hostages possible.",
        description: "Cannabis illegal. Foreigners have been detained for small amounts (e.g. vape cartridges) for years.",
        image: getCountryImage("russia"),
        regions: [{ slug: "moscow-region", name: "Moscow Region", cities: [{ slug: "moscow", name: "Moscow", atGlance: ["Red Square", "Illegal", "Severe penalties"] }] }, { slug: "stpetersburg-region", name: "St Petersburg Region", cities: [{ slug: "saint-petersburg", name: "Saint Petersburg", atGlance: ["Hermitage", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "belarus",
        name: "Belarus",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; authoritarian",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("belarus"),
        regions: [{ slug: "minsk-region", name: "Minsk Region", cities: [{ slug: "minsk", name: "Minsk", atGlance: ["Soviet capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "turkey",
        name: "Turkey",
        legalStatus: "Illegal",
        possession: "Strict penalites",
        airport: "Zero tolerance",
        tourist: "Strict laws; enjoy kebabs",
        description: "Medical cannabis legal but heavily restricted. Recreational use prohibited.",
        image: getCountryImage("turkey"),
        regions: [{ slug: "istanbul-region", name: "Istanbul Region", cities: [{ slug: "istanbul", name: "Istanbul", atGlance: ["East-meets-west", "Strict", "Bosphorus views"] }] }, { slug: "ankara-region", name: "Ankara Region", cities: [{ slug: "ankara", name: "Ankara", atGlance: ["Capital city", "Strict", "Anıtkabir"] }] }],
      },
      {
        slug: "cyprus",
        name: "Cyprus",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; island beaches",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("cyprus"),
        regions: [{ slug: "nicosia-region", name: "Nicosia Region", cities: [{ slug: "nicosia", name: "Nicosia", atGlance: ["Divided capital", "Medical only", "Beach close"] }] }],
      },
      {
        slug: "georgia",
        name: "Georgia",
        legalStatus: "Decriminalized",
        possession: "Small amounts tolerated",
        airport: "Zero tolerance",
        tourist: "Private use decriminalized, but buying is risky.",
        description: "Constitutional court abolished fines for consumption, but purchase/sale is illegal.",
        image: getCountryImage("georgia"),
        regions: [{ slug: "tbilisi-region", name: "Tbilisi Region", cities: [{ slug: "tbilisi", name: "Tbilisi", atGlance: ["Caucasus capital", "Medical only", "Wine culture"] }] }],
      },
      {
        slug: "armenia",
        name: "Armenia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Yerevan charm",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("armenia"),
        regions: [{ slug: "yerevan-region", name: "Yerevan Region", cities: [{ slug: "yerevan", name: "Yerevan", atGlance: ["Pink capital", "Medical only", "Caucasus views"] }] }],
      },
      {
        slug: "azerbaijan",
        name: "Azerbaijan",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Baku modern",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("azerbaijan"),
        regions: [{ slug: "baku-region", name: "Baku Region", cities: [{ slug: "baku", name: "Baku", atGlance: ["Caspian capital", "Medical only", "Flame towers"] }] }],
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
        description: "World’s first full legalisation; pharmacy sales & clubs for residents.",
        image: getCountryImage("uruguay"),
        regions: [
          {
            slug: "montevideo-region",
            name: "Montevideo Region",
            cities: [{ slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] }],
          },
          {
            slug: "punta-del-este-region",
            name: "Punta del Este Region",
            cities: [{ slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale = enforcement", "Private circles", "Enjoy beaches"] }],
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
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("argentina"),
        regions: [{ slug: "buenos-aires-region", name: "Buenos Aires Region", cities: [{ slug: "buenos-aires", name: "Buenos Aires", atGlance: ["Tango capital", "Medical only", "Steak & wine"] }] }, { slug: "mendoza-region", name: "Mendoza Region", cities: [{ slug: "mendoza", name: "Mendoza", atGlance: ["Wine region", "Medical only", "Andes views"] }] }],
      },
      {
        slug: "chile",
        name: "Chile",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Atacama desert",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("chile"),
        regions: [{ slug: "santiago-region", name: "Santiago Region", cities: [{ slug: "santiago", name: "Santiago", atGlance: ["Mountain capital", "Medical only", "Smoggy"] }] }],
      },
      {
        slug: "colombia",
        name: "Colombia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; coffee culture",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("colombia"),
        regions: [{ slug: "bogota-region", name: "Bogotá Region", cities: [{ slug: "bogota", name: "Bogotá", atGlance: ["Mountain capital", "Medical only", "Cool climate"] }] }, { slug: "medellin-region", name: "Medellín Region", cities: [{ slug: "medellin", name: "Medellín", atGlance: ["City of eternal spring", "Medical only", "Innovative"] }] }],
      },
      {
        slug: "brazil",
        name: "Brazil",
        legalStatus: "Illegal", // AUDIT FIX: Decrim but selling dangerous
        possession: "Decriminalized (40g)",
        airport: "Zero tolerance",
        tourist: "Personal use decriminalized, but strictly NO selling.",
        description: "Supreme Court decriminalized possession of 40g in 2024. However, police discretion is high and selling is a felony.",
        image: getCountryImage("brazil"),
        regions: [{ slug: "rio-de-janeiro-region", name: "Rio de Janeiro Region", cities: [{ slug: "rio-de-janeiro", name: "Rio de Janeiro", atGlance: ["Carnival capital", "Decriminalized personal", "Christ statue"] }] }, { slug: "sao-paulo-region", name: "São Paulo Region", cities: [{ slug: "sao-paulo", name: "São Paulo", atGlance: ["Mega-city", "Medical only", "Street art"] }] }],
      },
      {
        slug: "peru",
        name: "Peru",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Machu Picchu",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("peru"),
        regions: [{ slug: "lima-region", name: "Lima Region", cities: [{ slug: "lima", name: "Lima", atGlance: ["Coastal capital", "Medical only", "Great food"] }] }],
      },
      {
        slug: "venezuela",
        name: "Venezuela",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; crisis zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("venezuela"),
        regions: [{ slug: "caracas-region", name: "Caracas Region", cities: [{ slug: "caracas", name: "Caracas", atGlance: ["Crime capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "ecuador",
        name: "Ecuador",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Galápagos",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("ecuador"),
        regions: [{ slug: "quito-region", name: "Quito Region", cities: [{ slug: "quito", name: "Quito", atGlance: ["High-altitude capital", "Medical only", "Colonial centre"] }] }],
      },
      {
        slug: "bolivia",
        name: "Bolivia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Altiplano",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("bolivia"),
        regions: [{ slug: "la-paz-region", name: "La Paz Region", cities: [{ slug: "la-paz", name: "La Paz", atGlance: ["High-altitude seat", "Medical only", "Witches’ market"] }] }],
      },
      {
        slug: "paraguay",
        name: "Paraguay",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; cheap living",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("paraguay"),
        regions: [{ slug: "asuncion-region", name: "Asunción Region", cities: [{ slug: "asuncion", name: "Asunción", atGlance: ["River capital", "Medical only", "Cheap beer"] }] }],
      },
      {
        slug: "guyana",
        name: "Guyana",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; jungle frontier",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("guyana"),
        regions: [{ slug: "georgetown-region", name: "Georgetown Region", cities: [{ slug: "georgetown", name: "Georgetown", atGlance: ["Caribbean-flavoured", "Illegal", "Jungle gateway"] }] }],
      },
      {
        slug: "suriname",
        name: "Suriname",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; rainforest",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("suriname"),
        regions: [{ slug: "paramaribo-region", name: "Paramaribo Region", cities: [{ slug: "paramaribo", name: "Paramaribo", atGlance: ["Wooden capital", "Illegal", "Rainforest"] }] }],
      },
      {
        slug: "french-guiana",
        name: "French Guiana",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; EU Amazon",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("french-guiana"),
        regions: [{ slug: "cayenne-region", name: "Cayenne Region", cities: [{ slug: "cayenne", name: "Cayenne", atGlance: ["EU Amazon outpost", "Medical only", "Space centre"] }] }],
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
        description: "Decriminalised 2015; medical & Rasta sacramental use legal. Public use frowned upon.",
        image: "",
        regions: [
          {
            slug: "kingston-region",
            name: "Kingston Region",
            cities: [{ slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] }],
          },
          {
            slug: "montego-bay-region",
            name: "Montego Bay Region",
            cities: [{ slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] }],
          },
          {
            slug: "negril-region",
            name: "Negril Region",
            cities: [{ slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Small-town friendly"] }],
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
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "bridgetown-region", name: "Bridgetown Region", cities: [{ slug: "bridgetown", name: "Bridgetown", atGlance: ["Rum capital", "Medical only", "Crop-Over festival"] }] }],
      },
      {
        slug: "trinidad-tobago",
        name: "Trinidad & Tobago",
        legalStatus: "Decriminalized",
        possession: "30 g civil fine",
        airport: "Zero tolerance",
        tourist: "Enjoy carnival; small fines",
        description: "Decriminalised 2019; medical cannabis legal.",
        image: "",
        regions: [{ slug: "port-of-spain-region", name: "Port of Spain Region", cities: [{ slug: "port-of-spain", name: "Port of Spain", atGlance: ["Carnival capital", "Small fines", "Medical clinics"] }] }],
      },
      {
        slug: "bahamas",
        name: "Bahamas",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; island paradise",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "nassau-region", name: "Nassau Region", cities: [{ slug: "nassau", name: "Nassau", atGlance: ["Island capital", "Illegal", "Paradise beaches"] }] }],
      },
      {
        slug: "cuba",
        name: "Cuba",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; socialist island",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "havana-region", name: "Havana Region", cities: [{ slug: "havana", name: "Havana", atGlance: ["Vintage cars", "Illegal", "Salsa & cigars"] }] }],
      },
      {
        slug: "dominican-republic",
        name: "Dominican Republic",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; resort island",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "santo-domingo-region", name: "Santo Domingo Region", cities: [{ slug: "santo-domingo", name: "Santo Domingo", atGlance: ["Colonial capital", "Illegal", "Resort beaches"] }] }],
      },
      {
        slug: "haiti",
        name: "Haiti",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; crisis zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "port-au-prince-region", name: "Port-au-Prince Region", cities: [{ slug: "port-au-prince", name: "Port-au-Prince", atGlance: ["Crisis capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "puerto-rico",
        name: "Puerto Rico",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; US territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "san-juan-region", name: "San Juan Region", cities: [{ slug: "san-juan", name: "San Juan", atGlance: ["US island", "Medical only", "Beach vibes"] }] }],
      },
      {
        slug: "us-virgin-islands",
        name: "US Virgin Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; US territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "charlotte-amalie-region", name: "Charlotte Amalie Region", cities: [{ slug: "charlotte-amalie", name: "Charlotte Amalie", atGlance: ["Tax-free port", "Medical only", "Caribbean US"] }] }],
      },
      {
        slug: "british-virgin-islands",
        name: "British Virgin Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; UK territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "road-town-region", name: "Road Town Region", cities: [{ slug: "road-town", name: "Road Town", atGlance: ["Yacht hub", "Medical only", "UK Caribbean"] }] }],
      },
      {
        slug: "anguilla",
        name: "Anguilla",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; tiny UK island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "the-valley-region", name: "The Valley Region", cities: [{ slug: "the-valley", name: "The Valley", atGlance: ["Tiny capital", "Medical only", "Peaceful beaches"] }] }],
      },
      {
        slug: "st-maarten",
        name: "St Maarten",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; dual-nation island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "philipsburg-region", name: "Philipsburg Region", cities: [{ slug: "philipsburg", name: "Philipsburg", atGlance: ["Dual-nation capital", "Medical only", "Duty-free"] }] }],
      },
      {
        slug: "st-kitts-nevis",
        name: "St Kitts & Nevis",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; twin-island nation",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "basseterre-region", name: "Basseterre Region", cities: [{ slug: "basseterre", name: "Basseterre", atGlance: ["Twin capital", "Medical only", "Beach cricket"] }] }],
      },
      {
        slug: "antigua-barbuda",
        name: "Antigua & Barbuda",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; 365 beaches",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "st-johns-region", name: "St John’s Region", cities: [{ slug: "st-johns", name: "St John’s", atGlance: ["365 beaches", "Medical only", "Sailing hub"] }] }],
      },
      {
        slug: "dominica",
        name: "Dominica",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; nature island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "roseau-region", name: "Roseau Region", cities: [{ slug: "roseau", name: "Roseau", atGlance: ["Nature capital", "Medical only", "Whale watching"] }] }],
      },
      {
        slug: "grenada",
        name: "Grenada",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; spice island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "st-georges-region", name: "St George’s Region", cities: [{ slug: "st-georges", name: "St George’s", atGlance: ["Spice capital", "Medical only", "Port lagoon"] }] }],
      },
      {
        slug: "st-lucia",
        name: "St Lucia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; piton peaks",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "castries-region", name: "Castries Region", cities: [{ slug: "castries", name: "Castries", atGlance: ["Piton backdrop", "Medical only", "Cruise port"] }] }],
      },
      {
        slug: "st-vincent-grenadines",
        name: "St Vincent & the Grenadines",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; yacht paradise",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "kingstown-region", name: "Kingstown Region", cities: [{ slug: "kingstown", name: "Kingstown", atGlance: ["Yacht hub", "Medical only", "Volcano views"] }] }],
      },
      {
        slug: "bermuda",
        name: "Bermuda",
        legalStatus: "Recreational",
        possession: "7 g possession legal",
        airport: "Import prohibited",
        tourist: "Residents only; tourists cannot buy",
        description: "Legalised 2022; no commercial sales yet.",
        image: "",
        regions: [{ slug: "hamilton-region", name: "Hamilton Region", cities: [{ slug: "hamilton", name: "Hamilton", atGlance: ["Atlantic isle", "Home grow only", "Pastel houses"] }] }],
      },
      {
        slug: "cayman-islands",
        name: "Cayman Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; offshore finance",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "george-town-region", name: "George Town Region", cities: [{ slug: "george-town", name: "George Town", atGlance: ["Offshore hub", "Medical only", "Seven-mile beach"] }] }],
      },
      {
        slug: "turks-caicos",
        name: "Turks & Caicos",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; luxury resorts",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "cockburn-town-region", name: "Cockburn Town Region", cities: [{ slug: "cockburn-town", name: "Cockburn Town", atGlance: ["Luxury capital", "Medical only", "Grace Bay"] }] }],
      },
      {
        slug: "aruba",
        name: "Aruba",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Dutch-Caribbean",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "oranjestad-region", name: "Oranjestad Region", cities: [{ slug: "oranjestad", name: "Oranjestad", atGlance: ["Dutch-Caribbean", "Illegal", "Eagle beach"] }] }],
      },
      {
        slug: "curacao",
        name: "Curaçao",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Dutch-Caribbean",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "willemstad-region", name: "Willemstad Region", cities: [{ slug: "willemstad", name: "Willemstad", atGlance: ["Coloured capital", "Medical only", "Dutch-Caribbean"] }] }],
      },
      {
        slug: "bonaire",
        name: "Bonaire",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; dive paradise",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "kralendijk-region", name: "Kralendijk Region", cities: [{ slug: "kralendijk", name: "Kralendijk", atGlance: ["Dive capital", "Medical only", "Salt pans"] }] }],
      },
      {
        slug: "sint-eustatius",
        name: "Sint Eustatius",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; quiet volcano",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "oranjestad-eustatius-region", name: "Oranjestad Region", cities: [{ slug: "oranjestad-eustatius", name: "Oranjestad", atGlance: ["Volcano views", "Medical only", "Quiet island"] }] }],
      },
      {
        slug: "saba",
        name: "Saba",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; shortest runway",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "the-bottom-region", name: "The Bottom Region", cities: [{ slug: "the-bottom", name: "The Bottom", atGlance: ["Shortest runway", "Medical only", "Mountain village"] }] }],
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
        legalStatus: "Mixed", 
        possession: "Medical prescription required (2025)",
        airport: "Illegal to import/export",
        tourist: "WARNING: Recreational era ending. Medical script required.",
        description:
          "Decriminalized in 2022, but regulations are tightening significantly in 2025 to ban recreational use. Tourists should act with caution.",
        image: getCountryImage("thailand"),
        regions: [
          {
            slug: "bangkok-region",
            name: "Bangkok Region",
            cities: [{ slug: "bangkok", name: "Bangkok", atGlance: ["Shops closing/converting", "Scripts needed", "Discreet only"] }],
          },
          {
            slug: "phuket-region",
            name: "Phuket Region",
            cities: [{ slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach parties = no weed", "Consider weed-free holiday"] }],
          },
          {
            slug: "chiang-mai-region",
            name: "Chiang Mai Region",
            cities: [{ slug: "chiang-mai", name: "Chiang Mai", atGlance: ["Conservative north", "Traditional meds", "Docs essential"] }],
          },
        ],
      },
      {
        slug: "singapore",
        name: "Singapore",
        legalStatus: "Illegal",
        possession: "Caning & Long Prison Terms",
        airport: "Zero tolerance (Death penalty risk)",
        tourist: "WARNING: Mandatory death penalty for trafficking. Drug tests at entry.",
        description: "Possession is a serious crime punishable by caning. Trafficking >500g cannabis carries the mandatory death penalty.",
        image: getCountryImage("singapore"),
        regions: [{ slug: "singapore-island", name: "Singapore Island", cities: [{ slug: "singapore", name: "Singapore", atGlance: ["Garden city", "Illegal", "Death-penalty risk"] }] }],
      },
      {
        slug: "malaysia",
        name: "Malaysia",
        legalStatus: "Illegal", 
        possession: "Severe prison / Caning",
        airport: "Zero tolerance",
        tourist: "WARNING: Trafficking carries death penalty risk.",
        description: "Strictly illegal. While mandatory death penalty was abolished in 2023, it remains a discretionary punishment for trafficking.",
        image: getCountryImage("malaysia"),
        regions: [{ slug: "kuala-lumpur-region", name: "Kuala Lumpur Region", cities: [{ slug: "kuala-lumpur", name: "Kuala Lumpur", atGlance: ["Petronas towers", "Illegal", "Death-penalty caution"] }] }],
      },
      {
        slug: "indonesia",
        name: "Indonesia",
        legalStatus: "Illegal", 
        possession: "Prison / Deportation",
        airport: "Zero tolerance (Death penalty risk for trafficking)",
        tourist: "WARNING: Severe penalties (Bali included). Do not buy.",
        description: "Strictly illegal. Constitutional Court rejected medical use. Police frequently target tourists in Bali.",
        image: getCountryImage("indonesia"),
        regions: [{ slug: "jakarta-region", name: "Jakarta Region", cities: [{ slug: "jakarta", name: "Jakarta", atGlance: ["Mega-capital", "Illegal", "Death-penalty caution"] }] }, { slug: "bali-region", name: "Bali Region", cities: [{ slug: "denpasar", name: "Denpasar", atGlance: ["Island hub", "Illegal", "Death-penalty caution"] }] }],
      },
      {
        slug: "philippines",
        name: "Philippines",
        legalStatus: "Illegal", 
        possession: "Life imprisonment for large amounts",
        airport: "Zero tolerance",
        tourist: "WARNING: Severe penalties. Medical bill pending but not law.",
        description: "Strictly illegal. Harsh anti-drug enforcement campaigns continue.",
        image: getCountryImage("philippines"),
        regions: [{ slug: "manila-region", name: "Manila Region", cities: [{ slug: "manila", name: "Manila", atGlance: ["Mega-city", "Illegal", "Death-penalty caution"] }] }],
      },
      {
        slug: "vietnam",
        name: "Vietnam",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "WARNING: Severe penalties. Death penalty for trafficking.",
        description: "Cannabis illegal. Possession criminalised. Trafficking large amounts leads to death penalty.",
        image: getCountryImage("vietnam"),
        regions: [{ slug: "hanoi-region", name: "Hanoi Region", cities: [{ slug: "hanoi", name: "Hanoi", atGlance: ["Old quarter", "Illegal", "Severe penalties"] }] }, { slug: "ho-chi-minh-region", name: "Ho Chi Minh Region", cities: [{ slug: "ho-chi-minh-city", name: "Ho Chi Minh City", atGlance: ["Motorbike chaos", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "laos",
        name: "Laos",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; backpacker caution",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("laos"),
        regions: [{ slug: "vientiane-region", name: "Vientiane Region", cities: [{ slug: "vientiane", name: "Vientiane", atGlance: ["Mekong capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "cambodia",
        name: "Cambodia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; backpacker caution",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("cambodia"),
        regions: [{ slug: "phnom-penh-region", name: "Phnom Penh Region", cities: [{ slug: "phnom-penh", name: "Phnom Penh", atGlance: ["River capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "myanmar",
        name: "Myanmar",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; civil-war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("myanmar"),
        regions: [{ slug: "yangon-region", name: "Yangon Region", cities: [{ slug: "yangon", name: "Yangon", atGlance: ["Shwedagon pagoda", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "china",
        name: "China",
        legalStatus: "Illegal",
        possession: "Detention / Deportation",
        airport: "Zero tolerance",
        tourist: "Severe penalties. Random drug tests possible.",
        description: "Strictly illegal. Trafficking can carry the death penalty. Administrative detention for consumption.",
        image: getCountryImage("china"),
        regions: [{ slug: "beijing-region", name: "Beijing Region", cities: [{ slug: "beijing", name: "Beijing", atGlance: ["Forbidden City", "Illegal", "Severe penalties"] }] }, { slug: "shanghai-region", name: "Shanghai Region", cities: [{ slug: "shanghai", name: "Shanghai", atGlance: ["Skyline hub", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "japan",
        name: "Japan",
        legalStatus: "Illegal",
        possession: "Prison (up to 5 years)",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; zero tolerance culture",
        description: "Cannabis Control Act punishes possession severely. Foreigners are likely to be deported after prison time.",
        image: getCountryImage("japan"),
        regions: [{ slug: "tokyo-region", name: "Tokyo Region", cities: [{ slug: "tokyo", name: "Tokyo", atGlance: ["Neon capital", "Illegal", "Severe penalties"] }] }, { slug: "osaka-region", name: "Osaka Region", cities: [{ slug: "osaka", name: "Osaka", atGlance: ["Food capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "south-korea",
        name: "South Korea",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; K-culture",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("south-korea"),
        regions: [{ slug: "seoul-region", name: "Seoul Region", cities: [{ slug: "seoul", name: "Seoul", atGlance: ["K-pop capital", "Medical only", "No public use"] }] }],
      },
      {
        slug: "north-korea",
        name: "North Korea",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; unknown regime",
        description: "Cannabis illegal; regime opaque.",
        image: getCountryImage("north-korea"),
        regions: [{ slug: "pyongyang-region", name: "Pyongyang Region", cities: [{ slug: "pyongyang", name: "Pyongyang", atGlance: ["Regime capital", "Illegal", "Unknown penalties"] }] }],
      },
      {
        slug: "mongolia",
        name: "Mongolia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; vast steppe",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("mongolia"),
        regions: [{ slug: "ulaanbaatar-region", name: "Ulaanbaatar Region", cities: [{ slug: "ulaanbaatar", name: "Ulaanbaatar", atGlance: ["Steppe capital", "Illegal", "Yurt districts"] }] }],
      },
      {
        slug: "taiwan",
        name: "Taiwan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("taiwan"),
        regions: [{ slug: "taipei-region", name: "Taipei Region", cities: [{ slug: "taipei", name: "Taipei", atGlance: ["Night-market capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "hong-kong",
        name: "Hong Kong",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("hong-kong"),
        regions: [{ slug: "hong-kong-island", name: "Hong Kong Island", cities: [{ slug: "hong-kong", name: "Hong Kong", atGlance: ["Skyline harbour", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "macau",
        name: "Macau",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; casino city",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("macau"),
        regions: [{ slug: "macau-peninsula", name: "Macau Peninsula", cities: [{ slug: "macau", name: "Macau", atGlance: ["Casino capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "india",
        name: "India",
        legalStatus: "Mixed",
        possession: "State dependent (Bhang tolerated)",
        airport: "Zero tolerance",
        tourist: "Flower illegal; 'Bhang' (edible) legal in some states.",
        description: "National law bans flower (ganja) and resin (charas), but leaves/seeds (bhang) are legal in some states for religious reasons.",
        image: getCountryImage("india"),
        regions: [{ slug: "delhi-region", name: "Delhi Region", cities: [{ slug: "delhi", name: "Delhi", atGlance: ["Capital chaos", "Flower illegal", "Bhang lassi tolerated"] }] }, { slug: "goa-region", name: "Goa Region", cities: [{ slug: "panaji", name: "Panaji", atGlance: ["Beach parties", "Police raids common", "Flower illegal"] }] }],
      },
      {
        slug: "pakistan",
        name: "Pakistan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("pakistan"),
        regions: [{ slug: "islamabad-region", name: "Islamabad Region", cities: [{ slug: "islamabad", name: "Islamabad", atGlance: ["Planned capital", "Illegal", "Severe penalties"] }] }, { slug: "karachi-region", name: "Karachi Region", cities: [{ slug: "karachi", name: "Karachi", atGlance: ["Coastal mega-city", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "bangladesh",
        name: "Bangladesh",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("bangladesh"),
        regions: [{ slug: "dhaka-region", name: "Dhaka Region", cities: [{ slug: "dhaka", name: "Dhaka", atGlance: ["Mega-delta capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "sri-lanka",
        name: "Sri Lanka",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Ceylon tea",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("sri-lanka"),
        regions: [{ slug: "colombo-region", name: "Colombo Region", cities: [{ slug: "colombo", name: "Colombo", atGlance: ["Port capital", "Medical only", "Ceylon tea"] }] }],
      },
      {
        slug: "nepal",
        name: "Nepal",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; hash history",
        description: "Cannabis illegal; historical hashish tolerated in pilgrim areas only.",
        image: getCountryImage("nepal"),
        regions: [{ slug: "kathmandu-region", name: "Kathmandu Region", cities: [{ slug: "kathmandu", name: "Kathmandu", atGlance: ["Temple capital", "Illegal", "Hash history"] }] }],
      },
      {
        slug: "bhutan",
        name: "Bhutan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Himalayan kingdom",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("bhutan"),
        regions: [{ slug: "thimphu-region", name: "Thimphu Region", cities: [{ slug: "thimphu", name: "Thimphu", atGlance: ["Mountain capital", "Illegal", "Gross-national happiness"] }] }],
      },
      {
        slug: "maldives",
        name: "Maldives",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; resort islands",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("maldives"),
        regions: [{ slug: "male-region", name: "Malé Region", cities: [{ slug: "male", name: "Malé", atGlance: ["Coral capital", "Illegal", "Resort islands"] }] }],
      },
      {
        slug: "afghanistan",
        name: "Afghanistan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; production region but prohibited.",
        image: getCountryImage("afghanistan"),
        regions: [{ slug: "kabul-region", name: "Kabul Region", cities: [{ slug: "kabul", name: "Kabul", atGlance: ["War-torn capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "iran",
        name: "Iran",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; severe penalties",
        description: "Cannabis illegal; trafficking can lead to death penalty.",
        image: getCountryImage("iran"),
        regions: [{ slug: "tehran-region", name: "Tehran Region", cities: [{ slug: "tehran", name: "Tehran", atGlance: ["Mountain capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "iraq",
        name: "Iraq",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; conflict zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("iraq"),
        regions: [{ slug: "baghdad-region", name: "Baghdad Region", cities: [{ slug: "baghdad", name: "Baghdad", atGlance: ["Tigris capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "syria",
        name: "Syria",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("syria"),
        regions: [{ slug: "damascus-region", name: "Damascus Region", cities: [{ slug: "damascus", name: "Damascus", atGlance: ["Ancient capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "lebanon",
        name: "Lebanon",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Bekaa hash history",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("lebanon"),
        regions: [{ slug: "beirut-region", name: "Beirut Region", cities: [{ slug: "beirut", name: "Beirut", atGlance: ["Party capital", "Medical only", "Bekaa hash history"] }] }],
      },
      {
        slug: "israel",
        name: "Israel",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; high-tech research",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("israel"),
        regions: [
          {
            slug: "tel-aviv-region",
            name: "Tel Aviv Region",
            cities: [{ slug: "tel-aviv", name: "Tel Aviv", atGlance: ["Start-up beach", "Medical only", "Mediterranean vibes"] }],
          },
          {
            slug: "jerusalem-region",
            name: "Jerusalem Region",
            cities: [{ slug: "jerusalem", name: "Jerusalem", atGlance: ["Holy city", "Medical only", "Ancient walls"] }]
          }
        ],
      },
      {
        slug: "palestine",
        name: "Palestine",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; conflict zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("palestine"),
        regions: [{ slug: "ramallah-region", name: "Ramallah Region", cities: [{ slug: "ramallah", name: "Ramallah", atGlance: ["De-facto capital", "Illegal", "Conflict zone"] }] }],
      },
      {
        slug: "jordan",
        name: "Jordan",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Petra wonder",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: getCountryImage("jordan"),
        regions: [{ slug: "amman-region", name: "Amman Region", cities: [{ slug: "amman", name: "Amman", atGlance: ["Hilly capital", "Medical only", "Petra gateway"] }] }],
      },
      {
        slug: "saudi-arabia",
        name: "Saudi Arabia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "WARNING: Extreme penalties (Death/Lashes).",
        description: "Cannabis illegal; severe penalties including death for trafficking and corporal punishment.",
        image: getCountryImage("saudi-arabia"),
        regions: [{ slug: "riyadh-region", name: "Riyadh Region", cities: [{ slug: "riyadh", name: "Riyadh", atGlance: ["Desert capital", "Illegal", "Extreme penalties"] }] }, { slug: "jeddah-region", name: "Jeddah Region", cities: [{ slug: "jeddah", name: "Jeddah", atGlance: ["Red-Sea port", "Illegal", "Extreme penalties"] }] }],
      },
      {
        slug: "uae",
        name: "United Arab Emirates",
        legalStatus: "Illegal", 
        possession: "4+ years prison / Deportation",
        airport: "Zero tolerance (Sensitive equipment)",
        tourist: "Strictly illegal. THC in blood stream counts as possession.",
        description: "Zero tolerance. Laws are strictly enforced. CBD oil is generally illegal. Presence of drugs in blood tests is considered possession.",
        image: getCountryImage("uae"),
        regions: [{ slug: "dubai-region", name: "Dubai Region", cities: [{ slug: "dubai", name: "Dubai", atGlance: ["Futuristic city", "Illegal", "Zero-tolerance airport"] }] }, { slug: "abu-dhabi-region", name: "Abu Dhabi Region", cities: [{ slug: "abu-dhabi", name: "Abu Dhabi", atGlance: ["Oil capital", "Illegal", "Grand mosque"] }] }],
      },
      {
        slug: "qatar",
        name: "Qatar",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; severe penalties",
        description: "Cannabis illegal; severe penalties.",
        image: getCountryImage("qatar"),
        regions: [{ slug: "doha-region", name: "Doha Region", cities: [{ slug: "doha", name: "Doha", atGlance: ["Desert capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "kuwait",
        name: "Kuwait",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; severe penalties.",
        image: getCountryImage("kuwait"),
        regions: [{ slug: "kuwait-city-region", name: "Kuwait City Region", cities: [{ slug: "kuwait-city", name: "Kuwait City", atGlance: ["Oil capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "bahrain",
        name: "Bahrain",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; island kingdom",
        description: "Cannabis illegal; severe penalties.",
        image: getCountryImage("bahrain"),
        regions: [{ slug: "manama-region", name: "Manama Region", cities: [{ slug: "manama", name: "Manama", atGlance: ["Island capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "oman",
        name: "Oman",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; desert sultanate",
        description: "Cannabis illegal; severe penalties.",
        image: getCountryImage("oman"),
        regions: [{ slug: "muscat-region", name: "Muscat Region", cities: [{ slug: "muscat", name: "Muscat", atGlance: ["Desert capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "yemen",
        name: "Yemen",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("yemen"),
        regions: [{ slug: "sanaa-region", name: "Sana’a Region", cities: [{ slug: "sanaa", name: "Sana’a", atGlance: ["War-torn capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "brunei",
        name: "Brunei",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; death-penalty risk",
        description: "Cannabis illegal; severe penalties including death.",
        image: getCountryImage("brunei"),
        regions: [{ slug: "bandar-seri-begawan-region", name: "Bandar Seri Begawan Region", cities: [{ slug: "bandar-seri-begawan", name: "Bandar Seri Begawan", atGlance: ["Sultanate capital", "Illegal", "Death-penalty risk"] }] }],
      },
      {
        slug: "east-timor",
        name: "East Timor",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; developing nation",
        description: "Cannabis illegal; possession criminalised.",
        image: getCountryImage("timor-leste"),
        regions: [{ slug: "dili-region", name: "Dili Region", cities: [{ slug: "dili", name: "Dili", atGlance: ["Coastal capital", "Illegal", "Developing"] }] }],
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
        tourist: "Private homes only. BUYING is illegal.",
        description:
          "Constitutional Court ruled private cultivation and use legal. However, buying/selling remains a crime (though 'clubs' exist in grey area).",
        image: "",
        regions: [
          {
            slug: "western-cape",
            name: "Western Cape",
            cities: [{ slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Grey market clubs", "Stunning nature"] }, { slug: "stellenbosch", name: "Stellenbosch", atGlance: ["Wine capital", "Private use", "University town"] }],
          },
          {
            slug: "gauteng",
            name: "Gauteng",
            cities: [{ slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city", "Security tight", "Private use only"] }, { slug: "pretoria", name: "Pretoria", atGlance: ["Jacaranda city", "Private use", "Embassy hub"] }],
          },
          {
            slug: "kwazulu-natal",
            name: "KwaZulu-Natal",
            cities: [{ slug: "durban", name: "Durban", atGlance: ["Beach rules strict", "Private use", "Respect traditional areas"] }],
          },
        ],
      },
      {
        slug: "zimbabwe",
        name: "Zimbabwe",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Victoria Falls",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "harare-region", name: "Harare Region", cities: [{ slug: "harare", name: "Harare", atGlance: ["Garden capital", "Medical only", "Victoria Falls gateway"] }] }],
      },
      {
        slug: "lesotho",
        name: "Lesotho",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; mountain kingdom",
        description: "First African nation to legalise medical cannabis; exports allowed.",
        image: "",
        regions: [{ slug: "maseru-region", name: "Maseru Region", cities: [{ slug: "maseru", name: "Maseru", atGlance: ["Mountain capital", "Medical only", "Highest pub"] }] }],
      },
      {
        slug: "morocco",
        name: "Morocco",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Widely tolerated in Rif, but strictly illegal.",
        description: "Cannabis illegal; Rif Mountains tolerated for local farmers only.",
        image: "",
        regions: [{ slug: "casablanca-region", name: "Casablanca Region", cities: [{ slug: "casablanca", name: "Casablanca", atGlance: ["Commercial capital", "Illegal", "Tolerated Rif only"] }] }, { slug: "marrakech-region", name: "Marrakech Region", cities: [{ slug: "marrakech", name: "Marrakech", atGlance: ["Red city", "Illegal", "Discreet only"] }] }],
      },
      {
        slug: "ghana",
        name: "Ghana",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; gold-coast history",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "accra-region", name: "Accra Region", cities: [{ slug: "accra", name: "Accra", atGlance: ["Coastal capital", "Medical only", "Gold-coast vibes"] }] }],
      },
      {
        slug: "nigeria",
        name: "Nigeria",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "lagos-region", name: "Lagos Region", cities: [{ slug: "lagos", name: "Lagos", atGlance: ["Mega-city", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "egypt",
        name: "Egypt",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; harsh penalties",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "cairo-region", name: "Cairo Region", cities: [{ slug: "cairo", name: "Cairo", atGlance: ["Pyramid views", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "ethiopia",
        name: "Ethiopia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; coffee over cannabis",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "addis-ababa-region", name: "Addis Ababa Region", cities: [{ slug: "addis-ababa", name: "Addis Ababa", atGlance: ["Coffee capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "kenya",
        name: "Kenya",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; safari over smoke",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "nairobi-region", name: "Nairobi Region", cities: [{ slug: "nairobi", name: "Nairobi", atGlance: ["Safari capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "uganda",
        name: "Uganda",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; gorilla trekking",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "kampala-region", name: "Kampala Region", cities: [{ slug: "kampala", name: "Kampala", atGlance: ["Lake capital", "Medical only", "Gorilla gateway"] }] }],
      },
      {
        slug: "tanzania",
        name: "Tanzania",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Zanzibar beaches",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "dar-es-salaam-region", name: "Dar es Salaam Region", cities: [{ slug: "dar-es-salaam", name: "Dar es Salaam", atGlance: ["Port capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "zambia",
        name: "Zambia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Victoria Falls",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "lusaka-region", name: "Lusaka Region", cities: [{ slug: "lusaka", name: "Lusaka", atGlance: ["High-altitude capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "botswana",
        name: "Botswana",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Okavango Delta",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "gaborone-region", name: "Gaborone Region", cities: [{ slug: "gaborone", name: "Gaborone", atGlance: ["Desert capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "namibia",
        name: "Namibia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; desert vastness",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "windhoek-region", name: "Windhoek Region", cities: [{ slug: "windhoek", name: "Windhoek", atGlance: ["Desert capital", "Illegal", "German beer"] }] }],
      },
      {
        slug: "angola",
        name: "Angola",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; oil-rich",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "luanda-region", name: "Luanda Region", cities: [{ slug: "luanda", name: "Luanda", atGlance: ["Oil capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "mozambique",
        name: "Mozambique",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Indian-Ocean beaches",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "maputo-region", name: "Maputo Region", cities: [{ slug: "maputo", name: "Maputo", atGlance: ["Indian-Ocean port", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "malawi",
        name: "Malawi",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Lake Malawi",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "lilongwe-region", name: "Lilongwe Region", cities: [{ slug: "lilongwe", name: "Lilongwe", atGlance: ["Lake capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "rwanda",
        name: "Rwanda",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; gorilla trekking",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "kigali-region", name: "Kigali Region", cities: [{ slug: "kigali", name: "Kigali", atGlance: ["Clean capital", "Illegal", "Gorilla gateway"] }] }],
      },
      {
        slug: "burundi",
        name: "Burundi",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; crisis zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "bujumbura-region", name: "Bujumbura Region", cities: [{ slug: "bujumbura", name: "Bujumbura", atGlance: ["Lake capital", "Illegal", "Crisis zone"] }] }],
      },
      {
        slug: "djibouti",
        name: "Djibouti",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; military hub",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "djibouti-city-region", name: "Djibouti City Region", cities: [{ slug: "djibouti-city", name: "Djibouti City", atGlance: ["Military port", "Illegal", "Desert heat"] }] }],
      },
      {
        slug: "eritrea",
        name: "Eritrea",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; closed nation",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "asmara-region", name: "Asmara Region", cities: [{ slug: "asmara", name: "Asmara", atGlance: ["Art-deco capital", "Illegal", "Closed nation"] }] }],
      },
      {
        slug: "somalia",
        name: "Somalia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "mogadishu-region", name: "Mogadishu Region", cities: [{ slug: "mogadishu", name: "Mogadishu", atGlance: ["War-torn capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "sudan",
        name: "Sudan",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; conflict zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "khartoum-region", name: "Khartoum Region", cities: [{ slug: "khartoum", name: "Khartoum", atGlance: ["Nile confluence", "Illegal", "Conflict zone"] }] }],
      },
      {
        slug: "libya",
        name: "Libya",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "tripoli-region", name: "Tripoli Region", cities: [{ slug: "tripoli", name: "Tripoli", atGlance: ["War-torn capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "tunisia",
        name: "Tunisia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Mediterranean",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "tunis-region", name: "Tunis Region", cities: [{ slug: "tunis", name: "Tunis", atGlance: ["Medina capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "algeria",
        name: "Algeria",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Sahara desert",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "algiers-region", name: "Algiers Region", cities: [{ slug: "algiers", name: "Algiers", atGlance: ["White capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "mauritania",
        name: "Mauritania",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Sahara vast",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "nouakchott-region", name: "Nouakchott Region", cities: [{ slug: "nouakchott", name: "Nouakchott", atGlance: ["Desert capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "mali",
        name: "Mali",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; conflict zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "bamako-region", name: "Bamako Region", cities: [{ slug: "bamako", name: "Bamako", atGlance: ["Niger capital", "Illegal", "Conflict zone"] }] }],
      },
      {
        slug: "burkina-faso",
        name: "Burkina Faso",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; crisis zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "ouagadougou-region", name: "Ouagadougou Region", cities: [{ slug: "ouagadougou", name: "Ouagadougou", atGlance: ["Crisis capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "niger",
        name: "Niger",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Sahara-Sahel",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "niamey-region", name: "Niamey Region", cities: [{ slug: "niamey", name: "Niamey", atGlance: ["Sahel capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "chad",
        name: "Chad",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; desert vast",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "ndjamena-region", name: "N’Djamena Region", cities: [{ slug: "ndjamena", name: "N’Djamena", atGlance: ["Desert capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "central-african-republic",
        name: "Central African Republic",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "bangui-region", name: "Bangui Region", cities: [{ slug: "bangui", name: "Bangui", atGlance: ["War-torn capital", "Illegal", "Avoid travel"] }] }],
      },
      {
        slug: "cameroon",
        name: "Cameroon",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; bilingual nation",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "yaounde-region", name: "Yaoundé Region", cities: [{ slug: "yaounde", name: "Yaoundé", atGlance: ["Bilingual capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "equatorial-guinea",
        name: "Equatorial Guinea",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; oil-rich",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "malabo-region", name: "Malabo Region", cities: [{ slug: "malabo", name: "Malabo", atGlance: ["Island capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "gabon",
        name: "Gabon",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; rainforest",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "libreville-region", name: "Libreville Region", cities: [{ slug: "libreville", name: "Libreville", atGlance: ["Rainforest capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "republic-congo",
        name: "Republic of the Congo",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; rainforest",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "brazzaville-region", name: "Brazzaville Region", cities: [{ slug: "brazzaville", name: "Brazzaville", atGlance: ["Congo capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "democratic-republic-congo",
        name: "Democratic Republic of the Congo",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; conflict zone",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "kinshasa-region", name: "Kinshasa Region", cities: [{ slug: "kinshasa", name: "Kinshasa", atGlance: ["Mega-river capital", "Illegal", "Conflict zone"] }] }],
      },
      {
        slug: "benin",
        name: "Benin",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; voodoo heartland",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "porto-novo-region", name: "Porto-Novo Region", cities: [{ slug: "porto-novo", name: "Porto-Novo", atGlance: ["Voodoo capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "togo",
        name: "Togo",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; narrow nation",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "lome-region", name: "Lomé Region", cities: [{ slug: "lome", name: "Lomé", atGlance: ["Beach capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "ivory-coast",
        name: "Ivory Coast",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; cocoa coast",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "abidjan-region", name: "Abidjan Region", cities: [{ slug: "abidjan", name: "Abidjan", atGlance: ["Cocoa capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "liberia",
        name: "Liberia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; war recovery",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "monrovia-region", name: "Monrovia Region", cities: [{ slug: "monrovia", name: "Monrovia", atGlance: ["War-recovery capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "sierra-leone",
        name: "Sierra Leone",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; diamond coast",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "freetown-region", name: "Freetown Region", cities: [{ slug: "freetown", name: "Freetown", atGlance: ["Diamond capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "guinea",
        name: "Guinea",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; bauxite rich",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "conakry-region", name: "Conakry Region", cities: [{ slug: "conakry", name: "Conakry", atGlance: ["Peninsula capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "guinea-bissau",
        name: "Guinea-Bissau",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; cashew coast",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "bissau-region", name: "Bissau Region", cities: [{ slug: "bissau", name: "Bissau", atGlance: ["Cashew capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "gambia",
        name: "Gambia",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; river nation",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "banjul-region", name: "Banjul Region", cities: [{ slug: "banjul", name: "Banjul", atGlance: ["River capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "senegal",
        name: "Senegal",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; teranga hospitality",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "dakar-region", name: "Dakar Region", cities: [{ slug: "dakar", name: "Dakar", atGlance: ["Teranga capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "cape-verde",
        name: "Cape Verde",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; Atlantic islands",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "praia-region", name: "Praia Region", cities: [{ slug: "praia", name: "Praia", atGlance: ["Atlantic capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "sao-tome-principe",
        name: "São Tomé & Príncipe",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; chocolate islands",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "sao-tome-region", name: "São Tomé Region", cities: [{ slug: "sao-tome", name: "São Tomé", atGlance: ["Chocolate capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "seychelles",
        name: "Seychelles",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; granite islands",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "victoria-region", name: "Victoria Region", cities: [{ slug: "victoria-seychelles", name: "Victoria", atGlance: ["Tiny capital", "Medical only", "Paradise"] }] }],
      },
      {
        slug: "mauritius",
        name: "Mauritius",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; island paradise",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "port-louis-region", name: "Port Louis Region", cities: [{ slug: "port-louis", name: "Port Louis", atGlance: ["Port capital", "Medical only", "Multicultural"] }] }],
      },
      {
        slug: "comoros",
        name: "Comoros",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; perfume islands",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "moroni-region", name: "Moroni Region", cities: [{ slug: "moroni", name: "Moroni", atGlance: ["Perfume capital", "Illegal", "Severe penalties"] }] }],
      },
      {
        slug: "madagascar",
        name: "Madagascar",
        legalStatus: "Illegal",
        possession: "Criminal offence",
        airport: "Zero tolerance",
        tourist: "Strongly discouraged; lemur island",
        description: "Cannabis illegal; possession criminalised.",
        image: "",
        regions: [{ slug: "antananarivo-region", name: "Antananarivo Region", cities: [{ slug: "antananarivo", name: "Antananarivo", atGlance: ["Hill capital", "Illegal", "Lemurs"] }] }],
      },
      {
        slug: "reunion",
        name: "Réunion",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; French island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "saint-denis-region", name: "Saint-Denis Region", cities: [{ slug: "saint-denis-reunion", name: "Saint-Denis", atGlance: ["Volcano capital", "Medical only", "French island"] }] }],
      },
      {
        slug: "mayotte",
        name: "Mayotte",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; French island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "mamoudzou-region", name: "Mamoudzou Region", cities: [{ slug: "mamoudzou", name: "Mamoudzou", atGlance: ["Lagoon capital", "Medical only", "French island"] }] }],
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
        legalStatus: "Mixed",
        possession: "Medical only (Except ACT)",
        airport: "Zero tolerance",
        tourist: "Medical only. ACT (Canberra) allows personal grow/use.",
        description:
          "Medical cannabis legal nationwide. Recreational prohibited everywhere except the Capital Territory (ACT) where it is decriminalized/legalized for personal use.",
        image: "",
        regions: [
          {
            slug: "sydney-region",
            name: "Sydney Region",
            cities: [{ slug: "sydney", name: "Sydney", atGlance: ["Medical only", "Strict RBT driving", "Opera House"] }],
          },
          {
            slug: "melbourne-region",
            name: "Melbourne Region",
            cities: [{ slug: "melbourne", name: "Melbourne", atGlance: ["Cultural capital", "Medical only", "Coffee culture"] }],
          },
          {
            slug: "brisbane-region",
            name: "Brisbane Region",
            cities: [{ slug: "brisbane", name: "Brisbane", atGlance: ["River city", "Medical only", "Sunshine State"] }],
          },
          {
            slug: "perth-region",
            name: "Perth Region",
            cities: [{ slug: "perth", name: "Perth", atGlance: ["Isolated capital", "Medical only", "Sunset coast"] }],
          },
          {
            slug: "adelaide-region",
            name: "Adelaide Region",
            cities: [{ slug: "adelaide", name: "Adelaide", atGlance: ["Festival city", "Medical only", "Wine region"] }],
          },
          {
            slug: "canberra-region", // ADDED for accuracy
            name: "Australian Capital Territory",
            cities: [{ slug: "canberra", name: "Canberra", atGlance: ["Personal use legal", "Grow allowed", "No sales"] }],
          },
        ],
      },
      {
        slug: "new-zealand",
        name: "New Zealand",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; referendum failed.",
        description:
          "Medical cannabis legal; recreational use prohibited after 2020 referendum failed.",
        image: "",
        regions: [
          {
            slug: "auckland-region",
            name: "Auckland Region",
            cities: [{ slug: "auckland", name: "Auckland", atGlance: ["City of sails", "Medical only", "Volcanic"] }],
          },
          {
            slug: "wellington-region",
            name: "Wellington Region",
            cities: [{ slug: "wellington", name: "Wellington", atGlance: ["Windy capital", "Medical only", "Café culture"] }],
          },
          {
            slug: "christchurch-region",
            name: "Christchurch Region",
            cities: [{ slug: "christchurch", name: "Christchurch", atGlance: ["Garden city", "Medical only", "Quake rebuilt"] }],
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
        image: "",
        regions: [{ slug: "suva-region", name: "Suva Region", cities: [{ slug: "suva", name: "Suva", atGlance: ["Coral capital", "Medical only", "Island vibes"] }] }],
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
        image: "",
        regions: [{ slug: "port-moresby-region", name: "Port Moresby Region", cities: [{ slug: "port-moresby", name: "Port Moresby", atGlance: ["Jungle capital", "Medical only", "High crime"] }] }],
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
        image: "",
        regions: [{ slug: "apia-region", name: "Apia Region", cities: [{ slug: "apia", name: "Apia", atGlance: ["Polynesian capital", "Medical only", "Island vibes"] }] }],
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
        image: "",
        regions: [{ slug: "nukualofa-region", name: "Nukuʻalofa Region", cities: [{ slug: "nukualofa", name: "Nukuʻalofa", atGlance: ["Kingdom capital", "Medical only", "Polynesian"] }] }],
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
        image: "",
        regions: [
          {
            slug: "oahu",
            name: "O‘ahu",
            cities: [{ slug: "honolulu", name: "Honolulu", atGlance: ["Waikīkī stores", "No beach smoking", "Bring ID"] }],
          },
          {
            slug: "maui",
            name: "Maui",
            cities: [{ slug: "kahului", name: "Kahului", atGlance: ["Dispensary hub", "Resort ban", "Road to Hana"] }],
          },
        ],
      },
      {
        slug: "solomon-islands",
        name: "Solomon Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; WWII history",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "honiara-region", name: "Honiara Region", cities: [{ slug: "honiara", name: "Honiara", atGlance: ["WWII capital", "Medical only", "Pacific history"] }] }],
      },
      {
        slug: "vanuatu",
        name: "Vanuatu",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; volcano nation",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "port-vila-region", name: "Port Vila Region", cities: [{ slug: "port-vila", name: "Port Vila", atGlance: ["Volcano capital", "Medical only", "Pacific vibes"] }] }],
      },
      {
        slug: "kiribati",
        name: "Kiribati",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; equatorial islands",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "tarawa-region", name: "Tarawa Region", cities: [{ slug: "tarawa", name: "Tarawa", atGlance: ["Equatorial capital", "Medical only", "Remote"] }] }],
      },
      {
        slug: "tuvalu",
        name: "Tuvalu",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; sinking islands",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "funafuti-region", name: "Funafuti Region", cities: [{ slug: "funafuti", name: "Funafuti", atGlance: ["Sinking capital", "Medical only", "Remote"] }] }],
      },
      {
        slug: "nauru",
        name: "Nauru",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; phosphate island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "yaren-region", name: "Yaren Region", cities: [{ slug: "yaren", name: "Yaren", atGlance: ["Phosphate capital", "Medical only", "Smallest republic"] }] }],
      },
      {
        slug: "palau",
        name: "Palau",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; dive paradise",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "ngerulmud-region", name: "Ngerulmud Region", cities: [{ slug: "ngerulmud", name: "Ngerulmud", atGlance: ["Jungle capital", "Medical only", "Dive paradise"] }] }],
      },
      {
        slug: "marshall-islands",
        name: "Marshall Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; atoll nation",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "majuro-region", name: "Majuro Region", cities: [{ slug: "majuro", name: "Majuro", atGlance: ["Atoll capital", "Medical only", "US territory"] }] }],
      },
      {
        slug: "federated-states-micronesia",
        name: "Federated States of Micronesia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Pacific islands",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "palikir-region", name: "Palikir Region", cities: [{ slug: "palikir", name: "Palikir", atGlance: ["Pacific capital", "Medical only", "US territory"] }] }],
      },
      {
        slug: "new-caledonia",
        name: "New Caledonia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; French Pacific",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "noumea-region", name: "Nouméa Region", cities: [{ slug: "noumea", name: "Nouméa", atGlance: ["French Pacific", "Medical only", "Coral lagoon"] }] }],
      },
      {
        slug: "french-polynesia",
        name: "French Polynesia",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Tahiti pearls",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "papeete-region", name: "Papeete Region", cities: [{ slug: "papeete", name: "Papeete", atGlance: ["Tahiti capital", "Medical only", "Pearl lagoon"] }] }],
      },
      {
        slug: "wallis-futuna",
        name: "Wallis & Futuna",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; French Pacific",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "mata-utu-region", name: "Mata-Utu Region", cities: [{ slug: "mata-utu", name: "Mata-Utu", atGlance: ["French Pacific", "Medical only", "Remote"] }] }],
      },
      {
        slug: "norfolk-island",
        name: "Norfolk Island",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Australian territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "kingston-norfolk-region", name: "Kingston Norfolk Region", cities: [{ slug: "kingston-norfolk", name: "Kingston", atGlance: ["Pine capital", "Medical only", "Australian"] }] }],
      },
      {
        slug: "cocos-islands",
        name: "Cocos Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Australian territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "west-island-region", name: "West Island Region", cities: [{ slug: "west-island", name: "West Island", atGlance: ["Coconut capital", "Medical only", "Australian"] }] }],
      },
      {
        slug: "christmas-island",
        name: "Christmas Island",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; Australian territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "flying-fish-cove-region", name: "Flying Fish Cove Region", cities: [{ slug: "flying-fish-cove", name: "Flying Fish Cove", atGlance: ["Crab capital", "Medical only", "Australian"] }] }],
      },
      {
        slug: "pitcairn-islands",
        name: "Pitcairn Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; UK territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "adamstown-region", name: "Adamstown Region", cities: [{ slug: "adamstown", name: "Adamstown", atGlance: ["Remote capital", "Medical only", "UK territory"] }] }],
      },
      {
        slug: "tokelau",
        name: "Tokelau",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; NZ territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "tokelau-atoll-region", name: "Tokelau Atoll Region", cities: [{ slug: "tokelau-atoll", name: "Tokelau Atoll", atGlance: ["Remote atoll", "Medical only", "NZ territory"] }] }],
      },
      {
        slug: "niue",
        name: "Niue",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; coral island",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "alofi-region", name: "Alofi Region", cities: [{ slug: "alofi", name: "Alofi", atGlance: ["Coral capital", "Medical only", "NZ territory"] }] }],
      },
      {
        slug: "cook-islands",
        name: "Cook Islands",
        legalStatus: "Medical",
        possession: "Medical prescription only",
        airport: "Zero tolerance",
        tourist: "Medical only; NZ territory",
        description: "Medical cannabis legal; recreational use prohibited.",
        image: "",
        regions: [{ slug: "avarua-region", name: "Avarua Region", cities: [{ slug: "avarua", name: "Avarua", atGlance: ["Lagoon capital", "Medical only", "NZ territory"] }] }],
      },
    ],
  },
];

/* ---------- helpers ---------- */
const statusColor = (s: string) => getStatusBadgeClasses(s);

// HELPER: Detect Critical Human Rights Risks (Death/Caning)
const isDeathPenalty = (country: Country) => {
    const deathKeywords = ["death penalty", "execution", "capital punishment", "beheading"];
    const combinedText = (country.tourist + country.description).toLowerCase();
    return deathKeywords.some(kw => combinedText.includes(kw));
}

// HELPER: Detect Corporal Punishment (Caning/Lashes)
const isCorporalPunishment = (country: Country) => {
    const corporalKeywords = ["caning", "lashes", "whipping", "corporal punishment"];
    const combinedText = (country.tourist + country.description).toLowerCase();
    return corporalKeywords.some(kw => combinedText.includes(kw));
}

// HELPER: Detect Severe Legal/Prison Risks (Indefinite detention, state of exception)
const isSeverePrison = (country: Country) => {
   const strictKeywords = ["indefinite detention", "arbitrary arrest", "state of exception", "prison terms", "life imprisonment"];
   const combinedText = (country.tourist + country.description).toLowerCase(); 
   return strictKeywords.some(kw => combinedText.includes(kw));
}

/* ---------- sub-components ---------- */
// Get all countries flattened from all continents
const getAllCountries = () => {
  return WORLD.flatMap(continent => 
    continent.countries.map(country => ({
      ...country,
      image: country.image || getCountryImage(country.slug),
      continentSlug: continent.slug,
      continentName: continent.name
    }))
  );
};

// Search Results for Countries
const CountrySearchResults = ({ 
  query, 
  onClear 
}: { 
  query: string; 
  onClear: () => void;
}) => {
  const nav = useNavigate();
  const allCountries = useMemo(() => getAllCountries(), []);
  
  const filteredCountries = useMemo(() => {
    return allCountries.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allCountries]);

  return (
    <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
      <Button
        variant="ghost"
        onClick={onClear}
        className="mb-6 gap-2 pl-0 hover:bg-transparent"
      >
        <ArrowLeft className="w-4 h-4" /> Clear search
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          Search Results
        </h1>
        <p className="text-lg text-muted-foreground">
          {filteredCountries.length} countr{filteredCountries.length !== 1 ? 'ies' : 'y'} found for "{query}"
        </p>
      </motion.div>

      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((c) => {
            const deathRisk = isDeathPenalty(c);
            const corporalRisk = isCorporalPunishment(c);
            const prisonRisk = isSeverePrison(c);

            return (
              <Card
                key={`${c.continentSlug}-${c.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10",
                  "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
                  "shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
                )}
                onClick={() => nav(`/world/${c.continentSlug}/${c.slug}`)}
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
                  
                  <p className="text-xs text-muted-foreground mb-2">{c.continentName}</p>
                  
                  {deathRisk && (
                    <div className="flex items-center gap-2 mb-3 bg-red-950/40 text-red-400 p-2 rounded text-xs font-bold border border-red-500/30 animate-pulse">
                      <Skull className="w-4 h-4" />
                      <span>DEATH PENALTY RISK</span>
                    </div>
                  )}

                  {!deathRisk && corporalRisk && (
                    <div className="flex items-center gap-2 mb-3 bg-orange-950/40 text-orange-400 p-2 rounded text-xs font-bold border border-orange-500/30">
                      <Gavel className="w-4 h-4" />
                      <span>SEVERE PENALTIES / LASHES</span>
                    </div>
                  )}

                  {!deathRisk && !corporalRisk && prisonRisk && (
                    <div className="flex items-center gap-2 mb-3 bg-yellow-950/40 text-yellow-400 p-2 rounded text-xs font-bold border border-yellow-500/30">
                      <ShieldAlert className="w-4 h-4" />
                      <span>STRICT ENFORCEMENT</span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {c.description}
                  </p>
                  <Button size="sm" className="w-full">
                    View details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No countries found</h3>
          <p className="text-muted-foreground">
            Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

const ContinentIndex = ({ 
  searchQuery, 
  onSearchChange 
}: { 
  searchQuery: string; 
  onSearchChange: (q: string) => void;
}) => {
  const nav = useNavigate();

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              Global Cannabis Guide
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Travel safe. Know the laws worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORLD.map((c) => (
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
      {/* Fixed Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-3">
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
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => {
            const deathRisk = isDeathPenalty(c);
            const corporalRisk = isCorporalPunishment(c);
            const prisonRisk = isSeverePrison(c);

            return (
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
                    
                    {deathRisk && (
                        <div className="flex items-center gap-2 mb-3 bg-red-950/40 text-red-400 p-2 rounded text-xs font-bold border border-red-500/30 animate-pulse">
                            <Skull className="w-4 h-4" />
                            <span>DEATH PENALTY RISK</span>
                        </div>
                    )}

                    {!deathRisk && corporalRisk && (
                        <div className="flex items-center gap-2 mb-3 bg-orange-950/40 text-orange-400 p-2 rounded text-xs font-bold border border-orange-500/30">
                            <Gavel className="w-4 h-4" />
                            <span>SEVERE PENALTIES / LASHES</span>
                        </div>
                    )}

                    {!deathRisk && !corporalRisk && prisonRisk && (
                        <div className="flex items-center gap-2 mb-3 bg-yellow-950/40 text-yellow-400 p-2 rounded text-xs font-bold border border-yellow-500/30">
                            <ShieldAlert className="w-4 h-4" />
                            <span>STRICT ENFORCEMENT</span>
                        </div>
                    )}

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {c.description}
                    </p>
                    <Button size="sm" className="w-full">
                      View details
                    </Button>
                  </div>
                </Card>
            )
          })}
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
  
  const deathRisk = isDeathPenalty(country);
  const corporalRisk = isCorporalPunishment(country);
  const prisonRisk = isSeverePrison(country);

  return (
    <>
      {/* Fixed Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-3">
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
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-40 pb-12">
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
             <div className="flex gap-2 items-center flex-wrap">
                <Badge className={`${statusColor(country.legalStatus)} text-sm px-3 py-1`}>
                    {country.legalStatus}
                </Badge>
                
                {deathRisk && (
                    <Badge variant="destructive" className="animate-pulse bg-red-600 flex items-center gap-1">
                        <Skull className="w-3 h-3"/> DEATH PENALTY WARNING
                    </Badge>
                )}
                 {!deathRisk && corporalRisk && (
                    <Badge variant="destructive" className="bg-orange-600 flex items-center gap-1">
                        <Gavel className="w-3 h-3"/> SEVERE CORPORAL PUNISHMENT
                    </Badge>
                )}
                 {!deathRisk && !corporalRisk && prisonRisk && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3"/> STRICT ENFORCEMENT
                    </Badge>
                )}

             </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-card border border-white/10 max-w-3xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary"/> Legal Context
              </h3>
              <p className="text-muted-foreground">{country.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 max-w-3xl">
              <div className="bg-white/5 p-3 rounded border border-white/5">
                  <span className="text-xs text-muted-foreground uppercase font-bold">Possession</span>
                  <p className="text-sm">{country.possession}</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/5">
                  <span className="text-xs text-muted-foreground uppercase font-bold">Airport</span>
                  <p className="text-sm">{country.airport}</p>
              </div>
              <div className={cn("bg-white/5 p-3 rounded border border-white/5", deathRisk ? "border-red-500/30 bg-red-950/10" : "")}>
                  <span className={cn("text-xs text-muted-foreground uppercase font-bold", deathRisk ? "text-red-400" : "")}>Tourist Warning</span>
                  <p className={cn("text-sm", deathRisk ? "text-red-200 font-semibold" : "")}>{country.tourist}</p>
              </div>
          </div>
        </motion.div>

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
          <p className="text-lg text-muted-foreground">Select a city for local details</p>
        </motion.div>

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
  const deathRisk = isDeathPenalty(country);
  const corporalRisk = isCorporalPunishment(country);
  const prisonRisk = isSeverePrison(country);

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
              <div className="flex gap-2">
                 <Badge className={`${statusColor(country.legalStatus)} border-none w-fit`}>
                    {country.legalStatus}
                 </Badge>
                 
                {deathRisk && (
                    <Badge variant="destructive" className="flex items-center gap-1"><Skull className="w-3 h-3"/> Death Penalty Risk</Badge>
                )}
                 {!deathRisk && corporalRisk && (
                    <Badge variant="destructive" className="bg-orange-600 flex items-center gap-1"><Gavel className="w-3 h-3"/> Corporal Punishment</Badge>
                )}
                 {!deathRisk && !corporalRisk && prisonRisk && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Strict Enforcement</Badge>
                )}

              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {region.name}, {country.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded">
                <Siren className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Possession</p>
                  <p className="text-muted-foreground">{country.possession}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded">
                <Plane className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Airport</p>
                  <p className="text-muted-foreground">{country.airport}</p>
                </div>
              </div>
              <div className={cn("flex items-start gap-2 bg-white/5 p-3 rounded", deathRisk ? "bg-red-950/10 border border-red-500/20" : "")}>
                <Users className={cn("w-4 h-4 shrink-0 mt-0.5", deathRisk ? "text-red-400" : "text-green-400")} />
                <div>
                  <p className={cn("font-semibold", deathRisk ? "text-red-400" : "")}>Tourist Warning</p>
                  <p className={cn("text-muted-foreground", deathRisk ? "text-red-200" : "")}>{country.tourist}</p>
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

            <h2 className="text-lg font-semibold mb-2">City Quick Facts</h2>
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
  const [searchQuery, setSearchQuery] = useState("");

  const continent = useMemo(() => WORLD.find((c) => c.slug === cSlug), [cSlug]);
  const country = useMemo(() => continent?.countries.find((c) => c.slug === coSlug), [continent, coSlug]);
  const region = useMemo(() => country?.regions.find((r) => r.slug === rSlug), [country, rSlug]);
  const city = useMemo(() => region?.cities.find((c) => c.slug === ciSlug), [region, ciSlug]);

  const isSearching = searchQuery.length >= 2;
  const isAtContinentLevel = !cSlug;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Fixed Search Bar - Only at continent level */}
      {isAtContinentLevel && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all countries..."
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {(() => {
        if (isAtContinentLevel && isSearching) {
          return <CountrySearchResults query={searchQuery} onClear={() => setSearchQuery("")} />;
        }
        if (ciSlug && city && region && country) return <CityDetail city={city} region={region} country={country} />;
        if (rSlug && region && country) return <CityIndex continent={continent!} country={country} region={region} />;
        if (coSlug && country) return <RegionIndex continent={continent!} country={country} />;
        if (cSlug && continent) return <CountryIndex continent={continent} />;
        return <ContinentIndex searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
      })()}
      <Footer />
    </div>
  );
};

export default WorldGuide;
