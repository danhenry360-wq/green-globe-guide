// src/data/world_data.ts

interface City {
  slug: string;
  name: string;
  atGlance: string[];
}

interface Country {
  slug: string;
  name: string;
  region: string;
  legalStatus: "Recreational" | "Medical" | "Decriminalized";
  possession: string;
  airport: string;
  tourist: string;
  description: string;
  cities: City[];
  image: string;
}

export const COUNTRIES: Country[] = [
  // === NORTH AMERICA ===
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    legalStatus: "Recreational",
    possession: "30 g public / unlimited home",
    airport: "30 g domestic only",
    tourist: "Gov stores only; ID required",
    description: "First G7 nation to legalise recreational cannabis nationwide.",
    cities: [
      { slug: "toronto", name: "Toronto", atGlance: ["200+ legal stores", "Hotels may ban smoking", "Designated lounges exist"] },
      { slug: "vancouver", name: "Vancouver", atGlance: ["Culture widely accepted", "Some stores have lounges", "Parks = no smoking"] },
      { slug: "montreal", name: "Montreal", atGlance: ["Legal age 21", "Gov SQDC outlets", "French helpful"] },
    ],
    image: "/dest-4.jpg",
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "North America",
    legalStatus: "Decriminalized",
    possession: "Small amounts tolerated",
    airport: "Zero tolerance",
    tourist: "Private use low priority; avoid public",
    description: "Supreme Court ruled prohibition unconstitutional; possession is administrative.",
    cities: [
      { slug: "mexico-city", name: "Mexico City", atGlance: ["Capital vibe relaxed", "Private use tolerated", "Great street food"] },
      { slug: "cancun", name: "Cancun", atGlance: ["Resort security tight", "Pool areas ban smoking", "Enjoy beaches"] },
      { slug: "guadalajara", name: "Guadalajara", atGlance: ["Tech hub, younger crowd", "More relaxed than coast", "Check Airbnb rules"] },
    ],
    image: "/dest-4.jpg",
  },

  // === EUROPE ===
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
    legalStatus: "Decriminalized",
    possession: "5 g tolerated",
    airport: "Do not transport",
    tourist: "Coffee-shop weed is potent—start small",
    description: "Sale tolerated under strict conditions; production remains illegal.",
    cities: [
      { slug: "amsterdam", name: "Amsterdam", atGlance: ["150+ coffee shops", "No tobacco inside", "Avoid street dealers"] },
      { slug: "rotterdam", name: "Rotterdam", atGlance: ["30 shops, less touristy", "Higher quality", "Residency checks"] },
      { slug: "the-hague", name: "The Hague", atGlance: ["Conservative feel", "Membership clubs", "Stiffer fines"] },
    ],
    image: "/dest-3.jpg",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    legalStatus: "Recreational",
    possession: "25 g public / 50 g home",
    airport: "Domestic OK within limit",
    tourist: "Join social club for access",
    description: "Legalised April 2024; cannabis social clubs launching nationwide.",
    cities: [
      { slug: "berlin", name: "Berlin", atGlance: ["Club culture capital", "No smoking near kids", "Low-THC starters"] },
      { slug: "hamburg", name: "Hamburg", atGlance: ["St. Pauli most open", "Harbour lounges discreet", "Use trams, don’t drive"] },
      { slug: "munich", name: "Munich", atGlance: ["Conservative but OK", "English widely spoken", "Beer gardens = no weed"] },
    ],
    image: "/dest-1.jpg",
  },

  // === SOUTH AMERICA ===
  {
    slug: "uruguay",
    name: "Uruguay",
    region: "South America",
    legalStatus: "Recreational",
    possession: "40 g monthly (residents)",
    airport: "Transport prohibited",
    tourist: "Tourists cannot purchase—locals only",
    description: "World’s first full legalisation; pharmacy sales & clubs for residents.",
    cities: [
      { slug: "montevideo", name: "Montevideo", atGlance: ["Gov registration needed", "Quiet culture", "Mate & beach vibes"] },
      { slug: "punta-del-este", name: "Punta del Este", atGlance: ["Upscale = enforcement", "Private circles", "Enjoy beaches"] },
      { slug: "colonia", name: "Colonia", atGlance: ["Historic small town", "Use noticeable", "Day-trip to Buenos Aires"] },
    ],
    image: "/dest-5.jpg",
  },

  // === ASIA ===
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    legalStatus: "Medical",
    possession: "Prescription required",
    airport: "Strictly prohibited",
    tourist: "Medical clinics need Thai doctor letter",
    description: "Decriminalised 2022, medical-only 2024. Recreational use illegal.",
    cities: [
      { slug: "bangkok", name: "Bangkok", atGlance: ["Med clinics w/ script", "Cafés closed", "Discreet only"] },
      { slug: "phuket", name: "Phuket", atGlance: ["Tourist enforcement high", "Beach parties = no weed", "Consider weed-free holiday"] },
      { slug: "chiang-mai", name: "Chiang Mai", atGlance: ["Conservative north", "Traditional meds", "Docs essential"] },
    ],
    image: "/dest-6.jpg",
  },

  // === AFRICA ===
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Africa",
    legalStatus: "Decriminalized",
    possession: "Private use & grow OK",
    airport: "Transport prohibited",
    tourist: "Private homes only—enjoy safari & wine",
    description: "Private use & cultivation legal; public use prohibited, no commercial sales.",
    cities: [
      { slug: "cape-town", name: "Cape Town", atGlance: ["Private homes only", "Wine over weed", "Stunning nature"] },
      { slug: "johannesburg", name: "Johannesburg", atGlance: ["Business city, low profile", "Security tight", "Safari hub"] },
      { slug: "durban", name: "Durban", atGlance: ["Beach rules strict", "Indian Ocean vibes", "Respect traditional areas"] },
    ],
    image: "/dest-5.jpg",
  },

  // === CARIBBEAN ===
  {
    slug: "jamaica",
    name: "Jamaica",
    region: "Caribbean",
    legalStatus: "Decriminalized",
    possession: "Small amounts tolerated",
    airport: "Do not transport",
    tourist: "Enjoy reggae & beaches; herb is secondary",
    description: "Decriminalised 2015; medical & Rasta sacramental use legal. Public use frowned upon.",
    cities: [
      { slug: "kingston", name: "Kingston", atGlance: ["Reggae birthplace", "Cultural herb tours", "Downtown discretion"] },
      { slug: "montego-bay", name: "Montego Bay", atGlance: ["Resort security high", "Balconies OK", "Tourist police visible"] },
      { slug: "negril", name: "Negril", atGlance: ["Seven-mile beach", "Sunset cliffs", "Small-town friendly"] },
    ],
    image: "/dest-6.jpg",
  },
];
