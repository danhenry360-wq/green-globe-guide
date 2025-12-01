import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { RentalReviewForm } from "./RentalReviewForm";

interface Review {
  id: string;
  rating: number | null;
  title: string | null;
  content: string;
  created_at: string | null;
  status: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface RentalReviewsSectionProps {
  rentalId: string;
}

export const RentalReviewsSection = ({ rentalId }: RentalReviewsSectionProps) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userPendingReviews, setUserPendingReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user ? { id: user.id } : null);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ? { id: session.user.id } : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      // Fetch approved reviews
      const { data: approvedReviews, error: approvedError } = await supabase
        .from('reviews')
        .select('id, rating, title, content, created_at, status, user_id')
        .eq('rental_id', rentalId as any)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (approvedError) throw approvedError;
      
      // Fetch profiles for the reviews
      const userIds = approvedReviews?.map(r => r.user_id) || [];
      let profilesMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', userIds);
        
        profiles?.forEach(p => {
          profilesMap[p.id] = { display_name: p.display_name, avatar_url: p.avatar_url };
        });
      }
      
      const reviewsWithProfiles = approvedReviews?.map(r => ({
        ...r,
        profiles: profilesMap[r.user_id] || null
      })) || [];
      
      setReviews(reviewsWithProfiles);

      // Fetch current user's pending reviews
      if (currentUser) {
        const { data: pendingReviews, error: pendingError } = await supabase
          .from('reviews')
          .select('id, rating, title, content, created_at, status, user_id')
          .eq('rental_id', rentalId as any)
          .eq('user_id', currentUser.id)
          .eq('status', 'pending')
          .order('created_at', { ascending: false });

        if (pendingError) throw pendingError;
        
        // Get profile for current user
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .eq('id', currentUser.id)
          .maybeSingle();
        
        const pendingWithProfiles = pendingReviews?.map(r => ({
          ...r,
          profiles: userProfile || null
        })) || [];
        
        setUserPendingReviews(pendingWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rentalId) {
      fetchReviews();
    }
  }, [rentalId, currentUser]);

  const handleWriteReview = () => {
    if (!currentUser) {
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }
    setShowReviewForm(true);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  const renderStars = (rating: number | null) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= ratingValue ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border-accent/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-foreground">Guest Reviews</CardTitle>
        <Button
          onClick={handleWriteReview}
          variant="outline"
          size="sm"
          className="border-accent/30 text-accent hover:bg-accent/10"
        >
          Write a Review
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : showReviewForm && currentUser ? (
          <RentalReviewForm
            rentalId={rentalId}
            userId={currentUser.id}
            onReviewSubmitted={handleReviewSubmitted}
            onCancel={() => setShowReviewForm(false)}
          />
        ) : reviews.length === 0 && userPendingReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No reviews yet. Be the first to share your experience!</p>
            <Button
              onClick={handleWriteReview}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Write the First Review
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User's pending reviews */}
            {userPendingReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gold/30 bg-gold/5 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {review.profiles?.avatar_url ? (
                      <img
                        src={review.profiles.avatar_url}
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {review.profiles?.display_name || 'Anonymous'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold">
                        Pending Approval
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-xs text-muted-foreground">
                        {review.created_at && new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <h4 className="font-medium text-foreground mb-1">{review.title}</h4>
                    )}
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Approved reviews */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-border/30 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {review.profiles?.avatar_url ? (
                      <img
                        src={review.profiles.avatar_url}
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {review.profiles?.display_name || 'Anonymous'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-xs text-muted-foreground">
                        {review.created_at && new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <h4 className="font-medium text-foreground mb-1">{review.title}</h4>
                    )}
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
