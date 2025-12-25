import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Search, ArrowLeft, X,
  Mountain, Sun, Wheat, Building2, ChevronRight, Map, Star, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import StateCard from "@/components/StateCard";
import { USA_STATE_DATA, USA_GUIDE_LAST_UPDATED } from "@/lib/usa_state_data";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   DATA CONFIGURATION
----------------------------------------------------- */

const REGIONS = [
  {
    id: 'West',
    name: 'The West',
    description: 'Pacific Coast, Rockies & Desert',
    count: '13 states',
    icon: Mountain,
  },
  {
    id: 'Midwest',
    name: 'The Midwest',
    description: 'Great Lakes & Great Plains',
    count: '12 states',
    icon: Wheat,
  },
  {
    id: 'South',
    name: 'The South',
    description: 'Deep South, Texas & Florida',
    count: '17 jurisdictions',
    icon: Sun,
  },
  {
    id: 'Northeast',
    name: 'The Northeast',
    description: 'New England & Mid-Atlantic',
    count: '9 states',
    icon: Building2,
  }
];

const STATE_TO_REGION: Record<string, string> = {
  'Alabama': 'South', 'Alaska': 'West', 'Arizona': 'West', 'Arkansas': 'South',
  'California': 'West', 'Colorado': 'West', 'Connecticut': 'Northeast', 'Delaware': 'South',
  'District of Columbia': 'South', 'Florida': 'South', 'Georgia': 'South', 'Hawaii': 'West',
  'Idaho': 'West', 'Illinois': 'Midwest', 'Indiana': 'Midwest', 'Iowa': 'Midwest',
  'Kansas': 'Midwest', 'Kentucky': 'South', 'Louisiana': 'South', 'Maine': 'Northeast',
  'Maryland': 'South', 'Massachusetts': 'Northeast', 'Michigan': 'Midwest', 'Minnesota': 'Midwest',
  'Mississippi': 'South', 'Missouri': 'Midwest', 'Montana': 'West', 'Nebraska': 'Midwest',
  'Nevada': 'West', 'New Hampshire': 'Northeast', 'New Jersey': 'Northeast', 'New Mexico': 'West',
  'New York': 'Northeast', 'North Carolina': 'South', 'North Dakota': 'Midwest', 'Ohio': 'Midwest',
  'Oklahoma': 'South', 'Oregon': 'West', 'Pennsylvania': 'Northeast', 'Rhode Island': 'Northeast',
  'South Carolina': 'South', 'South Dakota': 'Midwest', 'Tennessee': 'South', 'Texas': 'South',
  'Utah': 'West', 'Vermont': 'Northeast', 'Virginia': 'South', 'Washington': 'West',
  'West Virginia': 'South', 'Wisconsin': 'Midwest', 'Wyoming': 'West'
};

/* ----------------------------------------------------
   SUB-COMPONENTS
----------------------------------------------------- */

