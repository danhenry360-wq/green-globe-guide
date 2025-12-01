-- Create storage bucket for dispensary images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dispensary-images', 'dispensary-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for dispensary images bucket
CREATE POLICY "Admins can upload dispensary images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'dispensary-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update dispensary images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'dispensary-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete dispensary images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'dispensary-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public can view dispensary images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'dispensary-images');

-- Add admin policies for states table updates
CREATE POLICY "Admins can update states"
ON public.states
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin policies for countries table
CREATE POLICY "Admins can update countries"
ON public.countries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));