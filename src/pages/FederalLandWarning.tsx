import { Helmet } from 'react-helmet';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Mountain, 
  TreePine, 
  Scale, 
  CheckCircle, 
  XCircle,
  Info,
  ArrowRight,
  Gavel,
  Building2,
  Tent,
  Car
} from 'lucide-react';

const FederalLandWarning = () => {
  const federalLands = [
    { name: "Rocky Mountain National Park", type: "National Park", icon: Mountain },
    { name: "Great Sand Dunes National Park", type: "National Park", icon: Mountain },
    { name: "Mesa Verde National Park", type: "National Park", icon: Mountain },
    { name: "Black Canyon of the Gunnison", type: "National Park", icon: Mountain },
    { name: "Arapaho National Forest", type: "National Forest", icon: TreePine },
    { name: "White River National Forest", type: "National Forest", icon: TreePine },
    { name: "San Juan National Forest", type: "National Forest", icon: TreePine },
    { name: "Pike National Forest", type: "National Forest", icon: TreePine },
  ];

  const safeAlternatives = [
    {
      title: "State Parks",
      description: "Colorado state parks follow state law, not federal. Cannabis is technically legal on your person.",
      icon: TreePine,
      note: "Public consumption still prohibited",
      safe: true
    },
    {
      title: "Private Property",
      description: "Hotels, Airbnbs, and rentals where the owner permits cannabis use.",
      icon: Building2,
      note: "Always verify with property owner",
      safe: true
    },
    {
      title: "Private Residences",
      description: "Your own home or a friend's home where you have permission.",
      icon: Building2,
      note: "Most freedom here",
      safe: true
    },
    {
      title: "420-Friendly Rentals",
      description: "Vacation rentals specifically marketed as cannabis-friendly.",
      icon: Tent,
      note: "Best option for tourists",
      safe: true
    },
  ];

  return (
    <>
      <Helmet>
        <title>Federal Land Cannabis Warning | Colorado Guide | BudQuest</title>
        <meta name="description" content="Critical information about cannabis laws on federal land in Colorado. National parks, forests, and federal property have different rules - learn the risks." />
        <meta name="keywords" content="federal land cannabis, national park cannabis laws, colorado cannabis federal, rocky mountain national park weed" />
        <link rel="canonical" href="https://budquest.com/colorado/federal-land-warning" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/20 via-transparent to-transparent" />
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 bg-destructive/20 text-destructive border-destructive/50 text-lg px-4 py-2">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  CRITICAL WARNING
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-destructive via-orange-500 to-destructive bg-clip-text text-transparent">
                    🚨 Federal Land = Federal Crime
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Colorado legalized cannabis, but federal land didn't. If you're on National Park or Forest land, 
                  you're under <span className="text-destructive font-bold">federal jurisdiction</span>.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <Card className="bg-destructive/10 border-destructive/30">
                    <CardContent className="p-4 text-center">
                      <Gavel className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-2xl font-bold text-destructive">6 Months</p>
                      <p className="text-sm text-muted-foreground">Max Jail Time</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-destructive/10 border-destructive/30">
                    <CardContent className="p-4 text-center">
                      <Scale className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-2xl font-bold text-destructive">$5,000</p>
                      <p className="text-sm text-muted-foreground">Max Fine</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-destructive/10 border-destructive/30">
                    <CardContent className="p-4 text-center">
                      <Shield className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-2xl font-bold text-destructive">Federal</p>
                      <p className="text-sm text-muted-foreground">Criminal Record</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-destructive/10 border-destructive/30">
                    <CardContent className="p-4 text-center">
                      <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-2xl font-bold text-destructive">Zero</p>
                      <p className="text-sm text-muted-foreground">State Protection</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* The Law Explained */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    ⚖️ Understanding Federal vs State Law
                  </span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-accent" />
                        <h3 className="text-xl font-bold text-accent">Colorado State Law</h3>
                      </div>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Recreational cannabis legal since 2012</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Adults 21+ can possess up to 1oz</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Licensed dispensaries throughout state</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>Private consumption permitted</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/10 border-destructive/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <XCircle className="w-8 h-8 text-destructive" />
                        <h3 className="text-xl font-bold text-destructive">Federal Law</h3>
                      </div>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Cannabis remains Schedule I controlled substance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Possession is a federal crime on federal land</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>Prosecuted by federal government</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <span>State legalization provides NO protection</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-destructive/5 border-destructive/30 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-10 h-10 text-destructive shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-destructive mb-2">The Bottom Line</h3>
                        <p className="text-muted-foreground">
                          When you step onto federal land, Colorado law no longer applies. You're under federal jurisdiction, 
                          where cannabis is completely illegal. Rangers can cite you, arrest you, and you'll face federal 
                          prosecution. This applies even if you legally purchased the cannabis from a Colorado dispensary.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Federal Lands List */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    🏔️ Federal Lands in Colorado
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  These are all under federal jurisdiction. Cannabis is illegal here regardless of state law.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {federalLands.map((land, index) => (
                    <Card key={index} className="bg-destructive/5 border-destructive/20 hover:border-destructive/40 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <land.icon className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{land.name}</h3>
                          <p className="text-sm text-destructive">{land.type} - FEDERAL</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Info className="w-8 h-8 text-accent shrink-0" />
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Also Includes:</h3>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• All Bureau of Land Management (BLM) lands</li>
                          <li>• All National Monuments (Colorado National Monument, etc.)</li>
                          <li>• All Wilderness Areas within National Forests</li>
                          <li>• Federal buildings and courthouses</li>
                          <li>• Military installations</li>
                          <li>• Post offices and federal facilities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Consequences */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-destructive via-orange-500 to-destructive bg-clip-text text-transparent">
                    ⚠️ What Happens If You Get Caught
                  </span>
                </h2>

                <div className="space-y-6">
                  <Card className="bg-card/50 border-destructive/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">1️⃣</span> Simple Possession (First Offense)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">Up to $1,000</p>
                          <p className="text-sm text-muted-foreground">Fine</p>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">Up to 1 Year</p>
                          <p className="text-sm text-muted-foreground">Probation</p>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">Federal</p>
                          <p className="text-sm text-muted-foreground">Misdemeanor Record</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-destructive/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">2️⃣</span> Possession with Intent / Larger Amounts
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">$5,000+</p>
                          <p className="text-sm text-muted-foreground">Fine</p>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">Up to 5 Years</p>
                          <p className="text-sm text-muted-foreground">Federal Prison</p>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-2xl font-bold text-destructive">Felony</p>
                          <p className="text-sm text-muted-foreground">Criminal Record</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Long-Term Consequences:</h3>
                      <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Loss of federal student aid eligibility
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Difficulty finding employment
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Immigration consequences (non-citizens)
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Loss of professional licenses
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Difficulty renting housing
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          Firearm ownership restrictions
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Safe Alternatives */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    ✅ Safe Alternatives
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Want to enjoy cannabis in Colorado? Here's where you CAN legally consume.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {safeAlternatives.map((alt, index) => (
                    <Card key={index} className="bg-accent/5 border-accent/30 hover:border-accent/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <alt.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground mb-1">{alt.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{alt.description}</p>
                            <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                              {alt.note}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                    🌿 Stay Safe, Stay Legal
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  The best way to enjoy cannabis in Colorado is to know where you can and can't consume.
                  Check out our other guides for safe, legal options.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/colorado/consumption-guide">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                      Consumption Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/hotels">
                    <Button variant="outline" className="border-accent/30 hover:border-accent/60">
                      420-Friendly Rentals
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/colorado/altitude-guide">
                    <Button variant="outline" className="border-accent/30 hover:border-accent/60">
                      Altitude Guide
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

export default FederalLandWarning;
