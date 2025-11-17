import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const USAGuide = () => {
  const { data: states, isLoading } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('states')
        .select('*')
        .order('name');
      
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              USA Cannabis Laws by State
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete guide to cannabis legality across all 50 states. Updated regularly with the latest laws and regulations.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Badge className="bg-accent text-accent-foreground">Recreational</Badge>
            <Badge className="bg-gold text-gold-foreground">Medical Only</Badge>
            <Badge className="bg-secondary text-secondary-foreground">Decriminalized</Badge>
            <Badge className="bg-destructive text-destructive-foreground">Illegal</Badge>
          </div>

          {/* States Grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading states...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {states?.map((state) => (
                <Card key={state.id} className="p-6 hover:border-accent/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{state.name}</h3>
                    <Badge className={getStatusColor(state.status)}>
                      {state.status}
                    </Badge>
                  </div>
                  {state.possession_limits && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-foreground">Possession:</span> {state.possession_limits}
                    </p>
                  )}
                  {state.tourist_notes && (
                    <p className="text-sm text-muted-foreground">
                      {state.tourist_notes.slice(0, 120)}...
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-16 p-6 border border-border rounded-lg bg-card/50 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-accent">Important Legal Notice</h3>
            <p className="text-sm text-muted-foreground">
              This information is for educational purposes only and does not constitute legal advice. 
              Cannabis laws change frequently and vary by jurisdiction. Always verify current laws with 
              official sources before traveling or making any legal decisions.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
