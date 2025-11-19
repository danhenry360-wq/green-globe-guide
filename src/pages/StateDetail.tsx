import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass, LucideIcon, Maximize2, ArrowRight, ChevronDown, Flame, Stethoscope } from "lucide-react";
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
  color: string; // Added color field
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

interface BlogItem {
  title: string;
  summary: string;
  image: string;
  link: string;
}

// --- Static Data ---
const FADE_IN_VARIANTS: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const STAGGER_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// UPDATED: Medical color is set to Golden Brown/Amber (bg-amber-700/90) as per the card and desktop legend.
const FEATURED_DESTINATIONS: Destination[] = [
  { name: "California", status: "Recreational", country: "USA", image: "🌴", color: "bg-green-500/90" },
  { name: "Colorado", status: "Recreational", country: "USA", image: "🏔️", color: "bg-green-500/90" },
  { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "🌷", color: "bg-amber-500/90" }, // Amber for Decriminalized
  { name: "Canada", status: "Recreational", country: "North America", image: "🍁", color: "bg-green-500/90" },
  { name: "Uruguay", status: "Recreational", country: "South America", image: "🌊", color: "bg-green-500/90" },
  { name: "Thailand", status: "Medical", country: "Asia", image: "🏝️", color: "bg-amber-700/90" }, // GOLDEN BROWN for Medical
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

const BLOG_DATA: BlogItem[] = [
  { 
    title: "Amsterdam Coffee Shops Guide", 
    summary: "Discover the best spots, local etiquette, and legal tips for a perfect trip.", 
    image: "/blog-amsterdam.jpg",
    link: "#"
  },
  { 
    title: "Legal Cannabis in California", 
    summary: "Everything you need to know about dispensaries and 420-friendly spots.", 
    image: "/blog-california.jpg",
    link: "#"
  },
  { 
    title: "Uruguay: The Pioneer", 
    summary: "A deep dive into the world's first fully legalized country.", 
    image: "/blog-uruguay.jpg",
    link: "#"
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) {
      navigate(`/usa?search=${encodeURIComponent(finalTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Function to smoothly scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('stats-section'); // Assuming stats is the next section
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[105vh] flex items-center justify-center px-4 md:px-6 overflow-hidden pt-20 pb-20 md:pb-0"> {/* Adjusted min-h to 105vh */}
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
          className="container mx-auto text-center relative z-10 py-8 md:py-24 px-2 md:px-0"
          initial="initial"
          animate="animate"
          variants={STAGGER_VARIANTS}
        >
          <motion.div variants={FADE_IN_VARIANTS} className="mb-6 md:mb-10">
            <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] transition-shadow duration-500">
              Global Cannabis Travel Intelligence
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                The Green Globe
              </span>
              <br />
              <span className="text-foreground/90 font-light text-4xl sm:text-5xl md:text-7xl">Guide</span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={FADE_IN_VARIANTS}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-10 md:mb-16 max-w-4xl mx-auto leading-relaxed px-2"
          >
            Navigate cannabis laws, discover 420-friendly accommodations, and explore travel regulations worldwide.
          </motion.p>

          <motion.div variants={FADE_IN_VARIANTS} className="max-w-3xl mx-auto mb-8 md:mb-12 px-1">
            <div className="relative group">
              {/* Enhanced Glow Effect on Search */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
              
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10" />
              
              <Input 
                placeholder="Search destinations (e.g. Thailand, California)..."
                className="pl-14 pr-28 md:pr-36 h-16 md:h-20 text-lg bg-card/80 border-2 border-white/10 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all font-light placeholder:text-muted-foreground/60 shadow-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
              <Button 
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-xl bg-accent hover:bg-accent/90 transition-all z-20 shadow-lg"
              >
                Search
              </Button>
            </div>
          </motion.div>

          {/* Quick Access Tags - Functional Shortcuts */}
          <motion.div variants={FADE_IN_VARIANTS} className="flex flex-wrap justify-center gap-3 mb-12 md:mb-20 px-2">
            {[
              { label: "🚀 Popular: California", term: "California", icon: Flame, color: "text-orange-400" },
              { label: "Medical Only", term: "Medical", icon: Stethoscope, color: "text-amber-700" }, // Medical tag color updated
              { label: "Europe Guide", term: "Europe", icon: Globe2, color: "text-purple-400" },
              { label: "420 Hotels", term: "Hotels", icon: Building2, color: "text-green-400" }
            ].map((tag, i) => (
               <button 
                 key={i}
                 onClick={() => handleSearch(tag.term)}
                 className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all text-sm md:text-base text-muted-foreground hover:text-white group"
               >
                 <tag.icon className={`w-4 h-4 ${tag.color} group-hover:scale-110 transition-transform`} />
                 <span>{tag.label}</span>
               </button>
            ))}
          </motion.div>
          
          {/* Scroll Indicator - NOW WITH FUNCTIONALITY */}
          <motion.button 
            onClick={scrollToNextSection} // Added onClick handler
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1, y: [0, 10, 0] }} 
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hidden md:block cursor-pointer hover:text-white transition-colors"
            aria-label="Scroll down to next section"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>

        </motion.div>
      </section>

      {/* Stats - Luxury Spacing. Added ID for scroll target */}
      <section id="stats-section" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-accent/5 to-transparent relative">
        <motion.div className="container mx-auto relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-12 lg:gap-16">
            {STATS_DATA.map((stat, i) => (
              <motion.div key={i} className="text-center group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
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

      {/* Popular Destinations - Spacious + Color distinction implemented */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-12 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Popular Destinations</h2>
              <p className="text-lg md:text-xl text-gray-400 px-4">Explore curated cannabis-friendly travel hotspots</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {FEATURED_DESTINATIONS.map((dest, i) => (
                <motion.div key={i} variants={FADE_IN_VARIANTS} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="relative h-72 md:h-96 overflow-hidden rounded-2xl cursor-pointer group bg-gray-900 border border-white/5 shadow-2xl">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('/dest-${i + 1}.jpg')` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-all duration-500" />
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                        <div className="absolute top-4 right-4">
                           {/* DYNAMIC COLOR IMPLEMENTED HERE */}
                           <Badge className={`${dest.color} text-white border-none text-sm px-3 py-1 backdrop-blur-md shadow-lg`}>
                             {dest.status}
                           </Badge>
                        </div>
                        <h3 className="text-3xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform">{dest.name}</h3>
                        <p className="text-lg font-medium text-gray-300 transform group-hover:translate-x-2 transition-transform delay-75">{dest.country}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-12 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Resources</h2>
              <p className="text-lg md:text-xl text-gray-400 px-4">Essential tools for the modern cannabis traveler</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {FEATURES_DATA.map((feature, i) => (
                <motion.div key={i} variants={FADE_IN_VARIANTS}>
                  <Link to={feature.link}>
                    <Card className="p-8 h-full bg-gray-900/50 border border-white/5 transition-all group hover:border-green-500/30 hover:bg-gray-900 hover:shadow-2xl hover:shadow-green-500/5 backdrop-blur-sm">
                      <div className="flex flex-col h-full">
                        <div className="w-14 h-14 mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 transition-colors">
                           <feature.icon className="w-7 h-7 text-green-500 transition-transform group-hover:scale-110" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-green-400 transition-colors">{feature.title}</h3>
                        <p className="text-base text-gray-400 flex-grow leading-relaxed mb-4">{feature.desc}</p>
                        <div className="mt-auto text-green-500 font-medium text-sm flex items-center group-hover:translate-x-2 transition-transform">
                          Explore <Compass className="w-4 h-4 ml-2" />
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

      {/* Blog / Travel Guides Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-12 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Travel Guides</h2>
              <p className="text-lg md:text-xl text-gray-400 px-4">In-depth articles for your next adventure</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_DATA.map((article, i) => (
                <motion.div key={i} variants={FADE_IN_VARIANTS} className="transition-all duration-300 hover:scale-[1.01]">
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 flex flex-col shadow-xl">
                    <div className="h-56 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10" />
                         <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative z-20">
                      <h3 className="text-2xl font-bold mb-3 text-white leading-tight">{article.title}</h3>
                      <p className="text-base text-gray-400 mb-8 flex-grow leading-relaxed">{article.summary}</p>
                      <Link to={article.link} className="mt-auto">
                        <Button variant="outline" className="w-full h-14 border-white/20 bg-transparent hover:bg-white/5 text-white hover:border-green-500 hover:text-green-500 text-base transition-all">
                          Read Article <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 md:py-32 px-2 md:px-6 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        {/* Subtle Map Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_70%)]" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_VARIANTS}
          >
            <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-16">
               <Badge className="px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 mb-8 backdrop-blur-md">
                 <Globe2 className="w-4 h-4 mr-2 inline" />
                 Interactive Global Map
               </Badge>
              
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight px-2">
                <span className="bg-gradient-to-r from-white via-accent to-gold bg-clip-text text-transparent">
                  Global Legality
                </span>
              </h2>
              
              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed px-4">
                Tap any country or continent to check cannabis laws instantly.
              </p>
            </motion.div>

            {/* Desktop Map - Dashboard Container */}
            <motion.div 
              variants={FADE_IN_VARIANTS} 
              className="hidden md:block max-w-6xl mx-auto mb-16"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-accent/10 bg-black/40 backdrop-blur-sm">
                 {/* The Map Component */}
                 <div className="pt-4 pb-4 px-4"> {/* Padding adjusted to remove the space left by the header */}
                    <InteractiveWorldMap className="transform transition-all hover:scale-[1.01]" />
                 </div>

                 {/* Decorative Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Mobile Continent Selector */}
            <motion.div 
              variants={FADE_IN_VARIANTS} 
              className="md:hidden w-full mb-12"
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

            <motion.div variants={FADE_IN_VARIANTS} className="px-2 mb-16">
              <MapLegend />
            </motion.div>

            {/* Updated Map Button */}
            <motion.div 
              variants={FADE_IN_VARIANTS}
              className="text-center px-4"
            >
              <Link to="/world">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-auto py-5 px-10 text-lg font-semibold bg-gradient-to-r from-accent to-accent/80 whitespace-normal leading-tight border border-white/10 shadow-xl shadow-accent/20 hover:scale-105 transition-transform"
                >
                  <Maximize2 className="w-6 h-6 mr-4 flex-shrink-0" />
                  <div className="flex flex-col items-start text-left">
                     <span>Advanced Map & Filters</span>
                     <span className="text-xs font-normal opacity-80 text-white/80">View full data, lists, and search tools</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={FADE_IN_VARIANTS}
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-8 px-2 tracking-tight">Ready to Travel?</h2>
          <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
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
