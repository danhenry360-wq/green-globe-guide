import React, { useState } from 'react';
// Assuming these utility components are imported from your shared UI library
import { Navigation } from "@/components/Navigation"; 
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Icons used for the detailed sections (lucide-react)
import { 
    Calendar, Timer, AlertTriangle, Briefcase, Leaf, MapPin, Truck, Utensils, 
    Hotel, CheckCircle, Info, Star, Plane, Euro, DollarSign 
} from "lucide-react";

// --- 1. TYPES/INTERFACES ---
interface BlogPost { 
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    readTime?: string;
    author?: string;
    tags?: string[];
}
interface RetailerRecommendation { 
    name: string;
    policy: string;
    menuLink: string;
    license: string;
}
interface HotelRecommendation { 
    name: string;
    description: string;
    bookingLink: string;
    amenities: string[];
}
interface NeighborhoodRecommendation {
    name: string;
    description: string;
}
interface DetailedSection {
    icon: keyof typeof IconMap; // Forces the icon string to be a valid key of the map below
    title: string;
    content: string | string[]; // Can be a paragraph (string) or a list (string[])
    type: 'paragraph' | 'list' | 'neighborhoods' | 'etiquette' | 'warning';
}
interface FullBlogPost extends BlogPost {
    content: string[]; // Main narrative content paragraphs
    retailerRecommendations?: RetailerRecommendation[];
    hotelRecommendations?: HotelRecommendation[];
    detailedSections?: DetailedSection[]; 
    neighborhoods?: NeighborhoodRecommendation[]; 
}

// Helper function to create a clean URL slug from the title
const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
};

// --- 2. ICON MAPPER for dynamically rendering Lucide icons ---
const IconMap = {
    'AlertTriangle': AlertTriangle,
    'Briefcase': Briefcase,
    'Leaf': Leaf,
    'MapPin': MapPin,
    'Truck': Truck,
    'Utensils': Utensils,
    'Hotel': Hotel,
    'CheckCircle': CheckCircle,
    'Info': Info,
    'Legal': Briefcase, 
    'Consumption': Utensils, 
    'Safety': AlertTriangle, 
    'Neighborhood': MapPin,
    'Etiquette': Star,
    'Plane': Plane,
    'Euro': Euro,
    'DollarSign': DollarSign,
};

