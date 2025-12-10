import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Mountain, AlertTriangle, CheckCircle, XCircle, Clock, Shield,
  Home, Building, Ban, Flame, Wind, Cookie, MapPin, Plane,
  ChevronRight, ArrowRight, Mail, Share2, Bed, Store,
  AlertCircle, Timer, Thermometer, Droplets, Coffee
} from "lucide-react";

const ColoradoConsumptionGuide = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSignup = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email,
        source_page: '/colorado/consumption-guide'
      });

      if (error && error.code !== '23505') throw error;
      
      toast({
        title: "You're in! 🌿",
        description: "Colorado insider tips coming your way.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const quickStats = [
    { icon: Cookie, label: "Edibles", value: "95%", sublabel: "Safe", color: "text-green-400" },
    { icon: Wind, label: "Vaping", value: "80%", sublabel: "Safe", color: "text-green-400" },
    { icon: Flame, label: "Smoking", value: "40%", sublabel: "Risky", color: "text-amber-400" },
    { icon: MapPin, label: "Outside", value: "100%", sublabel: "Best", color: "text-accent" },
  ];

  const methodCards = [
    {
      title: "🍫 Edibles",
      safety: "95%",
      safetyColor: "bg-green-500",
      smell: "None",
      speed: "2-4 hours",
      duration: "6-8 hours",
      dose: "5-10mg",
      setup: "None",
      cleanup: "Trash",
      bestTime: "2-3 PM",
      risk: "Low",
      works: "All rentals"
    },
    {
      title: "🌿 Vaping",
      safety: "80%",
      safetyColor: "bg-green-500",
      smell: "Minimal",
      speed: "15-30 min",
      duration: "2-4 hours",
      dose: "Your choice",
      setup: "Window + Fan",
      cleanup: "30 min",
      bestTime: "Evening",
      risk: "Medium",
      works: "Risky in Airbnb"
    },
    {
      title: "🚶 Outside",
      safety: "100%",
      safetyColor: "bg-accent",
      smell: "Wind takes it",
      speed: "Your choice",
      duration: "Your choice",
      dose: "Any",
      setup: "None",
      cleanup: "None",
      bestTime: "Anytime",
      risk: "Zero",
      works: "Best option"
    },
    {
      title: "🚨 Federal Land",
      safety: "0%",
      safetyColor: "bg-red-500",
      smell: "N/A",
      speed: "N/A",
      duration: "6 months jail",
      dose: "N/A",
      setup: "N/A",
      cleanup: "N/A",
      bestTime: "NEVER",
      risk: "Federal Crime",
      works: "DO NOT"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Consume Cannabis in Colorado Rentals (Without Getting Caught)",
    "description": "Complete guide to safely and discreetly consuming cannabis in Colorado hotels, Airbnbs, VRBOs, and vacation rentals.",
    "author": { "@type": "Organization", "name": "BudQuest" },
    "publisher": { "@type": "Organization", "name": "BudQuest", "url": "https://budquest.guide" },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <Helmet>
        <title>How to Consume Cannabis in Colorado Rentals | BudQuest Guide</title>
        <meta name="description" content="Safe, discreet methods to consume cannabis in Colorado hotels, Airbnbs, VRBOs. Edibles vs vaping guide. Federal land warnings. Complete 2025 guide." />
        <meta name="keywords" content="colorado cannabis consumption, how to smoke weed in hotel, cannabis airbnb colorado, edibles vs vaping, discreet cannabis consumption" />
        <link rel="canonical" href="https://budquest.guide/colorado/consumption-guide" />
        <meta property="og:title" content="Colorado Cannabis Consumption Cheat Sheet | BudQuest" />
        <meta property="og:description" content="Skip the paranoia. Safe methods for consuming cannabis in Colorado rentals." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 pt-20 pb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/usa/colorado" className="hover:text-accent">Colorado</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">Consumption Guide</li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/30">
                <Mountain className="w-4 h-4 mr-2" />
                Colorado Cannabis Cheat Sheet
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  🏔️ How to Consume Cannabis in Colorado Rentals
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Skip the paranoia. Here's exactly how to do it safely—and discreetly—in even the strictest 
                hotels, Airbnbs, VRBOs, and vacation rentals.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
                {quickStats.map((stat, i) => (
                  <Card key={i} className="bg-card/50 border-border/30 p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}: {stat.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* REALITY CHECK */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Card className="bg-amber-500/10 border-amber-500/30 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-amber-400 mb-4">⚠️ Let's Be Real: The Actual Risks</h2>
                      <p className="text-muted-foreground mb-4">
                        Colorado legalized cannabis, which is awesome. But here's the thing—your rental probably didn't. 
                        Most hotels, Airbnbs, VRBOs, and vacation rentals have strict no-smoking policies. Get caught, and you're looking at:
                      </p>
                      <ul className="space-y-2 mb-6">
                        {[
                          "$500-2,000 cleaning fee",
                          "Immediate eviction (goodbye vacation)",
                          "Bad review on your rental account",
                          "Credit card charged without warning"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <XCircle className="w-4 h-4 text-red-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-foreground font-medium">
                        But here's the good news: You can consume safely, discreetly, and with almost zero risk—if you know what you're doing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FEDERAL LAND WARNING */}
        <section className="py-12 md:py-16 bg-red-500/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Card className="bg-red-500/10 border-red-500/50 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">
                        🚨 FEDERAL LAND = COMPLETELY DIFFERENT RULES
                      </h2>
                      <p className="text-foreground mb-4 font-medium">
                        If you're on federal land (National Parks, National Forests), cannabis is a <span className="text-red-400">FEDERAL CRIME</span>. 
                        Not a state law. A federal crime.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-semibold text-red-400 mb-2">Penalties:</h3>
                          <ul className="space-y-1 text-muted-foreground text-sm">
                            <li>❌ Up to 6 months jail</li>
                            <li>❌ Up to $5,000 fine</li>
                            <li>❌ Criminal record</li>
                            <li>❌ Federal prosecution</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-400 mb-2">Federal Land Includes:</h3>
                          <ul className="space-y-1 text-muted-foreground text-sm">
                            <li>• Rocky Mountain National Park</li>
                            <li>• Great Sand Dunes</li>
                            <li>• Mesa Verde National Park</li>
                            <li>• All National Forests</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                        <p className="text-green-400 font-medium">
                          ✅ STATE PARKS & Private Property = Colorado law applies (owner decides)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* METHOD 1: EDIBLES */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">✅ Edibles: The Goldilocks Option</h2>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">95% Safe</Badge>
                </div>
              </div>

              <Card className="bg-card/50 border-border/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground italic mb-6">
                    "No smell. No smoke. No evidence. It's basically the perfect crime... except it's not a crime."
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-400 mb-3">Why Edibles Are King:</h3>
                      <ul className="space-y-2">
                        {[
                          "Zero smell (literally cannot be detected)",
                          "Zero smoke (no visible evidence)",
                          "Zero suspicion (just eating candy)",
                          "Long-lasting (effects 6-8 hours)",
                          "Works everywhere (any rental)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400 mb-3">The Downside:</h3>
                      <ul className="space-y-2">
                        {[
                          "Takes 2-4 hours to kick in",
                          "Effects unpredictable (first time)",
                          "Duration long (could be still high next AM)",
                          "Easy to overdo (patience required)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                            <Timer className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="buying" className="border border-border/30 rounded-lg overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-accent" />
                      Step 1: Buying the Edibles
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    <p className="mb-3">At the dispensary, look for:</p>
                    <ul className="space-y-1 mb-4">
                      <li>🍬 <strong>Gummies</strong> (most popular, easy to dose)</li>
                      <li>🍫 <strong>Chocolate</strong> (delicious, easy to portion)</li>
                      <li>🍪 <strong>Skip cookies</strong> (harder to dose)</li>
                    </ul>
                    <p className="text-sm">Pro tip: Gummies are discreet, taste good, and come in precise 5-10mg doses.</p>
                    <Button asChild variant="outline" size="sm" className="mt-3">
                      <Link to="/dispensary">Find Dispensaries Near You</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timing" className="border border-border/30 rounded-lg overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Step 2: Timing (Critical!)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> 7-10 AM: Too early</p>
                      <p className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> 10 AM - 2 PM: Cleaning time (risky)</p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> <strong>2-3 PM: Sweet spot</strong></p>
                      <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> 7 PM+: Evening (relaxed)</p>
                      <p className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> After 9 PM: Risky (groggy checkout)</p>
                    </div>
                    <div className="bg-accent/10 p-3 rounded-lg text-sm">
                      <strong>Perfect timing:</strong> 3 PM consume → 5 PM effects → 11 PM bed → 9 AM checkout (sober) ✅
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dosing" className="border border-border/30 rounded-lg overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-accent" />
                      Step 3: Dosing Guide
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-500/10 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-400">5mg</div>
                        <div className="text-xs">Light effect</div>
                      </div>
                      <div className="bg-accent/10 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-accent">10mg</div>
                        <div className="text-xs">Normal effect</div>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-amber-400">15mg</div>
                        <div className="text-xs">Strong effect</div>
                      </div>
                      <div className="bg-red-500/10 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-400">20mg+</div>
                        <div className="text-xs">"Why did I do this"</div>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 p-3 rounded-lg text-sm border border-amber-500/30">
                      <AlertTriangle className="w-4 h-4 text-amber-400 inline mr-2" />
                      <strong>Altitude warning:</strong> Colorado's 5,280ft makes effects 20-30% stronger. Use LESS than normal!
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* METHOD 2: VAPING */}
        <section className="py-12 md:py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Wind className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">🌿 Vaping: The Middle Ground</h2>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">80% Safe</Badge>
                </div>
              </div>

              <Card className="bg-card/50 border-border/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground mb-6">
                    Want faster effects than edibles? Vaping is your answer. Less smell than smoking, faster kick-in. 
                    Here's how to not get caught.
                  </p>

                  <h3 className="font-semibold text-accent mb-3">🏨 The Setup (Critical!):</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Window", detail: "WIDE open (not cracked)" },
                      { label: "Bathroom Fan", detail: "On before you start" },
                      { label: "Door", detail: "Closed + towel under gap" },
                      { label: "Position", detail: "Vape near window, exhale outside" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                    <p className="text-amber-400 font-medium mb-2">⚠️ Special Warning for Airbnb/VRBO:</p>
                    <p className="text-sm text-muted-foreground">
                      Landlords check HARD between guests. They specifically look for vaping smell. 
                      Consider <strong>edibles only</strong> for shared/strict rentals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* THE OUTSIDE STRATEGY */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">🚶 Go Outside: The Actual Best Option</h2>
                  <Badge className="bg-accent/20 text-accent border-accent/30">100% Safe</Badge>
                </div>
              </div>

              <Card className="bg-accent/5 border-accent/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-lg mb-6">
                    Forget sneaking around. The honest best option? Just go outside. It's legal, safe, and way more enjoyable.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      { title: "Quiet Street/Alley", time: "10 min", vibe: "Urban explorer" },
                      { title: "Park/Green Space", time: "20-30 min", vibe: "Outdoor enthusiast" },
                      { title: "Scenic Overlook", time: "45 min - 1 hr", vibe: "Incredible views" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-card/50 rounded-lg border border-border/30">
                        <h3 className="font-semibold text-accent mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">⏱️ {item.time}</p>
                        <p className="text-sm text-muted-foreground">✨ {item.vibe}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground italic">
                    Real talk: Consuming cannabis while looking at Colorado mountains is genuinely amazing. Do this.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* QUICK REFERENCE CARDS */}
        <section className="py-12 md:py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              📋 Quick Reference Cards
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {methodCards.map((card, i) => (
                <Card key={i} className="bg-card/50 border-border/30 overflow-hidden">
                  <div className={`h-2 ${card.safetyColor}`} />
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-3">{card.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Safety:</span>
                        <span className={card.safety === "0%" ? "text-red-400" : "text-green-400"}>{card.safety}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Smell:</span>
                        <span>{card.smell}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Speed:</span>
                        <span>{card.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{card.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Risk:</span>
                        <span className={card.risk === "Federal Crime" ? "text-red-400 font-bold" : ""}>{card.risk}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ALTITUDE SECTION */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-gradient-to-br from-accent/10 to-card border-accent/30">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <Mountain className="w-10 h-10 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4">🏔️ Altitude Effect: Why You'll Get MORE High</h2>
                    <p className="text-muted-foreground mb-4">
                      Colorado is 5,280 feet elevation. That matters because:
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        "Cannabis effects are 20-30% stronger",
                        "Everything hits faster",
                        "Cottonmouth is worse (already dehydrated)",
                        "Paranoia risk slightly higher"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-card/50 rounded-lg text-center">
                        <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                        <div className="text-sm font-medium">Drink extra water</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg text-center">
                        <Coffee className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                        <div className="text-sm font-medium">Eat before consuming</div>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg text-center">
                        <Timer className="w-5 h-5 mx-auto mb-1 text-accent" />
                        <div className="text-sm font-medium">Start with smaller dose</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* DO's AND DON'Ts */}
        <section className="py-12 md:py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">✅ & ❌ Quick Rules</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-500/5 border-green-500/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">DO ✅</h3>
                  <ul className="space-y-2">
                    {[
                      "Use edibles (safest)",
                      "Vape with window open + fan",
                      "Go outside (best option)",
                      "Lock your door",
                      "Stay in room while high",
                      "Drink water (altitude)",
                      "Be respectful to staff"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-500/5 border-red-500/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">DON'T ❌</h3>
                  <ul className="space-y-2">
                    {[
                      "Smoke indoors (highest risk)",
                      "Consume in common areas",
                      "Be obviously high in public",
                      "Leave evidence in room",
                      "Consume before driving",
                      "Transport across state lines",
                      "Consume on federal land"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <XCircle className="w-4 h-4 text-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-muted/30 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  ⚠️ Important Legal Notice
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This guide is for informational purposes only. Cannabis is legal in Colorado but illegal federally. 
                  Rental policies override cannabis legality. Never transport cannabis across state lines (federal crime). 
                  Never consume on federal land (federal crime). You are solely responsible for following all laws.
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  If you can't follow these guidelines safely, don't consume in your rental. Period.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Ready to Plan Your Colorado Cannabis Trip?
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to="/hotels">
                  <Bed className="w-5 h-5 mr-2" />
                  Browse 420-Friendly Rentals
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent/30">
                <Link to="/dispensary">
                  <Store className="w-5 h-5 mr-2" />
                  Find Dispensaries
                </Link>
              </Button>
            </div>

            {/* Newsletter */}
            <Card className="bg-accent/5 border-accent/30 max-w-xl mx-auto">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Get Colorado Insider Tips</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Weekly updates on new dispensaries, deals, and hidden gems.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50"
                  />
                  <Button onClick={handleNewsletterSignup} className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* RELATED GUIDES */}
        <section className="py-12 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Related Guides</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/usa/colorado" className="text-accent hover:underline">Colorado Hub</Link>
              <Link to="/denver" className="text-accent hover:underline">Denver Guide</Link>
              <Link to="/boulder" className="text-accent hover:underline">Boulder Guide</Link>
              <Link to="/aspen" className="text-accent hover:underline">Aspen Guide</Link>
              <Link to="/colorado-springs" className="text-accent hover:underline">Colorado Springs</Link>
              <Link to="/blog" className="text-accent hover:underline">Travel Blog</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ColoradoConsumptionGuide;