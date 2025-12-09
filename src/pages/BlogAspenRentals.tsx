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

const BlogAspenRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Aspen%')
        .order('rating', { ascending: false });
      
      console.log('Aspen rentals fetch:', { data, error });
      if (error) console.error('Aspen rentals error:', error);
      if (data) setRentals(data);
      setLoading(false);
    };
    fetchRentals();
  }, []);

  const accommodationTypes = [
    {
      type: "Luxury Vacation Rentals",
      description: "High-end private homes and condos, often with dedicated smoking patios or consumption areas. The most common 420-friendly option in Aspen.",
      priceRange: "$500-2000+/night",
      best: "Privacy, luxury amenities, mountain views"
    },
    {
      type: "Boutique 420 Hotels",
      description: "A few select boutique hotels offer cannabis-friendly rooms or designated consumption lounges, catering to the upscale traveler.",
      priceRange: "$300-800/night",
      best: "Concierge service, central location, convenience"
    },
    {
      type: "Bud & Breakfast (Private)",
      description: "Exclusive, private B&Bs that offer a personalized, all-inclusive cannabis experience, often including meals and activities.",
      priceRange: "$400-1000/night",
      best: "Personalized service, curated experience, high-end dining"
    },
  ];

  const bookingTips = [
    {
      title: "Book Well in Advance",
      content: "Aspen has limited 420-friendly inventory, especially during ski season. Book your stay months ahead to secure the best properties."
    },
    {
      title: "Confirm Policies Directly",
      content: "Always call or message the property manager to confirm their current cannabis consumption policy, as rules can change quickly in a luxury market."
    },
    {
      title: "Expect Premium Pricing",
      content: "Accommodation in Aspen is expensive. 420-friendly options often carry a premium, but the experience is worth the investment."
    },
    {
      title: "Discreet Consumption is Key",
      content: "Even in 420-friendly places, be respectful of neighbors and property rules. Vaping or edibles are often preferred indoors."
    },
    {
      title: "Check Ski-In/Ski-Out Access",
      content: "If you're skiing, look for rentals with easy access to the slopes, but remember consumption is illegal on federal land (the slopes)."
    },
    {
      title: "Ask About Amenities",
      content: "Look for amenities like private hot tubs, fireplaces, and dedicated smoking areas (balconies or patios)."
    },
  ];

  const faqs = [
    { q: "Can I smoke cannabis on the ski slopes?", a: "No. Ski resorts operate on federal land where cannabis is illegal. Consumption is strictly prohibited and can result in losing your pass." },
    { q: "Are there many 420-friendly hotels in Aspen?", a: "The selection is smaller than in Denver, but the available options are typically high-end and cater to a luxury clientele." },
    { q: "What is the best way to consume cannabis in Aspen?", a: "Vaping and edibles are the most discreet methods. If you prefer smoking, ensure your rental has a private outdoor space." },
    { q: "Do I need to bring my own cannabis?", a: "No. Aspen has several high-quality dispensaries where you can purchase legal recreational cannabis." },
  ];

  const neighborhoods = [
    {
      name: "Downtown Aspen",
      description: "Central location with easy access to high-end shops, restaurants, and the gondola. Most convenient for a luxury experience.",
      rentals: "Boutique hotels, luxury condos",
      vibe: "Upscale, central, high-energy"
    },
    {
      name: "West End",
      description: "Quieter, historic residential area. Offers more private, spacious vacation rentals away from the main bustle.",
      rentals: "Historic homes, private residences",
      vibe: "Residential, quiet, charming"
    },
    {
      name: "Snowmass Village",
      description: "A family-friendly alternative to Aspen, offering ski-in/ski-out access and larger condo rentals. A short drive from Aspen proper.",
      rentals: "Condos, resort properties",
      vibe: "Resort, family-friendly, convenient"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best 420-Friendly Rentals in Aspen: Luxury Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Aspen's top 420-friendly luxury hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your Colorado mountain getaway." />
        <meta name="keywords" content="420-friendly hotels Aspen, cannabis hotels Aspen, weed friendly rentals Aspen, Aspen 420 accommodations, luxury cannabis travel" />
        <link rel="canonical" href="https://budquest.com/blog/best-420-rentals-aspen" />
        <meta property="og:title" content="Best 420-Friendly Rentals in Aspen: Luxury Guide 2025" />
        <meta property="og:description" content="Find verified cannabis-friendly accommodations in Aspen, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best 420-Friendly Rentals in Aspen: Luxury Guide 2025",
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
            src="/blog-aspen-rentals.jpg" 
            alt="Luxury 420-friendly ski chalet in Aspen, Colorado" 
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
              <span className="text-accent">Aspen 420 Rentals</span>
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
                  Best 420-Friendly Rentals in Aspen:
                </span>
                <br />
                <span className="text-foreground/90">Luxury Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Find the perfect cannabis-friendly luxury accommodation for your Aspen mountain adventure.
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
                Aspen's reputation for luxury extends to its 420-friendly accommodation scene. While the inventory is smaller than in Denver, the available options are typically high-end, private, and offer an unparalleled experience for the discerning cannabis traveler.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide covers everything you need to know about finding and booking the perfect 420-friendly accommodation in Aspen. We focus on verified luxury vacation rentals and boutique hotels that explicitly welcome cannabis consumption, ensuring a relaxed and worry-free stay.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Booking a verified 420-friendly property is essential in Aspen, as most traditional hotels strictly prohibit cannabis use and enforce hefty cleaning fees. Enjoy the mountain air and your cannabis experience without the stress.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Rentals from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top 420-Friendly Stays in Aspen</h2>
              
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
                              src={rental.images?.[0] || '/dest-aspen.jpg'}
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
                  <p className="text-muted-foreground mb-2">No 420-friendly rentals found in Aspen yet.</p>
                  <p className="text-sm text-muted-foreground">Check back soon as we add more verified luxury properties!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Accommodation Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Types of 420-Friendly Stays in Aspen</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Essential Aspen 420 Booking Tips</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Aspen 420 Rentals FAQ</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Aspen Neighborhoods for 420 Stays</h2>
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Aspen Cannabis Laws & Etiquette</h2>
              <Card className="bg-card/60 border-red-500/20 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-red-500 mb-2">Important Legal Notice</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>**Age Limit:** You must be 21 or older to purchase or consume recreational cannabis.</li>
                      <li>**Public Consumption:** Public consumption (smoking, vaping, or eating edibles) is strictly illegal in Aspen and all of Colorado. This includes ski slopes, parks, and sidewalks.</li>
                      <li>**Federal Land:** All national parks, national forests, and ski slopes (which operate on federal land) are federal jurisdiction, where cannabis is illegal.</li>
                      <li>**Possession Limits:** Non-residents can purchase up to 1 ounce of flower, 8 grams of concentrate, or 800mg of edibles per transaction.</li>
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
                <h3 className="text-xl font-bold text-foreground mb-4">Plan Your Complete Aspen Cannabis Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive Aspen cannabis travel guide with dispensary recommendations, attractions, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/aspen" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                  >
                    Aspen Travel Guide <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/blog/cannabis-dispensaries-aspen" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                  >
                    Aspen Dispensaries Guide <ExternalLink className="h-4 w-4" />
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
                <Link to="/aspen" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Aspen Travel Guide</h4>
                    <p className="text-sm text-muted-foreground mt-1">Complete guide to the luxury mountain town</p>
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

export default BlogAspenRentals;
