import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Clock, Calendar, User, ChevronRight, CheckCircle2,
    MapPin, Building, Mountain, Car, DollarSign, Scale, XCircle,
    Info, AlertCircle, ShoppingBag, Backpack, Map, Utensils,
    Wind, Droplets, Thermometer, Camera, Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogUltimateColoradoGuide = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is cannabis legal for tourists in Colorado?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, cannabis is legal for any adult age 21 or older with a valid government-issued ID, including out-of-state and international tourists."
                }
            },
            {
                "@type": "Question",
                "name": "Where can you smoke weed legally in Colorado?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Consumption is only legal on private property with the owner's permission. This includes 420-friendly vacation rentals and licensed consumption lounges in cities like Denver."
                }
            },
            {
                "@type": "Question",
                "name": "How much weed can you buy in Colorado?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Adults 21+ can purchase up to 1 ounce of flower, 8 grams of concentrates, or 800mg of edibles per day in a single transaction."
                }
            },
            {
                "@type": "Question",
                "name": "Does altitude affect your cannabis high?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, thinner air at higher altitudes can make the effects of cannabis feel significantly stronger and may lead to faster dehydration."
                }
            },
            {
                "@type": "Question",
                "name": "Can you smoke weed at Colorado ski resorts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Most ski resorts are on federal land, where cannabis remains strictly illegal. Consuming on the slopes can lead to fines or loss of lift passes."
                }
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>High Altitude, Higher Vibes: The Ultimate Stoner's Guide to Colorado 2025</title>
                <meta name="description" content="Plan the ultimate 420 vacation in Colorado. From Denver lounges to mountain highs, this 2025 guide covers laws, cities, altitude tips, and best activities." />
                <meta name="keywords" content="stoner guide to colorado, cannabis travel colorado, colorado weed vacation, 420 trip colorado, cannabis tourism colorado, stoner vacation colorado 2025" />
                <link rel="canonical" href="https://budquest.guide/blog/ultimate-stoner-guide-colorado-2025" />
                <meta property="og:title" content="High Altitude, Higher Vibes: The Ultimate Stoner's Guide to Colorado 2025" />
                <meta property="og:description" content="The complete roadmap for your Colorado cannabis vacation. Laws, lounges, and mountain vibes." />
                <meta property="og:image" content="/blog-colorado-ultimate-guide.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[60vh] overflow-hidden">
                    <img
                        src="/blog-colorado-ultimate-guide.png"
                        alt="Colorado Rocky Mountains - Ultimate Stoner Guide 2025"
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
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Pillar Page</span>
                                <span className="text-white/80 text-sm flex items-center gap-1 shadow-sm">
                                    <Calendar className="h-4 w-4" /> December 18, 2025
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight shadow-xl">
                                High Altitude, Higher Vibes: <br />
                                <span className="text-accent">The Ultimate Stoner's Guide to Colorado 2025</span>
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mb-6 drop-shadow-md">
                                Welcome to the Mile High State. Let's get higher.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-16">

                            {/* 1. Intro */}
                            <section id="intro" className="prose prose-invert max-w-none">
                                <p className="text-xl leading-relaxed text-muted-foreground">
                                    Colorado started the legal cannabis revolution in 2012. Over a decade later, it's still the best state for a 420 vacation—dispensaries everywhere, stunning mountain scenery, and a culture that actually embraces cannabis tourism. Whether you're hitting the slopes, exploring Denver, or chasing mountain sunsets, this is your complete guide to doing Colorado the right way.
                                </p>
                            </section>

                            {/* 2. Why Colorado? */}
                            <section id="why-colorado">
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Sparkles className="h-8 w-8 text-accent" /> Why Colorado for Cannabis Tourism?
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { title: "First Legal State", detail: "Recreational since 2014—the most mature market in the world.", icon: Scale },
                                        { title: "500+ Dispensaries", detail: "Competitive prices, massive selection, and artisan growers.", icon: ShoppingBag },
                                        { title: "Infrastructure", detail: "420-friendly stays, consumption lounges, and dedicated tours.", icon: Building },
                                        { title: "Natural Beauty", detail: "The Rockies provide the ultimate backdrop for any session.", icon: Mountain },
                                        { title: "Culture", detail: "Cannabis is normalized here. No stigma, just high vibes.", icon: User },
                                        { title: "Variety", detail: "From budget-friendly urban spots to luxury mountain escapes.", icon: DollarSign }
                                    ].map((item, i) => (
                                        <Card key={i} className="p-6 bg-accent/5 border-accent/10 hover:border-accent/30 transition-all">
                                            <item.icon className="h-8 w-8 text-accent mb-4" />
                                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                                        </Card>
                                    ))}
                                </div>
                                <p className="mt-8 text-muted-foreground italic text-center">
                                    Colorado isn't just legal—it's built for cannabis tourists.
                                </p>
                            </section>

                            {/* 3. Laws */}
                            <section id="laws" className="bg-muted/30 p-8 rounded-2xl border border-accent/10">
                                <h2 className="text-3xl font-bold mb-6">Know Before You Go: Colorado Cannabis Laws 2025</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent mt-1" />
                                            <div>
                                                <span className="font-bold">Age: 21+</span>
                                                <p className="text-sm text-muted-foreground">Valid government ID required. Out-of-state and international IDs work.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent mt-1" />
                                            <div>
                                                <span className="font-bold">Purchase Limit</span>
                                                <p className="text-sm text-muted-foreground">1 oz flower / 8g concentrates / 800mg edibles per day.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent mt-1" />
                                            <div>
                                                <span className="font-bold">Possession Limit</span>
                                                <p className="text-sm text-muted-foreground">2 oz for adults 21+.</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-destructive">
                                            <XCircle className="h-5 w-5 mt-1" />
                                            <div>
                                                <span className="font-bold">Consumption</span>
                                                <p className="text-sm text-muted-foreground">Private property ONLY. No public, no cars, no federal land.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3 text-destructive">
                                            <XCircle className="h-5 w-5 mt-1" />
                                            <div>
                                                <span className="font-bold">DUI</span>
                                                <p className="text-sm text-muted-foreground">5 nanograms THC = Impaired. Colorado has strict blood testing.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3 text-destructive">
                                            <XCircle className="h-5 w-5 mt-1" />
                                            <div>
                                                <span className="font-bold">Crossing Lines</span>
                                                <p className="text-sm text-muted-foreground">Federal crime. Do NOT take cannabis out of the state.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link to="/blog/where-can-you-smoke-weed-in-colorado-2025" className="text-accent underline text-sm">Colorado Cannabis Laws for Tourists Guide</Link>
                                    <Link to="/blog/how-much-weed-can-you-buy-colorado-2025" className="text-accent underline text-sm">How Much Weed Can You Buy? (Deep Dive)</Link>
                                </div>
                            </section>

                            {/* 4. Best Cities */}
                            <section id="cities">
                                <h2 className="text-3xl font-bold mb-8">Best Colorado Cities for Cannabis Tourists</h2>

                                <div className="space-y-12">
                                    {/* Denver */}
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-full md:w-1/3">
                                            <img src="/dest-denver.jpg" alt="Denver Skyline" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <h3 className="text-2xl font-bold mb-2">Denver — The Cannabis Capital</h3>
                                            <p className="text-muted-foreground mb-4">
                                                With 186 recreational dispensaries and a thriving social scene, Denver is the heartbeat of Colorado's cannabis culture. Home to consumption lounges like The Coffee Joint and Tetra, it offers the most 420-friendly stay options in the world.
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">Meow Wolf</span>
                                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">RiNo Art District</span>
                                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">Red Rocks</span>
                                            </div>
                                            <Link to="/denver" className="text-accent font-bold hover:underline">Denver Cannabis Guide →</Link>
                                        </div>
                                    </div>

                                    {/* Boulder */}
                                    <div className="flex flex-col md:flex-row-reverse gap-8 items-start border-t border-accent/10 pt-12">
                                        <div className="w-full md:w-1/3">
                                            <img src="/dest-boulder.jpg" alt="Boulder Flatirons" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <h3 className="text-2xl font-bold mb-2">Boulder — Craft Cannabis + Mountain Vibes</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Just 30 minutes from Denver, Boulder offers 44 dispensaries with a heavy focus on organic and craft genetics. It's the perfect spot for hikers who want to pair their Flatirons views with premium flower.
                                            </p>
                                            <Link to="/boulder" className="text-accent font-bold hover:underline">Boulder Cannabis Guide →</Link>
                                        </div>
                                    </div>

                                    {/* Breckenridge */}
                                    <div className="flex flex-col md:flex-row gap-8 items-start border-t border-accent/10 pt-12">
                                        <div className="w-full md:w-1/3">
                                            <img src="/dest-breckenridge.jpg" alt="Breckenridge Ski Resort" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <h3 className="text-2xl font-bold mb-2">Breckenridge — Ski Town + High Altitudes</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Sitting at 9,600 ft, Breckenridge is a world-class ski destination with a robust dispensary scene. Be warned: the altitude makes cannabis hit twice as hard here.
                                            </p>
                                            <Link to="/breckenridge" className="text-accent font-bold hover:underline">Breckenridge Guide →</Link>
                                        </div>
                                    </div>

                                    {/* Aspen */}
                                    <div className="flex flex-col md:flex-row-reverse gap-8 items-start border-t border-accent/10 pt-12">
                                        <div className="w-full md:w-1/3">
                                            <img src="/dest-aspen.jpg" alt="Aspen Mountains" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <h3 className="text-2xl font-bold mb-2">Aspen — Luxury Cannabis Experience</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Aspen is where cannabis meets high-end luxury. Expect boutique dispensaries that feel like high-end jewelry stores and premium products you won't find anywhere else.
                                            </p>
                                            <Link to="/aspen" className="text-accent font-bold hover:underline">Aspen Cannabis Guide →</Link>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Where to Consume */}
                            <section id="where-to-consume">
                                <h2 className="text-3xl font-bold mb-8">Where Can You Actually Smoke?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card className="p-6 border-green-500/20 bg-green-500/5">
                                        <h3 className="text-xl font-bold mb-4 text-green-500 flex items-center gap-2">
                                            <CheckCircle2 className="h-6 w-6" /> Legal Options
                                        </h3>
                                        <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                                            <li>420-friendly vacation rentals (Kushkations, Bud & Breakfast)</li>
                                            <li>Licensed consumption lounges (Denver only for now)</li>
                                            <li>Private property with owner permission</li>
                                            <li>Cannabis-friendly tours (Private buses)</li>
                                            <li>Designated 420-friendly events</li>
                                        </ul>
                                    </Card>

                                    <Card className="p-6 border-red-500/20 bg-red-500/5">
                                        <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                                            <AlertCircle className="h-6 w-6" /> Illegal (Risk of $999 Fines)
                                        </h3>
                                        <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                                            <li>Public streets, sidewalks, and parks</li>
                                            <li>Hotel rooms and balconies (unless explicitly allowed)</li>
                                            <li>Rental cars (even for passengers)</li>
                                            <li>Federal land (National Parks, some ski resorts)</li>
                                            <li>Concert venues (Consume BEFORE entering)</li>
                                        </ul>
                                    </Card>
                                </div>
                            </section>

                            {/* 6. Altitude */}
                            <section id="altitude" className="bg-accent/5 p-8 rounded-2xl">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Wind className="h-8 w-8 text-accent" /> Altitude + Cannabis
                                </h2>
                                <p className="mb-8 text-muted-foreground">
                                    Colorado's elevation changes everything. The higher you go, the thinner the air, and the more intense your high will feel.
                                </p>

                                <div className="overflow-x-auto mb-8">
                                    <table className="w-full text-left">
                                        <thead className="bg-accent/20">
                                            <tr>
                                                <th className="p-4 rounded-tl-lg">City</th>
                                                <th className="p-4 rounded-tr-lg">Elevation</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-accent/10">
                                            <tr><td className="p-4">Denver</td><td className="p-4 font-mono">5,280 ft</td></tr>
                                            <tr><td className="p-4">Boulder</td><td className="p-4 font-mono">5,430 ft</td></tr>
                                            <tr><td className="p-4">Aspen</td><td className="p-4 font-mono">7,900 ft</td></tr>
                                            <tr><td className="p-4">Breckenridge</td><td className="p-4 font-mono">9,600 ft</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-bold flex items-center gap-2"><Droplets className="h-5 w-5 text-accent" /> The Effects</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Less oxygen = THC feels 2x stronger</li>
                                            <li>• Dehydration happens at triple the speed</li>
                                            <li>• Edibles can hit with extreme intensity</li>
                                            <li>• Altitude sickness + cannabis = bad time</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Survival Tips</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Cut your normal dose in HALF for day one</li>
                                            <li>• Hydrate constantly (Water, not just soda)</li>
                                            <li>• Acclimate for 24 hours before heavy use</li>
                                            <li>• Start low, go slow—especially with edibles</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 7. Activities */}
                            <section id="activities">
                                <h2 className="text-3xl font-bold mb-8">The Ultimate Colorado High Bucket List</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 border-accent/10">
                                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-accent"><Camera className="h-5 w-5" /> Urban Adventures</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>• Meow Wolf Denver (Trippy art immersive)</li>
                                            <li>• RiNo Street Art Walk (Munchies crawl)</li>
                                            <li>• Casa Bonita (Absurd, theatrical, perfect high)</li>
                                            <li>• Denver Art Museum</li>
                                        </ul>
                                    </Card>
                                    <Card className="p-6 border-accent/10">
                                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-accent"><Mountain className="h-5 w-5" /> Nature Experiences</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>• Flatirons Hike in Boulder</li>
                                            <li>• Garden of the Gods (Colorado Springs)</li>
                                            <li>• Hot Springs (Glenwood or Pagosa)</li>
                                            <li>• Horsetooth Reservoir (Fort Collins)</li>
                                        </ul>
                                    </Card>
                                    <div className="md:col-span-2">
                                        <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
                                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-yellow-500"><AlertCircle className="h-5 w-5" /> Important: Federal Land</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Rocky Mountain National Park and many major ski resorts are on <strong>Federal Land</strong>. Cannabis is 100% illegal there. No consumption, no possession. Stay safe and consume before or after your visit.
                                            </p>
                                        </Card>
                                    </div>
                                </div>
                            </section>

                            {/* 8. First-Timer Tips */}
                            <section id="tips" className="border-t border-accent/10 pt-16">
                                <h2 className="text-3xl font-bold mb-8">Pro Tips for First-Timers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Book 420-friendly accommodation FIRST — It's the hardest part.",
                                        "Bring Cash — Most dispensaries are cash-only (with ATMs on-site).",
                                        "Start LOW with Edibles — 5-10mg max. Wait 2 full hours.",
                                        "Ask Budtenders for Help — They love answering newbie questions.",
                                        "Don't Overbuy — You cannot take it home on a plane.",
                                        "Respect the Rules — No public smoking, no driving high.",
                                        "Check Hours — Most dispensaries close by 10pm.",
                                        "Keep Receipts — Legal proof of purchase is always smart."
                                    ].map((tip, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                                            <span className="text-accent font-bold">0{i + 1}</span>
                                            <span className="text-sm">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 9. Sample Itineraries */}
                            <section id="itineraries">
                                <h2 className="text-3xl font-bold mb-8">Colorado 420 Itineraries</h2>
                                <div className="space-y-6">
                                    <Card className="p-6">
                                        <h3 className="font-bold text-xl mb-4">Weekend Warrior (3 Days)</h3>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p><strong>Friday:</strong> Land in Denver, dispensary run, dinner in RiNo, consume at rental.</p>
                                            <p><strong>Saturday:</strong> Meow Wolf or Red Rocks, explore downtown, munchies crawl.</p>
                                            <p><strong>Sunday:</strong> Day trip to Boulder, Flatirons hike, consume remaining before flight.</p>
                                        </div>
                                    </Card>
                                    <Card className="p-6 border-accent/10 bg-accent/5">
                                        <h3 className="font-bold text-xl mb-4 text-accent">The Ski + Smoke Loop (5 Days)</h3>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p><strong>Day 1:</strong> Denver arrival, drive to Breckenridge, dispensary stop.</p>
                                            <p><strong>Day 2:</strong> Ski all day, après-ski session at rental.</p>
                                            <p><strong>Day 3:</strong> Ski morning, hot tub + edibles afternoon.</p>
                                            <p><strong>Day 4:</strong> Explore Main Street, chill day with views.</p>
                                            <p><strong>Day 5:</strong> Drive back to Denver, depart.</p>
                                        </div>
                                    </Card>
                                </div>
                            </section>

                            {/* 10. Packing List */}
                            <section id="packing" className="bg-muted p-8 rounded-2xl">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Backpack className="h-8 w-8 text-accent" /> What to Pack
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                                            <User className="text-accent" />
                                        </div>
                                        <span className="text-xs font-bold">Valid ID (21+)</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                                            <DollarSign className="text-accent" />
                                        </div>
                                        <span className="text-xs font-bold">Cash for Dispensaries</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                                            <Droplets className="text-accent" />
                                        </div>
                                        <span className="text-xs font-bold">Eye Drops & Water</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                                            <Utensils className="text-accent" />
                                        </div>
                                        <span className="text-xs font-bold">Munchies Snacks</span>
                                    </div>
                                </div>
                            </section>

                            {/* 11. Common Mistakes */}
                            <section id="mistakes">
                                <h2 className="text-3xl font-bold mb-8">Mistakes to Avoid</h2>
                                <div className="overflow-x-auto rounded-xl border border-accent/20">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-red-500/10 text-red-500">
                                            <tr>
                                                <th className="p-4">Mistake</th>
                                                <th className="p-4">Why It's Bad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-accent/10">
                                            <tr><td className="p-4 font-bold">Regular Hotel Booking</td><td className="p-4">Risk of $500 cleaning fees and being kicked out.</td></tr>
                                            <tr><td className="p-4 font-bold">Smoking in Public</td><td className="p-4">Strict fines from $100 to $999.</td></tr>
                                            <tr><td className="p-4 font-bold">Driving While High</td><td className="p-4">DUI, license suspension, or even jail time.</td></tr>
                                            <tr><td className="p-4 font-bold">Buying Too Much</td><td className="p-4">Federal crime to take it out of state—massive waste of money.</td></tr>
                                            <tr><td className="p-4 font-bold">Ignoring Hydration</td><td className="p-4">Altitude + Cannabis + Dehydration = Extreme Headaches.</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* 12. Wrap Up */}
                            <section id="wrapup" className="text-center py-16 bg-gradient-to-br from-accent/10 to-background rounded-3xl border border-accent/20">
                                <h2 className="text-4xl font-bold mb-6">Enjoy the Mile High State Properly</h2>
                                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                                    Colorado wrote the playbook for legal cannabis—and it's still the best place to enjoy it. Plan smart, consume legally, and respect the mountains.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Link to="/denver" className="p-4 bg-muted/40 rounded-xl hover:bg-accent/20 transition-all font-bold">Denver Guide</Link>
                                    <Link to="/boulder" className="p-4 bg-muted/40 rounded-xl hover:bg-accent/20 transition-all font-bold">Boulder Guide</Link>
                                    <Link to="/aspen" className="p-4 bg-muted/40 rounded-xl hover:bg-accent/20 transition-all font-bold">Aspen Guide</Link>
                                    <Link to="/breckenridge" className="p-4 bg-muted/40 rounded-xl hover:bg-accent/20 transition-all font-bold">Breckenridge</Link>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="p-6 bg-card rounded-xl border border-accent/20">
                                    <h4 className="font-bold mb-4">Table of Contents</h4>
                                    <nav className="space-y-2 text-sm">
                                        <a href="#intro" className="block text-muted-foreground hover:text-accent">Welcome to Colorado</a>
                                        <a href="#why-colorado" className="block text-muted-foreground hover:text-accent">Why Choose Colorado?</a>
                                        <a href="#laws" className="block text-muted-foreground hover:text-accent">Cannabis Laws 2025</a>
                                        <a href="#cities" className="block text-muted-foreground hover:text-accent">Essential Cities</a>
                                        <a href="#where-to-consume" className="block text-muted-foreground hover:text-accent">Where to Smoke Legally</a>
                                        <a href="#altitude" className="block text-muted-foreground hover:text-accent">The Altitude Effect</a>
                                        <a href="#activities" className="block text-muted-foreground hover:text-accent">High Bucket List</a>
                                        <a href="#itineraries" className="block text-muted-foreground hover:text-accent">Sample Itineraries</a>
                                    </nav>
                                </div>

                                <Card className="p-6 border-accent/20 bg-accent/5">
                                    <Info className="h-6 w-6 text-accent mb-4" />
                                    <h4 className="font-bold mb-2">Need a 420-friendly stay?</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Check out our guide to Denver's best cannabis-rated properties.</p>
                                    <Link to="/blog/best-420-rentals-denver" className="text-accent text-sm font-bold flex items-center gap-1">View Rentals <ChevronRight className="h-4 w-4" /></Link>
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

export default BlogUltimateColoradoGuide;
