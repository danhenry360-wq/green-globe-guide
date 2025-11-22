// ============================================
// src/components/HotelCard.tsx
// ============================================
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Hotel } from "@/types/data";
import { motion } from "framer-motion";

interface HotelCardProps {
  hotel: Hotel & {
    country?: string;
    stateName?: string;
    countryFlag?: string;
  };
  countrySlug?: string;
  stateSlug?: string;
  citySlug?: string;
  delay?: number;
}

export const HotelCard = ({ 
  hotel, 
  countrySlug = "", 
  stateSlug = "", 
  citySlug = "",
  delay = 0
}: HotelCardProps) => {
  // Generate hotel detail URL
  const hotelDetailUrl = countrySlug && stateSlug && citySlug 
    ? `/hotels/${countrySlug}/${stateSlug}/${citySlug}/${hotel.id}`
    : `/hotels/${hotel.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link to={hotelDetailUrl} className="block h-full">
        <Card className="bg-card/60 border-border/40 hover:border-accent/50 hover:bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all group hover:shadow-xl h-full flex flex-col">
          {/* Hotel Image */}
          {hotel.image && (
            <div className="relative h-40 sm:h-48 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Premium Badge */}
              {hotel.isPremium && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-yellow-400/90 text-yellow-900 font-bold text-xs px-2 py-1">
                    PREMIUM
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="p-4 sm:p-5 flex flex-col flex-1">
            {/* Header */}
            <div className="mb-3 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2 mb-2">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="line-clamp-1">{hotel.city}</span>
              </div>
            </div>

            {/* Policy Badge */}
            {hotel.policyHighlights && (
              <Badge className="bg-accent/20 text-accent border border-accent/40 w-fit text-xs mb-3 px-2 py-1 line-clamp-1">
                {hotel.policyHighlights.split(',')[0].trim()}
              </Badge>
            )}

            {/* Description */}
            {hotel.description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4">
                {hotel.description}
              </p>
            )}

            {/* Rating & Price */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-border/30">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                <span className="text-sm font-bold text-white">{hotel.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">
                  {hotel.reviews && `(${hotel.reviews})`}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-xl font-bold text-accent">
                  ${hotel.price}
                </div>
                <div className="text-xs text-muted-foreground font-medium">/night</div>
              </div>
            </div>

            {/* View Details Button */}
            <button
              className="w-full px-4 py-2.5 sm:py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 active:scale-95 transition-all flex items-center justify-center gap-2 group/btn text-sm sm:text-base"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              View Details
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
