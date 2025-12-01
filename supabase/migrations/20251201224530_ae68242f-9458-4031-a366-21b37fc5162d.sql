-- Create affiliate clicks tracking table
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Admins can view all clicks
CREATE POLICY "Admins can view all clicks"
ON public.affiliate_clicks
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert clicks (for tracking)
CREATE POLICY "Anyone can track clicks"
ON public.affiliate_clicks
FOR INSERT
WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_affiliate_clicks_blog_post_id ON public.affiliate_clicks(blog_post_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON public.affiliate_clicks(clicked_at DESC);