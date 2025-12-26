import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
// Keep "Above the Fold" components as standard imports for immediate loading
import {
  HeroSection,
  StatsSection,
  DestinationsSection,
  CTASection,
} from "@/components/home";

// Lazy load "Below the Fold" or heavy components
// This improves your Core Web Vitals (specifically LCP and TBT)
const MapSection = lazy(() => import("@/components/home").then((module) => ({ default: module.MapSection })));
const BlogSection = lazy(() => import("@/components/home").then((module) => ({ default: module.BlogSection })));

/**
 * Home Page - Optimized
 * 
 * Improvements made:
 * 1. Performance: Map and Blog sections are code-split (lazy loaded).
 * 2. SEO: Added JSON-LD structured data for "WebSite" and "Organization".
 * 3. Accessibility: Added <main> landmark and fixed skip-link target.
 * 4. Content: Updated Meta tags to target 2025 search intent.
 */
const Home = () => {
  // Structured Data for Google (Rich Results)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BudQuest",
    "url": "https://budquest.guide",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://budquest.guide/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "logo": {
        "@type": "ImageObject",
        "url": "https://budquest.guide/logo.png"
      },
      "description": "The Ultimate Global Cannabis Travel Guide."
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30 flex flex-col">
      {/* 1. SEO Head & Meta Tags */}
      <SEOHead
        title="BudQuest | Global Cannabis Travel Guide & 420 Friendly Stays (2025)"
        description="The #1 guide for cannabis tourism. Find verified legal weed destinations, 420-friendly hotels, dispensary maps, and travel laws for 150+ countries."
        keywords="cannabis travel 2025, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, budquest, dispensary finder"
      />

      {/* 2. Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* 3. Navigation */}
      <Navigation />

      {/* 4. Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:p-2 focus:rounded shadow-lg transition-transform"
      >
        Skip to main content
      </a>

      {/* 5. Main Content Area */}
      <main id="main-content" className="flex-grow">
        
        {/* LCP Critical Path - Loaded Immediately */}
        <HeroSection />
        <StatsSection />
        <DestinationsSection />

        {/* Heavy Components - Loaded Lazily */}
        <Suspense fallback={
          <div className="h-[500px] w-full bg-muted/10 animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Loading Interactive Map...</span>
          </div>
        }>
          <MapSection />
        </Suspense>

        <Suspense fallback={
          <div className="container mx-auto py-12 px-4">
             <div className="h-10 w-48 bg-muted/20 rounded mb-8 animate-pulse" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-80 bg-muted/10 rounded-xl animate-pulse" />
                ))}
             </div>
          </div>
        }>
          <BlogSection />
        </Suspense>

        {/* CTA Section - Fast loading, crucial for conversion */}
        <CTASection />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
