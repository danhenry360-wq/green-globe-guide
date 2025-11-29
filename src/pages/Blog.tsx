import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, ArrowRight,
  Sparkles, Eye, Heart, Tag, Info
} from "lucide-react";

/* ---------- REUSABLE COMPONENTS ---------- */
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${className}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, className, variant = "primary", size, disabled }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-lg transition-all ${size === "icon" ? "w-10 h-10" : "px-4 py-2.5"} ${
      variant === "ghost"
        ? "hover:bg-white/10"
        : variant === "outline"
        ? "border border-white/10 hover:border-accent/30"
        : "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
    } ${className} disabled:opacity-50`}
  >
    {children}
  </button>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

/* ---------- COUNT UP HOOK ---------- */
const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
};

/* ---------- BLOG DATA ---------- */
const BLOG_POSTS = [
  {
    id: "amsterdam-coffee-shops",
    title: "Amsterdam Coffee Shops Guide 2025",
    subtitle: "Discover the best cannabis coffee shops, local etiquette, and legal tips.",
    excerpt: "Discover the best cannabis coffee shops, local etiquette, and legal tips.",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    author: "Sarah Mitchell",
    avatar: "👩‍✈️",
    category: "City Guide",
    tags: ["Netherlands", "Legal", "Travel", "Coffeeshops"],
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    views: 12400,
    likes: 3200,
    content: "Amsterdam's cannabis culture is world-renowned. From the iconic Red Light District to the peaceful Canal Belt, coffee shops are an integral part of the city's identity. This comprehensive guide covers everything you need to know about enjoying cannabis responsibly in Amsterdam.",
  },
  {
    id: "california-cannabis",
    title: "California Cannabis Travel Handbook",
    subtitle: "Complete guide to California dispensaries and regulations.",
    excerpt: "Complete guide to California dispensaries and regulations.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    author: "James Chen",
    avatar: "🌴",
    category: "City Guide",
    tags: ["USA", "California", "Dispensaries", "Reviews"],
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    views: 18900,
    likes: 5100,
    content: "California has one of the most developed cannabis markets in the world. With thousands of licensed dispensaries across the state, finding quality products and reliable shops is easier than ever.",
  },
  {
    id: "uruguay-legalization",
    title: "Uruguay: The First Legal Cannabis Nation",
    subtitle: "Deep dive into Uruguay's pioneering legalization model.",
    excerpt: "Deep dive into Uruguay's pioneering legalization model.",
    date: "Jan 5, 2025",
    readTime: "10 min read",
    author: "Emma Rodriguez",
    avatar: "🇺🇾",
    category: "Legal Updates",
    tags: ["Uruguay", "Legal", "History", "International"],
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    views: 15600,
    likes: 4300,
    content: "Uruguay became the first country in the world to fully legalize cannabis in 2013. This groundbreaking decision has shaped cannabis policy discussions globally and created a unique model for legal cannabis commerce.",
  },
  {
    id: "canada-regulations",
    title: "Canada: Provincial Cannabis Laws Explained",
    subtitle: "Navigate provincial differences and cross-border regulations.",
    excerpt: "Navigate provincial differences and cross-border regulations.",
    date: "Dec 28, 2024",
    readTime: "7 min read",
    author: "Marcus Webb",
    avatar: "🍁",
    category: "Legal Updates",
    tags: ["Canada", "Legal", "Regulations", "Travel"],
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    views: 14200,
    likes: 3800,
    content: "Canada's legal cannabis market is one of the largest in the world. However, regulations vary significantly by province. Understanding these differences is crucial for travelers.",
  },
  {
    id: "spain-laws",
    title: "Spain Cannabis Scene: What You Need to Know",
    subtitle: "Understanding Barcelona's unique cannabis culture.",
    excerpt: "Understanding Barcelona's unique cannabis culture.",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    author: "Sophie Laurent",
    avatar: "🇪🇸",
    category: "City Guide",
    tags: ["Spain", "Legal", "Barcelona", "Culture"],
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    views: 9800,
    likes: 2400,
    content: "Spain has a unique approach to cannabis regulation. Private consumption is tolerated, and Barcelona has a thriving cannabis club scene unlike anywhere else in Europe.",
  },
  {
    id: "microdosing-guide",
    title: "Beginner's Guide to Microdosing",
    subtitle: "Low-dose cannabis use for wellness and productivity.",
    excerpt: "Low-dose cannabis use for wellness and productivity.",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    author: "Dr. Alex Chen",
    avatar: "⚕️",
    category: "Education",
    tags: ["Wellness", "Microdosing", "Health", "Tips"],
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    views: 11300,
    likes: 2900,
    content: "Microdosing has gained significant attention in recent years. Taking small, controlled amounts of cannabis can provide therapeutic benefits while minimizing intoxication.",
  },
];

/* ---------- ARTICLE CARD ---------- */
const ArticleCard = ({ post, onClick }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group cursor-pointer"
  >
    <Card className="p-0 overflow-hidden hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/20 h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <div
          className="w-full h-full"
          style={{ backgroundImage: post.image }}
        />
        <Badge className="absolute top-4 left-4 bg-accent/90 text-accent-foreground font-bold">
          {post.category}
        </Badge>
      </div>

      <div className="p-6 flex-1 flex flex-col">
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
            <Badge key={tag} className="bg-white/5 text-muted-foreground text-xs border border-white/10">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
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
const ArticleDetail = ({ post, onBack }: any) => (
  <div className="pt-8 pb-20 md:pt-12 md:pb-24">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex justify-between items-start mb-8">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground gap-2 p-0 h-auto">
          <ArrowLeft className="w-5 h-5" /> Back to Articles
        </Button>
        <Button size="icon" variant="outline" className="rounded-full">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge className="bg-accent text-accent-foreground font-bold px-3 py-1.5 text-sm">
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground">
          {post.title}
        </h1>
        <div className="border-l-4 border-accent/50 pl-6">
          <p className="text-xl text-muted-foreground italic leading-relaxed">{post.subtitle}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-6 md:p-8 bg-accent/5 border-accent/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-xl">
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
        className="prose prose-invert max-w-none space-y-6 text-muted-foreground mb-12"
      >
        <p className="text-lg leading-8 text-foreground/80">
          {post.content}
        </p>
        <p className="text-lg leading-8 text-foreground/80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <Card className="p-6 bg-blue-500/5 border-blue-500/30">
          <div className="flex gap-4 items-start">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-foreground mb-2">Key Takeaway</p>
              <p className="text-sm text-muted-foreground">
                Always verify current local laws and regulations before planning your cannabis travel.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-white/10 pt-8 flex flex-col sm:flex-row gap-4"
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
    { label: "Total Articles", end: 240 },
    { label: "Monthly Readers", end: 240000 },
    { label: "Avg. Read Time", end: 6 },
    { label: "Expert Contributors", end: 45 },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-accent/10 to-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const { ref, count } = useCountUp(stat.end);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <span className="text-accent text-lg font-bold">📊</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {stat.end > 999 ? `${Math.round(count / 1000)}k` : count}
                  {stat.label === "Avg. Read Time" && " min"}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
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
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent/30">
      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArticleDetail post={activeArticle} onBack={() => setActiveArticle(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO SECTION */}
            <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto max-w-4xl text-center relative z-10 px-2"
              >
                <Badge className="mb-3 sm:mb-4 px-4 py-2 text-xs sm:text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors w-fit mx-auto">
                  <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
                  Expert Insights & Global Guides
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3 sm:mb-4">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Cannabis Travel Guides & News
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                  Expert advice, legal tips, and dispensary guides for your next adventure
                </p>
              </motion.div>
            </section>

            {/* SEARCH & FILTER SECTION */}
            <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent to-accent/5">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto max-w-6xl"
              >
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles and guides..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted-foreground text-base transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      variant={activeCategory === category ? "primary" : "outline"}
                      className={`transition-all ${
                        activeCategory === category
                          ? ""
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* ARTICLES GRID */}
            <section className="py-12 sm:py-16 px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto max-w-6xl"
              >
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, i) => (
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground text-lg">No articles found. Try adjusting your search.</p>
                  </motion.div>
                )}
              </motion.div>
            </section>

            {/* STATS SECTION */}
            <StatsSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
