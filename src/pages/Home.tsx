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

// Lazy Load Heavy Components (Performance Fix)
const InteractiveWorldMap = lazy(() => import("@/components/InteractiveWorldMap"));

/* ----------  TYPES  ---------- */
// (Ideally move to @/types/index.ts)
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

/* ----------  REUSABLE SUB-COMPONENTS  ---------- */

const SEOHead = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "BudQuest",
      description: "Global cannabis travel guide with legal status, 420-friendly hotels, and travel regulations",
      url: "https://budquest.com",
      applicationCategory: "TravelApplication",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
  return null;
};

// DRY Component for Section Titles
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

const MobileContinentMap = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const navigate = useNavigate();

  // (Data truncated for brevity - kept logic identical to original)
  const continentDisplay = [
    { name: "Americas", emoji: "🌎", count: 8, slug: "north-america" },
    { name: "Europe", emoji: "🇪🇺", count: 8, slug: "europe" },
    { name: "Asia", emoji: "🌏", count: 4, slug: "asia" },
    { name: "Africa", emoji: "🌍", count: 4, slug: "africa" },
    { name: "Oceania", emoji: "🏝️", count: 2, slug: "oceania" },
  ];

  // If a continent is selected, show list (Simplified for this view)
  if (selectedContinent) {
    return (
      <div className="block md:hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-bold text-foreground capitalize">{selectedContinent.replace("-", " ")}</h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedContinent(null)} className="ml-auto">
              ← Back
            </Button>
          </div>
          <div className="p-4 bg-card/60 rounded-xl border border-border/50 text-center">
            <p className="text-muted-foreground">Select specific countries in {selectedContinent}...</p>
            <Button onClick={() => navigate(`/world/${selectedContinent}`)} className="mt-4 w-full">View All</Button>
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
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // LOGIC FIX: Generic search routing
  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) {
      // Redirect to a dedicated search page instead of hardcoded '/usa'
      navigate(`/search?q=${encodeURIComponent(finalTerm.trim())}`);
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

      {/* ==========  HERO SECTION  ========== */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10 px-2"
        >
          <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 animate-pulse">
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

          <div className="max-w-3xl mx-auto mt-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10 pointer-events-none" />
            <Input
              placeholder="Search destinations (e.g., Thailand, California)..."
              className="pl-16 pr-32 h-16 sm:h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent backdrop-blur-xl rounded-2xl relative z-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
            />
            <Button 
              onClick={() => handleSearch()} 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-6 rounded-xl bg-accent hover:bg-accent/90 z-20"
            >
              Search
            </Button>
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
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-muted-foreground hover:text-white"
              >
                {tag.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={scrollToStats} className="text-muted-foreground/50 hover:text-white transition-colors">
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ==========  STATS SECTION  ========== */}
      <section id="stats" className="py-16 sm:py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
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

      {/* ==========  FEATURED DESTINATIONS  ========== */}
      <section id="main-content" className="py-16 bg-black">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={STAGGER} className="container mx-auto">
          <SectionHeader 
            id="destinations-heading"
            title="Popular Destinations"
            subtitle="Explore BudQuest's curated list of cannabis-friendly travel hotspots worldwide"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <motion.div key={dest.name} variants={FADE_IN} whileHover={{ y: -8 }}>
                <Link to={dest.link}>
                  <Card className="relative h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-xl hover:border-accent/30 group">
                    <img
                      src={dest.image}
                      alt={dest.imageAlt}
                      loading="lazy"
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
            title="Global Legality at a Glance"
            subtitle="Explore cannabis laws worldwide. Filter by legal status and continent."
          />

          <MobileContinentMap />

          <div className="hidden md:block w-full">
            <motion.div variants={FADE_IN}>
              <Card className="bg-card/50 border-border/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                {/* LAZY LOADED MAP WRAPPED IN SUSPENSE */}
                <div className="w-full h-[600px] bg-card rounded-lg overflow-hidden border border-border/50 relative">
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full w-full text-accent">
                      <Loader2 className="w-10 h-10 animate-spin" />
                      <span className="ml-2">Loading Map Data...</span>
                    </div>
                  }>
                    <InteractiveWorldMap />
                  </Suspense>
                </div>
                <div className="mt-6 flex justify-center">
                  <MapLegend />
                </div>
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
            title="Travel Guides & Articles"
            subtitle="In-depth BudQuest guides for your next adventure"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_DATA.map((post) => (
              <motion.div key={post.title} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                <Link to={post.link}>
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 hover:border-accent/30 flex flex-col group">
                    <img src={post.image} alt={post.imageAlt} loading="lazy" className="w-full h-56 object-cover transition-transform group-hover:scale-110" />
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                      <p className="text-gray-400 flex-grow mb-6">{post.summary}</p>
                      <div className="flex items-center gap-2 text-accent">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-12 rounded-3xl border border-border/50 shadow-2xl">
            <h2 className="text-5xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start your journey with Global Canna Pass. Search for your next destination and travel with confidence.
            </p>
            <Button size="lg" onClick={() => navigate('/search')} className="h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
              Start Your Quest
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

/* ----------  DATA CONSTANTS (Moved to bottom)  ---------- */
// Move to src/data/homeData.ts in production

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
