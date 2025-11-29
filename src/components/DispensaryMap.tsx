import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

interface DispensaryMapProps {
  latitude: number | null;
  longitude: number | null;
  dispensaryName: string;
  address: string;
}

export const DispensaryMap = ({ latitude, longitude, dispensaryName, address }: DispensaryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Mapbox token from edge function
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) throw error;
        if (data?.token) {
          setMapboxToken(data.token);
        } else {
          setError('Mapbox token not configured');
        }
      } catch (err) {
        console.error('Error fetching Mapbox token:', err);
        setError('Failed to load map');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !latitude || !longitude) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [longitude, latitude],
      zoom: 14,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker for dispensary
    const marker = document.createElement('div');
    marker.className = 'dispensary-marker';
    marker.innerHTML = `
      <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/50 border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `;

    new mapboxgl.Marker(marker)
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${dispensaryName}</h3>
              <p class="text-xs text-gray-600">${address}</p>
            </div>
          `)
      )
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, latitude, longitude, dispensaryName, address]);

  if (loading) {
    return (
      <div className="h-64 bg-secondary rounded-lg flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !latitude || !longitude) {
    return (
      <div className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-accent">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <p className="text-sm">{error || 'Location data unavailable'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-64 rounded-lg overflow-hidden" />
      <style>{`
        .dispensary-marker {
          cursor: pointer;
        }
        .mapboxgl-popup-content {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .mapboxgl-popup-tip {
          border-top-color: hsl(var(--background));
        }
      `}</style>
    </div>
  );
};
