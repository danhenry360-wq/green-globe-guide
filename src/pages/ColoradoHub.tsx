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
  Info, Ban, ChevronRight, Search, Filter
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
  
  // New State for Search & Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('state', 'Colorado')
        .order('rating', { ascending: false })
        .limit(4);
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Colorado%')
        .order('rating', { ascending: false })
        .limit(4);
      if (rentalData) setRentals(rentalData);

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
      toast({ title: "Invalid Email", description: "Please enter a valid email.", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: footerEmail, source_page: '/usa/colorado' });
      if (error) throw error;
      toast({ title: "Subscribed!", description: "Welcome to the BudQuest community." });
      setFooterEmail("");
    } catch (error) {
      toast({ title: "Error", description: "Could not subscribe.", variant: "destructive" });
    }
  };

  const stats = [
    { icon: Cannabis, label: "Age Requirement", value: "21+" },
    { icon: Store, label: "Licensed Dispensaries", value: "500+" },
    { icon: Shield, label: "Possession Limit", value: "1 oz" },
    { icon: Mountain, label: "Cities Covered", value: "29+" },
  ];

  // Added 'region' property to help organization
  const cities = [
    { name: "Denver", region: "Metro", slug: "denver", description: "The Mile High City - Colorado's cannabis capital." },
    { name: "Boulder", region: "Front Range", slug: "boulder", description: "Progressive college town known for craft cannabis." },
    { name: "Colorado Springs", region: "Front Range", slug: "colorado-springs", description: "Gateway to Pikes Peak and Garden of the Gods." },
    { name: "Aspen", region: "Mountains", slug: "aspen", description: "Luxury ski destination with high-end dispensaries." },
    { name: "Fort Collins", region: "Front Range", slug: "fort-collins", description: "Craft beer capital meets cannabis culture." },
    { name: "Aurora", region: "Metro", slug: "aurora", description: "Diverse neighbor near DIA with great dispensaries." },
    { name: "Thornton", region: "Metro", slug: "thornton", description: "Budget-friendly northern suburb." },
    { name: "Lakewood", region: "Metro", slug: "lakewood", description: "West Denver suburb near Red Rocks." },
    { name: "Pueblo", region: "Front Range", slug: "pueblo", description: "Southern cannabis oasis with affordable prices." },
    { name: "Longmont", region: "Front Range", slug: "longmont", description: "Boulder County gem with craft breweries." },
    { name: "Loveland", region: "Front Range", slug: "loveland", description: "The Sweetheart City - Gateway to Estes Park." },
    { name: "Estes Park", region: "Mountains", slug: "estes-park", description: "Gateway to Rocky Mountain National Park." },
    { name: "Greeley", region: "Front Range", slug: "greeley", description: "Home to Garden City's famous 'Green Mile'." },
    { name: "Castle Rock", region: "Front Range", slug: "castle-rock", description: "Outlet shopping destination between Denver and Springs." },
    { name: "Broomfield", region: "Metro", slug: "broomfield", description: "Tech corridor between Denver and Boulder." },
    { name: "Westminster", region: "Metro", slug: "westminster", description: "Scenic views and the Butterfly Pavilion." },
    { name: "Arvada", region: "Metro", slug: "arvada", description: "Historic Olde Town charm with G-Line access." },
    { name: "Centennial", region: "Metro", slug: "centennial", description: "South Metro hub featuring Topgolf." },
    { name: "Grand Junction", region: "Western Slope", slug: "grand-junction", description: "Wine country meets weed country." },
    { name: "Durango", region: "Western Slope", slug: "durango", description: "Historic railroad town with Southwest vibes." },
    { name: "Fort Morgan", region: "Plains", slug: "fort-morgan", description: "Plains hub near Log Lane Village." },
    { name: "Montrose", region: "Western Slope", slug: "montrose", description: "Gateway to the Black Canyon." },
    { name: "Littleton", region: "Metro", slug: "littleton", description: "Historic downtown charm." },
    { name: "Englewood", region: "Metro", slug: "englewood", description: "Home to the 'Green Mile' on South Broadway." },
    { name: "Red Rocks", region: "Metro", slug: "red-rocks", description: "World's best music venue. Morrison guide." },
    { name: "Glenwood Springs", region: "Mountains", slug: "glenwood-springs", description: "Hot springs, vapor caves, and relaxation." },
    { name: "Telluride", region: "Mountains", slug: "telluride", description: "Festival capital in a box canyon." },
    { name: "Pagosa Springs", region: "Mountains", slug: "pagosa-springs", description: "Deepest hot springs in the world." },
    { name: "Silverton", region: "Mountains", slug: "silverton", description: "High-altitude mining town adventure." },
  ];

  const customCitySlugs = cities.map(c => c.slug);

  const consumptionRules = [
    { icon: Home, title: "Private Residences", description: "Legal with owner's permission.", allowed: true },
    { icon: Building, title: "Hotel Balconies", description: "If allowed by property rules.", allowed: true },
    { icon: Ban, title: "Public Spaces", description: "Illegal in parks & sidewalks.", allowed: false },
  ];

  const travelTips = [
    { title: "Packing & Transport", content: "Cannabis must remain in Colorado. Keep it in the trunk while driving." },
    { title: "Airport Safety", content: "DIA is federal property. Do not bring cannabis to the airport." },
    { title: "Dispensary Etiquette", content: "Bring valid ID (21+). Cash is king." },
    { title: "Best Time to Visit", content: "Spring/Fall for fewer crowds. Winter for skiing." },
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
        <meta name="description" content="Explore Colorado cannabis destinations. Denver, Boulder, Mountain towns, and more." />
        <link rel="canonical" href="https://budquest.guide/usa/colorado" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
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
            <img src={coloradoHeroImage} alt="Colorado" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Cannabis className="w-4 h-4 mr-2" /> Colorado Cannabis Guide 2025
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                Explore Colorful Colorado
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90"><a href="#cities">Explore Cities</a></Button>
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

        {/* CITY GUIDES WITH SEARCH AND FILTER */}
        <section id="cities" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Cannabis Destinations</h2>
              <p className="text-muted-foreground">Find your perfect 420-friendly city.</p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-10 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search cities (e.g. 'Aspen', 'Denver')..." 
                  className="pl-10 h-12 text-lg bg-card/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Regional Tabs (Scrollable on mobile) */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {regionTabs.map(region => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    onClick={() => setSelectedRegion(region)}
                    className="whitespace-nowrap rounded-full"
                    size="sm"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>

            {/* City Grid - 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <MapPin className="w-5 h-5 text-accent" />
                            </div>
                            <Badge variant="outline" className="text-[10px] md:text-xs">{city.region}</Badge>
                          </div>
                          
                          <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
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

        {/* DISPENSARIES */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Dispensaries</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dispensaries.map((d) => (
                <Link key={d.id} to={`/dispensary/${d.slug}`}>
                  <Card className="h-full hover:border-accent/50 transition-all">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img src={d.image || "/dispensaries/native-roots-denver.png"} alt={d.name} className="w-full h-full object-cover"/>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold truncate">{d.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {d.rating} • {d.city}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline"><Link to="/dispensary">View All Dispensaries</Link></Button>
            </div>
          </div>
        </section>

        {/* RENTALS */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">420-Friendly Stays</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentals.map((r) => (
                <Link key={r.id} to={`/hotels/${r.slug}`}>
                  <Card className="h-full hover:border-accent/50 transition-all">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img src={r.images?.[0] || "/dest-colorado-ski.jpg"} alt={r.name} className="w-full h-full object-cover"/>
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">420 Friendly</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold truncate">{r.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {r.rating}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline"><Link to="/hotels">View All Rentals</Link></Button>
            </div>
          </div>
        </section>

        {/* RULES & TIPS */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Consumption Rules</h2>
              <div className="space-y-4">
                {consumptionRules.map((rule) => (
                  <Card key={rule.title} className="p-4 flex gap-4 items-start">
                    <rule.icon className={`w-6 h-6 shrink-0 ${rule.allowed ? 'text-green-500' : 'text-red-500'}`} />
                    <div>
                      <h3 className="font-bold">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Travel Tips</h2>
              <Accordion type="single" collapsible>
                {travelTips.map((tip, i) => (
                  <AccordionItem key={i} value={`tip-${i}`}>
                    <AccordionTrigger>{tip.title}</AccordionTrigger>
                    <AccordionContent>{tip.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="p-8 bg-accent/5 border-accent/20">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Join the Cannabis Travel Club</h2>
              <p className="text-muted-foreground mb-6">Get weekly guides, deals, and legal updates.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter email" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} />
                <Button onClick={handleNewsletterSignup}>Subscribe</Button>
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
