import { useState, useMemo } from "react";
import { 
  Search, X, ArrowLeft, Calendar, Clock, Share2, 
  Shield, User, Scale, MapPin, Info, AlertTriangle, 
  CheckCircle2, ChevronRight, BookOpen 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------
   DATA MODEL & CONTENT (3 Full Posts)
----------------------------------------------------- */
const BLOG_DATA = [
  {
    id: "thailand-guide-2025",
    title: "Thailand Cannabis Guide: 2025 Rules & Reality",
    subtitle: "Your essential guide to navigating the shifting cannabis scene in Bangkok, Phuket, and Chiang Mai.",
    date: "Nov 15, 2024",
    readTime: "8 min read",
    author: "Sarah Jenkins, Esq.",
    category: "Major Guide",
    image: "/dest-6.jpg", // Ensure this image exists
    introTitle: "Introduction to Thailand 2025",
    introText: "Thailand remains the cannabis capital of Asia, but the 'Wild West' days of 2022 are over. The new Cannabis Act is tightening regulations on recreational use. This guide explains exactly what you can and cannot do as a tourist in 2025.",
    warningTitle: "TRAFFIC & LEGAL WARNING",
    warningText: "Important: Public smoking is strictly banned (fines up to 25,000 THB). Always consume within designated dispensary lounges or private residences.",
    sections: [
      {
        title: "Legal Status",
        icon: Shield,
        content: "Cannabis was delisted as a narcotic in 2022, making it legal to sell and consume. However, the new government is pushing to restrict 'recreational use' in favor of 'medical use'. Currently, dispensaries remain open, but they now require strict licensing.",
        status: "Recreational / Medical Hybrid"
      },
      {
        title: "Age & Purchase Requirements",
        icon: User,
        content: "You must be 20 years or older to purchase cannabis flower or products. Sales to pregnant women and breastfeeding mothers are prohibited. Most high-end dispensaries will scan your passport upon entry.",
      },
      {
        title: "Possession Limits",
        icon: Scale,
        content: "There is currently no strict possession limit for personal use flower. However, extracts and edibles (like gummies) must contain less than 0.2% THC by weight.",
      },
      {
        title: "Where to Consume",
        icon: MapPin,
        content: "This is the most important rule: Smoking in public places (streets, beaches, parks, hotel balconies) is a 'public nuisance' crime.",
        tips: ["Use designated smoking rooms.", "Edibles are preferred for discretion.", "Ask your hotel about their policy."]
      }
    ]
  },
  {
    id: "germany-legalization-update",
    title: "Germany's Cannabis Clubs: A Tourist Guide",
    subtitle: "Germany has legalized possession, but buying isn't simple. Here is how the 'Social Club' model actually works.",
    date: "Oct 22, 2024",
    readTime: "6 min read",
    author: "Hans Gruber",
    category: "Legal Update",
    image: "/dest-3.jpg",
    introTitle: "Germany's New Era",
    introText: "As of April 1, 2024, Germany became the largest EU nation to legalize cannabis possession. However, unlike Canada or Thailand, there are no commercial shops. The system relies on non-profit 'Social Clubs'.",
    warningTitle: "RESIDENCY REQUIREMENT",
    warningText: "Tourists CANNOT legally buy from Social Clubs. These clubs require 6 months of German residency to join. Do not expect to walk into a shop and buy bud.",
    sections: [
      {
        title: "Legal Status",
        icon: Shield,
        content: "Possession of up to 25g in public and 50g at home is legal for adults 18+. Public consumption is legal but restricted near schools and sports facilities (100m buffer zone).",
        status: "Decriminalized / Home Grow"
      },
      {
        title: "The 'Tourist Trap'",
        icon: AlertTriangle,
        content: "Since you cannot buy legally as a tourist, you are stuck in a loop: Possession is legal, but acquisition is not. Be extremely wary of street dealers; police still target illegal sales.",
      },
      {
        title: "Where to Consume",
        icon: MapPin,
        content: "Smoking is banned in pedestrian zones between 7 AM and 8 PM. Beer gardens generally prohibit smoking cannabis. Your best bet is private property or secluded parks away from children.",
        tips: ["Respect the 100m school buffer.", "Don't smoke in beer gardens.", "Carrying more than 25g is a crime."]
      }
    ]
  },
  {
    id: "california-roadtrip",
    title: "California Dreamin': The Ultimate 420 Roadtrip",
    subtitle: "From San Francisco lounges to Humboldt farms. The perfect itinerary for the modern canna-seur.",
    date: "Sep 10, 2024",
    readTime: "12 min read",
    author: "Elena Fisher",
    category: "Destinations",
    image: "/dest-1.jpg",
    introTitle: "The Golden State Standard",
    introText: "California isn't just a state; it's the global epicenter of cannabis culture. This guide takes you down PCH 1, stopping at the world's most luxurious dispensaries and sun-soaked consumption lounges.",
    warningTitle: "FEDERAL LAND WARNING",
    warningText: "Do not bring cannabis into National Parks (Yosemite, Joshua Tree). These are federal land, and possession is still a federal crime with heavy fines.",
    sections: [
      {
        title: "West Hollywood (WeHo)",
        icon: MapPin,
        content: "WeHo is the 'Amsterdam of America'. Visit the Woods (Woody Harrelson's lounge) for a premium garden experience, or the Artist Tree for a rooftop smoke session.",
        status: "Consumption Lounges Open"
      },
      {
        title: "Purchase Limits",
        icon: Scale,
        content: "Adults 21+ can purchase up to 1 ounce (28.5g) of flower and 8g of concentrate per day. Taxes are high (approx 30%), so bring cash, though many shops now take debit.",
      },
      {
        title: "Driving Rules",
        icon: Shield,
        content: "DUI laws are strict. It is illegal to consume while driving or riding as a passenger. Keep products sealed in the trunk while the vehicle is moving.",
        tips: ["Keep receipts.", "Don't open packages in the car.", "Rentals usually ban smoking."]
      }
    ]
  }
];

/* ----------------------------------------------------
   COMPONENT 1: BLOG LIST (The Index)
----------------------------------------------------- */
const BlogIndex = ({ onSelect }: { onSelect: (post: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => 
    BLOG_DATA.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
  [searchTerm]);

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          BudQuest Journal
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          News, travel tips, and deep dives into global cannabis culture.
        </p>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-20 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8 bg-background/95 backdrop-blur-xl border-b border-white/10 sm:rounded-xl sm:border">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(post)}
            className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer shadow-lg hover:shadow-green-400/20 transition-all"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <Badge className="absolute top-4 left-4 bg-green-500 text-black font-bold hover:bg-green-400">
                {post.category}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {post.introText}
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500">By {post.author}</span>
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                  Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   COMPONENT 2: ARTICLE DETAIL (Screenshot Style)
----------------------------------------------------- */
const BlogPostDetail = ({ post, onBack }: { post: typeof BLOG_DATA[0]; onBack: () => void }) => {
  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-24">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* 1. Meta Header */}
        <div className="flex justify-between items-start mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-0 h-auto gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Journal
          </Button>
          <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-400">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* 2. Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
             <Badge className="bg-green-500 text-black font-bold hover:bg-green-400 px-3 py-1 text-sm border-none">
                {post.category}
             </Badge>
             <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.date}
             </span>
             <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
             </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
            {post.title}
          </h1>
          
          <div className="border-l-4 border-green-500/50 pl-6">
             <p className="text-xl text-gray-300 italic leading-relaxed">
               {post.subtitle}
             </p>
          </div>
        </motion.div>

        {/* 3. Intro Card (Matches Screenshot) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="rounded-2xl border border-green-500/50 bg-green-500/5 p-6 md:p-8 relative overflow-hidden">
            {/* Side accent line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
            
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-green-400">{post.introTitle}</h2>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {post.introText}
            </p>

            {/* Warning Box */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-4 items-start">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
              <div>
                <span className="text-orange-500 font-bold block mb-1 text-sm uppercase tracking-wider">
                  {post.warningTitle}
                </span>
                <p className="text-sm text-orange-200/80 leading-relaxed">
                  {post.warningText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Sections */}
        <div className="space-y-8">
          {post.sections.map((section, idx) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Icon Box */}
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-green-400">
                  <section.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{section.title}</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-green-500/30 transition-all shadow-lg">
                <p className="text-gray-300 leading-7 text-lg">
                  {section.content}
                </p>
                
                {section.status && (
                  <div className="mt-6">
                    <Badge variant="outline" className="border-green-500 text-green-400 px-4 py-1.5 text-sm uppercase tracking-wide">
                      Current Status: {section.status}
                    </Badge>
                  </div>
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
};

/* ----------------------------------------------------
   MAIN CONTROLLER
----------------------------------------------------- */
const Blog = () => {
  const [activePost, setActivePost] = useState<typeof BLOG_DATA[0] | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navigation />
      
      <AnimatePresence mode="wait">
        {activePost ? (
          <motion.div 
            key="detail"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <BlogPostDetail post={activePost} onBack={() => setActivePost(null)} />
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <BlogIndex onSelect={setActivePost} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Blog;
