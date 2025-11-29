// Blog.tsx – single-file, drop-in, zero other imports needed
import { useState, useMemo } from "react";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, Shield, User, Scale,
  MapPin, Info, AlertTriangle, CheckCircle2, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ----------  DATE UTIL  ---------- */
const today = new Date();
const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const POST_DATE = (() => { const t = new Date(today); t.setDate(today.getDate() - 14); return formatDate(t); })();

/* ----------  DATA  ---------- */
const BIRMINGHAM_POST = {
  id: "birmingham-cannabis-guide",
  title: "Birmingham Cannabis Guide",
  subtitle: "Your essential guide to navigating the local cannabis scene in Birmingham, Alabama.",
  date: POST_DATE,
  readTime: "6 min read",
  author: "BudQuest Team",
  category: "Major City Guide",
  image: "/birmingham-hero.jpg",
  introTitle: "The Local Cannabis Scene",
  introText:
    "As the largest city, Birmingham is the cultural and economic hub of Alabama. While cannabis remains illegal, the city has a progressive—albeit cautious—atmosphere. Travelers should be extremely careful, as penalties are severe. Focus on the city’s vibrant food scene and civil-rights history instead of cannabis tourism.",
  warningTitle: "Important Legal Notice",
  warningText:
    "Cannabis is fully illegal in Alabama. Any amount is a misdemeanor or felony. Public consumption is strictly prohibited; consume only in private residences. Never drive under the influence and do not transport cannabis across state lines.",
  sections: [
    { title: "Legal Status", icon: Shield, content: "Alabama maintains some of the strictest cannabis laws in the U.S. Recreational use is completely illegal. Medical-use laws exist but are extremely narrow and do not cover tourists.", status: "Fully Illegal" },
    { title: "Possession Limits", icon: Scale, content: "There are no ‘safe’ possession limits. Any amount can trigger criminal charges. First-time small quantities may receive misdemeanor penalties, but any prior conviction or amounts over roughly 35 g can become a felony." },
    { title: "Where You Can Consume", icon: MapPin, content: "Consumption is strictly prohibited in public or in vehicles. The only theoretically ‘safe’ space is a private residence with explicit owner permission. There are no licensed consumption lounges.", tips: ["Never consume in parks, parking lots, or hotel balconies.", "Edibles still count as possession—don’t assume they’re safer.", "If staying with locals, ask permission first."] },
    { title: "Must-Know Local Rules", icon: User, content: "Birmingham police routinely enforce drug laws. Being caught within 1,000 ft of a school or housing project increases penalties. Paraphernalia (pipes, grinders) can add separate charges." },
    { title: "Dispensary & Product Access", icon: Info, content: "Alabama has no adult-use or tourist-friendly dispensaries. Nearby states (e.g., Mississippi) have relaxed laws, but bringing products back into Alabama is felony trafficking." }
  ]
} as const;

/* ----------  UI – Navigation  ---------- */
const Navigation = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-white">BudQuest</div>
      <nav className="hidden md:flex gap-6 text-sm text-gray-300">
        <a href="/" className="hover:text-green-400 transition">Home</a>
        <a href="/blog" className="hover:text-green-400 transition">Journal</a>
        <a href="/about" className="hover:text-green-400 transition">About</a>
      </nav>
    </div>
  </header>
);

/* ----------  UI – Footer  ---------- */
const Footer = () => (
  <footer className="border-t border-white/10 mt-20">
    <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} BudQuest Journal. All rights reserved.
    </div>
  </footer>
);

/* ----------  BLOG INDEX  ---------- */
const BlogIndex = ({ onSelect }: { onSelect: (p: typeof BIRMINGHAM_POST) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const visible = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return s
      ? [BIRMINGHAM_POST].filter((p) => p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s))
      : [BIRMINGHAM_POST];
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">BudQuest Journal</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Deep-dive city guides for the smart cannabis traveler.</p>
      </div>

      <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-black/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(post)}
            className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer shadow-lg hover:shadow-green-400/20 transition-all"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <Badge className="absolute top-4 left-4 bg-green-500 text-black font-bold hover:bg-green-400">{post.category}</Badge>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{post.introText}</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500">By {post.author}</span>
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ----------  ARTICLE DETAIL  ---------- */
const BlogPostDetail = ({ post, onBack }: { post: typeof BIRMINGHAM_POST; onBack: () => void }) => (
  <div className="pt-24 pb-20 md:pt-32 md:pb-24">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex justify-between items-start mb-8">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-white/10 p-0 h-auto gap-2"><ArrowLeft className="w-5 h-5" /> Back to Journal</Button>
        <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-400"><Share2 className="w-4 h-4" /></Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge className="bg-green-500 text-black font-bold hover:bg-green-400 px-3 py-1 text-sm border-none">{post.category}</Badge>
          <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">{post.title}</h1>
        <div className="border-l-4 border-green-500/50 pl-6"><p className="text-xl text-gray-300 italic leading-relaxed">{post.subtitle}</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
        <div className="rounded-2xl border border-green-500/50 bg-green-500/5 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
          <div className="flex items-center gap-3 mb-4"><Info className="w-6 h-6 text-green-400" /><h2 className="text-2xl font-bold text-green-400">{post.introTitle}</h2></div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.introText}</p>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-4 items-start">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
            <div>
              <span className="text-orange-500 font-bold block mb-1 text-sm uppercase tracking-wider">{post.warningTitle}</span>
              <p className="text-sm text-orange-200/80 leading-relaxed">{post.warningText}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {post.sections.map((section, idx) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-green-400"><section.icon className="w-6 h-6" /></div>
              <h3 className="text-2xl font-bold text-white">{section.title}</h3>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-green-500/30 transition-all shadow-lg">
              <p className="text-gray-300 leading-7 text-lg">{section.content}</p>
              {section.status && (
                <div className="mt-6"><Badge variant="outline" className="border-green-500 text-green-400 px-4 py-1.5 text-sm uppercase tracking-wide">Current Status: {section.status}</Badge></div>
              )}
              {section.tips && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                      <span className="text-sm text-gray-300 font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ----------  MAIN PAGE  ---------- */
export default function Blog() {
  const [activePost, setActivePost] = useState<typeof BIRMINGHAM_POST | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navigation />
      <AnimatePresence mode="wait">
        {activePost ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogPostDetail post={activePost} onBack={() => setActivePost(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogIndex onSelect={setActivePost} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
