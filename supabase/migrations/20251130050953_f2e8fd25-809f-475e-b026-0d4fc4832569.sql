-- Drop the existing update policy that only allows users to update their own reviews
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;

-- Create a new update policy that allows users to update their own reviews OR admins to update any review
CREATE POLICY "Users can update own reviews or admins can update any" 
ON public.reviews 
FOR UPDATE 
USING (
  (user_id = auth.uid()) OR 
  has_role(auth.uid(), 'admin'::app_role)
);