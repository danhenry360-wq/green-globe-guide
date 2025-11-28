import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass,
  ArrowRight, ChevronDown, Flame, Stethoscope, Sparkles, CheckCircle,
  AlertCircle,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";
import MapLegend from "@/components/MapLegend";
import heroImage from "@/assets/hero-cannabis-travel.jpg";

/* ----------  TYPES  ---------- */
interface Destination {
  name: string;
  status: string;
  country: string;
  image: string;
  imageAlt: string;
  color: string;
  link: string;
}

interface StatItem {
  icon: React.ElementType;
  label: string;
  count: number;
  suffix: string;
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  link: string;
}

interface BlogItem {
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  link: string;
}

/* ----------  ANIMATION VARIANTS  ---------- */
const FADE_IN: Variants = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
const STAGGER: Variants = { animate: { transition: { staggerChildren: 0.15 } } };

/* ----------  STATIC DATA  ---------- */
const FEATURED_DESTINATIONS: Destination[] = [
  { 
    name: "California", 
    status: "Recreational", 
    country: "USA", 
    image: "/dest-california-beach.jpg",
    imageAlt: "California beach coastline with waves and mountains in background",
    color: "bg-green-500/90", 
    link: "/usa/california" 
  },
  { 
    name: "Colorado", 
    status: "Recreational", 
    country: "USA", 
    image: "/dest-2.jpg",
    imageAlt: "Denver Colorado cannabis travel guide and legal status",
    color: "bg-green-500/90", 
    link: "/usa/colorado" 
  },
  { 
    name: "Netherlands", 
    status: "Decriminalized", 
    country: "Europe", 
    image: "/dest-3.jpg",
    imageAlt: "Amsterdam coffee shops and Netherlands cannabis culture",
    color: "bg-amber-500/90", 
    link: "/world/europe/netherlands" 
  },
  { 
    name: "Canada", 
    status: "Recreational", 
    country: "North America", 
    image: "/dest-canada-toronto.jpg",
    imageAlt: "Toronto skyline with Canadian flag and skyscrapers",
    color: "bg-green-500/90", 
    link: "/world/north-america/canada" 
  },
  { 
    name: "Uruguay", 
    status: "Recreational", 
    country: "South America", 
    image: "/dest-uruguay.jpg",
    imageAlt: "Uruguay pioneering cannabis legalization travel guide",
    color: "bg-green-500/90", 
    link: "/world/south-america/uruguay" 
  },
  { 
    name: "Thailand", 
    status: "Medical", 
    country: "Asia", 
    image: "/dest-6.jpg",
    imageAlt: "Thailand medical cannabis tourism and regulations",
    color: "bg-amber-700/90", 
    link: "/world/asia/thailand" 
  },
];

const STATS_DATA: StatItem[] = [
  { icon: Globe2, label: "Countries Covered", count: 120, suffix: "+" },
  { icon: MapPin, label: "Verified Destinations", count: 500, suffix: "+" },
  { icon: Building2, label: "420-Friendly Hotels", count: 300, suffix: "+" },
  { icon: Shield, label: "Data Accuracy", count: 94, suffix: "%" },
];

const FEATURES_DATA: FeatureItem[] = [
  { 
    icon: Shield, 
    title: "Real-Time Legal Status", 
    desc: "Stay compliant with verified, up-to-date cannabis laws for every destination worldwide.",
    link: "/usa" 
  },
  { 
    icon: Building2, 
    title: "420-Friendly Hotels", 
    desc: "Discover and book cannabis-welcoming accommodations that match your travel style.",
    link: "/hotels" 
  },
  { 
    icon: Plane, 
    title: "Travel Regulations", 
    desc: "Essential safety information on flying with cannabis and airport security compliance.",
    link: "/usa" 
  },
  { 
    icon: Map, 
    title: "Interactive Global Map", 
    desc: "Visualize cannabis legality worldwide with our advanced filterable map.",
    link: "/world" 
  },
];

const BLOG_DATA: BlogItem[] = [
  { 
    title: "Amsterdam Coffee Shops Guide 2025", 
    summary: "Discover the best cannabis coffee shops, local etiquette, and legal tips for an authentic Amsterdam experience.",
    image: "/blog-amsterdam.jpg",
    imageAlt: "Amsterdam coffee shop interior and cannabis selection guide",
    link: "/guides/amsterdam" 
  },
  { 
    title: "California Cannabis Travel Handbook", 
    summary: "Complete guide to California dispensaries, regulations, and 420-friendly activities in major cities.",
    image: "/blog-california.jpg",
    imageAlt: "California dispensary exterior and cannabis products display",
    link: "/guides/california" 
  },
  { 
    title: "Uruguay: The First Legal Cannabis Nation", 
    summary: "Deep dive into Uruguay's pioneering legalization model and what travelers need to know.",
    image: "/blog-uruguay.jpg",
    imageAlt: "Montevideo Uruguay urban landscape and cannabis culture",
    link: "/guides/uruguay" 
  },
];

