import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Shield, Clock, Globe2, Plane, Building2, Map } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl" />
        
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeIn} className="mb-6">
            <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm">
              Updated Daily • 120+ Countries • Verified Sources
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
          >
            Your Global Guide to<br />Cannabis Travel Laws
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Explore cannabis laws, find 420-friendly hotels, and plan your perfect cannabis-friendly vacation with confidence.
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeIn} className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search country, state, city, hotel, or airport..."
                className="pl-12 h-14 text-lg bg-card/50 border-border/50 focus:border-accent focus:ring-accent backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center">
            <Link to="/usa">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-glow-subtle">
                Explore USA Guide
              </Button>
            </Link>
            <Link to="/world">
              <Button size="lg" variant="outline" className="border-border hover:bg-card font-semibold px-8">
                View World Guide
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 px-4 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <motion.div 
          className="container mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Globe2, label: "Countries", value: "120+" },
              { icon: MapPin, label: "Destinations", value: "500+" },
              { icon: Building2, label: "420 Hotels", value: "300+" },
              { icon: Clock, label: "Updated", value: "Daily" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-xl text-muted-foreground">Explore cannabis-friendly travel hotspots around the world</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link to={dest.country === "USA" ? `/usa` : `/world`}>
                    <Card className="p-6 hover:border-accent/50 transition-all cursor-pointer group bg-gradient-card hover:shadow-glow-subtle">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{dest.image}</div>
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">{dest.name}</h3>
                      <Badge className={
                        dest.status === "Recreational" ? "bg-accent/20 text-accent border-accent/30" :
                        dest.status === "Medical" ? "bg-gold/20 text-gold border-gold/30" :
                        "bg-secondary/50 text-secondary-foreground border-border"
                      }>
                        {dest.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">{dest.country}</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Everything You Need to Know</h2>
              <p className="text-xl text-muted-foreground">Comprehensive cannabis travel resources at your fingertips</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Legal Status", desc: "Up-to-date laws for every location", link: "/usa" },
                { icon: Building2, title: "420 Hotels", desc: "Find cannabis-friendly accommodations", link: "/hotels" },
                { icon: Plane, title: "Airport Rules", desc: "Know before you fly", link: "/usa" },
                { icon: Map, title: "Interactive Maps", desc: "Visual guide to global laws", link: "/world" },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link to={feature.link}>
                    <Card className="p-6 h-full hover:border-accent/50 transition-all cursor-pointer group bg-gradient-card hover:shadow-glow-subtle">
                      <feature.icon className="w-12 h-12 mb-4 text-accent group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
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
