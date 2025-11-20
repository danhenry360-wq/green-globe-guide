// src/pages/Contact.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail, MessageSquare, AlertCircle, Sparkles, CheckCircle, Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ----------  JSON-LD structured data (SEO)  ---------- */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Green Globe",
  url: "https://greenglobe.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Green Globe",
    url: "https://greenglobe.com",
    logo: "https://greenglobe.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer support",
      email: "support@greenglobe.com",
      availableLanguage: ["English"],
      areaServed: "US",
    },
  },
};

/* ----------  live counter hook (no package)  ---------- */
const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
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
const Contact = () => {
  const [sent, setSent] = useState(false);
  const stats = [
    { label: "Countries", end: 120, icon: Mail },
    { label: "Monthly Updates", end: 1200, icon: MessageSquare },
    { label: "Legal refs", end: 4800, icon: AlertCircle },
    { label: "Happy Travelers", end: 500000, icon: CheckCircle },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      {/* ----------  SEO + structured data  ---------- */}
      <head>
        <title>Contact Us | Green Globe – Cannabis Travel Support 2025</title>
        <meta name="description" content="Reach Green Globe for questions, suggestions, or to report outdated cannabis travel info. We usually reply within 24 hours." />
        <meta name="keywords" content="Green Globe contact, cannabis travel support, 420 travel help, report outdated law, marijuana tourism question" />
        <link rel="canonical" href="https://greenglobe.com/contact" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </head>

      <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
        <Navigation />

        {/* ----------  HERO  ---------- */}
        <section className="relative min-h-[60svh] md:min-h-[70svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10 px-2">
            <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Contact Us
            </Badge>

            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl">
              Get In Touch
            </h1>
            <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-muted-foreground font-light mt-4 max-w-2xl mx-auto leading-relaxed">
              Have a question, suggestion, or want to report outdated information? We'd love to hear from you.
            </p>
            <Sparkles className="w-6 h-6 text-accent mx-auto mt-6 animate-bounce" />
          </div>
        </section>

        {/* ----------  LIVE-STAT BAR  ---------- */}
        <section className="py-10 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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

        {/* ----------  HOW WE KEEP INFORMATION FRESH  ---------- */}
        <section className="py-10 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              How we keep information fresh
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {/* Step 1 – left */}
              <div className="md:col-start-1 bg-card/50 border border-border/30 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground grid place-items-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Continuous Legal Monitoring</h3>
                    <p className="text-muted-foreground">Our team tracks legislation daily and updates country pages within 24 h of official changes.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 – right */}
              <div className="md:col-start-2 bg-card/50 border border-border/30 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground grid place-items-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Community Reports</h3>
                    <p className="text-muted-foreground">Travelers submit first-hand experiences; each report is verified by editors before publication.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 – left */}
              <div className="md:col-start-1 bg-card/50 border border-border/30 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground grid place-items-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Monthly Expert Review</h3>
                    <p className="text-muted-foreground">Cannabis lawyers audit every country page monthly; outdated sections are rewritten immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------  CONTACT CARDS  ---------- */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mail, title: "Email Us", desc: "support@greenglobe.com" },
                { icon: MessageSquare, title: "Live Chat", desc: "Mon-Fri, 9am-5pm EST" },
                { icon: AlertCircle, title: "Report Issue", desc: "Help us stay accurate" },
              ].map((c) => (
                <Card
                  key={c.title}
                  className="p-6 bg-gradient-card border-border/50 text-center hover:shadow-glow-subtle transition-shadow group"
                >
                  <c.icon className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </Card>
              ))}
            </div>

            {/* FORM CARD */}
            <Card className="p-6 md:p-10 bg-gradient-card border-border/50 relative">
              {sent && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <div className="flex items-center gap-3 text-accent">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Message sent! We'll reply within 24 h.</span>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-card border-border" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-card border-border" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" className="bg-card border-border" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." rows={6} className="bg-card border-border resize-none" required />
                </div>
                <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg gap-2">
                  <Send className="w-5 h-5" /> Send Message
                </Button>
              </form>
            </Card>

            {/* DISCLAIMER */}
            <Card className="mt-8 p-6 bg-accent/5 border-accent/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Please note:</strong> We are an informational resource and do not provide legal advice. For legal questions, please consult with a qualified attorney in your jurisdiction.
              </p>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
