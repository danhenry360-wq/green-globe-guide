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
  Compass, Wine
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

const GrandJunctionGuide = () => {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Grand Junction and nearby Palisade dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .or('city.ilike.%Grand Junction%,city.ilike.%Palisade%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Grand Junction%')
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
        .insert({ email, source_page: 'grand-junction-guide' });
      
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
    "name": "Grand Junction Cannabis Travel Guide 2025",
    "description": "Complete guide to cannabis travel in Grand Junction and Palisade. Wineries, National Monuments, and dispensaries.",
    "url": "https://budquest.guide/grand-junction",
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "about": {
      "@type": "City",
      "name": "Grand Junction",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Grand Junction",
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
      temp: "50-75°F",
      highlights: [
        "Fruit orchards blooming in Palisade",
        "Perfect mountain biking weather",
        "Desert wildflowers",
        "Downtown Art Walk"
      ],
      tip: "The high desert warms up earlier than the mountains. Great for early season biking."
    },
    {
      id: "summer",
      name: "Summer", 
      months: "June - August",
      icon: Sun,
      temp: "85-100°F",
      highlights: [
        "Palisade Peach Festival (August)",
        "River rafting on the Colorado",
        "Country Jam Music Festival",
        "Lavender Festival"
      ],
      tip: "It gets hot! Plan outdoor activities for early morning and hydrate heavily."
    },
    {
      id: "fall",
      name: "Fall",
      months: "September - November",
      icon: Leaf,
      temp: "50-80°F",
      highlights: [
        "Colorado Mountain Winefest",
        "Fall foliage on Grand Mesa",
        "Harvest season markets",
        "Hiking the Monument"
      ],
      tip: "September is peak season for wine and produce lovers."
    },
    {
      id: "winter",
      name: "Winter",
      months: "December - February",
      icon: Snowflake,
      temp: "20-45°F",
      highlights: [
        "Skiing at Powderhorn Mountain Resort",
        "Quiet hiking trails",
        "Winter wine tasting",
        "Holiday lighting downtown"
      ],
      tip: "Grand Junction stays milder than the ski resorts, making it a good winter base."
    }
  ];

  const attractions = [
    {
      name: "Colorado National Monument",
      icon: Mountain,
      description: "Breathtaking red rock canyons and monoliths. The 'mini Grand Canyon' of Colorado.",
      cannabisTip: "Federal Land (National Park Service). Strictly NO possession or consumption allowed inside.",
      address: "Rim Rock Drive"
    },
    {
      name: "Palisade Wine Country",
      icon: Wine,
      description: "Just east of GJ, home to 25+ wineries and famous peaches. Rent a bike and tour the vineyards.",
      cannabisTip: "Weed and Wine tour? Just don't bike drunk or high. Designated drivers are essential.",
      address: "Palisade, CO"
    },
    {
      name: "Downtown Grand Junction",
      icon: Store,
      description: "A certified Creative District with sculptures, shops, and restaurants.",
      cannabisTip: "Very walkable. Great place to grab food after visiting a local dispensary.",
      address: "Main Street"
    },
    {
      name: "Grand Mesa",
      icon: TreePine,
      description: "The world's largest flat-top mountain. Fishing, skiing, and 300+ lakes.",
      cannabisTip: "Forest Service land rules apply. Be discreet and pack out all trash/roaches.",
      address: "Hwy 65"
    },
    {
      name: "Lunch Loop Trails",
      icon: Bike,
      description: "World-class mountain biking system known for technical terrain.",
      cannabisTip: "These trails are technical and dangerous. Stay sober while riding.",
      address: "Monument Rd"
    },
    {
      name: "Two Rivers Winery",
      icon: Wine,
      description: "Upscale winery with views of the Monument.",
      cannabisTip: "Private property. Consumption is generally prohibited on winery grounds.",
      address: "2087 Broadway"
    }
  ];

  const transportOptions = [
    {
      name: "Car (Essential)",
      icon: Car,
      description: "Things are spread out between GJ, the Monument, and Palisade.",
      tip: "Rental cars available at GJT Airport."
    },
    {
      name: "Grand Valley Transit",
      icon: Bus,
      description: "Local bus service connecting Clifton, GJ, and Fruita.",
      tip: "Affordable but slower than driving."
    },
    {
      name: "Bike Rental",
      icon: Bike,
      description: "Popular way to see wineries in Palisade.",
      tip: "Look for e-bikes to make the vineyard hopping easier."
    }
  ];

  const relatedGuides = [
    { name: "Aspen", slug: "/aspen", desc: "2 hours East", distance: "2 hrs" },
    { name: "Montrose", slug: "/montrose", desc: "1 hour South", distance: "1 hr" },
    { name: "Denver", slug: "/denver", desc: "4 hours East", distance: "4 hrs" },
  ];

  return (
    <>
      <Helmet>
        <title>Grand Junction Cannabis Travel Guide 2025 | Wine & Weed | BudQuest</title>
        <meta name="description" content="Explore Grand Junction and Palisade. The perfect blend of Colorado wine country and legal cannabis. Find dispensaries, tours, and 420-friendly stays." />
        <meta name="keywords" content="Grand Junction cannabis, Palisade wineries and weed, Grand Junction dispensaries, Colorado National Monument travel" />
        <link rel="canonical" href="https://budquest.guide/grand-junction" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Grand Junction</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-colorado.jpg" alt="Grand Junction Red Rocks" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-orange-600/20 text-orange-400 border-orange-600/30">
                <Wine className="w-4 h-4 mr-2" />
                Wine & Weed Country
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Grand Junction Cannabis Guide</h1>
              <p className="text-lg text-muted-foreground mb-8">The heart of Colorado's wine country and high desert adventure. Enjoy Palisade peaches, Pinot Noir, and premium cannabis.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90"><a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a></Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age", value: "21+" },
                { icon: Store, label: "Shops", value: "Available" },
                { icon: Shield, label: "Limit", value: "1 oz" },
                { icon: Wine, label: "Pairing", value: "Wineries" },
                { icon: Mountain, label: "Elevation", value: "4,593 ft" },
              ].map((stat, index) => (
                <Card key={index} className="bg-card/50 border-border/30 text-center p-4">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Best Time to Visit</h2>
            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 p-1">
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id}><season.icon className="w-4 h-4 mr-2 hidden sm:inline" />{season.name}</TabsTrigger>
                ))}
              </TabsList>
              {seasons.map((season) => (
                <TabsContent key={season.id} value={season.id}>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-2">{season.name} ({season.temp})</h3>
                    <p className="text-muted-foreground mb-4">{season.tip}</p>
                    <ul className="space-y-2">
                      {season.highlights.map((h, i) => <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" />{h}</li>)}
                    </ul>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Local Attractions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {attractions.map((attr, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center gap-3 mb-4"><attr.icon className="w-6 h-6 text-accent" /><h3 className="font-bold">{attr.name}</h3></div>
                  <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                  <p className="text-xs text-accent">💡 {attr.cannabisTip}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="dispensaries" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Dispensaries in Grand Junction & Palisade</h2>
            {loading ? <div className="text-center">Loading...</div> : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.map((disp) => (
                  <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all">
                      <div className="aspect-video relative"><img src={disp.image || "/dest-california.jpg"} alt={disp.name} className="w-full h-full object-cover"/></div>
                      <div className="p-4"><h3 className="font-bold">{disp.name}</h3><p className="text-sm text-muted-foreground">{disp.city}</p>{renderRating(disp.rating || 0)}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : <p className="text-center">No dispensaries found.</p>}
          </div>
        </section>

        <section id="rentals" className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">420-Friendly Stays</h2>
            {loading ? <div className="text-center">Loading...</div> : rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((rental) => (
                  <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                    <Card className="overflow-hidden hover:border-accent/50 transition-all">
                      <div className="aspect-video relative">
                        <img src={rental.images?.[0] || "/dest-california.jpg"} alt={rental.name} className="w-full h-full object-cover"/>
                        <Badge className="absolute top-2 right-2 bg-green-500 text-white">420 Friendly</Badge>
                      </div>
                      <div className="p-4"><h3 className="font-bold">{rental.name}</h3>{renderRating(rental.rating || 4)}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : <p className="text-center">No rentals found in Grand Junction. Check back soon.</p>}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Get the Grand Junction Guide</h2>
            <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit">Get Guide</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GrandJunctionGuide;
