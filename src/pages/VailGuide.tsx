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
  MapPin, Star, CheckCircle, 
  Plane, Home, Cannabis, Shield, 
  ArrowRight, Bed, Store, ChevronRight,
  Building2, AlertCircle, Clock, Car,
  Bus, Bike, MapPinned, Snowflake, Sun, Leaf, Flower2,
  Sparkles, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, 
  ExternalLink, Compass
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
  website: string | null;
  amenities?: unknown;
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Vail Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Vail, Colorado including luxury dispensaries, 420-friendly ski resorts, marijuana laws, and expert tips for high-altitude cannabis experiences.",
    "url": "https://budquest.guide/vail",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Vail",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vail",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cannabis legal in Vail?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Vail for adults 21 and older. You can possess up to 1 ounce and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Can I consume cannabis at ski resorts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Ski resorts are federal land where cannabis is prohibited. Consume only at your 420-friendly lodging with permission."
        }
      },
      {
        "@type": "Question",
        "name": "What's the elevation in Vail?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vail sits at 8,150 feet elevation. High-altitude effects intensify cannabis experiences. Start low and go slow when acclimatizing."
        }
      },
      {
        "@type": "Question",
        "name": "Best time to visit Vail for cannabis tourism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Winter (December-March) for skiing combined with après-ski cannabis relaxation. Summer for hiking and outdoor adventures."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "10-30°F",
      highlights: [
        "World-class skiing at Vail Resort",
        "après-ski relaxation at 420-friendly lodges",
        "Powder days and mountain beauty",
        "Luxurious spa experiences"
      ],
      tip: "High altitude + cannabis = intense effects. Consume less than you normally would. Altitude-friendly edibles recommended."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "60-75°F",
      highlights: [
        "Hiking and mountain biking trails",
        "Clear mountain skies perfect for stargazing",
        "Outdoor concerts and festivals",
        "Less crowded than winter season"
      ],
      tip: "Summer hiking + edibles = amazing nature experiences. Start early, stay hydrated, and never hike impaired."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-60°F",
      highlights: [
        "Stunning aspen trees changing colors",
        "Crisp mountain air and clear days",
        "Fewer tourists, better deals",
        "Golden hour photography perfect"
      ],
      tip: "Fall is the sweet spot. Great weather, beautiful scenery, and smaller crowds mean more personalized dispensary experiences."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "35-55°F",
      highlights: [
        "Late season skiing on spring snow",
        "Wildflower meadows blooming",
        "Mountain streams flowing with snowmelt",
        "Adventure season begins"
      ],
      tip: "Spring skiing combined with cannabis relaxation. Late afternoon sessions followed by apres-ski at your 420-friendly lodge."
    }
  ];

  const attractions = [
    {
      name: "Vail Resort Skiing",
      icon: Mountain,
      description: "One of North America's premier ski destinations with 5,289 acres of terrain. World-class runs for all skill levels.",
      cannabisTip: "Cannabis is prohibited on ski resort grounds (federal land). Enjoy après-ski sessions only at your lodging after skiing.",
      address: "Vail, Colorado"
    },
    {
      name: "Gore Range Hiking",
      icon: Compass,
      description: "Stunning alpine trails with breathtaking mountain vistas. Numerous difficulty levels from easy walks to challenging peaks.",
      cannabisTip: "High altitude intensifies effects. Consume a light edible before easy trails only. Never consume and hike simultaneously.",
      address: "Gore Range Mountains"
    },
    {
      name: "Beaver Creek Resort",
      icon: Sparkles,
      description: "Luxury resort village with shopping, dining, and spa services. Adjacent to Vail with upscale atmosphere.",
      cannabisTip: "Post-ski relaxation spot. Many 420-friendly lodges in the Beaver Creek area offer premium cannabis experiences.",
      address: "Beaver Creek Village"
    },
    {
      name: "Ford Amphitheater",
      icon: Camera,
      description: "Summer outdoor concert venue nestled in the mountains. World-class performances in scenic setting.",
      cannabisTip: "Cannabis is prohibited at events. Consume beforehand responsibly, never at the venue itself.",
      address: "Vail, Colorado"
    },
    {
      name: "Betty Ford Alpine Gardens",
      icon: Leaf,
      description: "Beautiful 8-acre alpine gardens at high elevation. Unique plants adapted to mountain environment.",
      cannabisTip: "Peaceful spot for reflection. Light edible + garden stroll = meditative mountain experience.",
      address: "Vail Pass"
    },
    {
      name: "Vail Village",
      icon: Building2,
      description: "Charming pedestrian-friendly village with restaurants, shops, galleries, and nightlife. Heart of Vail's apres-ski scene.",
      cannabisTip: "Dispensaries and 420-friendly restaurants throughout. Perfect for evening exploration post-skiing.",
      address: "Vail Village Center"
    }
  ];

  const transportOptions = [
    {
      name: "Vail Mountain Shuttle",
      icon: Bus,
      description: "Free shuttle system connecting Vail Village to ski slopes and neighborhoods. Frequent service during ski season.",
      tip: "Easy transportation between lodging and slopes. Never drive impaired - use shuttles instead."
    },
    {
      name: "Rideshare (Uber/Lyft)",
      icon: Car,
      description: "Available throughout Vail valley. Essential for dispensary runs and apres-ski activities.",
      tip: "Always use rideshare after consuming. DUI laws strictly enforced in mountain communities."
    },
    {
      name: "Mountain Biking",
      icon: Bike,
      description: "Extensive trail system for all skill levels. Rental shops throughout Vail village.",
      tip: "Only bike when fully sober. High altitude + impaired balance = serious safety risk on mountain trails."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Vail Village is highly walkable with shops, restaurants, and dispensaries within easy reach.",
      tip: "Most of Vail village is accessible on foot. Safe, scenic, and allows exploration of the area."
    }
  ];

  const neighborhoods = [
    { 
      name: "Vail Village", 
      desc: "Charming alpine village with luxury shops, restaurants, galleries. Heart of Vail's apres-ski culture and dispensaries.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Beaver Creek Village", 
      desc: "Upscale resort village with premium accommodations and dining. Luxury 420-friendly lodging options.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Golden Peak", 
      desc: "Resort base area with modern amenities, restaurants, and direct ski access. Convenient lodging choices.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Avon", 
      desc: "Charming town between Vail and Beaver Creek. Quieter atmosphere with local restaurants and shops.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Edwards", 
      desc: "Mountain community with Western charm. Local restaurants and dispensaries with genuine mountain feel.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Minturn", 
      desc: "Historic mining town with authentic Colorado character. Growing cannabis-friendly dining and lodging scene.",
      safety: "safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Aspen", slug: "/aspen", desc: "Luxury ski resort with upscale cannabis scene", distance: "2 hours" },
    { name: "Breckenridge", slug: "/breckenridge", desc: "Vibrant ski town with craft cannabis culture", distance: "1.5 hours" },
    { name: "Denver", slug: "/denver", desc: "Cannabis epicenter with 200+ dispensaries", distance: "2 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>Vail Cannabis Travel Guide 2025 | Luxury Ski Resort Dispensaries & 420 Hotels | BudQuest</title>
        <meta name="description" content="Plan your Vail cannabis trip with our 2025 guide. Find luxury dispensaries, 420-friendly ski resort lodging, marijuana laws, high-altitude tips, and expert skiing + cannabis experiences." />
        <meta name="keywords" content="Vail cannabis, Vail dispensaries, 420-friendly hotels Vail, Vail marijuana laws, ski resort cannabis, Vail weed tourism, Colorado cannabis Vail, luxury cannabis experience" />
        <link rel="canonical" href="https://budquest.guide/vail" />
        
        <meta property="og:title" content="Vail Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Luxury cannabis travel guide for Vail. Dispensaries, 420-friendly ski lodges, and high-altitude cannabis tips." />
        <meta property="og:url" content="https://budquest.guide/vail" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-2.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vail Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Cannabis guide for Vail with luxury dispensaries, ski resort tips, and high-altitude insights." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Vail" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Vail</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-2.jpg" 
              alt="Vail Colorado luxury ski resort surrounded by mountains" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Cannabis className="w-4 h-4 mr-2" />
                Luxury Ski Cannabis
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Vail Cannabis Travel Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                North America's premier ski destination meets Colorado's cannabis culture. Combine world-class skiing with luxury 420-friendly après-ski relaxation at 8,150 feet elevation.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Ski Lodges</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Facts - Enhanced */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "15+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Home, label: "420 Lodges", value: "25+" },
                { icon: Mountain, label: "Elevation", value: "8,150 ft" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
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

        {/* Best Time to Visit */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Time to Visit Vail
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each season offers unique experiences for cannabis-friendly mountain adventure seekers.
              </p>
            </motion.div>

            <Tabs defaultValue="winter" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 p-1">
                {seasons.map((season) => (
                  <TabsTrigger 
                    key={season.id} 
                    value={season.id}
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    <season.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                    {season.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
                              <strong className="text-accent">Pro Tip:</strong> {season.tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* What to Do in Vail */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  What to Do in Vail
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                World-class skiing, hiking, and luxury experiences. Perfect for combining cannabis relaxation with mountain adventure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <attraction.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground">{attraction.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
                    <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                      <p className="text-xs text-accent font-medium mb-1">Cannabis Traveler Tip</p>
                      <p className="text-xs text-muted-foreground">{attraction.cannabisTip}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {attraction.address}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Info - Enhanced Consumption Rules */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Vail Cannabis Laws & Consumption Rules
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Know the rules before you go. High-altitude cannabis has different effects - start with less than usual.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Recreational Legal</h3>
                </div>
                <p className="text-sm text-muted-foreground">Adults 21+ can purchase and possess up to 1 oz of cannabis from licensed dispensaries with valid government ID.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">High Altitude Effect</h3>
                </div>
                <p className="text-sm text-muted-foreground">At 8,150 ft, cannabis effects are significantly intensified. Reduced oxygen + THC = stronger experience. Use 50% less than normal.</p>
              </Card>
            </div>

            {/* Where You CAN Consume */}
            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "420-Friendly Lodges", note: "Designated smoking areas with views" },
                  { place: "Private Patios/Balconies", note: "With property owner permission" },
                  { place: "Private Residences", note: "With homeowner's express permission" },
                  { place: "Licensed Consumption Lounges", note: "Limited locations in Vail valley" },
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

            {/* Where You CANNOT Consume */}
            <Card className="p-6 bg-red-500/5 border-red-500/20 mb-6">
              <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
                <Ban className="w-5 h-5" />
                Where You CANNOT Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "Ski Resort Grounds", fine: "Federal offense" },
                  { place: "Public Streets", fine: "$100+ fine" },
                  { place: "National Forests", fine: "Federal offense" },
                  { place: "Hotel Lobbies", fine: "Eviction + fine" },
                  { place: "Restaurants & Bars", fine: "Prohibited" },
                  { place: "Vehicle (moving)", fine: "DUI charges" },
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

            {/* Critical Warning */}
            <Card className="p-6 bg-amber-500/10 border-amber-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-500/20 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-400 mb-2">High-Altitude Cannabis Warning</h3>
                  <p className="text-muted-foreground mb-3">
                    Vail's 8,150-foot elevation dramatically intensifies cannabis effects. Reduced oxygen levels + THC = stronger physical and mental effects than normal.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Start with 50% of your normal dose
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Edibles take longer at altitude - wait 3+ hours before additional doses
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Stay hydrated - altitude dehydration amplifies effects
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Never ski/hike while impaired - safety first
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Getting Around Vail */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Getting Around Vail
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transportation options for cannabis travelers. Mountain safety is critical - never drive impaired.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {transportOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <option.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground">{option.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                    <p className="text-xs text-accent bg-accent/10 p-2 rounded">💡 {option.tip}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Safe Neighborhoods */}
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Best Neighborhoods for Cannabis Travelers
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhoods.map((hood) => (
                <Card key={hood.name} className="p-4 bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-accent">{hood.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        hood.safety === 'very-safe' ? 'border-green-500/50 text-green-400' :
                        hood.safety === 'safe' ? 'border-accent/50 text-accent' :
                        'border-amber-500/50 text-amber-400'
                      }`}
                    >
                      {hood.walkable && "🚶 Walkable"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{hood.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Top Vail Dispensaries
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Luxury cannabis retailers catering to upscale travelers and locals. Premium products and knowledgeable staff.
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading dispensaries...</p>
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {dispensaries.map((dispensary, index) => (
                  <motion.div
                    key={dispensary.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      {dispensary.image && (
                        <div className="h-48 overflow-hidden">
                          <img src={dispensary.image} alt={dispensary.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-foreground">{dispensary.name}</h3>
                        {dispensary.rating && (
                          <div className="flex gap-1 mb-3">
                            {renderRating(dispensary.rating)}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4" />
                          {dispensary.address}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {dispensary.is_recreational && (
                            <Badge className="bg-accent/20 text-accent border-accent/30">Recreational</Badge>
                          )}
                          {dispensary.is_medical && (
                            <Badge className="bg-accent/20 text-accent border-accent/30">Medical</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">No dispensaries found. Check back soon as more cannabis retailers expand to Vail.</p>
              </Card>
            )}
          </div>
        </section>

        {/* 420 Hotels Section */}
        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Ski Lodges & Hotels
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Premium accommodations that welcome cannabis-friendly travelers. Luxury lodges with designated consumption areas and apres-ski amenities.
              </p>
            </motion.div>

            {rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {rentals.map((rental, index) => (
                  <motion.div
                    key={rental.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      {rental.images && rental.images.length > 0 && (
                        <div className="h-48 overflow-hidden">
                          <img src={rental.images[0]} alt={rental.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-foreground">{rental.name}</h3>
                        {rental.rating && (
                          <div className="flex gap-1 mb-3">
                            {renderRating(rental.rating)}
                          </div>
                        )}
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{rental.address}</span>
                        </div>
                        {rental.website && (
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <a href={rental.website} target="_blank" rel="noopener noreferrer">
                              Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">420-friendly lodges available. Contact visitor center for current options.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="bg-gradient-to-br from-accent/10 via-background to-accent/5 border-accent/20 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Get the Full Vail Cannabis Guide
                  </span>
                </h2>
                <p className="text-muted-foreground">Receive travel tips, dispensary updates, and 420-friendly event news.</p>
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
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Explore Other Colorado Ski Towns
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <motion.div
                  key={guide.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link to={guide.slug}>
                    <Card className="bg-card/50 border-border/30 p-6 hover:border-accent/50 transition-all h-full hover:-translate-y-1">
                      <h3 className="font-bold text-lg text-accent mb-2">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{guide.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.distance} from Vail</span>
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </div>
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
