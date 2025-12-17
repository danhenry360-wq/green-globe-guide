import { Helmet } from "react-helmet";
// Updated: December 8, 2025 - Force deployment refresh
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin, Star, Clock, Calendar, User, ChevronRight,
  CheckCircle2, Bed, Home, DollarSign, Wifi, Car,
  ArrowRight, ExternalLink
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

const BlogDenverRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Denver%')
        .order('rating', { ascending: false });

      console.log('Denver rentals fetch:', { data, error });
      if (error) console.error('Denver rentals error:', error);
      if (data) setRentals(data);
      setLoading(false);
    };
    fetchRentals();
  }, []);

  const accommodationTypes = [
    {
      type: "Vacation Rentals",
      description: "Private homes and apartments where cannabis consumption is explicitly allowed. Perfect for groups or extended stays.",
      priceRange: "$100-400/night",
      best: "Privacy, kitchens, smoking areas"
    },
    {
      type: "420 Hotels",
      description: "Hotels that welcome cannabis consumption in designated areas. Some offer consumption lounges and smoking patios.",
      priceRange: "$80-250/night",
      best: "Convenience, amenities, central location"
    },
    {
      type: "Bud & Breakfast",
      description: "Specialty B&Bs catering to cannabis tourists. Often include complimentary products, tours, and consumption spaces.",
      priceRange: "$150-350/night",
      best: "Full experience, community, education"
    },
    {
      type: "Cannabis Resorts",
      description: "All-inclusive properties with cannabis programming, spa services, and curated experiences.",
      priceRange: "$250-600/night",
      best: "Luxury, wellness, immersive experience"
    },
  ];

  const bookingTips = [
    {
      title: "Verify 420-Friendly Status",
      content: "Always confirm cannabis policies directly with the property. Terms like 'smoke-friendly' may only mean tobacco."
    },
    {
      title: "Check Consumption Areas",
      content: "Ask about designated smoking areas - balconies, patios, or consumption lounges. Indoor smoking policies vary."
    },
    {
      title: "Read Reviews Carefully",
      content: "Look for reviews from cannabis travelers mentioning their experience with the property's policies."
    },
    {
      title: "Book Direct When Possible",
      content: "Booking directly with 420-friendly properties often provides better cancellation policies and accurate policy info."
    },
    {
      title: "Consider Location",
      content: "Choose stays near dispensaries and attractions you want to visit. Denver is spread out."
    },
    {
      title: "Ask About Extras",
      content: "Some properties offer complimentary products, welcome joints, or dispensary discounts for guests."
    },
    {
      title: "Know the Rules",
      content: "Even at 420-friendly properties, be respectful of neighbors and follow property-specific guidelines."
    },
    {
      title: "Plan for Consumption Method",
      content: "Vaping and edibles are more discreet. If you prefer smoking, ensure outdoor space is available."
    },
  ];

  const faqs = [
    { q: "Can I smoke cannabis in Denver hotels?", a: "Most traditional hotels prohibit cannabis. Book verified 420-friendly properties or use edibles/vapes discreetly." },
    { q: "Are Airbnbs cannabis-friendly in Denver?", a: "It depends on the host. Always message hosts first to confirm their cannabis policy before booking." },
    { q: "What's the best area to stay for cannabis tourism?", a: "RiNo (River North) and Capitol Hill offer the best combination of dispensary access and nightlife." },
    { q: "Can I consume cannabis in my hotel room?", a: "Only at 420-friendly properties. Standard hotels will charge cleaning fees or may evict guests." },
    { q: "Do 420-friendly rentals cost more?", a: "Prices are comparable to standard rentals. Specialty 'Bud & Breakfast' options may charge premium rates for included experiences." },
    { q: "Are there cannabis consumption lounges?", a: "Yes, Denver has licensed social consumption spaces. Some 420-friendly properties also have on-site consumption areas." },
    { q: "What should I bring?", a: "Bring your own smoking accessories. While many properties allow consumption, few provide paraphernalia." },
    { q: "How do I avoid cleaning fees?", a: "Use designated areas, open windows, and consider vaporizers or edibles. Be upfront with hosts about your plans." },
  ];

  const neighborhoods = [
    {
      name: "RiNo (River North)",
      description: "Denver's art district with trendy dispensaries, breweries, and street art. Walking distance to many attractions.",
      dispensaries: "Multiple within walking distance",
      vibe: "Creative, young, vibrant nightlife"
    },
    {
      name: "Capitol Hill",
      description: "Eclectic neighborhood with diverse dining, bars, and excellent dispensary selection. Great for nightlife.",
      dispensaries: "High concentration",
      vibe: "Diverse, lively, walkable"
    },
    {
      name: "LoDo (Lower Downtown)",
      description: "Historic district near Union Station with upscale dining and sports venues. Central and convenient.",
      dispensaries: "Several nearby",
      vibe: "Upscale, touristy, convenient"
    },
    {
      name: "Highland/LoHi",
      description: "Trendy neighborhood with great restaurants and views. Quieter than downtown but still accessible.",
      dispensaries: "Moderate selection",
      vibe: "Trendy, residential, scenic"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best 420-Friendly Rentals in Denver: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Denver's top 420-friendly hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your Colorado adventure." />
        <meta name="keywords" content="420-friendly hotels Denver, cannabis hotels Denver, weed friendly rentals Denver, Denver 420 accommodations, bud and breakfast Denver" />
        <link rel="canonical" href="https://budquest.guide/blog/best-420-rentals-denver" />
        <meta property="og:title" content="Best 420-Friendly Rentals in Denver: Complete Guide 2025" />
        <meta property="og:description" content="Find verified cannabis-friendly accommodations in Denver, Colorado." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best 420-Friendly Rentals in Denver: Complete Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-04"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Image */}
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src="/blog-denver-rentals.jpg"
            alt="420-friendly vacation rental interior in Denver, Colorado"
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
              <span className="text-accent">Denver 420 Rentals</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Accommodation</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 4, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 12 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best 420-Friendly Rentals in Denver:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Find the perfect cannabis-friendly accommodation for your Denver adventure
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
                Denver isn't just America's cannabis capital—it's also home to some of the best 420-friendly accommodations in the world. Since legalization, a thriving ecosystem of cannabis-welcoming hotels, vacation rentals, and specialty stays has emerged to serve the millions of cannabis tourists visiting Colorado each year.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This guide covers everything you need to know about finding and booking the perfect 420-friendly accommodation in Denver. From verified cannabis-welcoming hotels to private vacation rentals and specialty Bud & Breakfast options, we'll help you find a place where you can enjoy Colorado's legal cannabis in comfort.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike traditional accommodations that prohibit cannabis (and charge hefty cleaning fees if you're caught), these properties explicitly welcome cannabis consumption. No sneaking around, no anxiety, no fees—just a relaxed environment where you can enjoy your Colorado cannabis experience.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Rentals from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top 420-Friendly Stays in Denver</h2>

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
                              src={rental.images?.[0] || '/dest-colorado.jpg'}
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
                              {rental.amenities?.vaping && (
                                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Vaping OK</span>
                              )}
                              {rental.amenities?.edibles && (
                                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">Edibles Welcome</span>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <Link
                                to={`/hotels/${rental.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
                              >
                                View Details
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                              {rental.website && (
                                <a
                                  href={rental.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors text-sm"
                                >
                                  Book Now
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-card/40 rounded-lg border border-accent/20">
                  <p className="text-muted-foreground mb-2">No 420-friendly rentals found in Denver yet.</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Types of 420-Friendly Accommodation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accommodationTypes.map((type) => (
                  <Card key={type.type} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{type.type}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price Range</span>
                        <span className="text-gold font-semibold">{type.priceRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Best For</span>
                        <span className="text-accent">{type.best}</span>
                      </div>
                    </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Neighborhoods for 420 Stays</h2>
              <div className="space-y-4">
                {neighborhoods.map((hood) => (
                  <Card key={hood.name} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{hood.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{hood.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-muted-foreground">Dispensaries: <span className="text-accent">{hood.dispensaries}</span></span>
                      <span className="text-muted-foreground">Vibe: <span className="text-accent">{hood.vibe}</span></span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Booking Tips for 420 Travelers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookingTips.map((tip, index) => (
                  <Card key={tip.title} className="bg-card/60 border-accent/20 p-4">
                    <div className="flex gap-3">
                      <span className="text-accent font-bold">{index + 1}.</span>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.content}</p>
                      </div>
                    </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.q} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8 max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Plan Your Denver Trip?</h2>
              <p className="text-muted-foreground mb-6">Explore our complete Denver cannabis travel guide for dispensaries, attractions, and more.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/denver" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg">
                  Denver Travel Guide <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/hotels" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg">
                  View All Rentals <Bed className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/denver" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/40 transition-colors">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Denver Cannabis Travel Guide</h4>
                    <p className="text-sm text-muted-foreground">Complete guide to the Mile High City</p>
                  </Card>
                </Link>
                <Link to="/blog/cannabis-dispensaries-denver" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/40 transition-colors">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Top Denver Dispensaries</h4>
                    <p className="text-sm text-muted-foreground">Best places to buy cannabis</p>
                  </Card>
                </Link>
                <Link to="/colorado" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/40 transition-colors">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Cannabis Hub</h4>
                    <p className="text-sm text-muted-foreground">Explore all of Colorado</p>
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

export default BlogDenverRentals;
