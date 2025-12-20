-- Create tour_reviews table for tour ratings
CREATE TABLE public.tour_reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT NOT NULL,
    status public.review_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID
);

-- Enable RLS
ALTER TABLE public.tour_reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for tour_reviews
CREATE POLICY "Approved tour reviews are viewable by everyone"
ON public.tour_reviews
FOR SELECT
USING ((status = 'approved') OR (user_id = auth.uid()) OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create tour reviews"
ON public.tour_reviews
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tour reviews or admins can update any"
ON public.tour_reviews
FOR UPDATE
USING ((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users or admins can delete tour reviews"
ON public.tour_reviews
FOR DELETE
USING ((user_id = auth.uid()) OR has_role(auth.uid(), 'admin'));

-- Create trigger to update tour rating when reviews change
CREATE OR REPLACE FUNCTION public.update_tour_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.tours
    SET 
      review_count = (SELECT COUNT(*) FROM public.tour_reviews WHERE tour_id = NEW.tour_id AND status = 'approved'),
      rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 1) FROM public.tour_reviews WHERE tour_id = NEW.tour_id AND status = 'approved'), 0)
    WHERE id = NEW.tour_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.tours
    SET 
      review_count = (SELECT COUNT(*) FROM public.tour_reviews WHERE tour_id = OLD.tour_id AND status = 'approved'),
      rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 1) FROM public.tour_reviews WHERE tour_id = OLD.tour_id AND status = 'approved'), 0)
    WHERE id = OLD.tour_id;
    RETURN OLD;
  END IF;
END;
$$;

CREATE TRIGGER update_tour_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.tour_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_tour_rating();

-- Create favorites table
CREATE TABLE public.favorites (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    dispensary_id UUID REFERENCES public.dispensaries(id) ON DELETE CASCADE,
    hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
    tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_dispensary UNIQUE (user_id, dispensary_id),
    CONSTRAINT unique_user_hotel UNIQUE (user_id, hotel_id),
    CONSTRAINT unique_user_tour UNIQUE (user_id, tour_id),
    CONSTRAINT at_least_one_entity CHECK (
        (dispensary_id IS NOT NULL)::int + 
        (hotel_id IS NOT NULL)::int + 
        (tour_id IS NOT NULL)::int = 1
    )
);

-- Enable RLS on favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS policies for favorites
CREATE POLICY "Users can view their own favorites"
ON public.favorites
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can add their own favorites"
ON public.favorites
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own favorites"
ON public.favorites
FOR DELETE
USING (user_id = auth.uid());