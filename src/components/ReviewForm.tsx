import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2 } from "lucide-react";

interface ReviewFormProps {
  dispensaryId: string;
  userId: string;
  onReviewSubmitted: () => void;
  onCancel: () => void;
}

export const ReviewForm = ({ dispensaryId, userId, onReviewSubmitted, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: 'Review Required',
        description: 'Please write a review before submitting.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('reviews')
      .insert({
        dispensary_id: dispensaryId,
        user_id: userId,
        rating,
        title: title.trim() || null,
        content: content.trim(),
      });
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Review Submitted!',
        description: 'Thank you for sharing your experience.',
      });
      onReviewSubmitted();
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-secondary/50 border border-accent/20">
      <div className="space-y-2">
        <Label className="text-foreground">Your Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="review-title" className="text-foreground">Title (Optional)</Label>
        <Input
          id="review-title"
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className="bg-input border-border focus:border-accent"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="review-content" className="text-foreground">Your Review</Label>
        <Textarea
          id="review-content"
          placeholder="Share your experience with this dispensary..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
          className="bg-input border-border focus:border-accent resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">{content.length}/1000</p>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-border hover:border-accent/60"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>
    </form>
  );
};
