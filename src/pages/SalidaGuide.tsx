import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    MapPin, Star,
    Compass, Home, Cannabis,
    ArrowRight, Bed, Store, ChevronRight,
    Sun, Leaf, Flower2, Snowflake,
    Mountain, Tent, Palmtree, Waves, Droplets,
    Mail
} from "lucide-react";

interface Dispensary {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    rating: number | null;
    image: string | null;
    images: string[] | null;
    is_recreational: boolean | null;
    is_medical: boolean | null;
    address: string;
}

interface Rental {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    rating: number | null;
    images: string[] | null;
    website: string | null;
    amenities?: unknown;
}

const SalidaGuide = () => {
    const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Salida dispensaries
            const { data: dispData } = await supabase
                .from('dispensaries')
                .select('*')
                .eq('state', 'Colorado')
                .ilike('city', '%Salida%')
                .order('rating', { ascending: false })
                .limit(6);

            if (dispData) setDispensaries(dispData);

            // Fetch hotels/rentals in Salida
            const { data: rentalData } = await supabase
                .from('hotels')
                .select('*')
                .eq('is_420_friendly', true)
                .ilike('address', '%Salida%')
                .order('rating', { ascending: false })
                .limit(3);

            if (rentalData) setRentals(rentalData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert({ email, source_page: 'salida-guide' });

            if (error) {
                if (error.code === '23505') {
                    toast.success("You're already subscribed!");
                } else {
                    throw error;
                }
            } else {
                toast.success("Guide sent! Check your inbox.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }

        setEmail("");
        setSubmitting(false);
    };

    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="h-4 w-4 fill-gold text-gold" />);
            } else {
                stars.push(<Star key={i} className="h-4 w-4 text-muted-foreground/30" />);
            }
        }
        return stars;
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TravelGuide",
        "name": "Salida Cannabis Travel Guide 2025",
        "description": "Visit Salida, Colorado: The Heart of the Rockies. Guide to rafting, hot springs, dispensaries, and 420-friendly adventure.",
        "url": "https://budquest.guide/salida",
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "url": "https://budquest.guide"
        },
        "about": {
            "@type": "City",
            "name": "Salida",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Salida",
                "addressRegion": "CO",
                "addressCountry": "US"
            }
        },
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "en-US"
    };

    const attractions = [
        {
            name: "Arkansas River (Whitewater Park)",
            icon: Waves,
            description: "World-class rafting and kayaking right through downtown. Or just chill on the river beach.",
            cannabisTip: "Post-rafting relaxation with an indica is unbeatable. Don't consume *before* hitting class IV rapids.",
            address: "Downtown Salida"
        },
        {
            name: "Mount Princeton Hot Springs",
            icon: Droplets,
            description: "Historic resort with geothermal pools in the creek. 100% natural soaking.",
            cannabisTip: "Edibles + Hot Springs is a classic combo. Stay hydrated and don't overheat!",
            address: "Nathrop (20 min north)"
        },
        {
            name: "Downtown Creative District",
            icon: Store,
            description: "Certified Creative District with galleries, breweries, and historic architecture.",
            cannabisTip: "Salida is very artsy. Browse the galleries after a light sativa for enhanced appreciation.",
            address: "F St"
        },
        {
            name: "Monarch Mountain",
            icon: Snowflake,
            description: "Real skiing for real people. No artificial snow, no crowds, 100% natural powder.",
            cannabisTip: "The 'parking lot safety meeting' is a time-honored tradition here (but keep it low key).",
            address: "Hwy 50 (20 min west)"
        },
        {
            name: "Spiral Drive (S Mountain)",
            icon: Mountain,
            description: "A scenic drive or hike up 'S' Mountain for panoramic views of the Sawatch Range.",
            cannabisTip: "The best sunset smoke spot in town. Watch the peaks turn pink.",
            address: "Spiral Dr"
        },
        {
            name: "Captain Zipline",
            icon: Compass,
            description: "Adventure park with ziplines and aerial courses.",
            cannabisTip: "Adrenaline + THC can be intense. Know your limits before strapping in.",
            address: "Lost Canyon Rd"
        }
    ];

    const relatedGuides = [
        { name: "Buena Vista", slug: "/usa/colorado/buena-vista", desc: "Rafting & 14ers", distance: "25 min" },
        { name: "Monarch", slug: "/usa/colorado/monarch", desc: "Skiing", distance: "20 min" },
        { name: "Canon City", slug: "/canon-city", desc: "Royal Gorge", distance: "1 hr" },
    ];

    return (
        <>
            <Helmet>
                <title>Salida, CO Cannabis Travel Guide 2025 | BudQuest</title>
                <meta name="description" content="Explore Salida, Colorado: Hot springs, river rafting, and dispensaries. The ultimate guide to 420-friendly adventures in the Heart of the Rockies." />
                <link rel="canonical" href="https://budquest.guide/salida" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background">
                <nav className="container mx-auto px-4 pt-20 pb-4">
                    <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                        <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <ChevronRight className="w-4 h-4" />
                        <li><Link to="/usa" className="hover:text-accent transition-colors">USA Guide</Link></li>
                        <ChevronRight className="w-4 h-4" />
                        <li><Link to="/usa/colorado" className="hover:text-accent transition-colors">Colorado</Link></li>
                        <ChevronRight className="w-4 h-4" />
                        <li className="text-foreground font-medium">Salida</li>
                    </ol>
                </nav>

                {/* Hero */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/lovable-uploads/salida-hero.jpg" // Fallback
                            alt="Salida Colorado River"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="mb-6 px-4 py-2 bg-accent/20 text-accent border-accent/30">
                                <Waves className="w-4 h-4 mr-2" />
                                Heart of the Rockies
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Salida Cannabis Guide
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Where the mountains meet the river. World-class rafting, historic hot springs, and a thriving local cannabis culture.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <a href="#dispensaries"><Store className="w-5 h-5 mr-2" />Find Dispensaries</a>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                                    <a href="#rentals"><Bed className="w-5 h-5 mr-2" />420 Stays</a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 bg-card/30 border-y border-border/30">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Waves, label: "Main Attraction", value: "Arkansas River" },
                                { icon: Tent, label: "Vibe", value: "Adventure Town" },
                                { icon: Mountain, label: "Elevation", value: "7,083 ft" },
                                { icon: Droplets, label: "Relaxation", value: "Hot Springs" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="bg-card/50 border-border/30 text-center p-4 hover:border-accent/50 transition-all">
                                        <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Attractions */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Salida Adventures
                                </span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {attractions.map((attraction, index) => (
                                <motion.div
                                    key={attraction.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-card/50 border-border/30 p-6 h-full hover:border-accent/50 transition-all group">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                                <attraction.icon className="w-6 h-6 text-accent" />
                                            </div>
                                            <h3 className="font-bold text-foreground">{attraction.name}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
                                        <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                                            <p className="text-xs text-accent font-medium mb-1">Cannabis Traveler Tip</p>
                                            <p className="text-xs text-muted-foreground">{attraction.cannabisTip}</p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dispensaries */}
                <section id="dispensaries" className="py-16 bg-card/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Salida Dispensaries</h2>
                        {loading ? (
                            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>
                        ) : dispensaries.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {dispensaries.map((disp) => (
                                    <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                                        <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50 h-full">
                                            <div className="aspect-video relative">
                                                <img
                                                    src={disp.images?.[0] || disp.image || "/placeholder.png"}
                                                    alt={disp.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-1">{disp.name}</h3>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    {renderRating(disp.rating || 0)}
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">Detailed dispensary listings coming soon.</p>
                        )}
                    </div>
                </section>

                {/* Email */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-gold/10" />
                    <div className="container mx-auto px-4 max-w-2xl relative z-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">Get the Salida Guide</h2>
                        <p className="text-muted-foreground mb-8">Free PDF with local maps and tips.</p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-card/50 border-border/50 focus:border-accent"
                                required
                            />
                            <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={submitting}>
                                {submitting ? "Sending..." : "Get Free Guide"}
                                <Mail className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default SalidaGuide;
