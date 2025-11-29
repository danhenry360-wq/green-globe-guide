import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, ArrowRight,
  Sparkles, Eye, Heart, Tag, Info, TrendingUp
} from "lucide-react";

/* ---------- BLOG DATA ---------- */
const BLOG_POSTS = [
  {
    id: "amsterdam-coffee-shops",
    title: "Amsterdam Coffee Shops Guide 2025",
    subtitle: "Discover the best cannabis coffee shops, local etiquette, and legal tips.",
    excerpt: "Discover the best cannabis coffee shops, local etiquette, and legal tips for enjoying Amsterdam's world-famous cannabis culture.",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    author: "Sarah Mitchell",
    avatar: "👩‍✈️",
    category: "City Guide",
    tags: ["Netherlands", "Legal", "Travel", "Coffeeshops"],
    image: "/blog-amsterdam.jpg",
    views: 12400,
    likes: 3200,
    content: "Amsterdam's cannabis culture is world-renowned. From the iconic Red Light District to the peaceful Canal Belt, coffee shops are an integral part of the city's identity. This comprehensive guide covers everything you need to know about enjoying cannabis responsibly in Amsterdam.",
  },
  {
    id: "california-cannabis",
    title: "California Cannabis Travel Handbook",
    subtitle: "Complete guide to California dispensaries and regulations.",
    excerpt: "Complete guide to California dispensaries, legal regulations, and the best spots for cannabis tourism in the Golden State.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    author: "James Chen",
    avatar: "🌴",
    category: "City Guide",
    tags: ["USA", "California", "Dispensaries", "Reviews"],
    image: "/blog-california.jpg",
    views: 18900,
    likes: 5100,
    content: "California has one of the most developed cannabis markets in the world. With thousands of licensed dispensaries across the state, finding quality products and reliable shops is easier than ever.",
  },
  {
    id: "uruguay-legalization",
    title: "Uruguay: The First Legal Cannabis Nation",
    subtitle: "Deep dive into Uruguay's pioneering legalization model.",
    excerpt: "Deep dive into Uruguay's pioneering legalization model and what it means for cannabis travelers visiting South America.",
    date: "Jan 5, 2025",
    readTime: "10 min read",
    author: "Emma Rodriguez",
    avatar: "🇺🇾",
    category: "Legal Updates",
    tags: ["Uruguay", "Legal", "History", "International"],
    image: "/blog-uruguay.jpg",
    views: 15600,
    likes: 4300,
    content: "Uruguay became the first country in the world to fully legalize cannabis in 2013. This groundbreaking decision has shaped cannabis policy discussions globally and created a unique model for legal cannabis commerce.",
  },
  {
    id: "canada-regulations",
    title: "Canada: Provincial Cannabis Laws Explained",
    subtitle: "Navigate provincial differences and cross-border regulations.",
    excerpt: "Navigate provincial differences and cross-border regulations when traveling through Canada's diverse cannabis landscape.",
    date: "Dec 28, 2024",
    readTime: "7 min read",
    author: "Marcus Webb",
    avatar: "🍁",
    category: "Legal Updates",
    tags: ["Canada", "Legal", "Regulations", "Travel"],
    image: "/dest-canada-toronto.jpg",
    views: 14200,
    likes: 3800,
    content: "Canada's legal cannabis market is one of the largest in the world. However, regulations vary significantly by province. Understanding these differences is crucial for travelers.",
  },
  {
    id: "spain-laws",
    title: "Spain Cannabis Scene: What You Need to Know",
    subtitle: "Understanding Barcelona's unique cannabis culture.",
    excerpt: "Understanding Barcelona's unique cannabis club culture and Spain's complex legal landscape for tourists.",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    author: "Sophie Laurent",
    avatar: "🇪🇸",
    category: "City Guide",
    tags: ["Spain", "Legal", "Barcelona", "Culture"],
    image: "/dest-2.jpg",
    views: 9800,
    likes: 2400,
    content: "Spain has a unique approach to cannabis regulation. Private consumption is tolerated, and Barcelona has a thriving cannabis club scene unlike anywhere else in Europe.",
  },
  {
    id: "microdosing-guide",
    title: "Beginner's Guide to Microdosing",
    subtitle: "Low-dose cannabis use for wellness and productivity.",
    excerpt: "Low-dose cannabis use for wellness and productivity - learn how to microdose safely and effectively.",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    author: "Dr. Alex Chen",
    avatar: "⚕️",
    category: "Education",
    tags: ["Wellness", "Microdosing", "Health", "Tips"],
    image: "/dest-3.jpg",
    views: 11300,
    likes: 2900,
    content: "Microdosing has gained significant attention in recent years. Taking small, controlled amounts of cannabis can provide therapeutic benefits while minimizing intoxication.",
  },
];

