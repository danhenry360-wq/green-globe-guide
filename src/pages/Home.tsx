import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
// FIXED: Reverted to SEOHead and named import to match your original BudQuest structure
import { SEOHead } from "@/components/SEOHead"; 
import { Button } from "@/components/ui/button";
import { Search, MapPin, ShieldCheck, Leaf, Home as HomeIcon } from "lucide-react";

// Standard imports from your home directory components
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  MapSection,
  BlogSection,
  CTASection,
} from "@/components/home";

const Home: React.FC = () => {
  // Structured Data for Google Rich Results
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://budquest.guide/#website",
        "name": "BudQuest",
        "url": "https://budquest.guide",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://budquest.guide/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where is cannabis travel legal in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cannabis travel is currently legal in regions like Thailand, Germany, Canada, and 24 US states. BudQuest provides real-time updates on travel laws for over 150 destinations."
            }
          },
          {
            "@type": "Question",
            "name": "Can I book 420-friendly hotels on BudQuest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BudQuest features a verified directory of 420-friendly stays where consumption is permitted in designated areas or private smoking balconies."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-green-500/30 overflow-x-hidden">
      {/* 1. SEO & META TAGS - FIXED COMPONENT NAME */}
      <SEOHead
        title="BudQuest | Global Cannabis Travel Guide & 420 Friendly Stays (2025)"
        description="The #1 guide for cannabis tourism. Find verified legal weed destinations, 420-friendly hotels, dispensary maps, and travel laws for 150+ countries."
        keywords="cannabis travel 2025, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, budquest"
      />

      {/* 2. STRUCTURED DATA INJECTION */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* 3. NAVIGATION */}
      <Navigation />

      {/* 4. ACCESSIBILITY SKIP LINK */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-primary focus:text-white p-3 rounded shadow-xl"
      >
        Skip to main content
      </a>

      {/* 5. MAIN CONTENT AREA */}
      <main id="main-content" className="flex-grow">
        
        {/* HERO SECTION WITH SEARCH OVERLAY */}
        <div className="relative">
          <HeroSection />
          
          {/* SEARCH UTILITY: Placed to capture destination intent immediately */}
          <div className="container mx-auto px-4 -mt-10 md:-mt-14 relative z-30">
            <div className="max-w-4xl mx-auto bg-card p-2 md:p-3 rounded-2xl shadow-2xl border border-border flex flex-col md:flex-row gap-2">
              <div className="flex-grow flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-border">
                <MapPin className="text-primary mr-3 h-5 w-5 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Where are you going? (e.g. Pennsylvania, Thailand...)" 
                  className="bg-transparent border-none focus:ring-0 w-full text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-8 rounded-xl transition-transform active:scale-95">
                <Search className="mr-2 h-5 w-5" /> Find Stays
              </Button>
            </div>
          </div>
        </div>

        <StatsSection />

        {/* TRUST SIGNALS (E-E-A-T) */}
        <section className="py-16 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <ShieldCheck className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Verified Legality</h3>
                  <p className="text-sm text-muted-foreground">Laws updated for 2025 across 150+ regions. Travel without legal stress.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <HomeIcon className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">420-Friendly Stays</h3>
                  <p className="text-sm text-muted-foreground">The world's largest directory of stays where consumption is officially allowed.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <Leaf className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Local Bud Guides</h3>
                  <p className="text-sm text-muted-foreground">Verified dispensary maps and community reviews on the best local strains.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING DESTINATIONS: Linking to your high-impression pages */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Trending Hotspots</h2>
                <p className="text-muted-foreground text-lg">Top cannabis travel destinations getting the most attention.</p>
              </div>
              <Link to="/destinations">
                <Button variant="ghost" className="text-primary font-bold text-lg">
                  View All Guides →
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Illinois", path: "/rottweiler-puppies-in-illinois", img: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&q=80&w=600" },
                { name: "Pennsylvania", path: "/rottweiler-puppies-in-pennsylvania", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600" },
                { name: "Thailand", path: "/destinations/thailand", img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?auto=format&fit=crop&q=80&w=600" },
                { name: "California", path: "/rottweiler-puppies-in-california", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600" }
              ].map((dest) => (
                <Link to={dest.path} key={dest.name} className="group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 opacity-70">Top Rated</p>
                    <h4 className="text-2xl font-bold">{dest.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <DestinationsSection />
        
        <MapSection />

        <BlogSection />

        <CTASection />

        {/* ACCESSIBLE FAQ SECTION (Physical content for SEO indexing) */}
        <section className="py-24 bg-muted/10 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Cannabis Travel Essentials</h2>
            <div className="grid gap-8">
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-xl mb-3">Is it legal to cross borders with cannabis?</h3>
                <p className="text-muted-foreground leading-relaxed">No. Carrying cannabis across international borders is illegal, even if you are traveling between two legal countries. We recommend purchasing your supplies locally at your destination.</p>
              </div>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-xl mb-3">What qualifies as a 420-friendly stay?</h3>
                <p className="text-muted-foreground leading-relaxed">BudQuest verified stays are accommodations that have clear policies allowing cannabis use, whether in private rooms, balconies, or dedicated lounge areas.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
