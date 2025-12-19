// src/hooks/useDynamicStats.ts
// Custom hook for fetching dynamic statistics from Supabase

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DynamicStats {
    dispensaryCount: number;
    hotelCount: number;
    tourCount: number;
    isLoading: boolean;
    error: string | null;
}

const DEFAULT_DISPENSARY_COUNT = 48;
const DEFAULT_HOTEL_COUNT = 31;
const DEFAULT_TOUR_COUNT = 1;

export const useDynamicStats = (): DynamicStats => {
    const [dispensaryCount, setDispensaryCount] = useState(DEFAULT_DISPENSARY_COUNT);
    const [hotelCount, setHotelCount] = useState(DEFAULT_HOTEL_COUNT);
    const [tourCount, setTourCount] = useState(DEFAULT_TOUR_COUNT);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [dispResult, hotelResult, tourResult] = await Promise.all([
                    supabase.from('dispensaries').select('id', { count: 'exact', head: true }),
                    supabase.from('hotels').select('id', { count: 'exact', head: true }),
                    supabase.from('tours').select('id', { count: 'exact', head: true })
                ]);

                if (dispResult.error) {
                    console.warn('Failed to fetch dispensary count:', dispResult.error);
                } else if (dispResult.count !== null) {
                    setDispensaryCount(dispResult.count);
                }

                if (hotelResult.error) {
                    console.warn('Failed to fetch hotel count:', hotelResult.error);
                } else if (hotelResult.count !== null) {
                    setHotelCount(hotelResult.count);
                }

                if (tourResult.error) {
                    console.warn('Failed to fetch tour count:', tourResult.error);
                } else if (tourResult.count !== null) {
                    setTourCount(tourResult.count);
                }
            } catch (err) {
                console.error('Error fetching dynamic stats:', err);
                setError('Failed to fetch statistics');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return {
        dispensaryCount,
        hotelCount,
        tourCount,
        isLoading,
        error,
    };
};
