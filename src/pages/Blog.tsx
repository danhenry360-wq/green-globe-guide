import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, User, ArrowRight,
  Sparkles, CheckCircle, AlertCircle, Globe, Zap, Users, Tag,
  TrendingUp, MessageSquare, BookOpen, Award, MapPin, Info,
  Shield, ChevronDown, Eye, Heart
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
        : "bg-accent hover:bg-accent/90"
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
    id: "amsterdam-guide-2025",
    title: "Amsterdam Cannabis Guide 2025",
    subtitle: "Navigate the coffeeshops, legal nuances, and best practices for travelers.",
    excerpt: "Your comprehensive guide to enjoying cannabis legally in Amsterdam, covering everything from famous coffeeshops to local etiquette.",
    date: "Jan 15, 2025",
    readTime: "8 min",
    author: "Sarah Mitchell",
    avatar: "👩‍✈️",
    category: "City Guide",
    tags: ["Netherlands", "Legal", "Travel", "Coffeeshops"],
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    views: 12400,
    likes: 3200,
  },
  {
    id: "colorado-dispensary-review",
    title: "Best Dispensaries in Colorado 2025",
    subtitle: "Curated list of premium dispensaries across Denver, Boulder, and Aspen.",
    excerpt: "Discover the top-rated dispensaries offering quality products, knowledgeable staff, and excellent customer service.",
    date: "Jan 10, 2025",
    readTime: "6 min",
    author: "James Chen",
    avatar: "👨‍💼",
    category: "Dispensary Reviews",
    tags: ["USA", "Colorado", "Dispensaries", "Reviews"],
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    views: 8900,
    likes: 2100,
  },
  {
    id: "canada-travel-regulations",
    title: "Cannabis Travel Regulations: Canada",
    subtitle: "Understanding import/export rules, provincial differences, and traveling safely.",
    excerpt: "Learn everything about bringing cannabis across borders, provincial laws, and best practices for responsible travel.",
    date: "Jan 5, 2025",
    readTime: "7 min",
    author: "Emma Rodriguez",
    avatar: "👩‍🔬",
    category: "Legal Updates",
    tags: ["Canada", "Legal", "Travel", "Regulations"],
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    views: 15600,
    likes: 4300,
  },
  {
    id: "microdosing-guide",
    title: "Beginner's Guide to Microdosing",
    subtitle: "Everything you need to know about low-dose cannabis use for wellness.",
    excerpt: "Explore microdosing techniques, benefits, and how to find your perfect minimal effective dose.",
    date: "Dec 28, 2024",
    readTime: "5 min",
    author: "Dr. Marcus Webb",
    avatar: "👨‍⚕️",
    category: "Education",
    tags: ["Wellness", "Microdosing", "Health", "Tips"],
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    views: 9200,
    likes: 2800,
  },
  {
    id: "europe-legal-landscape",
    title: "Cannabis Laws Across Europe",
    subtitle: "Country-by-country breakdown of legal status and what travelers need to know.",
    excerpt: "Navigate European cannabis regulations with our comprehensive country guide.",
    date: "Dec 20, 2024",
    readTime: "10 min",
    author: "Sophie Laurent",
    avatar: "👩‍⚖️",
    category: "Legal Updates",
    tags: ["Europe", "Legal", "Regulations", "International"],
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    views: 18900,
    likes: 5100,
  },
];

/* ---------- NAVIGATION ---------- */
const Navigation = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
      <div className="text-2xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
        BudQuest Journal
      </div>
      <nav className="hidden md:flex gap-6 text-sm text-gray-300">
        <a href="/" className="hover:text-green-400 transition">Home</a>
        <a href="/blog" className="hover:text-green-400 transition">Blog</a>
        <a href="/guides" className="hover:text-green-400 transition">Guides</a>
      </nav>
    </div>
  </header>
);

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="border-t border-white/10 mt-20 bg-black/40">
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-white mb-4">BudQuest</h3>
          <p className="text-sm text-gray-400">Your trusted cannabis travel companion.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-green-400 transition">City Guides</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Legal Updates</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Hotels</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-green-400 transition">About</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Legal</h4>
          <p className="text-xs text-gray-400">Always verify local laws before traveling.</p>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
        © 2025 BudQuest Journal. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ---------- STATS SECTION ---------- */
