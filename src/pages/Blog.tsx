import React, { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Timer, AlertTriangle, Briefcase, Leaf, MapPin, Truck, Utensils, Hotel, CheckCircle, Info } from "lucide-react";

// --- Types (Simplified for brevity, assuming they are defined correctly) ---
interface BlogPost { /* ... */ }
interface RetailerRecommendation { /* ... */ }
interface HotelRecommendation { /* ... */ }

interface DetailedSection {
    icon: string; // E.g., 'Leaf', 'AlertTriangle'
    title: string;
    content: string | string[]; // Can be a paragraph or a list of bullet points
    type: 'paragraph' | 'list';
}

interface FullBlogPost extends BlogPost {
    content: string[];
    retailerRecommendations?: RetailerRecommendation[];
    hotelRecommendations?: HotelRecommendation[];
    detailedSections?: DetailedSection[]; // Detailed sections replacing the simple guideSections
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
    // Add new icons seen in guide screenshots
    'Legal': Briefcase, // Using Briefcase for legal/possession
    'Consumption': Utensils, // Using Utensils for consumption
    'Safety': AlertTriangle, // Using AlertTriangle for warnings
};

// --- START: FULL POST DATA SOURCE (Updated with DetailedSections) ---
const fullPostData: FullBlogPost[] = [
    {
        title: "Is Weed Legal in California in 2025?",
        excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.",
        image: "/blog-california.jpg",
        date: "Jan 15, 2025",
        category: "Legal Guide",
        readTime: "5 min read",
        author: "Alex Morgan",
        content: [
            "California has been at the forefront of cannabis legalization, and as we move into 2025, the laws remain largely consistent with previous years, offering both residents and tourists a clear framework for recreational use.",
            "Purchasing cannabis must be done through licensed dispensaries. Look for dispensaries displaying their state license to ensure you're buying safe, tested products. Many dispensaries also offer delivery services within their operational zones."
        ],
        detailedSections: [
            {
                icon: 'Legal',
                title: 'Legal Status',
                content: "Recreational cannabis fully legal since 2016. LA is the global cannabis capital with a mature, sophisticated market.",
                type: 'paragraph'
            },
            {
                icon: 'Legal',
                title: 'Age & Purchase Requirements',
                content: "21+ with government-issued ID. No medical card required for recreational. Out-of-state IDs accepted. Medical cardholders get tax savings.",
                type: 'paragraph'
            },
            {
                icon: 'Legal',
                title: 'Possession Limits',
                content: [
                    "1 oz flower or 8g concentrate.",
                    "6 living plants at home.",
                    "Unlimited possession at private residence."
                ],
                type: 'list'
            },
            {
                icon: 'Consumption',
                title: 'Where to Consume',
                content: [
                    "Private property; consumption lounges allowed locally (The Woods, Lowell Cafe).",
                    "Many 420-friendly hotels and Airbnbs.",
                    "**Public consumption is $100 citation.** (No beaches, parks, streets, or cars)."
                ],
                type: 'list'
            },
            {
                icon: 'Briefcase',
                title: 'Dispensary Information',
                content: "500+ licensed dispensaries throughout LA County. Average prices $30-60/eighth. MedMen, Stiizy, The Woods are premium options. Delivery services abundant (Eaze, Caliva). Hours typically 8am-10pm. Venice, Hollywood, Downtown, and Silver Lake have high concentrations.",
                type: 'paragraph'
            },
            {
                icon: 'Truck',
                title: 'Airport & Transportation Rules',
                content: [
                    "LAX officially permits cannabis in checked bags for California travel only.",
                    "BUT Federal law prohibits flying with cannabis anywhere.",
                    "TSA focuses on security threats, not cannabis, but if found may refer to law enforcement.",
                    "Do not fly with cannabis to be safe. No transport across state lines."
                ],
                type: 'list'
            },
            {
                icon: 'Safety',
                title: 'Safety Tips & Warnings',
                content: [
                    "Driving under influence is DUI - Uber/Lyft everywhere; LAPD does sobriety checkpoints.",
                    "Unlicensed shops exist - only buy from licensed dispensaries (check Bureau of Cannabis Control website).",
                    "Beach and park enforcement - lifeguards and park rangers will cite for consumption.",
                    "Some LA neighborhoods (Pasadena, Beverly Hills) have strict local ordinances – research before visiting."
                ],
                type: 'list'
            }
        ],
        retailerRecommendations: [
            { name: "The Pottery - Los Angeles", policy: "Premium dispensary in Mid-City known for its curated selection and stylish atmosphere.", menuLink: "https://thepottery.la/menu", license: "C10-0000001-LIC" },
            { name: "Barbary Coast - San Francisco", policy: "Historic San Francisco dispensary with a luxurious lounge experience.", menuLink: "https://barbarycoastdispensary.org/menu", license: "C10-0000002-LIC" }
        ]
    },
    // ... other posts remain the same ...
];
// --- END: FULL POST DATA SOURCE ---

