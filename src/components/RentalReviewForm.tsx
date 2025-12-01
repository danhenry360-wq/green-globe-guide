import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RentalReviewFormProps {
  rentalId: string;
  userId: string;
  onReviewSubmitted: () => void;
  onCancel: () => void;
}

export const RentalReviewForm = ({ rentalId, userId, onReviewSubmitted, onCancel }: RentalReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (content.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user's email is verified
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.email_confirmed_at) {
        toast.error("Please verify your email before submitting a review. Check your inbox for the verification code.");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          rental_id: rentalId,
          user_id: userId,
          rating,
          title: title.trim() || null,
          content: content.trim(),
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Review submitted! It will be visible after admin approval.");
      onReviewSubmitted();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? 'fill-gold text-gold'
                    : 'text-muted-foreground/30'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title (Optional) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Review Title <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength={100}
          className="bg-background/50 border-border/50"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience staying at this property..."
          rows={4}
          className="bg-background/50 border-border/50 resize-none"
          required
          minLength={10}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {content.length}/500 characters (minimum 10)
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