const StatsSection = () => {
  const stats = [
    { label: "Total Articles", end: 240, icon: BookOpen },
    { label: "Monthly Views", end: 2400000, icon: Eye },
    { label: "Reader Engagement", end: 94, icon: Heart },
    { label: "Contributors", end: 85, icon: Users },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-green-500/10 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.end > 999 ? `${Math.round(count / 1000)}k` : count}
                  {stat.label === "Reader Engagement" && "%"}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- ARTICLE CARD ---------- */
const ArticleCard = ({ post, onClick }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group cursor-pointer"
  >
    <Card className="p-0 overflow-hidden hover:border-green-500/30 transition-all hover:shadow-2xl hover:shadow-green-500/10 h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <div
          className="w-full h-full"
          style={{ backgroundImage: post.image }}
        />
        <Badge className="absolute top-4 left-4 bg-green-500/90 text-black font-bold">
          {post.category}
        </Badge>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} className="bg-white/5 text-gray-300 text-xs border border-white/10">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{post.avatar}</span>
            <div className="text-xs">
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-gray-500 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {post.views.toLocaleString()}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  </motion.div>
);

/* ---------- ARTICLE DETAIL ---------- */
const ArticleDetail = ({ post, onBack }: any) => (
  <div className="pt-24 pb-20 md:pt-32 md:pb-24">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex justify-between items-start mb-8">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white gap-2 p-0 h-auto">
          <ArrowLeft className="w-5 h-5" /> Back to Articles
        </Button>
        <Button size="icon" variant="outline" className="rounded-full">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge className="bg-green-500 text-black font-bold px-3 py-1.5 text-sm">
            {post.category}
          </Badge>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          {post.title}
        </h1>
        <div className="border-l-4 border-green-500/50 pl-6">
          <p className="text-lg text-gray-300 italic leading-relaxed">{post.subtitle}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-6 md:p-8 bg-green-500/5 border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xl">
              {post.avatar}
            </div>
            <div>
              <p className="font-semibold text-white">{post.author}</p>
              <p className="text-sm text-gray-400">Published {post.date}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose prose-invert max-w-none space-y-6 text-gray-300"
      >
        <p className="text-lg leading-8">
          {post.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Card className="p-6 bg-blue-500/5 border-blue-500/30">
          <div className="flex gap-4 items-start">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white mb-2">Key Takeaway</p>
              <p className="text-sm text-gray-400">
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
        className="mt-12 pt-8 border-t border-white/10"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Heart className="w-4 h-4" /> Like ({post.likes.toLocaleString()})
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <TrendingUp className="w-4 h-4" /> Read Similar Articles
          </Button>
        </div>
      </motion.div>
    </div>
  </div>
);

/* ---------- BLOG INDEX ---------- */
const BlogIndex = ({ onSelect }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "City Guide", "Legal Updates", "Dispensary Reviews", "Education"];

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
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-2 text-sm bg-green-500/10 text-green-400 border-green-500/30 w-fit mx-auto">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Expert Insights & Travel Guides
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            BudQuest Journal
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Deep-dive city guides, legal updates, and cannabis travel wisdom from our global community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-20 z-40 mb-12"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, guides, tags..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-500 transition-all"
            />
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "primary" : "outline"}
                className={`whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ArticleCard post={post} onClick={() => onSelect(post)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No articles found. Try adjusting your search.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- MAIN EXPORT ---------- */
export default function Blog() {
  const [activePost, setActivePost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navigation />

      <AnimatePresence mode="wait">
        {activePost ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArticleDetail post={activePost} onBack={() => setActivePost(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section
              className="relative min-h-[60vh] flex items-center justify-center px-4 pt-8 pb-8 overflow-hidden"
              role="banner"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-black to-black pointer-events-none" />
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[150px] animate-pulse" />
            </section>
            <BlogIndex onSelect={setActivePost} />
            <StatsSection />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
