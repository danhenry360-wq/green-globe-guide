-- Create affiliate conversions table
CREATE TABLE public.affiliate_conversions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  click_id UUID REFERENCES public.affiliate_clicks(id) ON DELETE SET NULL,
  converted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  booking_id TEXT,
  booking_amount NUMERIC,
  commission_amount NUMERIC,
  commission_rate NUMERIC,
  platform TEXT NOT NULL,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  webhook_data JSONB,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded'))
);

-- Enable RLS
ALTER TABLE public.affiliate_conversions ENABLE ROW LEVEL SECURITY;

-- Admins can view all conversions
CREATE POLICY "Admins can view all conversions"
ON public.affiliate_conversions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert conversions (for webhook)
CREATE POLICY "Anyone can track conversions"
ON public.affiliate_conversions
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_affiliate_conversions_blog_post_id ON public.affiliate_conversions(blog_post_id);
CREATE INDEX idx_affiliate_conversions_converted_at ON public.affiliate_conversions(converted_at DESC);
CREATE INDEX idx_affiliate_conversions_status ON public.affiliate_conversions(status);