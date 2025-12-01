-- Add is_verified column to hotels table for verified badge functionality
ALTER TABLE public.hotels 
ADD COLUMN is_verified boolean DEFAULT false;