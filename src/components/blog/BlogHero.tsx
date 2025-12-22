// src/components/blog/BlogHero.tsx
// Hero section for blog page with search

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface BlogHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const BlogHero = ({ searchTerm, onSearchChange }: BlogHeroProps) => (
  <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
    <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto max-w-4xl text-center relative z-10"
    >
      <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30">
        <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
        Expert Cannabis Travel Guides
      </Badge>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
        <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
          Cannabis Travel Blog
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Your trusted source for cannabis travel guides, legal updates, and destination insights from around the world.
      </p>

      {/* SEARCH BAR */}
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search articles, destinations, topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-6 text-base bg-card/50 border-border/50 focus:border-accent rounded-full"
        />
      </div>
    </motion.div>
  </section>
);
