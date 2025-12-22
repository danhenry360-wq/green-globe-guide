import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Clock, Calendar, User, ChevronRight, CheckCircle2,
    MapPin, Building, Mountain, Car, DollarSign, Scale, XCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogDenverVsBoulder = () => {
    return (
        <>
            <Helmet>
                <title>Denver vs Boulder: Which is Better for Cannabis Tourists? (2025)</title>
                <meta name="description" content="Deciding between Denver and Boulder for your weed trip? We compare dispensaries, vibes, 420-friendly hotels, and prices in this 2025 head-to-head guide." />
                <meta name="keywords" content="denver vs boulder cannabis, denver or boulder for weed, best colorado city for cannabis, boulder dispensaries vs denver, where to buy weed denver or boulder" />
                <link rel="canonical" href="https://budquest.guide/blog/denver-vs-boulder-cannabis-tourists-2025" />
                <meta property="og:title" content="Denver vs Boulder: Which is Better for Cannabis Tourists? (2025)" />
                <meta property="og:description" content="Detailed comparison of dispensaries, hotels, and vibes to help you choose." />
                <meta property="og:image" content="/blog-denver-vs-boulder.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Denver vs Boulder: Which is Better for Cannabis Tourists? (2025)",
                        "description": "Detailed comparison of dispensaries, hotels, and vibes to help you choose between Denver and Boulder.",
                        "image": "https://budquest.guide/blog-denver-vs-boulder.png",
                        "author": { "@type": "Organization", "name": "BudQuest Team" },
                        "publisher": {
                            "@type": "Organization",
                            "name": "BudQuest",
                            "logo": { "@type": "ImageObject", "url": "https://budquest.guide/logo.png" }
                        },
                        "datePublished": "2025-12-17",
                        "dateModified": "2025-12-17"
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide/" },
                            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://budquest.guide/blog" },
                            { "@type": "ListItem", "position": 3, "name": "Denver vs Boulder", "item": "https://budquest.guide/blog/denver-vs-boulder-cannabis-tourists-2025" }
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Is Denver or Boulder better for weed tourists?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Denver is better if you want maximum variety, 420-friendly hotels, and nightlife. Boulder is better for a relaxed, nature-focused experience with high-quality craft cannabis." }
                            },
                            {
                                "@type": "Question",
                                "name": "How many dispensaries are in Denver vs Boulder?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Denver has approximately 186 recreational dispensaries, while Boulder has about 44." }
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
                        src="/blog-denver-vs-boulder.png"
                        alt="Denver vs Boulder landscape comparison"
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
                            <span className="text-accent">Denver vs Boulder</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Comparison Guide</span>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20">Current for 2025</span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> December 17, 2025
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> 10 min read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Denver vs Boulder:
                                </span>
                                <br />
                                <span className="text-foreground/90">Which is Better for Cannabis Tourists? (2025)</span>
                            </h1>

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

                {/* Quick Answer */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-12">
                                <h2 className="text-xl font-bold text-accent mb-2">The Short Answer</h2>
                                <p className="text-muted-foreground font-medium">
                                    Denver has more dispensaries (186 vs 44), consumption lounges, and 420-friendly stays. Boulder has a chiller vibe, craft cannabis focus, and better nature access. <br /><br />
                                    <span className="text-foreground">Choose Denver for variety and nightlife, Boulder for a relaxed mountain-town experience.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vibe Check Comparison */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
                                <Scale className="h-8 w-8 text-accent" /> The Vibe Check
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <Card className="p-6 border-blue-500/20 bg-blue-500/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Building className="h-6 w-6 text-blue-500" />
                                        <h3 className="text-2xl font-bold text-blue-500">Denver</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Cannabis capital of America. Dispensaries across every neighborhood. Feels normalized—billboards, tours, lounges, delivery services.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between border-b border-blue-500/10 py-2">
                                            <span className="font-semibold text-foreground">Feel</span>
                                            <span className="text-right">Big city, urban, diverse</span>
                                        </li>
                                        <li className="flex justify-between border-b border-blue-500/10 py-2">
                                            <span className="font-semibold text-foreground">Pace</span>
                                            <span className="text-right">Fast, lots to do</span>
                                        </li>
                                        <li className="flex justify-between border-b border-blue-500/10 py-2">
                                            <span className="font-semibold text-foreground">Cannabis Culture</span>
                                            <span className="text-right">Mainstream, commercial</span>
                                        </li>
                                    </ul>
                                </Card>

                                <Card className="p-6 border-green-500/20 bg-green-500/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Mountain className="h-6 w-6 text-green-500" />
                                        <h3 className="text-2xl font-bold text-green-500">Boulder</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Smaller scene but quality-focused. Flatirons backdrop. More "wellness" than "party." The kind of place where budtenders talk terpene profiles.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between border-b border-green-500/10 py-2">
                                            <span className="font-semibold text-foreground">Feel</span>
                                            <span className="text-right">College town, outdoorsy</span>
                                        </li>
                                        <li className="flex justify-between border-b border-green-500/10 py-2">
                                            <span className="font-semibold text-foreground">Pace</span>
                                            <span className="text-right">Slow, nature-focused</span>
                                        </li>
                                        <li className="flex justify-between border-b border-green-500/10 py-2">
                                            <span className="font-semibold text-foreground">Cannabis Culture</span>
                                            <span className="text-right">Craft, organic, boutique</span>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dispensaries */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Dispensaries: Quantity vs Quality</h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                Denver has over 4x more recreational dispensaries than Boulder. If you want options—budget ounces, premium craft, specific strains, rare genetics—Denver delivers. Boulder's smaller scene emphasizes organic growing and knowledgeable staff.
                            </p>

                            <div className="overflow-x-auto mb-8 bg-card rounded-lg border border-accent/20">
                                <table className="w-full text-left text-sm md:text-base">
                                    <thead className="bg-accent/10 text-accent font-bold uppercase text-xs">
                                        <tr>
                                            <th className="p-4">Feature</th>
                                            <th className="p-4">Denver</th>
                                            <th className="p-4">Boulder</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-accent/10">
                                        <tr>
                                            <td className="p-4 font-semibold">Rec Dispensaries</td>
                                            <td className="p-4">~186</td>
                                            <td className="p-4">~44</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-semibold">Vibe</td>
                                            <td className="p-4">Everything—budget to premium</td>
                                            <td className="p-4">Curated, craft-focused</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-semibold">Wait Times</td>
                                            <td className="p-4">Can be long at popular spots</td>
                                            <td className="p-4">Usually quick</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-semibold">Notable Chains</td>
                                            <td className="p-4">Native Roots, LivWell, Green Solution</td>
                                            <td className="p-4">Some chains + local boutiques</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-semibold">Standouts</td>
                                            <td className="p-4">Cookies, Lightshade, The Lodge</td>
                                            <td className="p-4">Maikoh Holistics, 14er, Terrapin</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Card className="p-6 bg-accent/5 border-accent/20">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent" /> Winner
                                </h3>
                                <p className="text-muted-foreground">
                                    <strong>Denver for selection.</strong> Boulder for craft quality over quantity.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <Link to="/dispensary" className="text-accent hover:underline text-sm font-medium">Browse Denver Dispensaries →</Link>
                                    <Link to="/dispensary" className="text-accent hover:underline text-sm font-medium">Browse Boulder Dispensaries →</Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 420 Friendly Stays */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">420-Friendly Stays</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">Denver</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Denver's 420-friendly accommodation scene is mature. You'll find dedicated cannabis B&Bs, verified Bud and Breakfast listings, and hotels that look the other way on balconies.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Dedicated Cannabis Hotels</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Licensed Consumption Lounges</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Easy to book verfied stays</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">Boulder</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Boulder requires more planning. Most options are private vacation rentals—call ahead to confirm cannabis is allowed. No licensed consumption lounges exist yet.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Mostly Vacation Rentals</li>
                                        <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500" /> No Licensed Lounges</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Book early, fewer choices</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-accent/10">
                                <p className="font-bold text-lg mb-2">Winner: Denver</p>
                                <p className="text-muted-foreground">More verified 420-friendly options and actual consumption lounges like <em>The Coffee Joint</em> and <em>Tetra Lounge</em>.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Things to Do High */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Things to Do High</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-6 border-accent/20">
                                    <h3 className="text-xl font-bold text-accent mb-4">Denver Activities</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> RiNo art district + dispensary crawl
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Red Rocks Amphitheatre (consume before)
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Meow Wolf Denver
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Sports games (Broncos, Nuggets, Rockies)
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Massive food scene
                                        </li>
                                    </ul>
                                </Card>
                                <Card className="p-6 border-accent/20">
                                    <h3 className="text-xl font-bold text-accent mb-4">Boulder Activities</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Hike the Flatirons
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Pearl Street pedestrian mall stroll
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Chautauqua Park picnic
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Boulder Creek path walk or bike
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-accent">•</span> Celestial Seasonings tour
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Logistics: Getting There & Prices */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Logistics & Prices</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Car className="h-5 w-5" /> Getting There from DIA</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-card rounded-lg border border-accent/10">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">To Denver</span>
                                                <span className="text-accent font-bold">30-40 min</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Train (A Line) available directly to downtown Union Station.</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-lg border border-accent/10">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">To Boulder</span>
                                                <span className="text-accent font-bold">50-60 min</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Bus available, but less convenient. Uber/Lyft $60-100+.</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><DollarSign className="h-5 w-5" /> Price Check</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-card rounded-lg border border-accent/10">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">Denver Ounces</span>
                                                <span className="text-green-500 font-bold">$80 - $250</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Competitive pricing, lots of deals and daily specials.</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-lg border border-accent/10">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">Boulder Ounces</span>
                                                <span className="text-yellow-500 font-bold">$120 - $280</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Slightly higher, paying for organic/craft premium.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Verdict */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">The Verdict</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <Card className="p-8 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Building className="h-24 w-24" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Choose Denver If...</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> You want maximum dispensary variety</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> You want 420-friendly hotels & lounges</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> You love nightlife and city energy</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> You're a budget traveler hunting deals</li>
                                    </ul>
                                </Card>

                                <Card className="p-8 border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Mountain className="h-24 w-24" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Choose Boulder If...</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> You prioritize nature and hiking</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> You want craft, organic cannabis</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> You prefer a chill, slower vibe</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> You want Flatirons views with your flower</li>
                                    </ul>
                                </Card>
                            </div>

                            <Card className="bg-muted p-8 text-center">
                                <h3 className="text-xl font-bold mb-2">Can't decide? Do both.</h3>
                                <p className="text-muted-foreground mb-6">
                                    Stay in Denver for the variety and easier 420-friendly accommodation. Day trip to Boulder (45 mins) for the Flatirons, a craft dispensary run, and lunch on Pearl Street. You get the best of both scenes.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        to="/dispensary"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        Find Dispensaries
                                    </Link>
                                    <Link
                                        to="/blog"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        Read More Guides
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BlogDenverVsBoulder;
