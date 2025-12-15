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
  Mountain, Camera, Ban, Mail, Download, Compass
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

const VailGuide = () => {
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
        .ilike('city', '%Vail%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Vail%')
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
        .insert({ email, source_page: 'vail-guide' });
      
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
      temp: "10-35°F",
      highlights: ["World-class ski terrain", "Champagne powder snow", "Peak après-ski season", "Holiday festivities"],
      tip: "Winter is peak season. Effects intensified by altitude - use 50% normal dosing."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "65-80°F",
      highlights: ["Mountain biking", "Hiking and trails", "Summer concerts", "Clear alpine skies"],
      tip: "Perfect hiking weather. Only light edibles on easy trails - high altitude requires caution."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: ["Golden aspen colors", "Fewer crowds", "Perfect hiking weather", "Fall festivals"],
      tip: "Beautiful and less crowded. Great time for visiting without summer peak prices."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "30-55°F",
      highlights: ["Spring skiing", "Wildflower season", "Melting snow scenery", "Moderate temps"],
      tip: "Spring conditions can be unpredictable. Check weather before planning activities."
    }
  ];

  const attractions = [
    {
      name: "Vail Village",
      icon: Building2,
      description: "Charming alpine village with shops, restaurants, galleries, and luxury resorts.",
      cannabisTip: "Highly walkable with many dispensaries and cannabis-friendly dining options."
    },
    {
      name: "Gore Range Hiking",
      icon: Mountain,
      description: "Stunning mountain trails with panoramic Rocky Mountain views.",
      cannabisTip: "Light edibles on easy trails only. Never hike while impaired at high altitude."
    },
    {
      name: "Vail Ski Resort",
      icon: Snowflake,
      description: "Second-largest US ski resort with 7,000+ acres of terrain.",
      cannabisTip: "Federal land prohibits consumption. Enjoy après-ski at your lodge instead."
    },
    {
      name: "Golden Peak",
      icon: Camera,
      description: "Scenic chairlift with views across the Rocky Mountains.",
      cannabisTip: "Amazing vistas enhanced by cannabis appreciation at elevation."
    },
    {
      name: "Beaver Creek",
      icon: Mountain,
      description: "Luxury ski resort community adjacent to Vail with pristine terrain.",
      cannabisTip: "Many 420-friendly resorts. Premium cannabis-friendly mountain experience."
    },
    {
      name: "Avon Town Center",
      icon: Building2,
      description: "Upscale shopping, dining and entertainment in the valley.",
      cannabisTip: "Cannabis-friendly restaurants and relaxation spots throughout the area."
    }
  ];

  const relatedGuides = [
    { name: "Aspen", slug: "/aspen", desc: "Luxury Mountain Culture", distance: "2.5 hours" },
    { name: "Breckenridge", slug: "/breckenridge", desc: "High Altitude Town", distance: "2 hours" },
    { name: "Denver", slug: "/denver", desc: "Cannabis Hub", distance: "2.5 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>🌿 420 Vail Cannabis Travel Guide 2025 | Luxury Ski Resort | BudQuest</title>
        <meta name="description" content="Complete Vail cannabis travel guide. Luxury ski resort with 420-friendly lodging, dispensaries, and high-altitude cannabis tips." />
        <meta name="keywords" content="Vail cannabis, ski resort 420, high altitude cannabis, Vail dispensaries, luxury cannabis" />
        <link rel="canonical" href="https://budquest.guide/vail" />
        <meta property="og:title" content="🌿 420 Vail Cannabis Guide 2025 | BudQuest" />
        <meta property="og:description" content="Luxury cannabis guide for Vail. Premium ski resort + 420 hotels + cannabis culture." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Vail Cannabis Travel Guide 2025",
          "url": "https://budquest.guide/vail"
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
            <li className="text-foreground font-medium">Vail</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado.jpg" alt="Vail Ski Resort" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-blue-600/20 text-blue-400 border-blue-600/30">
                <Mountain className="w-4 h-4 mr-2" />
                Luxury Ski Resort
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Vail Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Premier alpine cannabis destination. World-class skiing, luxury 420-friendly resorts, and high-altitude cannabis experiences at 8,150 feet.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Luxury Stays</a>
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
                { icon: Store, label: "Dispensaries", value: "10+" },
                { icon: Shield, label: "Possession", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "8,150 ft" },
                { icon: Home, label: "Accommodations", value: "Luxury" },
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
                  Best Time to Visit Vail
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
                  Things to Do in Vail
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Luxury mountain experiences combined with cannabis-friendly culture.</p>
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
                  <h3 className="font-semibold">High Altitude Effect</h3>
                </div>
                <p className="text-sm text-muted-foreground">At 8,150 ft, cannabis effects are 50% more intense. Use 25-50% of normal dose.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Car className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Safe Transportation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Never drive after cannabis. Use shuttles, rideshare, or walk the village.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "420-Friendly Hotels", note: "Designated rooms/patios" },
                  { place: "Private Residences", note: "With owner permission" },
                  { place: "Cannabis Lounges", note: "If available" },
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
                  { place: "Federal Lands", fine: "Prohibited" },
                  { place: "Public Parks", fine: "Civil citation" },
                  { place: "Dispensaries", fine: "Illegal in CO" },
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
                  🌿 420 Luxury Ski Lodging
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
                  Get the Vail Cannabis Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">Free PDF with dispensary maps, altitude dosing guides, and luxury cannabis tips.</p>
              
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
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">{guide.distance} from Vail</Badge>
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

export default VailGuide;
