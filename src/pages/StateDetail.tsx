import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CityList from "@/components/CityList";

import { USA_STATE_DATA, CityData } from "@/lib/usa_state_data";
import { ArrowLeft, Info, MapPin, Car, Plane, ShoppingBag, Home, Landmark, AlertTriangle, CheckCircle, Clock, Scale } from "lucide-react";

// Helper component for the main detail items
const DetailItem = ({ icon: Icon, title, value, badgeClass, isWarning }) => (
  <div className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-b-0">
    <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${isWarning ? 'text-destructive' : 'text-accent'}`} />
    <div className="flex-grow">
      <h4 className="text-xl font-semibold mb-1">{title}</h4>
      {badgeClass ? (
        <Badge className={`text-base px-3 py-1 font-medium ${badgeClass}`}>{value}</Badge>
      ) : (
        <p className="text-lg text-foreground/90 leading-relaxed">{value}</p>
      )}
    </div>
  </div>
);

// Helper component for the Quick Facts sidebar
const QuickFactItem = ({ title, value, badgeClass }) => (
  <div className="space-y-1">
    <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
    {badgeClass ? (
      <Badge className={`text-base px-3 py-1 font-medium ${badgeClass}`}>{value}</Badge>
    ) : (
      <p className="text-lg font-semibold text-foreground">{value}</p>
    )}
  </div>
);



const StateDetail = () => {
  const { stateSlug } = useParams();

  const state = USA_STATE_DATA.find(s => s.slug === stateSlug);
  const isLoading = false;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recreational': return 'bg-accent text-accent-foreground';
      case 'medical': return 'bg-gold text-gold-foreground';
      case 'decriminalized': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-destructive text-destructive-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <div className="text-center text-muted-foreground">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">State Not Found</h1>
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
            to="/usa" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to USA Guide
          </Link>

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                {state.name}
              </span>{' '}
              Cannabis Travel Guide
            </h1>
            <Badge 
              className={`text-lg px-4 py-2 font-semibold shadow-lg ${getStatusColor(state.status)}`}
            >
              {getStatusLabel(state.status)}
            </Badge>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
            {state.subtitle || `Your essential guide to navigating cannabis laws, consumption rules, and 420-friendly travel essentials in ${state.name}.`}
          </p>
        </div>
      </motion.section>

      <div className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-[-60px] relative z-20">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Legal Overview Section */}
              <motion.section 
                className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-accent">
                  <Scale className="w-7 h-7" />
                  Legal Overview & Quick Facts
                </h2>
                
                {/* Quick Facts Box for Mobile */}
                <Card className="p-4 mb-6 lg:hidden border-accent/30 bg-accent/5">
                  <h3 className="text-xl font-semibold mb-3 text-accent">Quick Facts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Legal Status:</span>
                      <Badge className={getStatusColor(state.status)}>{getStatusLabel(state.status)}</Badge>
                    </div>
                    {state.possession_limits && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Possession Limit:</span>
                        <span className="font-medium text-foreground">{state.possession_limits}</span>
                      </div>
                    )}
                    {state.age_requirement && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age Requirement:</span>
                        <span className="font-medium text-foreground">{state.age_requirement}</span>
                      </div>
                    )}
                  </div>
                </Card>

                <div className="space-y-6">
                  <DetailItem 
                    icon={CheckCircle} 
                    title="Legal Status" 
                    value={getStatusLabel(state.status)} 
                    badgeClass={getStatusColor(state.status)}
                  />
                  {state.possession_limits && (
                    <DetailItem 
                      icon={ShoppingBag} 
                      title="Possession Limits" 
                      value={state.possession_limits} 
                    />
                  )}
                  {state.purchase_rules && (
                    <DetailItem 
                      icon={ShoppingBag} 
                      title="Purchase Rules" 
                      value={state.purchase_rules} 
                    />
                  )}
                  {state.age_requirement && (
                    <DetailItem 
                      icon={Clock} 
                      title="Age Requirement" 
                      value={state.age_requirement} 
                    />
                  )}
                  {state.penalties && (
                    <DetailItem 
                      icon={AlertTriangle} 
                      title="Penalties for Violation" 
                      value={state.penalties} 
                      isWarning
                    />
                  )}
                </div>
              </motion.section>

              {/* Where You Can Consume Section */}
              {state.consumption_rules && (
                <motion.section 
                  className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gold">
                    <Home className="w-7 h-7" />
                    Where You Can Consume
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    {state.consumption_rules.split('\n').map((line, index) => (
                      <p key={index} className="leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Dispensary & Product Guide Section */}
              {state.dispensary_guide && (
                <motion.section 
                  className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-accent">
                    <ShoppingBag className="w-7 h-7" />
                    Dispensary & Product Guide
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    {state.dispensary_guide.split('\n').map((line, index) => (
                      <p key={index} className="leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* City-Specific Guides Section */}
              {state.cities.length > 0 && (
              <motion.section 
                className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gold">
                    <Landmark className="w-7 h-7" />
                    Cities & Destinations
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Explore detailed guides for cannabis-friendly cities and notable areas in {state.name}.
                  </p>
                                    <CityList stateSlug={state.stateSlug} cities={state.cities} />
              </motion.section>
              )}
              {/* Travel Rules Section */}            {state.travel_rules && (
                <motion.section 
                  className="p-8 bg-card rounded-xl shadow-2xl border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-accent">
                    <Car className="w-7 h-7" />
                    Travel Rules & Safety
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    {state.travel_rules.split('\n').map((line, index) => (
                      <p key={index} className="leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Traveler Summary Section */}
              {state.traveler_summary && (
                <motion.section 
                  className="p-8 bg-accent/10 rounded-xl shadow-2xl border border-accent/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-accent">
                    <Info className="w-7 h-7" />
                    Traveler Summary: What You Must Know
                  </h2>
                  <ul className="list-disc list-inside space-y-3 text-lg text-foreground/90 ml-4">
                    {state.traveler_summary.split('\n').map((line, index) => (
                      <li key={index}>{line.trim()}</li>
                    ))}
                  </ul>
                </motion.section>
              )}

            </div>

            {/* Right Column - Quick Facts (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <motion.div 
                className="sticky top-20 p-8 bg-card rounded-xl shadow-2xl border border-border/50 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-accent border-b pb-3 border-border/50">Quick Facts</h3>
                <QuickFactItem title="Legal Status" value={getStatusLabel(state.status)} badgeClass={getStatusColor(state.status)} />
                {state.possession_limits && <QuickFactItem title="Possession Limit" value={state.possession_limits} />}
                {state.age_requirement && <QuickFactItem title="Age Requirement" value={state.age_requirement} />}
                {state.consumption_summary && <QuickFactItem title="Consumption" value={state.consumption_summary} />}
                {state.dispensary_access && <QuickFactItem title="Dispensary Access" value={state.dispensary_access} />}
              </motion.div>
            </div>

          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12 p-6 border border-border rounded-xl bg-card/50 lg:col-span-3">
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

export default StateDetail;
