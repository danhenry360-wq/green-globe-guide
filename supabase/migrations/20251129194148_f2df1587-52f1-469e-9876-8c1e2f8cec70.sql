-- Create review status enum
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

-- Add status column to reviews table with default 'pending'
ALTER TABLE public.reviews 
ADD COLUMN status public.review_status NOT NULL DEFAULT 'pending';

-- Add reviewed_at timestamp for audit trail
ALTER TABLE public.reviews 
ADD COLUMN reviewed_at timestamp with time zone;

-- Add reviewed_by to track which admin approved/rejected
ALTER TABLE public.reviews 
ADD COLUMN reviewed_by uuid;

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;

-- Only approved reviews are visible to everyone (public viewing)
CREATE POLICY "Approved reviews are viewable by everyone"
ON public.reviews FOR SELECT
USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));