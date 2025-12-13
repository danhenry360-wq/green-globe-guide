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

const DenverGuide = () => {
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
        .ilike('city', '%Denver%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Denver%')
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
        .insert({ email, source_page: 'denver-guide' });
      
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
    "name": "Denver Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Denver, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and expert travel tips.",
    "url": "https://budquest.guide/denver",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Denver",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Denver",
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
        "name": "Is cannabis legal in Denver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Denver for adults 21 and older. You can possess up to 1 ounce and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I consume cannabis in Denver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cannabis consumption is only legal on private property with owner's permission. Public consumption is illegal and can result in fines."
        }
      },
      {
        "@type": "Question",
        "name": "Can I bring cannabis to Denver International Airport?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. DIA is federal property where cannabis is prohibited. TSA will confiscate any cannabis found. Amnesty boxes are available before security."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best time to visit Denver for cannabis tourism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spring (April-May) and Fall (September-October) offer ideal weather with fewer crowds. Summer is great for outdoor activities, while winter attracts ski enthusiasts."
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
      temp: "45-65°F",
      highlights: [
        "420 Festival celebrations (April 20)",
        "Mild weather for walking tours",
        "Cherry Creek Arts Festival prep",
        "Lower hotel rates before summer rush"
      ],
      tip: "Book dispensary tours early for 4/20 week - the city's busiest cannabis period."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "70-90°F",
      highlights: [
        "Perfect patio weather for 420-friendly stays",
        "Red Rocks concerts and outdoor events",
        "Longest daylight hours for exploring",
        "Peak tourism - book accommodations early"
      ],
      tip: "Afternoon thunderstorms are common - plan indoor activities for late afternoon."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "40-70°F",
      highlights: [
        "Beautiful fall foliage in the mountains",
        "Great Divide brewing events",
        "Fewer tourists, better dispensary deals",
        "Perfect hiking weather"
      ],
      tip: "October offers the best balance of weather, crowds, and prices."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Ski season in full swing (1 hour to slopes)",
        "Indoor cannabis lounges more appealing",
        "Holiday cannabis gift specials",
        "New Year's Eve celebrations downtown"
      ],
      tip: "Combine a ski trip with Denver's dispensaries - many offer tourist discounts."
    }
  ];

  const attractions = [
    {
      name: "Denver Art Museum",
      icon: Palette,
      description: "World-class art in a stunning architectural landmark. Perfect for a mellow afternoon exploring creative works from around the globe.",
      cannabisTip: "Visit after a light edible - the architecture and exhibits create an immersive experience. No consumption on premises.",
      address: "100 W 14th Ave Pkwy"
    },
    {
      name: "16th Street Mall",
      icon: Building2,
      description: "Mile-long pedestrian promenade with shops, restaurants, and free shuttle. The heart of downtown Denver's energy.",
      cannabisTip: "Great for people-watching and food exploration. Multiple dispensaries within walking distance.",
      address: "16th Street, Downtown"
    },
    {
      name: "South Platte River Trail",
      icon: TreePine,
      description: "30+ miles of scenic trails perfect for biking, walking, or jogging along the river through the city.",
      cannabisTip: "No public consumption allowed. Best enjoyed before or after, not during your session.",
      address: "Confluence Park"
    },
    {
      name: "Denver Craft Breweries",
      icon: Beer,
      description: "200+ craft breweries make Denver a beer lover's paradise. Great American Beer Festival host city.",
      cannabisTip: "Don't mix cannabis and alcohol excessively. Many breweries are in cannabis-friendly neighborhoods.",
      address: "RiNo, LoDo, South Broadway"
    },
    {
      name: "Red Rocks Amphitheatre",
      icon: Music,
      description: "Iconic outdoor venue with stunning natural red rock formations. World-famous concert experience.",
      cannabisTip: "Cannabis is prohibited on-site (federal land). Consume responsibly before arrival. Uber recommended.",
      address: "18300 W Alameda Pkwy, Morrison"
    },
    {
      name: "Denver Museum of Nature & Science",
      icon: Camera,
      description: "Interactive exhibits, planetarium, and IMAX theater in beautiful City Park.",
      cannabisTip: "The planetarium shows are incredible. Space exploration exhibits pair well with a creative mindset.",
      address: "2001 Colorado Blvd"
    }
  ];

  const transportOptions = [
    {
      name: "RTD Public Transit",
      icon: Bus,
      description: "Light rail, bus, and commuter rail covering metro Denver. A-Line connects airport to downtown (37 min, $10.50).",
      tip: "Day passes available. Clean and efficient for getting around central Denver."
    },
    {
      name: "Rideshare (Uber/Lyft)",
      icon: Car,
      description: "Widely available throughout Denver. Best option late night or for dispensary runs.",
      tip: "Never drive after consuming. Rideshare is the cannabis traveler's best friend."
    },
    {
      name: "B-cycle Bike Share",
      icon: Bike,
      description: "130+ stations with 700+ bikes. Denver is very bike-friendly with dedicated lanes.",
      tip: "Great for short trips in good weather. Don't ride impaired - same DUI laws as driving."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown, RiNo, and South Broadway are highly walkable with dispensaries and attractions close together.",
      tip: "Most neighborhoods are safe. Stick to well-lit areas at night."
    }
  ];

  const neighborhoods = [
    { 
      name: "RiNo (River North)", 
      desc: "Art district with trendy dispensaries, street art, and creative vibes. Denver's coolest neighborhood.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "LoDo (Lower Downtown)", 
      desc: "Historic district near Union Station with upscale dining, sports venues, and nightlife.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Capitol Hill", 
      desc: "Diverse, eclectic neighborhood with great nightlife, restaurants, and dispensary options.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "South Broadway (SoBo)", 
      desc: "Vintage shops, dive bars, and strong cannabis culture. Authentic Denver experience.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Five Points", 
      desc: "Historic jazz district experiencing revitalization. Growing food and cannabis scene.",
      safety: "mostly-safe",
      walkable: true
    },
    { 
      name: "Cherry Creek", 
      desc: "Upscale shopping and dining. More expensive but very safe and well-maintained.",
      safety: "very-safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Boulder", slug: "/boulder", desc: "College town vibes with mountain access", distance: "30 min" },
    { name: "Colorado Springs", slug: "/usa/colorado", desc: "Gateway to Pikes Peak", distance: "1 hour" },
    { name: "Aspen", slug: "/usa/colorado", desc: "Luxury ski resort cannabis scene", distance: "3.5 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>Denver Cannabis Travel Guide 2025 | Dispensaries, 420 Hotels & Laws | BudQuest</title>
        <meta name="description" content="Plan your Denver cannabis trip with our 2025 guide. Find top-rated dispensaries, 420-friendly hotels, marijuana laws, possession limits, and expert tips for the Mile High City." />
        <meta name="keywords" content="Denver cannabis, Denver dispensaries, 420-friendly hotels Denver, Denver marijuana laws 2025, Mile High City cannabis, Denver weed tourism, Colorado cannabis Denver, Denver 420 travel" />
        <link rel="canonical" href="https://budquest.guide/denver" />
        
        <meta property="og:title" content="Denver Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Your complete guide to cannabis in Denver. Find dispensaries, 420-friendly stays, and travel tips." />
        <meta property="og:url" content="https://budquest.guide/denver" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-2.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Denver Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Complete Denver cannabis guide with dispensaries, hotels, and legal info." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        
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
            <li className="text-foreground font-medium">Denver</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-2.jpg" 
              alt="Denver Colorado skyline with Rocky Mountains" 
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
                The Mile High City
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Denver Cannabis Travel Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Colorado's capital and America's cannabis epicenter. Home to 200+ dispensaries, world-class 420-friendly accommodations, and the most vibrant cannabis culture in the nation.
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

        {/* Quick Facts - Enhanced */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "200+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Home, label: "420 Hotels", value: "50+" },
                { icon: Plane, label: "From DIA", value: "20 min" },
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
                  Best Time to Visit Denver
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Denver enjoys 300+ days of sunshine annually. Each season offers unique experiences for cannabis travelers.
              </p>
            </motion.div>

            <Tabs defaultValue="spring" className="w-full">
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

        {/* What to Do in Denver */}
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
                  What to Do in Denver
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Beyond the dispensaries, Denver offers world-class attractions perfect for cannabis enthusiasts.
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
                  Denver Cannabis Laws & Consumption Rules
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Know the rules before you go. Denver has specific regulations cannabis travelers must follow.
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
                  <h3 className="font-semibold text-foreground">DUI Laws</h3>
                </div>
                <p className="text-sm text-muted-foreground">Driving under the influence is a serious offense. 5 nanograms THC/ml blood is the legal limit. Use rideshare instead.</p>
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
                  { place: "420-Friendly Hotels", note: "Designated smoking areas only" },
                  { place: "Private Patios/Balconies", note: "If allowed by property rules" },
                  { place: "Licensed Consumption Lounges", note: "Limited locations available" },
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
                  { place: "Public Streets & Sidewalks", fine: "$100+ fine" },
                  { place: "Parks & Open Spaces", fine: "$100+ fine" },
                  { place: "Restaurants & Bars", fine: "Prohibited" },
                  { place: "Hotel Lobbies/Common Areas", fine: "Prohibited" },
                  { place: "Ski Resorts (Federal Land)", fine: "Federal offense" },
                  { place: "Concert Venues", fine: "Ejection + fine" },
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
            <Card className="p-6 bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-red-500/20 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-red-400 mb-2">Airport Warning - DIA</h3>
                  <p className="text-muted-foreground mb-3">
                    Denver International Airport is <strong className="text-foreground">federal property</strong> where cannabis is strictly prohibited. 
                    TSA will confiscate any cannabis found during screening.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Amnesty boxes available before security checkpoints
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Consume everything before arriving at the airport
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Never attempt to fly with cannabis products
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Getting Around Denver */}
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
                  Getting Around Denver
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transportation options for cannabis travelers. Remember: never drive impaired.
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
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Top Denver Dispensaries
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
                <p className="text-muted-foreground">No dispensaries found for Denver. Check back soon!</p>
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
                  Get the Denver Cannabis Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with insider tips, neighborhood guides, dispensary map, and local recommendations.
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
                        {guide.distance} from Denver
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

export default DenverGuide;
