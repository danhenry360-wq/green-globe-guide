// src/components/ArticleCard.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Article } from "@/types/data";

interface ArticleCardProps {
  article: Article;
}

/**
 * A reusable card component for displaying a single blog post or travel guide article.
 * @param {Article} article - The article data object.
 */
export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <motion.div key={article.id} whileHover={{ scale: 1.01 }}>
      <Card className="h-full overflow-hidden rounded-2xl bg-gray-900 border-white/10 shadow-2xl flex flex-col">
        <img
          src={article.imagePath}
          alt={article.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-48 sm:h-56 object-cover transition-transform hover:scale-110"
        />
        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{article.title}</h3>
          <p className="text-sm sm:text-base text-gray-400 flex-grow leading-relaxed mb-4 sm:mb-6">{article.summary}</p>
          <Link to={article.link} className="group flex items-center gap-2 text-accent font-medium text-sm sm:text-base">
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};
