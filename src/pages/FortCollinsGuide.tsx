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
  Music, Beer, TreePine, Mountain, Camera,
  AlertTriangle, Ban, Mail, GraduationCap,
  ExternalLink, Droplets
} from "lucide-react";

// --- Interfaces ---
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

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Dispensaries (Handle "Fort Collins" and "Ft. Collins")
        const { data: dispData } = await supabase
          .from('dispensaries')
          .select('*')
          .eq('state', 'Colorado')
          .or('city.ilike.%Fort Collins%,city.ilike.%Ft. Collins%')
          .order('rating', { ascending: false })
          .limit(4);
        
        if (dispData) setDispensaries(dispData);

        // 2. Fetch Rentals (Strict 420 Friendly check)
        const { data: rentalData } = await supabase
          .from('hotels')
          .select('*')
          .eq('is_420_friendly', true)
          .ilike('address', '%Fort Collins%')
          .order('rating', { ascending: false })
          .limit(4);
        
        if (rentalData) setRentals(rentalData);
      } catch (error) {
        console.error("Error fetching Fort Collins data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Event Handlers ---
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
        toast.success("FoCo Guide sent! Check your inbox.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    
    setEmail("");
    setSubmitting(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/placeholder-general.jpg"; // Ensure you have a generic fallback
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

  // --- SEO Data ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Fort Collins Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Fort Collins, Colorado including dispensaries, 420-friendly hotels, marijuana laws, and craft beer culture.",
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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cannabis legal in Fort Collins?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Fort Collins for adults 21 and older. You can possess up to 2 ounces and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Can I smoke in public in Fort Collins?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Public consumption is illegal, including in parks, on sidewalks, and at breweries. Consumption is only allowed on private property with permission."
        }
      }
    ]
  };

  // --- Content Constants ---
  const seasons = [
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "40-65°F",
      highlights: [
        "Perfect hiking weather in the foothills",
        "FoCoMX Music Experiment (April)",
        "Colorado State University graduation festivities",
        "Lower tourist crowds"
      ],
      tip: "Great time for dispensary tours - fewer crowds and spring deals. Watch for afternoon rain."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "65-90°F",
      highlights: [
        "Horsetooth Reservoir boating & swimming",
        "Bohemian Nights music festivals",
        "Outdoor brewery patios in Old Town",
        "Prime mountain biking season"
      ],
      tip: "Book accommodations early - summer is peak season. Afternoon thunderstorms are common."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "35-70°F",
      highlights: [
        "Beautiful fall colors in Poudre Canyon",
        "Oktoberfest celebrations at breweries",
        "CSU Rams football tailgates",
        "Harvest season dispensary specials"
      ],
      tip: "October is ideal - crispy weather, golden aspens, and fresh cannabis harvests."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "1 hour to ski resorts (Cameron Pass, Eldora)",
        "Old Town Holiday Lights (Nov-Feb)",
        "Cozy brewery taprooms",
        "Winter cannabis deals"
      ],
      tip: "Great base for affordable ski trips. Old Town's holiday lights are world-famous."
    }
  ];

  const attractions = [
    {
      name: "Old Town Square",
      icon: Building2,
      description: "Historic downtown with Victorian architecture, shops, and the inspiration for Disneyland's Main Street USA.",
      cannabisTip: "Eat an edible and explore the alleys to find hidden murals. No public smoking allowed.",
      address: "Walnut & Linden St"
    },
    {
      name: "New Belgium Brewing",
      icon: Beer,
      description: "Iconic craft brewery known for Fat Tire. Tour the facility and enjoy the massive riverside patio.",
      cannabisTip: "Don't mix heavily. Alcohol increases THC absorption. Tour first, consume responsibly after.",
      address: "500 Linden St"
    },
    {
      name: "Horsetooth Reservoir",
      icon: Droplets,
      description: "6.5-mile reservoir with hiking, swimming, boating, and stunning Rocky Mountain views.",
      cannabisTip: "Strictly NO consumption on the water or beaches (Rangers patrol). Consume before you go.",
      address: "Centennial Dr"
    },
    {
      name: "Poudre Canyon",
      icon: TreePine,
      description: "Scenic 40-mile canyon along the Cache la Poudre River. Colorado's only designated Wild & Scenic River.",
      cannabisTip: "This is National Forest (Federal Land). Possession is technically illegal here. Be discreet and smart.",
      address: "Highway 14 West"
    },
    {
      name: "Colorado State University",
      icon: GraduationCap,
      description: "Beautiful campus with the famous Oval, flower gardens, and vibrant student atmosphere.",
      cannabisTip: "Cannabis is strictly prohibited on campus due to federal funding rules.",
      address: "Fort Collins"
    },
    {
      name: "Odell Brewing Company",
      icon: Beer,
      description: "Pioneer craft brewery with huge outdoor patio, fire pits, and food trucks.",
      cannabisTip: "Perfect post-session hangout for food and vibes. Dog friendly patio.",
      address: "800 E Lincoln Ave"
    }
  ];

  const neighborhoods = [
    { 
      name: "Old Town", 
      desc: "Historic core with restaurants, breweries, and shops. The heart of the city.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Campus West", 
      desc: "Adjacent to CSU. Student vibes, affordable food, and dispensary options.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "River District", 
      desc: "Industrial-turned-trendy area hosting New Belgium and other breweries.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "South Fort Collins", 
      desc: "Newer commercial area. Less character but very safe and modern.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "The Mile High City", distance: "60 min" },
    { name: "Boulder", slug: "/boulder", desc: "Flatirons & Foodies", distance: "45 min" },
    { name: "Colorado Hub", slug: "/usa/colorado", desc: "Full State Guide", distance: "" },
  ];

  return (
    <>
      <Helmet>
        <title>Fort Collins Cannabis Travel Guide 2025 | Dispensaries, Stays & Breweries | BudQuest</title>
        <meta name="description" content="Plan your Fort Collins cannabis trip. Find top Old Town dispensaries, 420-friendly rentals, brewery pairings, and laws for Larimer County." />
        <meta name="keywords" content="Fort Collins cannabis, Fort Collins dispensaries, 420-friendly rentals Fort Collins, Poudre Canyon cannabis, Colorado weed laws 2025" />
        <link rel="canonical" href="https://budquest.guide/fort-collins" />
        
        <meta property="og:title" content="Fort Collins Cannabis Travel Guide 2025" />
        <meta property="og:description" content="Your complete guide to cannabis in Fort Collins: Dispensaries, Rentals, and Breweries." />
        <meta property="og:url" content="https://budquest.guide/fort-collins" />
        <meta property="og:image" content="/images/dest-colorado.jpg" />
        <meta property="og:type" content="article" />
        
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
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Fort Collins</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {/* Fallback gradient if image fails, or overlay */}
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <img 
              src="/images/dest-colorado.jpg" 
              alt="Fort Collins Landscape" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent/20">
                <Beer className="w-4 h-4 mr-2" />
                Craft Beer Capital + Cannabis
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Fort Collins Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where craft beer meets craft cannabis. Discover Old Town dispensaries, 420-friendly rentals near the foothills, and the laid-back vibe of the "Choice City."
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
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
                { icon: Store, label: "Dispensaries", value: "15+" },
                { icon: Shield, label: "Possession Limit", value: "2 oz" },
                { icon: MapPin, label: "From DIA", value: "60 min" },
                { icon: Beer, label: "Breweries", value: "20+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-card/50 rounded-lg border border-border/30 hover:border-accent/30 transition-colors"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Fort Collins Cannabis Laws 🌿
                </span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Allowed/Not Allowed */}
                <Card className="md:col-span-2 bg-card/50 border-accent/30">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Recreational Legal
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-accent mb-3">✅ Allowed</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            Adults 21+ can possess up to 2 oz
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            Purchase up to 1 oz per transaction
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            Consume on private property (with permission)
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-400 mb-3">❌ Prohibited</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            Public consumption (parks, streets, patios)
                          </li>
                          <li className="flex items-start gap-2">
                            <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            Driving under the influence (DUI)
                          </li>
                          <li className="flex items-start gap-2">
                            <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            CSU Campus & Federal Land
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Airport Warning */}
                <Card className="bg-red-500/5 border-red-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-red-400">
                            <Plane className="w-6 h-6" />
                            <h3 className="font-bold">Airport Warning</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Most travelers fly via <strong>Denver International Airport (DIA)</strong>.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                <span><strong>NO Amnesty Boxes:</strong> Unlike some airports, DIA does not provide disposal boxes.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Dispose of all products <strong>before</strong> leaving Fort Collins to avoid federal charges.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🌿 Top Fort Collins Dispensaries
                  </span>
                </h2>
                <p className="text-muted-foreground">
                  Quality cannabis shops in Northern Colorado
                </p>
              </div>
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/dispensary">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-72 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dispensaries.map((dispensary) => (
                  <Link key={dispensary.id} to={`/dispensary/${dispensary.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <img
                          src={dispensary.images?.[0] || dispensary.image || "/images/placeholder-dispensary.jpg"}
                          alt={dispensary.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                        />
                        <div className="absolute top-2 right-2">
                          {dispensary.is_recreational && (
                            <Badge className="bg-green-500/90 text-white text-xs backdrop-blur-sm">REC</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                          {dispensary.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {dispensary.rating ? (
                              <>
                                {renderRating(dispensary.rating)}
                                <span className="text-xs text-muted-foreground ml-1">({dispensary.rating})</span>
                              </>
                          ) : (
                              <span className="text-xs text-muted-foreground">No ratings yet</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-auto flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {dispensary.address}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Dispensaries Found</h3>
                <p className="text-muted-foreground mb-4">
                  We're currently updating our Fort Collins directory.
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* 420 Rentals Section */}
        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🏨 420-Friendly Rentals
                  </span>
                </h2>
                <p className="text-muted-foreground">
                  Private homes and stays where you can consume freely
                </p>
              </div>
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/hotels">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-72 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <img
                          src={rental.images?.[0] || "/images/placeholder-rental.jpg"}
                          alt={rental.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                        />
                        <Badge className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-xs backdrop-blur-sm">
                          420 Friendly
                        </Badge>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                          {rental.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                            {renderRating(rental.rating || 4.5)}
                            <span className="text-xs text-muted-foreground ml-1">({rental.rating || 4.5})</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-auto flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          Fort Collins, CO
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rentals Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Check back for 420-friendly listings in Fort Collins.
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🗓️ Best Time to Visit
              </span>
            </h2>

            <Tabs defaultValue="summer" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="flex items-center gap-2 data-[state=active]:text-accent">
                    <season.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{season.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                <season.icon className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{season.name}</h3>
                                <p className="text-muted-foreground text-sm">{season.months}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-lg px-3 py-1">{season.temp}</Badge>
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                          {season.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                          <p className="text-sm text-foreground">
                             <span className="font-bold text-accent">Local Tip:</span> {season.tip}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Things to Do */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🎯 Things to Do
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-border/30 hover:border-accent/30 transition-colors flex flex-col">
                    <CardContent className="p-6 flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <attraction.icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold">{attraction.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
                      <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 mb-4">
                        <p className="text-xs text-accent font-medium">🌿 Cannabis Traveler Tip:</p>
                        <p className="text-xs text-muted-foreground mt-1">{attraction.cannabisTip}</p>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto border-t border-border/30">
                        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {attraction.address}
                        </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                📍 Key Neighborhoods
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {neighborhoods.map((hood, index) => (
                <motion.div
                  key={hood.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border/30 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{hood.name}</h3>
                        <div className="flex items-center gap-2">
                          {hood.walkable && (
                            <Badge variant="outline" className="text-xs border-accent/40 text-accent">Walkable</Badge>
                          )}
                          <Badge 
                            variant="outline"
                            className={`text-xs border-0 ${
                              hood.safety === 'very-safe' 
                                ? 'bg-green-500/10 text-green-400' 
                                : 'bg-blue-500/10 text-blue-400'
                            }`}
                          >
                            {hood.safety === 'very-safe' ? 'Very Safe' : 'Safe'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{hood.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Essential Guides Links */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                📚 Essential Reading
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/colorado/consumption-guide" className="block h-full">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Home className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Consumption Guide</h3>
                    <p className="text-xs text-muted-foreground">Rules for rentals & hotels</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/colorado/federal-land-warning" className="block h-full">
                <Card className="h-full bg-card/50 border-red-500/30 hover:border-red-500/50 transition-colors group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors">Federal Land Map</h3>
                    <p className="text-xs text-muted-foreground">Avoid tickets in Poudre Canyon</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/usa/colorado" className="block h-full">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Mountain className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Colorado Hub</h3>
                    <p className="text-xs text-muted-foreground">Explore the whole state</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-gold/5" />
          <div className="container mx-auto px-4 max-w-xl relative z-10">
            <Card className="bg-background/80 backdrop-blur-md border-accent/30 shadow-lg">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Get the Northern Colorado Guide</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Free PDF map of Fort Collins dispensaries, federal land zones, and top 420-friendly Airbnbs.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border/50 focus:border-accent"
                    required
                  />
                  <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                    {submitting ? "Sending..." : "Get Free Guide"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nearby Cities */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-6 text-center">Explore Nearby</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.name} to={guide.slug}>
                  <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-colors hover:-translate-y-1 duration-200">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-bold text-foreground">{guide.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{guide.desc}</p>
                      {guide.distance && (
                        <Badge variant="secondary" className="mt-3 text-[10px]">{guide.distance}</Badge>
                      )}
                    </CardContent>
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

export default FortCollinsGuide;
