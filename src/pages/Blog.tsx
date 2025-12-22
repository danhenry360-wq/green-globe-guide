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

// Re-export for backward compatibility with other components
export { BLOG_POSTS } from "@/data/blog-posts";

const CATEGORIES = ["All", "City Guide", "Legal Updates", "Education"];
const POSTS_PER_PAGE = 9;

export default function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-open article from URL param
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
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

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

  // Keyboard navigation
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cannabis Travel Blog 2025 | Guides & Legal Updates | BudQuest</title>
        <meta name="description" content="Stay updated with the latest cannabis travel guides, legal changes across the globe, and expert tips for 420-friendly tourism." />
        <link rel="canonical" href="https://budquest.guide/blog" />
      </Helmet>
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BlogHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <BlogFilters categories={CATEGORIES} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {filteredPosts.length > 0 && activeCategory === "All" && !searchTerm && (
            <BlogFeatured post={filteredPosts[0]} />
          )}

          {/* ARTICLES GRID */}
          <section className="py-8 sm:py-12 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {activeCategory === "All" ? "Latest Articles" : activeCategory}
                </h2>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-muted-foreground text-sm">
                    {totalResults > 0 ? `Showing ${startIndex + 1}-${Math.min(endIndex, totalResults)} of ${totalResults} article${totalResults !== 1 ? "s" : ""}` : "No articles"}
                  </span>
                  {totalPages > 1 && <span className="text-xs text-muted-foreground/70">Use ← → keys to navigate pages</span>}
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentPosts.map((post, i) => (
                      <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <BlogArticleCard post={post} onClick={() => {
                          if (post.isExternalPage && post.externalUrl) {
                            navigate(post.externalUrl);
                          } else {
                            navigate(`/blog/${post.id}`);
                          }
                        }} />
                      </motion.div>
                    ))}
                  </div>
                  <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <motion.img src={greenGlobeLogo} alt="BudQuest Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} />
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Stay Updated on Cannabis Travel</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-6">Get the latest guides, legal updates, and destination tips delivered to your inbox.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                    <Input type="email" placeholder="Enter your email" className="bg-background/50 border-border/50 rounded-full" />
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">Subscribe</Button>
                  </div>
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
