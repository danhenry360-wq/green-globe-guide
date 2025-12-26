import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead"; 
import { Button } from "@/components/ui/button";
import { ShieldCheck, Home as HomeIcon, Leaf } from "lucide-react";

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
  // Purely SEO Optimization - FAQ schema helps get the expandable boxes in Google results
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://budquest.guide/#website",
        "name": "BudQuest",
        "url": "https://budquest.guide"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where is cannabis travel legal in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cannabis travel is legal in regions like Thailand, Germany, Canada, and 24 US states. BudQuest provides updated legal maps for these destinations."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find 420-friendly hotels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BudQuest features a verified directory of 420-friendly accommodations where consumption is permitted on private balconies or designated areas."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-green-500/30 overflow-x-hidden">
      <SEOHead
        title="BudQuest | Global Cannabis Travel Guide & 420 Friendly Stays (2025)"
        description="The #1 guide for cannabis tourism. Find verified legal weed destinations, 420-friendly hotels, and travel laws for 150+ countries. Updated for 2025."
        keywords="cannabis travel 2025, weed tourism, 420 friendly hotels, marijuana travel guide, budquest"
      />

      {/* Schema Injection for Google */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <Navigation />

      <main id="main-content" className="flex-grow">
        
        {/* Your Original Hero - No extra dashboard added here */}
        <HeroSection />

        <StatsSection />

        {/* TRENDING DESTINATIONS: Links to your high-impression pages to boost their ranking */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Trending Hotspots</h2>
                <p className="text-gray-400 mt-2">Top destinations for cannabis travelers this month.</p>
              </div>
              <Link to="/destinations">
                <Button variant="link" className="text-green-500 font-bold p-0">View All Guides →</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: "Illinois", 
                  path: "/rottweiler-puppies-in-illinois", 
                  img: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                  name: "Pennsylvania", 
                  path: "/rottweiler-puppies-in-pennsylvania", 
                  img: "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                  name: "Thailand", 
                  path: "/destinations/thailand", 
                  img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                  name: "California", 
                  path: "/rottweiler-puppies-in-california", 
                  img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600" 
                }
              ].map((dest) => (
                <Link to={dest.path} key={dest.name} className="group relative h-72 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                  <img 
                    src={dest.img} 
                    alt={dest.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-green-500 mb-1">Guide</p>
                    <h4 className="text-2xl font-bold text-white">{dest.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS: Added icons to provide social proof/authority */}
        <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-green-500 h-8 w-8 shrink-0" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Verified Legality</h3>
                  <p className="text-gray-500 text-sm">Real-time law updates for 150+ regions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HomeIcon className="text-green-500 h-8 w-8 shrink-0" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">420-Friendly Stays</h3>
                  <p className="text-gray-500 text-sm">Verified hotels that officially permit use.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Leaf className="text-green-500 h-8 w-8 shrink-0" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Local Dispensaries</h3>
                  <p className="text-gray-500 text-sm">Community-rated maps for the best bud.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DestinationsSection />
        
        <MapSection />

        <BlogSection />

        <CTASection />

        {/* Physical FAQ for SEO: Helps rank for "Is it legal" questions */}
        <section className="py-20 bg-black border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-16">Cannabis Travel FAQ</h2>
            <div className="grid gap-8">
              <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                <h3 className="text-green-500 font-bold text-xl mb-3">Is it legal to cross borders with cannabis?</h3>
                <p className="text-gray-400 leading-relaxed">No. Even between legal states or countries, crossing borders with cannabis remains illegal. Always purchase your supplies locally at your destination.</p>
              </div>
              <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                <h3 className="text-green-500 font-bold text-xl mb-3">What qualifies as a 420-friendly stay?</h3>
                <p className="text-gray-400 leading-relaxed">Verified stays are accommodations with clear, official policies allowing cannabis use on-site, in private balconies, or in designated lounge areas.</p>
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
