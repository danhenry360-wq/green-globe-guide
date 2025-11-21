import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Info,
  MapPin,
  Building2,
  Shield,
  Users,
} from "lucide-react";

const SanDiego = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>San Diego Cannabis Guide - Global Canna Pass</title>
        <meta
          name="description"
          content="Complete educational guide to San Diego cannabis culture, laws, beach communities, and travel information."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pb-16 px-4 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 text-xs md:text-sm">
              <MapPin className="w-3 h-3 mr-1" />
              Major City Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-2">
              San Diego Cannabis Guide
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              An educational overview of cannabis culture and regulations in America's Finest City
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-4 md:p-8 bg-card/50 backdrop-blur">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              San Diego combines Southern California beach culture with a mature cannabis retail market. As one of California's largest cities, San Diego offers numerous licensed dispensaries throughout its diverse neighborhoods and coastal communities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This guide provides an educational overview of cannabis culture, regulations, and the social landscape in San Diego County. All information is presented for educational purposes only.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important:</strong> Laws and regulations change frequently. Always verify information with official California state and San Diego County sources before making any decisions.
                </span>
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Legal Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            Legal Overview
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                California State Status
              </h3>
              <p className="text-muted-foreground mb-2">
                <strong>Legal for recreational use</strong> since 2016
              </p>
              <p className="text-muted-foreground text-sm">
                Adults 21+ may legally purchase and possess cannabis from licensed retailers.
              </p>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                Age Restrictions
              </h3>
              <p className="text-muted-foreground mb-2">
                <strong>Minimum age: 21 years old</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Valid government-issued ID required for all purchases.
              </p>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                Possession Limits
              </h3>
              <p className="text-muted-foreground text-sm">
                Adults may possess up to 28.5 grams of flower or up to 8 grams of concentrate.
              </p>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                Beach & Park Rules
              </h3>
              <p className="text-muted-foreground text-sm">
                Cannabis use is <strong>prohibited</strong> on all San Diego beaches and county parks.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* Local Cannabis Culture */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-4 md:p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-accent" />
              Local Cannabis Culture
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                San Diego's cannabis culture reflects the city's laid-back coastal lifestyle. While less historically prominent than San Francisco or Los Angeles in cannabis advocacy, San Diego has developed a robust retail market with over 50 licensed dispensaries.
              </p>
              <p className="leading-relaxed">
                The city's proximity to Mexico and its strong military presence create a unique dynamic. Cannabis businesses operate within strict local regulations, and the industry has focused on professional, welcoming retail environments.
              </p>
              <p className="leading-relaxed">
                San Diego hosts cannabis industry events and has a growing community of local cultivators and brands focused on quality and sustainability.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Dispensary Environment */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            Dispensary Environment
          </h2>
          <Card className="p-4 md:p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              San Diego County has licensed numerous cannabis retailers across the city and surrounding areas. Dispensaries range from small community-focused shops to larger retail operations with extensive product selections.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many dispensaries are located in commercial districts and shopping centers. Several neighborhoods have multiple licensed retailers within close proximity. Delivery services are also widely available for those 21+.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-accent-foreground">
                <strong>Note:</strong> All legal cannabis sales must occur through state-licensed dispensaries. Verify licensing before making purchases.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Notable Areas */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            Notable Areas
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                name: "Pacific Beach",
                description:
                  "Popular beach community with dispensaries serving locals and tourists. The beach itself is cannabis-free; consumption must occur at private residences.",
              },
              {
                name: "North Park",
                description:
                  "Trendy urban neighborhood with craft breweries, restaurants, and several dispensaries. Known for its arts scene and walkable streets.",
              },
              {
                name: "Downtown/Gaslamp Quarter",
                description:
                  "Central district with nightlife and dining. A few dispensaries serve the downtown area. Public consumption is heavily enforced here.",
              },
              {
                name: "Ocean Beach",
                description:
                  "Bohemian coastal community with a relaxed vibe. Dispensaries reflect the neighborhood's alternative culture. Beach consumption is prohibited.",
              },
            ].map((area, index) => (
              <Card key={index} className="p-4 md:p-6 hover:border-accent/50 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                  {area.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Safety & Public Rules */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <Card className="p-4 md:p-8 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 md:w-7 md:h-7 text-red-400" />
              Safety & Public Rules
            </h2>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  Beach & Park Prohibition
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cannabis consumption is illegal on all San Diego beaches, county parks, and public spaces. Private residences or vacation rentals only.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  Federal Land & Border
                </h3>
                <p className="text-sm text-muted-foreground">
                  San Diego has federal military installations and borders Mexico. Cannabis possession on federal property or crossing borders is a federal crime.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-amber-300 mb-2">
                  Vehicle & Transportation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Open containers in vehicles are illegal. DUI laws apply to cannabis. Never consume while driving or cross state lines with cannabis.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Quick Reference */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card className="p-4 md:p-8 bg-accent/5 border-accent/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Quick Reference Summary
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="font-semibold text-accent mb-2">Legal Status</h3>
                <p className="text-sm text-muted-foreground">
                  Recreational cannabis legal for adults 21+
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">Dispensaries</h3>
                <p className="text-sm text-muted-foreground">
                  50+ licensed retailers throughout San Diego
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">Beach Rules</h3>
                <p className="text-sm text-muted-foreground">
                  Consumption prohibited on all beaches and parks
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">Culture</h3>
                <p className="text-sm text-muted-foreground">
                  Laid-back coastal vibe with professional retail market
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Footer Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-muted/30 border border-border rounded-lg p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong>Educational Information Only:</strong> This guide is for
            informational and educational purposes. Always verify current regulations
            with official California state and San Diego County sources.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SanDiego;
