import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    MapPin, Clock, AlertTriangle, Home, Mountain,
    CheckCircle2, ChevronRight, Info, Star, DollarSign,
    Ban, Leaf, Award, Bed, Building, Wind, Zap, Gem, Coffee, Users,
    ArrowRight, Search, Menu
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const BlogBreckenridgeStays = () => {
    const [rentals, setRentals] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            const { data: dbRentals, error } = await supabase
                .from('hotels')
                .select('*')
                .eq('is_420_friendly', true)
                .ilike('address', '%Breckenridge%');

            if (!error && dbRentals) {
                setRentals(dbRentals);
            } else {
                setRentals([]);
            }
            setIsLoading(false);
        };
        fetchRentals();
    }, []);

    const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Navigation items for the mobile jump bar
    const navItems = [
        { id: "quick-answer", label: "Quick Answer" },
        { id: "stays", label: "Top Stays" },
        { id: "budget", label: "By Budget" },
        { id: "vape-strategy", label: "Vape Guide" },
        { id: "altitude", label: "Safety" },
        { id: "no-consume", label: "Laws" },
    ];

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best 420-Friendly Stays in Breckenridge (2025): Ski High, Sleep High",
        "description": "Find the best cannabis-friendly hotels and rentals in Breckenridge. Verified 420 stays, altitude safety tips, and local consumption laws for 2025.",
        "image": "https://budquest.guide/blog-breckenridge-stays.png",
        "author": { "@type": "Organization", "name": "BudQuest" },
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "logo": { "@type": "ImageObject", "url": "https://budquest.guide/logo.png" }
        },
        "datePublished": "2024-12-22",
        "dateModified": "2025-01-02",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://budquest.guide/blog/best-420-friendly-stays-breckenridge"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://budquest.guide/blog" },
            { "@type": "ListItem", "position": 3, "name": "420-Friendly Stays Breckenridge", "item": "https://budquest.guide/blog/best-420-friendly-stays-breckenridge" }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Are there 420-friendly hotels in Breckenridge?",
                "acceptedAnswer": { "@type": "Answer", "text": "Technically, no traditional hotels in Breckenridge allow smoking. However, the Bunk House Lodge is a cannabis-welcoming hostel, and many private rentals explicitly allow 420 consumption on balconies." }
            },
            {
                "@type": "Question",
                "name": "Can you smoke weed in Breckenridge rentals?",
                "acceptedAnswer": { "@type": "Answer", "text": "You can smoke on private property if the owner allows it. Many VRBO and Airbnb hosts permit consumption on outdoor balconies. Always check the listing description." }
            },
            {
                "@type": "Question",
                "name": "Is it legal to smoke weed while skiing in Breckenridge?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Breckenridge Ski Resort is on federal land. Possession and consumption can result in federal charges and the loss of your lift ticket." }
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Best 420-Friendly Stays in Breckenridge (2025): Ski High, Sleep High</title>
                <meta name="description" content="Find the best cannabis-friendly hotels and rentals in Breckenridge. 2025 guide to 420 stays, altitude safety, and local laws." />
                <meta name="keywords" content="420 friendly hotels breckenridge, 420 friendly rentals breckenridge, cannabis friendly lodging breckenridge, weed friendly airbnb breckenridge" />
                <link rel="canonical" href="https://budquest.guide/blog/best-420-friendly-stays-breckenridge" />
                <meta property="og:title" content="Best 420-Friendly Stays in Breckenridge (2025): Ski High, Sleep High" />
                <meta property="og:description" content="Ultimate 2025 guide to cannabis-friendly lodging in Breckenridge. Find the best spots to stay and smoke safely." />
                <meta property="og:image" content="https://budquest.guide/blog-breckenridge-stays.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/blog-breckenridge-stays.png"
                            alt="Snowy Breckenridge mountains with 420-friendly lodging"
                            className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-700 hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge variant="outline" className="mb-4 bg-green-500/10 border-green-500/20 text-green-400 px-4 py-1 backdrop-blur-md">
                                ✓ 2025 Ski Season
                            </Badge>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                                Best <span className="text-green-500">420 Stays</span> <br className="hidden sm:block" />
                                in Breckenridge
                            </h1>
                            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-2">
                                Ski high, sleep high. Your roadmap to the best cannabis-welcoming rentals and lodges.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground font-medium">
                                <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Clock className="h-3 w-3 text-green-500" /> 10 min read
                                </span>
                                <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Mountain className="h-3 w-3 text-green-500" /> 9,600 ft
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* MOBILE ONLY: Sticky Jump Bar */}
                <div className="lg:hidden sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-3 overflow-x-auto scrollbar-hide">
                    <div className="container px-4 flex gap-2 w-max">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold whitespace-nowrap hover:bg-accent hover:text-white transition-colors border border-accent/20"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <section className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-9 max-w-4xl mx-auto space-y-12 md:space-y-16">

                            {/* 1. Quick Answer Box */}
                            <div id="quick-answer">
                                <Card className="bg-green-500/5 border-green-500/20 p-6 relative overflow-hidden">
                                    <Zap className="absolute top-4 right-4 h-12 w-12 text-green-500/10" />
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Info className="h-5 w-5 text-green-500" /> Reality Check
                                    </h2>
                                    <p className="text-base leading-relaxed text-foreground/90 mb-4">
                                        <strong>The honest truth:</strong> Breckenridge has zero traditional hotels with smoking-allowed rooms. Every 420-friendly option is a private rental, a vacation home, or one unique social lodge.
                                    </p>
                                    <div className="bg-background/50 p-4 rounded-lg border border-green-500/10">
                                        <p className="text-sm font-medium">
                                            <strong>Best Strategy:</strong> Book a private rental with a balcony, or stay at the Bunk House Lodge.
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* 2. The Breckenridge Situation (Mobile Optimized List vs Desktop Table) */}
                            <div id="situation">
                                <h2 className="text-2xl font-bold mb-6">The Breck Situation</h2>
                                
                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-hidden rounded-xl border border-border">
                                    <table className="min-w-full text-left bg-card">
                                        <tbody>
                                            <tr className="border-b border-border">
                                                <td className="p-4 font-bold bg-muted/30 w-1/3">Elevation</td>
                                                <td className="p-4">9,600 ft (Altitude intensifies effects)</td>
                                            </tr>
                                            <tr className="border-b border-border">
                                                <td className="p-4 font-bold bg-muted/30">Hotels</td>
                                                <td className="p-4 text-red-500 font-medium">None — all hotels are smoke-free</td>
                                            </tr>
                                            <tr className="border-b border-border">
                                                <td className="p-4 font-bold bg-muted/30">420 Options</td>
                                                <td className="p-4">Private rentals, vacation homes, one lodge</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold bg-muted/30">Consumption</td>
                                                <td className="p-4">Private property only, no public spaces</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards for Situation */}
                                <div className="md:hidden grid grid-cols-1 gap-3">
                                    <div className="p-4 bg-card rounded-lg border border-border">
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">Elevation</h4>
                                        <p className="font-medium">9,600 ft (High Altitude)</p>
                                    </div>
                                    <div className="p-4 bg-card rounded-lg border border-border">
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">Hotels</h4>
                                        <p className="font-medium text-red-500">None allow smoking</p>
                                    </div>
                                    <div className="p-4 bg-card rounded-lg border border-border">
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">Your Options</h4>
                                        <p className="font-medium">Private rentals & Bunk House Lodge</p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Best 420-Friendly Stays */}
                            <div id="stays" className="space-y-8">
                                <h2 className="text-2xl font-bold mb-6">Top 420-Friendly Rentals</h2>

                                <div className="space-y-6">
                                    {isLoading ? (
                                        <div className="flex justify-center py-12">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                                        </div>
                                    ) : rentals.length > 0 ? (
                                        rentals.map((rental) => (
                                            <Card key={rental.id || rental.name} className="overflow-hidden border-green-500/20 shadow-sm">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-2/5 bg-muted relative aspect-video md:aspect-auto">
                                                        <img
                                                            src={rental.image || rental.images?.[0] || "/blog-breckenridge-stays.png"}
                                                            alt={rental.name}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <Badge className="bg-green-600 text-white border-0 shadow-md text-xs">
                                                                {rental.priceRange === "$$$$" ? "Luxury" : "Verified"}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="p-5 md:w-3/5 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                                <h4 className="text-lg font-bold leading-tight">{rental.name}</h4>
                                                                <span className="text-sm font-bold text-green-600 shrink-0">
                                                                    {rental.priceRange || "$$"}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                                <MapPin className="h-3 w-3" /> {rental.address || "Breckenridge, CO"}
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                                {rental.description || rental.policies}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {rental.hasSmoking && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Smoking OK</span>}
                                                                {rental.hasVaping && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">Vape OK</span>}
                                                            </div>
                                                        </div>
                                                        <Link to={`/hotels/${rental.slug || createSlug(rental.name)}`}>
                                                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center p-8 bg-muted rounded-lg">
                                            <p className="text-muted-foreground">Loading top stays...</p>
                                        </div>
                                    )}
                                </div>

                                {/* Nearby Alternatives */}
                                <Card className="p-5 bg-orange-50 border-orange-200">
                                    <h4 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Save Money in Frisco
                                    </h4>
                                    <p className="text-sm text-orange-900/80 mb-3">
                                        Just 15 mins away, Frisco/Dillon offers cheaper rentals and more dispensaries.
                                    </p>
                                    <Link to="/blog/best-420-friendly-stays-frisco-dillon" className="text-sm font-bold text-orange-600 hover:underline">
                                        View Frisco Guide →
                                    </Link>
                                </Card>
                            </div>

                            {/* 4. Best Options by Budget (Converted to Cards for Mobile) */}
                            <div id="budget">
                                <h2 className="text-2xl font-bold mb-6">Options by Budget</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { title: "Budget", name: "Bunk House Lodge", price: "$100-150", note: "Social hostel vibe", color: "bg-blue-50 border-blue-200" },
                                        { title: "Mid-Range", name: "Ski Condos", price: "$225-350", note: "Look for balconies", color: "bg-green-50 border-green-200" },
                                        { title: "Premium", name: "Townhouses", price: "$400+", note: "Private hot tubs", color: "bg-purple-50 border-purple-200" },
                                        { title: "Luxury", name: "Breck Haus", price: "$800+", note: "Full experience", color: "bg-gold/10 border-gold/30" },
                                    ].map((item, i) => (
                                        <div key={i} className={`p-4 rounded-xl border ${item.color}`}>
                                            <div className="text-xs font-bold uppercase opacity-70 mb-1">{item.title}</div>
                                            <div className="font-bold text-lg mb-1">{item.name}</div>
                                            <div className="text-sm font-medium mb-2">{item.price}</div>
                                            <div className="text-xs opacity-80">{item.note}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. The Vape Pen Strategy */}
                            <div id="vape-strategy">
                                <Card className="p-6 border-accent/20 bg-accent/5">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Wind className="h-5 w-5 text-accent" /> The "Vape Pen Strategy"
                                    </h2>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Can't find a 420 rental? Use this workaround. Disposable vapes leave zero smell.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex gap-3 items-start p-3 bg-background rounded border border-border">
                                            <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                                            <p className="text-xs text-muted-foreground">Book any rental with a balcony.</p>
                                        </div>
                                        <div className="flex gap-3 items-start p-3 bg-background rounded border border-border">
                                            <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                            <div className="text-xs text-muted-foreground">
                                                <p className="mb-1">Buy a disposable pen at:</p>
                                                <ul className="font-bold text-accent">
                                                    <li>• Breck Organic Therapy</li>
                                                    <li>• Alpenglow Botanicals</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-accent/10">
                                        <Link to="/blog/best-dispensaries-breckenridge-guide" className="text-sm font-bold text-accent hover:underline block">
                                            See Full Dispensary Guide →
                                        </Link>
                                    </div>
                                </Card>
                            </div>

                            {/* 6. Altitude Warning */}
                            <div id="altitude">
                                <h2 className="text-2xl font-bold mb-4">Altitude Warning</h2>
                                <Card className="p-6 border-red-500/30 bg-red-500/5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-red-100 rounded-full text-red-600 shrink-0">
                                            <Zap className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-red-700">9,600 Feet = Stronger High</h3>
                                            <p className="text-sm text-red-900/80 mt-1 mb-2">
                                                Less oxygen means cannabis can hit 20-40% harder.
                                            </p>
                                            <ul className="text-xs font-medium space-y-1 text-red-800">
                                                <li>• Drink 2x more water</li>
                                                <li>• Start with 5mg edibles max</li>
                                                <li>• Wait 60 mins before redosing</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* 7. Legal Red Zones */}
                            <div id="no-consume">
                                <h2 className="text-2xl font-bold mb-6">Where NOT to Smoke</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Ski Resort", desc: "Federal land. Pass revocation risk.", icon: Ban },
                                        { title: "Main Street", desc: "Strictly illegal. Public fines apply.", icon: Ban },
                                        { title: "Hotel Rooms", desc: "$250+ cleaning fees.", icon: Building },
                                        { title: "Cars", desc: "DUI laws apply heavily.", icon: Car },
                                    ].map((zone, i) => (
                                        <Card key={i} className="p-4 flex items-center gap-3 border-red-100 hover:border-red-300 transition-colors">
                                            <zone.icon className="h-8 w-8 text-red-400 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-sm">{zone.title}</h4>
                                                <p className="text-xs text-muted-foreground">{zone.desc}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center py-12 px-4 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl border border-green-500/20">
                                <h2 className="text-2xl font-bold mb-4">Ready to Book?</h2>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Secure your 420-friendly stay before the ski rush.
                                </p>
                                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                                    <Link to="/hotels">
                                        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                                            Find 420 Stays
                                        </Button>
                                    </Link>
                                    <Link to="/blog/best-dispensaries-breckenridge-guide">
                                        <Button size="lg" variant="outline" className="w-full font-bold">
                                            Breckenridge Dispensaries
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* Sidebar (Hidden on Mobile) */}
                        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-6">
                            <Card className="p-5 bg-accent/5 border-accent/20">
                                <h4 className="font-bold text-sm uppercase mb-4 flex items-center gap-2">
                                    <Leaf className="h-4 w-4 text-accent" /> Recommended Shops
                                </h4>
                                <div className="space-y-4">
                                    <div className="text-sm border-b border-border pb-2">
                                        <div className="font-bold">Breck Organic Therapy</div>
                                        <div className="text-xs text-muted-foreground">Main Street Area</div>
                                    </div>
                                    <div className="text-sm border-b border-border pb-2">
                                        <div className="font-bold">Alpenglow Botanicals</div>
                                        <div className="text-xs text-muted-foreground">Local Favorite</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Green Dragon</div>
                                        <div className="text-xs text-muted-foreground">Large Selection</div>
                                    </div>
                                </div>
                                <Link to="/blog/best-dispensaries-breckenridge-guide" className="text-xs text-accent font-bold mt-4 block hover:underline">
                                    View All Dispensaries →
                                </Link>
                            </Card>
                        </aside>

                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="bg-muted/30 py-12 border-t border-border/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Are there 420-friendly hotels?", a: "No traditional hotels. Use Bunk House Lodge or private rentals." },
                                { q: "Can I smoke on the mountain?", a: "No. It's federal land and you risk losing your pass." },
                                { q: "How does altitude affect the high?", a: "Expect it to be 20-40% stronger. Hydrate heavily." }
                            ].map((faq, i) => (
                                <Card key={i} className="p-4 hover:border-green-500/30 transition-all">
                                    <h3 className="text-sm font-bold mb-2 flex items-start gap-2">
                                        <span className="text-green-500">Q.</span>
                                        <span>{faq.q}</span>
                                    </h3>
                                    <p className="text-sm text-muted-foreground pl-5">{faq.a}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default BlogBreckenridgeStays;