// --- 3. FULL POST DATA SOURCE (Updated with 2025 CA Guide) ---
const fullPostData: FullBlogPost[] = [
    // --- POST 1: California Cannabis Guide 2025: LA Laws, Consumption Lounges & Tourist Rules ---
    {
        title: "California Cannabis Guide 2025: LA Laws, Consumption Lounges & Tourist Rules",
        excerpt: "The complete guide to California's recreational cannabis laws, possession limits, and crucial travel tips focused on Los Angeles, including new consumption lounge rules.",
        image: "/blog-california-2025.jpg", 
        date: "Nov 23, 2025", 
        category: "Legal Guide",
        readTime: "5 min read",
        author: "Alex Morgan",
        content: [
            "California remains the undisputed leader in North American cannabis culture. As we conclude 2025, the state's cannabis framework is stable, but new regulations (like the implementation of AB 1775) are revolutionizing the social consumption scene, particularly in Los Angeles. This guide details the laws you need to know as a visitor.",
            "Purchasing cannabis must be done through licensed dispensaries. Look for the state license display to ensure you're buying safe, tested products. The new regulations aim to improve consumer experience and access while maintaining strict safety standards."
        ],
        neighborhoods: [
            { name: "West Hollywood (WeHo)", description: "Home to landmark consumption venues (like Lowell Cafe) and premier dispensaries—a top destination for cannabis tourists." },
            { name: "Venice Beach", description: "Progressive, beachside culture with multiple licensed shops. Great for quick purchases and enjoying the outdoor atmosphere (but remember: no public consumption!)." },
            { name: "Arts District/Downtown LA", description: "Emerging hub with modern dispensaries and consumption lounges. Check local listings for live events allowed under AB 1775." },
            { name: "Hollywood", description: "Centrally located with many dispensaries and 420-friendly rentals—ideal for first-time visitors to the city." },
        ],
        detailedSections: [
            {
                icon: 'Legal',
                title: 'Legal Status & Age Requirements',
                content: "Recreational cannabis is fully legal since 2016 for adults **21+** with government-issued ID (out-of-state IDs and passports are accepted). Medical cards are not required for recreational purchases.",
                type: 'paragraph'
            },
            {
                icon: 'Legal',
                title: 'Possession Limits for Tourists',
                content: [
                    "**1 oz (28.5 grams)** of non-concentrated cannabis flower.",
                    "**8 grams** of concentrated cannabis (vape cartridges, shatter, wax, etc.).",
                    "Possession must remain below these limits at all times in public."
                ],
                type: 'list'
            },
            {
                icon: 'Consumption',
                title: 'Where to Consume (The 2025 Update)',
                content: [
                    "**Private Property:** Allowed, but landlords (hotels, Airbnbs) can prohibit it. **Always check your rental policy.**",
                    "**Licensed Consumption Lounges (AB 1775):** New state law allows licensed lounges to serve **non-cannabis food/drinks and host live entertainment** (e.g., music, comedy). **This is the best legal option for social consumption.**",
                    "**Public Consumption:** Remains illegal. Fines start at $100 for consumption in parks, sidewalks, or beaches."
                ],
                type: 'list'
            },
            {
                icon: 'Briefcase',
                title: 'Dispensary & Purchase Information',
                content: "Only buy from DCC-licensed shops (easy to verify online). Adults pay a 15% excise tax (plus local sales tax). **Cash is still dominant**, though many shops use third-party payment solutions.",
                type: 'paragraph'
            },
            {
                icon: 'Truck',
                title: 'Airport & Transportation Rules',
                content: [
                    "**Driving:** Cannot be under the influence (DUI) and must have cannabis in a sealed container or in the trunk.",
                    "**LAX/Airports:** TSA (Federal Agency) officially prohibits cannabis. While state law is tolerant for *in-state* travel, **federal law takes precedence**, making flying with cannabis highly risky."
                ],
                type: 'list'
            },
            {
                icon: 'Safety',
                title: 'Safety, Potency & Employment Laws',
                content: [
                    "**Potency:** Edibles are limited to 10mg THC per serving and 100mg per package. Start with 2.5mg - 5mg if you are a beginner.",
                    "**Illegal Shops:** Never buy from unlicensed stores; products are untested and potentially harmful.",
                    "**Employment Note:** New 2024 laws (AB 2188/SB 700) protect employees from discrimination based on off-duty, off-site cannabis use, but federal jobs and safety-sensitive roles are exempt."
                ],
                type: 'list'
            },
            {
                icon: 'Neighborhood',
                title: 'Best Neighborhoods for Cannabis Tourists',
                content: [], 
                type: 'neighborhoods'
            },
            {
                icon: 'Etiquette',
                title: 'Local Etiquette & Cultural Norms',
                content: "LA's culture is sophisticated and discrete. Always respect private property rules. Tipping budtenders for good service is standard practice.",
                type: 'paragraph'
            }
        ],
        retailerRecommendations: [
            { name: "The Pottery - Los Angeles", policy: "Premium dispensary in Mid-City known for its curated selection and stylish atmosphere.", menuLink: "#", license: "C10-0000001-LIC" },
            { name: "MedMen - Beverly Hills", policy: "High-end, chain dispensary offering a luxury shopping experience.", menuLink: "#", license: "C10-0000003-LIC" }
        ]
    },

    // --- POST 2: Best 420-Friendly Hotels in Amsterdam ---
    {
        title: "Best 420-Friendly Hotels in Amsterdam",
        excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable, policy-checked experience.",
        image: "/blog-amsterdam.jpg",
        date: "Jan 10, 2025",
        category: "Travel",
        readTime: "4 min read",
        author: "Sarah Chen",
        content: [
            "Amsterdam remains the quintessential cannabis travel destination, but finding an accommodation where you can legally consume can be tricky. While the famous coffee shops allow consumption on-site, smoking in public or in standard hotels is often prohibited.",
            "The key is to book a hotel that explicitly states a 420-friendly policy, usually allowing vaping or smoking on balconies or designated areas. Our list features verified options that prioritize your comfort and experience."
        ],
        detailedSections: [
            {
                icon: 'Legal',
                title: 'Legal Status Snapshot',
                content: "Sale/consumption is tolerated in licensed Coffee Shops. Possession of small amounts (up to 5g) is decriminalized. Cannabis is technically illegal but unenforced under the 'Gedogen Policy.'",
                type: 'paragraph'
            },
            {
                icon: 'Consumption',
                title: 'Consumption Rules',
                content: [
                    "Only consume cannabis bought from a licensed Coffee Shop.",
                    "Smoking tobacco/cannabis mix is banned in most public spaces, including Coffee Shops (vaping is fine).",
                    "Public consumption outside designated areas can result in fines."
                ],
                type: 'list'
            },
            {
                icon: 'Hotel',
                title: '420-Friendly Accommodation Needs',
                content: "Most traditional hotels prohibit smoking, including cannabis. Always search for hotels that specifically list a '420-friendly' or 'smoking allowed on balcony' policy.",
                type: 'paragraph'
            },
            {
                icon: 'Plane',
                title: 'Schiphol Airport (AMS) Rules',
                content: "Do NOT travel with cannabis through Schiphol Airport (AMS). It is an international airport, and both international and national law prohibit carrying narcotics.",
                type: 'warning'
            },
            {
                icon: 'Euro',
                title: 'Cost & Tipping',
                content: "Cannabis is typically sold by the gram (€10-€15). Tipping is not customary in Coffee Shops but appreciated for exceptional service.",
                type: 'paragraph'
            }
        ],
        hotelRecommendations: [
            { name: "The Bulldog Hotel", description: "Located near Centraal Station, this is one of the world's original 420-friendly hostels with a designated smoking room.", bookingLink: "#", amenities: ["Designated Smoking Lounge", "Central Location", "Bar/Cafe"] },
            { name: "The Conscious Hotel Westerpark", description: "Eco-friendly, modern hotel with some rooms allowing vaping/smoking on large balconies.", bookingLink: "#", amenities: ["Eco-Certified", "Large Balconies", "Near Westerpark"] }
        ]
    },

    // --- POST 3: Uruguay Cannabis Laws: What Tourists Need to Know ---
    {
        title: "Uruguay Cannabis Laws: What Tourists Need to Know",
        excerpt: "Navigate Uruguay's unique, federally legal cannabis market and discover what makes it a restricted destination for non-residents.",
        image: "/blog-uruguay.jpg",
        date: "Jan 5, 2025",
        category: "Legal Guide",
        readTime: "6 min read",
        author: "Carlos Rodriguez",
        content: [
            "Uruguay was the first country to federally legalize cannabis for recreational use, creating a globally unique model. However, tourists must understand that this model is designed to benefit and serve only **Uruguayan citizens and permanent residents**.",
            "As a tourist, you will not be able to purchase cannabis from pharmacies, the primary legal source. The market is restricted to combat illegal drug trade and prevent 'cannabis tourism' seen in other countries."
        ],
        detailedSections: [
            {
                icon: 'AlertTriangle',
                title: 'CRITICAL: Tourist Restriction',
                content: "Tourists **CANNOT** legally purchase cannabis from pharmacies, grow clubs, or licensed sources. Sales are strictly limited to registered citizens and permanent residents.",
                type: 'warning'
            },
            {
                icon: 'Legal',
                title: 'The Legal System (for Residents)',
                content: "Legalization is controlled by the government regulator, IRCCA. Consumption is legal, but production and sale are controlled through three regulated methods: Home Grow, Cannabis Clubs, and Pharmacy Sales (for registered citizens).",
                type: 'paragraph'
            },
            {
                icon: 'Truck',
                title: 'Possession & Transport',
                content: [
                    "Private consumption is decriminalized/tolerated, but purchasing is illegal for visitors.",
                    "Do NOT buy from the black market, as this undermines the legal model and is illegal.",
                    "Do NOT attempt to bring cannabis into or out of Uruguay."
                ],
                type: 'list'
            },
            {
                icon: 'Consumption',
                title: 'Consumption & Public Spaces',
                content: "Consumption is generally tolerated in private residences. Smoking in public is strongly discouraged and may lead to police intervention, even if you are not fined.",
                type: 'paragraph'
            },
            {
                icon: 'DollarSign',
                title: 'Cost & Availability',
                content: "For citizens, pharmacy cannabis is subsidized and cheap (around $1.30 per gram). For tourists, the legal market is inaccessible, and the black market is unreliable.",
                type: 'warning'
            }
        ],
        retailerRecommendations: [],
        hotelRecommendations: []
    }
];

