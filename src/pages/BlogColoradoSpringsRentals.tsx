import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, Bed, Home, DollarSign, Wifi, Car,
  ArrowRight, ExternalLink, AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Rental {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  rating: number | null;
  images: string[] | null;
  website: string | null;
  policies: string | null;
  amenities: any;
}

const BlogColoradoSpringsRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Colorado Springs%')
        .order('rating', { ascending: false });
      
      console.log('Colorado Springs rentals fetch:', { data, error });
      if (error) console.error('Colorado Springs rentals error:', error);
      if (data) setRentals(data);
      setLoading(false);
    };
    fetchRentals();
  }, []);

  const accommodationTypes = [
    {
      type: "Vacation Rentals",
      description: "Private homes and apartments where cannabis consumption is explicitly allowed. These are the most common 420-friendly options.",
      priceRange: "$100-350/night",
      best: "Privacy, kitchens, designated smoking areas"
    },
    {
      type: "420-Friendly Hotels",
      description: "A small number of hotels offer designated rooms or balconies for cannabis consumption, but policies vary greatly.",
      priceRange: "$80-200/night",
      best: "Convenience, central location, hotel amenities"
    },
    {
      type: "Bud & Breakfast",
      description: "Specialty B&Bs that cater to cannabis tourists, often including complimentary products and a social atmosphere.",
      priceRange: "$120-300/night",
      best: "Personalized service, community, all-inclusive options"
    },
  ];

  const bookingTips = [
    {
      title: "Verify Policies",
      content: "Always confirm the specific cannabis policy with the property manager. Due to the city's conservative nature, policies can be stricter than in Denver."
    },
    {
      title: "Look for Outdoor Spaces",
      content: "Many rentals only allow consumption on private outdoor spaces (balconies, patios). Ensure your rental has one if you plan to smoke."
    },
    {
      title: "Know Before You Go",
      content: "Both recreational and medical cannabis are available in the city. However, always check if a specific dispensary serves recreational customers before visiting."
    },
    {
      title: "Check Location",
      content: "Colorado Springs is spread out. Choose a location close to the attractions you plan to visit, such as Old Colorado City or Manitou Springs."
    },
    {
      title: "Respect the Rules",
      content: "Be extra discreet and respectful of the property rules. The city has a strong military presence and conservative culture."
    },
    {
      title: "Ask About Vaping",
      content: "If smoking is prohibited, ask if vaping is allowed indoors. Edibles are always the most discreet option."
    },
  ];

  const faqs = [
    { q: "Can I smoke cannabis in my hotel room?", a: "Generally no. Most hotels prohibit smoking of any kind. Look for properties that specifically allow it on balconies or patios." },
    { q: "Where can I buy recreational cannabis in Colorado Springs?", a: "Recreational dispensaries are now open within Colorado Springs. Check our dispensary guide for the latest listings." },
    { q: "Is it safe to consume cannabis in Colorado Springs?", a: "Yes, as long as you are 21+ and consume in a private, 420-friendly location. Public consumption is illegal." },
    { q: "Are there many 420-friendly rentals?", a: "The selection is smaller than in Denver, but there are verified vacation rentals and B&Bs that cater to cannabis travelers." },
  ];

  const neighborhoods = [
    {
      name: "Old Colorado City",
      description: "Historic district with unique shops, restaurants, and a charming atmosphere. Now with local recreational dispensaries nearby.",
      rentals: "B&Bs, historic vacation homes",
      vibe: "Historic, charming, convenient"
    },
    {
      name: "Downtown",
      description: "Central location with access to museums and parks. Offers a mix of hotels and apartments.",
      rentals: "Hotels, modern apartments",
      vibe: "Urban, central, modern"
    },
    {
      name: "Manitou Springs Area",
      description: "Just west of Colorado Springs, this area is known for its natural springs and has a high concentration of recreational dispensaries.",
      rentals: "Cabins, vacation homes",
      vibe: "Nature, relaxed, recreational access"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best 420-Friendly Rentals in Colorado Springs: Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Colorado Springs' top 420-friendly hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your trip." />
        <meta name="keywords" content="420-friendly hotels Colorado Springs, cannabis hotels Colorado Springs, weed friendly rentals Colorado Springs, Colorado Springs 420 accommodations" />
        <link rel="canonical" href="https://budquest.com/blog/best-420-rentals-colorado-springs" />
        <meta property="og:title" content="Best 420-Friendly Rentals in Colorado Springs: Guide 2025" />
        <meta property="og:description" content="Find verified cannabis-friendly accommodations in Colorado Springs, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best 420-Friendly Rentals in Colorado Springs: Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-08"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Image */}
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img 
            src="/blog-colorado-springs-rentals.jpg" 
            alt="420-friendly vacation rental in Colorado Springs with Garden of the Gods view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </section>

        {/* Hero Content */}
        <section className="relative py-8 overflow-hidden -mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/blog" className="hover:text-accent">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent">Colorado Springs 420 Rentals</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Accommodation</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 8, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 12 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best 420-Friendly Rentals in Colorado Springs:
                </span>
                <br />
                <span className="text-foreground/90">Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Find verified cannabis-friendly accommodation for your trip to the Pikes Peak region.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">BudQuest</p>
                  <p className="text-xs text-muted-foreground">Cannabis Travel Experts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl prose prose-invert">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Colorado Springs is a beautiful city known for its natural landmarks like Pikes Peak and Garden of the Gods. With both recreational and medical cannabis now available, Colorado Springs offers a growing number of 420-friendly accommodation options for travelers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide focuses on finding private vacation rentals and B&Bs that explicitly allow cannabis consumption, helping you find the perfect place to relax and enjoy your purchases legally. We'll help you navigate the best places to stay and provide essential booking tips.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Remember to book a verified 420-friendly property to avoid issues, as most traditional hotels strictly prohibit cannabis use and enforce hefty cleaning fees.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Rentals from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top 420-Friendly Stays in Colorado Springs</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : rentals.length > 0 ? (
                <div className="space-y-6">
                  {rentals.map((rental, index) => (
                    <motion.div
                      key={rental.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-card/60 border-accent/20 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-video md:aspect-auto">
                            <img
                              src={rental.images?.[0] || '/dest-colorado-springs.jpg'}
                              alt={rental.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-lg font-bold text-accent">#{index + 1}</span>
                                  <Link to={`/hotels/${rental.slug}`} className="hover:text-accent transition-colors">
                                    <h3 className="text-xl font-bold text-foreground hover:text-accent">{rental.name}</h3>
                                  </Link>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {rental.address?.split(',')[0]}
                                </p>
                              </div>
                              {rental.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-gold text-gold" />
                                  <span className="text-foreground font-semibold">{rental.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            {rental.policies && (
                              <p className="text-muted-foreground mb-4 line-clamp-2">{rental.policies}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> 420-Friendly
                              </span>
                              {rental.amenities?.smoking && (
                                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Smoking OK</span>
                              )}
                              {rental.amenities?.wifi && (
                                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs flex items-center gap-1">
                                  <Wifi className="h-3 w-3" /> Free WiFi
                                </span>
                              )}
                              {rental.amenities?.parking && (
                                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs flex items-center gap-1">
                                  <Car className="h-3 w-3" /> Parking
                                </span>
                              )}
                            </div>

                            <div className="flex justify-end">
                              <Link to={`/hotels/${rental.slug}`}>
                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg text-sm">
                                  View Details <ArrowRight className="h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-card/40 rounded-lg border border-accent/20">
                  <p className="text-muted-foreground mb-2">No 420-friendly rentals found in Colorado Springs yet.</p>
                  <p className="text-sm text-muted-foreground">Check back soon as we add more verified properties!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Accommodation Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Types of 420-Friendly Stays in Colorado Springs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accommodationTypes.map((type, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <Home className="h-5 w-5 text-accent" /> {type.type}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-accent">
                        <DollarSign className="h-4 w-4" /> Price Range: {type.priceRange}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-4 w-4" /> Best For: {type.best}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Essential Colorado Springs 420 Booking Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingTips.map((tip, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <Bed className="h-5 w-5 text-accent" /> {tip.title}
                    </h3>
                    <p className="text-muted-foreground">{tip.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Colorado Springs 420 Rentals FAQ</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">Q: {faq.q}</h3>
                    <p className="text-muted-foreground">A: {faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Colorado Springs Neighborhoods for 420 Stays</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {neighborhoods.map((hood, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" /> {hood.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{hood.description}</p>
                    <ul className="text-sm space-y-1">
                      <li className="text-muted-foreground">**Typical Rentals:** {hood.rentals}</li>
                      <li className="text-muted-foreground">**Vibe:** {hood.vibe}</li>
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Colorado Springs Cannabis Laws & Etiquette</h2>
              <Card className="bg-card/60 border-red-500/20 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-red-500 mb-2">Important Legal Notice: Recreational & Medical</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>**Sales Type:** Both **Recreational (21+)** and **Medical** cannabis are sold in Colorado Springs.</li>
                      <li>**Public Consumption:** Public consumption is strictly illegal.</li>
                      <li>**Possession Limits:** Non-residents can possess up to 1 ounce of flower.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Plan Your Colorado Springs Cannabis Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive Colorado Springs travel guide with dispensary recommendations, attractions, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/colorado-springs" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                  >
                    Colorado Springs Travel Guide <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/blog/cannabis-dispensaries-colorado-springs" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                  >
                    Dispensaries Guide <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/blog/best-420-rentals-denver" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Denver 420 Rentals</h4>
                    <p className="text-sm text-muted-foreground mt-1">Cannabis-friendly hotels in the Mile High City</p>
                  </Card>
                </Link>
                <Link to="/usa/colorado" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Cannabis Hub</h4>
                    <p className="text-sm text-muted-foreground mt-1">Explore all of Colorado's cannabis scene</p>
                  </Card>
                </Link>
                <Link to="/colorado-springs" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Springs Travel Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">Attractions and travel tips</p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogColoradoSpringsRentals;
