import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
    MapPin, Star, Home, Coffee, Wind, Bed, CheckCircle2, AlertTriangle,
    Zap, Ban, Award, Gem, Mountain, Beer, Tent, Building2, Leaf
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Hotel {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    rating: number | null;
    images: string[] | null;
    website: string | null;
    policies: string | null;
    amenities: any;
    is_420_friendly: boolean | null;
    is_verified: boolean | null;
}

const BlogFortCollinsStays = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            const { data, error } = await supabase
                .from("hotels")
                .select("*")
                .eq("is_420_friendly", true)
                .ilike("address", "%Fort Collins%")
                .order("rating", { ascending: false });

            if (error) {
                console.error("Error fetching Fort Collins hotels:", error);
            } else {
                setHotels(data || []);
            }
            setIsLoading(false);
        };

        fetchHotels();
    }, []);

    return (
        <>
            <Helmet>
                <title>Best 420-Friendly Stays in Fort Collins (2025): Craft Beer & Cannabis Capital | BudQuest</title>
                <meta name="description" content="Fort Collins 420-friendly hotels, hostels, and vacation rentals. Find cannabis-welcoming lodging in Colorado's craft beer capital with outdoor consumption spaces." />
                <meta name="keywords" content="420 friendly hotels fort collins, 420 friendly rentals fort collins, cannabis friendly lodging fort collins, weed friendly airbnb fort collins" />
                <link rel="canonical" href="https://budquest.guide/blog/best-420-friendly-stays-fort-collins" />

                {/* Open Graph */}
                <meta property="og:title" content="Best 420-Friendly Stays in Fort Collins (2025)" />
                <meta property="og:description" content="Discover the best cannabis-friendly hotels, hostels, and vacation rentals in Fort Collins, Colorado's craft beer capital." />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://budquest.guide/blog/best-420-friendly-stays-fort-collins" />

                {/* Schema.org */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "Best 420-Friendly Stays in Fort Collins (2025): Craft Beer & Cannabis Capital",
                        "description": "Comprehensive guide to 420-friendly lodging in Fort Collins, Colorado",
                        "datePublished": "2025-01-15",
                        "author": {
                            "@type": "Organization",
                            "name": "BudQuest"
                        }
                    })}
                </script>
            </Helmet>

            <Navigation />

            <main className="min-h-screen bg-background pt-16 md:pt-20">
                {/* Hero Image */}
                <section className="relative h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img
                        src="/images/blog/fort-collins/hero.png"
                        alt="Fort Collins craft beer and cannabis culture"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </section>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-green-500/5 via-transparent to-accent/5 pt-12 sm:pt-20 pb-12 border-b border-border/50 -mt-16 md:-mt-20">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 flex-wrap">
                            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
                            <span>/</span>
                            <span className="text-foreground">Fort Collins 420 Stays</span>
                        </div>

                        {/* Title */}
                        <div className="text-center max-w-4xl mx-auto">
                            <Badge className="mb-4 sm:mb-6 bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1.5 text-sm font-bold">
                                <Beer className="h-4 w-4 mr-2" /> Craft Beer & Cannabis Capital
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                                Best 420-Friendly Stays in Fort Collins (2025)
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                                Fort Collins is Colorado's craft beer capital with a laid-back college town vibe—but 420-friendly lodging is limited. Here's how to find cannabis-welcoming stays in NoCo.
                            </p>
                            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent" /> Fort Collins, CO
                                </span>
                                <span>•</span>
                                <span>Updated Jan 2025</span>
                                <span>•</span>
                                <span>8 min read</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-12 sm:py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                            {/* Main Content Column */}
                            <div className="lg:col-span-9 space-y-12 sm:space-y-16">

                                {/* 1. Quick Answer Box */}
                                <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
                                        <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-accent shrink-0" />
                                        <span>Quick Answer</span>
                                    </h2>
                                    <p className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-4">
                                        Fort Collins is Colorado's craft beer capital with a laid-back college town vibe—but 420-friendly lodging is limited.
                                    </p>
                                    <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                                        Your best bets are <strong>private rentals with outdoor spaces</strong>, budget-friendly hostels, and nearby campgrounds along the Poudre River. Here's how to find cannabis-welcoming stays in NoCo.
                                    </p>
                                </Card>

                                {/* 2. The Fort Collins Situation */}
                                <div id="situation">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">The Fort Collins Situation</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                                <table className="min-w-full text-left border-collapse bg-card rounded-xl border border-border">
                                                    <tbody>
                                                        <tr className="border-b border-border">
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">Elevation</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">5,003 ft (lower than Denver)</td>
                                                        </tr>
                                                        <tr className="border-b border-border">
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">Vibe</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">College town (CSU), craft beer mecca, outdoor culture</td>
                                                        </tr>
                                                        <tr className="border-b border-border">
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">Hotels with smoking</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-red-500">Very limited—most are smoke-free</td>
                                                        </tr>
                                                        <tr className="border-b border-border">
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">420-friendly options</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">Hostels, private rentals, nearby campgrounds</td>
                                                        </tr>
                                                        <tr className="border-b border-border">
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">Dispensaries</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">15+ in town (Organic Alternatives, LivWell, etc.)</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3 sm:p-4 font-bold bg-muted/50 text-xs sm:text-sm whitespace-nowrap">Best strategy</td>
                                                            <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">Private rental with outdoor space or budget hostel</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center space-y-4">
                                            <Card className="p-6 bg-accent/5 border-accent/20">
                                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                                    <Beer className="h-5 w-5 text-accent" /> Why Fort Collins
                                                </h3>
                                                <ul className="text-sm text-muted-foreground space-y-2">
                                                    <li>• 100+ craft breweries (New Belgium, Odell, etc.)</li>
                                                    <li>• Gateway to Poudre Canyon & Rocky Mountain NP</li>
                                                    <li>• CSU campus culture—young, progressive</li>
                                                    <li>• Less touristy than Denver or Boulder</li>
                                                    <li>• 1 hour north of Denver</li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Best 420-Friendly Stays */}
                                <div id="stays" className="space-y-8 sm:space-y-12">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Top 420-Friendly Rentals in Fort Collins</h2>

                                    {isLoading ? (
                                        <div className="flex justify-center py-12">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                                        </div>
                                    ) : hotels.length > 0 ? (
                                        <div className="space-y-6">
                                            {hotels.map((hotel) => (
                                                <Card key={hotel.id} className="p-0 hover:border-accent/50 transition-all overflow-hidden">
                                                    <div className="flex flex-col">
                                                        {/* Image - full width stacked on mobile */}
                                                        <div className="w-full">
                                                            {hotel.images?.[0] ? (
                                                                <img
                                                                    src={hotel.images[0]}
                                                                    alt={hotel.name}
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                    className="w-full h-48 sm:h-56 object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-48 sm:h-56 bg-muted flex items-center justify-center">
                                                                    <Building2 className="w-12 h-12 text-muted-foreground" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Content - below image */}
                                                        <div className="p-4 sm:p-6 space-y-3">
                                                            <div>
                                                                <h3 className="text-lg sm:text-xl font-bold mb-1">{hotel.name}</h3>
                                                                {hotel.address && (
                                                                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                                                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> 
                                                                        <span className="truncate">{hotel.address}</span>
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {hotel.policies && (
                                                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{hotel.policies}</p>
                                                            )}
                                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                                {hotel.is_verified && (
                                                                    <Badge className="bg-accent/20 text-accent text-xs">BudQuest Verified</Badge>
                                                                )}
                                                                {hotel.amenities?.smoking && (
                                                                    <Badge variant="outline" className="text-xs">Smoking Allowed</Badge>
                                                                )}
                                                                {hotel.amenities?.vaping && (
                                                                    <Badge variant="outline" className="text-xs">Vaping Allowed</Badge>
                                                                )}
                                                                {hotel.rating && (
                                                                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                                        {hotel.rating}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            {hotel.website && (
                                                                <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="inline-block">
                                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-xs">
                                                                        View Property
                                                                    </Button>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="p-8 text-center">
                                            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-muted-foreground mb-4">No Fort Collins rentals currently in our database.</p>
                                            <p className="text-sm text-muted-foreground">Check back soon or explore nearby options below!</p>
                                        </Card>
                                    )}

                                    {/* Additional Recommendations */}
                                    <div className="space-y-6 pt-8 border-t border-border/50">
                                        <h3 className="text-xl font-bold">Additional Fort Collins Options</h3>

                                        <Card className="p-6 bg-green-500/5 border-green-500/20">
                                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                                <Leaf className="h-5 w-5 text-green-500" /> Where to Search for Rentals
                                            </h4>
                                            <ul className="text-sm text-muted-foreground space-y-2 ml-7">
                                                <li>• Airbnb - Search "420 friendly" or "smoking friendly" in Fort Collins</li>
                                                <li>• VRBO - Filter for properties with outdoor spaces (patios, yards, balconies)</li>
                                                <li>• Green Tripz directory - 420-friendly accommodations nationwide</li>
                                                <li>• Budget hostels with outdoor smoking areas</li>
                                            </ul>
                                        </Card>

                                        <Card className="p-6 bg-blue-500/5 border-blue-500/20">
                                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                                <Tent className="h-5 w-5 text-blue-500" /> Nearby Camping Options
                                            </h4>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Poudre Canyon campgrounds (short drive from Fort Collins) offer 420-friendly sites along the river.
                                            </p>
                                            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                                <li>• RV spots and tent sites available</li>
                                                <li>• Whitewater rafting, fishing, hiking nearby</li>
                                                <li>• Cannabis-friendly in designated areas</li>
                                            </ul>
                                        </Card>
                                    </div>
                                </div>

                                {/* 4. What to Look For When Booking */}
                                <div id="booking-tips">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">What to Look For When Booking</h2>
                                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                            <table className="min-w-full text-left border-collapse border border-border">
                                                <thead>
                                                    <tr className="bg-muted/50 border-b border-border">
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm whitespace-nowrap">Feature</th>
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm">Why It Matters</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            <span className="flex items-center gap-2"><Wind className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" /> <span>Private outdoor space</span></span>
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">Patio, yard, balcony for consumption</td>
                                                    </tr>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            <span className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" /> <span>"420 friendly" in listing</span></span>
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">Explicit permission vs. being "discreet"</td>
                                                    </tr>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            <span className="flex items-center gap-2"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" /> <span>Distance to Old Town</span></span>
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">Walking distance means no driving high</td>
                                                    </tr>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            <span className="flex items-center gap-2"><Star className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" /> <span>Reviews mentioning smoking</span></span>
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">Check for policy hints in guest reviews</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">
                                                            <span className="flex items-center gap-2"><Bed className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" /> <span>Full kitchen</span></span>
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">Edibles prep, munchies management</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. By Budget */}
                                <div id="budget">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Best Options by Budget</h2>
                                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                            <table className="min-w-full text-left border-collapse border border-border">
                                                <thead>
                                                    <tr className="bg-muted/50 border-b border-border">
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm whitespace-nowrap">Budget</th>
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm whitespace-nowrap">Best Option</th>
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm whitespace-nowrap">Price Range</th>
                                                        <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm">Notes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">Budget</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">Hostels with outdoor areas</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">$30-60/night</td>
                                                        <td className="p-3 sm:p-4 text-xs text-muted-foreground">Social vibe, backpacker-friendly</td>
                                                    </tr>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">Budget outdoor</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">Poudre Canyon Campground</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">$30-50/night</td>
                                                        <td className="p-3 sm:p-4 text-xs text-muted-foreground">River access, outdoor activities</td>
                                                    </tr>
                                                    <tr className="border-b border-border">
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">Mid-range</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">Private rental with patio</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">$150-250/night</td>
                                                        <td className="p-3 sm:p-4 text-xs text-muted-foreground">Full privacy, kitchen access</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold whitespace-nowrap">Splurge</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">Luxury rental or boutique</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">$250-400/night</td>
                                                        <td className="p-3 sm:p-4 text-xs text-muted-foreground">Premium amenities, prime location</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. The Craft Beer + Cannabis Combo */}
                                <div id="beer-cannabis">
                                    <Card className="p-4 sm:p-6 md:p-8 border-accent/20 bg-accent/5">
                                        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                                            <div className="md:w-2/3">
                                                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                                    <Beer className="h-5 w-5 sm:h-6 sm:w-6 text-accent" /> The Craft Beer + Cannabis Combo
                                                </h2>
                                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                                                    Fort Collins is THE craft beer destination in Colorado. Combine with cannabis for the ultimate NoCo experience.
                                                </p>
                                                <div className="space-y-3">
                                                    <h4 className="font-bold text-sm sm:text-base">Brewery Crawl Strategy:</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="p-4 bg-background rounded-lg border border-border">
                                                            <span className="text-accent font-bold block mb-1">01. Start</span>
                                                            <p className="text-xs text-muted-foreground">Consume at rental before heading out</p>
                                                        </div>
                                                        <div className="p-4 bg-background rounded-lg border border-border">
                                                            <span className="text-accent font-bold block mb-1">02. Explore</span>
                                                            <p className="text-xs text-muted-foreground">Walk or Uber to Old Town breweries</p>
                                                        </div>
                                                        <div className="p-4 bg-background rounded-lg border border-border">
                                                            <span className="text-accent font-bold block mb-1">03. Enjoy</span>
                                                            <p className="text-xs text-muted-foreground">No cannabis on brewery premises</p>
                                                        </div>
                                                        <div className="p-4 bg-background rounded-lg border border-border">
                                                            <span className="text-accent font-bold block mb-1">04. Return</span>
                                                            <p className="text-xs text-muted-foreground">Back to rental, consume, repeat safely</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 bg-muted/50 p-6 rounded-xl self-start">
                                                <h4 className="font-bold mb-3 text-sm">Top Breweries</h4>
                                                <ul className="space-y-2 text-xs text-muted-foreground">
                                                    <li className="flex gap-2"><span>🍺</span> New Belgium (tours available)</li>
                                                    <li className="flex gap-2"><span>🍺</span> Odell Brewing</li>
                                                    <li className="flex gap-2"><span>🍺</span> Horse & Dragon</li>
                                                    <li className="flex gap-2"><span>🍺</span> Funkwerks</li>
                                                    <li className="flex gap-2"><span>🍺</span> Purpose Brewing</li>
                                                </ul>
                                                <p className="text-xs text-accent mt-4 font-semibold">⚠️ Pro tip: Edibles + beer = be careful. Start low on both.</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* 7. Where You CAN'T Consume */}
                                <div id="no-consume">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-red-500">Legal Red Zones: Where NOT to Smoke</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-x-12 sm:gap-y-8">
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> Old Town / Downtown</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Public consumption is illegal. Keep it on private property only.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> CSU Campus</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Federal funding means federal rules. Cannabis prohibited entirely.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> Breweries / Taprooms</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Private businesses. Cannabis not allowed on premises.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> City Parks</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Public spaces. Consumption prohibited by city ordinance.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> Poudre Canyon (Federal Sections)</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Some areas are federal land. Check before consuming.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold flex items-center gap-2"><Ban className="h-5 w-5" /> Rental Cars</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                DUI laws apply. Heavy cleaning fees for smoking in rental vehicles.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 8. What to Do High in Fort Collins */}
                                <div id="to-do">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Best Activities in Fort Collins</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { icon: Beer, title: "Brewery Hopping", desc: "Tour 100+ craft breweries. Consume at rental first, pace yourself." },
                                            { icon: Mountain, title: "Poudre River Trail", desc: "Beautiful walk/bike path. Consume beforehand, enjoy the scenery." },
                                            { icon: Coffee, title: "Old Town Shopping", desc: "Edibles + wandering the boutiques and cafes on College Avenue." },
                                            { icon: Gem, title: "Horsetooth Reservoir", desc: "Stunning mountain views. Consume at rental before visiting." },
                                            { icon: Award, title: "CSU Campus Walk", desc: "Pretty campus, but no consumption on grounds. Visit sober." }
                                        ].map((item, i) => (
                                            <Card key={i} className="p-6 hover:border-accent/50 transition-all">
                                                <item.icon className="h-8 w-8 text-accent mb-3" />
                                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* 9. CTA */}
                                <div className="text-center py-12 sm:py-20 px-4 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl border border-green-500/20">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Experience Fort Collins Cannabis Culture</h2>
                                    <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
                                        Fort Collins isn't the easiest Colorado city for 420-friendly lodging—but the craft beer scene, mountain access, and chill vibe make it worth the effort.
                                    </p>
                                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                        <Link to="/hotels">
                                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 text-base font-bold">
                                                Find 420 Stays
                                            </Button>
                                        </Link>
                                        <Link to="/dispensary">
                                            <Button size="lg" variant="outline" className="px-8 h-12 text-base font-bold">
                                                Fort Collins Dispensaries
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                            </div>

                            {/* Sidebar / Quick TOC */}
                            <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-8">
                                <Card className="p-6">
                                    <h3 className="font-bold text-lg mb-4">Quick Navigation</h3>
                                    <nav className="space-y-2 text-sm">
                                        <a href="#situation" className="block text-muted-foreground hover:text-accent transition-colors">The Fort Collins Situation</a>
                                        <a href="#stays" className="block text-muted-foreground hover:text-accent transition-colors">Best 420-Friendly Stays</a>
                                        <a href="#booking-tips" className="block text-muted-foreground hover:text-accent transition-colors">Booking Tips</a>
                                        <a href="#budget" className="block text-muted-foreground hover:text-accent transition-colors">Options by Budget</a>
                                        <a href="#beer-cannabis" className="block text-muted-foreground hover:text-accent transition-colors">Beer + Cannabis Combo</a>
                                        <a href="#no-consume" className="block text-muted-foreground hover:text-accent transition-colors">Where NOT to Smoke</a>
                                        <a href="#to-do" className="block text-muted-foreground hover:text-accent transition-colors">Things to Do</a>
                                    </nav>
                                </Card>

                                <Card className="p-6 bg-accent/5 border-accent/20">
                                    <h3 className="font-bold mb-3">Related Guides</h3>
                                    <div className="space-y-3 text-sm">
                                        <Link to="/blog/best-420-friendly-stays-breckenridge" className="block text-muted-foreground hover:text-accent transition-colors">
                                            Breckenridge 420 Stays →
                                        </Link>
                                        <Link to="/blog/best-dispensaries-denver" className="block text-muted-foreground hover:text-accent transition-colors">
                                            Denver Dispensaries →
                                        </Link>
                                        <Link to="/hotels" className="block text-muted-foreground hover:text-accent transition-colors">
                                            All 420 Rentals →
                                        </Link>
                                    </div>
                                </Card>
                            </aside>

                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="bg-muted/50 py-12 sm:py-16 md:py-24 border-t border-border/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4 sm:space-y-6">
                            {[
                                { q: "Are there 420-friendly hotels in Fort Collins?", a: "Very limited. Most traditional hotels are smoke-free. Your best options are budget hostels with outdoor smoking areas, private vacation rentals, or nearby campgrounds." },
                                { q: "Can you smoke weed at hotels in Fort Collins?", a: "Not officially. However, some properties allow cannabis consumption in designated outdoor areas. Always check the property's policy before booking." },
                                { q: "Where can you consume cannabis in Fort Collins?", a: "Private property only. Your rental, hostel outdoor areas, or designated campground spots. Public consumption in Old Town, parks, or CSU campus is illegal." },
                                { q: "Is there a cannabis-friendly hostel in Fort Collins?", a: "Some budget hostels allow outdoor smoking. Always verify policies before booking and respect designated smoking areas." },
                                { q: "Can you combine craft beer and cannabis in Fort Collins?", a: "Yes, but be careful. Consume at your rental before visiting breweries. No cannabis allowed on brewery premises. Start low on both substances." },
                                { q: "Is cannabis allowed at Rocky Mountain National Park?", a: "Absolutely not. RMNP is federal land where cannabis is completely illegal, punishable by up to 6 months jail and $5,000 fine. Consume at your Fort Collins rental, visit the park sober." }
                            ].map((faq, i) => (
                                <Card key={i} className="p-4 sm:p-6 md:p-8 hover:border-green-500/30 transition-all bg-background/50">
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3">
                                        <span className="text-green-500 font-serif italic text-xl sm:text-2xl leading-none shrink-0">Q.</span>
                                        <span>{faq.q}</span>
                                    </h3>
                                    <p className="text-sm sm:text-base text-muted-foreground pl-6 sm:pl-8 leading-relaxed">{faq.a}</p>
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

export default BlogFortCollinsStays;
