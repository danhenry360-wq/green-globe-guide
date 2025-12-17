import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface FavoriteItem {
    id: string;
    dispensary_id: string | null;
    hotel_id: string | null;
    // Dynamic relations
    dispensaries?: any;
    hotels?: any;
}

export const useFavorites = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch favorites
    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ["favorites", user?.id],
        queryFn: async () => {
            if (!user) return [];
            const { data, error } = await supabase
                // @ts-ignore
                .from("favorites")
                .select("*, dispensaries(name, slug, image, city, state, rating), hotels(name, slug, images, cities(name, states(name)), rating)")
                .eq("user_id", user.id);

            if (error) throw error;
            return data as FavoriteItem[];
        },
        enabled: !!user,
    });

    // Add favorite
    const addFavorite = useMutation({
        mutationFn: async (params: { dispensary_id?: string; hotel_id?: string }) => {
            if (!user) throw new Error("User not authenticated");

            const { data, error } = await supabase
                // @ts-ignore
                .from("favorites")
                .insert({
                    user_id: user.id,
                    dispensary_id: params.dispensary_id,
                    hotel_id: params.hotel_id,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast({
                title: "Added to Favorites",
                description: "This item has been saved to your profile.",
            });
        },
        onError: (error) => {
            console.error("Error adding favorite:", error);
            toast({
                title: "Error",
                description: "Could not add to favorites. Please try again.",
                variant: "destructive",
            });
        },
    });

    // Remove favorite
    const removeFavorite = useMutation({
        mutationFn: async (favoriteId: string) => {
            const { error } = await supabase
                // @ts-ignore
                .from("favorites")
                .delete()
                .eq("id", favoriteId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast({
                title: "Removed from Favorites",
                description: "Item removed from your saved list.",
            });
        },
        onError: (error) => {
            console.error("Error removing favorite:", error);
            toast({
                title: "Error",
                description: "Could not remove from favorites.",
                variant: "destructive",
            });
        },
    });

    const isFavorite = (dispensaryId?: string, hotelId?: string) => {
        return favorites.find(
            (f) =>
                (dispensaryId && f.dispensary_id === dispensaryId) ||
                (hotelId && f.hotel_id === hotelId)
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
