-- Add amenities JSONB field to hotels table for flexible amenity storage
ALTER TABLE public.hotels 
ADD COLUMN amenities JSONB DEFAULT '{
  "smoking": true,
  "vaping": true,
  "edibles": true,
  "price_range": "$$"
}'::jsonb;

-- Add comment to document the amenities structure
COMMENT ON COLUMN public.hotels.amenities IS 'Amenity options: smoking (boolean), vaping (boolean), edibles (boolean), price_range (text)';