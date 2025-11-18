import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Shield, Clock, Globe2, Plane, Building2, Map, Newspaper, Compass } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const Home = () => {
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
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section (Task 1) */}
      <section 
        className="relative pt-40 pb-32 px-4 text-white overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }} // Placeholder for premium background image
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h1 
            variants={fadeIn}
            className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight"
          >
            THE GREEN GLOBE GUIDE
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-3xl text-green-300 font-medium mb-12 max-w-4xl mx-auto"
          >
            Find cannabis laws, hotels, and rules worldwide.
          </motion.p>

          {/* Redesigned Search Bar */}
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-400 z-10" />
              <Input 
                placeholder="Search country, state, city, hotel, or airport..."
                className="pl-14 h-16 text-xl bg-black/70 border border-green-500/30 focus:border-green-500 focus:ring-green-500 backdrop-blur-md rounded-xl relative z-10 transition-all duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Guide Buttons (Task 2) */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-6 justify-center">
            <Link to="/usa">
              <Card className="w-64 p-6 bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer">
                <div className="flex flex-col items-center">
                  <Globe2 className="w-10 h-10 text-green-400 mb-3" />
                  <h3 className="text-xl font-semibold mb-1">USA Guide</h3>
                  <p className="text-sm text-gray-400">State-by-state laws</p>
                </div>
              </Card>
            </Link>
            <Link to="/world">
              <Card className="w-64 p-6 bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer">
                <div className="flex flex-col items-center">
                  <MapPin className="w-10 h-10 text-green-400 mb-3" />
                  <h3 className="text-xl font-semibold mb-1">World Guide</h3>
                  <p className="text-sm text-gray-400">Global legality map</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Stats with Animated Counter */}
      <section className="py-12 px-4 border-y border-gray-800 bg-black/50 backdrop-blur-sm">
        <motion.div 
          className="container mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Globe2, label: "Countries", from: 0, to: 120, suffix: "+" },
              { icon: MapPin, label: "Destinations", from: 0, to: 500, suffix: "+" },
              { icon: Building2, label: "420 Hotels", from: 0, to: 300, suffix: "+" },
              { icon: Clock, label: "Updated", from: 0, to: 0, suffix: "Daily" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <AnimatedCounter 
                  from={stat.from} 
                  to={stat.to} 
                  duration={2} 
                  suffix={stat.suffix} 
                  label={stat.label} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations (Task 3) */}
      <section className="py-20 px-4 bg-black">
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
                      {/* Hero Image Placeholder */}
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/dest-${i + 1}.jpg')` }}>
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                      
                      {/* Content */}
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

      {/* Everything You Need to Know (Task 4) */}
      <section className="py-20 px-4 bg-black">
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

      {/* Featured Blog / Travel Guides Section (Task 5) */}
      <section className="py-20 px-4 bg-black">
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

      {/* Mini Interactive World Map Preview (Task 6) */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Global Legality at a Glance</h2>
              <p className="text-xl text-gray-400">See the cannabis legal status of every country on our interactive map</p>
            </motion.div>

            <motion.div variants={fadeIn} className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border-4 border-green-500/50 shadow-2xl shadow-green-500/20">
              {/* Placeholder for the map image */}
              <img 
                src="/world-map-preview.png" 
                alt="Interactive World Map Preview" 
                className="w-full h-auto object-cover opacity-80"
              />
              {/* Hover simulation - a simple overlay with a CTA */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 hover:bg-black/20 transition-all duration-500">
                <h3 className="text-3xl font-bold text-white mb-4">Global Legality Map</h3>
                <p className="text-lg text-gray-300 mb-8">Click below to explore the full interactive experience.</p>
                <Link to="/world">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-10 shadow-lg shadow-green-500/50">
                    View Full Interactive Map
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
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
