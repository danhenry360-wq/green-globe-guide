-- Add license_number and images array columns to dispensaries table
ALTER TABLE public.dispensaries 
ADD COLUMN IF NOT EXISTS license_number text,
ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';

-- Migrate existing single image to images array
UPDATE public.dispensaries 
SET images = ARRAY[image] 
WHERE image IS NOT NULL AND image != '' AND (images IS NULL OR array_length(images, 1) IS NULL);