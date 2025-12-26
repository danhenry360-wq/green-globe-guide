import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Search, MapPin, ShieldCheck, Leaf, Home as HomeIcon } from "lucide-react";

// Standard imports from your home directory
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  MapSection,
  BlogSection,
  CTASection,
} from "@/components/home";

const Home: React.FC = () => {
  // SEO Structured Data - Merged WebSite and FAQ for Google Search Results
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://budquest.guide/#website",
        "name": "BudQuest",
        "url": "https://budquest.guide",
        "publisher": {
          "@type": "Organization",
          "name": "BudQuest",
          "logo": {
            "@type": "ImageObject",
            "url": "https://budquest.guide/logo.png"
          }
        },
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
            "name": "Is cannabis travel legal in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, cannabis travel is legal in an increasing number of regions including Thailand, Germany, Canada, and 24 US states. BudQuest provides updated legal maps for over 150 global destinations."
            }
          },
          {
            "@type": "Question",
            "name": "How can I find 420-friendly hotels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BudQuest features a verified directory of 420-friendly accommodations where consumption is permitted in designated areas or private balconies."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-green-500/30 overflow-x-hidden">
      {/* 1. SEO & META TAGS */}
      <SEO
        title="BudQuest | Global Cannabis Travel Guide & 420 Friendly Stays (2025)"
        description="The #1 guide for cannabis tourism. Find verified legal weed destinations, 420-friendly hotels, dispensary maps, and travel laws for 150+ countries."
        keywords="cannabis travel 2025, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, budquest"
        schemaData={schemaMarkup}
      />

      {/* 2. NAVIGATION */}
      <Navigation />

      {/* 3. ACCESSIBILITY SKIP LINK */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-primary focus:text-white p-3 rounded-md shadow-2xl transition-all"
      >
        Skip to main content
      </a>

      {/* 4. MAIN CONTENT */}
      <main id="main-content" className="flex-grow">
        
        {/* HERO AREA WITH SEARCH UTILITY */}
        <section className="relative">
          <HeroSection />
          
          {/* SEARCH BAR: Strategic placement to capture destination intent */}
          <div className="container mx-auto px-4 -mt-10 md:-mt-14 relative z-30">
            <div className="max-w-4xl mx-auto bg-card p-2 md:p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border flex flex-col md:flex-row gap-2">
              <div className="flex-grow flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-border">
                <MapPin className="text-primary mr-3 h-5 w-5 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Where are you traveling? (e.g. Pennsylvania, Chicago...)" 
                  className="bg-transparent border-none focus:ring-0 w-full text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Search className="mr-2 h-5 w-5" /> Search Stays
              </Button>
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <StatsSection />

        {/* TRUST & E-E-A-T SIGNALS */}
        <section className="py-16 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <ShieldCheck className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Verified Legality</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Local laws updated for 2025 across 150+ global cannabis regions. Travel with confidence.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <HomeIcon className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">420-Friendly Stays</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Book accommodations with confirmed consumption policies, balconies, and private smoke areas.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                   <Leaf className="text-green-600 h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Local Bud Guides</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Real community reviews on local dispensaries, social clubs, and regional strain favorites.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING DESTINATIONS: High-Value Internal Links */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Trending Hotspots</h2>
                <p className="text-muted-foreground text-lg">Our most requested cannabis travel guides this month.</p>
              </div>
              <Link to="/destinations">
                <Button variant="ghost" className="text-primary font-bold text-lg hover:bg-primary/5">
                  Explore All Destinations →
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  name: "Illinois", 
                  path: "/rottweiler-puppies-in-illinois", 
                  img: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&q=80&w=600",
                  tag: "Suburban Bliss"
                },
                { 
                  name: "Pennsylvania", 
                  path: "/rottweiler-puppies-in-pennsylvania", 
                  img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600",
                  tag: "Keystone Quality"
                },
                { 
                  name: "Thailand", 
                  path: "/destinations/thailand", 
                  img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?auto=format&fit=crop&q=80&w=600",
                  tag: "Tropical Vibes"
                },
                { 
                  name: "California", 
                  path: "/rottweiler-puppies-in-california", 
                  img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600",
                  tag: "The Original"
                }
              ].map((dest) => (
                <Link 
                  to={dest.path} 
                  key={dest.name} 
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img 
                    src={dest.img} 
                    alt={dest.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] mb-2 text-green-400">{dest.tag}</p>
                    <h4 className="text-3xl font-bold">{dest.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPORTING SECTIONS */}
        <DestinationsSection />
        <MapSection />
        <BlogSection />
        <CTASection />

        {/* ACCESSIBLE FAQ SECTION (Good for CTR and User Value) */}
        <section className="py-24 bg-muted/10 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 underline decoration-green-500 underline-offset-8">
              Cannabis Travel Essentials
            </h2>
            <div className="grid gap-12">
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Is it legal to cross borders with cannabis?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  No. Even if you are traveling between two legal states or countries (e.g., from Canada to Thailand), it is strictly illegal to carry cannabis across international borders. Always purchase your bud locally at your destination.
                </p>
              </div>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  What is a 420-friendly hotel?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A 420-friendly stay is an accommodation that officially permits the use of cannabis on the premises. This can range from private smoking balconies and outdoor gardens to vaporizer-friendly rooms.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
