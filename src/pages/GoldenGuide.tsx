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
  Music, Mountain, Beer, Waves,
  AlertTriangle, Ban, Mail, Download, 
  Camera, Train
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

const GoldenGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Golden Dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Golden%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch Golden 420 Friendly Rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Golden%')
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
        .insert({ email, source_page: 'golden-guide' });
      
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
    "name": "Golden Colorado Cannabis Travel Guide 2025",
    "description": "The ultimate guide to cannabis in Golden, CO. Red Rocks concerts, Coors Brewery tours, and 420-friendly stays near the foothills.",
    "url": "https://budquest.guide/golden",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Golden",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Golden",
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
        "name": "Can I consume cannabis at Red Rocks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Technically, no. Red Rocks is a Denver Mountain Park where public consumption is illegal. While enforcement varies during concerts, discretion is key. Edibles are recommended over smoking."
        }
      },
      {
        "@type": "Question",
        "name": "Can I tube down Clear Creek while high?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is not recommended. Clear Creek moves fast and can be dangerous. Impaired judgement in cold, fast-moving water is a major safety risk."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a train to Golden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the RTD 'W Line' Light Rail connects Denver Union Station to the Jefferson County Government Center in Golden."
        }
      }
    ]
  };

  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "April - May",
      icon: Flower2,
      temp: "45-65°F",
      highlights: [
        "First Red Rocks shows of the season",
        "North Table Mountain hiking (Green & Blooming)",
        "Clear Creek starts flowing",
        "Less crowds at Coors Brewery"
      ],
      tip: "Spring weather is volatile. A sunny hike can turn into a snowstorm in 30 minutes. Dress in layers if you're exploring the mesas."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "75-90°F",
      highlights: [
        "Tubing Clear Creek (Peak Season)",
        "Peak Concert Season at Red Rocks",
        "Golden Farmers Market",
        "Buffalo Bill Days Festival"
      ],
      tip: "The creek water is cold snowmelt, even when it's 90° out. Alcohol + THC + Cold Water can be a dangerous mix. Stay safe."
    },
    {
      id: "fall",
      name: "Fall",
      months: "Sept - Oct",
      icon: Leaf,
      temp: "50-70°F",
      highlights: [
        "Golden Fine Arts Festival",
        "Stunning golden cottonwoods along the creek",
        "Perfect climbing weather in Clear Creek Canyon",
        "Cozy brewery patios"
      ],
      tip: "This is the best time for hiking. The trails are dry, the heat is gone, and the scenery matches the town's name."
    },
    {
      id: "winter",
      name: "Winter",
      months: "Nov - March",
      icon: Snowflake,
      temp: "25-45°F",
      highlights: [
        "Olde Golden Candlelight Walk",
        "Proximity to Loveland Ski Area (45 min)",
        "UllrGrass Music & Beer Festival",
        "Quiet museums"
      ],
      tip: "Golden stays warmer than the mountains, but trails like Table Mountain get icy. Bring micro-spikes for your boots."
    }
  ];

  const attractions = [
    {
      name: "Red Rocks Amphitheatre",
      icon: Music,
      description: "Just 10 minutes away. The world's greatest outdoor venue and a cannabis culture icon.",
      cannabisTip: "The parking lots ('Tailgate Lots') are the social hub. Consume there before entering. Inside, stick to discrete vapes or edibles.",
      address: "Morrison (Bordering Golden)"
    },
    {
      name: "Coors Brewery",
      icon: Beer,
      description: "The world's largest single-site brewery. Offers tours and samples of the Banquet beer.",
      cannabisTip: "The 'Hops & Crops' tour. Experience the contrast between the old guard (beer) and the new guard (weed). Don't smoke on brewery grounds.",
      address: "13th & Ford St"
    },
    {
      name: "Clear Creek Whitewater Park",
      icon: Waves,
      description: "A recreational river running right through the heart of downtown Golden.",
      cannabisTip: "Find a spot on the grassy banks near Parfet Park. A vape pen and the sound of rushing water is pure zen.",
      address: "10th St"
    },
    {
      name: "North Table Mountain",
      icon: Mountain,
      description: "The iconic flat-topped mesa overlooking the town. Steep hike with rewarding views.",
      cannabisTip: "Cottonmouth is real on this steep hike. Bring 2x water. The top is flat and perfect for meditation.",
      address: "N Table Mountain Park"
    },
    {
      name: "Lookout Mountain",
      icon: Camera,
      description: "Famous drive with sweeping views of Denver and Buffalo Bill's Grave.",
      cannabisTip: "The sunset views here are mind-bending. Great spot for photography. Do not drive down the winding road while impaired.",
      address: "Lookout Mountain Rd"
    },
    {
      name: "School of Mines Museum",
      icon: Building2,
      description: "Incredible geology museum with glowing rocks, gold nuggets, and meteorites.",
      cannabisTip: "Staring at fluorescent glowing minerals while slightly elevated? Highly recommended visual experience.",
      address: "1310 Maple St"
    }
  ];

  const transportOptions = [
    {
      name: "W Line (Light Rail)",
      icon: Train,
      description: "Connects Golden (JeffCo Govt Center) directly to Union Station Denver.",
      tip: "The safest way to do a dispensary crawl in Denver without driving. Last train is usually around midnight."
    },
    {
      name: "FlexRide",
      icon: Bus,
      description: "On-demand local bus service. Connects the Light Rail station to downtown Golden.",
      tip: "Download the app to book rides. It's like a cheaper, shared Uber for the local area."
    },
    {
      name: "Biking",
      icon: Bike,
      description: "Golden is incredibly bike-friendly with trails connecting all the way to Denver.",
      tip: "The ride from Denver to Golden on the Clear Creek trail is legendary, but long (20 miles)."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Downtown Golden (Washington Ave) is compact and historic.",
      tip: "Park in the parking garages (often free for first 2 hours) and walk to dispensaries and breweries."
    }
  ];

  const neighborhoods = [
    { 
      name: "Downtown (Washington Ave)", 
      desc: "The historic heart. Welcome arch, restaurants, and creek access. Very walkable.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Pleasant View", 
      desc: "Area between Golden and Lakewood. Home to several dispensaries and affordable motels.",
      safety: "safe",
      walkable: false
    },
    { 
      name: "Golden Proper (South)", 
      desc: "Near the High School and fossil trace golf course. Residential and quiet.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Applewood", 
      desc: "Suburban area to the east. Shopping centers and easy highway access.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "The big city (Light Rail access)", distance: "20 min" },
    { name: "Boulder", slug: "/boulder", desc: "College town via Hwy 93", distance: "25 min" },
    { name: "Idaho Springs", slug: "/idaho-springs", desc: "Mountain mining town", distance: "25 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Golden CO Cannabis Travel Guide 2025 | Red Rocks & Reefers | BudQuest</title>
        <meta name="description" content="Visit Golden, Colorado. The gateway to the Rockies and best basecamp for Red Rocks. Find dispensaries, 420-friendly hotels, and travel tips." />
        <meta name="keywords" content="Golden CO cannabis, Golden dispensaries, Red Rocks weed, Golden 420 friendly hotels, Coors and Cannabis" />
        <link rel="canonical" href="https://budquest.guide/golden" />
        
        <meta property="og:title" content="Golden Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Red Rocks, Coors, and Cannabis. The complete guide to Golden, CO." />
        <meta property="og:url" content="https://budquest.guide/golden" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-colorado-ski.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Golden Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Dispensaries, Red Rocks tips, and legal info for Golden, CO." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Golden" />
        
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
            <li className="text-foreground font-medium">Golden</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-colorado-ski.jpg" 
              alt="Golden Colorado Table Mountains" 
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
                <Mountain className="w-4 h-4 mr-2" />
                Gateway to the Rockies
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Golden Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where the West lives. Home to Coors, the School of Mines, and the perfect 420-friendly basecamp for Red Rocks concerts.
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
                { icon: Store, label: "Dispensaries", value: "5+" },
                { icon: Music, label: "To Red Rocks", value: "10 min" },
                { icon: Beer, label: "Breweries", value: "10+" },
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
                  Seasons of Golden
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From Red Rocks concert season to snowy winter retreats, Golden is a year-round destination.
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
                Blend outdoor adventure with history and culture in the foothills.
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
                  Golden & Jefferson County Laws
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Golden is laid back, but strict on public safety, especially near the creek and venues.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-red-500/20">
                    <Music className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Red Rocks Policy</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Public consumption is <strong>illegal</strong> in Red Rocks Park. 
                  Enforcement is strict in the seating bowl (smoking gets you ejected). 
                  Tailgating lots are more tolerant, but keep it discreet (cups/edibles).
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Clear Creek Safety</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Police patrol the creek path on bikes. Smoking joints on the path will get you a ticket. 
                  Also, tubing while extremely intoxicated is a major drowning hazard.
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
                  { place: "Private Balconies", note: "If allowed by landlord/HOA" },
                  { place: "420-Friendly Stays", note: "Check AirBnB/VRBO filters" },
                  { place: "Edibles anywhere", note: "Discreet consumption is key" },
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
                  { place: "Red Rocks Seating Bowl", fine: "Ejection" },
                  { place: "Washington Ave", fine: "Civil Fine" },
                  { place: "Clear Creek Path", fine: "Civil Fine" },
                  { place: "Coors Brewery Tour", fine: "Private Property Ban" },
                  { place: "Lookout Mountain Park", fine: "City Park Ban" },
                  { place: "While Driving", fine: "DUI" },
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
                  Getting Around Golden
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Easily accessible from Denver via light rail, and very bike-friendly once you arrive.
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
                  Golden Dispensaries
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
                  No dispensaries found strictly in Golden city limits. 
                  (Note: Check Pleasant View/Colfax Ave for nearby options).
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
                  420-Friendly Basecamps
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
                <p className="text-muted-foreground">No rentals found. Try nearby Denver West or Lakewood.</p>
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
                  Get the Red Rocks Insider Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with tailgate lot maps, consumption tips, and the best post-show munchies in Golden.
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
                  Explore Nearby
                </span>
              </h2>
              <p className="text-muted-foreground">
                More Front Range destinations.
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
                        {guide.distance} from Golden
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

export default GoldenGuide;
