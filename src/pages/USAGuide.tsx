import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Map, MapPin, Scale, Filter } from "lucide-react";
import { useState } from "react";

const USAGuide = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

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
      case 'recreational': return 'bg-accent/20 text-accent border-accent/30';
      case 'medical': return 'bg-gold/20 text-gold border-gold/30';
      case 'decriminalized': return 'bg-secondary/50 text-secondary-foreground border-border';
      default: return 'bg-destructive/20 text-destructive border-destructive/30';
    }
  };

  const getRegion = (name: string) => {
    const west = ['California', 'Oregon', 'Washington', 'Nevada', 'Colorado', 'Arizona', 'Alaska', 'Hawaii', 'Montana', 'Wyoming', 'Idaho', 'Utah', 'New Mexico'];
    const midwest = ['Illinois', 'Michigan', 'Ohio', 'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Indiana'];
    const south = ['Texas', 'Florida', 'Georgia', 'North Carolina', 'Virginia', 'Tennessee', 'Louisiana', 'Alabama', 'Mississippi', 'Arkansas', 'Oklahoma', 'South Carolina', 'Kentucky', 'West Virginia', 'Maryland', 'Delaware'];
    const northeast = ['New York', 'Pennsylvania', 'New Jersey', 'Massachusetts', 'Connecticut', 'Rhode Island', 'New Hampshire', 'Vermont', 'Maine'];
    
    if (west.includes(name)) return 'West';
    if (midwest.includes(name)) return 'Midwest';
    if (south.includes(name)) return 'South';
    if (northeast.includes(name)) return 'Northeast';
    return 'Other';
  };

  const filteredStates = states?.filter(state => {
    const matchesStatus = statusFilter === 'all' || state.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || getRegion(state.name) === regionFilter;
    return matchesStatus && matchesRegion;
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              All 50 States
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              USA Cannabis Laws by State
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete guide to cannabis legality across all 50 states. Updated regularly with the latest laws and regulations.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Map className="w-4 h-4" />
                View Interactive Map
              </Button>
              <Button variant="outline" className="gap-2">
                <Scale className="w-4 h-4" />
                Compare States
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="mb-8 bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Filter States</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Legal Status</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'recreational', 'medical', 'decriminalized', 'illegal'].map(status => (
                    <Badge
                      key={status}
                      className={`cursor-pointer transition-all ${
                        statusFilter === status 
                          ? getStatusColor(status === 'all' ? 'recreational' : status)
                          : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                      }`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Region</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'West', 'Midwest', 'South', 'Northeast'].map(region => (
                    <Badge
                      key={region}
                      className={`cursor-pointer transition-all ${
                        regionFilter === region
                          ? 'bg-accent/20 text-accent border-accent/30'
                          : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                      }`}
                      onClick={() => setRegionFilter(region)}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Badge className="bg-accent/20 text-accent border-accent/30">Recreational</Badge>
            <Badge className="bg-gold/20 text-gold border-gold/30">Medical Only</Badge>
            <Badge className="bg-secondary/50 text-secondary-foreground border-border">Decriminalized</Badge>
            <Badge className="bg-destructive/20 text-destructive border-destructive/30">Illegal</Badge>
          </div>

          {/* States Grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading states...</div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4 text-center">
                Showing {filteredStates?.length || 0} of {states?.length || 0} states
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {filteredStates?.map((state) => (
                  <motion.div key={state.id} variants={fadeIn}>
                    <Link to={`/usa/${state.slug}`}>
                      <Card className="p-6 hover:border-accent/50 hover:shadow-glow-subtle transition-all cursor-pointer h-full group bg-gradient-card">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors mb-1">
                              {state.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{getRegion(state.name)}</p>
                          </div>
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
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {state.tourist_notes}
                          </p>
                        )}
                        <div className="mt-4 text-sm text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View full guide →
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {/* Disclaimer */}
          <motion.div 
            className="mt-16 p-6 border border-border rounded-lg bg-card/50 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-accent">Important Legal Notice</h3>
            <p className="text-sm text-muted-foreground">
              This information is for educational purposes only and does not constitute legal advice. 
              Cannabis laws change frequently and vary by jurisdiction. Always verify current laws with 
              official sources before traveling or making any legal decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default USAGuide;
