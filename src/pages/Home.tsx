import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Shield, Clock, Globe2, Plane, Building2, Map, Newspaper, Compass, ChevronRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";
import ContinentSelector from "@/components/ContinentSelector";
import MapLegend from "@/components/MapLegend";
import heroImage from "@/assets/hero-cannabis-travel.jpg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

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

  // Continent data matching your design
  const continents = [
    { name: "Americas", count: "8 countries", color: "from-blue-500/20 to-blue-600/20" },
    { name: "Europe", count: "8 countries", color: "from-green-500/20 to-green-600/20" },
    { name: "Asia", count: "4 countries", color: "from-purple-500/20 to-purple-600/20" },
    { name: "Africa", count: "4 countries", color: "from-yellow-500/20 to-yellow-600/20" },
    { name: "Oceania", count: "2 countries", color: "from-orange-500/20 to-orange-600/20" },
  ];

  // Country data for Europe (as shown in your design)
  const europeCountries = [
    { name: "Netherlands", status: "Decriminalized", description: "Tolerated in coffee shops" },
    { name: "Spain", status: "Decriminalized", description: "Legal in private cannabis clubs" },
    { name: "Portugal", status: "Decriminalized", description: "Decriminalized all drugs in 2001" },
    { name: "Germany", status: "Recreational", description: "Legalized for recreational use in 2024" },
    { name: "Switzerland", status: "Medical Only", description: "Medical use legal" },
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

          <motion.div variants={fadeIn} className="flex flex-wrap gap-6 justify-center">
            <Link to="/usa">
              <Card className="group w-72 p-8 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Globe2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">USA Guide</h3>
                  <p className="text-sm text-muted-foreground font-light">State-by-state regulations</p>
                </div>
              </Card>
            </Link>
            <Link to="/world">
              <Card className="group w-72 p-8 bg-card/40 border-2 border-border/50 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 cursor-pointer hover:bg-card/60">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Map className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">World Guide</h3>
                  <p className="text-sm text-muted-foreground font-light">Global legality map</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Premium Trust & Stats */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent relative overflow-hidden">
        <motion.div className="container mx-auto relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: Globe2, label: "Countries Covered", count: 120, suffix: "+" },
              { icon: MapPin, label: "Travel Destinations", count: 500, suffix: "+" },
              { icon: Building2, label: "420-Friendly Hotels", count: 300, suffix: "+" },
              { icon: Shield, label: "Data Accuracy", count: 94, suffix: "%" }
            ].map((stat, i) => (
              <motion.div key={i} className="text-center group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-accent/20">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.count} />{stat.suffix}
                </div>
                <div className="text-muted-foreground text-sm font-light tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive World Map Section - Fixed Mobile View */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[100px] animate-pulse" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Cannabis Travel Guide
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Explore Cannabis Legality Worldwide
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tap any country to check cannabis laws, restrictions, and traveler guidance.
              </p>
            </motion.div>

            {/* Desktop: Full Interactive Map */}
            <motion.div 
              variants={fadeIn} 
              className="hidden md:block max-w-6xl mx-auto mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-gold/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative">
                  <InteractiveWorldMap className="transform transition-all duration-500 hover:scale-[1.01]" />
                </div>
              </div>
            </motion.div>

            {/* Mobile: Continent Selector - Fixed Layout */}
            <motion.div 
              variants={fadeIn} 
              className="md:hidden space-y-4 mb-8"
            >
              {selectedContinent ? (
                <div className="space-y-4">
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedContinent(null)}
                    className="flex items-center text-accent text-sm mb-4"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                    Back to Continents
                  </button>
                  
                  {/* Countries List */}
                  <div className="space-y-3">
                    {europeCountries.map((country, index) => (
                      <motion.div
                        key={country.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4 bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-white">{country.name}</h3>
                            <Badge className={
                              country.status === "Recreational" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                              country.status === "Decriminalized" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                              "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }>
                              {country.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{country.description}</p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Continents Grid - Fixed spacing */
                <div className="grid grid-cols-1 gap-3">
                  {continents.map((continent, index) => (
                    <motion.div
                      key={continent.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`p-4 bg-gradient-to-r ${continent.color} border border-gray-700 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                        onClick={() => setSelectedContinent(continent.name)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{continent.name}</h3>
                            <p className="text-sm text-gray-400">{continent.count}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Legend */}
            <motion.div variants={fadeIn} className="mb-8">
              <MapLegend />
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <Link to="/world">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-semibold px-8 py-4 text-base rounded-xl shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 border border-accent/50"
                >
                  <Map className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Open Full Interactive Map
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
              <h2 className="text-3xl font-bold mb-4 text-white">Popular Destinations</h2>
              <p className="text-lg text-gray-400">Explore cannabis-friendly travel hotspots around the world</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, i) => (
                <motion.div key={i} variants={fadeIn} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="relative h-64 overflow-hidden rounded-xl cursor-pointer group bg-gray-900 border border-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                        <span className="text-4xl">{dest.image}</span>
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                        <Badge className="absolute top-4 right-4 bg-green-500/80 text-white border-none text-xs">
                          {dest.status}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                        <p className="text-base font-medium text-gray-300">{dest.country}</p>
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
              <h2 className="text-3xl font-bold mb-4 text-white">Everything You Need to Know</h2>
              <p className="text-lg text-gray-400">Comprehensive cannabis travel resources at your fingertips</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location", link: "/usa" },
                { icon: Building2, title: "420 Hotels", desc: "Find cannabis-friendly accommodations", link: "/hotels" },
                { icon: Plane, title: "Airport Rules", desc: "Flying with cannabis regulations", link: "/usa" },
                { icon: Map, title: "Interactive Maps", desc: "Visual guide to cannabis laws", link: "/world" },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link to={feature.link}>
                    <Card className="p-4 h-full bg-gray-900 border border-gray-800 transition-all duration-300 group hover:border-green-500/50">
                      <div className="flex flex-col h-full">
                        <feature.icon className="w-8 h-8 mb-3 text-green-500 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">{feature.title}</h3>
                        <p className="text-xs text-gray-400 flex-grow">{feature.desc}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
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
          <h2 className="text-3xl font-bold mb-4">Plan Your Cannabis-Friendly Trip</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get instant access to verified cannabis laws, 420-friendly hotels, and travel tips
          </p>
          <Link to="/usa">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
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
