import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MapPin, Star, CheckCircle, Home, Cannabis, Shield, ArrowRight, Bed, Store, 
  ChevronRight, Building2, Clock, Car, Bus, Snowflake, Sun, Leaf, Flower2,
  Mountain, Waves, Ban, Mail, Download, Compass
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
        .insert({ email, source_page: 'steamboat-guide' });
      
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

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "10-30°F",
      highlights: ["World-class skiing", "Champagne powder", "Après-ski hot springs", "Holiday events"],
      tip: "Winter paradise - ski challenging terrain then soak in natural thermal springs to enhance cannabis relaxation."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "65-80°F",
      highlights: ["Mountain biking", "Hot springs soaking", "Outdoor concerts", "Clear mountain air"],
      tip: "Perfect for combining outdoor activities with cannabis-friendly thermal spring relaxation."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "35-65°F",
      highlights: ["Aspen colors", "Fewer crowds", "Perfect weather", "Fall festivals"],
      tip: "Beautiful and less crowded. Ideal for enjoying hot springs without summer tourist crowds."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "30-55°F",
      highlights: ["Spring skiing", "Wildflowers", "Snowmelt streams", "Mild weather"],
      tip: "Spring brings beautiful scenery and pleasant cannabis experiences at the hot springs."
    }
  ];

  const attractions = [
    {
      name: "Steamboat Ski Resort",
      icon: Mountain,
      description: "World-class ski resort with champagne powder snow and 2,965 vertical feet.",
      cannabisTip: "Federal land prohibits consumption. Enjoy après-ski cannabis at your 420-friendly lodge."
    },
    {
      name: "Natural Hot Springs",
      icon: Waves,
      description: "Natural thermal springs at 104°F perfect for relaxation and recovery.",
      cannabisTip: "Many 420-friendly resorts have private hot tub access. Cannabis + thermal soaking = ultimate relaxation."
    },
    {
      name: "Routt National Forest",
      icon: Mountain,
      description: "Stunning mountain trails with panoramic views and alpine wilderness.",
      cannabisTip: "Light edibles on easy trails only. Never hike impaired in mountain terrain."
    },
    {
      name: "Fish Creek Falls",
      icon: Mountain,
      description: "Beautiful 283-foot waterfall hike through forest landscape.",
      cannabisTip: "Perfect sober hike destination. Enjoy cannabis appreciation at lodge afterward."
    },
    {
      name: "Downtown Steamboat",
      icon: Building2,
      description: "Charming town with galleries, restaurants, breweries, and shops.",
      cannabisTip: "Cannabis-friendly dining and shopping throughout town. Many dispensaries available."
    },
    {
      name: "Strawberry Park Hot Springs",
      icon: Waves,
      description: "Private natural hot springs nestled in the mountains.",
      cannabisTip: "Top-rated hot springs destination. Cannabis + thermal therapy = peak relaxation experience."
    }
  ];

  const relatedGuides = [
    { name: "Vail", slug: "/vail", desc: "Luxury Ski Resort", distance: "3 hours" },
    { name: "Breckenridge", slug: "/breckenridge", desc: "Mining Town Vibes", distance: "3.5 hours" },
    { name: "Denver", slug: "/denver", desc: "Cannabis Hub", distance: "3 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>🌿 420 Steamboat Springs Cannabis Guide 2025 | Hot Springs & Skiing | BudQuest</title>
        <meta name="description" content="Complete Steamboat Springs cannabis guide. World-class skiing, natural hot springs, 420-friendly lodging, and cannabis-friendly thermal relaxation." />
        <meta name="keywords" content="Steamboat cannabis, hot springs 420, ski resort cannabis, thermal springs, Steamboat dispensaries" />
        <link rel="canonical" href="https://budquest.guide/steamboat-springs" />
        <meta property="og:title" content="🌿 420 Steamboat Springs Cannabis Guide 2025 | BudQuest" />
        <meta property="og:description" content="Hot springs + skiing cannabis guide. Natural thermal soaking + 420 cannabis culture." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Steamboat Springs Cannabis Travel Guide 2025",
          "url": "https://budquest.guide/steamboat-springs"
        })}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Steamboat Springs</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado.jpg" alt="Steamboat Springs Hot Springs" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-cyan-600/20 text-cyan-400 border-cyan-600/30">
                <Waves className="w-4 h-4 mr-2" />
                Skiing + Thermal Springs
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Steamboat Springs Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Perfect hybrid destination combining world-class skiing with natural 104°F thermal springs. Premium cannabis-friendly resorts and après-ski culture.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Hot Springs Stays</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Required", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "5+" },
                { icon: Shield, label: "Possession", value: "1 oz" },
                { icon: Waves, label: "Hot Springs", value: "104°F" },
                { icon: Home, label: "Lodging", value: "Luxury" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-card/50 border-border/30 text-center p-4 hover:border-accent/50 transition-all hover:-translate-y-1">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Time to Visit Steamboat Springs
                </span>
              </h2>
            </motion.div>

            <Tabs defaultValue="winter" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 p-1">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                    <season.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                    {season.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <Card className="bg-card/50 border-border/30 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-xl bg-accent/20">
                            <season.icon className="w-8 h-8 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                            <p className="text-sm text-muted-foreground">{season.months}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-medium text-foreground mb-4">
                          <Clock className="w-5 h-5 text-accent" />
                          {season.temp}
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h4 className="font-semibold text-foreground mb-3">Season Highlights</h4>
                        <ul className="space-y-2 mb-4">
                          {season.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                          <p className="text-sm text-foreground">
                            <strong className="text-accent">Local Tip:</strong> {season.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Things to Do in Steamboat Springs
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Skiing, hot springs, and cannabis-friendly cultural experiences.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attr, i) => (
                <motion.div key={attr.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <Card className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <attr.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground">{attr.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                    <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                      <p className="text-xs text-accent font-medium mb-1">Cannabis Traveler Tip</p>
                      <p className="text-xs text-muted-foreground">{attr.cannabisTip}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Cannabis Laws
                </span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Hot Springs Protocol</h3>
                </div>
                <p className="text-sm text-muted-foreground">Many 420-friendly resorts allow consumption in private hot tub areas with permission.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Car className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Safe Transportation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Never drive after cannabis. Use resort shuttles, rideshare, or walk downtown.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "420-Friendly Hotels", note: "Private areas with permission" },
                  { place: "Private Residences", note: "With owner permission" },
                  { place: "Hot Spring Resorts", note: "Designated cannabis areas" },
                ].map((item) => (
                  <div key={item.place} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-foreground font-medium">{item.place}</span>
                      <span className="text-muted-foreground text-sm"> — {item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-red-500/5 border-red-500/20">
              <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
                <Ban className="w-5 h-5" />
                Where You CANNOT Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "Ski Slopes", fine: "Ejection + Fine" },
                  { place: "Public Hot Springs", fine: "Prohibited" },
                  { place: "Downtown Steamboat", fine: "Civil citation" },
                  { place: "Forest Trails", fine: "Federal lands" },
                ].map((item) => (
                  <div key={item.place} className="flex items-start gap-2">
                    <Ban className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-foreground font-medium">{item.place}</span>
                      <span className="text-red-400 text-sm font-medium"> — {item.fine}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Dispensaries
                </span>
              </h2>
              <Link to="/dispensary" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.map((disp) => (
                  <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50">
                      <div className="aspect-video relative">
                        <img src={disp.images?.[0] || disp.image || "/dest-colorado.jpg"} alt={disp.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {disp.is_recreational && <Badge className="bg-green-500/90 text-white text-xs">Rec</Badge>}
                          {disp.is_medical && <Badge className="bg-blue-500/90 text-white text-xs">Med</Badge>}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{disp.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{disp.city}, {disp.state}</span>
                        </div>
                        <div className="flex items-center gap-1">{renderRating(disp.rating || 0)}</div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No dispensaries found right now.</p>
              </Card>
            )}
          </div>
        </section>

        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Hot Springs Lodging
                </span>
              </h2>
              <Link to="/hotels" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50">
                      <div className="aspect-video relative">
                        <img src={rental.images?.[0] || "/dest-colorado.jpg"} alt={rental.name} className="w-full h-full object-cover" />
                        <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">420 Friendly</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{rental.name}</h3>
                        {rental.address && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{rental.address}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">{renderRating(rental.rating || 4)}</div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No rentals found right now.</p>
              </Card>
            )}
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-gold/10" />
          <div className="container mx-auto px-4 max-w-2xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Get the Steamboat Springs Cannabis Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">Free PDF with hot springs maps, cannabis + thermal therapy tips, and dispensary guides.</p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-card/50 border-border/50 focus:border-accent" required />
                <Button type="submit" className="bg-accent hover:bg-accent/90 whitespace-nowrap" disabled={submitting}>
                  {submitting ? "Sending..." : "Get Free Guide"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 More Colorado Destinations
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide, index) => (
                <motion.div key={guide.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                  <Link to={guide.slug}>
                    <Card className="p-6 bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1 text-center h-full">
                      <Compass className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">{guide.distance} from Steamboat</Badge>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SteamboatSpringsGuide;
