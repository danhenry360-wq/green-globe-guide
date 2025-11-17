import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Tours = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cannabis Tours & Experiences
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover guided tours and unique cannabis experiences around the world.
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Tours directory coming soon. Check back for curated experiences!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tours;
