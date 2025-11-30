import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DispensaryMapProps {
  latitude: number | null;
  longitude: number | null;
  address: string;
  name: string;
  className?: string;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

export const DispensaryMap = ({ latitude, longitude, address, name, className = "" }: DispensaryMapProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // If no coordinates, show fallback
  if (!latitude || !longitude || !MAPBOX_TOKEN) {
    return (
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-md overflow-hidden bg-secondary hover:bg-secondary/80 transition-colors ${className}`}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-2" />
          <span className="text-xs sm:text-sm text-muted-foreground">Click to open in Google Maps</span>
        </div>
      </a>
    );
  }

  // Mapbox Static Images API - dark style with custom green marker
  const zoom = 15;
  const width = 600;
  const height = 400;
  const markerColor = "22c55e"; // Green accent color without #
  const mapStyle = "mapbox/dark-v11";
  
  const mapImageUrl = `https://api.mapbox.com/styles/v1/${mapStyle}/static/pin-s+${markerColor}(${longitude},${latitude})/${longitude},${latitude},${zoom}/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;

  // Handle image error - fallback to Google Maps link
  if (imageError) {
    return (
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-md overflow-hidden bg-secondary hover:bg-secondary/80 transition-colors ${className}`}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-2" />
          <span className="text-xs sm:text-sm text-muted-foreground">Click to open in Google Maps</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-md overflow-hidden group ${className}`}
      title={`View ${name} on Google Maps`}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Map image */}
      <img
        src={mapImageUrl}
        alt={`Map showing location of ${name}`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white font-medium text-sm bg-black/60 px-3 py-1.5 rounded-full">
          <ExternalLink className="w-4 h-4" />
          <span>Open in Google Maps</span>
        </div>
      </div>
      
      {/* Subtle border accent */}
      <div className="absolute inset-0 border border-accent/20 rounded-md pointer-events-none" />
    </a>
  );
};
