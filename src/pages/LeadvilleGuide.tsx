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
  AlertTriangle, Ban, Mail, Download, Compass, Zap
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

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "0-20°F",
      highlights: ["Extreme altitude skiing", "Ice climbing", "Historical mining tours", "Winter solitude"],
      tip: "Winter at 10,152 ft requires 60% reduced dosing. The extreme altitude intensifies cannabis effects dangerously."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "50-70°F",
      highlights: ["Mount Elbert climbing", "Alpine wildflowers", "Mountain biking", "Mining history"],
      tip: "Even summer brings altitude challenges. Start 50% lower doses and never hike impaired above 10,000 ft."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "30-55°F",
      highlights: ["Golden aspen colors", "Fewer crowds", "Historical preservation", "Crystal clear skies"],
      tip: "Beautiful season but still dangerously high altitude. Always monitor how cannabis affects you at this elevation."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "20-45°F",
      highlights: ["Winter sports ending", "Snowmelt streams", "Historic tours", "Mild days"],
      tip: "Spring temperatures still demand extreme caution with cannabis. Altitude sickness risk remains high."
    }
  ];

  const attractions = [
    {
      name: "Mount Elbert",
      icon: AlertTriangle,
      description: "14,440 ft - Colorado's highest peak visible from Leadville. Extreme altitude hiking destination.",
      cannabisTip: "DANGER: Never consume cannabis before climbing. The 2,000+ ft elevation gain can cause severe altitude sickness when combined with THC."
    },
    {
      name: "Leadville Colorado & Southern Railroad",
      icon: Building2,
      description: "Historic narrow-gauge railroad tour through high-altitude mining country with spectacular views.",
      cannabisTip: "Safe sober activity. Enjoy cannabis relaxation at your lodge after the scenic train journey."
    },
    {
      id: "NationalMineMiningMuseum",
      name: "National Mine Mining Museum",
      icon: Building2,
      description: "Authentic mining history and operation at altitude. Educational Gold Rush heritage experience.",
      cannabisTip: "Perfect sober museum activity. Learn about mining heritage then enjoy cannabis appreciation afterward."
    },
    {
      name: "Turquoise Lake",
      icon: Leaf,
      description: "Stunning high-altitude lake at 9,900 ft with beautiful mountain reflections and fishing.",
      cannabisTip: "Light edibles on easy lake walks only. Never hike impaired in alpine terrain - altitude + cannabis = dangerous."
    },
    {
      name: "Climax Mine Historic Site",
      icon: Building2,
      description: "Former molybdenum mine showcasing Colorado's mining heritage at extreme elevation.",
      cannabisTip: "Recommended sober activity. Mine tours demand full alertness and coordination."
    },
    {
      name: "Tennessee Pass Scenic Byway",
      icon: Leaf,
      description: "Scenic 10,000+ ft mountain pass with overlooks and historical significance.",
      cannabisTip: "Driving requires full sobriety. Experience the views first, enjoy cannabis safely at destination."
    }
  ];

  const relatedGuides = [
    { name: "Vail", slug: "/vail", desc: "Luxury Ski Resort", distance: "1.5 hours" },
    { name: "Aspen", slug: "/aspen", desc: "Mountain Paradise", distance: "2 hours" },
    { name: "Breckenridge", slug: "/breckenridge", desc: "Mining Town Vibes", distance: "1.5 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>🌿 420 Leadville Cannabis Guide 2025 | Extreme Altitude | BudQuest</title>
        <meta name="description" content="Complete Leadville cannabis guide for extreme altitude (10,152 ft). Mountain Elbert, mining heritage, altitude safety, and cannabis dosing warnings." />
        <meta name="keywords" content="Leadville cannabis, extreme altitude, Mount Elbert, high altitude cannabis, mining history" />
        <link rel="canonical" href="https://budquest.guide/leadville" />
        <meta property="og:title" content="🌿 420 Leadville Cannabis Guide 2025 | BudQuest" />
        <meta property="og:description" content="Extreme altitude destination. 10,152 ft elevation demands 50% reduced cannabis dosing." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Leadville Cannabis Travel Guide 2025",
          "url": "https://budquest.guide/leadville"
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
            <li className="text-foreground font-medium">Leadville</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado.jpg" alt="Leadville Extreme Altitude" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-red-600/20 text-red-400 border-red-600/30">
                <Zap className="w-4 h-4 mr-2" />
                EXTREME ALTITUDE WARNING
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Leadville Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Colorado's second-highest city at 10,152 feet. Mining heritage, Mount Elbert, and extreme altitude cannabis challenges.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />Altitude Lodging</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-red-500/5 border-y border-red-500/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto p-6 rounded-lg border border-red-500/30 bg-red-500/5">
              <div className="flex gap-3 items-start">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-400 mb-2">EXTREME ALTITUDE WARNING</h3>
                  <p className="text-sm text-foreground mb-2">
                    Leadville is at 10,152 ft elevation. Cannabis effects are 60% MORE INTENSE at this altitude.
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Start with 25-33% normal dosing</li>
                    <li>• Altitude sickness + THC = dangerous combination</li>
                    <li>• Allow 48 hours acclimation before consumption</li>
                    <li>• Never hike or climb while impaired</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-b border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Required", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "3+" },
                { icon: Shield, label: "Possession", value: "1 oz" },
                { icon: AlertTriangle, label: "Elevation", value: "10,152 ft" },
                { icon: Home, label: "Lodging", value: "Rustic" },
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
                  Best Time to Visit Leadville
                </span>
              </h2>
            </motion.div>

            <Tabs defaultValue="summer" className="w-full">
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
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-sm text-foreground">
                            <strong className="text-red-400">Altitude Warning:</strong> {season.tip}
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
                  Things to Do in Leadville
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Mining history, Mount Elbert, and high-altitude experiences.</p>
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
                  🌿 420 Cannabis Laws & Altitude Safety
                </span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-red-500/5 border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold">Altitude Adjustment</h3>
                </div>
                <p className="text-sm text-muted-foreground">Reduce dosing by 50-75%. At 10,152 ft, cannabis effects are 60% more intense. Wait 48 hours before first use.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Car className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Safe Travel</h3>
                </div>
                <p className="text-sm text-muted-foreground">Never drive after cannabis. Mountain roads at altitude demand full alertness. Use lodging shuttles or stay sober when driving.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "Private Lodging", note: "With owner permission" },
                  { place: "Indoor Rental Properties", note: "Designated areas" },
                  { place: "Private Homes", note: "With permission" },
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
                  { place: "Mount Elbert Trail", fine: "Federal land" },
                  { place: "National Forest", fine: "Prohibited" },
                  { place: "Public Roads", fine: "Civil citation" },
                  { place: "Downtown Leadville", fine: "Ordinance violation" },
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
                  🌿 420 Altitude Lodging
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
                  Get the Leadville Cannabis Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">Free PDF with altitude dosing charts, Mount Elbert safety tips, and high-elevation cannabis guidelines.</p>
              
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
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">{guide.distance} from Leadville</Badge>
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

export default LeadvilleGuide;
