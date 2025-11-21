// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, ExternalLink, Search, Building, Globe, Leaf, Info, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* --------------------  DATA  -------------------- */
interface Hotel {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: number;
  policies: string;
  website: string;
  flag: string;
  priceRange?: string;
}

const HOTELS: Hotel[] = [
  {
    id: 1,
    name: "Green Valley Resort",
    city: "Denver",
    state: "CO",
    rating: 4.8,
    policies: "Cannabis consumption allowed in designated areas. Pet-friendly rooms available.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$",
  },
  {
    id: 2,
    name: "Leaf & Rest Boutique",
    city: "Los Angeles",
    state: "CA",
    rating: 4.7,
    policies: "Complimentary smoking lounge. 24-hour room service.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$$",
  },
  {
    id: 3,
    name: "Mountain High Lodge",
    city: "Portland",
    state: "OR",
    rating: 4.9,
    policies: "Private balconies perfect for consumption. Eco-friendly amenities.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$",
  },
  {
    id: 4,
    name: "Urban Chill Hotel",
    city: "Seattle",
    state: "WA",
    rating: 4.6,
    policies: "420-friendly suites with premium ventilation systems.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$$",
  },
  {
    id: 5,
    name: "Pacific Retreat",
    city: "San Francisco",
    state: "CA",
    rating: 4.8,
    policies: "Rooftop lounge for guests. Wellness packages available.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$$",
  },
  {
    id: 6,
    name: "Desert Oasis Inn",
    city: "Phoenix",
    state: "AZ",
    rating: 4.5,
    policies: "Poolside relaxation zones. Cannabis concierge service.",
    website: "https://example.com",
    flag: "https://flagcdn.com/w40/us.png",
    priceRange: "$$",
  },
];

/* --------------------  SEO  -------------------- */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BudQuest Verified 420-Friendly Hotels | Green Globe",
  description:
    "Book BudQuest-verified 420-friendly hotels worldwide. Cannabis policies checked, star-rated, premium stays, no surprises.",
  url: "https://greenglobe.com/hotels",
  mainEntity: [
    {
      "@type": "ItemList",
      itemListElement: HOTELS.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": ["Hotel", "LodgingBusiness"],
          name: h.name,
          image: h.flag,
          address: {
            "@type": "PostalAddress",
            addressLocality: h.city,
            addressRegion: h.state,
            addressCountry: "US",
          },
          url: h.website,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: h.rating,
            reviewCount: 1,
          },
          priceRange: h.priceRange || "$$",
          amenityFeature: {
            "@type": "LocationFeatureSpecification",
            name: "Cannabis Consumption Allowed",
            value: true,
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are these hotels really 420-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every hotel is manually verified by our BudQuest team and displays a ‘BudQuest Verified’ badge.",
          },
        },
        {
          "@type": "Question",
          name: "Can I smoke in my room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Policies vary by property. Each card lists the exact consumption rules for that hotel.",
          },
        },
        {
          "@type": "Question",
          name: "Do you cover countries outside the USA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely—use our World Guide for verified stays in Canada, Netherlands, Germany, Thailand and more.",
          },
        },
      ],
    },
  ],
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-4 h-4 ${filled ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} filled={i <= Math.round(value)} />
    ))}
    <span className="text-xs text-muted-foreground ml-1">{value.toFixed(1)}</span>
  </div>
);

/* --------------------  COMPONENT  -------------------- */
const Hotels = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return HOTELS;
    return HOTELS.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.state.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <head>
        <title>BudQuest Verified 420-Friendly Hotels | Green Globe</title>
        <meta name="description" content="Book BudQuest-verified 420-friendly hotels worldwide. Cannabis policies checked, star-rated, premium stays, no surprises." />
        <meta name="keywords" content="420 friendly hotels, cannabis hotels, BudQuest verified, Green Globe, marijuana accommodation, weed friendly stays" />
        <link rel="canonical" href="https://greenglobe.com/hotels" />

        <meta property="og:title" content="BudQuest Verified 420-Friendly Hotels | Green Globe" />
        <meta property="og:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <meta property="og:image" content="https://greenglobe.com/og-hotels.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BudQuest Verified 420-Friendly Hotels | Green Globe" />
        <meta name="twitter:description" content="Book verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta name="twitter:image" content="https://greenglobe.com/og-hotels.jpg" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* HERO – semantic h1 */}
            <section className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">BudQuest Verified Hotels</h1>
              <p className="text-sm sm:text-base text-muted-foreground">420-friendly stays worldwide. Policies checked, premium experience.</p>
            </section>

            {/* STATIC SEARCH – no sticky, sits right under hero */}
            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search hotels, cities, states..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Search hotels"
                />
              </div>
            </div>

            {/* RESULTS */}
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground">No hotels match your search.</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hotel) => (
                <article
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl flex flex-col border border-border bg-card/50 hover:bg-card/80"
                  itemScope
                  itemType="https://schema.org/Hotel"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <img
                      src={hotel.flag}
                      alt={`Flag of ${hotel.state}`}
                      loading="lazy"
                      className="h-6 w-8 rounded border border-border absolute top-3 left-3"
                      itemProp="image"
                    />
                    <Building className="w-10 h-10 text-accent" />
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-white line-clamp-1" itemProp="name">
                        {hotel.name}
                      </h3>
                      <Badge className="bg-green-600 text-white text-xs flex items-center gap-1" itemProp="award">
                        <Leaf className="w-3 h-3" />
                        BudQuest Verified
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <span itemProp="addressLocality">{hotel.city}</span>, <span itemProp="addressRegion">{hotel.state}</span>
                    </p>

                    <StarRating value={hotel.rating} />

                    {hotel.policies && (
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1" itemProp="description">
                        {hotel.policies}
                      </p>
                    )}

                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-foreground mt-auto"
                      itemProp="url"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* FOOTER STATS */}
            <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Verified Hotels", value: filtered.length },
                { label: "Cities Covered", value: new Set(filtered.map((h) => h.city)).size },
                { label: "States", value: new Set(filtered.map((h) => h.state)).size },
                { label: "Avg Rating", value: (filtered.reduce((sum, h) => sum + h.rating, 0) / filtered.length || 0).toFixed(1) },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 border-border bg-card/50">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </section>

            {/* DISCLAIMER – collapsible, mobile-friendly */}
            <section className="mt-12">
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Legal Disclaimer
                    </span>
                    <ChevronDown className="w-4 h-4 ui-open:rotate-180 transition-transform" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="p-4 bg-card/50 border-border mt-2">
                    <p className="text-xs text-muted-foreground">
                      Green Globe is an informational resource only. We do not provide legal advice. Always confirm current local laws and hotel policies before booking or consuming cannabis. International transport remains illegal.
                    </p>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </section>

            {/* INTERNAL LINKS FOR CRAWLERS */}
            <nav className="mt-10 text-center text-sm text-muted-foreground">
              Explore more:{" "}
              <Link to="/usa" className="text-accent hover:underline">
                USA Guide
              </Link>{" "}
              •{" "}
              <Link to="/world" className="text-accent hover:underline">
                World Guide
              </Link>
            </nav>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
