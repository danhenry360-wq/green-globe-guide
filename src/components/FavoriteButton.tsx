import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
    entityId: string;
    type: "dispensary" | "hotel" | "tour";
    className?: string;
    variant?: "default" | "outline" | "ghost" | "icon";
}

export const FavoriteButton = ({
    entityId,
    type,
    className,
    variant = "outline"
}: FavoriteButtonProps) => {
    const { isFavorite, addFavorite, removeFavorite, isLoading } = useFavorites();
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const favorite = isFavorite(
        type === "dispensary" ? entityId : undefined,
        type === "hotel" ? entityId : undefined,
        type === "tour" ? entityId : undefined
    );

    const isSaved = !!favorite;

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast({
                title: "Sign in required",
                description: "Please sign in to save favorites.",
                variant: "destructive",
            });
            navigate("/auth");
            return;
        }

        if (isSaved) {
            removeFavorite.mutate(favorite.id);
        } else {
            addFavorite.mutate({
                dispensary_id: type === "dispensary" ? entityId : undefined,
                hotel_id: type === "hotel" ? entityId : undefined,
                tour_id: type === "tour" ? entityId : undefined,
            });
        }
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleToggle}
                disabled={isLoading || addFavorite.isPending || removeFavorite.isPending}
                className={cn(
                    "transition-all hover:scale-110 active:scale-95",
                    isSaved ? "text-red-500" : "text-muted-foreground hover:text-red-500",
                    className
                )}
                aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart className={cn("w-6 h-6", isSaved && "fill-current")} />
            </button>
        );
    }

    return (
        <Button
            variant={variant}
            size="sm"
            onClick={handleToggle}
            disabled={isLoading || addFavorite.isPending || removeFavorite.isPending}
            className={cn(
                "gap-2 transition-all",
                isSaved && "border-red-500 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                className
            )}
        >
            <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
            <span>{isSaved ? "Saved" : "Save"}</span>
        </Button>
    );
};
