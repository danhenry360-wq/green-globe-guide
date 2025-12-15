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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    MapPin, Star,
    Car, Cannabis,
    Bed, Store, ChevronRight,
    Building2,
    Sun, Leaf, Flower2, Snowflake,
    Mountain, Tent,
    Mail, Compass,
    TrainFront, MapPinned, CheckCircle, Ban, Clock, ArrowRight
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

const TrinidadGuide = () => {
    const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Trinidad dispensaries
            const { data: dispData } = await supabase
                .from('dispensaries')
                .select('*')
                .eq('state', 'Colorado')
                .ilike('city', '%Trinidad%')
                .order('rating', { ascending: false })
                .limit(6);

            if (dispData) setDispensaries(dispData);

            // Fetch hotels/rentals in Trinidad
            const { data: rentalData } = await supabase
                .from('hotels')
                .select('*')
                .eq('is_420_friendly', true)
                .ilike('address', '%Trinidad%')
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
                .insert({ email, source_page: 'trinidad-guide' });

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
        "name": "Trinidad Cannabis Travel Guide 2025",
        "description": "The ultimate guide to Trinidad, Colorado - the 'Weed Capital' of the Southwest. Find dispensaries, state park camping, and 420-friendly history.",
        "url": "https://budquest.guide/trinidad",
        "publisher": {
            "@type": "Organization",
            "name": "BudQuest",
            "url": "https://budquest.guide"
        },
        "about": {
            "@type": "City",
            "name": "Trinidad",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Trinidad",
                "addressRegion": "CO",
                "addressCountry": "US"
            }
        },
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "en-US"
    };

    const seasons = [
        {
            id: "spring",
            name: "Spring",
            months: "March - May",
            icon: Flower2,
            temp: "50-70°F",
            highlights: [
                "Fishers Peak wildflowers",
                "Trinidad Lake fishing",
                "Milder hiking weather",
                "Cinco de Mayo celebrations"
            ],
            tip: "Spring winds can be strong. Bring layers."
        },
        {
            id: "summer",
            name: "Summer",
            months: "June - August",
            icon: Sun,
            temp: "75-90°F",
            highlights: [
                "ArtoCade Art Car Parade",
                "Santa Fe Trail Days",
                "Trincidco Blues Festival",
                "Camping at the State Park"
            ],
            tip: "It gets hot! Stay hydrated and use sun protection."
        },
        {
            id: "fall",
            name: "Fall",
            months: "September - November",
            icon: Leaf,
            temp: "50-75°F",
            highlights: [
                "Fall foliage on Hwy 12",
                "Cooler hiking temps",
                "Harvest festivals",
                "Quiet season for tourism"
            ],
            tip: "The Highway of Legends is spectacular in late September."
        },
        {
            id: "winter",
            name: "Winter",
            months: "December - February",
            icon: Snowflake,
            temp: "20-45°F",
            highlights: [
                "Victorian Holiday celebrations",
                "Lower hotel rates",
                "Nearby cross-country skiing",
                "Cozy dispensary visits"
            ],
            tip: "Trinidad gets less snow than the high country, but roads can still be icy."
        }
    ];

    const attractions = [
        {
            name: "Dispensary Row (Main St)",
            icon: Cannabis,
            description: "Trinidad is famous for its 'Weed Row' downtown, featuring a high density of recreational shops.",
            cannabisTip: "Competition is fierce here, so prices are among the lowest in the state. Shop around!",
            address: "Downtown Trinidad"
        },
        {
            name: "Trinidad Lake State Park",
            icon: Tent,
            description: "800-acre lake perfect for fishing, boating, and camping with views of Fishers Peak.",
            cannabisTip: "Great for camping, but remember: consumption is technically illegal in State Parks. Be discreet.",
            address: "32610 Hwy 12"
        },
        {
            name: "Fishers Peak State Park",
            icon: Mountain,
            description: "Colorado's newest state park (2nd largest!) offering rugged hiking and iconic views.",
            cannabisTip: "Pack water and edibles for a hike, but leave no trace. Strict fire bans often apply.",
            address: "South of Trinidad"
        },
        {
            name: "Art Car Museum / ArtoCade",
            icon: Car,
            description: "Quirky museum dedicated to the art car culture. Trinidad hosts the annual ArtoCade parade.",
            cannabisTip: "The visual creativity here is mind-blowing when elevated. A photographer's dream.",
            address: "131 N Commercial St"
        },
        {
            name: "Highway of Legends",
            icon: Compass,
            description: "Scenic Byway looping through the Spanish Peaks. Mythical and beautiful.",
            cannabisTip: "Passenger princess? Perfect. Driver? Stay sober. The twisty roads demand focus.",
            address: "Hwy 12"
        },
        {
            name: "Corazon de Trinidad",
            icon: Building2,
            description: "The historic district with Victorian architecture and brick streets.",
            cannabisTip: "Wander the brick streets at sunset after a visit to a local lounge (if available).",
            address: "Main & Commercial"
        }
    ];

    const transportOptions = [
        {
            name: "Car (Recommended)",
            icon: Car,
            description: "Trinidad is an I-25 hub. A car is best for exploring the Highway of Legends and State Parks.",
            tip: "Free parking is abundant downtown."
        },
        {
            name: "Amtrak Southwest Chief",
            icon: TrainFront,
            description: "Daily stops in Trinidad connecting to LA and Chicago.",
            tip: "A scenic way to arrive, but you'll want a rental car once here."
        },
        {
            name: "Walking",
            icon: MapPinned,
            description: "Downtown and the Creative District are very walkable.",
            tip: "Dispensary Row is easily navigated on foot."
        }
    ];

    const relatedGuides = [
        { name: "Pueblo", slug: "/pueblo", desc: "Riverwalk & History", distance: "1 hr 15 min" },
        { name: "Colorado Springs", slug: "/colorado-springs", desc: "Garden of the Gods", distance: "2 hrs" },
        { name: "Denver", slug: "/denver", desc: "Metro Hub", distance: "3 hrs" },
    ];


    return (
        <>
            <Helmet>
                <title>Trinidad, CO Cannabis Travel Guide 2025 | BudQuest</title>
                <meta name="description" content="Visit Trinidad, Colorado: The weed capital of the southwest. Guide to dispensaries, Trinidad Lake camping, and 420-friendly history." />
                <link rel="canonical" href="https://budquest.guide/trinidad" />
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
                        <li className="text-foreground font-medium">Trinidad</li>
                    </ol>
                </nav>

                {/* Hero */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/lovable-uploads/e28153b6-1748-4203-8854-3e9196b05423.png" // Fallback or placeholder, ideally replace with real Trinidad image
                            alt="Trinidad Colorado Landscape"
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
                                <Store className="w-4 h-4 mr-2" />
                                Dispensary Capital of the South
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Trinidad Cannabis Guide
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Explore the historic border town that became a cannabis boomtown. Victorian charm meets modern weed culture at the foot of Fishers Peak.
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
                                { icon: Cannabis, label: "Dispensary Density", value: "Very High" },
                                { icon: Store, label: "Price Level", value: "$ (Cheap)" },
                                { icon: Mountain, label: "Elevation", value: "6,010 ft" },
                                { icon: Car, label: "Access", value: "I-25 Hub" },
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

                {/* Best Time to Visit */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Best Time to Visit Trinidad
                                </span>
                            </h2>
                        </motion.div>

                        <Tabs defaultValue="summer" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 p-1">
                                {seasons.map((season) => (
                                    <TabsTrigger
                                        key={season.id}
                                        value={season.id}
                                        className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                                    >
                                        <season.icon className="w-4 h-4 mr-2 hidden sm:inline" />
                                        {season.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {seasons.map((season) => (
                                <TabsContent key={season.id} value={season.id}>
                                    <Card className="bg-card/50 border-border/30 p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="md:w-1/3">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-3 rounded-xl bg-accent/20">
                                                        <season.icon className="w-8 h-8 text-accent" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{season.months}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-lg font-medium text-foreground mb-4">
                                                    <Clock className="w-5 h-5 text-accent" />
                                                    {season.temp}
                                                </div>
                                            </div>
                                            <div className="md:w-2/3">
                                                <h4 className="font-semibold text-foreground mb-3">Season Highlights</h4>
                                                <ul className="space-y-2 mb-4">
                                                    {season.highlights.map((highlight, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                                                    <p className="text-sm text-foreground">
                                                        <strong className="text-accent">Local Tip:</strong> {season.tip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>

                {/* Attractions */}
                <section className="py-16 bg-card/30">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Things to Do in Trinidad
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

                {/* Legal Info */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    Trinidad Local Laws
                                </span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card className="p-6 bg-card/50 border-border/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-green-500/20">
                                        <Store className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">Purchase Limits</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Adults 21+ can purchase up to 1 ounce of flower, 8g of concentrate, or 800mg of edibles per day.
                                </p>
                            </Card>

                            <Card className="p-6 bg-card/50 border-border/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-amber-500/20">
                                        <Car className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">Crossing State Lines</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Trinidad is on the border. It is a FEDERAL FELONY to transport cannabis into New Mexico, even though it's legal there.
                                </p>
                            </Card>
                        </div>

                        {/* Where You CAN Consume */}
                        <Card className="p-6 bg-green-500/5 border-green-500/20 mb-6">
                            <h3 className="font-bold text-lg text-green-400 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Where You CAN Consume
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { place: "Private Residences", note: "With owner's permission" },
                                    { place: "420-Friendly Lounges", note: "Check local listings" },
                                    { place: "Private Property", note: "If out of public view" },
                                ].map((item) => (
                                    <div key={item.place} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-foreground font-medium">{item.place}</span>
                                            <span className="text-muted-foreground text-sm"> — {item.note}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Where You CANNOT Consume */}
                        <Card className="p-6 bg-red-500/5 border-red-500/20 mb-6">
                            <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
                                <Ban className="w-5 h-5" />
                                Where You CANNOT Consume
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { place: "State Parks", fine: "Federal/State Offense" },
                                    { place: "In Vehicles", fine: "DUI / Open Container" },
                                    { place: "Public Streets", fine: "Civil Citation" },
                                    { place: "BLM Land", fine: "Federal Offense" },
                                ].map((item) => (
                                    <div key={item.place} className="flex items-start gap-2">
                                        <Ban className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-foreground font-medium">{item.place}</span>
                                            <span className="text-red-400 text-sm font-medium"> — {item.fine}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Dispensaries */}
                <section id="dispensaries" className="py-16 bg-card/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Featured Dispensaries</h2>
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

                {/* Rentals Section */}
                <section id="rentals" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    420-Friendly Stays
                                </span>
                            </h2>
                            <Link to="/hotels" className="text-accent hover:underline flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                            </div>
                        ) : rentals.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {rentals.map((rental) => (
                                    <Link key={rental.id} to={`/hotels/${rental.slug}`}>
                                        <Card className="overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1 bg-card/50">
                                            <div className="aspect-video relative">
                                                <img
                                                    src={rental.images?.[0] || "/placeholder.png"}
                                                    alt={rental.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">
                                                    420 Friendly
                                                </Badge>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground mb-1">{rental.name}</h3>
                                                {rental.address && (
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate">{rental.address}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1">
                                                    {renderRating(rental.rating || 4)}
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-8 text-center bg-card/50">
                                <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-muted-foreground">No specific 420-friendly rentals found in Trinidad yet.</p>
                            </Card>
                        )}
                    </div>
                </section>

                {/* Email */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-gold/10" />
                    <div className="container mx-auto px-4 max-w-2xl relative z-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">Get the Trinidad Guide</h2>
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

                {/* Related Guides */}
                <section className="py-16 bg-card/30">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                                    More Colorado Destinations
                                </span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {relatedGuides.map((guide, index) => (
                                <motion.div
                                    key={guide.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={guide.slug}>
                                        <Card className="p-6 bg-card/50 border-border/30 hover:border-accent/50 transition-all hover:-translate-y-1 text-center h-full">
                                            <Compass className="w-8 h-8 text-accent mx-auto mb-3" />
                                            <h3 className="font-bold text-foreground mb-1">{guide.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">{guide.desc}</p>
                                            <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                                                {guide.distance} from Trinidad
                                            </Badge>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default TrinidadGuide;
