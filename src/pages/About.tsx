import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, Users, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Comprehensive cannabis travel information for 120+ countries and all 50 US states."
    },
    {
      icon: Shield,
      title: "Accurate Information",
      description: "Up-to-date legal information sourced from official government channels and verified regularly."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by travelers, for travelers. Real experiences and recommendations from cannabis enthusiasts worldwide."
    },
    {
      icon: TrendingUp,
      title: "Always Evolving",
      description: "Continuously updated with the latest law changes, new destinations, and travel insights."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">About Us</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Your Trusted Cannabis <br />Travel Companion
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Green Globe is the world's most comprehensive cannabis travel guide, helping responsible travelers 
              navigate the evolving landscape of cannabis legislation worldwide.
            </p>
          </div>

          <div className="mb-20">
            <Card className="p-12 bg-gradient-card border-border/50">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that informed travelers make responsible choices. Our mission is to provide 
                accurate, up-to-date information about cannabis laws, regulations, and travel opportunities 
                around the world.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're planning a trip to a cannabis-legal destination or just want to understand 
                the laws in your area, Green Globe is your trusted source for cannabis travel information.
              </p>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-8 bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all">
                  <value.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-12 bg-accent/5 border-accent/20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Green Globe provides informational content only and does not constitute legal advice. 
              Cannabis laws vary by jurisdiction and can change rapidly. Always verify current laws 
              before traveling and consume responsibly where legal.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