// The list of all posts (used for the grid view)
const blogPosts: BlogPost[] = [ /* ... remains the same ... */ ];

// --- NEW COMPONENTS for Guide Feel ---

// Component for the important boxed warnings, mirroring the style
const ImportantBox = ({ type, children }: { type: 'intro' | 'legal', children: React.ReactNode }) => {
    // Styling based on Screenshot 2025-11-23 021049.png and image_df11a3.png
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
    } else { // type === 'legal' (Inline Legal Notice within sections)
        icon = <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />;
        title = "Important";
        // Styling the inner warning box like the one inside the Intro card
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

// Component for the major section cards, matching the dark aesthetic
const GuideSectionList = ({ icon, title, content, type }: DetailedSection) => {
    const IconComponent = IconMap[icon as keyof typeof IconMap] || Leaf;

    // Based on Los Angeles guide sections (Screenshot 2025-11-23 021057.png)
    return (
        <div className="bg-card p-5 rounded-lg border border-border/50 shadow-md">
            <h2 className="flex items-center text-xl font-bold mb-3 text-foreground">
                <IconComponent className="w-5 h-5 mr-3 text-accent" />
                {title}
            </h2>
            
            {type === 'paragraph' && (
                <p className="text-muted-foreground text-base leading-relaxed">{content}</p>
            )}
            
            {type === 'list' && Array.isArray(content) && (
                <ul className="space-y-2 text-muted-foreground list-none pl-0">
                    {content.map((point, index) => (
                        <li key={index} className="text-base flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-accent" />
                            <span className="leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- MAIN DETAIL COMPONENT (Refactored) ---
const BlogPostDetail = ({ slug, onBack }: { slug: string | null, onBack: () => void }) => {
    if (!slug) return null;

    const post = fullPostData.find(p => slugify(p.title) === slug);
    const displayPost = post || blogPosts.find(p => slugify(p.title) === slug);

    if (!displayPost) return null;

    const content = post?.content || ["The full article content is coming soon! Check back later for details on this popular topic.", "In the meantime, feel free to browse our other guides or return to the list."];
    const detailedSections = post?.detailedSections || [];
    const retailerRecommendations = post?.retailerRecommendations || [];
    const hotelRecommendations = post?.hotelRecommendations || [];

    return (
        <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                
                {/* Back Button */}
                <button onClick={onBack} className="text-sm text-accent hover:text-accent-foreground mb-8 flex items-center">
                    &larr; Back to all Articles
                </button>
                
                {/* Header and Metadata (Matching image_deff3d.jpg) */}
                <header className="text-center mb-10">
                    <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">{displayPost.category}</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{displayPost.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{displayPost.excerpt}</p>
                    
                    {/* Meta Line */}
                    <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mt-4 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-accent" /> <time dateTime={displayPost.date}>{displayPost.date}</time></span>
                        <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-accent" /> {displayPost.readTime}</span>
                        <span>By {displayPost.author}</span>
                    </div>
                </header>
                
                {/* Featured Image */}
                <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-10">
                    <img src={displayPost.image} alt={displayPost.title} className="w-full h-full object-cover" />
                </div>

                {/* --- Introduction Section (Matching image_df11a3.png / Screenshot 2025-11-23 021049.png) --- */}
                {/* We simulate the introduction text here using the ImportantBox component for styling consistency */}
                {post?.title.includes("California") && (
                    <section className="mb-10">
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

                {/* Article Content - Used for intro/narrative text */}
                <article className="max-w-none text-foreground space-y-6 mb-12">
                    {content.map((paragraph, index) => (
                        <p key={index} className="text-lg leading-relaxed text-muted-foreground/90">{paragraph}</p>
                    ))}
                </article>

                {/* --- DETAILED GUIDE SECTIONS (The Core Vibe) --- */}
                {detailedSections.length > 0 && (
                    <section className="mt-12 space-y-8">
                        {detailedSections.map((section, index) => (
                            <GuideSectionList key={index} {...section} />
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
                
                {/* --- IMPORTANT LEGAL NOTICE (Near Footer, as requested) --- */}
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
