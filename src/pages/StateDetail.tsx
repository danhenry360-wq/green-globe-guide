import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { Scale, Home, Plane, Car, Info, MapPin } from "lucide-react";
import CityList from "@/components/CityList";

const StateDetail = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const state = USA_STATE_DATA.find(s => s.slug === stateSlug);

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">State Not Found</h1>
            <p className="text-muted-foreground mb-8">We couldn't find information for this state.</p>
            <Link to="/usa" className="text-accent hover:underline">
              ← Back to USA Guide
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recreational':
        return 'bg-accent text-accent-foreground';
      case 'medical':
        return 'bg-gold text-foreground';
      case 'decriminalized':
        return 'bg-yellow-600 text-foreground';
      case 'illegal':
        return 'bg-red-600 text-white';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/usa" className="text-accent hover:underline text-sm">
              ← USA Guide
            </Link>
          </div>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-3">
                  {state.name} Cannabis Travel Guide
                </h1>
                {state.subtitle && (
                  <p className="text-xl text-muted-foreground">{state.subtitle}</p>
                )}
              </div>
              <Badge className={`${getStatusColor(state.status)} text-lg px-6 py-2 capitalize flex-shrink-0`}>
                {state.status}
              </Badge>
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-xl font-bold mb-4 text-accent flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Legal Overview & Quick Facts
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Legal Status
                  </h4>
                  <Badge className={`${getStatusColor(state.status)} capitalize`}>
                    {state.status}
                  </Badge>
                </div>

                {state.possession_limits && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                      Possession Limits
                    </h4>
                    <p className="text-muted-foreground">{state.possession_limits}</p>
                  </div>
                )}

                {state.penalties && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Penalties for Violation
                    </h4>
                    <p className="text-muted-foreground">{state.penalties}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-xl font-bold mb-4 text-accent">Quick Facts</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Info className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Legal Status</h4>
                    <Badge className={`${getStatusColor(state.status)} capitalize`}>
                      {state.status}
                    </Badge>
                  </div>
                </div>

                {state.possession_limits && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Scale className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Possession Limit</h4>
                      <p className="text-sm text-muted-foreground">{state.possession_limits}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="space-y-6 mb-12">
            {state.consumption_rules && (
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center">
                  <Home className="w-5 h-5 mr-2 text-accent" />
                  Where to Consume
                </h3>
                <p className="text-muted-foreground leading-relaxed">{state.consumption_rules}</p>
              </Card>
            )}

            {state.travel_rules && (
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-accent" />
                  Airport Rules
                </h3>
                <p className="text-muted-foreground leading-relaxed">{state.travel_rules}</p>
              </Card>
            )}

            {state.purchase_rules && (
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center">
                  <Car className="w-5 h-5 mr-2 text-accent" />
                  Purchase & Transportation
                </h3>
                <p className="text-muted-foreground leading-relaxed">{state.purchase_rules}</p>
              </Card>
            )}
          </div>

          {/* Cities & Destinations */}
          {state.cities && state.cities.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center">
                <MapPin className="w-8 h-8 mr-3 text-accent" />
                Cities & Destinations
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore detailed guides for cannabis-friendly cities and notable areas in {state.name}.
              </p>
              <CityList stateSlug={state.slug} cities={state.cities} />
            </div>
          )}

          {/* Disclaimer */}
          <Card className="p-6 bg-accent/5 border-accent/20">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Disclaimer:</strong> This information is for educational purposes only. 
              Cannabis laws can change rapidly. Always verify current laws before traveling and consume responsibly where legal.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StateDetail;
