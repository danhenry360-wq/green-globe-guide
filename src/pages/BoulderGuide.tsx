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
  Music, Palette, Beer, TreePine, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, GraduationCap,
  ExternalLink, Compass, Tent, Utensils
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
}

const BoulderGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch only Boulder dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('city', 'Boulder')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      // Fetch only Boulder rentals (check address contains Boulder)
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Boulder%')
        .order('rating', { ascending: false })
        .limit(4);
      
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
        .insert({ email, source_page: 'boulder-guide' });
      
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
    "name": "Boulder Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Boulder, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and outdoor adventure tips.",
    "url": "https://budquest.guide/boulder",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Boulder",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Boulder",
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
        "name": "Is cannabis legal in Boulder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Boulder for adults 21 and older. You can possess up to 1 ounce and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I consume cannabis in Boulder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cannabis consumption is only legal on private property with owner's permission. Public consumption, including on hiking trails, is illegal."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Boulder from Denver International Airport?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Boulder is approximately 45 minutes from Denver International Airport (DIA). The Flatiron Flyer bus provides direct service."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Boulder unique for cannabis travelers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Boulder combines world-class outdoor recreation with progressive cannabis culture. The college town atmosphere, stunning Flatirons backdrop, and health-conscious community create a unique cannabis travel experience."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "40-65°F",
      highlights: [
        "420 celebrations throughout town",
        "Wildflower season begins in foothills",
        "Boulder Creek Festival (May)",
        "Fewer tourists on trails"
      ],
      tip: "April 20th is huge in Boulder - book accommodations early and expect busy dispensaries."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "65-88°F",
      highlights: [
        "Perfect hiking and outdoor weather",
        "Colorado Shakespeare Festival",
        "Farmers' markets in full swing",
        "Peak patio season for 420-friendly stays"
      ],
      tip: "Afternoon thunderstorms are daily - hike early, consume later."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "35-70°F",
      highlights: [
        "Golden aspen leaves in the mountains",
        "CU football game atmosphere",
        "Perfect temperatures for hiking",
        "Harvest season specials at dispensaries"
      ],
      tip: "September and early October offer the best weather and fewer crowds."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Easy access to ski resorts (1 hour)",
        "Cozy dispensary shopping",
        "Holiday specials and deals",
        "300+ days of sunshine means mild winters"
      ],
      tip: "Boulder stays warmer than the mountains - great base for ski trips."
    }
  ];

  const attractions = [
    {
      name: "Flatirons & Chautauqua Park",
      icon: Mountain,
      description: "Boulder's iconic rock formations with miles of hiking trails. The most photographed spot in Colorado.",
      cannabisTip: "No consumption on trails (public land). Enjoy your session before arriving for an enhanced nature experience.",
      address: "900 Baseline Rd"
    },
    {
      name: "Pearl Street Mall",
      icon: Building2,
      description: "Historic pedestrian mall with local shops, restaurants, and street performers. The heart of Boulder.",
      cannabisTip: "Window shop and people-watch. Multiple dispensaries within walking distance. No public consumption.",
      address: "Pearl Street, Downtown"
    },
    {
      name: "Boulder Creek Path",
      icon: TreePine,
      description: "16-mile paved path following Boulder Creek through town. Perfect for biking, walking, or running.",
      cannabisTip: "Great for a mellow afternoon stroll. Tube the creek in summer (sober). No public consumption.",
      address: "Central Boulder"
    },
    {
      name: "Craft Breweries",
      icon: Beer,
      description: "30+ craft breweries including Avery, Upslope, and Boulder Beer. Colorado's craft beer hub.",
      cannabisTip: "Don't mix heavily - choose one or the other. Many breweries are in dispensary-adjacent areas.",
      address: "Throughout Boulder"
    },
    {
      name: "University of Colorado Campus",
      icon: GraduationCap,
      description: "Beautiful campus with stunning mountain views. Explore the architecture and college town vibes.",
      cannabisTip: "Cannabis is prohibited on campus (federal funding). Admire from Pearl Street instead.",
      address: "1600 Broadway"
    },
    {
      name: "Eldorado Canyon State Park",
      icon: Tent,
      description: "World-class rock climbing, hiking, and nature just 8 miles from downtown Boulder.",
      cannabisTip: "State park - no cannabis consumption anywhere. Enjoy beforehand at your lodging.",
      address: "9 Kneale Rd, Eldorado Springs"
    }
  ];

  const transportOptions = [
    {
      name: "RTD Flatiron Flyer",
      icon: Bus,
      description: "Direct bus service from Denver/DIA to Boulder. FF1 runs frequently from Union Station.",
      tip: "Best option from Denver. ~45 min from Union Station, ~1 hour from DIA."
    },
    {
      name: "Rideshare (Uber/Lyft)",
      icon: Car,
      description: "Available throughout Boulder. Essential for dispensary runs and late-night travel.",
      tip: "Never drive after consuming. Budget $15-25 for trips around Boulder."
    },
    {
      name: "B-cycle & Biking",
      icon: Bike,
      description: "Boulder is one of America's most bike-friendly cities. 300+ miles of bike lanes and paths.",
      tip: "Rent a bike for the full Boulder experience. Don't ride impaired."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown Boulder and Pearl Street are extremely walkable. Most attractions within 1-2 miles.",
      tip: "Boulder is compact - you can walk almost everywhere in the central area."
    }
  ];

  const neighborhoods = [
    { 
      name: "Downtown/Pearl Street", 
      desc: "Heart of Boulder with shops, restaurants, and easy dispensary access. Most walkable area.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "The Hill", 
      desc: "College neighborhood near CU. Young, energetic vibe with affordable eats and cannabis culture.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "North Boulder", 
      desc: "Quieter residential area with great restaurants on North Broadway. Local feel.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "East Boulder", 
      desc: "More suburban with some dispensaries and hotels. Good for those with cars.",
      safety: "safe",
      walkable: false
    },
    { 
      name: "Gunbarrel", 
      desc: "Suburb northeast of Boulder. Some 420-friendly accommodations available.",
      safety: "very-safe",
      walkable: false
    },
    { 
      name: "South Boulder", 
      desc: "Near Chautauqua Park and the Flatirons. Great for outdoor enthusiasts.",
      safety: "very-safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "Colorado's capital and cannabis hub", distance: "30 min" },
    { name: "Colorado Springs", slug: "/usa/colorado", desc: "Gateway to Pikes Peak", distance: "1.5 hours" },
    { name: "Estes Park", slug: "/usa/colorado", desc: "Rocky Mountain gateway", distance: "45 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Boulder Cannabis Travel Guide 2025 | Dispensaries, 420 Hotels & Outdoor Adventures | BudQuest</title>
        <meta name="description" content="Plan your Boulder cannabis trip with our 2025 guide. Find dispensaries, 420-friendly hotels, hiking trails, and marijuana laws for Colorado's outdoor paradise." />
        <meta name="keywords" content="Boulder cannabis, Boulder dispensaries, 420-friendly hotels Boulder, Boulder marijuana laws 2025, Boulder weed tourism, Colorado cannabis Boulder, Flatirons cannabis, Boulder 420 travel" />
        <link rel="canonical" href="https://budquest.guide/boulder" />
        
        <meta property="og:title" content="Boulder Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Your complete guide to cannabis in Boulder. Find dispensaries, 420-friendly stays, hiking trails, and travel tips." />
        <meta property="og:url" content="https://budquest.guide/boulder" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-colorado.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boulder Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Complete Boulder cannabis guide with dispensaries, hotels, and outdoor activities." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Boulder" />
        
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
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Boulder</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-4 h-4 mr-2" />
                The Adventure Capital
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Boulder Cannabis Travel Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where stunning mountain scenery meets progressive cannabis culture. Boulder offers the perfect blend of outdoor adventure, college town energy, and world-class dispensaries.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Stays</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "25+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "5,430 ft" },
                { icon: Plane, label: "From DIA", value: "45 min" },
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
                  Best Time to Visit Boulder
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Boulder enjoys 300+ days of sunshine with distinct seasons. Each offers unique experiences for cannabis travelers.
              </p>
            </motion.div>

            <Tabs defaultValue="summer" className="w-full">
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

        {/* What to Do in Boulder */}
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
                  What to Do in Boulder
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Boulder blends outdoor adventure with cultural experiences - perfect for cannabis enthusiasts.
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
                  Boulder Cannabis Laws & Consumption Rules
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Boulder follows Colorado state law with some local considerations for outdoor enthusiasts.
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
                  <h3 className="font-semibold text-foreground">Outdoor Spaces</h3>
                </div>
                <p className="text-sm text-muted-foreground">Cannabis is prohibited on all hiking trails, parks, and open spaces - even though they feel private. Fines apply.</p>
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
                  { place: "Private Residences", note: "With property owner's permission" },
                  { place: "420-Friendly Lodging", note: "Designated areas only" },
                  { place: "Private Backyards/Patios", note: "If allowed by property" },
                  { place: "Some Private Events", note: "Verify beforehand" },
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
                  { place: "Hiking Trails & Trailheads", fine: "$100+ fine" },
                  { place: "Chautauqua & Open Space", fine: "$100+ fine" },
                  { place: "Pearl Street Mall", fine: "Prohibited" },
                  { place: "CU Campus", fine: "Federal offense" },
                  { place: "Boulder Creek Path", fine: "Prohibited" },
                  { place: "Any Public Space", fine: "$100+ fine" },
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

            {/* Outdoor Warning */}
            <Card className="p-6 bg-amber-500/10 border-amber-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-500/20 flex-shrink-0">
                  <Mountain className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-400 mb-2">Outdoor Recreation Warning</h3>
                  <p className="text-muted-foreground mb-3">
                    Boulder's outdoor spaces are <strong className="text-foreground">public land</strong> where cannabis consumption is strictly prohibited - 
                    this includes all hiking trails, trailheads, parks, and open spaces.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Consume at your lodging before hiking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Edibles are a discreet option for nature days
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Rangers do enforce consumption laws on trails
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Getting Around Boulder */}
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
                  Getting Around Boulder
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Boulder is compact and bike-friendly. Here's how to get around responsibly.
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

            {/* Neighborhoods */}
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
                        'border-accent/50 text-accent'
                      }`}
                    >
                      {hood.walkable ? "🚶 Walkable" : "🚗 Car needed"}
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
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Colorado Dispensaries
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
                        <img 
                          src={disp.images?.[0] || disp.image || "/dest-california.jpg"} 
                          alt={disp.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {disp.is_recreational && (
                            <Badge className="bg-green-500/90 text-white text-xs">Rec</Badge>
                          )}
                          {disp.is_medical && (
                            <Badge className="bg-blue-500/90 text-white text-xs">Med</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{disp.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{disp.city}, {disp.state}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderRating(disp.rating || 0)}
                          <span className="text-sm text-muted-foreground ml-1">({disp.rating || 0})</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No dispensaries found. Check back soon!</p>
              </Card>
            )}
          </div>
        </section>

        {/* Rentals Section */}
        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Stays
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
                        <img 
                          src={rental.images?.[0] || "/dest-california.jpg"} 
                          alt={rental.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">
                          420 Friendly
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{rental.name}</h3>
                        {rental.address && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{rental.address}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          {renderRating(rental.rating || 4)}
                          <span className="text-sm text-muted-foreground ml-1">({rental.rating || 4.0})</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No rentals found. Check back soon!</p>
              </Card>
            )}
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-gold/10" />
          <div className="container mx-auto px-4 max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Get the Boulder Cannabis Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with hiking trails, dispensary map, local tips, and outdoor adventure recommendations.
              </p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card/50 border-border/50 focus:border-accent"
                  required
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 whitespace-nowrap" disabled={submitting}>
                  {submitting ? "Sending..." : "Get Free Guide"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground">
                ✓ Free • ✓ No spam • ✓ Unsubscribe anytime
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Explore More Colorado
                </span>
              </h2>
              <p className="text-muted-foreground">
                Continue your Colorado cannabis journey with these nearby destinations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {relatedGuides.map((guide, index) => (
                <motion.div
                  key={guide.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={guide.slug}>
                    <Card className="p-6 bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1 text-center h-full">
                      <Compass className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                        {guide.distance} from Boulder
                      </Badge>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/usa/colorado">
                  <Mountain className="w-5 h-5 mr-2" />
                  Full Colorado Cannabis Guide
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BoulderGuide;
