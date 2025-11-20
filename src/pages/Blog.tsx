import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Is Weed Legal in California in 2025?",
      excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.",
      image: "/blog-california.jpg",
      date: "Jan 15, 2025",
      category: "Legal Guide"
    },
    {
      title: "Best 420-Friendly Hotels in Amsterdam",
      excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.",
      image: "/blog-amsterdam.jpg",
      date: "Jan 10, 2025",
      category: "Travel"
    },
    {
      title: "Uruguay Cannabis Laws: What Tourists Need to Know",
      excerpt: "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.",
      image: "/blog-uruguay.jpg",
      date: "Jan 5, 2025",
      category: "Legal Guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">Blog</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Cannabis Travel Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert guides, legal updates, and travel tips for cannabis enthusiasts worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all cursor-pointer group">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
