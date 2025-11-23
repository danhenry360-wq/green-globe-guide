import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

// Blog Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime?: string;
  author?: string;
  tags?: string[];
  content?: string;
}

const Blog = () => {
  const router = useRouter();

  // Your blog data (kept exactly same)
  const blogPosts: BlogPost[] = [
    {
      id: "california-legal-guide-2025",
      title: "Is Weed Legal in California in 2025?",
      excerpt:
        "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.",
      image: "/blog-california.jpg",
      date: "Jan 15, 2025",
      category: "Legal Guide",
      readTime: "5 min read",
      author: "Alex Morgan",
    },
    {
      id: "amsterdam-420-hotels",
      title: "Best 420-Friendly Hotels in Amsterdam",
      excerpt:
        "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.",
      image: "/blog-amsterdam.jpg",
      date: "Jan 10, 2025",
      category: "Travel",
      readTime: "4 min read",
      author: "Sarah Chen",
    },
    {
      id: "uruguay-cannabis-laws",
      title: "Uruguay Cannabis Laws: What Tourists Need to Know",
      excerpt:
        "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.",
      image: "/blog-uruguay.jpg",
      date: "Jan 5, 2025",
      category: "Legal Guide",
      readTime: "6 min read",
      author: "Carlos Rodriguez",
    },
    {
      id: "creative-cannabis-strains",
      title: "Top 10 Cannabis Strains for Creative Work",
      excerpt:
        "Explore the best sativa strains that can enhance your creativity and focus.",
      image: "/blog-strains.jpg",
      date: "Dec 28, 2024",
      category: "Strains",
      readTime: "7 min read",
      author: "Jamie Taylor",
    },
    {
      id: "cannabis-meditation",
      title: "Cannabis and Meditation: A Perfect Pairing",
      excerpt:
        "How incorporating cannabis into your meditation practice can deepen your mindfulness experience.",
      image: "/blog-meditation.jpg",
      date: "Dec 22, 2024",
      category: "Wellness",
      readTime: "8 min read",
      author: "Maya Patel",
    },
    {
      id: "denver-420-activities",
      title: "420-Friendly Activities in Denver",
      excerpt:
        "From cannabis tours to consumption-friendly events, discover what to do in the Mile High City.",
      image: "/blog-denver.jpg",
      date: "Dec 18, 2024",
      category: "Travel",
      readTime: "5 min read",
      author: "Mike Johnson",
    },
  ];

  // Keep original logic
  const handleBlogClick = (id: string) => {
    const directRoutes = [
      "california-legal-guide-2025",
      "amsterdam-420-hotels",
      "uruguay-cannabis-laws",
    ];

    if (directRoutes.includes(id)) {
      window.open(`/blog/${id}`, "_blank");
    } else {
      const title = blogPosts.find((p) => p.id === id)?.title;
      alert(`Blog post "${title}" will be available soon!`);
    }
  };

  const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <Card
      className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all duration-300 cursor-pointer group flex flex-col"
      role="article"
      onClick={() => handleBlogClick(post.id)}
    >
      <div className="aspect-video bg-muted overflow-hidden">
        <img
          src={post.image}
          alt={`${post.title} cover image`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading={index < 2 ? "eager" : "lazy"}
        />
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="outline" className="text-xs bg-primary/5">
            {post.category}
          </Badge>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <time>{post.date}</time>
          </div>

          {post.readTime && (
            <span className="text-xs text-muted-foreground ml-auto">
              {post.readTime}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="mt-4 pt-3 border-t border-border/50">
          {post.author && (
            <p className="text-xs text-muted-foreground">By {post.author}</p>
          )}

          {index < 3 && (
            <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs mt-2">
              Read Full Article
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {/* SEO — ZERO DEPENDENCIES */}
      <Head>
        <title>
          Cannabis Travel Blog | Guides, Laws, 420-Friendly Hotels & Tips
        </title>
        <meta
          name="description"
          content="Global cannabis travel insights: legal guides, 420-friendly hotels, expert tips, and destination reviews."
        />
        <link rel="canonical" href="https://yourdomain.com/blog" />

        {/* OpenGraph */}
        <meta property="og:title" content="Cannabis Travel Insights & Guides" />
        <meta
          property="og:description"
          content="Expert cannabis travel guides, legal updates and destination insights."
        />
        <meta property="og:url" content="https://yourdomain.com/blog" />
        <meta property="og:image" content="/og-blog.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cannabis Travel Blog" />
        <meta
          name="twitter:description"
          content="Expert cannabis travel guides, legal updates and destination insights."
        />
        <meta name="twitter:image" content="/og-blog.jpg" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 sm:pt-28 pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Header */}
            <section className="text-center mb-12 sm:mb-16">
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 text-sm">
                Blog
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Cannabis Travel Insights
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
                Expert guides, legal updates, and travel tips for cannabis
                enthusiasts worldwide.
              </p>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg max-w-xl mx-auto">
                <p className="text-sm text-accent font-medium">
                  🎉 First three articles are now available!
                </p>
              </div>
            </section>

            {/* Grid */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </section>

            {/* Load More */}
            <section className="text-center mt-12">
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition">
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
    </>
  );
};

export default Blog;
