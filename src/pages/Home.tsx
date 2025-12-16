// src/pages/Home.tsx
// Homepage - Refactored to use modular section components

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  MapSection,
  BlogSection,
  CTASection,
} from "@/components/home";

/**
 * Home Page
 * 
 * The main landing page for BudQuest - a global cannabis travel guide.
 * Composed of modular section components for maintainability.
 * 
 * Sections:
 * 1. Hero - Search bar, branding, quick navigation
 * 2. Stats - Dynamic counts (countries, dispensaries, hotels)
 * 3. Destinations - Featured travel destinations
 * 4. Map - Interactive global cannabis legality map
 * 5. Blog - Latest travel guides and news
 * 6. CTA - Call to action
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      {/* SEO Meta Tags */}
      <SEOHead
        title="BudQuest | The Ultimate Global Cannabis Travel Guide"
        description="Plan your 420-friendly vacation with BudQuest. Verified cannabis laws, legal weed destinations, dispensary finders, and travel guides for 150+ countries."
        keywords="cannabis travel, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, budquest"
      />

      {/* Navigation */}
      <Navigation />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:p-2 focus:rounded"
      >
        Skip to main content
      </a>

      {/* Page Sections */}
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <MapSection />
      <BlogSection />
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
