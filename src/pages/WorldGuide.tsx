import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { WorldMap } from "@/components/WorldMap";
import Link from "next/link";

const WorldGuide = () => {
  const regions = [
    {
      slug: "north-america",
      name: "North America",
      countries: 3,
      legalStatus: "Mixed",
      description: "Canada leads with full legalization, Mexico decriminalized, US varies by state",
      image: "/images/regions/north-america.jpg"
    },
    {
      slug: "south-america",
      name: "South America",
      countries: 2,
      legalStatus: "Progressive",
      description: "Uruguay pioneered legalization, several countries decriminalized",
      image: "/images/regions/south-america.jpg"
    },
    {
      slug: "europe",
      name: "Europe",
      countries: 4,
      legalStatus: "Reforming",
      description: "Germany recently legalized, Netherlands famous for coffee shops",
      image: "/images/regions/europe.jpg"
    },
    {
      slug: "africa",
      name: "Africa",
      countries: 1,
      legalStatus: "Private Use",
      description: "South Africa allows private cultivation and use",
      image: "/images/regions/africa.jpg"
    },
    {
      slug: "asia",
      name: "Asia",
      countries: 1,
      legalStatus: "Medical Only",
      description: "Thailand leads medical cannabis, strict elsewhere",
      image: "/images/regions/asia.jpg"
    },
    {
      slug: "oceania",
      name: "Oceania",
      countries: 1,
      legalStatus: "Medical Only",
      description: "Australia has medical program, New Zealand decriminalized",
      image: "/images/regions/oceania.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Global Cannabis Laws
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore cannabis legality across countries worldwide
            </p>
            <SearchBar placeholder="Search countries, cities, or regions..." />
          </div>

          {/* World Map */}
          <div className="mb-16">
            <WorldMap />
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Card key={region.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="secondary" className="text-lg">
                      {region.countries} Countries
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{region.name}</h3>
                  <Badge className="mb-3">{region.legalStatus}</Badge>
                  <p className="text-muted-foreground text-sm mb-4">{region.description}</p>
                  <Link href={`/world/${region.slug}`}>
                    <span className="text-primary hover:text-primary/80 font-medium">
                      View Countries →
                    </span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;
