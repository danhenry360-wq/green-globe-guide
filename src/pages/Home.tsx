import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass, LucideIcon, Maximize2 } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";
import ContinentSelector from "@/components/ContinentSelector";
import MapLegend from "@/components/MapLegend";
import heroImage from "@/assets/hero-cannabis-travel.jpg";

// --- Types & Interfaces ---
interface Destination {
  name: string;
  status: string;
  country: string;
  image: string;
}

interface StatItem {
  icon: LucideIcon;
  label: string;
  count: number;
  suffix: string;
}

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}

// --- Static Data ---
const FADE_IN_VARIANTS: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const STAGGER_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FEATURED_DESTINATIONS: Destination[] = [
  { name: "California", status: "Recreational", country: "USA", image: "🌴" },
  { name: "Colorado", status: "Recreational", country: "USA", image: "🏔️" },
  { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "🌷" },
  { name: "Canada", status: "Recreational", country: "North America", image: "🍁" },
  { name: "Uruguay", status: "Recreational", country: "South America", image: "🌊" },
  { name: "Thailand", status: "Medical", country: "Asia", image: "🏝️" },
];

const STATS_DATA: StatItem[] = [
  { icon: Globe2, label: "Countries", count: 120, suffix: "+" },
  { icon: MapPin, label: "Destinations", count: 500, suffix: "+" },
  { icon: Building2, label: "Hotels", count: 300, suffix: "+" },
  { icon: Shield, label: "Accuracy", count: 94, suffix: "%" }
];

