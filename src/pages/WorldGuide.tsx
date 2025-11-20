import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const WorldGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Global Cannabis Laws
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore cannabis legality across countries worldwide. Coming soon with comprehensive data.
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              World guide content is being populated. Check back soon for global coverage!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorldGuide;
