import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Percent } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
}

const getCategoryColor = (category: string | null) => {
  switch (category?.toLowerCase()) {
    case 'flower':
      return 'bg-green-600 hover:bg-green-700';
    case 'concentrates':
      return 'bg-amber-600 hover:bg-amber-700';
    case 'edibles':
      return 'bg-purple-600 hover:bg-purple-700';
    case 'vapes':
      return 'bg-blue-600 hover:bg-blue-700';
    case 'pre-rolls':
      return 'bg-orange-600 hover:bg-orange-700';
    default:
      return 'bg-muted hover:bg-muted/80';
  }
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-xl bg-card/70 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      <div className="relative h-40 overflow-hidden">
        <img
          src={product.image || '/dest-california.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.is_featured && (
          <Badge className="absolute top-2 left-2 bg-gold text-gold-foreground text-xs">
            Featured
          </Badge>
        )}
        {product.category && (
          <Badge className={`absolute top-2 right-2 ${getCategoryColor(product.category)} text-white text-xs`}>
            {product.category}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-foreground truncate text-sm">{product.name}</h3>
            {product.brand && (
              <p className="text-xs text-muted-foreground">{product.brand}</p>
            )}
          </div>
          {product.price && (
            <span className="text-accent font-bold text-lg flex-shrink-0">
              ${product.price.toFixed(0)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-xs">
          {product.thc_percentage && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Leaf className="w-3 h-3 text-green-500" />
              <span>THC {product.thc_percentage}%</span>
            </div>
          )}
          {product.cbd_percentage && product.cbd_percentage > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Percent className="w-3 h-3 text-blue-500" />
              <span>CBD {product.cbd_percentage}%</span>
            </div>
          )}
          {product.weight && (
            <span className="text-muted-foreground">{product.weight}</span>
          )}
        </div>
        
        {product.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        )}
      </CardContent>
    </Card>
  );
};
