-- Make dispensary_id nullable so rental reviews don't need it
ALTER TABLE public.reviews
ALTER COLUMN dispensary_id DROP NOT NULL;

-- Add a check constraint to ensure at least one of dispensary_id or rental_id is set
ALTER TABLE public.reviews
ADD CONSTRAINT reviews_property_check 
CHECK (
  (dispensary_id IS NOT NULL AND rental_id IS NULL) OR 
  (dispensary_id IS NULL AND rental_id IS NOT NULL)
);