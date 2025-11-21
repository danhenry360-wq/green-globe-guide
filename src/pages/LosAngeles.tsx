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
  Calendar,
  Users,
} from "lucide-react";

const LosAngeles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Los Angeles Cannabis Guide - Global Canna Pass</title>
        <meta
          name="description"
          content="Complete educational guide to Los Angeles cannabis culture, laws, neighborhoods, and travel information."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              <MapPin className="w-3 h-3 mr-1" />
              Major City Guide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Los Angeles Cannabis Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              An educational overview of cannabis culture and regulations in the City of Angels
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8 bg-card/50 backdrop-blur">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-accent" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los Angeles stands as one of the most influential cities in modern cannabis culture. From the counterculture movements of the 1960s to today's sophisticated retail environment, L.A. has been at the forefront of cannabis normalization and legalization efforts in the United States.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This guide provides an educational overview of cannabis culture, regulations, and the social landscape in Los Angeles. All information is presented for educational purposes only.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important:</strong> Laws and regulations change frequently. Always verify information with official California state and Los Angeles county sources before making any decisions.
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
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-7 h-7 text-accent" />
            Legal Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                California State Status
              </h3>
              <p className="text-muted-foreground mb-2">
                <strong>Legal for recreational use</strong> since 2016 (Proposition 64)
              </p>
              <p className="text-muted-foreground text-sm">
                Adults 21+ may legally purchase and possess cannabis from licensed retailers.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Age Restrictions
              </h3>
              <p className="text-muted-foreground mb-2">
                <strong>Minimum age: 21 years old</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                Valid government-issued ID required for all purchases. Medical patients under 21 require valid medical card.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Possession Limits
              </h3>
              <p className="text-muted-foreground text-sm">
                Adults may possess up to 28.5 grams (approximately 1 ounce) of cannabis flower, or up to 8 grams of concentrated cannabis in public spaces.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Consumption Restrictions
              </h3>
              <p className="text-muted-foreground text-sm">
                Cannabis consumption is <strong>prohibited</strong> in public spaces, within 1,000 feet of schools, in vehicles, and on federal land. Private residence use only.
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
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-7 h-7 text-accent" />
              Local Cannabis Culture
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Los Angeles has been a cultural epicenter for cannabis advocacy and lifestyle since the 1960s. The city's entertainment industry, combined with California's progressive political climate, helped shape modern cannabis culture as we know it.
              </p>
              <p className="leading-relaxed">
                The West Coast legalization movement found strong roots in L.A., with medical marijuana compassion clubs opening in Venice Beach and West Hollywood as early as the 1990s. Today, cannabis is deeply integrated into the city's music, art, wellness, and entrepreneurial scenes.
              </p>
              <p className="leading-relaxed">
                Los Angeles hosts numerous cannabis-related events, industry conferences, and cultural festivals throughout the year, solidifying its position as a global leader in cannabis innovation and normalization.
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
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-accent" />
            Dispensary Environment (Observational)
          </h2>
          <Card className="p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los Angeles has one of the highest densities of licensed cannabis retailers in the United States. The retail landscape ranges from boutique storefronts with curated selections to large-scale operations offering extensive product variety.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Different neighborhoods have developed distinct retail characters:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Hollywood:</strong> Tourist-oriented shops with themed décor and celebrity branding
              </li>
              <li>
                <strong>Downtown L.A.:</strong> Modern retail spaces emphasizing design and professionalism
              </li>
              <li>
                <strong>Venice Beach:</strong> Maintains counterculture aesthetic with artistic storefronts
              </li>
              <li>
                <strong>West Hollywood:</strong> Upscale boutique experiences targeting affluent clientele
              </li>
              <li>
                <strong>San Fernando Valley:</strong> Community-focused shops serving local residents
              </li>
            </ul>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-accent-foreground">
                <strong>Note:</strong> All legal cannabis sales in California must occur through state-licensed dispensaries. Unlicensed sales remain illegal.
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
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-accent" />
            Notable Neighborhoods
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Hollywood",
                description:
                  "Cannabis retail in Hollywood blends with the entertainment district's tourist appeal. Stores often feature pop culture themes and celebrity-endorsed products, catering to both locals and visitors.",
              },
              {
                name: "Venice Beach",
                description:
                  "Historically significant in cannabis counterculture, Venice maintains its bohemian character. The neighborhood's cannabis scene reflects its artistic heritage and progressive community values.",
              },
              {
                name: "Downtown Los Angeles",
                description:
                  "DTLA's cannabis retailers emphasize modern, professional retail environments. The area has seen growth in upscale dispensaries as the neighborhood continues its urban renaissance.",
              },
              {
                name: "West Hollywood",
                description:
                  "Known for its vibrant nightlife and LGBTQ+ community, WeHo features boutique cannabis shops that integrate with the neighborhood's social scene and progressive values.",
              },
              {
                name: "San Fernando Valley",
                description:
                  "The Valley's cannabis retail serves a more local, residential demographic. Shops tend to focus on community relationships and everyday consumer needs.",
              },
            ].map((neighborhood, index) => (
              <Card key={index} className="p-6 hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  {neighborhood.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {neighborhood.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Hotels & Accommodations */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <Card className="p-8 bg-card/50 backdrop-blur">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-7 h-7 text-accent" />
              Hotels & Accommodations
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Under California state law and Los Angeles municipal code, smoking of any substance (including cannabis) is generally prohibited in hotels, motels, and other lodging facilities. Most establishments maintain strict no-smoking policies in all rooms and common areas.
              </p>
              <p className="leading-relaxed">
                Some private vacation rentals, Airbnb properties, and specialty accommodations may have different policies. It is essential to verify smoking policies directly with property owners or management before booking.
              </p>
              <p className="leading-relaxed">
                Cannabis consumption in hotel rooms, even if privately owned, may violate property rules and result in fees, eviction, or loss of security deposits.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-200">
                  <strong>Always check official policies:</strong> Contact accommodations directly to understand their specific cannabis policies before booking.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Safety, Etiquette & Public Rules */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-7 h-7 text-red-400" />
              Safety, Etiquette & Public Rules
            </h2>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  Public Consumption is Illegal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cannabis use in any public space, including streets, parks, sidewalks, businesses, and outdoor dining areas, is prohibited and may result in fines.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  Federal Land Prohibition
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cannabis remains federally illegal. Possession or use on any federal property (national parks, federal buildings, military installations) is a federal crime.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-amber-300 mb-2">
                  Transportation Rules
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cannabis must be transported in sealed, unopened containers. Open containers in vehicles are illegal. Driving under the influence of cannabis is a DUI offense with serious penalties.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">
                  Community Respect
                </h3>
                <p className="text-sm text-muted-foreground">
                  Even where legal, respect for non-consumers and local community standards is essential. Avoid consuming near schools, playgrounds, or family areas.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Quick Reference Summary */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <Card className="p-8 bg-accent/5 border-accent/30">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Quick Reference Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                  Up to 28.5g flower or 8g concentrate in public
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Smoking Restrictions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Prohibited in all public spaces and most hotels
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Local Culture
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hub of cannabis innovation, entertainment, and advocacy
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Retail Environment
                </h3>
                <p className="text-sm text-muted-foreground">
                  High density of licensed dispensaries across neighborhoods
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">
                  Important Reminders
                </h3>
                <p className="text-sm text-muted-foreground">
                  Private use only, no public consumption, verify laws before travel
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Footer Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-muted/30 border border-border rounded-lg p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong>Educational Information Only:</strong> This guide is for
            informational and educational purposes. Cannabis laws can change
            frequently. Always verify current regulations with official California
            state authorities, Los Angeles County government sources, and local
            legal counsel before making any decisions regarding cannabis.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LosAngeles;
