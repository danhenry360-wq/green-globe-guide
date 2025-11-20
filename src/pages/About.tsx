import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Shield,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Scale,
  Leaf,
  Plane,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "From Amsterdam coffee-shops to Thai cannabis cafés, we cover 120+ countries and all 50 U.S. states—updated within 24 hours of any law change.",
    },
    {
      icon: Shield,
      title: "Attorney-Verified Accuracy",
      description:
        "Every guide is cross-referenced with government gazettes, embassy notices, and local counsel. If the law shifts, we shift with it—no stale wiki pages here.",
    },
    {
      icon: Users,
      title: "Traveler-First Community",
      description:
        "Real reviews, real menus, real prices. Our 40 k-member forum shares lounge etiquette, 420-friendly hotels, and border-crossing tips you won’t find on Google.",
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Insights",
      description:
        "Track pending bills, licensing rounds, and consumption-lounge openings months before they happen—so you can book flights (and pre-rolls) ahead of the crowd.",
    },
  ];

  const stats = [
    { label: "Destinations Covered", value: "120+", icon: MapPin },
    { label: "Monthly Updates", value: "1,200+", icon: Calendar },
    { label: "Legal References", value: "4,800+", icon: Scale },
    { label: "Happy Travelers", value: "500 k+", icon: Leaf },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Green Globe - Cannabis Travel Guide 2025</title>
        <meta
          name="description"
          content="Meet Green Globe: the world’s most accurate, attorney-verified cannabis travel guide. Discover 420-friendly destinations, up-to-date weed laws, and responsible consumption tips for 120+ countries."
        />
        <meta
          name="keywords"
          content="cannabis travel guide, 420 friendly vacations, marijuana tourism, weed laws by country, cannabis vacation planner, legal cannabis travel, cannabis friendly hotels, cannabis travel tips, Green Globe about us"
        />
        <link rel="canonical" href="https://greenglobe.com/about" />
        <meta property="og:title" content="About Green Globe | Cannabis Travel Authority" />
        <meta
          property="og:description"
          content="Accurate, real-time cannabis travel info for 120+ countries. Plan safe, legal, and unforgettable 420-friendly trips with Green Globe."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenglobe.com/about" />
        <meta
          property="og:image"
          content="https://greenglobe.com/og-about-green-globe.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@GreenGlobeTravel" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
              Cannabis Travel Authority Since 2019
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground leading-tight">
              Plan. Pack. Puff. <br />
              <span className="text-accent">Responsibly.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Green Globe is the world’s first attorney-verified cannabis travel platform.
              We translate complex weed laws into clear itineraries so you can explore
              the planet’s most 420-friendly destinations—without the legal guesswork.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-10 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 text-accent mb-2" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="p-12 bg-gradient-card border-border/50">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cannabis legalization is moving faster than airline Wi-Fi. One week Thailand
                decriminalizes; the next week Germany opens recreational sales. We built Green Globe
                to close the information gap between lawmakers and luggage-packers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our editorial team—composed of former immigration attorneys, cannabis policy analysts,
                and veteran travel writers—turns statutes, health-department notices, and embassy
                bulletins into actionable travel advice you can trust at the border, the hotel
                check-in, and the consumption lounge.
              </p>
              <div className="flex items-center gap-3 text-accent">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  If the law changes at 2 p.m., we update the guide by 3 p.m.
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Why Travelers Choose Green Globe
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-8 bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all"
                >
                  <value.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Process */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              How We Keep Information Fresh
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="text-accent font-bold text-sm mb-2">Step 1</div>
                <h3 className="text-lg font-semibold mb-3">Automated Monitoring</h3>
                <p className="text-muted-foreground text-sm">
                  We scan 400+ government URLs, parliamentary agendas, and regulatory dockets every
                  six hours for new cannabis bills or rule changes.
                </p>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="text-accent font-bold text-sm mb-2">Step 2</div>
                <h3 className="text-lg font-semibold mb-3">Human Verification</h3>
                <p className="text-muted-foreground text-sm">
                  A licensed attorney in the relevant jurisdiction reviews the raw text, cross-checks
                  with local bar associations, and drafts the plain-language summary.
                </p>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="text-accent font-bold text-sm mb-2">Step 3</div>
                <h3 className="text-lg font-semibold mb-3">Community Feedback</h3>
                <p className="text-muted-foreground text-sm">
                  Within 48 hours of publication, on-the-ground travelers validate airport
                  experiences, dispensary menus, and hotel policies—ensuring real-world accuracy.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Responsible Consumption CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="container mx-auto max-w-4xl text-center">
            <Plane className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">Travel Smart, Consume Responsibly</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Cannabis laws are destination-specific, age-restricted, and often zero-tolerance for
              tourists. Green Globe gives you the roadmap—so you can enjoy the journey without
              unexpected detours through customs, courtrooms, or costly fines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="border-accent text-accent">
                Know Before You Go
              </Badge>
              <Badge variant="outline" className="border-accent text-accent">
                Respect Local Culture
              </Badge>
              <Badge variant="outline" className="border-accent text-accent">
                Consume Legally & Safely
              </Badge>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 bg-accent/5 border-accent/20 text-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Attorney-Backed Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Green Globe provides informational content only and does not constitute legal advice.
                Cannabis laws vary by jurisdiction and can change rapidly. Always verify current
                statutes with local authorities before traveling, and consume responsibly where
                permitted. Travelers are solely responsible for compliance with all applicable laws.
              </p>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
