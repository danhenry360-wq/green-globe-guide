import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass,
  ArrowRight, ChevronDown, Flame, Stethoscope, Sparkles, CheckCircle,
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
  link: string;
}

/* ----------  ANIMATION VARIANTS  ---------- */
const FADE_IN: Variants = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
const STAGGER: Variants = { animate: { transition: { staggerChildren: 0.15 } } };

/* ----------  STATIC DATA  ---------- */
const FEATURED_DESTINATIONS: Destination[] = [
  { name: "California", status: "Recreational", country: "USA", image: "/dest-1.jpg", color: "bg-green-500/90", link: "/usa/california" },
  { name: "Colorado", status: "Recreational", country: "USA", image: "/dest-2.jpg", color: "bg-green-500/90", link: "/usa/colorado" },
  { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "/dest-3.jpg", color: "bg-amber-500/90", link: "/world" },
  { name: "Canada", status: "Recreational", country: "North America", image: "/dest-4.jpg", color: "bg-green-500/90", link: "/world" },
  { name: "Uruguay", status: "Recreational", country: "South America", image: "/dest-5.jpg", color: "bg-green-500/90", link: "/world" },
  { name: "Thailand", status: "Medical", country: "Asia", image: "/dest-6.jpg", color: "bg-amber-700/90", link: "/world" },
];

const STATS_DATA: StatItem[] = [
  { icon: Globe2, label: "Countries", count: 120, suffix: "+" },
  { icon: MapPin, label: "Destinations", count: 500, suffix: "+" },
  { icon: Building2, label: "Hotels", count: 300, suffix: "+" },
  { icon: Shield, label: "Accuracy", count: 94, suffix: "%" },
];

