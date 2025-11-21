import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import WORLD_DATA from "@/data/world_data_top7"; // adjust path if needed
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

/**
 * WorldGuide.jsx
 * - Searchable country + city index
 * - Mobile-first responsive grid
 * - SEO friendly headings
 */

const CountryCard = ({ country }) => {
  return (
    <Link to={`/world/${country.slug}`} className="block">
      <Card className="h-full p-4 hover:scale-[1.02] transform-gpu transition duration-200">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold">{country.name}</h3>
            <Badge className="uppercase text-xs">{country.status}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{country.subtitle}</p>

          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <div>{country.cities.length} cities</div>
            <div className="text-right">
              <div className="font-medium">Possession</div>
              <div className="mt-1">{country.possession_limits ?? "Varies"}</div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const WorldGuide = () => {
  const [query, setQuery] = useState("");

  // flatten for quick search
  const flatIndex = useMemo(() => {
    const rows = [];
    WORLD_DATA.forEach((c) => {
      rows.push({ type: "country", name: c.name, slug: c.slug, country: c });
      c.cities.forEach((city) =>
        rows.push({ type: "city", name: city.name, slug: city.slug, country: c })
      );
    });
    return rows;
  }, []);

  const filteredCountries = useMemo(() => {
    if (!query.trim()) return WORLD_DATA;
    const q = query.toLowerCase();
    // search by country or city name
    const matchedCountrySlugs = new Set();
    flatIndex.forEach((row) => {
      if (row.name.toLowerCase().includes(q)) matchedCountrySlugs.add(row.country.slug);
    });
    return WORLD_DATA.filter((c) => matchedCountrySlugs.has(c.slug));
  }, [query, flatIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Cannabis Guide — World Map & Country Laws</title>
        <meta name="description" content="Educational world cannabis travel guide: country rules, city guides, and travel awareness." />
      </Helmet>

      <Navigation />

      {/* Hero */}
      <header className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Global Cannabis Guide</h1>
          <p className="text-sm md:text-lg text-muted-foreground">Educational country & city guides: laws, travel rules and cultural context. Information is for reference only.</p>

          <div className="mt-6">
            <div className="mx-auto max-w-2xl">
              <label htmlFor="search" className="sr-only">Search countries or cities</label>
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or city — e.g. Germany, Berlin"
                className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border/50 placeholder:text-muted-foreground focus:ring-4 focus:ring-accent/20"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Countries grid */}
      <main className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <section aria-label="Countries" className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((country) => (
                <CountryCard key={country.id} country={country} />
              ))}
            </div>
          </section>

          {/* Quick links for cities (mobile friendly) */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-3">Quick jump to cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WORLD_DATA.flatMap((country) =>
                country.cities.map((city) => (
                  <Link
                    key={`${country.slug}-${city.slug}`}
                    to={`/world/${country.slug}/${city.slug}`}
                    className="block p-3 rounded-lg bg-card/30 hover:bg-card/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-xs text-muted-foreground">{country.name} • {city.type}</div>
                      </div>
                      <div className="text-xs text-accent">Open</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorldGuide;
