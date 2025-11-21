// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Destination } from "@/types/data";

interface DestinationCardProps {
  destination: Destination;
}

const FADE_IN = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

/**
 * A reusable card component for displaying a single featured travel destination.
 * @param {Destination} destination - The destination data object.
 */
export const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <motion.div
      key={destination.id}
      variants={FADE_IN}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={destination.link} aria-label={`View ${destination.name} cannabis travel guide`}>
        <Card className="relative h-80 sm:h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-2xl">
          <img
            src={destination.imagePath}
            alt={destination.imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute top-4 right-4">
            <Badge 
              className={`${destination.statusColor} text-white border-none px-3 py-1 backdrop-blur-md text-xs sm:text-sm`}
            >
              {destination.legalStatus}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white w-full">
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 transition-transform group-hover:translate-x-2">{destination.name}</h3>
            <p className="text-base sm:text-lg text-gray-300 transition-transform group-hover:translate-x-2 delay-75">{destination.country}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
