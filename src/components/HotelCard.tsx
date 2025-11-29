// src/components/HotelCard.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Leaf, Star } from "lucide-react";
import { Hotel } from "@/types/data";

interface HotelCardProps {
  hotel: Hotel & { country: string, stateName: string };
}

const StarRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
      />
    ))}
    <span className="text-xs text-muted-foreground ml-1">{value.toFixed(1)}</span>
  </div>
);

/**
 * A reusable card component for displaying a single 420-Friendly Hotel.
 * @param {Hotel} hotel - The hotel data object, extended with country and stateName.
 */
export const HotelCard = ({ hotel }: HotelCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
    <Card className="p-4 bg-card/70 border-border/50 hover:border-accent transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Section: Name, Location, Rating, Price */}
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg flex items-center gap-2">
            {hotel.name}
            <Badge className="bg-green-600 text-white text-xs flex items-center gap-1 h-5 px-2">
              <Leaf className="w-3 h-3" />
              Verified
            </Badge>
          </h4>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {hotel.city}, {hotel.stateName} ({hotel.country})
          </p>
          <div className="flex items-center mt-2">
            <StarRating value={hotel.rating} />
            {hotel.priceRange && <span className="text-sm text-accent font-semibold ml-4">{hotel.priceRange}</span>}
          </div>
        </div>

        {/* Right Section: View Deal Button */}
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-accent hover:bg-accent/90 transition-colors px-4 py-2 rounded-lg shrink-0 mt-2 sm:mt-0"
        >
          Order Now <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Policy Section */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs font-medium text-gray-400 mb-1">420-Friendly Policy Highlights:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {hotel.policies}
        </p>
      </div>
    </Card>
  </motion.div>
);
