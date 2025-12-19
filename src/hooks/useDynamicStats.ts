// src/hooks/useDynamicStats.ts
// Custom hook for fetching dynamic statistics from Supabase

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DynamicStats {
    dispensaryCount: number;
    hotelCount: number;
    isLoading: boolean;
    error: string | null;
}

const DEFAULT_DISPENSARY_COUNT = 48;
const DEFAULT_HOTEL_COUNT = 31;

export const useDynamicStats = (): DynamicStats => {
    const [dispensaryCount, setDispensaryCount] = useState(DEFAULT_DISPENSARY_COUNT);
    const [hotelCount, setHotelCount] = useState(DEFAULT_HOTEL_COUNT);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [dispResult, hotelResult] = await Promise.all([
                    supabase.from('dispensaries').select('id', { count: 'exact', head: true }),
                    supabase.from('hotels').select('id', { count: 'exact', head: true })
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
        isLoading,
        error,
    };
};