// The list of all posts (used for the grid view)
const blogPosts: BlogPost[] = fullPostData.map(p => ({
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    date: p.date,
    category: p.category,
    readTime: p.readTime,
    author: p.author,
    tags: p.tags
}));


// --- 4. REUSABLE COMPONENTS FOR BLOG DETAIL ---

// Component for the Neighborhood grid
const NeighborhoodCard = ({ name, description }: NeighborhoodRecommendation) => (
    <div className="bg-background border border-border/50 p-4 rounded-md shadow-inner">
        <h4 className="font-semibold text-foreground text-sm mb-1">{name}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
    </div>
);

// Component for the important boxed warnings
const ImportantBox = ({ type, children }: { type: 'intro' | 'legal' | 'critical', children: React.ReactNode }) => {
    const baseClass = "p-4 rounded-lg text-sm mb-4";
    const headerClass = "font-bold mb-1 flex items-center";

    let icon: React.ReactNode;
    let title: string;
    let boxClasses: string;
    let titleClasses: string;

    if (type === 'intro') {
        icon = <Info className="w-4 h-4 mr-2 text-accent" />;
        title = "Introduction to Los Angeles";
        boxClasses = "bg-card border border-accent/70";
        titleClasses = "text-accent";
    } else if (type === 'critical') {
        icon = <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />;
        title = "Critical Warning";
        boxClasses = "bg-red-900/40 border border-red-500/80 p-3 mt-3";
        titleClasses = "text-red-500";
    } else { // type === 'legal' (Inline Warning)
        icon = <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />;
        title = "Important";
        boxClasses = "bg-yellow-900/40 border border-amber-500/80 p-3 mt-3";
        titleClasses = "text-amber-500";
    }

    return (
        <div className={`${baseClass} ${boxClasses}`}>
            <p className={`${headerClass} ${titleClasses}`}>
                {icon}
                {title}
            </p>
            <div className="text-muted-foreground">
                {children}
            </div>
        </div>
    );
};

