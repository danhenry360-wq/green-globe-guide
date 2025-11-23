import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

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

interface BlogCategory {
  name: string;
  count: number;
}

const Blog = () => {
  // Configurable constants for easy maintenance
  const BLOG_CONFIG = {
    postsPerPage: 6,
    featuredPostsCount: 3,
    categories: ['Legal Guide', 'Travel', 'Culture', 'Strains', 'Wellness', 'Local LA'] as const
  };

  // Helper function to create a clean URL slug from the title
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Sample data - in real app, this would come from CMS/API
  const blogPosts: BlogPost[] = [
    // --- Existing Posts ---
    {
      title: "Is Weed Legal in California in 2025?",
      excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.",
      image: "/blog-california.jpg",
      date: "Jan 15, 2025",
      category: "Legal Guide",
      readTime: "5 min read",
      author: "Alex Morgan",
      tags: ["california", "legal", "travel", "recreational"]
    },
    {
      title: "Best 420-Friendly Hotels in Amsterdam",
      excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.",
      image: "/blog-amsterdam.jpg",
      date: "Jan 10, 2025",
      category: "Travel",
      readTime: "4 min read",
      author: "Sarah Chen",
      tags: ["amsterdam", "hotels", "accommodation", "coffee-shops"]
    },
    {
      title: "Uruguay Cannabis Laws: What Tourists Need to Know",
      excerpt: "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.",
      image: "/blog-uruguay.jpg",
      date: "Jan 5, 2025",
      category: "Legal Guide",
      readTime: "6 min read",
      author: "Carlos Rodriguez",
      tags: ["uruguay", "legal", "south-america", "regulations"]
    },
    {
      title: "Top 10 Cannabis Strains for Creative Work",
      excerpt: "Explore the best sativa strains that can enhance your creativity and focus.",
      image: "/blog-strains.jpg",
      date: "Dec 28, 2024",
      category: "Strains",
      readTime: "7 min read",
      author: "Jamie Taylor",
      tags: ["strains", "sativa", "creativity", "productivity"]
    },
    {
      title: "Cannabis and Meditation: A Perfect Pairing",
      excerpt: "How incorporating cannabis into your meditation practice can deepen your mindfulness experience.",
      image: "/blog-meditation.jpg",
      date: "Dec 22, 2024",
      category: "Wellness",
      readTime: "8 min read",
      author: "Maya Patel",
      tags: ["wellness", "meditation", "mindfulness", "health"]
    },
    {
      title: "420-Friendly Activities in Denver",
      excerpt: "From cannabis tours to consumption-friendly events, discover what to do in the Mile High City.",
      image: "/blog-denver.jpg",
      date: "Dec 18, 2024",
      category: "Travel",
      readTime: "5 min read",
      author: "Mike Johnson",
      tags: ["denver", "activities", "tours", "colorado"]
    },
    // --- NEW High-Priority LA-Focused Posts with Placeholder Images ---
    {
      title: "Dispensaries Near LAX: The Ultimate Guide for Arrivals",
      excerpt: "Just landed in LA? Find out which verified dispensaries are closest to the airport and offer the quickest pickup.",
      image: "/blog-lax-dispensary.jpg", 
      date: "Feb 5, 2025",
      category: "Local LA",
      readTime: "3 min read",
      author: "Alex Morgan",
      tags: ["LAX", "los-angeles", "airport", "dispensary"]
    },
    {
      title: "LA's Best Edibles: Shopping for First-Timers & Low-Dose Users",
      excerpt: "A guide to finding safe, tested, and enjoyable edibles in Los Angeles, including dosage tips and menu links.",
      image: "/blog-la-edibles.jpg", 
      date: "Feb 1, 2025",
      category: "Strains",
      readTime: "6 min read",
      author: "Jamie Taylor",
      tags: ["edibles", "low-dose", "safety", "LA"]
    },
    {
      title: "The Night Owl Guide: Finding Dispensaries Open After 10 PM in Hollywood",
      excerpt: "Everything you need to know about late-night cannabis shopping and legal delivery options across Hollywood and WeHo.",
      image: "/blog-hollywood-nightlife.jpg", 
      date: "Jan 28, 2025",
      category: "Local LA",
      readTime: "4 min read",
      author: "Sarah Chen",
      tags: ["hollywood", "late-night", "delivery", "weho"]
    },
  ];

  const featuredPosts = blogPosts.slice(0, BLOG_CONFIG.featuredPostsCount);

  // Helper function for responsive grid columns
  const getGridColumns = () => {
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
  };

  // Blog post card component for reusability
  const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
        // Function to handle the click and navigate to the detail page
        const handleCardClick = () => {
            const slug = slugify(post.title);
            // This is the cleanest way to navigate without external routing libraries
            // In a live app, you'd use a routing method like `router.push()` or `<Link>`
            window.location.href = `/blog/${slug}`;
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
