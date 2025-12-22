// src/components/blog/BlogArticleCard.tsx
// Reusable blog article card component

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog-posts";

interface BlogArticleCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogArticleCard = ({ post, onClick }: BlogArticleCardProps) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    className="group cursor-pointer h-full"
    data-article-id={post.id}
  >
    <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
      <div className="h-48 sm:h-56 overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent text-accent-foreground font-semibold text-xs">
          {post.category}
        </Badge>
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs bg-background/50">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border/50 pt-3 sm:pt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl">{post.avatar}</span>
            {post.author}
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  </motion.div>
);
