import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Globe, MapPin, Users, Plane, Info, ArrowLeft, Zap } from "lucide-react";

/* ============================================
   TYPES
============================================ */
interface City {
  slug: string;
  name: string;
  atGlance: string[];
}

interface State {
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
  states: State[];
  image: string;
  flag: string;
  iconColor: string;
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
   IMAGE POOL
============================================ */
const imagePool = ["/dest-1.jpg", "/dest-2.jpg", "/dest-3.jpg", "/dest-4.jpg", "/dest-5.jpg", "/dest-6.jpg"];

const getRandomImage = () => imagePool[Math.floor(Math.random() * imagePool.length)];

/* ============================================
   DATA
============================================ */
const WORLD_GUIDE: Continent[] = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    description: "Progressive cannabis policies with recreational and medical options",
    countriesCount: 3,
    bgColor: "from-green-500/10 to-green-400/5",
    iconColor: "text-green-500",
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
        image: getRandomImage(),
        iconColor: "text-red-600",
        states: [
          {
            slug: "ontario",
            name: "Ontario",
            cities: [
              { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
              { slug: "ottawa", name: "Ottawa", atGlance: ["Capital city", "Government hub", "Moderate vibe"] },
            ],
          },
          {
            slug: "british-columbia",
            name: "British Columbia",
            cities: [
              { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
              { slug: "victoria", name: "Victoria", atGlance: ["Island capital", "Relaxed culture", "Beach town vibes"] },
            ],
          },
          {
            slug: "quebec",
            name: "Quebec",
            cities: [
              { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
              { slug: "quebec-city", name: "Quebec City", atGlance: ["Historic charm", "Smaller scene", "Cultural hub"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-blue-600",
        states: [
          {
            slug: "california",
            name: "California",
            cities: [
              { slug: "los-angeles", name: "Los Angeles", atGlance: ["500+ dispensaries", "Delivery available", "Tourist-friendly"] },
              { slug: "san-francisco", name: "San Francisco", atGlance: ["Tech city", "Open culture", "Premium pricing"] },
            ],
          },
          {
            slug: "colorado",
            name: "Colorado",
            cities: [
              { slug: "denver", name: "Denver", atGlance: ["Pioneer state", "Recreational since 2014", "Mountain culture"] },
              { slug: "boulder", name: "Boulder", atGlance: ["College town", "Outdoor vibes", "Health-conscious"] },
            ],
          },
          {
            slug: "new-york",
            name: "New York",
            cities: [
              { slug: "new-york-city", name: "New York City", atGlance: ["Recently legalized", "Delivery booming", "Check local zones"] },
              { slug: "buffalo", name: "Buffalo", atGlance: ["Upstate hub", "Growing scene", "Affordable prices"] },
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
        description: "Supreme Court ruled prohibition unconstitutional; private use is administrative.",
        flag: "🇲🇽",
        image: getRandomImage(),
        iconColor: "text-red-500",
        states: [
          {
            slug: "mexico-city",
            name: "Mexico City",
            cities: [
              { slug: "mexico-city-center", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Vibrant culture"] },
              { slug: "coyoacan", name: "Coyoacán", atGlance: ["Historic district", "Artsy neighborhood", "Cafe culture"] },
            ],
          },
          {
            slug: "quintana-roo",
            name: "Quintana Roo",
            cities: [
              { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Beautiful beaches"] },
              { slug: "tulum", name: "Tulum", atGlance: ["Beach town", "Tourist hub", "Beachfront ruins"] },
            ],
          },
          {
            slug: "jalisco",
            name: "Jalisco",
            cities: [
              { slug: "guadalajara", name: "Guadalajara", atGlance: ["Tech hub", "Younger crowd", "Check Airbnb rules"] },
              { slug: "puerto-vallarta", name: "Puerto Vallarta", atGlance: ["Beach resort", "Tourist friendly", "Sunset vibes"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-cyan-600",
        states: [
          {
            slug: "montevideo-dept",
            name: "Montevideo",
            cities: [
              { slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] },
              { slug: "pocitos", name: "Pocitos", atGlance: ["Upscale neighborhood", "Beach town", "Trendy dining"] },
            ],
          },
          {
            slug: "maldonado",
            name: "Maldonado",
            cities: [
              { slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale resort town", "Private circles", "Beautiful beaches"] },
              { slug: "jose-ignacio", name: "José Ignacio", atGlance: ["Luxury destination", "Artistic vibe", "Sunset village"] },
            ],
          },
          {
            slug: "colonia-dept",
            name: "Colonia",
            cities: [
              { slug: "colonia", name: "Colonia del Sacramento", atGlance: ["Historic small town", "Relaxed vibe", "Day-trip to Buenos Aires"] },
              { slug: "carmelo", name: "Carmelo", atGlance: ["Wine country", "River town", "Peaceful escape"] },
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
        flag: "🇨🇴",
        image: getRandomImage(),
        iconColor: "text-yellow-600",
        states: [
          {
            slug: "cundinamarca",
            name: "Cundinamarca",
            cities: [
              { slug: "bogota", name: "Bogotá", atGlance: ["Capital city", "Medical clinics", "Cool mountain air"] },
              { slug: "zipaquira", name: "Zipaquirá", atGlance: ["Salt cathedral", "Mountain town", "Day trip from Bogotá"] },
            ],
          },
          {
            slug: "antioquia",
            name: "Antioquia",
            cities: [
              { slug: "medellin", name: "Medellín", atGlance: ["City of innovation", "Spring-like weather", "Transformed culture"] },
              { slug: "guatape", name: "Guatapé", atGlance: ["Colorful town", "Lake activities", "Rock climbing"] },
            ],
          },
          {
            slug: "bolivar",
            name: "Bolívar",
            cities: [
              { slug: "cartagena", name: "Cartagena", atGlance: ["Caribbean coast", "Historic charm", "Tourist hub"] },
              { slug: "isla-rosario", name: "Isla de Rosario", atGlance: ["Island paradise", "Beaches", "Snorkeling"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-orange-600",
        states: [
          {
            slug: "north-holland",
            name: "North Holland",
            cities: [
              { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
              { slug: "haarlem", name: "Haarlem", atGlance: ["Small city charm", "20 shops", "Less crowded"] },
            ],
          },
          {
            slug: "south-holland",
            name: "South Holland",
            cities: [
              { slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops, less touristy", "Higher quality", "Residency checks"] },
              { slug: "the-hague", name: "The Hague", atGlance: ["Conservative feel", "Membership clubs", "Stiffer fines"] },
            ],
          },
          {
            slug: "flevoland",
            name: "Flevoland",
            cities: [
              { slug: "almere", name: "Almere", atGlance: ["Newer city", "Fewer shops", "Quieter scene"] },
              { slug: "lelystad", name: "Lelystad", atGlance: ["Regional hub", "Growing area", "Local vibes"] },
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
        description: "Legalized April 2024; cannabis social clubs launching nationwide.",
        flag: "🇩🇪",
        image: getRandomImage(),
        iconColor: "text-red-600",
        states: [
          {
            slug: "berlin",
            name: "Berlin",
            cities: [
              { slug: "berlin-center", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
              { slug: "potsdam", name: "Potsdam", atGlance: ["Historic palaces", "Artistic vibe", "Day trip destination"] },
            ],
          },
          {
            slug: "hamburg",
            name: "Hamburg",
            cities: [
              { slug: "hamburg-center", name: "Hamburg", atGlance: ["St. Pauli most open", "Harbour lounges", "Use trams, not cars"] },
              { slug: "altona", name: "Altona", atGlance: ["Trendy district", "Alternative culture", "Great restaurants"] },
            ],
          },
          {
            slug: "bavaria",
            name: "Bavaria",
            cities: [
              { slug: "munich", name: "Munich", atGlance: ["Conservative but OK", "English widely spoken", "Beer gardens = no weed"] },
              { slug: "nuremberg", name: "Nuremberg", atGlance: ["Historic city", "Growing scene", "Affordable living"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-yellow-500",
        states: [
          {
            slug: "catalonia",
            name: "Catalonia",
            cities: [
              { slug: "barcelona", name: "Barcelona", atGlance: ["Cannabis clubs abundant", "Beach city vibes", "Membership clubs"] },
              { slug: "girona", name: "Girona", atGlance: ["Medieval town", "Quiet vibes", "Costa Brava nearby"] },
            ],
          },
          {
            slug: "madrid-region",
            name: "Madrid",
            cities: [
              { slug: "madrid", name: "Madrid", atGlance: ["Capital hub", "Active community", "City exploration"] },
              { slug: "toledo", name: "Toledo", atGlance: ["Historic city", "Art center", "Day trip"] },
            ],
          },
          {
            slug: "valencia-region",
            name: "Valencia",
            cities: [
              { slug: "valencia", name: "Valencia", atGlance: ["Coastal charm", "Relaxed atmosphere", "Paella & culture"] },
              { slug: "benidorm", name: "Benidorm", atGlance: ["Beach resort", "Vibrant nightlife", "Tourist friendly"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-green-600",
        states: [
          {
            slug: "lisbon-region",
            name: "Lisbon",
            cities: [
              { slug: "lisbon", name: "Lisbon", atGlance: ["Capital vibrancy", "Coastal beauty", "Laid-back culture"] },
              { slug: "cascais", name: "Cascais", atGlance: ["Beach town", "Cliffside views", "Relaxed vibe"] },
            ],
          },
          {
            slug: "norte",
            name: "Norte",
            cities: [
              { slug: "porto", name: "Porto", atGlance: ["Wine country", "Riverside charm", "Local community"] },
              { slug: "guarda", name: "Guarda", atGlance: ["Mountain town", "Historic center", "Peaceful"] },
            ],
          },
          {
            slug: "algarve-region",
            name: "Algarve",
            cities: [
              { slug: "algarve", name: "Algarve", atGlance: ["Beach destination", "Tourist-friendly", "Warm climate"] },
              { slug: "tavira", name: "Tavira", atGlance: ["Clifftop town", "Golden cliffs", "Photography hub"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-blue-500",
        states: [
          {
            slug: "bangkok-region",
            name: "Bangkok",
            cities: [
              { slug: "bangkok", name: "Bangkok", atGlance: ["Med clinics with script", "Bustling capital", "Discreet only"] },
              { slug: "thonburi", name: "Thonburi", atGlance: ["Old Bangkok vibes", "Canal tours", "Local markets"] },
            ],
          },
          {
            slug: "phuket-region",
            name: "Phuket",
            cities: [
              { slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach paradise", "Consider weed-free holiday"] },
              { slug: "patong", name: "Patong", atGlance: ["Beach resort", "Nightlife hub", "Tourist area"] },
            ],
          },
          {
            slug: "chiang-mai-region",
            name: "Chiang Mai",
            cities: [
              { slug: "chiang-mai", name: "Chiang Mai", atGlance: ["Conservative north", "Traditional meds", "Docs essential"] },
              { slug: "pai", name: "Pai", atGlance: ["Mountain town", "Artistic community", "Hippie vibe"] },
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
        flag: "🇰🇷",
        image: getRandomImage(),
        iconColor: "text-red-500",
        states: [
          {
            slug: "seoul-region",
            name: "Seoul",
            cities: [
              { slug: "seoul", name: "Seoul", atGlance: ["Capital city", "Tech-forward", "Strict enforcement"] },
              { slug: "gangnam", name: "Gangnam", atGlance: ["Upscale district", "Modern vibe", "Shopping hub"] },
            ],
          },
          {
            slug: "busan-region",
            name: "Busan",
            cities: [
              { slug: "busan", name: "Busan", atGlance: ["Coastal port", "Relaxed vibe", "Beautiful beaches"] },
              { slug: "haeundae", name: "Haeundae", atGlance: ["Beach district", "Summer resort", "Water sports"] },
            ],
          },
          {
            slug: "incheon-region",
            name: "Incheon",
            cities: [
              { slug: "incheon", name: "Incheon", atGlance: ["Gateway city", "Modern infrastructure", "Medical access"] },
              { slug: "songdo", name: "Songdo", atGlance: ["New city", "International business", "Digital hub"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-emerald-600",
        states: [
          {
            slug: "western-cape",
            name: "Western Cape",
            cities: [
              { slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] },
              { slug: "stellenbosch", name: "Stellenbosch", atGlance: ["Wine region", "University town", "Relaxed vibe"] },
            ],
          },
          {
            slug: "gauteng",
            name: "Gauteng",
            cities: [
              { slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city", "Security-conscious", "Safari hub"] },
              { slug: "pretoria", name: "Pretoria", atGlance: ["Admin capital", "Government hub", "Parks & gardens"] },
            ],
          },
          {
            slug: "kwazulu-natal",
            name: "KwaZulu-Natal",
            cities: [
              { slug: "durban", name: "Durban", atGlance: ["Beach city", "Indian Ocean vibes", "Respect traditional areas"] },
              { slug: "umhlanga", name: "Umhlanga", atGlance: ["Beach resort", "Luxury destination", "Upscale dining"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-yellow-600",
        states: [
          {
            slug: "kingston-parish",
            name: "Kingston",
            cities: [
              { slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] },
              { slug: "port-royal", name: "Port Royal", atGlance: ["Historic pirate town", "Beach bar vibes", "Island escape"] },
            ],
          },
          {
            slug: "st-james",
            name: "Saint James",
            cities: [
              { slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] },
              { slug: "falmouth", name: "Falmouth", atGlance: ["Historic port", "Colonial architecture", "Cruise ships"] },
            ],
          },
          {
            slug: "westmoreland",
            name: "Westmoreland",
            cities: [
              { slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Small-town friendly"] },
              { slug: "lucea", name: "Lucea", atGlance: ["Coastal town", "Local beaches", "Laid-back vibe"] },
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
        flag: "🇧🇧",
        image: getRandomImage(),
        iconColor: "text-blue-500",
        states: [
          {
            slug: "saint-michael",
            name: "Saint Michael",
            cities: [
              { slug: "bridgetown", name: "Bridgetown", atGlance: ["Capital city", "Harbor charm", "Local vibe"] },
              { slug: "garrison", name: "Garrison", atGlance: ["Historic district", "UNESCO site", "Museums"] },
            ],
          },
          {
            slug: "saint-james",
            name: "Saint James",
            cities: [
              { slug: "carlisle-bay", name: "Carlisle Bay", atGlance: ["Beach resort area", "Water activities", "Tourist hotspot"] },
              { slug: "holetown", name: "Holetown", atGlance: ["West coast", "Upscale shopping", "Nightlife"] },
            ],
          },
          {
            slug: "saint-joseph",
            name: "Saint Joseph",
            cities: [
              { slug: "bathsheba", name: "Bathsheba", atGlance: ["Atlantic coast", "Rugged beauty", "Local community"] },
              { slug: "cattlewash", name: "Cattlewash", atGlance: ["Quiet beach", "Fishing village", "Authentic vibe"] },
            ],
          },
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
        image: getRandomImage(),
        iconColor: "text-green-500",
        states: [
          {
            slug: "new-south-wales",
            name: "New South Wales",
            cities: [
              { slug: "sydney", name: "Sydney", atGlance: ["Major city", "Medical access", "Beautiful harbor"] },
              { slug: "newcastle", name: "Newcastle", atGlance: ["Beach city", "Growing scene", "Nearby vineyards"] },
            ],
          },
          {
            slug: "victoria",
            name: "Victoria",
            cities: [
              { slug: "melbourne", name: "Melbourne", atGlance: ["Cultural hub", "Progressive city", "Coffee culture"] },
              { slug: "geelong", name: "Geelong", atGlance: ["Beach town", "Surf culture", "Art scene"] },
            ],
          },
          {
            slug: "australian-capital-territory",
            name: "ACT",
            cities: [
              { slug: "canberra", name: "Canberra", atGlance: ["Capital decriminalized", "Political hub", "More relaxed"] },
              { slug: "queanbeyan", name: "Queanbeyan", atGlance: ["Neighboring town", "Mountain views", "Gateway to mountains"] },
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
        flag: "🇳🇿",
        image: getRandomImage(),
        iconColor: "text-pink-600",
        states: [
          {
            slug: "auckland-region",
            name: "Auckland",
            cities: [
              { slug: "auckland", name: "Auckland", atGlance: ["Largest city", "Medical access", "Vibrant culture"] },
              { slug: "waitakere", name: "Waitakere", atGlance: ["Volcano region", "City beaches", "Hiking trails"] },
            ],
          },
          {
            slug: "wellington-region",
            name: "Wellington",
            cities: [
              { slug: "wellington", name: "Wellington", atGlance: ["Capital city", "Progressive politics", "Creative scene"] },
              { slug: "hutt-valley", name: "Hutt Valley", atGlance: ["Urban sprawl", "Suburban living", "Valley town"] },
            ],
          },
          {
            slug: "canterbury",
            name: "Canterbury",
            cities: [
              { slug: "christchurch", name: "Christchurch", atGlance: ["South Island", "Outdoor adventure", "Rebuild spirit"] },
              { slug: "oamaru", name: "Oamaru", atGlance: ["Victorian town", "Penguin spotting", "Coastal charm"] },
            ],
          },
        ],
      },
    ],
  },
];

/* ============================================
   HELPERS
============================================ */
const getStatusColor = (status) => {
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

const getStatusIcon = (status) => {
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
   VIEW COMPONENTS
============================================ */

// CONTINENTS VIEW
const ContinentsView = ({ continents, onSelectContinent, searchQuery }) => {
  const filteredContinents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return continents;

    return continents.map((continent) => ({
      ...continent,
      countries: continent.countries.filter(
        (country) =>
          country.name.toLowerCase().includes(q) ||
          country.description.toLowerCase().includes(q) ||
          country.states.some((state) =>
            state.cities.some((city) => city.name.toLowerCase().includes(q))
          )
      ),
    })).filter((c) => c.countries.length > 0);
  }, [searchQuery, continents]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {filteredContinents.map((continent) => (
        <motion.button
          key={continent.id}
          onClick={() => onSelectContinent(continent)}
          className={`w-full text-left bg-gradient-to-r ${continent.bgColor} hover:from-green-500/15 hover:to-green-400/8 border border-green-500/20 hover:border-green-500/40 rounded-2xl p-4 sm:p-6 transition-all group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl sm:text-4xl">{continent.emoji}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{continent.name}</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">{continent.description}</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500">
                <Zap className="w-4 h-4" />
                <span>{continent.countries.length} countries</span>
              </div>
            </div>
            <ChevronDown className="w-6 h-6 shrink-0 transition-transform group-hover:scale-110 text-green-500" />
          </div>
        </motion.button>
      ))}

      {filteredContinents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// COUNTRIES VIEW
const CountriesView = ({ continent, onSelectCountry, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-500 hover:text-green-400 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Continents
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{continent.emoji}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{continent.name}</h2>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">{continent.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {continent.countries.map((country) => (
          <motion.button
            key={country.slug}
            onClick={() => onSelectCountry(country)}
            className="text-left bg-card border border-green-500/20 hover:border-green-500/50 rounded-xl p-4 sm:p-5 transition-all group hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{country.flag}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">{country.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">{country.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(country.legalStatus)}`}>
                    {getStatusIcon(country.legalStatus)} {country.legalStatus}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-green-500 shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// COUNTRY DETAIL VIEW
const CountryDetailView = ({ country, onSelectState, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-500 hover:text-green-400 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Countries
      </button>

      {/* Country Header with Image */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-green-500/20 to-green-400/5 rounded-2xl overflow-hidden border border-green-500/20">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Globe className="w-32 h-32 sm:w-40 sm:h-40 text-green-600" />
        </div>
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl">{country.flag}</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{country.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${getStatusColor(country.legalStatus)} mt-2`}>
                {getStatusIcon(country.legalStatus)} {country.legalStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Country Description */}
      <p className="text-sm sm:text-base text-muted-foreground bg-green-500/10 rounded-xl p-4">{country.description}</p>

      {/* Quick Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-green-500/10 p-3 sm:p-4 rounded-lg">
          <Users className="w-5 h-5 text-green-500 shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground text-sm">Possession</p>
            <p className="text-sm text-muted-foreground">{country.possession}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-green-500/10 p-3 sm:p-4 rounded-lg">
          <Plane className="w-5 h-5 text-green-500 shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground text-sm">Airport</p>
            <p className="text-sm text-muted-foreground">{country.airport}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-green-500/10 p-3 sm:p-4 rounded-lg">
          <Info className="w-5 h-5 text-green-500 shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground text-sm">Traveler Tip</p>
            <p className="text-sm text-muted-foreground">{country.tourist}</p>
          </div>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Popular States/Regions ({country.states.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {country.states.map((state) => (
            <motion.button
              key={state.slug}
              onClick={() => onSelectState(state)}
              className="text-left bg-card border border-green-500/20 hover:border-green-500/50 rounded-xl p-4 sm:p-5 transition-all group hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <h4 className="font-bold text-foreground">{state.name}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{state.cities.length} popular cities</p>
                </div>
                <ChevronDown className="w-5 h-5 text-green-500 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// STATE DETAIL VIEW
const StateDetailView = ({ country, state, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-500 hover:text-green-400 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to {country.name}
      </button>

      {/* State Header */}
      <div className="relative h-32 sm:h-40 bg-gradient-to-br from-green-500/20 to-green-400/5 rounded-2xl overflow-hidden border border-green-500/20">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <MapPin className="w-32 h-32 sm:w-40 sm:h-40 text-green-600" />
        </div>
        <img
          src={country.image}
          alt={state.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{country.flag}</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{state.name}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{country.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cities */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Popular Cities</h3>
        <div className="space-y-3">
          {state.cities.map((city) => (
            <motion.div
              key={city.slug}
              className="bg-card border border-green-500/20 hover:border-green-500/50 rounded-xl p-4 sm:p-5 transition-all group hover:shadow-lg hover:bg-green-500/5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground mb-3 text-base sm:text-lg">{city.name}</h4>
                  <ul className="space-y-1.5">
                    {city.atGlance.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================
   MAIN COMPONENT
============================================ */
const WorldGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("continents");
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleSelectContinent = (continent) => {
    setSelectedContinent(continent);
    setCurrentView("countries");
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setCurrentView("country-detail");
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setCurrentView("state-detail");
  };

  const handleBack = () => {
    if (currentView === "countries") {
      setCurrentView("continents");
      setSelectedContinent(null);
    } else if (currentView === "country-detail") {
      setCurrentView("countries");
      setSelectedCountry(null);
    } else if (currentView === "state-detail") {
      setCurrentView("country-detail");
      setSelectedState(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HERO & SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-center">
              Global Cannabis Guide
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-center">
              Explore cannabis laws by continent, country, state, and city worldwide
            </p>

            {/* SEARCH BAR */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-green-500/10 border border-green-500/20 rounded-xl focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* VIEW CONTENT */}
          <AnimatePresence mode="wait">
            {currentView === "continents" && (
              <ContinentsView
                key="continents"
                continents={WORLD_GUIDE}
                onSelectContinent={handleSelectContinent}
                searchQuery={searchQuery}
              />
            )}
            {currentView === "countries" && selectedContinent && (
              <CountriesView
                key="countries"
                continent={selectedContinent}
                onSelectCountry={handleSelectCountry}
                onBack={handleBack}
              />
            )}
            {currentView === "country-detail" && selectedCountry && (
              <CountryDetailView
                key="country-detail"
                country={selectedCountry}
                onSelectState={handleSelectState}
                onBack={handleBack}
              />
            )}
            {currentView === "state-detail" && selectedState && (
              <StateDetailView
                key="state-detail"
                country={selectedCountry}
                state={selectedState}
                onBack={handleBack}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WorldGuide;