/* ----------  SEO META TAGS COMPONENT  ---------- */
const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org ",
  "@type": "WebApplication",
  name: "BudQuest",
  description: "Global cannabis travel guide with legal status, 420-friendly hotels, and travel regulations",
  url: "https://budquest.com ",
  applicationCategory: "TravelApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};

const SEOHead = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(HOME_STRUCTURED_DATA);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

/* ----------  MOBILE CONTINENT MAP COMPONENT  ---------- */
const MobileContinentMap = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const navigate = useNavigate();

  const continentDisplay = [
    { name: "Americas", emoji: "🌎", count: 8, slug: "north-america" },
    { name: "Europe", emoji: "🇪🇺", count: 8, slug: "europe" },
    { name: "Asia", emoji: "🌏", count: 4, slug: "asia" },
    { name: "Africa", emoji: "🌍", count: 4, slug: "africa" },
    { name: "Oceania", emoji: "🏝️", count: 2, slug: "oceania" },
  ];

  const countriesByContinent: Record<string, { name: string; status: string; description: string; slug: string }[]> = {
    "north-america": [
      { name: "United States", status: "Recreational", description: "Varies by state - 24 states recreational, 38 medical", slug: "united-states" },
      { name: "Canada", status: "Recreational", description: "Fully legal nationwide since 2018", slug: "canada" },
      { name: "Mexico", status: "Decriminalized", description: "Decriminalized for personal use", slug: "mexico" },
      { name: "Uruguay", status: "Recreational", description: "First country to fully legalize in 2013", slug: "uruguay" },
      { name: "Jamaica", status: "Decriminalized", description: "Decriminalized, medical and religious use legal", slug: "jamaica" },
    ],
    "europe": [
      { name: "Netherlands", status: "Decriminalized", description: "Tolerated in coffee shops", slug: "netherlands" },
      { name: "Germany", status: "Recreational", description: "Legalized for recreational use in 2024", slug: "germany" },
      { name: "Spain", status: "Decriminalized", description: "Private clubs legal", slug: "spain" },
      { name: "Portugal", status: "Decriminalized", description: "Decriminalized all drugs in 2001", slug: "portugal" },
      { name: "Switzerland", status: "Medical", description: "Medical use legal, low-THC available", slug: "switzerland" },
    ],
    "asia": [
      { name: "Thailand", status: "Recreational", description: "Legalized in 2022", slug: "thailand" },
      { name: "Japan", status: "Illegal", description: "Strict prohibition", slug: "japan" },
      { name: "South Korea", status: "Medical", description: "Medical only", slug: "south-korea" },
      { name: "India", status: "Decriminalized", description: "Varies by state", slug: "india" },
    ],
    "africa": [
      { name: "South Africa", status: "Decriminalized", description: "Private use legal", slug: "south-africa" },
      { name: "Morocco", status: "Illegal", description: "Traditional hash culture", slug: "morocco" },
      { name: "Lesotho", status: "Medical", description: "First African medical license", slug: "lesotho" },
      { name: "Malawi", status: "Medical", description: "Medical cultivation legal", slug: "malawi" },
    ],
    "oceania": [
      { name: "Australia", status: "Medical", description: "Medical nationwide, ACT recreational", slug: "australia" },
      { name: "New Zealand", status: "Medical", description: "Medical legal since 2020", slug: "new-zealand" },
    ],
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Recreational": return "bg-green-500";
      case "Medical": return "bg-amber-500";
      case "Decriminalized": return "bg-blue-500";
      default: return "bg-red-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recreational": return "text-green-400 border-green-500/50";
      case "Medical": return "text-amber-400 border-amber-500/50";
      case "Decriminalized": return "text-blue-400 border-blue-500/50";
      default: return "text-red-400 border-red-500/50";
    }
  };

  // Country list view when a continent is selected
  if (selectedContinent) {
    const continent = continentDisplay.find(c => c.slug === selectedContinent);
    const countries = countriesByContinent[selectedContinent] || [];

    return (
      <div className="block md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{continent?.emoji}</span>
            <h3 className="text-xl font-bold text-foreground">{continent?.name}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedContinent(null)}
              className="ml-auto border-border/50 hover:border-accent/50 text-foreground"
            >
              ← Back
            </Button>
          </div>

          {/* Country List */}
          <div className="space-y-3">
            {countries.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => navigate(`/world/${selectedContinent}/${country.slug}`)}
                className="p-4 bg-card/60 rounded-xl border border-border/50 hover:border-accent/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getStatusDot(country.status)}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-foreground">{country.name}</span>
                      <Badge className={`text-xs border ${getStatusColor(country.status)} bg-transparent`}>
                        {country.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{country.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Main continent grid view
  return (
    <div className="block md:hidden">
      <motion.div variants={FADE_IN} className="space-y-4">
        {/* 2x2 Continent Grid */}
        <div className="grid grid-cols-2 gap-4">
          {continentDisplay.slice(0, 4).map((continent) => (
            <button
              key={continent.slug}
              onClick={() => setSelectedContinent(continent.slug)}
              className="flex flex-col items-center justify-center p-6 bg-card/60 hover:bg-card/80 rounded-xl border border-border/50 hover:border-accent/50 transition-all"
            >
              <span className="text-4xl mb-3">{continent.emoji}</span>
              <span className="text-base font-semibold text-foreground">{continent.name}</span>
              <span className="text-sm text-muted-foreground">{continent.count} countries</span>
            </button>
          ))}
        </div>

        {/* Oceania - Full Width */}
        <button
          onClick={() => setSelectedContinent("oceania")}
          className="flex flex-col items-center justify-center p-6 bg-card/60 hover:bg-card/80 rounded-xl border border-border/50 hover:border-accent/50 transition-all w-full"
        >
          <span className="text-4xl mb-3">🏝️</span>
          <span className="text-base font-semibold text-foreground">Oceania</span>
          <span className="text-sm text-muted-foreground">2 countries</span>
        </button>
      </motion.div>
    </div>
  );
};

/* ----------  COMPONENT  ---------- */
/**
 * Home Component - BudQuest Landing Page
 * Professional, SEO-optimized cannabis travel guide homepage
 */
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) navigate(`/usa?search=${encodeURIComponent(finalTerm.trim())}`);
  };

  // Auto-search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (searchTerm.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(searchTerm);
      }, 800);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const scrollToStats = () => {
    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      <SEOHead />
      <Navigation />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:p-2 focus:rounded">
        Skip to main content
      </a>

      {/* ==========  HERO SECTION  ========== */}
      <section 
        className="relative min-h-[100svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
        role="banner"
        aria-label="BudQuest cannabis travel guide hero section"
      >
        {/* Background layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10 px-2"
        >
          {/* Badge with sparkle */}
          <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] transition-shadow">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" aria-hidden="true" />
            Global Cannabis Travel Intelligence
          </Badge>

          {/* Main Heading */}
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              BudQuest
            </span>
          </h1>

          <p className="text-[clamp(1rem,2.5vw,1.75rem)] text-muted-foreground font-light mt-4 max-w-4xl mx-auto leading-relaxed">
            Your Global Cannabis Travel Companion
          </p>

          <p className="text-[clamp(0.95rem,2vw,1.3rem)] text-muted-foreground/80 font-normal mt-3 max-w-4xl mx-auto leading-relaxed">
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations in 120+ countries with verified, real-time information.
          </p>

          {/* Search bar with glow & micro-interaction */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" aria-hidden="true" />
              <Search 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10 pointer-events-none" 
                aria-hidden="true"
              />
              <Input
                id="search-destinations"
                placeholder="Search destinations (e.g., Thailand, California, Amsterdam)..."
                className="pl-16 pr-32 sm:pr-40 h-16 sm:h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/20 font-light placeholder:text-muted-foreground/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
                aria-label="Search cannabis-friendly destinations worldwide"
              />
              <Button 
                onClick={() => handleSearch()} 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-accent hover:bg-accent/90 transition-all z-20 text-sm sm:text-base"
                aria-label="Search destinations"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick tags with hover lift */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {[
              { label: "🔥 California", term: "California", Icon: Flame },
              { label: "💊 Medical Only", term: "Medical", Icon: Stethoscope },
              { label: "🌍 Europe", term: "Europe", Icon: Globe2 },
              { label: "🏨 420 Hotels", term: "Hotels", Icon: Building2 },
            ].map((tag) => (
              <motion.button
                key={tag.term}
                onClick={() => handleSearch(tag.term)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition text-xs sm:text-sm text-muted-foreground hover:text-white cursor-pointer"
                aria-label={`Search ${tag.label}`}
              >
                <tag.Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>{tag.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Scroll hint - immediately after filter tags */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={scrollToStats}
              aria-label="Scroll to statistics"
              className="text-muted-foreground/50 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronDown className="w-8 h-8 animate-bounce" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ==========  STATS SECTION  ========== */}
      <section 
        id="stats" 
        className="py-16 sm:py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
        aria-labelledby="stats-heading"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <h2 id="stats-heading" className="sr-only">BudQuest Global Coverage Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
                  <stat.icon className="w-8 sm:w-10 h-8 sm:h-10 text-accent" aria-hidden="true" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.count} />
                  {stat.suffix}
                </div>
                <div className="text-base sm:text-lg text-muted-foreground font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  FEATURED DESTINATIONS SECTION  ========== */}
      <section 
        id="main-content"
        className="py-16 sm:py-20 px-4 bg-black"
        aria-labelledby="destinations-heading"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
            <h2 id="destinations-heading" className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
              Popular Destinations
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Explore BudQuest's curated list of cannabis-friendly travel hotspots worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURED_DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={FADE_IN}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={dest.link} className="block h-full" aria-label={`View ${dest.name} cannabis travel guide`}>
                  <Card className="relative h-80 sm:h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900/80 backdrop-blur-xl shadow-2xl cursor-pointer hover:shadow-accent/50 transition-all hover:border-accent/30">
                    <img
                      src={dest.image}
                      alt={dest.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />
                    <div className="absolute top-4 right-4 z-10">
                      <Badge 
                        className={`${dest.color} text-white border-none px-3 py-1 backdrop-blur-md text-xs sm:text-sm`}
                      >
                        {dest.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white w-full">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-1 transition-transform group-hover:translate-x-2">{dest.name}</h3>
                      <p className="text-base sm:text-lg text-gray-300 transition-transform group-hover:translate-x-2 delay-75 hidden sm:block">{dest.country}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  FEATURES/RESOURCES SECTION  ========== */}
      <section 
        className="py-16 sm:py-20 px-4 bg-black"
        aria-labelledby="resources-heading"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
            <h2 id="resources-heading" className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
              Essential Resources
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Everything the modern cannabis traveler needs for safe, informed journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {FEATURES_DATA.map((feat) => (
              <motion.div key={feat.title} variants={FADE_IN} whileHover={{ y: -6 }}>
                <Link to={feat.link} className="block h-full" aria-label={feat.title}>
                  <Card className="p-6 sm:p-8 h-full bg-gray-900/50 border-white/10 hover:border-accent/30 hover:bg-gray-900 backdrop-blur-xl transition-all group cursor-pointer">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 mb-4 sm:mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <feat.icon className="w-6 sm:w-7 h-6 sm:h-7 text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-accent transition-colors">{feat.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 flex-grow leading-relaxed mb-3 sm:mb-4">{feat.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all text-sm sm:text-base">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  GLOBAL LEGALITY SECTION  ========== */}
      <section 
        className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black via-gray-950 to-black"
        aria-labelledby="legality-heading"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
            <h2 id="legality-heading" className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
              Global Legality at a Glance
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore cannabis laws worldwide. Filter by legal status and continent to plan your travels with confidence.
            </p>
          </motion.div>

          {/* Mobile View - 2x2 Card Grid with Emojis */}
          <MobileContinentMap />

          {/* Desktop View - Interactive Map */}
          <div className="hidden md:block">
            <motion.div variants={FADE_IN} className="w-full">
              <Card className="bg-card/50 border-border/50 p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-xl w-full overflow-hidden">
                <div className="w-full h-[400px] sm:h-[600px] bg-card rounded-lg overflow-hidden border border-border/50">
                  <InteractiveWorldMap />
                </div>
                <div className="mt-6 flex justify-center items-center">
                  <MapLegend />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==========  BLOG/TRAVEL GUIDES SECTION  ========== */}
      <section 
        className="py-16 sm:py-20 px-4 bg-black"
        aria-labelledby="guides-heading"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
            <h2 id="guides-heading" className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
              Travel Guides & Articles
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              In-depth BudQuest guides for your next cannabis-friendly adventure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_DATA.map((post) => (
              <motion.div key={post.title} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                <Link to={post.link} className="block h-full" aria-label={`Read ${post.title}`}>
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 shadow-2xl flex flex-col cursor-pointer hover:border-accent/30 transition-colors">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-48 sm:h-56 object-cover transition-transform hover:scale-110"
                    />
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{post.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400 flex-grow leading-relaxed mb-4 sm:mb-6">{post.summary}</p>
                      <div className="group flex items-center gap-2 text-accent font-medium text-sm sm:text-base">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  CALL TO ACTION  ========== */}
      <section className="py-12 sm:py-20 px-4 bg-background" aria-labelledby="cta-heading">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl">
            <h2 id="cta-heading" className="text-2xl sm:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Ready to Explore?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Start your journey with Global Canna Pass. Search for your next destination and travel with confidence.
            </p>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('search-destinations')?.focus()} 
              className="h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg rounded-xl bg-accent hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 cursor-pointer w-full sm:w-auto"
            >
              Search Destinations
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
