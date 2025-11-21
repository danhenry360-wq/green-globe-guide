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

const SanFrancisco = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>San Francisco Cannabis Guide - Global Canna Pass</title>
        <meta
          name="description"
          content="Complete educational guide to San Francisco cannabis culture, laws, neighborhoods, and travel information."
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
              San Francisco Cannabis Guide
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              An educational overview of cannabis culture and regulations in the City by the Bay
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
              San Francisco has been at the forefront of cannabis culture and progressive drug policy reform for decades. From the Summer of Love in 1967 to today's sophisticated consumption lounges, the city has continuously shaped cannabis normalization efforts nationwide.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This guide provides an educational overview of cannabis culture, regulations, and the social landscape in San Francisco. All information is presented for educational purposes only.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important:</strong> Laws and regulations change frequently. Always verify information with official California state and San Francisco city sources before making any decisions.
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
                <strong>Legal for recreational use</strong> since 2016 (Proposition 64)
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
                Adults may possess up to 28.5 grams (approximately 1 ounce) of cannabis flower, or up to 8 grams of concentrated cannabis.
              </p>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                Consumption Restrictions
              </h3>
              <p className="text-muted-foreground text-sm">
                Cannabis consumption is <strong>prohibited</strong> in public spaces, within 1,000 feet of schools, in vehicles, and on federal land.
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
                San Francisco's cannabis culture emerged from the counterculture movements of the 1960s and evolved through the AIDS crisis of the 1980s, when the city pioneered compassionate use programs. The Haight-Ashbury district remains symbolically important to cannabis history.
              </p>
              <p className="leading-relaxed">
                The city was home to some of California's first medical cannabis dispensaries in the 1990s and has since developed a sophisticated adult-use market. San Francisco also became one of the first cities to permit on-site cannabis consumption lounges.
              </p>
              <p className="leading-relaxed">
                Today, cannabis is integrated into San Francisco's progressive social fabric, with the industry contributing to local arts, music, and wellness communities.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Consumption Lounges */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            Consumption Lounges (Observational)
          </h2>
          <Card className="p-4 md:p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              San Francisco was among the first U.S. cities to authorize licensed cannabis consumption lounges. These venues allow adults 21+ to consume cannabis products on-premises in a social setting.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Notable licensed venues have included establishments like Moe Greens and Barbary Coast Collective, which offer lounge-style environments. Operating hours, admission policies, and available amenities vary by location.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-accent-foreground">
                <strong>Note:</strong> All consumption lounges must be state-licensed. Verify licensing status before visiting any venue.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Notable Neighborhoods */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 md:w-7 md:h-7 text-accent" />
            Notable Neighborhoods
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                name: "Haight-Ashbury",
                description:
                  "Historic birthplace of 1960s counterculture. Cannabis retail here maintains connection to the neighborhood's bohemian heritage. A cultural landmark for cannabis history.",
              },
              {
                name: "Mission District",
                description:
                  "Vibrant arts and food scene with several dispensaries. The neighborhood blends Latin American culture with San Francisco's progressive values.",
              },
              {
                name: "SoMa (South of Market)",
                description:
                  "Urban tech hub with modern dispensaries and consumption lounges. The area serves both residents and tech workers.",
              },
              {
                name: "Castro District",
                description:
                  "Historic LGBTQ+ neighborhood where cannabis compassionate-use programs first emerged during the AIDS crisis. Cannabis retail reflects community values.",
              },
            ].map((neighborhood, index) => (
              <Card key={index} className="p-4 md:p-6 hover:border-accent/50 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-accent">
                  {neighborhood.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {neighborhood.description}
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
                  Public Consumption is Illegal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Despite liberal attitudes, public cannabis consumption remains illegal. Golden Gate Park, streets, and sidewalks are not legal consumption areas.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  Federal Land Prohibition
                </h3>
                <p className="text-sm text-muted-foreground">
                  Federal properties including the Presidio, Golden Gate National Recreation Area, and Alcatraz Island strictly prohibit cannabis possession or use.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-amber-300 mb-2">
                  Transportation Rules
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cannabis must be transported in sealed containers. Open containers in vehicles are illegal. DUI laws apply to cannabis.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Quick Reference Summary */}
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
                <h3 className="font-semibold text-accent mb-2">
                  Possession Limit
                </h3>
                <p className="text-sm text-muted-foreground">
                  Up to 28.5g flower or 8g concentrate
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Consumption Lounges
                </h3>
                <p className="text-sm text-muted-foreground">
                  Licensed on-site consumption venues available
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Local Culture
                </h3>
                <p className="text-sm text-muted-foreground">
                  Historic cannabis culture hub since 1960s
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
            informational and educational purposes. Cannabis laws can change
            frequently. Always verify current regulations with official California
            state authorities and San Francisco city government sources.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SanFrancisco;