const FEATURES_DATA: FeatureItem[] = [
  { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location, ensuring you travel without worry.", link: "/usa" },
  { icon: Building2, title: "420 Hotels", desc: "Find and book cannabis-friendly accommodations for a comfortable stay.", link: "/hotels" },
  { icon: Plane, title: "Airport Rules", desc: "Essential information on flying with cannabis and airport regulations.", link: "/usa" },
  { icon: Map, title: "Interactive Maps", desc: "A visual, global guide to cannabis laws and regulations at a glance.", link: "/world" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 md:px-6 overflow-hidden pt-20 pb-10 md:pb-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-accent/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        
        <motion.div 
          className="container mx-auto text-center relative z-10 py-4 md:py-20 px-2 md:px-0"
          initial="initial"
          animate="animate"
          variants={STAGGER_VARIANTS}
        >
          <motion.div variants={FADE_IN_VARIANTS} className="mb-6 md:mb-8">
            <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20">
              Global Cannabis Travel Intelligence
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                The Green Globe
              </span>
              <br />
              <span className="text-foreground/90 font-light text-4xl sm:text-5xl md:text-7xl">Guide</span>
            </h1>
          </motion.div>
          
          {/* INCREASED FONT SIZE */}
          <motion.p 
            variants={FADE_IN_VARIANTS}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2"
          >
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations worldwide.
          </motion.p>

          <motion.div variants={FADE_IN_VARIANTS} className="max-w-3xl mx-auto mb-10 md:mb-16 px-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-gold/30 to-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
              
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10" />
              
              {/* TALLER INPUT FOR MOBILE */}
              <Input 
                placeholder="Search destinations..."
                className="pl-14 pr-28 md:pr-36 h-16 md:h-20 text-lg bg-card/90 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all font-light placeholder:text-muted-foreground/60 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
              <Button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-xl bg-accent hover:bg-accent/90 transition-all z-20"
              >
                Search
              </Button>
            </div>
          </motion.div>

          {/* Quick Link Cards - TALLER CARDS */}
          <motion.div variants={FADE_IN_VARIANTS} className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-4 md:gap-6 justify-center px-1">
            {[
              { to: "/usa", icon: Globe2, title: "USA", sub: "States Guide", color: "accent" },
              { to: "/world", icon: Map, title: "World", sub: "Legal Map", color: "gold" },
              { to: "/hotels", icon: Building2, title: "Hotels", sub: "420 Stays", color: "accent" },
              { to: "/tours", icon: Compass, title: "Tours", sub: "Experiences", color: "gold" },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="w-full sm:w-64">
                <Card className={`group h-full p-5 md:p-6 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all hover:border-${item.color} hover:bg-card/60 hover:shadow-lg`}>
                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-${item.color}/20 to-${item.color}/5 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0`}>
                      <item.icon className={`w-6 h-6 md:w-8 md:h-8 text-${item.color}`} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground font-light">{item.sub}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats - REDUCED SPACING (py-12 instead of 32) */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-transparent via-accent/5 to-transparent relative">
        <motion.div className="container mx-auto relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-12 lg:gap-16">
            {STATS_DATA.map((stat, i) => (
              <motion.div key={i} className="text-center group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                  <stat.icon className="w-7 h-7 md:w-10 md:h-10 text-accent" />
                </div>
                <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.count} />{stat.suffix}
                </div>
                <div className="text-base md:text-lg text-muted-foreground font-light tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations - REDUCED SPACING */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-8 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Popular Destinations</h2>
              <p className="text-lg md:text-xl text-gray-400 px-4">Explore cannabis-friendly travel hotspots</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {FEATURED_DESTINATIONS.map((dest, i) => (
                <motion.div key={i} variants={FADE_IN_VARIANTS} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="relative h-72 md:h-80 overflow-hidden rounded-xl cursor-pointer group bg-gray-900 border border-gray-800 shadow-lg">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/dest-${i + 1}.jpg')` }}>
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                        <Badge className="absolute top-4 right-4 bg-green-500/80 text-white border-none text-sm px-3 py-1">
                          {dest.status}
                        </Badge>
                        <h3 className="text-3xl font-bold mb-2">{dest.name}</h3>
                        <p className="text-lg font-medium text-gray-300">{dest.country}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources - REDUCED SPACING */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-8 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Resources</h2>
              <p className="text-lg md:text-xl text-gray-400 px-4">Comprehensive cannabis travel tools</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {FEATURES_DATA.map((feature, i) => (
                <motion.div key={i} variants={FADE_IN_VARIANTS}>
                  <Link to={feature.link}>
                    <Card className="p-6 h-full bg-gray-900 border border-gray-800 transition-all group hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="flex flex-col h-full">
                        <feature.icon className="w-12 h-12 mb-4 text-green-500 transition-transform group-hover:scale-110" />
                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-green-400 transition-colors">{feature.title}</h3>
                        <p className="text-base md:text-lg text-gray-400 flex-grow leading-relaxed">{feature.desc}</p>
                        <div className="mt-4 text-green-500 font-medium text-sm flex items-center">
                          Explore <Compass className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section - IMPROVED WEB VIEW CONTAINER */}
      <section className="py-12 md:py-20 px-2 md:px-6 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-10">
               <Badge className="px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 mb-6">
                 <Globe2 className="w-4 h-4 mr-2 inline" />
                 Interactive Global Map
               </Badge>
              
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight px-2">
                <span className="bg-gradient-to-r from-white via-accent to-gold bg-clip-text text-transparent">
                  Global Legality
                </span>
              </h2>
              
              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed px-4">
                Tap any country or continent to check cannabis laws.
              </p>
            </motion.div>

            {/* Desktop Map - WRAPPED IN "DASHBOARD" CONTAINER FOR BETTER LOOKS */}
            <motion.div 
              variants={FADE_IN_VARIANTS} 
              className="hidden md:block max-w-6xl mx-auto mb-10"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-accent/10 bg-black/40 backdrop-blur-sm">
                 {/* Dashboard Header to make it look purposeful */}
                 <div className="absolute top-0 left-0 right-0 h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 z-20">
                    <div className="text-xs text-muted-foreground font-mono tracking-widest uppercase flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Live System Data
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">G-M-2024-X</div>
                 </div>
                 
                 {/* The Map Component */}
                 <div className="pt-12 pb-4 px-4">
                    <InteractiveWorldMap className="transform transition-all hover:scale-[1.01]" />
                 </div>

                 {/* Decorative Background Glow for the Map */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Mobile Continent Selector - KEPT EXACTLY AS REQUESTED */}
            <motion.div 
              variants={FADE_IN_VARIANTS} 
              className="md:hidden w-full mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-gold/20 to-accent/20 rounded-3xl blur-xl opacity-40" />
                <div className="relative bg-gray-950/80 backdrop-blur-xl border border-accent/20 rounded-2xl p-3 sm:p-6 shadow-2xl w-full overflow-hidden">
                  <div className="w-full">
                    <ContinentSelector />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={FADE_IN_VARIANTS} className="px-2 mb-10">
              <MapLegend />
            </motion.div>

            {/* UPDATED BUTTON - MORE DESCRIPTIVE */}
            <motion.div 
              variants={FADE_IN_VARIANTS}
              className="text-center px-4"
            >
              <Link to="/world">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-auto py-5 px-8 text-lg font-semibold bg-gradient-to-r from-accent to-accent/80 whitespace-normal leading-tight border border-white/10 shadow-xl shadow-accent/20"
                >
                  <Maximize2 className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div className="flex flex-col items-start text-left">
                     <span>Advanced Map & Filters</span>
                     <span className="text-xs font-normal opacity-80">View full data, lists, and search tools</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - REDUCED SPACING */}
      <section className="py-12 md:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={FADE_IN_VARIANTS}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 px-2">Ready to Travel?</h2>
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
            Get instant access to verified cannabis laws and 420-friendly hotels.
          </p>
          <Link to="/usa">
            <Button size="lg" className="h-16 px-12 text-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow rounded-xl">
              Start Exploring
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
