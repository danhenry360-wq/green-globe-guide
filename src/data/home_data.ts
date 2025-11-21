// src/data/home_data.ts
import { Destination, StatItem, FeatureItem, Article } from "@/types/data";

// Helper to map status to color
const getStatusColor = (status: Destination['legalStatus']): Destination['statusColor'] => {
  switch (status) {
    case 'Recreational':
      return 'bg-green-500/90';
    case 'Medical':
      return 'bg-amber-700/90';
    case 'Decriminalized':
      return 'bg-amber-500/90';
    case 'Illegal':
      return 'bg-red-700/90';
    default:
      return 'bg-amber-500/90';
  }
};

// --- FEATURED DESTINATIONS ---
export const FEATURED_DESTINATIONS: Destination[] = [
  { 
    id: 1,
    name: "California", 
    slug: "california",
    country: "USA", 
    continent: "North America",
    imagePath: "/dest-1.jpg",
    imageAlt: "California cannabis dispensaries and 420-friendly destinations",
    legalStatus: "Recreational",
    statusColor: getStatusColor("Recreational"),
    link: "/usa/california" 
  },
  { 
    id: 2,
    name: "Colorado", 
    slug: "colorado",
    country: "USA", 
    continent: "North America",
    imagePath: "/dest-2.jpg",
    imageAlt: "Denver Colorado cannabis travel guide and legal status",
    legalStatus: "Recreational",
    statusColor: getStatusColor("Recreational"),
    link: "/usa/colorado" 
  },
  { 
    id: 3,
    name: "Netherlands", 
    slug: "netherlands",
    country: "Europe", 
    continent: "Europe",
    imagePath: "/dest-3.jpg",
    imageAlt: "Amsterdam coffee shops and Netherlands cannabis culture",
    legalStatus: "Decriminalized",
    statusColor: getStatusColor("Decriminalized"),
    link: "/world" 
  },
  { 
    id: 4,
    name: "Canada", 
    slug: "canada",
    country: "North America", 
    continent: "North America",
    imagePath: "/dest-4.jpg",
    imageAlt: "Canada legal cannabis travel and dispensary locations",
    legalStatus: "Recreational",
    statusColor: getStatusColor("Recreational"),
    link: "/world" 
  },
  { 
    id: 5,
    name: "Uruguay", 
    slug: "uruguay",
    country: "South America", 
    continent: "South America",
    imagePath: "/dest-5.jpg",
    imageAlt: "Uruguay pioneering cannabis legalization travel guide",
    legalStatus: "Recreational",
    statusColor: getStatusColor("Recreational"),
    link: "/world" 
  },
  { 
    id: 6,
    name: "Thailand", 
    slug: "thailand",
    country: "Asia", 
    continent: "Asia",
    imagePath: "/dest-6.jpg",
    imageAlt: "Thailand medical cannabis tourism and regulations",
    legalStatus: "Medical",
    statusColor: getStatusColor("Medical"),
    link: "/world" 
  },
];

// --- STATISTICS DATA ---
export const STATS_DATA: StatItem[] = [
  { icon: "Globe2", label: "Countries Covered", count: 120, suffix: "+" },
  { icon: "MapPin", label: "Verified Destinations", count: 500, suffix: "+" },
  { icon: "Building2", label: "420-Friendly Hotels", count: 300, suffix: "+" },
  { icon: "Shield", label: "Data Accuracy", count: 94, suffix: "%" },
];

// --- FEATURES DATA ---
export const FEATURES_DATA: FeatureItem[] = [
  { 
    icon: "Shield", 
    title: "Real-Time Legal Status", 
    desc: "Stay compliant with verified, up-to-date cannabis laws for every destination worldwide.",
    link: "/usa" 
  },
  { 
    icon: "Building2", 
    title: "420-Friendly Hotels", 
    desc: "Discover and book cannabis-welcoming accommodations that match your travel style.",
    link: "/hotels" 
  },
  { 
    icon: "Plane", 
    title: "Travel Regulations", 
    desc: "Essential safety information on flying with cannabis and airport security compliance.",
    link: "/usa" 
  },
  { 
    icon: "Map", 
    title: "Interactive Global Map", 
    desc: "Visualize cannabis legality worldwide with our advanced filterable map.",
    link: "/world" 
  },
];

// --- BLOG DATA ---
export const BLOG_DATA: Article[] = [
  { 
    id: 101,
    title: "Amsterdam Coffee Shops Guide 2025", 
    summary: "Discover the best cannabis coffee shops, local etiquette, and legal tips for an authentic Amsterdam experience.",
    imagePath: "/blog-amsterdam.jpg",
    imageAlt: "Amsterdam coffee shop interior and cannabis selection guide",
    link: "/guides/amsterdam" 
  },
  { 
    id: 102,
    title: "California Cannabis Travel Handbook", 
    summary: "Complete guide to California dispensaries, regulations, and 420-friendly activities in major cities.",
    imagePath: "/blog-california.jpg",
    imageAlt: "California dispensary exterior and cannabis products display",
    link: "/guides/california" 
  },
  { 
    id: 103,
    title: "Uruguay: The First Legal Cannabis Nation", 
    summary: "Deep dive into Uruguay's pioneering legalization model and what travelers need to know.",
    imagePath: "/blog-uruguay.jpg",
    imageAlt: "Montevideo Uruguay urban landscape and cannabis culture",
    link: "/guides/uruguay" 
  },
];
