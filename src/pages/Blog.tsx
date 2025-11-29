import { 
  ArrowLeft, MapPin, Shield, User, Scale, 
  AlertTriangle, Info, CheckCircle2, Calendar, Clock, Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const nav = useNavigate();

  // --- MOCK DATA FOR THE ARTICLE ---
  const post = {
    title: "Thailand Cannabis Guide: 2025 Rules & Reality",
    subtitle: "Your essential guide to navigating the shifting cannabis scene in Bangkok, Phuket, and Chiang Mai.",
    date: "November 15, 2024",
    readTime: "8 min read",
    author: "Sarah Jenkins, Esq.",
    category: "Major Guide",
    
    // The "Intro Box" content
    introTitle: "Introduction to Thailand 2025",
    introText: "Thailand remains the cannabis capital of Asia, but the 'Wild West' days of 2022 are over. The new Cannabis Act is tightening regulations on recreational use. This guide explains exactly what you can and cannot do as a tourist in 2025.",
    warningText: "Important: Public smoking is strictly banned (fines up to 25,000 THB). Always consume within designated dispensary lounges or private residences.",
    
    // The "Content Sections"
    sections: [
      {
        title: "Legal Status",
        icon: Shield,
        content: "Cannabis was delisted as a narcotic in 2022, making it legal to sell and consume. However, the new government is pushing to restrict 'recreational use' in favor of 'medical use'. Currently, dispensaries remain open, but they now require strict licensing. You do NOT need a medical card to buy, but you must show ID/Passport.",
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
        content: "There is currently no strict possession limit for personal use flower. However, extracts and edibles (like gummies) must contain less than 0.2% THC by weight. High-strength edibles are technically illegal, though often found in gray-market shops.",
      },
      {
        title: "Where to Consume",
        icon: MapPin,
        content: "This is the most important rule: Smoking in public places (streets, beaches, parks, hotel balconies) is a 'public nuisance' crime. Police enforcement in tourist hubs like Phuket is high.",
        tips: [
          "Use designated smoking rooms inside dispensaries.",
          "Edibles or tinctures are preferred for discreet travel.",
          "Ask your hotel specifically if they have a cannabis zone.",
          "Never smoke near schools or temples."
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navigation />
      
      {/* Sticky Header for Mobile */}
      <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 sm:hidden">
         <span className="text-sm font-semibold text-green-400 truncate block">
           {post.title}
         </span>
      </div>

      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-4xl px-4">
          
          {/* --- 1. BACK BUTTON & META --- */}
          <div className="flex justify-between items-start mb-8">
            <Button
              variant="ghost"
              onClick={() => nav(-1)}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-0 h-auto gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Journal
            </Button>
            
            <div className="flex gap-2">
                <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-400">
                    <Share2 className="w-4 h-4" />
                </Button>
            </div>
          </div>

          {/* --- 2. TITLE HEADER --- */}
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

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl border-l-4 border-green-500/50 pl-6 italic">
              {post.subtitle}
            </p>
          </motion.div>

          {/* --- 3. INTRO CARD (The "Green Outline" Look) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="rounded-2xl border border-green-500/50 bg-green-500/5 p-6 md:p-8 relative overflow-hidden">
              {/* Decorative side accent */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
              
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-green-400">{post.introTitle}</h2>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {post.introText}
              </p>

              {/* Warning Box inside Intro */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-orange-500 font-bold block mb-1 text-sm uppercase tracking-wider">Traffic & Legal Warning</span>
                  <p className="text-sm text-orange-200/80 leading-relaxed">
                    {post.warningText}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- 4. CONTENT SECTIONS (Glass Cards) --- */}
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
                  <div className="p-2 bg-white/10 rounded-lg text-green-400">
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

          {/* --- 5. AUTHOR FOOTER --- */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-xl border border-green-500/30">
                   SJ
                </div>
                <div>
                   <p className="text-white font-bold">{post.author}</p>
                   <p className="text-sm text-gray-500">Senior Legal Analyst</p>
                </div>
             </div>
             <Button className="bg-green-500 text-black hover:bg-green-400 font-bold rounded-full px-8">
                View All Guides
             </Button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
