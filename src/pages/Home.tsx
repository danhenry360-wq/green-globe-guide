import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Shield, Clock, Globe2, Plane, Building2, Map, Newspaper, Compass } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";
import ContinentSelector from "@/components/ContinentSelector";
import MapLegend from "@/components/MapLegend";
import heroImage from "@/assets/hero-cannabis-travel.jpg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/usa?search=${encodeURIComponent(searchTerm)}`;
    }
  };
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featuredDestinations = [
    { name: "California", status: "Recreational", country: "USA", image: "🌴" },
    { name: "Colorado", status: "Recreational", country: "USA", image: "🏔️" },
    { name: "Netherlands", status: "Decriminalized", country: "Europe", image: "🌷" },
    { name: "Canada", status: "Recreational", country: "North America", image: "🍁" },
    { name: "Uruguay", status: "Recreational", country: "South America", image: "🌊" },
    { name: "Thailand", status: "Medical", country: "Asia", image: "🏝️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        
        <motion.div 
          className="container mx-auto text-center relative z-10 py-32"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeIn} className="mb-8">
            <Badge className="mb-6 px-6 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-all duration-300">
              Global Cannabis Travel Intelligence
            </Badge>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                The Green Globe
              </span>
              <br />
              <span className="text-foreground/90 font-light">Guide</span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            Navigate cannabis laws, discover 420-friendly accommodations,
            <br className="hidden md:block" />
            and explore travel regulations worldwide with confidence.
          </motion.p>

          <motion.div variants={fadeIn} className="max-w-3xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-gold/30 to-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-gold/20 blur-xl opacity-50 rounded-2xl" />
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10" />
              <Input 
                placeholder="Search destinations, accommodations, or regulations..."
                className="pl-16 pr-6 h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/20 font-light placeholder:text-muted-foreground/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button 
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-14 px-8 text-lg rounded-xl bg-accent hover:bg-accent/90 transition-all duration-300 z-20"
              >
                Search
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center">
            <Link to="/usa">
              <Card className="group w-64 p-6 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Globe2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">USA Guide</h3>
                  <p className="text-sm text-muted-foreground font-light">State-by-state regulations</p>
                </div>
              </Card>
            </Link>
            <Link to="/world">
              <Card className="group w-64 p-6 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Map className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">World Guide</h3>
                  <p className="text-sm text-muted-foreground font-light">Global legality map</p>
                </div>
              </Card>
            </Link>
            <Link to="/hotels">
              <Card className="group w-64 p-6 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">420 Hotels</h3>
                  <p className="text-sm text-muted-foreground font-light">Cannabis-friendly stays</p>
                </div>
              </Card>
            </Link>
            <Link to="/tours">
              <Card className="group w-64 p-6 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Compass className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">Tours</h3>
                  <p className="text-sm text-muted-foreground font-light">Guided 420-friendly tours</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Premium Trust & Stats */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent relative overflow-hidden">
        <motion.div className="container mx-auto relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {[
              { icon: Globe2, label: "Countries Covered", count: 120, suffix: "+" },
              { icon: MapPin, label: "Travel Destinations", count: 500, suffix: "+" },
              { icon: Building2, label: "420-Friendly Hotels", count: 300, suffix: "+" },
              { icon: Shield, label: "Data Accuracy", count: 94, suffix: "%" }
            ].map((stat, i) => (
              <motion.div key={i} className="text-center group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-accent/20">
                  <stat.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.count} />{stat.suffix}
                </div>
                <div className="text-muted-foreground text-base font-light tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Popular Destinations</h2>
              <p className="text-xl text-gray-400">Explore cannabis-friendly travel hotspots around the world</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((dest, i) => (
                <motion.div key={i} variants={fadeIn} whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 255, 0, 0.2)" }} transition={{ duration: 0.3 }}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="relative h-72 overflow-hidden rounded-xl cursor-pointer group bg-gray-900 border border-gray-800">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/dest-${i + 1}.jpg')` }}>
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                        <Badge className="absolute top-4 right-4 bg-green-500/80 text-white border-none text-xs">
                          {dest.status}
                        </Badge>
                        <h3 className="text-3xl font-bold mb-1">{dest.name}</h3>
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

      {/* Everything You Need to Know */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Everything You Need to Know</h2>
              <p className="text-xl text-gray-400">Comprehensive cannabis travel resources at your fingertips</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location, ensuring you travel without worry.", link: "/usa" },
                { icon: Building2, title: "420 Hotels", desc: "Find and book cannabis-friendly accommodations for a comfortable stay.", link: "/hotels" },
                { icon: Plane, title: "Airport Rules", desc: "Essential information on flying with cannabis and airport regulations.", link: "/usa" },
                { icon: Map, title: "Interactive Maps", desc: "A visual, global guide to cannabis laws and regulations at a glance.", link: "/world" },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link to={feature.link}>
                    <Card className="p-6 h-full bg-gray-900 border border-gray-800 transition-all duration-300 group hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="flex flex-col h-full">
                        <feature.icon className="w-10 h-10 mb-4 text-green-500 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">{feature.title}</h3>
                        <p className="text-sm text-gray-400 flex-grow">{feature.desc}</p>
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

      {/* Featured Blog / Travel Guides Section */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Featured Travel Guides</h2>
              <p className="text-xl text-gray-400">In-depth articles and tips for your next cannabis-friendly adventure</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "The Ultimate Guide to Amsterdam's Coffee Shops", 
                  summary: "Discover the best coffee shops, local etiquette, and legal tips for a perfect trip to the Netherlands.", 
                  image: "/blog-amsterdam.jpg",
                  link: "#"
                },
                { 
                  title: "Navigating Legal Cannabis in California", 
                  summary: "Everything you need to know about dispensaries, consumption laws, and 420-friendly spots in the Golden State.", 
                  image: "/blog-california.jpg",
                  link: "#"
                },
                { 
                  title: "Uruguay: South America's Cannabis Pioneer", 
                  summary: "A deep dive into the world's first country to fully legalize cannabis and what it means for travelers.", 
                  image: "/blog-uruguay.jpg",
                  link: "#"
                },
              ].map((article, i) => (
                <motion.div key={i} variants={fadeIn} className="transition-all duration-300 hover:scale-[1.02]">
                  <Card className="h-full overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{article.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{article.summary}</p>
                      <Link to={article.link}>
                        <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500/10">
                          Read Article
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

      {/* Ultra-Professional Interactive World Map Section */}
      <section className="py-28 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[150px] animate-pulse" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Hero-style header */}
            <motion.div variants={fadeIn} className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <Badge className="px-6 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-all duration-300">
                  <Globe2 className="w-4 h-4 mr-2 inline" />
                  Interactive Global Map
                </Badge>
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-accent to-gold bg-clip-text text-transparent">
                  Explore Cannabis Legality
                </span>
                <br />
                <span className="text-white/90 font-light text-4xl md:text-5xl">Worldwide</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Tap any country to check cannabis laws, restrictions, and traveler guidance.
              </p>
            </motion.div>

            {/* Desktop: Full Interactive Map */}
            <motion.div 
              variants={fadeIn} 
              className="hidden md:block max-w-6xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-gold/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative">
                  <InteractiveWorldMap className="transform transition-all duration-500 hover:scale-[1.01]" />
                </div>
              </div>
            </motion.div>

            {/* Mobile: Continent Selector */}
            <motion.div 
              variants={fadeIn} 
              className="md:hidden max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-gold/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-gray-950/50 backdrop-blur-xl border-2 border-accent/30 rounded-2xl p-6 shadow-2xl shadow-accent/20">
                  <ContinentSelector />
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div variants={fadeIn}>
              <MapLegend />
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              variants={fadeIn}
              className="text-center mt-16"
            >
              <Link to="/world">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-semibold px-12 py-6 text-lg rounded-xl shadow-2xl shadow-accent/30 transition-all duration-500 hover:scale-105 hover:shadow-accent/50 border border-accent/50"
                >
                  <Map className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Open Full Interactive Map
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Cannabis-Friendly Trip</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant access to verified cannabis laws, 420-friendly hotels, and travel tips for 120+ countries
          </p>
          <Link to="/usa">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-glow">
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
