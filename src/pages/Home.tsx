import { useState, KeyboardEvent, useEffect, useRef, lazy, Suspense, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Search, MapPin, Shield, Globe2, Plane, Building2, Map, 
  ArrowRight, ChevronDown, Flame, Stethoscope, Sparkles, Loader2,
  Store // Store icon for Dispensaries
} from "lucide-react";

// UI Components
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/AnimatedCounter";
import MapLegend from "@/components/MapLegend";

// Data & Supabase
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { getStatusDotClass, getStatusOutlineClasses, getStatusBadgeClasses } from "@/lib/legal-status-colors";
import { BLOG_POSTS } from "@/pages/Blog";
import { supabase } from "@/integrations/supabase/client";

// Assets
import heroImage from "@/assets/hero-cannabis-travel.jpg";

// Lazy Load Heavy Components
const InteractiveWorldMap = lazy(() => import("@/components/InteractiveWorldMap"));


/* ----------  DYNAMIC STATS CONFIGURATION  ---------- */
// Dynamic counts will be fetched from database
const COUNTRY_COUNT = 150;   // Global Coverage (Updated)

/* ----------  SEARCH DATA  ---------- */
interface SearchItem {
  name: string;
  type: 'state' | 'country' | 'city';
  status: string;
  path: string;
  region?: string;
}

