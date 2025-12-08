import { Helmet } from "react-helmet";
// Updated: December 8, 2025 - Force deployment refresh
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Star, Clock, Calendar, User, ChevronRight, 
  CheckCircle2, XCircle, AlertTriangle, DollarSign, Car, CreditCard,
  Truck, Info, ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogDenverDispensaries = () => {
  const dispensaries = [
    {
      name: "Cookies SF",
      slug: "cookies-sf",
      rating: 4.9,
      bestFor: "Exclusive Strains",
      location: "Downtown Denver",
      description: "The famous Cookies brand brings their California genetics to Denver. Home of legendary strains like Gary Payton and Cereal Milk.",
      expects: ["Exclusive Cookies genetics", "Premium flower", "Trendy atmosphere", "Limited drops"],
      pricing: "$$$",
      delivery: false,
      parking: true,
      tip: "Follow their social media for limited strain drops - they sell out fast."
    },
    {
      name: "Native Roots",
      slug: "native-roots-denver",
      rating: 4.7,
      bestFor: "Tourist-Friendly",
      location: "Multiple Denver locations including DIA area",
      description: "Colorado's most recognizable dispensary chain. Clean stores, helpful staff, and locations convenient for travelers.",
      expects: ["Airport-adjacent location", "Friendly to newcomers", "Educational approach", "Quality house brands"],
      pricing: "$$",
      delivery: true,
      parking: true,
      tip: "Their Rino location is perfect for combining with brewery visits."
    },
    {
      name: "Lightshade Rec & Med Dispensary",
      slug: "lightshade-denver",
      rating: 4.6,
      bestFor: "Edibles Selection",
      location: "Multiple Denver locations",
      description: "Known for their extensive edibles menu and quality house-produced products. Lab-tested and consistently dosed.",
      expects: ["Huge edible selection", "House-made products", "Lab testing transparency", "Clean facilities"],
      pricing: "$$",
      delivery: true,
      parking: true,
      tip: "Their house-made gummies are fan favorites - try the 1:1 CBD:THC for beginners."
    },
    {
      name: "Emerald Fields",
      slug: "emerald-fields",
      rating: 4.7,
      bestFor: "Craft Cannabis",
      location: "Glendale (Denver metro)",
      description: "Boutique dispensary focusing on small-batch, craft cannabis. Perfect for connoisseurs seeking unique strains.",
      expects: ["Craft-grown flower", "Unique genetics", "Personalized recommendations", "Terp-focused selection"],
      pricing: "$$$",
      delivery: false,
      parking: true,
      tip: "Tell them your flavor preferences - they'll match you with perfect terpene profiles."
    },
    {
      name: "Best Buds Dispensary RiNo",
      slug: "best-buds-dispensary-rino",
      rating: 4.5,
      bestFor: "RiNo District",
      location: "River North Art District",
      description: "Located in Denver's trendy RiNo district, this dispensary offers a curated selection perfect for exploring the area's breweries and art galleries.",
      expects: ["Craft-grown flower", "Great location", "Friendly staff", "Quality products"],
      pricing: "$$",
      delivery: false,
      parking: true,
      tip: "Perfect for combining with a RiNo brewery tour."
    },
    {
      name: "Best Buds Highland",
      slug: "best-buds-highland",
      rating: 4.5,
      bestFor: "Highland Neighborhood",
      location: "Highland, Denver",
      description: "Serving the Highland neighborhood with quality cannabis products and excellent customer service.",
      expects: ["Quality selection", "Friendly staff", "Neighborhood favorite", "Competitive prices"],
      pricing: "$$",
      delivery: false,
      parking: true,
      tip: "Great neighborhood dispensary with local favorites."
    },
    {
      name: "Alternative Medicine on Capitol Hill",
      slug: "alternative-medicine-on-capitol-hill-amch-dispensary",
      rating: 4.6,
      bestFor: "Medical Focus",
      location: "Capitol Hill, Denver",
      description: "One of Denver's original dispensaries with deep roots in the medical cannabis community. Known for compassionate care and quality.",
      expects: ["Medical expertise", "Veteran discounts", "Quality concentrates", "Personal service"],
      pricing: "$$",
      delivery: false,
      parking: true,
      tip: "Great for those with specific medical needs - staff is highly knowledgeable."
    },
    {
      name: "Ascend Cannabis Co",
      slug: "ascend-cannabis-co",
      rating: 4.4,
      bestFor: "Quality Products",
      location: "Denver",
      description: "Offering a wide selection of quality cannabis products with knowledgeable staff to guide your experience.",
      expects: ["Wide selection", "Knowledgeable staff", "Quality products", "Good prices"],
      pricing: "$$",
      delivery: true,
      parking: true,
      tip: "Ask about their daily specials for the best deals."
    },
    {
      name: "C.R.E.A.M Dispensary",
      slug: "c-r-e-a-m-recreational-medical-marijuana-dispensary",
      rating: 4.5,
      bestFor: "Consistent Quality",
      location: "Denver",
      description: "Reliable dispensary known for consistent product quality and straightforward shopping experience.",
      expects: ["Consistent inventory", "Fair pricing", "Quick transactions", "No-pressure sales"],
      pricing: "$$",
      delivery: true,
      parking: true,
      tip: "Great for repeat purchases - you'll find the same products each visit."
    },
    {
      name: "Buku Loud Dispensary",
      slug: "buku-loud-recreational-and-medical-marijuana-dispensary",
      rating: 4.3,
      bestFor: "Value Selection",
      location: "Denver",
      description: "Offering recreational and medical marijuana with a focus on value and variety.",
      expects: ["Good prices", "Wide selection", "Both rec and med", "Convenient location"],
      pricing: "$$",
      delivery: false,
      parking: true,
      tip: "Check their specials for great deals on quality products."
    },
  ];

  const productTypes = [
    {
      type: "Flower",
      description: "Traditional cannabis buds for smoking or vaping. Denver offers everything from budget ounces to top-shelf craft cannabis.",
      priceRange: "$8-20/gram, $100-400/oz",
      popular: "Blue Dream, Gorilla Glue, Wedding Cake"
    },
    {
      type: "Concentrates",
      description: "Highly potent extracts including shatter, wax, live resin, and rosin. For experienced consumers seeking stronger effects.",
      priceRange: "$20-80/gram",
      popular: "Live Resin, Rosin, Diamonds"
    },
    {
      type: "Edibles",
      description: "Cannabis-infused foods and beverages. Effects take 30-90 minutes to onset. Start with 5-10mg if you're new.",
      priceRange: "$15-40/package",
      popular: "Gummies, Chocolates, Drinks"
    },
    {
      type: "Pre-Rolls",
      description: "Ready-to-smoke joints. Convenient for visitors without smoking accessories. Available in various sizes and strains.",
      priceRange: "$5-20 each",
      popular: "Infused pre-rolls, Multi-packs"
    },
    {
      type: "CBD Products",
      description: "Non-intoxicating cannabidiol products for relaxation without the high. Great for anxiety or sleep without impairment.",
      priceRange: "$20-60",
      popular: "Tinctures, Topicals, 1:1 products"
    },
  ];

  const shoppingTips = [
    {
      title: "Know Your Budget",
      content: "Denver dispensaries range from budget-friendly to premium. Set your budget before shopping - you can find quality at every price point."
    },
    {
      title: "Arrive Early",
      content: "Popular dispensaries get busy, especially on weekends. Early morning visits mean shorter lines and fresher selection."
    },
    {
      title: "Ask Staff Questions",
      content: "Budtenders are knowledgeable and want to help. Don't be shy about asking for recommendations based on your experience level."
    },
    {
      title: "Start Low with Edibles",
      content: "Denver edibles are potent. Start with 5mg and wait 2 hours before taking more. Many tourists overdo it - don't be one of them."
    },
    {
      title: "Check for First-Time Discounts",
      content: "Most dispensaries offer 10-20% off for first-time customers. Bring your ID and ask about new customer deals."
    },
    {
      title: "Bring Valid ID",
      content: "You MUST have government-issued photo ID proving you're 21+. Out-of-state IDs and passports are accepted."
    },
    {
      title: "Know the Limits",
      content: "Recreational customers can purchase up to 1 oz of flower, 8g of concentrates, or 800mg of edibles per transaction."
    },
    {
      title: "Consider Delivery",
      content: "Many Denver dispensaries offer delivery. Great option if you're staying at a 420-friendly rental and want convenience."
    },
  ];

  const faqs = [
    { q: "Do I need a medical card to buy cannabis in Denver?", a: "No. Colorado has recreational cannabis for adults 21+. Anyone with valid ID can purchase at recreational dispensaries." },
    { q: "What ID do I need to buy cannabis?", a: "Any government-issued photo ID showing you're 21 or older. Out-of-state driver's licenses and passports work fine." },
    { q: "Can I smoke cannabis in my hotel room?", a: "Most hotels prohibit cannabis. Book a verified 420-friendly rental or consume in legal private spaces only." },
    { q: "What's the best time to visit dispensaries?", a: "Early mornings (9-11 AM) on weekdays have the shortest lines and freshest stock. Avoid 4-7 PM and weekends if possible." },
    { q: "Can I take cannabis out of Colorado?", a: "No. Transporting cannabis across state lines is a federal crime, even between legal states. Consume everything before leaving." },
    { q: "Do Denver dispensaries offer delivery?", a: "Yes, many do. Delivery is legal for recreational customers in Denver. Most require minimum orders of $50-100." },
    { q: "What should a first-timer buy?", a: "Start with a pre-roll or low-dose edibles (5-10mg). Avoid concentrates until you know your tolerance." },
    { q: "Do dispensaries accept credit cards?", a: "Most are cash-only due to federal banking laws. Some accept debit cards with a fee. ATMs are available on-site." },
    { q: "Will cannabis show up on a drug test?", a: "Yes. THC can be detected for days or weeks depending on usage. Plan accordingly if you have upcoming tests." },
    { q: "What's a good beginner strain?", a: "Ask for balanced hybrids with moderate THC (15-20%). Blue Dream and Harlequin are popular beginner-friendly options." },
  ];

  const itinerary = [
    {
      day: "Day 1: Arrival",
      activities: [
        "Check into 420-friendly hotel",
        "Visit Native Roots near airport",
        "Light evening consumption at hotel",
        "Dinner in RiNo district"
      ]
    },
    {
      day: "Day 2: Explore",
      activities: [
        "Morning at Denver Art Museum",
        "Lunch on 16th Street Mall",
        "Afternoon dispensary tour (The Lodge, Cookies)",
        "Evening session at hotel"
      ]
    },
    {
      day: "Day 3: Departure",
      activities: [
        "Breakfast in LoHi",
        "Final dispensary stop for souvenirs",
        "Consume remaining products",
        "Clean out before airport"
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cannabis Dispensaries in Denver: Complete Guide 2025 | BudQuest</title>
        <meta name="description" content="Discover Denver's best cannabis dispensaries. Complete guide to top 10 shops, products, shopping tips, and laws. Plan your Denver cannabis trip." />
        <meta name="keywords" content="cannabis dispensary Denver, best dispensary Denver, Denver weed shops, cannabis strains Denver, where to buy weed Denver, Denver cannabis guide, 420 dispensary Denver" />
        <link rel="canonical" href="https://budquest.com/blog/cannabis-dispensaries-denver" />
        <meta property="og:title" content="Cannabis Dispensaries in Denver: Complete Guide 2025" />
        <meta property="og:description" content="Discover Denver's best cannabis dispensaries. Complete guide to top 10 shops, products, shopping tips, and laws." />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2025-12-04" />
        <meta property="article:author" content="BudQuest" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cannabis Dispensaries in Denver: Complete Guide 2025",
            "description": "Complete guide to Denver's best cannabis dispensaries, products, and shopping tips",
            "author": { "@type": "Organization", "name": "BudQuest" },
            "publisher": { "@type": "Organization", "name": "BudQuest" },
            "datePublished": "2025-12-04",
            "dateModified": "2025-12-04"
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
              <span className="text-accent">Denver Dispensaries</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Cannabis Guides</span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> December 4, 2025
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 15 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Cannabis Dispensaries in Denver:
                </span>
                <br />
                <span className="text-foreground/90">Complete Guide 2025</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Your complete guide to Denver's best cannabis shops, products, and shopping tips
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

        {/* Quick Facts Box */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <Card className="bg-accent/5 border-accent/20 p-6 max-w-4xl">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Facts: Denver Cannabis</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "Age", value: "21+" },
                  { label: "Purchase Limit", value: "1 oz" },
                  { label: "Hours", value: "8AM-12AM" },
                  { label: "Payment", value: "Cash & Card" },
                  { label: "Delivery", value: "Available" },
                ].map((fact) => (
                  <div key={fact.label} className="text-center">
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="text-sm font-semibold text-accent">{fact.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <Card className="bg-card/60 border-accent/20 p-6 max-w-4xl">
              <h2 className="text-lg font-semibold text-foreground mb-4">Table of Contents</h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { label: "Introduction", href: "#introduction" },
                  { label: "Best 10 Denver Dispensaries", href: "#dispensaries" },
                  { label: "Cannabis Products Guide", href: "#products" },
                  { label: "Denver Shopping Tips", href: "#tips" },
                  { label: "Frequently Asked Questions", href: "#faq" },
                  { label: "Consumption Laws", href: "#laws" },
                  { label: "Plan Your Trip", href: "#itinerary" },
                  { label: "Related Resources", href: "#resources" },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="text-muted-foreground hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </Card>
          </div>
        </section>

        {/* Introduction */}
        <section id="introduction" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl prose prose-invert">
              <h2 className="text-2xl font-bold text-foreground mb-6">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Denver isn't just Colorado's capital—it's the cannabis capital of America. Since recreational legalization in 2014, Denver has become home to over 500 licensed dispensaries, making it one of the world's premier destinations for cannabis tourism. Whether you're a first-time visitor curious about legal cannabis or an experienced consumer seeking Colorado's finest, Denver delivers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This comprehensive guide covers everything you need to know: the best dispensaries for every budget and preference, product types and what to expect, shopping tips for tourists, and the laws you need to follow. We've personally visited dozens of Denver dispensaries to bring you honest, practical recommendations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Denver's cannabis scene is mature, competitive, and consumer-friendly. Prices have dropped significantly since legalization, quality has skyrocketed, and dispensaries have evolved from sketchy storefronts to sophisticated retail experiences. Let's dive in.
              </p>
            </div>
          </div>
        </section>

        {/* Best 10 Dispensaries */}
        <section id="dispensaries" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Best 10 Cannabis Dispensaries in Denver</h2>
              
              <div className="space-y-6">
                {dispensaries.map((disp, index) => (
                  <motion.div
                    key={disp.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-card/60 border-accent/20 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-accent">#{index + 1}</span>
                            <Link to={`/dispensary/${disp.slug}`} className="hover:text-accent transition-colors">
                              <h3 className="text-xl font-bold text-foreground hover:text-accent">{disp.name}</h3>
                            </Link>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-gold text-gold" />
                              <span className="text-sm text-foreground">{disp.rating}</span>
                            </div>
                            <span className="px-2 py-0.5 bg-accent/20 text-accent rounded text-xs">{disp.bestFor}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {disp.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gold">{disp.pricing}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{disp.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">What to Expect:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {disp.expects.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Truck className={`h-3 w-3 ${disp.delivery ? 'text-green-400' : 'text-red-400'}`} />
                          Delivery: {disp.delivery ? 'Yes' : 'No'}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Car className={`h-3 w-3 ${disp.parking ? 'text-green-400' : 'text-red-400'}`} />
                          Parking: {disp.parking ? 'Yes' : 'No'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-accent/10 border border-accent/20 rounded-lg p-3">
                          <p className="text-xs text-accent font-medium mb-1">Pro Tip</p>
                          <p className="text-sm text-muted-foreground">{disp.tip}</p>
                        </div>
                        <Link 
                          to={`/dispensary/${disp.slug}`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors text-sm shrink-0"
                        >
                          View Dispensary
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-6 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Ready to book a stay?</h3>
                  <p className="text-sm text-muted-foreground">Check out our 420-Friendly Hotels in Denver guide</p>
                </div>
                <Link to="/denver#hotels">
                  <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg flex items-center gap-2">
                    View Hotels <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Products Guide */}
        <section id="products" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Products Guide</h2>
              
              <div className="space-y-4">
                {productTypes.map((product) => (
                  <Card key={product.type} className="bg-card/60 border-accent/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{product.type}</h3>
                    <p className="text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-accent">
                        <DollarSign className="h-3 w-3 inline" /> {product.priceRange}
                      </span>
                      <span className="text-muted-foreground">
                        Popular: {product.popular}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Tips */}
        <section id="tips" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Denver Cannabis Shopping Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingTips.map((tip, index) => (
                  <Card key={tip.title} className="bg-card/60 border-accent/20 p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold text-accent">{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
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
        <section id="faq" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.q} className="bg-card/60 border-accent/20 p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consumption Laws */}
        <section id="laws" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Cannabis Consumption Laws</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-green-500/5 border-green-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-green-400">Where You CAN Consume</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Private residences (with permission)",
                      "420-friendly hotels/rentals",
                      "Licensed consumption lounges",
                      "Private outdoor patios",
                      "Some cannabis-friendly events"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                
                <Card className="bg-red-500/5 border-red-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">Where You CANNOT Consume</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Public streets and sidewalks",
                      "Parks and open spaces",
                      "Most hotel rooms/balconies",
                      "Vehicles (even as passenger)",
                      "Federal property",
                      "Near schools"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-3 w-3 text-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              
              <Card className="bg-amber-500/5 border-amber-500/20 p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-400 mb-1">Penalties</p>
                    <p className="text-sm text-muted-foreground">
                      Public consumption fines range from $100-$999. DUI laws apply to cannabis—don't drive high. Transporting across state lines is a federal offense.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section id="itinerary" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Plan Your Denver Cannabis Trip</h2>
              <p className="text-muted-foreground mb-6">Sample 3-day itinerary for cannabis travelers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {itinerary.map((day) => (
                  <Card key={day.day} className="bg-card/60 border-accent/20 p-5">
                    <h3 className="font-bold text-accent mb-3">{day.day}</h3>
                    <ul className="space-y-2">
                      {day.activities.map((activity) => (
                        <li key={activity} className="text-sm text-muted-foreground flex items-start gap-2">
                          <ChevronRight className="h-3 w-3 mt-1 text-accent flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section id="resources" className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-accent mb-3">Denver Guides</h3>
                  <ul className="space-y-2">
                    <li><Link to="/denver" className="text-muted-foreground hover:text-accent text-sm">Complete Denver Cannabis Travel Guide</Link></li>
                    <li><Link to="/denver#hotels" className="text-muted-foreground hover:text-accent text-sm">420-Friendly Hotels in Denver</Link></li>
                    <li><Link to="/denver#tours" className="text-muted-foreground hover:text-accent text-sm">Cannabis Tours in Denver</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-3">Other Colorado Cities</h3>
                  <ul className="space-y-2">
                    <li><Link to="/boulder" className="text-muted-foreground hover:text-accent text-sm">Cannabis Dispensaries in Boulder</Link></li>
                    <li><Link to="/aspen" className="text-muted-foreground hover:text-accent text-sm">Cannabis Guide to Aspen</Link></li>
                    <li><Link to="/colorado-springs" className="text-muted-foreground hover:text-accent text-sm">Colorado Springs Guide</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-3">National Resources</h3>
                  <ul className="space-y-2">
                    <li><Link to="/colorado" className="text-muted-foreground hover:text-accent text-sm">Colorado Cannabis Laws</Link></li>
                    <li><Link to="/" className="text-muted-foreground hover:text-accent text-sm">Cannabis Travel Guide</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Conclusion</h2>
              
              <div className="prose prose-invert">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Denver's cannabis scene offers something for everyone—from budget-conscious shoppers to connoisseurs seeking craft cannabis. The city's mature market means competitive prices, exceptional quality, and professional service at nearly every dispensary.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Remember: start low and go slow, especially with edibles. Respect local laws by consuming only in private, legal spaces. And don't try to take anything across state lines.
                </p>
              </div>
              
              <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-6 mb-6">
                <h3 className="font-bold text-foreground mb-4">Final Pro Tips</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Book a 420-friendly hotel before buying",
                    "Visit multiple dispensaries for variety",
                    "Keep receipts for your records",
                    "Finish everything before your departure"
                  ].map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Ready to explore Denver's cannabis scene?</p>
                <Link to="/denver">
                  <button className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg flex items-center gap-2 mx-auto">
                    Explore Denver Cannabis Travel Guide <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-8">
                Safe travels and happy exploring!<br />
                — The BudQuest Team
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogDenverDispensaries;
