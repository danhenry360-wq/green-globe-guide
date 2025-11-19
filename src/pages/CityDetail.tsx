import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { USA_STATE_DATA, CityData } from "@/lib/usa_state_data";
import { ArrowLeft, Landmark, MapPin, Info, Scale } from "lucide-react";

// Helper component for the Full City Guide template
const FullCityGuide = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => (
  <div className="space-y-8">
    <h2 className="text-4xl font-bold text-accent mb-4">Full Guide: {city.name}</h2>
    <p className="text-lg text-muted-foreground">
      Welcome to the full cannabis travel guide for **{city.name}, {state.name}**.
    </p>
    <Card className="p-6 bg-card/50 border-accent/30">
      <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-accent">
        <Landmark className="w-5 h-5" />
        The Local Cannabis Scene
      </h3>
      <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">{city.content}</p>
    </Card>
    <Card className="p-6 bg-card/50 border-border/50">
      <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-gold">
        <MapPin className="w-5 h-5" />
        Must-Know Local Rules
      </h3>
      <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground ml-4">
        <li>**Public Consumption:** Strictly illegal. Consume only in private residences or licensed consumption lounges (if available).</li>
        <li>**Dispensary Access:** Ensure you have valid ID (21+ for recreational, medical card for medical-only states).</li>
        <li>**Transportation:** Never drive under the influence. Do not transport cannabis across state lines.</li>
      </ul>
    </Card>
    <p className="text-sm text-muted-foreground italic">
      This is a Major City Guide. The content is a comprehensive overview of the local scene.
    </p>
  </div>
);

// Helper component for the Short Guide template
const ShortCityGuide = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gold mb-4">Short Guide: {city.name}</h2>
    <p className="text-lg text-muted-foreground">
      A quick overview of cannabis travel in **{city.name}, {state.name}**.
    </p>
    <Card className="p-6 bg-card/50 border-gold/30">
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gold">
        <MapPin className="w-5 h-5" />
        Local Vibe
      </h3>
      <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">{city.content}</p>
    </Card>
    <p className="text-sm text-muted-foreground italic">
      This is a Medium City Guide. The content is a concise summary of the local scene.
    </p>
  </div>
);

// Helper component for the One-Line Note template
const OneLineNote = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-secondary mb-4">Notable Area: {city.name}</h2>
    <p className="text-lg text-muted-foreground">
      A quick note on **{city.name}, {state.name}**.
    </p>
    <Card className="p-6 bg-card/50 border-secondary/30">
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-secondary">
        <Info className="w-5 h-5" />
        Traveler Note
      </h3>
      <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">{city.content}</p>
    </Card>
    <p className="text-sm text-muted-foreground italic">
      This is a Notable Area Guide. The content is a single, important note for travelers.
    </p>
  </div>
);


const CityDetail = () => {
  const { stateSlug, citySlug } = useParams<{ stateSlug: string, citySlug: string }>();

  const state = USA_STATE_DATA.find(s => s.slug === stateSlug);
  const city = state?.cities.find(c => c.slug === citySlug);

  if (!state || !city) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
              <Link to="/usa" className="text-accent hover:underline">
                Back to USA Guide
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getTemplate = () => {
    switch (city.type) {
      case 'major':
        return <FullCityGuide city={city} state={state} />;
      case 'medium':
        return <ShortCityGuide city={city} state={state} />;
      case 'notable':
        return <OneLineNote city={city} state={state} />;
      default:
        return <p className="text-destructive">Error: Unknown city guide type.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-background to-card/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Back Button */}
          <Link 
            to={`/usa/${stateSlug}`} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {state.name} Guide
          </Link>

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                {city.name}
              </span>{' '}
              Cannabis Guide
            </h1>
            <Badge 
              className={`text-lg px-4 py-2 font-semibold shadow-lg ${city.type === 'major' ? 'bg-accent text-accent-foreground' : city.type === 'medium' ? 'bg-gold text-gold-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              {city.type.charAt(0).toUpperCase() + city.type.slice(1)} Guide
            </Badge>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
            Your essential guide to navigating the local cannabis scene in {city.name}, {state.name}.
          </p>
        </div>
      </motion.section>

      <div className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Main Content */}
          <div className="mt-[-60px] relative z-20">
            <motion.section 
              className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {getTemplate()}
            </motion.section>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12 p-6 border border-border rounded-xl bg-card/50">
            <h3 className="text-lg font-semibold mb-2 text-accent">Important Legal Notice</h3>
            <p className="text-sm text-muted-foreground">
              Information is educational only and laws change frequently. Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
              Always verify current laws with official sources before traveling or making any legal decisions.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityDetail;