// EXPANDED World countries for search
const WORLD_COUNTRIES: SearchItem[] = [
  // --- North America ---
  { name: "Canada", type: "country", status: "Recreational", path: "/world/north-america/canada", region: "North America" },
  { name: "United States", type: "country", status: "Mixed", path: "/world/north-america/united-states", region: "North America" },
  { name: "Mexico", type: "country", status: "Decriminalized", path: "/world/north-america/mexico", region: "North America" },
  
  // --- Central America ---
  { name: "Costa Rica", type: "country", status: "Decriminalized", path: "/world/central-america/costa-rica", region: "Central America" },
  { name: "Belize", type: "country", status: "Decriminalized", path: "/world/central-america/belize", region: "Central America" },
  { name: "Panama", type: "country", status: "Medical", path: "/world/central-america/panama", region: "Central America" },
  
  // --- Europe ---
  { name: "Netherlands", type: "country", status: "Decriminalized", path: "/world/europe/netherlands", region: "Europe" },
  { name: "Germany", type: "country", status: "Recreational", path: "/world/europe/germany", region: "Europe" },
  { name: "Spain", type: "country", status: "Decriminalized", path: "/world/europe/spain", region: "Europe" },
  { name: "Portugal", type: "country", status: "Decriminalized", path: "/world/europe/portugal", region: "Europe" },
  { name: "Italy", type: "country", status: "Decriminalized", path: "/world/europe/italy", region: "Europe" },
  { name: "Switzerland", type: "country", status: "Decriminalized", path: "/world/europe/switzerland", region: "Europe" },
  { name: "Czech Republic", type: "country", status: "Decriminalized", path: "/world/europe/czech-republic", region: "Europe" },
  { name: "Austria", type: "country", status: "Decriminalized", path: "/world/europe/austria", region: "Europe" },
  { name: "Belgium", type: "country", status: "Decriminalized", path: "/world/europe/belgium", region: "Europe" },
  { name: "Malta", type: "country", status: "Recreational", path: "/world/europe/malta", region: "Europe" },
  { name: "Luxembourg", type: "country", status: "Recreational", path: "/world/europe/luxembourg", region: "Europe" },
  { name: "United Kingdom", type: "country", status: "Medical", path: "/world/europe/uk", region: "Europe" },
  { name: "France", type: "country", status: "Medical", path: "/world/europe/france", region: "Europe" },
  { name: "Croatia", type: "country", status: "Medical", path: "/world/europe/croatia", region: "Europe" },
  { name: "Greece", type: "country", status: "Medical", path: "/world/europe/greece", region: "Europe" },
  { name: "Poland", type: "country", status: "Medical", path: "/world/europe/poland", region: "Europe" },
  { name: "Denmark", type: "country", status: "Medical", path: "/world/europe/denmark", region: "Europe" },
  { name: "Norway", type: "country", status: "Medical", path: "/world/europe/norway", region: "Europe" },
  { name: "Georgia", type: "country", status: "Recreational", path: "/world/europe/georgia", region: "Europe" }, // Use legal, sale illegal
  
  // --- South America ---
  { name: "Uruguay", type: "country", status: "Recreational", path: "/world/south-america/uruguay", region: "South America" },
  { name: "Colombia", type: "country", status: "Medical", path: "/world/south-america/colombia", region: "South America" },
  { name: "Argentina", type: "country", status: "Medical", path: "/world/south-america/argentina", region: "South America" },
  { name: "Chile", type: "country", status: "Decriminalized", path: "/world/south-america/chile", region: "South America" },
  { name: "Peru", type: "country", status: "Medical", path: "/world/south-america/peru", region: "South America" },
  { name: "Brazil", type: "country", status: "Decriminalized", path: "/world/south-america/brazil", region: "South America" },
  { name: "Ecuador", type: "country", status: "Decriminalized", path: "/world/south-america/ecuador", region: "South America" },
  { name: "Paraguay", type: "country", status: "Medical", path: "/world/south-america/paraguay", region: "South America" },
  
  // --- Caribbean ---
  { name: "Jamaica", type: "country", status: "Decriminalized", path: "/world/caribbean/jamaica", region: "Caribbean" },
  { name: "St. Vincent", type: "country", status: "Decriminalized", path: "/world/caribbean/st-vincent", region: "Caribbean" },
  { name: "Antigua and Barbuda", type: "country", status: "Recreational", path: "/world/caribbean/antigua", region: "Caribbean" },
  { name: "Saint Lucia", type: "country", status: "Decriminalized", path: "/world/caribbean/saint-lucia", region: "Caribbean" },
  { name: "Dominica", type: "country", status: "Decriminalized", path: "/world/caribbean/dominica", region: "Caribbean" },
  { name: "Barbados", type: "country", status: "Medical", path: "/world/caribbean/barbados", region: "Caribbean" },
  { name: "Puerto Rico", type: "country", status: "Medical", path: "/world/caribbean/puerto-rico", region: "Caribbean" },
  { name: "Trinidad and Tobago", type: "country", status: "Decriminalized", path: "/world/caribbean/trinidad", region: "Caribbean" },

  // --- Asia ---
  { name: "Thailand", type: "country", status: "Mixed", path: "/world/asia/thailand", region: "Asia" },
  { name: "India", type: "country", status: "Mixed", path: "/world/asia/india", region: "Asia" },
  { name: "Japan", type: "country", status: "Illegal", path: "/world/asia/japan", region: "Asia" },
  { name: "South Korea", type: "country", status: "Medical", path: "/world/asia/south-korea", region: "Asia" },
  { name: "Israel", type: "country", status: "Medical", path: "/world/asia/israel", region: "Asia" }, // Major medical hub
  { name: "Lebanon", type: "country", status: "Medical", path: "/world/asia/lebanon", region: "Asia" },
  
  // --- Africa ---
  { name: "South Africa", type: "country", status: "Decriminalized", path: "/world/africa/south-africa", region: "Africa" },
  { name: "Morocco", type: "country", status: "Illegal", path: "/world/africa/morocco", region: "Africa" },
  { name: "Lesotho", type: "country", status: "Medical", path: "/world/africa/lesotho", region: "Africa" },
  { name: "Zimbabwe", type: "country", status: "Medical", path: "/world/africa/zimbabwe", region: "Africa" },
  { name: "Rwanda", type: "country", status: "Medical", path: "/world/africa/rwanda", region: "Africa" },
  
  // --- Oceania ---
  { name: "Australia", type: "country", status: "Mixed", path: "/world/oceania/australia", region: "Oceania" }, 
  { name: "New Zealand", type: "country", status: "Medical", path: "/world/oceania/new-zealand", region: "Oceania" },
  { name: "Guam", type: "country", status: "Recreational", path: "/world/oceania/guam", region: "Oceania" },
];

