import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Star, MessageSquare, Loader2, User } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    display_name: string | null;
  } | null;
}

interface ReviewsSectionProps {
  dispensaryId: string;
}

export const ReviewsSection = ({ dispensaryId }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        title,
        content,
        created_at,
        user_id,
        profiles!reviews_user_id_fkey (
          display_name
        )
      `)
      .eq('dispensary_id', dispensaryId)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      // Transform data to handle the profiles join
      const transformedData = data.map(review => ({
        ...review,
        profiles: Array.isArray(review.profiles) ? review.profiles[0] : review.profiles
      }));
      setReviews(transformedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dispensaryId) {
      fetchReviews();
    }
  }, [dispensaryId]);

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      setShowForm(true);
    }
  };

  const handleReviewSubmitted = () => {
    setShowForm(false);
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg bg-card/70 backdrop-blur-sm border-accent/20 sm:border-accent/30">
      <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4">
        <CardTitle className="text-sm sm:text-xl font-bold text-accent flex items-center gap-1.5 sm:gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /> Reviews
        </CardTitle>
        {!showForm && (
          <Button
            onClick={handleWriteReview}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
          >
            Write a Review
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-4 pt-0">
        {showForm && user && (
          <ReviewForm
            dispensaryId={dispensaryId}
            userId={user.id}
            onReviewSubmitted={handleReviewSubmitted}
            onCancel={() => setShowForm(false)}
          />
        )}
        
        {loading ? (
          <div className="flex items-center justify-center py-6 sm:py-8">
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-accent" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">No reviews yet. Be the first to share your experience!</p>
            {!showForm && (
              <Button
                onClick={handleWriteReview}
                variant="outline"
                className="border-accent/30 hover:border-accent/60 text-xs sm:text-sm h-8 sm:h-9"
              >
                Write the First Review
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border/50 pb-3 sm:pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4 mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-foreground">
                        {review.profiles?.display_name || 'Anonymous'}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          {format(new Date(review.created_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {review.title && (
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5 sm:mb-1">{review.title}</h4>
                )}
                <p className="text-muted-foreground text-[11px] sm:text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
