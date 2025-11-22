import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { USA_STATE_DATA, CityData } from "@/lib/usa_state_data";
import { DETAILED_CITY_GUIDES } from "@/lib/detailed_city_data";
import { ArrowLeft, Landmark, MapPin, Info, Scale, AlertCircle, Building2, Shield, Users } from "lucide-react";

// Helper component for the Full City Guide template
const FullCityGuide = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => {
  const detailedGuideKey = `${state.slug}-${city.slug}`;
  const detailedGuide = DETAILED_CITY_GUIDES[detailedGuideKey];

  if (detailedGuide) {
    // Use detailed guide if available
    return (
      <div className="space-y-6 md:space-y-8">
        {/* Introduction */}
        <section>
          <Card className="p-4 md:p-6 bg-card/50 backdrop-blur border-l-4 border-accent">
            <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2 text-accent">
              <Info className="w-5 h-5 text-accent" />
              Introduction to {city.name}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              Welcome to the comprehensive cannabis travel guide for **{city.name}, {state.name}**. This guide provides essential information for cannabis tourists visiting this destination.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important:</strong> {detailedGuide.disclaimer}
                </span>
              </p>
            </div>
          </Card>
        </section>

        {/* Legal Status */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Legal Status
          </h2>
          <Card className="p-4 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.legalStatus}</p>
          </Card>
        </section>

        {/* Age & Purchase */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Age & Purchase Requirements
          </h2>
          <Card className="p-4 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.agePurchase}</p>
          </Card>
        </section>

        {/* Possession Limits */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            Possession Limits
          </h2>
          <Card className="p-4 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.possessionLimits}</p>
          </Card>
        </section>

        {/* Where to Consume */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Where to Consume
          </h2>
          <Card className="p-4 md:p-6 bg-gradient-to-br from-accent/5 to-transparent">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.whereToConsume}</p>
          </Card>
        </section>

        {/* Dispensary Info */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Dispensary Information
          </h2>
          <Card className="p-4 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.dispensaryInfo}</p>
          </Card>
        </section>

        {/* Airport & Transport */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-accent" />
            Airport & Transportation Rules
          </h2>
          <Card className="p-4 md:p-6 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.airportTransport}</p>
          </Card>
        </section>

        {/* Safety Tips */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Safety Tips & Warnings
          </h2>
          <Card className="p-4 md:p-6 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <ul className="space-y-2">
              {detailedGuide.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Best Neighborhoods */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Best Neighborhoods for Cannabis Tourists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailedGuide.bestNeighborhoods.map((neighborhood, index) => (
              <Card key={index} className="p-4 md:p-6 bg-gradient-to-br from-accent/5 to-transparent">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{neighborhood}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Etiquette */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Local Etiquette & Cultural Norms
          </h2>
          <Card className="p-4 md:p-6 bg-gradient-to-br from-gold/5 to-transparent">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detailedGuide.localEtiquette}</p>
          </Card>
        </section>
      </div>
    );
  }

  // Fallback to original template if no detailed guide
  return (
    <div className="space-y-8 md:space-y-12">
    {/* Introduction */}
    <section>
      <Card className="p-4 md:p-8 bg-card/50 backdrop-blur border-l-4 border-accent">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-accent">
          <Info className="w-5 h-5 text-accent" />
          Introduction to {city.name}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          Welcome to the comprehensive cannabis travel guide for **{city.name}, {state.name}**. This city is a major hub in the state's cannabis landscape.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
          <p className="text-xs text-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Important:</strong> Laws and regulations change frequently. Always verify information with official {state.name} state and local sources before making any decisions.
            </span>
          </p>
        </div>
      </Card>
    </section>

    {/* Legal Overview */}
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-accent" />
        Legal Overview in {state.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-accent">
            State Status
          </h3>
          <p className="text-muted-foreground text-sm">
            <strong>{state.status.charAt(0).toUpperCase() + state.status.slice(1)}</strong>
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            {state.subtitle}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-accent">
            Age & Purchase
          </h3>
          <p className="text-muted-foreground text-sm">
            <strong>Minimum age: {state.age_requirement || 'Varies'}</strong>
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            {state.purchase_rules || 'No legal purchase rules apply.'}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-accent">
            Possession Limits
          </h3>
          <p className="text-muted-foreground text-xs">
            {state.possession_limits || 'Varies by local ordinance.'}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-accent">
            Consumption Rules
          </h3>
          <p className="text-muted-foreground text-xs">
            {state.consumption_rules || 'Public consumption is generally prohibited.'}
          </p>
        </Card>
      </div>
    </section>

    {/* Local Cannabis Scene (Uses city.content) */}
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
        <Users className="w-6 h-6 text-accent" />
        The Local Vibe: {city.name}
      </h2>
      <Card className="p-4 md:p-8 bg-gradient-to-br from-accent/5 to-transparent">
        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {city.content}
          </p>
        </div>
      </Card>
    </section>

    {/* Dispensary Environment (Uses state.dispensary_guide) */}
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-accent" />
        Dispensary Environment
      </h2>
      <Card className="p-4 md:p-8">
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
          {state.dispensary_guide || 'Check local listings for licensed dispensaries.'}
        </p>
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mt-4">
          <p className="text-xs text-accent-foreground">
            <strong>Note:</strong> All legal cannabis sales must occur through state-licensed dispensaries. Unlicensed sales remain illegal.
          </p>
        </div>
      </Card>
    </section>

    {/* Safety, Etiquette & Public Rules (Uses state.travel_rules) */}
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-red-400" />
        Safety & Travel Rules
      </h2>
      <Card className="p-4 md:p-8 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <h3 className="font-semibold text-red-300 mb-1 text-sm">
              Public Consumption is Prohibited
            </h3>
            <p className="text-xs text-muted-foreground">
              {state.consumption_rules || 'Cannabis use in any public space is prohibited and may result in fines.'}
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <h3 className="font-semibold text-amber-300 mb-1 text-sm">
              Transportation Rules
            </h3>
            <p className="text-xs text-muted-foreground">
              {state.travel_rules || 'Cannabis must be transported according to state law. Never transport across state lines. Driving under the influence is a DUI offense.'}
            </p>
          </div>
        </div>
      </Card>
    </section>
  </div>
  );
};


// Helper component for the Short Guide template
const ShortCityGuide = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => (
  <div className="space-y-8">
    <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Short Guide: {city.name}</h2>
    <p className="text-base text-muted-foreground">
      A quick overview of cannabis travel in **{city.name}, {state.name}**.
    </p>
    <Card className="p-4 md:p-6 bg-card/50 border-gold/30 border-l-4 border-gold">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gold">
        <MapPin className="w-5 h-5" />
        Local Vibe
      </h3>
      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{city.content}</p>
    </Card>
    <p className="text-xs text-muted-foreground italic">
      This is a Medium City Guide. The content is a concise summary of the local scene.
    </p>
  </div>
);

// Helper component for the One-Line Note template
const OneLineNote = ({ city, state }: { city: CityData, state: typeof USA_STATE_DATA[0] }) => (
  <div className="space-y-8">
    <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Notable Area: {city.name}</h2>
    <p className="text-base text-muted-foreground">
      A quick note on **{city.name}, {state.name}**.
    </p>
    <Card className="p-4 md:p-6 bg-card/50 border-secondary/30 border-l-4 border-secondary">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-secondary">
        <Info className="w-5 h-5" />
        Traveler Note
      </h3>
      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{city.content}</p>
    </Card>
    <p className="text-xs text-muted-foreground italic">
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
        className="relative pt-24 pb-12 px-4 bg-gradient-to-br from-background to-card/50 overflow-hidden"
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

          <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-0">
              <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
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
          
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl font-light">
            Your essential guide to navigating the local cannabis scene in {city.name}, {state.name}.
          </p>
        </div>
      </motion.section>

      <div className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Main Content */}
          <div className="mt-[-40px] relative z-20">
            <motion.section 
              className="p-4 md:p-8 bg-card rounded-xl shadow-2xl"
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
