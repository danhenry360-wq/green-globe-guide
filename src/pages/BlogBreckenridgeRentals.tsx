import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  User,
  ChevronRight,
  Bed,
  Wifi,
  Snowflake,
  Mountain,
  Zap,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const BlogBreckenridgeRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select(
          "id, name, slug, address, rating, images, website, policies, amenities, is_420_friendly, is_verified, latitude, longitude"
        )
        .eq("is_420_friendly", true)
        .ilike("address", "%Breckenridge%")
        .order("rating", { ascending: false });

      if (import.meta.env.DEV) console.log("Breckenridge rentals fetch:", { data, error });
      if (error && import.meta.env.DEV) console.error("Breckenridge rentals error:", error);
      if (data) setRentals(data as Rental[]);
      setLoading(false);
    };
    fetchRentals();
  }, []);

  const reasons = [
    {
      icon: Snowflake,
      title: "Year-Round Cannabis Climate",
      description:
        "Whether it's summer hiking or winter skiing, Breckenridge's altitude and scenery create the perfect backdrop for cannabis consumption.",
    },
    {
      icon: Mountain,
      title: "Mountain Adventure Capital",
      description:
        "World-class skiing in winter, hiking and mountain biking in summer. Perfect for adventurous cannabis tourists.",
    },
    {
      icon: Bed,
      title: "420-Friendly Accommodations",
      description:
        "Properties specifically designed for cannabis tourists with designated smoking areas and relaxed policies.",
    },
    {
      icon: Zap,
      title: "Vibrant Nightlife & Dining",
      description:
        "Main Street is packed with cannabis-friendly bars, restaurants, and entertainment venues perfect for tourists.",
    },
  ];

  const whyBreckenridge = [
    {
      title: "Premium Cannabis Experience",
      description:
        "Enjoy Colorado's finest strains in one of the most scenic mountain towns in America.",
      icon: "🌿",
    },
    {
      title: "Adventure & Relaxation",
      description:
        "Mix outdoor activities with comfortable, cannabis-friendly lodging and world-class dining.",
      icon: "⛰️",
    },
    {
      title: "Unique Elevation Experience",
      description:
        "At 9,600 feet, Breckenridge's altitude enhances many cannabis experiences (though newcomers should take it slow).",
      icon: "📈",
    },
    {
      title: "Welcoming Community",
      description:
        "Breckenridge is a cannabis tourism leader with staff educated in serving cannabis travelers.",
      icon: "🤝",
    },
  ];

  const tips = [
    {
      title: "Book Early for Peak Season",
      content:
        "Winter (skiing) and summer weekends fill up fast. Book 2-3 months ahead for best selection and pricing.",
      season: "Peak Times",
    },
    {
      title: "Verify Cannabis Policies",
      content:
        "Always confirm 420-friendly status directly. Ask about designated smoking areas, balconies, or consumption lounges.",
      season: "Before Booking",
    },
    {
      title: "Altitude Considerations",
      content:
        "Breckenridge sits at 9,600 feet. Cannabis effects are intensified at altitude—start with less than you normally use.",
      season: "Important",
    },
    {
      title: "Use Dispensaries Responsibly",
      content:
        "Multiple dispensaries on Main Street offer quality products. Buy from established retailers and budget accordingly.",
      season: "Local Tips",
    },
    {
      title: "Respect Neighbors & Rules",
      content:
        "Even at 420-friendly properties, be considerate of neighbors and follow all property-specific guidelines.",
      season: "Etiquette",
    },
    {
      title: "Plan Your Activities",
      content:
        "Research hiking trails, ski runs, or Main Street restaurants. Have a plan so you get the most from your stay.",
      season: "Planning",
    },
  ];

  const faqs = [
    {
      q: "Can I smoke cannabis in Breckenridge?",
      a: "Yes! Cannabis is legal in Colorado and Breckenridge welcomes responsible cannabis tourism. Book verified 420-friendly properties to smoke legally.",
    },
    {
      q: "What's the altitude and does cannabis affect me differently at high elevation?",
      a: "Breckenridge is at 9,600 feet. Cannabis effects are typically stronger at altitude due to lower oxygen levels. Start slow and stay hydrated.",
    },
    {
      q: "Are there dispensaries in Breckenridge?",
      a: "Yes! Multiple dispensaries operate on and near Main Street. Prices are higher than Denver due to location and tourism demand.",
    },
    {
      q: "Can I consume cannabis in my room?",
      a: "Only at verified 420-friendly properties. Always confirm policies before booking. Standard hotels strictly prohibit cannabis.",
    },
    {
      q: "What's the best time to visit?",
      a: "Winter (Dec-March) for skiing, summer (June-Sept) for hiking. Shoulder seasons offer better deals and fewer crowds.",
    },
    {
      q: "Can I bring cannabis across state lines?",
      a: "No. Cannabis cannot legally cross state borders. Buy only in Colorado from licensed dispensaries.",
    },
    {
      q: "Are there smoking areas at the properties?",
      a: "Most 420-friendly properties have designated outdoor areas—balconies, patios, or consumption lounges. Check specifics during booking.",
    },
    {
      q: "What should I bring for my stay?",
      a: "Bring your own smoking equipment if you prefer smoking. Many properties allow consumption but rarely provide paraphernalia.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Best 420-Friendly Rentals in Breckenridge: Mountain Cannabis Guide
          2025 | BudQuest
        </title>
        <meta
          name="description"
          content="Discover top 420-friendly hotels and rentals in Breckenridge, Colorado. Verified cannabis-welcoming accommodations for your mountain cannabis adventure."
        />
        <meta
          name="keywords"
          content="420-friendly hotels Breckenridge, cannabis hotels Breckenridge, weed friendly rentals Breckenridge, Breckenridge 420 accommodations, mountain cannabis stays"
        />
        <link
          rel="canonical"
          href="https://budquest.com/blog/best-420-rentals-breckenridge"
        />
        <meta
          property="og:title"
          content="Best 420-Friendly Rentals in Breckenridge: Mountain Cannabis Guide 2025"
        />
        <meta
          property="og:description"
          content="Find verified cannabis-friendly accommodations in Breckenridge, Colorado at 9,600 feet elevation."
        />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Best 420-Friendly Rentals in Breckenridge: Mountain Cannabis Guide 2025",
            author: { "@type": "Organization", name: "BudQuest" },
            datePublished: "2025-12-22",
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {/* Hero Image */}
        <section className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
          <img
            src="/dest-colorado.jpg"
            alt="Breckenridge mountain landscape perfect for cannabis tourism"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </section>

        {/* Hero Content */}
        <section className="relative py-6 sm:py-8 md:py-12 overflow-hidden -mt-16 md:-mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              <Link to="/" className="hover:text-accent truncate">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <Link to="/blog" className="hover:text-accent truncate">
                Blog
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-accent truncate">Breckenridge 420 Rentals</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <Badge variant="outline" className="text-xs sm:text-sm">
                  Accommodation
                </Badge>
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" /> December 22, 2025
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> 15 min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Best 420-Friendly Rentals in Breckenridge:
                </span>
                <br />
                <span className="text-foreground/90">
                  Your Mountain Cannabis Guide 2025
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                Find the perfect cannabis-friendly accommodation for your
                Breckenridge mountain adventure
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    BudQuest
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Cannabis Travel Experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-8 sm:py-12 border-t border-accent/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Breckenridge isn't just one of Colorado's premier ski and outdoor
                destinations—it's also a thriving cannabis tourism hub. Nestled at
                9,600 feet in the Rocky Mountains, this historic mining town has
                evolved into a sophisticated destination for cannabis travelers
                seeking mountain views, adventure, and a welcoming 420-friendly
                community.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Unlike generic travel guides, Breckenridge takes cannabis tourism
                seriously. Main Street has multiple dispensaries, Main Street
                restaurants welcome cannabis tourists, and a growing network of
                hotels and vacation rentals explicitly cater to cannabis
                enthusiasts. This guide covers the best 420-friendly accommodations,
                insider tips for the altitude experience, and everything you need
                to plan your mountain cannabis adventure.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether you're planning a ski trip with cannabis, a summer mountain
                retreat, or a mountain biking adventure with extra relaxation, this
                guide will help you find a place where you can enjoy Colorado's
                legal cannabis in comfort and style.
              </p>
            </div>
          </div>
        </section>

        {/* Why Breckenridge? */}
        <section className="py-8 sm:py-12 border-t border-accent/10 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-8">
                Why Choose Breckenridge for Cannabis Tourism?
              </h2>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {whyBreckenridge.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="bg-background/50 border-accent/20 p-4 sm:p-6">
                      <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Rentals from Database */}
        <section className="py-8 sm:py-12 border-t border-accent/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                Top 420-Friendly Stays in Breckenridge
              </h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : rentals.length > 0 ? (
                <motion.div
                  className="space-y-4 sm:space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {rentals.map((rental, index) => (
                    <motion.div key={rental.id} variants={itemVariants}>
                      <Card className="bg-card/60 border-accent/20 overflow-hidden hover:border-accent/40 transition-all">
                        <div className="flex flex-col">
                          {/* Image - always stacked on mobile */}
                          <div className="w-full aspect-video sm:aspect-[16/9] md:aspect-[21/9]">
                            <img
                              src={rental.images?.[0] || "/dest-colorado.jpg"}
                              alt={rental.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <Badge variant="secondary" className="text-xs">
                                      #{index + 1}
                                    </Badge>
                                    <Link
                                      to={`/hotels/${rental.slug}`}
                                      className="hover:text-accent transition-colors min-w-0"
                                    >
                                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground hover:text-accent truncate">
                                        {rental.name}
                                      </h3>
                                    </Link>
                                  </div>
                                  {rental.address && (
                                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                                      <MapPin className="h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">
                                        {rental.address.split(",")[0]}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {rental.rating && (
                                  <div className="flex items-center gap-1 flex-shrink-0 bg-accent/10 px-2 py-1 rounded">
                                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-gold text-gold" />
                                    <span className="text-foreground font-semibold text-xs sm:text-sm">
                                      {rental.rating}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Policies */}
                              {rental.policies && (
                                <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {rental.policies}
                                </p>
                              )}

                              {/* Amenities */}
                              {rental.amenities && (
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                                  {typeof rental.amenities === "object" &&
                                    Object.entries(rental.amenities).map(
                                      ([key, value]) =>
                                        value && (
                                          <Badge
                                            key={key}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {key}
                                          </Badge>
                                        )
                                    )}
                                </div>
                              )}
                            </div>

                            {/* Footer */}
                            {typeof rental?.amenities === "object" && rental.amenities?.price_range && (
                              <div className="flex items-center justify-between gap-2 pt-3 border-t border-accent/10">
                                <span className="text-xs sm:text-sm font-semibold text-accent">
                                  {rental.amenities.price_range}/night
                                </span>
                                {rental.website && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    asChild
                                    className="h-8 text-xs"
                                  >
                                    <a
                                      href={rental.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Book Now
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <Card className="bg-card/60 border-accent/20 p-6 sm:p-8">
                  <p className="text-center text-muted-foreground text-sm sm:text-base">
                    No Breckenridge accommodations found. Check back soon for
                    verified 420-friendly stays!
                  </p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="py-8 sm:py-12 border-t border-accent/10 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-8">
                Expert Tips for Booking Your Breckenridge 420 Rental
              </h2>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {tips.map((tip, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="bg-background/50 border-accent/20 p-4 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0">
                          {tip.season}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                        {tip.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {tip.content}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 sm:py-12 border-t border-accent/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h2>

              <motion.div
                className="space-y-3 sm:space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="bg-card/60 border-accent/20 p-4 sm:p-6">
                      <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 border-t border-accent/10 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready for Your Breckenridge Cannabis Adventure?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Explore more Colorado destinations, find dispensaries, and plan
                your perfect cannabis mountain getaway.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Link to="/blog">Back to Blog</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Link to="/colorado">Explore Colorado Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogBreckenridgeRentals;
