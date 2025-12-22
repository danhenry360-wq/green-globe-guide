import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChevronRight,
    MapPin,
    ExternalLink,
    Info,
    CheckCircle2,
    AlertTriangle,
    Star,
    Calendar,
    Clock,
    User,
    Home,
    Hotel,
    Mountain,
    Compass,
    ArrowRight,
    ShieldCheck,
    Zap,
    DollarSign,
    Coffee,
    Gem
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const BlogColoradoAllInclusive = () => {
    const whyNotExist = [
        { factor: "Federal banking laws", reality: "Hotels can't openly market cannabis services" },
        { factor: "Liability concerns", reality: "Most hotel chains avoid association" },
        { factor: "Local zoning", reality: "Consumption lounges are rare" },
        { factor: "Licensing", reality: "No 'cannabis resort' license category exists" },
    ];

    const packages = [
        {
            company: "Colorado Cannabis Tours",
            items: [
                { name: "Couple's Getaway", details: "2 nights hotel, Cannabis Tour, Cooking Class, Puff Pass Paint, airport pickup", price: "$700-900" },
                { name: "Cannabis Pro", details: "Tour + 2 classes (painting, pottery, cooking, or concentrates)", price: "$179/person" },
                { name: "Mountain + City", details: "Downtown hotel + mountain resort stay, dispensary visits", price: "Varies" },
                { name: "420 Week (April)", details: "Cannabis Cup access, tours, events, lodging", price: "Premium" },
            ]
        },
        {
            company: "My 420 Tours",
            items: [
                { name: "Weekend Getaway", details: "Hotel, tours, dispensary visits, activities", price: "Contact for quote" },
                { name: "Wellness Package", details: "Cannabis + spa, yoga, massage", price: "Custom" },
            ]
        }
    ];

    const resortStays = [
        {
            name: "Arrowhead Manor (Morrison)",
            description: "Luxury B&B near Red Rocks with mountain views and hot tubs. Cannabis-friendly property. Infused dinner by Chef Roilty available.",
            bestFor: "Closest to a 'cannabis resort' in Colorado",
            distance: "20 minutes from Denver",
            image: "/rentals/arrowhead-manor.png",
            website: "https://arrowheadmanor.com/"
        },
        {
            name: "The Holiday Chalet (Denver)",
            description: "Historic B&B in a mansion setting. Some rooms feature parlors and kitchens. Cannabis-friendly outdoor patio.",
            bestFor: "Historic charm & downtown access",
            distance: "Walking distance to downtown",
            image: "/rentals/holiday-chalet.png",
            website: "https://theholidaychalet.com/"
        },
        {
            name: "Flora House Denver",
            description: "Music-inspired boutique hotel with music-themed decor. Features a daily 4:20 Happy Hour and hot tubs in some rooms.",
            bestFor: "Social vibe & boutique luxury",
            distance: "Near downtown",
            image: "/blog-denver-rentals.jpg",
            website: "https://www.florahousedenver.com/"
        },
        {
            name: "Kushkations Properties",
            description: "A collection of private homes specifically designed for cannabis consumers. Full amenities and consumption allowed.",
            bestFor: "Private groups & full freedom",
            distance: "Various Denver locations",
            image: "/blog-colorado-rentals.jpg",
            website: "https://kushkations.com/"
        }
    ];

    const luxuryRentals = [
        { type: "Luxury Denver homes", details: "Private property, full consumption freedom, hot tubs, views", price: "$300-600/night" },
        { type: "Mountain cabins", details: "Breckenridge, Vail, Aspen area, ski-in/ski-out some", price: "$400-800/night" },
        { type: "Red Rocks area", details: "Near concerts, mountain views", price: "$250-500/night" },
    ];

    const diyPackage = [
        { component: "420-friendly stay", provider: "BudQuest, Bud and Breakfast", cost: "$150-400/night" },
        { component: "Cannabis tour", provider: "Colorado Cannabis Tours, My 420 Tours", cost: "$100-150/person" },
        { component: "Cooking class", provider: "Puff, Pass & Paint, tour companies", cost: "$50-100/person" },
        { component: "Dispensary visits", provider: "Self-guided or tour", cost: "Free-$50" },
        { component: "Spa/massage", provider: "Cannabis-infused massage", cost: "$150-250" },
        { component: "Airport transfer", provider: "Tour companies offer this", cost: "$50-100" },
    ];

    const comparison = [
        { trad: "Unlimited drinks at pool bar", colo: "BYOC (bring your own cannabis) from dispensary" },
        { trad: "On-site restaurant included", colo: "Some B&Bs include breakfast, most don't" },
        { trad: "Activities included", colo: "Tours/classes booked separately or bundled" },
        { trad: "Everything in one location", colo: "Multiple locations, transportation needed" },
        { trad: "No planning required", colo: "Some planning required" },
    ];

    const faqs = [
        { q: "Are there all-inclusive cannabis resorts in Colorado?", a: "Not in the traditional sense like Cancun resorts. However, you can find 420-friendly B&Bs and tour companies that bundle lodging, tours, and activities into 'all-inclusive' style packages." },
        { q: "What's the closest thing to a weed resort in Colorado?", a: "Arrowhead Manor in Morrison is often cited as the closest experience, offering luxury lodging, 420-friendly policies, and optional cannabis-infused gourmet dinners." },
        { q: "How much does a cannabis vacation in Colorado cost?", a: "A DIY or bundled trip typically ranges from $800 to $1,500 per person for a 3-night stay, depending on the level of luxury and number of activities." },
        { q: "Can you smoke weed at hotels in Colorado?", a: "Most standard hotels prohibit smoking. You must look for verified 420-friendly properties, many of which allow consumption on patios, balconies, or in designated areas." },
        { q: "What are the best 420-friendly places to stay in Colorado?", a: "Top picks include Arrowhead Manor, Flora House Denver, The Holiday Chalet, and various Kushkations private rentals." },
        { q: "Do any Colorado tour companies offer cannabis vacation packages?", a: "Yes, Colorado Cannabis Tours and My 420 Tours are the leaders in creating multi-day packages that include lodging and activities." },
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "All-Inclusive Weed Resorts in Colorado: What Actually Exists (2025)",
        "description": "Discover the reality of cannabis resorts in Colorado. From 420-friendly B&Bs to luxury vacation packages, find the best all-inclusive style weed vacations.",
        "image": "https://budquest.guide/blog-all-inclusive-weed-resorts-colorado.png",
        "author": {
            "@type": "Organization",
            "name": "BudQuest"
        },
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "logo": {
                "@type": "ImageObject",
                "url": "https://budquest.guide/logo.png"
            }
        },
        "datePublished": "2025-12-20",
        "dateModified": "2025-12-22",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://budquest.guide/blog/all-inclusive-weed-resorts-colorado"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://budquest.guide"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://budquest.guide/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "All-Inclusive Weed Resorts Colorado",
                "item": "https://budquest.guide/blog/all-inclusive-weed-resorts-colorado"
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>All-Inclusive Weed Resorts in Colorado: What Actually Exists (2025)</title>
                <meta name="description" content="Looking for an all-inclusive weed resort in Colorado? Here is the honest truth about what exists, where to stay, and how to book the ultimate 420 vacation." />
                <meta name="keywords" content="all inclusive weed resorts colorado, 420 resort colorado, cannabis resort colorado, weed vacation packages colorado, marijuana friendly resorts colorado" />
                <link rel="canonical" href="https://budquest.guide/blog/all-inclusive-weed-resorts-colorado" />
                <meta property="og:title" content="All-Inclusive Weed Resorts in Colorado: What Actually Exists (2025)" />
                <meta property="og:description" content="The honest truth about cannabis resorts in Colorado and how to book your ultimate 420 vacation." />
                <meta property="og:image" content="https://budquest.guide/blog-all-inclusive-weed-resorts-colorado.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/blog-all-inclusive-weed-resorts-colorado.png"
                            alt="Luxury mountain cabin in Colorado"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge variant="outline" className="mb-4 bg-accent/10 border-accent/20 text-accent px-4 py-1">
                                2025 Luxury Travel Guide
                            </Badge>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                                All-Inclusive <span className="text-accent">Weed Resorts</span> <br className="hidden md:block" />
                                in Colorado: What Actually Exists
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                The honest truth about cannabis hospitality in the Mile High State.
                                What exists, what doesn't, and how to book your ultimate high.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-accent" /> BudQuest Editorial
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-accent" /> Updated Dec 20, 2025
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-accent" /> 15 min read
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar / Table of Contents (Hidden on mobile) */}
                        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
                            <nav className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">In this guide</h4>
                                {[
                                    { id: "quick-answer", label: "Quick Answer" },
                                    { id: "why-not-exist", label: "The Reality Check" },
                                    { id: "packages", label: "Vacation Packages" },
                                    { id: "resort-stays", label: "Resort-Style Stays" },
                                    { id: "luxury-rentals", label: "Luxury Rentals" },
                                    { id: "mountain-options", label: "Mountain Resorts" },
                                    { id: "diy-package", label: "DIY All-Inclusive" },
                                    { id: "comparison", label: "The Trade-offs" },
                                    { id: "tips", label: "Booking Tips" },
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1 border-l-2 border-transparent hover:border-accent pl-4"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="lg:col-span-9 max-w-4xl mx-auto">
                            {/* 1. Quick Answer Box */}
                            <div id="quick-answer" className="mb-16">
                                <Card className="bg-accent/5 border-accent/20 p-8 relative overflow-hidden">
                                    <Zap className="absolute top-4 right-4 h-12 w-12 text-accent/10" />
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Info className="h-6 w-6 text-accent" /> The Honest Truth (TL;DR)
                                    </h2>
                                    <p className="text-lg leading-relaxed text-foreground/90">
                                        <strong>Honest truth:</strong> Colorado doesn't have traditional all-inclusive cannabis resorts like you'd find in Cancun or Negril. Due to federal banking regulations and local zoning laws, you won't find a single hotel where your room, food, and weed are bundled into one price at the check-in desk.
                                    </p>
                                    <p className="text-lg leading-relaxed text-foreground/90 mt-4">
                                        But it <strong>DOES</strong> have 420-friendly B&Bs, boutique stay packages that bundle lodging + tours + experiences, and luxury rentals where you can consume freely. Here's a breakdown of the closest experiences available in 2025.
                                    </p>
                                </Card>
                            </div>

                            {/* 2. Why "All-Inclusive Weed Resorts" Don't Exist (Yet) */}
                            <div id="why-not-exist" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">Why "All-Inclusive Weed Resorts" Don't Exist (Yet)</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {whyNotExist.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                                            <div className="flex-shrink-0">
                                                <ShieldCheck className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground">{item.factor}</h4>
                                                <p className="text-sm text-muted-foreground">{item.reality}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-6">What exists instead:</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        "420-friendly B&Bs",
                                        "Cannabis vacation packages",
                                        "Luxury luxury rentals",
                                        "All-in-one tour companies"
                                    ].map((text, i) => (
                                        <div key={i} className="px-4 py-3 rounded-lg bg-accent/5 text-accent text-sm font-semibold border border-accent/10 text-center">
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. The Closest Thing: Cannabis Vacation Packages */}
                            <div id="packages" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">The Closest Thing: Cannabis Vacation Packages</h2>
                                <p className="text-muted-foreground mb-8">
                                    These bundles are the spiritual successors to all-inclusive resorts. You book through a specialized tour operator who handles the hotel, the activities, and the transportation.
                                </p>

                                {packages.map((group, idx) => (
                                    <div key={idx} className="mb-10">
                                        <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                                            <Compass className="h-6 w-6" /> {group.company}
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-border">
                                                        <th className="py-4 font-bold text-muted-foreground">Package</th>
                                                        <th className="py-4 font-bold text-muted-foreground">Includes</th>
                                                        <th className="py-4 font-bold text-muted-foreground">Price Range</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {group.items.map((item, i) => (
                                                        <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                                                            <td className="py-4 font-bold pr-4">{item.name}</td>
                                                            <td className="py-4 text-sm text-muted-foreground pr-4">{item.details}</td>
                                                            <td className="py-4 text-accent font-semibold">{item.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {idx === 0 && (
                                            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm italic">
                                                Contact: 303-420-8687 | <a href="https://coloradocannabistours.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">coloradocannabistours.com</a>
                                            </div>
                                        )}
                                        {idx === 1 && (
                                            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm italic">
                                                Contact: (866) 601-0420
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 4. Best 420-Friendly Stays (Resort-Style) */}
                            <div id="resort-stays" className="mb-16">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold">Best 420-Friendly Stays (Resort-Style)</h2>
                                    <Link to="/hotels" className="text-accent flex items-center gap-1 text-sm font-bold hover:underline">
                                        View All <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>

                                <div className="space-y-8">
                                    {resortStays.map((stay, idx) => (
                                        <Card key={idx} className="overflow-hidden group hover:border-accent/40 transition-all duration-300">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="md:w-1/3 bg-muted relative overflow-hidden aspect-video md:aspect-auto">
                                                    <img
                                                        src={stay.image}
                                                        alt={stay.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-accent text-white border-0">Top Pick</Badge>
                                                    </div>
                                                </div>
                                                <div className="p-8 md:w-2/3">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-2xl font-bold">{stay.name}</h3>
                                                        <div className="flex text-gold">
                                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                        <MapPin className="h-4 w-4 text-accent" /> {stay.distance}
                                                    </div>
                                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                                        {stay.description}
                                                    </p>
                                                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                                        <div>
                                                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Best For</span>
                                                            <span className="text-sm font-bold text-accent">{stay.bestFor}</span>
                                                        </div>
                                                        <a
                                                            href={stay.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2"
                                                        >
                                                            <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-white transition-colors">
                                                                Book Now <ExternalLink className="h-3 w-3 ml-1" />
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Luxury 420 Vacation Rentals */}
                            <div id="luxury-rentals" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">Luxury 420 Vacation Rentals</h2>
                                <p className="text-muted-foreground mb-8">
                                    For travelers who want a "resort at home" experience, renting a multi-million dollar property where you can legally consume is the ultimate path.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {luxuryRentals.map((rental, i) => (
                                        <Card key={i} className="p-6 bg-card border-border/50">
                                            <Gem className="h-8 w-8 text-accent mb-4" />
                                            <h4 className="text-lg font-bold mb-2">{rental.type}</h4>
                                            <p className="text-sm text-muted-foreground mb-4">{rental.details}</p>
                                            <div className="text-xl font-bold text-accent">{rental.price}</div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10">
                                    <h4 className="font-bold mb-4">Where to find them:</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent" />
                                            <Link to="/hotels" className="text-foreground hover:text-accent font-medium">BudQuest 420-Friendly Rentals</Link>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent" />
                                            <span className="font-medium">Bud and Breakfast (Niche Marketplace)</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent" />
                                            <span className="font-medium">420-friendly VRBO/Airbnb (Look for keywords in descriptions)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 6. Mountain "Resort" Options */}
                            <div id="mountain-options" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">Mountain "Resort" Options</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Mountain className="h-5 w-5 text-accent" /> Breckenridge Area
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Breckenridge is a hotspot for high-altitude smoking. Many luxury condos allow vaping, and town dispensaries like <Link to="/blog/cannabis-dispensaries-breckenridge-complete-guide-2025" className="text-accent hover:underline">Breckenridge Organic Therapy</Link> are world-class.
                                        </p>
                                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-0">Ski + Smoke Combo</Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Mountain className="h-5 w-5 text-accent" /> Vail Area
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Ultra-luxury stays with private balconies are common here. Expect premium pricing ($400+/night) and vaporizer-friendly policies in higher-end condo hotels.
                                        </p>
                                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-0">Premium Luxury</Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Mountain className="h-5 w-5 text-accent" /> Winter Park
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Only 60 miles from Denver, this community is more laid-back and affordable. A great spot for a DIY "mountain resort" feel without the Vail price tag.
                                        </p>
                                    </div>

                                    <div id="aspen-link" className="space-y-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Mountain className="h-5 w-5 text-accent" /> Aspen
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Aspen boasts some of the world's most luxurious dispensaries (reminiscent of Apple Stores). Stays with private balconies are almost mandatory here.
                                        </p>
                                        <Link to="/aspen" className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">View Aspen Guide →</Link>
                                    </div>
                                </div>
                            </div>

                            {/* 7. DIY "All-Inclusive" Package */}
                            <div id="diy-package" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">DIY "All-Inclusive" Package</h2>
                                <p className="text-muted-foreground mb-8">
                                    Want to build your own resort experience? Here's the math for a 3-night luxury cannabis vacation in Colorado.
                                </p>

                                <Card className="overflow-hidden border-accent/20">
                                    <div className="bg-accent/10 p-6 flex items-center justify-between">
                                        <span className="font-bold">Building a 3-Night Dream Getaway</span>
                                        <span className="text-accent font-bold">Estimated Total: $800-1,500/person</span>
                                    </div>
                                    <div className="p-0">
                                        {diyPackage.map((row, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-border/50">
                                                <div className="mb-2 sm:mb-0">
                                                    <h4 className="font-bold">{row.component}</h4>
                                                    <p className="text-xs text-muted-foreground">Book via: {row.provider}</p>
                                                </div>
                                                <div className="text-accent font-bold">{row.cost}</div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* 8. What to Expect vs. Traditional All-Inclusive */}
                            <div id="comparison" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">Traditional vs. Colorado "All-Inclusive"</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
                                        <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5" /> Traditional All-Inclusive
                                        </h4>
                                        <ul className="space-y-4">
                                            {comparison.map((item, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-red-400">•</span> {item.trad}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-green-500/5 rounded-2xl p-6 border border-green-500/10">
                                        <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5" /> Colorado Experience
                                        </h4>
                                        <ul className="space-y-4">
                                            {comparison.map((item, i) => (
                                                <li key={i} className="text-sm text-foreground/90 font-medium flex items-start gap-2">
                                                    <span className="text-green-400">•</span> {item.colo}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-8 italic">
                                    The trade-off: You get much more freedom to explore, even if you lose a bit of convenience.
                                </p>
                            </div>

                            {/* 9. Tips for Booking */}
                            <div id="tips" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8">Tips for Booking Your 420 Vacation</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "Book packages through tour companies", desc: "They handle the heavy lifting and coordination." },
                                        { title: "Always Call Ahead", desc: "Confirm current cannabis policies right before you book." },
                                        { title: "Book Early for 4/20", desc: "Packages for April 20th sell out months in advance." },
                                        { title: "Consider Shoulder Season", desc: "March-April (non-peak) or Sept-Nov offer better rates." },
                                        { title: "Opt for Airport Pickups", desc: "Many companies will let you stop at a dispensary on the way." }
                                    ].map((tip, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-card border border-border/50">
                                            <h4 className="font-bold text-accent mb-2">0{i + 1}. {tip.title}</h4>
                                            <p className="text-sm text-muted-foreground">{tip.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 10. Coming Soon: Actual Cannabis Resorts? */}
                            <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-accent/20 to-gold/10 border border-accent/20">
                                <h2 className="text-3xl font-bold mb-6">Coming Soon: Actual Cannabis Resorts?</h2>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    The industry is evolving at breakneck speed. While true "all-inclusive" resorts don't exist under current laws, watch for the following developments in the near future:
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-card rounded-full h-fit border border-accent/20">
                                            <Hotel className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">INNdica Developments</h4>
                                            <p className="text-sm text-muted-foreground">Companies are working to build dedicated cannabis-first hospitality chains.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-card rounded-full h-fit border border-accent/20">
                                            <Coffee className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Consumption Lounge Expansion</h4>
                                            <p className="text-sm text-muted-foreground">Denver is licensing more venues where hospitality and consumption can finally meet.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 11. CTA */}
                            <div className="text-center py-16 border-t border-border/50">
                                <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Colorado Escape?</h2>
                                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                                    Colorado may not have Cancun-style resorts, but the 420-friendly boutique scene is better than ever. Start building your custom package today.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link to="/hotels">
                                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
                                            Find 420 Stays
                                        </Button>
                                    </Link>
                                    <Link to="/blog">
                                        <Button size="lg" variant="outline" className="px-8">
                                            More Guides
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Related Resources Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
                                {[
                                    { label: "Denver 420-Friendly Rentals", path: "/blog/best-420-rentals-denver" },
                                    { label: "Boulder 420-Friendly Rentals", path: "/blog/best-420-rentals-boulder" },
                                    { label: "Colorado Springs 420 Rentals", path: "/blog/best-420-rentals-colorado-springs" },
                                    { label: "Common Dispensary Questions", path: "/blog/first-time-dispensary-guide-colorado-2025" },
                                    { label: "Colorado Purchase Limits", path: "/blog/how-much-weed-can-you-buy-colorado-2025" }
                                ].map((link, i) => (
                                    <Link key={i} to={link.path} className="p-4 rounded-lg bg-muted/30 hover:bg-accent/10 text-sm font-medium border border-border/50 hover:border-accent/20 transition-all text-center">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="bg-card/50 py-20 border-t border-border/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <Card key={i} className="p-6 bg-background/40 hover:border-accent/30 transition-all">
                                    <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                                        <span className="text-accent font-serif italic text-2xl leading-none">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-muted-foreground pl-8">{faq.a}</p>
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

export default BlogColoradoAllInclusive;