// Search Results View - Shows matching states from any region
const SearchResults = ({
  query,
  onClear
}: {
  query: string;
  onClear: () => void;
}) => {
  const filteredStates = useMemo(() => {
    return USA_STATE_DATA.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-40 pb-12" aria-label="Search Results">
      <Button
        variant="ghost"
        onClick={onClear}
        className="mb-6 gap-2 pl-0 hover:bg-transparent"
      >
        <X className="w-4 h-4" /> Clear search
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          Search Results
        </h1>
        <p className="text-lg text-muted-foreground">
          {filteredStates.length} state{filteredStates.length !== 1 ? 's' : ''} found for "{query}"
        </p>
      </motion.div>

      {filteredStates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((state) => (
            <motion.div
              key={state.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <StateCard state={state} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Map className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No states found</h3>
          <p className="text-muted-foreground">
            Try a different search term or browse by region.
          </p>
        </div>
      )}
    </section>
  );
};

// Region Index (Browse mode)
const RegionIndex = ({ onSelect }: { onSelect: (id: string) => void }) => {
  // Popular states for internal linking
  const popularStates = [
    { name: "Colorado", path: "/colorado", emoji: "🏔️" },
    { name: "California", path: "/usa/california", emoji: "🌴" },
    { name: "Nevada", path: "/usa/nevada", emoji: "🎰" },
    { name: "Oregon", path: "/usa/oregon", emoji: "🌲" },
    { name: "Michigan", path: "/usa/michigan", emoji: "🌊" },
    { name: "New York", path: "/usa/new-york", emoji: "🗽" },
  ];

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-40 pb-12" aria-label="USA Regions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-3">
          <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            Is Weed Legal in Your State? (2025)
          </span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Complete guide to recreational & medical marijuana laws in all 50 states. Find dispensaries, purchase limits, and 420-friendly hotels.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground/60">
          <Badge variant="outline" className="text-[10px] font-normal">Updated Weekly</Badge>
          <span>•</span>
          <span>Last verified: {new Date(USA_GUIDE_LAST_UPDATED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Quick Links to Popular States */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-sm text-muted-foreground">Popular:</span>
          {popularStates.map((state) => (
            <Link
              key={state.name}
              to={state.path}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-400 text-sm font-medium transition-colors border border-green-500/20"
            >
              <span>{state.emoji}</span>
              <span>{state.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Featured State Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <Link to="/colorado" aria-label="Visit Colorado Cannabis Hub">
          <Card className="relative overflow-hidden rounded-2xl border-accent/30 bg-gradient-to-r from-accent/10 via-card to-accent/5 hover:border-accent/50 transition-all group">
            <div aria-hidden="true" className="absolute inset-0 bg-[url('/dest-2.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Star className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">Featured Hub</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Recreational Legal</Badge>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    Colorado Cannabis Travel Hub
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete guide: Purchase limits, 420-friendly hotels, and top dispensaries.
                  </p>
                </div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
                Explore Colorado
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </Link>
      </motion.div>

      {/* Region Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {REGIONS.map((region) => (
          <motion.div
            key={region.id}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "group relative rounded-2xl border border-white/10",
              "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
              "p-6 shadow-lg hover:shadow-green-400/20 transition-shadow cursor-pointer"
            )}
            onClick={() => onSelect(region.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(region.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              <region.icon className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold">{region.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {region.count}
            </p>
            <p className="text-sm font-medium mt-2 text-muted-foreground/80">
              {region.description}
            </p>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover:text-white transition" />
          </motion.div>
        ))}
      </div>

      {/* SEO Content Block */}
      <div className="bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">US Marijuana Laws 2025: State-by-State Guide</h2>
        <div className="prose prose-invert prose-green max-w-none text-muted-foreground">
          <p className="mb-4">
            As of 2025, <strong>24 states plus D.C.</strong> have legalized recreational marijuana, while <strong>38 states</strong> allow medical cannabis. However, marijuana remains federally illegal, making interstate transport a federal crime—even between two legal states.
          </p>
          <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Best States for Cannabis Tourism</h3>
          <p className="mb-4">
            <Link to="/colorado" className="text-green-400 hover:underline">Colorado</Link> pioneered recreational legalization and offers the most mature tourism infrastructure with <Link to="/blog/denver-dispensaries" className="text-green-400 hover:underline">hundreds of dispensaries in Denver</Link> and <Link to="/blog/breckenridge-stays" className="text-green-400 hover:underline">420-friendly mountain stays</Link>. <strong>California</strong>, <strong>Nevada</strong> (Las Vegas), and <strong>Oregon</strong> also welcome cannabis tourists.
          </p>
          <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Important: Federal Land Warning</h3>
          <p className="mb-4">
            <strong className="text-amber-400">Warning:</strong> National parks, forests, and federal buildings follow federal law where marijuana is <strong>strictly illegal</strong>. This includes ski resorts on federal land, military bases, and airports (TSA follows federal law).
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/colorado" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 font-medium transition-colors">
              <Map className="w-4 h-4" />
              Colorado Hub
            </Link>
            <Link to="/world" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 font-medium transition-colors">
              <Map className="w-4 h-4" />
              World Guide
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 font-medium transition-colors">
              <ArrowRight className="w-4 h-4" />
              Travel Tips
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// State Index (Within a region)
const StateIndex = ({ regionId, onBack }: { regionId: string; onBack: () => void }) => {
  const region = REGIONS.find(r => r.id === regionId);

  const statesInRegion = useMemo(() => {
    return USA_STATE_DATA.filter(state => STATE_TO_REGION[state.name] === regionId);
  }, [regionId]);

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-40 pb-12" aria-label={`${region?.name} States`}>
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2 pl-0 hover:bg-transparent"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Regions
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          {region?.name} Cannabis Laws
        </h1>
        <p className="text-lg text-muted-foreground">Select a state to view local dispensaries, laws, and 420-friendly stays.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statesInRegion.map((state) => (
          <motion.div
            key={state.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StateCard state={state} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const USAGuide = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.length >= 2;

  // SEO: Structured Data with FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "USA Cannabis Laws 2025 - State by State Guide",
    "description": "Complete guide to recreational and medical marijuana laws in all 50 US states. Find dispensaries, purchase limits, and 420-friendly travel tips.",
    "url": "https://budquest.guide/usa",
    "dateModified": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "BudQuest",
      "url": "https://budquest.guide"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide" },
        { "@type": "ListItem", "position": 2, "name": "USA Cannabis Guide", "item": "https://budquest.guide/usa" }
      ]
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which US states have legal recreational weed in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As of 2025, 24 states plus D.C. have legalized recreational marijuana: Alaska, Arizona, California, Colorado, Connecticut, Delaware, Illinois, Maine, Maryland, Massachusetts, Michigan, Minnesota, Missouri, Montana, Nevada, New Jersey, New Mexico, New York, Ohio, Oregon, Rhode Island, Vermont, Virginia, and Washington."
        }
      },
      {
        "@type": "Question",
        "name": "Can I drive across state lines with legal weed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Transporting marijuana across state lines is a federal crime, even between two states where it's legal. Each state's legal cannabis must stay within that state's borders."
        }
      },
      {
        "@type": "Question",
        "name": "What are typical purchase limits for tourists?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most recreational states allow adults 21+ to purchase 1 oz (28g) of flower per transaction. Colorado, for example, allows 1 oz for residents and non-residents alike. Some states have lower limits for concentrates and edibles."
        }
      },
      {
        "@type": "Question",
        "name": "Can I smoke weed in national parks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. National parks, forests, monuments, and all federal lands follow federal law where marijuana is strictly illegal. This includes popular destinations like Rocky Mountain National Park and Yellowstone."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Is Weed Legal in Your State? 2025 USA Cannabis Map & Laws</title>
        <meta name="description" content="Which states have legal weed in 2025? Interactive map of US marijuana laws. Find recreational & medical states, dispensaries, purchase limits, and 420-friendly hotels." />
        <meta name="keywords" content="is weed legal in my state, recreational weed states 2025, legal marijuana map, usa cannabis laws, 420 friendly states, where is weed legal usa" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://budquest.guide/usa" />
        {/* Open Graph */}
        <meta property="og:title" content="Is Weed Legal in Your State? 2025 USA Cannabis Map" />
        <meta property="og:description" content="Which states have legal weed in 2025? Interactive map, dispensary finders, and 420-friendly travel guides for all 50 states." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://budquest.guide/usa" />
        <meta property="og:image" content="https://budquest.guide/og-usa-guide.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is Weed Legal in Your State? 2025 USA Cannabis Map" />
        <meta name="twitter:description" content="Which states have legal weed in 2025? Interactive map and dispensary finders for all 50 states." />
        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      </Helmet>
      
      <Navigation />

      {/* Fixed Search Bar - Always visible */}
      <header className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10" role="search">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search states (e.g. California, Texas)..."
              aria-label="Search US states for cannabis laws"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content wrapper */}
      <main>
        {isSearching ? (
          <SearchResults
            query={searchQuery}
            onClear={() => setSearchQuery("")}
          />
        ) : selectedRegion ? (
          <StateIndex
            regionId={selectedRegion}
            onBack={() => setSelectedRegion(null)}
          />
        ) : (
          <RegionIndex onSelect={setSelectedRegion} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default USAGuide;
