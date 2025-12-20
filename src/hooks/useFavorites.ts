import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface FavoriteItem {
    id: string;
    user_id: string;
    dispensary_id: string | null;
    hotel_id: string | null;
    tour_id: string | null;
    created_at: string;
}

export const useFavorites = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: async () => {
            if (!user) return [];
            
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', user.id);

            if (error) throw error;
            return data as FavoriteItem[];
        },
        enabled: !!user,
    });

    const addFavorite = useMutation({
        mutationFn: async (params: { dispensary_id?: string; hotel_id?: string; tour_id?: string }) => {
            if (!user) throw new Error('Must be logged in');

            const { data, error } = await supabase
                .from('favorites')
                .insert({
                    user_id: user.id,
                    dispensary_id: params.dispensary_id || null,
                    hotel_id: params.hotel_id || null,
                    tour_id: params.tour_id || null,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
            toast({
                title: "Added to favorites",
                description: "Successfully added to your favorites.",
            });
        },
        onError: (error: any) => {
            console.error('Error adding favorite:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to add to favorites.",
                variant: "destructive",
            });
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (favoriteId: string) => {
            if (!user) throw new Error('Must be logged in');

            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('id', favoriteId)
                .eq('user_id', user.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
            toast({
                title: "Removed from favorites",
                description: "Successfully removed from your favorites.",
            });
        },
        onError: (error: any) => {
            console.error('Error removing favorite:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to remove from favorites.",
                variant: "destructive",
            });
        },
    });

    const isFavorite = (dispensaryId?: string, hotelId?: string, tourId?: string) => {
        return favorites.find(f => 
            (dispensaryId && f.dispensary_id === dispensaryId) ||
            (hotelId && f.hotel_id === hotelId) ||
            (tourId && f.tour_id === tourId)
        );
    };

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
};
