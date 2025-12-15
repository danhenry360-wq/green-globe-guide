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
  TreePine, Sun, Leaf, Mountain, AlertCircle, Car, Bike
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
  is_medical: boolean | null;
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

const SteamboatSpringsGuide = () => {
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
        .ilike('city', '%Steamboat%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Steamboat%')
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
        .insert({ email, source_page: 'steamboat-springs-guide' });
      
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
        <title>Steamboat Springs Cannabis Guide 2025 | Ski & Hot Springs | BudQuest</title>
        <meta name="description" content="Complete guide to cannabis in Steamboat Springs, Colorado. Dispensaries, hot springs, 420-friendly lodging, skiing, and outdoor recreation combined with cannabis tourism." />
        <meta name="keywords" content="Steamboat Springs cannabis, Steamboat dispensaries, ski and cannabis, hot springs Colorado, 420 friendly Steamboat" />
        <link rel="canonical" href="https://budquest.guide/steamboat-springs" />
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
            <li className="text-foreground">Steamboat Springs</li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/50">
                <TreePine className="w-4 h-4 mr-2" />
                Powder & Cannabis Paradise
              </Badge>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Steamboat Springs Cannabis Guide
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience the perfect mountain getaway combining world-class skiing, natural hot springs, outdoor adventure, and a thriving cannabis culture in Colorado's Ski Town.
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
                <div className="text-2xl font-bold">8+</div>
                <div className="text-sm text-muted-foreground">Quality Dispensaries</div>
              </Card>
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <Shield className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">1 oz</div>
                <div className="text-sm text-muted-foreground">Possession Limit</div>
              </Card>
              <Card className="bg-card/50 border-border/30 text-center p-4">
                <Mountain className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">6,732 ft</div>
                <div className="text-sm text-muted-foreground">Elevation</div>
              </Card>
            </div>
          </div>
        </section>

        {/* DISPENSARIES SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Top Dispensaries</h2>
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
                Steamboat dispensaries coming soon!
              </div>
            )}
          </div>
        </section>

        {/* 420-FRIENDLY HOTELS */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">420-Friendly Mountain Lodges</h2>
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
                            Book Now <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Mountain accommodations coming soon!
              </div>
            )}
          </div>
        </section>

        {/* CANNABIS LAWS SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Steamboat Springs Cannabis Laws</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Legal Status
                </h3>
                <p className="text-muted-foreground">
                  Recreational cannabis is fully legal in Steamboat Springs for adults 21+. Dispensaries cater to both locals and tourists with curated selections.
                </p>
              </Card>
              
              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-400" />
                  Outdoor Recreation & Cannabis
                </h3>
                <p className="text-muted-foreground">
                  Public consumption is illegal. However, 420-friendly lodges allow private consumption. Combine your edibles with hot springs and hiking for the ultimate experience.
                </p>
              </Card>

              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Elevation Effects
                </h3>
                <p className="text-muted-foreground">
                  At 6,732 ft elevation, THC effects are 30-40% stronger. Start with low doses and wait for effects before consuming more. Hydrate constantly.
                </p>
              </Card>

              <Card className="bg-card/50 border-border/30 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Car className="w-5 h-5 text-red-500" />
                  Driving & Transport
                </h3>
                <p className="text-muted-foreground">
                  Never drive after consuming cannabis. Use rideshare or lodge services. Colorado has strict DUI laws with a 5ng THC limit.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get Your Free Steamboat Cannabis Guide</h2>
              <p className="text-muted-foreground mb-6">
                Expert tips for combining skiing, hot springs, and cannabis tourism.
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

export default SteamboatSpringsGuide;
