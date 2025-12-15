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
  MapPin, Star, CheckCircle, Plane, Home, Cannabis, Shield, ArrowRight, Bed, Store, ChevronRight,
  Building2, AlertCircle, Clock, Car, Bus, Bike, MapPinned, Snowflake, Sun, Leaf, Flower2,
  Palette, Mountain, Camera, AlertTriangle, Ban, ExternalLink, Compass, Sparkles
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

const ManitouSpringsGuide = () => {
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
        .ilike('city', '%Manitou%')
        .order('rating', { ascending: false })
        .limit(3);
      
      if (dispData) setDispensaries(dispData);

      const { data: rentalData } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Manitou%')
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
        .insert({ email, source_page: 'manitou-guide' });
      
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
    "name": "Manitou Springs Cannabis Travel Guide 2025",
    "description": "Artist community cannabis guide for Manitou Springs, Colorado. Art galleries, mineral springs, bohemian culture, creative cannabis experiences, dispensaries, and 420-friendly lodging.",
    "url": "https://budquest.guide/manitou-springs",
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "about": { "@type": "City", "name": "Manitou Springs", "address": { "@type": "PostalAddress", "addressLocality": "Manitou Springs", "addressRegion": "CO", "addressCountry": "US" } },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  };

  return (
    <>
      <Helmet>
        <title>Manitou Springs Cannabis Travel Guide 2025 | Artist Community & Cannabis | BudQuest</title>
        <meta name="description" content="Complete Manitou Springs cannabis guide. Artist community, mineral springs, galleries, creative cannabis experiences, dispensaries, and 420-friendly lodging." />
        <meta name="keywords" content="Manitou Springs cannabis, artist community cannabis, art galleries, mineral springs, 420 hotels, creative cannabis" />
        <link rel="canonical" href="https://budquest.guide/manitou-springs" />
        <meta property="og:title" content="Manitou Springs Cannabis Travel Guide 2025 | BudQuest" />
        <meta property="og:description" content="Creative cannabis guide for artistic Manitou Springs. Galleries, mineral springs, and bohemian culture." />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Manitou Springs" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen bg-background">
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Manitou Springs</li>
          </ol>
        </nav>

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/dest-2.jpg" alt="Manitou Springs artistic community and mineral springs" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Palette className="w-4 h-4 mr-2" />
                Creative Cannabis Community
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Manitou Springs Cannabis Guide
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Bohemian artistic community near Colorado Springs. Mineral springs, galleries, creative vibes, and cannabis-friendly culture. Perfect for creative cannabis experiences.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                  <a href="#rentals"><Bed className="w-5 h-5 mr-2" />Artist-Friendly Lodging</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Cannabis, label: "Age Requirement", value: "21+" },
                { icon: Store, label: "Dispensaries", value: "6+" },
                { icon: Shield, label: "Possession Limit", value: "1 oz" },
                { icon: Palette, label: "Art Galleries", value: "20+" },
                { icon: Sparkles, label: "Mineral Springs", value: "4" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-card/50 border-border/30 text-center p-4 hover:border-accent/50 transition-all">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Creative Cannabis Experiences
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Art Gallery Hopping",
                  icon: Camera,
                  description: "20+ galleries featuring local and international artists. Creative inspiration combined with cannabis.",
                  tip: "Gallery hopping sober first - then cannabis at lodge. Art appreciation enhanced."
                },
                {
                  name: "Mineral Springs Soaking",
                  icon: Sparkles,
                  description: "Natural thermal springs in bohemian setting. Relaxation and healing at 420-friendly resorts.",
                  tip: "Many springs allow on-site consumption in private areas. Perfect après-cannabis relaxation."
                },
                {
                  name: "Hiking & Nature",
                  icon: Mountain,
                  description: "Scenic trails through artistic landscape. Pikes Peak views and mountain serenity.",
                  tip: "Light edible on easy trails only. Combine nature with creative mindset for amazing experience."
                },
                {
                  name: "Local Restaurants & Cafes",
                  icon: Building2,
                  description: "Farm-to-table dining with bohemian ambiance. Creative menus celebrating local culture.",
                  tip: "Many restaurants cannabis-friendly. Culinary + cannabis = sensory experience."
                },
                {
                  name: "Live Music & Performance",
                  icon: Palette,
                  description: "Frequent live music and performance art in downtown venues.",
                  tip: "Consume before shows only. Support local artists while enjoying cannabis culture."
                },
                {
                  name: "Creative Workshops",
                  icon: Sparkles,
                  description: "Art classes and creative workshops throughout community.",
                  tip: "Cannabis before art-making session = creative flow. Embrace your inner artist."
                }
              ].map((attr) => (
                <Card key={attr.name} className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <attr.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{attr.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{attr.description}</p>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-accent font-medium mb-1">✨ Cannabis Tip</p>
                    <p className="text-xs text-muted-foreground">{attr.tip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Manitou Springs Cannabis Laws
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Recreational Legal</h3>
                </div>
                <p className="text-sm text-muted-foreground">Adults 21+ can possess up to 1 ounce. Most dispensaries welcome curious visitors.</p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Palette className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold">Creative Community</h3>
                </div>
                <p className="text-sm text-muted-foreground">Manitou Springs embraces creative cannabis culture. Bohemian vibes welcome cannabis tourism.</p>
              </Card>
            </div>

            <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
              <h3 className="font-bold text-lg text-green-400 mb-4">✅ Safe Creative Cannabis Activities</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>• Art appreciation at galleries</div>
                <div>• Creative writing or journaling</div>
                <div>• Mineral spring soaking</div>
                <div>• Photography walks</div>
                <div>• Music appreciation</div>
                <div>• Painting or drawing sessions</div>
                <div>• Meditation and reflection</div>
                <div>• Hiking nature trails</div>
              </div>
            </Card>

            <Card className="p-6 bg-red-500/5 border-red-500/20">
              <h3 className="font-bold text-lg text-red-400 mb-4">⚠️ Cannabis Restrictions</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>• No consumption on public streets</div>
                <div>• No consumption in parks</div>
                <div>• No driving after using</div>
                <div>• No consumption at galleries</div>
                <div>• No consumption at events</div>
                <div>• No consumption at mineral springs (public)</div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Getting Around Manitou Springs
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                { name: "Walking", icon: MapPinned, desc: "Downtown is very walkable. Most shops and galleries within walking distance.", tip: "Safe and scenic way to explore artistic community." },
                { name: "Rideshare", icon: Car, desc: "Uber/Lyft available. Use after cannabis consumption.", tip: "Never drive impaired. Rideshare is safest option." },
                { name: "Bike", icon: Bike, desc: "Scenic bike paths through town and mountain trails.", tip: "Only bike when fully sober." },
                { name: "Local Shuttle", icon: Bus, desc: "Free shuttle connects to nearby Colorado Springs.", tip: "Great transportation option." }
              ].map((opt) => (
                <Card key={opt.name} className="bg-card/50 border-border/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <opt.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold">{opt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{opt.desc}</p>
                  <p className="text-xs text-accent bg-accent/10 p-2 rounded">💡 {opt.tip}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Bohemian Neighborhoods
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Downtown Manitou", desc: "Heart of artistic community with galleries and restaurants." },
                { name: "Manitou Historic", desc: "Charming Victorian-era streets and artistic residences." },
                { name: "Mountain Neighborhoods", desc: "Scenic areas with stunning Pikes Peak views." },
                { name: "Gallery District", desc: "Concentrated gallery locations perfect for art lovers." },
                { name: "Bohemian Enclaves", desc: "Quirky artistic neighborhoods with creative energy." },
                { name: "Nature Adjacent", desc: "Areas with easy trail access and mountain vibes." }
              ].map((h) => (
                <Card key={h.name} className="p-4 bg-card/50 border-border/30 hover:border-accent/50 transition-colors">
                  <h4 className="font-semibold text-accent mb-2">{h.name}</h4>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="dispensaries" className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Manitou Springs Dispensaries
              </span>
            </h2>

            {loading ? (
              <div className="text-center py-12">Loading dispensaries...</div>
            ) : dispensaries.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {dispensaries.map((d) => (
                  <Card key={d.id} className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all">
                    {d.image && <img src={d.image} alt={d.name} className="w-full h-48 object-cover" />}
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{d.name}</h3>
                      {d.rating && <div className="flex gap-1 mb-3">{renderRating(d.rating)}</div>}
                      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {d.address}
                      </p>
                      <div className="flex gap-2">
                        {d.is_recreational && <Badge className="bg-accent/20 text-accent">Recreational</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">Dispensaries in Manitou Springs - check local guides!</p>
              </Card>
            )}
          </div>
        </section>

        <section id="rentals" className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                420-Friendly Artist Lodging
              </span>
            </h2>

            {rentals.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((r) => (
                  <Card key={r.id} className="bg-card/50 border-border/30 overflow-hidden hover:border-accent/50 transition-all">
                    {r.images?.[0] && <img src={r.images[0]} alt={r.name} className="w-full h-48 object-cover" />}
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{r.name}</h3>
                      {r.rating && <div className="flex gap-1 mb-3">{renderRating(r.rating)}</div>}
                      <p className="text-sm text-muted-foreground mb-4">{r.address}</p>
                      {r.website && (
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <a href={r.website} target="_blank">Visit <ExternalLink className="w-3 h-3 ml-1" /></a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-card/50 border-border/30">
                <p className="text-muted-foreground">420-friendly lodges available!</p>
              </Card>
            )}
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="bg-gradient-to-br from-accent/10 via-background to-accent/5 border-accent/20 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Get the Creative Cannabis Guide
                  </span>
                </h2>
                <p className="text-muted-foreground">Artistic tips + cannabis-friendly creative experiences in Manitou Springs</p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90">
                  {submitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Nearby Colorado Cannabis Guides
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Denver", slug: "/denver", desc: "Cannabis epicenter - 1 hour away", distance: "1 hour" },
                { name: "Colorado Springs", slug: "/colorado-springs", desc: "Gateway to the mountains", distance: "30 min" },
                { name: "Boulder", slug: "/boulder", desc: "College town cannabis culture", distance: "2 hours" }
              ].map((g) => (
                <Link key={g.name} to={g.slug}>
                  <Card className="bg-card/50 border-border/30 p-6 hover:border-accent/50 transition-all h-full">
                    <h3 className="font-bold text-lg text-accent mb-2">{g.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
                    <ArrowRight className="w-4 h-4 text-accent" />
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

export default ManitouSpringsGuide;
