import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button"; // Assuming you use shadcn
import { Input } from "@/components/ui/input";   // Assuming you use shadcn
import { Search, MapPin, ShieldCheck, Leaf } from "lucide-react";
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  CTASection,
} from "@/components/home";

const MapSection = lazy(() => import("@/components/home").then((module) => ({ default: module.MapSection })));
const BlogSection = lazy(() => import("@/components/home").then((module) => ({ default: module.BlogSection })));

const Home = () => {
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BudQuest",
      "url": "https://budquest.guide",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://budquest.guide/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is cannabis travel legal in 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cannabis travel is legal and thriving in countries like Thailand, Canada, Germany, and Malta, as well as 24+ US states including California, Illinois, and Pennsylvania."
          }
        },
        {
          "@type": "Question",
          "name": "How do I find 420-friendly hotels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BudQuest provides a verified directory of 420-friendly accommodations where consumption is permitted on-site or in designated areas."
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-green-500/30">
      <SEOHead
        // OPTIMIZED TITLE: High-action words + Current Year
        title="BudQuest | Plan Your 420 Trip: 420-Friendly Hotels & Legal Maps (2025)"
        description="Plan your next cannabis-friendly vacation. Verified 420-friendly stays, legal travel maps, and dispensary guides for the US, Europe, and Thailand. Updated for 2025."
        keywords="cannabis travel guide, 420 friendly hotels, weed legal map 2025, marijuana tourism, best dispensaries chicago, budquest"
      />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <Navigation />

      <main id="main-content" className="flex-grow">
        
        {/* HERO OVERHAUL: Added Search Intent */}
        <div className="relative">
          <HeroSection />
          {/* Floating Search Bar (Strategic placement to lower bounce rate) */}
          <div className="container mx-auto px-4 -mt-12 relative z-30">
            <div className="max-w-3xl mx-auto bg-card p-2 rounded-2xl shadow-2xl border border-border flex flex-col md:flex-row gap-2">
              <div className="flex-grow flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-border">
                <MapPin className="text-primary mr-2 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Where are you going? (e.g. Chicago, Thailand...)" 
                  className="bg-transparent border-none focus:ring-0 w-full text-sm"
                />
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                <Search className="mr-2 h-4 w-4" /> Explore Stays
              </Button>
            </div>
          </div>
        </div>

        <StatsSection />

        {/* TRUST SIGNALS (Crucial for Cannabis SEO) */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-green-600 h-10 w-10" />
                <div>
                  <h3 className="font-bold">Verified Legality</h3>
                  <p className="text-sm text-muted-foreground">Laws updated weekly for 150+ regions.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Home className="text-green-600 h-10 w-10" />
                <div>
                  <h3 className="font-bold">420-Friendly Stays</h3>
                  <p className="text-sm text-muted-foreground">Stays where you can consume safely.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Leaf className="text-green-600 h-10 w-10" />
                <div>
                  <h3 className="font-bold">Community Rated</h3>
                  <p className="text-sm text-muted-foreground">Real reviews from cannabis travelers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING DESTINATIONS: Links to your high-impression pages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold">Trending Destinations</h2>
                <p className="text-muted-foreground">Hotspots with high impressions right now.</p>
              </div>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strategic internal links to pages Google already likes */}
              {[
                { name: "Illinois", path: "/rottweiler-puppies-in-illinois", img: "chicago.jpg" },
                { name: "Pennsylvania", path: "/rottweiler-puppies-in-pennsylvania", img: "philly.jpg" },
                { name: "Thailand", path: "/cannabis-travel-thailand", img: "thailand.jpg" },
                { name: "New York", path: "/rottweiler-puppies-in-new-york", img: "nyc.jpg" }
              ].map(city => (
                <a href={city.path} key={city.name} className="group relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs uppercase font-bold tracking-widest opacity-80">Explore</p>
                    <h4 className="text-xl font-bold">{city.name}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-[500px] animate-pulse bg-muted/10" />}>
          <MapSection />
        </Suspense>

        <Suspense fallback={<div className="h-[400px] animate-pulse bg-muted/10" />}>
          <BlogSection />
        </Suspense>

        {/* FAQ SECTION (Visible for Schema and User) */}
        <section className="py-20 border-t">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Cannabis Travel FAQ</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Is it safe to travel with cannabis?</h3>
                <p className="text-muted-foreground">Laws vary wildly. Generally, crossing international borders with cannabis is illegal even if legal in both countries. Always check our specific region guides.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">How does BudQuest verify 420-friendly hotels?</h3>
                <p className="text-muted-foreground">We look for specific policies regarding balcony smoking, designated areas, or "vaporizer-friendly" rooms to ensure you don't face fines.</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
