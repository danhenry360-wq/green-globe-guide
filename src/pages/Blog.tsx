import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Timer } from "lucide-react";
import { Card } from "@/components/ui/card"; // Added Card for retailer block styling

// --- START: Sample Data to display on the detail page ---
// NOTE: In a real app, this data would be fetched from a CMS/API using the URL slug.
const sampleFullPosts = [
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
    // Add more full articles here later...
];
// --- END: Sample Data ---


// Helper function to create a clean URL slug from the title
const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
};

// NOTE: This assumes the slug is passed in as a prop in your routing system
// For this example, we'll hardcode one slug for demonstration purposes.
const currentSlug = "dispensaries-near-lax-the-ultimate-guide-for-arrivals";


const BlogPostDetail = () => {
    // 1. Find the post that matches the current URL slug
    const post = sampleFullPosts.find(p => slugify(p.title) === currentSlug);
    
    // 2. Handle the real 404 (if the data isn't found)
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center bg-background">
                <h1 className="text-6xl font-bold text-accent">404</h1>
                <p className="text-xl text-muted-foreground mt-4">Article Not Found</p>
                <p className="text-sm text-foreground mt-2">The guide you are looking for may have been removed or the link is incorrect.</p>
            </div>
        );
    }

    // 3. Render the full post details
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            
            <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    
                    {/* Header and Metadata */}
                    <header className="text-center mb-10">
                        <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">{post.category}</Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{post.excerpt}</p>
                        
                        {/* Meta Line */}
                        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mt-4 flex-wrap">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> <time dateTime={post.date}>{post.date}</time></span>
                            <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {post.readTime}</span>
                            <span>By {post.author}</span>
                        </div>
                    </header>
                    
                    {/* Featured Image */}
                    <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-10">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Article Content */}
                    <article className="max-w-none text-foreground space-y-6">
                        {post.content.map((paragraph, index) => (
                            <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                        ))}
                    </article>

                    <hr className="my-10 border-border/50" />

                    {/* Retailer Recommendations (The Monetization Section) */}
                    <section className="mt-12">
                        <h2 className="text-3xl font-bold mb-6 text-foreground">✈️ Nearest Verified Dispensaries</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {post.retailerRecommendations.map((retailer, index) => (
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPostDetail;
