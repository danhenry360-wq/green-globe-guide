import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    MapPin, Clock, AlertTriangle, Home, Mountain,
    CheckCircle2, ChevronRight, Info, Star, DollarSign,
    Ban, Leaf, Award, Bed, Building, ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogColoradoSpringsStays = () => {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best 420-Friendly Hotels Colorado Springs & Manitou (2025)",
        "description": "Find the best cannabis-friendly hotels in Colorado Springs and Manitou. Verified 420 stays plus local consumption tips.",
        "image": "https://budquest.guide/blog-colorado-springs-stays.png",
        "author": { "@type": "Organization", "name": "BudQuest" },
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "logo": { "@type": "ImageObject", "url": "https://budquest.guide/logo.png" }
        },
        "datePublished": "2025-12-20",
        "dateModified": "2025-12-22",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://budquest.guide/blog/best-420-friendly-stays-colorado-springs"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://budquest.guide" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://budquest.guide/blog" },
            { "@type": "ListItem", "position": 3, "name": "420-Friendly Hotels Colorado Springs", "item": "https://budquest.guide/blog/best-420-friendly-stays-colorado-springs" }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Best 420-Friendly Hotels Colorado Springs & Manitou (2025)</title>
                <meta name="description" content="Find the best cannabis-friendly hotels in Colorado Springs and Manitou. Verified 420 stays plus local consumption tips to keep you safe in 2025." />
                <meta name="keywords" content="420 friendly hotels colorado springs, 420 friendly hotels manitou springs, bud and breakfast colorado springs, cannabis friendly hotels pikes peak" />
                <link rel="canonical" href="https://budquest.guide/blog/best-420-friendly-stays-colorado-springs" />
                <meta property="og:title" content="Best 420-Friendly Hotels Colorado Springs & Manitou (2025)" />
                <meta property="og:description" content="Find the best cannabis-friendly hotels in Colorado Springs and Manitou. Verified 420 stays plus local consumption tips to keep you safe." />
                <meta property="og:image" content="/blog-colorado-springs-stays.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Are there 420-friendly hotels in Colorado Springs?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Options in Colorado Springs proper are limited due to conservative local laws. Most 420-friendly lodging is found in nearby Manitou Springs (10 minutes away) or in private vacation rentals."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can you smoke weed in hotels in Colorado Springs?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No, most standard hotels strictly prohibit smoking and vaping of any kind. You risk cleaning fees of $250+. Always look for specifically designated '420-friendly' accommodations or properties with balconies."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is Manitou Springs 420-friendly?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, Manitou Springs is known for being much more counter-culture and cannabis-friendly than its neighbor Colorado Springs. It hosts several recreational dispensaries and cannabis-welcoming lodgings."
                                }
                            }
                        ]
                    }
                    `}
                </script>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[50vh] md:h-[60vh] flex items-center overflow-hidden pt-12 md:pt-0">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/dest-colorado-springs.jpg"
                            alt="Garden of the Gods and Colorado Springs"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Stays Guide</span>
                                <span className="text-white/80 text-sm flex items-center gap-1 shadow-sm">
                                    <Clock className="h-4 w-4" /> 7 min read
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                Best 420-Friendly Stays in <br className="hidden sm:block" />
                                <span className="text-green-500">Colorado Springs & Manitou (2025)</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-6">
                                Finding a place to smoke in the Springs can be tough. We found the hidden gems where you can relax.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* 1. Quick Answer Box */}
                            <section className="bg-muted p-5 sm:p-8 rounded-2xl border border-accent/10">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Info className="h-6 w-6 text-accent" /> Quick Answer
                                </h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Colorado Springs is more conservative than Denver—but <strong>Manitou Springs</strong> (10 minutes away) is a 420-friendly oasis. Here are the best cannabis-welcoming stays in the Pikes Peak region, from dedicated cannabis resorts to budget-friendly options with balconies.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <Link to="#inyhale" className="block p-4 bg-background rounded-lg hover:border-accent border transition-colors">
                                        <div className="font-bold text-accent">Best Overall</div>
                                        <div className="text-sm">INNhale Resort</div>
                                    </Link>
                                    <Link to="#budget" className="block p-4 bg-background rounded-lg hover:border-accent border transition-colors">
                                        <div className="font-bold text-accent">Best Value</div>
                                        <div className="text-sm">SCP Hotel</div>
                                    </Link>
                                </div>
                            </section>

                            {/* 2. The Colorado Springs Reality */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6">The Colorado Springs Reality</h2>
                                <p className="mb-6 text-muted-foreground">
                                    Before you book, you need to understand the local lay of the land. Colorado Springs is known for two things: stunning nature (Garden of the Gods, Pikes Peak) and a conservative culture (home to Focus on the Family and large military bases).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6">
                                        <div className="flex items-center gap-3 mb-4 text-orange-500">
                                            <AlertTriangle className="h-6 w-6" />
                                            <h3 className="font-bold text-lg">Colorado Springs</h3>
                                        </div>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><span>🏛️</span> More conservative vibe</li>
                                            <li className="flex gap-2"><span>🏘️</span> Very few 420-friendly hotels</li>
                                            <li className="flex gap-2"><span>👮</span> Stricter public consumption enforcement</li>
                                        </ul>
                                    </Card>
                                    <Card className="p-6">
                                        <div className="flex items-center gap-3 mb-4 text-green-500">
                                            <CheckCircle2 className="h-6 w-6" />
                                            <h3 className="font-bold text-lg">Manitou Springs</h3>
                                        </div>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><span>☮️</span> Artsy, hippie, chill vibe</li>
                                            <li className="flex gap-2"><span>🏨</span> Dedicated cannabis lodging</li>
                                            <li className="flex gap-2"><span>🛍️</span> Home to recreational dispensaries</li>
                                        </ul>
                                    </Card>
                                </div>
                                <p className="mt-4 p-4 bg-accent/5 rounded-lg text-sm text-muted-foreground border-l-4 border-accent">
                                    <strong>Key Insight:</strong> Stay in Manitou Springs for the 420-friendly lodging, then drive 10-15 minutes to explore Colorado Springs attractions.
                                </p>
                            </section>

                            {/* 3. Best 420-Friendly Stays */}
                            <section id="stays">
                                <h2 className="text-3xl font-bold mb-8">Best 420-Friendly Stays</h2>

                                {/* Tier 1 */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Award className="h-6 w-6 text-gold" />
                                        <h3 className="text-2xl font-bold">Tier 1: Dedicated Cannabis-Friendly</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <Card id="inyhale" className="p-6 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-1/3 bg-muted rounded-lg h-48 md:h-auto overflow-hidden relative group cursor-pointer">
                                                    <Link to="/hotels/innhale-resort-and-spa">
                                                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold z-10">Fully Friendly</div>
                                                        <img
                                                            src="/innhale-resort-room.png"
                                                            alt="INNhale Resort Room"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                                        <Link to="/hotels/innhale-resort-and-spa" className="hover:text-accent transition-colors">
                                                            <h4 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                                                INNhale Resort and Spa <ChevronRight className="h-4 w-4" />
                                                            </h4>
                                                        </Link>
                                                        <span className="w-fit flex items-center gap-1 text-sm font-bold bg-muted px-2 py-1 rounded">
                                                            <Star className="h-3 w-3 fill-gold text-gold" /> 9.1
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mb-4 flex items-center gap-4">
                                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Manitou Springs</span>
                                                        <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $$$</span>
                                                    </div>
                                                    <p className="text-muted-foreground mb-4">
                                                        The closest thing to a cannabis resort in the Pikes Peak region. Purpose-built for cannabis travelers with spa services available. You can consume openly here.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded font-medium">Consumption Allowed</span>
                                                        <span className="text-xs bg-muted px-2 py-1 rounded">Spa Services</span>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border/50 gap-4">
                                                        <Link
                                                            to="/hotels/innhale-resort-and-spa"
                                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-accent px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                                                        >
                                                            View Details & Book <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="p-6 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-1/3 bg-muted rounded-lg h-48 md:h-auto overflow-hidden relative group cursor-pointer">
                                                    <Link to="/hotels/the-ganja-getaway">
                                                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold z-10">VRBO</div>
                                                        <img
                                                            src="/ganja-getaway-living-room.png"
                                                            alt="Ganja Getaway Living Room"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                                        <Link to="/hotels/the-ganja-getaway" className="hover:text-accent transition-colors">
                                                            <h4 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                                                The Ganja Getaway <ChevronRight className="h-4 w-4" />
                                                            </h4>
                                                        </Link>
                                                        <span className="w-fit flex items-center gap-1 text-sm font-bold bg-muted px-2 py-1 rounded">
                                                            <Star className="h-3 w-3 fill-gold text-gold" /> 4.0
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mb-4 flex items-center gap-4">
                                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Colorado Springs (Westside)</span>
                                                        <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $$</span>
                                                    </div>
                                                    <p className="text-muted-foreground mb-4">
                                                        Private home near Ghost Town Museum and Garden of the Gods. Designed for cannabis consumers with full kitchen and privacy.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded font-medium">Private Home</span>
                                                        <span className="text-xs bg-muted px-2 py-1 rounded">Full Kitchen</span>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border/50 gap-4">
                                                        <Link
                                                            to="/hotels/the-ganja-getaway"
                                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-accent px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                                                        >
                                                            View Details & Book <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                {/* Tier 2 */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Building className="h-6 w-6 text-blue-500" />
                                        <h3 className="text-2xl font-bold">Tier 2: 420-Tolerant (Balconies)</h3>
                                    </div>
                                    <p className="mb-6 text-sm text-muted-foreground">
                                        These are NOT "open consumption" properties. They are traditional hotels with balconies where discreet consumption is generally tolerated, or they have specific policies allowing vaping.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="p-5">
                                            <h4 className="font-bold text-lg mb-1">Garden of the Gods Resort</h4>
                                            <div className="text-xs text-muted-foreground mb-3 flex gap-2">
                                                <span>3320 Mesa Rd</span>
                                                <span>•</span>
                                                <span>$$$$</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3"> Luxury option with stunning views. Not explicitly 420-friendly, but balconies offer discreet private space.</p>
                                            <span className="text-xs border border-orange-200 bg-orange-50 text-orange-600 px-2 py-1 rounded">Be Discreet</span>
                                        </Card>

                                        <Card className="p-5" id="budget">
                                            <h4 className="font-bold text-lg mb-1">SCP Hotel Colorado Springs</h4>
                                            <div className="text-xs text-muted-foreground mb-3 flex gap-2">
                                                <span>2850 South Circle Drive</span>
                                                <span>•</span>
                                                <span>$$</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">Eco-friendly and wellness-focused. Often more tolerant of vape usage in designated areas.</p>
                                            <span className="text-xs border border-blue-200 bg-blue-50 text-blue-600 px-2 py-1 rounded">Wellness Focused</span>
                                        </Card>

                                        <Card className="p-5">
                                            <h4 className="font-bold text-lg mb-1">Hilton Garden Inn Downtown</h4>
                                            <div className="text-xs text-muted-foreground mb-3 flex gap-2">
                                                <span>125 N. Cascade Ave</span>
                                                <span>•</span>
                                                <span>$$</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">Central location. Some rooms have balconies—request one specifically when booking.</p>
                                            <span className="text-xs border border-gray-200 bg-gray-50 text-gray-600 px-2 py-1 rounded">Balcony Rooms</span>
                                        </Card>

                                        <Card className="p-5">
                                            <h4 className="font-bold text-lg mb-1">The Broadmoor</h4>
                                            <div className="text-xs text-muted-foreground mb-3 flex gap-2">
                                                <span>1 Lake Avenue</span>
                                                <span>•</span>
                                                <span>$$$$$</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">Iconic luxury. Officially strict, but expansive grounds and private patios exist. High risk if caught.</p>
                                            <span className="text-xs border border-red-200 bg-red-50 text-red-600 px-2 py-1 rounded">Very Discreet Only</span>
                                        </Card>
                                    </div>
                                </div>

                                {/* Tier 3 */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Home className="h-6 w-6 text-purple-500" />
                                        <h3 className="text-2xl font-bold">Tier 3: Manitou Springs Rentals</h3>
                                    </div>
                                    <p className="mb-4 text-muted-foreground">
                                        Honestly, this is the move. Manitou is artsy, chill, and holds the most 420-friendly vibe in the region.
                                    </p>
                                    <div className="bg-card p-6 rounded-lg border">
                                        <ul className="space-y-4">
                                            <li className="flex gap-4 items-start">
                                                <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Home className="h-4 w-4" /></div>
                                                <div>
                                                    <h5 className="font-bold text-sm">Manitou Cabins</h5>
                                                    <p className="text-xs text-muted-foreground">Search "420 friendly" in VRBO/Airbnb descriptions. Many historic cabins allow smoking on porches.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Bed className="h-4 w-4" /></div>
                                                <div>
                                                    <h5 className="font-bold text-sm">Pikes Peak B&Bs</h5>
                                                    <p className="text-xs text-muted-foreground">Smaller, owner-operated spots are often more flexible than chains. Call ahead to ask their policy.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 4. Comparison Table */}
                            <section>
                                <h2 className="text-2xl font-bold mb-6">Manitou Springs vs Colorado Springs</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Factor</th>
                                                <th className="px-4 py-3">Manitou Springs</th>
                                                <th className="px-4 py-3">Colorado Springs</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Vibe</td>
                                                <td className="px-4 py-3">Artsy, hippie, chill</td>
                                                <td className="px-4 py-3">Conservative, military</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-medium">420 Lodging</td>
                                                <td className="px-4 py-3 text-green-600 font-bold">Multiple Options</td>
                                                <td className="px-4 py-3 text-red-500">Very Limited</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Dispensaries</td>
                                                <td className="px-4 py-3">Nearby (2)</td>
                                                <td className="px-4 py-3">40+ (in county bounds)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Attractions</td>
                                                <td className="px-4 py-3">Cliff Dwellings, Arcade</td>
                                                <td className="px-4 py-3">Garden of Gods, Pikes Peak</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-4 text-center font-bold text-muted-foreground">Verdict: Stay in Manitou, explore Colorado Springs.</p>
                            </section>

                            {/* 5. What to Do While High */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6">What to Do While High</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition">
                                        <Mountain className="h-10 w-10 text-orange-500 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">Garden of the Gods</h4>
                                            <p className="text-sm text-muted-foreground">Best early morning. Bring snacks (edibles work great). Remember: NO consumption on site (it's a public park).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition">
                                        <Mountain className="h-10 w-10 text-blue-500 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">Pikes Peak Summit</h4>
                                            <p className="text-sm text-muted-foreground">The summit drive is unforgettable. Consume before (not during) the journey. Warning: Altitude intensifies effects.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition">
                                        <Home className="h-10 w-10 text-purple-500 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">Manitou Springs Town</h4>
                                            <p className="text-sm text-muted-foreground">Walk the penny arcade, galleries, and mineral springs. The vibe is super friendly and walkable.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 6. Avoid & Tips */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-500">
                                        <Ban className="h-5 w-5" /> Where NOT to Consume
                                    </h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex gap-2">✕ Garden of the Gods (Public Park)</li>
                                        <li className="flex gap-2">✕ Pikes Peak Summit (Federal/Public)</li>
                                        <li className="flex gap-2">✕ Downtown Colorado Springs sidewalks</li>
                                        <li className="flex gap-2">✕ Inside Rental Cars (Illegal/Fees)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                                        <CheckCircle2 className="h-5 w-5" /> Booking Tips
                                    </h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex gap-2">✓ Look at Manitou Springs first</li>
                                        <li className="flex gap-2">✓ Call ahead to confirm cannabis policy</li>
                                        <li className="flex gap-2">✓ Private rentals often offer more freedom</li>
                                        <li className="flex gap-2">✓ Book INNhale early - it fills up fast</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="text-center py-8 bg-muted/30 rounded-2xl">
                                <h2 className="text-2xl font-bold mb-4">Ready to Plan?</h2>
                                <p className="text-muted-foreground mb-6">Colorado Springs may be conservative, but Manitou Springs delivers the goods.</p>
                                <div className="flex justify-center gap-4">
                                    <Link to="/dispensary" className="px-6 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/90">Find Dispensaries</Link>
                                    <Link to="/manitou-springs" className="px-6 py-2 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10">Manitou Guide</Link>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <Card className="p-6 bg-accent/5 border-accent/20">
                                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <Leaf className="h-5 w-5 text-accent" /> Nearby Dispensaries
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="text-sm">
                                            <div className="font-bold">Maggie's Farm</div>
                                            <div className="text-xs text-muted-foreground">Manitou Area • Outdoor Grow</div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-bold">Emerald Fields</div>
                                            <div className="text-xs text-muted-foreground">Manitou Springs • Boutique</div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-bold">Star Buds</div>
                                            <div className="text-xs text-muted-foreground">Colorado Springs • Reliable</div>
                                        </div>
                                    </div>
                                    <Link to="/dispensary" className="text-xs text-accent font-bold mt-4 block hover:underline">
                                        View All Dispensaries →
                                    </Link>
                                </Card>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BlogColoradoSpringsStays;
