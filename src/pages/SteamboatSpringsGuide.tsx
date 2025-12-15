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
  Waves, Mountain, Camera, AlertTriangle, Ban, ExternalLink, Compass, Zap
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Steamboat Springs Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Steamboat Springs, Colorado. Skiing, hot springs, dispensaries, 420-friendly lodging, and expert tips.",
    "url": "https://budquest.guide/steamboat-springs",
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "about": { "@type": "City", "name": "Steamboat Springs", "address": { "@type": "PostalAddress", "addressLocality": "Steamboat Springs", "addressRegion": "CO", "addressCountry": "US" } },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is cannabis legal in Steamboat Springs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, recreational cannabis is legal for adults 21+. Possess up to 1 ounce from licensed dispensaries." } },
      { "@type": "Question", "name": "Can I consume at hot springs?", "acceptedAnswer": { "@type": "Answer", "text": "No, public hot springs prohibit consumption. Many 420-friendly lodges have private hot tub access." } },
      { "@type": "Question", "name": "Best activities combining skiing and cannabis?", "acceptedAnswer": { "@type": "Answer", "text": "Ski powder days, then relax at thermal hot springs with cannabis at your 420-friendly lodge." } }
    ]
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "5-25°F",
      highlights: ["World-class powder skiing", "Après-ski hot springs relaxation", "Cozy lodge vibes", "Snow-covered mountain scenery"],
      tip: "Winter is paradise - ski challenging terrain, then soak in 140°F hot springs to relax muscles and cannabis effects."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "65-80°F",
      highlights: ["Mountain biking and hiking", "Hot springs without snow", "Outdoor concerts", "Clear blue skies"],
      tip: "Summer outdoor + edibles = perfect mountain exploration. Hydrate well and never hike impaired."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "35-60°F",
      highlights: ["Golden aspen trees", "Fall colors peak", "Fewer crowds", "Crisp mountain air"],
      tip: "October is ideal - beautiful weather, affordable lodging, and peaceful hot springs without summer crowds."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "30-55°F",
      highlights: ["Late spring skiing", "Wildflower blooms", "Snowmelt in streams", "Mild afternoons"],
      tip: "Spring skiing followed by hot springs relaxation is unique. Perfect combo for cannabis-friendly mountain lovers."
    }
  ];

  const attractions = [
    {
      name: "Steamboat Ski Resort",
      icon: Mountain,
      description: "Famous for 'Champagne Powder' snow. 2,965 acres with varied terrain for all skill levels.",
      cannabisTip: "No consumption on resort grounds. Enjoy après-ski at 420-friendly lodges only.",
      address: "Steamboat Springs, CO"
    },
    {
      name: "Hot Springs Pool",
      icon: Waves,
      description: "Natural thermal hot springs at 104°F. Historic public bathing experience.",
      cannabisTip: "Public facility - no consumption. Many lodges have private hot tubs for cannabis relaxation.",
      address: "Central Steamboat"
    },
    {
      name: "Routt National Forest",
      icon: Compass,
      description: "800,000 acres of pristine wilderness with hiking and mountain biking trails.",
      cannabisTip: "Light edibles on easy trails only. Never bike or hike while impaired.",
      address: "Surrounding Steamboat"
    },
    {
      name: "Fish Creek Falls",
      icon: Leaf,
      description: "Scenic 283-foot waterfall with easy walking trail. Perfect relaxation spot.",
      cannabisTip: "Peaceful natural setting ideal for light cannabis experience. Bring water.",
      address: "Fish Creek Falls Trail"
    },
    {
      name: "Steamboat Art Museum",
      icon: Camera,
      description: "Contemporary art in historic downtown. Cultural hub of the community.",
      cannabisTip: "Creative cannabis experience - art and cannabis pair well. No consumption on premises.",
      address: "Downtown Steamboat"
    },
    {
      name: "Downtown Steamboat",
      icon: Building2,
      description: "Historic western town with shops, restaurants, galleries, and brewery scene.",
      cannabisTip: "Most dispensaries and 420-friendly restaurants in downtown area.",
      address: "Lincoln Avenue"
    }
  ];

  const transportOptions = [
    { name: "Free Town Shuttle", icon: Bus, description: "Connects downtown to ski resort. Free all year.", tip: "Easiest way to get around. Never drive after consuming." },
    { name: "Rideshare", icon: Car, description: "Uber/Lyft available. Essential for dispensary visits.", tip: "Use for all post-cannabis transport. DUI laws enforced." },
    { name: "Mountain Biking", icon: Bike, description: "Extensive trail system. Summer season peak.", tip: "Only bike when fully sober. Balance + trails = safety risk." },
    { name: "Walking", icon: MapPinned, description: "Downtown and resort areas are walkable.", tip: "Safe, scenic exploration of the charming town." }
  ];

  const neighborhoods = [
    { name: "Downtown Steamboat", desc: "Historic western charm with shops, restaurants, dispensaries. Heart of town.", safety: "very-safe", walkable: true },
    { name: "Ski Town Base", desc: "Resort area with modern lodging and dining. Direct slope access.", safety: "very-safe", walkable: true },
    { name: "Old Town", desc: "Authentic historic district with galleries and local character.", safety: "safe", walkable: true },
    { name: "Gondola District", desc: "Upscale residential area near ski access.", safety: "very-safe", walkable: true },
    { name: "Hayden", desc: "Charming smaller town 20 minutes south. Rural feel.", safety: "safe", walkable: false },
    { name: "Stagecoach", desc: "Mountain hamlet with outdoor recreation focus.", safety: "safe", walkable: false }
  ];

  const relatedGuides = [
    { name: "Aspen", slug: "/aspen", desc: "Luxury ski resort nearby", distance: "3 hours" },
    { name: "Vail", slug: "/vail", desc: "Premium ski and cannabis scene", distance: "2.5 hours" },
    { name: "Denver", slug: "/denver", desc: "Cannabis epicenter", distance: "3 hours" }
  ];

  return (
    <>
      <Helmet>
        <title>Steamboat Springs Cannabis Travel Guide 2025 | Ski, Powder & Hot Springs | BudQuest</title>
        <meta name="description" content="Complete Steamboat Springs cannabis guide. Skiing, hot springs, dispensaries, 420-friendly lodging, and cannabis travel tips in Colorado's premier mountain town." />
        <meta name="keywords" content="Steamboat Springs cannabis, skiing and cannabis, hot springs Colorado, 420 hotels Steamboat, cannabis travel Steamboat" />
        <link rel="canonical" href="https://budquest.guide/steamboat-springs" />
        <meta property="og:title" content="Steamboat Springs Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Guide to cannabis in Steamboat Springs. Combine skiing and hot springs with 420-friendly experiences." />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Steamboat Springs" />
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
            <li className="text-foreground font-medium">Steamboat Springs</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-2.jpg" alt="Steamboat Springs ski resort and hot springs" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Waves className="w-4 h-4 mr-2" />
                Ski & Soak Cannabis Paradise
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Steamboat Springs Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine world-class skiing with natural hot springs relaxation. Experience cannabis culture in Colorado's premier mountain paradise with thermal wellness.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Hot Spring Lodges</a>
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
                { icon: Store, label: "Dispensaries", value: "12+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Home, label: "420 Lodges", value: "20+" },
                { icon: Waves, label: "Hot Springs", value: "104°F" },
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
                  Best Time to Visit Steamboat Springs
                </span>
              </h2>
            </div>

            <Tabs defaultValue="winter">
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
                        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                          <p className="text-sm"><strong className="text-accent">Pro Tip:</strong> {season.tip}</p>
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
                What to Do in Steamboat Springs
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
                    <p className="text-xs text-accent font-medium mb-1">Cannabis Tip</p>
                    <p className="text-xs text-muted-foreground">{attr.cannabisTip}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {attr.address}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Cannabis Laws & Hot Springs Guide
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
                <p className="text-sm text-muted-foreground">Adults 21+ can possess up to 1 ounce from licensed dispensaries.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Waves className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold">Hot Springs Protocol</h3>
                </div>
                <p className="text-sm text-muted-foreground">Public hot springs prohibit consumption. Private lodge hot tubs welcome cannabis users.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "420-Friendly Lodges", note: "Private hot tubs and rooms" },
                  { place: "Private Residences", note: "With owner permission" },
                  { place: "Private Patios", note: "On your lodging property" },
                  { place: "Consumption Lounges", note: "Limited locations available" }
                ].map((item) => (
                  <div key={item.place} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{item.place}</span>
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
                  { place: "Ski Resort Grounds", fine: "Federal offense" },
                  { place: "Public Hot Springs", fine: "Ejection + fine" },
                  { place: "National Forests", fine: "Federal offense" },
                  { place: "Public Parks", fine: "$100+ fine" },
                  { place: "Restaurants/Bars", fine: "Prohibited" },
                  { place: "While Driving", fine: "DUI charges" }
                ].map((item) => (
                  <div key={item.place} className="flex items-start gap-2">
                    <Ban className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{item.place}</span>
                      <span className="text-red-400 text-sm font-medium"> — {item.fine}</span>
                    </div>
                  </div>
                ))}
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
                  <p className="text-xs text-accent bg-accent/10 p-2 rounded">💡 {opt.tip}</p>
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-accent">{h.name}</h4>
                    <Badge variant="outline" className={h.safety === 'very-safe' ? 'border-green-500/50 text-green-400' : 'border-accent/50 text-accent'}>
                      {h.walkable && "🚶"}
                    </Badge>
                  </div>
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
                        {d.is_recreational && <Badge className="bg-accent/20 text-accent border-accent/30">Recreational</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">Dispensaries coming soon to Steamboat Springs!</p>
              </Card>
            )}
          </div>
        </section>

        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🌿 420 Hot Springs Lodges
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
                      <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {r.address}
                      </p>
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
                <p className="text-muted-foreground">420-friendly lodges available - contact local tourism board!</p>
              </Card>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="bg-gradient-to-br from-accent/10 via-background to-accent/5 border-accent/20 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Get the Full Steamboat Guide
                  </span>
                </h2>
                <p className="text-muted-foreground">Ski + hot springs + cannabis tips delivered to your inbox</p>
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

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Explore Other Colorado Destinations
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

export default SteamboatSpringsGuide;
