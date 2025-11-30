import { useState, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface DispensaryMapProps {
  latitude: number | null;
  longitude: number | null;
  address: string;
  name: string;
  className?: string;
}

export const DispensaryMap = ({ latitude, longitude, address, name, className = "" }: DispensaryMapProps) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  useEffect(() => {
    const fetchMapUrl = async () => {
      if (!latitude || !longitude) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('get-map-image', {
          body: { latitude, longitude, zoom: 15, width: 600, height: 400 }
        });

        if (error) {
          console.error('Error fetching map URL:', error);
          setLoading(false);
          return;
        }

        if (data?.mapUrl) {
          setMapUrl(data.mapUrl);
        }
      } catch (err) {
        console.error('Failed to fetch map:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapUrl();
  }, [latitude, longitude]);

  // Fallback UI
  const FallbackMap = () => (
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

  // Loading state
  if (loading) {
    return <Skeleton className={`rounded-md ${className}`} />;
  }

  // If no coordinates or no map URL, show fallback
  if (!latitude || !longitude || !mapUrl || imageError) {
    return <FallbackMap />;
  }

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-md overflow-hidden group ${className}`}
      title={`View ${name} on Google Maps`}
    >
      {/* Map image */}
      <img
        src={mapUrl}
        alt={`Map showing location of ${name}`}
        className="w-full h-full object-cover"
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
