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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MapPin, Star, CheckCircle, Plane, Home, Cannabis, Shield, ArrowRight, Bed, Store, ChevronRight,
  Building2, AlertCircle, Clock, Car, Bus, Bike, MapPinned, Snowflake, Sun, Leaf, Flower2,
  Dice5, Mountain, AlertTriangle, Ban, ExternalLink, Compass, Sparkles, TrendingUp, Gold
} from "lucide-react";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number | null;
  image: string | null;
  images: string[] | null;
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
  website: string | null;
  amenities?: unknown;
}

const CentralCityGuide = () => {
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
        .ilike('city', '%Central%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Central%')
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
        .insert({ email, source_page: 'central-city-guide' });
      
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Central City Cannabis Travel Guide 2025",
    "description": "Historic Gold Rush cannabis guide for Central City, Colorado. Gaming, casinos, historic mining heritage, cannabis culture, dispensaries, and 420-friendly lodging.",
    "url": "https://budquest.guide/central-city",
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "about": { "@type": "City", "name": "Central City", "address": { "@type": "PostalAddress", "addressLocality": "Central City", "addressRegion": "CO", "addressCountry": "US" } },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  return (
    <>
      <Helmet>
        <title>Central City Cannabis Travel Guide 2025 | Gold Rush Gaming & Cannabis | BudQuest</title>
        <meta name="description" content="Complete Central City cannabis guide. Historic mining, casinos, gaming, cannabis culture, dispensaries, and 420-friendly lodging near Denver." />
        <meta name="keywords" content="Central City cannabis, gaming cannabis, casinos Colorado, historic mining, 420 hotels, Gold Rush" />
        <link rel="canonical" href="https://budquest.guide/central-city" />
        <meta property="og:title" content="Central City Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Historic gaming & cannabis guide for Central City. Casinos, mining heritage, and cannabis culture." />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Central City" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Central City</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-3.jpg" alt="Central City historic mining town and casinos" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Gold className="w-4 h-4 mr-2" />
                Historic Gold Rush Gaming Town
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Central City Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Historic Gold Rush mining town near Black Hawk. Casinos, gaming, heritage mining, and cannabis culture. Perfect for gaming + cannabis weekend getaways.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />Gaming Hotels</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Dice5, label: "Casinos", value: "3" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Gold, label: "Historic", value: "1859" },
                { icon: TrendingUp, label: "Elevation", value: "8,496 ft" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-card/50 border-border/30 text-center p-4 hover:border-accent/50 transition-all">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Gaming + Cannabis Experiences
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Casino Gaming",
                  icon: Dice5,
                  description: "Three major casinos with slots, poker, and gaming. Historic mining-themed venues.",
                  tip: "Light consumption only before gambling. Never gamble while heavily impaired."
                },
                {
                  name: "Historic Mining Tour",
                  icon: Mountain,
                  description: "Explore authentic Gold Rush heritage. Historic mines and museum experiences.",
                  tip: "Tour sober first. Light edible after tour - absorb history first."
                },
                {
                  name: "Heritage Dining",
                  icon: Building2,
                  description: "Historic saloons and restaurants serving classic Gold Rush fare with modern cannabis-friendly attitude.",
                  tip: "Many establishments cannabis-friendly. Combine gaming with dining experience."
                },
                {
                  name: "Scenic Mountain Views",
                  icon: Mountain,
                  description: "Mountain peaks and historic town vistas. Perfect for reflection and enjoyment.",
                  tip: "Light consumption for scenic appreciation. Amazing panoramic views."
                },
                {
                  name: "Art & Culture",
                  icon: Sparkles,
                  description: "Historic art galleries and cultural events celebrating Gold Rush heritage.",
                  tip: "Consume before experiencing art. Historic buildings + cannabis = immersive."
                },
                {
                  name: "Weekend Gaming Getaway",
                  icon: Bed,
                  description: "Perfect overnight destination from Denver. Gaming + lodging + cannabis culture.",
                  tip: "Plan multi-day trip. Gaming + cannabis + food + culture experience."
                }
              ].map((attr) => (
                <Card key={attr.name} className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <attr.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{attr.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-accent font-medium mb-1">🎰 Cannabis Tip</p>
                    <p className="text-xs text-muted-foreground">{attr.tip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Cannabis & Gaming Laws
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Recreational Legal</h3>
                </div>
                <p className="text-sm text-muted-foreground">Adults 21+ can possess up to 1 ounce. Most dispensaries welcome visitors.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Dice5 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold">Gaming Culture</h3>
                </div>
                <p className="text-sm text-muted-foreground">Cannabis + gaming integrated into Central City's Gold Rush heritage and tourism.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4">✅ Safe Cannabis + Gaming Activities</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>• Pre-gaming consumption at lodge</div>
                <div>• Light cannabis before casino visit</div>
                <div>• Historic mining tour (sober)</div>
                <div>• Heritage dining experiences</div>
                <div>• Post-gaming cannabis relaxation</div>
                <div>• Scenic reflection sessions</div>
                <div>• Art gallery appreciation</div>
                <div>• Heritage museum exploration</div>
              </div>
            </Card>

            <Card className="p-6 bg-orange-500/5 border-orange-500/20">
              <h3 className="font-bold text-lg text-orange-400 mb-4">⚠️ Responsible Cannabis + Gaming Guidelines</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>• Never gamble while heavily impaired</div>
                <div>• Light consumption only before gaming</div>
                <div>• Set gambling budgets sober</div>
                <div>• No driving after consuming</div>
                <div>• Use rideshare between casinos</div>
                <div>• Limit daily cannabis intake while gaming</div>
                <div>• Take gaming breaks for clarity</div>
                <div>• Don't bet money you can't afford</div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Getting Around
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                { name: "Walking", icon: MapPinned, desc: "Compact downtown is walkable. Historic streets and shops accessible on foot.", tip: "Safe for walking after light consumption. Most destinations nearby." },
                { name: "Rideshare", icon: Car, desc: "Uber/Lyft available. Best option for casino hopping and evening entertainment.", tip: "Essential for responsible gaming + cannabis. Never drive impaired." },
                { name: "Driving", icon: Bus, desc: "Road from Denver is scenic. About 45 minutes away.", tip: "Drive sober to Central City. Consume responsibly once arrived." },
                { name: "Gaming Shuttle", icon: Plane, desc: "Some casinos offer shuttle services from Denver.", tip: "Check with casinos for transportation options." }
              ].map((opt) => (
                <Card key={opt.name} className="bg-card/50 border-border/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <opt.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{opt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{opt.desc}</p>
                  <p className="text-xs text-accent bg-accent/10 p-2 rounded">💡 {opt.tip}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Historic Gaming Districts
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Historic Downtown", desc: "Main gaming and casino district with saloons and heritage buildings." },
                { name: "Mining Heritage Zone", desc: "Authentic Gold Rush preserved structures and museums." },
                { name: "Casino Row", desc: "Three major casinos concentrated in downtown area." },
                { name: "Historic District", desc: "Victorian-era architecture and heritage sites." },
                { name: "Mountain Views", desc: "Scenic overlooks with Rocky Mountain panoramas." },
                { name: "Black Hawk Adjacent", desc: "Connected gaming town just minutes away." }
              ].map((h) => (
                <Card key={h.name} className="p-4 bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                  <h4 className="font-semibold text-accent mb-2">{h.name}</h4>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Dispensaries
              </span>
            </h2>

            {loading ? (
              <div className="text-center py-12">Loading dispensaries...</div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.map((d) => (
                  <Card key={d.id} className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all">
                    {d.image && <img src={d.image} alt={d.name} className="w-full h-48 object-cover" />}
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{d.name}</h3>
                      {d.rating && <div className="flex gap-1 mb-3">{renderRating(d.rating)}</div>}
                      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {d.address}
                      </p>
                      <div className="flex gap-2">
                        {d.is_recreational && <Badge className="bg-accent/20 text-accent">Recreational</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">Dispensaries in Central City area - check local guides!</p>
              </Card>
            )}
          </div>
        </section>

        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Gaming Hotels
              </span>
            </h2>

            {rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((r) => (
                  <Card key={r.id} className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all">
                    {r.images?.[0] && <img src={r.images[0]} alt={r.name} className="w-full h-48 object-cover" />}
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{r.name}</h3>
                      {r.rating && <div className="flex gap-1 mb-3">{renderRating(r.rating)}</div>}
                      <p className="text-sm text-muted-foreground mb-4">{r.address}</p>
                      {r.website && (
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <a href={r.website} target="_blank">Visit <ExternalLink className="w-3 h-3 ml-1" /></a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">420-friendly gaming hotels available!</p>
              </Card>
            )}
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="bg-gradient-to-br from-accent/10 via-background to-accent/5 border-accent/20 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🌿 420 Gaming + Cannabis Guide
                  </span>
                </h2>
                <p className="text-muted-foreground">Tips for responsible gaming + cannabis in historic Central City</p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90">
                  {submitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Nearby Colorado Guides
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Denver", slug: "/denver", desc: "Cannabis epicenter - 45 minutes away", distance: "45 min" },
                { name: "Black Hawk", slug: "/black-hawk", desc: "Sister gaming town adjacent", distance: "5 min" },
                { name: "Boulder", slug: "/boulder", desc: "College town cannabis culture", distance: "1.5 hours" }
              ].map((g) => (
                <Link key={g.name} to={g.slug}>
                  <Card className="bg-card/50 border-border/30 p-6 hover:border-accent/50 transition-all h-full">
                    <h3 className="font-bold text-lg text-accent mb-2">{g.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CentralCityGuide;
