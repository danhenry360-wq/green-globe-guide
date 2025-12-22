// src/components/blog/BlogFeatured.tsx
// Featured article section for blog page

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog-posts";

interface BlogFeaturedProps {
  post: BlogPost;
}

export const BlogFeatured = ({ post }: BlogFeaturedProps) => (
  <section className="py-8 px-4">
    <div className="container mx-auto">
      <Link to={post.isExternalPage && post.externalUrl ? post.externalUrl : `/blog/${post.id}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cursor-pointer group"
        >
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:block hidden" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-accent/10 text-accent border-accent/30">
                  <TrendingUp className="w-3 h-3 mr-1" /> Featured
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </div>
  </section>
);
