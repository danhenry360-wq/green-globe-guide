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
  Zap, Mountain, Camera, AlertTriangle, Ban, ExternalLink, Compass
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Leadville Cannabis Travel Guide 2025",
    "description": "Extreme altitude cannabis guide for Leadville, Colorado at 10,152 feet. Mining heritage, mountain activities, dispensaries, 420-friendly lodging, and altitude-specific cannabis tips.",
    "url": "https://budquest.guide/leadville",
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "about": { "@type": "City", "name": "Leadville", "address": { "@type": "PostalAddress", "addressLocality": "Leadville", "addressRegion": "CO", "addressCountry": "US" } },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is cannabis legal in Leadville?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, recreational cannabis is legal for adults 21+. Extreme altitude demands special precautions." } },
      { "@type": "Question", "name": "What's the elevation in Leadville?", "acceptedAnswer": { "@type": "Answer", "text": "10,152 feet - the second-highest incorporated city in the US. Effects are 60% more intense." } },
      { "@type": "Question", "name": "How much cannabis should I use at altitude?", "acceptedAnswer": { "@type": "Answer", "text": "Start with 25-33% of your normal dose. Wait 4+ hours before additional consumption. High altitude = extreme effects." } }
    ]
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "-5 to 15°F",
      highlights: ["Extreme alpine skiing", "Heavy snowfall", "Quiet mountain solitude", "Mining town charm"],
      tip: "10K+ elevation + cold + cannabis = severe effects. Consume 25% normal dose. Extreme weather requires caution."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "45-70°F",
      highlights: ["Mountain biking paradise", "Hiking at extreme altitude", "Blue skies and wildflowers", "Off-season quiet"],
      tip: "Acclimatize 24 hours before cannabis use. Light edibles on easy trails only. Never hike while impaired at altitude."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "35-55°F",
      highlights: ["Golden aspen trees", "Crisp alpine air", "Best hiking weather", "Fewer tourists"],
      tip: "Perfect season for visiting. Stunning scenery, mild weather, and altitude adjustment time. Autumn colors stunning."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "25-50°F",
      highlights: ["Winter sports ending", "Wildflowers blooming", "Spring melt in streams", "Longer daylight"],
      tip: "Spring is recovery season. Still high altitude but moderate temps. Allow extra acclimatization time."
    }
  ];

  const attractions = [
    {
      name: "Mount Elbert",
      icon: Mountain,
      description: "Colorado's highest peak at 14,440 ft. Technical alpine climbing and extreme altitude experience.",
      cannabisTip: "CRITICAL: Do not consume cannabis before climbing. Altitude + THC = dangerous oxygen deprivation.",
      address: "Mount Elbert Trailhead"
    },
    {
      name: "Turquoise Lake",
      icon: Compass,
      description: "High-altitude mountain lake perfect for fishing and scenic walks.",
      cannabisTip: "Light edible on easy walks only. Altitude effects + oxygen = unpredictable. Never consume alone at altitude.",
      address: "Turquoise Lake Road"
    },
    {
      name: "Leadville Mining Heritage",
      icon: Zap,
      description: "Historic Silver Rush mining town with 1880s character and museums.",
      cannabisTip: "Explore town history sober. Cannabis tourism comes after historical appreciation.",
      address: "Historic Downtown"
    },
    {
      name: "Alpine Skiing",
      icon: Snowflake,
      description: "Ski Cooper Resort - 2,000 vertical feet of slopes at extreme elevation.",
      cannabisTip: "No consumption on slopes. Altitude + skiing + cannabis = dangerous. Enjoy après-ski only at lodges."
    },
    {
      name: "Mountain Biking",
      icon: Bike,
      description: "World-class trails through high mountain terrain. Varying difficulty levels.",
      cannabisTip: "Only on easy trails after acclimatization. Balance + 10K ft elevation = serious injury risk if impaired."
    },
    {
      name: "Leadville National Fish Hatchery",
      icon: Leaf,
      description: "Beautiful hatchery facility showcasing Colorado's fish stocking program.",
      cannabisTip: "Educational and peaceful. Light cannabis experience only - respect the wildlife sanctuary."
    }
  ];

  const transportOptions = [
    { name: "Personal Vehicle", icon: Car, description: "Required for most attractions. High altitude driving takes longer.", tip: "Never drive after consuming. Altitude affects impairment perception." },
    { name: "Rideshare (Uber/Lyft)", icon: Bus, description: "Limited availability in mountain towns. Book in advance.", tip: "Use instead of driving after cannabis use. Safety critical at altitude." },
    { name: "Hiking/Walking", icon: Bike, description: "Downtown is walkable. Trail access requires acclimatization.", tip: "Only hike sober at extreme altitude. Cannabis + 10K ft = dangerous." },
    { name: "Shuttle Services", icon: MapPinned, description: "Local shuttles connect ski areas and trailheads.", tip: "Most convenient for post-cannabis activities." }
  ];

  const neighborhoods = [
    { name: "Historic Downtown", desc: "Mining town charm with shops, restaurants, dispensaries. Heart of Leadville.", safety: "safe", walkable: true },
    { name: "South Leadville", desc: "Residential area with quick access to mining history sites.", safety: "safe", walkable: false },
    { name: "West Side", desc: "Quieter area near mountain trails and natural features.", safety: "safe", walkable: false },
    { name: "Lake Area", desc: "Near Turquoise Lake with scenic mountain views.", safety: "safe", walkable: false },
    { name: "Alpine Ridge", desc: "High elevation residential with panoramic vistas.", safety: "safe", walkable: false },
    { name: "Ski Cooper Area", desc: "Near ski resort with winter sport access.", safety: "safe", walkable: false }
  ];

  const relatedGuides = [
    { name: "Vail", slug: "/vail", desc: "Lower elevation luxury ski resort", distance: "2 hours" },
    { name: "Denver", slug: "/denver", desc: "Cannabis epicenter at lower elevation", distance: "2.5 hours" },
    { name: "Aspen", slug: "/aspen", desc: "Luxury ski town nearby", distance: "1 hour" }
  ];

  return (
    <>
      <Helmet>
        <title>Leadville Cannabis Travel Guide 2025 | Extreme Altitude 10,152 ft Cannabis | BudQuest</title>
        <meta name="description" content="Complete Leadville cannabis guide at 10,152 feet elevation. Extreme altitude cannabis effects, mining heritage, mountain activities, dispensaries, and critical altitude warnings." />
        <meta name="keywords" content="Leadville cannabis, extreme altitude cannabis, high elevation effects, Leadville dispensaries, 420 hotels Leadville, mountain cannabis" />
        <link rel="canonical" href="https://budquest.guide/leadville" />
        <meta property="og:title" content="Leadville Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Guide to cannabis at extreme 10,152 foot elevation. Intensity increases 60%. Critical altitude safety guide." />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Leadville" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Leadville</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-2.jpg" alt="Leadville Colorado extreme altitude mountains" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-red-500/10 text-red-400 border-red-500/30 flex w-fit mx-auto">
                <AlertTriangle className="w-4 h-4 mr-2" />
                EXTREME ALTITUDE WARNING
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Leadville Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                America's highest incorporated city at 10,152 feet. Cannabis effects are 60% more intense. Historic mining town with extreme altitude experiences. Extreme caution required.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-red-500/20 hover:bg-red-500/30 text-red-400">
                  <a href="#warnings"><AlertTriangle className="w-5 h-5 mr-2" />Read Altitude Warnings</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
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
                { icon: Store, label: "Dispensaries", value: "8+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "10,152 ft" },
                { icon: AlertTriangle, label: "Effect Intensity", value: "+60%" },
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
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Time to Visit Leadville
                </span>
              </h2>
            </div>

            <Tabs defaultValue="summer">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50">
                {seasons.map((s) => (
                  <TabsTrigger key={s.id} value={s.id}>
                    <s.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                    {s.name}
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
                            <h3 className="text-xl font-bold">{season.name}</h3>
                            <p className="text-sm text-muted-foreground">{season.months}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-medium mb-4">
                          <Clock className="w-5 h-5 text-accent" />
                          {season.temp}
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h4 className="font-semibold mb-3">Season Highlights</h4>
                        <ul className="space-y-2 mb-4">
                          {season.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-sm"><strong className="text-red-400">Altitude Alert:</strong> {season.tip}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                What to Do in Leadville
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attr) => (
                <Card key={attr.name} className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <attr.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{attr.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-accent font-medium mb-1">⚠️ Altitude Tip</p>
                    <p className="text-xs text-muted-foreground">{attr.cannabisTip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="warnings" className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                CRITICAL: Extreme Altitude Cannabis Warnings
              </span>
            </h2>
            
            <Card className="p-6 bg-red-500/10 border-red-500/30 mb-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-red-400 mb-3">10,152 Foot Elevation = Extreme Cannabis Effects</h3>
                  <p className="text-muted-foreground mb-4">
                    Leadville is the second-highest incorporated city in the United States. At this altitude, your body has 30% less oxygen. Cannabis effects are magnified by 50-80%.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-400" /> 25-33% of normal dose only</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-400" /> Wait 4+ hours before additional consumption</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-400" /> Extreme anxiety and paranoia at altitude possible</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-400" /> High altitude cerebral edema (HACE) risk if unprepared</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-400" /> Severe dehydration amplifies effects exponentially</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-green-500/5 border-green-500/20">
                <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Safe Leadville Cannabis Use
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Arrive 24 hours before consuming</li>
                  <li>• Use 25-33% normal dose maximum</li>
                  <li>• Edibles only (smoking worse at altitude)</li>
                  <li>• Never consume alone</li>
                  <li>• Stay at 420-friendly lodges</li>
                  <li>• Drink 2-3x normal water intake</li>
                  <li>• Have emergency supplies nearby</li>
                </ul>
              </Card>

              <Card className="p-6 bg-red-500/5 border-red-500/20">
                <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
                  <Ban className="w-5 h-5" />
                  Never Do These at Altitude
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Don't consume and hike/climb</li>
                  <li>• Don't drive after using</li>
                  <li>• Don't use alone in wilderness</li>
                  <li>• Don't ski while impaired</li>
                  <li>• Don't underestimate altitude effects</li>
                  <li>• Don't ignore altitude sickness symptoms</li>
                  <li>• Don't mix with alcohol at altitude</li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
              <h3 className="font-bold text-lg text-yellow-500 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Altitude Sickness Signs (Seek Medical Help Immediately)
              </h3>
              <p className="text-sm text-muted-foreground mb-3">Cannabis can mask or worsen altitude sickness symptoms. Watch for:</p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>• Severe headache or dizziness</div>
                <div>• Difficulty breathing (beyond normal)</div>
                <div>• Chest tightness or pain</div>
                <div>• Confusion or impaired judgment</div>
                <div>• Extreme fatigue or weakness</div>
                <div>• Loss of coordination</div>
                <div>• Blue lips or nail beds</div>
                <div>• Call 911 if experiencing any of these</div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Getting Around
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {transportOptions.map((opt) => (
                <Card key={opt.name} className="bg-card/50 border-border/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <opt.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{opt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{opt.description}</p>
                  <p className="text-xs text-accent bg-accent/10 p-2 rounded">⚠️ {opt.tip}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Best Neighborhoods
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhoods.map((h) => (
                <Card key={h.name} className="p-4 bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                  <h4 className="font-semibold text-accent mb-2">{h.name}</h4>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Dispensaries
              </span>
            </h2>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading dispensaries...</div>
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
                <p className="text-muted-foreground">Dispensaries in Leadville - consult local guides for current options!</p>
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
                    Get the Complete Leadville Guide
                  </span>
                </h2>
                <p className="text-muted-foreground">Altitude survival tips + cannabis safety at 10,152 feet</p>
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
              {relatedGuides.map((g) => (
                <Link key={g.name} to={g.slug}>
                  <Card className="bg-card/50 border-border/30 p-6 hover:border-accent/50 transition-all h-full">
                    <h3 className="font-bold text-lg text-accent mb-2">{g.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{g.distance}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </div>
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

export default LeadvilleGuide;
