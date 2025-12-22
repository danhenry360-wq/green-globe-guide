import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    MapPin, Clock, AlertTriangle, Car, Music,
    ShoppingBag, CheckCircle2, ChevronRight, Store,
    Leaf, Flame, Ban, Info, ArrowRight, Star,
    Download, Mail, Compass, GraduationCap, History,
    ShieldCheck, Home, Map
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const BlogGreeleyDispensaries = () => {
    const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispensaries = async () => {
            const { data, error } = await supabase
                .from("dispensaries")
                .select("*")
                .or("city.ilike.%Greeley%,city.ilike.%Garden City%,city.ilike.%Garden%")
                .order("rating", { ascending: false })
                .limit(8);

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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Are there dispensaries in Greeley, Colorado?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, Greeley city limits prohibit both recreational and medical dispensaries. However, Garden City, which is surrounded by Greeley, has a high density of dispensaries."
                }
            },
            {
                "@type": "Question",
                "name": "Why doesn't Greeley have dispensaries?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Greeley Municipal Code explicitly prohibits the establishment of cannabis dispensaries within city limits, despite Colorado's statewide legalization."
                }
            },
            {
                "@type": "Question",
                "name": "Where is the closest dispensary to Greeley?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The closest dispensaries are located in Garden City, specifically along 8th Avenue and Highway 85, just minutes from downtown Greeley and the UNC campus."
                }
            },
            {
                "@type": "Question",
                "name": "Can UNC students buy cannabis in Garden City?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, anyone 21 or older with a valid government ID can purchase cannabis. However, possession and use on UNC's campus are strictly prohibited as it is federal property."
                }
            },
            {
                "@type": "Question",
                "name": "What are the hours for Garden City dispensaries?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most open at 8:00 AM. Closing times vary between 10:00 PM and 11:45 PM. Star Buds is notably open the latest until 11:45 PM."
                }
            },
            {
                "@type": "Question",
                "name": "Is cannabis delivery available in Greeley?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Currently, cannabis delivery is not legally available within Greeley city limits due to local municipal bans."
                }
            }
        ]
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Dispensaries Near Greeley: Garden City Loophole | BudQuest",
        "description": "Greeley bans dispensaries, but Garden City doesn't. Find the best dispensaries near Greeley, UNC campus, and the 'Green Mile'.",
        "image": "https://budquest.guide/greeley-dispensaries.png",
        "author": { "@type": "Organization", "name": "BudQuest" },
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "logo": { "@type": "ImageObject", "url": "https://budquest.guide/logo.png" }
        },
        "datePublished": "2025-12-18",
        "dateModified": "2025-12-22",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://budquest.guide/blog/greeley-dispensaries-garden-city-loophole"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://budquest.guide/blog" },
            { "@type": "ListItem", "position": 3, "name": "Greeley Dispensaries", "item": "https://budquest.guide/blog/greeley-dispensaries-garden-city-loophole" }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Dispensaries Near Greeley: Garden City Loophole | BudQuest</title>
                <meta name="description" content="Greeley bans dispensaries, but Garden City doesn't. Find the best dispensaries near Greeley, UNC campus, and the 'Green Mile' (2025 Guide)." />
                <meta name="keywords" content="dispensaries near greeley colorado, greeley dispensaries, garden city dispensary, weed near greeley, cannabis greeley colorado, dispensary near UNC" />
                <link rel="canonical" href="https://budquest.guide/blog/greeley-dispensaries-garden-city-loophole" />
                <meta property="og:title" content="Cannabis Dispensaries Near Greeley: The Garden City Loophole" />
                <meta property="og:description" content="Why Greeley doesn't have weed, and where you can actually find it seconds away." />
                <meta property="og:image" content="/greeley-dispensaries.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[75vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/greeley-dispensaries.png"
                            alt="Garden City Dispensaries near Greeley - Cannabis loophole"
                            className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-700 hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Local Guide</span>
                                <span className="text-white/80 text-sm flex items-center gap-1 shadow-sm">
                                    <Clock className="h-4 w-4" /> 7 min read
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight shadow-xl">
                                <span className="bg-gradient-to-r from-white via-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    Dispensaries Near Greeley: <br />
                                    The Garden City Loophole
                                </span>
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mb-6 drop-shadow-md">
                                All the "Greeley dispensaries" are actually in Garden City, just minutes from downtown and UNC.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* Quick Answer */}
                            <section id="quick-answer" className="bg-accent/5 p-6 rounded-2xl border border-accent/10">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Info className="h-6 w-6 text-accent animate-pulse" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        Quick Answer
                                    </span>
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Greeley banned dispensaries. But Garden City—a tiny town completely surrounded by Greeley—didn't. All the "Greeley dispensaries" are actually in Garden City, just minutes from downtown and UNC campus.
                                </p>
                            </section>

                            {/* 1. The Greeley Situation */}
                            <section id="situation">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        1. The Greeley Situation
                                    </span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Greeley is one of Colorado's largest cities to ban cannabis dispensaries entirely. Despite state legalization in 2012, Section 24-1104(d) of the Greeley Municipal Code prohibits both recreational AND medical dispensaries within city limits.
                                    </p>
                                    <div className="bg-muted/50 border-l-4 border-red-500 p-4 my-6">
                                        <p className="text-sm italic">
                                            "But there's a loophole: Garden City."
                                        </p>
                                    </div>
                                    <p>
                                        Garden City is a tiny incorporated town (population ~300) completely surrounded by Greeley. It allows dispensaries. So when you search "dispensaries near Greeley"—you're really looking at Garden City.
                                    </p>
                                    <p>
                                        The result: A cluster of dispensaries serving 100,000+ Greeley residents, UNC students, and travelers on Highway 85.
                                    </p>
                                </div>
                            </section>

                            {/* 2. Garden City Dispensaries - Real-time from Database */}
                            <section id="live-data">
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Leaf className="h-8 w-8 text-green-500 animate-bounce" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        Dispensaries in Garden City & Greeley
                                    </span>
                                </h2>
                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {dispensaries.map((disp) => (
                                            <Link key={disp.id} to={`/dispensary/${disp.slug}`}>
                                                <Card className="p-4 flex gap-4 items-center hover:border-accent/50 transition-all group">
                                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                        <img
                                                            src={disp.images?.[0] || disp.image || "/dest-colorado.jpg"}
                                                            alt={disp.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{disp.name}</h4>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {renderRating(disp.rating || 0)}
                                                            <span className="text-xs text-muted-foreground ml-1">({disp.rating || "N/A"})</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {disp.address}</p>
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* 4. For UNC Students */}
                            <section id="unc">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <GraduationCap className="h-8 w-8 text-accent" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        4. For UNC Students
                                    </span>
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    University of Northern Colorado is less than a mile from several Garden City dispensaries. But remember:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card className="p-4 border-red-500/20 bg-red-500/5">
                                        <Ban className="h-6 w-6 text-red-500 mb-2" />
                                        <p className="text-sm font-bold">Federal Property</p>
                                        <p className="text-xs text-muted-foreground">Cannabis is illegal on UNC grounds.</p>
                                    </Card>
                                    <Card className="p-4 border-red-500/20 bg-red-500/5">
                                        <Home className="h-6 w-6 text-red-500 mb-2" />
                                        <p className="text-sm font-bold">No Dorms</p>
                                        <p className="text-xs text-muted-foreground">Dorms prohibit cannabis—don't bring it back.</p>
                                    </Card>
                                    <Card className="p-4 border-accent/20 bg-accent/5">
                                        <ShieldCheck className="h-6 w-6 text-accent mb-2" />
                                        <p className="text-sm font-bold">21+ Only</p>
                                        <p className="text-xs text-muted-foreground">Student ID isn't enough, need gov ID.</p>
                                    </Card>
                                </div>
                                <p className="mt-6 font-bold text-accent">Closest to campus: <span className="text-foreground">High Plainz Strains (walking distance)</span></p>
                            </section>

                            {/* 5. Getting There */}
                            <section id="getting-there">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Car className="h-8 w-8 text-accent" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        5. Getting There
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="p-3 rounded-xl bg-muted h-fit"><Car className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="font-bold">From Downtown Greeley</h4>
                                            <p className="text-muted-foreground text-sm">~3 miles to Garden City dispensary cluster. 5-10 minute drive on Highway 85.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-3 rounded-xl bg-muted h-fit"><Compass className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="font-bold">From UNC Campus</h4>
                                            <p className="text-muted-foreground text-sm">Under 1 mile to High Plainz Strains. 5 minute drive to others.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-3 rounded-xl bg-muted h-fit"><ArrowRight className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="font-bold">From I-25</h4>
                                            <p className="text-muted-foreground text-sm">Take Highway 34 east to Greeley. Head south on Highway 85 to Garden City.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div className="p-4 border border-border/30 rounded-lg text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">South</p>
                                        <p className="text-sm">South Platte River</p>
                                    </div>
                                    <div className="p-4 border border-border/30 rounded-lg text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">6 Miles Away</p>
                                        <p className="text-sm">Greeley-Weld Airport</p>
                                    </div>
                                    <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-lg text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">Warning</p>
                                        <p className="text-sm">Pawnee Grassland (Federal)</p>
                                    </div>
                                </div>
                            </section>

                            {/* 6. What to Know Before You Go */}
                            <section id="basics">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <ShieldCheck className="h-8 w-8 text-green-500" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        6. What to Know Before You Go
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "Age", value: "21+ with valid government ID" },
                                        { title: "Payment", value: "Cash preferred, some have ATMs" },
                                        { title: "Purchase limits", value: "1 oz flower / 8g conc. / 800mg edible" },
                                        { title: "Medical patients", value: "Need CO med card + ID" },
                                        { title: "Consumption", value: "NOT in dispensary, public, or driving" },
                                    ].map((item) => (
                                        <div key={item.title} className="p-4 border-b border-border/30 flex justify-between">
                                            <span className="font-bold text-foreground">{item.title}</span>
                                            <span className="text-muted-foreground">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 7. Where to Consume */}
                            <section id="consume">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Flame className="h-8 w-8 text-orange-500" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        7. Where to Consume in Greeley
                                    </span>
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Greeley banned dispensaries, but possession and private consumption are still legal under state law.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Legal Options</h4>
                                        <ul className="space-y-3 text-sm text-muted-foreground text-left">
                                            <li className="flex gap-2"><span>✓</span> Private residence (home/permission)</li>
                                            <li className="flex gap-2"><span>✓</span> 420-friendly rentals</li>
                                            <li className="flex gap-2"><span>✓</span> Private property with owner's permission</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-500 mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Illegal Areas</h4>
                                        <ul className="space-y-3 text-sm text-muted-foreground text-left">
                                            <li className="flex gap-2"><span>✕</span> Public spaces, parks, sidewalks</li>
                                            <li className="flex gap-2"><span>✕</span> Most hotels & rental cars</li>
                                            <li className="flex gap-2"><span>✕</span> UNC campus & Federal land</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link to="/blog/where-can-you-smoke-weed-in-colorado-2025" className="inline-flex items-center gap-2 text-accent hover:underline font-bold">
                                        Where Can You Legally Smoke Weed in Colorado? <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>

                            {/* 8. Why Garden City Exists */}
                            <section id="history">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <History className="h-8 w-8 text-accent" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        8. Why Garden City Exists
                                    </span>
                                </h2>
                                <div className="flex flex-col md:flex-row gap-8 items-center border border-border/30 p-8 rounded-2xl bg-muted/30 text-left">
                                    <div className="flex-1 space-y-4">
                                        <p className="text-muted-foreground">
                                            Garden City incorporated in 1904 and has resisted annexation by Greeley for over a century. With only ~300 residents, it's essentially a tiny island inside Greeley.
                                        </p>
                                        <p className="text-muted-foreground">
                                            When Greeley banned dispensaries, Garden City saw an opportunity. Now it's home to a thriving cannabis corridor serving all of Weld County.
                                        </p>
                                        <p className="font-bold italic text-foreground">
                                            The irony: Greeley residents drive through their own city to buy legal cannabis in a town smaller than most neighborhoods.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 9. Nearby Alternatives */}
                            <section id="alternatives">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Compass className="h-8 w-8 text-accent" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        9. Nearby Alternatives
                                    </span>
                                </h2>
                                <div className="grid gap-4">
                                    {[
                                        { town: "Fort Collins", distance: "25 miles north", notes: "Bigger selection, more options" },
                                        { town: "Milliken", distance: "15 miles south", notes: "Nature's Herbs location" },
                                        { town: "Fort Lupton", distance: "20 miles south", notes: "High Plainz Strains location" },
                                        { town: "Loveland", distance: "20 miles west", notes: "Multiple dispensaries" },
                                    ].map((alt) => (
                                        <div key={alt.town} className="p-4 border border-border/30 rounded-xl flex justify-between items-center group hover:bg-muted/50 transition-colors">
                                            <div>
                                                <h4 className="font-bold group-hover:text-accent transition-colors">{alt.town}</h4>
                                                <p className="text-xs text-muted-foreground">{alt.notes}</p>
                                            </div>
                                            <span className="text-sm font-medium">{alt.distance}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Link to="/fort-collins" className="inline-flex items-center gap-2 text-accent hover:underline font-bold">
                                        Explore the Fort Collins Dispensary Guide <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>

                            {/* 10. Deals & Discounts */}
                            <section id="deals">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <ShoppingBag className="h-8 w-8 text-green-500" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        10. Deals & Discounts
                                    </span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {["First-time discounts", "Loyalty programs", "Daily deals", "Student discounts", "Veteran discounts"].map((tag) => (
                                        <Badge key={tag} className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 px-3 py-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="mt-4 text-muted-foreground">
                                    Pro tip: Follow dispensaries on Instagram or check Weedmaps before visiting for current deals.
                                </p>
                            </section>

                            {/* 11. FAQ Section */}
                            <section id="faq" className="space-y-8">
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Info className="h-8 w-8 text-accent" />
                                    <span className="bg-gradient-to-r from-foreground via-accent to-green-500 bg-clip-text text-transparent">
                                        Frequently Asked Questions
                                    </span>
                                </h2>
                                <div className="grid gap-6">
                                    {faqSchema.mainEntity.map((faq, index) => (
                                        <Card key={index} className="p-6 bg-muted/20 border-border/30">
                                            <h3 className="text-lg font-bold mb-3 flex gap-3 text-left">
                                                <span className="text-accent">Q:</span> {faq.name}
                                            </h3>
                                            <div className="flex gap-3 text-left">
                                                <span className="text-green-500 font-bold shrink-0">A:</span>
                                                <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* 12. CTA */}
                            <section id="cta" className="bg-accent text-accent-foreground p-12 rounded-3xl text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                <div className="relative z-10">
                                    <h2 className="text-4xl font-bold mb-6">Don't Get Stuck Without a Plan</h2>
                                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                                        Greeley banned dispensaries, but Garden City didn't. Whether you're a local, a UNC student (21+), or passing through, quality cannabis is just minutes away.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        <Link to="/dispensary" className="px-8 py-4 bg-background text-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
                                            Listings Near You
                                        </Link>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-8 text-left">
                            <div className="sticky top-24 space-y-8">
                                <Card className="p-6 border-accent/20 bg-accent/5">
                                    <Store className="h-8 w-8 text-accent mb-4" />
                                    <h4 className="font-bold mb-4">Garden City "Green Mile"</h4>
                                    <nav className="space-y-3 text-sm">
                                        <a href="#quick-answer" className="block text-muted-foreground hover:text-accent">Quick Answer</a>
                                        <a href="#situation" className="block text-muted-foreground hover:text-accent">The Loophole</a>
                                        <a href="#table" className="block text-muted-foreground hover:text-accent">Dispensary List</a>
                                        <a href="#unc" className="block text-muted-foreground hover:text-accent">UNC Student Info</a>
                                        <a href="#consume" className="block text-muted-foreground hover:text-accent">Legal Consumption</a>
                                        <a href="#faq" className="block text-muted-foreground hover:text-accent">FAQ</a>
                                    </nav>
                                </Card>

                                <Card className="p-6 bg-card">
                                    <h4 className="font-bold mb-4 flex items-center gap-2"><ArrowRight className="h-4 w-4 text-accent" /> Reach Further</h4>
                                    <nav className="space-y-3 text-sm">
                                        <Link to="/usa/colorado" className="block text-muted-foreground hover:text-accent">Colorado Hub</Link>
                                        <Link to="/blog/ultimate-stoner-guide-colorado-2025" className="block text-muted-foreground hover:text-accent">Stoner's Guide 2025</Link>
                                        <Link to="/blog/cannabis-colorado-rentals" className="block text-muted-foreground hover:text-accent">Rental Laws Guide</Link>
                                    </nav>
                                </Card>

                                <div className="p-6 bg-accent rounded-3xl text-accent-foreground relative overflow-hidden group">
                                    <Mail className="h-12 w-12 opacity-20 absolute -right-2 -bottom-2 group-hover:scale-110 transition-transform" />
                                    <h5 className="font-bold mb-2">Weekly Deals?</h5>
                                    <p className="text-xs opacity-80 mb-4">Get the best Northern Colorado deals delivered.</p>
                                    <Button size="sm" variant="secondary" className="w-full font-bold">Sign Me Up</Button>
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

export default BlogGreeleyDispensaries;
