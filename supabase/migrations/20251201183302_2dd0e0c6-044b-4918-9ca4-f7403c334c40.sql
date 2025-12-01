-- Allow admins to permanently delete any review
DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;

CREATE POLICY "Users or admins can delete reviews"
ON public.reviews
FOR DELETE
USING (
  user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role)
);