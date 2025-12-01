-- Add affiliate and related content fields to blog_posts
ALTER TABLE public.blog_posts
ADD COLUMN affiliate_link TEXT,
ADD COLUMN affiliate_link_text TEXT DEFAULT 'Book Now',
ADD COLUMN related_dispensary_ids TEXT[] DEFAULT '{}',
ADD COLUMN related_hotel_ids TEXT[] DEFAULT '{}';