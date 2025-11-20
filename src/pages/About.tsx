import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe, Shield, Users, TrendingUp, MapPin, Calendar, Scale, Leaf,
  Plane, CheckCircle, Sparkles, Clock, SearchCheck, ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ----------  tiny live-counter hook (no package)  ---------- */
const useCountUp = (end: number, duration = 1500) => {
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
};

/* ----------  COMPONENT  ---------- */
const About = () => {
  const values = [
    { icon: Globe, title: "Global Coverage", description: "From Amsterdam coffee-shops to Thai cannabis cafés, we cover 120+ countries and all 50 U.S. states—updated within 24 hours of any law change." },
    { icon: Shield, title: "Attorney-Verified Accuracy", description: "Every guide is cross-referenced with government gazettes, embassy notices, and local counsel. If the law shifts, we shift with it—no stale wiki pages here." },
    { icon: Users, title: "Traveler-First Community", description: "Real reviews, real menus, real prices. Our 40 k-member forum shares lounge etiquette, 420-friendly hotels, and border-crossing tips you won’t find on Google." },
    { icon: TrendingUp, title: "Future-Proof Insights", description: "Track pending bills, licensing rounds, and consumption-lounge openings months before they happen—so you can book flights (and pre-rolls) ahead of the crowd." },
  ];

  const stats = [
    { label: "Countries", end: 120, icon: MapPin },
    { label: "Monthly Updates", end: 1200, icon: Calendar },
    { label: "Legal refs", end: 4800, icon: Scale },
    { label: "Happy Travelers", end: 500000, icon: Leaf },
  ];

  const steps = [
    { icon: SearchCheck, step: 1, title: "Automated Monitoring", desc: "We scan 400+ government URLs, parliamentary agendas, and regulatory dockets every six hours for new cannabis bills or rule changes." },
    { icon: Clock, step: 2, title: "Human Verification", desc: "A licensed attorney in the relevant jurisdiction reviews the raw text, cross-checks with local bar associations, and drafts the plain-language summary." },
    { icon: ThumbsUp, step: 3, title: "Community Feedback", desc: "Within 48 hours of publication, on-the-ground travelers validate airport experiences, dispensary menus, and hotel policies—ensuring real-world accuracy." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ----------  SEO  ---------- */}
      <head>
        <title>About Us | Green Globe - Cannabis Travel Guide 2025</title>
        <meta name="description" content="Meet Green Globe: the world's most accurate, attorney-verified cannabis travel guide. Discover 420-friendly destinations, up-to-date weed laws, and responsible consumption tips for 120+ countries." />
        <meta name="keywords" content="cannabis travel guide, 420 friendly vacations, marijuana tourism, weed laws by country, cannabis vacation planner, legal cannabis travel, cannabis friendly hotels, cannabis travel tips, Green Globe about us" />
        <link rel="canonical" href="https://greenglobe.com/about" />
      </head>

      <Navigation />

      {/* ----------  HERO  ---------- */}
      <section className="relative min-h-[60svh] md:min-h-[70svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
        <div className="container mx-auto max-w-6xl text-center relative z-10 px-2">
          <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] transition-shadow">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Cannabis Travel Authority Since 2019
          </Badge>

          {/* Fluid type: scales from 2.5rem (mobile) to 5.5rem (desktop) */}
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">Plan. Pack. Puff.</span>
            <br />
            <span className="text-foreground/90 font-light text-[clamp(1.8rem,6vw,4rem)]">Responsibly.</span>
          </h1>

          <p className="text-[clamp(1.1rem,2.5vw,1.75rem)] text-muted-foreground font-light mt-6 max-w-4xl mx-auto leading-relaxed">
            Green Globe is the world's first attorney-verified cannabis travel platform. We translate complex weed laws into clear itineraries so you can explore the planet's most 420-friendly destinations—without the legal guesswork.
          </p>

          {/* decorative sparkle */}
          <Sparkles className="w-6 h-6 text-accent mx-auto mt-6 animate-bounce" />
        </div>
      </section>

      {/* ----------  LIVE-STAT BAR  ---------- */}
      <section className="py-10 bg-gradient-to-r from-accent/10 to-transparent">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => {
            const { ref, count } = useCountUp(s.end);
            return (
              <div key={s.label} ref={ref} className="flex flex-col items-center">
                <s.icon className="w-8 h-8 text-accent mb-2" />
                <div className="text-[clamp(2rem,5vw,3rem)] font-bold text-foreground">
                  {s.end > 999 ? `${Math.round(count / 1000)}k` : count}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------  MISSION  ---------- */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8 md:p-12 bg-gradient-card border-border/50 hover:shadow-glow-subtle transition-shadow">
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-relaxed mb-6">
              Cannabis legalization is moving faster than airline Wi-Fi. One week Thailand decriminalizes; the next week Germany opens recreational sales. We built Green Globe to close the information gap between lawmakers and luggage-packers.
            </p>
            <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-relaxed mb-6">
              Our editorial team—composed of former immigration attorneys, cannabis policy analysts, and veteran travel writers—turns statutes, health-department notices, and embassy bulletins into actionable travel advice you can trust at the border, the hotel check-in, and the consumption lounge.
            </p>
            <div className="flex items-center gap-3 text-accent">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">If the law changes at 2 p.m., we update the guide by 3 p.m.</span>
            </div>
          </Card>
        </div>
      </section>

      {/* ----------  VALUES  ---------- */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-12 text-center text-foreground">Why Travelers Choose Green Globe</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <Card
                key={i}
                className="p-6 md:p-8 bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all group"
              >
                <v.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------  HOW IT WORKS (mobile-first timeline)  ---------- */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-8 text-center text-foreground">How We Keep Information Fresh</h2>

          {/* Desktop timeline with line */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 -translate-x-1/2" />
            {steps.map((s, i) => (
              <div key={i} className="flex items-center mb-10 last:mb-0">
                <div className={`w-1/2 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <Card className="p-6 bg-gradient-card border-border/50 inline-block">
                    <div className="text-accent font-bold text-sm mb-2">Step {s.step}</div>
                    <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </Card>
                </div>
                <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-background shadow-lg">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>

          {/* Mobile stacked cards (no line) */}
          <div className="md:hidden grid gap-6">
            {steps.map((s, i) => (
              <Card key={i} className="p-6 bg-gradient-card border-border/50 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center shadow-lg">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-accent font-bold text-sm mb-1">Step {s.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------  CTA  ---------- */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <Plane className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse" />
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-4 text-foreground">Travel Smart, Consume Responsibly</h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-relaxed mb-8">
            Cannabis laws are destination-specific, age-restricted, and often zero-tolerance for tourists. Green Globe gives you the roadmap—so you can enjoy the journey without unexpected detours through customs, courtrooms, or costly fines.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Know Before You Go', 'Respect Local Culture', 'Consume Legally & Safely'].map((t) => (
              <Badge key={t} variant="outline" className="border-accent text-accent">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ----------  DISCLAIMER  ---------- */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-6 md:p-8 bg-accent/5 border-accent/20 text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4 text-foreground">Attorney-Backed Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Green Globe provides informational content only and does not constitute legal advice. Cannabis laws vary by jurisdiction and can change rapidly. Always verify current statutes with local authorities before traveling, and consume responsibly where permitted. Travelers are solely responsible for compliance with all applicable laws.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