/* ---------- ARTICLE CARD ---------- */
const ArticleCard = ({ post, onClick }: { post: typeof BLOG_POSTS[0]; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    className="group cursor-pointer h-full"
  >
    <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
      <div className="h-48 sm:h-52 overflow-hidden relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
          {post.category}
        </Badge>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs bg-background/50">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border/50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{post.avatar}</span>
            <div className="text-xs">
              <p className="text-foreground font-medium">{post.author}</p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" /> {(post.views / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  </motion.div>
);

/* ---------- ARTICLE DETAIL ---------- */
const ArticleDetail = ({ post, onBack }: { post: typeof BLOG_POSTS[0]; onBack: () => void }) => (
  <div className="pt-24 pb-20">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex justify-between items-start mb-8">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Articles
        </Button>
        <Button size="icon" variant="outline" className="rounded-full">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge className="bg-accent text-accent-foreground font-semibold">
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            {post.title}
          </span>
        </h1>
        <div className="border-l-4 border-accent pl-6">
          <p className="text-lg sm:text-xl text-muted-foreground italic leading-relaxed">{post.subtitle}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 rounded-2xl overflow-hidden"
      >
        <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <Card className="p-5 sm:p-6 bg-accent/5 border-accent/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-xl">
              {post.avatar}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">Published {post.date}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 text-muted-foreground mb-12"
      >
        <p className="text-lg leading-8 text-foreground/80">
          {post.content}
        </p>
        <p className="text-lg leading-8 text-foreground/80">
          Whether you're a seasoned cannabis enthusiast or a curious newcomer, understanding local regulations and cultural norms is essential for a safe and enjoyable experience. This guide provides comprehensive insights based on firsthand research and expert interviews.
        </p>

        <Card className="p-5 sm:p-6 bg-accent/5 border-accent/30">
          <div className="flex gap-4 items-start">
            <Info className="w-5 h-5 text-accent shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-foreground mb-2">Key Takeaway</p>
              <p className="text-sm text-muted-foreground">
                Always verify current local laws and regulations before planning your cannabis travel. Laws change frequently, and what's legal today may not be tomorrow.
              </p>
            </div>
          </div>
        </Card>

        <p className="text-lg leading-8 text-foreground/80">
          Remember to always consume responsibly, respect local customs, and be mindful of those around you. Cannabis tourism is growing rapidly, and being a respectful visitor helps ensure this freedom continues for future travelers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4"
      >
        <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
          <Heart className="w-4 h-4" /> Like ({post.likes.toLocaleString()})
        </Button>
        <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </motion.div>
    </div>
  </div>
);

/* ---------- STATS SECTION ---------- */
const StatsSection = () => {
  const stats = [
    { label: "Total Articles", value: "240+", icon: "📰" },
    { label: "Monthly Readers", value: "240K", icon: "👥" },
    { label: "Countries Covered", value: "50+", icon: "🌍" },
    { label: "Expert Writers", value: "45", icon: "✍️" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-accent/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- BLOG COMPONENT ---------- */
export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);

  const categories = ["All", "City Guide", "Legal Updates", "Education"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === "All" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArticleDetail post={activeArticle} onBack={() => setActiveArticle(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto max-w-4xl text-center relative z-10"
              >
                <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30">
                  <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
                  Expert Cannabis Travel Guides
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Cannabis Travel Blog
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Your trusted source for cannabis travel guides, legal updates, and destination insights from around the world.
                </p>

                {/* SEARCH BAR */}
                <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles, destinations, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-6 text-base bg-card/50 border-border/50 focus:border-accent rounded-full"
                  />
                </div>
              </motion.div>
            </section>

            {/* STATS */}
            <StatsSection />

            {/* CATEGORY FILTERS */}
            <section className="py-8 px-4">
              <div className="container mx-auto">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-5 ${
                        activeCategory === category 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:border-accent/50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED ARTICLE */}
            {filteredPosts.length > 0 && activeCategory === "All" && !searchTerm && (
              <section className="py-8 px-4">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveArticle(filteredPosts[0])}
                    className="cursor-pointer group"
                  >
                    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="h-64 md:h-80 overflow-hidden relative">
                          <img 
                            src={filteredPosts[0].image} 
                            alt={filteredPosts[0].title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:block hidden" />
                        </div>
                        <div className="p-6 sm:p-8 flex flex-col justify-center">
                          <Badge className="w-fit mb-4 bg-accent/10 text-accent border-accent/30">
                            <TrendingUp className="w-3 h-3 mr-1" /> Featured
                          </Badge>
                          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> {filteredPosts[0].date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" /> {(filteredPosts[0].views / 1000).toFixed(1)}k views
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="py-8 sm:py-12 px-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {activeCategory === "All" ? "Latest Articles" : activeCategory}
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeCategory === "All" && !searchTerm ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ArticleCard post={post} onClick={() => setActiveArticle(post)} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 sm:py-20 px-4">
              <div className="container mx-auto">
                <Card className="p-8 sm:p-12 bg-gradient-to-br from-accent/10 via-card to-gold/5 border-accent/20 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-5xl mb-4">🌿</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      Stay Updated on Cannabis Travel
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                      Get the latest guides, legal updates, and destination tips delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-background/50 border-border/50 rounded-full"
                      />
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
                        Subscribe
                      </Button>
                    </div>
                  </motion.div>
                </Card>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
