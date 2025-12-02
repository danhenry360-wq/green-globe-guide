import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, Star, CheckCircle, AlertTriangle, 
  Plane, Home, Building, Cannabis, Car, Clock, Shield, 
  Mail, ArrowRight, Bed, Store, Mountain,
  Info, Ban, ChevronRight
} from "lucide-react";
import coloradoHeroImage from "@/assets/colorado-hub-hero.jpg";

// Types
interface Dispensary {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number;
  image: string | null;
  is_recreational: boolean;
  is_medical: boolean;
}

interface Rental {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  rating: number | null;
  images: string[] | null;
  amenities: unknown;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
}

const ColoradoHub = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch ALL Colorado dispensaries (no limit - auto-updates when new ones added)
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false });
      
      if (dispData) setDispensaries(dispData);

      // Fetch ALL Colorado rentals (no limit - auto-updates when new ones added)
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Colorado%')
        .order('rating', { ascending: false });
      
      if (rentalData) setRentals(rentalData);

      // Fetch Colorado-related blog posts
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, category')
        .eq('status', 'published')
        .ilike('title', '%colorado%')
        .order('published_at', { ascending: false })
        .limit(6);
      
      if (blogData) setBlogPosts(blogData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNewsletterSignup = () => {
    if (!footerEmail || !footerEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Welcome to the BudQuest community!",
      description: "You'll receive exclusive Colorado travel tips and deals.",
    });
    
    setFooterEmail("");
  };

  const stats = [
    { icon: Cannabis, label: "Age Requirement", value: "21+" },
    { icon: Store, label: "Licensed Dispensaries", value: "500+" },
    { icon: Shield, label: "Possession Limit", value: "1 oz" },
    { icon: Mountain, label: "Cities Covered", value: "10+" },
  ];

  const cities = [
    { name: "Denver", slug: "denver", description: "The Mile High City - Colorado's cannabis capital with the most dispensaries and 420-friendly accommodations." },
    { name: "Boulder", slug: "boulder", description: "Progressive college town known for craft cannabis, outdoor recreation, and relaxed atmosphere." },
    { name: "Colorado Springs", slug: "colorado-springs", description: "Gateway to the mountains with growing cannabis scene and stunning natural beauty." },
    { name: "Aspen", slug: "aspen", description: "Luxury ski destination with high-end dispensaries and upscale 420-friendly lodging." },
  ];

  const consumptionRules = [
    { icon: Home, title: "Private Residences", description: "Legal to consume on private property with owner's permission. This is the safest and most common option.", allowed: true },
    { icon: Building, title: "Hotel Balconies", description: "Some 420-friendly hotels allow consumption on private balconies. Always verify with the property first.", allowed: true },
    { icon: Ban, title: "Public Spaces", description: "Illegal to consume in public including parks, sidewalks, restaurants, and bars. $100+ fines apply.", allowed: false },
  ];

  const travelTips = [
    { 
      title: "Packing & Transport", 
      content: "Cannabis must remain in Colorado - you cannot legally transport it across state lines, even to other legal states. Store purchases in your trunk during travel within Colorado. Keep original dispensary packaging for proof of legal purchase."
    },
    { 
      title: "Airport Safety", 
      content: "Denver International Airport (DIA) is federal property. TSA can and will confiscate cannabis products. Amnesty boxes are available before security, but the safest approach is to consume or dispose of products before heading to the airport."
    },
    { 
      title: "Dispensary Etiquette", 
      content: "Bring valid government ID (21+). Most dispensaries are cash-only, though many have ATMs. Ask budtenders for recommendations - they're knowledgeable. First-time visitor discounts are common."
    },
    { 
      title: "Best Time to Visit", 
      content: "Spring and fall offer mild weather and smaller crowds. Ski season (November-April) is great for mountain town visits. 4/20 celebrations in Denver are legendary but expect crowds. Summer offers perfect conditions for outdoor activities."
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Colorado Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Colorado including legal information, 420-friendly accommodations, dispensaries, and travel tips.",
    "url": "https://budquest.guide/usa/colorado",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "Place",
      "name": "Colorado",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CO",
        "addressCountry": "US"
      }
    },
    "mentions": [
      {
        "@type": "City",
        "name": "Denver, Colorado"
      },
      {
        "@type": "City", 
        "name": "Boulder, Colorado"
      },
      {
        "@type": "City",
        "name": "Colorado Springs, Colorado"
      }
    ],
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cannabis legal in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, recreational cannabis is legal in Colorado for adults 21 and older. You can possess up to 1 ounce (28 grams) and purchase from licensed dispensaries with valid government ID."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I consume cannabis in Colorado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cannabis consumption is only legal on private property with the owner's permission. Public consumption including parks, sidewalks, and restaurants is illegal and can result in fines of $100 or more."
        }
      },
      {
        "@type": "Question",
        "name": "Can I bring cannabis to Denver International Airport?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Denver International Airport is federal property where cannabis possession is prohibited. TSA will confiscate any cannabis products found. Amnesty boxes are available before security checkpoints."
        }
      },
      {
        "@type": "Question",
        "name": "Can I take cannabis from Colorado to another state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Transporting cannabis across state lines is a federal crime, even between states where cannabis is legal. All cannabis purchased in Colorado must remain within state borders."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Colorado Cannabis Travel Guide 2025 | Legal Info, Dispensaries & 420 Hotels | BudQuest</title>
        <meta name="description" content="Plan your Colorado cannabis vacation with BudQuest's complete 2025 guide. Find 420-friendly hotels, top Denver dispensaries, marijuana laws, possession limits, and expert travel tips." />
        <meta name="keywords" content="Colorado cannabis travel, 420-friendly hotels Colorado, Denver dispensaries, Colorado marijuana laws 2025, cannabis tourism Colorado, weed legal Colorado, Boulder dispensaries, Colorado Springs cannabis" />
        <link rel="canonical" href="https://budquest.guide/usa/colorado" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Colorado Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Your complete guide to cannabis travel in Colorado. Find 420-friendly stays, top dispensaries, legal info, and travel tips." />
        <meta property="og:url" content="https://budquest.guide/usa/colorado" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://budquest.guide/dest-2.jpg" />
        <meta property="og:site_name" content="BudQuest" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colorado Cannabis Travel Guide 2025 | BudQuest" />
        <meta name="twitter:description" content="Complete Colorado cannabis travel guide with 420-friendly hotels, dispensaries, and legal information." />
        <meta name="twitter:image" content="https://budquest.guide/dest-2.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="BudQuest" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Colorado" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="hover:text-accent transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <ChevronRight className="w-4 h-4" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/usa" className="hover:text-accent transition-colors" itemProp="item">
                <span itemProp="name">USA Guide</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <ChevronRight className="w-4 h-4" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-foreground font-medium" itemProp="name">Colorado</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src={coloradoHeroImage} 
              alt="Colorado Rocky Mountains at sunset" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30 inline-flex items-center whitespace-nowrap">
                <Cannabis className="w-4 h-4 mr-2 flex-shrink-0" />
                Colorado Cannabis Travel Guide 2025
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Your Complete Colorado Cannabis Travel Guide
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Colorado was the first state to legalize recreational cannabis in 2012. Discover verified <Link to="/hotels" className="text-accent hover:underline">420-friendly accommodations</Link>, top-rated <Link to="/dispensary" className="text-accent hover:underline">dispensaries</Link>, current marijuana laws, possession limits, and expert travel tips for your cannabis vacation.
              </p>

              {/* Quick Navigation CTA */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries">
                    <Store className="w-5 h-5 mr-2" />
                    Find Dispensaries
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals">
                    <Bed className="w-5 h-5 mr-2" />
                    420-Friendly Stays
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Recreational since 2012</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Verified information</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Updated December 2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK STATS SECTION */}
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border/30 text-center p-4 md:p-6 hover:border-accent/50 transition-colors">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COLORADO LEGAL STATUS SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Colorado Cannabis Laws
                </span>
              </h2>
              <p className="text-muted-foreground">What You Need to Know Before You Visit</p>
            </motion.div>

            <Card className="bg-card/50 border-border/30 overflow-hidden">
              <CardHeader className="bg-accent/10 border-b border-border/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-xl">Legal Status</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm px-4 py-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Recreational Legal
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Cannabis className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Possession Limit</h4>
                        <p className="text-sm text-muted-foreground">Up to 1 ounce (28g) for adults 21+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Home className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Where to Consume</h4>
                        <p className="text-sm text-muted-foreground">Private property only with owner's permission</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Age Requirement</h4>
                        <p className="text-sm text-muted-foreground">Must be 21+ with valid government ID</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Car className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Transport Rules</h4>
                        <p className="text-sm text-muted-foreground">Cannot take across state lines - even to legal states</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Plane className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Airport Rules</h4>
                        <p className="text-sm text-muted-foreground">Federal jurisdiction - DO NOT bring to airport</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Store Hours</h4>
                        <p className="text-sm text-muted-foreground">8 AM - 12 AM (varies by municipality)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-400 mb-1">Federal vs State Law</h4>
                      <p className="text-sm text-muted-foreground">
                        Cannabis remains illegal under federal law. Federal properties (airports, national parks, federal buildings) 
                        are governed by federal law where cannabis possession is prohibited. Always verify local rules before consuming.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FEATURED 420-FRIENDLY RENTALS */}
        <section id="rentals" className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  420-Friendly Colorado Accommodations
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Finding cannabis-friendly lodging in Colorado is essential since public consumption is illegal. 
                These verified properties allow on-site consumption, giving you a legal place to enjoy your purchases.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rentals.length > 0 ? rentals.map((rental, index) => (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/hotels/${rental.slug}`}>
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={rental.images?.[0] || "/dest-colorado-ski.jpg"} 
                          alt={`${rental.name} - 420 friendly accommodation in Colorado`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground">
                          420-Friendly
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {rental.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{rental.address || "Colorado"}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="text-sm font-medium">{rental.rating || "4.5"}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{(rental.amenities as { price_range?: string } | null)?.price_range || "$$"}</span>
                        </div>
                        {rental.amenities && (
                          <div className="flex gap-2 mt-3">
                            {(rental.amenities as { smoking?: boolean }).smoking && <Badge variant="outline" className="text-xs">Smoking</Badge>}
                            {(rental.amenities as { vaping?: boolean }).vaping && <Badge variant="outline" className="text-xs">Vaping</Badge>}
                            {(rental.amenities as { edibles?: boolean }).edibles && <Badge variant="outline" className="text-xs">Edibles</Badge>}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )) : (
                // Fallback cards
                [1, 2, 3].map((i) => (
                  <Card key={i} className="bg-card/50 border-border/30 overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-5 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/hotels">
                  View All 420-Friendly Rentals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* COLORADO CITIES SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Explore Colorado's Cannabis Destinations
                </span>
              </h2>
              <p className="text-muted-foreground">City-by-city guides for cannabis travelers</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cities.map((city, index) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/usa/colorado/${city.slug}`}>
                    <Card className="bg-card/50 border-border/30 h-full hover:border-accent/50 transition-all group">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {city.description}
                        </p>
                        <span className="text-accent text-sm font-medium inline-flex items-center">
                          Full Guide <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TOP DISPENSARIES SECTION */}
        <section id="dispensaries" className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Licensed Colorado Dispensaries
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Colorado has over 500 licensed dispensaries. Browse our curated selection of top-rated recreational 
                and medical dispensaries across <Link to="/usa/colorado/denver" className="text-accent hover:underline">Denver</Link>, 
                <Link to="/usa/colorado/boulder" className="text-accent hover:underline"> Boulder</Link>, and beyond.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dispensaries.length > 0 ? dispensaries.map((dispensary, index) => (
                <motion.div
                  key={dispensary.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/dispensary/${dispensary.slug}`}>
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={dispensary.image || "/dispensaries/native-roots-denver.png"} 
                          alt={`${dispensary.name} dispensary in ${dispensary.city}, Colorado`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1">
                          {dispensary.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{dispensary.city}, {dispensary.state}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="text-sm font-medium">{dispensary.rating}</span>
                          </div>
                          <div className="flex gap-1">
                            {dispensary.is_recreational && <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">Rec</Badge>}
                            {dispensary.is_medical && <Badge variant="outline" className="text-xs text-blue-400 border-blue-400/30">Med</Badge>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )) : (
                // Fallback loading cards
                [1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-card/50 border-border/30 overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-5 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/dispensary">
                  Browse All Dispensaries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CONSUMPTION RULES SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Where Can You Actually Smoke?
                </span>
              </h2>
              <p className="text-muted-foreground">Understanding Colorado's consumption laws</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {consumptionRules.map((rule, index) => (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`bg-card/50 h-full ${rule.allowed ? 'border-green-500/30' : 'border-destructive/30'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${rule.allowed ? 'bg-green-500/10' : 'bg-destructive/10'}`}>
                        <rule.icon className={`w-7 h-7 ${rule.allowed ? 'text-green-400' : 'text-destructive'}`} />
                      </div>
                      <div className="mb-2">
                        <Badge className={rule.allowed ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                          {rule.allowed ? 'Allowed' : 'Prohibited'}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAVEL TIPS SECTION */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Colorado Cannabis Travel Tips
                </span>
              </h2>
              <p className="text-muted-foreground">Essential information for first-time visitors</p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {travelTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-card/50 border border-border/30 rounded-lg overflow-hidden px-0">
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/5">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Info className="w-4 h-4 text-accent" />
                        </div>
                        <span className="font-semibold">{tip.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-muted-foreground pl-11">{tip.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* PARTNER SHOWCASE */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground mb-6">Trusted Partners</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <span className="text-lg font-semibold text-muted-foreground">Colorado Cannabis Tours</span>
              <span className="text-lg font-semibold text-muted-foreground">Bud & Breakfast</span>
              <span className="text-lg font-semibold text-muted-foreground">Kushkations</span>
              <span className="text-lg font-semibold text-muted-foreground">Arrowhead Manor</span>
            </div>
          </div>
        </section>

        {/* BLOG POSTS SECTION */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Latest Colorado Travel Guides
                </span>
              </h2>
              <p className="text-muted-foreground">Tips and insights for your cannabis trip</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {blogPosts.length > 0 ? blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all group h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-background/80">{post.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No Colorado-specific articles yet. Check back soon!</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/blog">Browse All Articles</Link>
                  </Button>
                </div>
              )}
            </div>

            {blogPosts.length > 0 && (
              <div className="text-center">
                <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <Link to="/blog">
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-accent/10 via-card to-accent/5 border-accent/30 max-w-3xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Colorado Cannabis Travel Newsletter
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Get exclusive Colorado travel tips, new dispensary openings, 420-friendly rental deals, 
                  and law updates delivered to your inbox. Join thousands of cannabis travelers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    className="bg-background/50 border-border/50 h-12"
                  />
                  <Button 
                    onClick={handleNewsletterSignup}
                    className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Weekly updates • Exclusive deals • Unsubscribe anytime
                </p>
                
                {/* Internal Links */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <p className="text-sm text-muted-foreground mb-3">Explore more cannabis travel guides:</p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <Link to="/usa" className="text-accent hover:underline">USA Guide</Link>
                    <Link to="/world" className="text-accent hover:underline">World Guide</Link>
                    <Link to="/blog" className="text-accent hover:underline">Travel Blog</Link>
                    <Link to="/dispensary" className="text-accent hover:underline">All Dispensaries</Link>
                    <Link to="/hotels" className="text-accent hover:underline">420 Rentals</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ColoradoHub;
