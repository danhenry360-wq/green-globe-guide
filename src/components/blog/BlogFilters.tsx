// src/components/blog/BlogFilters.tsx
// Category filter buttons for blog page

import { Button } from "@/components/ui/button";

interface BlogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const BlogFilters = ({ categories, activeCategory, onCategoryChange }: BlogFiltersProps) => (
  <section className="py-8 px-4">
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-5 ${activeCategory === category
              ? "bg-accent text-accent-foreground"
              : "hover:border-accent/50"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  </section>
);
