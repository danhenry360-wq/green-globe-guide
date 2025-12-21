import { Helmet } from 'react-helmet';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Mountain,
  Droplets,
  Brain,
  AlertTriangle,
  CheckCircle,
  Heart,
  Wind,
  Thermometer,
  ArrowRight,
  Pill,
  Coffee,
  Moon,
  Activity,
  Gauge,
  Info,
  Zap
} from 'lucide-react';

const AltitudeGuide = () => {
  const elevations = [
    { city: "Denver", elevation: "5,280 ft", effect: "20-30% stronger", level: "moderate" },
    { city: "Boulder", elevation: "5,430 ft", effect: "25-35% stronger", level: "moderate" },
    { city: "Colorado Springs", elevation: "6,035 ft", effect: "30-40% stronger", level: "high" },
    { city: "Aspen", elevation: "7,908 ft", effect: "40-50% stronger", level: "high" },
    { city: "Breckenridge", elevation: "9,600 ft", effect: "50-60% stronger", level: "extreme" },
    { city: "Leadville", elevation: "10,152 ft", effect: "60%+ stronger", level: "extreme" },
  ];

  const symptoms = [
    { icon: Brain, title: "Intensified Mental Effects", description: "THC hits faster and harder at altitude. What normally feels mild can become overwhelming." },
    { icon: Heart, title: "Increased Heart Rate", description: "Your heart is already working harder at altitude. Cannabis can amplify this effect." },
    { icon: Wind, title: "Breathing Changes", description: "Less oxygen available means breathing effects from cannabis are more noticeable." },
    { icon: Thermometer, title: "Temperature Sensitivity", description: "Both altitude and cannabis affect body temperature regulation." },
    { icon: Droplets, title: "Severe Dehydration", description: "Altitude dehydrates you. Cannabis causes cottonmouth. Combined = serious dehydration." },
    { icon: Activity, title: "Dizziness & Nausea", description: "The combination can cause vertigo, especially if you're not acclimated." },
  ];

  const dosingTips = [
    {
      title: "First 24-48 Hours",
      icon: Moon,
      tip: "Don't consume cannabis at all during your first day or two. Let your body adjust to the altitude first.",
      color: "destructive"
    },
    {
      title: "Start at 50%",
      icon: Gauge,
      tip: "Take half your normal dose. If you usually take 10mg edible, start with 5mg. You can always take more.",
      color: "accent"
    },
    {
      title: "Wait Longer",
      icon: Coffee,
      tip: "Effects take longer to assess at altitude. Wait at least 2-3 hours before redosing edibles.",
      color: "accent"
    },
    {
      title: "Hydrate Aggressively",
      icon: Droplets,
      tip: "Drink water before, during, and after consuming. Aim for 3-4 liters daily at altitude.",
      color: "accent"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cannabis & Altitude: How to Stay Safe in Colorado</title>
        <meta name="description" content="THC hits harder at 5,000+ feet! Expert tips on dosing, hydration, and safety for your Colorado cannabis trip. Don't ruin your vacation—read this first." />
        <meta name="keywords" content="cannabis altitude effects, colorado elevation cannabis, denver altitude weed, mountain cannabis dosing" />
        <link rel="canonical" href="https://budquest.guide/colorado/altitude-guide" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 bg-accent/20 text-accent border-accent/50 text-lg px-4 py-2">
                  <Mountain className="w-5 h-5 mr-2" />
                  ALTITUDE AWARENESS
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🏔️ Why Altitude Makes You Higher
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Colorado sits at 5,280+ feet. That's not just a fun fact—it fundamentally changes how
                  cannabis affects your body. Here's what you need to know.
                </p>

                {/* Altitude Impact Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-4 text-center">
                      <Mountain className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">5,280 ft</p>
                      <p className="text-sm text-muted-foreground">Denver Elevation</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">20-50%</p>
                      <p className="text-sm text-muted-foreground">Stronger Effects</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-4 text-center">
                      <Wind className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">17% Less</p>
                      <p className="text-sm text-muted-foreground">Oxygen Available</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-4 text-center">
                      <Droplets className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">2x Faster</p>
                      <p className="text-sm text-muted-foreground">Dehydration Rate</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* The Science */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🧬 The Science Behind It
                  </span>
                </h2>

                <Card className="bg-card/50 border-accent/30 mb-8">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Brain className="w-6 h-6 text-accent" />
                      Why Does This Happen?
                    </h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        At higher elevations, there's less atmospheric pressure, which means less oxygen reaches your bloodstream.
                        Your body responds by <span className="text-foreground font-semibold">increasing blood flow</span> to
                        compensate—especially to your brain.
                      </p>
                      <p>
                        When you consume cannabis at altitude, this increased blood flow means THC reaches your brain
                        <span className="text-accent font-semibold"> faster and more efficiently</span>. The reduced oxygen
                        also affects how your body metabolizes cannabinoids.
                      </p>
                      <p>
                        The result? The same dose that feels comfortable at sea level can feel
                        <span className="text-accent font-semibold"> 20-60% stronger</span> in Colorado, depending on
                        your exact elevation and individual physiology.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Elevation Chart */}
                <h3 className="text-xl font-bold mb-4 text-center">📊 Effects by City Elevation</h3>
                <div className="space-y-3">
                  {elevations.map((item, index) => (
                    <Card key={index} className={`
                      ${item.level === 'moderate' ? 'bg-accent/10 border-accent/30' : ''}
                      ${item.level === 'high' ? 'bg-orange-500/10 border-orange-500/30' : ''}
                      ${item.level === 'extreme' ? 'bg-destructive/10 border-destructive/30' : ''}
                    `}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Mountain className={`w-6 h-6 ${item.level === 'moderate' ? 'text-accent' :
                            item.level === 'high' ? 'text-orange-500' : 'text-destructive'
                            }`} />
                          <div>
                            <p className="font-bold text-foreground">{item.city}</p>
                            <p className="text-sm text-muted-foreground">{item.elevation}</p>
                          </div>
                        </div>
                        <Badge className={`
                          ${item.level === 'moderate' ? 'bg-accent/20 text-accent border-accent/30' : ''}
                          ${item.level === 'high' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' : ''}
                          ${item.level === 'extreme' ? 'bg-destructive/20 text-destructive border-destructive/30' : ''}
                        `}>
                          {item.effect}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Symptoms */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    ⚠️ What to Watch For
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  These are common effects when combining cannabis and altitude. Know the signs.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symptoms.map((symptom, index) => (
                    <Card key={index} className="bg-card/50 border-border/50 hover:border-accent/30 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <symptom.icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground mb-1">{symptom.title}</h3>
                            <p className="text-sm text-muted-foreground">{symptom.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Dosing Tips */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🎯 Smart Dosing at Altitude
                  </span>
                </h2>

                <div className="space-y-4">
                  {dosingTips.map((tip, index) => (
                    <Card key={index} className={`
                      ${tip.color === 'destructive' ? 'bg-destructive/10 border-destructive/30' : 'bg-accent/10 border-accent/30'}
                    `}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${tip.color === 'destructive' ? 'bg-destructive/20' : 'bg-accent/20'
                            }`}>
                            <tip.icon className={`w-6 h-6 ${tip.color === 'destructive' ? 'text-destructive' : 'text-accent'
                              }`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-lg mb-2">{tip.title}</h3>
                            <p className="text-muted-foreground">{tip.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Dosing Calculator */}
                <Card className="mt-8 bg-card/50 border-accent/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Gauge className="w-6 h-6 text-accent" />
                      Quick Dosing Reference
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-3 text-muted-foreground font-medium">Normal Dose</th>
                            <th className="text-left py-3 text-muted-foreground font-medium">Denver (5,280 ft)</th>
                            <th className="text-left py-3 text-muted-foreground font-medium">Aspen (7,900 ft)</th>
                            <th className="text-left py-3 text-muted-foreground font-medium">Breckenridge (9,600 ft)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/30">
                            <td className="py-3 font-medium">5mg Edible</td>
                            <td className="py-3 text-accent">3-4mg</td>
                            <td className="py-3 text-orange-500">2-3mg</td>
                            <td className="py-3 text-destructive">2mg</td>
                          </tr>
                          <tr className="border-b border-border/30">
                            <td className="py-3 font-medium">10mg Edible</td>
                            <td className="py-3 text-accent">7-8mg</td>
                            <td className="py-3 text-orange-500">5-6mg</td>
                            <td className="py-3 text-destructive">4-5mg</td>
                          </tr>
                          <tr className="border-b border-border/30">
                            <td className="py-3 font-medium">1 Joint Hit</td>
                            <td className="py-3 text-accent">1 small hit</td>
                            <td className="py-3 text-orange-500">1 tiny hit</td>
                            <td className="py-3 text-destructive">Wait & assess</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium">Full Bowl</td>
                            <td className="py-3 text-accent">Half bowl</td>
                            <td className="py-3 text-orange-500">1/3 bowl</td>
                            <td className="py-3 text-destructive">1/4 bowl</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Hydration Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    💧 Hydration is Everything
                  </span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-card/50 border-accent/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-accent" />
                        Do This
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Drink 3-4 liters of water daily (more than normal)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Pre-hydrate before consuming cannabis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Keep water nearby during your session</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Avoid alcohol (double dehydration)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Eat water-rich foods (fruits, veggies)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                        Signs of Dehydration
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Headache (often mistaken for "too high")</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Dizziness or lightheadedness</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Dark urine or infrequent urination</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Extreme cottonmouth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Fatigue and confusion</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🛡️ Safety First
                  </span>
                </h2>

                <Card className="bg-destructive/5 border-destructive/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-10 h-10 text-destructive shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-destructive mb-2">When to Seek Help</h3>
                        <p className="text-muted-foreground mb-4">
                          These symptoms require immediate attention—they could indicate altitude sickness
                          complicated by cannabis:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                          <li>• Severe headache that won't go away</li>
                          <li>• Extreme confusion or disorientation</li>
                          <li>• Difficulty breathing at rest</li>
                          <li>• Chest tightness or pain</li>
                          <li>• Loss of coordination (ataxia)</li>
                          <li>• Persistent vomiting</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-accent" />
                        If You Feel Too High
                      </h3>
                      <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                        <li>Stop consuming immediately</li>
                        <li>Drink water slowly</li>
                        <li>Find a cool, quiet space</li>
                        <li>Focus on breathing slowly</li>
                        <li>Eat something if possible</li>
                        <li>Remember: it will pass</li>
                        <li>Call a friend if needed</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Pill className="w-5 h-5 text-accent" />
                        CBD Can Help
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        CBD can counteract THC effects. Keep some CBD on hand:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          CBD gummies (fast-acting)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          CBD tincture (under tongue)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          1:1 THC:CBD products are gentler
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-b from-card/30 to-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🌿 Ready to Explore Colorado?
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Now that you know how altitude affects cannabis, check out our other guides for a safe,
                  enjoyable Colorado experience.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/colorado/consumption-guide">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                      Consumption Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/dispensary">
                    <Button variant="outline" className="border-accent/30 hover:border-accent/60">
                      Find Dispensaries
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/colorado/federal-land-warning">
                    <Button variant="outline" className="border-accent/30 hover:border-accent/60">
                      Federal Land Warning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AltitudeGuide;
