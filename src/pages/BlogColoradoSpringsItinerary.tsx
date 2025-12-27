import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    ExternalLink,
    Info,
    CheckCircle2,
    AlertTriangle,
    Star,
    Calendar,
    Clock,
    User,
    Mountain,
    Compass,
    ArrowRight,
    ShieldCheck,
    Zap,
    Utensils,
    Locate,
    Camera,
    Tent,
    ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@/assets/blog-colorado-springs-hero.jpg";

const BlogColoradoSpringsItinerary = () => {
    // Fetch Colorado Springs & Manitou Springs hotels from database
    const { data: dbHotels, isLoading: hotelsLoading } = useQuery({
        queryKey: ['colorado-springs-hotels'],
        queryFn: async () => {
            // First get Colorado Springs and Manitou Springs city IDs
            const { data: cities, error: citiesError } = await supabase
                .from('cities')
                .select('id, name')
                .or('name.ilike.%colorado springs%,name.ilike.%manitou%');

            if (citiesError) {
                console.error('Error fetching cities:', citiesError);
                throw citiesError;
            }

            console.log('Found cities:', cities);

            if (!cities || cities.length === 0) {
                console.log('No matching cities found, fetching all 420-friendly hotels');
                // Fallback: get all 420-friendly hotels
                const { data: allHotels, error: allError } = await supabase
                    .from('hotels')
                    .select('*')
                    .eq('is_420_friendly', true)
                    .order('rating', { ascending: false })
                    .limit(3);
                
                if (allError) throw allError;
                return allHotels || [];
            }

            const cityIds = cities.map(c => c.id);
            console.log('City IDs:', cityIds);

            // Fetch hotels for these cities
            const { data: hotels, error: hotelsError } = await supabase
                .from('hotels')
                .select('*')
                .in('city_id', cityIds)
                .order('rating', { ascending: false })
                .limit(3);

            if (hotelsError) {
                console.error('Error fetching hotels:', hotelsError);
                throw hotelsError;
            }

            console.log('Fetched hotels:', hotels?.length);
            return hotels || [];
        },
    });

    // Fetch Colorado Springs & Manitou Springs dispensaries from database
    const { data: dbDispensaries, isLoading: dispensariesLoading } = useQuery({
        queryKey: ['colorado-springs-dispensaries'],
        queryFn: async () => {
            const { data: dispensaries, error } = await supabase
                .from('dispensaries')
                .select('*')
                .or('city.ilike.%colorado springs%,city.ilike.%manitou%')
                .order('rating', { ascending: false })
                .limit(5);

            if (error) {
                console.error('Error fetching dispensaries:', error);
                throw error;
            }

            console.log('Fetched dispensaries:', dispensaries?.length);
            return dispensaries || [];
        },
    });

    // Transform database hotels to local format
    const localStays = dbHotels?.map(hotel => ({
        name: hotel.name,
        rating: hotel.rating || 4.5,
        city: "Colorado Springs",
        description: hotel.policies || "Cannabis-friendly accommodation in the Pikes Peak region.",
        bestFor: hotel.is_420_friendly ? "Cannabis travelers" : "All travelers",
        image: hotel.images?.[0] || "/rentals/default.jpg",
        verified: hotel.is_verified || false,
        slug: hotel.slug
    })) || [];

    // Transform database dispensaries to local format
    const localDispensaries = dbDispensaries?.map(disp => ({
        name: disp.name,
        address: disp.address,
        rating: disp.rating || 4.5,
        notes: disp.description || "Quality cannabis dispensary.",
        slug: disp.slug
    })) || [];

    const rules = [
        { rule: "Legal Status", details: "Recreational legal (21+ with ID)" },
        { rule: "Consumption", details: "Private property only (No public use)" },
        { rule: "Public Penalties", details: "$100 - $999 fines" },
        { rule: "Best Strategy", details: "Base in Manitou Springs, consume at rental" },
    ];

    const rankedActivities = [
        { activity: "Garden of the Gods Sunrise", vibe: "Awe-inspiring", pair: "5mg Sativa Edible" },
        { activity: "Manitou Springs Wandering", vibe: "Quirky & Artsy", pair: "Hybrid Pre-roll" },
        { activity: "Stargazing at Rental", vibe: "Peaceful", pair: "Indica Flower" },
        { activity: "Pikes Peak Views", vibe: "Majestic", pair: "Sober (Altitude is enough)" },
    ];

    const faqs = [
        { q: "Is Colorado Springs 420-friendly?", a: "The city is conservative, but recreational cannabis is legal. Manitou Springs is the designated 420-friendly hub for travelers in the region." },
        { q: "Where can you smoke weed in Colorado Springs?", a: "Only on private property. Most travelers book BudQuest Verified rentals that allow smoking on patios or balconies." },
        { q: "Can you consume at Garden of the Gods?", a: "No. It is a city park. Use edibles before arriving if you want an elevated experience." },
        { q: "Does altitude affect cannabis?", a: "Yes. At 14,115 ft (Pikes Peak), oxygen is low and cannabis effects are magnified. Go very light." },
    ];

    return (
        <>
            <Helmet>
                <title>How to Spend a 420-Friendly Weekend in Colorado Springs (2025)</title>
                <meta name="description" content="Plan the perfect cannabis weekend in Colorado Springs. 3-day itinerary covering Manitou Springs, Garden of the Gods, and Pikes Peak. BudQuest Verified." />
                <link rel="canonical" href="https://budquest.guide/blog/420-friendly-weekend-colorado-springs" />
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-20">
                {/* Hero Section */}
                <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroImage}
                            alt="Colorado Springs landscape with Garden of the Gods and Pikes Peak at sunset"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-4 py-1 uppercase tracking-widest">
                                <Star className="h-3 w-3 mr-2 fill-current" /> 2025 Trip Planning
                            </Badge>
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
                                420-Friendly Weekend in <span className="text-primary">Colorado Springs</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-light">
                                Pikes Peak, Garden of the Gods, and local bud. A curated 3-day guide to the Springs' cannabis scene.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar / TOC */}
                        <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start">
                            <nav className="space-y-4 border-l border-white/10 pl-6">
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Itinerary</h4>
                                {[
                                    { id: "intro", label: "The Strategy" },
                                    { id: "rules", label: "Know the Rules" },
                                    { id: "stays", label: "Where to Stay" },
                                    { id: "dispensaries", label: "Where to Stock Up" },
                                    { id: "friday", label: "Friday: Arrival" },
                                    { id: "saturday", label: "Saturday: The Peak" },
                                    { id: "sunday", label: "Sunday: Chill" },
                                    { id: "faqs", label: "FAQ" },
                                ].map((item) => (
                                    <a key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-primary transition-all py-1">
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </aside>

                        <div className="lg:col-span-9 max-w-4xl">
                            {/* Intro Section */}
                            <div id="intro" className="mb-16">
                                <Card className="bg-primary/5 border-primary/20 p-8 relative overflow-hidden">
                                    <Locate className="absolute -top-6 -right-6 h-32 w-32 text-primary/5" />
                                    <h2 className="text-3xl font-bold mb-6 text-primary">The Strategy: Manitou is Key</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Colorado Springs has Pikes Peak and 40+ dispensaries—but it’s a conservative military town with medical-only sales in many spots. The trick? **Base yourself in Manitou Springs.** It’s the artsy, 420-friendly enclave next door where recreational bud flows freely and the vibe is pure vacation.
                                    </p>
                                </Card>
                            </div>

                            {/* Rules Table */}
                            <div id="rules" className="mb-16">
                                <h2 className="text-3xl font-bold mb-8 text-primary">Before You Go: Know the Rules</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {rules.map((r, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-white/5">
                                            <span className="text-sm font-bold text-primary uppercase">{r.rule}</span>
                                            <span className="text-muted-foreground text-sm">{r.details}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DATABASE SECTION: WHERE TO STAY */}
                            <div id="stays" className="mb-20">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-primary">Where to Stay</h2>
                                    <Link to="/hotels" className="text-white flex items-center gap-1 text-xs font-bold hover:text-primary uppercase tracking-widest transition-colors">
                                        View All Stays <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="space-y-6">
                                    {hotelsLoading ? (
                                        // Loading skeletons
                                        Array.from({ length: 3 }).map((_, idx) => (
                                            <Card key={idx} className="bg-card border-white/5 overflow-hidden">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-1/3 aspect-video md:aspect-auto bg-muted" />
                                                    <div className="p-8 md:w-2/3 space-y-4">
                                                        <Skeleton className="h-6 w-3/4" />
                                                        <Skeleton className="h-4 w-1/4" />
                                                        <Skeleton className="h-4 w-full" />
                                                        <Skeleton className="h-4 w-full" />
                                                        <Skeleton className="h-10 w-24" />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : localStays.length > 0 ? (
                                        localStays.map((stay, idx) => (
                                            <Card key={idx} className="bg-card border-white/5 overflow-hidden group hover:border-primary/40 transition-all duration-300">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-1/3 aspect-video md:aspect-auto bg-muted relative">
                                                        {stay.image && (
                                                            <img
                                                                src={stay.image}
                                                                alt={stay.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                                        <div className="absolute top-4 left-4">
                                                            <Badge className="bg-primary text-black border-0 font-bold px-3 py-1 flex items-center gap-1">
                                                                <ShieldCheck className="h-3 w-3" /> BudQuest Verified
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="p-8 md:w-2/3">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h3 className="text-2xl font-bold text-white">{stay.name}</h3>
                                                                <p className="text-primary text-xs font-bold uppercase tracking-tighter">{stay.city}</p>
                                                            </div>
                                                            <div className="flex items-center text-yellow-500 font-bold">
                                                                <Star className="h-4 w-4 fill-current mr-1" /> {stay.rating.toFixed(1)}
                                                            </div>
                                                        </div>
                                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{stay.description}</p>
                                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Best For: {stay.bestFor}</span>
                                                            {stay.slug ? (
                                                                <Link to={`/hotels/${stay.slug}`}>
                                                                    <Button variant="outline" size="sm" className="bg-primary text-black border-0 hover:bg-white transition-colors font-bold">
                                                                        View Details <ArrowRight className="h-3 w-3 ml-2" />
                                                                    </Button>
                                                                </Link>
                                                            ) : (
                                                                <Button variant="outline" size="sm" className="bg-primary text-black border-0 hover:bg-white transition-colors font-bold" disabled>
                                                                    View Details <ArrowRight className="h-3 w-3 ml-2" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <Card className="p-8 bg-card/50 border-white/5 text-center">
                                            <p className="text-muted-foreground mb-2">No verified stays found for Colorado Springs or Manitou Springs area.</p>
                                            <p className="text-sm text-muted-foreground/60 mb-6">We're constantly adding new properties. Check our full catalog for nearby options.</p>
                                            <Link to="/hotels?country=United States&state=Colorado">
                                                <Button className="mt-4 bg-primary text-black hover:bg-primary/90">
                                                    Browse Colorado Hotels
                                                </Button>
                                            </Link>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            {/* DATABASE SECTION: DISPENSARIES */}
                            <div id="dispensaries" className="mb-20">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                                        <ShoppingBag /> Where to Stock Up
                                    </h2>
                                    <Link to="/dispensary" className="text-white flex items-center gap-1 text-xs font-bold hover:text-primary uppercase tracking-widest transition-colors">
                                        View All Dispensaries <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="overflow-x-auto rounded-3xl border border-white/5 bg-card">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="p-6 text-xs font-bold uppercase text-primary">Dispensary</th>
                                                <th className="p-6 text-xs font-bold uppercase text-primary">Rating</th>
                                                <th className="p-6 text-xs font-bold uppercase text-primary text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dispensariesLoading ? (
                                                Array.from({ length: 3 }).map((_, idx) => (
                                                    <tr key={idx} className="border-b border-white/5">
                                                        <td className="p-6">
                                                            <Skeleton className="h-5 w-48 mb-2" />
                                                            <Skeleton className="h-3 w-32" />
                                                        </td>
                                                        <td className="p-6"><Skeleton className="h-5 w-12" /></td>
                                                        <td className="p-6 text-right"><Skeleton className="h-8 w-24 ml-auto" /></td>
                                                    </tr>
                                                ))
                                            ) : localDispensaries.length > 0 ? (
                                                localDispensaries.map((shop, i) => (
                                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                        <td className="p-6">
                                                            <div className="font-bold text-white text-lg">{shop.name}</div>
                                                            <div className="text-xs text-muted-foreground mt-1">{shop.address}</div>
                                                            <div className="text-xs text-primary italic mt-2 line-clamp-1">{shop.notes}</div>
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                                                <Star className="h-4 w-4 fill-current" /> {shop.rating?.toFixed(1) || '4.5'}
                                                            </div>
                                                        </td>
                                                        <td className="p-6 text-right">
                                                            {shop.slug ? (
                                                                <Link to={`/dispensary/${shop.slug}`}>
                                                                    <Button variant="ghost" className="text-white group-hover:text-primary transition-colors">
                                                                        View Details <ArrowRight className="h-4 w-4 ml-2" />
                                                                    </Button>
                                                                </Link>
                                                            ) : (
                                                                <Button variant="ghost" className="text-muted-foreground" disabled>
                                                                    View Details <ArrowRight className="h-4 w-4 ml-2" />
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="p-8 text-center text-muted-foreground">
                                                        No dispensaries found for Colorado Springs area.
                                                        <Link to="/dispensary?state=Colorado" className="text-primary ml-2 hover:underline">
                                                            Browse all Colorado dispensaries
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Itinerary Sections */}
                            <div id="friday" className="mb-16">
                                <h2 className="text-4xl font-bold mb-8 text-primary">Friday: Settle In</h2>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        After checking into your stay, prioritize your dispensary run. Grab **pre-rolls** for convenience and **low-dose edibles** for Saturday's hike. Spend the evening wandering the Manitou Springs main drag—it's walkable, weird, and perfectly suited for a mellow high.
                                    </p>
                                </div>
                            </div>

                            <div id="saturday" className="mb-16">
                                <h2 className="text-4xl font-bold mb-8 text-primary">Saturday: The Grand Ascent</h2>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        Start early at **Garden of the Gods**. No smoking on-site, so time your edibles (5mg recommended) to peak as you hit the Central Garden trail. By 1:00 PM, head to the **Pikes Peak Cog Railway**. 
                                    </p>
                                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4">
                                        <AlertTriangle className="text-red-500 shrink-0 h-6 w-6" />
                                        <div>
                                            <h4 className="text-red-200 font-bold">Altitude Warning</h4>
                                            <p className="text-xs text-red-200/80">The summit is 14,115 ft. Oxygen is thin, and cannabis intensity multiplies. Stay sober for the drive up, or go extremely light if you're a passenger.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Section */}
                            <div className="mb-20">
                                <h2 className="text-3xl font-bold mb-8 text-primary text-center">Weekend Budget</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <Card className="bg-card border-white/5 p-8 text-center">
                                        <p className="text-xs font-bold text-primary uppercase mb-2">Lodging</p>
                                        <p className="text-3xl font-bold text-white">$300+</p>
                                    </Card>
                                    <Card className="bg-card border-white/5 p-8 text-center">
                                        <p className="text-xs font-bold text-primary uppercase mb-2">Cannabis</p>
                                        <p className="text-3xl font-bold text-white">$100+</p>
                                    </Card>
                                    <Card className="bg-card border-white/5 p-8 text-center">
                                        <p className="text-xs font-bold text-primary uppercase mb-2">Food</p>
                                        <p className="text-3xl font-bold text-white">$150+</p>
                                    </Card>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="py-20 border-t border-white/10 text-center">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Plan Your <span className="text-primary">Springs</span> Escape</h2>
                                <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto font-light">
                                    Browse BudQuest Verified rentals and dispensaries in the shadow of Pikes Peak.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Link to="/hotels">
                                        <Button size="lg" className="bg-primary text-black font-bold h-14 px-12 rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                                            Find 420 Stays
                                        </Button>
                                    </Link>
                                    <Link to="/destinations/colorado">
                                        <Button size="lg" variant="outline" className="border-white/20 text-white h-14 px-12 rounded-full hover:bg-white/5 transition-all">
                                            Explore Colorado
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="bg-card/30 py-24 border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-4xl font-bold mb-16 text-center text-primary tracking-tighter">The Springs FAQ</h2>
                        <div className="grid gap-6">
                            {faqs.map((faq, i) => (
                                <Card key={i} className="p-8 bg-background/50 border-white/5 group hover:border-primary/30 transition-all">
                                    <h3 className="text-xl font-bold mb-3 flex items-start gap-4 text-white">
                                        <span className="text-primary font-serif italic text-2xl">Q.</span> {faq.q}
                                    </h3>
                                    <p className="text-muted-foreground pl-10 leading-relaxed font-light">{faq.a}</p>
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

export default BlogColoradoSpringsItinerary;
