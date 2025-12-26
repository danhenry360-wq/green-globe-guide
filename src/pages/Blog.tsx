import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import greenGlobeLogo from "@/assets/global-canna-pass-logo.png";
import { BLOG_POSTS } from "@/data/blog-posts";
import {
  BlogArticleCard,
  BlogFilters,
  BlogHero,
  BlogFeatured,
  BlogPagination
} from "@/components/blog";

// Re-export for backward compatibility
export { BLOG_POSTS } from "@/data/blog-posts";

// UPDATED: Added "Itinerary" to match our new Colorado Springs post
const CATEGORIES = ["All", "City Guide", "Stays Guide", "Itinerary", "Legal Updates", "Education"];
const POSTS_PER_PAGE = 9;

export default function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Logic to handle direct links from search results or internal redirects
  useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId) {
      const article = BLOG_POSTS.find(post => post.id === articleId);
      if (article) {
        if (article.isExternalPage && article.externalUrl) {
          navigate(article.externalUrl);
        } else {
          navigate(`/blog/${article.id}`);
        }
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams, navigate]);

  const filteredPosts = useMemo(() => {
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    // Sort by date descending (Newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // When on "All" and no search, we show the latest post as "Featured" and skip it in the grid
  const postsToShow = activeCategory === "All" && !searchTerm ? filteredPosts.slice(1) : filteredPosts;
  const totalPages = Math.ceil(postsToShow.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = postsToShow.slice(startIndex, endIndex);
  const totalResults = postsToShow.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Accessibility: Page navigation with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        e.preventDefault();
        handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        e.preventDefault();
        handlePageChange(currentPage + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Helmet>
        <title>Cannabis Travel Blog 2025 | BudQuest Verified Guides</title>
        <meta name="description" content="Explore verified cannabis travel itineraries, legal updates for 2025, and the best 420-friendly stays worldwide." />
        <link rel="canonical" href="https://budquest.guide/blog" />
      </Helmet>
      
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div 
          key="list" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="pb-20"
        >
          {/* HERO */}
          <BlogHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          {/* FILTER BAR */}
          <BlogFilters 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* FEATURED POST (Latest) */}
          {filteredPosts.length > 0 && activeCategory === "All" && !searchTerm && (
            <BlogFeatured post={filteredPosts[0]} />
          )}

          {/* ARTICLES GRID */}
          <section className="py-8 sm:py-12 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/10 pb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                  {activeCategory === "All" ? "Latest Verified Articles" : activeCategory}
                </h2>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-muted-foreground text-sm font-medium">
                    {totalResults > 0 
                      ? `Showing ${startIndex + 1}-${Math.min(endIndex, totalResults)} of ${totalResults} guides` 
                      : "No guides found"}
                  </span>
                  {totalPages > 1 && (
                    <span className="text-xs text-primary/60 font-semibold uppercase tracking-widest">
                      Use ← → keys to navigate
                    </span>
                  )}
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {currentPosts.map((post, i) => (
                      <motion.div 
                        key={post.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.05 }}
                      >
                        <BlogArticleCard 
                          post={post} 
                          onClick={() => {
                            // Logic to determine if we go to custom itinerary or generic template
                            if (post.isExternalPage && post.externalUrl) {
                              navigate(post.externalUrl);
                            } else {
                              navigate(`/blog/${post.id}`);
                            }
                          }} 
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* PAGINATION */}
                  <BlogPagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                  />
                </>
              ) : (
                <div className="text-center py-32 bg-card/20 rounded-[40px] border border-dashed border-white/10">
                  <div className="text-7xl mb-6 opacity-50">🍃</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No guides found in this category</h3>
                  <p className="text-muted-foreground">Try adjusting your search or switching filters</p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-primary" 
                    onClick={() => {setSearchTerm(""); setActiveCategory("All")}}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* NEWSLETTER CTA */}
          <section className="py-16 sm:py-24 px-4">
            <div className="container mx-auto">
              <Card className="p-10 sm:p-16 bg-gradient-to-br from-primary/10 via-card to-background border-primary/20 text-center rounded-[50px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <motion.img 
                    src={greenGlobeLogo} 
                    alt="BudQuest Logo" 
                    className="w-20 h-20 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                  />
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Stay Higher with <span className="text-primary">BudQuest</span></h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                    Join 15,000+ cannabis travelers. Get verified 420-friendly itineraries and legal alerts delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-background/50 border-white/10 h-14 rounded-2xl px-6 focus:border-primary transition-all" 
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold h-14 rounded-2xl px-10 shadow-lg shadow-primary/20">
                      Subscribe
                    </Button>
                  </div>
                  <p className="mt-6 text-xs text-muted-foreground">We respect your privacy. No spam, just high-grade content.</p>
                </motion.div>
              </Card>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
