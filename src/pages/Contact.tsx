import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Mail, MessageSquare, AlertCircle, Sparkles, CheckCircle, Send,
  MapPin, Clock, Globe, Shield, Zap, Users, HeadphonesIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ----------  SEO STRUCTURED DATA  ---------- */
const CONTACT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BudQuest - Cannabis Travel Support",
  url: "https://budquest.com/contact",
  description: "Get in touch with BudQuest for cannabis travel questions, law updates, or hotel recommendations",
  mainEntity: {
    "@type": "Organization",
    name: "BudQuest",
    url: "https://budquest.guide",
    logo: "https://budquest.guide/logo.png",
    description: "Global cannabis travel guide with legal status, 420-friendly hotels, and travel regulations",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@budquest.guide",
        availableLanguage: ["en"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "report outdated information",
        email: "updates@budquest.guide",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/budquest",
      "https://instagram.com/budquest",
    ],
  },
};

const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are cannabis laws changing frequently?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, cannabis regulations change rapidly worldwide. BudQuest updates its database monthly with verified legal changes across 120+ countries.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is BudQuest information?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our data is 94% verified through official government sources, legal databases, and cannabis tourism experts. Always verify local laws before traveling.",
      },
    },
    {
      "@type": "Question",
      name: "Can I contact BudQuest about outdated information?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Use our contact form to report outdated laws, regulations, or hotel information. We respond within 24 hours.",
      },
    },
  ],
};

/* ----------  ANIMATED COUNTER HOOK  ---------- */
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

