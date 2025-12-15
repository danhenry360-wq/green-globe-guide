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
  MapPin, Star, CheckCircle, Home, Cannabis, Shield, ArrowRight, Bed, Store, 
  ChevronRight, Building2, Clock, Car, Bus, Snowflake, Sun, Leaf, Flower2,
  Droplets, Ban, Mail, Download, Compass, Image as ImageIcon
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
}

const IdahoSpringsGuide = () => {
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
        .ilike('city', '%Idaho%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Idaho%')
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
        .insert({ email, source_page: 'idaho-springs-guide' });
      
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

  const seasons = [
    {
      id: "winter",
      name: "Winter",
      months: "December - March",
      icon: Snowflake,
      temp: "20-40°F",
      highlights: ["Hot springs warmth", "Snow scenery", "I-70 corridor access", "Holiday events"],
      tip: "Perfect time to enjoy hot springs. Warm mineral water is therapeutic. Cannabis relaxation in your cozy lodging."
    },
    {
      id: "summer",
      name: "Summer",
      months: "June - August",
      icon: Sun,
      temp: "65-80°F",
      highlights: ["River activities", "Mountain hiking", "Scenic drives", "Clear weather"],
      tip: "Summer brings outdoor adventures. Sober hiking and river activities, then cannabis enjoyment back at base."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "45-70°F",
      highlights: ["Golden trees", "Cooler temps", "Fewer crowds", "Mountain colors"],
      tip: "Stunning aspen foliage and crisp air. Explore sober, enjoy cannabis relaxation at your lodging afterward."
    },
    {
      id: "spring",
      name: "Spring",
      months: "March - May",
      icon: Flower2,
      temp: "35-60°F",
      highlights: ["Snowmelt waterfalls", "Spring hiking", "Wildflowers", "Mountain renewal"],
      tip: "Waterfalls and spring water rush. Beautiful sober hiking season, followed by cannabis-friendly relaxation."
    }
  ];

  const attractions = [
    {
      name: "Indian Hot Springs",
      icon: Droplets,
      description: "Historic natural hot springs with warm mineral-rich waters offering therapeutic soaking and relaxation experiences.",
      cannabisTip: "Enjoy sober soaking first. Mineral water therapy is best experienced clearly. Cannabis relaxation after."
    },
    {
      name: "St. James Lake Trail",
      icon: Leaf,
      description: "Scenic hiking trail with alpine lake views, mountain vistas, and moderate difficulty suitable for most fitness levels.",
      cannabisTip: "Sober hiking only for safety on mountain terrain. Enjoy the views with clear mind. Cannabis afterward."
    },
    {
      name: "I-70 Scenic Corridor",
      icon: Car,
      description: "One of America's most scenic mountain drives with breathtaking views, pullouts, and mountain photography opportunities.",
      cannabisTip: "Drive sober only. Never consume cannabis and drive. Enjoy the views with full attention to the road."
    },
    {
      name: "Historic Downtown",
      icon: Building2,
      description: "Charming mining town downtown with shops, restaurants, and historic buildings from Colorado's mining era.",
      cannabisTip: "Explore downtown sober during business hours. Cannabis enjoyment best at your lodging or lounges."
    },
    {
      name: "Bear Creek Trail",
      icon: Leaf,
      description: "Easy to moderate hiking trail following a mountain stream with beautiful water features and forest scenery.",
      cannabisTip: "Sober stream hiking recommended. Water safety requires focus. Enjoy cannabis relaxation at lodging."
    },
    {
      name: "Mining History Museum",
      icon: Building2,
      description: "Explore Colorado's mining heritage with artifacts, exhibits, and historical information about the gold rush era.",
      cannabisTip: "Museum visit best done sober for full appreciation. Cannabis appreciation sessions at your lodging afterward."
    }
  ];

  const relatedGuides = [
    { name: "Georgetown", slug: "/georgetown", desc: "Historic Mountain Town", distance: "10 minutes" },
    { name: "Vail", slug: "/vail", desc: "Luxury Ski Resort", distance: "40 minutes" },
    { name: "Denver", slug: "/denver", desc: "Cannabis Hub", distance: "55 minutes" },
  ];

  return (
    <>
      <Helmet>
        <title>🌿 420 Idaho Springs Cannabis Guide 2025 | Hot Springs Town | BudQuest</title>
        <meta name="description" content="Complete Idaho Springs cannabis guide. Hot springs, mineral water, historic mining town, and mountain relaxation." />
        <meta name="keywords" content="Idaho Springs cannabis, hot springs, mineral water, relaxation, mountain town" />
        <link rel="canonical" href="https://budquest.guide/idaho-springs" />
        <meta property="og:title" content="🌿 420 Idaho Springs Cannabis Guide 2025 | BudQuest" />
        <meta property="og:description" content="Hot springs cannabis guide for Idaho Springs Colorado. Mineral water therapy and mountain relaxation." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Idaho Springs Cannabis Travel Guide 2025",
          "url": "https://budquest.guide/idaho-springs"
        })}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Idaho Springs</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado.jpg" alt="Idaho Springs Hot Springs" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-cyan-600/20 text-cyan-400 border-cyan-600/30">
                <Droplets className="w-4 h-4 mr-2" />
                Hot Springs Town
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Idaho Springs Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Historic I-70 mountain town with natural hot springs, mineral water therapy, and alpine cannabis relaxation.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />Spa Stays</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Required", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "3+" },
                { icon: Shield, label: "Possession", value: "1 oz" },
                { icon: Droplets, label: "Hot Springs", value: "Multiple" },
                { icon: Home, label: "Lodging", value: "Historic" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best Time to Visit Idaho Springs
                </span>
              </h2>
            </motion.div>

            <Tabs defaultValue="summer" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 p-1">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id} className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
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
                            <strong className="text-accent">Cannabis Tip:</strong> {season.tip}
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

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Things to Do in Idaho Springs
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Hot springs soaking, scenic drives, hiking, and mountain relaxation.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attr, i) => (
                <motion.div key={attr.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <Card className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <attr.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground">{attr.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                    <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                      <p className="text-xs text-accent font-medium mb-1">Cannabis Traveler Tip</p>
                      <p className="text-xs text-muted-foreground">{attr.cannabisTip}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Cannabis Laws
                </span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Relaxation Friendly</h3>
                </div>
                <p className="text-sm text-muted-foreground">Idaho Springs welcomes cannabis consumption with relaxation lounges and spa-focused cannabis experiences.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Car className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold">I-70 Safety</h3>
                </div>
                <p className="text-sm text-muted-foreground">Major highway corridor. Never drive after cannabis. Use rideshare or stay close to lodging.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Where You CAN Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "Private Lodging", note: "With owner permission" },
                  { place: "Cannabis Lounges", note: "Licensed consumption venues" },
                  { place: "Spa Facilities", note: "Cannabis-infused wellness" },
                  { place: "Private Homes", note: "With permission" },
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

            <Card className="p-6 bg-red-500/5 border-red-500/20">
              <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
                <Ban className="w-5 h-5" />
                Where You CANNOT Consume
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { place: "I-70 Highway", fine: "DUI - Impaired Driving" },
                  { place: "Public Trails", fine: "No outdoor public consumption" },
                  { place: "Hot Springs", fine: "Public water areas prohibited" },
                  { place: "Downtown Streets", fine: "Civil citation" },
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

        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Dispensaries
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
                        <img src={disp.images?.[0] || disp.image || "/dest-colorado.jpg"} alt={disp.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {disp.is_recreational && <Badge className="bg-green-500/90 text-white text-xs">Rec</Badge>}
                          {disp.is_medical && <Badge className="bg-blue-500/90 text-white text-xs">Med</Badge>}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{disp.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{disp.city}, {disp.state}</span>
                        </div>
                        <div className="flex items-center gap-1">{renderRating(disp.rating || 0)}</div>
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

        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 Spa Lodging
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
                        <img src={rental.images?.[0] || "/dest-colorado.jpg"} alt={rental.name} className="w-full h-full object-cover" />
                        <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">420 Friendly</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{rental.name}</h3>
                        {rental.address && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{rental.address}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">{renderRating(rental.rating || 4)}</div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50">
                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No rentals found right now.</p>
              </Card>
            )}
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-gold/10" />
          <div className="container mx-auto px-4 max-w-2xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Get the Idaho Springs Cannabis Guide
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">Free PDF with hot springs guides, hiking maps, and cannabis-friendly spa recommendations.</p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-card/50 border-border/50 focus:border-accent" required />
                <Button type="submit" className="bg-accent hover:bg-accent/90 whitespace-nowrap" disabled={submitting}>
                  {submitting ? "Sending..." : "Get Free Guide"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🌿 420 More Colorado Destinations
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide, index) => (
                <motion.div key={guide.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                  <Link to={guide.slug}>
                    <Card className="p-6 bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1 text-center h-full">
                      <Compass className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">{guide.distance} from Idaho Springs</Badge>
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

export default IdahoSpringsGuide;
