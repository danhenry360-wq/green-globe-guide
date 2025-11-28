import { useState, KeyboardEvent, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Search, MapPin, Shield, Globe2, Plane, Building2, Map, 
  ArrowRight, ChevronDown, Flame, Stethoscope, Sparkles, Loader2
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

// Assets
import heroImage from "@/assets/hero-cannabis-travel.jpg";

// Lazy Load Heavy Components
const InteractiveWorldMap = lazy(() => import("@/components/InteractiveWorldMap"));

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

/* ----------  SUB-COMPONENTS  ---------- */

const SEOHead = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "BudQuest",
      description: "Global cannabis travel guide",
      url: "https://budquest.com",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
  return null;
};

const SectionHeader = ({ title, subtitle, id }: { title: string, subtitle: string, id: string }) => (
  <motion.div variants={FADE_IN} className="text-center mb-12 sm:mb-16">
    <h2 id={id} className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 text-white">
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
    { name: "Americas", emoji: "🌎", count: 8, slug: "north-america" },
    { name: "Europe", emoji: "🇪🇺", count: 8, slug: "europe" },
    { name: "Asia", emoji: "🌏", count: 4, slug: "asia" },
    { name: "Africa", emoji: "🌍", count: 4, slug: "africa" },
    { name: "Oceania", emoji: "🏝️", count: 2, slug: "oceania" },
  ];

  // FIX: Added 'realRegion' property to distinguish South America from North America
  const countriesByContinent: Record<string, { name: string; status: string; description: string; slug: string; realRegion?: string }[]> = {
    "north-america": [
      { name: "United States", status: "Recreational", description: "Varies by state - 24 states recreational", slug: "united-states" },
      { name: "Canada", status: "Recreational", description: "Fully legal nationwide since 2018", slug: "canada" },
      { name: "Mexico", status: "Decriminalized", description: "Decriminalized for personal use", slug: "mexico" },
      // Jamaica & Costa Rica are technically North America/Caribbean
      { name: "Jamaica", status: "Decriminalized", description: "Medical and religious use legal", slug: "jamaica" },
      { name: "Costa Rica", status: "Decriminalized", description: "Personal use largely tolerated", slug: "costa-rica" },
      // These 3 are South America, so we add realRegion override:
      { name: "Uruguay", status: "Recreational", description: "Fully legal (South America)", slug: "uruguay", realRegion: "south-america" },
      { name: "Colombia", status: "Medical", description: "Medical legal, Decriminalized <20g", slug: "colombia", realRegion: "south-america" },
      { name: "Argentina", status: "Medical", description: "REPROCANN program for medical use", slug: "argentina", realRegion: "south-america" },
    ],
    "europe": [
      { name: "Netherlands", status: "Decriminalized", description: "Tolerated in coffee shops", slug: "netherlands" },
      { name: "Germany", status: "Recreational", description: "Legalized recreational use (2024)", slug: "germany" },
      { name: "Spain", status: "Decriminalized", description: "Private social clubs legal", slug: "spain" },
      { name: "Portugal", status: "Decriminalized", description: "Decriminalized all drugs in 2001", slug: "portugal" },
      { name: "Switzerland", status: "Medical", description: "Medical legal, low-THC (<1%) legal", slug: "switzerland" },
      { name: "Malta", status: "Recreational", description: "First EU country to legalize", slug: "malta" },
      { name: "Czech Republic", status: "Decriminalized", description: "Liberal drug laws, widely available", slug: "czech-republic" },
      { name: "Luxembourg", status: "Recreational", description: "Legal to grow and consume at home", slug: "luxembourg" },
    ],
    "asia": [
      { name: "Thailand", status: "Recreational", description: "Cannabis removed from narcotics list", slug: "thailand" },
      { name: "India", status: "Decriminalized", description: "Bhang legal, other forms vary by state", slug: "india" },
      { name: "Japan", status: "Illegal", description: "Strict prohibition (Travel Warning)", slug: "japan" },
      { name: "South Korea", status: "Medical", description: "Strict medical only, illegal for rec", slug: "south-korea" },
    ],
    "africa": [
      { name: "South Africa", status: "Decriminalized", description: "Private cultivation and use legal", slug: "south-africa" },
      { name: "Morocco", status: "Illegal", description: "Major hash producer (Kief tolerated)", slug: "morocco" },
      { name: "Lesotho", status: "Medical", description: "First African medical license", slug: "lesotho" },
      { name: "Malawi", status: "Medical", description: "Cultivation for medical/export legal", slug: "malawi" },
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

  if (selectedContinent) {
    const continent = continentDisplay.find(c => c.slug === selectedContinent);
    const countries = countriesByContinent[selectedContinent] || [];

    return (
      <div className="block md:hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{continent?.emoji}</span>
            <h3 className="text-xl font-bold text-foreground">{continent?.name}</h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedContinent(null)} className="ml-auto">
              ← Back
            </Button>
          </div>

          <div className="space-y-3">
            {countries.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => {
                  // FIX: Use realRegion if it exists (for South America), otherwise use the parent continent slug
                  const targetRegion = country.realRegion || selectedContinent;
                  navigate(`/world/${targetRegion}/${country.slug}`);
                }}
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="block md:hidden">
      <motion.div variants={FADE_IN} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {continentDisplay.slice(0, 4).map((continent) => (
            <button
              key={continent.slug}
              onClick={() => setSelectedContinent(continent.slug)}
              className="flex flex-col items-center justify-center p-6 bg-card/60 hover:bg-card/80 rounded-xl border border-border/50 transition-all"
            >
              <span className="text-4xl mb-3">{continent.emoji}</span>
              <span className="text-base font-semibold text-foreground">{continent.name}</span>
              <span className="text-sm text-muted-foreground">{continent.count} countries</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelectedContinent("oceania")}
          className="flex flex-col items-center justify-center p-6 bg-card/60 hover:bg-card/80 rounded-xl border border-border/50 w-full"
        >
          <span className="text-4xl mb-3">🏝️</span>
          <span className="text-base font-semibold text-foreground">Oceania</span>
          <span className="text-sm text-muted-foreground">2 countries</span>
        </button>
      </motion.div>
    </div>
  );
};

/* ----------  MAIN COMPONENT  ---------- */

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) {
      navigate(`/usa?search=${encodeURIComponent(finalTerm.trim())}`);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (searchTerm.trim()) {
      searchTimeoutRef.current = setTimeout(() => handleSearch(searchTerm), 800);
    }
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
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

      {/* ==========  HERO SECTION (ORIGINAL VISUALS)  ========== */}
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
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations in 120+ countries with verified, real-time information.
          </p>

          <div className="max-w-3xl mx-auto mt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10 pointer-events-none" />
              <Input
                placeholder="Search destinations (e.g., Thailand, California, Amsterdam)..."
                className="pl-16 pr-32 sm:pr-40 h-16 sm:h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/20 font-light placeholder:text-muted-foreground/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
              />
              <Button 
                onClick={() => handleSearch()} 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-accent hover:bg-accent/90 transition-all z-20 text-sm sm:text-base"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {[
              { label: "🔥 California", term: "California" },
              { label: "💊 Medical Only", term: "Medical" },
              { label: "🌍 Europe", term: "Europe" },
              { label: "🏨 420 Hotels", term: "Hotels" },
            ].map((tag) => (
              <motion.button
                key={tag.term}
                onClick={() => handleSearch(tag.term)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition text-xs sm:text-sm text-muted-foreground hover:text-white cursor-pointer"
              >
                {tag.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={scrollToStats} className="text-muted-foreground/50 hover:text-white transition-colors cursor-pointer">
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
          <SectionHeader id="destinations-heading" title="Popular Destinations" subtitle="Explore BudQuest's curated list of cannabis-friendly travel hotspots worldwide" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <motion.div key={dest.name} variants={FADE_IN} whileHover={{ y: -8 }}>
                <Link to={dest.link}>
                  <Card className="relative h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-xl hover:border-accent/30 group">
                    <img src={dest.image} alt={dest.imageAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
          <SectionHeader id="legality-heading" title="Global Legality at a Glance" subtitle="Explore cannabis laws worldwide. Filter by legal status and continent." />
          
          <MobileContinentMap />

          <div className="hidden md:block w-full">
            <motion.div variants={FADE_IN}>
              <Card className="bg-card/50 border-border/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="w-full h-[600px] bg-card rounded-lg overflow-hidden border border-border/50 relative">
                  <Suspense fallback={<div className="flex items-center justify-center h-full w-full text-accent"><Loader2 className="w-10 h-10 animate-spin mr-2"/>Loading Map...</div>}>
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
          <SectionHeader id="guides-heading" title="Travel Guides & Articles" subtitle="In-depth BudQuest guides for your next adventure" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_DATA.map((post) => (
              <motion.div key={post.title} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                <Link to={post.link}>
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 hover:border-accent/30 flex flex-col group">
                    <img src={post.image} alt={post.imageAlt} loading="lazy" className="w-full h-56 object-cover transition-transform group-hover:scale-110" />
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                      <p className="text-gray-400 flex-grow mb-6">{post.summary}</p>
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
      <section className="py-20 px-4 bg-background">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="container mx-auto text-center">
          <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-12 rounded-3xl border border-border/50 shadow-2xl">
            <h2 className="text-5xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start your journey with Global Canna Pass. Search for your next destination and travel with confidence.
            </p>
            <Button size="lg" onClick={() => document.getElementById('search-destinations')?.focus()} className="h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
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
  { name: "California", status: "Recreational", country: "USA", image: "/dest-california-beach.jpg", imageAlt: "California beach", color: "bg-green-500/90", link: "/usa/california" },
  { name: "Colorado", status: "Recreational", country: "USA", image: "/dest-2.jpg", imageAlt: "Colorado mountains", color: "bg-green-500/90", link: "/usa/colorado" },
  { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "/dest-3.jpg", imageAlt: "Amsterdam canal", color: "bg-amber-500/90", link: "/world/europe/netherlands" },
  { name: "Canada", status: "Recreational", country: "North America", image: "/dest-canada-toronto.jpg", imageAlt: "Toronto skyline", color: "bg-green-500/90", link: "/world/north-america/canada" },
  { name: "Uruguay", status: "Recreational", country: "South America", image: "/dest-uruguay.jpg", imageAlt: "Uruguay coast", color: "bg-green-500/90", link: "/world/south-america/uruguay" },
  { name: "Thailand", status: "Medical", country: "Asia", image: "/dest-6.jpg", imageAlt: "Thai temple", color: "bg-amber-700/90", link: "/world/asia/thailand" },
];

const STATS_DATA: StatItem[] = [
  { icon: Globe2, label: "Countries Covered", count: 120, suffix: "+" },
  { icon: MapPin, label: "Verified Destinations", count: 500, suffix: "+" },
  { icon: Building2, label: "420-Friendly Hotels", count: 300, suffix: "+" },
  { icon: Shield, label: "Data Accuracy", count: 94, suffix: "%" },
];

const BLOG_DATA: BlogItem[] = [
  { title: "Amsterdam Coffee Shops Guide 2025", summary: "Discover the best cannabis coffee shops, local etiquette, and legal tips.", image: "/blog-amsterdam.jpg", imageAlt: "Amsterdam shop", link: "/guides/amsterdam" },
  { title: "California Cannabis Travel Handbook", summary: "Complete guide to California dispensaries and regulations.", image: "/blog-california.jpg", imageAlt: "Dispensary", link: "/guides/california" },
  { title: "Uruguay: The First Legal Cannabis Nation", summary: "Deep dive into Uruguay's pioneering legalization model.", image: "/blog-uruguay.jpg", imageAlt: "Uruguay street", link: "/guides/uruguay" },
];

export default Home;
