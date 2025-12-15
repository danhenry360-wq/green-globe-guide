import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MapPin, Star, Cannabis, Shield, ArrowRight, Bed, Store, ChevronRight,
  AlertTriangle, Sun, Leaf, Mountain, AlertCircle, Car, Zap
} from "lucide-react";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number | null;
  image: string | null;
  is_recreational: boolean | null;
  address: string;
}

interface Rental {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  rating: number | null;
  images: string[] | null;
}

const LeadvilleGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Leadville%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Leadville%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (rentalData) setRentals(rentalData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, source_page: 'leadville-guide' });
      
      if (error) {
        if (error.code === '23505') {
          toast.success("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Guide sent! Check your inbox.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    
    setEmail("");
    setSubmitting(false);
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-gold text-gold" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-muted-foreground/30" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>Leadville Cannabis Guide 2025 | Highest Elevation Cannabis | BudQuest</title>
        <meta name="description" content="Experience the world's highest cannabis destination in Leadville, CO at 10,152 ft. Historic mining town, extreme altitude effects, and unique cannabis tourism experience." />
        <meta name="keywords" content="Leadville cannabis, highest elevation cannabis, extreme altitude weed, historic mining town Colorado, Leadville dispensaries, high altitude cannabis" />
        <link rel="canonical" href="https://budquest.guide/leadville" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Leadville</li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/50">
                <Zap className="w-4 h-4 mr-2" />
                Highest Elevation Cannabis
              </Badge>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Leadville Cannabis Guide
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience cannabis at the highest elevation of any incorporated city in North America. Historic mining town meets extreme altitude cannabis adventure at 10,152 feet.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUICK FACTS */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <Cannabis className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">21+</div>
                <div className="text-sm text-muted-foreground">Age Requirement</div>
              </Card>
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <Store className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-muted-foreground">Dispensaries</div>
              </Card>
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <Shield className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">1 oz</div>
                <div className="text-sm text-muted-foreground">Possession Limit</div>
              </Card>
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">10,152 ft</div>
                <div className="text-sm text-muted-foreground">Extreme Elevation</div>
              </Card>
            </div>
          </div>
        </section>

        {/* DISPENSARIES SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Leadville Dispensaries</h2>
            {loading ? (
              <div className="text-center py-12">Loading dispensaries...</div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.map((disp) => (
                  <motion.div
                    key={disp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/dispensary/${disp.slug}`}>
                      <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          {disp.image && (
                            <img src={disp.image} alt={disp.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                          )}
                          <h3 className="text-xl font-semibold mb-2">{disp.name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderRating(disp.rating || 0)}
                          </div>
                          <p className="text-sm text-muted-foreground">{disp.address}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Leadville dispensaries coming soon!
              </div>
            )}
          </div>
        </section>

        {/* HOTELS */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Historic Mining Town Lodges</h2>
            {rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <motion.div
                    key={rental.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/hotels/${rental.slug}`}>
                      <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          {rental.images && rental.images.length > 0 && (
                            <img src={rental.images[0]} alt={rental.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                          )}
                          <h3 className="text-xl font-semibold mb-2">{rental.name}</h3>
                          <Button variant="outline" className="w-full" size="sm">
                            Book Stay <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Historic lodging coming soon!
              </div>
            )}
          </div>
        </section>

        {/* EXTREME ALTITUDE WARNING */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Extreme Altitude Cannabis Guide</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="bg-red-500/10 border-red-500/30 p-6 border-2">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  WARNING: 60%+ Stronger Effects
                </h3>
                <p className="text-muted-foreground">
                  Leadville's 10,152 ft elevation is the extreme limit for cannabis tourism. THC effects are 60%+ stronger than sea level. This is for EXPERIENCED users only.
                </p>
              </Card>
              
              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Critical Dosing Rules
                </h3>
                <p className="text-muted-foreground">
                  DO NOT consume your normal dose. Start with 1-2mg edibles (vs normal 10mg). Wait 3+ hours before any additional consumption. Effects are unpredictable at this elevation.
                </p>
              </Card>

              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Altitude Sickness + Cannabis
                </h3>
                <p className="text-muted-foreground">
                  Many visitors experience altitude sickness here (nausea, headaches, shortness of breath). Cannabis can worsen these symptoms. Acclimatize 24 hours before consuming.
                </p>
              </Card>

              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2">Hydration & Oxygen</h3>
                <p className="text-muted-foreground">
                  Drink 4-5 liters of water daily. Your body needs extra oxygen at this elevation. Cannabis consumption doesn't help your breathing - plan accordingly.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get Your Free Leadville Extreme Altitude Guide</h2>
              <p className="text-muted-foreground mb-6">
                Expert tips for surviving and enjoying cannabis at 10,152 feet elevation.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                  required
                />
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Get Guide"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LeadvilleGuide;
