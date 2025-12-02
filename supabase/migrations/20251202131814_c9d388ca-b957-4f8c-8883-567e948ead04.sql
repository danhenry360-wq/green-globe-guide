-- Enable RLS on contact_submissions (if not already)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow admins to read all contact submissions
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to update contact submissions (status changes)
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Allow anyone to insert (for the contact form)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);