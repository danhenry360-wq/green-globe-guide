import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead"; 
import { Button } from "@/components/ui/button";
import { ShieldCheck, Map as MapIcon, Leaf, Star } from "lucide-react";

// --- IMAGE ASSETS ---
// Ensure these images are in your src/assets folder
import heroImage from "@/assets/hero-rottweiler.jpg"; // Placeholder if needed
import ilImage from "@/assets/illinois-420-rental.jpg"; 
import paImage from "@/assets/pennsylvania-dispensary.jpg";
import thaiImage from "@/assets/thailand-cannabis-tour.jpg";
import caImage from "@/assets/california-weed-tour.jpg";

// Standard components
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  MapSection,
  BlogSection,
  CTASection,
} from "@/components/home";

const Home: React.FC = () => {
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
            "name": "Where can I find 420-friendly tours and rentals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BudQuest features a dedicated directory of cannabis tours, verified 420-friendly rentals, and legal dispensary maps across the US and Thailand."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-green-500/30 overflow-x-hidden">
      <SEOHead
        title="BudQuest | 420-Friendly Rentals, Dispensary Maps & Cannabis Tours (2025)"
        description="The ultimate global guide for legal cannabis travel. Find 420-friendly hotels, weed tours, and dispensary guides in Chicago, Philly, Thailand, and beyond."
        keywords="cannabis tours 2025, 420 friendly rentals, dispensary finder, weed travel guide, marijuana tourism, budquest tours"
      />

      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <Navigation />

      <main id="main-content" className="flex-grow">
        
        <HeroSection />

        <StatsSection />

        {/* TRENDING DESTINATIONS - Optimized with REAL 420 assets */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Trending Destinations</h2>
                <p className="text-gray-400 mt-2 text-lg">Elite 420 rentals, local dispensaries, and verified cannabis tours.</p>
              </div>
              <Link to="/tours">
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold">
                  Browse All Tours →
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  name: "Illinois", 
                  path: "/rottweiler-puppies-in-illinois", 
                  img: ilImage,
                  category: "420 Rental",
                  label: "Chicago Stays"
                },
                { 
                  name: "Pennsylvania", 
                  path: "/rottweiler-puppies-in-pennsylvania", 
                  img: paImage,
                  category: "Dispensary Guide",
                  label: "Philly's Best"
                },
                { 
                  name: "Thailand", 
                  path: "/destinations/thailand", 
                  img: thaiImage,
                  category: "Elite Tour",
                  label: "Bangkok Highs"
                },
                { 
                  name: "California", 
                  path: "/rottweiler-puppies-in-california", 
                  img: caImage,
                  category: "Canna-Tourism",
                  label: "Legacy Farms"
                }
              ].map((dest) => (
                <Link to={dest.path} key={dest.name} className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/10">
                  <img 
                    src={dest.img} 
                    alt={`${dest.name} cannabis ${dest.category}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-green-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                      {dest.category}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8">
                    <p className="text-gray-400 text-sm font-medium mb-1">{dest.label}</p>
                    <h4 className="text-3xl font-bold text-white tracking-tight">{dest.name}</h4>
                    <div className="mt-4 flex items-center gap-1 text-green-500">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <span className="text-white text-xs ml-2 opacity-70">Verified Guide</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGIC CONVERSION SIGNALS */}
        <section className="py-20 bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 group hover:border-green-500/30 transition-colors">
                <ShieldCheck className="text-green-500 h-10 w-10 mb-6" />
                <h3 className="text-white font-bold text-xl mb-3">Verified 420 Stays</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">We manually verify every rental to ensure consumption is officially permitted on balconies or private lounges.</p>
                <Link to="/rentals" className="text-green-500 text-sm font-bold hover:underline">Find a Rental →</Link>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 group hover:border-green-500/30 transition-colors">
                <MapIcon className="text-green-500 h-10 w-10 mb-6" />
                <h3 className="text-white font-bold text-xl mb-3">Cannabis Tours</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Book curated tours including grow-room visits, consumption lounges, and premium dispensary crawls.</p>
                <Link to="/tours" className="text-green-500 text-sm font-bold hover:underline">View Tour Listings →</Link>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 group hover:border-green-500/30 transition-colors">
                <Leaf className="text-green-500 h-10 w-10 mb-6" />
                <h3 className="text-white font-bold text-xl mb-3">Local Bud Guides</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Real-time data on the best dispensaries and social clubs in legal territories updated for 2025.</p>
                <Link to="/destinations" className="text-green-500 text-sm font-bold hover:underline">Explore Maps →</Link>
              </div>
            </div>
          </div>
        </section>

        <DestinationsSection />
        
        <MapSection />

        <BlogSection />

        <CTASection />

        {/* SEO FAQ SECTION */}
        <section className="py-24 bg-black border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-16">Cannabis Travel FAQ</h2>
            <div className="grid gap-8">
              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5">
                <h3 className="text-green-500 font-bold text-xl mb-3 text-center md:text-left">What are BudQuest Tours?</h3>
                <p className="text-gray-400 leading-relaxed text-center md:text-left">BudQuest Tours are verified cannabis experiences. From luxury bus crawls in Chicago to mountain grow visits in Thailand, we list the most reputable tour operators in the space.</p>
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