// EXPANDED Popular cities for search
const POPULAR_CITIES: SearchItem[] = [
  { name: "Amsterdam", type: "city", status: "Decriminalized", path: "/world/europe/netherlands/north-holland/amsterdam", region: "Netherlands" },
  { name: "Barcelona", type: "city", status: "Decriminalized", path: "/world/europe/spain/catalonia/barcelona", region: "Spain" },
  { name: "Los Angeles", type: "city", status: "Recreational", path: "/usa/california/los-angeles", region: "California" },
  { name: "Denver", type: "city", status: "Recreational", path: "/usa/colorado/denver", region: "Colorado" },
  { name: "San Francisco", type: "city", status: "Recreational", path: "/usa/california/san-francisco", region: "California" },
  { name: "Toronto", type: "city", status: "Recreational", path: "/world/north-america/canada/ontario/toronto", region: "Canada" },
  { name: "Vancouver", type: "city", status: "Recreational", path: "/world/north-america/canada/british-columbia/vancouver", region: "Canada" },
  { name: "Berlin", type: "city", status: "Recreational", path: "/world/europe/germany/berlin-region/berlin", region: "Germany" },
  { name: "Munich", type: "city", status: "Recreational", path: "/world/europe/germany/bavaria/munich", region: "Germany" },
  { name: "Bangkok", type: "city", status: "Mixed", path: "/world/asia/thailand/bangkok-region/bangkok", region: "Thailand" },
  { name: "Chiang Mai", type: "city", status: "Mixed", path: "/world/asia/thailand/chiang-mai", region: "Thailand" },
  { name: "Lisbon", type: "city", status: "Decriminalized", path: "/world/europe/portugal/lisbon-region/lisbon", region: "Portugal" },
  { name: "Prague", type: "city", status: "Decriminalized", path: "/world/europe/czech-republic/prague", region: "Czech Republic" },
  { name: "Cape Town", type: "city", status: "Decriminalized", path: "/world/africa/south-africa/western-cape/cape-town", region: "South Africa" },
  { name: "Tel Aviv", type: "city", status: "Medical", path: "/world/asia/israel/tel-aviv", region: "Israel" },
  { name: "Canberra", type: "city", status: "Recreational", path: "/world/oceania/australia/act/canberra", region: "Australia" },
];

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

// Blog Type Definition
interface BlogItem {
  id: string;
  title: string;
  summary: string; // Used for fallback data
  image: string;
  imageAlt: string;
  link?: string; // Optional legacy link
}

/* ----------  ANIMATION VARIANTS  ---------- */
const FADE_IN: Variants = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
const STAGGER: Variants = { animate: { transition: { staggerChildren: 0.15 } } };

/* ----------  SUB-COMPONENTS  ---------- */

// SEO Component
const SEOHead = () => {
  useEffect(() => {
    document.title = "BudQuest | The Ultimate Global Cannabis Travel Guide";
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const description = "Plan your 420-friendly vacation with BudQuest. Verified cannabis laws, legal weed destinations, dispensary finders, and travel guides for 150+ countries.";
    const url = "https://budquest.com";
    const image = "https://budquest.com/og-social-share.jpg";

    updateMeta("description", description);
    updateMeta("keywords", "cannabis travel, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, budquest");
    
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    updateMeta("og:type", "website", "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:title", "BudQuest | Global Cannabis Travel Guide", "property");
    updateMeta("og:description", "Discover legal cannabis destinations, verified laws, and 420-friendly stays worldwide.", "property");
    updateMeta("og:image", image, "property");

    const scriptId = "seo-structured-data";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BudQuest",
          "url": url,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BudQuest",
          "url": url,
          "logo": "https://budquest.com/logo.png"
        }
      ]);
      document.head.appendChild(script);
    }
  }, []);
  return null;
};

