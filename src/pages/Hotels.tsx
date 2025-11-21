// src/pages/Hotels.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Leaf, ExternalLink, Building } from "lucide-react";
import { useMemo, useState } from "react";

interface Hotel {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: number;
  policies: string;
  website: string;
  flag: string;
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
  },
  // ... other hotels
];

/* -------------------------
   SEO & Structured Data
--------------------------*/
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemPage",
  name: "BudQuest Verified Hotels | Green Globe",
  description: "Book BudQuest-verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises.",
  url: "https://greenglobe.com/hotels",
  mainEntity: HOTELS.map((h, i) => ({
    "@type": "Hotel",
    name: h.name,
    url: h.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: h.city,
      addressRegion: h.state,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: h.rating,
      reviewCount: 1,
    },
    position: i + 1,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "420-friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet-friendly", value: h.policies.includes("Pet") },
    ],
  })),
};

/* -------------------------
   COMPONENTS
--------------------------*/
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
  <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} filled={i <= Math.round(value)} />
    ))}
    <span className="text-xs text-muted-foreground ml-1">{value.toFixed(1)}</span>
  </div>
);

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
        <title>BudQuest Verified Hotels | Green Globe – 420-Friendly Stays</title>
        <meta
          name="description"
          content="Book BudQuest-verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://greenglobe.com/hotels" />
        <meta property="og:title" content="BudQuest Verified Hotels | Green Globe" />
        <meta property="og:description" content="Book BudQuest-verified 420-friendly hotels worldwide. Cannabis policies checked, premium stays, no surprises." />
        <meta property="og:url" content="https://greenglobe.com/hotels" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </head>

      <div className="min-h-screen bg-background text-white">
        <Navigation />

        <main className="pt-24 pb-20 px-4">
          <section className="container mx-auto max-w-7xl">
            {/* HERO */}
            <header className="max-w-3xl mx-auto mb-10 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                BudQuest Verified Hotels
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                420-friendly stays worldwide. Policies verified. Premium experience.
              </p>
            </header>

            {/* SEARCH */}
            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md rounded-lg border border-border p-3 mb-8">
              <div className="relative">
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
              <p className="text-center text-muted-foreground">No hotels match your search.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hotel) => (
                <article
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl flex flex-col border border-border bg-card/50"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <img
                      src={hotel.flag}
                      alt={`Flag of ${hotel.state}`}
                      loading="lazy"
                      className="h-6 w-8 rounded border border-border absolute top-3 left-3"
                    />
                    <Building className="w-10 h-10 text-accent" />
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-semibold text-white line-clamp-1">{hotel.name}</h2>
                      <Badge className="bg-green-600 text-white text-xs flex items-center gap-1">
                        <Leaf className="w-3 h-3" /> Verified
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {hotel.city}, {hotel.state}
                    </p>

                    <StarRating value={hotel.rating} />

                    {hotel.policies && (
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{hotel.policies}</p>
                    )}

                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-foreground mt-auto"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* DISCLAIMER */}
            <section className="mt-12 p-4 bg-card/50 rounded-lg text-xs text-muted-foreground">
              <p>
                <strong>Disclaimer:</strong> All hotels listed are BudQuest-verified for cannabis-friendly policies. 
                Users must comply with local laws regarding cannabis use. Green Globe is not responsible for policy changes or violations.
              </p>
            </section>

            {/* FOOTER STATS */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Verified Hotels", value: filtered.length },
                { label: "Cities Covered", value: new Set(filtered.map((h) => h.city)).size },
                { label: "States", value: new Set(filtered.map((h) => h.state)).size },
                {
                  label: "Avg Rating",
                  value: (filtered.reduce((sum, h) => sum + h.rating, 0) / filtered.length || 0).toFixed(1),
                },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 border-border bg-card/50">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
