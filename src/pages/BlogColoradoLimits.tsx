import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Scale, Calculator, AlertTriangle, Shield, CheckCircle2,
    ChevronRight, Calendar, Clock, User, ArrowRight, MapPin,
    HelpCircle, Car, AlertOctagon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogColoradoLimits = () => {
    const limits = [
        {
            type: "Flower (Bud)",
            amount: "1 Ounce",
            metric: "28 Grams",
            icon: <Scale className="h-8 w-8 text-accent" />,
            description: "Applies to loose flower, pre-rolls, and shake. This is the standard daily limit for recreational customers."
        },
        {
            type: "Concentrates",
            amount: "8 Grams",
            metric: "Wax, Shatter, Live Resin",
            icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
            description: "Includes all vape carts, dabs, and extracts. 8 grams is roughly equivalent to 8 standard vape cartridges."
        },
        {
            type: "Edibles",
            amount: "800 mg THC",
            metric: "Total THC Content",
            icon: <Calculator className="h-8 w-8 text-accent" />,
            description: "Based on total THC. With standard 100mg packages, this equals 8 full packages of edibles per day."
        }
    ];

    const equivalencyCalculations = [
        {
            combo: "The 'Sampler' Mix",
            description: "Safe combination that fits within limits:",
            items: ["1/2 oz Flower (50%)", "4g Concentrates (50%)", "0mg Edibles (0%)"],
            valid: true
        },
        {
            combo: "The Edible Lover",
            description: "Maximizing edibles with some flower:",
            items: ["7g Flower (25%)", "400mg Edibles (50%)", "2g Vapes (25%)"],
            valid: true
        },
        {
            combo: "The Heavy Hitter",
            description: "INVALID - Exceeds daily limits:",
            items: ["1 oz Flower (100%)", "Plus 1g Vape Cart (+12.5%)", "Total: 112.5% (Illegal)"],
            valid: false
        }
    ];

    const rules = [
        {
            title: "Purchase vs Possession",
            content: "You can buy 1 oz per day, but you can legally POSSESS up to 2 oz at any time. This means you can visit a dispensary two days in a row and legally carry both purchases.",
            icon: <Shield className="h-5 w-5 text-accent" />
        },
        {
            title: "Medical Differences",
            content: "Medical card holders (CO residents only) can purchase up to 2 oz of flower per day. There is NO reciprocity for out-of-state medical cards.",
            icon: <Badge className="h-5 w-5 text-accent" />
        },
        {
            title: "Multiple Dispensaries",
            content: "You can visit multiple shops in one day. However, daily limits still apply to your total aggregate purchases. There is no statewide tracking system for rec sales.",
            icon: <MapPin className="h-5 w-5 text-accent" />
        },
        {
            title: "Federal Land Warning",
            content: "Possession is strictly illegal on federal land, including National Parks (Rocky Mountain NP), National Forests, and most ski slopes.",
            icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
        }
    ];

    function Badge({ className }: { className?: string }) {
        return <CheckCircle2 className={className} />;
    }

    return (
        <>
            <Helmet>
                <title>How Much Weed Can You Buy in Colorado? (2025 Limits) | BudQuest</title>
                <meta name="description" content="Official 2025 guide to Colorado cannabis purchase limits. 1 oz flower, 8g concentrates, or 800mg edibles. Learn about equivalency and possession rules." />
                <meta name="keywords" content="Colorado weed limits, purchase limits, how much pot can I buy, Colorado dispensary rules 2025" />
                <link rel="canonical" href="https://budquest.com/blog/how-much-weed-can-you-buy-colorado-2025" />
                <meta property="og:title" content="How Much Weed Can You Buy in Colorado? (2025 Guide)" />
                <meta property="og:description" content="Complete breakdown of recreational purchase limits for tourists." />
                <meta property="og:image" content="/blog-colorado-limits.png" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How much weed can you buy in Colorado?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Recreational customers 21+ can purchase up to 1 ounce of flower, 8 grams of concentrates, or 800mg of THC in edibles per day." }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I visit multiple dispensaries in one day?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Yes, but your total daily purchases across all stores must legally stay within the 1 ounce limit." }
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
                        src="/blog-colorado-limits.png"
                        alt="Colorado Cannabis Purchase Limits Guide 2025"
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
                            <span className="text-accent">Purchase Limits</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Legal Guide</span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> December 16, 2025
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> 10 min read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    How Much Weed Can You Buy
                                </span>
                                <br />
                                <span className="text-foreground/90">in Colorado? (2025 Guide)</span>
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6">
                                Everything tourists needs to know about purchasing limits, equivalency math, and possession rules for a stress-free trip.
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                    <User className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">BudQuest</p>
                                    <p className="text-xs text-muted-foreground">Legal Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl prose prose-invert">
                            <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                                Colorado was the first state to legalize recreational cannabis, setting the standard for the rest of the world. However, the purchase limits can still be confusing for first-time visitors.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                The most important rule to remember is the <b>"Rule of One Ounce"</b>. As a recreational customer (adult 21+), you are limited to purchasing up to 1 ounce of cannabis flower per day. But what about edibles and concentrates? Colorado uses an <b>equivalency system</b> to mix and match products.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 my-6 rounded-r-lg">
                                <p className="font-bold text-accent mb-1">New for 2025</p>
                                <p className="text-sm text-muted-foreground m-0">
                                    A legislative bill proposed in early 2025 to double these limits was NOT passed. The daily limit remains at 1 oz per person for recreational sales.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Limits Cards (Quick Answer) */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Daily Purchase Limits (Rec 21+)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {limits.map((limit, index) => (
                                    <motion.div
                                        key={limit.type}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="bg-card/60 border-accent/20 p-6 h-full hover:border-accent/40 transition-colors">
                                            <div className="mb-4 p-3 bg-accent/10 rounded-full w-fit">
                                                {limit.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{limit.amount}</h3>
                                            <p className="text-accent font-medium mb-3">{limit.type}</p>
                                            <p className="text-sm text-muted-foreground mb-4">{limit.description}</p>
                                            <div className="text-xs font-mono bg-background/50 p-2 rounded text-center">
                                                Limit: {limit.metric}
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equivalency System */}
                <section className="py-12 border-t border-accent/10 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">How "Mix & Match" Works</h2>
                            <p className="text-muted-foreground mb-8">
                                You don't have to choose just ONE category. You can mix flower, edibles, and concentrates as long as the total doesn't exceed the 1 oz equivalent.
                                <br /><br />
                                <b>The Math:</b> 1 oz Flower = 8g Concentrate = 800mg Edibles.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {equivalencyCalculations.map((calc, index) => (
                                    <Card key={index} className={`p-6 ${calc.valid ? 'bg-card/60 border-accent/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                        <h3 className="text-lg font-bold text-foreground mb-3">{calc.combo}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                                        <ul className="space-y-2 mb-4">
                                            {calc.items.map((item, i) => (
                                                <li key={i} className="text-sm flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${calc.valid ? 'bg-accent' : 'bg-red-500'}`} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className={`text-center py-2 rounded text-sm font-bold ${calc.valid ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                            {calc.valid ? "✅ LEGAL PURCHASE" : "❌ OVER LIMIT"}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Important Rules Grid */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Essential Rules & Penalties</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {rules.map((rule, index) => (
                                    <Card key={index} className="bg-card/60 border-accent/20 p-6">
                                        <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                                            {rule.icon} {rule.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ CTA */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8">
                                <h3 className="text-xl font-bold text-foreground mb-4">Ready to Visit a Dispensary?</h3>
                                <p className="text-muted-foreground mb-6">
                                    Now that you know the limits, explore our curated guide to the best dispensaries in Colorado.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        to="/dispensary"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        Find Dispensaries Near Me
                                    </Link>
                                    <Link
                                        to="/usa/colorado"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        Colorado Cannabis Guide
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

export default BlogColoradoLimits;
