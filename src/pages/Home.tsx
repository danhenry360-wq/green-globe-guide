import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Shield, Globe2, Plane, Building2, Map, Compass, TrendingUp, Zap } from "lucide-react";

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

  const stats = [
    { icon: Globe2, label: "Countries Covered", value: "120+" },
    { icon: MapPin, label: "Travel Destinations", value: "500+" },
    { icon: Building2, label: "420-Friendly Hotels", value: "300+" },
    { icon: TrendingUp, label: "Data Accuracy", value: "94%" }
  ];

  const mainCards = [
    { icon: Globe2, title: "USA Guide", desc: "State-by-state regulations", link: "/usa" },
    { icon: Map, title: "World Guide", desc: "Global legality map", link: "/world" },
    { icon: Building2, title: "420 Hotels", desc: "Cannabis-friendly stays", link: "/hotels" },
    { icon: Compass, title: "Tours", desc: "Guided experiences", link: "/tours" }
  ];

  const destinations = [
    { name: "California", status: "Recreational", country: "USA" },
    { name: "Colorado", status: "Recreational", country: "USA" },
    { name: "Amsterdam", status: "Decriminalized", country: "Netherlands" },
    { name: "Toronto", status: "Recreational", country: "Canada" },
    { name: "Montevideo", status: "Recreational", country: "Uruguay" },
    { name: "Bangkok", status: "Medical", country: "Thailand" }
  ];

  const features = [
    { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location, ensuring you travel without worry.", link: "/usa" },
    { icon: Building2, title: "420 Hotels", desc: "Find and book cannabis-friendly accommodations for a comfortable stay.", link: "/hotels" },
    { icon: Plane, title: "Airport Rules", desc: "Essential information on flying with cannabis and airport regulations.", link: "/usa" },
    { icon: Map, title: "Interactive Maps", desc: "A visual, global guide to cannabis laws and regulations at a glance.", link: "/world" }
  ];

  const blogArticles = [
    { 
      title: "The Ultimate Guide to Amsterdam's Coffee Shops", 
      summary: "Discover the best coffee shops, local etiquette, and legal tips for a perfect trip to the Netherlands.",
      category: "Travel Guide"
    },
    { 
      title: "Navigating Legal Cannabis in California", 
      summary: "Everything you need to know about dispensaries, consumption laws, and 420-friendly spots.",
      category: "Legal Guide"
    },
    { 
      title: "Uruguay: South America's Cannabis Pioneer", 
      summary: "A deep dive into the world's first country to fully legalize cannabis and what it means for travelers.",
      category: "Destination Guide"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-16 pb-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <motion.div 
          className="container mx-auto text-center relative z-10 max-w-5xl"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="mb-6 flex justify-center">
            <Badge className="px-4 py-2 text-xs sm:text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all">
              🌍 Global Cannabis Travel Intelligence
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={fadeIn}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Green Globe
            </span>
            <br className="hidden sm:block" />
            <span className="text-white/90 font-light text-2xl sm:text-4xl md:text-5xl">Guide</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeIn}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light mb-10 leading-relaxed"
          >
            Navigate cannabis laws, discover 420-friendly accommodations,
            <br className="hidden sm:block" />
            and explore travel regulations worldwide with confidence.
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeIn} className="w-full max-w-3xl mx-auto mb-12 px-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-cyan-500/30 blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative flex items-center gap-2 bg-gray-900/80 backdrop-blur-xl border-2 border-gray-700 rounded-2xl p-2 hover:border-green-500/50 transition-colors">
                <Search className="w-5 h-5 text-green-400 ml-3 flex-shrink-0" />
                <Input 
                  placeholder="Search destinations, hotels, or regulations..."
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-gray-500 focus:outline-none text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl px-4 sm:px-6 py-2 flex-shrink-0 transition-all hover:scale-105"
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Cards Grid */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mainCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link key={idx} to={card.link}>
                  <Card className="group p-5 sm:p-6 bg-gray-900/60 backdrop-blur-sm border-2 border-gray-700 hover:border-green-500 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer h-full">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-green-400 group-hover:text-green-300" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors">{card.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">{card.desc}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-green-500/5 to-transparent relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className="text-center group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-gray-700">
                    <StatIcon className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Section Header */}
            <motion.div variants={fadeIn} className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Popular Destinations</h2>
              <p className="text-base sm:text-lg text-gray-400">Explore cannabis-friendly travel hotspots around the world</p>
            </motion.div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {destinations.map((dest, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl cursor-pointer group bg-gray-900 border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                      {/* Background Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 group-hover:from-green-900/20 group-hover:via-blue-900/20 group-hover:to-purple-900/20 transition-all duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 text-white z-10">
                        <Badge className="w-fit bg-green-500/80 text-white border-none text-xs font-semibold">
                          {dest.status}
                        </Badge>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-1">{dest.name}</h3>
                          <p className="text-sm sm:text-base text-gray-200">{dest.country}</p>
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

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Section Header */}
            <motion.div variants={fadeIn} className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Everything You Need to Know</h2>
              <p className="text-base sm:text-lg text-gray-400">Comprehensive cannabis travel resources at your fingertips</p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {features.map((feature, i) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div key={i} variants={fadeIn}>
                    <Link to={feature.link}>
                      <Card className="p-5 sm:p-6 h-full bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-500 group hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 hover:bg-gray-900/80 cursor-pointer">
                        <div className="flex flex-col h-full gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <FeatureIcon className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-400 transition-colors">{feature.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 flex-grow leading-relaxed">{feature.desc}</p>
                          <div className="text-green-400 font-semibold text-xs sm:text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                            Explore <Compass className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Section Header */}
            <motion.div variants={fadeIn} className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Featured Travel Guides</h2>
              <p className="text-base sm:text-lg text-gray-400">In-depth articles and tips for your next cannabis-friendly adventure</p>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogArticles.map((article, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 transition-all duration-500 group hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10">
                    {/* Image Placeholder */}
                    <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-green-600/20 via-blue-600/20 to-purple-600/20 group-hover:from-green-600/40 group-hover:via-blue-600/40 group-hover:to-purple-600/40 transition-all duration-500 flex items-center justify-center">
                      <Map className="w-12 h-12 text-green-400/50" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <Badge className="mb-3 bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-semibold">
                        {article.category}
                      </Badge>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">{article.summary}</p>
                      <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 rounded-xl font-semibold text-sm transition-all">
                        Read Article
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== INTERACTIVE MAP SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-green-500/5 via-blue-500/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12 sm:mb-16">
              <Badge className="inline-block px-4 py-2 text-xs sm:text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 mb-6">
                <Globe2 className="w-4 h-4 mr-2 inline" />
                Interactive Global Map
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Explore Cannabis Legality
                </span>
                <br />
                <span className="text-white/90 font-light text-2xl sm:text-3xl md:text-4xl">Worldwide</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 font-light mt-4 max-w-3xl mx-auto">
                Tap any country to check cannabis laws, restrictions, and traveler guidance.
              </p>
            </motion.div>

            {/* Interactive Map Container */}
            <motion.div variants={fadeIn}>
              <Card className="w-full bg-gray-900/60 backdrop-blur-sm border-2 border-green-500/30 rounded-3xl overflow-hidden">
                {/* Map Display */}
                <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden group p-6">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-500/20"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Map Content */}
                  <div className="relative z-10 text-center max-w-md">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/30 to-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 animate-spin" style={{ animationDuration: "4s" }} />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">Interactive World Map</h3>
                    <p className="text-xs sm:text-base text-gray-400 mb-6">
                      Advanced map integration with real-time data, interactive country selection, and detailed legality information.
                    </p>
                    <Link to="/world">
                      <Button className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl px-6 sm:px-8 py-2 transition-all hover:scale-105 shadow-lg shadow-green-500/30 w-full sm:w-auto">
                        <Map className="w-5 h-5 mr-2" />
                        Open Full Map
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats Grid Below Map */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-900/40 border-t border-gray-800">
                  {[
                    { label: "120+ Countries", icon: Globe2 },
                    { label: "500+ Destinations", icon: MapPin },
                    { label: "300+ Hotels", icon: Building2 },
                    { label: "Real-time Data", icon: Zap }
                  ].map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={idx} className="text-center">
                        <ItemIcon className="w-5 h-5 text-green-400 mx-auto mb-2" />
                        <p className="text-xs sm:text-sm font-bold text-white line-clamp-2">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />
        
        <motion.div 
          className="container mx-auto text-center relative z-10 max-w-4xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Plan Your Cannabis-Friendly Trip</h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed px-4">
            Get instant access to verified cannabis laws, 420-friendly hotels, and travel tips for 120+ countries. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/usa">
              <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/hotels">
              <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-green-400 font-bold px-8 py-3 rounded-xl transition-all border border-green-500/30 hover:border-green-500">
                <Building2 className="w-5 h-5 mr-2" />
                Browse Hotels
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
