import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Clock, Calendar, User, ChevronRight, CheckCircle2,
    MapPin, Building, Mountain, Info, AlertTriangle, Snowflake, CreditCard, ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ... existing imports

const BlogBreckenridgeDispensaries = () => {
    // Fetch dispensaries from Supabase
    const { data: dispensaries, isLoading } = useQuery({
        queryKey: ["breckenridge-dispensaries"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("dispensaries")
                .select("*")
                .eq("city", "Breckenridge")
                .order("rating", { ascending: false });

            if (error) throw error;
            return data;
        },
    });

    // Fallback/Loading state handled in render
    // ... existing quickFacts

    const quickFacts = [
        { label: "Age Requirement", value: "21+ with valid ID" },
        { label: "Purchase Limit", value: "1 oz flower / 8g conc / 800mg edible" },
        { label: "Typical Hours", value: "9:00 AM - 9:30 PM" },
        { label: "Payment", value: "Cash preferred (ATMs on site)" },
        { label: "Delivery", value: "Limited availability" },
        { label: "Elevation", value: "9,600 ft (Warning: Effects are stronger)" }
    ];

    return (
        <>
            <Helmet>
                <title>Cannabis Dispensaries in Breckenridge: Complete Guide 2025</title>
                <meta name="description" content="Complete guide to buying weed in Breckenridge, CO. Best dispensaries, prices, altitude warnings, and where to legally consume in ski country." />
                <meta name="keywords" content="breckenridge dispensaries, weed breckenridge colorado, dispensary breckenridge ski, cannabis breckenridge, marijuana breckenridge" />
                <link rel="canonical" href="https://budquest.guide/blog/cannabis-dispensaries-breckenridge-complete-guide-2025" />
                <meta property="og:title" content="Cannabis Dispensaries in Breckenridge: Complete Guide 2025" />
                <meta property="og:description" content="Breckenridge has world-class skiing and legal cannabis. Here is where to shop." />
                <meta property="og:image" content="/blog-breckenridge-dispensaries.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Are there recreational dispensaries in Breckenridge?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Yes, Breckenridge has several recreational dispensaries, mostly located on Airport Road due to zoning laws." }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I smoke weed on the ski slopes in Breckenridge?",
                                "acceptedAnswer": { "@type": "Answer", "text": "No. Breckenridge Ski Resort operates on federal land, making cannabis possession and consumption strictly illegal." }
                            },
                            {
                                "@type": "Question",
                                "name": "How does altitude affect cannabis?",
                                "acceptedAnswer": { "@type": "Answer", "text": "At 9,600 feet, cannabis can have a stronger effect due to lower oxygen levels. Start with a lower dose than you would at sea level." }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Image */}
                <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img
                        src="/blog-breckenridge-dispensaries.png"
                        alt="Breckenridge main street in winter"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </section>

                {/* Hero Content */}
                <section className="relative py-8 overflow-hidden -mt-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <Link to="/" className="hover:text-accent">Home</Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link to="/blog" className="hover:text-accent">Blog</Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-accent">Breckenridge Guide</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">City Guide</span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> December 17, 2025
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> 8 min read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Cannabis Dispensaries in Breckenridge:
                                </span>
                                <br />
                                <span className="text-foreground/90">Complete Guide 2025</span>
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                                Breckenridge has world-class skiing, a charming Main Street, and yes—legal cannabis. Here's where to shop before you hit the slopes (and why you definitely shouldn't smoke on them).
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                    <User className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">BudQuest Team</p>
                                    <p className="text-xs text-muted-foreground">Cannabis Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Facts */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Info className="h-6 w-6 text-accent" /> Quick Facts: Breckenridge
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {quickFacts.map((fact, index) => (
                                    <Card key={index} className="p-4 border-accent/20 bg-accent/5">
                                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">{fact.label}</p>
                                        <p className="font-semibold text-foreground">{fact.value}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top Dispensaries List */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Best Dispensaries in Breckenridge</h2>
                            <p className="text-muted-foreground mb-8">
                                Most dispensaries in Breckenridge are clustered on <strong>Airport Road</strong> due to local zoning. A free shuttle runs from downtown to Airport Road, making them easily accessible without a car.
                            </p>

                            <div className="space-y-6">
                                <div className="space-y-6">
                                    {isLoading && <div className="text-center py-8 text-muted-foreground">Loading dispensaries...</div>}

                                    {dispensaries?.map((shop, index) => (
                                        <Card key={index} className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                                                            #{index + 1} {shop.name}
                                                        </h3>
                                                        {shop.rating && (
                                                            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">
                                                                {shop.rating} ★
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {shop.address}</p>
                                                        <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {shop.hours || "Check website"}</p>
                                                        <p className="flex items-center gap-2"><Building className="h-4 w-4" /> {shop.type || "Recreational/Medical"}</p>
                                                    </div>

                                                    <div className="p-3 bg-accent/10 rounded-lg text-sm border-l-2 border-accent">
                                                        <strong>Pro Tip:</strong> {shop.description ? shop.description.substring(0, 100) + "..." : "Visit early for best selection."}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center gap-3 min-w-[150px]">
                                                    <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                                                        <Link to={`/dispensary/${shop.slug || "#"}`}>View Details</Link>
                                                    </Button>
                                                    <div className="text-center text-xs text-muted-foreground">
                                                        <strong>View On Map</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Altitude Warning */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <Card className="p-8 border-red-500/30 bg-red-500/5">
                                <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="h-6 w-6" /> Altitude Warning: 9,600 Feet
                                </h2>
                                <p className="text-foreground mb-4 font-medium">
                                    "The mountain air isn't the only thing that'll take your breath away."
                                </p>
                                <p className="text-muted-foreground mb-6">
                                    At high altitude, your body processes substances differently. Alcohol hits harder, and so does cannabis. Dehydration is faster.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-red-500/10 rounded-full text-red-500"><Snowflake className="h-4 w-4" /></div>
                                        <div>
                                            <h4 className="font-bold">Start Low, Go Slow</h4>
                                            <p className="text-sm text-muted-foreground">Cut your normal edible dose in half first.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-red-500/10 rounded-full text-red-500"><CheckCircle2 className="h-4 w-4" /></div>
                                        <div>
                                            <h4 className="font-bold">Hydrate</h4>
                                            <p className="text-sm text-muted-foreground">Drink 2x more water than you think you need.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 420 Stays & Consumption */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">Where to Consume</h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                                            <div>
                                                <strong className="text-foreground">Private Property</strong>
                                                <p className="text-sm text-muted-foreground">Only with owner permission.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                                            <div>
                                                <strong className="text-foreground">420-Friendly Rentals</strong>
                                                <p className="text-sm text-muted-foreground">Search for "smoking allowed" or Bud & Breakfasts.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                                            <div>
                                                <strong className="text-foreground">NOT on Ski Slopes</strong>
                                                <p className="text-sm text-muted-foreground">Breckenridge Ski Resort is federal land. It is strictly prohibited.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">Skiing & Cannabis Tips</h2>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="p-3 bg-card border border-accent/10 rounded-lg">
                                            Skiing impaired is dangerous and can get your pass pulled. Save it for après-ski.
                                        </li>
                                        <li className="p-3 bg-card border border-accent/10 rounded-lg">
                                            Don't carry product in your jacket on the mountain. If you fall, glass jars break.
                                        </li>
                                        <li className="p-3 bg-card border border-accent/10 rounded-lg">
                                            <strong>Best Plan:</strong> Morning ski, afternoon dispensary run, evening hot tub session.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Things to Do */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Things to Do High in Breck</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="p-4 text-center hover:bg-accent/5 transition-colors">
                                    <div className="mx-auto w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                                        <Building className="h-5 w-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold text-sm">Main Street Stroll</h3>
                                </Card>
                                <Card className="p-4 text-center hover:bg-accent/5 transition-colors">
                                    <div className="mx-auto w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                                        <Snowflake className="h-5 w-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold text-sm">Hot Tub Session</h3>
                                </Card>
                                <Card className="p-4 text-center hover:bg-accent/5 transition-colors">
                                    <div className="mx-auto w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                                        <Isotope className="h-5 w-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold text-sm">Breck Distillery</h3>
                                </Card>
                                <Card className="p-4 text-center hover:bg-accent/5 transition-colors">
                                    <div className="mx-auto w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                                        <Mountain className="h-5 w-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold text-sm">Stargazing</h3>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 bg-gradient-to-br from-accent/20 to-background border-t border-accent/20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4">Ready for the High Country?</h2>
                            <p className="text-muted-foreground mb-8">
                                Breckenridge offers world-class skiing and a solid cannabis scene—just respect the altitude and the rules. Stock up, head back to your 420-friendly rental, and enjoy the mountain views.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                                    <Link to="/usa/colorado">Explore All Colorado Guides</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

// Icon component helper
const Isotope = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v20" /><path d="M2 12h20" /><path d="m4.929 4.929 14.14 14.14" /><path d="m4.929 19.07 14.14-14.14" /></svg>
)

export default BlogBreckenridgeDispensaries;
