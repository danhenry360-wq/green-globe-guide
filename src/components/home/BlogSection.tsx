// src/components/home/BlogSection.tsx
// Blog/travel guides section with enhanced CTR

import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BLOG_POSTS } from "@/data/blog-posts";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

const STAGGER: Variants = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export const BlogSection = () => {
    const navigate = useNavigate();
    
    // Get 3 most recent blog posts
    const recentPosts = [...BLOG_POSTS]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section className="py-16 bg-background">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={STAGGER}
                className="container mx-auto px-4"
            >
                <SectionHeader
                    id="guides-heading"
                    title="Cannabis Travel Guides & News"
                    subtitle="Expert advice, legal tips, and dispensary guides for your next adventure"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {recentPosts.map((post) => (
                        <motion.div key={post.id} variants={FADE_IN}>
                            <Link to={`/blog/${post.id}`} aria-label={`Read article: ${post.title}`}>
                                <Card className="h-full overflow-hidden rounded-2xl bg-card border-border/50 hover:border-accent/50 flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            loading="lazy"
                                            width="400"
                                            height="224"
                                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-accent/90 text-accent-foreground border-none text-xs">
                                                {post.category || 'Guide'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Read time */}
                                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.readTime || '5 min read'}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground flex-grow mb-4 text-sm line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                                            <span>Read Article</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div 
                    variants={FADE_IN}
                    className="mt-10 text-center"
                >
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/blog')}
                        className="group px-8 py-6 text-base border-accent/30 hover:border-accent hover:bg-accent/10"
                    >
                        <span>View All Guides & Articles</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};
