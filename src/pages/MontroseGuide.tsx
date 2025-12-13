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
  MapPin, Star, CheckCircle, 
  Plane, Home, Cannabis, Shield, 
  ArrowRight, Bed, Store, ChevronRight,
  Building2, AlertCircle, Clock, Car,
  Bus, Bike, MapPinned, Snowflake, Sun, Leaf, Flower2,
  Music, Palette, Beer, TreePine, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, 
  Compass, Waves, Tent
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

const MontroseGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Montrose Dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .ilike('city', '%Montrose%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch hotels/rentals in Montrose
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Montrose%')
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
        .insert({ email, source_page: 'montrose-guide' });
      
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
    "name": "Montrose Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Montrose, Colorado. Gateway to the Black Canyon, local dispensaries, and outdoor adventure tips.",
    "url": "https://budquest.guide/montrose",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Montrose",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montrose",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "45-65°F",
      highlights: [
        "Early hiking in the Adobe Badlands",
        "Fishing on the Uncompahgre River",
        "Black Canyon North Rim opens (late spring)",
        "Less crowded than summer"
      ],
      tip: "Trails dry out here faster than in Telluride. Good option for 'mud season'."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "80-90°F",
      highlights: [
        "Black Canyon of the Gunnison National Park",
        "Montrose Water Sports Park",
        "Montrose County Fair & Rodeo",
        "Camping at Ridgway State Park"
      ],
      tip: "It gets warm! The river water park is the best place to cool down."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "50-75°F",
      highlights: [
        "Spectacular hunting season basecamp",
        "Golden aspens on Owl Creek Pass",
        "Olathe Sweet Corn Festival (Late summer/Fall)",
        "Perfect climbing weather"
      ],
      tip: "Owl Creek Pass offers one of the best fall drives in the entire state."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Affordable base for Telluride skiing",
        "Snowshoeing nearby",
        "Local brewery visits",
        "Holiday lights downtown"
      ],
      tip: "Montrose stays relatively mild compared to the high mountains nearby."
    }
  ];

  const attractions = [
    {
      name: "Black Canyon of the Gunnison",
      icon: Mountain,
      description: "A stunning, deep, steep canyon. One of America's least visited but most impressive National Parks.",
      cannabisTip: "Strictly Federal Land (NPS). Possession is a federal crime. Consume before you enter the park gates.",
      address: "Hwy 50 East"
    },
    {
      name: "Museum of the Mountain West",
      icon: Building2,
      description: "A massive collection of historic buildings and artifacts recreating 1880-1920 frontier life.",
      cannabisTip: "A trippy walk through history. Great indoor activity if the weather is bad.",
      address: "68169 Miami Rd"
    },
    {
      name: "Montrose Water Sports Park",
      icon: Waves,
      description: "One of the largest whitewater parks in Colorado, right on the Uncompahgre River.",
      cannabisTip: "Public park rules apply. Don't smoke on the river banks. Edibles are discreet for water days.",
      address: "Riverbottom Drive"
    },
    {
      name: "Ute Indian Museum",
      icon: Palette,
      description: "Dedicated to the history and culture of the Ute people, Colorado's longest continuous residents.",
      cannabisTip: "Sacred cultural site. Please be respectful and visit with a clear, sober mind.",
      address: "17253 Chipeta Rd"
    },
    {
      name: "Owl Creek Pass",
      icon: Camera,
      description: "Famous scenic drive featured in the movie 'True Grit'. Incredible views of Chimney Rock.",
      cannabisTip: "National Forest land. Be discreet, don't drive impaired, and pack out all trash.",
      address: "County Road 8"
    },
    {
      name: "Montrose Botanic Gardens",
      icon: Flower2,
      description: "Beautiful xeriscape gardens showcasing plants that thrive in the high desert.",
      cannabisTip: "A peaceful place for a walk. No smoking allowed on garden grounds.",
      address: "1800 Pavilion Dr"
    }
  ];

  const transportOptions = [
    {
      name: "Car (Essential)",
      icon: Car,
      description: "Montrose is the hub of a vast rural area. You need a car to get to the Canyon, Telluride, or Ouray.",
      tip: "Rentals available at Montrose Regional Airport (MTJ)."
    },
    {
      name: "Montrose Regional Airport",
      icon: Plane,
      description: "The best airport for accessing Telluride and the southwest mountains.",
      tip: "Cannabis is prohibited on airport grounds (Federal regulation)."
    },
    {
      name: "All Points Transit",
      icon: Bus,
      description: "Limited local bus service for the region.",
      tip: "Check schedules carefully; it is not a big city metro system."
    }
  ];

  const neighborhoods = [
    { 
      name: "Downtown Montrose", 
      desc: "Historic Main Street with shops, breweries, and local restaurants.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "South Townsend", 
      desc: "Commercial strip with major retailers, hotels, and dispensaries.",
      safety: "safe",
      walkable: false
    },
    { 
      name: "Riverbottom Park Area", 
      desc: "Green space along the river, sports fields, and walking trails.",
      safety: "very-safe",
      walkable: true
    }
  ];

  const relatedGuides = [
    { name: "Grand Junction", slug: "/grand-junction", desc: "1 hr North", distance: "1 hr" },
    { name: "Telluride", slug: "/usa/colorado", desc: "1.5 hrs South", distance: "1.5 hrs" },
    { name: "Ouray", slug: "/usa/colorado", desc: "45 mins South", distance: "45 min" },
  ];

  return (
    <>
      <Helmet>
        <title>Montrose Cannabis Travel Guide 2025 | Black Canyon & Dispensaries | BudQuest</title>
        <meta name="description" content="Plan your Montrose, CO cannabis trip. The gateway to the Black Canyon and Telluride. Find local dispensaries, 420-friendly hotels, and travel tips." />
        <meta name="keywords" content="Montrose cannabis, Montrose dispensaries, Black Canyon weed rules, 420 friendly hotels Montrose, Western Slope marijuana" />
        <link rel="canonical" href="https://budquest.guide/montrose" />
        
        <meta property="og:title" content="Montrose Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Outdoor adventure hub meeting cannabis culture. Your guide to Montrose." />
        <meta property="og:url" content="https://budquest.guide/montrose" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-colorado.jpg" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
            <li className="text-foreground font-medium">Montrose</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-colorado.jpg" 
              alt="Montrose Black Canyon" 
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
              <Badge className="mb-6 px-4 py-2 bg-emerald-600/20 text-emerald-400 border-emerald-600/30">
                <Mountain className="w-4 h-4 mr-2" />
                Hub of the Western Slope
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Montrose Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                The affordable basecamp for Southwest Colorado. Gateway to the Black Canyon, stunning scenic drives, and the retail cannabis hub for the region.
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
                { icon: Store, label: "Dispensaries", value: "Available" },
                { icon: Shield, label: "Black Canyon", value: "Strict Ban" },
                { icon: Home, label: "Lodging", value: "Affordable" },
                { icon: Mountain, label: "Elevation", value: "5,807 ft" },
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

        {/* Critical Warning Section - Federal Land */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl">
             <Card className="p-6 bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-red-500/20 flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-red-400 mb-2">CRITICAL: Black Canyon & Federal Land</h3>
                  <p className="text-muted-foreground mb-3 text-lg">
                    The <strong>Black Canyon of the Gunnison</strong> is a National Park (Federal Land).
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <Ban className="w-4 h-4 text-red-400 mt-1" />
                      <span>Possession of <strong>ANY</strong> amount of cannabis inside the National Park is a federal crime.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="w-4 h-4 text-red-400 mt-1" />
                      <span>Rangers enforce this strictly. Do not bring cannabis to the rim or on hiking trails.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                      <span><strong>Advice:</strong> Leave your products at your hotel. Enjoy the breathtaking views sober or consume beforehand.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
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
                  Best Time to Visit Montrose
                </span>
              </h2>
            </motion.div>

            <Tabs defaultValue="fall" className="w-full">
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

        {/* Attractions */}
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
                  Things to Do
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Outdoor adventures, history, and scenic beauty.
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

        {/* Getting Around */}
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
                  Navigating Montrose
                </span>
              </h2>
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
                Key Areas
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
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
        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Dispensaries in Montrose
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
                        </div>
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

        {/* Rentals Section */}
        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Stays in Montrose
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
                <p className="text-muted-foreground">No rentals found in Montrose. Check nearby areas!</p>
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
                  Get the Montrose Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with maps, Black Canyon tips, and local dispensary coupons.
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
                        {guide.distance} from Montrose
                      </Badge>
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

export default MontroseGuide;
