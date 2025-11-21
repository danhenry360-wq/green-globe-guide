import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";

interface City {
  name: string;
  slug: string;
}

interface Country {
  slug: string;
  name: string;
  region: string;
  legalStatus: string;
  description: string;
  cities: City[];
  image: string;
}

const COUNTRIES: Country[] = [
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    legalStatus: "Recreational",
    description: "Fully legal nationwide since 2018. Adults can possess up to 30g in public.",
    cities: [
      { name: "Toronto", slug: "toronto" },
      { name: "Vancouver", slug: "vancouver" },
      { name: "Montreal", slug: "montreal" },
    ],
    image: "/dest-4.jpg",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
    legalStatus: "Decriminalized",
    description: "Famous coffee shop culture. Possession of small amounts tolerated, not fully legal.",
    cities: [
      { name: "Amsterdam", slug: "amsterdam" },
      { name: "Rotterdam", slug: "rotterdam" },
      { name: "The Hague", slug: "the-hague" },
    ],
    image: "/dest-3.jpg",
  },
  {
    slug: "uruguay",
    name: "Uruguay",
    region: "South America",
    legalStatus: "Recreational",
    description: "World's first country to fully legalize cannabis in 2013. Pharmacy sales available.",
    cities: [
      { name: "Montevideo", slug: "montevideo" },
      { name: "Punta del Este", slug: "punta-del-este" },
      { name: "Colonia", slug: "colonia" },
    ],
    image: "/dest-5.jpg",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    legalStatus: "Medical",
    description: "Decriminalized in 2022. Medical use widely available, recreational in grey area.",
    cities: [
      { name: "Bangkok", slug: "bangkok" },
      { name: "Phuket", slug: "phuket" },
      { name: "Chiang Mai", slug: "chiang-mai" },
    ],
    image: "/dest-6.jpg",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    legalStatus: "Recreational",
    description: "Legalized in 2024. Adults can possess up to 25g and grow 3 plants at home.",
    cities: [
      { name: "Berlin", slug: "berlin" },
      { name: "Munich", slug: "munich" },
      { name: "Hamburg", slug: "hamburg" },
    ],
    image: "/dest-1.jpg",
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europe",
    legalStatus: "Decriminalized",
    description: "All drugs decriminalized since 2001. Possession for personal use is an administrative offense.",
    cities: [
      { name: "Lisbon", slug: "lisbon" },
      { name: "Porto", slug: "porto" },
      { name: "Faro", slug: "faro" },
    ],
    image: "/dest-2.jpg",
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    legalStatus: "Decriminalized",
    description: "Private use and cultivation legal. Cannabis clubs operate in grey area.",
    cities: [
      { name: "Barcelona", slug: "barcelona" },
      { name: "Madrid", slug: "madrid" },
      { name: "Valencia", slug: "valencia" },
    ],
    image: "/dest-3.jpg",
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "North America",
    legalStatus: "Decriminalized",
    description: "Supreme Court ruled prohibition unconstitutional. Small amounts decriminalized.",
    cities: [
      { name: "Mexico City", slug: "mexico-city" },
      { name: "Cancun", slug: "cancun" },
      { name: "Guadalajara", slug: "guadalajara" },
    ],
    image: "/dest-4.jpg",
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Africa",
    legalStatus: "Decriminalized",
    description: "Private use and cultivation legal since 2018. Public consumption still prohibited.",
    cities: [
      { name: "Cape Town", slug: "cape-town" },
      { name: "Johannesburg", slug: "johannesburg" },
      { name: "Durban", slug: "durban" },
    ],
    image: "/dest-5.jpg",
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    region: "Caribbean",
    legalStatus: "Decriminalized",
    description: "Decriminalized in 2015. Medical marijuana and Rastafarian sacramental use legal.",
    cities: [
      { name: "Kingston", slug: "kingston" },
      { name: "Montego Bay", slug: "montego-bay" },
      { name: "Negril", slug: "negril" },
    ],
    image: "/dest-6.jpg",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Recreational":
      return "bg-green-500/90 text-white";
    case "Medical":
      return "bg-blue-500/90 text-white";
    case "Decriminalized":
      return "bg-amber-500/90 text-white";
    default:
      return "bg-red-500/90 text-white";
  }
};

const WorldGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Global Cannabis Laws
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore cannabis legality across 10 popular countries worldwide
            </p>
          </motion.div>

          {/* Interactive World Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 max-w-6xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-accent/10 bg-black/40 backdrop-blur-sm p-4">
              <InteractiveWorldMap />
            </div>
          </motion.div>

          {/* Country Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNTRIES.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all group h-full">
                  {/* Image */}
                  <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                      className={`absolute top-4 right-4 ${getStatusColor(
                        country.legalStatus
                      )} border-none`}
                    >
                      {country.legalStatus}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                          {country.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {country.region}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {country.description}
                    </p>

                    {/* Cities */}
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Popular Cities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {country.cities.map((city) => (
                          <Link
                            key={city.slug}
                            to={`/world/${country.slug}/${city.slug}`}
                            className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;
