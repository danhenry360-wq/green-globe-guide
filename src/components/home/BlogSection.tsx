// src/components/home/BlogSection.tsx
// Blog/travel guides section showing latest posts

import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BLOG_POSTS } from "@/pages/Blog";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

const STAGGER: Variants = {
    animate: { transition: { staggerChildren: 0.15 } }
};

export const BlogSection = () => {
    // Get 3 most recent blog posts
    const recentPosts = [...BLOG_POSTS]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section className="py-16 bg-black">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={STAGGER}
                className="container mx-auto"
            >
                <SectionHeader
                    id="guides-heading"
                    title="Cannabis Travel Guides & News"
                    subtitle="Expert advice, legal tips, and dispensary guides for your next adventure"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                        <motion.div key={post.id} variants={FADE_IN} whileHover={{ scale: 1.01 }}>
                            <Link to={`/blog/${post.id}`} aria-label={`Read article: ${post.title}`}>
                                <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 hover:border-accent/30 flex flex-col group">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        width="400"
                                        height="224"
                                        className="w-full h-56 object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                                        <p className="text-gray-400 flex-grow mb-6">{post.excerpt}</p>
                                        <div className="flex items-center gap-2 text-accent">
                                            <span>Read Article</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
