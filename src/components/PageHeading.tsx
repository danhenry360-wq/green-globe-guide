import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PageHeadingProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeading = ({ badge, title, subtitle, className = "" }: PageHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center ${className}`}
    >
      {badge && (
        <Badge className="mb-4 px-4 py-2 text-xs sm:text-sm font-medium bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors w-fit mx-auto">
          {badge.icon && <badge.icon className="w-4 h-4 mr-2 inline animate-pulse" />}
          {badge.text}
        </Badge>
      )}
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3">
        <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeading;