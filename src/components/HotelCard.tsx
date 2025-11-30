// src/components/HotelCard.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Leaf, Star, CheckCircle } from "lucide-react";
import { Hotel } from "@/types/data";
import { cn } from "@/lib/utils";

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
    <Card className={cn(
      "p-4 rounded-2xl border border-white/10",
      "bg-gradient-to-br from-green-400/10 via-transparent to-green-400/5",
      "shadow-lg hover:shadow-green-400/20 transition-all duration-300"
    )}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Section: Name, Location, Rating, Price */}
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg flex items-center gap-2 flex-wrap">
            {hotel.name}
            <Badge className="bg-green-400/20 text-green-400 border border-green-400/40 text-xs flex items-center gap-1 h-5 px-2">
              <CheckCircle className="w-3 h-3" />
              BudQuest Verified
            </Badge>
          </h4>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-green-400" />
            {hotel.city}, {hotel.stateName} ({hotel.country})
          </p>
          <div className="flex items-center mt-2">
            <StarRating value={hotel.rating} />
            {hotel.priceRange && <span className="text-sm text-green-400 font-semibold ml-4">{hotel.priceRange}</span>}
          </div>
        </div>

        {/* Right Section: View Deal Button */}
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-green-400 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg shrink-0 mt-2 sm:mt-0"
        >
          Visit <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Policy Section */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs font-medium text-green-400/80 mb-1">420-Friendly Policy Highlights:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {hotel.policies}
        </p>
      </div>
    </Card>
  </motion.div>
);
