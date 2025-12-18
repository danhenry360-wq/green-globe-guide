import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface FavoriteItem {
    id: string;
    dispensary_id: string | null;
    hotel_id: string | null;
    dispensaries?: any;
    hotels?: any;
}

// Stub hook - favorites table not yet implemented
export const useFavorites = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const favorites: FavoriteItem[] = [];
    const isLoading = false;

    const addFavorite = {
        mutate: (_params: { dispensary_id?: string; hotel_id?: string }) => {
            toast({
                title: "Coming Soon",
                description: "Favorites feature is not yet available.",
            });
        },
        isPending: false,
    };

    const removeFavorite = {
        mutate: (_favoriteId: string) => {
            toast({
                title: "Coming Soon",
                description: "Favorites feature is not yet available.",
            });
        },
        isPending: false,
    };

    const isFavorite = (_dispensaryId?: string, _hotelId?: string) => {
        return undefined;
    };

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
};
