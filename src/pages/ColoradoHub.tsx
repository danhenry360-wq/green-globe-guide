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
  Info, Ban, ChevronRight, Search, ShoppingBag, Leaf
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
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch top 4 Colorado dispensaries
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false })
        .limit(4);
      
      if (dispData) setDispensaries(dispData);

      // Fetch top 4 Colorado rentals
      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Colorado%')
        .order('rating', { ascending: false })
        .limit(4);
      
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

  const handleNewsletterSignup = async () => {
    if (!footerEmail || !footerEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: footerEmail,
        source_page: '/usa/colorado'
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to the BudQuest community!",
          description: "You'll receive exclusive Colorado travel tips and deals.",
        });
      }
      setFooterEmail("");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const stats = [
    { icon: Cannabis, label: "Age Requirement", value: "21+" },
    { icon: Store, label: "Licensed Dispensaries", value: "500+" },
    { icon: Shield, label: "Possession Limit", value: "1 oz" },
    { icon: Mountain, label: "Cities Covered", value: "41+" },
  ];

  const cities = [
    { name: "Denver", region: "Metro", slug: "denver", description: "The Mile High City - Colorado's cannabis capital with the most dispensaries and 420-friendly accommodations." },
    { name: "Boulder", region: "Front Range", slug: "boulder", description: "Progressive college town known for craft cannabis, outdoor recreation, and relaxed atmosphere." },
    { name: "Colorado Springs", region: "Front Range", slug: "colorado-springs", description: "Gateway to the mountains with growing cannabis scene and stunning natural beauty." },
    { name: "Aspen", region: "Mountains", slug: "aspen", description: "Luxury ski destination with high-end dispensaries and upscale 420-friendly lodging." },
    { name: "Breckenridge", region: "Mountains", slug: "breckenridge", description: "Historic mining town with world-class skiing and the 'Green Light District'." },
    { name: "Fort Collins", region: "Front Range", slug: "fort-collins", description: "Craft beer capital meets cannabis culture with Old Town charm and mountain access." },
    { name: "Aurora", region: "Metro", slug: "aurora", description: "Denver's diverse neighbor near DIA with great dispensaries and international cuisine." },
    { name: "Thornton", region: "Metro", slug: "thornton", description: "Budget-friendly northern suburb with easy access to Denver's cannabis scene." },
    { name: "Lakewood", region: "Metro", slug: "lakewood", description: "West Denver suburb with mountain access, diverse dispensaries, and Red Rocks Amphitheatre nearby." },
    { name: "Pueblo", region: "Front Range", slug: "pueblo", description: "Southern Colorado's cannabis oasis with affordable prices and historic downtown charm." },
    { name: "Longmont", region: "Front Range", slug: "longmont", description: "Boulder County gem with craft breweries, farm-to-table dining, and quality dispensaries." },
    { name: "Loveland", region: "Front Range", slug: "loveland", description: "The Sweetheart City - Art, sculpture parks, and the gateway to Estes Park." },
    { name: "Estes Park", region: "Mountains", slug: "estes-park", description: "Gateway to Rocky Mountain National Park with 420-friendly cabins and stunning views." },
    { name: "Greeley", region: "Front Range", slug: "greeley", description: "Northern Colorado hub featuring Garden City's famous 'Green Mile' of dispensaries." },
    { name: "Castle Rock", region: "Front Range", slug: "castle-rock", description: "Outlet shopping destination between Denver and The Springs, near Sedalia dispensaries." },
    { name: "Broomfield", region: "Metro", slug: "broomfield", description: "The tech corridor perfectly situated between Denver and Boulder with premier shopping." },
    { name: "Westminster", region: "Metro", slug: "westminster", description: "The Butterfly City - Scenic views, the Butterfly Pavilion, and easy access to Boulder and Denver." },
    { name: "Arvada", region: "Metro", slug: "arvada", description: "Historic Olde Town charm meets modern cannabis culture, connected by the G-Line commuter rail." },
    { name: "Centennial", region: "Metro", slug: "centennial", description: "South Metro hub featuring Topgolf, Cherry Creek State Park, and premier shopping destinations." },
    { name: "Grand Junction", region: "Western Slope", slug: "grand-junction", description: "Wine country meets weed country on the Western Slope. Explore the Colorado National Monument." },
    { name: "Durango", region: "Western Slope", slug: "durango", description: "Historic railroad town with Southwest vibes, river adventures, and a thriving cannabis scene." },
    { name: "Fort Morgan", region: "Plains", slug: "fort-morgan", description: "Plains hub near Log Lane Village's 'Green Mile', offering easy I-76 access." },
    { name: "Montrose", region: "Western Slope", slug: "montrose", description: "Outdoor adventure hub and gateway to the Black Canyon of the Gunnison." },
    { name: "Littleton", region: "Metro", slug: "littleton", description: "Historic downtown charm with easy access to nearby recreational dispensaries." },
    { name: "Englewood", region: "Metro", slug: "englewood", description: "Home to the 'Green Mile' on South Broadway and the historic Gothic Theatre." },
    { name: "Red Rocks", region: "Metro", slug: "red-rocks", description: "The world's best music venue. Learn consumption rules and where to stay in Morrison." },
    { name: "Glenwood Springs", region: "Mountains", slug: "glenwood-springs", description: "World-famous hot springs, vapor caves, and hanging lakes. The ultimate relaxation spot." },
    { name: "Telluride", region: "Mountains", slug: "telluride", description: "Festival capital in a box canyon. Luxury cannabis and free gondola rides." },
    { name: "Pagosa Springs", region: "Mountains", slug: "pagosa-springs", description: "Deepest hot springs in the world and Wolf Creek ski area." },
    { name: "Silverton", region: "Mountains", slug: "silverton", description: "High-altitude mining town adventure. Rugged, remote, and historic." },
    { name: "Altitude", region: "Metro", slug: "altitude", description: "Unincorporated area near Denver offering high-altitude cannabis experiences with stunning elevation views." },
    { name: "Federal Heights", region: "Metro", slug: "federal-heights", description: "North Denver metro city with convenient access to dispensaries and urban cannabis culture." },
    { name: "Northglenn", region: "Metro", slug: "northglenn", description: "North of Denver with family-friendly atmosphere, quality dispensaries, and easy highway access." },
    { name: "Commerce City", region: "Metro", slug: "commerce-city", description: "Industrial area northeast of Denver with affordable dispensaries and I-76 access to the plains." },
    { name: "Ouray", region: "Mountains", slug: "ouray", description: "San Juan Mountains alpine village with epic hiking, ice climbing, and secluded 420-friendly stays." },
    { name: "Vail", region: "Mountains", slug: "vail", description: "America's premier ski resort with luxury cannabis dispensaries and upscale 420-friendly mountain lodging." },
    { name: "Steamboat Springs", region: "Mountains", slug: "steamboat-springs", description: "World-class ski resort featuring natural hot springs, outdoor recreation, and cannabis culture combined." },
    { name: "Leadville", region: "Mountains", slug: "leadville", description: "The highest elevation incorporated city in North America (10,152 ft). Extreme altitude cannabis adventure and historic mining town." },
    { name: "Manitou Springs", region: "Front Range", slug: "manitou-springs", description: "Artistic mountain community with natural mineral springs, galleries, and creative 420-friendly atmosphere near Colorado Springs." },
    { name: "Central City", region: "Mountains", slug: "central-city", description: "Historic Gold Rush mining town with casinos, mountain scenery, and unique cannabis tourism experience near Denver." },
  ];

  const customCitySlugs = [
    'denver', 'boulder', 'aspen', 'colorado-springs', 'fort-collins', 
    'aurora', 'thornton', 'lakewood', 'longmont', 'pueblo',
    'loveland', 'estes-park', 'greeley', 'castle-rock', 'broomfield',
    'westminster', 'arvada', 'centennial', 'grand-junction', 'durango',
    'fort-morgan', 'montrose', 'littleton', 'englewood', 'red-rocks',
    'glenwood-springs', 'telluride', 'pagosa-springs', 'silverton', 'breckenridge',
    'federal-heights', 'northglenn', 'commerce-city', 'ouray', 'vail',
    'steamboat-springs', 'leadville', 'manitou-springs', 'central-city'
  ];

  // Detailed Law Data
  const legalDetails = [
    { 
      title: "Purchase Limits", 
      icon: ShoppingBag, 
      desc: "In a single transaction, adults 21+ can purchase up to:",
      points: ["1 ounce (28g) of Flower", "8 grams of Concentrate (Wax, Shatter)", "800mg of Edibles", "Mix & Match is allowed (equivalency rules apply)"]
    },
    { 
      title: "Public Consumption", 
      icon: Ban, 
      desc: "Colorado has strict 'Clean Air' laws. Public consumption is illegal in:",
      points: ["Sidewalks, Parks & Streets", "Restaurants, Bars & Concert Venues", "Ski Lifts & Slopes", "Inside Dispensaries"]
    },
    { 
      title: "Driving & Transport", 
      icon: Car, 
      desc: "Driving high is a DUI. Police use blood tests (5ng limit).",
      points: ["Cannabis must be in a SEALED container", "Do not cross state lines (Federal Crime)", "Do not consume in a moving vehicle", "Rental car cleaning fees can be $250+"]
    },
    { 
      title: "Federal Land Warning", 
      icon: AlertTriangle, 
      desc: "Federal law supersedes state law. Possession is illegal on:",
      points: ["National Parks (RMNP, Mesa Verde)", "National Forests & Ski Areas", "Federal Courthouses & Monuments", "Airports (DIA is Federal property)"]
    },
    { 
      title: "Home Cultivation", 
      icon: Leaf, 
      desc: "Residents 21+ may grow cannabis with restrictions:",
      points: ["Up to 6 plants per person (3 flowering)", "Max 12 plants per residence", "Must be in an enclosed, locked space", "Plants cannot be visible from outside"]
    },
    { 
      title: "Identification", 
      icon: Shield, 
      desc: "Dispensaries are strict. You must present valid ID:",
      points: ["State-issued Driver's License", "Passport or Passport Card", "Military ID", "Vertical IDs (under 21 style) often rejected even if 21+"]
    }
  ];

  const travelTips = [
    { 
      title: "The Altitude Effect", 
      content: "THC hits harder at altitude. Alcohol hits harder too. Combine them, and you might have a bad time. Drink twice as much water as you think you need."
    },
    { 
      title: "Edible Dosing", 
      content: "Start low and go slow. The standard dose is 10mg, but we recommend 2.5mg-5mg for visitors. Wait at least 2 hours before taking more."
    },
    { 
      title: "Cash is King", 
      content: "Due to federal banking regulations, most dispensaries are cash-only. They usually have ATMs, but bring cash to save on fees."
    },
    { 
      title: "Last Call", 
      content: "Dispensaries have strict closing times (usually 10 PM or midnight, depending on the city). They cannot complete a sale 1 minute past closing."
    },
  ];

  const consumptionRules = [
    { icon: Home, title: "Private Residences", description: "Legal to consume on private property with owner's permission.", allowed: true },
    { icon: Building, title: "Hotel Balconies", description: "Only if explicitly allowed by the property rules.", allowed: true },
    { icon: Ban, title: "Public Spaces", description: "Illegal in parks, sidewalks, bars, and restaurants.", allowed: false },
  ];

  // Filtering Logic
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "All" || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const regionTabs = ["All", "Metro", "Mountains", "Front Range", "Western Slope"];

  return (
    <>
      <Helmet>
        <title>Colorado Cannabis Travel Guide 2025 | BudQuest</title>
        <meta name="description" content="Explore Colorado cannabis destinations. Denver, Boulder, Mountain towns, and more. Find dispensaries, laws, and 420-friendly stays." />
        <link rel="canonical" href="https://budquest.guide/usa/colorado" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa" className="hover:text-accent">USA Guide</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Colorado</li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={coloradoHeroImage} alt="Colorado Mountains" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30 backdrop-blur-sm">
                <Cannabis className="w-4 h-4 mr-2" /> Colorado Cannabis Guide 2025
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Explore <span className="bg-gradient-to-r from-white via-accent to-gold bg-clip-text text-transparent">Colorful Colorado</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90"><a href="#cities">Explore Cities</a></Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10"><a href="#laws">View Laws</a></Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-card/50 border-border/30 text-center p-4">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CITY GUIDES */}
        <section id="cities" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Cannabis Destinations
                </span>
              </h2>
              <p className="text-muted-foreground">Find your perfect 420-friendly city in the Centennial State.</p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-10 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search cities (e.g. 'Aspen', 'Denver')..." 
                  className="pl-10 h-12 text-lg bg-card/50 border-accent/20 focus:border-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {regionTabs.map(region => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    onClick={() => setSelectedRegion(region)}
                    className="whitespace-nowrap rounded-full transition-all hover:border-accent"
                    size="sm"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>

            {/* City Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={customCitySlugs.includes(city.slug) ? `/${city.slug}` : `/usa/colorado/${city.slug}`}>
                      <Card className="h-full bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1 group">
                        <CardContent className="p-4 md:p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                            </div>
                            <Badge variant="outline" className="text-[10px] md:text-xs border-accent/30 text-accent bg-accent/5">{city.region}</Badge>
                          </div>
                          
                          <h3 className="text-sm md:text-xl font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-1">
                            {city.name}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                            {city.description}
                          </p>
                          <div className="text-accent text-xs font-medium flex items-center mt-auto">
                            View Guide <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No cities found matching your search.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CANNABIS LAWS - EXPANDED SECTION */}
        <section id="laws" className="py-20 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">Know Before You Go</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Colorado Cannabis Laws
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Colorado was the first state to legalize recreational cannabis, but strict rules still apply. 
                Stay safe and legal by following these regulations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalDetails.map((law, index) => (
                <motion.div
                  key={law.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-card/50 border-border/30 hover:border-accent/30 transition-all">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                        <law.icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{law.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{law.desc}</p>
                      <ul className="space-y-2">
                        {law.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DISPENSARIES */}
        <section id="dispensaries" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Featured Dispensaries
              </span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {dispensaries.map((d) => (
                <Link key={d.id} to={`/dispensary/${d.slug}`}>
                  <Card className="h-full hover:border-accent/50 transition-all border-border/40 bg-card/50">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                      <img 
                        src={d.image || "/dispensaries/native-roots-denver.png"} 
                        alt={d.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-tight mb-2 group-hover:text-accent transition-colors">{d.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        <span className="flex items-center bg-accent/10 px-1.5 py-0.5 rounded text-accent font-medium">
                          <Star className="w-3 h-3 fill-accent text-accent mr-1" /> {d.rating}
                        </span>
                        <span className="line-clamp-1">{d.city}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/dispensary">View All Dispensaries</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* RENTALS */}
        <section id="rentals" className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                420-Friendly Stays
              </span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {rentals.map((r) => (
                <Link key={r.id} to={`/hotels/${r.slug}`}>
                  <Card className="h-full hover:border-accent/50 transition-all border-border/40 bg-card/50">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                      <img 
                        src={r.images?.[0] || "/dest-colorado-ski.jpg"} 
                        alt={r.name} 
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-[10px] px-2 py-0.5 shadow-sm border-none">
                        420 Friendly
                      </Badge>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-tight mb-2 group-hover:text-accent transition-colors">{r.name}</h3>
                      <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                        <span className="flex items-center bg-yellow-500/10 px-1.5 py-0.5 rounded text-yellow-600 font-medium">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" /> {r.rating || "4.5"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Link to="/hotels">View All Rentals</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* RULES & TIPS */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Consumption Rules
                </span>
              </h2>
              <div className="space-y-4">
                {consumptionRules.map((rule) => (
                  <Card key={rule.title} className="p-4 flex gap-4 items-start border-border/40 hover:border-accent/30 transition-colors">
                    <div className={`p-2 rounded-lg ${rule.allowed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <rule.icon className={`w-5 h-5 ${rule.allowed ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Travel Tips
                </span>
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {travelTips.map((tip, i) => (
                  <AccordionItem key={i} value={`tip-${i}`} className="border-border/40">
                    <AccordionTrigger className="hover:text-accent transition-colors text-left text-lg font-medium">
                      {tip.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {tip.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="p-8 bg-gradient-to-br from-accent/10 via-card to-accent/5 border-accent/20">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Join the Cannabis Travel Club</h2>
              <p className="text-muted-foreground mb-6">Get weekly guides, deals, and legal updates.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  placeholder="Enter email" 
                  value={footerEmail} 
                  onChange={(e) => setFooterEmail(e.target.value)} 
                  className="bg-background/50 border-accent/20 focus:border-accent"
                />
                <Button onClick={handleNewsletterSignup} className="bg-accent hover:bg-accent/90">Subscribe</Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ColoradoHub;