const FEATURES_DATA: FeatureItem[] = [
  { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location, ensuring you travel without worry.", link: "/usa" },
  { icon: Building2, title: "420 Hotels", desc: "Find and book cannabis-friendly accommodations for a comfortable stay.", link: "/hotels" },
  { icon: Plane, title: "Airport Rules", desc: "Essential information on flying with cannabis and airport regulations.", link: "/usa" },
  { icon: Map, title: "Interactive Maps", desc: "A visual, global guide to cannabis laws and regulations at a glance.", link: "/world" },
];

const BLOG_DATA: BlogItem[] = [
  { title: "Amsterdam Coffee Shops Guide", summary: "Discover the best spots, local etiquette, and legal tips for a perfect trip.", image: "/blog-amsterdam.jpg", link: "#" },
  { title: "Legal Cannabis in California", summary: "Everything you need to know about dispensaries and 420-friendly spots.", image: "/blog-california.jpg", link: "#" },
  { title: "Uruguay: The Pioneer", summary: "A deep dive into the world's first fully legalized country.", image: "/blog-uruguay.jpg", link: "#" },
];

/* ----------  COMPONENT  ---------- */
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) navigate(`/usa?search=${encodeURIComponent(finalTerm.trim())}`);
  };

  const scrollToStats = () => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      <Navigation />

      {/* ==========  HERO  ========== */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10 px-2"
        >
          {/* Badge with sparkle */}
          <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] transition-shadow">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Global Cannabis Travel Intelligence
          </Badge>

          {/* Fluid typography */}
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">The Green Globe</span>
            <br />
            <span className="text-foreground/90 font-light text-[clamp(1.8rem,6vw,4rem)]">Guide</span>
          </h1>

          <p className="text-[clamp(1.1rem,2.5vw,1.75rem)] text-muted-foreground font-light mt-6 max-w-4xl mx-auto leading-relaxed">
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations worldwide.
          </p>

          {/* Search bar with glow & micro-interaction */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10" />
              <Input
                placeholder="Search destinations (e.g. Thailand, California)..."
                className="pl-14 pr-28 h-16 bg-card/80 border-2 border-white/10 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl text-lg placeholder:text-muted-foreground/60 shadow-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                aria-label="Search cannabis destinations"
              />
              <Button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-xl bg-accent hover:bg-accent/90 transition-all z-20">
                Search
              </Button>
            </div>
          </div>

          {/* Quick tags with hover lift */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "🔥 California", term: "California", Icon: Flame },
              { label: "💊 Medical Only", term: "Medical", Icon: Stethoscope },
              { label: "🌍 Europe", term: "Europe", Icon: Globe2 },
              { label: "🏨 420 Hotels", term: "Hotels", Icon: Building2 },
            ].map((tag) => (
              <motion.button
                key={tag.term}
                onClick={() => navigate(`/usa?search=${tag.term}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition text-sm text-muted-foreground hover:text-white"
                aria-label={`Search ${tag.label}`}
              >
                <tag.Icon className="w-4 h-4 text-accent" />
                <span>{tag.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Scroll hint */}
          <button
            onClick={scrollToStats}
            aria-label="Scroll to statistics"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hidden md:block hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* ==========  STATS  ========== */}
      <section id="stats" className="py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
                  <stat.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.count} />
                  {stat.suffix}
                </div>
                <div className="text-lg text-muted-foreground font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  FEATURED DESTINATIONS  ========== */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Popular Destinations</h2>
            <p className="text-xl text-gray-400">Curated cannabis-friendly travel hotspots</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={FADE_IN}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={dest.link} aria-label={`View ${dest.name}`}>
                  <Card className="relative h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-2xl">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${dest.color} text-white border-none px-3 py-1 backdrop-blur-md`}>
                        {dest.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-3xl font-bold mb-1 transition-transform group-hover:translate-x-2">{dest.name}</h3>
                      <p className="text-lg text-gray-300 transition-transform group-hover:translate-x-2 delay-75">{dest.country}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  FEATURES  ========== */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Resources</h2>
            <p className="text-xl text-gray-400">Essential tools for the modern cannabis traveler</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES_DATA.map((feat) => (
              <motion.div key={feat.title} variants={FADE_IN} whileHover={{ y: -6 }}>
                <Link to={feat.link} aria-label={feat.title}>
                  <Card className="p-8 h-full bg-gray-900/50 border-white/10 hover:border-accent/30 hover:bg-gray-900 backdrop-blur-xl transition-all group">
                    <div className="w-14 h-14 mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <feat.icon className="w-7 h-7 text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">{feat.title}</h3>
                    <p className="text-gray-400 flex-grow leading-relaxed mb-4">{feat.desc}</p>
                    <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  BLOG  ========== */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto"
        >
          <motion.div variants={FADE_IN} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Travel Guides</h2>
            <p className="text-xl text-gray-400">In-depth articles for your next adventure</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_DATA.map((post) => (
              <motion.div key={post.title} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 shadow-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover transition-transform hover:scale-110"
                  />
                  <div className="p-8 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                    <p className="text-gray-400 flex-grow leading-relaxed mb-6">{post.summary}</p>
                    <Link to={post.link} className="group flex items-center gap-2 text-accent font-medium">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  INTERACTIVE MAP  ========== */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={STAGGER}
          className="container mx-auto text-center"
        >
          <motion.div variants={FADE_IN} className="mb-12">
            <Badge className="px-5 py-2 bg-accent/10 text-accent border-accent/30 mb-6 backdrop-blur-md">
              <Globe2 className="w-4 h-4 mr-2" />
              Interactive Global Map
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Global Legality</h2>
            <p className="text-xl text-gray-400">Tap any country to check cannabis laws instantly</p>
          </motion.div>

          <motion.div variants={FADE_IN} className="hidden md:block max-w-6xl mx-auto mb-12">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-accent/10 bg-black/40 backdrop-blur-sm p-4">
              <InteractiveWorldMap />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[100px] -z-10" />
            </div>
          </motion.div>

          <motion.div variants={FADE_IN} className="md:hidden mb-12">
            <ContinentSelector />
          </motion.div>

          <motion.div variants={FADE_IN} className="mb-12">
            <MapLegend />
          </motion.div>

          <motion.div variants={FADE_IN}>
            <Link to="/world">
              <Button size="lg" className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow rounded-2xl hover:scale-105 transition-transform">
                <Map className="w-5 h-5 mr-3" />
                Advanced Map & Filters
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==========  CTA  ========== */}
      <section className="py-20 px-4 bg-gradient-to-t from-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Travel?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get instant access to verified cannabis laws and 420-friendly hotels worldwide.
          </p>
          <Link to="/usa">
            <Button size="lg" className="h-16 px-12 text-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow rounded-2xl hover:scale-105 transition-transform">
              Start Exploring Now
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