const SectionHeader = ({ title, subtitle, id }: { title: string, subtitle: string, id: string }) => (
  <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
    <h2 id={id} className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
      {subtitle}
    </p>
  </motion.div>
);

/* ----------  MOBILE CONTINENT MAP  ---------- */
const MobileContinentMap = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const navigate = useNavigate();

  const continentDisplay = [
    { name: "North America", emoji: "🌐", count: 3, slug: "north-america" },
    { name: "Central America", emoji: "☀️", count: 7, slug: "central-america" },
    { name: "Europe", emoji: "🏔️", count: 44, slug: "europe" },
    { name: "South America", emoji: "🌴", count: 13, slug: "south-america" },
    { name: "Caribbean", emoji: "🌊", count: 26, slug: "caribbean" },
    { name: "Asia", emoji: "⛰️", count: 41, slug: "asia" },
    { name: "Africa", emoji: "📍", count: 54, slug: "africa" },
    { name: "Oceania", emoji: "≈", count: 25, slug: "oceania" },
  ];

  const countriesByContinent: Record<string, { name: string; status: string; description: string; slug: string; realRegion?: string }[]> = {
    "north-america": [
      { name: "United States", status: "Mixed", description: "Varies by state - 24 states recreational", slug: "united-states" },
      { name: "Canada", status: "Recreational", description: "Fully legal nationwide since 2018", slug: "canada" },
      { name: "Mexico", status: "Decriminalized", description: "Decriminalized for personal use", slug: "mexico" },
    ],
    "central-america": [
      { name: "Costa Rica", status: "Decriminalized", description: "Personal use largely tolerated", slug: "costa-rica" },
      { name: "Panama", status: "Medical", description: "Medical legalization in process", slug: "panama" },
      { name: "Belize", status: "Decriminalized", description: "Possession up to 10g decriminalized", slug: "belize" },
    ],
    "south-america": [
      { name: "Uruguay", status: "Recreational", description: "Fully legal for residents", slug: "uruguay" },
      { name: "Colombia", status: "Medical", description: "Medical legal, Decriminalized <20g", slug: "colombia" },
      { name: "Argentina", status: "Medical", description: "REPROCANN program for medical use", slug: "argentina" },
    ],
    "caribbean": [
      { name: "Jamaica", status: "Decriminalized", description: "Medical and religious use legal", slug: "jamaica" },
      { name: "St. Vincent", status: "Decriminalized", description: "Medical cannabis industry active", slug: "st-vincent" },
    ],
    "europe": [
      { name: "Netherlands", status: "Decriminalized", description: "Tolerated in coffee shops", slug: "netherlands" },
      { name: "Germany", status: "Recreational", description: "Legalized recreational use (2024)", slug: "germany" },
      { name: "Spain", status: "Decriminalized", description: "Private social clubs legal", slug: "spain" },
      { name: "Portugal", status: "Decriminalized", description: "Decriminalized all drugs in 2001", slug: "portugal" },
      { name: "Malta", status: "Recreational", description: "First EU country to legalize", slug: "malta" },
    ],
    "asia": [
      { name: "Thailand", status: "Mixed", description: "Recreational ending 2025, medical only", slug: "thailand" },
      { name: "India", status: "Mixed", description: "Bhang legal, flower illegal by state", slug: "india" },
      { name: "Japan", status: "Illegal", description: "Strict prohibition (Travel Warning)", slug: "japan" },
    ],
    "africa": [
      { name: "South Africa", status: "Decriminalized", description: "Private cultivation and use legal", slug: "south-africa" },
      { name: "Morocco", status: "Illegal", description: "Major hash producer (Kief tolerated)", slug: "morocco" },
    ],
    "oceania": [
      // UPDATED: Australia is Mixed (ACT Recreational, Federal Medical)
      { name: "Australia", status: "Mixed", description: "Medical federal, ACT recreational", slug: "australia" }, 
      { name: "New Zealand", status: "Medical", description: "Medical legal since 2020", slug: "new-zealand" },
    ],
  };

  const getStatusDot = (status: string) => getStatusDotClass(status);
  const getStatusColor = (status: string) => getStatusOutlineClasses(status);

  if (selectedContinent) {
    const continentInfo = continentDisplay.find(c => c.slug === selectedContinent);
    const representativeCountries = countriesByContinent[selectedContinent] || [];

    return (
      <div className="block md:hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{continentInfo?.emoji}</span>
            <h3 className="text-xl font-bold text-foreground">{continentInfo?.name}</h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedContinent(null)} className="ml-auto">
              ← Back
            </Button>
          </div>

          <div className="space-y-3">
            {representativeCountries.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => navigate(`/world/${selectedContinent}/${country.slug}`)}
                className="p-4 bg-card/60 rounded-xl border border-border/50 hover:border-accent/50 cursor-pointer"
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

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="mt-6 pt-2"
          >
            <Button 
              onClick={() => navigate(`/world/${selectedContinent}`)}
              className="w-full h-12 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 flex items-center justify-center gap-2 text-base font-medium"
            >
              View all {continentInfo?.count} countries in {continentInfo?.name} 
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="block md:hidden">
      <motion.div variants={FADE_IN} className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {continentDisplay.map((continent) => (
            <button
              key={continent.slug}
              onClick={() => setSelectedContinent(continent.slug)}
              className="flex flex-col items-center justify-center p-6 bg-card/90 hover:bg-card rounded-xl border-2 border-accent/40 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 backdrop-blur-sm text-center"
            >
              <span className="text-3xl mb-3">{continent.emoji}</span>
              <span className="text-base font-semibold text-foreground">{continent.name}</span>
              <span className="text-sm text-muted-foreground">{continent.count} countries</span>
              <ArrowRight className="w-4 h-4 text-accent/50 mt-2" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ----------  MAIN COMPONENT  ---------- */

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dispensaryCount, setDispensaryCount] = useState(48);
  const [hotelCount, setHotelCount] = useState(31);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch dynamic counts from database
  useEffect(() => {
    const fetchCounts = async () => {
      const [dispResult, hotelResult] = await Promise.all([
        supabase.from('dispensaries').select('id', { count: 'exact', head: true }),
        supabase.from('hotels').select('id', { count: 'exact', head: true })
      ]);
      if (dispResult.count) setDispensaryCount(dispResult.count);
      if (hotelResult.count) setHotelCount(hotelResult.count);
    };
    fetchCounts();
  }, []);

  // Build search items from USA states
  const stateSearchItems = useMemo<SearchItem[]>(() => 
    USA_STATE_DATA.map(state => ({
      name: state.name,
      type: 'state' as const,
      status: state.status.charAt(0).toUpperCase() + state.status.slice(1),
      path: `/usa/${state.slug}`,
      region: 'USA'
    }))
  , []);

  // Combine all searchable items
  const allSearchItems = useMemo(() => [
    ...stateSearchItems,
    ...WORLD_COUNTRIES,
    ...POPULAR_CITIES
  ], [stateSearchItems]);

  // Filter suggestions based on search term
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];
    const query = searchTerm.toLowerCase();
    return allSearchItems
      .filter(item => item.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 8);
  }, [searchTerm, allSearchItems]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item: SearchItem) => {
    setSearchTerm("");
    setShowSuggestions(false);
    navigate(item.path);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && searchTerm.trim()) {
        navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else if (searchTerm.trim()) {
          navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const getStatusBadgeColor = (status: string) => getStatusOutlineClasses(status);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'state': return '🇺🇸';
      case 'country': return '🌍';
      case 'city': return '🏙️';
      default: return '📍';
    }
  };

  const scrollToStats = () => {
    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
  };

  // Define Stats Data with dynamic counts from database
  const STATS_DATA: StatItem[] = [
    { icon: Globe2, label: "Countries Covered", count: COUNTRY_COUNT, suffix: "+" },
    { icon: Store, label: "Verified Dispensaries", count: dispensaryCount, suffix: "+" },
    { icon: Building2, label: "420-Friendly Hotels", count: hotelCount, suffix: "+" },
    { icon: Shield, label: "Data Accuracy", count: 94, suffix: "%" },
  ];

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
      >
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroImage})` }}
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
          <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] animate-pulse">
            <Sparkles className="w-4 h-4 mr-2 inline" aria-hidden="true" />
            Global Cannabis Travel Intelligence
          </Badge>

          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              BudQuest
            </span>
          </h1>

          <p className="text-[clamp(1rem,2.5vw,1.75rem)] text-muted-foreground font-light mt-4 max-w-4xl mx-auto leading-relaxed">
            Your Global Cannabis Travel Companion
          </p>

          <p className="text-[clamp(0.95rem,2vw,1.3rem)] text-muted-foreground/80 font-normal mt-3 max-w-4xl mx-auto leading-relaxed">
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations in 150+ countries with verified, real-time information.
          </p>

          <div className="max-w-3xl mx-auto mt-10" ref={searchRef}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10 pointer-events-none" />
              <Input
                ref={inputRef}
                aria-label="Search destinations"
                placeholder="Search destinations (e.g., Thailand, California, Amsterdam)..."
                className="pl-16 pr-32 sm:pr-40 h-16 sm:h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/20 font-light placeholder:text-muted-foreground/60"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                onClick={() => {
                  if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    handleSelectSuggestion(suggestions[selectedIndex]);
                  } else if (searchTerm.trim()) {
                    navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
                  }
                }} 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-accent hover:bg-accent/90 transition-all z-20 text-sm sm:text-base"
                aria-label="Submit search"
              >
                Search
              </Button>

              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
                >
                  {suggestions.map((item, index) => (
                    <button
                      key={`${item.type}-${item.name}`}
                      onClick={() => handleSelectSuggestion(item)}
                      className={`w-full px-5 py-4 flex items-center gap-4 text-left transition-colors ${
                        index === selectedIndex 
                          ? 'bg-accent/20 border-l-2 border-accent' 
                          : 'hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{item.name}</span>
                          <Badge className={`text-xs border ${getStatusBadgeColor(item.status)}`}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.type === 'state' ? 'US State' : item.type === 'country' ? item.region : item.region}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {[
              { label: "🔥 California", path: "/usa/california" },
              { label: "🌎 World Guide", path: "/world" },
              { label: "🇪🇺 Europe", path: "/world/europe" },
              { label: "🏨 420 Hotels", path: "/hotels" },
            ].map((item) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition text-xs sm:text-sm text-muted-foreground hover:text-white cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={scrollToStats} className="text-muted-foreground/50 hover:text-white transition-colors cursor-pointer" aria-label="Scroll down to statistics">
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ==========  STATS SECTION  ========== */}
      <section id="stats" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="container mx-auto">
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
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <stat.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.count} />{stat.suffix}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  DESTINATIONS  ========== */}
      <section id="main-content" className="py-16 bg-black">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={STAGGER} className="container mx-auto">
          <SectionHeader 
            id="destinations-heading" 
            title="Popular Cannabis Destinations" 
            subtitle="Explore BudQuest's curated list of top 420-friendly travel hotspots worldwide" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <motion.div key={dest.name} variants={FADE_IN} whileHover={{ y: -8 }}>
                <Link to={dest.link} aria-label={`View cannabis laws and guides for ${dest.name}`}>
                  <Card className="relative h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-xl hover:border-accent/30 group">
                    <img 
                      src={dest.image} 
                      alt={dest.imageAlt} 
                      loading="lazy" 
                      width="400"
                      height="500"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className={`${dest.color} text-white border-none`}>{dest.status}</Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-3xl font-bold mb-1">{dest.name}</h3>
                      <p className="text-lg text-gray-300">{dest.country}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  GLOBAL LEGALITY MAP  ========== */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-950 to-black">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={STAGGER} className="container mx-auto">
          <SectionHeader 
            id="legality-heading" 
            title="Global Cannabis Legality Map" 
            subtitle="Explore marijuana laws worldwide. Filter by legal status (Recreational, Medical, Decriminalized) and continent." 
          />
          
          <MobileContinentMap />

          <div className="hidden md:block w-full">
            <motion.div variants={FADE_IN}>
              <Card className="bg-card/50 border-border/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="w-full h-[600px] bg-card rounded-lg overflow-hidden border border-border/50 relative">
                  <Suspense fallback={<div className="flex items-center justify-center h-full w-full text-accent"><Loader2 className="w-10 h-10 animate-spin mr-2"/>Loading Global Map Data...</div>}>
                    <InteractiveWorldMap />
                  </Suspense>
                </div>
                <div className="mt-6 flex justify-center"><MapLegend /></div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==========  BLOG SECTION  ========== */}
      <section className="py-16 bg-black">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={STAGGER} className="container mx-auto">
          <SectionHeader 
            id="guides-heading" 
            title="Cannabis Travel Guides & News" 
            subtitle="Expert advice, legal tips, and dispensary guides for your next adventure" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3)
              .map((post) => (
              <motion.div key={post.id} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                <Link to={`/blog/${post.id}`} aria-label={`Read article: ${post.title}`}>
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 hover:border-accent/30 flex flex-col group">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy" 
                      width="400"
                      height="224"
                      className="w-full h-56 object-cover transition-transform group-hover:scale-110" 
                    />
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                      <p className="text-gray-400 flex-grow mb-6">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-accent"><span>Read Article</span><ArrowRight className="w-4 h-4" /></div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  CTA SECTION  ========== */}
      <section className="py-12 sm:py-20 px-4 bg-background">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="container mx-auto text-center">
          <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
              Start your journey with BudQuest. Search for your next destination and travel with confidence.
            </p>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('search-destinations')?.focus()} 
              className="w-full sm:w-auto h-12 sm:h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
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

/* ----------  DATA CONSTANTS  ---------- */
const FEATURED_DESTINATIONS: Destination[] = [
  { name: "California", status: "Recreational", country: "USA", image: "/dest-california-beach.jpg", imageAlt: "California cannabis tourism guide beach view", color: "bg-green-500/90", link: "/usa/california" },
  { name: "Colorado", status: "Recreational", country: "USA", image: "/dest-2.jpg", imageAlt: "Colorado mountains dispensary guide", color: "bg-green-500/90", link: "/usa/colorado" },
  { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "/dest-3.jpg", imageAlt: "Amsterdam coffee shops canal view", color: "bg-amber-500/90", link: "/world/europe/netherlands" },
  { name: "Canada", status: "Recreational", country: "North America", image: "/dest-canada-toronto.jpg", imageAlt: "Canada legal weed travel guide Toronto", color: "bg-green-500/90", link: "/world/north-america/canada" },
  { name: "Uruguay", status: "Recreational", country: "South America", image: "/dest-uruguay.jpg", imageAlt: "Uruguay cannabis club travel", color: "bg-green-500/90", link: "/world/south-america/uruguay" },
  { name: "Thailand", status: "Medical", country: "Asia", image: "/dest-6.jpg", imageAlt: "Thailand cannabis laws and temples", color: "bg-amber-700/90", link: "/world/asia/thailand" },
];

export default Home;
