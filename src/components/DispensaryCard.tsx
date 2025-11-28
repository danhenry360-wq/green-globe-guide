import { Dispensary } from "@/types/data";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle, Clock, Truck, CreditCard, Car } from "lucide-react";

interface DispensaryCardProps {
  dispensary: Dispensary;
}

export const DispensaryCard = ({ dispensary }: DispensaryCardProps) => {
  // Function to generate star icons
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      // Using a full star for simplicity in this template, can be replaced with a half-star icon if available
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />);
    }
    return stars;
  };

  // Function to create a URL-friendly slug
  const createSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const dispensarySlug = createSlug(dispensary.name);

  return (
    <Link to={`/dispensary/${dispensarySlug}`} state={{ dispensaryId: dispensary.id }}>
      <Card className="flex flex-col sm:flex-row overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent/50 bg-card/70 backdrop-blur-sm">
        
        {/* Image Section (Placeholder) */}
        <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-800 flex items-center justify-center relative">
          <img 
            src={dispensary.image} 
            alt={dispensary.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = "/assets/placeholder-dispensary.jpg"; // Fallback image
            }}
          />
          <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold">
            {dispensary.status}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="sm:w-2/3 flex flex-col p-4 sm:p-6">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-xl font-bold text-white hover:text-accent transition-colors">
              {dispensary.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{dispensary.city}, {dispensary.state}</span>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">{renderRating(dispensary.rating)}</div>
              <span className="text-sm font-semibold text-yellow-400">{dispensary.rating}</span>
              <span className="text-xs text-muted-foreground">({dispensary.reviewCount} Reviews)</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {dispensary.policyHighlights}
            </p>

            {/* Features/Amenities */}
            <div className="flex flex-wrap gap-2">
              {dispensary.isRecreational && (
                <Badge variant="secondary" className="bg-green-800/50 text-green-300 border-green-700/50">
                  <CheckCircle className="w-3 h-3 mr-1" /> Rec
                </Badge>
              )}
              {dispensary.isMedical && (
                <Badge variant="secondary" className="bg-blue-800/50 text-blue-300 border-blue-700/50">
                  <CheckCircle className="w-3 h-3 mr-1" /> Med
                </Badge>
              )}
              {dispensary.hasDelivery && (
                <Badge variant="secondary" className="bg-purple-800/50 text-purple-300 border-purple-700/50">
                  <Truck className="w-3 h-3 mr-1" /> Delivery
                </Badge>
              )}
              {dispensary.hasATM && (
                <Badge variant="secondary" className="bg-amber-800/50 text-amber-300 border-amber-700/50">
                  <CreditCard className="w-3 h-3 mr-1" /> ATM
                </Badge>
              )}
              {dispensary.hasParking && (
                <Badge variant="secondary" className="bg-indigo-800/50 text-indigo-300 border-indigo-700/50">
                  <Car className="w-3 h-3 mr-1" /> Parking
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-4">
            <Button variant="default" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white text-sm font-semibold">
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};
