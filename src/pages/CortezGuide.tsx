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
  Music, Mountain, Landmark, Sunset,
  AlertTriangle, Ban, Mail, Download, 
  Tent, Footprints
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

const CortezGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Cortez Dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Cortez%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch Cortez 420 Friendly Rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Cortez%')
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
        .insert({ email, source_page: 'cortez-guide' });
      
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
    "name": "Cortez Cannabis Travel Guide 2025",
    "description": "The complete guide to cannabis in Cortez, CO. Explore Mesa Verde, Phil's World, and the best dispensaries in the Four Corners region.",
    "url": "https://budquest.guide/cortez",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Cortez",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cortez",
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
        "name": "Can I bring cannabis into Mesa Verde National Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Mesa Verde is Federal land. Possession of cannabis inside the park is a federal crime, even though it is legal in the state of Colorado."
        }
      },
      {
        "@type": "Question",
        "name": "Is cannabis legal on Tribal Land?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, no. The Ute Mountain Ute Tribe does not allow cannabis sales or possession on reservation land. Stick to Cortez city limits and state lands."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I stay that is 420 friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cortez has several 420-friendly rentals and motels. Always check the specific policy of the property before booking."
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
      temp: "50-70°F",
      highlights: [
        "Desert Blooms (Cactus Flowers)",
        "Perfect Hiking Weather",
        "Mesa Verde Tours Open Up",
        "Quiet Season Rates"
      ],
      tip: "The high desert sun is deceptive. It might be 60°F, but you can still get sunstroke. Hydrate and wear a hat."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "80-95°F",
      highlights: [
        "Long Days for Exploring",
        "Water Sports at McPhee Reservoir",
        "Farmers Market",
        "Archaeology Tours"
      ],
      tip: "Afternoon monsoons (rainstorms) are common in July/August. Plan your outdoor sessions for the morning."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Nov",
      icon: Leaf,
      temp: "50-75°F",
      highlights: [
        "Best Mountain Biking Conditions",
        "Cottonwoods turning Gold",
        "Harvest Festivals",
        "Cool nights, warm days"
      ],
      tip: "This is peak season for Phil's World mountain biking. The dirt is tacky and the temps are perfect."
    },
    {
      id: "winter",
      name: "Winter",
      months: "Dec - Feb",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Cross-Country Skiing",
        "Snowshoeing Mesa Verde",
        "Very few tourists",
        "Cozy dispensary vibes"
      ],
      tip: "Cortez is milder than the ski towns, but nights are freezing. Great time for indoor relaxation."
    }
  ];

  const attractions = [
    {
      name: "Mesa Verde National Park",
      icon: Landmark,
      description: "UNESCO World Heritage site with 600 cliff dwellings. A spiritual journey into the past.",
      cannabisTip: "FEDERAL LAND. Do not possess or consume inside the park. Enjoy your session at your hotel before the tour.",
      address: "Mesa Verde (10 min drive)"
    },
    {
      name: "Phil's World",
      icon: Bike,
      description: "World-famous mountain bike trail system known for the 'Rib Cage' flow section.",
      cannabisTip: "The flow here is legendary. A small dose of sativa can enhance the rhythm, but don't impair your balance.",
      address: "Hwy 160 East"
    },
    {
      name: "Canyons of the Ancients",
      icon: MapPinned,
      description: "A vast outdoor museum with thousands of archaeological sites on BLM land.",
      cannabisTip: "Unlike the National Park, this is BLM land (less patrolled), but discretion is key. Great for quiet introspection.",
      address: "West of Cortez"
    },
    {
      name: "McPhee Reservoir",
      icon: Sunset,
      description: "The second-largest lake in Colorado. Boating, fishing, and chilling.",
      cannabisTip: "A vape pen on a pontoon boat is a vibe. Just make sure the driver stays sober.",
      address: "Dolores, CO"
    },
    {
      name: "Four Corners Monument",
      icon: MapPin,
      description: "The only point in the US shared by four states. (Navajo Tribal Land).",
      cannabisTip: "Tribal land laws apply. Do not bring cannabis here. It's a tourist trap, but a necessary photo op.",
      address: "Hwy 160 West"
    },
    {
      name: "Cultural Center",
      icon: Building2,
      description: "Local art, Native American dances, and history exhibits in downtown.",
      cannabisTip: "Learn about the ancestral land you are standing on. Best experienced with a clear, respectful mind.",
      address: "Market St"
    }
  ];

  const transportOptions = [
    {
      name: "Car (Essential)",
      icon: Car,
      description: "The Four Corners region is vast. You absolutely need a car to see anything.",
      tip: "Distances are long. Stock up on gas and supplies in Cortez before heading out."
    },
    {
      name: "Mountain Bike",
      icon: Bike,
      description: "Cortez is a biking destination. Trails connect to town, but attractions are far.",
      tip: "Bring plenty of water. The desert air sucks moisture right out of you."
    },
    {
      name: "Walking (Downtown)",
      icon: Footprints,
      description: "Main Street has restaurants and breweries, but it's a highway strip.",
      tip: "Be careful crossing Main St (Hwy 160). Traffic moves fast."
    },
    {
      name: "No Rideshare",
      icon: Ban,
      description: "Uber/Lyft are virtually non-existent here.",
      tip: "Do not count on a taxi to get you home from the dispensary. Plan a designated driver."
    }
  ];

  const neighborhoods = [
    { 
      name: "Main Street Corridor", 
      desc: "Where most motels, restaurants, and dispensaries are located.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Dolores (Nearby)", 
      desc: "River town 15 mins north. Lush, green, and very chill. Home to McPhee.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Mancos (Nearby)", 
      desc: "Cowboy art town 15 mins east. Gateway to Mesa Verde. Historic vibes.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "South Cortez", 
      desc: "More industrial/residential. Closer to the airport and Ute Mountain.",
      safety: "safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Durango", slug: "/durango", desc: "The big city nearby", distance: "45 min" },
    { name: "Telluride", slug: "/telluride", desc: "Mountain luxury", distance: "1.5 hours" },
    { name: "Pagosa Springs", slug: "/pagosa-springs", desc: "Hot springs hub", distance: "2 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>Cortez Cannabis Travel Guide 2025 | Mesa Verde & Weed | BudQuest</title>
        <meta name="description" content="Visit Cortez, Colorado. The archaeological center of America. Find dispensaries near Mesa Verde, 420-friendly hotels, and travel tips." />
        <meta name="keywords" content="Cortez cannabis, Cortez dispensaries, Mesa Verde weed laws, Phil's World mountain biking, Four Corners cannabis" />
        <link rel="canonical" href="https://budquest.guide/cortez" />
        
        <meta property="og:title" content="Cortez Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Ancient history and modern cannabis. Your guide to Cortez and the Four Corners." />
        <meta property="og:url" content="https://budquest.guide/cortez" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-2.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cortez Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Dispensaries, ruins, and legal info for Cortez, CO." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Cortez" />
        
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
            <li className="text-foreground font-medium">Cortez</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-2.jpg" 
              alt="Mesa Verde and High Desert Landscape" 
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
                <Landmark className="w-4 h-4 mr-2" />
                Archaeological Center
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Cortez Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore the mysteries of the ancients in the high desert. A quiet, spiritual hub for cannabis travelers visiting Mesa Verde and the Four Corners.
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
                { icon: Store, label: "Dispensaries", value: "6+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "6,191'" },
                { icon: Plane, label: "Airport", value: "CEZ" },
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
                  High Desert Seasons
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cortez has a milder climate than the mountains, but seasons are distinct.
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
                              <strong className="text-accent">Local Tip:</strong> {season.tip}
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

        {/* Experiences */}
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
                  Ancient & Outdoor Adventures
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with the past and flow through the landscape.
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
                      <p className="text-xs text-accent font-medium mb-1">Stoner Strategy</p>
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
                  Crucial Legal Warnings
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cortez is a checkerboard of State, Federal, and Tribal lands. Knowing where you are is critical.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-red-900/10 border-red-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-red-500">Mesa Verde (Federal)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mesa Verde is a <strong>National Park</strong>. Federal law applies here, meaning NO cannabis possession or consumption is allowed, period. Rangers enforce this.
                </p>
              </Card>
              
              <Card className="p-6 bg-amber-900/10 border-amber-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-amber-500">Tribal Lands</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  To the south is <strong>Ute Mountain Ute</strong> land; to the west is <strong>Navajo Nation</strong>. 
                  Cannabis is generally prohibited on these reservations. Respect tribal sovereignty.
                </p>
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
                  { place: "Private Residences", note: "In Cortez city/county" },
                  { place: "420-Friendly Motels", note: "Several options in town" },
                  { place: "Private Vehicles", note: "Parked on private property" },
                  { place: "BLM Land (Dispersed)", note: "Technically gray area, be discreet" },
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
                  { place: "Mesa Verde N.P.", fine: "Federal Crime" },
                  { place: "Ute Mountain Reservation", fine: "Tribal Police" },
                  { place: "Navajo Nation", fine: "Tribal Police" },
                  { place: "Main Street", fine: "Civil Fine" },
                  { place: "While Driving", fine: "DUI" },
                  { place: "Hovenweep Monument", fine: "Federal Crime" },
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

        {/* Getting Around */}
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
                  Logistics & Transport
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This is the wide-open West. You need wheels to get around.
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
                Local Areas
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
                      {hood.walkable ? "🚶 Walkable" : "🚗 Car Needed"}
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
                  Cortez Dispensaries
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
                          src={disp.images?.[0] || disp.image || "/dest-2.jpg"} 
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
                <p className="text-muted-foreground">
                  No dispensaries found in the database for Cortez. 
                  (Update database: There are ~6 dispensaries in town).
                </p>
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
                  420-Friendly Accommodations
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
                          src={rental.images?.[0] || "/dest-2.jpg"} 
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
                          <span className="text-sm text-muted-foreground ml-1">({rental.rating || 4.5})</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No rentals found. Try nearby Mancos or Dolores.</p>
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
                  Get the Four Corners Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF including the Mesa Verde rules map, Phil's World trail guide, and local dispensary coupons.
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
                  Explore Southwest Colorado
                </span>
              </h2>
              <p className="text-muted-foreground">
                More adventures in the San Juans and High Desert.
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
                      <Tent className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                        {guide.distance} from Cortez
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

export default CortezGuide;
