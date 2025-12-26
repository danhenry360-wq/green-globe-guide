import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead"; 
import { Button } from "@/components/ui/button";
import { ShieldCheck, Map as MapIcon, Leaf, Star, Ticket } from "lucide-react";

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
            "name": "How do I book a cannabis tour?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can browse our verified cannabis tour listings on the BudQuest Tours page, featuring grow-ops, dispensary crawls, and consumption lounges."
            }
          }
        ]
      }
    ]
  };

  const trendingItems = [
    { 
      name: "Illinois", 
      path: "/rottweiler-puppies-in-illinois", 
      img: "https://images.unsplash.com/photo-1556038024-07f78303cb44?q=80&w=600&auto=format&fit=crop",
      category: "420 Rental",
      label: "Chicago High-Rises"
    },
    { 
      name: "Pennsylvania", 
      path: "/rottweiler-puppies-in-pennsylvania", 
      img: "https://images.unsplash.com/photo-1617201928373-f117f39ca688?q=80&w=600&auto=format&fit=crop",
      category: "Dispensary Guide",
      label: "Keystone Strains"
    },
    { 
      name: "Thailand", 
      path: "/destinations/thailand", 
      img: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=600&auto=format&fit=crop",
      category: "Cannabis Tour",
      label: "Phuket Farm Visits"
    },
    { 
      name: "California", 
      path: "/rottweiler-puppies-in-california", 
      img: "https://images.unsplash.com/photo-1534349735244-2694526f0d6e?q=80&w=600&auto=format&fit=crop",
      category: "Elite Tour",
      label: "Humboldt Legacy"
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-green-500/30 overflow-x-hidden">
      <SEOHead
        title="BudQuest | Cannabis Tours, 420-Friendly Rentals & Dispensaries (2025)"
        description="The premier global guide for legal cannabis travel. Book 420-friendly stays, explore verified dispensary maps, and join elite cannabis tours."
      />

      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <Navigation />

      <main id="main-content" className="flex-grow">
        
        {/* 1. HERO - Restored to your original dashboard vibe */}
        <HeroSection />

        {/* 2. STATS */}
        <StatsSection />

        {/* 3. TRENDING HOTSPOTS - Optimized for click-intent */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
                  Trending <span className="text-green-500">Hotspots</span>
                </h2>
                <p className="text-gray-500 mt-2 text-lg">Elite rentals and verified cannabis experiences.</p>
              </div>
              <Link to="/tours">
                <Button variant="outline" className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black font-black uppercase tracking-tighter">
                  <Ticket className="mr-2 h-4 w-4" /> View Tour Listings
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingItems.map((dest) => (
                <Link to={dest.path} key={dest.name} className="group relative h-[400px] rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
                  <img 
                    src={dest.img} 
                    alt={dest.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter shadow-xl">
                      {dest.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6">
                    <p className="text-green-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{dest.label}</p>
                    <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{dest.name}</h4>
                    <div className="mt-3 flex items-center gap-1 text-yellow-500">
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <span className="text-gray-400 text-[10px] ml-2 font-bold uppercase">Verified Guide</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. UTILITY SIGNALS - Driving users to your Tours & Rentals */}
        <section className="py-16 bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col gap-4">
                <ShieldCheck className="text-green-500 h-10 w-10" />
                <h3 className="text-white font-black uppercase italic tracking-tighter text-xl">Verified Stays</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Manually vetted 420 rentals where consumption is officially allowed.</p>
                <Link to="/rentals" className="text-green-500 text-xs font-black uppercase hover:underline tracking-widest">Find a Stay →</Link>
              </div>

              <div className="flex flex-col gap-4 border-l border-white/5 md:pl-10">
                <MapIcon className="text-green-500 h-10 w-10" />
                <h3 className="text-white font-black uppercase italic tracking-tighter text-xl">Cannabis Tours</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Book elite grow-op visits, VIP consumption lounges, and social club crawls.</p>
                <Link to="/tours" className="text-green-500 text-xs font-black uppercase hover:underline tracking-widest">Book a Tour →</Link>
              </div>

              <div className="flex flex-col gap-4 border-l border-white/5 md:pl-10">
                <Leaf className="text-green-500 h-10 w-10" />
                <h3 className="text-white font-black uppercase italic tracking-tighter text-xl">Bud Guides</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Real-time legal maps and dispensary ratings for over 150 global destinations.</p>
                <Link to="/destinations" className="text-green-500 text-xs font-black uppercase hover:underline tracking-widest">View Maps →</Link>
              </div>
            </div>
          </div>
        </section>

        <DestinationsSection />
        <MapSection />
        <BlogSection />
        <CTASection />

        {/* 5. SEO FOOTER FAQ */}
        <section className="py-20 bg-black border-t border-white/5">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-black text-white uppercase italic mb-8">Travel Intelligence FAQ</h2>
            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 text-left">
              <h3 className="text-green-500 font-bold mb-2 uppercase text-sm tracking-widest">What are BudQuest Tours?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">BudQuest Tours are verified, premium cannabis experiences. We connect travelers with reputable operators for grow-facility tours, dispensary transportation, and private consumption events.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
