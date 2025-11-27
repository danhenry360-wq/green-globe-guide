import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Globe, Shield, Users, TrendingUp, MapPin, Calendar, Scale, Leaf,
  Plane, CheckCircle, Sparkles, Clock, SearchCheck, ThumbsUp,
  ArrowRight, Award, Zap, ChevronDown, ChevronUp
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ============================================
   ANIMATED COUNTER HOOK
============================================ */
const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
};

/* ============================================
   SEO STRUCTURED DATA
============================================ */
const ABOUT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BudQuest",
  url: "https://budquest.com",
  description: "Attorney-verified cannabis travel guide for 120+ countries",
  logo: "https://budquest.com/logo.png",
  foundingDate: "2019",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@budquest.com",
  },
  sameAs: [
    "https://twitter.com/budquest",
    "https://instagram.com/budquest",
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://budquest.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://budquest.com/about" },
  ],
};

/* ============================================
   COMPONENT
============================================ */
const About = () => {
  const [isDisclaimerExpanded, setDisclaimerExpanded] = useState(false);

  const values = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "From Amsterdam coffee-shops to Thai cannabis cafés, we cover 120+ countries with real-time updates within 24 hours of any law change.",
    },
    {
      icon: Shield,
      title: "Attorney-Verified Accuracy",
      description: "Every guide is cross-referenced with government gazettes, embassy notices, and local counsel ensuring 94% accuracy.",
    },
    {
      icon: Users,
      title: "Traveler-First Community",
      description: "Real reviews, real menus, real prices. Our community shares lounge etiquette, 420-friendly hotels, and travel safety tips.",
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Insights",
      description: "Track pending bills, licensing rounds, and consumption lounge openings months before they happen.",
    },
  ];

  const stats = [
    { label: "Countries", end: 120, icon: MapPin, suffix: "+" },
    { label: "Monthly Updates", end: 1200, icon: Calendar, suffix: "+" },
    { label: "Legal Resources", end: 4800, icon: Scale, suffix: "+" },
    { label: "Happy Travelers", end: 500000, icon: Leaf, suffix: "k+" },
  ];

  const steps = [
    {
      icon: SearchCheck,
      step: 1,
      title: "Automated Monitoring",
      desc: "We scan 400+ government URLs, parliamentary agendas, and regulatory dockets every six hours for new cannabis bills or rule changes.",
      position: "left",
    },
    {
      icon: Clock,
      step: 2,
      title: "Human Verification",
      desc: "A licensed attorney in the relevant jurisdiction reviews raw text, cross-checks with local bar associations, and drafts plain-language summaries.",
      position: "right",
    },
    {
      icon: ThumbsUp,
      step: 3,
      title: "Community Feedback",
      desc: "Within 48 hours of publication, on-the-ground travelers validate airport experiences, dispensary menus, and hotel policies.",
      position: "left",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      {/* ========== SEO META TAGS & STRUCTURED DATA ========== */}
      <head>
        <title>About BudQuest | Attorney-Verified Cannabis Travel Guide</title>
        <meta
          name="description"
          content="BudQuest is the world's first attorney-verified cannabis travel platform. Explore 120+ countries with real-time legal information and 420-friendly destinations."
        />
        <meta
          name="keywords"
          content="about BudQuest, cannabis travel guide, marijuana tourism, weed laws, 420 friendly destinations, cannabis travel safety, legal cannabis travel, cannabis vacation planner"
        />
        <meta name="author" content="BudQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://budquest.com/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About BudQuest - Cannabis Travel Authority" />
        <meta
          property="og:description"
          content="Discover how BudQuest provides attorney-verified cannabis travel information for 120+ countries"
        />
        <meta property="og:url" content="https://budquest.com/about" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(ABOUT_STRUCTURED_DATA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
      </head>

      <Navigation />

      {/* ========== BREADCRUMB NAVIGATION ========== */}
      <nav className="hidden sm:flex items-center gap-2 px-4 pt-20 pb-4 text-xs text-muted-foreground border-b border-border/50" aria-label="Breadcrumb">
        <a href="/" className="hover:text-accent transition-colors">Home</a>
        <ArrowRight className="w-3 h-3" />
        <span className="text-foreground font-medium">About</span>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section
        className="relative min-h-[50svh] sm:min-h-[60svh] flex items-center justify-center px-4 pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden"
        role="banner"
        aria-label="BudQuest About page hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto max-w-5xl text-center relative z-10 px-2"
        >
          <Badge className="mb-3 sm:mb-4 px-4 py-2 text-xs sm:text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-all w-fit mx-auto">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Cannabis Travel Authority Since 2019
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-2xl mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              Plan. Pack. Puff.
            </span>
            <br />
            <span className="text-lg sm:text-2xl md:text-3xl font-light text-foreground/80">Responsibly.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            BudQuest is the world's first attorney-verified cannabis travel platform. We translate complex weed laws into clear itineraries so you can explore the planet's most 420-friendly destinations—without the legal guesswork.
          </p>

          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm sm:text-base">
            <Award className="w-5 h-5" />
            <span>Trusted by 500k+ travelers worldwide</span>
          </div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section
        className="py-12 sm:py-16 px-4 bg-gradient-to-r from-accent/5 to-transparent border-b border-border/50"
        aria-labelledby="stats-heading"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl"
        >
          <h2 id="stats-heading" className="sr-only">BudQuest Coverage Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const { ref, count } = useCountUp(stat.end);
              return (
                <motion.div
                  key={stat.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {stat.end > 999 ? `${Math.round(count / 1000)}${stat.suffix}` : `${count}${stat.suffix}`}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="py-12 sm:py-16 px-4" aria-labelledby="mission-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl"
        >
          <Card className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-accent/30 transition-all">
            <h2
              id="mission-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2"
            >
              <Zap className="w-6 h-6 text-accent" />
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
              Cannabis legalization is moving faster than airline Wi-Fi. One week Thailand decriminalizes; the next week Germany opens recreational sales. We built BudQuest to close the information gap between lawmakers and luggage-packers.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Our editorial team—composed of former immigration attorneys, cannabis policy analysts, and veteran travel writers—turns statutes, health-department notices, and embassy bulletins into actionable travel advice you can trust at the border, the hotel check-in, and the consumption lounge.
            </p>
            <div className="flex items-center gap-3 text-accent font-semibold text-sm sm:text-base bg-accent/5 p-3 sm:p-4 rounded-lg">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>If the law changes at 2 p.m., we update the guide by 3 p.m.</span>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* ========== VALUES SECTION ========== */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent to-accent/5" aria-labelledby="values-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-6xl"
        >
          <h2 id="values-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-foreground">
            Why Travelers Choose BudQuest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 sm:p-6 md:p-8 h-full bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-accent/30 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== HOW IT WORKS - ALTERNATING TIMELINE ========== */}
      <section className="py-12 sm:py-16 px-4" aria-labelledby="process-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-5xl"
        >
          <h2 id="process-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-foreground">
            How We Keep Information Fresh
          </h2>

          {/* DESKTOP TIMELINE (Hidden on mobile) */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent/20 -translate-x-1/2" aria-hidden="true" />

              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: step.position === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="mb-12 last:mb-0"
                >
                  <div className={`flex items-center gap-8 ${step.position === "right" ? "flex-row-reverse" : ""}`}>
                    {/* Content Card */}
                    <div className="w-5/12">
                      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-accent/30 transition-all">
                        <div className="text-accent font-bold text-sm mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Step {step.step}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                      </Card>
                    </div>

                    {/* Center Icon */}
                    <div className="flex justify-center w-2/12">
                      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 text-background shadow-lg flex items-center justify-center border-4 border-background">
                        <step.icon className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Spacing for odd items */}
                    <div className="w-5/12" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* MOBILE STACKED CARDS */}
          <div className="md:hidden space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 sm:p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-accent/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-background shadow-lg flex items-center justify-center shrink-0">
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-accent font-bold text-xs sm:text-sm mb-1 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Step {step.step}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-accent/10 to-transparent border-y border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center"
        >
          <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-accent mx-auto mb-4 sm:mb-6 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            Travel Smart, Consume Responsibly
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 px-2">
            Cannabis laws are destination-specific, age-restricted, and often zero-tolerance for tourists. BudQuest gives you the roadmap—so you can enjoy the journey without unexpected detours through customs, courtrooms, or costly fines.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Know Before You Go", "Respect Local Culture", "Consume Legally & Safely"].map((text) => (
              <Badge
                key={text}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 transition-all text-xs sm:text-sm"
              >
                {text}
              </Badge>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== LEGAL DISCLAIMER (Mobile Optimized) ========== */}
      <section className="py-12 sm:py-16 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <Card 
            className="overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 cursor-pointer sm:cursor-default transition-all"
            onClick={() => setDisclaimerExpanded(!isDisclaimerExpanded)}
          >
            <div className="p-5 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                
                {/* Header Row: Icon + Title + Mobile Chevron */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <div className="flex items-center gap-3 sm:items-start">
                    <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-accent shrink-0" />
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-foreground sm:mt-[-2px]">
                      Attorney-Backed Disclaimer
                    </h2>
                  </div>
                  
                  {/* Mobile Toggle Icon */}
                  <div className="sm:hidden text-accent/70">
                    {isDisclaimerExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-full">
                  <div 
                    className={`
                      text-xs sm:text-base text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out
                      ${isDisclaimerExpanded ? "max-h-[500px] opacity-100" : "max-h-12 sm:max-h-none opacity-80 sm:opacity-100 overflow-hidden relative"}
                    `}
                  >
                    <p>
                      BudQuest provides informational content only and does <strong>not</strong> constitute legal advice. Cannabis laws vary by jurisdiction and can change rapidly. Always verify current statutes with local authorities before traveling, and consume responsibly where permitted. Travelers are solely responsible for compliance with all applicable laws. For legal questions, consult with a qualified attorney in your jurisdiction.
                    </p>
                    
                    {/* Fade effect for mobile when collapsed */}
                    {!isDisclaimerExpanded && (
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-card/10 to-transparent sm:hidden" />
                    )}
                  </div>
                  
                  {/* Mobile "Read More" text hint */}
                  {!isDisclaimerExpanded && (
                    <p className="text-[10px] font-semibold text-accent mt-2 sm:hidden uppercase tracking-wider">
                      Tap to read full disclaimer
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
