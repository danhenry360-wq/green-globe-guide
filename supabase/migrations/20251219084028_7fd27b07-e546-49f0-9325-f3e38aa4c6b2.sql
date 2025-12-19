-- Add additional columns to tours table for better tour details
ALTER TABLE public.tours 
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS duration text,
ADD COLUMN IF NOT EXISTS highlights text[],
ADD COLUMN IF NOT EXISTS is_420_friendly boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric,
ADD COLUMN IF NOT EXISTS booking_url text;

-- Add policy for admins to manage tours
CREATE POLICY "Admins can manage tours" 
ON public.tours 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert the first tour: BEYOND Light Show & Meditation
INSERT INTO public.tours (
  name,
  slug,
  city_id,
  description,
  price_range,
  website,
  address,
  rating,
  review_count,
  duration,
  highlights,
  is_420_friendly,
  is_verified,
  booking_url
) VALUES (
  'BEYOND Light Show & Meditation',
  'beyond-light-show-meditation-denver',
  '79c6d885-97db-434e-98c9-e9bec5035868',
  'Immerse yourself in a world of illumination during a 1-hour light show in Denver. Get swept away through a combination of lasers, guided meditation, and accompanying rock music. Offered hourly seven days a week, the immersive experience is easy to fit into any schedule and perfect for all ages. In addition to the show, your ticket grants you unlimited access to The Church''s retro arcade lounge, art gallery, movie theater, and Gandhi Garden, with dozens of Instagram-worthy picture spots throughout the venue.',
  '$25+',
  'https://www.tripadvisor.com/AttractionProductReview-g33388-d17517506-BEYOND_Light_Show_Meditation-Denver_Colorado.html',
  '1160 Lincoln St, Denver, CO 80203',
  4.9,
  818,
  '1 hour',
  ARRAY['1-hour immersive laser light show', 'Guided meditation experience', 'Retro arcade lounge access', 'Art gallery & movie theater', 'Gandhi Garden with photo spots', 'All ages welcome', '420-friendly atmosphere'],
  true,
  true,
  'https://www.tripadvisor.com/AttractionProductReview-g33388-d17517506-BEYOND_Light_Show_Meditation-Denver_Colorado.html'
);