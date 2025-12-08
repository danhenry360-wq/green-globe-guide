import { Helmet } from "react-helmet";
// Updated: December 8, 2025 - Force deployment refresh
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, Bed, Home, DollarSign, Wifi, Car, Mountain,
  ArrowRight, ExternalLink, TreePine, Utensils, Coffee
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
  is_verified: boolean | null;
}

const BlogBoulderRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_420_friendly', true)
        .ilike('address', '%Boulder%')
        .order('rating', { ascending: false });
      
      console.log('Boulder rentals fetch:', { data, error });
      if (error) console.error('Boulder rentals error:', error);
      if (data) setRentals(data);
      setLoading(false);
    };
    fetchRentals();
  }, []);

  const accommodationTypes = [
    {
      type: "Mountain Lodges",
      description: "Rustic yet luxurious lodges with stunning Flatirons views. Many feature hot tubs, fire pits, and outdoor smoking areas perfect for enjoying Colorado's cannabis.",
      priceRange: "$150-400/night",
      best: "Views, hot tubs, outdoor areas"
    },
    {
      type: "Downtown Boutique Hotels",
      description: "Walking distance to Pearl Street Mall with modern amenities and balcony rooms. Some offer rooftop patios with mountain views.",
      priceRange: "$120-300/night",
      best: "Location, walkability, nightlife access"
    },
    {
      type: "Vacation Rentals",
      description: "Private homes and condos throughout Boulder. Many in residential neighborhoods with yards and patios for outdoor consumption.",
      priceRange: "$100-350/night",
      best: "Privacy, full kitchens, space"
    },
    {
      type: "Eco-Lodges",
      description: "Sustainably-built accommodations matching Boulder's environmental ethos. Often feature organic amenities and natural surroundings.",
      priceRange: "$130-280/night",
      best: "Sustainability, nature access"
    },
  ];

  const bookingTips = [
    {
      title: "Book Near Trailheads",
      content: "Boulder is all about outdoor recreation. Choose a property near Chautauqua or Flatirons for easy hiking access."
    },
    {
      title: "Look for Outdoor Spaces",
      content: "Boulder properties often have patios, decks, or yards. Essential for cannabis consumption since indoor smoking is often restricted."
    },
    {
      title: "Check Mountain View Options",
      content: "Many Boulder properties offer stunning Flatirons views. Worth the extra cost for a memorable experience."
    },
    {
      title: "Consider The Hill Area",
      content: "Near CU Boulder, this area offers budget-friendly options and is walking distance to Pearl Street."
    },
    {
      title: "Verify Pet Policies",
      content: "Boulder is dog-friendly. Many 420-friendly rentals also welcome pets for hiking adventures."
    },
    {
      title: "Plan for Altitude",
      content: "Boulder sits at 5,430 feet. Take it easy your first day and stay hydrated. Cannabis effects may be stronger at altitude."
    },
    {
      title: "Ask About Supplies",
      content: "Some properties provide outdoor ashtrays, lighters, and even welcome gifts. Ask hosts about amenities."
    },
    {
      title: "Book Early for Events",
      content: "CU football weekends and Boulder events book up fast. Reserve 420-friendly properties early."
    },
  ];

  const faqs = [
    { 
      q: "Can I smoke cannabis in Boulder hotels?", 
      a: "Most traditional Boulder hotels prohibit cannabis. Our verified 420-friendly properties explicitly welcome consumption in designated areas—usually outdoor patios or balconies." 
    },
    { 
      q: "Are there cannabis-friendly Airbnbs in Boulder?", 
      a: "Yes, many Boulder hosts welcome cannabis guests. Always message hosts first to confirm their specific policies before booking." 
    },
    { 
      q: "What's the best area to stay in Boulder for cannabis tourists?", 
      a: "The Hill offers budget-friendly options near dispensaries. North Boulder provides hiking access. Downtown/Pearl Street is best for walkability to shops and restaurants." 
    },
    { 
      q: "Can I consume cannabis on my rental's patio?", 
      a: "At verified 420-friendly properties, yes. Always check specific house rules as some limit consumption to certain areas or times." 
    },
    { 
      q: "Do Boulder rentals provide smoking accessories?", 
      a: "Some do! Our featured properties often include outdoor ashtrays and may offer welcome joints or dispensary discounts." 
    },
    { 
      q: "How far is Boulder from Denver airport?", 
      a: "About 45 minutes to 1 hour depending on traffic. Several shuttle services operate between DIA and Boulder." 
    },
    { 
      q: "Can I bring cannabis from Denver to Boulder?", 
      a: "Yes, it's legal to transport personal amounts (up to 1 oz) between Colorado cities. Keep it in a sealed container." 
    },
    { 
      q: "Are there consumption lounges in Boulder?", 
      a: "Yes, Boulder has licensed social consumption establishments. Some 420-friendly properties also offer dedicated consumption spaces." 
    },
  ];

  const neighborhoods = [
    {
      name: "Downtown / Pearl Street",
      description: "Heart of Boulder with restaurants, shops, and street performers. Walking distance to everything. Premium prices but unbeatable location.",
      dispensaries: "Several within walking distance",
      vibe: "Upscale, touristy, vibrant"
    },
    {
      name: "The Hill (University Hill)",
      description: "Student neighborhood near CU Boulder. Budget-friendly with casual restaurants and bars. Great for younger travelers.",
      dispensaries: "Multiple nearby",
      vibe: "Young, energetic, affordable"
    },
    {
      name: "North Boulder",
      description: "Closest to hiking trails and the Flatirons. Quieter, more residential. Perfect for outdoor enthusiasts.",
      dispensaries: "Short drive required",
      vibe: "Athletic, nature-focused, peaceful"
    },
    {
      name: "East Boulder / Gunbarrel",
      description: "More affordable area with larger properties. Near Boulder Reservoir for paddleboarding and swimming.",
      dispensaries: "Several options nearby",
      vibe: "Suburban, spacious, family-friendly"
    },
  ];

  const thingsToDo = [
    {
      activity: "Hike the Flatirons",
      description: "Iconic slanted rock formations with trails for all skill levels. The Royal Arch trail offers stunning views.",
      tip: "Go early morning for best lighting and fewer crowds. Enjoy your cannabis at scenic overlooks."
    },
    {
      activity: "Pearl Street Mall",
      description: "Boulder's famous pedestrian mall with shops, restaurants, and street performers. Four blocks of car-free strolling.",
      tip: "Visit during evening for the best dining atmosphere. Great for post-dispensary exploration."
    },
    {
      activity: "Chautauqua Park",
      description: "Historic park at the base of the Flatirons with meadows, trails, and picnic areas.",
      tip: "Perfect sunset spot. Pack edibles and snacks for a peaceful evening session."
    },
    {
      activity: "Boulder Creek Path",
      description: "6-mile paved path following Boulder Creek through town. Great for walking, biking, or relaxing.",
      tip: "Rent a cruiser bike and ride to Eben G. Fine Park for creekside relaxation."
    },
    {
      activity: "Eldorado Canyon",
      description: "World-class rock climbing and hiking just south of Boulder. Spectacular canyon views.",
      tip: "Enjoy cannabis responsibly before easier hikes. Save the climbing for sober days."
    },
    {
      activity: "Craft Breweries",
      description: "Boulder has 20+ craft breweries. Many offer patios and outdoor seating.",
      tip: "Combine brewery visits with nearby dispensary stops for a full Boulder experience."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best 420-Friendly Rentals in Boulder: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Boulder's top 420-friendly hotels, vacation rentals, and mountain lodges. Book verified cannabis-welcoming accommodations near the Flatirons." />
        <meta name="keywords" content="420-friendly hotels Boulder, cannabis hotels Boulder, weed friendly rentals Boulder, Boulder 420 accommodations, Flatirons lodging" />
        <link rel="canonical" href="https://budquest.guide/blog/best-420-rentals-boulder" />
        <meta property="og:title" content="Best 420-Friendly Rentals in Boulder: Complete Guide 2025" />
        <meta property="og:description" content="Find verified cannabis-friendly accommodations in Boulder, Colorado near the Flatirons." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best 420-Friendly Rentals in Boulder: Complete Guide 2025",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-04"
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/blog" className="hover:text-accent">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent">Boulder 420 Rentals</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
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
                  Best 420-Friendly Rentals in Boulder:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Find the perfect cannabis-friendly mountain retreat near the iconic Flatirons
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

        {/* Quick Facts */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <Mountain className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Elevation</p>
                  <p className="text-sm font-semibold text-foreground">5,430 ft</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <TreePine className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">From Denver</p>
                  <p className="text-sm font-semibold text-foreground">45 min</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <Home className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">420 Stays</p>
                  <p className="text-sm font-semibold text-green-400">Verified</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <DollarSign className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Avg Price</p>
                  <p className="text-sm font-semibold text-foreground">$150-300</p>
                </div>
                <div className="bg-card/60 border border-accent/20 rounded-lg p-4 text-center">
                  <Coffee className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Vibe</p>
                  <p className="text-sm font-semibold text-foreground">Outdoor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                Introduction
              </h2>
              <div className="prose prose-invert">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Boulder, Colorado is the ultimate destination for cannabis enthusiasts who love the outdoors. Nestled at the base of the iconic Flatirons, this progressive mountain town offers a unique blend of world-class hiking, craft cannabis culture, and 420-friendly accommodations that welcome you to enjoy Colorado's legal cannabis in stunning natural surroundings.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unlike Denver's urban offerings, Boulder's 420-friendly rentals emphasize the outdoor experience. Picture yourself on a private patio watching the sunset paint the Flatirons pink and gold, enjoying premium Colorado cannabis after a day of hiking, biking, or exploring Pearl Street's charming shops and restaurants.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This comprehensive guide covers everything you need to know about finding and booking the perfect cannabis-welcoming accommodation in Boulder. From verified mountain lodges with hot tubs to downtown boutique hotels walking distance from dispensaries, we've curated the best options for every budget and preference.
                </p>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
                  <p className="text-accent font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Important:
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Cannabis is legal for adults 21+ in Colorado. All featured properties explicitly welcome cannabis consumption. Always consume responsibly and respect property-specific guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rentals from Database */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Top 420-Friendly Stays in Boulder</h2>
              <p className="text-muted-foreground mb-8">
                Our handpicked selection of verified cannabis-welcoming accommodations in the Boulder area. Each property has been confirmed to welcome cannabis consumption.
              </p>
              
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
                                  {rental.address || 'Boulder, Colorado'}
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
                              {rental.is_verified && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">BudQuest Verified</span>
                              )}
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
                            
                            <div className="flex flex-wrap gap-3">
                              <Link 
                                to={`/hotels/${rental.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors text-sm"
                              >
                                View Full Guide
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
                <Card className="bg-card/60 border-accent/20 p-8 text-center">
                  <Mountain className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Boulder Properties Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're actively adding verified 420-friendly properties in Boulder. Check back soon or explore our Denver options.
                  </p>
                  <Link to="/hotels" className="inline-flex items-center gap-2 text-accent hover:underline">
                    Browse All 420 Rentals <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              )}

              <div className="mt-8 text-center">
                <Link 
                  to="/hotels"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-semibold rounded-lg transition-colors border border-accent/30"
                >
                  View All Colorado 420 Rentals
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Types */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Types of Boulder 420-Friendly Accommodation</h2>
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

        {/* Things To Do */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Things To Do in Boulder (Cannabis-Friendly)</h2>
              <div className="space-y-6">
                {thingsToDo.map((item, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{item.activity}</h3>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                          <p className="text-sm text-accent font-medium">Pro Tip:</p>
                          <p className="text-sm text-muted-foreground">{item.tip}</p>
                        </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best Boulder Neighborhoods to Stay</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {neighborhoods.map((hood) => (
                  <Card key={hood.name} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{hood.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{hood.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dispensaries</span>
                        <span className="text-accent">{hood.dispensaries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vibe</span>
                        <span className="text-foreground">{hood.vibe}</span>
                      </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Boulder 420 Rental Booking Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookingTips.map((tip, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
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
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Plan Your Complete Boulder Cannabis Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive Boulder cannabis travel guide with dispensary recommendations, attractions, consumption laws, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/boulder" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                  >
                    Boulder Travel Guide <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/blog/cannabis-dispensaries-boulder" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                  >
                    Boulder Dispensaries Guide <ArrowRight className="h-5 w-5" />
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
                <Link to="/blog/cannabis-dispensaries-boulder" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Boulder Dispensaries</h4>
                    <p className="text-sm text-muted-foreground mt-1">Complete guide to Boulder cannabis shops</p>
                  </Card>
                </Link>
                <Link to="/usa/colorado" className="group">
                  <Card className="bg-card/60 border-accent/20 p-4 hover:border-accent/50 transition-colors h-full">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Colorado Cannabis Hub</h4>
                    <p className="text-sm text-muted-foreground mt-1">Complete Colorado cannabis travel guide</p>
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

export default BlogBoulderRentals;
