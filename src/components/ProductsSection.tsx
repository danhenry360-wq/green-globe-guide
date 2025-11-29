import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Package, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  category: string | null;
  thc_percentage: number | null;
  cbd_percentage: number | null;
  price: number | null;
  weight: string | null;
  image: string | null;
  description: string | null;
  is_featured: boolean | null;
}

interface ProductsSectionProps {
  dispensaryId: string;
}

const CATEGORIES = ['All', 'Flower', 'Concentrates', 'Edibles', 'Vapes', 'Pre-rolls'];

export const ProductsSection = ({ dispensaryId }: ProductsSectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('dispensary_id', dispensaryId)
        .order('is_featured', { ascending: false });
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    if (dispensaryId) {
      fetchProducts();
    }
  }, [dispensaryId]);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) {
    return (
      <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
          <Package className="w-6 h-6" /> Products Menu
        </CardTitle>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                : "border-accent/30 hover:border-accent/60 text-muted-foreground hover:text-foreground"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No products in this category.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
