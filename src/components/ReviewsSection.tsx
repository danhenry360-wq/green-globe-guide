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
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className="rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border-accent/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
          <MessageSquare className="w-6 h-6" /> Reviews
        </CardTitle>
        {!showForm && (
          <Button
            onClick={handleWriteReview}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Write a Review
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && user && (
          <ReviewForm
            dispensaryId={dispensaryId}
            userId={user.id}
            onReviewSubmitted={handleReviewSubmitted}
            onCancel={() => setShowForm(false)}
          />
        )}
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No reviews yet. Be the first to share your experience!</p>
            {!showForm && (
              <Button
                onClick={handleWriteReview}
                variant="outline"
                className="border-accent/30 hover:border-accent/60"
              >
                Write the First Review
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border/50 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {review.profiles?.display_name || 'Anonymous'}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(review.created_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {review.title && (
                  <h4 className="font-semibold text-foreground mb-1">{review.title}</h4>
                )}
                <p className="text-muted-foreground text-sm">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
