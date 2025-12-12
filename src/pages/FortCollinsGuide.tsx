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
  ExternalLink
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

const FortCollinsGuide = () => {
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
        .ilike('city', '%Fort Collins%')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Fort Collins%')
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
          "text": "Yes, recreational cannabis is legal in Fort Collins for adults 21 and older. You can possess up to 1 ounce and purchase from licensed dispensaries."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find dispensaries in Fort Collins?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fort Collins has several licensed dispensaries including LivWell, Organic Alternatives, and Green Dragon. Most are located along major corridors."
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
        "Perfect hiking weather in the foothills",
        "New Belgium brewing events",
        "Colorado State University graduation festivities",
        "Lower tourist crowds"
      ],
      tip: "Great time for dispensary tours - fewer crowds and spring deals."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "65-90°F",
      highlights: [
        "Horsetooth Reservoir perfect for outdoor activities",
        "Bohemian Nights at NewWestFest music festival",
        "Outdoor brewery patios in Old Town",
        "Prime mountain biking season"
      ],
      tip: "Book accommodations early - summer is peak season for Fort Collins tourism."
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
        "Colorado State football season",
        "Harvest season dispensary specials"
      ],
      tip: "October is ideal - great weather, fall colors, and craft beer events."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "1 hour to ski resorts (Cameron Pass, Eldora)",
        "Cozy brewery taprooms",
        "Holiday markets in Old Town",
        "Winter cannabis specials"
      ],
      tip: "Great base for day trips to ski areas while enjoying Fort Collins nightlife."
    }
  ];

  const attractions = [
    {
      name: "Old Town Fort Collins",
      icon: Building2,
      description: "Historic downtown with Victorian architecture, shops, restaurants, and the real-life inspiration for Disneyland's Main Street USA.",
      cannabisTip: "Explore after a light session - tons of great food spots and unique shops. No public consumption.",
      address: "Downtown Fort Collins"
    },
    {
      name: "New Belgium Brewing",
      icon: Beer,
      description: "Iconic craft brewery known for Fat Tire. Tour the facility and enjoy the riverside patio.",
      cannabisTip: "Don't mix heavily with cannabis. Tour first, consume after. Great vibes.",
      address: "500 Linden St"
    },
    {
      name: "Horsetooth Reservoir",
      icon: Mountain,
      description: "6.5-mile reservoir with hiking, swimming, boating, and stunning Rocky Mountain views.",
      cannabisTip: "Amazing spot for outdoor relaxation. Consume beforehand - public land rules apply.",
      address: "West of Fort Collins"
    },
    {
      name: "Poudre Canyon",
      icon: TreePine,
      description: "Scenic 40-mile canyon along Cache la Poudre River. Colorado's only designated Wild & Scenic River.",
      cannabisTip: "Perfect for peaceful drives. Pull over at designated areas - this is National Forest land (federal).",
      address: "Highway 14 West"
    },
    {
      name: "Colorado State University",
      icon: GraduationCap,
      description: "Beautiful campus with the famous Oval, museums, and vibrant student atmosphere.",
      cannabisTip: "Cannabis NOT allowed on campus (federal funding). Enjoy the surrounding areas instead.",
      address: "Fort Collins"
    },
    {
      name: "Odell Brewing Company",
      icon: Beer,
      description: "Pioneer craft brewery with huge outdoor patio and lawn games. Dog and kid friendly.",
      cannabisTip: "Perfect post-session hangout for food trucks and people watching.",
      address: "800 E Lincoln Ave"
    }
  ];

  const neighborhoods = [
    { 
      name: "Old Town", 
      desc: "Historic downtown core with Victorian charm, restaurants, breweries, and shops. The heart of Fort Collins.",
      safety: "very-safe",
      walkable: true
    },
    { 
      name: "Campus West", 
      desc: "Adjacent to CSU with student-friendly shops, affordable dining, and youthful energy.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "Midtown", 
      desc: "Emerging arts district with galleries, craft studios, and local businesses.",
      safety: "safe",
      walkable: true
    },
    { 
      name: "South Fort Collins", 
      desc: "Growing area with new breweries, restaurants, and residential neighborhoods.",
      safety: "very-safe",
      walkable: false
    }
  ];

  const relatedGuides = [
    { name: "Denver", slug: "/denver", desc: "Capital city cannabis scene", distance: "1 hour" },
    { name: "Boulder", slug: "/boulder", desc: "College town vibes", distance: "45 min" },
    { name: "Colorado Hub", slug: "/usa/colorado", desc: "Full state guide", distance: "" },
  ];

  return (
    <>
      <Helmet>
        <title>Fort Collins Cannabis Travel Guide 2025 | Dispensaries, 420 Hotels & Craft Beer | BudQuest</title>
        <meta name="description" content="Plan your Fort Collins cannabis trip with our 2025 guide. Find top dispensaries, 420-friendly hotels, craft breweries, and outdoor adventures in Colorado's craft beer capital." />
        <meta name="keywords" content="Fort Collins cannabis, Fort Collins dispensaries, 420-friendly hotels Fort Collins, Fort Collins marijuana laws 2025, Colorado cannabis Fort Collins, Fort Collins weed tourism, craft beer cannabis" />
        <link rel="canonical" href="https://budquest.guide/fort-collins" />
        
        <meta property="og:title" content="Fort Collins Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Your complete guide to cannabis in Fort Collins. Find dispensaries, 420-friendly stays, and craft beer pairings." />
        <meta property="og:url" content="https://budquest.guide/fort-collins" />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fort Collins Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Complete Fort Collins cannabis guide with dispensaries, hotels, and craft beer culture." />
        
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Fort Collins" />
        
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
            <li className="text-foreground font-medium">Fort Collins</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Beer className="w-4 h-4 mr-2" />
                Craft Beer Capital + Cannabis
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Fort Collins Cannabis Travel Guide 2025
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Where craft beer culture meets Colorado cannabis. Home to New Belgium, Odell, and some of the best dispensaries in Northern Colorado. Old Town charm, mountain adventures, and 420-friendly vibes await.
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
                { icon: Store, label: "Dispensaries", value: "15+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: MapPin, label: "From Denver", value: "1 hr" },
                { icon: Beer, label: "Craft Breweries", value: "30+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-card/50 rounded-lg border border-border/30"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Status */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
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
              
              <Card className="bg-card/50 border-accent/30">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Recreational Legal
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Medical Legal
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-accent mb-3">✅ What's Allowed</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Adults 21+ can purchase & possess up to 1 oz
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Consume on private property with permission
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          Purchase from licensed dispensaries
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-400 mb-3">❌ Not Allowed</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          Public consumption (parks, streets, bars)
                        </li>
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          Driving under the influence
                        </li>
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          CSU campus (federal funding)
                        </li>
                        <li className="flex items-start gap-2">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          National Forest/Poudre Canyon (federal land)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span className="font-semibold text-amber-400">Federal Land Alert</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Poudre Canyon and Roosevelt National Forest are federal land where cannabis is illegal. 
                      <Link to="/colorado/federal-land-warning" className="text-accent hover:underline ml-1">
                        Read the full federal land warning →
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Dispensaries Section */}
        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 Fort Collins Dispensaries
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quality cannabis shops in Colorado's craft beer capital
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dispensaries.map((dispensary) => (
                  <Link key={dispensary.id} to={`/dispensary/${dispensary.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={dispensary.images?.[0] || dispensary.image || "/dest-2.jpg"}
                          alt={dispensary.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          {dispensary.is_recreational && (
                            <Badge className="bg-green-500/80 text-white text-xs">REC</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                          {dispensary.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {dispensary.rating && renderRating(dispensary.rating)}
                          {dispensary.rating && (
                            <span className="text-sm text-muted-foreground ml-1">
                              {dispensary.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {dispensary.city}, {dispensary.state}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 border-border/30 p-8 text-center">
                <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Dispensaries Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're adding Fort Collins dispensaries to our directory. Check back soon!
                </p>
                <Button asChild variant="outline">
                  <Link to="/dispensary">Browse All Dispensaries</Link>
                </Button>
              </Card>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/dispensary">
                  View All Dispensaries <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 420 Rentals Section */}
        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🏨 420-Friendly Stays
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cannabis-welcoming accommodations in Fort Collins
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-card/50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="group h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all duration-300 overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={rental.images?.[0] || "/dest-2.jpg"}
                          alt={rental.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-accent/80 text-accent-foreground text-xs">
                          420 Friendly
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                          {rental.name}
                        </h3>
                        {rental.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {renderRating(rental.rating)}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
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
                  We're adding 420-friendly stays in Fort Collins. Check back soon!
                </p>
                <Button asChild variant="outline">
                  <Link to="/hotels">Browse All Rentals</Link>
                </Button>
              </Card>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30">
                <Link to="/hotels">
                  View All Rentals <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
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

            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="flex items-center gap-2">
                    <season.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{season.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <Card className="bg-card/50 border-border/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{season.name}</h3>
                          <p className="text-muted-foreground">{season.months}</p>
                        </div>
                        <Badge variant="outline">{season.temp}</Badge>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {season.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                        <p className="text-sm text-accent">💡 Pro Tip: {season.tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* What to Do */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                🎯 Things to Do in Fort Collins
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
                  <Card className="h-full bg-card/50 border-border/30 hover:border-accent/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <attraction.icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold">{attraction.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
                      <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <p className="text-xs text-accent">🌿 {attraction.cannabisTip}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {attraction.address}
                      </p>
                    </CardContent>
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
                📍 Neighborhoods
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
                  <Card className="bg-card/50 border-border/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{hood.name}</h3>
                        <div className="flex items-center gap-2">
                          {hood.walkable && (
                            <Badge variant="outline" className="text-xs">Walkable</Badge>
                          )}
                          <Badge 
                            className={`text-xs ${
                              hood.safety === 'very-safe' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
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

        {/* Important Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                📚 Essential Reading
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/colorado/consumption-guide">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <Home className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Consumption Guide</h3>
                    <p className="text-sm text-muted-foreground">How to consume safely in rentals</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/colorado/federal-land-warning">
                <Card className="h-full bg-card/50 border-red-500/30 hover:border-red-500/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors">Federal Land Warning</h3>
                    <p className="text-sm text-muted-foreground">Know before you go to Poudre Canyon</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/colorado/altitude-guide">
                <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <Mountain className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Altitude Guide</h3>
                    <p className="text-sm text-muted-foreground">How elevation affects your high</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-xl">
            <Card className="bg-accent/5 border-accent/30">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Get Fort Collins Insider Tips</h2>
                <p className="text-muted-foreground mb-6">
                  Best dispensary deals, new brewery-dispensary collaborations, and seasonal events
                </p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50"
                    required
                  />
                  <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                    {submitting ? "..." : "Subscribe"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-semibold mb-6 text-center">Explore More Colorado</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.name} to={guide.slug}>
                  <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-accent">{guide.name}</h4>
                      <p className="text-xs text-muted-foreground">{guide.desc}</p>
                      {guide.distance && (
                        <Badge variant="outline" className="mt-2 text-xs">{guide.distance}</Badge>
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
