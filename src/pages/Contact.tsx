import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageSquare,
  AlertCircle,
  Sparkles,
  CheckCircle,
  ChevronDown,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---- live counter hook (no package) ----
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

const Contact = () => {
  const [sent, setSent] = useState(false);
  const stats = [
    { label: "Destinations", end: 120, icon: Mail },
    { label: "Monthly Updates", end: 1200, icon: MessageSquare },
    { label: "Legal refs", end: 4800, icon: AlertCircle },
    { label: "Happy Travelers", end: 500000, icon: CheckCircle },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000); // auto-hide after 4s
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ----------  SEO (no helmet)  ---------- */}
      <head>
        <title>Contact Us | Green Globe - Cannabis Travel Support 2025</title>
        <meta name="description" content="Reach Green Globe for questions, suggestions, or to report outdated cannabis travel info. We usually reply within 24 hours." />
        <meta name="keywords" content="Green Globe contact, cannabis travel support, 420 travel help, report outdated law, marijuana tourism question" />
        <link rel="canonical" href="https://greenglobe.com/contact" />
      </head>

      <Navigation />

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 animate-pulse">Contact Us</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground leading-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or want to report outdated information? We'd love to hear from you.
          </p>
          <Sparkles className="w-6 h-6 text-accent mx-auto mt-6 animate-bounce" />
        </div>
      </section>

      {/* LIVE-STAT CARDS */}
      <section className="py-10 bg-gradient-to-r from-accent/10 to-transparent">
        <div className="container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => {
            const { ref, count } = useCountUp(s.end);
            return (
              <div key={s.label} ref={ref} className="flex flex-col items-center">
                <s.icon className="w-8 h-8 text-accent mb-2" />
                <div className="text-3xl font-bold text-foreground">
                  {s.end > 999 ? `${Math.round(count / 1000)}k` : count}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card border-border/50 text-center hover:shadow-glow-subtle transition-shadow group">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@greenglobe.com</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50 text-center hover:shadow-glow-subtle transition-shadow group">
              <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50 text-center hover:shadow-glow-subtle transition-shadow group">
              <AlertCircle className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground mb-2">Report Issue</h3>
              <p className="text-sm text-muted-foreground">Help us stay accurate</p>
            </Card>
          </div>

          {/* FORM CARD */}
          <Card className="p-8 md:p-12 bg-gradient-card border-border/50 relative">
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
  );
};

export default Contact;
