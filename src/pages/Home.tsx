import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Hotel, Plane, Globe } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
            Your Guide to Cannabis-Friendly Travel
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Navigate cannabis laws worldwide. Find 420-friendly hotels, tours, and destinations. 
            Travel confidently with up-to-date legal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/usa">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Explore USA Guide
              </Button>
            </Link>
            <Link to="/world">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                World Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-accent" />}
              title="Global Legality Database"
              description="Comprehensive cannabis laws for 120+ countries and all US states"
            />
            <FeatureCard
              icon={<Hotel className="h-8 w-8 text-accent" />}
              title="420-Friendly Hotels"
              description="Curated directory of cannabis-welcoming accommodations"
            />
            <FeatureCard
              icon={<MapPin className="h-8 w-8 text-accent" />}
              title="Interactive Map"
              description="Visual guide to legal status across regions"
            />
            <FeatureCard
              icon={<Plane className="h-8 w-8 text-accent" />}
              title="Airport & Travel Rules"
              description="Know the rules for major airports and transportation"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Start Planning Your Trip</h2>
          <p className="text-muted-foreground mb-8">
            Access detailed guides, legal information, and traveler tips for your destination.
          </p>
          <Link to="/usa">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              View USA States
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;
