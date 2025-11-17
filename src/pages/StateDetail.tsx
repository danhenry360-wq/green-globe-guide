import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Info, MapPin, Car, Plane } from "lucide-react";

const StateDetail = () => {
  const { slug } = useParams();

  const { data: state, isLoading } = useQuery({
    queryKey: ['state', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('states')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

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
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link 
            to="/usa" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to USA Guide
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Is Weed Legal in {state.name}? — 2025
              </h1>
              <Badge className={getStatusColor(state.status)}>
                {getStatusLabel(state.status)}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Complete guide to cannabis laws and regulations for travelers visiting {state.name}.
            </p>
          </div>

          {/* Quick Facts */}
          <Card className="p-6 mb-8 border-accent/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" />
              Quick Facts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Legal Status</p>
                <p className="font-medium">{getStatusLabel(state.status)}</p>
              </div>
              {state.possession_limits && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Possession Limits</p>
                  <p className="font-medium">{state.possession_limits}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Tourist Information */}
          {state.tourist_notes && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                For Travelers
              </h2>
              <p className="text-foreground leading-relaxed">{state.tourist_notes}</p>
            </Card>
          )}

          {/* Where to Consume */}
          {state.where_to_consume && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3">Where You Can Consume</h3>
              <p className="text-foreground leading-relaxed">{state.where_to_consume}</p>
            </Card>
          )}

          {/* Driving Rules */}
          {state.driving_rules && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-gold" />
                Driving & Transportation
              </h3>
              <p className="text-foreground leading-relaxed">{state.driving_rules}</p>
            </Card>
          )}

          {/* Airport Rules */}
          {state.airport_rules && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Plane className="w-5 h-5 text-gold" />
                Airport & Travel Rules
              </h3>
              <p className="text-foreground leading-relaxed">{state.airport_rules}</p>
            </Card>
          )}

          {/* Legal Disclaimer */}
          <div className="mt-12 p-6 border border-border rounded-lg bg-card/50">
            <h3 className="text-lg font-semibold mb-2 text-accent">Important Legal Notice</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This information is for educational purposes only and does not constitute legal advice. 
              Cannabis laws change frequently and vary by jurisdiction.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {state.last_updated ? new Date(state.last_updated).toLocaleDateString() : 'Recently'}. 
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