/* ----------  MOBILE-OPTIMIZED FORM COMPONENT  ---------- */
interface FormState {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validateForm = () => {
    const newErrors: Partial<FormState> = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject required";
    if (!formData.message.trim()) newErrors.message = "Message required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };e

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSent(true);

      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      // Keep success message visible for 3 seconds
      setTimeout(() => {
        setSent(false);
        setFormData({ name: "", email: "", subject: "", category: "general", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSent(false);
      setErrors({ message: "Failed to send message. Please try again." });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <Card className="p-4 sm:p-6 md:p-10 bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-xl">
      {sent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-50"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Message Sent!</p>
              <p className="text-xs sm:text-sm text-muted-foreground">We'll reply within 24 hours</p>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-5">
        {/* NAME & EMAIL - STACKED ON MOBILE */}
        <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2.5">
            <Label
              htmlFor="name"
              className="text-base sm:text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Users className="w-5 h-5 sm:w-4 sm:h-4 text-accent" />
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={`bg-card border-2 transition-all text-base h-14 sm:h-12 px-4 ${
                errors.name ? "border-red-500" : "border-border focus:border-accent"
              }`}
              required
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="email"
              className="text-base sm:text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Mail className="w-5 h-5 sm:w-4 sm:h-4 text-accent" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={`bg-card border-2 transition-all text-base h-14 sm:h-12 px-4 ${
                errors.email ? "border-red-500" : "border-border focus:border-accent"
              }`}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="space-y-2.5">
          <Label
            htmlFor="category"
            className="text-base sm:text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <Zap className="w-5 h-5 sm:w-4 sm:h-4 text-accent" />
            Inquiry Type
          </Label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-card border-2 border-border focus:border-accent rounded-lg px-4 py-3.5 sm:py-3 text-base focus:outline-none transition-all font-medium text-foreground"
          >
            <option value="general">General Question</option>
            <option value="law-update">Report Outdated Law</option>
            <option value="hotel">Hotel Information</option>
            <option value="bug">Report Technical Issue</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* SUBJECT */}
        <div className="space-y-2.5">
          <Label
            htmlFor="subject"
            className="text-base sm:text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5 sm:w-4 sm:h-4 text-accent" />
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            placeholder="Brief topic of your message..."
            value={formData.subject}
            onChange={handleChange}
            className={`bg-card border-2 transition-all text-base h-14 sm:h-12 px-4 ${
              errors.subject ? "border-red-500" : "border-border focus:border-accent"
            }`}
            required
          />
          {errors.subject && (
            <p className="text-xs text-red-500 font-medium">{errors.subject}</p>
          )}
        </div>

        {/* MESSAGE - EXPANDED ON ALL DEVICES */}
        <div className="space-y-2.5">
          <Label
            htmlFor="message"
            className="text-base sm:text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <HeadphonesIcon className="w-5 h-5 sm:w-4 sm:h-4 text-accent" />
            Your Message
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us more details... (minimum 20 characters)"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`bg-card border-2 transition-all text-base p-4 font-medium resize-none min-h-[160px] ${
              errors.message ? "border-red-500" : "border-border focus:border-accent"
            }`}
            required
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {formData.message.length} / 1000 characters
            </div>
            {errors.message && (
              <p className="text-xs text-red-500 font-medium">{errors.message}</p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON - FULL WIDTH ON MOBILE */}
        <Button
          type="submit"
          disabled={sent}
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold h-14 sm:h-12 text-base sm:text-lg gap-2 transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          Send Message
        </Button>

        {/* LEGAL DISCLAIMER */}
        <p className="text-xs text-muted-foreground text-center pt-2">
          By submitting, you agree to our Privacy Policy. We'll respond within 24 hours.
        </p>
      </form>
    </Card>
  );
};

/* ----------  MAIN COMPONENT  ---------- */
const Contact = () => {
  const stats = [
    { label: "Countries Covered", end: 120, icon: Globe },
    { label: "Monthly Updates", end: 1200, icon: Zap },
    { label: "Legal Resources", end: 50, icon: Shield },
    { label: "Travelers Helped", end: 3000, icon: Users },
  ];

  const contactChannels = [
    {
      icon: Mail,
      title: "Email Support",
      desc: "General questions and inquiries",
      contact: "support@budquest.guide",
      response: "24 hours",
    },
    {
      icon: AlertCircle,
      title: "Report Outdated Info",
      desc: "Report incorrect laws or data",
      contact: "updates@budquest.guide",
      response: "12 hours",
    },
  ];

  const faqs = [
    {
      q: "How often is BudQuest information updated?",
      a: "We update our database monthly with verified legal changes across 120+ countries. Critical changes are updated immediately.",
    },
    {
      q: "Is BudQuest information legal advice?",
      a: "No. BudQuest provides informational resources only. Always consult a qualified attorney in your jurisdiction for legal advice.",
    },
    {
      q: "Can I report outdated information?",
      a: "Absolutely! Email updates@budquest.guide with details. We verify and update within 12 hours if accurate.",
    },
    {
      q: "Do you provide hotel recommendations?",
      a: "Yes! Check our Hotels section for 420-friendly accommodations in 300+ locations worldwide with reviews.",
    },
    {
      q: "What is your data accuracy rate?",
      a: "Our information is 94% verified through official government sources, legal databases, and cannabis tourism experts.",
    },
    {
      q: "Is cannabis legal everywhere on BudQuest?",
      a: "No. We cover recreational, medical, and decriminalized locations. Always verify local laws before traveling.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      {/* SEO META TAGS */}
      <head>
        <title>Contact BudQuest | Cannabis Travel Support & Questions</title>
        <meta
          name="description"
          content="Get in touch with BudQuest for cannabis travel questions, report outdated laws, or hotel recommendations. Expert support within 24 hours."
        />
        <meta
          name="keywords"
          content="contact BudQuest, cannabis travel support, report outdated law, 420 travel help, cannabis tourism question, legal update"
        />
        <meta name="author" content="BudQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://budquest.com/contact" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact BudQuest | Cannabis Travel Support" />
        <meta
          property="og:description"
          content="Reach out to BudQuest for cannabis travel questions and support"
        />
        <meta property="og:url" content="https://budquest.com/contact" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(CONTACT_STRUCTURED_DATA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_STRUCTURED_DATA)}</script>
      </head>

      <Navigation />

      {/* ==========  HERO SECTION  ========== */}
      <section
        className="relative min-h-[50svh] sm:min-h-[60svh] flex items-center justify-center px-4 pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden"
        role="banner"
        aria-label="BudQuest Contact page hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl text-center relative z-10 px-2"
        >
          <Badge className="mb-3 sm:mb-4 px-4 py-2 text-xs sm:text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors w-fit mx-auto">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Get In Touch
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-2xl mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              We're Here to Help
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Questions about cannabis travel laws? Report outdated information? We'd love to hear from you and help make your journey safer.
          </p>
        </motion.div>
      </section>

      {/* ==========  STATS SECTION  ========== */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-accent/5 to-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl"
        >
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
                  className="text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {stat.end > 999 ? `${Math.round(count / 1000)}k` : count}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ==========  CONTACT CHANNELS  ========== */}
      <section className="py-12 sm:py-16 px-4" aria-labelledby="contact-channels-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl"
        >
          <h2 id="contact-channels-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            How to Reach Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
            {contactChannels.map((channel, i) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 sm:p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-accent/30 transition-all group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <channel.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-sm sm:text-base">{channel.title}</h3>
                        <p className="text-xs text-muted-foreground">{channel.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mt-2">
                    <p className="font-mono text-accent break-all text-base">{channel.contact}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Response: {channel.response}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  CONTACT FORM SECTION  ========== */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent to-accent/5" aria-labelledby="form-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <h2 id="form-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">
            Send Us a Message
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base mb-8 px-2">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
          <ContactForm />
        </motion.div>
      </section>

      {/* ==========  FAQ SECTION  ========== */}
      <section className="py-12 sm:py-16 px-4" aria-labelledby="faq-heading">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 sm:p-5 bg-card border-border/50 hover:border-accent/30 transition-all">
                  <details className="group cursor-pointer">
                    <summary className="flex items-start justify-between gap-4 font-semibold text-foreground text-sm sm:text-base">
                      <span>{faq.q}</span>
                      <span className="text-accent group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========  LEGAL DISCLAIMER  ========== */}
      <section className="py-12 px-4 bg-accent/5 border-t border-accent/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <Card className="p-5 sm:p-6 bg-card border-accent/20">
            <div className="flex gap-3 sm:gap-4 items-start">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Legal Notice</p>
                <p className="leading-relaxed">
                  BudQuest is an informational resource and does <strong>not</strong> provide legal advice. Cannabis laws vary by jurisdiction and change frequently. Always verify local regulations before traveling and consult with a qualified attorney in your jurisdiction for legal matters. Users are solely responsible for understanding and complying with local cannabis laws.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
