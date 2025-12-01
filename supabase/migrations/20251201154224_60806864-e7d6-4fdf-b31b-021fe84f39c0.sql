-- Add rental_id column to reviews table for rental/hotel reviews
ALTER TABLE public.reviews 
ADD COLUMN rental_id uuid REFERENCES public.hotels(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX idx_reviews_rental_id ON public.reviews(rental_id);