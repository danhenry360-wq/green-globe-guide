-- Create storage bucket for rental/hotel images
INSERT INTO storage.buckets (id, name, public)
VALUES ('rental-images', 'rental-images', true);

-- Allow anyone to read rental images
CREATE POLICY "Rental images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'rental-images');

-- Allow authenticated admins to upload rental images
CREATE POLICY "Admins can upload rental images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'rental-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated admins to update rental images
CREATE POLICY "Admins can update rental images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'rental-images' AND auth.role() = 'authenticated');

-- Allow authenticated admins to delete rental images
CREATE POLICY "Admins can delete rental images"
ON storage.objects FOR DELETE
USING (bucket_id = 'rental-images' AND auth.role() = 'authenticated');