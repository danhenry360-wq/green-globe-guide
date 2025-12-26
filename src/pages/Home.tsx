import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead"; 
import { Button } from "@/components/ui/button";
import { ShieldCheck, Map as MapIcon, Leaf, Star, CheckCircle2, Locate } from "lucide-react";

// Standard components from your project
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
        "url": "https://budquest.guide",
        "description": "The Ultimate Colorado Cannabis Travel Hub and Global Legal Guide."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where can I find BudQuest Verified cannabis rentals in Colorado?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BudQuest features a comprehensive Colorado Hub covering 63 cities with verified 420-friendly rentals, dispensaries, and tours."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30 overflow-x-hidden">
      <SEOHead
        title="BudQuest | Colorado Cannabis Hub & Global Travel Laws (2025)"
        description="Explore our Colorado Hub with 63+ city guides, verified 420-friendly rentals, and dispensary maps. Plus, legal travel laws for destinations worldwide."
      />

      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <Navigation />

      <main id="main-content" className="flex-grow">
        
        {/* HERO SECTION - Original Dashboard Layout */}
        <HeroSection />

        <StatsSection />

        {/* FLAGSHIP SECTION: THE COLORADO HUB (Drives the most clicks) */}
        <section className="py-24 bg-gradient-to-b from-transparent to-card/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                  <Locate size={18} /> Our Flagship Destination
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  The Colorado <span className="text-white">Hub</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Navigate the most detailed cannabis travel guide in the state. From Denver to the smallest mountain towns, we cover 63+ cities with verified data.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-card/50 p-4 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-1">63 Cities</h4>
                    <p className="text-xs text-muted-foreground">Full local guides</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-1">Verified</h4>
                    <p className="text-xs text-muted-foreground">Stays & Dispensaries</p>
                  </div>
                </div>
                <div className="pt-6">
                  <Link to="/destinations/colorado">
                    <Button className="bg-primary text-black font-bold hover:bg-primary/90 h-12 px-8 rounded-full">
                      Explore Colorado Cities
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* This represents your Colorado focus visually */}
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                 <div className="h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <img src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?q=80&w=600&auto=format&fit=crop" alt="Colorado" className="w-full h-full object-cover" />
                 </div>
                 <div className="h-64 rounded-3xl mt-12 overflow-hidden shadow-2xl border border-white/10">
                    <img src="https://images.unsplash.com/photo-1617201928373-f117f39ca688?q=80&w=600&auto=format&fit=crop" alt="Denver" className="w-full h-full object-cover" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS: BUDQUEST VERIFIED BADGE EXPLAINER */}
        <section className="py-20 bg-card border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-primary mb-4">BudQuest Verified</h2>
               <p className="text-muted-foreground">When you see our gold check badge, you're looking at a verified partner.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="text-primary h-12 w-12" />
                <h3 className="text-white font-bold text-xl">420 Friendly Stays</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Manually vetted rentals that officially permit consumption on-site.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <Star className="text-primary h-12 w-12" />
                <h3 className="text-white font-bold text-xl">Top Dispensaries</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Community-rated hubs with the highest quality product and service standards.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <MapIcon className="text-primary h-12 w-12" />
                <h3 className="text-white font-bold text-xl">Verified Tours</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Premium grow-room visits and lounge crawls led by reputable operators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DESTINATIONS: SKELETON LAWS SECTION (Low-friction clicks for laws) */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-primary tracking-tight">Legal Travel Guides</h2>
                <p className="text-muted-foreground mt-2">Possession limits and travel laws for trending destinations.</p>
              </div>
              <Link to="/destinations">
                <Button variant="link" className="text-primary font-bold p-0">All Destinations →</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "California", path: "/destinations/california", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600" },
                { name: "Illinois", path: "/destinations/illinois", img: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=600" },
                { name: "Thailand", path: "/destinations/thailand", img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?q=80&w=600" },
                { name: "Germany", path: "/destinations/germany", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600" }
              ].map((dest) => (
                <Link to={dest.path} key={dest.name} className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 transition-all hover:scale-[1.02]">
                  <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Laws & Limits</p>
                    <h4 className="text-xl font-bold text-white">{dest.name}</h4>
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

        {/* FOOTER FAQ: Optimized for Clicks & Colorado Hub prominence */}
        <section className="py-20 bg-background border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-primary mb-12">Travel Intelligence FAQ</h2>
            <div className="grid gap-8 text-left">
              <div className="bg-card/50 p-8 rounded-2xl border border-white/5">
                <h3 className="text-primary font-bold text-xl mb-3">How does BudQuest verify rentals?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We manually confirm consumption policies with host operators in our Colorado Hub and across the US to ensure consumption is permitted on balconies or in private gardens. Look for the BudQuest Verified badge.
                </p>
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
