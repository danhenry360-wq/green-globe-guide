import React, { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Timer } from "lucide-react";

// Types for better scalability
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

// Interface for the full article content
interface FullBlogPost extends BlogPost {
    content: string[];
    retailerRecommendations: RetailerRecommendation[];
}

interface RetailerRecommendation {
    name: string;
    policy: string;
    menuLink: string;
    license: string;
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

// --- START: FULL POST DATA SOURCE (Simulating API/CMS fetch) ---
const fullPostData: FullBlogPost[] = [
    {
        title: "Dispensaries Near LAX: The Ultimate Guide for Arrivals",
        excerpt: "Just landed in LA? Find out which verified dispensaries are closest to the airport and offer the quickest pickup.",
        image: "/blog-lax-dispensary.jpg",
        date: "Feb 5, 2025",
        category: "Local LA",
        readTime: "3 min read",
        author: "Alex Morgan",
        content: [
            "Welcome to Los Angeles! Landing at **LAX** can be overwhelming, but finding a legal, verified dispensary shouldn't be. Your first priority should be safety and compliance. Remember that cannabis consumption is **illegal in public places** in California, including federal property like the airport. Do not consume in your rental car or airport parking lot.",
            "Our guide focuses on locations in **Hawthorne and Inglewood**, which are just outside the immediate airport radius and offer quick access via ride-share. These retailers are perfect for a fast stop before heading to your 420-friendly accommodation. Always have your **valid government ID** ready—tourists must show an ID confirming they are 21 or older.",
            "We highly recommend checking the live menus before you go. Prices and inventory change frequently, and pre-ordering online is the fastest way to get in and out, minimizing your travel downtime."
        ],
        retailerRecommendations: [
            {
                name: "MedMen LAX",
                policy: "This location is the **closest major dispensary** to the airport and the rental car center area. Perfect for a quick, efficient purchase on your way out of the area.",
                menuLink: "https://www.medmen.com/menu/lax", // The critical Menu Link!
                license: "C10-0000123-LIC"
            },
            {
                name: "The Artist Tree - Hawthorne",
                policy: "A great stop if you are heading south toward Orange County or are looking for a **wider variety** of local California flower strains. Excellent customer service.",
                menuLink: "https://www.leafly.com/dispensary/artist-tree-hawthorne", // The critical Menu Link!
                license: "C10-0000456-LIC"
            },
             {
                name: "Cookies Inglewood",
                policy: "Known for its **powerful brand name** and exclusive genetics. A solid choice for experienced users who know what strains they are looking for.",
                menuLink: "https://weedmaps.com/dispensaries/cookies-inglewood", // Another critical Menu Link!
                license: "C10-0000789-LIC"
            }
        ]
    },
    // Add full details for other posts here as you create the content. 
    // For now, they will just show a simple "Coming Soon" if clicked.
];
// --- END: FULL POST DATA SOURCE ---

// The list of all posts (used for the grid view)
const blogPosts: BlogPost[] = [
    { title: "Is Weed Legal in California in 2025?", excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.", image: "/blog-california.jpg", date: "Jan 15, 2025", category: "Legal Guide", readTime: "5 min read", author: "Alex Morgan", tags: ["california", "legal", "travel", "recreational"] },
    { title: "Best 420-Friendly Hotels in Amsterdam", excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.", image: "/blog-amsterdam.jpg", date: "Jan 10, 2025", category: "Travel", readTime: "4 min read", author: "Sarah Chen", tags: ["amsterdam", "hotels", "accommodation", "coffee-shops"] },
    { title: "Uruguay Cannabis Laws: What Tourists Need to Know", excerpt: "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.", image: "/blog-uruguay.jpg", date: "Jan 5, 2025", category: "Legal Guide", readTime: "6 min read", author: "Carlos Rodriguez", tags: ["uruguay", "legal", "south-america", "regulations"] },
    { title: "Top 10 Cannabis Strains for Creative Work", excerpt: "Explore the best sativa strains that can enhance your creativity and focus.", image: "/blog-strains.jpg", date: "Dec 28, 2024", category: "Strains", readTime: "7 min read", author: "Jamie Taylor", tags: ["strains", "sativa", "creativity", "productivity"] },
    { title: "Cannabis and Meditation: A Perfect Pairing", excerpt: "How incorporating cannabis into your meditation practice can deepen your mindfulness experience.", image: "/blog-meditation.jpg", date: "Dec 22, 2024", category: "Wellness", readTime: "8 min read", author: "Maya Patel", tags: ["wellness", "meditation", "mindfulness", "health"] },
    { title: "420-Friendly Activities in Denver", excerpt: "From cannabis tours to consumption-friendly events, discover what to do in the Mile High City.", image: "/blog-denver.jpg", date: "Dec 18, 2024", category: "Travel", readTime: "5 min read", author: "Mike Johnson", tags: ["denver", "activities", "tours", "colorado"] },
    { title: "Dispensaries Near LAX: The Ultimate Guide for Arrivals", excerpt: "Just landed in LA? Find out which verified dispensaries are closest to the airport and offer the quickest pickup.", image: "/blog-lax-dispensary.jpg", date: "Feb 5, 2025", category: "Local LA", readTime: "3 min read", author: "Alex Morgan", tags: ["LAX", "los-angeles", "airport", "dispensary"] },
    { title: "LA's Best Edibles: Shopping for First-Timers & Low-Dose Users", excerpt: "A guide to finding safe, tested, and enjoyable edibles in Los Angeles, including dosage tips and menu links.", image: "/blog-la-edibles.jpg", date: "Feb 1, 2025", category: "Strains", readTime: "6 min read", author: "Jamie Taylor", tags: ["edibles", "low-dose", "safety", "LA"] },
    { title: "The Night Owl Guide: Finding Dispensaries Open After 10 PM in Hollywood", excerpt: "Everything you need to know about late-night cannabis shopping and legal delivery options across Hollywood and WeHo.", image: "/blog-hollywood-nightlife.jpg", date: "Jan 28, 2025", category: "Local LA", readTime: "4 min read", author: "Sarah Chen", tags: ["hollywood", "late-night", "delivery", "weho"] },
];


const BlogPostDetail = ({ slug, onBack }: { slug: string | null, onBack: () => void }) => {
    if (!slug) return null; // Should not happen if this component is rendered

    // Find the full post data
    const post = fullPostData.find(p => slugify(p.title) === slug);
    const originalPost = blogPosts.find(p => slugify(p.title) === slug);

    // Default to the original post data if full details aren't ready (e.g., if you click a post without a full content entry)
    const displayPost = post || originalPost;

    if (!displayPost) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center bg-background">
                <h1 className="text-6xl font-bold text-accent">404</h1>
                <p className="text-xl text-muted-foreground mt-4">Article Not Found</p>
                <button onClick={onBack} className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Go Back to Blog</button>
            </div>
        );
    }

    const content = post ? post.content : ["The full article content is coming soon! Check back later for details on this popular topic.", "In the meantime, feel free to browse our other guides or return to the list."];
    const recommendations = post ? post.retailerRecommendations : [];


    return (
        <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                
                {/* Back Button */}
                <button onClick={onBack} className="text-sm text-accent hover:text-accent-foreground mb-8 flex items-center">
                    &larr; Back to all Articles
                </button>
                
                {/* Header and Metadata */}
                <header className="text-center mb-10">
                    <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">{displayPost.category}</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{displayPost.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{displayPost.excerpt}</p>
                    
                    {/* Meta Line */}
                    <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mt-4 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> <time dateTime={displayPost.date}>{displayPost.date}</time></span>
                        <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {displayPost.readTime}</span>
                        <span>By {displayPost.author}</span>
                    </div>
                </header>
                
                {/* Featured Image */}
                <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-10">
                    <img src={displayPost.image} alt={displayPost.title} className="w-full h-full object-cover" />
                </div>

                {/* Article Content */}
                <article className="max-w-none text-foreground space-y-6">
                    {content.map((paragraph, index) => (
                        <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                    ))}
                </article>

                {/* Retailer Recommendations (The Monetization Section) - Only render if available */}
                {recommendations.length > 0 && (
                    <section className="mt-12">
                        <hr className="my-10 border-border/50" />
                        <h2 className="text-3xl font-bold mb-6 text-foreground">✈️ Nearest Verified Dispensaries</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recommendations.map((retailer, index) => (
                                <Card key={index} className="bg-gradient-card p-6 border border-border/50 shadow-lg flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-accent">{retailer.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1">{retailer.policy}</p>
                                    
                                    {/* CRITICAL: The Menu Link Button */}
                                    <a
                                        href={retailer.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        View Live Menu & Order
                                    </a>
                                    
                                    {/* Verification Detail */}
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
            </div>
        </main>
    );
};


const Blog = () => {
  // State to manage which post is currently selected for the detail view
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  // Configurable constants for easy maintenance
  const BLOG_CONFIG = {
    postsPerPage: 6,
    featuredPostsCount: 3,
    categories: ['Legal Guide', 'Travel', 'Culture', 'Strains', 'Wellness', 'Local LA'] as const
  };

  // Helper function for responsive grid columns
  const getGridColumns = () => {
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
  };

  // Blog post card component for reusability
  const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
        // Function to handle the click and set the state
        const handleCardClick = () => {
            const slug = slugify(post.title);
            setSelectedPostSlug(slug);
        };

        return (
            <Card 
                className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all duration-300 cursor-pointer group h-full flex flex-col"
                role="article"
                aria-label={`Blog post: ${post.title}`}
                // Attach the click handler to the entire card
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
                            <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
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
