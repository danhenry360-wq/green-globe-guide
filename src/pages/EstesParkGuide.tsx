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
  Compass, Ghost
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

const EstesParkGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Estes Park has historically restricted dispensaries inside town limits.
      // This query looks for any that might have opened or are in the immediate vicinity (Lyons/Larimer County).
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .or('city.ilike.%Estes Park%,city.ilike.%Lyons%') // Includes nearby Lyons which has dispensaries
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      // Fetch hotels/rentals in Estes Park
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Estes Park%')
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
        .insert({ email, source_page: 'estes-park-guide' });
      
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
    "name": "Estes Park Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Estes Park, Colorado including nearby dispensaries, 420-friendly cabins, and federal land warnings.",
    "url": "https://budquest.guide/estes-park",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Estes Park",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Estes Park",
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
      months: "April - May",
      icon: Flower2,
      temp: "30-60°F",
      highlights: [
        "Wildlife babies begin to appear",
        "Quieter town before summer rush",
        "Lower cabin rates",
        "Waterfalls are at peak flow"
      ],
      tip: "Trail Ridge Road usually stays closed until late May. Plan for lower elevation hikes."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "45-80°F",
      highlights: [
        "Trail Ridge Road open (highest paved road in US)",
        "Perfect hiking weather",
        "Rooftop Rodeo (July)",
        "Outdoor dining along Elkhorn Ave"
      ],
      tip: "RMNP requires timed entry reservations in summer. Book months in advance."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - October",
      icon: Leaf,
      temp: "30-65°F",
      highlights: [
        "Elk Rut (Bugling) season - incredible to witness",
        "Golden Aspen foliage",
        "Autumn Gold Festival",
        "Crisp air perfect for cozy cabin stays"
      ],
      tip: "The Elk fest attracts huge crowds. Traffic can be heavy."
    },
    {
      id: "winter",
      name: "Winter",
      months: "November - March",
      icon: Snowflake,
      temp: "15-40°F",
      highlights: [
        "Snowshoeing in RMNP",
        "Quiet, peaceful atmosphere",
        "Holiday lights in downtown",
        "Wildlife is often right in town"
      ],
      tip: "Many shops close early in winter, but it's the most peaceful time to visit."
    }
  ];

  const attractions = [
    {
      name: "Rocky Mountain National Park",
      icon: Mountain,
      description: "415 square miles of spectacular mountain environments. One of the most visited parks in the US.",
      cannabisTip: "Strictly Federal Land. Possession is illegal here. Do not bring cannabis into the park.",
      address: "Main Entrance (Hwy 36)"
    },
    {
      name: "The Stanley Hotel",
      icon: Ghost,
      description: "Historic hotel that inspired Stephen King's 'The Shining'. Offers history and ghost tours.",
      cannabisTip: "Private property rules apply. Great place for a tour, but consume elsewhere beforehand.",
      address: "333 Wonderview Ave"
    },
    {
      name: "Lake Estes Marina",
      icon: Plane, // Placeholder for boat/water
      description: "Rent pontoons, kayaks, or walk the 3.7-mile paved trail around the lake.",
      cannabisTip: "Federal/local water regulations apply. Operating a boat while impaired is a BUI.",
      address: "1770 Big Thompson Ave"
    },
    {
      name: "Estes Park Aerial Tramway",
      icon: Camera,
      description: "Takes you to the summit of Prospect Mountain for breathtaking panoramic views.",
      cannabisTip: "The altitude at the top (8,900 ft) intensifies effects. Hydrate well.",
      address: "420 E Riverside Dr"
    },
    {
      name: "Downtown Elkhorn Ave",
      icon: Store,
      description: " charming strip of taffy shops, souvenirs, and restaurants along the river.",
      cannabisTip: "Public consumption is illegal on sidewalks. Edibles are discreet, but be careful with dosing.",
      address: "Elkhorn Ave"
    },
    {
      name: "Peak to Peak Scenic Byway",
      icon: Car,
      description: "Stunning scenic drive connecting Estes Park to Central City/Black Hawk.",
      cannabisTip: "Do not consume while driving. Pull over to enjoy views, but keep products sealed.",
      address: "Highway 7"
    }
  ];

  const transportOptions = [
    {
      name: "Free Shuttle Bus",
      icon: Bus,
      description: "Town operates free seasonal shuttles. RMNP has a hiker shuttle from the visitor center.",
      tip: "Best way to avoid parking headaches in summer."
    },
    {
      name: "Personal Vehicle",
      icon: Car,
      description: "Almost essential for getting to Estes Park and exploring the wider area.",
      tip: "Parking downtown is paid/limited in summer. Use the parking structure."
    },
    {
      name: "Estes Transit (The Bustang)",
      icon: Bus,
      description: "Connects Denver Union Station/Boulder to Estes Park on weekends/summer.",
      tip: "Great if you don't want to drive mountain roads."
    }
  ];

  const neighborhoods = [
    { 
      name: "Downtown", 
      desc: "The heart of the action. Walkable to shops, dining, and the Riverwalk.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Fall River Road", 
      desc: "Lined with condos and cabins along the river. scenic and quiet.",
      safety: "very-safe",
      walkable: false
    },
    { 
      name: "Mary's Lake", 
      desc: "Slightly south of town, offers great views and a quieter vibe.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Boulder", slug: "/boulder", desc: "Closest major city with dispensaries", distance: "45 min" },
    { name: "Loveland", slug: "/loveland", desc: "The Sweetheart City", distance: "45 min" },
    { name: "Denver", slug: "/denver", desc: "International Airport Hub", distance: "1.5 hours" },
  ];

  return (
    <>
      <Helmet>
        <title>Estes Park Cannabis Travel Guide 2025 | Cabins & Laws | BudQuest</title>
        <meta name="description" content="Plan your Estes Park cannabis trip. Warning: Federal land rules for RMNP. Find nearby dispensaries, 420-friendly cabins, and safety tips." />
        <meta name="keywords" content="Estes Park cannabis, Estes Park dispensaries, Rocky Mountain National Park weed laws, 420 friendly cabins Estes Park" />
        <link rel="canonical" href="https://budquest.guide/estes-park" />
        
        <meta property="og:title" content="Estes Park Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Guide to cannabis in Estes Park. RMNP warnings, nearby dispensaries, and lodging." />
        <meta property="og:url" content="https://budquest.guide/estes-park" />
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
            <li className="text-foreground font-medium">Estes Park</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/dest-colorado.jpg" 
              alt="Estes Park Mountains" 
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
              <Badge className="mb-6 px-4 py-2 bg-green-800/20 text-green-400 border-green-800/30">
                <Mountain className="w-4 h-4 mr-2" />
                Gateway to the Rockies
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Estes Park Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Basecamp for Rocky Mountain adventures. Discover 420-friendly cabins, handle the altitude responsibly, and navigate the unique laws of a federal park gateway town.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Cabins</a>
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
                { icon: Store, label: "Dispensaries", value: "Nearby (Lyons)" },
                { icon: Shield, label: "RMNP Rule", value: "Strictly Illegal" },
                { icon: Home, label: "Lodging", value: "Cabins/Hotels" },
                { icon: Mountain, label: "Elevation", value: "7,522 ft" },
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

        {/* Critical Warning Section - RMNP */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl">
             <Card className="p-6 bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-red-500/20 flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-red-400 mb-2">CRITICAL WARNING: Rocky Mountain National Park</h3>
                  <p className="text-muted-foreground mb-3 text-lg">
                    Rocky Mountain National Park is <strong>Federal Land</strong>.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <Ban className="w-4 h-4 text-red-400 mt-1" />
                      <span>Possession of <strong>ANY</strong> amount of cannabis inside the park is a federal crime.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Ban className="w-4 h-4 text-red-400 mt-1" />
                      <span>Rangers enforce this strictly. Citations require a federal court appearance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                      <span><strong>Advice:</strong> Leave your stash at your hotel/cabin. Enjoy the park sober or consume responsibly *before* entering (do not drive impaired).</span>
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
                  Best Time to Visit Estes Park
                </span>
              </h2>
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
                From high-altitude adventures to haunted hotels.
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

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Dispensaries Near Estes Park
                </span>
              </h2>
              <Link to="/dispensary" className="text-accent hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <Card className="mb-8 p-4 bg-amber-500/10 border-amber-500/30">
              <div className="flex gap-3">
                 <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                 <p className="text-sm text-muted-foreground">
                   <strong>Note:</strong> Estes Park city limits often restrict recreational sales. Most visitors stop in <strong>Lyons</strong> (20 mins away) or <strong>Boulder</strong> on their way up the mountain.
                 </p>
              </div>
            </Card>
            
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
                <p className="text-muted-foreground">No specific dispensaries found. We recommend stopping in <strong>Lyons</strong> on Highway 36.</p>
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
                  Get the Estes Park Travel Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with maps, federal land boundaries, and 420-friendly cabin listings.
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
                  More Colorado Destinations
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
                        {guide.distance} from Estes
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

export default EstesParkGuide;
