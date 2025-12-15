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
  Music, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, 
  Utensils, TreePine, Footprints
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

const CrestedButteGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Crested Butte Dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Crested Butte%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch CB 420 Friendly Rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Crested Butte%')
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
        .insert({ email, source_page: 'crested-butte-guide' });
      
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
    "name": "Crested Butte Cannabis Travel Guide 2025",
    "description": "The ultimate guide to cannabis in Crested Butte, CO. Explore the last great ski town, wildflower festivals, and 420-friendly mountain culture.",
    "url": "https://budquest.guide/crested-butte",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Crested Butte",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Crested Butte",
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
        "name": "How does altitude affect cannabis consumption?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crested Butte is at 8,909 ft. Cannabis and alcohol hit significantly harder at this elevation. Use 50% of your normal dose and drink plenty of water."
        }
      },
      {
        "@type": "Question",
        "name": "Can I smoke on the ski slopes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The ski area is on US Forest Service land (Federal). Possession and consumption on the mountain are federal offenses."
        }
      },
      {
        "@type": "Question",
        "name": "Is there public transportation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the Mountain Express is a free, colorful bus system that runs between the town and the mountain area. It is very 420-tourist friendly (but no consumption on board)."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "Nov - April",
      icon: Snowflake,
      temp: "10-30°F",
      highlights: [
        "Extreme Terrain Skiing (The North Face)",
        "Alley Loop Nordic Marathon (Costumes mandatory)",
        "Cozy Apres-Ski on Elk Avenue",
        "Winter Chain Laws active on passes"
      ],
      tip: "The terrain here is steep and technical. Don't consume heavily before attempting the 'Extremes'. Safety is paramount."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Flower2,
      temp: "60-75°F",
      highlights: [
        "Wildflower Festival (July)",
        "World Class Mountain Biking (Trail 401)",
        "Hiking to Gothic or Snodgrass",
        "Arts Festival & Farmers Markets"
      ],
      tip: "This is the Wildflower Capital of Colorado. Enhancing a hike with a mild sativa while surrounded by colors is a bucket-list experience."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Oct",
      icon: Leaf,
      temp: "40-60°F",
      highlights: [
        "Kebler Pass (Largest Aspen grove in the world)",
        "Vinotok Festival (Pagan harvest bonfire)",
        "Quiet trails & golden leaves",
        "End of season sales"
      ],
      tip: "Vinotok is a unique, slightly pagan local tradition. It pairs exceptionally well with a creative, introspective hybrid."
    },
    {
      id: "spring",
      name: "Spring",
      months: "April - June",
      icon: Sun,
      temp: "35-55°F",
      highlights: [
        "Flauschink (End of season party)",
        "Mud Season (Peace & Quiet)",
        "Whitewater runoff",
        "Cheap lodging rates"
      ],
      tip: "Many shops and restaurants close during 'Mud Season' (May). Call dispensaries ahead to check hours."
    }
  ];

  const attractions = [
    {
      name: "Elk Avenue",
      icon: Store,
      description: "The historic main street lined with colorful Victorian buildings, saloons, and shops.",
      cannabisTip: "The ultimate 'munchies walk'. Grab a slice at Secret Stash pizza after visiting the nearby dispensaries.",
      address: "Downtown Crested Butte"
    },
    {
      name: "Kebler Pass",
      icon: TreePine,
      description: "Home to one of the largest living organisms on Earth—a massive Aspen grove.",
      cannabisTip: "In autumn, the colors are psychedelic naturally. Perfect for a passenger-princess drive (don't smoke and drive).",
      address: "County Road 12"
    },
    {
      name: "Trail 401",
      icon: Bike,
      description: "One of the most famous mountain bike trails in the world. High alpine views.",
      cannabisTip: "The climb is brutal; the descent is spiritual. Save the celebration puff for the summit view.",
      address: "Schofield Pass"
    },
    {
      name: "Mt. Crested Butte",
      icon: Mountain,
      description: "The ski resort area featuring steep terrain and the iconic peak.",
      cannabisTip: "Federal land rules apply on the slopes. Consume at your condo in the base area, not on the lift.",
      address: "Ski Resort"
    },
    {
      name: "The Secret Stash",
      icon: Utensils,
      description: "Legendary pizza joint with eclectic decor. A cultural staple of the town.",
      cannabisTip: "The 'Notorious F.I.G.' pizza is a flavor explosion that was practically invented for the cannabis palate.",
      address: "303 Elk Ave"
    },
    {
      name: "Judo's / Snodgrass",
      icon: Footprints,
      description: "Accessible hiking trails with stunning wildflower views.",
      cannabisTip: "Great for a low-impact nature walk. Respect the trails and pack out all packaging/roaches.",
      address: "Gothic Road"
    }
  ];

  const transportOptions = [
    {
      name: "The Mountain Express",
      icon: Bus,
      description: "Free, colorful buses running between Town and the Mountain every 15-20 mins.",
      tip: "The painted buses are trippy and free! No smoking on board, but they are the safest way to get home."
    },
    {
      name: "Townie Bikes",
      icon: Bike,
      description: "Cruiser bikes are the preferred mode of transport in town.",
      tip: "Almost everyone rides a bike here. Just remember BUI (Biking Under Influence) laws still exist."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown CB is tiny and extremely walkable.",
      tip: "You can walk from one end of Elk Ave to the other in 15 minutes."
    },
    {
      name: "Car (4WD)",
      icon: Car,
      description: "Necessary if you plan to explore the passes or drive to trailheads.",
      tip: "Watch out for deer and cattle on the roads, especially at dusk."
    }
  ];

  const neighborhoods = [
    { 
      name: "Town of Crested Butte", 
      desc: "The historic district. Walkable, colorful, full of nightlife and dispensaries.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Mt. Crested Butte", 
      desc: "The resort base area. Condos, hotels, and slope access. Connected by free bus.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "CB South", 
      desc: "Residential community 10 mins south. Quiet, local vibe with a few amenities.",
      safety: "very-safe",
      walkable: false
    },
    { 
      name: "Skyland / Riverbend", 
      desc: "Upscale residential areas near the golf course. Very quiet and scenic.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Aspen", slug: "/aspen", desc: "Hiking over West Maroon Pass", distance: "11 mi (Hike)" },
    { name: "Gunnison", slug: "/usa/colorado/gunnison", desc: "The valley hub", distance: "30 min" },
    { name: "Salida", slug: "/salida", desc: "River adventure town", distance: "1.5 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>Crested Butte Cannabis Travel Guide 2025 | Skiing & Strains | BudQuest</title>
        <meta name="description" content="Visit the 'Last Great Ski Town'. Your guide to Crested Butte cannabis dispensaries, 420-friendly lodging, and high-altitude travel tips." />
        <meta name="keywords" content="Crested Butte cannabis, CB dispensaries, wildflower festival weed, Crested Butte 420 friendly hotels, Colorado ski town weed" />
        <link rel="canonical" href="https://budquest.guide/crested-butte" />
        
        <meta property="og:title" content="Crested Butte Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Complete guide to cannabis in Crested Butte. Wildflowers, steep skiing, and local vibes." />
        <meta property="og:url" content="https://budquest.guide/crested-butte" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-colorado-ski.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crested Butte Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Dispensaries, laws, and travel tips for Crested Butte, CO." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Crested Butte" />
        
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
            <li className="text-foreground font-medium">Crested Butte</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-colorado-ski.jpg" 
              alt="Crested Butte Mountain and Wildflowers" 
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
                <Snowflake className="w-4 h-4 mr-2" />
                The Last Great Ski Town
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Crested Butte Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where the pavement ends and the funk begins. A paradise for steep skiers, wildflower lovers, and cannabis enthusiasts seeking authentic mountain culture.
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
                { icon: Store, label: "Dispensaries", value: "4+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Mountain, label: "Elevation", value: "8,909'" },
                { icon: Plane, label: "From Gunnison", value: "30 min" },
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
                  Seasons of CB
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From deep powder to endless wildflowers, every season in Crested Butte offers a unique high.
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
                  Must-Do Experiences
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The best spots to explore while elevated in the Rockies.
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
                  High Altitude Rules
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Crested Butte is surrounded by National Forest. Know where state law ends and federal law begins.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Mountain className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Altitude Warning (8,909 ft)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Oxygen is thin here. <strong>THC hits 2x harder.</strong> Alcohol hits 2x harder. 
                  Combine them, and you might faint. Drink massive amounts of water and pace yourself.
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Federal Land</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The ski resort and surrounding hiking trails are often on <strong>US Forest Service land</strong>. 
                  Possession is technically a federal crime there. Be discreet and respectful.
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
                  { place: "Private Residences", note: "With owner's permission" },
                  { place: "Private Balconies", note: "If not visible from public street" },
                  { place: "Designated Hotel Areas", note: "Ask the front desk" },
                  { place: "Private Events", note: "If permitted by venue" },
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
                  { place: "Elk Avenue (Sidewalks)", fine: "Civil fine" },
                  { place: "Ski Lifts / Gondolas", fine: "Pass confiscation" },
                  { place: "Bars & Restaurants", fine: "State Law" },
                  { place: "The Mountain Express Bus", fine: "Prohibited" },
                  { place: "National Forest Trails", fine: "Federal Offense" },
                  { place: "Driving / Car", fine: "DUI" },
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
                  Getting Around CB
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No need to drive. The free bus system and bike paths make exploring easy.
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
                Where to Stay
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
                      {hood.walkable ? "🚶 Walkable" : "🚗 Car/Bus Needed"}
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
                  CB Dispensaries
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
                          src={disp.images?.[0] || disp.image || "/dest-colorado-ski.jpg"} 
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
                  No dispensaries found in the database for Crested Butte yet.
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
                  420-Friendly Mountain Lodging
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
                          src={rental.images?.[0] || "/dest-colorado-ski.jpg"} 
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
                <p className="text-muted-foreground">No rentals found. Try nearby Gunnison.</p>
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
                  Get the CB Insider Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF including the "Secret Stash" menu guide, wildflower maps, and hidden smoke spots.
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
                  More Mountain Towns
                </span>
              </h2>
              <p className="text-muted-foreground">
                Explore nearby Colorado gems.
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
                      <Mountain className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                        {guide.distance} from CB
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

export default CrestedButteGuide;