// Component for the major section cards
const GuideSectionList = ({ icon, title, content, type, neighborhoods }: DetailedSection & { neighborhoods: FullBlogPost['neighborhoods'] }) => {
    const IconComponent = IconMap[icon] || Leaf;

    // Determine the bullet color for list items (Red for Safety/Warning, Green for everything else)
    let bulletColor = 'bg-accent';
    if (icon === 'Safety' || icon === 'AlertTriangle' || type === 'warning' || title.includes("CRITICAL")) {
        bulletColor = 'bg-red-500'; 
    }

    return (
        <div className="bg-card p-5 rounded-lg border border-border/50 shadow-md">
            <h2 className="flex items-center text-xl font-bold mb-3 text-foreground">
                <IconComponent className={`w-5 h-5 mr-3 ${bulletColor.replace('bg-', 'text-')}`} />
                {title}
            </h2>
            
            {/* Paragraph Content */}
            {(type === 'paragraph' || type === 'etiquette' || type === 'warning') && typeof content === 'string' && (
                <p className={`text-base leading-relaxed ${type === 'warning' ? 'text-red-300' : 'text-muted-foreground'}`}>{content}</p>
            )}
            
            {/* List Content */}
            {type === 'list' && Array.isArray(content) && (
                <ul className="space-y-2 text-muted-foreground list-none pl-0">
                    {content.map((point, index) => (
                        <li key={index} className="text-base flex items-start">
                            <span className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${bulletColor}`}></span>
                            <span className="leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Neighborhood Grid Content */}
            {type === 'neighborhoods' && neighborhoods && neighborhoods.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {neighborhoods.map((n, index) => (
                        <NeighborhoodCard key={index} {...n} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- 5. MAIN DETAIL COMPONENT ---
const BlogPostDetail = ({ slug, onBack }: { slug: string | null, onBack: () => void }) => {
    if (!slug) return null;

    const post = fullPostData.find(p => slugify(p.title) === slug);
    const displayPost = post || blogPosts.find(p => slugify(p.title) === slug);

    if (!displayPost) return null;

    // Default to filler if full data is missing, though we now have full data for the first 3 posts
    const content = post?.content || ["The full article content is coming soon!"];
    const detailedSections = post?.detailedSections || [];
    const retailerRecommendations = post?.retailerRecommendations || [];
    const hotelRecommendations = post?.hotelRecommendations || [];
    const neighborhoods = post?.neighborhoods || [];

    // Simple check to trigger the 'Major Guide' styling for the LA post
    const isMajorGuide = displayPost.title.includes("California Cannabis Guide");

    return (
        <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                
                {/* Back Button */}
                <button onClick={onBack} className="text-sm text-accent hover:text-accent-foreground mb-8 flex items-center">
                    &larr; Back to all Articles
                </button>
                
                {/* Header (Dynamic title styling) */}
                <header className="mb-10">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                            {/* Dynamically style the first few words if it's a guide */}
                            {/* Split the title by colon for styling: "California Cannabis Guide 2025" : "LA Laws, Consumption Lounges & Tourist Rules" */}
                            {displayPost.title.split(':').length > 1 ? (
                                <>
                                    {displayPost.title.split(':')[0]}
                                    <span className="text-accent">{displayPost.title.split(':').slice(1).join(':')}</span>
                                </>
                            ) : (
                                displayPost.title
                            )}
                        </h1>
                        {isMajorGuide && (
                             <Badge className="bg-accent text-background text-sm font-bold px-3 py-1.5 shadow-lg flex-shrink-0 mt-2">
                                Major Guide
                             </Badge>
                        )}
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{displayPost.excerpt}</p>
                    
                    {/* Meta Line */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-accent" /> <time dateTime={displayPost.date}>{displayPost.date}</time></span>
                        <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-accent" /> {displayPost.readTime}</span>
                        <span>By {displayPost.author}</span>
                    </div>
                </header>
                
                {/* Featured Image */}
                <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-12">
                    <img src={displayPost.image} alt={displayPost.title} className="w-full h-full object-cover" />
                </div>

                {/* --- Introduction Box (Only for LA Guide) --- */}
                {displayPost.title.includes("California Cannabis Guide") && (
                    <section className="mb-12">
                        <ImportantBox type="intro">
                            Welcome to the comprehensive cannabis travel guide for **Los Angeles, California**. This guide provides essential information for cannabis tourists visiting this destination.
                            
                            {/* Nested Important Warning Box */}
                            <div className="mt-4">
                                <ImportantBox type="legal">
                                    Always verify current laws before traveling. Local ordinances vary by city within LA County.
                                </ImportantBox>
                            </div>
                        </ImportantBox>
                    </section>
                )}
                
                {/* --- Critical Warning Box (Only for Uruguay Guide) --- */}
                 {displayPost.title.includes("Uruguay") && (
                    <section className="mb-12">
                        <ImportantBox type="critical">
                            The legal cannabis market in Uruguay is **STRICTLY restricted** to Uruguayan citizens and permanent residents only. As a tourist, you cannot legally purchase cannabis. Attempting to purchase from the black market is strongly discouraged.
                        </ImportantBox>
                    </section>
                )}


                {/* Article Content - Narrative text */}
                <article className="max-w-none text-foreground space-y-6 mb-12">
                    {content.map((paragraph, index) => (
                        <p key={index} className="text-lg leading-relaxed text-muted-foreground/90">{paragraph}</p>
                    ))}
                </article>

                {/* --- DETAILED GUIDE SECTIONS (The Core Vibe) --- */}
                {detailedSections.length > 0 && (
                    <section className="mt-12 space-y-8">
                        {detailedSections.map((section, index) => (
                            <GuideSectionList 
                                key={index} 
                                {...section}
                                // Pass neighborhoods data only if the section type is 'neighborhoods'
                                neighborhoods={section.type === 'neighborhoods' ? neighborhoods : []}
                            />
                        ))}
                    </section>
                )}

                {/* Retailer Recommendations (Monetization Section) */}
                {retailerRecommendations.length > 0 && (
                    <section className="mt-12">
                        <hr className="my-10 border-border/50" />
                        <h2 className="text-3xl font-bold mb-6 text-foreground">🛍️ Verified Retailers Mentioned</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {retailerRecommendations.map((retailer, index) => (
                                <Card key={index} className="bg-gradient-card p-6 border border-border/50 shadow-lg flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-accent">{retailer.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1">{retailer.policy}</p>
                                    
                                    <a
                                        href={retailer.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        View Live Menu & Order
                                    </a>
                                    
                                    <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/30">
                                        <Badge variant="secondary" className="bg-green-100/10 text-green-400 border-green-400/30">
                                            Verified License
                                        </Badge>
                                        <span className="ml-2">CA DCC: **{retailer.license}**</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Hotel Recommendations */}
                {hotelRecommendations.length > 0 && (
                    <section className="mt-12">
                        <hr className="my-10 border-border/50" />
                        <h2 className="text-3xl font-bold mb-6 text-foreground">🏨 420-Friendly Hotels</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hotelRecommendations.map((hotel, index) => (
                                <Card key={index} className="bg-gradient-card p-6 border border-border/50 shadow-lg flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-accent">{hotel.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1">{hotel.description}</p>
                                    
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-foreground mb-1">Amenities:</p>
                                        <ul className="list-disc list-inside text-xs text-muted-foreground ml-4">
                                            {hotel.amenities.map((amenity, idx) => (
                                                <li key={idx}>{amenity}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href={hotel.bookingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors mt-auto"
                                    >
                                        Book Now
                                    </a>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* --- IMPORTANT LEGAL NOTICE (Near Footer) --- */}
                <div className="mt-16 pt-8 border-t border-border/50">
                    <Card className="p-5 bg-card border border-border/50 shadow-md">
                        <h3 className="text-lg font-bold text-accent mb-2">Important Legal Notice</h3>
                        <p className="text-muted-foreground text-sm">
                            Information is educational only and laws change frequently. Last updated: November 23, 2025. Always verify current laws with official sources before traveling or making any legal decisions.
                        </p>
                    </Card>
                </div>
            </div>
        </main>
    );
};


// --- 6. MAIN BLOG COMPONENT (List View Controller) ---
const Blog = () => {
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

    const getGridColumns = () => {
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    };

  // Blog post card component for reusability
  const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
        const handleCardClick = () => {
            const slug = slugify(post.title);
            setSelectedPostSlug(slug);
        };

        return (
            <Card 
                className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all duration-300 cursor-pointer group h-full flex flex-col"
                role="article"
                aria-label={`Blog post: ${post.title}`}
                onClick={handleCardClick}
            >
                <div className="aspect-video bg-muted overflow-hidden flex-shrink-0">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading={index < 3 ? "eager" : "lazy"}
                    />
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge 
                            variant="outline" 
                            className="text-xs bg-primary/5"
                            aria-label={`Category: ${post.category}`}
                        >
                            {post.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-nowrap">
                            <Calendar className="w-3 h-3 flex-shrink-0 text-accent" aria-hidden="true" />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                        {post.readTime && (
                            <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                                {post.readTime}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                    </p>

                    {post.author && (
                        <div className="mt-4 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground">
                                By {post.author}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    // Conditional Rendering Logic
    if (selectedPostSlug) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <BlogPostDetail 
                    slug={selectedPostSlug} 
                    onBack={() => setSelectedPostSlug(null)} 
                />
                <Footer />
            </div>
        );
    }
    
    // Default Blog List View
    return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header Section */}
          <section className="text-center mb-12 sm:mb-16 px-2">
            <Badge 
              className="bg-accent/20 text-accent border-accent/30 mb-4 text-sm"
              aria-label="Blog section"
            >
              Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
              Cannabis Travel Insights
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert guides, legal updates, and travel tips for cannabis enthusiasts worldwide.
            </p>
          </section>

          {/* Blog Posts Grid */}
          <section aria-label="Blog posts" className="mb-12">
            <div className={getGridColumns()}>
              {blogPosts.map((post, index) => (
                <BlogPostCard 
                  key={`${post.title}-${index}`}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Load More Section - For future pagination */}
          <section className="text-center" aria-label="Load more posts">
            <button
              className="px-6 sm:px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              onClick={() => {/* Pagination logic to be implemented */}}
              aria-label="Load more blog posts"
            >
              Load More Articles
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              Showing {blogPosts.length} of 24 articles
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
