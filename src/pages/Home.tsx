import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass,
  ArrowRight, ChevronDown, Flame, Stethoscope, Sparkles
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";
import ContinentSelector from "@/components/ContinentSelector";
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
    image: "/images/california.jpg",        // <--- UPDATED
    imageAlt: "California cannabis dispensaries and 420-friendly destinations",
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
    link: "/world" 
  },
  { 
    name: "Canada", 
    status: "Recreational", 
    country: "North America", 
    image: "/images/canada.jpg",            // <--- UPDATED
    imageAlt: "Canada legal cannabis travel and dispensary locations",
    color: "bg-green-500/90", 
    link: "/world" 
  },
  { 
    name: "Uruguay", 
    status: "Recreational", 
    country: "South America", 
    image: "/dest-uruguay.jpg",
    imageAlt: "Uruguay pioneering cannabis legalization travel guide",
    color: "bg-green-500/90", 
    link: "/world" 
  },
  { 
    name: "Thailand", 
    status: "Medical", 
    country: "Asia", 
    image: "/dest-6.jpg",
    imageAlt: "Thailand medical cannabis tourism and regulations",
    color: "bg-amber-700/90", 
    link: "/world" 
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

    return () => document.head.removeChild(script);
  }, []);

  return null;
};

/* ----------  COMPONENT  ---------- */
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) navigate(`/usa?search=${encodeURIComponent(finalTerm.trim())}`);
  };

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

      {/* HERO SECTION */}
      <section 
        className="relative min-h-[100svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
        role="banner"
        aria-label="BudQuest cannabis travel guide hero section"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10 px-2"
        >
          <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Global Cannabis Travel Intelligence
          </Badge>

          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1]">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              BudQuest
            </span>
          </h1>

          <p className="text-[clamp(1rem,2.5vw,1.75rem)] text-muted-foreground font-light mt-4">
            Your Global Cannabis Travel Companion
          </p>

          {/* Search */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />

              <Input
                id="search-destinations"
                placeholder="Search destinations (e.g., Thailand, California, Amsterdam)..."
                className="pl-16 pr-32 h-16 text-lg bg-card/80 border-2 border-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
              />

              <Button 
                onClick={() => handleSearch()} 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-xl bg-accent"
              >
                Search
              </Button>
            </div>
          </div>

          <button
            onClick={scrollToStats}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hidden md:block"
          >
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-20 bg-accent/5 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="text-5xl font-bold">
                  <AnimatedCounter end={stat.count} />
                  {stat.suffix}
                </div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="main-content" className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white">Popular Destinations</h2>
            <p className="text-xl text-gray-400 mt-2">
              Explore BudQuest's curated list of cannabis-friendly travel hotspots worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <Link key={dest.name} to={dest.link}>
                <Card className="relative h-96 overflow-hidden bg-gray-900 border-white/10 rounded-2xl">
                  <img
                    src={dest.image}
                    alt={dest.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                  <Badge className={`${dest.color} text-white absolute top-4 right-4 px-3 py-1`}>
                    {dest.status}
                  </Badge>

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-3xl font-bold">{dest.name}</h3>
                    <p className="text-lg text-gray-300">{dest.country}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white">Essential Resources</h2>
            <p className="text-xl text-gray-400">
              Everything the modern cannabis traveler needs for safe, informed journeys
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES_DATA.map((feat) => (
              <Link key={feat.title} to={feat.link}>
                <Card className="p-8 bg-gray-900/50 border-white/10 rounded-2xl">
                  <div className="w-14 h-14 mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <feat.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{feat.title}</h3>
                  <p className="text-base text-gray-400 mb-4">{feat.desc}</p>
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white">Travel Guides & Articles</h2>
            <p className="text-xl text-gray-400">
              In-depth BudQuest guides for your next cannabis-friendly adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_DATA.map((post) => (
              <Card key={post.title} className="overflow-hidden bg-gray-900 border-white/10 rounded-2xl">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-56 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-base text-gray-400 mb-6">{post.summary}</p>
                  <Link to={post.link} className="text-accent font-medium flex items-center gap-2">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white">Global Legality at a Glance</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our interactive map to see cannabis laws worldwide.
            </p>
          </div>

          <Card className="bg-gray-900/50 border-white/10 p-6 rounded-2xl">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <ContinentSelector />
              <MapLegend />
            </div>
            <div className="h-[600px] w-full bg-gray-900 rounded-lg overflow-hidden border border-white/10">
              <InteractiveWorldMap />
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-12 rounded-3xl border border-white/10">
            <h2 className="text-5xl font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start your journey with BudQuest.
            </p>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('search-destinations')?.focus()} 
              className="h-14 px-10 text-lg rounded-xl bg-accent"
            >
              Search Destinations
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
