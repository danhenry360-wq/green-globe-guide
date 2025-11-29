import { useState, useMemo } from "react";
import { 
  Search, X, Calendar, Clock, ArrowRight, Tag, User 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   MOCK DATA (Replace with API or CMS later)
----------------------------------------------------- */
const CATEGORIES = ["All", "Travel Tips", "Legal Updates", "Destinations", "Culture", "Health"];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Thailand Cannabis Laws: 2025 Update",
    excerpt: "Everything travelers need to know about the shifting regulations in Bangkok and Phuket. Is it still safe to smoke?",
    category: "Legal Updates",
    author: "Sarah Jenkins, Esq.",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "/dest-6.jpg", // Placeholder image path
    featured: true
  },
  {
    id: 2,
    title: "Top 10 Cannabis Lounges in West Hollywood",
    excerpt: "A curated guide to the most luxurious and chill consumption lounges in Los Angeles.",
    category: "Destinations",
    author: "Mike Ross",
    date: "Oct 22, 2024",
    readTime: "8 min read",
    image: "/dest-1.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Flying with CBD: A Global Guide",
    excerpt: "Can you bring CBD oil on a plane? We break down TSA rules and international customs regulations.",
    category: "Travel Tips",
    author: "Elena Fisher",
    date: "Oct 10, 2024",
    readTime: "6 min read",
    image: "/dest-4.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Germany's Cannabis Social Clubs Explained",
    excerpt: "How tourists can (and can't) access Germany's new legal market via social clubs.",
    category: "Legal Updates",
    author: "Hans Gruber",
    date: "Sep 30, 2024",
    readTime: "4 min read",
    image: "/dest-3.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Hiking High: The Best Trails in Colorado",
    excerpt: "Scenic trails where you can enjoy nature responsibly. Remember: Leave no trace.",
    category: "Culture",
    author: "Alex McCandless",
    date: "Sep 15, 2024",
    readTime: "7 min read",
    image: "/dest-2.jpg",
    featured: false
  },
  {
    id: 6,
    title: "The History of Charas in India",
    excerpt: "Exploring the ancient traditions of hand-rolled hashish in the Parvati Valley.",
    category: "Culture",
    author: "Priya Singh",
    date: "Aug 28, 2024",
    readTime: "10 min read",
    image: "/dest-5.jpg",
    featured: false
  },
];

/* ----------------------------------------------------
   SUB-COMPONENTS
----------------------------------------------------- */

const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all hover:shadow-green-400/20 hover:border-green-400/30 cursor-pointer h-full"
    )}
  >
    {/* Image Container */}
    <div className="relative h-48 w-full overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4">
        <Badge className="bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-green-500 hover:text-black transition-colors">
          {post.category}
        </Badge>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-grow">
      <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {post.date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <User className="w-3 h-3 text-green-400" />
          {post.author}
        </div>
        <span className="text-xs font-bold text-green-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  </motion.div>
);

/* ----------------------------------------------------
   MAIN PAGE
----------------------------------------------------- */
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Separate featured post if it exists in filtered results
  const featuredPost = filteredPosts.find(p => p.featured);
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-green-500/30">
      <Navigation />

      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* --- HEADER --- */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              BudQuest Journal
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              News, travel tips, and deep dives into global cannabis culture.
            </p>
          </div>

          {/* --- STICKY TOOLBAR (Search + Categories) --- */}
          <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-border/50 sm:rounded-xl sm:border transition-all">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-card/50 border-border/50 focus:ring-green-400"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Categories (Horizontal Scroll on Mobile) */}
              <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <div className="flex gap-2">
                  {CATEGORIES.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "whitespace-nowrap rounded-full border-border/50",
                        selectedCategory === cat 
                          ? "bg-green-500 text-black hover:bg-green-400" 
                          : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card"
                      )}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="min-h-[50vh]">
            {filteredPosts.length === 0 ? (
               <div className="text-center py-24">
                 <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-border/50">
                   <Search className="w-10 h-10 text-muted-foreground" />
                 </div>
                 <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
                 <p className="text-muted-foreground">Try adjusting your search or category.</p>
                 <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="mt-4 text-green-400">Clear filters</Button>
               </div>
            ) : (
              <div className="space-y-10">
                
                {/* Featured Post (Only show if 'All' or matches filter) */}
                {featuredPost && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group rounded-3xl border border-border/50 bg-card/30 overflow-hidden cursor-pointer hover:border-green-400/30 transition-all"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-64 md:h-auto overflow-hidden">
                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-green-500 text-black hover:bg-green-400">Featured</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                             <Calendar className="w-3 h-3" /> {featuredPost.date}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-foreground group-hover:text-green-400 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                          Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Grid Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
