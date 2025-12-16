import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Home, Hotel, Car, MapPin, AlertTriangle, CheckCircle2, XCircle,
    ChevronRight, Calendar, Clock, User, Building2, Ticket, Tent
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogColoradoConsumption = () => {
    const legalSpots = [
        {
            title: "Private Residences",
            desc: "Legal on private property (homes, porches, balconies) with owner's permission.",
            icon: <Home className="h-6 w-6 text-green-500" />
        },
        {
            title: "420-Friendly Rentals",
            desc: "Vacation rentals that explicitly allow consumption. The safest option for tourists.",
            icon: <Hotel className="h-6 w-6 text-green-500" />
        },
        {
            title: "Consumption Lounges",
            desc: "Licensed businesses in select cities (like Denver) where you can legally smoke on-site.",
            icon: <Ticket className="h-6 w-6 text-green-500" />
        }
    ];

    const illegalSpots = [
        {
            title: "Public Spaces",
            desc: "Parks, sidewalks, streets, and hiking trails. Fines range from $100 to $999.",
            icon: <Tent className="h-6 w-6 text-red-500" />
        },
        {
            title: "Most Hotels",
            desc: "95% of hotels ban smoking. 'Smoking rooms' usually mean tobacco only.",
            icon: <Building2 className="h-6 w-6 text-red-500" />
        },
        {
            title: "inside Vehicles",
            desc: "Strictly illegal for both drivers and passengers. Moving or parked.",
            icon: <Car className="h-6 w-6 text-red-500" />
        }
    ];

    const cityNotes = [
        { name: "Denver", note: "Best for lounges & rentals. Has the most options.", link: "/denver" },
        { name: "Boulder", note: "Limited lounges, but good rental options near Pearl St.", link: "/boulder" },
        { name: "Aspen", note: "Very discreet. High-end lodges only. No public smoking.", link: "/aspen" },
        { name: "Colo. Springs", note: "Conservative. Recreational sales banned (med only).", link: "/colorado-springs" },
    ];

    return (
        <>
            <Helmet>
                <title>Where Can You Legally Smoke Weed in Colorado? (2025 Guide)</title>
                <meta name="description" content="Detailed guide on legal cannabis consumption in Colorado. Learn about private property rules, 420-friendly rentals, consumption lounges, and where strict bans apply." />
                <meta name="keywords" content="where can you smoke weed in colorado, colorado consumption laws, 420 friendly places colorado, cannabis lounges denver" />
                <link rel="canonical" href="https://budquest.com/blog/where-can-you-smoke-weed-in-colorado-2025" />
                <meta property="og:title" content="Where Can You Legally Smoke Weed in Colorado?" />
                <meta property="og:description" content="Don't get fined. Here's where you can (and can't) legally consume cannabis in 2025." />
                <meta property="og:image" content="/blog-colorado-consumption.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Can you smoke weed in public in Colorado?",
                                "acceptedAnswer": { "@type": "Answer", "text": "No. Consuming cannabis in public spaces (sidewalks, parks, ski slopes) is illegal and punishable by fines." }
                            },
                            {
                                "@type": "Question",
                                "name": "Can you smoke weed in a hotel room?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Most hotels strictly prohibit smoking and will charge hefty cleaning fees. You must book a specifically designated 420-friendly rental to be safe." }
                            },
                            {
                                "@type": "Question",
                                "name": "Can you smoke in your car?",
                                "acceptedAnswer": { "@type": "Answer", "text": "No. It is illegal to consume cannabis in a vehicle, for both drivers and passengers, even if the car is parked." }
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
                        src="/blog-colorado-consumption.png"
                        alt="Private balcony in mountains with cannabis - representing legal private consumption"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </section>

                {/* Hero Content */}
                <section className="relative py-8 overflow-hidden -mt-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
                    <div className="container mx-auto px-4 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <Link to="/" className="hover:text-accent">Home</Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link to="/blog" className="hover:text-accent">Blog</Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-accent">Consumption Guide</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Legal Guide</span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> Dec 16, 2025
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> 8 min read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Where Can You Legally
                                </span>
                                <br />
                                <span className="text-foreground/90">Smoke Weed in Colorado?</span>
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Quick Answer */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg">
                                <h2 className="text-xl font-bold text-foreground mb-3">Quick Answer</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    In Colorado, you can legally consume cannabis on <b>private property</b> with the owner's permission, at <b>licensed consumption lounges</b>, and at <b>420-friendly rentals</b>.
                                    <br /><br />
                                    Public consumption—including parks, sidewalks, concert venues, and most standard hotels—is <b>Illegal</b> and can result in fines up to $999.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Golden Rule */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">The Basic Rule</h2>
                            <p className="text-xl text-foreground font-medium mb-8">
                                "Private Property = Legal. <span className="text-red-500">Public Spaces = Illegal.</span>"
                            </p>
                            <p className="text-muted-foreground">
                                Colorado legalized buying weed, not smoking it everywhere. This confuses many tourists who assume "legal state" means you can walk down the street smoking a joint. You can't. Think of it like alcohol—you can buy beer at a store, but you can't drink it on the sidewalk.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Can vs Cannot Grid */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Green Zone */}
                            <div>
                                <h3 className="flex items-center gap-2 text-xl font-bold text-green-500 mb-6">
                                    <CheckCircle2 /> Where You CAN Consume
                                </h3>
                                <div className="space-y-4">
                                    {legalSpots.map((spot, i) => (
                                        <Card key={i} className="p-4 border-l-4 border-l-green-500">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-green-500/10 p-2 rounded-full">{spot.icon}</div>
                                                <div>
                                                    <h4 className="font-bold text-foreground">{spot.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{spot.desc}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Red Zone */}
                            <div>
                                <h3 className="flex items-center gap-2 text-xl font-bold text-red-500 mb-6">
                                    <XCircle /> Where You CANNOT Consume
                                </h3>
                                <div className="space-y-4">
                                    {illegalSpots.map((spot, i) => (
                                        <Card key={i} className="p-4 border-l-4 border-l-red-500">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-red-500/10 p-2 rounded-full">{spot.icon}</div>
                                                <div>
                                                    <h4 className="font-bold text-foreground">{spot.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{spot.desc}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hotel & Car Rules Detail */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Why Not Hotels?</h3>
                                <p className="text-muted-foreground mb-4">
                                    Most hotels operate under the <b>Colorado Clean Indoor Air Act</b>, which bans smoking indoors. Even if you have a "smoking room," it's usually for tobacco only.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Cleaning fees ($250-$500+)</li>
                                    <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Risk of being kicked out</li>
                                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Solution: Edibles or Vapes (discreet)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">No Cars (Seriously)</h3>
                                <p className="text-muted-foreground mb-4">
                                    Consumption in a vehicle is a hard NO. It's illegal for both drivers and passengers, even if parked.
                                </p>
                                <div className="bg-red-500/10 p-4 rounded border border-red-500/20">
                                    <p className="text-red-600 font-bold text-sm">DUI Warning</p>
                                    <p className="text-sm text-muted-foreground">
                                        Police can charge you with a DUI if you test over 5 nanograms of THC while driving. Keep product sealed in the trunk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* City Notes */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl font-bold mb-6">City-by-City Quick Notes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cityNotes.map((city, i) => (
                                <Link key={i} to={city.link} className="block group">
                                    <Card className="p-4 hover:border-accent transition-colors h-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-foreground group-hover:text-accent">{city.name}</h3>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">{city.note}</p>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8 text-center">
                            <h3 className="text-xl font-bold text-foreground mb-4">The Best Way to Smoke Legally?</h3>
                            <p className="text-muted-foreground mb-6">
                                Book a verified 420-friendly stay where you can consume without stress.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/blog/best-420-rentals-denver"
                                    className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                                >
                                    Shop 420 Rentals
                                </Link>
                                <Link
                                    to="/usa/colorado"
                                    className="px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                                >
                                    View Colorado Guide
                                </Link>
                            </div>
                        </Card>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default BlogColoradoConsumption;
