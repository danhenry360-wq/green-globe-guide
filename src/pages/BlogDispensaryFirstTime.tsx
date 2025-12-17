import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    Clock, Calendar, User, ChevronRight, CheckCircle2,
    AlertTriangle, Banknote, ShoppingBag, MessageCircle, MapPin
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BlogDispensaryFirstTime = () => {
    const checklistItems = [
        {
            item: "Government ID",
            required: true,
            note: "Driver's license, passport, state ID (Must be 21+)",
            icon: <User className="h-5 w-5 text-accent" />
        },
        {
            item: "Cash",
            required: true,
            note: "Most dispensaries are cash-only. ATMs usually available.",
            icon: <Banknote className="h-5 w-5 text-accent" />
        },
        {
            item: "Debit Card",
            required: false,
            note: "Some accept debit with a $3-5 fee. Credit cards rarely accepted.",
            icon: <Banknote className="h-5 w-5 text-muted-foreground" />
        }
    ];

    const steps = [
        {
            title: "Check In",
            description: "Show your ID to the security guard or receptionist upon entry. They scan it to verify age.",
            icon: <User className="h-6 w-6 text-accent" />
        },
        {
            title: "Wait",
            description: "You may wait in a lobby until a budtender is available. Use this time to browse the menu.",
            icon: <Clock className="h-6 w-6 text-accent" />
        },
        {
            title: "Browse",
            description: "Enter the sales floor. Products are in cases. You can't touch them without staff help.",
            icon: <ShoppingBag className="h-6 w-6 text-accent" />
        },
        {
            title: "Consult",
            description: "Tell the budtender what you're looking for (sleep, energy, pain relief). Ask questions!",
            icon: <MessageCircle className="h-6 w-6 text-accent" />
        },
        {
            title: "Purchase",
            description: "Pay with cash. Your items will be placed in a sealed, child-resistant exit bag.",
            icon: <CheckCircle2 className="h-6 w-6 text-accent" />
        }
    ];

    const productTypes = [
        {
            type: "Flower (Bud)",
            bestFor: "Classic experience, immediate effects",
            duration: "1-3 hours",
            recommendation: "Buy a Pre-roll (1g joint) to start simple."
        },
        {
            type: "Edibles",
            bestFor: "No smoking, longer lasting effects",
            duration: "4-8 hours",
            recommendation: "Start with 5mg-10mg gummies. Wait 2 hours."
        },
        {
            type: "Vapes",
            bestFor: "Discreet, easy dosing, less smell",
            duration: "1-3 hours",
            recommendation: "Disposable vape pens are great for beginners."
        }
    ];

    const mistakes = [
        {
            mistake: "Forgetting Cash",
            fix: "Bring $50-100 cash to avoid high ATM fees."
        },
        {
            mistake: "Too Many Edibles",
            fix: "Start low (5mg). Edibles take up to 2 hours to kick in. Don't double dose!"
        },
        {
            mistake: "Public Consumption",
            fix: "Only consume on private property. Hotels/cars are illegal."
        },
        {
            mistake: "Flying Home",
            fix: "TSA is federal. Do not fly with cannabis, even to legal states."
        }
    ];

    return (
        <>
            <Helmet>
                <title>First Time at a Colorado Dispensary: What to Expect (2025 Guide)</title>
                <meta name="description" content="Complete guide for your first Colorado dispensary visit. Learn what to bring, what to say, purchase limits, and how to buy weed legally in 2025." />
                <meta name="keywords" content="first time at a dispensary colorado, what to expect at a dispensary, how to buy weed in colorado, dispensary tips for beginners" />
                <link rel="canonical" href="https://budquest.guide/blog/first-time-dispensary-guide-colorado-2025" />
                <meta property="og:title" content="First Time at a Colorado Dispensary? Read This Guide." />
                <meta property="og:description" content="Step-by-step walkthrough of your first legal cannabis purchase." />
                <meta property="og:image" content="/blog-first-time-dispensary.jpg" />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What do I need to buy weed in Colorado?",
                                "acceptedAnswer": { "@type": "Answer", "text": "You need a valid government-issued ID (driver's license, passport) proving you are 21 or older. Bring cash, as most dispensaries are cash-only." }
                            },
                            {
                                "@type": "Question",
                                "name": "Do Colorado dispensaries take credit cards?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Most do NOT accept credit cards due to federal banking laws. Some accept debit cards with a fee, but cash is best." }
                            },
                            {
                                "@type": "Question",
                                "name": "What should I say to a budtender?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Be honest! Tell them it's your first time, what feeling you want (relaxing vs energetic), and ask for low-dose recommendations." }
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
                        src="/blog-first-time-dispensary.jpg"
                        alt="First time purchasing cannabis at a dispensary"
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
                            <span className="text-accent">First Time Guide</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">Beginner Guide</span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> December 17, 2025
                                </span>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> 8 min read
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    First Time at a Colorado Dispensary:
                                </span>
                                <br />
                                <span className="text-foreground/90">What to Expect (2025 Guide)</span>
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6">
                                Feeling nervous? Don't be. Here is exactly what happens, step-by-step, from checking in to walking out with your first legal purchase.
                            </p>

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
                                <p className="text-muted-foreground">
                                    Your first visit is simple: Bring a valid ID (21+), bring cash (cards rarely accepted), check in at the front desk, wait to be called, tell the budtender what experience you want, and pay at checkout. The whole process takes 10-20 minutes.
                                </p>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">What to Bring (And What to Leave)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {checklistItems.map((item, index) => (
                                    <Card key={index} className="p-6 border-accent/20 bg-card/60">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-accent/10 rounded-full">
                                                {item.icon}
                                            </div>
                                            {item.required && (
                                                <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded">REQUIRED</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{item.item}</h3>
                                        <p className="text-sm text-muted-foreground">{item.note}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step by Step */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Step-by-Step: What Happens Inside</h2>
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="p-6 border-accent/20 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                            <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent text-xl">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-muted-foreground">{step.description}</p>
                                            </div>
                                            <div className="hidden md:block text-muted-foreground/20">
                                                {step.icon}
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What to Say */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What to Say to the Budtender</h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                You don't need to sound like an expert. Budtenders appreciate honesty. They would rather help a beginner find the right product than have someone pretend to know and have a bad experience.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="p-6 border-green-500/20 bg-green-500/5">
                                    <h3 className="font-bold text-green-500 mb-4 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5" /> Good Things to Say
                                    </h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li>"It's my first time. Can you recommend something for beginners?"</li>
                                        <li>"I want to feel relaxed/sleepy/creative."</li>
                                        <li>"I don't want to smoke. What edibles are good?"</li>
                                        <li>"What is a low dose generally?"</li>
                                    </ul>
                                </Card>
                                <Card className="p-6 border-red-500/20 bg-red-500/5">
                                    <h3 className="font-bold text-red-500 mb-4 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5" /> Avoid Saying
                                    </h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li>"Can you hook me up with extra?" (Illegal)</li>
                                        <li>"Can I consume this in the parking lot?" (Illegal)</li>
                                        <li>Asking to buy more than the legal limit (1 oz).</li>
                                        <li>Haggling on price (Prices are set).</li>
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Product Types */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">What Should You Buy?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {productTypes.map((prod, index) => (
                                    <Card key={index} className="p-6 border-accent/20 h-full flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-accent">{prod.type}</h3>
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Best For</p>
                                                <p className="text-sm">{prod.bestFor}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Duration</p>
                                                <p className="text-sm">{prod.duration}</p>
                                            </div>
                                            <div className="pt-4 border-t border-accent/10">
                                                <p className="text-xs text-muted-foreground uppercase font-semibold text-accent">Our Pick</p>
                                                <p className="text-sm font-medium">{prod.recommendation}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Mistakes */}
                <section className="py-12 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">First-Time Mistakes to Avoid</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {mistakes.map((m, i) => (
                                    <Card key={i} className="p-4 border-accent/20">
                                        <h3 className="font-bold text-foreground mb-1">{m.mistake}</h3>
                                        <p className="text-sm text-muted-foreground">{m.fix}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 border-t border-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <Card className="bg-gradient-to-r from-accent/20 to-gold/10 border-accent/30 p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Visit?</h3>
                                    <p className="text-muted-foreground mb-0">
                                        Explore our curated guide to the best dispensaries in Colorado.
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-col sm:flex-row">
                                    <Link
                                        to="/dispensary"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        <MapPin className="h-4 w-4" /> Find Dispensaries
                                    </Link>
                                    <Link
                                        to="/usa/colorado"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 hover:bg-accent/10 text-foreground font-semibold rounded-lg transition-colors"
                                    >
                                        All Colorado Guides
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

export default BlogDispensaryFirstTime;
