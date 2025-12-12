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
  Music, Beer, Mountain, Camera,
  AlertTriangle, Ban, Mail, Download, 
  ExternalLink, Droplets
} from "lucide-react";

// Interfaces matching your Supabase Database
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
  description: string | null;
}

const FortCollinsGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Fort Collins Dispensaries
        // Checks for "Fort Collins" or "Ft. Collins" to be safe
        const { data: dispData } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('state', 'Colorado')
          .or('city.ilike.%Fort Collins%,city.ilike.%Ft. Collins%')
          .order('rating', { ascending: false })
          .limit(3);
        
        if (dispData) setDispensaries(dispData);

        // 2. Fetch Fort Collins 420-Friendly Rentals
        const { data: rentalData } = await supabase
          .from('hotels')
          .select('*')
          .eq('is_420_friendly', true)
          .ilike('address', '%Fort Collins%')
          .order('rating', { ascending: false })
          .limit(3);
        
        if (rentalData) setRentals(rentalData);
      } catch (error) {
        console.error("Error loading Fort Collins data:", error);
      } finally {
        setLoading(false);
      }
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
        .insert({ email, source_page: 'fort-collins-guide' });
      
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
    "name": "Fort Collins Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Fort Collins, Colorado including Old Town dispensaries, Horsetooth Reservoir rules, and 420-friendly rentals.",
    "url": "https://budquest.guide/fort-collins",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Fort Collins",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fort Collins",
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
      temp: "40-65°F",
      highlights: [
        "FoCoMX Music Experiment (April)",
        "Tulips blooming in Old Town Square",
        "Great hiking at Lory State Park",
        "Outdoor patios begin opening"
      ],
      tip: "Spring weather is unpredictable. Pack layers for sunny days and sudden snow showers."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "75-90°F",
      highlights: [
        "Boating at Horsetooth Reservoir",
        "Bohemian Nights music festivals",
        "Food Truck Rallies at City Park",
        "Peak brewery patio season"
      ],
      tip: "Afternoon thunderstorms are common. Plan your outdoor consumption/activities for mornings."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "45-75°F",
      highlights: [
        "Tour de Fat bike parade (Labor Day)",
        "Golden aspens in Poudre Canyon",
        "CSU Ram football tailgates",
        "Harvest season dispensary specials"
      ],
      tip: "The best season for biking the Poudre Trail—cool air and stunning autumn colors."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "15-45°F",
      highlights: [
        "Old Town Holiday Lights (Nov-Feb)",
        "Snowshoeing at Cameron Pass",
        "Cozy taprooms and coffee shops",
        "Fewer crowds at dispensaries"
      ],
      tip: "Winter in Old Town is magical. The holiday lights are world-famous and perfect for a mellow evening walk."
    }
  ];

  const attractions = [
    {
      name: "Old Town Square",
      icon: Building2,
      description: "Historic buildings filled with shops, pianos, and art. The inspiration for Disneyland's Main Street USA.",
      cannabisTip: "Eat an edible and wander the alleys to find hidden murals. No smoking allowed in the square.",
      address: "Walnut & Linden St"
    },
    {
      name: "Horsetooth Reservoir",
      icon: Droplets,
      description: "Stunning 6.5-mile reservoir for boating, swimming, and bouldering just minutes from town.",
      cannabisTip: "Federal/State strict rules apply. Do not consume openly on the water or beaches. Rangers patrol frequently.",
      address: "Centennial Dr"
    },
    {
      name: "The Gardens on Spring Creek",
      icon: Flower2,
      description: "Beautiful community botanic gardens including a butterfly house and rock garden.",
      cannabisTip: "A sensory delight. Visit during a weekday morning for a peaceful, meditative experience.",
      address: "2145 Centre Ave"
    },
    {
      name: "Odell & New Belgium",
      icon: Beer,
      description: "Two of the most famous craft breweries in America. Massive patios and lawn games.",
      cannabisTip: "Cross-fading (mixing weed and alcohol) can be intense. Pace yourself. Patios are smoke-free.",
      address: "Lincoln Ave / Linden St"
    },
    {
      name: "Poudre Canyon",
      icon: Mountain,
      description: "A scenic byway offering world-class fly fishing, hiking, and whitewater rafting.",
      cannabisTip: "Perfect for a designated driver scenic cruise. There is zero cell service, so download maps ahead of time.",
      address: "Hwy 14 West"
    },
    {
      name: "Museum of Discovery",
      icon: Camera,
      description: "Interactive science and history museum with a 360-degree digital dome theater.",
      cannabisTip: "The digital dome shows are mind-bending. Check the schedule for music/laser shows.",
      address: "408 Mason Ct"
    }
  ];

  const transportOptions = [
    {
      name: "MAX Bus Rapid Transit",
      icon: Bus,
      description: "Modern bus line running North-South along the Mason Corridor. Connects South FoCo to Old Town.",
      tip: "Very reliable. Great for dispensary hopping along College Ave."
    },
    {
      name: "Biking (Spin/E-Bikes)",
      icon: Bike,
      description: "Fort Collins is a Platinum Bicycle Friendly Community. Wide lanes and trails everywhere.",
      tip: "Don't BUI (Bike Under Influence). You can get a DUI on a bike."
    },
    {
      name: "Walking",
      icon: MapPinned,
      description: "Old Town is extremely walkable. Most shops, restaurants, and some dispensaries are clustered here.",
      tip: "Park in a garage ($1/hr) and walk everywhere. Street parking is strictly timed."
    },
    {
      name: "Groome Transportation",
      icon: Car,
      description: "Shuttle service from DIA to Fort Collins (approx 1 hour).",
      tip: "Book in advance. Saves you from renting a car if you plan to stay central."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fort Collins Cannabis Travel Guide 2025 | Dispensaries & Laws | BudQuest</title>
        <meta name="description" content="Plan your Fort Collins cannabis trip. Find the best Old Town dispensaries, rules for Horsetooth Reservoir, private 420-friendly rentals, and expert local tips." />
        <meta name="keywords" content="Fort Collins dispensaries, Fort Collins weed laws, Horsetooth Reservoir cannabis, Old Town Fort Collins dispensaries, Colorado cannabis guide" />
        <link rel="canonical" href="https://budquest.guide/fort-collins" />
        <meta property="og:title" content="Fort Collins Cannabis Travel Guide 2025" />
        <meta property="og:description" content="Find dispensaries, laws, and 420-friendly stays in Fort Collins." />
        <meta property="og:image" content="/images/dest-colorado.jpg" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Fort Collins</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/images/dest-colorado.jpg" // Ensure this image exists in your public folder
              alt="Fort Collins Old Town and Mountains" 
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
                The Craft Beer & Cannabis Capital
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Fort Collins Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the "Choice City" — where craft cannabis meets craft beer. A laid-back college town vibe with world-class dispensaries and outdoor adventure.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#stays"><Home className="w-5 h-5 mr-2" />Private Stays</a>
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
                { icon: Store, label: "Dispensaries", value: "15+" },
                { icon: Shield, label: "Possession Limit", value: "2 oz" },
                { icon: Ban, label: "Public Use", value: "Illegal" },
                { icon: Plane, label: "From DIA", value: "60 min" },
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

        {/* Legal Info Section */}
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
                  Fort Collins Cannabis Laws
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Local rules can differ from Denver. Here is what you need to know to stay safe and legal in Larimer County.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Possession Limits</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adults 21+ can possess up to <strong>2 ounces</strong> of cannabis. 
                  However, the purchase limit per transaction is <strong>1 ounce</strong>.
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Open Container</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  It is illegal to have open cannabis containers in a vehicle. 
                  Keep products <strong>sealed</strong> and in the trunk while driving.
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
                  { place: "Private Residences", note: "With owner's explicit permission" },
                  { place: "Private Rentals", note: "Look for '420 Friendly' listings" },
                  { place: "Private Porches/Patios", note: "If out of public view" },
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
                  { place: "Old Town Square", fine: "Strictly enforced" },
                  { place: "Horsetooth Reservoir", fine: "State/County Park Rules" },
                  { place: "CSU Campus", fine: "Federal funding rules apply" },
                  { place: "Hotels & Motels", fine: "Most are 100% smoke-free" },
                  { place: "Breweries/Patios", fine: "Alcohol & Weed don't mix legally" },
                  { place: "Inside Cars", fine: "DUI risk even if parked" },
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

            {/* Critical Warning - Modified for Fort Collins/DIA */}
            <Card className="p-6 bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-red-500/20 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-red-400 mb-2">Airport Warning - DIA</h3>
                  <p className="text-muted-foreground mb-3">
                    You will likely fly out of <strong>Denver International Airport (DIA)</strong>. 
                    It is federal property where cannabis is strictly prohibited.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <Ban className="w-4 h-4 text-red-400 mt-0.5" />
                      <span className="text-foreground font-medium">NO Amnesty Boxes at DIA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Dispose of all leftover products <strong>before</strong> leaving Fort Collins
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Accommodation Section - Tailored for Private Rentals */}
        <section id="stays" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Where to Stay: Private Rentals
                  </span>
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  <strong>Note:</strong> Unlike Denver, Fort Collins does not have dedicated "420 Hotels." 
                  Your best legal option is a <strong>private vacation rental</strong> with a 420-friendly policy.
                </p>
              </div>
              <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/hotels">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Search Rentals
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50 h-full flex flex-col">
                      <div className="aspect-video relative">
                        <img 
                          src={rental.images?.[0] || "/images/placeholder-rental.jpg"} 
                          alt={rental.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/placeholder-rental.jpg"; 
                          }}
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">
                          420 Friendly
                        </Badge>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-foreground mb-1">{rental.name}</h3>
                        {rental.address && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{rental.address}</span>
                          </div>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1">
                            {renderRating(rental.rating || 4.5)}
                            <span className="text-sm text-muted-foreground ml-1">({rental.rating || 4.5})</span>
                            </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-dashed border-2 border-border/50">
                <Home className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Check Private Listings</h3>
                <p className="text-muted-foreground mb-4">
                  We recommend searching explicitly for "420 friendly" listings in our database.
                </p>
                <Button asChild variant="outline">
                    <Link to="/hotels">Browse All Listings</Link>
                </Button>
              </Card>
            )}
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Top Fort Collins Dispensaries
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
                    <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50 h-full flex flex-col">
                      <div className="aspect-video relative">
                        <img 
                          src={disp.images?.[0] || disp.image || "/images/dispensary-placeholder.jpg"} 
                          alt={disp.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/dispensary-placeholder.jpg"; 
                          }}
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
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{disp.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{disp.city}, {disp.state}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1">
                            {renderRating(disp.rating || 0)}
                            <span className="text-sm text-muted-foreground ml-1">({disp.rating || 0})</span>
                            </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading dispensaries...</p>
              </Card>
            )}
          </div>
        </section>

        {/* Best Time & Activities */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Planning Your Trip
              </span>
            </h2>

            <Tabs defaultValue="spring" className="w-full mb-16">
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

            {/* Attractions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

            {/* Transport Options Grid */}
            <div className="grid md:grid-cols-2 gap-6">
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
                  Get the Northern Colorado Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Free PDF with maps for Fort Collins, Loveland, and Estes Park dispensaries.
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
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">Explore Nearby</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link to="/denver">
                <Card className="p-6 hover:bg-accent/5 transition-colors">
                  <h3 className="font-bold text-lg mb-2">Denver</h3>
                  <p className="text-sm text-muted-foreground">The Mile High City (60 min south)</p>
                </Card>
              </Link>
              <Link to="/boulder">
                <Card className="p-6 hover:bg-accent/5 transition-colors">
                  <h3 className="font-bold text-lg mb-2">Boulder</h3>
                  <p className="text-sm text-muted-foreground">Flatirons & College Vibes (45 min south)</p>
                </Card>
              </Link>
              <Link to="/usa/colorado">
                <Card className="p-6 hover:bg-accent/5 transition-colors">
                  <h3 className="font-bold text-lg mb-2">Estes Park</h3>
                  <p className="text-sm text-muted-foreground">Gateway to RMNP (45 min west)</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default FortCollinsGuide;
