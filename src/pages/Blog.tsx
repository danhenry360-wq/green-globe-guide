import React, { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Timer, AlertTriangle, Briefcase, Leaf, MapPin, Truck, Utensils, Hotel, CheckCircle, Info, Star, Plane, Euro, DollarSign } from "lucide-react";

// --- Types (Simplified for brevity, assuming they are defined correctly) ---
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
    icon: string; // E.g., 'Leaf', 'AlertTriangle'
    title: string;
    content: string | string[]; // Can be a paragraph or a list of bullet points
    type: 'paragraph' | 'list' | 'neighborhoods' | 'etiquette' | 'warning';
}

interface FullBlogPost extends BlogPost {
    content: string[];
    retailerRecommendations?: RetailerRecommendation[];
    hotelRecommendations?: HotelRecommendation[];
    detailedSections?: DetailedSection[]; // Detailed sections replacing the simple guideSections
    neighborhoods?: NeighborhoodRecommendation[]; // Separate data for neighborhood cards
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

// --- ICON MAPPER for dynamically rendering Lucide icons ---
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

// --- START: FULL POST DATA SOURCE (Populated with 3 Posts) ---
const fullPostData: FullBlogPost[] = [
    // --- POST 1: Is Weed Legal in California in 2025? (LA Guide) ---
    {
        title: "Los Angeles Cannabis Guide: Is Weed Legal in California in 2025?",
        excerpt: "The complete guide to California's recreational cannabis laws, possession limits, and travel tips focused on Los Angeles.",
        image: "/blog-california.jpg",
        date: "Jan 15, 2025",
        category: "Legal Guide",
        readTime: "5 min read",
        author: "Alex Morgan",
        content: [
            "California has been at the forefront of cannabis legalization, and as we move into 2025, the laws remain largely consistent with previous years, offering both residents and tourists a clear framework for recreational use. This guide focuses on the specific rules and culture within Los Angeles County.",
            "Purchasing cannabis must be done through licensed dispensaries. Look for dispensaries displaying their state license to ensure you're buying safe, tested products. Many dispensaries also offer delivery services within their operational zones."
        ],
        neighborhoods: [
            { name: "Venice Beach", description: "Progressive cannabis culture, many dispensaries, consumption lounges, artistic vibe - tourist-friendly" },
            { name: "West Hollywood", description: "Lowell Cafe (consumption restaurant), premium dispensaries, nightlife - very cannabis-friendly" },
            { name: "Hollywood", description: "Tourist center, many dispensaries, 420-friendly hotels - convenient for visitors" },
            { name: "Arts District/Downtown", description: "Urban warehouses converted to cannabis lounges and dispensaries - creative scene" },
        ],
        detailedSections: [
            {
                icon: 'Legal',
                title: 'Legal Status & Age Requirements',
                content: "Recreational cannabis fully legal since 2016 for adults 21+ with government-issued ID. No medical card required for recreational. Out-of-state IDs accepted.",
                type: 'paragraph'
            },
            {
                icon: 'Legal',
                title: 'Possession Limits',
                content: [
                    "1 oz (28.5 grams) of cannabis flower or 8 grams of concentrate.",
                    "6 living plants allowed at home per residence.",
                    "Unlimited possession at private residence."
                ],
                type: 'list'
            },
            {
                icon: 'Consumption',
                title: 'Where to Consume in LA',
                content: [
                    "Private property is generally safe.",
                    "Licensed consumption lounges (The Woods, Lowell Cafe) are legally allowed in certain municipalities.",
                    "**Public consumption is a $100 citation.** (No beaches, parks, streets, or cars)."
                ],
                type: 'list'
            },
            {
                icon: 'Briefcase',
                title: 'Dispensary & Purchase Information',
                content: "500+ licensed dispensaries throughout LA County. Average prices $30-60/eighth. Premium options like MedMen and Stiizy are common. Delivery services are widely available. Sales tax applies.",
                type: 'paragraph'
            },
            {
                icon: 'Truck',
                title: 'Airport & Transportation Rules',
                content: [
                    "Driving under the influence (DUI) is strictly enforced.",
                    "LAX officially permits cannabis in checked bags for CA travel *only* but federal law still prohibits flying with cannabis anywhere.",
                    "Do not transport cannabis across state lines or internationally."
                ],
                type: 'list'
            },
            {
                icon: 'Safety',
                title: 'Safety Tips & Warnings',
                content: [
                    "Always buy from licensed shops. Unlicensed shops often sell untested, contaminated products.",
                    "Respect local ordinances; some LA neighborhoods (Pasadena, Beverly Hills) have strict rules.",
                    "Use ride-sharing (Uber/Lyft) if you plan on consuming; LAPD runs sobriety checkpoints."
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
                content: "LA has a mature, casual cannabis culture. Locals value discretion. Tipping your budtender is standard practice ($5-10).",
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


// --- NEW COMPONENTS for Guide Feel (Re-included for completeness) ---

// Component for the Neighborhood grid
const NeighborhoodCard = ({ name, description }: NeighborhoodRecommendation) => (
    <div className="bg-background border border-border/50 p-4 rounded-md shadow-inner">
        <h4 className="font-semibold text-foreground text-sm mb-1">{name}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
    </div>
);

// Component for the important boxed warnings, mirroring the style
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
    const IconComponent = IconMap[icon as keyof typeof IconMap] || Leaf;

    // Determine the bullet color for list items (Red for Safety/Warning, Green for everything else)
    let bulletColor = 'bg-accent';
    if (icon === 'Safety' || icon === 'AlertTriangle' || type === 'warning') {
        bulletColor = 'bg-red-500'; 
    }

    return (
        <div className="bg-card p-5 rounded-lg border border-border/50 shadow-md">
            <h2 className="flex items-center text-xl font-bold mb-3 text-foreground">
                <IconComponent className="w-5 h-5 mr-3 text-accent" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {neighborhoods.map((n, index) => (
                        <NeighborhoodCard key={index} {...n} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- MAIN DETAIL COMPONENT (Styled) ---
const BlogPostDetail = ({ slug, onBack }: { slug: string | null, onBack: () => void }) => {
    if (!slug) return null;

    const post = fullPostData.find(p => slugify(p.title) === slug);
    const displayPost = post || blogPosts.find(p => slugify(p.title) === slug);

    if (!displayPost) return null;

    const content = post?.content || ["The full article content is coming soon! Check back later for details on this popular topic.", "In the meantime, feel free to browse our other guides or return to the list."];
    const detailedSections = post?.detailedSections || [];
    const retailerRecommendations = post?.retailerRecommendations || [];
    const hotelRecommendations = post?.hotelRecommendations || [];
    const neighborhoods = post?.neighborhoods || [];

    // Simple check to trigger the 'Major Guide' styling for the LA post
    const isMajorGuide = displayPost.title.includes("Los Angeles");

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
                            {displayPost.title.split(' ').slice(0, 2).join(' ')} <span className="text-accent">{displayPost.title.split(' ').slice(2).join(' ')}</span>
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
                {displayPost.title.includes("Los Angeles") && (
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
                                        <ul className="list-disc list-inside text-xs text-muted-foreground">
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


// The rest of the Blog component remains the same, using BlogPostDetail when selected
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
