import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    MapPin, Clock, AlertTriangle, Car, Music,
    ShoppingBag, CheckCircle2, ChevronRight, Store,
    Leaf, Flame, Ban, Info, ArrowRight, Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const BlogRedRocksDispensaries = () => {
    const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispensaries = async () => {
            const { data, error } = await supabase
                .from("dispensaries")
                .select("*")
                .eq("state", "Colorado")
                .or("city.ilike.%Morrison%,city.ilike.%Golden%,city.ilike.%Lakewood%")
                .order("rating", { ascending: false })
                .limit(6);

            if (data) setDispensaries(data);
            setLoading(false);
        };

        fetchDispensaries();
    }, []);

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

    return (
        <>
            <Helmet>
                <title>Best Dispensaries Near Red Rocks (2025) | Morrison & Golden Weed Maps</title>
                <meta name="description" content="Heading to a concert? Here are the closest dispensaries to Red Rocks Amphitheatre, consumption rules, and what to buy before the show." />
                <meta name="keywords" content="dispensaries near red rocks, weed near red rocks, dispensary red rocks amphitheatre, cannabis morrison colorado, red rocks smoking rules" />
                <link rel="canonical" href="https://budquest.guide/blog/best-dispensaries-near-red-rocks-2025" />
                <meta property="og:title" content="Best Dispensaries Near Red Rocks: The 2025 Concert Guide" />
                <meta property="og:description" content="Don't get caught dry at the show. Find the best weed stops on your way to Red Rocks." />
                <meta property="og:image" content="/blog-red-rocks-dispensaries.png" />
                <meta property="og:type" content="article" />
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[60vh] overflow-hidden">
                    <img
                        src="/blog-red-rocks-dispensaries.png"
                        alt="Red Rocks Amphitheatre Concert"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Concert Guide</span>
                                <span className="text-white/80 text-sm flex items-center gap-1 shadow-sm">
                                    <Clock className="h-4 w-4" /> 5 min read
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight shadow-xl">
                                Best Dispensaries Near <br />
                                <span className="text-red-500">Red Rocks Amphitheatre (2025)</span>
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mb-6 drop-shadow-md">
                                Stock up before the show. Here's where to stop and what to know.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* 1. Quick Answer */}
                            <section id="quick-answer" className="bg-accent/5 p-6 rounded-2xl border border-accent/10">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Car className="h-6 w-6 text-accent" /> Quick Answer: Where to Stop?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                    The closest dispensaries are in <strong>Morrison</strong> (at the base of the venue) and nearby <strong>Golden/Lakewood</strong>.
                                </p>
                                <div className="p-4 bg-background/50 rounded-lg border-l-4 border-accent">
                                    <p className="font-bold">⚠️ Warning:</p>
                                    <p className="text-sm text-muted-foreground">
                                        There is NO cannabis sold inside Red Rocks. You must buy it before you enter the park.
                                    </p>
                                </div>
                            </section>

                            {/* 2. The Rule */}
                            <section id="rules">
                                <h2 className="text-3xl font-bold mb-6">The Golden Rule: Consume BEFORE You Enter</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 bg-red-500/5 border-red-500/20">
                                        <div className="flex items-center gap-3 mb-4 text-red-500">
                                            <Ban className="h-6 w-6" />
                                            <h3 className="font-bold text-lg">Inside the Venue</h3>
                                        </div>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><span className="text-red-500">✕</span> Official Policy: Zero Consumption</li>
                                            <li className="flex gap-2"><span className="text-red-500">✕</span> Security checks all bags</li>
                                            <li className="flex gap-2"><span className="text-red-500">✕</span> Risk of ejection/confiscation</li>
                                        </ul>
                                    </Card>

                                    <Card className="p-6 bg-green-500/5 border-green-500/20">
                                        <div className="flex items-center gap-3 mb-4 text-green-500">
                                            <CheckCircle2 className="h-6 w-6" />
                                            <h3 className="font-bold text-lg">Your Game Plan</h3>
                                        </div>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><span className="text-green-500">✓</span> Consume at your rental first</li>
                                            <li className="flex gap-2"><span className="text-green-500">✓</span> Use edibles (timed 90 mins prior)</li>
                                            <li className="flex gap-2"><span className="text-green-500">✓</span> Tailgate discreetly (at own risk)</li>
                                        </ul>
                                    </Card>
                                </div>
                            </section>

                            {/* 3. Best Dispensaries */}
                            <section id="dispensaries">
                                <h2 className="text-3xl font-bold mb-8">Best Dispensaries Near Red Rocks</h2>

                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                                    </div>
                                ) : dispensaries.length > 0 ? (
                                    <div className="space-y-4 mb-8">
                                        {dispensaries.map((disp) => (
                                            <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                                                <Card className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-accent/50 transition-all group">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                            <img
                                                                src={disp.images?.[0] || disp.image || "/dest-colorado.png"}
                                                                alt={disp.name}
                                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-lg flex items-center gap-2">
                                                                {disp.name}
                                                                <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-normal">{disp.city}</span>
                                                            </h4>
                                                            <div className="flex items-center gap-1 mt-1">
                                                                {renderRating(disp.rating || 0)}
                                                                <span className="text-xs text-muted-foreground ml-1">({disp.rating || "N/A"})</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mt-1">{disp.address}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1 min-w-[100px]">
                                                        <span className="text-xs font-bold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                            View Menu <ChevronRight className="h-3 w-3" />
                                                        </span>
                                                        <div className="flex gap-1 mt-1">
                                                            {disp.is_recreational && <span className="text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded">Rec</span>}
                                                            {disp.is_medical && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">Med</span>}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="p-8 text-center bg-card/50">
                                        <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">No dispensaries found in immediate vicinity. Check Golden or Lakewood listings!</p>
                                    </Card>
                                )}

                                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                                    <Info className="h-4 w-4" /> <strong>Pro Tip:</strong> Order online for pickup. Skip the line and get to the tailgate faster.
                                </p>
                            </section>

                            {/* 4. What to Buy */}
                            <section id="products">
                                <h2 className="text-3xl font-bold mb-6">Concert Essentials: What to Buy</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Card className="p-4 text-center">
                                        <Flame className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                                        <h3 className="font-bold">Pre-rolls</h3>
                                        <p className="text-xs text-muted-foreground">No rolling, no gear. Just light and enjoy (before you go in).</p>
                                    </Card>
                                    <Card className="p-4 text-center">
                                        <Leaf className="h-8 w-8 mx-auto text-green-500 mb-2" />
                                        <h3 className="font-bold">Vape Pens</h3>
                                        <p className="text-xs text-muted-foreground">Discreet, low odor, fits in a pocket easily.</p>
                                    </Card>
                                    <Card className="p-4 text-center">
                                        <ShoppingBag className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                                        <h3 className="font-bold">Edibles (Low Dose)</h3>
                                        <p className="text-xs text-muted-foreground">5-10mg. Long-lasting high perfect for a 3-hour show.</p>
                                    </Card>
                                    <Card className="p-4 text-center bg-muted/50">
                                        <Ban className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                        <h3 className="font-bold text-muted-foreground">Avoid</h3>
                                        <p className="text-xs text-muted-foreground">High-dose edibles. You don't want to be *too* high in a crowd of 9,000.</p>
                                    </Card>
                                </div>
                            </section>

                            {/* 5. Tips */}
                            <section id="tips">
                                <h2 className="text-3xl font-bold mb-6">Tips for a High Red Rocks Experience</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 p-4 rounded-lg bg-card border border-accent/10">
                                        <span className="font-bold text-accent text-xl">01</span>
                                        <div>
                                            <span className="font-bold block">Timing is Everything</span>
                                            <p className="text-sm text-muted-foreground">Take edibles 90 minutes before the headliner. If you pop them when the music starts, you'll peak in the parking lot afterwards.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-4 rounded-lg bg-card border border-accent/10">
                                        <span className="font-bold text-accent text-xl">02</span>
                                        <div>
                                            <span className="font-bold block">Hydrate or Diedrate</span>
                                            <p className="text-sm text-muted-foreground">Red Rocks is at 6,450 feet. Alcohol + Weed + Altitude = Dehydration. Bring a reusable (empty) water bottle.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-4 rounded-lg bg-card border border-accent/10">
                                        <span className="font-bold text-accent text-xl">03</span>
                                        <div>
                                            <span className="font-bold block">Don't Drive High</span>
                                            <p className="text-sm text-muted-foreground">The roads out of Red Rocks are winding and dark. Take a shuttle (BusToShow) or an Uber.</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>

                            {/* 6. After the Show */}
                            <section id="after" className="bg-muted p-6 rounded-2xl">
                                <h2 className="text-2xl font-bold mb-4">After the Show</h2>
                                <p className="mb-4 text-muted-foreground">Most dispensaries close by <strong>10:00 PM</strong>. You cannot buy weed after the concert.</p>
                                <div className="flex gap-4 items-center text-sm">
                                    <Link to="/denver" className="text-accent hover:underline flex items-center gap-1">
                                        Best Munchies in Denver <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>

                            {/* 7. CTA */}
                            <section id="wrapup" className="text-center py-12">
                                <h2 className="text-3xl font-bold mb-6">Ready to Rock?</h2>
                                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                    Red Rocks is a spiritual experience for music fans. Add some quality cannabis (responsibly) and it becomes legendary.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link to="/dispensary" className="px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition">
                                        Find All Dispensaries
                                    </Link>
                                    <Link to="/red-rocks" className="px-6 py-3 bg-muted text-white font-bold rounded-lg hover:bg-muted/80 transition">
                                        Red Rocks Travel Guide
                                    </Link>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <Card className="p-6 border-red-500/20 bg-red-500/5">
                                    <Music className="h-6 w-6 text-red-500 mb-4" />
                                    <h4 className="font-bold mb-2">Concert Checklist</h4>
                                    <ul className="text-xs space-y-2 text-muted-foreground">
                                        <li className="flex gap-2"><span>🎟️</span> Ticket (Digital)</li>
                                        <li className="flex gap-2"><span>🆔</span> Valid ID (21+)</li>
                                        <li className="flex gap-2"><span>💧</span> Empty Water Bottle</li>
                                        <li className="flex gap-2"><span>🧥</span> Layers (Windy at night)</li>
                                        <li className="flex gap-2"><span>🌿</span> Cannabis (Consume BEFORE)</li>
                                    </ul>
                                </Card>
                                <div className="p-6 bg-card rounded-xl border border-accent/20">
                                    <h4 className="font-bold mb-4">Read Next</h4>
                                    <nav className="space-y-3 text-sm">
                                        <Link to="/blog/ultimate-stoner-guide-colorado-2025" className="block text-muted-foreground hover:text-accent">Ultimate Colorado Guide</Link>
                                        <Link to="/blog/where-can-you-smoke-weed-in-colorado-2025" className="block text-muted-foreground hover:text-accent">Where to Smoke Legally</Link>
                                        <Link to="/denver" className="block text-muted-foreground hover:text-accent">Denver City Guide</Link>
                                    </nav>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BlogRedRocksDispensaries;
